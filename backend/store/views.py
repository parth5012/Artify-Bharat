from tkinter.font import names
from django.db.models.functions import Lower
from django.db.models.aggregates import Count
from django.contrib.auth import authenticate, login, logout, get_user_model
from django.db.transaction import atomic

# from django.shortcuts import get_object_or_404
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.decorators import action
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.mixins import (
    CreateModelMixin,
    DestroyModelMixin,
    RetrieveModelMixin,
    # UpdateModelMixin,
)
from rest_framework.permissions import (
    # AllowAny,
    # DjangoModelPermissions,
    # DjangoModelPermissionsOrAnonReadOnly,
    IsAdminUser,
    IsAuthenticated,
)
from rest_framework.exceptions import (
    ValidationError,
    PermissionDenied,
    NotAuthenticated,
)
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken

# from streamlit import user
from .filters import ProductFilter
from .permissions import (
    # FullDjangoModelPermissions,
    IsAdminOrReadOnly,
    IsArtisanOrReadOnly,
    ViewCustomerHistoryPermission,
)
from .pagination import DefaultPagination
from .models import (
    Address,
    Artisan,
    Cart,
    CartItem,
    Category,
    Customer,
    DashboardStats,
    Order,
    OrderItem,
    Product,
    ProductAsset,
    # Review,
)
from .serializers import (
    AddCartItemSerializer,
    ArtisanSerializer,
    CartItemSerializer,
    CartSerializer,
    CategorySerializer,
    CreateOrderSerializer,
    CreateProductSerializer,
    # CreateUserSerializer,
    CustomerSerializer,
    OrderSerializer,
    ProductAssetSerializer,
    ProductNameSerializer,
    ProductSerializer,
    # ReviewSerializer,
    UpdateCartItemSerializer,
    UpdateOrderSerializer,
)


class ProductViewSet(ModelViewSet):
    queryset = Product.objects.prefetch_related("images", "artisan", "category").all()
    serializer_class = ProductSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_class = ProductFilter
    pagination_class = DefaultPagination
    permission_classes = [
        IsArtisanOrReadOnly
    ]  # Allows public read access, artisan-only write
    search_fields = ["title", "description"]
    ordering_fields = ["unit_price", "last_update"]

    def get_serializer_class(self):
        if self.action == "create":
            return CreateProductSerializer
        return ProductSerializer

    def get_serializer_context(self):
        return {"request": self.request}

    def get_queryset(self):
        """Filter products by current artisan for dashboard view"""
        queryset = super().get_queryset()

        # Only filter by artisan if:
        # 1. User is authenticated
        # 2. User has artisan profile
        # 3. my_products=true query param is explicitly set
        if (
            self.request.user.is_authenticated
            and hasattr(self.request.user, "artisan")
            and self.request.query_params.get("my_products") == "true"
        ):
            print(f"🔒 Filtering products for artisan: {self.request.user.email}")
            queryset = queryset.filter(artisan=self.request.user.artisan)
        else:
            print(
                f"🌍 Showing ALL products (user: {self.request.user.email if self.request.user.is_authenticated else 'Anonymous'})"
            )

        return queryset

    def create(self, request, *args, **kwargs):
        try:
            # Get artisan for current user
            artisan = Artisan.objects.get(user=self.request.user)
        except Artisan.DoesNotExist:
            return Response(
                {"error": "User is not registered as an artisan."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # For multipart/form-data with files, work with request.data directly
        # Don't copy it as file objects can't be pickled
        data = request.data

        # Map 'price' to 'unit_price' if needed
        if "price" in data and "unit_price" not in data:
            # Create a mutable copy only for non-file fields
            mutable_data = {}
            for key, value in data.items():
                if key == "price":
                    mutable_data["unit_price"] = value
                else:
                    mutable_data[key] = value
            data = mutable_data

        # Lookup category
        category_title = data.get("category")
        if not category_title:
            return Response(
                {"error": "Category is required."}, status=status.HTTP_400_BAD_REQUEST
            )

        try:
            category = Category.objects.get(title=category_title)
        except Category.DoesNotExist:
            return Response(
                {"error": f"Category '{category_title}' not found."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Prepare data for serializer
        if isinstance(data, dict):
            data["category"] = category.id
            data["artisan"] = artisan.id
        else:
            # For QueryDict (form data), we need to create a mutable copy
            data = data.copy()
            data["category"] = category.id
            data["artisan"] = artisan.id

        # Use CreateProductSerializer for validation and creation
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        product = serializer.save()

        # Handle additional images
        additional_images = request.FILES.getlist("additional_images")
        if additional_images:
            for img in additional_images:
                ProductAsset.objects.create(product=product, image=img)

        # Return response using ProductSerializer for consistent output format
        response_serializer = ProductSerializer(product, context={"request": request})
        return Response(response_serializer.data, status=status.HTTP_201_CREATED)

    def destroy(self, request, *args, **kwargs):
        if OrderItem.objects.filter(product_id=kwargs["pk"]).count() > 0:
            return Response(
                {
                    "error": "Product cannot be deleted because it is associated with an order item."
                },
                status=status.HTTP_405_METHOD_NOT_ALLOWED,
            )

        return super().destroy(request, *args, **kwargs)

    @action(detail=False, methods=["GET"])
    def titles(self, request, *args, **kwargs):
        queryset = (
            Product.objects.annotate(lowered_title=Lower("title"))
            .only("lowered_title")
            .all()
        )
        print(queryset)

        serializer = ProductNameSerializer(queryset, many=True)

        return Response(serializer.data)


class CategoryViewSet(ModelViewSet):
    queryset = Category.objects.annotate(products_count=Count("products")).all()
    serializer_class = CategorySerializer
    permission_classes = [IsAdminOrReadOnly]

    def destroy(self, request, *args, **kwargs):
        if Product.objects.filter(category_id=kwargs["pk"]):
            return Response(
                {
                    "error": "Category cannot be deleted because it includes one or more products."
                },
                status=status.HTTP_405_METHOD_NOT_ALLOWED,
            )

        return super().destroy(request, *args, **kwargs)


# class ReviewViewSet(ModelViewSet):
#     serializer_class = ReviewSerializer

#     def get_queryset(self):
#         return Review.objects.filter(product_id=self.kwargs["product_pk"])

#     def get_serializer_context(self):
#         return {"product_id": self.kwargs["product_pk"]}


class CartViewSet(
    CreateModelMixin, RetrieveModelMixin, DestroyModelMixin, GenericViewSet
):
    queryset = Cart.objects.prefetch_related("items__product").all()
    serializer_class = CartSerializer


class CartItemViewSet(ModelViewSet):
    http_method_names = ["get", "post", "patch", "delete"]

    def get_serializer_class(self):
        if self.request.method == "POST":
            return AddCartItemSerializer
        elif self.request.method == "PATCH":
            return UpdateCartItemSerializer
        return CartItemSerializer

    def get_serializer_context(self):
        return {"cart_id": self.kwargs["cart_pk"]}

    def get_queryset(self):
        return CartItem.objects.filter(cart_id=self.kwargs["cart_pk"]).select_related(
            "product"
        )


class CustomerViewSet(ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    permission_classes = [IsAdminUser]

    @action(detail=True, permission_classes=[ViewCustomerHistoryPermission])
    def history(self, request, pk):
        return Response("ok")

    @action(detail=False, methods=["GET", "PUT"], permission_classes=[IsAuthenticated])
    def me(self, request):
        customer = Customer.objects.get(user_id=request.user.id)
        if request.method == "GET":
            serializer = CustomerSerializer(customer)
            return Response(serializer.data)
        elif request.method == "PUT":
            serializer = CustomerSerializer(customer, data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)


class OrderViewSet(ModelViewSet):
    http_method_names = ["get", "post", "patch", "delete", "head", "options"]

    def get_permissions(self):
        if self.request.method in ["PATCH", "DELETE"]:
            return [IsAdminUser()]
        return [IsAuthenticated()]

    def create(self, request, *args, **kwargs):
        serializer = CreateOrderSerializer(
            data=request.data, context={"user_id": self.request.user.id}
        )
        serializer.is_valid(raise_exception=True)
        order = serializer.save()
        serializer = OrderSerializer(order)
        return Response(serializer.data)

    def get_serializer_class(self):
        if self.request.method == "POST":
            return CreateOrderSerializer
        elif self.request.method == "PATCH":
            return UpdateOrderSerializer
        return OrderSerializer

    def get_queryset(self):
        user = self.request.user

        if user.is_staff:
            print("hm")
            return Order.objects.all()

        elif self.request.query_params.get("role") == "artisan":
            print(user.artisan.id)
            orders = list(
                Order.objects.filter(items__product__artisan=user.artisan)
                .distinct()
                .all()
            )
            return orders

        customer_id = Customer.objects.only("id").get(user_id=user.id)
        return Order.objects.filter(customer_id=customer_id)


class ProductAssetViewSet(ModelViewSet):
    serializer_class = ProductAssetSerializer

    def get_serializer_context(self):
        return {"product_id": self.kwargs["product_pk"]}

    def get_queryset(self):
        return ProductAsset.objects.filter(product_id=self.kwargs["product_pk"])


class LoginView(APIView):
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        # Validate credentials
        user = authenticate(request, username=email, password=password)
        if user is not None:
            login(request, user)
            return Response("User logged in")
        else:
            return Response("Invalid credentials!!")


class LogoutView(APIView):
    def post(self, request):
        # Logout user
        logout(request=request)
        return Response("User logged out")


class SignupView(APIView):
    def post(self, request):
        print(request.data)
        with atomic():
            user_model = get_user_model()
            user = user_model()

            user.first_name = request.data.get("firstName")
            user.last_name = request.data.get("lastName")
            user.email = request.data.get("email")
            user.set_password(request.data.get("password"))
            user.phone_no = request.data.get("phone")
            user.save()
            address = Address()
            address.local_address = request.data.get("address")
            address.city = request.data.get("city")
            address.state = request.data.get("state")
            address.pincode = request.data.get("pincode")
            address.user = user
            address.save()
            userRole = request.data.get("userRole")
            if userRole == "artisan":
                artisan = Artisan()
                print(request.data.get("craftSpecialty"))
                artisan.speciality = request.data.get("craftSpecialty")
                artisan.experience = request.data.get("experience")
                artisan.bio = request.data.get("bio")
                artisan.user_id = user.id
                artisan.save()
            elif userRole == "buyer":
                customer, created = Customer.objects.get_or_create(user=user)

                customer.interests = request.data.get("interests", [])
                customer.save()

            else:
                raise ValidationError("Client Side Error!!")
        refresh = RefreshToken.for_user(user)

        return Response(
            {
                "message": "Success",
                "access": str(refresh.access_token),
                "refresh": str(refresh),
            },
            status=status.HTTP_201_CREATED,
        )
        # return Response("Account Created Successfully!!")


@api_view(http_method_names=["GET"])
def get_dashboard_stats(request):
    if (
        request.user.is_authenticated
        and Artisan.objects.filter(user=request.user).exists()
    ):
        artisan: Artisan = request.user.artisan
        stats: DashboardStats = DashboardStats()
        # Product count
        stats["products_count"] = artisan.products.count()
        # Total sales
        total_price = 0
        for item in artisan.orderitems.filter(order__delivered=True).all():
            total_price += item.quantity * item.unit_price
        stats["total_sales"] = total_price
        # Active orders
        # stats["active_orders"] = artisan.orderitems.order.filter(
        #     delivered=False
        # ).count()
        stats["active_orders"] = (
            Order.objects.filter(items__product__artisan=artisan, delivered=False)
            .distinct()
            .count()
        )
        # AI verified
        stats["ai_verified"] = 98
        old_stats: DashboardStats = artisan.stats
        artisan.stats = stats
        artisan.save()
        change = DashboardStats()
        change["active_orders"] = stats["active_orders"] - old_stats["active_orders"]
        change["ai_verified"] = stats["ai_verified"] - old_stats["ai_verified"]
        change["products_count"] = stats["products_count"] - old_stats["products_count"]
        change["total_sales"] = stats["total_sales"] - old_stats["total_sales"]
        print(stats, change)
        return Response({"stats": stats, "change": change})
    return Response("You are not an Artisan!")


@api_view(["PATCH"])
def update_craft_story(request):
    try:
        artisan = request.user.artisan
        artisan.craft_story = request.data.get("craft_story")
        artisan.save()
        return Response({"success": True})
    except Artisan.DoesNotExist:
        return Response(
            {"error": "User is not an artisan"}, status=status.HTTP_400_BAD_REQUEST
        )
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["GET", "PATCH"])
def get_artisan_profile(request):
    try:
        artisan = request.user.artisan

        if request.method == "GET":
            serializer = ArtisanSerializer(artisan, context={"request": request})
            return Response(serializer.data)

        elif request.method == "PATCH":
            # Update artisan profile
            data = request.data

            if "speciality" in data:
                artisan.speciality = data["speciality"]
            if "experience" in data:
                artisan.experience = data["experience"]
            if "bio" in data:
                artisan.bio = data["bio"]
            if "craft_story" in data:
                artisan.craft_story = data["craft_story"]
            if "profile_image" in request.FILES:
                artisan.profile_image = request.FILES["profile_image"]

            artisan.save()

            serializer = ArtisanSerializer(artisan, context={"request": request})
            return Response(serializer.data)

    except Artisan.DoesNotExist:
        return Response(
            {"error": "User is not an artisan"}, status=status.HTTP_400_BAD_REQUEST
        )
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

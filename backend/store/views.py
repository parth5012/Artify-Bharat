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
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from .filters import ProductFilter
from .permissions import (
    # FullDjangoModelPermissions,
    IsAdminOrReadOnly,
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
    CartItemSerializer,
    CartSerializer,
    CategorySerializer,
    CreateOrderSerializer,
    # CreateUserSerializer,
    CustomerSerializer,
    OrderSerializer,
    ProductAssetSerializer,
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
    permission_classes = [IsAdminOrReadOnly]
    search_fields = ["title", "description"]
    ordering_fields = ["unit_price", "last_update"]

    def get_serializer_context(self):
        return {"request": self.request}

    def destroy(self, request, *args, **kwargs):
        if OrderItem.objects.filter(product_id=kwargs["pk"]).count() > 0:
            return Response(
                {
                    "error": "Product cannot be deleted because it is associated with an order item."
                },
                status=status.HTTP_405_METHOD_NOT_ALLOWED,
            )

        return super().destroy(request, *args, **kwargs)


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
            return Order.objects.all()

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
            user.password = request.data.get("password")
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
            login(
                user,
            )
            if userRole == "artisan":
                artisan = Artisan()
                print(request.data.get("craftSpecialty"))
                artisan.speciality = request.data.get("craftSpecialty")
                artisan.experience = request.data.get("experience")
                artisan.bio = request.data.get("bio")
                artisan.user_id = user.id
                artisan.save()
            elif userRole == "buyer":
                customer = Customer()
                customer.user = user
                customer.interests = list(request.data.get("interests"))
                customer.save()
            else:
                return ValidationError("Client Side Error!!")
        refresh = RefreshToken.for_user(user)

        return Response(
            {
                "message": "Success",
                "access": str(refresh.access_token),
                "refresh": str(refresh),
            }
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
        return Response({"stats": stats, "change": change})
    return Response("You are not an Artisan!")

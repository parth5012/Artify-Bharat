from typing import TypedDict
from django.contrib import admin
from django.conf import settings
from django.core.validators import MinValueValidator
from django.db import models
from django.db.models.functions import Lower
from django.db.models.indexes import Index
from uuid import uuid4
from store.validators import validate_file_size, validate_model_extension


class Category(models.Model):
    title = models.CharField(max_length=255)
    featured_product = models.ForeignKey(
        "Product", on_delete=models.SET_NULL, null=True, related_name="+", blank=True
    )

    def __str__(self) -> str:
        return self.title

    class Meta:
        ordering = ["title"]


class Product(models.Model):
    title = models.CharField(max_length=255)
    slug = models.SlugField(null=True)
    description = models.TextField(null=True, blank=True)
    unit_price = models.DecimalField(
        max_digits=8, decimal_places=2, validators=[MinValueValidator(1)]
    )
    inventory = models.IntegerField(
        default=1, validators=[MinValueValidator(0)], blank=True, null=True
    )
    last_update = models.DateTimeField(auto_now=True)
    category = models.ForeignKey(
        Category, on_delete=models.PROTECT, related_name="products"
    )
    artisan = models.ForeignKey(
        "Artisan",
        on_delete=models.CASCADE,
        related_name="products",
        default=1,
    )
    # Media fields
    image = models.ImageField(
        upload_to="store/products/images",
        validators=[validate_file_size],
        null=True,
        blank=True,
    )
    video = models.FileField(
        upload_to="store/products/videos",
        validators=[validate_file_size],
        null=True,
        blank=True,
    )

    def __str__(self) -> str:
        return self.title

    class Meta:
        ordering = ["title"]
        indexes = [Index(Lower("title"), name="title_idx")]


class ProductAsset(models.Model):
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name="images"
    )
    # Image
    image = models.ImageField(
        upload_to="store/assets/images",
        validators=[validate_file_size],
        null=True,
        blank=True,
    )
    # Video
    video = models.FileField(
        upload_to="store/assets/videos",
        validators=[validate_file_size],
        null=True,
        blank=True,
    )
    # 3D Model
    mesh = models.FileField(
        upload_to="store/assets/models",
        validators=[validate_model_extension],
        null=True,
        blank=True,
    )


class DashboardStats(TypedDict):
    products_count: int
    total_sales: int
    active_orders: int
    ai_verified: int


def default_stats():
    stats = DashboardStats()
    stats["active_orders"] = 0
    stats["ai_verified"] = 0
    stats["total_sales"] = 0
    stats["products_count"] = 0
    return stats


class Artisan(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    experience = models.IntegerField()
    speciality = models.CharField(max_length=255)
    bio = models.TextField(null=True, blank=True)
    craft_story = models.TextField(null=True, blank=True)
    profile_image = models.ImageField(
        upload_to="artisan/profiles",
        validators=[validate_file_size],
        null=True,
        blank=True,
    )
    stats = models.JSONField(default=default_stats)
    # orders


class ArtisanVerification(models.Model):
    VERIFICATION_STATUS_CHOICES = [
        ('PENDING', 'Pending Review'),
        ('VERIFIED', 'Verified'),
        ('REJECTED', 'Rejected'),
        ('NEEDS_INFO', 'Needs Additional Information'),
    ]
    
    GENERATIONAL_LINEAGE_CHOICES = [
        ('first', '1st Generation'),
        ('second', '2nd Generation'),
        ('third_plus', '3rd Generation+'),
        ('community', 'Community/SHG Trained'),
    ]
    
    TOOLING_METHOD_CHOICES = [
        ('handcrafted', '100% Handcrafted'),
        ('handloom', 'Handloom Operated'),
        ('hand_tooled', 'Hand-tooled with Assistive Machinery'),
    ]
    
    # Core relationship
    artisan = models.OneToOneField(Artisan, on_delete=models.CASCADE, related_name='verification')
    
    # Step 1: Artisan Pedigree & Identity
    pechan_card_file = models.ImageField(
        upload_to="verification/pechan_cards",
        validators=[validate_file_size],
        help_text="Pechan Card or State Handicraft Board Certificate"
    )
    pechan_card_number = models.CharField(max_length=100)
    generational_lineage = models.CharField(
        max_length=20, 
        choices=GENERATIONAL_LINEAGE_CHOICES
    )
    artisan_bio = models.TextField(
        help_text="Product creation journey and craft authenticity details"
    )
    
    # Step 2: Craft Authenticity & Material Proof
    has_gi_tag = models.BooleanField(default=False)
    gi_tag_number = models.CharField(
        max_length=50, 
        null=True, 
        blank=True,
        help_text="GI Tag registration number if applicable"
    )
    raw_material_source = models.TextField(
        help_text="Description of authentic materials used in products"
    )
    tooling_method = models.CharField(
        max_length=20,
        choices=TOOLING_METHOD_CHOICES
    )
    
    # Step 3: Visual/Video Proof
    process_video_file = models.FileField(
        upload_to="verification/process_videos",
        validators=[validate_file_size],
        help_text="30-60 second video showing authentic product creation process"
    )
    workshop_photo_file = models.ImageField(
        upload_to="verification/workshop_photos",
        validators=[validate_file_size],
        help_text="Photo of workshop/studio space"
    )
    
    # Verification status and metadata
    verification_status = models.CharField(
        max_length=20,
        choices=VERIFICATION_STATUS_CHOICES,
        default='PENDING'
    )
    submitted_at = models.DateTimeField(auto_now_add=True)
    reviewed_at = models.DateTimeField(null=True, blank=True)
    reviewer_notes = models.TextField(null=True, blank=True)
    
    def __str__(self):
        return f"Verification for {self.artisan.user.get_full_name()} - {self.verification_status}"
    
    class Meta:
        ordering = ['-submitted_at']


class Customer(models.Model):
    MEMBERSHIP_BRONZE = "B"
    MEMBERSHIP_SILVER = "S"
    MEMBERSHIP_GOLD = "G"

    MEMBERSHIP_CHOICES = [
        (MEMBERSHIP_BRONZE, "Bronze"),
        (MEMBERSHIP_SILVER, "Silver"),
        (MEMBERSHIP_GOLD, "Gold"),
    ]
    birth_date = models.DateField(null=True, blank=True)
    membership = models.CharField(
        max_length=1, choices=MEMBERSHIP_CHOICES, default=MEMBERSHIP_BRONZE
    )
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    interests = models.JSONField(default=list, blank=True)

    def __str__(self):
        return f"{self.user.first_name} {self.user.last_name}"

    @admin.display(ordering="user__first_name")
    def first_name(self):
        return self.user.first_name

    @admin.display(ordering="user__last_name")
    def last_name(self):
        return self.user.last_name

    class Meta:
        ordering = ["user__first_name", "user__last_name"]
        permissions = [("view_history", "Can view history")]


class Order(models.Model):
    PAYMENT_STATUS_PENDING = "P"
    PAYMENT_STATUS_COMPLETE = "C"
    PAYMENT_STATUS_FAILED = "F"
    PAYMENT_STATUS_CHOICES = [
        (PAYMENT_STATUS_PENDING, "Pending"),
        (PAYMENT_STATUS_COMPLETE, "Complete"),
        (PAYMENT_STATUS_FAILED, "Failed"),
    ]

    placed_at = models.DateTimeField(auto_now_add=True)
    payment_status = models.CharField(
        max_length=1, choices=PAYMENT_STATUS_CHOICES, default=PAYMENT_STATUS_PENDING
    )
    customer = models.ForeignKey(Customer, on_delete=models.PROTECT)
    delivered = models.BooleanField(default=False, null=True, blank=True)

    class Meta:
        permissions = [("cancel_order", "Can cancel order")]


class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.PROTECT, related_name="items")
    product = models.ForeignKey(
        Product, on_delete=models.PROTECT, related_name="orderitems"
    )
    artisan = models.ForeignKey(
        Artisan, on_delete=models.CASCADE, related_name="orderitems"
    )
    quantity = models.PositiveSmallIntegerField()
    unit_price = models.DecimalField(max_digits=6, decimal_places=2)


class Address(models.Model):
    local_address = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    state = models.CharField(max_length=50, null=True)
    pincode = models.CharField(max_length=10, null=True)
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="address"
    )


class Cart(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4)
    created_at = models.DateTimeField(auto_now_add=True)


class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name="items")
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveSmallIntegerField(validators=[MinValueValidator(1)])

    class Meta:
        unique_together = [["cart", "product"]]

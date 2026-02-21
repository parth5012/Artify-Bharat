from django.db import models
from django.contrib.auth.models import AbstractUser
from phonenumber_field.modelfields import PhoneNumberField


# Create your models here.
class User(AbstractUser):
    email = models.EmailField(unique=True)
    phone_no = PhoneNumberField(null=True)
    username = None

    # OAuth fields
    oauth_provider = models.CharField(
        max_length=50, null=True, blank=True
    )  # 'google' or 'facebook'
    oauth_id = models.CharField(max_length=255, null=True, blank=True, unique=True)
    is_oauth_user = models.BooleanField(default=False)

    USERNAME_FIELD = "email"  # This makes email the unique identifier
    REQUIRED_FIELDS = ["username"]

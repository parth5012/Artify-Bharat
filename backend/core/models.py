from django.db import models
from django.contrib.auth.models import AbstractUser
from phonenumber_field.modelfields import PhoneNumberField

# Create your models here.
class User(AbstractUser):
    email = models.EmailField(unique=True)
    phone_no = PhoneNumberField(null=True)


    USERNAME_FIELD = 'email'  # This makes email the unique identifier
    REQUIRED_FIELDS = ['username']


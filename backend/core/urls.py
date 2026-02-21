from django.urls import path
from . import views

urlpatterns = [
    path("auth/google/", views.google_oauth, name="google-oauth"),
    path("auth/facebook/", views.facebook_oauth, name="facebook-oauth"),
]

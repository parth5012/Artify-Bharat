from rest_framework.test import APIClient
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model
import pytest
from store.models import Artisan, Category, Customer
import os
from dotenv import load_dotenv


load_dotenv()

User = get_user_model()


@pytest.fixture
def api_client():
    return APIClient()


@pytest.fixture
def authenticate(api_client):
    def do_authenticate(is_staff=False):
        return api_client.force_authenticate(user=User(is_staff=is_staff))

    return do_authenticate


@pytest.fixture
def artisan_user(db):
    """Creates a test artisan user in the test database."""
    user = User()
    user.first_name = "Test"
    user.last_name = "Artisan"
    user.email = os.getenv("ARTISAN_EMAIL")
    user.set_password(os.getenv("ARTISAN_PASS"))
    user.save()

    Artisan.objects.create(
        user=user,
        speciality="pottery",
        experience=1,
    )
    return user


@pytest.fixture
def customer_user(db):
    """Creates a test customer user in the test database."""
    user = User()
    user.first_name = "Test"
    user.last_name = "Customer"
    user.email = os.getenv("BUYER_EMAIL")
    user.set_password(os.getenv("BUYER_PASS"))
    user.save()

    Customer.objects.get_or_create(
        user=user,
    )
    return user


@pytest.fixture
def authenticated_artisan(db, api_client, artisan_user):
    email = os.getenv("ARTISAN_EMAIL")
    password = os.getenv("ARTISAN_PASS")
    response: Response = api_client.post(
        "/api/token/",
        {"email": email, "password": str(password)},
        content_type="application/json",
    )
    assert response.status_code == status.HTTP_200_OK
    assert response.data["user_type"] == "artisan"
    return response


@pytest.fixture
def authenticated_customer(db, api_client, customer_user):
    email = os.getenv("BUYER_EMAIL")
    password = os.getenv("BUYER_PASS")
    response: Response = api_client.post(
        "/api/token/",
        {"email": email, "password": str(password)},
        content_type="application/json",
    )
    assert response.status_code == status.HTTP_200_OK
    assert response.data["user_type"] == "buyer"
    return response

@pytest.fixture
def sample_category(db):
    return Category.objects.create(title='pottery')
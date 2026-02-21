import pytest
import os
from dotenv import load_dotenv
from rest_framework import status
from rest_framework.response import Response
from faker import Faker

load_dotenv()

fake = Faker()


@pytest.mark.django_db
class TestSignup:
    def test_signup_as_artisan_returns_201(self, api_client):
        response: Response = api_client.post(
            "/store/signup/",
            {
                "firstName": fake.first_name(),
                "lastName": fake.last_name(),
                "email": fake.email(),
                "password": fake.password(),
                "phone": fake.phone_number(),
                "address": fake.address(),
                "city": fake.city(),
                "state": fake.state(),
                "pincode": 100000,
                "craftSpecialty": "handcraft",
                "experience": 4,
                "bio": fake.text(max_nb_chars=100),
                "userRole": "artisan",
            },
            content_type="application/json",
        )
        assert response.status_code == status.HTTP_201_CREATED

    def test_signup_as_customer_returns_201(self, api_client):
        print(fake.first_name())
        response: Response = api_client.post(
            "/store/signup/",
            {
                "firstName": fake.first_name(),
                "lastName": fake.last_name(),
                "email": fake.email(),
                "password": fake.password(),
                "phone": fake.phone_number(),
                "address": fake.address(),
                "city": fake.city(),
                "state": fake.state(),
                "pincode": 100000,
                "interests": ["handcraft", "pottery"],
                "userRole": "buyer",
            },
        )
        assert response.status_code == status.HTTP_201_CREATED


@pytest.mark.django_db
class TestLogin:
    def test_artisan_login_returns_200(self, api_client, artisan_user):
        email = os.getenv("ARTISAN_EMAIL")
        password = os.getenv("ARTISAN_PASS")
        response: Response = api_client.post(
            "/api/token/",
            {"email": email, "password": str(password)},
            content_type="application/json",
        )
        assert response.status_code == status.HTTP_200_OK

    def test_customer_login_returns_200(self, api_client, customer_user):
        email = os.getenv("BUYER_EMAIL")
        password = os.getenv("BUYER_PASS")
        response: Response = api_client.post(
            "/api/token/",
            {"email": email, "password": str(password)},
            content_type="application/json",
        )
        assert response.status_code == status.HTTP_200_OK


@pytest.mark.django_db
class TestProducts:
    def test_get_products_as_artisan(self, api_client, authenticated_artisan):
        access_token = authenticated_artisan.data["access"]
        response = api_client.get(
            "/store/products/",
            headers={
                "Authorization": f"Bearer {access_token}",
            },
        )
        assert response.status_code == status.HTTP_200_OK

    def test_get_products_as_customer(self, api_client, authenticated_customer):
        access_token = authenticated_customer.data["access"]
        response = api_client.get(
            "/store/products/",
            headers={
                "Authorization": f"Bearer {access_token}",
            },
        )
        assert response.status_code == status.HTTP_200_OK

    def test_create_product_as_artisan(
        self, api_client, authenticated_artisan, sample_category
    ):
        access_token = authenticated_artisan.data["access"]
        response = api_client.post(
            "/store/products/",
            {
                "title": fake.name(),
                "description": fake.text(max_nb_chars=30),
                "unit_price": 40,
                "category": "pottery",
            },
            headers={
                "Authorization": f"Bearer {access_token}",
            },
        )
        assert response.status_code == status.HTTP_201_CREATED

    def test_create_product_as_customer(
        self, api_client, authenticated_customer, sample_category
    ):
        access_token = authenticated_customer.data["access"]
        response = api_client.post(
            "/store/products/",
            {
                "title": fake.name(),
                "description": fake.text(max_nb_chars=30),
                "unit_price": 40,
                "category": "pottery",
            },
            headers={
                "Authorization": f"Bearer {access_token}",
            },
        )
        assert response.status_code == status.HTTP_403_FORBIDDEN


@pytest.mark.django_db
class TestDashboardStats:
    def test_get_stats_returns_200(self, api_client, authenticated_artisan):
        access_token = authenticated_artisan.data["access"]
        response = api_client.get(
            "/store/stats/",
            headers={
                "Authorization": f"Bearer {access_token}",
            },
        )
        assert response.status_code == status.HTTP_200_OK

    def test_get_stats_returns_403(self, api_client, authenticated_customer):
        access_token = authenticated_customer.data["access"]
        response = api_client.get(
            "/store/stats/",
            headers={
                "Authorization": f"Bearer {access_token}",
            },
        )
        assert response.status_code == status.HTTP_403_FORBIDDEN

    def test_get_stats_returns_401(self, api_client):
        response = api_client.get(
            "/store/stats/",
        )
        assert response.status_code == status.HTTP_401_UNAUTHORIZED


@pytest.mark.django_db
class TestOrders:
    def test_get_orders_as_artisan(self, api_client, authenticated_artisan):
        access_token = authenticated_artisan.data["access"]
        response = api_client.get(
            "/store/orders/",
            headers={
                "Authorization": f"Bearer {access_token}",
            },
        )
        assert response.status_code == status.HTTP_200_OK

    def test_get_orders_as_customer(self, api_client, authenticated_customer):
        access_token = authenticated_customer.data["access"]
        response = api_client.get(
            "/store/orders/",
            headers={
                "Authorization": f"Bearer {access_token}",
            },
        )
        assert response.status_code == status.HTTP_200_OK

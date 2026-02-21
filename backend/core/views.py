from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests
import requests
from django.conf import settings
from .models import User


@api_view(["POST"])
@permission_classes([AllowAny])
def google_oauth(request):
    """
    Handle Google OAuth authentication
    Expects: { "token": "google_id_token", "role": "artisan|buyer" }
    """
    import traceback

    try:
        token = request.data.get("token")
        role = request.data.get("role", "buyer")

        print(f"DEBUG: Received token: {token[:50]}..." if token else "No token")
        print(f"DEBUG: Role: {role}")
        print(f"DEBUG: Client ID from settings: {settings.GOOGLE_OAUTH_CLIENT_ID}")

        if not token:
            return Response(
                {"error": "Token is required"}, status=status.HTTP_400_BAD_REQUEST
            )

        # Verify Google token
        try:
            idinfo = id_token.verify_oauth2_token(
                token, google_requests.Request(), settings.GOOGLE_OAUTH_CLIENT_ID
            )

            # Get user info from token
            email = idinfo.get("email")
            first_name = idinfo.get("given_name", "")
            last_name = idinfo.get("family_name", "")
            google_id = idinfo.get("sub")

            print(f"DEBUG: Token verified. Email: {email}")

            if not email:
                return Response(
                    {"error": "Email not provided by Google"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

        except ValueError as e:
            print(f"DEBUG: Token verification failed: {str(e)}")
            traceback.print_exc()
            return Response(
                {"error": f"Invalid token: {str(e)}"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Check if user exists
        user = User.objects.filter(email=email).first()

        if user:
            # User exists, login
            if not user.is_oauth_user:
                # Update existing email/password user to OAuth
                user.oauth_provider = "google"
                user.oauth_id = google_id
                user.is_oauth_user = True
                user.save()
        else:
            # Create new user
            user = User.objects.create(
                email=email,
                first_name=first_name,
                last_name=last_name,
                oauth_provider="google",
                oauth_id=google_id,
                is_oauth_user=True,
            )
            user.set_unusable_password()  # OAuth users don't need password
            user.save()

        # Generate JWT tokens
        refresh = RefreshToken.for_user(user)

        return Response(
            {
                "access": str(refresh.access_token),
                "refresh": str(refresh),
                "user": {
                    "id": user.id,
                    "email": user.email,
                    "first_name": user.first_name,
                    "last_name": user.last_name,
                    "role": role,
                },
            },
            status=status.HTTP_200_OK,
        )

    except Exception as e:
        print(f"DEBUG: Unexpected error: {str(e)}")
        traceback.print_exc()
        return Response(
            {"error": f"Authentication failed: {str(e)}"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["POST"])
@permission_classes([AllowAny])
def facebook_oauth(request):
    """
    Handle Facebook OAuth authentication
    Expects: { "accessToken": "facebook_access_token", "role": "artisan|buyer" }
    """
    try:
        access_token = request.data.get("accessToken")
        role = request.data.get("role", "buyer")

        if not access_token:
            return Response(
                {"error": "Access token is required"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Verify token and get user info from Facebook
        fb_response = requests.get(
            "https://graph.facebook.com/me",
            params={
                "fields": "id,email,first_name,last_name",
                "access_token": access_token,
            },
        )

        if fb_response.status_code != 200:
            return Response(
                {"error": "Invalid Facebook token"}, status=status.HTTP_400_BAD_REQUEST
            )

        fb_data = fb_response.json()

        email = fb_data.get("email")
        first_name = fb_data.get("first_name", "")
        last_name = fb_data.get("last_name", "")
        facebook_id = fb_data.get("id")

        if not email:
            return Response(
                {"error": "Email not provided by Facebook"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Check if user exists
        user = User.objects.filter(email=email).first()

        if user:
            # User exists, login
            if not user.is_oauth_user:
                # Update existing email/password user to OAuth
                user.oauth_provider = "facebook"
                user.oauth_id = facebook_id
                user.is_oauth_user = True
                user.save()
        else:
            # Create new user
            user = User.objects.create(
                email=email,
                first_name=first_name,
                last_name=last_name,
                oauth_provider="facebook",
                oauth_id=facebook_id,
                is_oauth_user=True,
            )
            user.set_unusable_password()  # OAuth users don't need password
            user.save()

        # Generate JWT tokens
        refresh = RefreshToken.for_user(user)

        return Response(
            {
                "access": str(refresh.access_token),
                "refresh": str(refresh),
                "user": {
                    "id": user.id,
                    "email": user.email,
                    "first_name": user.first_name,
                    "last_name": user.last_name,
                    "role": role,
                },
            },
            status=status.HTTP_200_OK,
        )

    except Exception as e:
        return Response(
            {"error": f"Authentication failed: {str(e)}"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )

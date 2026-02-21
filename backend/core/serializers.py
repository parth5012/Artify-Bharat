from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from store.models import Artisan, Customer


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        # Add extra data to the response
        data["user_id"] = self.user.id
        user_type = ""
        if Artisan.objects.filter(user_id=data["user_id"]).exists():
            user_type = "artisan"
        elif Customer.objects.filter(user_id=data["user_id"]):
            user_type = "buyer"
        data["user_type"] = user_type

        return data

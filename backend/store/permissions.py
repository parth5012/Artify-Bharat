from rest_framework import permissions
from store.models import Artisan


class IsAdminOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):

        if request.method in permissions.SAFE_METHODS:
            return True

        user = request.user

        if not user or not user.is_authenticated:
            return False

        return Artisan.objects.filter(user=user).exists()



class FullDjangoModelPermissions(permissions.DjangoModelPermissions):
    def __init__(self) -> None:
        self.perms_map["GET"] = ["%(app_label)s.view_%(model_name)s"]


class IsArtisanOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return bool(request.user and Artisan.objects.filter(user=request.user).exists())


class ViewCustomerHistoryPermission(permissions.BasePermission):
    def has_permission(self, request, view):

        user = request.user

        if not user or not user.is_authenticated:
            return False

        return user.has_perm("store.view_history")


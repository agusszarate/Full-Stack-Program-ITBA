from rest_framework.permissions import BasePermission

class IsEmployeePermission(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and (hasattr(request.user, 'empleado') or request.user.is_staff)

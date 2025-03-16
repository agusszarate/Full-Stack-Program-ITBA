from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.authentication import BasicAuthentication
from sprint_8.permissions import IsEmployeePermission
class LoginView(APIView):
    authentication_classes = [BasicAuthentication]
    permission_classes = [AllowAny]
    def post(self, request):
        if request.user.is_authenticated and not (IsEmployeePermission().has_permission(request, self)):
            return Response({'message': 'Login successful'})
        else:
            return Response({'error': 'Invalid credentials'}, status=401)
from rest_framework import permissions
from rest_framework import status
from sprint_8.permissions import IsEmployeePermission
from sprint_8.models import Cliente
from .serializers import ClienteSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404

# Create your views here.
class ClienteAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, pk=None):
        
        if IsEmployeePermission().has_permission(request, self):
            if pk:
                cliente = get_object_or_404(Cliente, id=pk)
            else:
                return Response({"message": 'ID de cliente requerido'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            cliente = get_object_or_404(Cliente, usuario=request.user)

        serializer = ClienteSerializer(cliente)
        return Response(serializer.data)

    def post(self, request):
        if IsEmployeePermission().has_permission(request, self):
            serializer = ClienteSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response({"detail": "No tiene permiso para realizar esta acción."}, status=status.HTTP_401_UNAUTHORIZED)
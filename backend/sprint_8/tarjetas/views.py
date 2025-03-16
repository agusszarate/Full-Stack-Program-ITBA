from rest_framework import permissions
from rest_framework import status
from sprint_8.models import Cliente, Tarjeta
from sprint_8.permissions import IsEmployeePermission
from .serializers import TarjetaSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404

class TarjetaAPIView(APIView): 
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, pk=None):
        if IsEmployeePermission().has_permission(request, self):
            return self.employeGet(request=request, pk=pk)
        else:
            return self.clienteGet(request=request, pk=pk)

    def post(self, request):
        if not IsEmployeePermission().has_permission(request, self):
            return Response({"message": 'No tiene permiso para realizar esta acción, contacte a un empleado.'}, status=status.HTTP_403_FORBIDDEN)
        
        serializer = TarjetaSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk):
        if not IsEmployeePermission().has_permission(request, self):
            return Response({"message": 'No tiene permiso para realizar esta acción, contacte a un empleado.'}, status=status.HTTP_403_FORBIDDEN)
        tarjeta = get_object_or_404(Tarjeta, pk=pk)
        tarjeta.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    def employeGet(self, request, pk=None):
        if pk:
            cliente = get_object_or_404(Cliente, pk=pk)
            tarjetas = Tarjeta.objects.filter(cliente=cliente)
            serializer = TarjetaSerializer(tarjetas, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({"message": 'ID de cliente requerido'}, status=status.HTTP_400_BAD_REQUEST)
    
    def clienteGet(self, request, pk=None):
        cliente = get_object_or_404(Cliente, usuario=request.user)
        if pk:
            tarjeta = get_object_or_404(Tarjeta, pk=pk, cliente=cliente)
            serializer = TarjetaSerializer(tarjeta)
        else:
            tarjetas = Tarjeta.objects.filter(cliente=cliente)
            serializer = TarjetaSerializer(tarjetas, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
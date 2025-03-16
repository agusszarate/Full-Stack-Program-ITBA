from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from sprint_8.models import Cliente
from .serializers import DireccionSerializer
from sprint_8.permissions import IsEmployeePermission
from sprint_8.models import Direccion

class DireccionesView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk=None):
        serializer = DireccionSerializer(data=request.data)
        if serializer.is_valid():
            if IsEmployeePermission().has_permission(request, self):
                if pk:
                    cliente = get_object_or_404(Cliente, pk=pk)
                else:
                    return Response({'Message': 'ID de cliente requerido'}, status=status.HTTP_400_BAD_REQUEST)
            else:
                cliente = get_object_or_404(Cliente, usuario=request.user)
            direccion = serializer.save()
            cliente.direcciones.add(direccion)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk=None):
        if not pk:
            return Response({'Message': 'ID de dirección requerido'}, status=status.HTTP_400_BAD_REQUEST)
        
        if IsEmployeePermission().has_permission(request, self):
            direccion = get_object_or_404(Direccion, pk=pk)
        else:
            cliente = get_object_or_404(Cliente, usuario=request.user)
            direccion = get_object_or_404(cliente.direcciones, pk=pk)
        
        serializer = DireccionSerializer(direccion, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, pk=None):
        if IsEmployeePermission().has_permission(request, self):
            if pk:
                cliente = get_object_or_404(Cliente, pk=pk)
            else:
                return Response({'Message': 'ID de cliente requerido'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            cliente = get_object_or_404(Cliente, usuario=request.user)
        direcciones = cliente.direcciones.all()
        serializer = DireccionSerializer(direcciones, many=True)
        return Response(serializer.data)
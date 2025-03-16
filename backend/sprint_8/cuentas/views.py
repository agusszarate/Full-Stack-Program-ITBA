from rest_framework import permissions
from rest_framework import status
from sprint_8.models import Cliente, Cuenta
from .serializers import CuentaSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from django.http import Http404
from sprint_8.permissions import IsEmployeePermission

class CuentaAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, pk=None):

        if IsEmployeePermission().has_permission(request, self):
            if pk:
                cuenta = self.obtener_cuenta_o_error(pk=pk)
                serializer = CuentaSerializer(cuenta)
                return Response(serializer.data)
            else:
                return Response({"message": 'ID de cuenta requerido'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            cliente = get_object_or_404(Cliente, usuario=request.user)

            if pk:
                cuenta = self.obtener_cuenta_o_error(pk=pk, customer=cliente)
                serializer = CuentaSerializer(cuenta)
            else:
                cuentas = Cuenta.objects.filter(customer=cliente)
                serializer = CuentaSerializer(cuentas, many=True)
            return Response(serializer.data)

    def post(self, request):
        
        if IsEmployeePermission.has_permission(request, self):
            if not request.data.get('customer'):
                return Response({"message": 'ID cliente requerido'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            cliente = get_object_or_404(Cliente, usuario=request.user)
            request.data['customer'] = cliente.id

        serializer = CuentaSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk=None):
        if not IsEmployeePermission().has_permission(request, self):
            return Response({"message": 'No tiene permiso para realizar esta acción, contacte a un empleado.'}, status=status.HTTP_401_UNAUTHORIZED)

        if pk:    
            cuenta = self.obtener_cuenta_o_error(pk=pk)
            cuenta.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response({"message": 'ID de cuenta requerido'}, status=status.HTTP_400_BAD_REQUEST)


    def obtener_cuenta_o_error(self, pk, customer=None):
        try:
            if customer:
                return Cuenta.objects.get(pk=pk, customer=customer)
            else:
                return Cuenta.objects.get(pk=pk)
        except Cuenta.DoesNotExist:
            if customer:
                raise Http404("Cuenta no encontrada para el cliente autenticado")
            else:
                raise Http404("Cuenta no encontrada")
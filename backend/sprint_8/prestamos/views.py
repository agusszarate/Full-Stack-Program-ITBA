from django.http import Http404
from rest_framework import generics, permissions
from rest_framework import status
from sprint_8.models import Cliente, Cuenta, Prestamo, Movimientos
from .serializers import PrestamoSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from sprint_8.permissions import IsEmployeePermission

# Create your views here.
class PrestamoView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        if not IsEmployeePermission().has_permission(request, self):
            cliente = get_object_or_404(Cliente, usuario=request.user)

            try:
                if (request.data.get('cuenta')):
                    cuenta = Cuenta.objects.get(pk=request.data['cuenta'], customer=cliente)
            except Cuenta.DoesNotExist:
                raise Http404("Cuenta no encontrada para el cliente autenticado")

        serializer = PrestamoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, pk=None):

        if IsEmployeePermission().has_permission(request, self):
            if pk:
                cliente = get_object_or_404(Cliente, pk=pk)
            else:
                return Response({'Message': 'ID de cliente requerido'},status=status.HTTP_400_BAD_REQUEST)
        else:
            cliente = get_object_or_404(Cliente, usuario=request.user)

        cuentas = Cuenta.objects.filter(customer=cliente)
        prestamos = Prestamo.objects.filter(cuenta__in=cuentas)
        serializer = PrestamoSerializer(prestamos, many=True)
        return Response(serializer.data)

    def put(self, request, pk):
        if IsEmployeePermission().has_permission(request, self):
            prestamo = get_object_or_404(Prestamo, pk=pk)
            if not prestamo.aprobado:
                serializer = PrestamoSerializer(prestamo, data={'aprobado': True}, partial=True)
                if serializer.is_valid():
                    serializer.save()
                    cuenta = Cuenta.objects.get(pk=prestamo.cuenta.id)
                    cuenta.balance += prestamo.monto
                    cuenta.save()
                    Movimientos.objects.create(balance=cuenta.balance, monto=prestamo.monto, tipo_operacion='aprobacion prestamo', cuenta=cuenta, destino='n/a')
                    return Response(serializer.data)
                else:
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({"message": 'El prestamo ya ha sido aprobado.'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"message": 'No tiene permiso para realizar esta acción, contacte a un empleado.'}, status=status.HTTP_401_UNAUTHORIZED)

    def delete(self, request, pk):
        # Solo el personal autorizado puede anular prestamos
        if not IsEmployeePermission().has_permission(request, self):
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        
        prestamo = get_object_or_404(Prestamo, pk=pk)
        if prestamo.aprobado:
            cuenta = Cuenta.objects.get(pk=prestamo.cuenta.id)
            cuenta.balance -= prestamo.monto
            cuenta.save()
            Movimientos.objects.create(balance=cuenta.balance, monto=0-prestamo.monto, tipo_operacion='anular prestamo', cuenta=cuenta, destino='n/a')
        prestamo.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class ListarPrestamosSucursal(generics.ListAPIView):
    serializer_class = PrestamoSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = 'sucursal'

    def get_queryset(self):
        if IsEmployeePermission().has_permission(self.request, self):
            pk = self.kwargs.get('pk')
            
            if pk:
                return Prestamo.objects.filter(sucursal__pk=pk)
            
            return Prestamo.objects.all()
        else:
            self.custom_message = {'message': 'No tiene permiso para realizar esta acción, contacte a un empleado.'}
            return Prestamo.objects.none()
        
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        if hasattr(self, 'custom_message'):
            return Response(self.custom_message, status=status.HTTP_401_UNAUTHORIZED)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

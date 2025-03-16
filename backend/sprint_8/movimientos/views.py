from rest_framework import generics, permissions
from rest_framework.views import APIView
from rest_framework import status
from sprint_8.models import Cliente, Cuenta, Movimientos, Tipo_Cliente, Tipo_Cuenta
from .serializers import MovimientoSerializer, TransferenciaSerializer
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from decimal import Decimal
from django.forms.models import model_to_dict
from sprint_8.permissions import IsEmployeePermission


class ListarMovimientos(generics.ListAPIView):
    serializer_class = MovimientoSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        cuenta_id = self.kwargs.get('pk')
        if IsEmployeePermission().has_permission(self.request, self):
            if cuenta_id:
                return Movimientos.objects.filter(cuenta=cuenta_id).order_by('-hora')
            else:
                self.custom_message = {'message': 'ID de cuenta requerido'}
                return Movimientos.objects.none()
        else:
            cliente = get_object_or_404(Cliente, usuario=self.request.user)
            cuentas = Cuenta.objects.filter(customer=cliente)
            if cuenta_id:
                cuentas = cuentas.filter(pk=cuenta_id)
            return Movimientos.objects.filter(cuenta__in=cuentas).order_by('-hora')

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        if hasattr(self, 'custom_message'):
            return Response(self.custom_message, status=status.HTTP_400_BAD_REQUEST)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
    
# transferir(iban (del destino), monto, cuenta (id del origen))
class Transferencias(APIView):
    serializer_class = TransferenciaSerializer
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        data = request.data
        rechazado = False
        try:
            if IsEmployeePermission().has_permission(self.request, self):
                cuenta = get_object_or_404(Cuenta, pk=data['cuenta'])
                cliente = get_object_or_404(Cliente, pk=cuenta.customer.id)
            else:
                cliente = get_object_or_404(Cliente, usuario=self.request.user)
                cuenta = get_object_or_404(Cuenta, pk=data['cuenta'], customer=cliente)
            destino = Cuenta.objects.get(cbu=data['destino'])

            descubierto = 0
            if Tipo_Cuenta.objects.get(pk=cuenta.tipo_cuenta.id).tipo == 'cuenta corriente':
                tipo_cliente = Tipo_Cliente.objects.get(pk=cliente.entidad_cliente.id)
                descubierto = tipo_cliente.max_descubierto

            cliente_destino = Cliente.objects.get(pk=destino.customer.id)
            descubierto_destino = 0
            tipo_cliente_destino = Tipo_Cliente.objects.get(pk=cliente_destino.entidad_cliente.id)
            comision_destino = round(Decimal(data['monto']) * tipo_cliente_destino.comision_transferencia / 100, 2)
            if Tipo_Cuenta.objects.get(pk=destino.tipo_cuenta.id).tipo == 'cuenta corriente':
                descubierto_destino = tipo_cliente_destino.max_descubierto
            if (comision_destino > (destino.balance + descubierto_destino)) or (Decimal(data['monto']) > (cuenta.balance + descubierto)) or (Decimal(data['monto']) > tipo_cliente_destino.max_transferencia_recibida):
                rechazado = True
            
            if rechazado == False:
                destino.balance += Decimal(data['monto']) - comision_destino
                destino.save()
                Movimientos.objects.create(balance=destino.balance, monto=Decimal(data['monto'])- comision_destino, tipo_operacion='transferencia recibida', cuenta=destino, destino='n/a')
                cuenta.balance -= Decimal(data['monto'])
                cuenta.save()
                mov2 = Movimientos.objects.create(balance=cuenta.balance, monto=0-Decimal(data['monto']), tipo_operacion='transferencia enviada a: ' + data['destino'], cuenta=cuenta, destino=data['destino'])
                return Response({'obj': model_to_dict(mov2), 'message': 'enviado'}, status=status.HTTP_201_CREATED)
            else:
                return Response({'message': 'rechazado'}, status=status.HTTP_400_BAD_REQUEST)
        except KeyError as e:
            return Response({'message': f'Falta el campo {str(e)}'}, status=status.HTTP_400_BAD_REQUEST)
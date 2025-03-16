from rest_framework import serializers
from sprint_8.models import Movimientos

class MovimientoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movimientos
        fields = ['balance', 'monto', 'tipo_operacion', 'hora', 'cuenta', 'destino']

class TransferenciaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movimientos
        fields = ['id', 'balance', 'monto', 'tipo_operacion', 'hora', 'cuenta', 'destino']
        read_only_fields = ['id', 'balance', 'tipo_operacion']

from rest_framework import serializers
from sprint_8.models import Tarjeta

class TarjetaSerializer(serializers.ModelSerializer):
    tipo = serializers.CharField(source='tipo_tarjeta.tipo', read_only=True)
    marca = serializers.CharField(source='tipo_tarjeta.marca', read_only=True)
    class Meta:
        model = Tarjeta
        fields = ['id','numero', 'cvv', 'fecha_otorgamiento', 'fecha_expiracion', 'tipo', 'marca', 'tipo_tarjeta', 'cliente']
        read_only_fields = ['id']
        extra_kwargs = {
            'tipo_tarjeta': {'write_only': True},
        }
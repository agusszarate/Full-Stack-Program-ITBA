from rest_framework import serializers
from sprint_8.models import Cuenta

class CuentaSerializer(serializers.ModelSerializer):
    tipo = serializers.CharField(source='tipo_cuenta.tipo', read_only=True)
    class Meta:
        model = Cuenta
        fields = ['id','balance', 'cbu', 'tipo', 'tipo_cuenta', 'customer']
        read_only_fields = ['id']
        extra_kwargs = {
            'tipo_cuenta': {'write_only': True},
        }
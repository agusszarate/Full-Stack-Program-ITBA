from rest_framework import serializers
from sprint_8.direcciones.serializers import DireccionSerializer
from sprint_8.models import Sucursal

class SucursalSerializer(serializers.ModelSerializer):
    branch_address = DireccionSerializer(read_only=True)
    class Meta:
        model = Sucursal
        fields = ['id', 'branch_number', 'branch_name', 'branch_address']
        read_only_fields = ['id']

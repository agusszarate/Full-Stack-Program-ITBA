from rest_framework import serializers
from sprint_8.models import Prestamo

class PrestamoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Prestamo
        fields = ['id', 'monto', 'fecha_inicio', 'aprobado', 'cuenta', 'sucursal']
        read_only_fields = ['id']
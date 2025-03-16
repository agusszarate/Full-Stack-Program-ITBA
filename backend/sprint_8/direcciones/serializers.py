from rest_framework import serializers
from sprint_8.models import Direccion

class DireccionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Direccion
        fields = '__all__'
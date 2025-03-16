from rest_framework import serializers
from sprint_8.serializers import UserSerializer
from sprint_8.cuentas.serializers import CuentaSerializer
from sprint_8.tarjetas.serializers import TarjetaSerializer
from sprint_8.models import Cliente, Direccion
from sprint_8.direcciones.serializers import DireccionSerializer
from django.contrib.auth.models import User

class ClienteSerializer(serializers.ModelSerializer):
    usuario = UserSerializer()  # Anidar el serializer de User
    direcciones = DireccionSerializer(many=True)
    tipo_cliente = serializers.CharField(source='entidad_cliente.tipo', read_only=True)
    tarjetas = TarjetaSerializer(many=True, read_only=True, source='tarjeta_set')
    cuentas = CuentaSerializer(many=True, read_only=True, source='cuenta_set')

    class Meta:
        model = Cliente
        fields = ['id', 'customer_name', 'customer_surname', 'customer_dni', 'dob', 'tipo_cliente', 'entidad_cliente', 'usuario', 'direcciones', 'tarjetas', 'cuentas']

    def create(self, validated_data):
        # Extraer datos anidados
        user_data = validated_data.pop('usuario')  # Datos del usuario
        direcciones_data = validated_data.pop('direcciones', [])  # Lista de direcciones
        
        # Crear el usuario
        user = User.objects.create_user(**user_data)
        
        # Crear el cliente sin las direcciones
        cliente = Cliente.objects.create(usuario=user, **validated_data)
        
        # Crear y asociar las direcciones al cliente
        for direccion_data in direcciones_data:
            direccion = Direccion.objects.create(**direccion_data)
            cliente.direcciones.add(direccion)  # Asociar la dirección al cliente
        
        return cliente
from rest_framework import serializers
from django.contrib.auth.models import User
from sprint_8.models import Empleado

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password']
        extra_kwargs = {'password': {'write_only': True}}

class EmpleadoSerializer(serializers.ModelSerializer):
    
    user = UserSerializer()
    branch_name = serializers.CharField(source='branch.branch_name', read_only=True)

    class Meta:
        model = Empleado
        fields = ['id', 'branch', 'branch_name', 'employee_name', 'employee_surname', 'employee_dni', 'employee_hire_date', 'user']

    def create(self, validated_data):
        
        user_data = validated_data.pop('user')
        
        user = User.objects.create_user(username=user_data['username'], password=user_data['password'])
        
        empleado = Empleado.objects.create(user=user, **validated_data)
        return empleado

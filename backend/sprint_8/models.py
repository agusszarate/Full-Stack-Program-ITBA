from django.forms import ValidationError
from django.shortcuts import get_object_or_404
from django.utils import timezone
from django.db import models
from django.contrib.auth.models import User
from django.dispatch import receiver
from django.db.models.signals import pre_save

class Auditoria_Cuenta(models.Model):
    old_id = models.IntegerField()
    new_id = models.IntegerField()
    old_balance = models.DecimalField(max_digits=12, decimal_places=2)
    new_balance = models.DecimalField(max_digits=12, decimal_places=2)
    old_cbu = models.CharField(max_length=30)
    new_cbu = models.CharField(max_length=30)
    old_type = models.CharField(max_length=30)
    new_type = models.CharField(max_length=30)
    user_action = models.CharField(max_length=30)
    created_at = models.DateTimeField(auto_now_add=True)

class Tipo_Cliente(models.Model):
    tipo = models.CharField(max_length=30)
    cantidad_tarjeta_debito = models.IntegerField()
    cantidad_tarjeta_credito = models.IntegerField()
    cantidad_chequera = models.IntegerField()
    caja_ahorro_pesos = models.BooleanField()
    caja_ahorro_dolares = models.BooleanField()
    cuenta_corriente = models.BooleanField()
    max_descubierto = models.DecimalField(max_digits=12, decimal_places=2)
    max_retiro_diario = models.DecimalField(max_digits=12, decimal_places=2)
    comision_transferencia = models.DecimalField(max_digits=12, decimal_places=2)
    max_transferencia_recibida = models.DecimalField(max_digits=12, decimal_places=2)
    autorizar_transferencia = models.BooleanField()

class Tipo_Cuenta(models.Model):
    tipo = models.CharField(max_length=30)
    moneda = models.CharField(max_length=30)

class Direccion(models.Model):
    calle = models.CharField(max_length=30)
    ciudad = models.CharField(max_length=30)
    provincia = models.CharField(max_length=30)
    pais = models.CharField(max_length=30)

class Tipo_Tarjeta(models.Model):
    marca = models.CharField(max_length=30)
    tipo = models.CharField(max_length=30)

class Sucursal(models.Model):
    branch_number = models.IntegerField()
    branch_name = models.CharField(max_length=30)
    branch_address = models.ForeignKey(Direccion, on_delete=models.CASCADE)

class Cliente(models.Model):
    customer_name = models.CharField(max_length=30)
    customer_surname = models.CharField(max_length=30)
    customer_dni = models.CharField(max_length=30)
    dob = models.DateField(default=timezone.now)
    direcciones = models.ManyToManyField(Direccion)
    entidad_cliente = models.ForeignKey('Tipo_Cliente', on_delete=models.CASCADE)
    usuario = models.OneToOneField(User, on_delete=models.CASCADE)

class Tarjeta(models.Model):
    def default_expiration_date():
        return timezone.localdate() + timezone.timedelta(days=5*365)
    
    numero = models.CharField(max_length=20, unique=True)
    cvv = models.IntegerField()
    fecha_otorgamiento = models.DateField(default=timezone.localdate)
    # fecha_expiracion = models.DateField(default=timezone.localdate)
    tipo_tarjeta = models.ForeignKey(Tipo_Tarjeta, on_delete=models.CASCADE)

    fecha_expiracion = models.DateField(default=default_expiration_date)
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE)

class Cuenta(models.Model):
    customer = models.ForeignKey(Cliente, on_delete=models.CASCADE)
    balance = models.DecimalField(max_digits=12, decimal_places=2)
    cbu = models.CharField(max_length=30, unique=True)
    tipo_cuenta = models.ForeignKey(Tipo_Cuenta, on_delete=models.CASCADE)

class Movimientos(models.Model):
    cuenta = models.ForeignKey(Cuenta, on_delete=models.CASCADE)
    balance = models.DecimalField(max_digits=12, decimal_places=2)
    monto = models.DecimalField(max_digits=12, decimal_places=2)
    tipo_operacion = models.CharField(max_length=30)
    hora = models.DateTimeField(default=timezone.now)
    destino = models.CharField(max_length=30)

class Empleado(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True ,  related_name='empleado')
    employee_name = models.CharField(max_length=30)
    employee_surname = models.CharField(max_length=30)
    employee_hire_date = models.DateField(default=timezone.now)
    employee_dni = models.CharField(max_length=30)
    branch = models.ForeignKey(Sucursal, on_delete=models.CASCADE)

class Prestamo(models.Model):
    monto = models.DecimalField(max_digits=10, decimal_places=2)
    fecha_inicio = models.DateField(default=timezone.now)
    aprobado = models.BooleanField(default=False)
    cuenta = models.ForeignKey(Cuenta, on_delete=models.CASCADE)
    sucursal = models.ForeignKey(Sucursal, on_delete=models.CASCADE)
        
    def clean(self):
        limites = {'BLACK': 500000, 'GOLD': 300000, 'CLASSIC': 100000}
        cuenta = get_object_or_404(Cuenta, pk=self.cuenta.id)
        cliente = get_object_or_404(Cliente, pk=cuenta.customer.id)
        tipo = get_object_or_404(Tipo_Cliente, pk=cliente.entidad_cliente.id)
        if self.monto <= limites[tipo.tipo] and self.aprobado == False:
                self.aprobado = True
                cuenta.balance += self.monto
                cuenta.save()
                Movimientos.objects.create(balance=cuenta.balance, monto=self.monto, tipo_operacion='prestamo', cuenta=cuenta, destino='n/a')
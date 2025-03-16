from django.contrib import admin
from .models import Cliente, Tipo_Cliente, Cuenta, Tipo_Cuenta, Tarjeta, Tipo_Tarjeta, Movimientos, Sucursal, Direccion, Auditoria_Cuenta, Empleado, Prestamo

# Register your models here.
admin.site.register(Cliente)
admin.site.register(Tipo_Cliente)
admin.site.register(Cuenta)
admin.site.register(Tipo_Cuenta)
admin.site.register(Tarjeta)
admin.site.register(Tipo_Tarjeta)
admin.site.register(Movimientos)
admin.site.register(Sucursal)
admin.site.register(Direccion)
admin.site.register(Auditoria_Cuenta)
admin.site.register(Empleado)
admin.site.register(Prestamo)
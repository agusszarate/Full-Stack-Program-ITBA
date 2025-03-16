from django.urls import include, path
from .views import LoginView

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('cliente/', include('sprint_8.cliente.urls')),
    path('cuentas/', include('sprint_8.cuentas.urls')),
    path('tarjetas/', include('sprint_8.tarjetas.urls')),
    path('prestamos/', include('sprint_8.prestamos.urls')),
    path('sucursales/', include('sprint_8.sucursales.urls')),
    path('direcciones/', include('sprint_8.direcciones.urls')),
    path('movimientos/', include('sprint_8.movimientos.urls')),
    path('empleados/', include('sprint_8.empleados.urls')),
]


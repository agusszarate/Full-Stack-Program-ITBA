from django.urls import path
from .views import ListarPrestamosSucursal, PrestamoView

urlpatterns = [
    path('', PrestamoView.as_view(), name='prestamos'),
    path('<int:pk>/', PrestamoView.as_view(), name='prestamo'),
    path('sucursales/', ListarPrestamosSucursal.as_view(), name='prestamos-sucursales' ),
    path('sucursales/<int:pk>/', ListarPrestamosSucursal.as_view(), name='prestamos-sucursal' )
]


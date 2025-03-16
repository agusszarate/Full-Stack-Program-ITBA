from django.urls import path
from .views import ListarSucursalesView

urlpatterns = [
    path('', ListarSucursalesView.as_view(), name='sucursales'),
]
from django.urls import path
from .views import CuentaAPIView

urlpatterns = [
    path('', CuentaAPIView.as_view(), name='cuentas'),
    path('<int:pk>/', CuentaAPIView.as_view(), name='cuentas'),
]


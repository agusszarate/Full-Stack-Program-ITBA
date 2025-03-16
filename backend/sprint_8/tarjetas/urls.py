from django.urls import path
from .views import TarjetaAPIView

urlpatterns = [
    path('', TarjetaAPIView.as_view(), name='tarjetas'),
    path('<int:pk>/', TarjetaAPIView.as_view(), name='tarjeta'),
]


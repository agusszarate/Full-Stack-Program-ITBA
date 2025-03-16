from django.urls import path
from .views import DireccionesView

urlpatterns = [
    path('', DireccionesView.as_view(), name='direcciones'),
    path('<int:pk>/', DireccionesView.as_view(), name='direccion'),
]
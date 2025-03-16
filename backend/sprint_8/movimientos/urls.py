from django.urls import path
from .views import ListarMovimientos, Transferencias

urlpatterns = [
    path('', ListarMovimientos.as_view(), name='listar-movimientos'),
    path('<int:pk>/', ListarMovimientos.as_view(), name='listar-movimientos'),
    path('transferir/', Transferencias.as_view(), name='transferencias'),
]


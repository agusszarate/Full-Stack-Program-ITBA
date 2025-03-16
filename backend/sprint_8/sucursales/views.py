from rest_framework import generics
from sprint_8.models import Sucursal
from .serializers import SucursalSerializer
from rest_framework.permissions import AllowAny

class ListarSucursalesView(generics.ListAPIView):
    serializer_class = SucursalSerializer
    queryset = Sucursal.objects.all()
    permission_classes = [AllowAny]
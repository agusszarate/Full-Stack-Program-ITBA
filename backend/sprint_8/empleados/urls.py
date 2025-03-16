from django.urls import path
from .views import EmpleadoAPIView

urlpatterns = [
    path('', EmpleadoAPIView.as_view(), name='empleados'),
    (path('<int:pk>/', EmpleadoAPIView.as_view(), name='empleados'))
]
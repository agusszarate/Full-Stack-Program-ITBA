from django.urls import path
from .views import ClienteAPIView

urlpatterns = [
    path('', ClienteAPIView.as_view(), name='cliente'),
    path('<int:pk>/', ClienteAPIView.as_view(), name='cliente')
]


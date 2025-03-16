from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from sprint_8.models import Empleado
from .serializers import EmpleadoSerializer

class EmpleadoAPIView(APIView):
    permission_classes = [permissions.IsAdminUser]

    def get(self, request, pk=None):

        if pk:            
            empleado = Empleado.objects.filter(pk=pk).first()
            if not empleado:
                return Response({"detail": "Empleado no encontrado."}, status=status.HTTP_404_NOT_FOUND)
            serializer = EmpleadoSerializer(empleado)
        else:            
            empleados = Empleado.objects.all()
            serializer = EmpleadoSerializer(empleados, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        
        serializer = EmpleadoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk=None):
        if not pk:
            return Response({"detail": "ID de empleado no proporcionado."}, status=status.HTTP_400_BAD_REQUEST)
        
        empleado = Empleado.objects.filter(pk=pk).first()
        if not empleado:
            return Response({"detail": "Empleado no encontrado."}, status=status.HTTP_404_NOT_FOUND)
        
        empleado.delete()
        return Response({"detail": "Empleado eliminado con éxito."}, status=status.HTTP_204_NO_CONTENT)

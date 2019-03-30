from movies.models import movie

from .serializers import movieSerializer

from rest_framework import viewsets, permissions


# movieViewset

class movieViewSet(viewsets.ModelViewSet):
    queryset = movie.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = movieSerializer

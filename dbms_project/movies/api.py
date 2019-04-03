from movies.models import movie, Movies

from .serializers import movieSerializer, MoviesSerializer

from rest_framework import viewsets, permissions

from rest_framework.views import APIView
from rest_framework.response import Response
from django.db import connection

# movieViewset


class movieViewSet(viewsets.ModelViewSet):
    queryset = movie.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = movieSerializer


class MoviesView(APIView):
    def get(self, request):
        movies = Movies.objects.raw('SELECT * FROM movies_movies')

        serializer = MoviesSerializer(movies, many=True)
        return Response(serializer.data)

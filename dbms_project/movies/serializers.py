from rest_framework import serializers
from movies.models import movie, Movies

# movie Serializer


class movieSerializer(serializers.ModelSerializer):
    class Meta:
        model = movie
        fields = '__all__'


class MoviesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movies
        fields = '__all__'

from rest_framework import serializers
from movies.models import Movies, testmodel

# movie Serializer


class MoviesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movies
        fields = '__all__'


class TestSerializer(serializers.ModelSerializer):
    class Meta:
        model = testmodel
        fields = '__all__'

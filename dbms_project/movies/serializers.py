from rest_framework import serializers
from movies.models import movie

# movie Serializer


class movieSerializer(serializers.ModelSerializer):
    class Meta:
        model = movie
        fields = '__all__'

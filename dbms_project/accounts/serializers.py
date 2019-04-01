from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .models import UserProfile

from rest_framework.response import Response
from rest_framework import status

# User Serializer


# User Profile Serializer
class UserProfileSerializer(serializers.ModelSerializer):
    #user = UserSerializer(required=True)

    class Meta:
        model = UserProfile
        fields = ('user', 'city', 'phone', 'image',)


class UserSerializer(serializers.ModelSerializer):
    userprofile = UserProfileSerializer(required=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'first_name',
                  'last_name', 'email', 'userprofile')

    def create(self, validated_data):
        user_data = validated_data.pop('userprofile')
        user = User.objects.create(**validated_data)

        for userprof in user_data:
            UserProfile.objects.create(user=user, **userprof)

        return user

    def update(self, instance, validated_data):
        user_data = validated_data.pop('userprofile')
        user_data123 = (instance.userprofile).all()
        user_data123 = list(userprofile)

        instance.username = validated_data.get('username', instance.username)
        instance.first_name = validated_data.get(
            'first_name', instance.first_name)
        instance.last_name = validated_data.get(
            'last_name', instance.last_name)
        instance.password = validated_data.get(
            'password', instance.password)
        instance.save()

        for userprof in user_data:
            user123 = user_data123.pop(0)
            user123.city = userprof.get('city', user123.city)
            user123.phone = userprof.get('phone', user123.phone)
            user123.image = userprof.get('image', user123.image)
            user123.save()

        return instance


# Register Serializer

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            validated_data['username'], validated_data['email'], validated_data['password'])

        return user

# Login Serializer


class LoginSerializer(serializers.Serializer):

    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)

        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Credentials")

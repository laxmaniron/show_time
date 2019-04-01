from rest_framework import generics, permissions, viewsets
from rest_framework.response import Response
from knox.models import AuthToken

from .serializers import UserSerializer, UserProfileSerializer, RegisterSerializer, LoginSerializer

from .models import UserProfile
from django.contrib.auth.models import User

from rest_framework.response import Response
from rest_framework import status


# Register API
class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        serializer.is_valid(raise_exception=True)

        user = serializer.save()

        kp = AuthToken.objects.create(user)

        #   print(kp[0], '.....', kp[1])

        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": kp[1]
        })


# UserProfile API
class UserProfileViewSet(generics.ListCreateAPIView):

    serializer_class = UserProfileSerializer
    queryset = UserProfile.objects.all()


class UserProfileUpdate(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = UserProfileSerializer
    queryset = UserProfile.objects.all()


class UserListView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()


# Login API

class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        serializer.is_valid(raise_exception=True)

        user = serializer.validated_data

        kp = AuthToken.objects.create(user)

        #   print(kp[0], '.....', kp[1])

        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": kp[1]
        })


# Get User API

class UserAPI(generics.RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user
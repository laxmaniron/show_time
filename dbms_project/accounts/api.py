from rest_framework import generics, permissions, viewsets
from rest_framework.response import Response
from knox.models import AuthToken

from .serializers import UserSerializer, UserProfileSerializer, RegisterSerializer, LoginSerializer, FileUploadSerializer, NewUserProfileSerializer, NewUserSerializer

from .models import UserProfile
from django.contrib.auth.models import User

from rest_framework.views import APIView

from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import FormParser, MultiPartParser

from django.db import connection


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


# Create user profile api

class NewUserProfileRecordView(viewsets.ModelViewSet):

    queryset = UserProfile.objects.all()
    permission_classes = [
        permissions.AllowAny,
    ]

    serializer_class = NewUserProfileSerializer


class UserProfileView(generics.RetrieveUpdateDestroyAPIView):

    serializer_class = NewUserProfileSerializer
    #queryset = UserProfile.objects.all()

    # def get_queryset(self):
    #     """
    #     This view should return a list of all the purchases
    #     for the currently authenticated user.
    #     """
    #     #user = self.request.user
    #     pk = self.kwargs['pk']
    #     return UserProfile.objects.get(pk=pk)


#  user_id = self.kwargs['pk']

#         with connection.cursor() as cursor:
#             cursor.execute(
#                 "SELECT * FROM accounts_userprofile WHERE user_id=%s", [user_id])
#             # print(cursor.fetchone())
#             tt = cursor.fetchone()
#             print(".....hello", tt)

#             tt = UserProfile.objects.get(pk=user_id)
#             print(".....hello", tt, type(tt))
#         return UserProfile.objects.get(pk=user_id)

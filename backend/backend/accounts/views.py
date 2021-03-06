from django.shortcuts import render
from django.contrib.auth.models import User, Group
from rest_framework import viewsets, generics,permissions
from rest_framework.response import Response
from knox.models import AuthToken
from .serializers import UserSerializer, GroupSerializer, EmployerSerializer,UserSecretPasswordSerializer,\
    EmployerRegisterSerializer,EmployeeRegisterSerializer,\
    EmployeeLoginSerializer, EmployerLoginSerializer     #,RegisterSerializer, LoginSerializer


class UserAPIView(generics.RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = UserSecretPasswordSerializer

    def get_object(self):
        return self.request.user

"""class RegisterAPIView(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })
"""

class EmployeeLoginAPIView(generics.GenericAPIView):
    serializer_class = EmployeeLoginSerializer
    permission_classes = () # empty tuple 
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })

class EmployerLoginAPIView(generics.GenericAPIView):
    serializer_class = EmployerLoginSerializer
    authentication_classes = ()
    permission_classes = ()

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })

class EmployeeRegisterAPIView(generics.GenericAPIView):
    serializer_class = EmployeeRegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        employee = serializer.save()
        return Response({
            "employee": EmployeeSerializer(employee, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(employee.user)[1]
        })


class EmployerRegisterAPIView(generics.GenericAPIView):
    serializer_class = EmployerRegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        employer = serializer.save()
        return Response({
            "employer": EmployerSerializer(employer, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(employer.user)[1]
        })
"""class LoginAPIView(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })
"""
class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]

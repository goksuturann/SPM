from django.contrib.auth.models import User, Group
from django.contrib.auth import authenticate
from .models import ApiUser, Employer, Employee
from rest_framework import serializers

User._meta.get_field('email')._unique = True

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class ApiUserSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only = True )
    
    class Meta:
        model = ApiUser
        fields = ['is_employer', 'is_employee']

class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = ApiUser
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            validated_data['username'],
            validated_data['email'],
            validated_data['password']
        )

        return user


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Credentials")
from django.contrib.auth.models import Group
from django.contrib.auth import authenticate
from .models import User, Employer, Employee
from rest_framework import serializers
from jobs.serializers import JobSerializer

User._meta.get_field('email')._unique = True

class UserSecretPasswordSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'is_employer', 'is_employee']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'is_employer', 'is_employee']

class EmployeeSerializer(serializers.ModelSerializer):
    user = UserSerializer(required=True)
    jobs = JobSerializer(many=True)
    class Meta:
        model = Employee
        fields = ['user', 'position','company','jobs']

class EmployerSerializer(serializers.ModelSerializer):
    user = UserSerializer(required=True)
    jobs = JobSerializer(many=True)
    class Meta:
        model = Employer
        fields = ['user', 'company', 'jobs']
class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']

class EmployerRegisterSerializer(serializers.ModelSerializer):
    user = UserSerializer(required=True)
    
    class Meta:
        model = Employer
        fields = ('user', 'company')
        extra_kwargs = {'password': {'write_only': True}, 'username': {'write_only': True}}

    def create(self, validated_data, *args, **kwargs):
        user = User.objects.create_user(validated_data['user']['username'], validated_data['user']['email'],
                                        validated_data['user']['password'], is_employer=True)
        if(validated_data['company']):
            employer = Employer.objects.create(user=user, company=validated_data.pop('company'))
        else:
            employer = Employer.objects.create(user=user)

        return employer


class EmployeeRegisterSerializer(serializers.ModelSerializer):
    user = UserSerializer(required=True)

    class Meta:
        model = Employee
        fields = ('user', 'company', 'position')
        extra_kwargs = {'password': {'write_only': True}, 'username': {'write_only': True}}

    def create(self, validated_data, *args, **kwargs):
        user = User.objects.create_user(validated_data['user']['username'], validated_data['user']['email'],
                                        validated_data['user']['password'], is_employee=True)
        if(validated_data['company']):
            if(validated_data['position']):
                employee = Employee.objects.create(user=user, company=validated_data.pop('company'), position=validated_data.pop('position'))
            else:
                employee = Employee.objects.create(user=user, company=validated_data.pop('company'))
        else:
            employee = Employee.objects.create(user=user)
        return employee


class EmployeeLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active and user.is_employee:
            return user
        raise serializers.ValidationError("Incorrect Credentials")

class EmployerLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active and user.is_employer:
            return user
        raise serializers.ValidationError("Incorrect Credentials")

"""class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            validated_data['username'],
            validated_data['email'],
            validated_data['password']
        )

        return user

"""
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Credentials")


from django.contrib.auth.models import User, Group
from backend.backend.models import User, Employer, Employee
from rest_framework import serializers


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'groups']

class EmployerSerializer(serializers.ModelSerializer)
    user = UserSerializer(read_only = true )
    
    class Meta:
        model = Employer
        fields = ['']

class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']
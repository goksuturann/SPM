from django.contrib.auth.models import User
from django.db import models


# Create your models here.

class ApiUser(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    is_employer = models.BooleanField(default=False)
    is_employee = models.BooleanField(default=False)

class Employer(models.Model):
    user = models.OneToOneField(ApiUser, on_delete=models.CASCADE, primary_key=True)
    company = models.CharField(max_length=30)

class Employee(models.Model):
    user = models.OneToOneField(ApiUser, on_delete=models.CASCADE, primary_key=True)
    position = models.CharField(max_length=30)
    company= models.CharField(max_length=30)
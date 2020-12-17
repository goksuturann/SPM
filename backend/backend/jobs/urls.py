from django.contrib import admin
from django.urls import include, path
from rest_framework import routers
from .views import JobViewSet

router = routers.DefaultRouter()
router.register(r'jobs', views.JobViewSet)

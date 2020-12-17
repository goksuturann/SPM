from django.contrib import admin
from django.urls import include, path
from rest_framework import routers
from jobs import views

router = routers.DefaultRouter()
router.register(r'jobs', views.JobViewSet, basename="jobs")

urlpatterns = [
    path('', include(router.urls)),
]

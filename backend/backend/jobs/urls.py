from django.contrib import admin
from django.urls import include, path
from rest_framework import routers
from .views import JobViewSet

router = routers.SimpleRouter()
router.register(r'jobs', JobViewSet, basename="jobs")

urlpatterns = [
    path('', include(router.urls)),
]

from django.contrib.auth.models import Group
from rest_framework import viewsets
from django.http import HttpResponse

from django.core import serializers
from django.http import HttpResponse

from main.serializers import UserProfileSerializer

from .models import UserProfile


class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer


# -----------------------------------------------

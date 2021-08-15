from django.urls import path
from django.views.generic import base
from rest_framework import routers
from rest_framework.routers import DefaultRouter
from .api import CourseAPI, VideoAPI, ModuleAPI

router = DefaultRouter()
router.register("creator/course", CourseAPI, basename="creator_course")


urlpatterns = [
    path("creator/course/module/", ModuleAPI.as_view(), name="module_post"),
    path("creator/course/video/", VideoAPI.as_view(), name="module_post"),
]

urlpatterns += router.urls

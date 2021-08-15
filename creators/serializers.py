from rest_framework.serializers import ModelSerializer
from .models import Course, Module, VideoContent


class CourseSerializer(ModelSerializer):

    class Meta:
        model = Course
        exclude = ("author",)


class ModuleSerializer(ModelSerializer):

    class Meta:
        model = Module
        fields = "__all__"


class VideoSerializer(ModelSerializer):

    class Meta:
        model = VideoContent
        fields = "__all__"

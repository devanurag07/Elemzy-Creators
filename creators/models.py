from django.contrib.auth.models import User
from django.db import models
from main.models import UserProfile
# Create your models here.


class Creator(models.Model):
    user = models.OneToOneField(
        UserProfile, on_delete=models.CASCADE, related_name="creator")


class Course(models.Model):
    author = models.ForeignKey(Creator, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    description = models.TextField()
    price = models.IntegerField()
    learning_points = models.TextField()

    is_published = models.BooleanField(default=False)
    sales = models.BigIntegerField(default=0)


class Module(models.Model):
    title = models.CharField(max_length=2000)
    description = models.TextField()
    course = models.ForeignKey(
        Course, on_delete=models.CASCADE, related_name="modules")


class VideoContent(models.Model):
    title = models.CharField(max_length=2000)
    video = models.FileField(upload_to="creators/courses/modules")

    module = models.ForeignKey(
        Module, related_name="videoes", on_delete=models.CASCADE)

from django.contrib import admin
from .models import Creator, Module, Course, VideoContent
# Register your models here.


admin.site.register([Creator, Module, Course, VideoContent])

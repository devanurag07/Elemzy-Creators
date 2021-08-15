from rest_framework.generics import RetrieveAPIView
from rest_framework.views import APIView
from creators.models import Course, Creator
from inspect import currentframe
from django.http.response import JsonResponse
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from rest_framework import status


# Custom Serializers
from .serializers import CourseSerializer, ModelSerializer, ModuleSerializer, VideoSerializer
import pdb


# class CourseAPI(ModelViewSet):
#     # permission_classes = [IsAuthenticated]

#     def create(self, request, *args, **kwargs):
#         data = request.data

#         pdb.set_trace()

#         course_name = data.get("name", "")
#         course_price = data.get("price", "")
#         course_description = data.get("description", "")
#         course_learning_points = data.get("learning_points", "")

#         course_data = {
#             "title": course_name,
#             "description": course_description,
#             "learning_points": course_learning_points,
#             "price": course_price,
#         }

#         new_course_form = CourseSerializer(data=course_data)

#         if(new_course_form.is_valid()):
#             modules = data.get("modules", [])
#             pdb.set_trace()
#             for module in modules:
#                 module_data = {
#                     'title': module.get("name", ''),
#                     'description': module.get("description", ''),
#                 }

#                 module_idx = module.get("idx", '')

#                 new_module = ModuleSerializer(data=module_data)

#                 if(new_module.is_valid()):
#                     videoes = module.get("videoes", [])

#                     for video in videoes:
#                         ...
#                         pdb.set_trace()

#                 else:
#                     errors = new_module.errors
#                     return Response({"errors": {
#                         "modules": [errors]
#                     }}, status=status.HTTP_400_BAD_REQUEST)

#         else:
#             errors = new_course_form.errors
#             return Response({"errors": errors}, status=status.HTTP_400_BAD_REQUEST)

#         return Response("hello")


class CourseAPI(ModelViewSet):
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        creator = self.request.user.creator
        my_courses = Course.objects.filter(author=creator)

        return my_courses

    def list(self, request, *args, **kwargs):
        my_courses = self.get_queryset()
        my_courses_json = CourseSerializer(my_courses, many=True).data
        total_sales = sum([course.sales for course in my_courses])
        total_revenue = sum(
            [course.price*course.sales for course in my_courses])

        top_selling = CourseSerializer(
            my_courses.order_by("-sales")[:3], many=True).data

        return Response({
            "my_courses": my_courses_json,
            "total_revenue": total_revenue,
            "total_sales": total_sales,
            "top_selling": top_selling,
        })

    def create(self, request, *args, **kwargs):

        data = request.data
        course_form = CourseSerializer(data=data)

        if(course_form.is_valid()):

            course = course_form.save(author=request.user.creator)
            course_json = CourseSerializer(course).data

            return Response(course_json, status=status.HTTP_201_CREATED)

        else:
            errors = course_form.errors
            return Response({'errors': errors}, status=status.HTTP_400_BAD_REQUEST)


class ModuleAPI(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response("hello")

    def post(self, request, *args, **kwargs):
        currentCreator = request.user.creator
        module_form = ModuleSerializer(data=request.data)

        if(module_form.is_valid()):
            module_course = module_form.validated_data["course"]

            # Checking if module course is created by logged in creator
            isOwnerOfCourse = module_course.author == currentCreator
            if(isOwnerOfCourse):
                new_module = module_form.save()
                new_module_data = ModuleSerializer(new_module).data

                return Response(new_module_data, status=status.HTTP_201_CREATED)
            else:
                return Response("You can't add modules to this course", status=status.HTTP_401_UNAUTHORIZED)

        else:
            errors = module_form.errors
            return Response({"errors": errors}, status=status.HTTP_400_BAD_REQUEST)

        # if(currentCreator==)


class VideoAPI(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        currentCreator = request.user.creator
        video_form = VideoSerializer(data=request.data)

        if(video_form.is_valid()):
            module_course = video_form.validated_data["module"].course
            course_creator = module_course.author
            isOwnerOfCourse = course_creator == currentCreator

            if(isOwnerOfCourse):
                new_video = video_form.save()
                new_video_data = VideoSerializer(new_video).data
                return Response(new_video_data, status=status.HTTP_201_CREATED)

            else:
                return Response("You don't have access to the course", status=status.HTTP_401_UNAUTHORIZED)

        else:
            errors = video_form.errors

            return Response({"errors": errors}, status=status.HTTP_400_BAD_REQUEST)

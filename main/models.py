from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

from django.contrib.auth.models import AbstractBaseUser
from django.utils.translation import ugettext_lazy as _
from django.contrib.auth.models import PermissionsMixin

from .managers import CustomUserManager

from django.dispatch import receiver
from django.urls import reverse
from django_rest_passwordreset.signals import reset_password_token_created
from django.core.mail import send_mail


@receiver(reset_password_token_created)
def password_reset_token_created(
    sender, instance, reset_password_token, *args, **kwargs
):

    email_plaintext_message = "Your reset password reset key : {}. Please paste this in the form to reset password.".format(
        reset_password_token.key
    )

    send_mail(
        # title:
        "Password Reset for {title}".format(title="Reon"),
        # message:
        email_plaintext_message,
        # from:
        "noreply@reon.com",
        # to:
        [reset_password_token.user.email],
    )


# Create your models here.


class UserProfile(AbstractBaseUser, PermissionsMixin):
    firstname = models.CharField(
        max_length=50, verbose_name="First Name"
    )
    lastname = models.CharField(
        max_length=50, verbose_name="Last Name"
    )
    email = models.EmailField(_("email address"), unique=True)
    is_student = models.BooleanField(default=False)
    is_teacher = models.BooleanField(default=False)
    is_manager = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_creator = models.BooleanField(default=False)

    birthdate = models.DateField(
        null=True, blank=True, verbose_name="Birthdate")
    phone_number = models.CharField(
        max_length=16, blank=True, null=True, unique=True, verbose_name="Phone Number",
    )
    created_at = models.DateField(auto_now_add=True, verbose_name="Created at")
    updated_at = models.DateField(auto_now=True, verbose_name="Updated at")

    profile_pic = models.ImageField(
        upload_to="userprofilepics/", default="./default_profile_pic.jpg")

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return self.email

    class Meta:
        verbose_name_plural = "User Profiles"

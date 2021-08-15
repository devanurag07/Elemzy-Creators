# Generated by Django 3.1.5 on 2021-07-24 06:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0003_auto_20210724_0604'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='is_creator',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='userprofile',
            name='profile_pic',
            field=models.ImageField(default='./default_profile_pic.jpg', upload_to='userprofilepics/'),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='firstname',
            field=models.CharField(default='', max_length=50, verbose_name='First Name'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='lastname',
            field=models.CharField(default='', max_length=50, verbose_name='Last Name'),
            preserve_default=False,
        ),
    ]

# Generated by Django 3.1.5 on 2021-07-30 06:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('creators', '0003_videocontent_module'),
    ]

    operations = [
        migrations.AddField(
            model_name='course',
            name='description',
            field=models.TextField(default=''),
            preserve_default=False,
        ),
    ]

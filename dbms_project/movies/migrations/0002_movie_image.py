# Generated by Django 2.1.7 on 2019-03-31 00:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('movies', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='movie',
            name='image',
            field=models.ImageField(blank=True, upload_to='movie_images'),
        ),
    ]

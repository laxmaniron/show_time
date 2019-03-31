from django.db import models

# Create your models here.


class movie(models.Model):
    name = models.CharField(max_length=100)
    directed_by = models.CharField(max_length=100)
    message = models.CharField(max_length=500)
    image = models.ImageField(upload_to='movie_images', blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

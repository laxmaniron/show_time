from django.db import models

# Create your models here.


class movie(models.Model):
    name = models.CharField(max_length=100)
    directed_by = models.CharField(max_length=100)
    message = models.CharField(max_length=500)
    image = models.ImageField(upload_to='movie_images', blank=True)
    created_at = models.DateTimeField(auto_now_add=True)


class Movies(models.Model):
    title = models.CharField(max_length=200, unique=True)
    release_date = models.DateField()
    censor_rating = models.CharField(max_length=10)
    image_source = models.URLField()
    synopsis = models.CharField(max_length=1000)
    trailer_link = models.URLField()
    time_duration = models.CharField(max_length=10)
    likes = models.IntegerField()
    status = models.BooleanField()

    def __str__(self):
        return self.title

    class Meta:
        indexes = (models.Index(fields=['title']),)

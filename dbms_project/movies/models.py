from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.contrib.auth.models import User

# Create your models here.


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


class Cast_Crew(models.Model):
    title = models.ForeignKey(Movies, on_delete=models.CASCADE)
    cast = models.CharField(max_length=50, null=True)
    role = models.CharField(max_length=50, null=True)
    image = models.URLField(null=True)

    class Meta:
        indexes = (models.Index(fields=['title']),)


class Genre(models.Model):
    title = models.ForeignKey(Movies, on_delete=models.CASCADE)
    genre = models.CharField(max_length=20)

    class Meta:
        indexes = (models.Index(fields=['title']),)


class Languages(models.Model):
    title = models.ForeignKey(Movies, on_delete=models.CASCADE)
    language = models.CharField(max_length=20)

    class Meta:
        indexes = (models.Index(fields=['title']),)


class Rating(models.Model):
    title = models.ForeignKey(Movies, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    likestatus = models.BooleanField(default=False)
    ratestatus = models.BooleanField(default=False)
    rating = models.IntegerField(
        validators=[MinValueValidator(0), MaxValueValidator(5)], blank=True, null=True)
    comment = models.CharField(max_length=1000, blank=True, null=True)

    class Meta:
        indexes = (models.Index(fields=['title']),)


class testmodel(models.Model):
    title = models.CharField(max_length=20)
    genre = models.CharField(max_length=20)

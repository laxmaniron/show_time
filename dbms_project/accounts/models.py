from django.db import models

# Create your models here.
from django.contrib.auth.models import User

# Create your models here.

from movies.models import *


class UserProfile(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, primary_key=True)  # or models.CASCADE
    city = models.CharField(max_length=100, default='', blank=False)
    phone = models.IntegerField(default=0, blank=False)
    dob = models.DateField()
    image = models.ImageField(upload_to='profile_image', null=True)

    def __str__(self):
        return self.user.username


class TheatreSnacks(models.Model):
    snacks = models.CharField(max_length=50)
    image = models.URLField()
    price = models.CharField(max_length=100)


class LikeMovie(models.Model):
    title = models.ForeignKey(Movies, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    likes = models.IntegerField(
        validators=[MinValueValidator(0), MaxValueValidator(2)], blank=True, null=True)

    class Meta:
        indexes = (models.Index(fields=['title', 'user']),)
        unique_together = (('title', 'user'),)

    def __str__(self):
        return str(str(self.title)+'_'+str(self.user.username))

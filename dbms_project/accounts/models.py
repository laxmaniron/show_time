from django.db import models

# Create your models here.
from django.contrib.auth.models import User

# Create your models here.


class UserProfile(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE)  # or models.CASCADE
    city = models.CharField(max_length=100, default='', blank=False)
    phone = models.IntegerField(default=0, blank=False)
    image = models.ImageField(upload_to='profile_image', blank=True)

    def __str__(self):
        return self.user.username

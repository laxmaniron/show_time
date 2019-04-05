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


class Cities(models.Model):
    city = models.CharField(max_length=50, unique=True)


class City_Movie(models.Model):
    city = models.ForeignKey(Cities, on_delete=models.CASCADE)
    movie_title = models.ForeignKey(Movies, on_delete=models.CASCADE)

    class Meta:
        indexes = (models.Index(fields=['city']),)
        unique_together = (('city', 'movie_title'),)


class Cast_Crew(models.Model):
    castname = models.CharField(max_length=50, null=True)
    image = models.URLField(null=True)

    def __str__(self):
        return self.castname

    class Meta:
        indexes = (models.Index(fields=['id']),)


class Cast_Crew_Movie(models.Model):
    title = models.ForeignKey(Movies, on_delete=models.CASCADE)
    cast_crew = models.ForeignKey(Cast_Crew, on_delete=models.CASCADE)

    class Meta:
        indexes = (models.Index(fields=['title']),)
        unique_together = (('title', 'cast_crew'),)

    def __str__(self):
        return str(str(self.title)+'_'+str(self.cast_crew.castname))


class Genre(models.Model):
    genre = models.CharField(max_length=20, unique=True)

    def __str__(self):
        return self.genre

    class Meta:
        indexes = (models.Index(fields=['id']),)


class Genre_Movie(models.Model):
    title = models.ForeignKey(Movies, on_delete=models.CASCADE)
    movie_genre = models.ForeignKey(Genre, on_delete=models.CASCADE)

    class Meta:
        indexes = (models.Index(fields=['id']),)
        unique_together = (('title', 'movie_genre'),)

    def __str__(self):
        return str(str(self.title)+'_'+str(self.movie_genre.genre))


class Languages(models.Model):
    language = models.CharField(max_length=20, unique=True)

    def __str__(self):
        return self.language

    class Meta:
        indexes = (models.Index(fields=['id']),)


class Language_Movie(models.Model):
    title = models.ForeignKey(Movies, on_delete=models.CASCADE)
    movie_language = models.ForeignKey(Languages, on_delete=models.CASCADE)

    class Meta:
        indexes = (models.Index(fields=['title']),)
        unique_together = (('title', 'movie_language'),)

    def __str__(self):
        return str(str(self.title)+'_'+str(self.movie_language.language))


class Formats(models.Model):
    mformat = models.CharField(max_length=20, unique=True)

    class Meta:
        indexes = (models.Index(fields=['id']),)

    def __str__(self):
        return self.mformat


class Format_Movie(models.Model):
    title = models.ForeignKey(Movies, on_delete=models.CASCADE)
    movie_format = models.ForeignKey(Formats, on_delete=models.CASCADE)

    class Meta:
        indexes = (models.Index(fields=['title']),)
        unique_together = (('title', 'movie_format'),)

    def __str__(self):
        return str(str(self.title)+'_'+str(self.movie_format.mformat))


class Rating(models.Model):
    title = models.ForeignKey(Movies, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    likestatus = models.BooleanField(default=False)
    ratestatus = models.BooleanField(default=False)
    rating = models.IntegerField(
        validators=[MinValueValidator(0), MaxValueValidator(5)], blank=True, null=True)
    comment = models.CharField(max_length=10000, blank=True, null=True)

    class Meta:
        indexes = (models.Index(fields=['title', 'user']),)
        unique_together = (('title', 'user'),)

    def __str__(self):
        return str(str(self.title)+'_'+str(self.user.username))


class testmodel(models.Model):
    title = models.CharField(max_length=20)
    genre = models.CharField(max_length=20)

from django.db import models
from django.contrib.auth import get_user_model
# Create your models here.

class Movie(models.Model):
    title = models.CharField(max_length=100)
    release_date = models.DateField()
    vote_average = models.FloatField()
    overview = models.TextField()
    poster_path = models.CharField(max_length=200) 
    backdrop_path = models.CharField(max_length=200)
    original_title = models.CharField(max_length=100)
    popularity = models.FloatField()
    vote_count = models.IntegerField()
    movie_num = models.IntegerField()
    wish_movie = models.ManyToManyField(get_user_model(), symmetrical=False, related_name="wishmovie")


    def __str__(self):
        return self.title
from django.urls import path
from . import views

app_name = 'movies'

urlpatterns = [
    path('', views.index, name='index'),
    path('<int:movie_pk>/', views.movie_detail, name="movie_detail"),
    path('playing/', views.playing, name='playing'),
    path('recommend/', views.recommend, name="recommend")
]
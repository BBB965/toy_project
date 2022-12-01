from django.shortcuts import get_list_or_404, get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model


from .models import Movie
from .serializers import MovieSerializer, MovieListSerializer

# Create your views here.
@api_view(['GET'])
def index(request):
    movies = get_list_or_404(Movie)
    serializer = MovieListSerializer(movies, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def movie_detail(request, movie_pk):
    movie = get_object_or_404(Movie, pk=movie_pk)
    serializer = MovieSerializer(movie)
    return Response(serializer.data)


@api_view(['GET'])
def playing(request):
    movies = Movie.objects.all().order_by('-release_date')[:10]
    serializer = MovieListSerializer(movies, many=True)
    return Response(serializer.data)


@api_view(['GET','POST','DELETE'])
@permission_classes([IsAuthenticated])
def recommend(request):
    
    user = request.user 

    if request.method == 'GET':
        user_movie = user.wishmovie.all()
        if user_movie:
            serializer = MovieListSerializer(user_movie, many = True)
            return Response(serializer.data)
        else:
            context = {
                '영화추가'
            }
            return Response(context)
    
    elif request.method == 'POST': 
        data = request.data
        movie = get_object_or_404(Movie, pk = int(data['movie_id']))
        user_movie = user.wishmovie.all()
        if movie not in user_movie:
            user.wishmovie.add(movie)
            serializer = MovieListSerializer(user_movie, many=True)
            return Response(serializer.data)
        else:
            context ={
                '이미 추가한 영화'
            }
            return Response(context)
            
    elif request.method == 'DELETE':
        data = request.data
        movie = get_object_or_404(Movie, pk = int(data['movie_id']))
        user_movie = user.wishmovie.all()
        if movie in user_movie:
            user.wishmovie.remove(movie)
            serializer = MovieListSerializer(user_movie, many=True)
            return Response(serializer.data)
        else:
            context={
                '없는 영화'
            }
            return Response(context)

        

        


   
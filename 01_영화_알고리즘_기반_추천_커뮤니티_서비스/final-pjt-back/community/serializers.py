from rest_framework import serializers
from .models import Community, Comment

class CommunityListSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    movietitle = serializers.CharField(source='movie.title', read_only=True)
    movieposter = serializers.CharField(source='movie.backdrop_path', read_only=True)

    class Meta:
        model = Community
        fields ='__all__'

class CommentSerializer(serializers.ModelSerializer):
    
    username = serializers.CharField(source='user.username', read_only=True)
    
    class Meta:
        model = Comment
        fields = '__all__'
        read_only_fields = ('community','user',)

class CommunitySerializer(serializers.ModelSerializer):
    comment_set = CommentSerializer(many=True, read_only=True)
    comment_count = serializers.IntegerField(source='comment_set.count', read_only=True)
    username = serializers.CharField(source='user.username', read_only=True)
    movietitle = serializers.CharField(source='movie.title', read_only=True)
    movieposter = serializers.CharField(source='movie.poster_path', read_only=True)
    
    class Meta:
        model = Community
        fields = '__all__'
        read_only_fields = ('user',)

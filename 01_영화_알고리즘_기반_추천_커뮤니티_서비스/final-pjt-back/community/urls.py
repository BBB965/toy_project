# from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from django.urls import path
from .import views

app_name = 'community'

urlpatterns = [
    path('', views.community_list),
    path('<int:community_pk>/',views.community_detail),
    path('comments/', views.comment_list),
    path('comments/<int:comment_pk>/',views.comment_detail),
    path('<int:community_pk>/comments/',views.comment_create),
]

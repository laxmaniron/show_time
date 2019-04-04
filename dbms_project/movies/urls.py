from rest_framework import routers
from .api import MoviesView, TestPutView, TestView, MoviesCompleteView, LikeUpdateView, PostRatingView

from django.urls import path, include


router = routers.DefaultRouter()


# Trailing edge should be added when calling api

# router.register('api/test', movieViewSet, 'movies')

urlpatterns = router.urls

urlpatterns = [
    # path('', include(router.urls)),
    path('api/movies/', MoviesView.as_view()),
    path('api/movies/test/', TestView.as_view()),
    path('api/movies/test/<int:pk>', TestPutView.as_view()),
    path('api/movies/<int:pk>', MoviesCompleteView.as_view()),
    path('api/likeupdate/<int:pk>', LikeUpdateView.as_view()),
    path('api/ratingamovie', PostRatingView.as_view()),
]

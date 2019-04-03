from rest_framework import routers
from .api import MoviesView, TestView

from django.urls import path, include


router = routers.DefaultRouter()


# Trailing edge should be added when calling api

# router.register('api/test', movieViewSet, 'movies')

urlpatterns = router.urls

urlpatterns = [
    # path('', include(router.urls)),
    path('api/movies/', MoviesView.as_view()),
    path('api/movies/test', TestView.as_view()),
]

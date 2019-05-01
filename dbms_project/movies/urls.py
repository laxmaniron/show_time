from rest_framework import routers
from .api import *

from django.urls import path, include

from .views import populating_movies

router = routers.DefaultRouter()


# Trailing edge should be added when calling api

# router.register('api/test', movieViewSet, 'movies')

urlpatterns = router.urls

urlpatterns = [
    # path('', include(router.urls)),
    path('api/movies/city/<int:pk>/', MoviesView.as_view()),
    path('api/movies/test/', TestView.as_view()),
    path('api/movies/test/<int:pk>', TestPutView.as_view()),
    path('api/movies/<int:pk>/', MoviesCompleteView.as_view()),
    path('api/likeupdate/<int:pk>', LikeUpdateView.as_view()),
    path('api/ratingamovie/', PostRatingView.as_view()),
    path('view/loaddata/', populating_movies, name='load_data'),
    path('api/movies/genre/', allgenresView.as_view()),
    path('api/movies/language/', allanguagesView.as_view()),
    path('api/movies/format/', allformatsView.as_view()),
    path('api/movies/snacks/', allSnacksView.as_view()),
    path('api/movies/cities/', allGetCities.as_view()),
    path('api/movies/city_theatre/<int:movie_id>/<int:city_id>/',
         BookingPageCompleteView.as_view()),
    path('api/history/<int:user_id>/', GetBookingDetails.as_view())

]

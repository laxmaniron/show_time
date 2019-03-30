from rest_framework import routers
from .api import movieViewSet

router = routers.DefaultRouter()


# Trailing edge should be added when calling api

router.register('api/movies', movieViewSet, 'movies')

urlpatterns = router.urls

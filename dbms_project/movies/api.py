from movies.models import Movies, testmodel

from .serializers import MoviesSerializer, TestSerializer

from rest_framework import viewsets, permissions

from rest_framework.views import APIView
from rest_framework.response import Response
from django.db import connection
import json
from collections import OrderedDict

# movieViewset


class MoviesView(APIView):
    def get(self, request):
        movies = Movies.objects.raw('SELECT * FROM movies_movies')

        with connection.cursor() as cursor:
            cursor.execute(
                "SELECT * FROM movies_movies")
            tupleofmovies = cursor.fetchall()

            listofmovies = []

            for i in tupleofmovies:

                listofmovies.append(OrderedDict(
                    [('id', i[0]),
                     ('title', i[1]),
                     ('release_date', i[2]),
                     ('censor_rating', i[3]),
                     ('image_source', i[4]),
                     ('synposis', i[5]),
                     ('trailer_link', i[6]),
                     ('time_duration', i[7]),
                     ('likes', i[8]),
                     ('status', i[9]),
                     ('likesmultinest', OrderedDict(
                         [('id', 1), ('title', 'avengers')])),
                     ]))

        return Response(listofmovies)


class TestView(APIView):
    def get(self, request):
        tests = testmodel.objects.raw('SELECT * FROM movies_testmodel')

        with connection.cursor() as cursor:
            cursor.execute(
                "SELECT * FROM movies_testmodel")
            # print(cursor.fetchone())
            tt = cursor.fetchall()
            print(".....hello", tt)

            listoftests = []

            for i in tt:

                listoftests.append(OrderedDict(
                    [('id', i[0]), ('title', i[1]), ('genre', i[1])]))

            print('happpyaqwerty', listoftests)

            k = json.dumps(listoftests)

            print('......k.....', k)

            # print(typek)

        serializer = TestSerializer(tests, many=True)

        print(serializer.data)

        return Response(listoftests)

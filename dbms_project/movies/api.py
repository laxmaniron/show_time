from movies.models import Movies, testmodel

from .serializers import MoviesSerializer, TestSerializer

from rest_framework import viewsets, permissions

from rest_framework.views import APIView
from rest_framework.response import Response
from django.db import connection
import json
from collections import OrderedDict

from django.shortcuts import get_object_or_404

# movieViewset


class MoviesView(APIView):
    def get(self, request):
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
                     ('synopsis', i[5]),
                     ('trailer_link', i[6]),
                     ('time_duration', i[7]),
                     ('likes', i[8]),
                     ('status', i[9])
                     ]))

        return Response(listofmovies)

    # def put(self, request, pk):
    #     #saved_article = get_object_or_404(Movies.objects.all(), pk=pk)
    #     data = request.data
    #     print(data)
    #     return Response({"success": "Article '{}' updated successfully".format(article_saved.title)})


class MoviesCompleteView(APIView):
    def get(self, request, pk):

        with connection.cursor() as cursor:
            cursor.execute(
                "SELECT * FROM movies_movies where id= %s", [pk])
            tupleofmovie = cursor.fetchone()

            moviecompletedetail = OrderedDict(
                [('id', tupleofmovie[0]),
                 ('title', tupleofmovie[1]),
                 ('release_date', tupleofmovie[2]),
                 ('censor_rating', tupleofmovie[3]),
                 ('image_source', tupleofmovie[4]),
                 ('synopsis', tupleofmovie[5]),
                 ('trailer_link', tupleofmovie[6]),
                 ('time_duration', tupleofmovie[7]),
                 ('likes', tupleofmovie[8]),
                 ('status', tupleofmovie[9])
                 ])

            cursor.execute(
                "SELECT movies_cast_crew.id,castname,image FROM movies_cast_crew INNER JOIN movies_cast_crew_movie on movies_cast_crew.id = movies_cast_crew_movie.cast_crew_id WHERE title_id = %s", [pk])
            tupleofcast = cursor.fetchall()

            completecast = []

            for i in tupleofcast:
                cast = OrderedDict(
                    [('id', i[0]),
                     ('cast', i[1]),
                     ('image', i[2])
                     ])

                completecast.append(cast)

            moviecompletedetail.update({"completecast": completecast})

            cursor.execute(
                "SELECT movies_genre.id,genre FROM movies_genre INNER JOIN movies_genre_movie on movies_genre.id = movies_genre_movie.movie_genre_id WHERE title_id = %s", [pk])
            tupleofgenre = cursor.fetchall()

            allgenre = []

            for i in tupleofgenre:
                genre = OrderedDict(
                    [('id', i[0]),
                     ('genre', i[1]),
                     ])

                allgenre.append(genre)

            moviecompletedetail.update({"allgenre": allgenre})

            cursor.execute(
                "SELECT movies_languages.id,language FROM movies_languages INNER JOIN movies_language_movie on movies_languages.id = movies_language_movie.movie_language_id  WHERE title_id = %s", [pk])
            tupleoflanguages = cursor.fetchall()

            allanguages = []

            for i in tupleoflanguages:
                language = OrderedDict(
                    [('id', i[0]),
                     ('language', i[1]),
                     ])

                allanguages.append(language)

            moviecompletedetail.update({"allanguages": allanguages})

            cursor.execute(
                "SELECT movies_formats.id,mformat FROM movies_formats INNER JOIN movies_format_movie on movies_formats.id = movies_format_movie.movie_format_id  WHERE title_id = %s", [pk])
            tupleofformats = cursor.fetchall()

            allformats = []

            for i in tupleofformats:
                format = OrderedDict(
                    [('id', i[0]),
                     ('format', i[1]),
                     ])

                allformats.append(format)

            moviecompletedetail.update({"allformats": allformats})

            cursor.execute(
                "SELECT id,user_id,likestatus,ratestatus,rating,comment FROM movies_rating WHERE title_id = %s", [pk])
            tupleofcomment = cursor.fetchall()

            allcomments = []

            for i in tupleofcomment:
                cursor.execute(
                    "SELECT username FROM auth_user WHERE id = %s", [i[1]])
                username = cursor.fetchone()

                comment = OrderedDict(
                    [('id', i[0]),
                     ('user', username[0]),
                     ('likestatus', i[2]),
                     ('ratestatus', i[3]),
                     ('rating', i[4]),
                     ('comment', i[5]),
                     ])

                allcomments.append(comment)

            moviecompletedetail.update({"allcomments": allcomments})

        return Response(moviecompletedetail)


class LikeUpdateView(APIView):
    def put(self, request, pk):
        data = request.data.get('likes')
        print(data)
        print(type(data))

        with connection.cursor() as cursor:
            cursor.execute(
                "UPDATE movies_movies SET likes=%s WHERE id=%s", [data['likes'], pk])
            cursor.execute(
                "SELECT * FROM movies_movies WHERE id = %s", [pk])
            likeupdate = cursor.fetchone()

            print(likeupdate[0])

            updatedmovie = OrderedDict(
                [('id', likeupdate[0]),
                 ('title', likeupdate[1]),
                 ('release_date', likeupdate[2]),
                 ('censor_rating', likeupdate[3]),
                 ('image_source', likeupdate[4]),
                 ('synposis', likeupdate[5]),
                 ('trailer_link', likeupdate[6]),
                 ('time_duration', likeupdate[7]),
                 ('likes', likeupdate[8]),
                 ('status', likeupdate[9])
                 ])

        return Response(updatedmovie)


class PostRatingView(APIView):
    def post(self, request):
        data = request.data.get('rating')
        ratestatus = 1

        with connection.cursor() as cursor:
            cursor.execute(
                "INSERT INTO movies_rating (title_id,user_id,ratestatus,likestatus,rating,comment) VALUES( %s, %s,%s,%s, %s,%s)", [data['title'], data['user'], ratestatus, ratestatus, data['rating'], data['comment']])
            cursor.execute(
                "SELECT * FROM movies_rating WHERE title_id = %s and  user_id= %s", [data['title'], data['user']])

            rating = cursor.fetchone()

            print(rating)

            insertedrating = OrderedDict(
                [('id', rating[0]),
                 ('likestatus', rating[1]),
                 ('ratestatus', rating[2]),
                 ('rating', rating[3]),
                 ('comment', rating[4]),
                 ('title_id', rating[5]),
                 ('user_id', rating[6]),
                 ])

        return Response(insertedrating)


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
                    [('id', i[0]), ('title', i[1]), ('genre', i[2])]))

            print('happpyaqwerty', listoftests)

            k = json.dumps(listoftests)

            print('......k.....', k)

            # print(typek)

        serializer = TestSerializer(tests, many=True)

        print(serializer.data)

        return Response(listoftests)

    def put(self, request, pk):

        saved_testmodel = get_object_or_404(testmodel.objects.all(), pk=pk)
        data = request.data.get('testmodel')
        serializer = TestSerializer(
            instance=saved_testmodel, data=data, partial=True)
        if serializer.is_valid(raise_exception=True):
            article_saved = serializer.save()
        return Response({"success": "Article '{}' updated successfully".format(article_saved.title)})


class TestPutView(APIView):
    def put(self, request, pk):

        saved_testmodel = get_object_or_404(testmodel.objects.all(), pk=pk)
        data = request.data.get('testmodel')
        print(data)
        print(type(data))

        with connection.cursor() as cursor:
            cursor.execute(
                "UPDATE movies_testmodel SET title=%s,genre=%s WHERE id=%s", [data['title'], data['genre'], pk])
            cursor.execute(
                "SELECT * FROM movies_testmodel WHERE id = %s", [pk])
            tt = cursor.fetchone()
            print(".....hello", tt)

        # serializer = TestSerializer(
        #     instance=saved_testmodel, data=data, partial=True)
        # if serializer.is_valid(raise_exception=True):
        #     article_saved = serializer.save()
        return Response({"success": "Article '{}' updated successfully".format(tt)})

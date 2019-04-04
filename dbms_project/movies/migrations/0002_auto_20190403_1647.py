# Generated by Django 2.1.7 on 2019-04-03 11:17

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('movies', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Cast_Crew',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cast', models.CharField(max_length=50)),
                ('role', models.CharField(max_length=50)),
                ('image', models.URLField()),
                ('title', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='movies.Movies')),
            ],
        ),
        migrations.CreateModel(
            name='Genre',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('genre', models.CharField(max_length=20)),
                ('title', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='movies.Movies')),
            ],
        ),
        migrations.CreateModel(
            name='Languages',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('language', models.CharField(max_length=20)),
                ('title', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='movies.Movies')),
            ],
        ),
        migrations.CreateModel(
            name='Rating',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('rating', models.IntegerField(validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(5)])),
                ('comment', models.CharField(blank=True, max_length=1000, null=True)),
                ('title', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='movies.Movies')),
            ],
        ),
        migrations.DeleteModel(
            name='movie',
        ),
        migrations.AddIndex(
            model_name='rating',
            index=models.Index(fields=['title'], name='movies_rati_title_i_4d2843_idx'),
        ),
        migrations.AddIndex(
            model_name='languages',
            index=models.Index(fields=['title'], name='movies_lang_title_i_d7f010_idx'),
        ),
        migrations.AddIndex(
            model_name='genre',
            index=models.Index(fields=['title'], name='movies_genr_title_i_313bb6_idx'),
        ),
        migrations.AddIndex(
            model_name='cast_crew',
            index=models.Index(fields=['title'], name='movies_cast_title_i_e2d846_idx'),
        ),
    ]

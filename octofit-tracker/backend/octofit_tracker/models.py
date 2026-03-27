from djongo import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    # Дополнительные поля профиля пользователя
    bio = models.TextField(blank=True)
    avatar = models.URLField(blank=True)

class Team(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    members = models.ManyToManyField('User', related_name='teams')

class Activity(models.Model):
    user = models.ForeignKey('User', on_delete=models.CASCADE, related_name='activities')
    activity_type = models.CharField(max_length=100)
    duration = models.PositiveIntegerField(help_text='Длительность в минутах')
    calories = models.PositiveIntegerField()
    date = models.DateTimeField(auto_now_add=True)

class Workout(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    difficulty = models.CharField(max_length=50)
    suggested_for = models.ManyToManyField('User', related_name='suggested_workouts', blank=True)

class LeaderboardEntry(models.Model):
    user = models.ForeignKey('User', on_delete=models.CASCADE)
    score = models.IntegerField()
    rank = models.IntegerField()
    team = models.ForeignKey('Team', on_delete=models.CASCADE, null=True, blank=True)

    class Meta:
        ordering = ['rank']

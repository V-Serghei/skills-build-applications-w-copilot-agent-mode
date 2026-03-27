from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from djongo import models

from django.conf import settings

from pymongo import MongoClient

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        # Connect to MongoDB
        client = MongoClient('localhost', 27017)
        db = client['octofit_db']

        # Drop collections if they exist
        db.users.drop()
        db.teams.drop()
        db.activities.drop()
        db.leaderboard.drop()
        db.workouts.drop()

        # Create unique index for email
        db.users.create_index([('email', 1)], unique=True)

        # Users (superheroes)
        users = [
            {"name": "Tony Stark", "email": "ironman@marvel.com", "team": "marvel"},
            {"name": "Steve Rogers", "email": "cap@marvel.com", "team": "marvel"},
            {"name": "Bruce Wayne", "email": "batman@dc.com", "team": "dc"},
            {"name": "Clark Kent", "email": "superman@dc.com", "team": "dc"},
        ]
        db.users.insert_many(users)

        # Teams
        teams = [
            {"name": "marvel", "members": ["ironman@marvel.com", "cap@marvel.com"]},
            {"name": "dc", "members": ["batman@dc.com", "superman@dc.com"]},
        ]
        db.teams.insert_many(teams)

        # Activities
        activities = [
            {"user": "ironman@marvel.com", "activity": "Running", "duration": 30},
            {"user": "cap@marvel.com", "activity": "Cycling", "duration": 45},
            {"user": "batman@dc.com", "activity": "Swimming", "duration": 60},
            {"user": "superman@dc.com", "activity": "Flying", "duration": 120},
        ]
        db.activities.insert_many(activities)

        # Leaderboard
        leaderboard = [
            {"user": "superman@dc.com", "score": 100},
            {"user": "ironman@marvel.com", "score": 90},
            {"user": "cap@marvel.com", "score": 80},
            {"user": "batman@dc.com", "score": 70},
        ]
        db.leaderboard.insert_many(leaderboard)

        # Workouts
        workouts = [
            {"user": "ironman@marvel.com", "workout": "Chest Day", "reps": 100},
            {"user": "cap@marvel.com", "workout": "Leg Day", "reps": 120},
            {"user": "batman@dc.com", "workout": "Cardio", "reps": 200},
            {"user": "superman@dc.com", "workout": "Full Body", "reps": 300},
        ]
        db.workouts.insert_many(workouts)

        self.stdout.write(self.style.SUCCESS('octofit_db database populated with test data!'))

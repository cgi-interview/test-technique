from django.db import models

class TaskModel(models.Model):
    title = models.CharField(max_length=200)
    completed = models.BooleanField(default=False)
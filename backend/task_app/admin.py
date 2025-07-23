from django.contrib import admin
from .interfaces.drf.models import TaskModel

admin.site.register(TaskModel)

from rest_framework import serializers
from task_app.interfaces.drf.models import TaskModel

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskModel
        fields = ['id', 'title', 'completed']
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status

from task_app.application.services import TaskService
from task_app.infrastructure.repositories import DjangoTaskRepository
from task_app.interfaces.drf.serializers import TaskSerializer
from task_app.interfaces.drf.models import TaskModel

repo = DjangoTaskRepository()
service = TaskService(repo)

class TaskViewSet(viewsets.ModelViewSet):
    queryset = TaskModel.objects.all()
    serializer_class = TaskSerializer
    
    @action(detail=True, methods=["patch"])
    def complete(self, request, pk=None):
        try:
            task = service.complete_task(int(pk))
            return Response(vars(task))
        except TaskModel.DoesNotExist:
            return Response({"error": "Task not found"}, status=404)
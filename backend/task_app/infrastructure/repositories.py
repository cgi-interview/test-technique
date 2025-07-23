from task_app.domain.ports import TaskRepository
from task_app.domain.models import Task
from task_app.interfaces.drf.models import TaskModel

class DjangoTaskRepository(TaskRepository):
    def list(self):
        return [Task(id=t.id, title=t.title, completed=t.completed) for t in TaskModel.object.all()]
    
    def create(self, title: str):
        task = TaskModel.objects.create(title=title)
        return Task(id=task.id, title=task.title, completed=task.completed)
    
    def mark_completed(self, task_id: int):
        task = TaskModel.objects.get(id=task_id)
        task.completed = True
        task.save()
        return Task(id=task.id, title=task.title, completed=task.completed)
        
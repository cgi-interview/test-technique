import pytest
from task_app.application.services import TaskService
from task_app.domain.models import Task

class InMemoryTaskRepository:
    def __init__(self):
        self.tasks = []
        self.next_id = 1

    def list(self):
        return self.tasks

    def create(self, title):
        task = Task(id=self.next_id, title=title, completed=False)
        self.tasks.append(task)
        self.next_id += 1
        return task

    def mark_completed(self, task_id):
        for task in self.tasks:
            if task.id == task_id:
                task.completed = True
                return task
        raise ValueError("Task not found")

@pytest.fixture
def service():
    repo = InMemoryTaskRepository()
    return TaskService(repo)

def test_create_task(service):
    task = service.create_task("Test task")
    assert task.id == 1
    assert task.title == "Test task"
    assert task.completed is False

def test_list_tasks(service):
    service.create_task("A")
    service.create_task("B")
    tasks = service.list_task()
    assert len(tasks) == 2

def test_mark_completed(service):
    task = service.create_task("Complete me")
    updated = service.complete_task(task.id)
    assert updated.completed is True

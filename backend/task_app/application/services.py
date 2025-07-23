from task_app.domain.ports import TaskRepository
from task_app.domain.models import Task
from typing import List

class TaskService:
    def __init__(self, repo: TaskRepository):
        self.repo = repo
    
    def list_task(self) -> List[Task]:
        return self.repo.list()
    
    def create_task(self, title: str) -> Task:
        return self.repo.create(title)
    
    def complete_task(self, task_id: int) -> Task:
       return self.repo.mark_completed(task_id) 
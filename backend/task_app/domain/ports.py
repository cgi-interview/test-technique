from abc import ABC, abstractmethod
from typing import List
from .models import Task

class TaskRepository(ABC):
    @abstractmethod
    def list(self) -> List[Task]: pass
    
    @abstractmethod
    def create(self, tittle: str) -> Task: pass
    
    @abstractmethod
    def mark_completed(self, task_id: int) -> Task: pass
    
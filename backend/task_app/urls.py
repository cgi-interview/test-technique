from rest_framework.routers import DefaultRouter
from django.urls import path, include
from task_app.interfaces.drf.views import TaskViewSet

router = DefaultRouter()
router.register(r"tasks", TaskViewSet, basename="task")

urlpatterns = [
    path("api/", include(router.urls)),
]
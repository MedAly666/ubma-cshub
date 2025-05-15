from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    DegreeViewSet,
    MajorViewSet,
    YearViewSet,
    SemesterViewSet,
    ModuleViewSet,
    ResourceViewSet,
)

router = DefaultRouter()
router.register(r"degrees", DegreeViewSet)
router.register(r"majors", MajorViewSet)
router.register(r"years", YearViewSet)
router.register(r"semesters", SemesterViewSet)
router.register(r"modules", ModuleViewSet)
router.register(r"resources", ResourceViewSet)

urlpatterns = [
    path("api/", include(router.urls)),
]

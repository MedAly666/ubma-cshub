from rest_framework import viewsets
from .models import Degree, Major, Year, Semester, Module, Resource
from .serializers import (
    DegreeSerializer,
    MajorSerializer,
    YearSerializer,
    SemesterSerializer,
    ModuleSerializer,
    ResourceSerializer,
)
from rest_framework.decorators import action
from rest_framework.response import Response


class DegreeViewSet(viewsets.ModelViewSet):
    queryset = Degree.objects.all()
    serializer_class = DegreeSerializer


class MajorViewSet(viewsets.ModelViewSet):
    queryset = Major.objects.all()
    serializer_class = MajorSerializer


class YearViewSet(viewsets.ModelViewSet):
    queryset = Year.objects.all()
    serializer_class = YearSerializer


class SemesterViewSet(viewsets.ModelViewSet):
    queryset = Semester.objects.all()
    serializer_class = SemesterSerializer


class ModuleViewSet(viewsets.ModelViewSet):
    queryset = Module.objects.all()
    serializer_class = ModuleSerializer

    @action(detail=False, methods=["get"], url_path="by-semester/(?P<semester>[^/.]+)")
    def by_semester(self, request, semester=None):
        modules = self.queryset.filter(semester=semester)
        serializer = self.get_serializer(modules, many=True)
        return Response(serializer.data)


class ResourceViewSet(viewsets.ModelViewSet):
    queryset = Resource.objects.all()
    serializer_class = ResourceSerializer

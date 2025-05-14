from rest_framework import serializers
from .models import Degree, Major, Year, Semester, Module, Resource


class DegreeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Degree
        fields = ["id", "name", "created_at", "updated_at"]


class MajorSerializer(serializers.ModelSerializer):
    degree = DegreeSerializer()

    class Meta:
        model = Major
        fields = [
            "id",
            "name",
            "description",
            "code",
            "degree",
            "created_at",
            "updated_at",
        ]


class YearSerializer(serializers.ModelSerializer):
    major = MajorSerializer()

    class Meta:
        model = Year
        fields = ["id", "year_number", "major", "created_at", "updated_at"]


class SemesterSerializer(serializers.ModelSerializer):
    year = YearSerializer()

    class Meta:
        model = Semester
        fields = ["id", "semester_number", "year", "created_at", "updated_at"]


class ModuleSerializer(serializers.ModelSerializer):
    semester = SemesterSerializer()

    class Meta:
        model = Module
        fields = [
            "id",
            "name",
            "code",
            "description",
            "semester",
            "created_at",
            "updated_at",
        ]


class ResourceSerializer(serializers.ModelSerializer):
    module = ModuleSerializer()

    class Meta:
        model = Resource
        fields = [
            "id",
            "resource_type",
            "url",
            "description",
            "module",
            "created_at",
            "updated_at",
        ]

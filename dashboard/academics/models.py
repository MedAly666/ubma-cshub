from django.db import models
import uuid


class Degree(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class Major(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100)
    description = models.TextField()
    code = models.CharField(max_length=20)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    degree = models.ForeignKey(Degree, on_delete=models.CASCADE, related_name="majors")

    def __str__(self):
        return self.name


class Year(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    year_number = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    major = models.ForeignKey(Major, on_delete=models.CASCADE, related_name="years")

    def __str__(self):
        return f"Year {self.year_number} ({self.major.name})"


class Semester(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    semester_number = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    year = models.ForeignKey(Year, on_delete=models.CASCADE, related_name="semesters")

    def __str__(self):
        return f"Semester {self.semester_number} ({self.year})"


class Module(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100)
    code = models.CharField(max_length=20)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    semester = models.ForeignKey(
        Semester, on_delete=models.CASCADE, related_name="modules"
    )

    def __str__(self):
        return f"{self.name} ({self.code})"


class ResourceType(models.TextChoices):
    BOOK = "BOOK", "Book"
    DRIVE = "DRIVE", "Google Drive"
    YOUTUBE = "YOUTUBE", "YouTube"
    WEBSITE = "WEBSITE", "Website"


class Resource(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    resource_type = models.CharField(max_length=10, choices=ResourceType.choices)
    url = models.URLField()
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    module = models.ForeignKey(
        Module, on_delete=models.CASCADE, related_name="resources"
    )

    def __str__(self):
        return f"{self.resource_type} - {self.url}"

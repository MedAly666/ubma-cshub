from django.contrib import admin
from .models import Degree, Major, Year, Semester, Module, Resource

admin.site.register(Degree)
admin.site.register(Major)
admin.site.register(Year)
admin.site.register(Semester)
admin.site.register(Module)
admin.site.register(Resource)

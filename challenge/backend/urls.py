# backend/urls.py

from django.contrib import admin
from django.urls import path, include
from rest_framework.authtoken.views import obtain_auth_token
from django.contrib import admin
from django.urls import path, include


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('complaint_app.urls')),
    path('admin/', admin.site.urls),
    path('login/', obtain_auth_token, name='login'),
    path('api/', include('complaint_app.urls')),  # ✅ Cleaner base path
]

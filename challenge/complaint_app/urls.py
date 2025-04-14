# complaint_app/urls.py

from django.urls import path
from .views import OpenCasesView, ClosedCasesView, TopComplaintTypeView, ResidentComplaintsView

urlpatterns = [
    path('open-cases/', OpenCasesView.as_view(), name='open-cases'),
    path('top-complaint-types/', TopComplaintTypeView.as_view(), name='top-complaint-types'),
    path('closed-cases/', ClosedCasesView.as_view(), name='closed-cases'),
        path('resident-complaints/', ResidentComplaintsView.as_view(), name='resident-complaints'),  # ← new

]

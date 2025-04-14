# complaint_app/views.py

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Complaint
from .serializers import ComplaintSerializer
from django.db.models import Count


def get_user_district(request):
    user = request.user
    # Allow district override for admin users via query param
    if user.is_staff and 'district' in request.query_params:
        return request.query_params.get('district')
    # Default behavior: use user's own district with padding
    raw_district = user.userprofile.district
    return raw_district if len(raw_district) == 3 else f"{raw_district[0]}0{raw_district[1]}"


class OpenCasesView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        district = get_user_district(request)
        complaints = Complaint.objects.filter(closedate__isnull=True, account=district)
        serializer = ComplaintSerializer(complaints, many=True)
        return Response(serializer.data)


class ClosedCasesView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        district = get_user_district(request)
        complaints = Complaint.objects.filter(closedate__isnull=False, account=district)
        serializer = ComplaintSerializer(complaints, many=True)
        return Response(serializer.data)


class TopComplaintTypeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        district = get_user_district(request)
        top_types = (
            Complaint.objects
            .filter(account=district)
            .values('complaint_type')
            .annotate(count=Count('id'))
            .order_by('-count')[:5]
        )
        return Response(top_types)


class ResidentComplaintsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        district = get_user_district(request)
        complaints = Complaint.objects.filter(council_dist=district)
        serializer = ComplaintSerializer(complaints, many=True)
        return Response(serializer.data)

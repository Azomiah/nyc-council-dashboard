from rest_framework import serializers
from rest_framework import serializers
from .models import Complaint



class ComplaintSerializer(serializers.ModelSerializer):
    status = serializers.SerializerMethodField()

    class Meta:
        model = Complaint
        fields = (
            'unique_key', 'account', 'opendate', 'complaint_type', 'descriptor',
            'zip', 'borough', 'city', 'council_dist', 'community_board', 'closedate',
            'status'  # ✅ add this computed field
        )

    def get_status(self, obj):
        return "Closed" if obj.closedate else "Open"

# complaint_app/management/commands/populate_db.py

from django.core.management.base import BaseCommand
from complaint_app.models import Complaint
import random
import uuid

class Command(BaseCommand):
    help = "Populate the database with sample complaint data"

    def handle(self, *args, **kwargs):
        Complaint.objects.all().delete()

        districts = ["D01", "D02", "D03"]
        types = ["Noise", "Sanitation", "Illegal Parking", "Graffiti", "Pothole"]
        statuses = ["Open", "Closed"]

        for _ in range(20):
            Complaint.objects.create(
                unique_key=str(uuid.uuid4()),
                complaint_type=random.choice(types),
                descriptor="Randomly generated for testing",
                borough="Manhattan",
                city="New York",
                zip="10001",
                council_dist=random.choice(districts),
                community_board="01 MANHATTAN",
                opendate="2024-01-01",
                closedate="2024-01-15",
                account="Public",
            )

        self.stdout.write(self.style.SUCCESS("✅ Database populated with sample complaints"))

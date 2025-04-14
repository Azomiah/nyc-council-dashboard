from django.core.management.base import BaseCommand
from complaint_app.models import Complaint
from datetime import datetime
import random

class Command(BaseCommand):
    help = 'Seeds 2 clean demo complaints per NYC district (D01–D51)'

    def handle(self, *args, **kwargs):
        Complaint.objects.all().delete()
        types = ['Noise', 'Sanitation', 'Pothole', 'Illegal Parking', 'Graffiti']

        for i in range(1, 52):
            padded = f'D{i:02d}'
            for _ in range(2):
                Complaint.objects.create(
                    complaint_type=random.choice(types),
                    descriptor="Randomly generated for testing",
                    account=padded,
                    council_dist=padded,
                    opendate=datetime.now(),
                    closedate=None if random.random() > 0.5 else datetime.now()
                )

        self.stdout.write(self.style.SUCCESS('✅ Clean test data added for all districts.'))

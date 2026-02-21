from django.core.management.base import BaseCommand
from store.models import Category


class Command(BaseCommand):
    help = "Creates default product categories"

    def handle(self, *args, **kwargs):
        categories = [
            "Pottery",
            "Textiles",
            "Jewelry",
            "Woodwork",
            "Metalwork",
            "Paintings",
            "Handicrafts",
        ]

        created_count = 0
        existing_count = 0

        self.stdout.write(self.style.SUCCESS("Creating categories..."))

        for category_name in categories:
            category, created = Category.objects.get_or_create(title=category_name)
            if created:
                self.stdout.write(self.style.SUCCESS(f"✅ Created: {category_name}"))
                created_count += 1
            else:
                self.stdout.write(f"ℹ️  Already exists: {category_name}")
                existing_count += 1

        self.stdout.write(self.style.SUCCESS(f"\n📊 Summary:"))
        self.stdout.write(f"   Created: {created_count}")
        self.stdout.write(f"   Already existed: {existing_count}")
        self.stdout.write(f"   Total: {Category.objects.count()}")

#!/usr/bin/env python
"""
Script to create default categories in the database
Run this with: python create_categories.py
"""

import os
import django

# Setup Django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "marketplace.settings")
django.setup()

from store.models import Category

# Default categories
CATEGORIES = [
    "Pottery",
    "Textiles",
    "Jewelry",
    "Woodwork",
    "Metalwork",
    "Paintings",
    "Handicrafts",
]


def create_categories():
    """Create default categories if they don't exist"""
    created_count = 0
    existing_count = 0

    for category_name in CATEGORIES:
        category, created = Category.objects.get_or_create(title=category_name)
        if created:
            print(f"✅ Created category: {category_name}")
            created_count += 1
        else:
            print(f"ℹ️  Category already exists: {category_name}")
            existing_count += 1

    print(f"\n📊 Summary:")
    print(f"   Created: {created_count}")
    print(f"   Already existed: {existing_count}")
    print(f"   Total categories: {Category.objects.count()}")


if __name__ == "__main__":
    print("🚀 Creating default categories...\n")
    create_categories()
    print("\n✨ Done!")

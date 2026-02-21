import os
from django.core.exceptions import ValidationError


def validate_file_size(file):
    max_size_mb = 50  # 50MB limit for images and videos

    if file.size > max_size_mb * 1024 * 1024:
        raise ValidationError(f"Files cannot be larger than {max_size_mb}MB!")


def validate_model_extension(file):
    extension = os.path.splitext(file.name)
    ALLOWED_EXTENSIONS = [".stl", ".obj", ".gltf", ".glb", ".fbx"]
    if extension.lower() not in ALLOWED_EXTENSIONS:
        return ValidationError("Unsupported Extension for the 3D model")

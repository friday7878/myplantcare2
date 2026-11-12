"""
MY PLANT CARE - Image Validation and Safe Processing Service
Section 3 implementation:
- Validate file type (JPG, JPEG, PNG, WEBP)
- Validate file size (<20MB)
- Check image dimensions & readability
- Detect corrupted or empty images
- Safe compression & resizing before external API transmission
"""

import io
from typing import Tuple, Optional
from PIL import Image

ALLOWED_FORMATS = {"JPEG", "JPG", "PNG", "WEBP"}
MAX_FILE_SIZE_BYTES = 20 * 1024 * 1024 # 20MB
MIN_DIMENSION = 80 # px
MAX_TARGET_DIMENSION = 1200 # px for optimal API transfer

class ImageValidationError(Exception):
    pass

def validate_and_process_image(image_bytes: bytes) -> Tuple[bytes, str, Tuple[int, int]]:
    """
    Validates the binary image data and safely compresses it.
    Returns: (processed_bytes, mime_type, (width, height))
    """
    if not image_bytes or len(image_bytes) == 0:
        raise ImageValidationError("Empty or missing image upload.")

    if len(image_bytes) > MAX_FILE_SIZE_BYTES:
        raise ImageValidationError(f"File size exceeds 20MB limit (size: {len(image_bytes) / (1024 * 1024):.1f}MB).")

    try:
        img = Image.open(io.BytesIO(image_bytes))
        img.verify() # Check integrity
    except Exception as e:
        raise ImageValidationError(f"Corrupted or unreadable image file: {str(e)}")

    # Re-open after verify()
    img = Image.open(io.BytesIO(image_bytes))
    format_upper = (img.format or "").upper()
    if format_upper not in ALLOWED_FORMATS and format_upper != "MPO":
        raise ImageValidationError(f"Unsupported format '{format_upper}'. Allowed: JPG, PNG, WEBP.")

    width, height = img.size
    if width < MIN_DIMENSION or height < MIN_DIMENSION:
        raise ImageValidationError(f"Image resolution too low ({width}x{height}px). Minimum {MIN_DIMENSION}x{MIN_DIMENSION}px required.")

    # Convert to RGB if in RGBA / Palette mode for JPEG compatibility
    if img.mode in ("RGBA", "P", "LA"):
        rgb_img = Image.new("RGB", img.size, (255, 255, 255))
        if img.mode == "RGBA":
            rgb_img.paste(img, mask=img.split()[3])
        else:
            rgb_img.paste(img.convert("RGB"))
        img = rgb_img
    elif img.mode != "RGB":
        img = img.convert("RGB")

    # Downscale if exceeding max dimension while maintaining aspect ratio
    if width > MAX_TARGET_DIMENSION or height > MAX_TARGET_DIMENSION:
        img.thumbnail((MAX_TARGET_DIMENSION, MAX_TARGET_DIMENSION), Image.Resampling.LANCZOS)
        width, height = img.size

    # Save to optimized JPEG buffer
    output_buffer = io.BytesIO()
    img.save(output_buffer, format="JPEG", quality=85, optimize=True)
    processed_bytes = output_buffer.getvalue()

    return processed_bytes, "image/jpeg", (width, height)

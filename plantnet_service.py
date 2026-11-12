"""
MY PLANT CARE - Pl@ntNet API Integration Service
Section 2 implementation:
- Official API endpoint: https://my-api.plantnet.org/v2/identify/all
- Multipart/form-data submission of up to 5 photographs
- Per-photo organ tagging ('leaf', 'flower', 'fruit', 'bark')
- Secure environment key: PLANTNET_API_KEY
- Error, timeout, and quota handling
"""

import os
import requests
from typing import List, Dict, Any, Optional

PLANTNET_BASE_URL = "https://my-api.plantnet.org/v2/identify"
DEFAULT_PROJECT = "all"
REQUEST_TIMEOUT_SECONDS = 18

class PlantNetError(Exception):
    def __init__(self, message: str, status_code: Optional[int] = None):
        super().__init__(message)
        self.status_code = status_code

def identify_with_plantnet(
    image_items: List[Dict[str, Any]], 
    project: str = DEFAULT_PROJECT,
    lang: str = "en"
) -> Dict[str, Any]:
    """
    Calls Pl@ntNet identify API with up to 5 images.
    Each item in image_items: { 'bytes': b'...', 'organ': 'leaf'|'flower'|'fruit'|'bark'|'auto' }
    """
    api_key = os.getenv("PLANTNET_API_KEY", "").strip()
    if not api_key or api_key == "MY_PLANTNET_API_KEY":
        raise PlantNetError("PLANTNET_API_KEY environment variable is not configured.", status_code=401)

    if not image_items:
        raise PlantNetError("At least one image required for Pl@ntNet identification.", status_code=400)

    url = f"{PLANTNET_BASE_URL}/{project}?api-key={api_key}&lang={lang}"

    # Prepare multipart files and organ params
    files = []
    organs = []

    for i, item in enumerate(image_items[:5]):
        img_bytes = item.get("bytes")
        organ = item.get("organ", "auto")
        if organ == "auto":
            organ = "leaf" # Pl@ntNet default

        files.append(("images", (f"plant_photo_{i + 1}.jpg", img_bytes, "image/jpeg")))
        organs.append(organ)

    data = [("organs", o) for o in organs]

    try:
        response = requests.post(url, files=files, data=data, timeout=REQUEST_TIMEOUT_SECONDS)
    except requests.exceptions.Timeout:
        raise PlantNetError("Pl@ntNet identification API timed out after 18 seconds.", status_code=504)
    except requests.exceptions.RequestException as e:
        raise PlantNetError(f"Network error communicating with Pl@ntNet API: {str(e)}", status_code=502)

    if response.status_code == 200:
        try:
            return response.json()
        except Exception:
            raise PlantNetError("Invalid JSON returned by Pl@ntNet API.", status_code=502)
    elif response.status_code == 404:
        # No plant found
        return {"results": [], "query": {}, "remainingIdentificationRequests": None}
    elif response.status_code == 429:
        raise PlantNetError("Pl@ntNet API daily rate limit or quota exceeded.", status_code=429)
    elif response.status_code == 401 or response.status_code == 403:
        raise PlantNetError("Invalid or unauthorized Pl@ntNet API key.", status_code=401)
    else:
        raise PlantNetError(f"Pl@ntNet API error (Status {response.status_code}): {response.text[:200]}", status_code=response.status_code)

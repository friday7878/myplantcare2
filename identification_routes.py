"""
MY PLANT CARE - Flask Identification Blueprint
Section 13 implementation:
- /api/identify (multipart and base64)
- /api/identification/history
- /api/identification/confirm
- /api/identification/feedback
"""

import base64
from flask import Blueprint, request, jsonify
from plant_identifier import run_global_identification
from database import get_identification_history, get_connection

identification_bp = Blueprint("identification_bp", __name__)

@identification_bp.route("/api/identify", methods=["POST"])
def identify_endpoint():
    """
    Accepts multipart/form-data or JSON with base64 images.
    """
    region = request.form.get("region") or "global"
    project = request.form.get("project") or "all"
    language = request.form.get("language") or "en"
    user_hint = request.form.get("userHint") or ""

    raw_images = []

    # Handle multipart file uploads (up to 5)
    if "images" in request.files:
        files = request.files.getlist("images")
        organs = request.form.getlist("organs")
        for i, f in enumerate(files[:5]):
            organ = organs[i] if i < len(organs) else "auto"
            raw_images.append({
                "bytes": f.read(),
                "organ": organ
            })
    elif request.is_json:
        # Handle JSON payload with base64
        data = request.get_json() or {}
        region = data.get("region", region)
        project = data.get("project", project)
        language = data.get("language", language)
        user_hint = data.get("userHint", user_hint)

        images_list = data.get("images", [])
        for item in images_list[:5]:
            base64_str = item.get("data", "")
            if "," in base64_str:
                base64_str = base64_str.split(",")[1]
            try:
                raw_images.append({
                    "bytes": base64.b64decode(base64_str),
                    "organ": item.get("organ", "auto")
                })
            except Exception:
                continue

    if not raw_images:
        return jsonify({"error": "No images provided for identification"}), 400

    result = run_global_identification(
        raw_images=raw_images,
        region=region,
        project=project,
        lang=language,
        user_hint=user_hint
    )
    return jsonify(result)

@identification_bp.route("/api/identification/history", methods=["GET"])
def history_endpoint():
    user_id = request.args.get("userId", "demo_user")
    limit = int(request.args.get("limit", 50))
    history = get_identification_history(user_id=user_id, limit=limit)
    return jsonify(history)

@identification_bp.route("/api/identification/confirm", methods=["POST"])
def confirm_endpoint():
    data = request.get_json() or {}
    ident_id = data.get("identificationId")
    scientific_name = data.get("scientificName")
    common_name = data.get("commonName")
    user_id = data.get("userId", "demo_user")

    if not ident_id or not scientific_name:
        return jsonify({"error": "identificationId and scientificName are required"}), 400

    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
    UPDATE plant_identifications
    SET user_confirmed_species = ?
    WHERE id = ?
    """, (scientific_name, ident_id))

    cursor.execute("""
    INSERT INTO user_confirmations (identification_id, user_id, confirmed_scientific_name, confirmed_common_name, added_to_my_plants)
    VALUES (?, ?, ?, ?, 1)
    """, (ident_id, user_id, scientific_name, common_name))

    conn.commit()
    conn.close()

    return jsonify({"success": True, "message": "Plant confirmed and logged successfully"})

@identification_bp.route("/api/identification/history", methods=["DELETE"])
def clear_history_endpoint():
    user_id = request.args.get("userId", "demo_user")
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM plant_identifications WHERE user_id = ?", (user_id,))
    conn.commit()
    conn.close()
    return jsonify({"success": True, "message": "History cleared"})

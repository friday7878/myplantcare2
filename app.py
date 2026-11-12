"""
MY PLANT CARE - Python 3 + Flask Backend Server
Global AI Plant Identification System
"""

import os
from flask import Flask, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()

from database import init_db
from identification_routes import identification_bp

def create_app():
    app = Flask(__name__)
    CORS(app)

    # Initialize SQLite database schema
    init_db()

    # Register blueprints
    app.register_blueprint(identification_bp)

    @app.route("/")
    def index():
        return jsonify({
            "service": "MY PLANT CARE - Global AI Plant Identification System",
            "version": "4.0",
            "status": "online",
            "endpoints": [
                "POST /api/identify",
                "GET /api/identification/history",
                "POST /api/identification/confirm",
                "DELETE /api/identification/history",
                "GET /api/health"
            ]
        })

    @app.route("/api/health")
    def health():
        has_plantnet_key = bool(os.getenv("PLANTNET_API_KEY") and os.getenv("PLANTNET_API_KEY") != "MY_PLANTNET_API_KEY")
        return jsonify({
            "status": "healthy",
            "database": "SQLite (plant_care.db)",
            "plantnet_configured": has_plantnet_key,
            "engine": "Pl@ntNet Global API + Gemini Vision AI" if has_plantnet_key else "Gemini Vision AI (Global Botanical Engine)"
        })

    return app

if __name__ == "__main__":
    port = int(os.getenv("PORT", 5000))
    app = create_app()
    print(f"🌿 MY PLANT CARE Flask Backend running on http://localhost:{port}")
    app.run(host="0.0.0.0", port=port, debug=True)

"""
MY PLANT CARE - GLOBAL AI PLANT IDENTIFIER
SQLite Database Layer & Taxonomy Storage
Schema implementing Section 12 requirements:
- plant_identifications
- identification_candidates
- plant_species
- plant_common_names
- plant_synonyms
- plant_taxonomy
- plant_distribution
- plant_care_information
- user_confirmations
- identification_feedback
"""

import sqlite3
import os
import json
from datetime import datetime
from typing import Dict, Any, List, Optional

DB_FILE = os.getenv("SQLITE_DB_PATH", "plant_care.db")

def get_connection():
    conn = sqlite3.connect(DB_FILE)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_connection()
    cursor = conn.cursor()

    # 1. Main identification session table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS plant_identifications (
        id TEXT PRIMARY KEY,
        user_id TEXT DEFAULT 'demo_user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        image_count INTEGER DEFAULT 1,
        images_json TEXT,
        region TEXT DEFAULT 'global',
        project TEXT DEFAULT 'all',
        provider TEXT DEFAULT 'Pl@ntNet + Vision AI',
        confidence_score REAL DEFAULT 0.0,
        confidence_label TEXT,
        is_identified INTEGER DEFAULT 1,
        user_confirmed_species TEXT,
        notes TEXT
    );
    """)

    # 2. Ranked candidates table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS identification_candidates (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        identification_id TEXT NOT NULL,
        rank_order INTEGER NOT NULL,
        scientific_name TEXT NOT NULL,
        accepted_name TEXT,
        common_names_json TEXT,
        name_ta TEXT,
        family TEXT,
        genus TEXT,
        species TEXT,
        confidence_score REAL,
        confidence_label TEXT,
        similarity_explanation TEXT,
        FOREIGN KEY (identification_id) REFERENCES plant_identifications(id) ON DELETE CASCADE
    );
    """)

    # 3. Master botanical species table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS plant_species (
        scientific_name TEXT PRIMARY KEY,
        accepted_name TEXT,
        family TEXT,
        genus TEXT,
        species TEXT,
        authority TEXT,
        plant_type TEXT,
        growth_rate TEXT,
        mature_size TEXT,
        toxicity_info TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    """)

    # 4. Plant common names table (multilingual including Tamil)
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS plant_common_names (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        scientific_name TEXT NOT NULL,
        language_code TEXT NOT NULL, -- 'en', 'ta', 'hi', etc.
        common_name TEXT NOT NULL,
        is_primary INTEGER DEFAULT 0,
        FOREIGN KEY (scientific_name) REFERENCES plant_species(scientific_name) ON DELETE CASCADE
    );
    """)

    # 5. Plant synonyms table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS plant_synonyms (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        scientific_name TEXT NOT NULL,
        synonym_name TEXT NOT NULL,
        source TEXT DEFAULT 'WFO/IPNI',
        FOREIGN KEY (scientific_name) REFERENCES plant_species(scientific_name) ON DELETE CASCADE
    );
    """)

    # 6. Plant taxonomy hierarchy table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS plant_taxonomy (
        scientific_name TEXT PRIMARY KEY,
        kingdom TEXT DEFAULT 'Plantae',
        clade_1 TEXT, -- Angiosperms
        clade_2 TEXT, -- Eudicots / Monocots
        order_name TEXT,
        family TEXT NOT NULL,
        genus TEXT NOT NULL,
        species TEXT NOT NULL,
        FOREIGN KEY (scientific_name) REFERENCES plant_species(scientific_name) ON DELETE CASCADE
    );
    """)

    # 7. Plant geographic distribution table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS plant_distribution (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        scientific_name TEXT NOT NULL,
        native_distribution TEXT,
        growing_regions_json TEXT,
        habitat TEXT,
        is_native_tamil_nadu INTEGER DEFAULT 0,
        FOREIGN KEY (scientific_name) REFERENCES plant_species(scientific_name) ON DELETE CASCADE
    );
    """)

    # 8. Plant horticultural care specs table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS plant_care_information (
        scientific_name TEXT PRIMARY KEY,
        sunlight_requirement TEXT,
        watering_frequency TEXT,
        soil_type TEXT,
        temperature_range TEXT,
        humidity_preference TEXT,
        propagation_method TEXT,
        flowering_season TEXT,
        fruiting_season TEXT,
        common_diseases_json TEXT,
        common_pests_json TEXT,
        gardening_instructions TEXT,
        indoor_outdoor TEXT,
        FOREIGN KEY (scientific_name) REFERENCES plant_species(scientific_name) ON DELETE CASCADE
    );
    """)

    # 9. User confirmations table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS user_confirmations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        identification_id TEXT NOT NULL,
        user_id TEXT DEFAULT 'demo_user',
        confirmed_scientific_name TEXT NOT NULL,
        confirmed_common_name TEXT,
        confirmed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        added_to_my_plants INTEGER DEFAULT 0,
        user_notes TEXT,
        FOREIGN KEY (identification_id) REFERENCES plant_identifications(id) ON DELETE CASCADE
    );
    """)

    # 10. Identification feedback and bug reports table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS identification_feedback (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        identification_id TEXT,
        feedback_type TEXT, -- 'correct', 'incorrect', 'unclear_photo', 'missing_species'
        suggested_species TEXT,
        comments TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    """)

    conn.commit()
    conn.close()

def save_identification_record(record: Dict[str, Any]) -> str:
    conn = get_connection()
    cursor = conn.cursor()

    ident_id = record.get("id") or f"ident_{int(datetime.utcnow().timestamp() * 1000)}"

    cursor.execute("""
    INSERT OR REPLACE INTO plant_identifications 
    (id, user_id, image_count, images_json, region, project, provider, confidence_score, confidence_label, is_identified, notes)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        ident_id,
        record.get("userId", "demo_user"),
        record.get("imageCount", 1),
        json.dumps(record.get("images", [])),
        record.get("region", "global"),
        record.get("project", "all"),
        record.get("provider", "Pl@ntNet + Vision AI"),
        record.get("confidenceScore", 0.0),
        record.get("confidenceLabel", "Uncertain"),
        1 if record.get("isIdentified", True) else 0,
        record.get("notes", "")
    ))

    # Insert candidates
    candidates = record.get("candidates", [])
    for cand in candidates:
        cursor.execute("""
        INSERT INTO identification_candidates
        (identification_id, rank_order, scientific_name, accepted_name, common_names_json, name_ta, family, genus, species, confidence_score, confidence_label, similarity_explanation)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            ident_id,
            cand.get("rank", 1),
            cand.get("scientificName", ""),
            cand.get("acceptedBotanicalName", ""),
            json.dumps(cand.get("commonNames", [])),
            cand.get("nameTa", ""),
            cand.get("family", ""),
            cand.get("genus", ""),
            cand.get("species", ""),
            cand.get("confidenceScore", 0.0),
            cand.get("confidenceLabel", ""),
            cand.get("visualSimilarityExplanation", "")
        ))

    conn.commit()
    conn.close()
    return ident_id

def get_identification_history(user_id: str = "demo_user", limit: int = 50) -> List[Dict[str, Any]]:
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
    SELECT id, created_at, provider, confidence_score, confidence_label, is_identified, user_confirmed_species, notes
    FROM plant_identifications
    WHERE user_id = ?
    ORDER BY created_at DESC
    LIMIT ?
    """, (user_id, limit))

    rows = cursor.fetchall()
    history = []
    for r in rows:
        ident_id = r["id"]
        # Fetch top candidate
        cursor.execute("""
        SELECT scientific_name, common_names_json, name_ta, confidence_score
        FROM identification_candidates
        WHERE identification_id = ?
        ORDER BY rank_order ASC
        LIMIT 1
        """, (ident_id,))
        top_cand = cursor.fetchone()

        common_names = []
        if top_cand and top_cand["common_names_json"]:
            try:
                common_names = json.loads(top_cand["common_names_json"])
            except Exception:
                common_names = []

        history.append({
            "id": ident_id,
            "date": r["created_at"],
            "provider": r["provider"],
            "confidence": r["confidence_score"],
            "confidenceLabel": r["confidence_label"],
            "isIdentified": bool(r["is_identified"]),
            "userConfirmedSpecies": r["user_confirmed_species"],
            "topCandidate": {
                "scientificName": top_cand["scientific_name"] if top_cand else "Unknown",
                "commonName": common_names[0] if common_names else "",
                "nameTa": top_cand["name_ta"] if top_cand else ""
            } if top_cand else None
        })

    conn.close()
    return history

# Initialize tables when imported
init_db()

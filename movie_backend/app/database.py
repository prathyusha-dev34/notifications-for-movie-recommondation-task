from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# =========================
# DATABASE URL
# =========================
DATABASE_URL = "sqlite:///./movie.db"

# =========================
# ENGINE
# =========================
engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False}  # SQLite special requirement
)

# =========================
# SESSION
# =========================
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

# =========================
# BASE MODEL
# =========================
Base = declarative_base()

# =========================
# DB DEPENDENCY (IMPORTANT)
# =========================
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
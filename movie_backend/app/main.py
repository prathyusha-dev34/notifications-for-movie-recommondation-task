
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine

# =========================
# ROUTES IMPORT
# =========================
from app.routes import (
    auth,
    favorites,
    history,
    dashboard,
    recommendations,
    movies,
    watchlist,
    reviews,
    profile
)

# ⭐ COLLECTIONS (DIRECT IMPORT FIX)
from app.routes.collections import router as collections_router

# ADMIN ROUTES
from app.routes.admin import router as admin_router

# =========================
# CREATE TABLES
# =========================
Base.metadata.create_all(bind=engine)

# =========================
# APP INIT
# =========================
app = FastAPI(title="Movie Backend API")

# =========================
# CORS CONFIG (SAFE FOR DEV)
# =========================
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =========================
# ROUTES REGISTER
# =========================
app.include_router(auth.router)
app.include_router(favorites.router)
app.include_router(history.router)
app.include_router(dashboard.router)
app.include_router(recommendations.router)
app.include_router(movies.router)
app.include_router(watchlist.router)
app.include_router(reviews.router)
app.include_router(profile.router)

# ⭐ COLLECTIONS ROUTE
app.include_router(
    collections_router,
    prefix="/api/collections",
    tags=["Collections"]
)

# =========================
# ADMIN ROUTES
# =========================
app.include_router(
    admin_router,
    prefix="/api/admin",
    tags=["Admin"]
)

# =========================
# ROOT ENDPOINT
# =========================
@app.get("/")
def root():
    return {
        "message": "Movie Backend API is running 🚀"
    }
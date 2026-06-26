from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine

# =========================
# APP INIT
# =========================
app = FastAPI(title="Movie Backend API")

# =========================
# CREATE TABLES
# =========================
Base.metadata.create_all(bind=engine)

# =========================
# CORS SETUP
# =========================
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
    "http://127.0.0.1:3000",

    # Old Vercel URL
    "https://collections-movie-recommondation-ol.vercel.app",

    # Current Vercel URL
    "https://notifications-for-movie-recommondation-task-uupi-dlmbg3m54.vercel.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =========================
# IMPORT ROUTES
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
    profile,
)

from app.routes.collections import router as collections_router
from app.routes.admin import router as admin_router
from app.routes.notifications import router as notifications_router

# =========================
# ROUTES
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

app.include_router(
    collections_router,
    prefix="/api/collections",
    tags=["Collections"],
)

app.include_router(
    notifications_router,
    prefix="/api/notifications",
    tags=["Notifications"],
)

app.include_router(
    admin_router,
    prefix="/api/admin",
    tags=["Admin"],
)

# =========================
# ROOT
# =========================
@app.get("/")
def root():
    return {
        "message": "Movie Backend API is running 🚀"
    }
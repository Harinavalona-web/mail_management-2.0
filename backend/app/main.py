from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers.user_router import router as user_router
from app.routers.acte_router import router as acte_router
from app.routers.piece_jointe_router import router as piece_jointe_router


app = FastAPI(
    title="Mail Management 2.0 API",
    version="2.0.0"
)

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(user_router, prefix="/users", tags=["Users"])
app.include_router(acte_router, prefix="/actes", tags=["Actes Administratifs"])
app.include_router(piece_jointe_router, prefix="/pieces", tags=["Pièces jointes"])


@app.get("/", tags=["Root"])
def root():
    return {
        "status": "OK",
        "message": "Mail Management 2.0 backend opérationnel 🚀"
    }

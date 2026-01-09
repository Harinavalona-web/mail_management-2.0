# backend/app/routers/acte_router.py
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.models import ActeAdministratif, User
from app.schemas import ActeCreate, ActeRead, ActeUpdate

router = APIRouter(
    prefix="/actes",
    tags=["actes"]
)

# --- GET all actes ---
@router.get("/", response_model=List[ActeRead])
def read_actes(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    actes = db.query(ActeAdministratif).offset(skip).limit(limit).all()
    return actes

# --- GET acte by id ---
@router.get("/{acte_id}", response_model=ActeRead)
def read_acte(acte_id: int, db: Session = Depends(get_db)):
    acte = db.query(ActeAdministratif).filter(ActeAdministratif.id == acte_id).first()
    if not acte:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Acte non trouvé")
    return acte

# --- POST create acte ---
@router.post("/", response_model=ActeRead, status_code=status.HTTP_201_CREATED)
def create_acte(acte_in: ActeCreate, db: Session = Depends(get_db)):
    # Vérifie si l'utilisateur responsable existe
    responsable = db.query(User).filter(User.id == acte_in.user_id).first()
    if not responsable:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Utilisateur responsable non trouvé")

    new_acte = ActeAdministratif(
        titre=acte_in.titre,
        description=acte_in.description,
        user_id=acte_in.user_id  # lien vers User
    )
    db.add(new_acte)
    db.commit()
    db.refresh(new_acte)
    return new_acte

# --- PUT update acte ---
@router.put("/{acte_id}", response_model=ActeRead)
def update_acte(acte_id: int, acte_in: ActeUpdate, db: Session = Depends(get_db)):
    acte = db.query(ActeAdministratif).filter(ActeAdministratif.id == acte_id).first()
    if not acte:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Acte non trouvé")

    if acte_in.titre is not None:
        acte.titre = acte_in.titre
    if acte_in.description is not None:
        acte.description = acte_in.description
    if acte_in.user_id is not None:
        # Vérifie si le nouvel utilisateur existe
        responsable = db.query(User).filter(User.id == acte_in.user_id).first()
        if not responsable:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Utilisateur responsable non trouvé")
        acte.user_id = acte_in.user_id

    db.commit()
    db.refresh(acte)
    return acte

# app/crud/acte_crud.py
from sqlalchemy.orm import Session
from typing import List, Optional

from app.models.acte_administratif import ActeAdministratif
from app.models.user import User
from app.schemas.acte_schema import ActeCreate, ActeUpdate


def get_actes(db: Session, skip: int = 0, limit: int = 100) -> List[ActeAdministratif]:
    """
    Récupère tous les actes administratifs avec pagination.
    """
    return db.query(ActeAdministratif).offset(skip).limit(limit).all()


def get_acte(db: Session, acte_id: int) -> Optional[ActeAdministratif]:
    """
    Récupère un acte administratif par son ID.
    """
    return db.query(ActeAdministratif).filter(ActeAdministratif.id == acte_id).first()


def create_acte(db: Session, acte_in: ActeCreate) -> ActeAdministratif:
    """
    Crée un nouvel acte administratif.
    """
    db_acte = ActeAdministratif(
        titre=acte_in.titre,
        description=acte_in.description,
        date_creation=acte_in.date_creation,
        user_id=acte_in.user_id
    )
    db.add(db_acte)
    db.commit()
    db.refresh(db_acte)
    return db_acte


def update_acte(db: Session, acte_id: int, acte_data: ActeUpdate) -> Optional[ActeAdministratif]:
    """
    Met à jour un acte administratif existant.
    """
    db_acte = get_acte(db, acte_id)
    if not db_acte:
        return None

    if acte_data.titre is not None:
        db_acte.titre = acte_data.titre
    if acte_data.description is not None:
        db_acte.description = acte_data.description
    if acte_data.date_creation is not None:
        db_acte.date_creation = acte_data.date_creation

    db.commit()
    db.refresh(db_acte)
    return db_acte


def delete_acte(db: Session, acte_id: int) -> bool:
    """
    Supprime un acte administratif par son ID.
    """
    db_acte = get_acte(db, acte_id)
    if not db_acte:
        return False

    db.delete(db_acte)
    db.commit()
    return True

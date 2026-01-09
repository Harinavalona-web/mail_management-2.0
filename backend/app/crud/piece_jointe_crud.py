# app/crud/piece_jointe_crud.py

from sqlalchemy.orm import Session
from app.models.piece_jointe import PieceJointe
from app.schemas.piece_jointe_schema import PieceJointeCreate, PieceJointeUpdate

# GET all pièces jointes
def get_pieces(db: Session, skip: int = 0, limit: int = 100):
    return db.query(PieceJointe).offset(skip).limit(limit).all()

# GET one pièce jointe by id
def get_piece(db: Session, piece_id: int):
    return db.query(PieceJointe).filter(PieceJointe.id == piece_id).first()

# CREATE new pièce jointe
def create_piece(db: Session, piece: PieceJointeCreate):
    db_piece = PieceJointe(**piece.model_dump())  # v2 de Pydantic: model_dump() au lieu de dict()
    db.add(db_piece)
    db.commit()
    db.refresh(db_piece)
    return db_piece

# UPDATE pièce jointe
def update_piece(db: Session, piece_id: int, piece: PieceJointeUpdate):
    db_piece = db.query(PieceJointe).filter(PieceJointe.id == piece_id).first()
    if not db_piece:
        return None
    update_data = piece.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_piece, key, value)
    db.commit()
    db.refresh(db_piece)
    return db_piece

# DELETE pièce jointe
def delete_piece(db: Session, piece_id: int):
    db_piece = db.query(PieceJointe).filter(PieceJointe.id == piece_id).first()
    if not db_piece:
        return None
    db.delete(db_piece)
    db.commit()
    return db_piece

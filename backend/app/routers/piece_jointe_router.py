from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.piece_jointe_schema import (
    PieceJointeCreate,
    PieceJointeRead,
    PieceJointeUpdate,
)
from app.crud.piece_jointe_crud import (
    get_piece,
    get_pieces,
    create_piece,
    update_piece,
    delete_piece,
)

router = APIRouter()

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.user_schema import UserCreate, UserRead, UserUpdate
from app.crud.user_crud import (
    get_user,
    get_users,
    create_user,
    update_user,
    delete_user,
    get_user_by_email,
)

router = APIRouter()

from sqlalchemy.orm import Session
from typing import Optional, List

from app.models.user import User
from app.schemas.user_schema import UserCreate, UserUpdate
from app.core.security import get_password_hash


def get_user(db: Session, user_id: int) -> Optional[User]:
    return db.query(User).filter(User.id == user_id).first()


def get_user_by_email(db: Session, email: str) -> Optional[User]:
    return db.query(User).filter(User.email == email).first()


def get_users(db: Session, skip: int = 0, limit: int = 100) -> List[User]:
    return db.query(User).offset(skip).limit(limit).all()


def create_user(db: Session, user_in: UserCreate) -> User:
    hashed_password = get_password_hash(user_in.mot_de_passe)

    user = User(
        nom=user_in.nom,                 # correspond à "nom" dans la DB
        email=user_in.email,
        mot_de_passe=hashed_password,    # correspond à "mot_de_passe"
        role=user_in.role if hasattr(user_in, "role") else "user",
        actif=user_in.actif if hasattr(user_in, "actif") else True
    )

    db.add(user)
    db.commit()
    db.refresh(user)
    return user


def update_user(db: Session, user: User, user_in: UserUpdate) -> User:
    if user_in.nom is not None:
        user.nom = user_in.nom

    if user_in.email is not None:
        user.email = user_in.email

    if user_in.mot_de_passe is not None:
        user.mot_de_passe = get_password_hash(user_in.mot_de_passe)

    if hasattr(user_in, "actif") and user_in.actif is not None:
        user.actif = user_in.actif

    if hasattr(user_in, "role") and user_in.role is not None:
        user.role = user_in.role

    db.commit()
    db.refresh(user)
    return user


def delete_user(db: Session, user: User) -> None:
    db.delete(user)
    db.commit()

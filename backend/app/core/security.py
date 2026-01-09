# backend/app/utils/security.py

from passlib.context import CryptContext
from datetime import datetime, timedelta
from typing import Optional
import jwt
from app.core.config import settings

# ------------------------------
# Configuration du hash des mots de passe
# ------------------------------
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_password_hash(password: str) -> str:
    """
    Hash un mot de passe en utilisant bcrypt.
    """
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    Vérifie qu'un mot de passe en clair correspond au hash.
    """
    return pwd_context.verify(plain_password, hashed_password)

# ------------------------------
# Fonctions pour JWT
# ------------------------------
def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    """
    Crée un JWT d'accès à partir des données fournies.
    """
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.JWT_SECRET_KEY, algorithm=settings.ALGORITHM)
    return encoded_jwt

def decode_access_token(token: str) -> dict:
    """
    Décode un JWT et retourne son payload.
    Retourne un dictionnaire vide si le token est invalide.
    """
    try:
        payload = jwt.decode(token, settings.JWT_SECRET_KEY, algorithms=[settings.ALGORITHM])
        return payload
    except jwt.PyJWTError:
        return {}

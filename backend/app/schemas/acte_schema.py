from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class ActeBase(BaseModel):
    titre: str
    description: Optional[str] = None
    date_creation: Optional[datetime] = None

class ActeCreate(ActeBase):
    user_id: Optional[int] = None  # facultatif à la création

class ActeUpdate(ActeBase):
    pass

class ActeRead(ActeBase):
    id: int
    responsable: Optional[str] = None  # nom de l'utilisateur

    class Config:
        orm_mode = True

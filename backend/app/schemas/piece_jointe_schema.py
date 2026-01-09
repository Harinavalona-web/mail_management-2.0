from pydantic import BaseModel, Field
from datetime import datetime

# V2 de Pydantic: utiliser from_attributes au lieu de orm_mode
class PieceJointeBase(BaseModel):
    filename: str = Field(..., description="Nom du fichier")
    url: str = Field(..., description="URL ou chemin du fichier")
    upload_date: datetime = Field(default_factory=datetime.utcnow, description="Date d'upload")

    model_config = {
        "from_attributes": True
    }

class PieceJointeCreate(PieceJointeBase):
    pass

class PieceJointeRead(PieceJointeBase):
    id: int

class PieceJointeUpdate(BaseModel):
    filename: str | None = None
    url: str | None = None

    model_config = {
        "from_attributes": True
    }

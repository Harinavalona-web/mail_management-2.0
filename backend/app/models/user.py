from sqlalchemy import Column, Integer, String, Boolean
from sqlalchemy.orm import relationship
from app.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    nom = Column(String(150), nullable=False)          # correspond à ta colonne "nom"
    email = Column(String(150), nullable=False, unique=True)
    mot_de_passe = Column(String, nullable=False)      # correspond à ta colonne "mot_de_passe"
    role = Column(String(50), nullable=True)
    actif = Column(Boolean, default=True)

    # Relation avec ActeAdministratif
    actes = relationship(
        "ActeAdministratif",
        back_populates="responsable",
        cascade="all, delete-orphan"
    )

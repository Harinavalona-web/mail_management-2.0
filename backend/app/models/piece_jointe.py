from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from app.database import Base

class PieceJointe(Base):
    __tablename__ = "pieces_jointes"

    id = Column(Integer, primary_key=True, index=True)
    nom_fichier = Column(String(250), nullable=False)
    chemin = Column(String, nullable=False)
    acte_id = Column(Integer, ForeignKey("actes_administratifs.id"))
    type_mime = Column(String(100), nullable=True)
    taille = Column(Integer, nullable=True)
    date_upload = Column(DateTime, nullable=True)

    acte = relationship("ActeAdministratif", back_populates="pieces_jointes")

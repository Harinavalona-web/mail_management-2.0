from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base
from app.models.user import User
from app.models.piece_jointe import PieceJointe


class ActeAdministratif(Base):
    __tablename__ = "actes_administratifs"

    id = Column(Integer, primary_key=True, index=True)
    titre = Column(String(250), nullable=False)
    description = Column(String, nullable=True)
    date_creation = Column(DateTime, nullable=True)

    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    responsable = relationship("User", back_populates="actes")  # ✅ relation correcte

    pieces_jointes = relationship(
        "PieceJointe",
        back_populates="acte",
        cascade="all, delete-orphan"
    )

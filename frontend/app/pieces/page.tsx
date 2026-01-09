"use client";

import { useEffect, useState } from "react";

type Piece = {
  id: number;
  title: string;
  description: string;
};

export default function PiecesPage() {
  const [pieces, setPieces] = useState<Piece[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPieces = async () => {
      try {
        const res = await fetch("/api/pieces");
        if (!res.ok) throw new Error(`Erreur HTTP: ${res.status}`);
        const data = await res.json();

        // ⚡ Normaliser la réponse en tableau
        const list = Array.isArray(data)
          ? data
          : Array.isArray(data.data)
          ? data.data
          : [];

        setPieces(list);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Erreur inconnue");
      } finally {
        setLoading(false);
      }
    };

    fetchPieces();
  }, []);

  if (loading) return <p>⏳ Chargement des pièces...</p>;
  if (error) return <p>❌ Erreur: {error}</p>;
  if (pieces.length === 0) return <p>⚠️ Aucune pièce trouvée.</p>;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "1.5rem",
      }}
    >
      {pieces.map((piece) => (
        <div
          key={piece.id}
          style={{
            backgroundColor: "#fff",
            border: "1px solid #87CEEB",
            padding: "1rem",
            borderRadius: "8px",
          }}
        >
          <h3>{piece.title}</h3>
          <p>{piece.description}</p>
        </div>
      ))}
    </div>
  );
}

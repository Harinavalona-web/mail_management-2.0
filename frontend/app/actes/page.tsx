"use client";

import { useState, useEffect } from "react";

interface Acte {
  id: number;
  titre: string;
  description: string;
  date_creation: string;
  responsable?: string;
}

export default function ActesPage() {
  const [actes, setActes] = useState<Acte[]>([]);
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [dateCreation, setDateCreation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_URL = "http://127.0.0.1:8000/actes/actes/";

  const fetchActes = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Impossible de récupérer les actes");
      const data = await res.json();
      setActes(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActes();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!titre || !dateCreation) {
      setError("Titre et date sont obligatoires");
      return;
    }

    try {
      setError("");
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          titre,
          description,
          date_creation: dateCreation
        })
      });

      if (!res.ok) {
        const errData = await res.text();
        throw new Error(`Erreur création : ${errData}`);
      }

      setTitre("");
      setDescription("");
      setDateCreation("");
      fetchActes();
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
      <h1>Gestion des Actes Administratifs</h1>

      <form onSubmit={handleCreate} style={{ marginBottom: 30 }}>
        <div>
          <label>Titre*</label>
          <input
            type="text"
            value={titre}
            onChange={(e) => setTitre(e.target.value)}
            required
            style={{ width: "100%", marginBottom: 10 }}
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ width: "100%", marginBottom: 10 }}
          />
        </div>
        <div>
          <label>Date de création*</label>
          <input
            type="date"
            value={dateCreation}
            onChange={(e) => setDateCreation(e.target.value)}
            required
            style={{ width: "100%", marginBottom: 10 }}
          />
        </div>
        <button type="submit" style={{ padding: "10px 20px" }}>
          Créer Acte
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <h2>Liste des Actes</h2>
      {loading ? (
        <p>Chargement...</p>
      ) : actes.length === 0 ? (
        <p>Aucun acte administratif disponible.</p>
      ) : (
        <ul>
          {actes.map((acte) => (
            <li key={acte.id} style={{ marginBottom: 10 }}>
              <strong>{acte.titre}</strong> - {acte.description} (
              {acte.date_creation})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

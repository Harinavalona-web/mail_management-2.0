import { useState } from "react";
import { api } from "../services/api";

export default function ActeForm({ onCreated }) {
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/actes", { titre, description });
      onCreated(res.data);
      setTitre("");
      setDescription("");
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la création de l'acte.");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
      <div>
        <label>Titre: </label>
        <input value={titre} onChange={(e) => setTitre(e.target.value)} required />
      </div>
      <div>
        <label>Description: </label>
        <input value={description} onChange={(e) => setDescription(e.target.value)} required />
      </div>
      <button type="submit">Créer Acte</button>
    </form>
  );
}

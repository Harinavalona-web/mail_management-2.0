"use client";

import React, { useState, useEffect } from "react";
import { User } from "../types"; // <-- changer l'import ici
import { createUser, updateUser } from "../services/userService";

interface UserFormProps {
  editUser?: User;
  onUserUpdated: () => void;
  onCancelEdit: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ editUser, onUserUpdated, onCancelEdit }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (editUser) {
      setUsername(editUser.username);
      setEmail(editUser.email);
    } else {
      setUsername("");
      setEmail("");
    }
  }, [editUser]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editUser) {
        await updateUser(editUser.id, { username, email });
      } else {
        await createUser({ username, email });
      }
      onUserUpdated();
      setUsername("");
      setEmail("");
    } catch (err: any) {
      alert(err.message || "Erreur lors de la sauvegarde de l'utilisateur");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 p-4 border rounded space-y-4">
      <div>
        <label className="block mb-1">Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 w-full"
          required
        />
      </div>
      <div>
        <label className="block mb-1">Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full"
          required
        />
      </div>
      <div className="space-x-2">
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          {editUser ? "Mettre à jour" : "Créer"}
        </button>
        {editUser && (
          <button
            type="button"
            className="bg-gray-500 text-white px-4 py-2 rounded"
            onClick={onCancelEdit}
          >
            Annuler
          </button>
        )}
      </div>
    </form>
  );
};

export default UserForm;

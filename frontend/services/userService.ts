// services/userService.ts
const API_BASE = "http://127.0.0.1:8000";

export interface User {
  id: number;
  nom: string;
  email: string;
  role: string;
  actif: boolean;
}

export interface UserCreate {
  nom: string;
  email: string;
  mot_de_passe: string;
  role: string;
  actif: boolean;
}

// Récupérer tous les utilisateurs
export async function fetchUsers(): Promise<User[]> {
  const res = await fetch(`${API_BASE}/users/`);
  if (!res.ok) {
    throw new Error("Erreur lors de la récupération des utilisateurs");
  }
  return res.json();
}

// Créer un nouvel utilisateur
export async function createUser(user: UserCreate): Promise<User> {
  const res = await fetch(`${API_BASE}/users/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.detail || "Erreur création utilisateur");
  }
  return res.json();
}

// Mettre à jour un utilisateur
export async function updateUser(id: number, user: UserCreate): Promise<User> {
  const res = await fetch(`${API_BASE}/users/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.detail || "Erreur lors de la mise à jour de l'utilisateur");
  }
  return res.json();
}

// Supprimer un utilisateur
export async function deleteUser(id: number): Promise<void> {
  const res = await fetch(`${API_BASE}/users/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.detail || "Erreur lors de la suppression de l'utilisateur");
  }
}

"use client";
import React, { useEffect, useState } from "react";
import UserTable from "./UserTable";
import UserForm from "./UserForm";
import { fetchUsers, deleteUser } from "../services/userService";
import { User } from "../types"; // <-- utiliser le type global

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const loadUsers = async () => {
    try {
      const data = await fetchUsers();
      setUsers(data);
    } catch (err: any) {
      alert(err.message || "Erreur lors du chargement des utilisateurs");
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) {
      try {
        await deleteUser(id);
        loadUsers();
      } catch (err: any) {
        alert(err.message || "Erreur lors de la suppression");
      }
    }
  };

  const handleEdit = (user: User) => setEditingUser(user);
  const cancelEdit = () => setEditingUser(null);

  return (
    <div className="p-4">
      <UserForm
        onUserUpdated={loadUsers}
        editUser={editingUser || undefined}
        onCancelEdit={cancelEdit}
      />
      <UserTable users={users} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}

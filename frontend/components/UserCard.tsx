"use client";
import React from "react";
import { User } from "../services/userService";

interface UserCardProps {
  user: User;
}

export default function UserCard({ user }: UserCardProps) {
  return (
    <div className="border rounded p-4 shadow-md mb-2 bg-white">
      <h3 className="font-bold text-lg">{user.nom}</h3>
      <p>Email: {user.email}</p>
      <p>Rôle: {user.role}</p>
      <p>Actif: {user.actif ? "Oui" : "Non"}</p>
    </div>
  );
}

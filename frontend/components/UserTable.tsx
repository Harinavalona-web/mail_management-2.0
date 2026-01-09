// frontend/components/UserTable.tsx
import React from "react";
import { User } from "../types";

interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, onEdit, onDelete }) => {
  return (
    <table className="w-full border border-gray-300">
      <thead className="bg-gray-200">
        <tr>
          <th className="p-2 border">ID</th>
          <th className="p-2 border">Username</th>
          <th className="p-2 border">Email</th>
          <th className="p-2 border">Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td className="p-2 border">{user.id}</td>
            <td className="p-2 border">{user.username}</td>
            <td className="p-2 border">{user.email}</td>
            <td className="p-2 border space-x-2">
              <button
                className="bg-blue-500 text-white px-2 py-1 rounded"
                onClick={() => onEdit(user)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-2 py-1 rounded"
                onClick={() => onDelete(user.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
        {users.length === 0 && (
          <tr>
            <td colSpan={4} className="text-center p-4">
              Aucun utilisateur trouvé.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default UserTable;

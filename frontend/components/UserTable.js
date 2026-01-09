export default function UserTable({ users }) {
  return (
    <table border="1" cellPadding="10" style={{ borderCollapse: "collapse", width: "100%" }}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nom</th>
          <th>Email</th>
          <th>Rôle</th>
          <th>Actif</th>
        </tr>
      </thead>
      <tbody>
        {users.map((u) => (
          <tr key={u.id}>
            <td>{u.id}</td>
            <td>{u.nom}</td>
            <td>{u.email}</td>
            <td>{u.role}</td>
            <td>{u.actif ? "Oui" : "Non"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

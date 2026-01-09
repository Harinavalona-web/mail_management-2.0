export default function ActeTable({ actes }) {
  return (
    <table border="1" cellPadding="10" style={{ borderCollapse: "collapse", width: "100%" }}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Titre</th>
          <th>Description</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {actes.map((a) => (
          <tr key={a.id}>
            <td>{a.id}</td>
            <td>{a.titre}</td>
            <td>{a.description}</td>
            <td>{a.date_creation}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// app/page.tsx
import Link from "next/link";

export default function HomePage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem", alignItems: "center" }}>
      <h2 style={{ color: "#1E90FF" }}>Bienvenue dans Mail Management App</h2>
      <p style={{ textAlign: "center", maxWidth: "600px" }}>
        Gérez les utilisateurs, actes administratifs et pièces jointes de votre établissement avec une interface moderne et sécurisée.
      </p>

      <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap", justifyContent: "center" }}>
        <Link href="/users" style={cardStyle}>👤 Utilisateurs</Link>
        <Link href="/actes" style={cardStyle}>📝 Actes Administratifs</Link>
        <Link href="/pieces" style={cardStyle}>📎 Pièces Jointes</Link>
      </div>
    </div>
  );
}

const cardStyle: React.CSSProperties = {
  backgroundColor: "#fff",
  border: "2px solid #87CEEB",
  borderRadius: "12px",
  padding: "2rem",
  minWidth: "180px",
  textAlign: "center",
  fontWeight: 600,
  fontSize: "1.2rem",
  color: "#1E90FF",
  textDecoration: "none",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  transition: "transform 0.2s, box-shadow 0.2s",
  cursor: "pointer",
};

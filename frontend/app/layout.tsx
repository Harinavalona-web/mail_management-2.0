// app/layout.tsx
import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Mail Management App",
  description: "Gestion des courriers et actes administratifs",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body style={{ margin: 0, fontFamily: "Arial, sans-serif", backgroundColor: "#F0F8FF" }}>
        <header style={{
          backgroundColor: "#87CEEB",
          padding: "1rem 2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          color: "#fff",
          boxShadow: "0 2px 6px rgba(0,0,0,0.2)"
        }}>
          <h1 style={{ margin: 0 }}>✈️ Mail Management App</h1>
          <nav>
            <Link href="/" style={{ margin: "0 1rem", color: "#fff", textDecoration: "none", fontWeight: 600 }}>Accueil</Link>
            <Link href="/users" style={{ margin: "0 1rem", color: "#fff", textDecoration: "none", fontWeight: 600 }}>Utilisateurs</Link>
            <Link href="/actes" style={{ margin: "0 1rem", color: "#fff", textDecoration: "none", fontWeight: 600 }}>Actes</Link>
            <Link href="/pieces" style={{ margin: "0 1rem", color: "#fff", textDecoration: "none", fontWeight: 600 }}>Pièces</Link>
          </nav>
        </header>
        <main style={{ padding: "2rem" }}>
          {children}
        </main>
      </body>
    </html>
  );
}

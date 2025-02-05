import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "../styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Challenge Scores",
  description: "Suivez les performances des participants en temps réel !",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <header className="w-full flex justify-between items-center p-4 bg-gray-800 text-white">
          <h1 className="text-xl font-bold">Challenge Scores</h1>
          <nav>
            <Link href="/" className="mr-4 hover:underline">Accueil</Link>
            <Link href="/scores" className="mr-4 hover:underline">Scores</Link>
            <Link href="/auth/login" className="hover:underline">Admin</Link>
          </nav>
        </header>
        <main className="p-4">{children}</main>
        <footer className="w-full p-4 text-center bg-gray-800 text-white">
          © {new Date().getFullYear()} Challenge Scores - Tous droits réservés
        </footer>
      </body>
    </html>
  );
}

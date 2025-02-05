'use client';

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return <p>Chargement...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard Admin</h1>
      <p>Bienvenue, {session?.user?.name || session?.user?.email}!</p>
      <button 
        onClick={() => signOut()} 
        className="mt-4 bg-red-500 text-white px-4 py-2">
        Déconnexion
      </button>
    </div>
  );
}

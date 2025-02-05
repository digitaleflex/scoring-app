'use client';

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 sm:p-20 font-sans">
      <header className="w-full flex justify-between items-center p-4 bg-gray-800 text-white">
        <h1 className="text-xl font-bold">Challenge Scores</h1>
        <nav>
          <Link href="/scores" className="mr-4 hover:underline">Scores</Link>
          <Link href="/auth/login" className="hover:underline">Admin</Link>
        </nav>
      </header>
      
      <main className="flex flex-col gap-8 row-start-2 items-center text-center">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <h2 className="text-2xl font-bold">Bienvenue sur le Challenge</h2>
        <p className="text-lg text-gray-600 max-w-lg">
          Consultez les scores des participants et suivez leur progression jour après jour !
        </p>
        <Link href="/scores" className="bg-blue-500 text-white px-6 py-2 rounded-lg text-lg hover:bg-blue-600">
          Voir les Scores
        </Link>
      </main>
      
      <footer className="w-full p-4 text-center bg-gray-800 text-white">
        © {new Date().getFullYear()} Challenge Scores - Tous droits réservés
      </footer>
    </div>
  );
}
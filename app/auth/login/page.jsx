'use client';

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    
    if (result.error) {
      setError("Email ou mot de passe incorrect");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Connexion Admin</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 mb-2"
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 mb-4"
          required
        />
        <button type="submit" className="w-full bg-blue-500 text-white py-2">
          Se connecter
        </button>
      </form>
      <div className="mt-4">
        <button
          onClick={() => signIn("google")}
          className="bg-red-500 text-white px-4 py-2 mr-2"
        >
          Se connecter avec Google
        </button>
        <button
          onClick={() => signIn("github")}
          className="bg-gray-800 text-white px-4 py-2"
        >
          Se connecter avec GitHub
        </button>
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect } from "react";

export default function Admin() {
  const [participants, setParticipants] = useState([]);
  const [newParticipant, setNewParticipant] = useState("");
  const [score, setScore] = useState("");
  const [day, setDay] = useState("");

  useEffect(() => {
    fetch("/admin/api/participants")
      .then((res) => res.json())
      .then((data) => setParticipants(data));
  }, []);

  const addParticipant = async (e) => {
    e.preventDefault();
    if (!newParticipant) return alert("Le nom est requis !");
    
    const res = await fetch("/admin/api/participants", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newParticipant }),
    });

    const data = await res.json();
    if (res.ok) {
      setParticipants([...participants, data]);
      setNewParticipant("");
    } else {
      alert(data.error || "Erreur lors de l'ajout !");
    }
  };

  const addScore = async (participantId) => {
    if (!score || !day) return alert("Score et date requis !");
    
    const res = await fetch("/admin/api/scores", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ participantId, value: parseInt(score), day }),
    });

    if (res.ok) {
      setScore("");
      setDay("");
    } else {
      alert("Erreur lors de l'ajout du score !");
    }
  };

  const deleteParticipant = async (participantId) => {
    const res = await fetch(`/admin/api/participants?participantId=${participantId}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setParticipants(participants.filter(p => p.id !== participantId));
    } else {
      alert("Erreur lors de la suppression !");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Gestion des Participants et Scores</h1>
      
      <form onSubmit={addParticipant} className="mb-4">
        <input
          type="text"
          placeholder="Nom du participant"
          value={newParticipant}
          onChange={(e) => setNewParticipant(e.target.value)}
          className="border p-2 mr-2"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          Ajouter Participant
        </button>
      </form>
      
      <ul>
        {participants.map((participant) => (
          <li key={participant.id} className="border-b p-2 flex justify-between">
            {participant.name}
            <div>
              <input
                type="number"
                placeholder="Score"
                value={score}
                onChange={(e) => setScore(e.target.value)}
                className="border p-2 mr-2"
              />
              <input
                type="date"
                value={day}
                onChange={(e) => setDay(e.target.value)}
                className="border p-2 mr-2"
              />
              <button 
                onClick={() => addScore(participant.id)}
                className="bg-green-500 text-white px-4 py-2 mr-2">
                Ajouter Score
              </button>
              <button 
                onClick={() => deleteParticipant(participant.id)}
                className="bg-red-500 text-white px-4 py-2">
                Supprimer
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

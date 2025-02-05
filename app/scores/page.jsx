'use client';

import { useState, useEffect } from "react";

export default function Scores() {
  const [scores, setScores] = useState([]);
  const [day, setDay] = useState("");
  const [averages, setAverages] = useState({});
  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    fetchScores();
  }, [day, sortOrder]);

  const fetchScores = async () => {
    const url = day ? `/admin/api/scores?day=${day}` : `/admin/api/scores`;
    const res = await fetch(url);
    const data = await res.json();
    setScores(sortScores(data));
    calculateAverages(data);
  };

  const calculateAverages = (data) => {
    const totals = {};
    const counts = {};

    data.forEach((score) => {
      const name = score.participant.name;
      if (!totals[name]) {
        totals[name] = 0;
        counts[name] = 0;
      }
      totals[name] += score.value;
      counts[name] += 1;
    });

    const avg = {};
    for (const name in totals) {
      avg[name] = (totals[name] / counts[name]).toFixed(2);
    }
    setAverages(avg);
  };

  const sortScores = (data) => {
    return data.sort((a, b) => sortOrder === "asc" ? a.value - b.value : b.value - a.value);
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const getBadge = (average) => {
    if (average >= 10) return "🥇";
    if (average >= 8) return "🥈";
    return "🥉";
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Scores des Participants</h1>
      
      <label className="block mb-2">Filtrer par jour :</label>
      <input
        type="date"
        value={day}
        onChange={(e) => setDay(e.target.value)}
        className="border p-2 mb-4"
      />
      
      <button onClick={toggleSortOrder} className="mb-4 p-2 bg-blue-500 text-white">
        Trier par score ({sortOrder === "asc" ? "Croissant" : "Décroissant"})
      </button>
      
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Nom</th>
            <th className="border p-2">Score</th>
            <th className="border p-2">Jour</th>
            <th className="border p-2">Moyenne</th>
            <th className="border p-2">Badge</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((score, index) => (
            <tr key={index} className="border">
              <td className="border p-2">{score.participant.name}</td>
              <td className="border p-2">{score.value}</td>
              <td className="border p-2">{new Date(score.day).toLocaleDateString()}</td>
              <td className="border p-2">{averages[score.participant.name] || "-"}</td>
              <td className="border p-2">{getBadge(averages[score.participant.name])}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
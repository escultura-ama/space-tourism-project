"use client";
import { useState } from "react";
import styles from "./crew.module.css"; // optional if you want to style separately

const crewData = [
  { id: 1, name: "Crew 1", role: "Commander", bio: "Bio for crew 1." },
  { id: 2, name: "Crew 2", role: "Engineer", bio: "Bio for crew 2." },
  { id: 3, name: "Crew 3", role: "Pilot", bio: "Bio for crew 3." },
  { id: 4, name: "Crew 4", role: "Specialist", bio: "Bio for crew 4." }
];

export default function Crew() {
  const [index, setIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const nextCrew = () => {
    if (animating) return;
    setAnimating(true);

    setTimeout(() => {
      setIndex((prev) => (prev + 1) % crewData.length);
      setAnimating(false);
    }, 300);
  };

  const current = crewData[index];

  return (
    <div
      onClick={(e) => {
        if (!(e.target as HTMLElement).closest("button")) {
          nextCrew();
        }
      }}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        cursor: "pointer",
        overflow: "hidden",
        userSelect: "none"
      }}
    >
      <div
        style={{
          transition: "transform 0.3s ease",
          transform: animating ? "translateX(-20px)" : "translateX(0)"
        }}
      >
        <h2>{current.role}</h2>
        <h1>{current.name}</h1>
        <p>{current.bio}</p>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          nextCrew();
        }}
        style={{ marginTop: "20px", padding: "10px 20px" }}
      >
        Next Crew
      </button>
    </div>
  );
}

// guarino-branch/page.tsx
"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";

// Define the data structure
type CrewMember = {
  id: number;
  role: string;
  name: string;
  bio: string;
  image: string;
};

// Define the crew data
const CREW: CrewMember[] = [
  { id: 0, role: "Commander", name: "Douglas Hurley", bio: "Douglas Gerald Hurley is an American engineer, former Marine Corps pilot and former NASA astronaut. He launched into space for the third time as commander of Crew Dragon Demo-2.", image: "/images/crews/Douglas.png" },
  { id: 1, role: "Mission Specialist", name: "Mark Shuttleworth", bio: "Mark Richard Shuttleworth is the founder and CEO of Canonical, the company behind the Linux-based Ubuntu operating system. Shuttleworth became the first South African to travel to space as a space tourist.", image: "/images/crews/Mark.png" },
  { id: 2, role: "Pilot", name: "Victor Glover", bio: "Pilot on the first operational flight of the SpaceX Crew Dragon to the International Space Station. Glover is a commander in the U.S. Navy where he pilots an F/A-18. He was a crew member of Expedition 64, and served as a station systems flight engineer.", image: "/images/crews/Victor.png" },
  { id: 3, role: "Flight Engineer", name: "Anousheh Ansari", bio: "Anousheh Ansari is an Iranian American engineer and co-founder of Prodea Systems. Ansari was the fourth self-funded space tourist, the first self-funded woman to fly to the ISS, and the first Iranian in space.", image: "/images/crews/Anousheh.png" },
];

export default function CrewPage() {
  // State for carousel functionality
  const [index, setIndex] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const posRef = useRef({ startX: 0, currentX: 0 });

  // Function to move to a specific index, with looping logic
  const goToIndex = (target: number) => {
    let newIndex = target;
    if (newIndex < 0) newIndex = CREW.length - 1;
    if (newIndex >= CREW.length) newIndex = 0;
    setIndex(newIndex);
  };

  // Keyboard Navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goToIndex(index - 1);
      if (e.key === "ArrowRight") goToIndex(index + 1);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [index]);


  // Placeholder for the carousel UI (to be completed in other branches)
  return (
    <div className="min-h-screen pt-24 pb-8 bg-cover bg-no-repeat bg-center bg-[url('/images/bg/crew-bg.png')] lg:bg-[url('/images/bg/lg-crew-bg.png')] text-white">
      <section className="w-full h-full min-h-screen flex items-center justify-center relative overflow-hidden">
        <div
          ref={containerRef}
          className={`flex w-full transition-transform ${isDragging ? "duration-0" : "duration-500"} ease-in-out`}
          style={{ transform: `translateX(calc(-${index * 100}% + ${dragX}px))` }}
        >
          {/* Content will be mapped here */}
        </div>
      </section>
    </div>
  );
}
// Updated CrewCarousel with click + scroll swiping effect (looping crew 1 → 2 → 3 → 4 → 1)

"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

type CrewMember = {
  id: number;
  role: string;
  name: string;
  bio: string;
  image: string;
};

const CREW: CrewMember[] = [
  {
    id: 0,
    role: "Commander",
    name: "Douglas Hurley",
    bio: "Douglas Gerald Hurley is an American engineer, former Marine Corps pilot and former NASA astronaut. He launched into space for the third time as commander of Crew Dragon Demo-2.",
    image: "/images/crews/Douglas.png",
  },
  {
    id: 1,
    role: "Mission Specialist",
    name: "Mark Shuttleworth",
    bio: "Mark Richard Shuttleworth is the founder and CEO of Canonical, the company behind the Linux-based Ubuntu operating system. Shuttleworth became the first South African to travel to space as a space tourist.",
    image: "/images/crews/Mark.png",
  },
  {
    id: 2,
    role: "Pilot",
    name: "Victor Glover",
    bio: "Pilot on the first operational flight of the SpaceX Crew Dragon to the International Space Station. Glover is a commander in the U.S. Navy where he pilots an F/A-18. He was a crew member of Expedition 64, and served as a station systems flight engineer.",
    image: "/images/crews/Victor.png",
  },
  {
    id: 3,
    role: "Flight Engineer",
    name: "Anousheh Ansari",
    bio: "Anousheh Ansari is an Iranian American engineer and co-founder of Prodea Systems. Ansari was the fourth self-funded space tourist, the first self-funded woman to fly to the ISS, and the first Iranian in space.",
    image: "/images/crews/Anousheh.png",
  },
];

export default function CrewCarousel() {
  const [index, setIndex] = useState(0);
  const active = CREW[index];

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + CREW.length) % CREW.length);
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % CREW.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Mouse wheel scroll navigation
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (e.deltaY > 0) {
        // Scroll down → next crew
        setIndex((i) => (i + 1) % CREW.length);
      } else if (e.deltaY < 0) {
        // Scroll up → previous crew
        setIndex((i) => (i - 1 + CREW.length) % CREW.length);
      }
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    return () => window.removeEventListener("wheel", onWheel);
  }, []);

  // Click anywhere to swipe next
  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.tagName.toLowerCase() === "button") return;
    setIndex((i) => (i + 1) % CREW.length);
  };

  return (
    <section
      onClick={handleBackgroundClick}
      className="bg-lg-crew-bg bg-cover flex flex-col h-screen bg-black pt-20 md:pt-28 md:pb-0 lg:px-28 justify-evenly md:justify-start cursor-pointer"
    >
      <div className="flex text-white tracking-wider barlow-condensed mb-6 md:mb-10 lg:mb-20 justify-center md:justify-start md:ml-5 md:text-xl lg:pt-12 lg:text-2xl">
        <span className="opacity-25 mr-4 bold">02</span>
        <p> MEET YOUR CREW</p>
      </div>

      <div className="flex flex-col lg:flex-row justify-around items-center">
        <div className="px-8 mt-6 md:mt-0 text-center lg:text-left lg:h-full lg:w-1/2">
          <h2 className="Bellefair opacity-50 text-white tracking-wider uppercase md:text-xl lg:text-[32px]">
            {active.role}
          </h2>
          <h1 className="Bellefair text-2xl md:text-4xl md:mt-2 mb-6 md:mb-4 font-semibold text-white lg:text-[56px] mt-4 lg:mt-8 lg:leading-tight uppercase">
            {active.name}
          </h1>
          <p className="text-primaryText text-base barlow md:px-0 mb-8 md:mb-14 lg:px-0 lg:w-2/3 lg:mt-12">
            {active.bio}
          </p>

          <div className="mt-6 flex justify-center lg:justify-start" role="tablist" aria-label="Crew members">
            {CREW.map((m) => (
              <button
                key={m.id}
                onClick={() => setIndex(m.id)}
                className={`w-3 h-3 rounded-full mx-2 ${m.id === index ? "bg-white" : "bg-gray-500/40"}`}
                aria-selected={m.id === index}
                role="tab"
                aria-controls={`crew-panel-${m.id}`}
                tabIndex={0}
                title={m.name}
              />
            ))}
          </div>

          <div className="sr-only" aria-live="polite">{`${active.name} selected`}</div>
        </div>

        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end px-6 mt-8 lg:mt-0">
          <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-[420px] lg:h-[520px]">
            <Image src={active.image} alt={active.name} fill style={{ objectFit: "contain" }} />
          </div>
        </div>
      </div>
    </section>
  );
}

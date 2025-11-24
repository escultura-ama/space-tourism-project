"use client"

import React, { useEffect, useState, useRef } from "react";

// NextImage wrapper
const NextImage = ({ src, alt, ...props }: { src: string | { src: string }; alt: string } & React.ImgHTMLAttributes<HTMLImageElement>) => {
  const srcValue = typeof src === "string" ? src : src?.src || "";
  if (!srcValue) return null;
  return <img src={srcValue} alt={alt} {...props} />;
};

// Crew member type
type CrewMember = {
  id: number;
  role: string;
  name: string;
  bio: string;
  image: string;
};

// Crew data
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
  const [dragOffset, setDragOffset] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const startX = useRef(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [paused, setPaused] = useState(false);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + CREW.length) % CREW.length);
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % CREW.length);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  // Auto-play feature
  useEffect(() => {
    if (!paused) {
      intervalRef.current = setInterval(() => {
        setIndex((i) => (i + 1) % CREW.length);
      }, 5000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [paused]);

  // Handle drag
  const onPointerDown = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).tagName.toLowerCase() === "button") return;
    dragging.current = true;
    startX.current = e.clientX;
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    setDragOffset(e.clientX - startX.current);
  };

  const onPointerUp = () => {
    if (!dragging.current) return;
    if (dragOffset > 50) setIndex((i) => (i - 1 + CREW.length) % CREW.length); // swipe right
    else if (dragOffset < -50) setIndex((i) => (i + 1) % CREW.length); // swipe left
    setDragOffset(0);
    dragging.current = false;
  };

  // Reusable Dots component
  const Dots = ({ currentIndex }: { currentIndex: number }) => (
    <div className="flex mt-6">
      {CREW.map((m, idx) => (
        <button
          key={m.id}
          onClick={() => setIndex(idx)}
          className={`w-3 h-3 rounded-full mx-2 transition-transform transform hover:scale-125 ${idx === currentIndex ? "bg-white" : "bg-gray-500/40"
            }`}
          aria-label={`Go to ${m.name}`}
        />
      ))}
    </div>
  );

  return (
    <section
      className="w-full h-full min-h-screen flex flex-col items-center justify-start relative overflow-hidden select-none "
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{ touchAction: "pan-y" }} // allow vertical scrolling
    >
      {/* Heading */}
      <div className="flex w-full text-white tracking-wider barlow-condensed mb-6 md:mb-10 justify-center md:justify-start md:ml-5 md:text-xl lg:pt-12 lg:text-2xl">
        <span className="opacity-25 mr-4 bold">02</span>
        <p>MEET YOUR CREW</p>
      </div>

      {/* Slides wrapper */}
      <div
        ref={containerRef}
        className="flex w-full"
        style={{
          transform: `translateX(calc(${-index * 100}% + ${dragOffset}px))`,
          transition: dragging.current ? "none" : "transform 0.3s ease-out",
        }}
      >
        {CREW.map((member) => (
          <div
            key={member.id}
            className="flex flex-col-reverse lg:flex-row items-center justify-around w-full flex-shrink-0 "
          >
            {/* Info Section */}
            <div className="lg:w-1/2 text-center lg:text-left mt-6 lg:mt-0">
              <h2 className="Bellefair opacity-50 text-white tracking-wider uppercase md:text-xl lg:text-[32px]">
                {member.role}
              </h2>
              <h1 className="Bellefair text-2xl md:text-4xl lg:text-[56px] mt-4 mb-6 font-semibold text-white uppercase">
                {member.name}
              </h1>
              <p className="text-primaryText text-base barlow lg:w-2/3 mb-8 lg:mt-12">{member.bio}</p>

              {/* Dots desktop */}
              <div className="hidden lg:flex">
                <Dots currentIndex={index} />
              </div>
            </div>

            {/* Image Section */}
            <div className="lg:w-1/2 w-full flex flex-col items-center lg:items-end mt-8 lg:mt-0">
              <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-[420px] lg:h-[520px]">
                <NextImage src={member.image} alt={member.name} className="w-full h-full object-contain" />
              </div>

              {/* Dots mobile/tablet */}
              <div className="flex lg:hidden">
                <Dots currentIndex={index} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

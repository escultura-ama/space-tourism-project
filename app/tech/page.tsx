"use client";

import { useState } from "react";
import Image from "next/image";

interface Technology {
  id: number;
  name: string;
  title: string;
  description: string;
  imageSrc?: string;
}

const technologies: Technology[] = [
  {
    id: 1,
    name: "LAUNCH VEHICLE",
    title: "THE TERMINOLOGY…",
    description:
      "A launch vehicle or carrier rocket is a rocket-propelled vehicle used to carry a payload from Earth's surface to space, usually to Earth orbit or beyond. Our WEB-X carrier rocket is the most powerful in operation. Standing 150 metres tall, it's quite an awe-inspiring sight on the launch pad!",
    imageSrc: "/images/technologies/lg-launch.png",
  },
  {
    id: 2,
    name: "SPACEPORT",
    title: "THE TERMINOLOGY…",
    description:
      "A spaceport or cosmodrome is a facility for launching (and potentially landing) spacecraft, by analogy to the seaport for ships or airport for aircraft. Based in the famous Cape Canaveral, our spaceport is ideally situated to take advantage of the Earth's rotation for launch.",
    imageSrc: "/images/technologies/lg-spaceport.png",
  },
  {
    id: 3,
    name: "SPACE CAPSULE",
    title: "THE TERMINOLOGY…",
    description:
      "A space capsule is an often-crewed spacecraft that uses a blunt-body reentry design and has an integrated launch escape system, plus a parachute recovery system. Crew and cargo return to Earth inside modules.",
    imageSrc: "/images/technologies/lg-capsule.png",
  },
];

export default function Technology() {
  const [activeTab, setActiveTab] = useState(0);
  const tech = technologies[activeTab];

  return (
    <main className="bg-lg-tech-bg bg-cover flex flex-col min-h-screen bg-black md:justify-around pt-20 md:pt-28 pb-12 lg:pl-28">
      <div className="flex text-white tracking-wider barlow-condensed mb-6 md:mb-10 justify-center md:justify-start md:ml-5 md:text-xl lg:pt-12 lg:text-2xl">
        <span className="opacity-25 mr-4 bold">03</span>
        <p>SPACE LAUNCH 101</p>
      </div>

      <div className="flex-grow flex items-center justify-center">
        <div className="flex flex-col lg:flex-row text-center md:pb-28 lg:pb-0 items-center w-full">

          <div className="block md:hidden w-full flex justify-center mb-6">
            {tech.imageSrc && (
              <div className="relative w-screen left-1/2 -translate-x-1/2 h-[220px]">
              <Image
                src={tech.imageSrc}
                alt={tech.name}
                fill
                className="object-cover"
                sizes="100vw"
                priority
                />
              </div>
            )}
          </div>

          <div className="hidden md:block lg:hidden w-full flex justify-center mb-6">
            {tech.imageSrc && (
              <div className="relative w-screen left-1/2 -translate-x-1/2 h-[320px]">
              <Image
                src={tech.imageSrc}
                alt={tech.name}
                fill
                className="object-cover"
                sizes="100vw"
                priority
                />
              </div>
            )}
          </div>


          <div className="px-8 gap-4 lg:gap-8 flex lg:flex-col items-center justify-center">
            {technologies.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`flex cursor-pointer rounded-full w-10 h-10 md:w-16 md:h-16 items-center justify-center transition duration-150 ease-in-out ${
                  activeTab === index
                    ? "bg-white text-black"
                    : "border border-gray-400 text-gray-400 hover:text-white hover:border-white"
                }`}
              >
                <h2 className="Bellefair md:text-xl lg:text-2xl">
                  {index + 1}
                </h2>
              </button>
            ))}
          </div>

          <div className="lg:flex-1 lg:text-left lg:ml-12 px-8 lg:px-0">
            <h1 className="barlow-condensed text-primaryText tracking-widest uppercase mt-6 md:mt-14 lg:mt-0">
              {tech.title}
            </h1>
            <div className="px-8 lg:px-0">
              <h2 className="Bellefair text-2xl md:text-4xl font-semibold text-white mt-1 md:mt-4 mb-4 lg:mb-8 lg:text-[56px] lg:leading-tight">
                {tech.name}
              </h2>
              <p className="text-primaryText text-base barlow md:px-28 lg:px-0 lg:text-[18px] lg:w-2/3">
                {tech.description}
              </p>
            </div>
          </div>

          <div className="hidden lg:flex lg:items-center lg:justify-center lg:w-1/3 lg:pr-12">
            {tech.imageSrc ? (
              <Image
                src={tech.imageSrc}
                alt={tech.name}
                width={500}
                height={500}
                className="object-contain"
                priority
              />
            ) : null}
          </div>
        </div>
      </div>
    </main>
  );
}

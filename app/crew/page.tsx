
"use client";

import CrewCarousel from "../../components/CrewCarousel";

export default function CrewPage() {
  return (
    <div
      className="
        min-h-screen pt-24 pb-8
        bg-cover bg-no-repeat bg-center
        bg-[url('/images/bg/crew-bg.png')]
        lg:bg-[url('/images/bg/lg-crew-bg.png')]
        text-white
      "
    >
      

        <CrewCarousel />
      </div>
    
  );
}


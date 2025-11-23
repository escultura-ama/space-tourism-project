"use client";

import React from "react";

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
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 flex items-center gap-4">
          <span className="text-gray-500 font-extrabold">02</span>
          MEET YOUR CREW
        </h1>

        {/* Placeholder for content from other branches */}
      </div>
    </div>
  );
}

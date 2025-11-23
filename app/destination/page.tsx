'use client';

import { useState } from 'react';
import Image from 'next/image';
import { destinations } from './data';

function Destination() {
  const [activeDestinationIndex, setActiveDestinationIndex] = useState(0);
  const activeDestination = destinations[activeDestinationIndex];

  return (
    <div className="bg-destinations-bg lg:bg-lg-destinations-bg bg-cover flex flex-col min-h-screen bg-black pt-20 md:pt-28 pb-12 lg:px-28">
      <div className="flex text-white tracking-wider barlow-condensed mb-6 md:mb-10 lg:mb-16 justify-center md:justify-start md:ml-5 md:text-xl lg:pt-12 lg:text-2xl">
        <span className="opacity-25 mr-4 font-bold">01</span>
        <p> PICK YOUR DESTINATION</p>
      </div>
      <div className="lg:flex-row lg:flex lg:justify-evenly">
        <div className="flex justify-center lg:flex-1 p-10">
          <Image src={activeDestination.images.png} width={445} height={445} alt={activeDestination.name} className="mb-6" />
        </div>
        <div className="lg:items-start lg:flex-1 flex flex-col justify-between">
          <div className="px-8 text-center lg:text-left md:mt-8 lg:mt-0 lg:px-0 lg:top-0">
            <div className="barlow-condensed text-primaryText tracking-wider inline-flex gap-6 my-4 lg:my-0">
              {destinations.map((dest, index) => (
                <button key={dest.name} onClick={() => setActiveDestinationIndex(index)} className={`uppercase cursor-pointer hover:text-gray-400 hover:underline hover:underline-offset-8 transition duration-150 ease-in-out ${activeDestinationIndex === index ? 'text-white underline underline-offset-8' : ''}`}>
                  {dest.name}
                </button>
              ))}
            </div>
            <h2 className="Bellefair text-6xl text-white my-4 uppercase lg:text-[100px] lg:mt-10">{activeDestination.name}</h2>
            <p className="text-white text-base barlow md:px-24 lg:px-0 lg:w-2/3">{activeDestination.description}</p>
            <hr className="border-[#383B4B] h-0.5 mt-6 lg:mt-12" />
          </div>
          <div className="mt-8 lg:mt-0 text-center md:flex align-top items-center justify-center md:justify-around md:px-16 lg:items-start lg:justify-items-start lg:justify-start lg:px-0 lg:mb-4 lg:text-left">
            <div className="uppercase lg:mr-20">
              <p className="text-primaryText barlow-condensed tracking-wider mb-1">Avg. Distance</p>
              <p className="Bellefair text-3xl text-white">{activeDestination.distance}</p>
            </div>
            <div className="uppercase mt-4 md:mt-0">
              <p className="text-primaryText barlow-condensed tracking-wider mb-1">Est. travel time</p>
              <p className="Bellefair text-3xl text-white">{activeDestination.travel}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Destination

import React from 'react';

function Crew() {
  // The 'crew-bg.png' is located in '/public/images/bg/crew-bg.png'
  // and 'lg-crew-bg.png' is located in '/public/images/bg/lg-crew-bg.png'.
  // We use Tailwind CSS classes to set these as background images,
  // making sure to use the correct path relative to the 'public' folder.
  // The default background is 'crew-bg.png', and it switches to 'lg-crew-bg.png'
  // at the 'lg' breakpoint (typically 1024px, or desktop).

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
        <h1 className="text-3xl font-bold mb-8">
          <span className="text-gray-500 font-extrabold mr-4">02</span>
          MEET YOUR CREW
        </h1>
        
 
        
      </div>
    </div>
  );
}

export default Crew;
// turaya-branch/page.tsx (Only the added or modified parts)

// ... (Existing code: imports, types, CREW data, state, goToIndex, pointer handlers, main render structure)

export default function CrewPage() {
  // ... (Existing state, refs, functions)

  return (
    <div className="min-h-screen pt-24 pb-8 bg-cover bg-no-repeat bg-center bg-[url('/images/bg/crew-bg.png')] lg:bg-[url('/images/bg/lg-crew-bg.png')] text-white">
      <section
        className="w-full h-full min-h-screen flex items-center justify-center relative overflow-hidden"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        <div
          ref={containerRef}
          className={`flex w-full transition-transform ${isDragging ? "duration-0" : "duration-500"} ease-in-out`}
          style={{ transform: `translateX(calc(-${index * 100}% + ${dragX}px))` }}
        >
          {CREW.map((member, idx) => (
            <div key={idx} className="flex flex-col-reverse lg:flex-col xl:flex-row items-center justify-around w-full flex-shrink-0 px-6 select-none">
              {/* Info */}
              <div className="lg:w-full xl:w-1/2 px-8 text-center xl:text-left mt-6 xl:mt-0 pointer-events-none order-2 xl:order-1">
                <h2 className="Bellefair opacity-50 text-white tracking-wider uppercase md:text-xl lg:text-[32px]">{member.role}</h2>
                <h1 className="Bellefair text-2xl md:text-4xl lg:text-[56px] mt-4 mb-6 font-semibold text-white uppercase">{member.name}</h1>
                <p className="text-primaryText text-base barlow lg:w-2/3 mb-8 xl:mt-12">{member.bio}</p>
                
                {/* Desktop buttons at bottom of info */}
                <div className="hidden lg:flex mt-6 pointer-events-auto">
                  {CREW.map((m, i) => (
                    <button 
                      key={i} 
                      onClick={() => goToIndex(i)} 
                      className={`w-3 h-3 rounded-full mx-2 transition-transform transform hover:scale-125 ${index === i ? "bg-white" : "bg-gray-500/40"}`} 
                    />
                  ))}
                </div>
              </div>
              
              {/* Image */}
              <div className="lg:w-full xl:w-1/2 flex flex-col items-center mt-8 xl:mt-0 pointer-events-none order-1 xl:order-2">
                <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-80 lg:h-80 xl:w-[420px] xl:h-[520px]">
                  <Image src={member.image} alt={member.name} fill style={{ objectFit: "contain" }} priority />
                </div>
                
                {/* Mobile & tablet buttons between image and info */}
                <div className="flex lg:hidden mt-6 pointer-events-auto">
                  {CREW.map((m, i) => (
                    <button 
                      key={i} 
                      onClick={() => goToIndex(i)} 
                      className={`w-3 h-3 rounded-full mx-2 transition-transform transform hover:scale-125 ${index === i ? "bg-white" : "bg-gray-500/40"}`} 
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
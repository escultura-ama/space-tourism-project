// baculi-branch/page.tsx (Only the added or modified parts)

// ... (Existing code from guarino-branch: imports, types, CREW data, goToIndex, useEffect)

export default function CrewPage() {
  // ... (Existing state and posRef from guarino-branch)

  // Handlers for swipe functionality
  const onPointerDown = (e: React.PointerEvent) => {
    posRef.current.startX = e.clientX;
    posRef.current.currentX = e.clientX;
    setIsDragging(true);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    posRef.current.currentX = e.clientX;
    setDragX(posRef.current.currentX - posRef.current.startX);
  };

  const onPointerUp = () => {
    if (!isDragging) return;
    const delta = dragX;
    if (delta > 50) goToIndex(index - 1); // Swipe Right (to previous)
    else if (delta < -50) goToIndex(index + 1); // Swipe Left (to next)
    else goToIndex(index); // Snap back
    setIsDragging(false);
    setDragX(0);
  };

  // ... (Existing useEffect for keyboard navigation)

  return (
    <div className="min-h-screen pt-24 pb-8 bg-cover bg-no-repeat bg-center bg-[url('/images/bg/crew-bg.png')] lg:bg-[url('/images/bg/lg-crew-bg.png')] text-white">
      <section
        className="w-full h-full min-h-screen flex items-center justify-center relative overflow-hidden"
        // Apply pointer handlers to the section element
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp} // Handle leaving the container while dragging
      >
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
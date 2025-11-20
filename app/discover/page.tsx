
function Discover() {
  return (
    <div className="bg-[#0a0e19] min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[200px] sm:h-[300px] lg:h-[65vh] bg-gradient-to-b from-transparent to-[#0a0e19]">
        <img
          src="/images/banner.png"
          alt="banner"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0e19]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h4 className="Bellefair uppercase text-xl md:text-3xl lg:text-6xl text-white text-center px-4">
            Discover Space Mission
          </h4>
        </div>
      </div>
  )
}

export default Discover
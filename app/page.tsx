import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Image
        src="/images/bg/lg-home-bg.png"
        alt="Background Home"
        layout="fill"
        objectFit="cover"
        quality={100}
        className="-z-10 hidden md:block"
      />
      <Image
        src="/images/bg/home-bg.png"
        alt="Background Home"
        layout="fill"
        objectFit="cover"
        quality={100}
        className="-z-10 md:hidden"
      />
      <div className="relative flex flex-col lg:flex-row h-screen items-center place-content-around lg:px-36 lg:pt-32">
        <div className="px-8 items-center lg:items-start justify-center text-center flex flex-col lg:text-left">
          <p className="tracking-wider md:text-xl lg:text-3xl lg:text-widest barlow">
            SO, YOU WANT TO TRAVEL TO <br />
          </p>
          <h2 className="Bellefair text-6xl font-semibold text-white mt-6 mb-10 md:mb-12 md:text-9xl lg:text-[150px]">
            SPACE
          </h2>

          <p className="text-base md:w-3/5 lg:text-xl barlow">
            Let&apos;s face it; if you want to go to space, you might as well
            genuinely go to outer space and not hover kind of on the edge of it.
            Well sit back, and relax because we&apos;ll give you a truly out of
            this world experience!
          </p>
        </div>

        <Link passHref href="/destination">
          <div
            className="bg-white rounded-full w-32 h-32 md:w-56 md:h-56 items-center justify-center flex cursor-pointer duration-75 group "
          >
            <h2 className="md:text-3xl text-black z-10 px-7 py-14 rounded-full">
              EXPLORE
            </h2>
            <div
              className="absolute bg-white opacity-0 group-hover:opacity-20 rounded-full w-[300px] h-[300px] transition-all duration-300 pointer-events-none"
            />
          </div>
        </Link>

      </div ></div>
  );
}

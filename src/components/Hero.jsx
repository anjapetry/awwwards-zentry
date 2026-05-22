import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { TiLocationArrow } from "react-icons/ti";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isClicked, setIsClicked] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [loadedVideos, setLoadedVideos] = useState(0);

  const totalVideos = 4;
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const miniVideoRef = useRef(null);
  const nextVideoRef = useRef(null);

  const playVideoSafely = (videoElement) => {
    if (!videoElement) return;

    const playPromise = videoElement.play();
    if (playPromise?.catch) {
      playPromise.catch(() => {
        // Ignore autoplay rejections; user interaction can still start playback.
      });
    }
  };

  const handleVideoLoad = () => {
    setLoadedVideos((prev) => prev + 1);
  };

  useEffect(() => {
    if (loadedVideos === totalVideos - 1) {
      setIsLoading(false);
    }
  }, [loadedVideos]);

  // 0 % 4 = 0 + 1 = 1
  // 1 % 4 = 1 + 1 = 2
  // 2 % 4 = 2 + 1 = 3
  // 3 % 4 = 3 + 1 = 4
  // 4 % 4 = 0 + 1 = 1
  const upcomingVideoIndex = (currentIndex % totalVideos) + 1;

  const handleMiniVideoClick = () => {
    setIsClicked(true);

    setCurrentIndex(upcomingVideoIndex);
  };

  useGSAP(
    () => {
      if (isClicked) {
        if (prefersReducedMotion) {
          gsap.set("#next-video", {
            visibility: "visible",
            scale: 1,
            width: "100%",
            height: "100%",
          });
          playVideoSafely(nextVideoRef.current);
          return;
        }

        gsap.set("#next-video", { visibility: "visible" });
        gsap.to("#next-video", {
          transformOrigin: "center center",
          scale: 1,
          width: "100%",
          height: "100%",
          duration: 1,
          ease: "power1.inOut",
          onStart: () => playVideoSafely(nextVideoRef.current),
        });
        gsap.from("#current-video", {
          transformOrigin: "center center",
          scale: 0,
          duration: 1.5,
          ease: "power1.inOut",
        });
      }
    },
    {
      dependencies: [currentIndex, prefersReducedMotion],
      revertOnUpdate: true,
    },
  );

  useGSAP(() => {
    if (prefersReducedMotion) {
      gsap.set("#video-frame", {
        clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
        borderRadius: "0% 0% 40% 10%",
      });
      return;
    }

    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
      borderRadius: "0% 0% 40% 10%",
    });
    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0% 0% 0% 0%",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
        onEnter: () => playVideoSafely(miniVideoRef.current),
        onEnterBack: () => playVideoSafely(miniVideoRef.current),
      },
    });
  });

  const getVideoSrc = (index) => `videos/hero-${index}.mp4`;

  return (
    <section
      id="home"
      aria-label="Hero"
      className="relative h-dvh w-full overflow-x-hidden"
    >
      {isLoading && (
        <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500">
          {/* https://uiverse.io/G4b413l/tidy-walrus-92 */}
          <div className="three-body">
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
          </div>
        </div>
      )}

      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75"
      >
        <div>
          <div className="mask-clip-path absolute-center absolute z-50 mt-10 size-64 cursor-pointer overflow-hidden rounded-lg">
            <button
              type="button"
              onClick={handleMiniVideoClick}
              aria-label="Show next hero video"
              className="ease--in origin-center scale-100 opacity-100 transition-all duration-500 hover:scale-105 focus-visible:ring-2 focus-visible:ring-blue-100"
            >
              <video
                ref={miniVideoRef}
                src={getVideoSrc(upcomingVideoIndex)}
                autoPlay
                loop
                muted
                playsInline
                id="current-video"
                className="size-64 origin-center scale-150 object-cover object-center"
                onLoadedData={handleVideoLoad}
              />
            </button>
          </div>

          <video
            ref={nextVideoRef}
            src={getVideoSrc(currentIndex)}
            autoPlay
            loop
            muted
            playsInline
            id="next-video"
            className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
            onLoadedData={handleVideoLoad}
          />
          <video
            src={getVideoSrc(
              currentIndex === totalVideos - 1 ? 1 : currentIndex + 1,
            )}
            autoPlay
            loop
            muted
            playsInline
            className="absolute left-0 top-0 size-full object-cover object-center"
            onLoadedData={handleVideoLoad}
          />
        </div>
        <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75">
          G<b>a</b>ming
        </h1>

        <div className="absolute left-0 top-0 z-40 size-full">
          <section className="mt-24 px-5 sm:px-10">
            <h1 className="special-font hero-heading text-blue-100">
              redefi<b>n</b>e
            </h1>
            <p className="mb-5 max-w-64 font-robert-regular text-blue-100">
              Enter the Metagame Layer <br /> Unleash the Power of Play
            </p>
            <Button
              id="watch-trailer"
              title="Watch Trailer"
              type="button"
              onClick={handleMiniVideoClick}
              leftIcon={<TiLocationArrow className="h-6 w-6" />}
              containerClass="flex-center gap-1 bg-teal-300"
            />
          </section>
        </div>
      </div>
      <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black">
        G<b>A</b>MING
      </h1>
    </section>
  );
};
export default Hero;

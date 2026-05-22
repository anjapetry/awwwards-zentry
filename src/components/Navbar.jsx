import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { TiLocationArrow } from "react-icons/ti";
import { useWindowScroll } from "react-use";

import Button from "./Button";

const navItems = [
  { label: "Nexus", href: "#home" },
  { label: "Vault", href: "#features" },
  { label: "Prologue", href: "#story" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  // State for toggling audio and visual indicator
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Refs for audio and navigation container
  const navContainerRef = useRef(null);
  const audioElementRef = useRef(null);

  const { y: currentScrollY } = useWindowScroll();
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Toggle audio and visual indicator
  const toggleAudioIndicator = () => {
    setIsAudioPlaying((prev) => !prev);
  };

  const scrollToSection = (sectionId) => {
    const targetSection = document.getElementById(sectionId);
    if (!targetSection) return;

    targetSection.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  // Manage audio playback
  useEffect(() => {
    if (isAudioPlaying) {
      const playPromise = audioElementRef.current?.play();
      if (playPromise?.catch) {
        playPromise.catch(() => {
          // If playback is blocked, keep the UI responsive without throwing.
        });
      }
    } else {
      audioElementRef.current?.pause();
    }
  }, [isAudioPlaying]);

  useEffect(() => {
    if (currentScrollY === 0) {
      // Topmost position: show navbar without floating-nav
      setIsNavVisible(true);
      navContainerRef.current.classList.remove("floating-nav");
    } else if (currentScrollY > lastScrollY) {
      // Scrolling down: hide navbar and apply floating-nav
      setIsNavVisible(false);
      navContainerRef.current.classList.add("floating-nav");
    } else if (currentScrollY < lastScrollY) {
      // Scrolling up: show navbar with floating-nav
      setIsNavVisible(true);
      navContainerRef.current.classList.add("floating-nav");
    }

    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: prefersReducedMotion ? 0 : 0.2,
    });
  }, [isNavVisible, prefersReducedMotion]);

  return (
    <div
      ref={navContainerRef}
      className="fixed inset-x-0 top-4 z-50 h-16 border-none backdrop-blur-sm transition-all duration-700 sm:inset-x-6"
    >
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex size-full items-center justify-between p-4">
          {/* Logo and Product button */}
          <div className="flex items-center gap-7">
            <img src="/img/logo.png" alt="Zentry logo" className="h-12" />

            <Button
              id="product-button"
              title="Products"
              rightIcon={<TiLocationArrow className="h-6 w-6" />}
              type="button"
              onClick={() => scrollToSection("features")}
              containerClass="hidden items-center justify-center gap-1 bg-blue-50 md:flex"
              aria-label="Products"
            />
          </div>

          {/* Navigation Links and Audio Button */}
          <div className="flex h-full items-center tracking-wide">
            <div className="hidden md:block">
              {navItems.map((item) => (
                <a key={item.label} href={item.href} className="nav-hover-btn">
                  {item.label}
                </a>
              ))}
            </div>

            <button
              className="ml-10 flex items-center space-x-0.5"
              onClick={toggleAudioIndicator}
              aria-pressed={isAudioPlaying}
              aria-label={
                isAudioPlaying
                  ? "Pause dramatic soundtrack"
                  : "Play dramatic soundtrack"
              }
              aria-controls="background-audio"
            >
              {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
              <audio
                id="background-audio"
                className="hidden"
                aria-label="looped audio"
                ref={audioElementRef}
                src="/audio/loop.mp3"
                loop
              />

              {[1, 2, 3, 4].map((bar) => (
                <div
                  key={bar}
                  className={`indicator-line ${isAudioPlaying ? "active" : ""}`}
                  style={{
                    animationDelay: `${bar * 0.1}s`,
                    width: `${bar * 1.2}px`,
                    height: `${bar * 6}px`,
                    backgroundColor: "#fff",
                    transition:
                      "width 0.3s, height 0.3s, background-color 0.3s",
                    transform: isAudioPlaying ? "scale(1.2)" : "scale(1)",
                  }}
                />
              ))}
            </button>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;

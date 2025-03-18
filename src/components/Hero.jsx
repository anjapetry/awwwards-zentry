import React from "react";

const Hero = () => {
  return (
    <div className="relative h-dvh w-full overflow-x-hidden">
      Hero
      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75"
      >
        <div>
          <div className="mask-clip-path"></div>
        </div>
      </div>
    </div>
  );
};
export default Hero;

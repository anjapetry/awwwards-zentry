import AnimatedTitle from "./AnimatedTitle";
import { useRef } from "react";
import gsap from "gsap";
import RoundedCorners from "./RoundedCorners";

const Story = () => {
  const frameRef = useRef(null);

  const handleMouseLeave = () => {
    const element = frameRef.current;

    gsap.to(element, {
      duration: 0.3,
      rotateX: 0,
      rotateY: 0,
      ease: "power1.inOut",
    });
  };

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const element = frameRef.current;

    if (!element) return;

    const rect = element.getBoundingClientRect();
    const xPos = clientX - rect.left;
    const yPos = clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((yPos - centerY) / centerY) * -10;
    const rotateY = ((xPos - centerX) / centerX) * 10;

    gsap.to(element, {
      duration: 0.3,
      rotateX,
      rotateY,
      transformPerspective: 500,
      ease: "power1.inOut",
    });
  };

  return (
    <section id="story" className="min-h-dvh w-screen bg-black text-stone-200">
      <div className="flex size-full flex-col items-center py-10 pb-24">
        <p className="font-general text-base uppercase tracking-wider md:text-[14px]">
          reimagining digital game frontiers
        </p>
        <div className="relative size-full">
          <AnimatedTitle
            title="The st<b>o</b>ry of <br /> a hidden real<b>m</b>"
            aria-label="The story of a hidden realm"
            sectionId="#story"
            containerClass="pointer-events-none relative z-10 mt-5 text-center mix-blend-difference"
          />

          <div className="story-img-container">
            <div className="story-img-mask">
              <div className="story-img-content">
                <img
                  src="/img/entrance.webp"
                  alt="A stone portal entrance to a digital realm, featuring ethereal lighting and abstract geometric patterns"
                  ref={frameRef}
                  onMouseLeave={handleMouseLeave}
                  onMouseUp={handleMouseLeave}
                  //onMouseEnter={handleMouseLeave}
                  onMouseMove={handleMouseMove}
                  className="object-contain"
                />
              </div>
            </div>

            <RoundedCorners />
          </div>
        </div>


      </div>
    </section>
  );
};

export default Story;

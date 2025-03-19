import { useEffect, useRef } from "react";
import gsap from "gsap";

const AnimatedTitle = ({ title, containerClass }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {}, containerRef);
  }, []);

  return (
    <h2 className="{`animated-title ${containerClass}`}>">
      {title.split("<br />").map((line, index) => (
        <div
          key={index}
          className="flex-center max-w-full flex-wrap gap-2 px-10 md:gap-3"
        >
          {line.split(" ").map((word, idx) => (
            <span
              key={idx}
              className="animated-word"
              dangerouslySetInnerHTML={{ __html: word }}
            />
          ))}
        </div>
      ))}
    </h2>
  );
};

export default AnimatedTitle;

import { useEffect, useState } from "react";

export default function LoaderMii() {
  const order = [0, 1, 2, 5, 8, 7, 6, 3];
  const [activeIndex, setActiveIndex] = useState(0);

  const cubeSize = "w-3 h-3";
  const color = "bg-cyan-300";
  const speed = 80;

  const gradientDirection = {
    0: "bg-gradient-to-tl",
    1: "bg-gradient-to-t",
    2: "bg-gradient-to-tr",
    5: "bg-gradient-to-r",
    8: "bg-gradient-to-br",
    7: "bg-gradient-to-b",
    6: "bg-gradient-to-bl",
    3: "bg-gradient-to-l",
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % order.length);
    }, speed);
    return () => clearInterval(interval);
  }, [speed]);

  return (
    <div className="grid grid-cols-3 gap-1 justify-center items-center scale-50">
      {Array.from({ length: 9 }).map((_, i) => {
        const active = order[activeIndex];
        const prev = order[(activeIndex - 1 + order.length) % order.length];
        const next = order[(activeIndex + 1) % order.length];

        let opacityClass = "opacity-30";
        if (i === active) opacityClass = "opacity-100";
        else if (i === prev || i === next) opacityClass = "opacity-70";

        // Cube central : gradient orienté selon le cube actif
        const centralClass =
          i === 4
            ? `${gradientDirection[active]} from-cyan-100 via-cyan-400 to-cyan-500`
            : "";

        return (
          <div
            key={i}
            className={`${cubeSize} ${color} transform transition-all duration-300 ease-in-out ${opacityClass} ${centralClass}`}
          ></div>
        );
      })}
    </div>
  );
}

export { LoaderMii };

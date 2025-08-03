import { useEffect, useState } from "react";
import { RIGHT_INFO } from "./info.js";

export default function Info() {
  const [count, setCount] = useState(0);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(true); // Start fade out

      setTimeout(() => {
        setCount((prev) => (prev + 1) % RIGHT_INFO.length);
        setFade(false); // Fade in
      }, 300); // matches transition duration
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const item = RIGHT_INFO[count];

  return (
    <div className="info-container">
      <div
        className={`info-right ${fade ? "fade-out" : ""}`}
        style={{
          backgroundImage: `linear-gradient(to top,rgba(0, 0, 0, 0.66) 10%, rgba(0, 0, 0, 0)),url(${item.image})`,
        }}
      >
        <h1>{item.title}</h1>
        <p>{item.caption}</p>
      </div>
    </div>
  );
}

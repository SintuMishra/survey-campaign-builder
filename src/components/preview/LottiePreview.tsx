import { useEffect, useRef, useState } from "react";
import lottie from "lottie-web/build/player/lottie_light";

interface LottiePreviewProps {
  src: string;
  width: number;
  height: number;
  label: string;
}

export default function LottiePreview({ src, width, height, label }: LottiePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!containerRef.current || !src) return;
    setFailed(false);

    const animation = lottie.loadAnimation({
      container: containerRef.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: src,
      rendererSettings: { preserveAspectRatio: "xMidYMid meet" },
    });

    const handleError = () => setFailed(true);
    animation.addEventListener("data_failed", handleError);

    return () => {
      animation.removeEventListener("data_failed", handleError);
      animation.destroy();
    };
  }, [src]);

  return (
    <div
      ref={containerRef}
      className={`lottie-preview${failed ? " failed" : ""}`}
      role="img"
      aria-label={failed ? `${label} could not be rendered` : label}
      style={{ width, height }}
    >
      {failed && <span>Invalid Lottie JSON</span>}
    </div>
  );
}

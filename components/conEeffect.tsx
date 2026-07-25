"use client";

import { useEffect } from "react";
import confetti from "canvas-confetti";

export default function ConfettiEffect({ trigger }: { trigger: boolean }) {
  useEffect(() => {
    if (!trigger) return;

    const end = Date.now() + 3000;

    const colors = ["#f26e46", "#ffffff", "#240dbd"];

    function frame() {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: {
          x: 0,
          y: 0.6,
        },
        colors,
      });

      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: {
          x: 1,
          y: 0.6,
        },
        colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }

    frame();

  }, [trigger]);

  return null;
}
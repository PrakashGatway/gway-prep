"use client";

import { useEffect } from "react";

/**
 * Client-side copy protection. This is a deterrent only; it cannot secure
 * content from screenshots, browser developer tools, or downloaded assets.
 */
export function ContentProtection() {
  useEffect(() => {
    const prevent = (event: Event) => event.preventDefault();

    document.addEventListener("contextmenu", prevent);
    document.addEventListener("copy", prevent);
    document.addEventListener("cut", prevent);
    document.addEventListener("paste", prevent);
    document.addEventListener("dragstart", prevent);

    const style = document.createElement("style");
    style.id = "content-protection-style";
    style.textContent = `
      body {
        -webkit-user-select: none;
        user-select: none;
      }
      input, textarea, [contenteditable="true"] {
        -webkit-user-select: text;
        user-select: text;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.removeEventListener("contextmenu", prevent);
      document.removeEventListener("copy", prevent);
      document.removeEventListener("cut", prevent);
      document.removeEventListener("paste", prevent);
      document.removeEventListener("dragstart", prevent);
      style.remove();
    };
  }, []);

  return null;
}

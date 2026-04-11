"use client";
import * as LucideIcon from "lucide-react";

export default function ThreeDButton({
  children,
  onClick,
  bgColor = "bg-brand-orange",
  textColor = "text-black",
  rotate = 30,
  border = "border-brand-orange",
  icon
}) {
  const Icon = icon ? LucideIcon[icon] : null;

  return (
    <div
      className="flex mt-3 flex-wrap gap-2"
      style={{ perspective: "1000px" }}
    >
      <button
        onClick={onClick}
        className={`
          flex items-center gap-1
          ${bgColor}
          ${textColor}
          border-2 ${border}
          px-4 py-2 lg:px-6 lg:py-4
          rounded-[20px]
          font-bold
          shadow-md
          transition-all duration-300
        `}
        style={{
          transform: `rotateY(${rotate}deg)`,
          transformStyle: "preserve-3d",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.transform = "rotateY(0deg)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.transform = `rotateY(${rotate}deg)`)
        }
      >
        {icon && <Icon className="h-5 w-5 mr-2" />}
        {children}
      </button>
    </div>
  );
}

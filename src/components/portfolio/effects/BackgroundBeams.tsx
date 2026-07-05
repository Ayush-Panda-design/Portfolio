import { cn } from "@/lib/utils";

export function BackgroundBeams({ className }: { className?: string }) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <svg
        className="absolute h-full w-full"
        width="100%"
        height="100%"
        viewBox="0 0 696 316"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip)">
          <g filter="url(#filter)">
            <path
              d="M-380 -189C-380 -189 -312 216 152 343C616 470 684 875 684 875"
              stroke="url(#grad1)"
              strokeOpacity="0.12"
              strokeWidth="0.5"
            />
            <path
              d="M-373 -197C-373 -197 -305 208 159 335C623 462 691 867 691 867"
              stroke="url(#grad2)"
              strokeOpacity="0.12"
              strokeWidth="0.5"
            />
            <path
              d="M-366 -205C-366 -205 -298 200 166 327C630 454 698 859 698 859"
              stroke="url(#grad3)"
              strokeOpacity="0.12"
              strokeWidth="0.5"
            />
            <path
              d="M-359 -213C-359 -213 -291 192 173 319C637 446 705 851 705 851"
              stroke="url(#grad1)"
              strokeOpacity="0.1"
              strokeWidth="0.5"
            />
            <path
              d="M-352 -221C-352 -221 -284 184 180 311C644 438 712 843 712 843"
              stroke="url(#grad2)"
              strokeOpacity="0.1"
              strokeWidth="0.5"
            />
            <path
              d="M-345 -229C-345 -229 -277 176 187 303C651 430 719 835 719 835"
              stroke="url(#grad3)"
              strokeOpacity="0.1"
              strokeWidth="0.5"
            />
          </g>
        </g>
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop stopColor="#5eead4" stopOpacity="0" />
            <stop offset="0.5" stopColor="#5eead4" />
            <stop offset="1" stopColor="#38bdf8" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop stopColor="#38bdf8" stopOpacity="0" />
            <stop offset="0.5" stopColor="#818cf8" />
            <stop offset="1" stopColor="#5eead4" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop stopColor="#a78bfa" stopOpacity="0" />
            <stop offset="0.5" stopColor="#5eead4" />
            <stop offset="1" stopColor="#38bdf8" stopOpacity="0" />
          </linearGradient>
          <filter id="filter" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1" />
          </filter>
          <clipPath id="clip">
            <rect width="696" height="316" fill="white" />
          </clipPath>
        </defs>
      </svg>
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-bg" />
    </div>
  );
}

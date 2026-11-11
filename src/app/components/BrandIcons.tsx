import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

export function Github({ size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.65"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M9 19c-4 1.3-4-2-5.5-2.5M15 22v-3.4a3 3 0 0 0-.8-2.2c2.7-.3 5.5-1.3 5.5-6a4.7 4.7 0 0 0-1.2-3.3A4.4 4.4 0 0 0 18.4 4s-1-.3-3.5 1.3a12 12 0 0 0-6.3 0C6.2 3.7 5.1 4 5.1 4A4.4 4.4 0 0 0 5 7.1a4.7 4.7 0 0 0-1.2 3.3c0 4.7 2.8 5.7 5.5 6a3 3 0 0 0-.8 2.1V22" />
    </svg>
  );
}

export function Linkedin({ size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <rect x="3" y="9" width="4" height="12" rx=".5" />
      <circle cx="5" cy="4.5" r="2" />
      <path d="M11 21V9h4v1.7c1-2.9 6-2.6 6 2.8V21h-4v-7c0-2.4-2-2.4-2 0v7" />
    </svg>
  );
}

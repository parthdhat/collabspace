import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

export default function Button({
  children,
  isLoading = false,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || isLoading}
      className={`w-full rounded-lg bg-black px-4 py-3 text-white font-medium transition hover:bg-gray-800 disabled:opacity-60 ${className}`}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
}
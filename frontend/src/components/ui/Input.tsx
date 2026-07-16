import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export default function Input({
  label,
  error,
  ...props
}: InputProps) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium">
        {label}
      </label>

      <input
        {...props}
        className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-black"
      />

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}
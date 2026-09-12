import type { InputHTMLAttributes } from "react";

interface InputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  fullWidth?: boolean;
}

function Input({
  className = "",
  fullWidth = true,
  ...props
}: InputProps) {
  return (
    <input
      className={`
        ${fullWidth ? "w-full" : ""}
        rounded-lg
        border border-slate-700
        bg-slate-900
        px-3 py-2
        text-slate-100
        placeholder:text-slate-500
        outline-none
        transition
        focus:border-blue-500
        focus:ring-2
        focus:ring-blue-500/20
        disabled:cursor-not-allowed
        disabled:opacity-50

        ${className}
      `}
      {...props}
    />
  );
}

export default Input;
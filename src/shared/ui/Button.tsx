import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  fullWidth?: boolean;
  children: ReactNode;
}

function Button({
  variant = "primary",
  fullWidth = false,
  className = "",
  children,
  ...props
}: ButtonProps) {
  const variantStyles = {
    primary: `
      bg-emerald-500
      text-slate-950
      hover:bg-emerald-400
    `,

    secondary: `
      border border-emerald-500/40
      text-emerald-400
      hover:bg-emerald-500/10
    `,

    ghost: `
      text-slate-400
      hover:bg-slate-800
      hover:text-slate-200
    `,

    danger: `
      text-red-400
      hover:bg-red-500/10
    `,
  };

  return (
    <button
      className={`
        ${fullWidth ? "w-full" : ""}

        rounded-lg
        px-4 py-2
        font-medium
        transition
        disabled:cursor-not-allowed
        disabled:opacity-50

        ${variantStyles[variant]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
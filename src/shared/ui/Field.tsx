import type { ReactNode } from "react";

interface FieldProps {
  label?: string;
  required?: boolean;
  helpText?: string;
  error?: string;
  children: ReactNode;
}

function Field({
  label,
  required = false,
  helpText,
  error,
  children,
}: FieldProps) {
  return (
    <div className="space-y-2">
      {(label || helpText) && (
        <div className="flex items-center justify-between gap-3">
          {label && (
            <label className="block text-sm font-medium text-slate-200">
              {label}

              {required && (
                <span className="ml-1 text-red-400">*</span>
              )}
              
            </label>
          )}

          {helpText && (
            <span className="text-xs text-slate-400">
              {helpText}
            </span>
          )}
        </div>
      )}

      {children}

      {error && (
        <p className="text-sm text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}

export default Field;
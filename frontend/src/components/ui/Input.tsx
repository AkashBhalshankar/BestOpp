import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  className = '',
  id,
  ...props
}) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label htmlFor={inputId} className="block text-xs font-mono font-medium text-slate-300">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`w-full px-3 py-2 text-xs font-mono rounded bg-[var(--bg-canvas,#0A0D12)] border text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-1 transition-colors ${
          error
            ? 'border-red-500/80 focus:border-red-500 focus:ring-red-500/30'
            : 'border-[var(--border-color,#1F242F)] focus:border-blue-500 focus:ring-blue-500/30'
        } ${className}`}
        {...props}
      />
      {error && <p className="text-[11px] font-mono text-red-400">{error}</p>}
      {!error && helperText && <p className="text-[11px] font-mono text-slate-400">{helperText}</p>}
    </div>
  );
};

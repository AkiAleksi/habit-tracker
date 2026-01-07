'use client';

import { InputHTMLAttributes } from 'react';

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value: string;
  onChange: (value: string) => void;
}

export function Input({
  value,
  onChange,
  placeholder,
  maxLength = 50,
  autoFocus = false,
  id,
  type = 'text',
  disabled,
  autoComplete,
  ...rest
}: InputProps) {
  return (
    <input
      id={id}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      maxLength={maxLength}
      autoFocus={autoFocus}
      disabled={disabled}
      autoComplete={autoComplete}
      className="w-full rounded-xl border-2 px-4 py-3 text-base outline-none transition-all focus:ring-2 disabled:opacity-50"
      style={{
        backgroundColor: 'var(--color-surface)',
        borderColor: 'var(--color-border)',
        color: 'var(--color-text)',
        // @ts-expect-error CSS custom property
        '--tw-ring-color': 'var(--color-primary)',
      }}
      {...rest}
    />
  );
}

'use client';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit';
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  disabled?: boolean;
  className?: string;
}

export function Button({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  disabled = false,
  className = '',
}: ButtonProps) {
  const baseStyles = 'rounded-xl px-6 py-3 font-medium transition-all cursor-pointer active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed';

  const variantStyles = {
    primary: 'text-white',
    secondary: 'border-2',
    ghost: 'hover:opacity-70',
    danger: 'text-white',
  };

  const variantInlineStyles = {
    primary: {
      backgroundColor: 'var(--color-primary)',
    },
    secondary: {
      backgroundColor: 'transparent',
      borderColor: 'var(--color-border)',
      color: 'var(--color-text)',
    },
    ghost: {
      backgroundColor: 'transparent',
      color: 'var(--color-text-muted)',
    },
    danger: {
      backgroundColor: 'var(--color-accent)',
    },
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      style={variantInlineStyles[variant]}
    >
      {children}
    </button>
  );
}

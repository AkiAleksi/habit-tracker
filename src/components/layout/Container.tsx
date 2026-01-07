'use client';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function Container({ children, className = '' }: ContainerProps) {
  return (
    <div className={`mx-auto max-w-md px-4 ${className}`}>
      {children}
    </div>
  );
}

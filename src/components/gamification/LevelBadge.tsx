'use client';

import { Level } from '@/lib/gamification';

interface LevelBadgeProps {
  level: Level;
  size?: 'sm' | 'md' | 'lg';
  showTitle?: boolean;
  animate?: boolean;
}

export function LevelBadge({ level, size = 'md', showTitle = true, animate = false }: LevelBadgeProps) {
  const sizeClasses = {
    sm: 'h-8 w-8 text-lg',
    md: 'h-12 w-12 text-2xl',
    lg: 'h-20 w-20 text-4xl',
  };

  const titleSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-lg',
  };

  return (
    <div className="flex items-center gap-3">
      <div
        className={`
          level-badge flex items-center justify-center rounded-xl
          ${sizeClasses[size]}
          ${animate ? 'level-up-animation' : ''}
        `}
        style={{
          border: '2px solid var(--color-primary)',
          boxShadow: animate ? undefined : '0 0 20px rgba(35, 134, 54, 0.2)',
        }}
      >
        <span className="drop-shadow-lg">{level.icon}</span>
      </div>

      {showTitle && (
        <div className="flex flex-col">
          <span
            className={`font-bold ${titleSizes[size]}`}
            style={{ color: 'var(--color-text)' }}
          >
            {level.title}
          </span>
          <span
            className="font-mono text-xs"
            style={{ color: 'var(--color-text-muted)' }}
          >
            Taso {level.level}
          </span>
        </div>
      )}
    </div>
  );
}

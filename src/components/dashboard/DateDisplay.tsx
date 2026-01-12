'use client';

import { formatDateFi } from '@/utils/date';

interface DateDisplayProps {
  date?: Date;
}

export function DateDisplay({ date = new Date() }: DateDisplayProps) {
  const formattedDate = formatDateFi(date);
  const dayNumber = date.getDate();

  return (
    <div className="flex items-center gap-3">
      <div
        className="flex h-12 w-12 items-center justify-center rounded-xl font-mono text-xl font-bold"
        style={{
          backgroundColor: 'var(--color-surface)',
          color: 'var(--color-text)',
          border: '1px solid var(--color-border)',
        }}
      >
        {dayNumber}
      </div>
      <p
        className="text-lg font-medium"
        style={{ color: 'var(--color-text)' }}
      >
        {formattedDate}
      </p>
    </div>
  );
}

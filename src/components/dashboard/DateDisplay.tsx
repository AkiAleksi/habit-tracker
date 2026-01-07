'use client';

import { formatDateFi } from '@/utils/date';

interface DateDisplayProps {
  date?: Date;
}

export function DateDisplay({ date = new Date() }: DateDisplayProps) {
  const formattedDate = formatDateFi(date);

  return (
    <p
      className="text-lg font-medium"
      style={{ color: 'var(--color-text)' }}
    >
      {formattedDate}
    </p>
  );
}

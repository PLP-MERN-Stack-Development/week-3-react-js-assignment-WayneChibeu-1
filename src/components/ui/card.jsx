import React from 'react';
import { cn } from '../../lib/utils';

export function Card({
  children,
  className,
  hover = false,
  gradient = false,
  ...props
}) {
  return (
    <div
      className={cn(
        'rounded-xl bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700',
        hover && 'transition-all duration-200 hover:shadow-lg',
        gradient && 'bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
} 
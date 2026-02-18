import * as React from 'react';

import { cn } from '@/lib/utils';

function Input({ className, type = 'text', ...properties }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot='input'
      className={cn(
        'border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring/40 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 flex h-9 w-full rounded-md border px-3 py-1 text-sm shadow-xs transition-colors outline-none focus-visible:ring-4 disabled:cursor-not-allowed disabled:opacity-60',
        className
      )}
      {...properties}
    />
  );
}

export { Input };

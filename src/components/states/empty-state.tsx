import type { ReactNode } from 'react';

type EmptyStateProperties = {
  title: string;
  description: string;
  action?: ReactNode;
};

export default function EmptyState({ title, description, action }: Readonly<EmptyStateProperties>) {
  return (
    <div className='surface flex min-h-44 flex-col items-center justify-center gap-3 p-6 text-center'>
      <h2 className='text-lg font-semibold'>{title}</h2>
      <p className='text-muted-foreground max-w-md text-sm'>{description}</p>
      {action}
    </div>
  );
}

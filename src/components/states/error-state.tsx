import { Button } from '@/components/ui/button';

type ErrorStateProperties = {
  title?: string;
  description: string;
  retryLabel?: string;
  onRetry?: () => void;
};

export default function ErrorState({
  title = 'Something went wrong',
  description,
  retryLabel = 'Try again',
  onRetry
}: Readonly<ErrorStateProperties>) {
  return (
    <div className='surface flex min-h-44 flex-col items-center justify-center gap-3 p-6 text-center'>
      <h2 className='text-lg font-semibold'>{title}</h2>
      <p className='text-muted-foreground max-w-md text-sm'>{description}</p>
      {onRetry ? (
        <Button
          variant='outline'
          onClick={() => {
            onRetry();
          }}
        >
          {retryLabel}
        </Button>
      ) : null}
    </div>
  );
}

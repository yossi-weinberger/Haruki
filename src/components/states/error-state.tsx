import { Button } from '@/components/ui/button';
import { useI18n } from '@/i18n/use-i18n';

type ErrorStateProperties = {
  title?: string;
  description: string;
  retryLabel?: string;
  onRetry?: () => void;
};

export default function ErrorState({
  title,
  description,
  retryLabel,
  onRetry
}: Readonly<ErrorStateProperties>) {
  const { t } = useI18n();
  const displayTitle = title ?? t('errorTitle');
  const displayRetryLabel = retryLabel ?? t('errorRetry');

  return (
    <div className='surface flex min-h-44 flex-col items-center justify-center gap-3 p-6 text-center'>
      <h2 className='text-lg font-semibold'>{displayTitle}</h2>
      <p className='text-muted-foreground max-w-md text-sm'>{description}</p>
      {onRetry ? (
        <Button
          variant='outline'
          onClick={() => {
            onRetry();
          }}
        >
          {displayRetryLabel}
        </Button>
      ) : null}
    </div>
  );
}

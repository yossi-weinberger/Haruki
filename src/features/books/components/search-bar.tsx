import { IconSearch } from '@tabler/icons-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useI18n } from '@/i18n/use-i18n';

type SearchBarProperties = {
  query: string;
  isLoading: boolean;
  onQueryChange: (query: string) => void;
};

export default function SearchBar({
  query,
  isLoading,
  onQueryChange
}: Readonly<SearchBarProperties>) {
  const { t } = useI18n();

  return (
    <form
      role='search'
      className='surface space-y-3 p-4'
      onSubmit={(event_) => {
        event_.preventDefault();
      }}
    >
      <label htmlFor='book-search-input' className='text-sm font-medium'>
        {t('searchInputLabel')}
      </label>
      <div className='flex min-w-0 flex-1 gap-2'>
        <div className='min-w-0 flex-1'>
          <Input
            id='book-search-input'
            name='search'
            autoComplete='off'
            value={query}
            placeholder={t('searchInputPlaceholder')}
            aria-label={t('searchInputLabel')}
            onChange={(event_) => {
              onQueryChange(event_.currentTarget.value);
            }}
          />
        </div>
        <Button
          type='submit'
          variant='outline'
          disabled={isLoading}
          aria-label={t('searchInputLabel')}
        >
          <IconSearch className='h-4 w-4' />
        </Button>
      </div>
      <p className='text-muted-foreground text-xs'>{t('searchInputHint')}</p>
    </form>
  );
}

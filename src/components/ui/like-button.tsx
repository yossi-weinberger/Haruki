import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

type LikeButtonProperties = {
  checked: boolean;
  disabled?: boolean;
  className?: string;
  onChange: (checked: boolean) => void;
};

export default function LikeButton({
  checked,
  disabled = false,
  className,
  onChange
}: Readonly<LikeButtonProperties>) {
  const [isBursting, setIsBursting] = useState(false);

  useEffect(() => {
    if (!checked) {
      setIsBursting(false);
    }
  }, [checked]);

  return (
    <button
      type='button'
      disabled={disabled}
      aria-pressed={checked}
      aria-label={checked ? 'Remove from wish list' : 'Add to wish list'}
      className={cn(
        'heart-button',
        checked ? 'is-active' : null,
        isBursting ? 'is-bursting' : null,
        className
      )}
      onClick={(event_) => {
        event_.stopPropagation();
        if (!checked) {
          setIsBursting(false);
          globalThis.setTimeout(() => {
            setIsBursting(true);
            globalThis.setTimeout(() => {
              setIsBursting(false);
            }, 520);
          }, 0);
        }

        onChange(!checked);
      }}
    >
      <span className='heart-button__icon'>
        <svg
          viewBox='0 0 24 24'
          className='heart-button__outline'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path d='M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z' />
        </svg>
        <svg
          viewBox='0 0 24 24'
          className='heart-button__filled'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path d='M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z' />
        </svg>
        <svg
          className='heart-button__celebrate'
          width={86}
          height={86}
          aria-hidden='true'
          xmlns='http://www.w3.org/2000/svg'
        >
          <polygon points='8,8 16,16' />
          <polygon points='8,43 16,43' />
          <polygon points='17,68 26,60' />
          <polygon points='78,8 70,16' />
          <polygon points='78,43 70,43' />
          <polygon points='70,68 61,60' />
        </svg>
      </span>
    </button>
  );
}

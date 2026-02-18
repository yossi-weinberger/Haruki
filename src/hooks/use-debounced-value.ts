import { useEffect, useState } from 'react';

export const useDebouncedValue = <TValue>(value: TValue, delayInMilliseconds: number): TValue => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeoutId = globalThis.setTimeout(() => {
      setDebouncedValue(value);
    }, delayInMilliseconds);

    return () => {
      globalThis.clearTimeout(timeoutId);
    };
  }, [delayInMilliseconds, value]);

  return debouncedValue;
};

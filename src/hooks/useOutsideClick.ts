import { useEffect, useRef } from 'react';

export function useOutsideClick(handler: () => void) {
  const windowRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (windowRef.current && !windowRef.current.contains(e.target as Node)) {
        console.log('Click outside', e.target);
        handler();
      }
    }

    document.addEventListener('click', handleClick, true);

    return () => document.removeEventListener('click', handleClick, true);
  }, [handler]);

  return windowRef;
}

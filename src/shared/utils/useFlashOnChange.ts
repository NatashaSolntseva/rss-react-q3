import { useEffect, useRef, useState } from 'react';

export function useFlashOnChange<T>(value: T, duration = 3000) {
  const [flash, setFlash] = useState(false);
  const prev = useRef<T>(value);
  console.log(prev);

  useEffect(() => {
    if (prev.current !== value) {
      setFlash(false);
      requestAnimationFrame(() => {
        setFlash(true);
        const id = setTimeout(() => setFlash(false), duration);
        return () => clearTimeout(id);
      });
      prev.current = value;
    }
  }, [value, duration]);

  return flash;
}

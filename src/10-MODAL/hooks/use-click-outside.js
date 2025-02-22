import { useEffect } from 'react';

export default function useClickOutside(elementRef, setIsOpen) {
  useEffect(() => {
    const cb = (e) => {
      if (elementRef.current && !elementRef.current?.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', cb);
    return () => {
      document.removeEventListener('mousedown', cb);
    };
  });
}

import { useEffect, useState } from 'react';

const useIsSticky = (ref: React.RefObject<HTMLElement | null>): boolean => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setIsSticky(rect.top <= 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [ref]);

  return isSticky;
};

export default useIsSticky;

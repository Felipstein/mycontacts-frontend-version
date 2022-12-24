import { useEffect, useState } from 'react';

export default function useContactsList() {
  const [isShiftPressed, setIsShiftPressed] = useState(false);

  useEffect(() => {
    function handleKeydown(event) {
      const { key } = event;

      if (key === 'Shift') {
        setIsShiftPressed(true);
      }
    }

    function handleKeyup(event) {
      const { key } = event;

      if (key === 'Shift') {
        setIsShiftPressed(false);
      }
    }

    document.addEventListener('keydown', handleKeydown);
    document.addEventListener('keyup', handleKeyup);

    return () => {
      document.removeEventListener('keydown', handleKeydown);
      document.removeEventListener('keyup', handleKeyup);
    };
  }, []);

  return {
    isShiftPressed,
  };
}

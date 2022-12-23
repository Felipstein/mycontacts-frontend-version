import { useEffect } from 'react';
import { Container } from './styles';

import ToastMessage from '../ToastMessage';
import { toastEventManager } from '../../../utils/toast';
import useAnimatedList from '../../../hooks/useAnimatedList';

export default function ToastContainer() {
  const {
    setItems,
    renderList,
    handleRemoveItems,
    handleAnimationEnd,
  } = useAnimatedList();

  useEffect(() => {
    function handleAddToast({ type, text, duration }) {
      setItems((prevState) => [
        ...prevState,
        {
          id: Math.random(), type, text, duration,
        },
      ]);
    }

    toastEventManager.on('addtoast', handleAddToast);
    return () => {
      toastEventManager.removeListener('addtoast', handleAddToast);
    };
  }, [setItems]);

  return (
    <Container>
      {renderList((item, { isLeaving }) => (
        <ToastMessage
          key={item.id}
          message={item}
          onRemoveMessage={handleRemoveItems}
          isLeaving={isLeaving}
          onAnimationEnd={handleAnimationEnd}
        />
      ))}
    </Container>
  );
}

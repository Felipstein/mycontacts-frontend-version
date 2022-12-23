import { useCallback, useState } from 'react';

export default function useAnimatedList(initialValues = []) {
  const [items, setItems] = useState(initialValues);
  const [pendingRemovalItemsIds, setPendingRemovalItemsIds] = useState([]);

  const handleRemoveItems = useCallback((id) => {
    setPendingRemovalItemsIds((prevState) => [...prevState, id]);
  }, []);

  const handleAnimationEnd = useCallback((id) => {
    setItems((prevState) => prevState.filter((item) => item.id !== id));
    setPendingRemovalItemsIds((prevState) => prevState.filter((itemId) => itemId !== id));
  }, []);

  return {
    items,
    setItems,
    pendingRemovalItemsIds,
    handleRemoveItems,
    handleAnimationEnd,
  };
}

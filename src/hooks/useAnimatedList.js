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

  const renderList = useCallback((renderItem) => (
    items.map((item) => renderItem(item, {
      isLeaving: pendingRemovalItemsIds.includes(item.id),
    }))
  ), [items, pendingRemovalItemsIds]);

  return {
    items,
    setItems,
    renderList,
    handleRemoveItems,
    handleAnimationEnd,
  };
}

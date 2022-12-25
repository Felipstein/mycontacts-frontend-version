import { memo, useEffect } from 'react';
import PropTypes from 'prop-types';

import xCircleIcon from '../../../assets/images/icons/x-circle.svg';
import checkCircleIcon from '../../../assets/images/icons/check-circle.svg';

import { Container } from './styles';

function ToastMessage({
  message, onRemoveMessage, isLeaving = false, animatedRef,
}) {
  const icons = {
    danger: [xCircleIcon, 'X'],
    success: [checkCircleIcon, 'Check'],
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onRemoveMessage(message.id);
    }, message.duration || 6000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [message, onRemoveMessage]);

  function handleRemoveToast() {
    onRemoveMessage(message.id);
  }

  return (
    <Container
      ref={animatedRef}
      type={message.type}
      onClick={handleRemoveToast}
      isLeaving={isLeaving}
      tabIndex={0}
      role="button"
    >
      {icons[message.type] && <img src={icons[message.type][0]} alt={icons[message.type][1]} />}
      <strong>{message.text}</strong>
    </Container>
  );
}

ToastMessage.propTypes = {
  message: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['default', 'success', 'danger']),
    duration: PropTypes.number,
  }).isRequired,
  onRemoveMessage: PropTypes.func.isRequired,
  isLeaving: PropTypes.bool,
  animatedRef: PropTypes.shape().isRequired,
};

export default memo(ToastMessage);

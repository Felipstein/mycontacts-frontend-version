import PropTypes from 'prop-types';

import { Container } from './styles';

import xCircleIcon from '../../../assets/images/icons/x-circle.svg';
import checkCircleIcon from '../../../assets/images/icons/check-circle.svg';

export default function ToastMessage({ text, type }) {
  const icons = {
    danger: [xCircleIcon, 'X'],
    success: [checkCircleIcon, 'Check'],
  };

  return (
    <Container type={type}>
      <img src={icons[type][0]} alt={icons[type][1]} />
      <strong>{text}</strong>
    </Container>
  );
}

ToastMessage.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['default', 'success', 'danger']),
};

ToastMessage.defaultProps = {
  type: 'default',
};

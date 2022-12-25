/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/function-component-definition */
// HOC -> Higher Order Component

import { useLocation, useNavigate } from 'react-router-dom';

export default function withRouter(Component) {
  return (props) => {
    const location = useLocation();
    const navigate = useNavigate();

    return <Component location={location} navigate={navigate} {...props} />;
  };
}

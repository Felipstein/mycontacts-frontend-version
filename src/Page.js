import { Component } from 'react';
import withRouter from './hocs/withRouter';

// eslint-disable-next-line react/prefer-stateless-function
class Page extends Component {
  render() {
    // console.log(this.props);

    return <h1>Class componente page</h1>;
  }
}

export default withRouter(Page);
// HOC -> Higher Order Component

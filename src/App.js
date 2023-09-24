import React from 'react';
import { connect } from 'react-redux';

import Interface from 'interface/Interface';
import Authentication from 'authentication/Authentication';

const App = ({ token }) => token ? <Interface /> : <Authentication />;

export default connect(
  ({ token }) => ({ token })
)(App)

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import requireAuth from 'utils/requireAuth';

import Main from './pages/Main';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

const App = () => (
  <Router>
    <Switch>
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      <Route path="/forgot-password" component={ForgotPassword} />
      <Route path="/reset-password/:token" component={ResetPassword} />
      <Route path="/" component={requireAuth(Main)} />
    </Switch>
  </Router>
);

export default App;

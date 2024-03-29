import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from '../auth/Register';
import Login from '../auth/Login';
import Alert from '../layout/Alert';
import Dashboard from '../dashboard/Dashboard';
import EditProfile from '../dashboard/EditProfile';
import Profiles from '../dashboard/Profiles';
import Recommended from '../dashboard/Recommended';
import Profile from '../dashboard/Profile';
import NotFound from '../layout/NotFound';
import PrivateRoute from '../routing/PrivateRoute';

const Routes = () => {
  return (
    <section className='container'>
      <Alert />
      <Switch>
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <Route exact path="/profiles" component={Profiles} />
        <Route exact path="/profile/:id" component={Profile} />
        <PrivateRoute exact path='/dashboard' component={Dashboard} />
        <PrivateRoute exact path='/recommendations' component={Recommended} />
        <PrivateRoute exact path="/edit-profile" component={EditProfile} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;

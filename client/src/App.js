import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import routes from './routes';
import withTracker from './withTracker';
import { getSession } from './auth';

import 'bootstrap/dist/css/bootstrap.min.css';
import './shards-dashboard/styles/shards-dashboards.1.1.0.min.css';

export default () => (
  <Router basename={process.env.REACT_APP_BASENAME || ''}>
    <div>
      {routes.map(route => (
        <Route
          key={route.path}
          path={route.path}
          exact={route.exact}
          component={withTracker(props => {
            if (route.auth && !getSession()) {
              return (<Redirect to='/login' />);
            }
            return (
              <route.layout {...props}>
                <route.component {...props} />
              </route.layout>
            );
          })}
        />
      ))}
    </div>
  </Router>
);

import React from 'react';
import { Redirect } from 'react-router-dom';

// Layout Types
import { DefaultLayout } from './layouts';

// Route Views
import BlogOverview from './views/BlogOverview';
import UserProfileLite from './views/UserProfileLite';
import AddNewPost from './views/AddNewPost';
import Errors from './views/Errors';
import ComponentsOverview from './views/ComponentsOverview';
import Tables from './views/Tables';
import BlogPosts from './views/BlogPosts';
import Login from './views/Login';
import Users from './views/Users';
import Events from './views/Events';
import Keys from './views/Keys';
import SystemEvents from './views/SystemEvents';
import SystemUsers from './views/SystemUsers';
import Dashboard from './views/Dashboard';

export default [
  {
    path: '/',
    exact: true,
    layout: DefaultLayout,
    component: () => <Redirect to='/dashboard' />
  },
  {
    path: '/dashboard',
    auth: true,
    layout: DefaultLayout,
    component: Dashboard
  },
  {
    path: '/users',
    auth: true,
    layout: DefaultLayout,
    component: Users
  },
  {
    path: '/events',
    auth: true,
    layout: DefaultLayout,
    component: Events
  },
  {
    path: '/keys',
    auth: true,
    layout: DefaultLayout,
    component: Keys
  },
  {
    path: '/system_events',
    auth: true,
    layout: DefaultLayout,
    component: SystemEvents
  },
  {
    path: '/system_users',
    auth: true,
    layout: DefaultLayout,
    component: SystemUsers
  },
  {
    path: '/blog-overview',
    auth: true,
    layout: DefaultLayout,
    component: BlogOverview
  },
  {
    path: '/user-profile-lite',
    layout: DefaultLayout,
    component: UserProfileLite
  },
  {
    path: '/add-new-post',
    layout: DefaultLayout,
    component: AddNewPost
  },
  {
    path: '/errors',
    layout: DefaultLayout,
    component: Errors
  },
  {
    path: '/components-overview',
    layout: DefaultLayout,
    component: ComponentsOverview
  },
  {
    path: '/tables',
    layout: DefaultLayout,
    component: Tables
  },
  {
    path: '/blog-posts',
    layout: DefaultLayout,
    component: BlogPosts
  },
  {
    path: '/login',
    layout: props => (<DefaultLayout {...props} noNavbar noFooter noSidebar />),
    component: Login
  }
];

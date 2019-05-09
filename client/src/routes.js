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

export default [
  {
    path: '/',
    exact: true,
    layout: DefaultLayout,
    component: () => <Redirect to='/blog-overview' />
  },
  {
    path: '/users',
    auth: true,
    layout: DefaultLayout,
    component: Users
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
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Auth from './utils/auth.js'
import { Navigate } from 'react-router-dom';

import App from './App.jsx';
import Welcome from './pages/Welcome'
import About from './pages/About';
import Contact from './pages/Contact';
import Features from './pages/Features';
import Home from './pages/Home';
import Error from './pages/Error';
import Login from './pages/Login';
import Signup from './pages/Signup';
import TC from './pages/T&C'
import Privacy from './pages/Privacy'
import Warehouse from './pages/Warehouse'
import Product from './pages/Product.jsx'
import Organization from './pages/Organization'
import PkConfig from './pages/PkConfig'
import Category from './pages/Category'




const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Welcome />
      }, {
        path: '/About',
        element: <About />
      }, {
        path: '/Contact',
        element: <Contact />
      }, {
        path: '/Features',
        element: <Features />
      }, {
        path: '/Login',
        element: Auth.loggedIn() ? <Navigate to='/Home' /> : <Login />
      }, {
        path: '/Signup',
        element: Auth.loggedIn() ? <Navigate to='/Home' /> : <Signup />
      }, {
        path: '/Privacy',
        element: <Privacy />
      }, {
        path: '/T&C',
        element: <TC />
      }, {
        path: '/Home',
        element: Auth.loggedIn() ? <Home /> : <Navigate to='/Login' />
      }, {
        path: '/Warehouse',
        element: Auth.loggedIn() ? <Warehouse /> : <Navigate to='/Login' />
      }, {
        path: '/Product',
        element: Auth.loggedIn() ? <Product /> : <Navigate to='/Login' />
      }, {
        path: '/Organization',
        element: Auth.loggedIn() ? <Organization /> : <Navigate to='/Login' />
      }, {
        path: '/PkConfig',
        element: Auth.loggedIn() ? <PkConfig /> : <Navigate to='/Login' />
      }, {
        path: '/Category',
        element: Auth.loggedIn() ? <Category /> : <Navigate to='/Login' />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)


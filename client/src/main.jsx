import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import Welcome from './pages/Welcome.jsx'
import About from './pages/About';
import Contact from './pages/Contact';
import Features from './pages/Features';
import Home from './pages/Home';
import Error from './pages/Error';
// import Login from './pages/Login';
// import Signup from './pages/Signup';

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
      },

      //  {
      //   path: '/login',
      //   element: <Login />
      // }, {
      //   path: '/signup',
      //   element: <Signup />
      // },
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)


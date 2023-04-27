import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { store, persistor} from './redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import './index.css';

import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Search from './pages/Search';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/search',
    element: <Search />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={router} />
    </PersistGate>
  </Provider>
);

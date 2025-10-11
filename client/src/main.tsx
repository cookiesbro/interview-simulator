import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { TrainingPage } from './pages/training/TrainingPage.tsx';
import { HomePage } from './pages/training/home/HomePage.tsx';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/training',
    element: <TrainingPage />,
  },
  // В будущем здесь можно добавить роут для /stats
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);

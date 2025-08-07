import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { TrainingPage } from './pages/training/TrainingPage';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <div>Главная страница. <a href="/training">Перейти к тренировке</a></div>,
  },
  {
    path: '/training',
    element: <TrainingPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
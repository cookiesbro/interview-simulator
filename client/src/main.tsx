import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Link } from 'react-router-dom';
import { TrainingPage } from './pages/training/TrainingPage';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <div>
        <h1>Главная страница Симулятора</h1>
        <p>
          <Link to="/training">Перейти к тренировке</Link>
        </p>
      </div>
    ),
  },
  {
    path: '/training',
    element: <TrainingPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);

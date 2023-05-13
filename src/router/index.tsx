import { createBrowserRouter } from 'react-router-dom';
import Home from '../views/Home';
import Board from '../views/Board';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/board',
    element: <Board />,
  },
  {
    path: '*',
    element: <Home />,
  },
]);

export { router };

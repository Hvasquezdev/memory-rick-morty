import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useGameStore } from '../store/useGameStore';
import Home from '../views/Home';
import Board from '../views/Board';
import ProtectedRoute from '../guards/ProtectedRoute';

const Router = () => {
  const isPlaying = useGameStore((state) => state.isPlaying);
  const isWinner = useGameStore((state) => state.isWinner);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route
          path='/board'
          element={
            <ProtectedRoute hasAccess={isPlaying}>
              <Board />
            </ProtectedRoute>
          }
        />
        <Route path='/results' element={
          <ProtectedRoute hasAccess={isWinner}>
            <p>Finalizado!</p>
          </ProtectedRoute>
        } />
        <Route path='*' element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};
export default Router;

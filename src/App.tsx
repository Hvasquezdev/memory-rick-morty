import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import Header from './components/shared/Header';
import './App.scss';

function App() {
  return (
    <div className='app'>
      <Header />

      <main className='app__content'>
        <RouterProvider router={router} />
      </main>
    </div>
  );
}

export default App;

import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { useCharactersRandomIds } from './hooks/useCharactersRandomIds';
import { useCharactersByIds } from './hooks/useCharactersByIds';
import { useCharactersStore } from './store/useCharactersStore';
import Header from './components/shared/Header';
import './App.scss';

function App() {
  const { ids } = useCharactersRandomIds();
  const { characters } = useCharactersByIds(ids);
  const { setCharacters } = useCharactersStore();

  useEffect(() => {
    if (characters.length) {
      setCharacters([...characters, ...characters].sort((a, b) => a.id - b.id));
    }
  }, [characters, setCharacters]);

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

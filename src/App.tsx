import { useEffect } from 'react';
import { useCharactersRandomIds } from './hooks/useCharactersRandomIds';
import { useCharactersByIds } from './hooks/useCharactersByIds';
import { useCharactersStore } from './store/useCharactersStore';
import Router from './router';
import Header from './components/shared/Header';
import './App.scss';

function App() {
  const { ids } = useCharactersRandomIds();
  const { characters } = useCharactersByIds(ids);
  const { setCharacters, setLoadingCharacters } = useCharactersStore();

  useEffect(() => {
    if (characters.length) {
      setCharacters([...characters, ...characters]);
      setLoadingCharacters(false);
    }
  }, [characters, setCharacters, setLoadingCharacters]);

  return (
    <div className='app'>
      <Header />

      <main className='app__content'>
        <Router />
      </main>
    </div>
  );
}

export default App;

import Router from './router';
import Header from './components/shared/Header';
import './App.scss';

function App() {
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

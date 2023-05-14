import Title from '../../components/Title';
import Button from '../../components/Button';
import { useGameStore } from '../../store/useGameStore';
import { useNavigate } from 'react-router-dom';
import './Results.scss';

const Results = () => {
  const { setIsPlaying, turnsPlayed, setIsWinner, setTurnsPlayed } = useGameStore();
  const navigate = useNavigate();

  const handleEndGame = () => {
    setIsPlaying(false);
    setTurnsPlayed(0);
    setIsWinner(false);
  };

  const handleResetGame = () => {
    setTurnsPlayed(0);
    setIsWinner(false);
    navigate('/board');
  };

  return (
    <div className='results'>
      <Title type='h2' size='xxl'>
        ¡Felicitaciones!
      </Title>

      <p className='results__details'>Terminaste el juego con {turnsPlayed} turnos</p>

      <div className='results__actions'>
        <Button onClick={handleResetGame}>Repetir</Button>
        <Button color='yellow-300' onClick={handleEndGame}>
          Inicio
        </Button>
      </div>
    </div>
  );
};

export default Results;

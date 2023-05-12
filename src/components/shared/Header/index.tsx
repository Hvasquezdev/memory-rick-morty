import rickAndMortyLogo from '../../../assets/img/ricky_morty_logo.png';
import './Header.scss';

const Header = () => {
  return (
    <header className='header'>
      <img
        className='header__logo'
        src={rickAndMortyLogo}
        alt='Rick and Morty'
        width={520}
        height={180}
      />

      <h1 className='header__title'>Juego de memoria</h1>
    </header>
  );
};

export default Header;

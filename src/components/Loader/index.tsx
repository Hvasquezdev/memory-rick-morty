import loadingPortalGif from '../../assets/img/ricky_morty_portal.gif';
import './Loader.scss';

const Loader = () => {
  return (
    <div className='loader'>
      <img className='loader__image' src={loadingPortalGif} alt='Rick and morty animated portal' />
    </div>
  );
};

export default Loader;

import { useSelector } from 'react-redux';
import './viewSingleUser.css';
import { RootState } from '../../store/store';
import { getDate } from '../../utils/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendarDays,
  faEnvelope,
  faGenderless,
  faIdCard,
  faMobileRetro,
  faPenToSquare,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export function ViewSingleUser() {
  // Initializations for labels
  const user = useSelector((state: RootState) => state.user.user);
  const lightDarkMode = useSelector((state: RootState) => state.lightDarkMode.darkMode);

  return (
    <div className={`viewSingleUser ${lightDarkMode ? 'dark' : ''}`}>
      <div className="viewSingleUser__picture">
        <div className="viewSingleUser__images">
          <img
            className={`viewSingleUser__image ${lightDarkMode ? 'dark' : ''}`}
            src={user?.profilePhoto}
            alt="perfil"
          />
        </div>
        <p className="viewSingleUser__name">
          <span className="viewSingleUser__desc">Nombre: </span>
          <span className="viewSingleUser__span">{user?.firstName}</span>
        </p>
        <p className="viewSingleUser__name">
          <span className="viewSingleUser__desc">Apellido: </span>
          <span className="viewSingleUser__span">{user?.lastName}</span>
        </p>
      </div>
      <div className="viewSingleUser__info">
        <div className="viewSingleUser__dates">
          <p className="viewSingleUser__name">
            <span className="viewSingleUser__desc">
              <FontAwesomeIcon icon={faCalendarDays} />
              Creado:{' '}
            </span>
            <span className="viewSingleUser__span">{getDate(user?.createdAt!)}</span>
          </p>
          <p className="viewSingleUser__name">
            <span className="viewSingleUser__desc">
              <FontAwesomeIcon icon={faCalendarDays} />
              Actualizado:{' '}
            </span>
            <span className="viewSingleUser__span">{getDate(user?.updatedAt!)}</span>
          </p>
        </div>
        <p className="viewSingleUser__name">
          <span className="viewSingleUser__desc">
            <FontAwesomeIcon icon={faGenderless} />
            Sexo:
          </span>
          <span className="viewSingleUser__span">{user?.sex}</span>
        </p>
        <p className="viewSingleUser__name">
          <span className="viewSingleUser__desc">
            <FontAwesomeIcon icon={faMobileRetro} />
            Telefono:
          </span>
          <span className="viewSingleUser__span">{user?.phoneNumber}</span>
        </p>
        <p className="viewSingleUser__name">
          <span className="viewSingleUser__desc">
            <FontAwesomeIcon icon={faUsers} />
            Permisos:
          </span>
          <span className="viewSingleUser__span">{user?.permissions}</span>
        </p>
        <p className="viewSingleUser__name">
          <span className="viewSingleUser__desc">
            <FontAwesomeIcon icon={faIdCard} />
            DNI:
          </span>
          <span className="viewSingleUser__span">{user?.dni}</span>
        </p>
        <p className="viewSingleUser__name">
          <span className="viewSingleUser__desc">
            <FontAwesomeIcon icon={faEnvelope} />
            E-mail:
          </span>
          <span className="viewSingleUser__span">{user?.email}</span>
        </p>
        <Link
          to={`../${user?._id as string}`}
          className={`button__link list__button ${lightDarkMode ? 'dark' : ''}`}
        >
          <FontAwesomeIcon icon={faPenToSquare} />
          Editar
        </Link>
      </div>
    </div>
  );
}

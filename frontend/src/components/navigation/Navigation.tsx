import { NavLink } from 'react-router-dom';
import './navigation.css';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  faClipboardList,
  faEgg,
  faHome,
  faLock,
  faRightFromBracket,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { authenticatedAction, authorizedAction } from '../../store/authSlice';
import { authenticate } from './authenticate';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.userAuth.userAuth);
  const isLoogged = useSelector((state: RootState) => state.userAuth.isLoogged);
  const permissions = useSelector((state: RootState) => state.userAuth.permissions);
  const isAuthorized =
    permissions === 'gerente' || permissions === 'administrador' || permissions === 'empleado';

  const getUser = async () => {
    try {
      const authenticatedUser = await authenticate();
      dispatch(authenticatedAction(authenticatedUser));
      if (authenticatedUser !== undefined) {
        dispatch(authorizedAction(authenticatedUser.permissions));
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (isLoogged !== 'logout') {
      const get = () => {
        getUser();
      };
      get();
    }
  }, [isLoogged]);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="navigation">
      <nav className="navigation__bar">
        <div className="navigation__logo">Logo</div>
        <ul className="navigation__list-sm">
          <li className="navigation__item-sm">
            <NavLink
              className={({ isActive }) => `navigation__link-sm ${isActive ? 'active' : ''}`}
              to={'#'}
            >
              <FontAwesomeIcon className="navigation__icon-sm" icon={faHome} />
              <p className={`navigation__text-sm`}>Inicio</p>
            </NavLink>
          </li>
          <li className="navigation__item-sm">
            <NavLink
              className={({ isActive }) => `navigation__link-sm ${isActive ? 'active' : ''}`}
              to={'#'}
            >
              <FontAwesomeIcon className="navigation__icon-sm" icon={faClipboardList} />
              <p className={`navigation__text-sm`}>Categorias</p>
            </NavLink>
          </li>
          <li className="navigation__item-sm">
            <NavLink
              className={({ isActive }) => `navigation__link-sm ${isActive ? 'active' : ''}`}
              to={'#'}
            >
              <FontAwesomeIcon className="navigation__icon-sm" icon={faEgg} />
              <p className={`navigation__text-sm`}>Productos</p>
            </NavLink>
          </li>
        </ul>
        <div className="navigation__account">
          {!user ? (
            <NavLink
              className={({ isActive }) => `navigation__login ${isActive ? 'active' : ''}`}
              to={'login'}
            >
              <FontAwesomeIcon className="navigation__icon-sm" icon={faUser} />
              <p className={`navigation__text-sm`}>Iniciar Sesion</p>
            </NavLink>
          ) : null}
          {user && isAuthorized ? (
            <NavLink
              className={({ isActive }) => `navigation__login ${isActive ? 'active' : ''}`}
              to={'/admin'}
            >
              <FontAwesomeIcon className="navigation__icon-sm" icon={faLock} />
              <p className={`navigation__text-sm`}>Recursos para administradores</p>
            </NavLink>
          ) : null}
          {user ? (
            <NavLink
              className={({ isActive }) => `navigation__login ${isActive ? 'active' : ''}`}
              to={'/logout'}
            >
              <FontAwesomeIcon className="navigation__icon-sm" icon={faLock} />
              <p className={`navigation__text-sm`}>Cerrar Sesion</p>
            </NavLink>
          ) : null}
        </div>
        <div className="navigation__hamburger" onClick={toggleNavbar}>
          <div className={`navigation__line ${isOpen ? 'open' : ''}`}></div>
          <div className={`navigation__line ${isOpen ? 'open' : ''}`}></div>
          <div className={`navigation__line ${isOpen ? 'open' : ''}`}></div>
        </div>
      </nav>
      <ul className={`navigation__list-lg ${!isOpen ? 'open' : ''}`}>
        <li className="navigation__item-lg">
          <NavLink
            className={({ isActive }) => `navigation__link-lg ${isActive ? 'active' : ''}`}
            to={'asd'}
          >
            <FontAwesomeIcon className="navigation__icon-lg" icon={faHome} />
            <p className={`navigation__text-lg`}>Inicio</p>
          </NavLink>
        </li>
        <li className="navigation__item-lg">
          <NavLink
            className={({ isActive }) => `navigation__link-lg ${isActive ? 'active' : ''}`}
            to={'asdasd'}
          >
            <FontAwesomeIcon className="navigation__icon-lg" icon={faClipboardList} />
            <p className={`navigation__text-lg`}>Categorias</p>
          </NavLink>
        </li>
        <li className="navigation__item-lg">
          <NavLink
            className={({ isActive }) => `navigation__link-lg ${isActive ? 'active' : ''}`}
            to={'#'}
          >
            <FontAwesomeIcon className="navigation__icon-lg" icon={faEgg} />
            <p className={`navigation__text-lg`}>Productos</p>
          </NavLink>
        </li>
        {user ? (
          <li className="navigation__item-lg">
            <NavLink
              className={({ isActive }) => `navigation__link-lg ${isActive ? 'active' : ''}`}
              to={'logout'}
            >
              <FontAwesomeIcon className="navigation__icon-lg" icon={faRightFromBracket} />
              <p className={`navigation__text-lg`}>Cerrar Sesion</p>
            </NavLink>
          </li>
        ) : null}
        {user && isAuthorized ? (
          <li className="navigation__item-lg">
            <NavLink
              className={({ isActive }) => `navigation__link-lg ${isActive ? 'active' : ''}`}
              to={'admin'}
            >
              <FontAwesomeIcon className="navigation__icon-lg" icon={faLock} />
              <p className={`navigation__text-lg`}>Recursos para administradores</p>
            </NavLink>
          </li>
        ) : null}
      </ul>
    </div>
  );
}

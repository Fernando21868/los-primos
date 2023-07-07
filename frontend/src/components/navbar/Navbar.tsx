import './navbar.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClipboardList,
  faEgg,
  faHome,
  faLeftLong,
  faMoon,
  faRightFromBracket,
  faRightLong,
  faSun,
  faUser,
  faWindowRestore,
} from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { changeLightDarkModeAction } from '../../store/lightDarkModeSlice';

/**
 * Navbar of admin site
 * @date 7/6/2023 - 7:04:18 PM
 *
 * @export
 * @returns {*}
 */
export function Navbar() {
  // const handleMouseEnter = () => {
  //   setIsOpen(true);
  // };

  // const handleMouseLeave = () => {
  //   setIsOpen(false);
  // };

  //Initializations for navbar
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Initializations for user and permissions access
  const permissions = useSelector((state: RootState) => state.userAuth.permissions);
  const user = useSelector((state: RootState) => state.userAuth.userAuth);
  const lightDarkMode = useSelector((state: RootState) => state.lightDarkMode.darkMode);

  /**
   * Function to edit the profile of the current user
   * @date 7/6/2023 - 7:03:46 PM
   */
  function handleEditProfile() {
    navigate(`users/${user?._id}`);
  }

  /**
   * Function to change de mode of the site light/dark
   * @date 7/6/2023 - 7:37:01 PM
   */
  function handleLightDarkMode() {
    dispatch(changeLightDarkModeAction());
  }

  return (
    <div
      className={`navbar ${isOpen ? 'open' : ''} ${lightDarkMode ? 'dark' : ''}`}
      // onMouseEnter={handleMouseEnter}
      // onMouseLeave={handleMouseLeave}
    >
      <div className="navbar__logo">
        <img
          className={`navbar__brand ${isOpen ? 'open' : ''}`}
          src="https://www.shutterstock.com/image-vector/ui-image-placeholder-wireframes-apps-260nw-1037719204.jpg"
          alt="logo"
        />
      </div>
      <div className="navbar__profile">
        <img
          onClick={handleEditProfile}
          className={`navbar__img ${isOpen ? 'open' : ''}`}
          // src="https://www.shutterstock.com/image-vector/ui-image-placeholder-wireframes-apps-260nw-1037719204.jpg"
          src={user?.profilePhoto}
          alt="profile img"
        />
      </div>
      <div className="navbar__sidebar">
        <ul className={`navbar__list ${lightDarkMode ? 'dark' : ''}`}>
          <li className={`navbar__item ${isOpen ? 'open' : ''} ${lightDarkMode ? 'dark' : ''}`}>
            <NavLink
              onClick={() => setIsOpen(!isOpen)}
              className={`navbar__link ${isOpen ? 'open' : ''}`}
              to={'#'}
            >
              <FontAwesomeIcon className="navbar__icon" icon={isOpen ? faLeftLong : faRightLong} />
            </NavLink>
          </li>
          <li className={`navbar__item ${lightDarkMode ? 'dark' : ''}`}>
            <NavLink
              onClick={() => setIsOpen(false)}
              className={`navbar__link ${isOpen ? 'open' : ''}`}
              to={'/'}
            >
              <FontAwesomeIcon className="navbar__icon" icon={faWindowRestore} />
              <p className={`navbar__text ${isOpen ? 'open' : ''}`}>Los Primos</p>
            </NavLink>
          </li>
          <li className={`navbar__item ${lightDarkMode ? 'dark' : ''}`}>
            <NavLink
              onClick={() => setIsOpen(false)}
              className={`navbar__link ${isOpen ? 'open' : ''}`}
              to={'/admin'}
            >
              <FontAwesomeIcon className="navbar__icon" icon={faHome} />
              <p className={`navbar__text ${isOpen ? 'open' : ''}`}>Inicio</p>
            </NavLink>
          </li>
          {permissions === 'administrador' || permissions === 'gerente' ? (
            <li className={`navbar__item ${lightDarkMode ? 'dark' : ''}`}>
              <NavLink
                onClick={() => setIsOpen(false)}
                className={`navbar__link ${isOpen ? 'open' : ''}`}
                to={'users'}
              >
                <FontAwesomeIcon className="navbar__icon" icon={faUser} />
                <p className={`navbar__text ${isOpen ? 'open' : ''}`}>Usuarios</p>
              </NavLink>
            </li>
          ) : null}
          <li className={`navbar__item ${lightDarkMode ? 'dark' : ''}`}>
            <NavLink
              onClick={() => setIsOpen(false)}
              className={`navbar__link ${isOpen ? 'open' : ''}`}
              to={'categories'}
            >
              <FontAwesomeIcon className="navbar__icon" icon={faClipboardList} />
              <p className={`navbar__text ${isOpen ? 'open' : ''}`}>Categorias</p>
            </NavLink>
          </li>
          <li className={`navbar__item ${lightDarkMode ? 'dark' : ''}`}>
            <NavLink
              onClick={() => setIsOpen(false)}
              className={`navbar__link ${isOpen ? 'open' : ''}`}
              to={'products'}
            >
              <FontAwesomeIcon className="navbar__icon" icon={faEgg} />
              <p className={`navbar__text ${isOpen ? 'open' : ''}`}>Productos</p>
            </NavLink>
          </li>
          <li className={`navbar__item ${lightDarkMode ? 'dark' : ''}`}>
            <NavLink
              onClick={() => {
                setIsOpen(false);
                handleLightDarkMode();
              }}
              className={`navbar__link ${isOpen ? 'open' : ''}`}
              to={'#'}
            >
              <FontAwesomeIcon className="navbar__icon" icon={lightDarkMode ? faSun : faMoon} />
              <p className={`navbar__text ${isOpen ? 'open' : ''}`}>
                {lightDarkMode ? 'Modo dia' : 'Modo Noche'}
              </p>
            </NavLink>
          </li>
          <li className={`navbar__item ${lightDarkMode ? 'dark' : ''}`}>
            <NavLink
              onClick={() => setIsOpen(false)}
              className={`navbar__link ${isOpen ? 'open' : ''}`}
              to={'/logout'}
            >
              <FontAwesomeIcon className="navbar__icon" icon={faRightFromBracket} />
              <p className={`navbar__text ${isOpen ? 'open' : ''}`}>Salir</p>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

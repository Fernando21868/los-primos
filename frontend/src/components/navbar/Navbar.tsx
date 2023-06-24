import { NavLink } from 'react-router-dom';
import './navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClipboardList,
  faEgg,
  faHome,
  faLeftLong,
  faRightFromBracket,
  faRightLong,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  return (
    <div
      className={`navbar ${isOpen ? 'open' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
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
          className={`navbar__img ${isOpen ? 'open' : ''}`}
          src="https://www.shutterstock.com/image-vector/ui-image-placeholder-wireframes-apps-260nw-1037719204.jpg"
          alt="profile img"
        />
      </div>
      <div className="navbar__sidebar">
        <ul className="navbar__list">
          <li className={`navbar__item ${isOpen ? 'open' : ''}`}>
            <NavLink
              onClick={() => setIsOpen(!isOpen)}
              className={`navbar__link ${isOpen ? 'open' : ''}`}
              to={'#'}
            >
              <FontAwesomeIcon className="navbar__icon" icon={isOpen ? faLeftLong : faRightLong} />
            </NavLink>
          </li>
          <li className="navbar__item">
            <NavLink
              onClick={() => setIsOpen(false)}
              className={`navbar__link ${isOpen ? 'open' : ''}`}
              to={'/admin'}
            >
              <FontAwesomeIcon className="navbar__icon" icon={faHome} />
              <p className={`navbar__text ${isOpen ? 'open' : ''}`}>Inicio</p>
            </NavLink>
          </li>
          <li className="navbar__item">
            <NavLink
              onClick={() => setIsOpen(false)}
              className={`navbar__link ${isOpen ? 'open' : ''}`}
              to={'users'}
            >
              <FontAwesomeIcon className="navbar__icon" icon={faUser} />
              <p className={`navbar__text ${isOpen ? 'open' : ''}`}>Usuarios</p>
            </NavLink>
          </li>
          <li className="navbar__item">
            <NavLink
              onClick={() => setIsOpen(false)}
              className={`navbar__link ${isOpen ? 'open' : ''}`}
              to={'categories'}
            >
              <FontAwesomeIcon className="navbar__icon" icon={faClipboardList} />
              <p className={`navbar__text ${isOpen ? 'open' : ''}`}>Categorias</p>
            </NavLink>
          </li>
          <li className="navbar__item">
            <NavLink
              onClick={() => setIsOpen(false)}
              className={`navbar__link ${isOpen ? 'open' : ''}`}
              to={'products'}
            >
              <FontAwesomeIcon className="navbar__icon" icon={faEgg} />
              <p className={`navbar__text ${isOpen ? 'open' : ''}`}>Productos</p>
            </NavLink>
          </li>
          <li className="navbar__item">
            <NavLink
              onClick={() => setIsOpen(false)}
              className={`navbar__link ${isOpen ? 'open' : ''}`}
              to={'logout'}
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

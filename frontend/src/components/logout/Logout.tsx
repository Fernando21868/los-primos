import './logout.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { logout } from '../../components/navigation/authenticate';
import { loggedOutAction, loggoutAuthorizedAction, logoutAction } from '../../store/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store/store';
import { useEffect } from 'react';

export function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.userAuth.userAuth);

  async function handleLogout() {
    await logout();
    dispatch(loggedOutAction());
    dispatch(loggoutAuthorizedAction());
    dispatch(logoutAction());
    navigate('/');
  }

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div className="logout">
      <h1 className="logout__title">Cerrar Sesion</h1>
      <div className="logout__google" onClick={handleLogout}>
        <FontAwesomeIcon icon={faRightFromBracket} className="logout__icon" />
        <p className="logout__text">Cerrar Sesion</p>
      </div>
    </div>
  );
}

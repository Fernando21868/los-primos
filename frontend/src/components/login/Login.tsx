import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import './login.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useNavigate } from 'react-router-dom';
import { loginAction } from '../../store/authSlice';

export function Login() {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.userAuth.userAuth);
  const dispatch = useDispatch();

  const googleAuth = () => {
    window.open(`${process.env.REACT_APP_API_URL}/auth/google`, '_self');
    dispatch(loginAction());
  };

  if (user) {
    navigate('/');
  }

  return (
    <div className="login">
      <h1 className="login__title">Iniciar Sesion</h1>
      <div className="login__google" onClick={googleAuth}>
        <FontAwesomeIcon icon={faGoogle} className="login__icon" />
        <p className="login__text">Iniciar con Google</p>
      </div>
    </div>
  );
}

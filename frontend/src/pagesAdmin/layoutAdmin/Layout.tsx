import './layout.css';
import { Outlet, useNavigate } from 'react-router-dom';
import { Navbar } from '../../components/navbar/Navbar';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

export function Layout() {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.userAuth.userAuth);
  const permissions = useSelector((state: RootState) => state.userAuth.permissions);
  const lightDarkMode = useSelector((state: RootState) => state.lightDarkMode.darkMode);

  useEffect(() => {
    if (!user || permissions === 'cliente') {
      navigate('/');
    }
  }, [user, navigate, permissions]);

  return (
    <div className={`container ${lightDarkMode ? 'dark' : ''}`}>
      <Navbar></Navbar>
      <Outlet></Outlet>
    </div>
  );
}

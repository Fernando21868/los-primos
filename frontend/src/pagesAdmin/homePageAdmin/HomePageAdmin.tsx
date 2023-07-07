import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import './homePageAdmin.css';

export function HomePageAdmin() {
  const lightDarkMode = useSelector((state: RootState) => state.lightDarkMode.darkMode);

  return <div className={`admin ${lightDarkMode ? 'dark' : ''}`}>Home page admin</div>;
}

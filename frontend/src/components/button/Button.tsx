import { useSelector } from 'react-redux';
import './button.css';
import { Link } from 'react-router-dom';
import { RootState } from '../../store/store';

type Props = {
  styleButton: string;
  actions: string;
  id: string;
};

export function Button({ styleButton, actions, id }: Props) {
  const lightDarkMode = useSelector((state: RootState) => state.lightDarkMode.darkMode);

  return (
    <Link to={id} className={`button__link table ${styleButton} ${lightDarkMode ? 'dark' : ''}`}>
      {actions}
    </Link>
  );
}

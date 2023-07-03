import './button.css';
import { Link } from 'react-router-dom';

type Props = {
  styleButton: string;
  actions: string;
  id: string;
};

export function Button({ styleButton, actions, id }: Props) {
  return (
    <Link to={id} className={styleButton}>
      {actions}
    </Link>
  );
}

import './button.css';

type Props = {
  styleButton: string;
  actions: string;
};

export function Button({ styleButton, actions }: Props) {
  return <button className={styleButton}>{actions}</button>;
}

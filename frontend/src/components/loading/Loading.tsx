import './loading.css';
import { FadeLoader } from 'react-spinners';

type Props = {
  content: string;
  isLoading: boolean;
};

export function Loading({ content, isLoading }: Props) {
  return (
    <div className={`loading ${isLoading ? 'open' : ''}`}>
      <div className="loading-container">
        <div className="loading-container__icon">
          <FadeLoader color="#36d7b7" />
        </div>
        {content}
      </div>
    </div>
  );
}

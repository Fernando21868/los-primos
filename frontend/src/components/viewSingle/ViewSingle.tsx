import { useSelector } from 'react-redux';
import './viewSingle.css';
import { RootState } from '../../store/store';

export function ViewSingle() {
  // Initializations for labels
  const userHeadings = useSelector((state: RootState) => state.user.headings);
  const categoryHeadings = useSelector((state: RootState) => state.category.headings);
  const inputs = userHeadings ? userHeadings! : categoryHeadings!;
  console.log(inputs);

  return <div>View Single</div>;
}

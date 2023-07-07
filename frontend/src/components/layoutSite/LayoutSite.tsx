import './layoutSite.css';
import { Outlet } from 'react-router-dom';
import { Footer } from '../footer/Footer';
import { Navigation } from '../navigation/Navigation';

export function LayoutSite() {
  return (
    <div className="layoutSite">
      <Navigation></Navigation>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
}

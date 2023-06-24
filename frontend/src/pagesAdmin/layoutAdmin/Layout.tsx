import './layout.css';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../../components/navbar/Navbar';

export function Layout() {
  return (
    <div className="container">
      <Navbar></Navbar>
      <Outlet></Outlet>
    </div>
  );
}

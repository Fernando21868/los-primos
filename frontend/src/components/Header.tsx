import { NavLink } from 'react-router-dom';

export function Header() {
  return (
    <header className="text-center text-slate-50 bg-slate-900 h-40 p-5">
      <nav>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `text-white no-underline p-1 pb-0.5 border-solid border-b-2 ${
              isActive ? 'border-white' : 'border-transparent'
            }`
          }
        >
          Home
        </NavLink>
      </nav>
    </header>
  );
}

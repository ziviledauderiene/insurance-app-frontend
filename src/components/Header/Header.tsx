import { Portals } from 'interfaces';
import { NavLink } from 'react-router-dom';

interface HeaderProps {
  routes: Portals[];
}

const Header = ({ routes }: HeaderProps): JSX.Element => (
  <ul>
    {routes.map((route) => (
      <li key={route}>
        <NavLink to={route}>{route}</NavLink>
      </li>
    ))}
  </ul>
);

export default Header;

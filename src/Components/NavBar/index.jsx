import "./style.scss";
import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <div className="navbar-container">
      <nav className="nav-container">
        <ul>
        <img
            className="logo"
            src="/assets/logo frets.png"
            alt="frets logo"
            />
          <li>
            <NavLink to="/" className="links pixel-borders pixel-box--primary">
              Home
            </NavLink>  
          </li>
          <li>
            <NavLink to="/" className="links pixel-borders pixel-box--primary">
              Login
            </NavLink>  
          </li>
          <li>
            <NavLink to="/" className="links pixel-borders pixel-box--primary">
              Profile
            </NavLink>  
          </li>
        </ul>
      </nav>
    </div>
  );
}

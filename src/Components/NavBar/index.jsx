import "./style.scss";
import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <div className="navbar-container">
      <nav className="nav-container">
        <ul>
          <input
            className="searchfield text"
            type="search"
            placeholder="Search..."
          ></input>
          <li>
            <NavLink to="/" className="links pixel-borders pixel-box--primary">
              Home
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

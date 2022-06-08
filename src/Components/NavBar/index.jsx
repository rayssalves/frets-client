import "./style.scss";
import { NavLink } from "react-router-dom";
import ModalLogin from "../Login Modal"
import { useSelector } from "react-redux";
import LoggedIn from "./LoggedIn";
import { selectUser } from "../../store/user/selectors";
import { selectToken } from "../../store/user/selectors";

 export default function NavBar() {

  const token = useSelector(selectToken);
  const user = useSelector(selectUser);

  const loginLogoutControls = token ? <LoggedIn /> : <ModalLogin />;

  return (
    <div className="navbar-container">
      <nav className="nav-container">
      <img
            className="logo"
            src="/assets/logo frets.png"
            alt="frets logo"
            />
        <ul>
          <li>
            <NavLink to="/" className="links pixel-borders pixel-box--primary">
              Home
            </NavLink>  
          </li>
          <li> 
             {token && user ? (
             <NavLink to="/profile" className="links pixel-borders pixel-box--primary">
             Profile
           </NavLink> 
          ) : (
            ""
          )}
          </li>
          <li className="loginOut">
          {loginLogoutControls}
          </li>
        </ul>
      </nav>
    </div>
  );
}

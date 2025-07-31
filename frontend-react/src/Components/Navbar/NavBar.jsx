import "./Navbar.css";
import { Link } from "react-router-dom";
import Search from "../../assets/search.svg";
import Menu from "../../assets/menu.svg";
import AddDream from "../../assets/file_plus.svg";
import User from "../../assets/User.svg";

function NavBar({ handleAddDreamClick, handleEditProfileClick }) {
  return (
    <nav className="navbar">
      <ul className="navbar__list">
        <li className="navbar__list-item">
          <img
            onClick={handleEditProfileClick}
            src={User}
            className="navbar__add-dream"
          ></img>
        </li>
        <li className="navbar__list-item">
          <img
            onClick={handleAddDreamClick}
            src={AddDream}
            className="navbar__add-dream"
          ></img>
        </li>
        <li>
          <img src={Search} className="navbar__search"></img>
        </li>
        <li>
          <img src={Menu} className="navbar__menu"></img>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;

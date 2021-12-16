import React from "react";
import { Link } from "react-router-dom";

const userNav = () => {
  return (
    <nav>
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link to="/user/history" className="nav-link">
            History
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/user/password" className="nav-link">
            Password
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/user/wishList" className="nav-link">
            WishList
          </Link>
        </li>
        <li className="nav-item"></li>
        <li className="nav-item"></li>
      </ul>
    </nav>
  );
};
export default userNav;

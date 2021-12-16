import React, { useState } from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { auth } from "../../firebase";
import {
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

import firebase from "firebase";
import { currentUser } from "../../functions/auth";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
// import {currentUser} from "../../functions/auth"
const { SubMenu } = Menu;
const { Item } = Menu;

const Header = () => {
  let dispatch = useDispatch();
  let history = useHistory();
  let { user } = useSelector((state) => {
    // it is used when we need logged in user
    return { ...state };
  });
  // console.log(user);
  const [current, setCurrent] = useState("home");
  const [name, setName] = useState("");

  const handleClick = (event) => {
    setCurrent(event.key); // this will change the current status and not helps to change pages
    // Link is same as anchor
  };
  try {
    const user = auth.currentUser;
    // console.log(user);
    // const idTokenResult = user.getIdTokenResult();
    const token = user.Aa;

    currentUser(token)
      .then((res) => {
        setName(res.data.name);
      })
      .catch();
    // console.log("token is");
  } catch (err) {
    // console.log("err found in header", err);
  }
  const LogOut = () => {
    // this function basically logout from firebase and also from redux
    firebase.auth().signOut();

    dispatch({
      type: "LOGOUT",
      payload: null,
    });

    history.push("/login");
  };

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Item key="home" icon={<AppstoreOutlined />}>
        <Link to="/">Home</Link>
      </Item>
      {!user && (
        <Item key="register" icon={<UserAddOutlined />} className="float-right">
          <Link to="/register">Register</Link>
        </Item>
      )}
      {!user && (
        <Item key="login" icon={<UserOutlined />} className="float-right">
          <Link to="/login">Login</Link>
        </Item>
      )}
      {user && (
        <SubMenu
          icon={<SettingOutlined />}
          title={name.split(" ")[0] || (user.email && user.email.split("@")[0])}
          className="float-right"
        >
          {user && user.role === "subscriber" && (
            <Item>
              <Link to="/user/history">Dashboard</Link>
            </Item>
          )}
          {user && user.role === "admin" && (
            <Item>
              <Link to="/admin/dashboard">Dashboard</Link>
            </Item>
          )}
          <Item icon={<LogoutOutlined />} onClick={LogOut}>
            LogOut
          </Item>
        </SubMenu>
      )}
    </Menu>
  );
};

export default Header;

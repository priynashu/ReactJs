import React from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";
const UserRoute = ({ children, ...rest }) => {
  const { user } = useSelector((state) => {
    return { ...state };
  });
  //here if the user is not logged in so he cannot access// the page so he will redirected to the other page
  return user && user.token ? <Route {...rest} /> : <LoadingToRedirect />;
};
export default UserRoute;

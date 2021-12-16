import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";
import { currentAdmin } from "../../functions/auth";
const AdminRoute = ({ children, ...rest }) => {
  const { user } = useSelector((state) => {
    return { ...state };
  });
  const [ok, setOk] = useState(false);
  useEffect(() => {
    if (user && user.token) {
      currentAdmin(user.token)
        .then((res) => {
          console.log("current admin res", res);
          setOk(true);
        })
        .catch((err) => {
          console.log("currentAdmin Error", err);
          setOk(false);
        });
    }
  }, [user]); //user will change the function will execute
  //here if the user is not logged in so he cannot access// the page so he will redirected to the other page
  return ok ? <Route {...rest} /> : <LoadingToRedirect />;
};
export default AdminRoute;

import React, { useState, useEffect } from "react";
import { auth, googleAuthProvider } from "../../firebase";
import { toast } from "react-toastify";
import { Button } from "antd";

import { MailOutlined, GoogleOutlined } from "@ant-design/icons";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createOrUpdate } from "../../functions/auth";
const Login = ({ history }) => {
  const [email, setEmail] = useState("pmjshah11@gmail.com");
  const [password, setPassword] = useState("123456");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => {
    return { ...state };
  });
  const roleBasedRedirect = (res) => {
    if (res.data.role === "admin") {
      history.push("/admin/dashboard");
    } else {
      history.push("/user/history");
    }
  };
  useEffect(() => {
    if (user && user.token) history.push("/");
  }, [user, history]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    // console.log(email, password);
    try {
      //use await in every async () thing
      const result = await auth.signInWithEmailAndPassword(email, password);
      // here we send email and password to firebase and it will send user details
      // and then we would extract some details from it
      // console.log("result", result);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();

      // Send token to your backend via HTTPS
      // ...
      createOrUpdate(idTokenResult.token)
        .then((res) => {
          // this will done after backend verify the use in middleware
          // so it will consider as data come from backend
          dispatch({
            type: "LOGGED_IN_USER",
            payload: {
              name: res.data.name,
              email: user.email,
              token: idTokenResult.token,
              role: res.data.role,
              _id: res.data._id,
            },
          });
          roleBasedRedirect(res);
        })
        .catch((err) => {
          console.log(err);
        });

      // history.push("/");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setLoading(false);
    }
  };
  const handleGoogleLogin = () => {
    auth
      .signInWithPopup(googleAuthProvider)
      .then(async (result) => {
        // here we would we login with mail id and other steps would be same
        const { user } = result;
        const idTokenResult = await user.getIdTokenResult();

        createOrUpdate(idTokenResult.token)
          .then((res) => {
            // this will done after backend verify the use in middleware
            // so it will consider as data come from backend
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: user.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
            roleBasedRedirect(res);
          })
          .catch((err) => {
            console.log(err);
          });
        // history.push("/");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };
  const loginForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => {
              const { value } = e.target;
              setEmail(value);
              // console.log(value);
            }}
            placeholder="Your Email"
            autoFocus
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => {
              const { value } = e.target;
              setPassword(value);
              // console.log(value);
            }}
            placeholder="Your password"
          />
        </div>
        <Button
          onClick={handleSubmit}
          type="primary"
          className="mb-3"
          shape="round"
          block
          icon={<MailOutlined />}
          size="large"
          disabled={!email || password.length < 6}
        >
          Login with email/password
        </Button>
        <Button
          onClick={handleGoogleLogin}
          type="primary"
          className="mb-3"
          shape="round"
          block
          icon={<GoogleOutlined />}
          size="large"
          danger
        >
          Login with Google
        </Button>
        <Link to="/forgot/password" className="float-right text-warning">
          Forgot password
        </Link>
      </form>
    );
  };

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4>Login</h4>
          )}

          {loginForm()}
        </div>
      </div>
    </div>
  );
};

export default Login;

import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import { createOrUpdate } from "../../functions/auth";
// same as login page to save name email and id in redux

const RegisterComplete = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  // const { user } = useSelector((state) => {
  //   return { ...state };
  // });
  const roleBasedRedirect = (res) => {
    if (res.data.role === "admin") {
      history.push("/admin/dashboard");
    } else {
      history.push("/user/history");
    }
  };
  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForRegistration")); //to get email id from localstorage
    // console.log(window.location);
  }, [history]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    //validation
    if (!email || !password) {
      toast.error("Email and Password is required");
      return;
    }
    const passwordValidate = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    if (!password.match(passwordValidate)) {
      toast.error(
        "Password must be at least 8 to 15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character"
      );
      return;
    }

    try {
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );
      if (result.user.emailVerified) {
        //this will happen after the user is verified
        // remove user email from localStorage

        window.localStorage.removeItem("emailForRegistration");

        // get user id token
        const user = auth.currentUser;
        console.log("Registration user", user);
        await user.updatePassword(password); // here it await will make this wait before other things runs
        const idTokenResult = await user.getIdTokenResult();

        // redux store
        createOrUpdate(idTokenResult.token, name)
          .then((res) => {
            // this will done after backend verify the use in middleware
            // so it will consider as data come from backend
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: name,
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
        // console.log("User", user, "idTokenResult", idTokenResult);

        //redirect
        //redirect to the home page
      }
      // console.log("result", result);
      setPassword("");
      setEmail("");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  const completeRegisterationForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <input type="email" className="form-control" value={email} autoFocus />

        <input
          type="text"
          className="form-control"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          placeholder="Full Name"
          autoFocus
        />

        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="Password"
          autoFocus
        />
        <br />
        <button className="btn btn-raised">Complete Registration</button>
      </form>
    );
  };

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register Complete</h4>

          {completeRegisterationForm()}
        </div>
      </div>
    </div>
  );
};

export default RegisterComplete;

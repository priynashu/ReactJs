import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const Register = ({ history }) => {
  const [email, setEmail] = useState("");
  const { user } = useSelector((state) => {
    return { ...state };
  });
  useEffect(() => {
    if (user && user.token) history.push("/");
  }, [user, history]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };
    // await auth.sendSignInLinkToEmail(email, config); // it will send a link to the entered email to
    await auth.sendSignInLinkToEmail(email, config);
    // check the user is valid or not
    toast.success(
      `email is send to ${email} click to complete to your registration`
    );

    // save user email in local storage so we will not ask second time

    window.localStorage.setItem("emailForRegistration", email);

    setEmail("");
  };
  const registerForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => {
            const { value } = e.target;
            setEmail(value);
            // console.log(value);
          }}
          placeholder="Your email"
          autoFocus
        />
        <button className="btn btn-raised">Register</button>
      </form>
    );
  };

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register</h4>

          {registerForm()}
        </div>
      </div>
    </div>
  );
};

export default Register;

import React, { useState } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import UserNav from "../../components/nav/UserNav";
//these are bootstrap grid classes here it will page into 6 parts
const Password = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    // console.log(password);
    const passwordValidate = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    if (!password.match(passwordValidate)) {
      toast.error(
        "Password must be at least 8 to 15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character"
      );
      setLoading(false);
      return;
    }
    const user = await auth.currentUser;
    user
      .updatePassword(password)
      .then(() => {
        toast.success("You have successfully updated the password");
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
        setLoading(false);
      });

    setPassword("");
  };
  const passwordUpdateForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Your Password</label>
        <input
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          className="form-control"
          placeholder="Enter New Password"
          value={password}
          disabled={loading}
        />
        <button
          className="btn btn-primary"
          disabled={!password || password.length < 6 || loading}
        >
          Submit
        </button>
      </div>
    </form>
  ); // in btn if btn is pressed means loading is true so it will be disabled

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div className="col">
          <h4>
            {loading ? (
              <h4 className="text-danger">Loading...</h4>
            ) : (
              <h4>Password Update</h4>
            )}
          </h4>
          {passwordUpdateForm()}
        </div>
      </div>
    </div>
  );
};
export default Password;

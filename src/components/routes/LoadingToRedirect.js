import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
const LoadingToRedirect = () => {
  let [count, setCount] = useState(5);
  let history = useHistory();
  useEffect(() => {
    const interval = setInterval(() => {
      setCount(--count);
    }, 1000);
    //redirect
    count === 0 && history.push("/");
    //cleanup
    return () => clearInterval(interval);
  }, [count, history]);
  return (
    <div className="container p-5 text-center">
      Redirecting you in {count} seconds
    </div>
  );
};
export default LoadingToRedirect;

import axios from "axios";
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useLocation } from "react-router-dom";

// import { AuthContext } from "../../context/AuthContext";
import "./login.scss";

const Login = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  useEffect(() => {
    document.title = `admin | ${path}`;
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(
        "https://admin-traveler.herokuapp.com/api/v1/auth/login",
        // `${process.env.REACT_APP_HOST}/api/v1/auth/login`,
        credentials
      );

      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      navigate("/");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
      // console.log(err.response.data.message);
    }
  };

  return (
    <div className="login">
      <div className="titleLogin">
        <h3>Traveler Admin</h3>
      </div>
      <div className="lContainer">
        <input
          type="text"
          placeholder="userName"
          id="userName"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className="lInput"
        />
        <button disabled={loading} onClick={handleClick} className="lButton">
          Login
        </button>
        {error && <span className="error">{error.message}</span>}
      </div>
    </div>
  );
};

export default Login;

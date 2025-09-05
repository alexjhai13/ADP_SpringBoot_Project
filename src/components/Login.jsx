import React from "react";
import { useState, useEffect } from "react";
import NavigationBar from "./NavigationBar";
import { useNavigate } from "react-router-dom";
import "./Login.css";
// import { useCookies } from 'react-cookie'
import * as usersApi from "../api/users";

//sends headers to /token endpoint to receive JWT
function validateLoginInfo(username, password, cb) {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Basic ${btoa(`${username}:${password}`)}`);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(import.meta.env.VITE_REACT_APP_AUTH_SERVER_URL, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      cb(null, result);
    })
    .catch((error) => console.error(error));
}

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [JWT, setJWT] = useState("");
  //const [cookies, setCookie] = useCookies(['admin']);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    usersApi.getAll().then(setUsers);
  }, []);

  const handleLogin = () => {
    const cb = (error, result) => {
      if (error) {
        throw new Error("ValidateLoginInfo had an error.");
      }
      setJWT(result);
    };

    validateLoginInfo(username, password, cb);
  };

  return (
    <>
      <NavigationBar />
      <div className={"login-container"}>
        <h1 className={"login-header"}>Login</h1>
        <input
          type="text"
          name="username"
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
          className="login-input"
          autoComplete="off"
        />
        <div />
        <input
          type="password"
          name="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
          autoComplete="off"
        />
        <br />

        <button onClick={handleLogin} className={"login-button"}>
          Login
        </button>
        <h1>jwt: {JWT}</h1>
      </div>
    </>
  );
};

export default Login;

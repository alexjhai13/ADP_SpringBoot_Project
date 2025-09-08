import { useState, useEffect } from "react";
import NavigationBar from "./NavigationBar";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import * as usersApi from "../api/users";
import { jwtDecode } from "jwt-decode";

//sends headers to /token endpoint to receive JWT
function validateLoginInfo(username, password, cb) {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Basic ${btoa(`${username}:${password}`)}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(import.meta.env.VITE_REACT_APP_AUTH_SERVER_URL, requestOptions)
    .then((response) => {
      return response.text();
    })
    .then((result) => {
      return cb(null, [result, jwtDecode(result)]);
    })
    .catch((error) => cb(error, null));
}

const Login = ({ JWT, setJWT, setIsAdmin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);
  const [wrongLogin, setWrongLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    usersApi.getAll().then(setUsers);
  }, []);

  const handleLogin = () => {
    const cb = (error, data) => {
      if (error) {
        setWrongLogin(true);
        throw new Error("ValidateLoginInfo had an error.");
      }
      const [rawJWT, decodedJWT] = data;

      setJWT(rawJWT);
      setWrongLogin(false);

      if (jwtDecode(rawJWT)["scope"] === "ROLE_ADMIN") {
        setIsAdmin(true);
      }

      navigate("/dashboard");
    };

    validateLoginInfo(username, password, cb);
  };

  return (
    <>
      <NavigationBar JWT={JWT} />
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
        {wrongLogin && <h1>Username or password is incorrect.</h1>}
      </div>
    </>
  );
};

export default Login;

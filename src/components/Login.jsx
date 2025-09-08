import { useState, useEffect } from "react";
import NavigationBar from "./NavigationBar";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import * as usersApi from "../api/users";
import { jwtDecode } from "jwt-decode";


const VITE_REACT_APP_AUTH_SERVER_URL=http://54.221.137.9:9000/token
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

const Login = ({ 
  JWT, 
  setJWT, 
  setIsAdmin, 
  authority, 
  setAuthority, 
  loggedInUser, 
  setLoggedInUser 
}) => {
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

      // Extract user information from JWT
      console.log("Decoded JWT:", decodedJWT); // DEBUG REMOVE IN PROD
      
      // Set the logged-in username
      setLoggedInUser(decodedJWT.sub || decodedJWT.username || username);
      
      // Set the authority level
      const userAuthority = decodedJWT.scope || decodedJWT.authorities || decodedJWT.role || "user";
      setAuthority(userAuthority);

      // Check if user is admin
      if (decodedJWT["scope"] === "ROLE_ADMIN" || userAuthority === "ROLE_ADMIN") {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
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
          value={username}
        />
        <div />
        <input
          type="password"
          name="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
          autoComplete="off"
          value={password}
        />
        <br />

        <button onClick={handleLogin} className={"login-button"}>
          Login
        </button>
        {wrongLogin && <h1>Username or password is incorrect.</h1>}
        
        {/* DEBUG REMOVE IN PROD */}
        {process.env.NODE_ENV === 'development' && loggedInUser && (
          <div style={{ marginTop: '20px', fontSize: '12px', color: '#666', border: '1px solid #ccc', padding: '10px' }}>
            <p><strong>Debug Info:</strong></p>
            <p>Logged in user: {loggedInUser}</p>
            <p>Authority: {authority}</p>
            <p>Is Admin: {setIsAdmin ? 'Yes' : 'No'}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Login;
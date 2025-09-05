import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import CustomerList from "./components/CustomerList";
import AddCustomerForm from "./components/AddCustomerForm";
import Login from "./components/Login";
import UpdateCustomerForm from "./components/UpdateCustomerForm";
// import {CookiesProvider} from 'react-cookie';
import AuthorizeAccess from "./components/AuthorizeAccess";
import OrgChart from "./components/OrgChart";
import { useState } from "react";
import LoginAuthorizationAccess from "./components/LoginAuthorizationAccess";

function App() {
  const [JWT, setJWT] = useState("");

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route element={<LoginAuthorizationAccess />}>
            <Route path="/dashboard" element={<Dashboard />}>
              <Route path="orgchart" element={<OrgChart />} />
              <Route index element={<CustomerList />} />
              <Route
                path="add"
                element={
                  <AuthorizeAccess>
                    <AddCustomerForm />
                  </AuthorizeAccess>
                }
              />
              <Route
                path=":id/update"
                element={
                  <AuthorizeAccess>
                    <UpdateCustomerForm />
                  </AuthorizeAccess>
                }
              />
            </Route>
          </Route>
          <Route path="/login" element={<Login JWT={JWT} setJWT={setJWT} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import NavigationBar from "./NavigationBar";
//import CustomerList from './CustomerList'
import * as customersApi from "../api/customers";

const Dashboard = ({ JWT, setJWT }) => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //Grabs all the Customer data with JWT
  useEffect(() => {
    const fetchCustomers = async () => {
      if (!JWT) {
        setError("No authentication token available");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const data = await customersApi.getAll(JWT);
        setCustomers(data);
      } catch (err) {
        console.error("Error fetching customers:", err);
        setError("Failed to fetch customers. Please check your authentication.");
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, [JWT]);

  //Add Customer Handler with JWT
  const addCustomer = async (cust) => {
    try {
      const created = await customersApi.create(cust, JWT);
      setCustomers((prev) => [...prev, created]); // refreshes the state after customer is added
      return created;
    } catch (err) {
      console.error("Error adding customer:", err);
      setError("Failed to add customer. Please check your authentication.");
      throw err;
    }
  };

  //Update Customer Handler with JWT
  const updateCustomer = async (cust) => {
    try {
      await customersApi.update(cust, JWT);
      const data = await customersApi.getAll(JWT); // grabs new/updated data from api
      setCustomers(data);
    } catch (err) {
      console.error("Error updating customer:", err);
      setError("Failed to update customer. Please check your authentication.");
      throw err;
    }
  };

  //Delete Customer Handler with JWT
  const deleteCustomer = async (id) => {
    try {
      await customersApi.remove(id, JWT);
      setCustomers((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error("Error deleting customer:", err);
      setError("Failed to delete customer. Please check your authentication.");
      throw err;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationBar JWT={JWT} setJWT={setJWT} />
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-8">
          <h1 className="text-slate-800 text-4xl font-bold mb-4">Dashboard</h1>
          <p className="text-slate-600 text-lg mb-8">
            Welcome to the ADP System Dashboard
          </p>
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Customer List
            </h2>
            
            {/* Error handling */}
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                <strong>Error:</strong> {error}
              </div>
            )}
            
            {/* Loading state */}
            {loading ? (
              <div className="text-center py-4">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                <p className="mt-2 text-gray-600">Loading customers...</p>
              </div>
            ) : (
              <Outlet
                context={{
                  customers,
                  addCustomer,
                  updateCustomer,
                  deleteCustomer,
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
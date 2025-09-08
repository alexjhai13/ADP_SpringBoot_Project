const baseURL = "https://2iszpcnea6.execute-api.us-west-2.amazonaws.com/dev/api/customers";

// Helper function to create headers with JWT
const createHeaders = (jwt) => {
  const headers = {
    "Content-Type": "application/json",
  };
  
  if (jwt) {
    headers["Authorization"] = `Bearer ${jwt}`;
  }
  
  return headers;
};

export async function getAll(jwt) {
  const res = await fetch(baseURL, {
    headers: createHeaders(jwt),
  });
  if (!res.ok) throw new Error("Failed to fetch customers");
  return res.json();
}

// call to add customer
export async function create(customer, jwt) {
  const res = await fetch(baseURL, {
    method: "POST",
    headers: createHeaders(jwt),
    body: JSON.stringify(customer),
  });
  if (!res.ok) throw new Error("Failed to create customer");
  return res.json();
}

// call to update customer
export async function update(customer, jwt) {
  const res = await fetch(`${baseURL}/${customer.id}`, {
    method: "PUT",
    headers: createHeaders(jwt),
    body: JSON.stringify(customer),
  });
  if (!res.ok) throw new Error("Failed to update customer");
  return res.json();
}

// call to remove customer
export async function remove(id, jwt) {
  const res = await fetch(`${baseURL}/${id}`, { 
    method: "DELETE",
    headers: createHeaders(jwt),
  });
  if (!res.ok) throw new Error("Failed to delete customer");
  return true;
}
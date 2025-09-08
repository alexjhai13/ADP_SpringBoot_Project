const baseURL = "https://2iszpcnea6.execute-api.us-west-2.amazonaws.com/dev/api/customers";

export async function getAll() {
  const res = await fetch(baseURL);
  if (!res.ok) throw new Error("Failed to fetch customers");
  return res.json();
}

// call to add customer
export async function create(customer) {
  const res = await fetch(baseURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(customer),
  });
  if (!res.ok) throw new Error("Failed to create customer");
  return res.json();
}


// call to update customer
export async function update(customer) {
  const res = await fetch(`${baseURL}/${customer.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(customer),
  });
  if (!res.ok) throw new Error("Failed to update customer");
  return res.json();
}


// call to remove customer
export async function remove(id) {
  const res = await fetch(`${baseURL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete customer");
  return true;
}

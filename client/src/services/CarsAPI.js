const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3000/api";

export async function fetchCars() {
  const res = await fetch(`${API_BASE}`);
  if (!res.ok) throw new Error(`fetchCars failed: ${res.status}`);
  return res.json();
}

export default fetchCars;

export async function fetchCar(id) {
  const res = await fetch(`${API_BASE}/${id}`);
  if (!res.ok) throw new Error(`fetchCar failed: ${res.status}`);
  return res.json();
}

export async function createCar(payload) {
  const res = await fetch(`${API_BASE}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`createCar failed: ${res.status}`);
  return res.json();
}

export async function updateCar(id, payload) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`updateCar failed: ${res.status}`);
  return res.json();
}

export async function deleteCar(id) {
  const res = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error(`deleteCar failed: ${res.status}`);
  return true;
}

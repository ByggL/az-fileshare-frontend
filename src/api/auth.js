import api from "./client";

export async function registerUser({ email, password }) {
  const res = await api.post("/auth/register", { username: email, password });
  return res.data;
}

export async function loginUser({ email, password }) {
  const res = await api.post("/auth/login", { username: email, password });
  console.log(res.data);
  return res.data;
}

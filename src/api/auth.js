import api from "./client";

export async function registerUser({ email, password }) {
  const res = await api.post("/auth/register", { email, password });
  return res.data;
}

export async function loginUser({ email, password }) {
  console.log("here");
  const res = await api.post("/auth/login", { username: email, password });
  return res.data;
}

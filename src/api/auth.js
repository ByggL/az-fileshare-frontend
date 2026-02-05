import api from "./client";

export async function registerUser({ email, password }) {
  const res = await api.post("/auth/register", { username: email, password });
  return res.data;
}

export async function loginUser({ email, password }) {
  try {
    const res = await api.post("/auth/login", { username: email, password });

    return res.data;
  } catch (error) {
    console.error(error);
  }
}

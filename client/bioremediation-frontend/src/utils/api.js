const BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:5000/api";

export const fetchAPI = async (
  url,
  method = "GET",
  body = null,
  token = null
) => {
  const headers = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}${url}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  });

  return res.json();
};

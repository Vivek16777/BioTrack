const BASE_URL = "https://biotrack.onrender.com/api";

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

export const fetchAPI = async (
  url,
  method = "GET",
  body = null,
  token = null
) => {
  const headers = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`http://localhost:5000/api${url}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  });

  return res.json();
};

import React, { useEffect, useState } from "react";
import { fetchAPI } from "../utils/api";
import Loader from "../components/Loader";

export default function Admin() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const getRequests = async () => {
      const res = await fetchAPI("/research", "GET", null, token); // updated route
      setRequests(res || []);
      setLoading(false);
    };
    getRequests();
  }, [token]);

  const handleApprove = async (id, status) => {
    try {
      await fetchAPI(`/research/review`, "PUT", { status }, token);
      setRequests((prev) =>
        prev.map((r) => (r._id === id ? { ...r, status } : r))
      );
    } catch (err) {
      console.error(err);
      alert("Error updating status");
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="container mt-4" style={{ minHeight: "77vh" }}>
      <h2>Research Requests</h2>
      {requests.length === 0 ? (
        <p>No research requests found.</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Pollutant</th>
              <th>Microbe</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((r) => (
              <tr key={r._id}>
                <td>{r.pollutant}</td>
                <td>{r.microbe}</td>
                <td>{r.status}</td>
                <td>
                  {r.status === "pending" && (
                    <>
                      <button
                        className="btn btn-success btn-sm me-1"
                        onClick={() => handleApprove(r._id, "approved")}
                      >
                        Approve
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleApprove(r._id, "rejected")}
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

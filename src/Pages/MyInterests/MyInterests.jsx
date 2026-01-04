// src/Pages/MyInterests/MyInterests.jsx
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Authcontext } from "../../context/Authcontext";
import LoadingScreen from "../Loading/LoadingScreen";

const MyInterests = () => {
  const { user } = useContext(Authcontext);
  const [interests, setInterests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    document.title = " My Interests | KrishiLink";
    if (!user) return;
    const fetchInterests = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://kirishi-link.vercel.app/my-interests?userEmail=${user.email}`
        );
        setInterests(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch your interests");
      } finally {
        setLoading(false);
      }
    };
    fetchInterests();
  }, [user]);


  // ---------- Sorting logic ----------
  const sortedInterests = interests.map((crop) => ({
    ...crop,
    interests: crop.interests.filter((i) => i.userEmail === user.email)
  }));

  if (sortBy === "quantityLow") {
    sortedInterests.sort(
      (a, b) => a.interests[0].quantity - b.interests[0].quantity
    );
  }
  if (sortBy === "quantityHigh") {
    sortedInterests.sort(
      (a, b) => b.interests[0].quantity - a.interests[0].quantity
    );
  }
  if (sortBy === "status") {
    sortedInterests.sort((a, b) =>
      a.interests[0].status.localeCompare(b.interests[0].status)
    );
  }

  if (loading) return <LoadingScreen />;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;
  if (interests.length === 0)
    return <p className="text-center mt-10">You have not sent any interests yet.</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-green-700">
        My Interests
      </h2>

      {/* Sorting Dropdown */}
      <div className="flex justify-end mb-4">
        <select
          className="select select-bordered"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="default">Sort by</option>
          <option value="quantityLow">Quantity: Low to High</option>
          <option value="quantityHigh">Quantity: High to Low</option>
          <option value="status">Status</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse shadow-md">
          <thead>
            <tr className="bg-green-100">
              <th className="border px-4 py-2">Crop Name</th>
              <th className="border px-4 py-2">Owner</th>
              <th className="border px-4 py-2">Quantity</th>
              <th className="border px-4 py-2">Message</th>
              <th className="border px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {sortedInterests.map((crop) =>
              crop.interests.map((i) => (
                <tr key={i._id} className="hover:bg-green-50">
                  <td className="border px-4 py-2">{crop.name}</td>
                  <td className="border px-4 py-2">
                    {crop.owner?.ownerName || "Unknown"}
                  </td>
                  <td className="border px-4 py-2">{i.quantity}</td>
                  <td className="border px-4 py-2">{i.message}</td>
                  <td
                    className={`border px-4 py-2 font-semibold capitalize ${
                      i.status === "pending"
                        ? "text-gray-500"
                        : i.status === "accepted"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {i.status}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyInterests;

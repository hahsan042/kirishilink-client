


import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Authcontext } from "../../context/Authcontext";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
  PieChart, Pie, Cell, Legend, ResponsiveContainer
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Statistics = () => {
  const { user } = useContext(Authcontext);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (user?.email) {
      axios.get(`https://kirishi-link.vercel.app/dashboard/my-crops-stats?userEmail=${user.email}`)
        .then((res) => setStats(res.data))
        .catch((err) => console.error(err));
    }
  }, [user]);

  if (!stats) return <p className="p-5">Loading statistics...</p>;

  if (stats.crops.length === 0)
    return <p className="p-5 text-center text-gray-500">No crops found for your account.</p>;

  const pieData = stats.crops.map(c => ({
    name: c.name,
    value: Number(c.quantity) || 0
  }));

  const barData = [
    { name: "Crops", value: stats.totalCrops },
    { name: "Interests", value: stats.totalInterests },
    { name: "Accepted", value: stats.acceptedInterests }
  ];

  return (
    <div className="p-5 space-y-10">
      <h1 className="text-3xl font-bold mb-5">My Crops Statistics</h1>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-4 bg-green-100 rounded shadow text-center">
          <h2 className="text-xl font-semibold">Total Crops</h2>
          <p className="text-2xl font-bold">{stats.totalCrops}</p>
        </div>
        <div className="p-4 bg-blue-100 rounded shadow text-center">
          <h2 className="text-xl font-semibold">Total Quantity</h2>
          <p className="text-2xl font-bold">{stats.totalQuantity}</p>
        </div>
        <div className="p-4 bg-yellow-100 rounded shadow text-center">
          <h2 className="text-xl font-semibold">Total Interests</h2>
          <p className="text-2xl font-bold">{stats.totalInterests}</p>
        </div>
        <div className="p-4 bg-red-100 rounded shadow text-center">
          <h2 className="text-xl font-semibold">Accepted Interests</h2>
          <p className="text-2xl font-bold">{stats.acceptedInterests}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-10">
        {/* Bar Chart */}
        <div className="p-4 bg-white rounded shadow">
          <h2 className="text-xl font-semibold mb-3 text-center">Bar Chart</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#0088FE" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="p-4 bg-white rounded shadow">
          <h2 className="text-xl font-semibold mb-3 text-center">Crop Quantities</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#00C49F" label>
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Statistics;

// Pages/AddCrop/AddCrop.jsx
import React, { useState, useContext } from "react";
import axios from "axios";
import { Authcontext } from "../../context/Authcontext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddCrop = () => {
  const { user } = useContext(Authcontext); // logged-in user info
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    type: "",
    pricePerUnit: "",
    unit: "",
    quantity: "",
    description: "",
    location: "",
    image: "",
  });

  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation
    if (!formData.name || !formData.type || !formData.pricePerUnit) {
      toast.error("Please fill all required fields!");
      return;
    }

    const cropData = {
      ...formData,
      pricePerUnit: Number(formData.pricePerUnit),
      quantity: Number(formData.quantity),
      owner: {
        ownerEmail: user.email,
        ownerName: user.displayName || "Unknown",
      },
    };

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/crops",
        cropData
      );
      toast.success("Crop added successfully!");
      navigate("/myposts"); // redirect to My Posts page
    } catch (error) {
      console.error(error);
      toast.error("Failed to add crop. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-bold text-green-700 mb-6">Add New Crop</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="Crop Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md"
          required
        />

        {/* Type */}
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md"
          required
        >
          <option value="">Select Crop Type</option>
          <option value="Vegetable">Vegetable</option>
          <option value="Fruit">Fruit</option>
          <option value="Grain">Grain</option>
        </select>

        {/* Price per Unit */}
        <input
          type="number"
          name="pricePerUnit"
          placeholder="Price per unit"
          value={formData.pricePerUnit}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md"
          required
        />

        {/* Unit */}
        <input
          type="text"
          name="unit"
          placeholder="Unit (kg, ton, bag)"
          value={formData.unit}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md"
          required
        />

        {/* Quantity */}
        <input
          type="number"
          name="quantity"
          placeholder="Estimated Quantity"
          value={formData.quantity}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md"
        />

        {/* Description */}
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md"
        />

        {/* Location */}
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md"
        />

        {/* Image */}
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition"
        >
          {loading ? "Adding Crop..." : "Add Crop"}
        </button>
      </form>
    </div>
  );
};

export default AddCrop;

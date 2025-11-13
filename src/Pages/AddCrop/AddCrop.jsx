import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Authcontext } from "../../context/Authcontext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const AddCrop = () => {
  const { user } = useContext(Authcontext);
  const navigate = useNavigate();
useEffect(()=>{
   document.title = " AddCrop | KrishiLink";
},[])
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

  // Handle input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.type || !formData.pricePerUnit) {
      toast.error("Please fill all required fields!");
      return;
    }

    const cropData = {
      ...formData,
      pricePerUnit: Number(formData.pricePerUnit),
      quantity: Number(formData.quantity),
      owner: {
        ownerEmail: user?.email,
        ownerName: user?.displayName || "Unknown",
      },
      date: new Date().toLocaleDateString(),
    };

    setLoading(true);
    try {
      const response = await axios.post(
        "https://kirishi-link.vercel.app/crops",
        cropData
      );
      toast.success("🌾 Crop added successfully!");
      navigate("/myposts");
    } catch (error) {
      console.error(error);
      toast.error("❌ Failed to add crop. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 py-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl border border-green-100 p-8 md:p-12"
      >
        <h2 className="text-3xl font-bold text-green-800 mb-8 text-center">
          🌱 Add New Crop
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Crop Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="e.g., Basmati Rice"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              required
            />
          </div>

          {/* Type */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Crop Type <span className="text-red-500">*</span>
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 transition"
              required
            >
              <option value="">Select Crop Type</option>
              <option value="Vegetable">Vegetable</option>
              <option value="Fruit">Fruit</option>
              <option value="Grain">Grain</option>
              <option value="Oilseed">Oilseed</option>
            </select>
          </div>

          {/* Price and Unit in same row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-medium text-gray-700 mb-2">
                Price per Unit <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="pricePerUnit"
                placeholder="e.g., 250"
                value={formData.pricePerUnit}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 transition"
                required
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-2">
                Unit <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="unit"
                placeholder="kg, ton, bag, etc."
                value={formData.unit}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 transition"
                required
              />
            </div>
          </div>

          {/* Quantity and Location in same row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <input
                type="number"
                name="quantity"
                placeholder="Estimated quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 transition"
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-2">
                Location
              </label>
              <input
                type="text"
                name="location"
                placeholder="e.g., Rajshahi"
                value={formData.location}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 transition"
              />
            </div>
          </div>

          {/* Image */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Image URL
            </label>
            <input
              type="text"
              name="image"
              placeholder="https://example.com/crop.jpg"
              value={formData.image}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 transition"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              placeholder="Write a short description about your crop..."
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 transition"
            />
          </div>

          {/* Submit Button */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={loading}
            className="w-full py-3 mt-4 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold shadow-lg transition-all"
          >
            {loading ? "🌾 Adding Crop..." : "✅ Add Crop"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default AddCrop;

import React, { useEffect, useState } from "react";
import useProduct from "../../Hook/useProducts";
import { Link } from "react-router-dom";
import LoadingScreen from "../Loading/LoadingScreen";

const AllCrops = () => {
  const { products, loading, error } = useProduct();
  const [search, setSearch] = useState("");
  useEffect(()=>{
    document.title = " AllCrops | KrishiLink";
  },[])

  if (loading) return <LoadingScreen></LoadingScreen>
  if (error) return <p className="text-center text-red-600 mt-10">Error loading crops</p>;

  // filter crops by search input
  const filteredCrops = products.filter((crop) =>
    crop.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center text-green-700 mb-8">
        All Available Crops
      </h2>

      {/* 🔍 Search Bar */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search crops by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-green-400 rounded-full px-5 py-2 w-1/2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/*  Crops Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredCrops.map((crop) => (
          <div
            key={crop._id}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition"
          >
            <img
              src={crop.image || "https://source.unsplash.com/400x300/?crop,agriculture"}
              alt={crop.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-green-700">{crop.name}</h3>
              <p className="text-gray-600 text-sm mt-1">{crop.type}</p>
              <p className="text-gray-800 font-semibold mt-2">
                Price: {crop.pricePerUnit} tk
              </p>

              {/* View Details Button */}
              <Link
                to={`/cropdetails/${crop._id}`}
                className="inline-block mt-4 px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCrops;

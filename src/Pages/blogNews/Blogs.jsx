// src/pages/Blogs.jsx
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { Authcontext } from "../../context/Authcontext";

const Blogs = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
    const { user } = useContext(Authcontext);

  useEffect(() => {
    document.title = "Agro News | KrishiLink";

    const fetchNews = async () => {
      try {
        const res = await axios.get("https://kirishi-link.vercel.app/news");
        const data = Array.isArray(res.data) ? res.data : [];
        setNews(data.reverse()); // latest first
      } catch (err) {
        console.error("Failed to fetch news:", err);
        setNews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) return <p className="text-center py-10">Loading news...</p>;
  if (!news.length) return <p className="text-center py-10">No news found.</p>;

  return (
    <section className="py-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 text-center md:text-left">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold mb-2 text-green-700"
            >
              All Agro News
            </motion.h2>
            <p className="text-gray-600">
              Stay updated with all agricultural news, trends, and success stories.
            </p>
          </div>

          {/* Create Post Button */}
        {
          user&&(  <Link
            to="/managenews"
            className="mt-6 md:mt-0 inline-block px-6 py-3 bg-green-600 text-white font-semibold rounded-full shadow-md hover:bg-green-700 hover:shadow-lg transition"
          >
            + Create Post
          </Link>)
        }
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {news.map((item) => (
            <motion.div
              key={item._id || item.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition"
            >
              <img
                src={item.image || "https://via.placeholder.com/400x200"}
                alt={item.title || "News image"}
                className="w-full h-48 object-cover"
              />
              <div className="p-5 text-left">
                <p className="text-sm text-gray-500 mb-2">{item.date || ""}</p>
                <h3 className="text-lg font-semibold mb-2 hover:text-green-600 cursor-pointer">
                  {item.title || "Untitled"}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {item.desc ? item.desc.slice(0, 100) : "No description"}...
                </p>
                <Link
                  to={`/blogs/${item._id || ""}`}
                  className="text-green-600 font-medium hover:underline"
                >
                  Read More →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blogs;

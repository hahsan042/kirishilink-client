// src/components/HomeNewsSection.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import LoadingScreen from "../Pages/Loading/LoadingScreen";

const AgroNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get("https://kirishi-link.vercel.app/news");
        // Sort by latest date (descending)
        const sortedNews = Array.isArray(res.data)
          ? [...res.data].sort(
              (a, b) => new Date(b.date) - new Date(a.date)
            )
          : [];
        // Only take the latest 3
        setNews(sortedNews.slice(0, 3));
      } catch (err) {
        console.error("Failed to fetch news:", err);
        setNews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) return<LoadingScreen></LoadingScreen>;
  if (!news.length) return <p className="text-center py-10">No news found.</p>;

  return (
    <section className="py-16 ">
      <div className="container mx-auto px-4 text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold mb-4 text-green-700"
        >
          Latest Agro News
        </motion.h2>
        <p className="text-gray-600 mb-10">
          Stay updated with the latest agricultural trends and insights.
        </p>

        {/* News Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {news.map((item) => (
            <motion.div
              key={item._id || item.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-green-50 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition"
            >
              <img
                src={item.image || "https://via.placeholder.com/400x200"}
                alt={item.title || "News image"}
                className="w-full h-48 object-cover"
              />
              <div className="p-5 text-left">
                <p className="text-sm text-gray-500 mb-2">
                  {item.date || ""}
                </p>
                <h3 className="text-lg font-semibold mb-2 hover:text-green-600 cursor-pointer">
                  {item.title || "Untitled"}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {item.desc ? item.desc.slice(0, 80) : "No description"}...
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

        <div className="mt-10">
          <Link
            to="/blogs"
            className="px-6 py-3 bg-green-600 text-white rounded-full font-semibold hover:bg-green-700 transition"
          >
            View All News
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AgroNews;

// src/pages/blogNews/ManageNews.jsx
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Authcontext } from "../../context/Authcontext";
import { motion } from "framer-motion";
import { FiTrash2, FiPlusCircle } from "react-icons/fi";

const ManageNews = () => {
  const { user } = useContext(Authcontext);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState("");

  // Fetch only user's news
  const fetchNews = async () => {
    try {
      const res = await axios.get("https://kirishi-link.vercel.app/news");
      const allNews = Array.isArray(res.data) ? res.data : [];
      const userNews = allNews.filter((item) => item.authorEmail === user?.email);
      setNews(userNews.reverse());
    } catch (err) {
      console.error("Failed to fetch news:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
     document.title = "ManageNews | KrishiLink";
    if (user?.email) fetchNews();
  }, [user]);

  // Create post
  const handleCreate = async (e) => {
    e.preventDefault();
    if (!title || !desc) return alert("Title and Description are required");
    const newPost = {
      title,
      desc,
      image,
      date: new Date().toLocaleDateString(),
      authorEmail: user?.email || "anonymous",
      authorName: user?.displayName || "Unknown User",
    };
    try {
      const res = await axios.post("https://kirishi-link.vercel.app/news", newPost);
      setNews([res.data, ...news]);
      setTitle("");
      setDesc("");
      setImage("");
    } catch (err) {
      console.error(err);
      alert("Failed to create post");
    }
  };

  // Delete post
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await axios.delete(`https://kirishi-link.vercel.app/news/${id}`);
      setNews(news.filter((item) => item._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete post");
    }
  };

  if (!user) return <p className="text-center py-10">Please login to manage your posts.</p>;
  if (loading) return <p className="text-center py-10">Loading your posts...</p>;

  return (
    <div className="container mx-auto px-4 py-16">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold mb-8 text-center text-green-700"
      >
        Manage Your Blog Posts
      </motion.h1>

      {/* Form Section */}
      <motion.form
        onSubmit={handleCreate}
        className="max-w-2xl mx-auto bg-white shadow-xl rounded-2xl p-8 mb-12 border border-gray-100"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 flex items-center gap-2">
          <FiPlusCircle className="text-green-600" /> Create a New Post
        </h2>

        <div className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Title</label>
            <input
              type="text"
              placeholder="Enter post title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 p-3 rounded-lg outline-none transition"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Image URL</label>
            <input
              type="text"
              placeholder="Optional image link..."
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 p-3 rounded-lg outline-none transition"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Description</label>
            <textarea
              placeholder="Write a short description..."
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              rows={5}
              className="w-full border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 p-3 rounded-lg outline-none transition"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 mt-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
          >
            Publish Post
          </button>
        </div>
      </motion.form>

      {/* User Posts */}
      {news.length === 0 ? (
        <p className="text-center text-gray-600">You haven’t created any posts yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {news.map((item) => (
            <motion.div
              key={item._id}
              className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {item.image && (
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-5">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 mb-2">{item.date}</p>
                <p className="text-gray-600 text-sm mb-4">
                  {item.desc?.slice(0, 90)}...
                </p>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                >
                  <FiTrash2 /> Delete
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageNews;

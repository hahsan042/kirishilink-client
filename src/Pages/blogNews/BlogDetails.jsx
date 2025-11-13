import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const BlogDetails = () => {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = " BlogDetails| KrishiLink";
    const fetchNews = async () => {
      try {
        const res = await axios.get(`https://kirishi-link.vercel.app/news/${id}`);
        setNews(res.data);
      } catch (err) {
        console.error(err);
        setNews(null);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, [id]);

  if (loading) return <p className="text-center py-10">Loading news...</p>;
  if (!news) return <p className="text-center py-10">News not found</p>;

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl md:text-4xl font-bold mb-4">{news.title}</h1>
      <p className="text-gray-500 mb-4">{news.date}</p>
      <img
        src={news.image || "https://via.placeholder.com/600x300"}
        alt={news.title}
        className="w-full max-w-lg mx-auto mb-6 rounded shadow"
        style={{ height: "200px", objectFit: "cover" }}
      />
      <p className="text-gray-700 text-base md:text-lg leading-relaxed">{news.desc}</p>
    </div>
  );
};

export default BlogDetails;



import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { IoEye, IoEyeOff } from "react-icons/io5";
import Google from "../../Component/Google";
import { Authcontext } from "../../context/Authcontext";
import toast from "react-hot-toast";

const Login = () => {
  const { LogInUser } = useContext(Authcontext);
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Login | KrishiLink";
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    setLoading(true);

    LogInUser(email, password)
      .then((result) => {
        console.log("Logged in user:", result.user);
        toast.success("Welcome back 🌱");
        form.reset();
        setLoading(false);
        navigate("/"); // ✅ redirect to home
      })
      .catch((err) => {
        console.error(err.message);
        toast.error("Invalid email or password ❌");
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl top-10 left-10 animate-pulse"></div>
        <div className="absolute w-72 h-72 bg-lime-400/20 rounded-full blur-3xl bottom-10 right-10 animate-pulse"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10 p-6 lg:p-10 text-white"
      >
        {/* Left Section */}
        <div className="max-w-lg text-center lg:text-left">
          <h1 className="text-5xl font-extrabold drop-shadow-lg text-lime-300">
            Welcome Back 🌱
          </h1>
          <p className="mt-4 text-lg text-white/80 leading-relaxed">
            Sign in to continue your journey with{" "}
            <span className="text-lime-400 font-semibold">KrishiLink</span> — connect, grow, and share with farmers across the country.
          </p>
        </div>

        {/* Login Form */}
        <motion.form
          onSubmit={handleLogin}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md backdrop-blur-md bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-8 space-y-5"
        >
          <h2 className="text-2xl font-semibold mb-2 text-center text-lime-300">
            Login to KrishiLink
          </h2>

          <div>
            <label className="block text-sm mb-1 text-white/80">Email</label>
            <input
              type="email"
              name="email"
              placeholder="example@email.com"
              className="w-full border border-white/30 rounded-md px-3 py-2 text-white placeholder-white/50 bg-white/10 focus:outline-none focus:ring-2 focus:ring-lime-400"
              required
            />
          </div>

          <div className="relative">
            <label className="block text-sm mb-1 text-white/80">Password</label>
            <input
              type={showPass ? "text" : "password"}
              name="password"
              placeholder="••••••••"
              className="w-full border border-white/30 rounded-md px-3 py-2 text-white placeholder-white/50 bg-white/10 focus:outline-none focus:ring-2 focus:ring-lime-400"
              required
            />
            <span
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-[38px] text-white/70 cursor-pointer select-none"
            >
              {showPass ? <IoEye /> : <IoEyeOff />}
            </span>
          </div>

          <Link
            to="/ForgetPassword"
            className="w-full text-left text-sm text-lime-400 hover:text-lime-300 underline block"
          >
            Forgot password?
          </Link>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 font-semibold rounded-lg bg-lime-500 hover:bg-lime-400 text-black transition-colors disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* Google Login */}
          <Google />

          <p className="text-center text-sm text-white/70 mt-3">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-lime-400 hover:text-lime-300 underline"
            >
              Sign up
            </Link>
          </p>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default Login;

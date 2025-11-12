// import React, { useEffect, useState, useContext, use } from "react";
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import { IoEye, IoEyeOff } from "react-icons/io5";
// import { Authcontext } from "../../context/Authcontext";
// import Google from "../../Component/Google";


// const Register = () => {
// const { createUser } = useContext(Authcontext);
//   useEffect(() => {
//     document.title = "Register | KrishiLink";
//   }, []);

//   const [showPass, setShowPass] = useState(false);


//   const handleSignup = (e) => {
//     e.preventDefault();
//     const email = e.target.email.value;
//     const password = e.target.password.value;
//     const name = e.target.name.value;
//     const photoURL = e.target.photoURL.value;
//     console.log({email, password,name,photoURL});
    
//     createUser(email ,password)
//     .then((result) => {
//         console.log("User created:", result.user);
//       })
//       .catch((error) => {
//         console.error(error.message);
//       });

//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 relative overflow-hidden">
//       <div className="absolute inset-0">
//         <div className="absolute w-72 h-72 bg-lime-400/20 rounded-full blur-3xl top-10 left-10 animate-pulse"></div>
//         <div className="absolute w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl bottom-10 right-10 animate-pulse"></div>
//       </div>

//       <motion.div
//         initial={{ opacity: 0, y: 25 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10 p-6 lg:p-10 text-white"
//       >
//         <div className="max-w-lg text-center lg:text-left">
//           <h1 className="text-5xl font-extrabold drop-shadow-lg text-lime-300">
//             Join KrishiLink 🌾
//           </h1>
//           <p className="mt-4 text-lg text-white/80 leading-relaxed">
//             Create your account and be part of the{" "}
//             <span className="text-lime-400 font-semibold">KrishiLink</span>{" "}
//             community — connect with farmers, share experiences, and grow together.
//           </p>
//         </div>

//         <motion.form
//           onSubmit={handleSignup}
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.6 }}
//           className="w-full max-w-md backdrop-blur-md bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-8 space-y-5"
//         >
//           <h2 className="text-2xl font-semibold mb-2 text-center text-lime-300">
//             Create Account
//           </h2>

//           <div>
//             <label className="block text-sm mb-1 text-white/80">Full Name</label>
//             <input
//               type="text"
//               name="name"
//               placeholder="Enter your full name"
//               className="w-full border border-white/30 rounded-md px-3 py-2 text-white placeholder-white/50 bg-white/10 focus:outline-none focus:ring-2 focus:ring-lime-400"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm mb-1 text-white/80">Email</label>
//             <input
//               type="email"
//               name="email"
//               placeholder="example@email.com"
//               className="w-full border border-white/30 rounded-md px-3 py-2 text-white placeholder-white/50 bg-white/10 focus:outline-none focus:ring-2 focus:ring-lime-400"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm mb-1 text-white/80">Photo URL</label>
//             <input
//               type="text"
//               name="photoURL"
//               placeholder="https://example.com/photo.jpg"
//               className="w-full border border-white/30 rounded-md px-3 py-2 text-white placeholder-white/50 bg-white/10 focus:outline-none focus:ring-2 focus:ring-lime-400"
//             />
//           </div>

//           <div className="relative">
//             <label className="block text-sm mb-1 text-white/80">Password</label>
//             <input
//               type={showPass ? "text" : "password"}
//               name="password"
//               placeholder="••••••••"
//               className="w-full border border-white/30 rounded-md px-3 py-2 text-white placeholder-white/50 bg-white/10 focus:outline-none focus:ring-2 focus:ring-lime-400"
//               required
//             />
//             <span
//               onClick={() => setShowPass(!showPass)}
//               className="absolute right-3 top-[38px] text-white/70 cursor-pointer select-none"
//             >
//               {showPass ? <IoEye /> : <IoEyeOff />}
//             </span>
//           </div>

//           <button
//             type="submit"
//             className="w-full py-2 font-semibold rounded-lg bg-lime-500 hover:bg-lime-400 text-black transition-colors"
//           >
//             Register
//           </button>
//            <Google></Google>

//           <p className="text-center text-sm text-white/70 mt-3">
//             Already have an account?{" "}
//             <Link to="/login" className="text-lime-400 hover:text-lime-300 underline">
//               Login
//             </Link>
//           </p>
         
//         </motion.form>
//       </motion.div>
//     </div>
//   );
// };

// export default Register;



import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { Authcontext } from "../../context/Authcontext";
import Google from "../../Component/Google";
import toast from "react-hot-toast";

const Register = () => {
  const { createUser } = useContext(Authcontext);

  useEffect(() => {
    document.title = "Register | KrishiLink";
  }, []);

  const [showPass, setShowPass] = useState(false);

  const handleSignup = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    const name = form.name.value;
    const photoURL = form.photoURL.value;

    createUser(email, password)
      .then((result) => {
        console.log("User created:", result.user);
        toast.success("Registration successful 🎉");
        form.reset(); // ✅ form reset
      })
      .catch((error) => {
        console.error(error.message);
        toast.error(error.message); // ✅ show error
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute w-72 h-72 bg-lime-400/20 rounded-full blur-3xl top-10 left-10 animate-pulse"></div>
        <div className="absolute w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl bottom-10 right-10 animate-pulse"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10 p-6 lg:p-10 text-white"
      >
        <div className="max-w-lg text-center lg:text-left">
          <h1 className="text-5xl font-extrabold drop-shadow-lg text-lime-300">
            Join KrishiLink 🌾
          </h1>
          <p className="mt-4 text-lg text-white/80 leading-relaxed">
            Create your account and be part of the{" "}
            <span className="text-lime-400 font-semibold">KrishiLink</span>{" "}
            community — connect with farmers, share experiences, and grow together.
          </p>
        </div>

        <motion.form
          onSubmit={handleSignup}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md backdrop-blur-md bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-8 space-y-5"
        >
          <h2 className="text-2xl font-semibold mb-2 text-center text-lime-300">
            Create Account
          </h2>

          <div>
            <label className="block text-sm mb-1 text-white/80">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              className="w-full border border-white/30 rounded-md px-3 py-2 text-white placeholder-white/50 bg-white/10 focus:outline-none focus:ring-2 focus:ring-lime-400"
              required
            />
          </div>

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

          <div>
            <label className="block text-sm mb-1 text-white/80">Photo URL</label>
            <input
              type="text"
              name="photoURL"
              placeholder="https://example.com/photo.jpg"
              className="w-full border border-white/30 rounded-md px-3 py-2 text-white placeholder-white/50 bg-white/10 focus:outline-none focus:ring-2 focus:ring-lime-400"
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

          <button
            type="submit"
            className="w-full py-2 font-semibold rounded-lg bg-lime-500 hover:bg-lime-400 text-black transition-colors"
          >
            Register
          </button>

          <Google />

          <p className="text-center text-sm text-white/70 mt-3">
            Already have an account?{" "}
            <Link to="/login" className="text-lime-400 hover:text-lime-300 underline">
              Login
            </Link>
          </p>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default Register;

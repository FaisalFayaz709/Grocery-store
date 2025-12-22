// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import useAuth from "@/hooks/useAuth";

// export default function LoginPage() {
//   const router = useRouter();
//   const { login } = useAuth();
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [showPassword, setShowPassword] = useState(false);

//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     setErrors({ ...errors, [e.target.name]: "" });
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.email.trim()) {
//       newErrors.email = "Email is required";
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = "Email is invalid";
//     }

//     if (!formData.password) {
//       newErrors.password = "Password is required";
//     } else if (formData.password.length < 6) {
//       newErrors.password = "Password must be at least 6 characters";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) return;

//     const result = await login(formData.email, formData.password);

//     if (result.success) {
//       router.push("/");
//     } else {
//       setErrors({ email: "Invalid credentials" });
//     }
//   };

//   return (
//     <div className="min-h-screen bg-linear-to-br from-[#4CAF50] to-[#45a049] flex items-center justify-center px-6 py-12">
//       <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 w-full max-w-md">
//         {/* Logo */}
//         <div className="text-center mb-8">
//           <Link
//             href=""
//             className="inline-flex items-center gap-2 text-3xl font-bold text-[#333333]"
//           >
//             <span className="text-4xl">🥬</span> GROCERY
//           </Link>
//           <p className="text-gray-600 mt-2">
//             Welcome back! Please login to your account
//           </p>
//         </div>

//         {/* Login Form */}
//         <form onSubmit={handleSubmit} className="space-y-5">
//           {/* Email Input */}
//           <div>
//             <label className="block text-[#333333] font-semibold mb-2">
//               Email Address
//             </label>
//             <input
//               type="email"
//               name="email"
//               placeholder="Enter your email"
//               value={formData.email}
//               onChange={handleInputChange}
//               className={`w-full p-4 border border-gray-500 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF50] ${
//                 errors.email ? "border-red-500" : "border-[#E5E5E5]"
//               }`}
//             />
//             {errors.email && (
//               <p className="text-red-500 text-sm mt-1">{errors.email}</p>
//             )}
//           </div>

//           {/* Password Input */}
//           <div>
//             <label className="block text-[#333333] font-semibold mb-2">
//               Password
//             </label>
//             <div className="relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 placeholder="Enter your password"
//                 value={formData.password}
//                 onChange={handleInputChange}
//                 className={`w-full p-4 border border-gray-500 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF50] ${
//                   errors.password ? "border-red-500" : "border-[#E5E5E5]"
//                 }`}
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500"
//               >
//                 {showPassword ? "👁️" : "🙈"}
//               </button>
//             </div>
//             {errors.password && (
//               <p className="text-red-500 text-sm mt-1">{errors.password}</p>
//             )}
//           </div>

//           {/* Remember Me & Forgot Password */}
//           {/* <div className="flex items-center justify-between">
//             <label className="flex items-center gap-2">
//               <input type="checkbox" className="w-4 h-4 text-[#4CAF50]" />
//               <span className="text-[#333333] text-sm">Remember me</span>
//             </label>
//             <Link href="/auth/forgot-password" className="text-[#4CAF50] text-sm hover:underline">
//               Forgot password?
//             </Link>
//           </div> */}

//           {/* Login Button */}
//           <button
//             type="submit"
//             className="w-full bg-[#4CAF50] hover:bg-[#388E3C] text-white py-4 rounded-lg font-semibold text-lg transition shadow-lg"
//           >
//             Login
//           </button>

//           {/* Divider */}
//           <div className="relative my-6">
//             <div className="absolute inset-0 flex items-center">
//               <div className="w-full border-t border-[#E5E5E5]"></div>
//             </div>
//             <div className="relative flex justify-center text-sm">
//               <span className="px-4 bg-white text-gray-500">
//                 Or continue with
//               </span>
//             </div>
//           </div>

//           {/* Social Login */}
//           <div className="grid grid-cols-2 gap-4">
//             <button
//               type="button"
//               className="flex items-center justify-center gap-2 p-3 border-2 border-[#E5E5E5] rounded-lg hover:bg-[#F9F9F9] transition"
//             >
//               <img
//                 src="https://www.google.com/favicon.ico"
//                 alt="Google"
//                 className="w-5 h-5"
//               />
//               <span className="font-medium text-[#333333]">Google</span>
//             </button>

//             <button
//               type="button"
//               className="flex items-center justify-center gap-2 p-3 border-2 border-[#E5E5E5] rounded-lg hover:bg-[#F9F9F9] transition"
//             >
//               <img
//                 src="https://www.facebook.com/favicon.ico"
//                 alt="Facebook"
//                 className="w-5 h-5"
//               />
//               <span className="font-medium text-[#333333]">Facebook</span>
//             </button>
//           </div>

//           {/* Register Link */}
//           <p className="text-center text-gray-600 mt-6">
//             Don't have an account?{" "}
//             <Link
//               href="/auth/register"
//               className="text-[#4CAF50] font-semibold hover:underline"
//             >
//               Register here
//             </Link>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// }



"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    const result = await login(formData.email, formData.password);

    setIsLoading(false);

    if (result.success) {
      // ✅ Role-based redirect
      const userRole = result.user?.role?.toLowerCase();
      
      if (userRole === "admin") {
        router.push("/admin");
      } else {
        router.push("/");
      }
    } else {
      setErrors({ 
        email: result.message || "Invalid credentials. Please try again." 
      });
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#4CAF50] to-[#45a049] flex items-center justify-center px-6 py-12">
      <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 w-full max-w-md">
        
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-3xl font-bold text-[#333333]">
            <span className="text-4xl">🥬</span> GROCERY
          </Link>
          <p className="text-gray-600 mt-2">
            Welcome back! Please login to your account
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Email Input */}
          <div>
            <label className="block text-[#333333] font-semibold mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
              disabled={isLoading}
              className={`w-full p-4 border border-gray-500 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF50] ${
                errors.email ? "border-red-500" : "border-[#E5E5E5]"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-[#333333] font-semibold mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
                disabled={isLoading}
                className={`w-full p-4 border border-gray-500 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF50] ${
                  errors.password ? "border-red-500" : "border-[#E5E5E5]"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showPassword ? "👁️" : "🙈"}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-4 rounded-lg font-semibold text-lg transition shadow-lg ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#4CAF50] hover:bg-[#388E3C] text-white"
            }`}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>

          {/* Register Link */}
          <p className="text-center text-gray-600 mt-6">
            Don't have an account?{" "}
            <Link href="/auth/register" className="text-[#4CAF50] font-semibold hover:underline">
              Register here
            </Link>
          </p>

        </form>
      </div>
    </div>
  );
}
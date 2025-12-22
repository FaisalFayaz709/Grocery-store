// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import useAuth from "@/hooks/useAuth";

// export default function RegisterPage() {
//   const router = useRouter();

//   const { register } = useAuth();

  
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     phone: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [acceptTerms, setAcceptTerms] = useState(false);

//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     setErrors({ ...errors, [e.target.name]: "" });
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.fullName.trim()) {
//       newErrors.fullName = "Full name is required";
//     }

//     if (!formData.email.trim()) {
//       newErrors.email = "Email is required";
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = "Email is invalid";
//     }

//     if (!formData.phone.trim()) {
//       newErrors.phone = "Phone number is required";
//     }

//     if (!formData.password) {
//       newErrors.password = "Password is required";
//     } else if (formData.password.length < 6) {
//       newErrors.password = "Password must be at least 6 characters";
//     }

//     if (!formData.confirmPassword) {
//       newErrors.confirmPassword = "Please confirm your password";
//     } else if (formData.password !== formData.confirmPassword) {
//       newErrors.confirmPassword = "Passwords do not match";
//     }

//     if (!acceptTerms) {
//       newErrors.terms = "You must accept the terms and conditions";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//  const handleSubmit = async (e) => {
//   e.preventDefault();

//   if (!validateForm()) return;

//   const result = await register({
//     fullName: formData.fullName,
//     email: formData.email,
//     password: formData.password
//   });

//   if (result.success) {
//     router.push("/auth/login");
//   } else {
//     setErrors({ email: "Registration failed" });
//   }
//    };

    
  

//   return (
//     <div className="min-h-screen bg-linear-to-br from-[#4CAF50] to-[#45a049] flex items-center justify-center px-6 py-12">
      
//       <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 w-full max-w-lg">
        
//         {/* Logo */}
//         <div className="text-center mb-8">
//           <Link href="" className="inline-flex items-center gap-2 text-3xl font-bold text-[#333333]">
//             <span className="text-4xl">🥬</span> GROCERY
//           </Link>
//           <p className="text-gray-600 mt-2">Create your account to get started</p>
//         </div>

//         {/* Register Form */}
//         <form onSubmit={handleSubmit} className="space-y-5">
          
//           {/* Full Name Input */}
//           <div>
//             <label className="block text-[#333333] font-semibold mb-2">
//               Full Name
//             </label>
//             <input
//               type="text"
//               name="fullName"
//               placeholder="Enter your full name"
//               value={formData.fullName}
//               onChange={handleInputChange}
//               className={`w-full p-4 border border-gray-500 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF50] ${
//                 errors.fullName ? "border-red-500" : "border-[#E5E5E5]"
//               }`}
//             />
//             {errors.fullName && (
//               <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
//             )}
//           </div>

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

//           {/* Phone Input */}
//           <div>
//             <label className="block text-[#333333] font-semibold mb-2">
//               Phone Number
//             </label>
//             <input
//               type="tel"
//               name="phone"
//               placeholder="Enter your phone number"
//               value={formData.phone}
//               onChange={handleInputChange}
//               className={`w-full p-4 border border-gray-500 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF50] ${
//                 errors.phone ? "border-red-500" : "border-[#E5E5E5]"
//               }`}
//             />
//             {errors.phone && (
//               <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
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
//                 placeholder="Create a password"
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

//           {/* Confirm Password Input */}
//           <div>
//             <label className="block text-[#333333] font-semibold mb-2">
//               Confirm Password
//             </label>
//             <div className="relative">
//               <input
//                 type={showConfirmPassword ? "text" : "password"}
//                 name="confirmPassword"
//                 placeholder="Confirm your password"
//                 value={formData.confirmPassword}
//                 onChange={handleInputChange}
//                 className={`w-full p-4 border border-gray-500 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF50] ${
//                   errors.confirmPassword ? "border-red-500" : "border-[#E5E5E5]"
//                 }`}
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                 className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500"
//               >
//                 {showConfirmPassword ? "👁️" : "🙈"}
//               </button>
//             </div>
//             {errors.confirmPassword && (
//               <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
//             )}
//           </div>

//           {/* Terms and Conditions */}
//           {/* <div>
//             <label className="flex items-start gap-3">
//               <input
//                 type="checkbox"
//                 checked={acceptTerms}
//                 onChange={(e) => {
//                   setAcceptTerms(e.target.checked);
//                   setErrors({ ...errors, terms: "" });
//                 }}
//                 className="w-5 h-5 text-[#4CAF50] mt-1"
//               />
//               <span className="text-[#333333] text-sm">
//                 I agree to the{" "}
//                 <Link href="/terms" className="text-[#4CAF50] hover:underline">
//                   Terms and Conditions
//                 </Link>{" "}
//                 and{" "}
//                 <Link href="/privacy" className="text-[#4CAF50] hover:underline">
//                   Privacy Policy
//                 </Link>
//               </span>
//             </label>
//             {errors.terms && (
//               <p className="text-red-500 text-sm mt-1">{errors.terms}</p>
//             )}
//           </div> */}

//           {/* Register Button */}
//           <button
//             type="submit"
//             className="w-full bg-[#4CAF50] hover:bg-[#388E3C] text-white py-4 rounded-lg font-semibold text-lg transition shadow-lg"
//           >
//             Create Account
//           </button>

//           {/* Divider */}
//           <div className="relative my-6">
//             <div className="absolute inset-0 flex items-center">
//               <div className="w-full border-t border-[#E5E5E5]"></div>
//             </div>
//             <div className="relative flex justify-center text-sm">
//               <span className="px-4 bg-white text-gray-500">Or register with</span>
//             </div>
//           </div>

//           {/* Social Register */}
//           <div className="grid grid-cols-2 gap-4">
//             <button
//               type="button"
//               className="flex items-center justify-center gap-2 p-3 border-2 border-[#E5E5E5] rounded-lg hover:bg-[#F9F9F9] transition"
//             >
//               <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
//               <span className="font-medium text-[#333333]">Google</span>
//             </button>

//             <button
//               type="button"
//               className="flex items-center justify-center gap-2 p-3 border-2 border-[#E5E5E5] rounded-lg hover:bg-[#F9F9F9] transition"
//             >
//               <img src="https://www.facebook.com/favicon.ico" alt="Facebook" className="w-5 h-5" />
//               <span className="font-medium text-[#333333]">Facebook</span>
//             </button>
//           </div>

//           {/* Login Link */}
//           <p className="text-center text-gray-600 mt-6">
//             Already have an account?{" "}
//             <Link href="/auth/login" className="text-[#4CAF50] font-semibold hover:underline">
//               Login here
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

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

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

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    const result = await register({
      fullName: formData.fullName,
      email: formData.email,
      password: formData.password
    });

    setIsLoading(false);

    if (result.success) {
      // ✅ Show success message and redirect to login
      alert("Registration successful! Please login with your credentials.");
      router.push("/auth/login");
    } else {
      setErrors({ 
        email: result.message || "Registration failed. Please try again." 
      });
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#4CAF50] to-[#45a049] flex items-center justify-center px-6 py-12">
      <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 w-full max-w-lg">
        
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-3xl font-bold text-[#333333]">
            <span className="text-4xl">🥬</span> GROCERY
          </Link>
          <p className="text-gray-600 mt-2">Create your account to get started</p>
        </div>

        {/* Register Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Full Name Input */}
          <div>
            <label className="block text-[#333333] font-semibold mb-2">
              Full Name *
            </label>
            <input
              type="text"
              name="fullName"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleInputChange}
              disabled={isLoading}
              className={`w-full p-4 border border-gray-500 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF50] ${
                errors.fullName ? "border-red-500" : "border-[#E5E5E5]"
              }`}
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
            )}
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-[#333333] font-semibold mb-2">
              Email Address *
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
              Password *
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Create a password"
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

          {/* Confirm Password Input */}
          <div>
            <label className="block text-[#333333] font-semibold mb-2">
              Confirm Password *
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                disabled={isLoading}
                className={`w-full p-4 border border-gray-500 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF50] ${
                  errors.confirmPassword ? "border-red-500" : "border-[#E5E5E5]"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showConfirmPassword ? "👁️" : "🙈"}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
            )}
          </div>

          {/* Register Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-4 rounded-lg font-semibold text-lg transition shadow-lg ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#4CAF50] hover:bg-[#388E3C] text-white"
            }`}
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </button>

          {/* Login Link */}
          <p className="text-center text-gray-600 mt-6">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-[#4CAF50] font-semibold hover:underline">
              Login here
            </Link>
          </p>

        </form>
      </div>
    </div>
  );
}
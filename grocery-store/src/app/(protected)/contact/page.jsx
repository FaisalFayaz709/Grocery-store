// "use client";

// import { useState } from "react";
// import Link from "next/link";

// export default function ContactPage() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     subject: "",
//     message: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [isSubmitted, setIsSubmitted] = useState(false);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//     setErrors({ ...errors, [name]: "" });
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.name.trim()) newErrors.name = "Name is required";
//     if (!formData.email.trim()) {
//       newErrors.email = "Email is required";
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = "Email is invalid";
//     }
//     if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
//     if (!formData.subject.trim()) newErrors.subject = "Subject is required";
//     if (!formData.message.trim()) newErrors.message = "Message is required";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (validateForm()) {
//       // Simulate API call
//       setIsSubmitted(true);
//       setTimeout(() => {
//         setIsSubmitted(false);
//         setFormData({
//           name: "",
//           email: "",
//           phone: "",
//           subject: "",
//           message: "",
//         });
//       }, 3000);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#F9F9F9]">
    

//       {/* Hero Section */}
//       <section className="bg-gradient-to-br from-[#4CAF50] to-[#45a049] text-white px-6 py-20">
//         <div className="max-w-4xl mx-auto text-center">
//           <h1 className="text-5xl font-bold mb-4">Get In Touch</h1>
//           <p className="text-xl text-white/90">
//             We'd love to hear from you! Send us a message and we'll respond as soon as possible.
//           </p>
//         </div>
//       </section>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-6 py-12">
        
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
//           {/* Contact Information */}
//           <div className="space-y-6">
            
//             {/* Contact Card 1 */}
//             <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition">
//               <div className="w-14 h-14 bg-[#4CAF50] rounded-full flex items-center justify-center text-3xl mb-4">
//                 📍
//               </div>
//               <h3 className="text-xl font-bold text-[#333333] mb-2">Visit Us</h3>
//               <p className="text-gray-600">
//                 123 Grocery Street<br />
//                 Model Town, Lahore<br />
//                 Punjab, Pakistan 54000
//               </p>
//             </div>

//             {/* Contact Card 2 */}
//             <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition">
//               <div className="w-14 h-14 bg-[#4CAF50] rounded-full flex items-center justify-center text-3xl mb-4">
//                 📞
//               </div>
//               <h3 className="text-xl font-bold text-[#333333] mb-2">Call Us</h3>
//               <p className="text-gray-600">
//                 +92 300 1234567<br />
//                 +92 42 1234567<br />
//                 Mon-Sat: 9AM - 8PM
//               </p>
//             </div>

//             {/* Contact Card 3 */}
//             <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition">
//               <div className="w-14 h-14 bg-[#4CAF50] rounded-full flex items-center justify-center text-3xl mb-4">
//                 📧
//               </div>
//               <h3 className="text-xl font-bold text-[#333333] mb-2">Email Us</h3>
//               <p className="text-gray-600">
//                 support@grocery.com<br />
//                 info@grocery.com<br />
//                 We reply within 24 hours
//               </p>
//             </div>

//             {/* Social Media */}
//             <div className="bg-white rounded-xl shadow-md p-6">
//               <h3 className="text-xl font-bold text-[#333333] mb-4">Follow Us</h3>
//               <div className="flex gap-3">
//                 <button className="w-12 h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center transition text-xl">
//                   f
//                 </button>
//                 <button className="w-12 h-12 bg-pink-500 hover:bg-pink-600 text-white rounded-full flex items-center justify-center transition text-xl">
//                   📷
//                 </button>
//                 <button className="w-12 h-12 bg-blue-400 hover:bg-blue-500 text-white rounded-full flex items-center justify-center transition text-xl">
//                   🐦
//                 </button>
//                 <button className="w-12 h-12 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition text-xl">
//                   ▶
//                 </button>
//               </div>
//             </div>

//           </div>

//           {/* Contact Form */}
//           <div className="lg:col-span-2">
//             <div className="bg-white rounded-xl shadow-md p-8">
              
//               <h2 className="text-3xl font-bold text-[#333333] mb-6">Send Us a Message</h2>

//               {isSubmitted && (
//                 <div className="mb-6 p-4 bg-green-100 border border-green-300 rounded-lg">
//                   <p className="text-green-800 font-medium">
//                     ✅ Thank you! Your message has been sent successfully. We'll get back to you soon.
//                   </p>
//                 </div>
//               )}

//               <form onSubmit={handleSubmit} className="space-y-5">
                
//                 {/* Name & Email */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
//                   {/* Name */}
//                   <div>
//                     <label className="block text-sm font-semibold text-[#333333] mb-2">
//                       Your Name *
//                     </label>
//                     <input
//                       type="text"
//                       name="name"
//                       placeholder="Enter your full name"
//                       value={formData.name}
//                       onChange={handleInputChange}
//                       className={`w-full p-3 border rounded-lg focus:outline-none text-gray-800 focus:ring-2 focus:ring-[#4CAF50] ${
//                         errors.name ? "border-red-500" : "border-[#E5E5E5]"
//                       }`}
//                     />
//                     {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
//                   </div>

//                   {/* Email */}
//                   <div>
//                     <label className="block text-sm font-semibold text-[#333333] mb-2">
//                       Your Email *
//                     </label>
//                     <input
//                       type="email"
//                       name="email"
//                       placeholder="Enter your email address"
//                       value={formData.email}
//                       onChange={handleInputChange}
//                       className={`w-full p-3 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#4CAF50] ${
//                         errors.email ? "border-red-500" : "border-[#E5E5E5]"
//                       }`}
//                     />
//                     {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
//                   </div>

//                 </div>

//                 {/* Phone & Subject */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
//                   {/* Phone */}
//                   <div>
//                     <label className="block text-sm font-semibold text-[#333333] mb-2">
//                       Phone Number *
//                     </label>
//                     <input
//                       type="tel"
//                       name="phone"
//                       placeholder="Enter your phone number"
//                       value={formData.phone}
//                       onChange={handleInputChange}
//                       className={`w-full p-3 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#4CAF50] ${
//                         errors.phone ? "border-red-500" : "border-[#E5E5E5]"
//                       }`}
//                     />
//                     {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
//                   </div>

//                   {/* Subject */}
//                   <div>
//                     <label className="block text-sm font-semibold text-[#333333] mb-2">
//                       Subject *
//                     </label>
//                     <select
//                       name="subject"
//                       value={formData.subject}
//                       onChange={handleInputChange}
//                       className={`w-full p-3 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#4CAF50] ${
//                         errors.subject ? "border-red-500" : "border-[#E5E5E5]"
//                       }`}
//                     >
//                       <option value="">Select a subject</option>
//                       <option value="General Inquiry">General Inquiry</option>
//                       <option value="Order Support">Order Support</option>
//                       <option value="Product Question">Product Question</option>
//                       <option value="Feedback">Feedback</option>
//                       <option value="Partnership">Partnership</option>
//                       <option value="Other">Other</option>
//                     </select>
//                     {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
//                   </div>

//                 </div>

//                 {/* Message */}
//                 <div>
//                   <label className="block text-sm font-semibold text-[#333333] mb-2">
//                     Your Message *
//                   </label>
//                   <textarea
//                     name="message"
//                     placeholder="Tell us how we can help you..."
//                     rows="6"
//                     value={formData.message}
//                     onChange={handleInputChange}
//                     className={`w-full p-3 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#4CAF50] ${
//                       errors.message ? "border-red-500" : "border-[#E5E5E5]"
//                     }`}
//                   ></textarea>
//                   {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
//                 </div>

//                 {/* Submit Button */}
//                 <button
//                   type="submit"
//                   className="w-full bg-[#4CAF50] hover:bg-[#388E3C] text-white py-4 rounded-lg font-semibold text-lg transition shadow-lg"
//                 >
//                   Send Message
//                 </button>

//               </form>
//             </div>
//           </div>

//         </div>

//         {/* FAQ Section */}
//         <div className="mt-16 bg-white rounded-xl shadow-md p-8">
//           <h2 className="text-3xl font-bold text-[#333333] mb-8 text-center">
//             Frequently Asked Questions
//           </h2>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
//             <div>
//               <h3 className="text-lg font-bold text-[#333333] mb-2">
//                 What are your delivery hours?
//               </h3>
//               <p className="text-gray-600">
//                 We deliver 7 days a week from 8 AM to 8 PM. Same-day delivery is available for orders placed before 2 PM.
//               </p>
//             </div>

//             <div>
//               <h3 className="text-lg font-bold text-[#333333] mb-2">
//                 Do you offer refunds?
//               </h3>
//               <p className="text-gray-600">
//                 Yes! We offer a 100% satisfaction guarantee. If you're not happy with your order, contact us within 24 hours for a full refund.
//               </p>
//             </div>

//             <div>
//               <h3 className="text-lg font-bold text-[#333333] mb-2">
//                 What payment methods do you accept?
//               </h3>
//               <p className="text-gray-600">
//                 We accept cash on delivery, credit/debit cards, and online bank transfers.
//               </p>
//             </div>

//             <div>
//               <h3 className="text-lg font-bold text-[#333333] mb-2">
//                 How can I track my order?
//               </h3>
//               <p className="text-gray-600">
//                 After placing your order, you'll receive a tracking link via email and SMS. You can also track it from your account dashboard.
//               </p>
//             </div>

//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }


"use client";

import { useState } from "react";
import api from "@/lib/api";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ show: false, success: false, message: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ show: false, success: false, message: "" });

    try {
      const response = await api.post("/contact", formData);

      if (response.data.success) {
        setSubmitStatus({
          show: true,
          success: true,
          message: response.data.message
        });

        // Clear form
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });

        // Hide success message after 5 seconds
        setTimeout(() => {
          setSubmitStatus({ show: false, success: false, message: "" });
        }, 5000);
      } else {
        setSubmitStatus({
          show: true,
          success: false,
          message: response.data.message || "Failed to send message. Please try again."
        });
      }
    } catch (error) {
      console.error("Error sending contact message:", error);
      setSubmitStatus({
        show: true,
        success: false,
        message: error?.response?.data?.message || "Failed to send message. Please try again later."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#4CAF50] to-[#45a049] text-white px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">Get In Touch</h1>
          <p className="text-xl text-white/90">
            We'd love to hear from you! Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Contact Information */}
          <div className="space-y-6">
            
            {/* Contact Card 1 */}
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition">
              <div className="w-14 h-14 bg-[#4CAF50] rounded-full flex items-center justify-center text-3xl mb-4">
                📍
              </div>
              <h3 className="text-xl font-bold text-[#333333] mb-2">Visit Us</h3>
              <p className="text-gray-600">
                123 Grocery Street<br />
                Model Town, Lahore<br />
                Punjab, Pakistan 54000
              </p>
            </div>

            {/* Contact Card 2 */}
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition">
              <div className="w-14 h-14 bg-[#4CAF50] rounded-full flex items-center justify-center text-3xl mb-4">
                📞
              </div>
              <h3 className="text-xl font-bold text-[#333333] mb-2">Call Us</h3>
              <p className="text-gray-600">
                +92 300 1234567<br />
                +92 42 1234567<br />
                Mon-Sat: 9AM - 8PM
              </p>
            </div>

            {/* Contact Card 3 */}
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition">
              <div className="w-14 h-14 bg-[#4CAF50] rounded-full flex items-center justify-center text-3xl mb-4">
                📧
              </div>
              <h3 className="text-xl font-bold text-[#333333] mb-2">Email Us</h3>
              <p className="text-gray-600">
                support@grocery.com<br />
                info@grocery.com<br />
                We reply within 24 hours
              </p>
            </div>

            {/* Social Media */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-[#333333] mb-4">Follow Us</h3>
              <div className="flex gap-3">
                <button className="w-12 h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center transition text-xl">
                  f
                </button>
                <button className="w-12 h-12 bg-pink-500 hover:bg-pink-600 text-white rounded-full flex items-center justify-center transition text-xl">
                  📷
                </button>
                <button className="w-12 h-12 bg-blue-400 hover:bg-blue-500 text-white rounded-full flex items-center justify-center transition text-xl">
                  🐦
                </button>
                <button className="w-12 h-12 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition text-xl">
                  ▶
                </button>
              </div>
            </div>

          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-8">
              
              <h2 className="text-3xl font-bold text-[#333333] mb-6">Send Us a Message</h2>

              {/* Status Messages */}
              {submitStatus.show && (
                <div className={`mb-6 p-4 rounded-lg border ${
                  submitStatus.success 
                    ? "bg-green-100 border-green-300" 
                    : "bg-red-100 border-red-300"
                }`}>
                  <p className={`font-medium ${
                    submitStatus.success ? "text-green-800" : "text-red-800"
                  }`}>
                    {submitStatus.success ? "✅" : "❌"} {submitStatus.message}
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-semibold text-[#333333] mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                      className={`w-full p-3 border rounded-lg focus:outline-none text-gray-800 focus:ring-2 focus:ring-[#4CAF50] disabled:bg-gray-100 ${
                        errors.name ? "border-red-500" : "border-[#E5E5E5]"
                      }`}
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold text-[#333333] mb-2">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email address"
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                      className={`w-full p-3 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#4CAF50] disabled:bg-gray-100 ${
                        errors.email ? "border-red-500" : "border-[#E5E5E5]"
                      }`}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>

                </div>

                {/* Phone & Subject */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-semibold text-[#333333] mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                      className={`w-full p-3 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#4CAF50] disabled:bg-gray-100 ${
                        errors.phone ? "border-red-500" : "border-[#E5E5E5]"
                      }`}
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-sm font-semibold text-[#333333] mb-2">
                      Subject *
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                      className={`w-full p-3 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#4CAF50] disabled:bg-gray-100 ${
                        errors.subject ? "border-red-500" : "border-[#E5E5E5]"
                      }`}
                    >
                      <option value="">Select a subject</option>
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Order Support">Order Support</option>
                      <option value="Product Question">Product Question</option>
                      <option value="Feedback">Feedback</option>
                      <option value="Partnership">Partnership</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
                  </div>

                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-semibold text-[#333333] mb-2">
                    Your Message *
                  </label>
                  <textarea
                    name="message"
                    placeholder="Tell us how we can help you..."
                    rows="6"
                    value={formData.message}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    className={`w-full p-3 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#4CAF50] disabled:bg-gray-100 ${
                      errors.message ? "border-red-500" : "border-[#E5E5E5]"
                    }`}
                  ></textarea>
                  {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#4CAF50] hover:bg-[#388E3C] text-white py-4 rounded-lg font-semibold text-lg transition shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="inline-block animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </button>

              </form>
            </div>
          </div>

        </div>

        {/* FAQ Section */}
        <div className="mt-16 bg-white rounded-xl shadow-md p-8">
          <h2 className="text-3xl font-bold text-[#333333] mb-8 text-center">
            Frequently Asked Questions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div>
              <h3 className="text-lg font-bold text-[#333333] mb-2">
                What are your delivery hours?
              </h3>
              <p className="text-gray-600">
                We deliver 7 days a week from 8 AM to 8 PM. Same-day delivery is available for orders placed before 2 PM.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-[#333333] mb-2">
                Do you offer refunds?
              </h3>
              <p className="text-gray-600">
                Yes! We offer a 100% satisfaction guarantee. If you're not happy with your order, contact us within 24 hours for a full refund.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-[#333333] mb-2">
                What payment methods do you accept?
              </h3>
              <p className="text-gray-600">
                We accept cash on delivery, credit/debit cards, and online bank transfers.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-[#333333] mb-2">
                How can I track my order?
              </h3>
              <p className="text-gray-600">
                After placing your order, you'll receive a tracking link via email and SMS. You can also track it from your account dashboard.
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
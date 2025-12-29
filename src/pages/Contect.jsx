import { motion } from "framer-motion";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaCheckCircle,
} from "react-icons/fa";
import Slidebar from "../components/Slidebar";

export default function Contact() {
  const form = useRef();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
   const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [message, setmessage] = useState("");
  const [tittle, settittle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
 setLoading(true);
    const serviceID = "MD_bhai_213";
    const templateID = "template_5vk9iqq";
    const publicKey = "jsUrgmfqdXMHec9xE";

    const templateParams = {
      name ,
      email,
    to_email: "codechuru@gmail.com",
     message,
     
     tittle,
      time: new Date().toLocaleString(),
    };

    emailjs
      .send(serviceID, templateID, templateParams, publicKey)
      .then((response) => {

        console.log("SUCCESS!", response.status, response.text,response,message);
        alert("✅ Message sent successfully!");
        setname("");
        setemail("");
        setmessage("");
        setSubmitted(true);
          setLoading(false);
          form.current.reset();
          setTimeout(() => setSubmitted(false), 4000);
      })
      .catch((error) => {
        console.error("FAILED...", error);
        alert("❌ Failed to send message. Please try again.");
          setLoading(false);
      });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <>
    <Slidebar />
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={itemVariants}
    >
      <div className="flex font-serief flex-col items-center rounded-2xl gap-10 shadow-xl justify-center bg-linear-to-tr lg:m-5 xl:m-15 font-serif p-4">
      <h1 className="text-2xl lg:text-4xl text-green-500 font-bold">Location: <a href="https://www.google.com/maps/search/Office+of+Cheaf+Education+officer,+opposite+PWD+office+Churu./@28.2873068,74.9569876,17z/data=!3m1!4b1?authuser=0&entry=ttu&g_ep=EgoyMDI1MTExMC4wIKXMDSoASAFQAw%3D%3D" target="_blank" className="hover:text-green-300 hover:underline">Office of Chief District Education officer, opposite PWD office Churu.</a></h1>
      <h1 className="text-2xl lg:text-4xl text-green-500 font-bold">Nodal Incharge: Dr. Santosh Kumar Maharshi(C.D.E.O.)</h1>
      <h1 className="text-2xl lg:text-4xl text-green-500 font-bold">Sub-Nodal Incharge: Gaurav Sharma (Contact no. 9024303162)</h1>
      </div>
    </motion.div>
    <div
      id="contact"
      className="w-full min-h-screen px-4 pt-20 pb-12 text-black bg-green-200/10 sm:px-6 lg:px-8"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="mx-auto max-w-7xl"
      >
        {/* Header Section */}
        <motion.div
          variants={itemVariants}
          className="mb-12 text-center sm:mb-16"
        >
          <h1 className="mb-4 text-4xl font-bold text-transparent sm:text-5xl lg:text-6xl bg-linear-to-r from-green-300 via-emerald-400 to-green-500 bg-clip-text">
            Contact Us
          </h1>
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-black/70">
            Have any question, website related issue, suggestions or feedback? We'd love to hear from you. Send us a
            message and we'll respond as soon as possible.
          </p>
        </motion.div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 sm:gap-8 lg:gap-10">
          {/* Contact Info Cards */}
          <motion.div
            variants={itemVariants}
            className="space-y-6 lg:col-span-1"
          >
            {/* Phone Card */}
            <motion.div
              whileHover={{
                y: -5,
                boxShadow: "0 20px 40px rgba(34, 197, 94, 0.15)",
              }}
              className="p-6 transition-all duration-300 border bg-black/5 backdrop-blur-md border-black/10 rounded-2xl"
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-green-500/20">
                  <FaPhone className="text-xl text-green-400" />
                </div>
                <h3 className="text-lg font-semibold">Phone</h3>
              </div>
              <p className="ml-16 text-sm text-black/70">+91 90243 03162</p>
              <p className="mt-1 ml-16 text-xs text-black/50">
                Monday to Friday, 10 AM - 4 PM
              </p>
            </motion.div>

            {/* Email Card */}
            <motion.div
              whileHover={{
                y: -5,
                boxShadow: "0 20px 40px rgba(34, 197, 94, 0.15)",
              }}
              className="p-6 transition-all duration-300 border bg-black/5 backdrop-blur-md border-black/10 rounded-2xl"
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-500/20">
                  <FaEnvelope className="text-xl text-emerald-400" />
                </div>
                <h3 className="text-lg font-semibold">Email</h3>
              </div>
              <p className="ml-16 text-sm text-black/70">
                mail to:codechuru@gmail.com
              </p>
              <p className="mt-1 ml-16 text-xs text-black/50">
                We'll get back to you in 24 hours
              </p>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            ref={form}
            onSubmit={handleSubmit}
            variants={itemVariants}
            className="p-6 border shadow-2xl lg:col-span-2 bg-linear-to-br from-black/8 to-black/3 backdrop-blur-xl border-black/10 rounded-3xl sm:p-8 lg:p-10"
          >
            <div className="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2 sm:gap-6">
              {/* Name Input */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="sm:col-span-1"
              >
                <label className="block mb-2 ml-1 text-sm font-medium text-black/80">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  placeholder="alice doe"
                  onChange={(e) => setname(e.target.value)}
                  required
                  className="w-full px-4 py-3 text-black transition-all duration-300 border sm:py-4 bg-black/5 border-black/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400/50 focus:border-green-400/50 placeholder-black/30  backdrop-blur-md"
                />
              </motion.div>

              {/* Email Input */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="sm:col-span-1"
              >
                <label className="block mb-2 ml-1 text-sm font-medium text-black/80">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  placeholder="yeeppy@example.com"
                  required
                  className="w-full px-4 py-3 text-black transition-all duration-300 border sm:py-4 bg-black/5 border-black/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400/50 focus:border-green-400/50 placeholder-black/30 backdrop-blur-md"
                />
              </motion.div>
            </div>
            <motion.div whileHover={{ scale: 1.01 }} className="sm:col-span-1">
              <label className="block mb-2 ml-1 text-sm font-medium text-black/80">
              Message Title
              </label>
              <input
                type="text"
                name="tittle"
                value={tittle}
                onChange={(e) => settittle(e.target.value)}
                placeholder="Inquiry about your services"
                required
                className="w-full px-4 py-3 text-black transition-all duration-300 border sm:py-4 bg-black/5 border-black/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400/50 focus:border-green-400/50 placeholder-black/30 backdrop-blur-md"
              />
            </motion.div>

            {/* Message Input */}
            <motion.div whileHover={{ scale: 1.01 }} className="mb-8">
              <label className="block mb-2 ml-1 text-sm font-medium text-black/80">
                Message
              </label>
              <textarea
                name="message"
                value={message}
                onChange={(e) => setmessage(e.target.value)}
                placeholder="Tell us more about your inquiry..."
                required
                rows="5"
                className="w-full px-4 py-3 text-black transition-all duration-300 border resize-none sm:py-4 bg-black/5 border-black/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400/50 focus:border-green-400/50 placeholder-black/30 backdrop-blur-md"
              />
            </motion.div>

            {/* Submit Button */}
            <motion.button
              whileHover={
                !loading
                  ? {
                      scale: 1.02,
                      boxShadow: "0 20px 40px rgba(34, 197, 94, 0.3)",
                    }
                  : {}
              }
              whileTap={!loading ? { scale: 0.98 } : {}}
              type="submit"
              disabled={loading}
              className="flex items-center justify-center w-full gap-2 py-3 font-semibold text-white transition-all duration-300 sm:py-4 bg-linear-to-r from-green-400 to-emerald-500 rounded-xl hover:from-green-500 hover:to-emerald-600 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="w-5 h-5 border-2 border-white rounded-full border-t-transparent"
                  />
                  Sending...
                </>
              ) : (
                <>
                  <FaPaperPlane className="w-4 h-4" />
                  Send Message
                </>
              )}
            </motion.button>

            {/* Success Message */}
            {submitted && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center gap-3 p-4 mt-4 border bg-green-500/20 border-green-500/50 rounded-xl"
              >
                <FaCheckCircle className="shrink-0 text-green-400" />
                <p className="text-sm font-medium text-green-300">
                  Message sent successfully! We'll get back to you soon.
                </p>
              </motion.div>
            )}
          </motion.form>
        </div>

        {/* Decorative Elements */}
        <div className="absolute hidden rounded-full pointer-events-none top-20 right-10 w-72 h-72 bg-green-500/10 blur-3xl lg:block" />
        <div className="absolute bottom-0 left-0 rounded-full pointer-events-none w-96 h-96 bg-emerald-500/5 blur-3xl" />
      </motion.div>
    </div>
    </>
  );
}

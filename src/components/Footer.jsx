import React from "react";
import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="relative bg-green-900 text-white lg:text-xl overflow-hidden ">
      <div className="relative z-10  mx-auto px-10 py-20 flex flex-col  sm:grid-cols-2 lg:grid-cols-4 gap-10 ">
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          <h2 className="text-2xl font-bold text-gray-100 mb-4">
            {" "}
            Join with Us Quikly
          </h2>
          <a href="/schoolRegister">
            <button className="bg-linear-to-r cursor-pointer to-green-400 from-green-800 hover:from-green-400 hover:duration-1000 hover:to-green-800 hover:bg-linear-to-r text-white text-3xl px-16 py-3 rounded-full hover:bg-orange-700 transition">
              Get Started
            </button>
          </a>
          <hr className="mt-10 " />
        </motion.div>
        <div className="flex justify-between flex-col  gap-10">
          <motion.div
            className="flex flex-col "
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
          >
            <h2 className="text-2xl font-bold text-gray-100 0 mb-4">
              Follow Us
            </h2>
            <div className="flex gap-18 w-full mt-4">
              {[
                {
                  icon: <FaFacebookF />,
                  color: "hover:text-blue-400 text-5xl",
                },
                {
                  icon: <FaInstagram />,
                  color: "hover:text-pink-500 text-5xl",
                },
                { icon: <FaYoutube />, color: "hover:text-red-500 text-5xl" },
                {
                  icon: <FaLinkedinIn />,
                  color: "hover:text-blue-300 text-5xl",
                },
              ].map((s, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.3, y: -20 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className={` cursor-pointer transition ${s.color}`}
                >
                  {s.icon}
                </motion.div>
              ))}
            </div>
            <hr className="mt-10 " />
          </motion.div>

          <div className="flex md:flex-row flex-col w-full justify-between  gap-4   ">
            {" "}
            <motion.div
              className="flex flex-col "
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-2xl font-bold text-gray-100  mb-4 ">
                Quick Links
              </h2>
              <ul className="space-y-2 text-white flex flex-col ">
                <a
                  href="/home"
                  className="   hover:text-green-400 cursor-pointer transition"
                >
                  Home
                </a>
                <a
                  href="/yourSchool"
                  className="  hover:text-green-400 cursor-pointer transition"
                >
                  Admin Pannel
                </a>
                <a
                  href="/schoolContribution"
                  className="   hover:text-green-400 cursor-pointer transition"
                >
                  Leaderboard
                </a>
                <a
                  href="/contact"
                  className="   hover:text-green-400 cursor-pointer transition"
                >
                  Contact
                </a>
                <a
                  href="/initiatives"
                  className="   hover:text-green-400 cursor-pointer transition"
                >
                  About
                </a>
              </ul>
             
            </motion.div> <hr  className=""/>
            <motion.div
              className="flex flex-col max-w-80  justify-center items-start "
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl font-bold text-gray-100 mb-4">
                About Us
              </h2>
              <p className=" leading-relaxed">
                India is steadily moving on the path of development, yet a large section of society continues to struggle for its basic necessities. A wide economic gap exists between the high-income groups and the middle and lower-income sections. In such circumstances, the principles of the **3Rs—Reduce, Reuse, and Recycle—**emerge as a beacon of hope, especially for the economically weaker sections of society.
              </p>
           
            </motion.div>
   <hr />
            <motion.div
              className="flex flex-col items-start"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <h2 className="text-2xl font-bold text-gray-100 mb-4">Contact</h2>
              <p className="">
                {" "}
                <FaLocationDot className="inline" /> Churu, Rajasthan, India
              </p>
              <p className=" "> 📞 +91 90243 03162</p>
              <p className="">✉️ codechuru@gmail.com</p>
            </motion.div>
          </div>
        </div>
        <hr />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="relative z-10 text-center py-6 bg-green-950/50 text-gray-300"
      >
        <p>
          © {new Date().getFullYear()}{" "}
          <span className="text-blue-400 hover:scale-125 font-semibold">
            InnovationLab
          </span>
          . All Rights Reserved.
        </p>
      </motion.div>
    </footer>
  );
};

export default Footer;

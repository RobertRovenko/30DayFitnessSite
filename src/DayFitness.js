import { motion, useScroll, useTransform } from "framer-motion";
import { Routes, Route, Link } from "react-router-dom";

import Carousel from "./Carousel";
import ProjectCard from "./ProjectCard";
import PrivacyPolicy from "./PrivacyPolicy"; // import the new page component

function DayFitness() {
  return (
    <div className="min-h-screen bg-bgdarkblue text-white flex flex-col items-center justify-center ">
      {/* Header */}
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full bg-[#101125] px-12 py-6 flex items-center justify-between border-b border-gray-700"
      >
        <h1 className="text-4xl font-extrabold text-white tracking-wide font-bebas">
          30 Day Fitness
        </h1>

        <div className="flex flex-col items-end">
          <span
            className="uppercase text-xs tracking-widest font-semibold"
            style={{ fontFamily: "'Hammersmith One', sans-serif" }}
          >
            <span style={{ color: "#5a8de0" }}>rovenko</span>
            <span style={{ color: "white" }}>dev</span>
          </span>
        </div>
      </motion.header>

      {/* Hero Section */}
      <main className="flex-grow px-8 text-left">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row items-center md:items-start md:space-x-12 mt-16 space-y-8 md:space-y-0 text-center md:text-right "
        >
          <div>
            <h1 className="text-6xl md:text-8xl font-bold uppercase font-bebas tracking-wider">
              30 DAY <br /> FITNESS
            </h1>

            <p
              className="text-xs mt-1 tracking-widest font-bold"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              ROVENKODEV
            </p>
          </div>

          <motion.img
            src={`${process.env.PUBLIC_URL}/30dfe.png`}
            alt="Hero Banner"
            className="w-64 md:w-80 h-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          />
        </motion.div>
      </main>

      {/* Download & Carousel Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-16 mt-20 w-full max-w-6xl px-4"
      >
        <div className="md:w-1/2 text-center md:text-left">
          <h2
            className="text-4xl font-bold mb-4"
            style={{ fontFamily: "'Hammersmith One', sans-serif" }}
          >
            Download the App Now
          </h2>
          <p className="text-lg mb-6 max-w-xl mx-auto md:mx-0 text-gray-300">
            Start your transformation today with 30 Day Fitness. Available now
            on Google Play!
          </p>
          <a
            href="https://play.google.com/store/apps/details?id=com.rovenkodev.FitnessGuru"
            target="_blank"
            rel="noopener noreferrer"
          >
            <motion.img
              src={`${process.env.PUBLIC_URL}/googleplaydownload.png`}
              alt="Get it on Google Play"
              className="h-16 inline-block transition-transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
            />
          </a>
        </div>

        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="md:w-1/2"
        >
          <Carousel />
        </motion.div>
      </motion.section>

      {/* Project Card */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <ProjectCard />
      </motion.div>

      {/* Google Play Banner Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="w-full mt-20 pb-20 px-4 flex justify-center"
      >
        {/* Desktop */}
        <img
          src={`${process.env.PUBLIC_URL}/googleplaybanner.png`}
          alt="Google Play Promo Banner"
          className="hidden md:block max-w-5xl w-full rounded-xl"
        />
        {/* Mobile */}
        <img
          src={`${process.env.PUBLIC_URL}/googleplaybannermobile.png`}
          alt="Google Play Promo Banner Mobile"
          className="block md:hidden w-full rounded-xl"
        />
      </motion.section>
      <footer className="w-full bg-[#0d0e1a] border-t border-gray-700 py-6 px-6 mt-10 text-center text-gray-400 text-sm">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p>
            &copy; {new Date().getFullYear()} 30 Day Fitness. All rights
            reserved.
          </p>
          <div className="flex space-x-4">
            <a
              href="https://play.google.com/store/apps/details?id=com.rovenkodev.FitnessGuru"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
            >
              Google Play
            </a>
            <a
              href="https://www.robertrovenko.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
            >
              rovenkodev
            </a>
            <Link to="/privacy-policy" className="hover:text-white transition">
              Privacy Policy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default DayFitness;

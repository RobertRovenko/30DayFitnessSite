import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-bgdarkblue text-white flex flex-col items-center justify-center">
      {/* Header */}
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full bg-[#101125] px-12 py-6 flex items-center justify-between border-b border-gray-700"
      >
        <h1
          className="text-4xl font-extrabold text-white tracking-wide"
          style={{ fontFamily: "'Bebas Neue', cursive" }}
        >
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

      {/* Back to Home link */}
      <div className="w-full max-w-4xl px-12 mt-6">
        <Link
          to="/"
          className="text-blue-400 hover:text-blue-600 text-sm font-semibold transition"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          ← Back to Home
        </Link>
      </div>

      {/* Content */}
      <main className="flex-grow px-6 md:px-12 py-12 max-w-4xl w-full">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6 text-gray-300"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          <h1
            className="text-5xl font-extrabold text-white tracking-wide mb-6"
            style={{ fontFamily: "'Bebas Neue', cursive" }}
          >
            Privacy Policy
          </h1>
          <p>
            30 Day Fitness does not collect any data from our users. All data is
            saved locally on the app and is not shared with any third parties.
          </p>
          <p>
            We do not collect any personally identifiable information or
            non-personal identification information from Users of our App.
          </p>
        </motion.section>

        {/* Demonstration Images */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16 flex flex-col md:flex-row items-center justify-center gap-6 px-4"
        >
          <img
            src={`${process.env.PUBLIC_URL}/images/30dayfitnessdemonstration1.png`}
            alt="30 Day Fitness Demonstration 1"
            className="h-[500px] md:h-[400px] w-auto rounded-xl shadow-lg object-contain"
          />
          <img
            src={`${process.env.PUBLIC_URL}/images/30dayfitnessdemonstration2.png`}
            alt="30 Day Fitness Demonstration 2"
            className="h-[500px] md:h-[400px] w-auto rounded-xl shadow-lg object-contain"
          />
          <img
            src={`${process.env.PUBLIC_URL}/images/30dayfitnessdemonstration3.png`}
            alt="30 Day Fitness Demonstration 2"
            className="h-[500px] md:h-[400px] w-auto rounded-xl shadow-lg object-contain"
          />
        </motion.div>
      </main>

      {/* Footer */}
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

export default PrivacyPolicy;

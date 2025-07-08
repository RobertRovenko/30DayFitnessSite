import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Lock } from "lucide-react";

const ProjectCard = () => {
  const project = {
    title: "30 Day Fitness",
    imageUrls: [
      "/images/30dayfitnessdemonstration4.png",
      "/images/30dayfitnessdemonstration3.png",
      "/images/30dayfitnessdemonstration2.png",
      "/images/30dayfitnessdemonstration1.png",
    ],
    backgroundColor: "",
    foregroundColor: "#e0e7ff",
    codeLink: "",
    siteLink:
      "https://play.google.com/store/apps/details?id=com.rovenkodev.FitnessGuru",
    codeText: "Code Private",
    siteText: "Check Out App",
  };

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === project.imageUrls.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? project.imageUrls.length - 1 : prev - 1
    );
  };

  const adText = `30 Day Fitness is your ultimate gym companion! Take the first step towards transforming your body with our workout plan, expert tips, and a collection of detailed demonstration images that guide you on the right technique in the gym. Discover a variety of exercises and easily navigate through our user-friendly app. In just 30 days, you’ll feel more motivated, stronger, and experience a positive boost in your fitness journey!`;

  const features = [
    "Lifetime ad-free experience",
    "No in-app purchases or subscription services",
    "No account or personal data required",
    "Regular updates with new features",
    "Over 30 days of gym-focused content",
    "Exercise demonstration images and additional tips",
    "Customizable notification reminders",
    "Statistics and Achievements to track your progress",
  ];

  const disclaimer =
    "Please note: For the best experience, we do suggest that you have a gym available. The app is more bodybuilding-oriented. If you have any injuries or health concerns, please consult a doctor. 30 Day Fitness does not take responsibility for any injuries or misuse of the app; this is a workout plan.";

  return (
    <motion.div layout="position" className="relative">
      <motion.div
        key="expanded"
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.3 }}
        className="mt-16 overflow-hidden"
      >
        <div
          style={{
            backgroundColor: project.backgroundColor,
            color: project.foregroundColor,
          }}
          className="flex flex-col md:flex-row gap-8 items-start p-6  "
        >
          {/* Image Right */}
          <div
            className="md:w-1/2 w-full relative flex justify-center items-center"
            style={{ minHeight: "200px" }}
          >
            <img
              src={project.imageUrls[currentImageIndex]}
              alt={`${project.title} screenshot`}
              className="rounded-xl object-cover max-w-full max-h-full"
              style={{ width: "auto", height: "650px" }}
            />

            {project.imageUrls.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white rounded-full p-2 backdrop-blur-md shadow"
                  aria-label="Previous Image"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                  onClick={nextImage}
                  className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white rounded-full p-2 backdrop-blur-md shadow"
                  aria-label="Next Image"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          {/* Content Left */}
          <div className="md:w-1/2 w-full space-y-6 text-white">
            <h3 className="text-3xl font-bold">{project.title}</h3>

            <p className="text-lg leading-relaxed text-white/90">{adText}</p>

            <ul className="list-disc pl-6 text-base space-y-2 text-white/80">
              {features.map((feat, idx) => (
                <li key={idx}>{feat}</li>
              ))}
            </ul>

            <p className="text-sm text-white/60 pt-2">{disclaimer}</p>

            <div className="flex flex-wrap gap-3 pt-4">
              {project.siteLink && (
                <a
                  href={project.siteLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 text-sm font-medium bg-indigo-600 text-white rounded-full hover:bg-indigo-500 transition shadow"
                >
                  {project.siteText}
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectCard;

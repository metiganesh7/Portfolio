import HologramRadar from "./Components/HologramRadar";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ProjectCard3D from "./Components/ProjectCard3D";
import Chatbot from "./Components/Chatbot";

export default function App() {
  const ACCENT = "#2563eb";
  const ACCENT_LIGHT = "#3b82f6";

  const skills = [
    { name: "Data Visualization", icon: "/skills/dataviz.png" },
    { name: "Machine Learning", icon: "/skills/machine.png" },
    { name: "Pandas", icon: "/skills/pandas.png" },
    { name: "Python", icon: "/skills/python.png" },
    { name: "Scikit-learn", icon: "/skills/sklearn.png" },
    { name: "SQL", icon: "/skills/sql.png" },
    { name: "Streamlit", icon: "/skills/streamlit.png" },
    { name: "Time-Series", icon: "/skills/timeseries.png" }
  ];

  const certImages = [
    "/agentic-ai.jpg",
    "/data-fundamentals.png",
    "/data-science-for-engineers.jpg",
    "/data-science.png",
    "/python-for-data-science.jpg",
    "/techtatva.jpg",
    "/iee.jpg"
  ];

  const [isDark, setIsDark] = useState(true);   // 🔥 Default dark theme ON
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) root.classList.add("dark");
    else root.classList.remove("dark");
  }, [isDark]);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setSidebarOpen(false);
    const el = document.getElementById(targetId);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const floating = (delay = 0) => ({
    animate: {
      y: [0, -8, 0],
      transition: {
        duration: 4 + delay,
        ease: "easeInOut",
        repeat: Infinity,
        delay,
      },
    },
  });

  function LoadingAnimationSmall() {
    return (
      <div className="flex items-center justify-center py-10">
        <div className="flex items-end gap-2 h-8">
          <span className="block w-2.5 h-2.5 rounded-full bg-blue-500 animate-bounce" />
          <span className="block w-2.5 h-2.5 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: "0.12s" }} />
          <span className="block w-2.5 h-2.5 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: "0.24s" }} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#05060b] text-gray-200">

      {/* Overlay when sidebar open */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-full w-72 max-w-[85vw] z-50 
        bg-[#071026] border-r border-white/10 shadow-xl transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-6 flex flex-col h-full text-gray-200">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <img src="/profile.jpg" alt="" className="w-12 h-12 rounded-full" />
              <div>
                <div className="font-semibold">Ganesh M</div>
                <div className="text-xs text-gray-400">AI & Data Science</div>
              </div>
            </div>

            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 bg-[#121318] rounded-md"
            >
              ✕
            </button>
          </div>

          <nav className="flex-1">
            <ul className="space-y-2">
              <li><a onClick={(e)=>handleNavClick(e,"home")} className="block px-3 py-2 rounded-md hover:bg-white/10">Home</a></li>
              <li><a onClick={(e)=>handleNavClick(e,"projects")} className="block px-3 py-2 rounded-md hover:bg-white/10">Projects</a></li>
              <li><a onClick={(e)=>handleNavClick(e,"certificates")} className="block px-3 py-2 rounded-md hover:bg-white/10">Certificates</a></li>
              <li><a onClick={(e)=>handleNavClick(e,"skills")} className="block px-3 py-2 rounded-md hover:bg-white/10">Skills</a></li>
              <li><a onClick={(e)=>handleNavClick(e,"skill-radar")} className="block px-3 py-2 rounded-md hover:bg-white/10">Skill Radar</a></li>
              <li><a onClick={(e)=>handleNavClick(e,"about")} className="block px-3 py-2 rounded-md hover:bg-white/10">About</a></li>
              <li><a onClick={(e)=>handleNavClick(e,"contact")} className="block px-3 py-2 rounded-md hover:bg-white/10">Contact</a></li>
              <li><a href="/resume.pdf" className="block px-3 py-2 rounded-md hover:bg-white/10">Resume</a></li>
            </ul>
          </nav>
        </div>
      </aside>

      {/* Navbar */}
      <header className="sticky top-0 z-30 bg-black/30 backdrop-blur border-b border-white/10">
        <nav className="max-w-6xl mx-auto p-4 flex items-center justify-between">

          <div className="flex items-center gap-3" id="home">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 bg-[#121318] rounded-md text-white"
            >
              ☰
            </button>

            <img src="/profile.jpg" className="w-10 h-10 rounded-full" alt="" />
            <div>
              <div className="font-semibold">Ganesh M</div>
              <div className="text-xs text-gray-400">AI & Data Science Student</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a href="/resume.pdf" className="px-3 py-2 border border-white/10 rounded-md">Resume</a>
            <a href="https://github.com/metiganesh7" className="px-3 py-2 bg-white/10 rounded-md">GitHub</a>
            <a href="https://linkedin.com/in/ganesh-m-7b2431290" className="px-3 py-2 bg-blue-600 text-white rounded-md">LinkedIn</a>

            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-full bg-[#121318]"
            >
              {isDark ? "🌙" : "☀️"}
            </button>
          </div>
        </nav>
      </header>

      {/* HERO SECTION */}
      <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-3 gap-12 items-center" id="home">
        <div className="md:col-span-2">
          <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-5xl font-extrabold">
            Hi, I’m <span style={{ color: ACCENT_LIGHT }}>Ganesh</span> — AI & Data Science Student
          </motion.h1>

          <p className="mt-5 text-gray-300 max-w-2xl">
            I build ML models, dashboards, visualizations and time-series forecasting applications.
          </p>

          <div className="mt-6 flex gap-4">
            <a href="/resume.pdf" className="px-5 py-3 rounded-lg text-white font-semibold"
               style={{ background: `linear-gradient(90deg, ${ACCENT}, ${ACCENT_LIGHT})` }}>
              Download Resume
            </a>

            <a href="#projects" className="px-5 py-3 border border-white/20 rounded-lg">
              View Projects
            </a>
          </div>
        </div>

        <div className="flex justify-center">
          <motion.img
            src="/profile.jpg"
            className="w-64 h-64 rounded-2xl object-cover shadow-2xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05, rotate: 2 }}
          />
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="max-w-6xl mx-auto px-6 py-12">
        <h3 className="text-3xl font-bold mb-6">Skills</h3>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {skills.map((skill) => (
            <motion.div
              key={skill.name}
              whileHover={{ scale: 1.07 }}
              className="flex items-center gap-4 px-5 py-4 rounded-2xl
                  bg-[#030712] border border-blue-500/30 
                  shadow-lg shadow-blue-500/20
                  hover:shadow-blue-400/40 transition"
            >
              <img src={skill.icon} className="w-10 h-10 drop-shadow-[0_0_8px_rgba(0,153,255,0.8)]" />
              <span className="text-lg font-medium text-blue-400 drop-shadow-[0_0_6px_rgba(0,153,255,0.8)]">{skill.name}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* RADAR */}
      <section id="skill-radar" className="max-w-6xl mx-auto px-6 py-12">
        <HologramRadar />
      </section>

      {/* PROJECTS */}
      <section id="projects" className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold mb-6">Projects</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <ProjectCard3D
            title="Credit Card Fraud Detection"
            desc="ML model using SMOTE, RandomForest & ROC-AUC."
            link="https://github.com/metiganesh7/Credit-card-fraud-detection"
            image="/fraud.jpg"
          />
          <ProjectCard3D
            title="Stock Market Forecasting"
            desc="Time-series forecasting + Streamlit dashboard."
            link="https://github.com/metiganesh7/Time-Series-analysis-and-Forecasting-stock-market"
            image="/forecast.jpg"
          />
        </div>
      </section>

      {/* CERTIFICATES */}
      <section id="certificates" className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold mb-6">Certificates</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {certImages.map((img, idx) => (
            <motion.div key={idx} className="rounded-xl bg-[#071026] p-3 shadow" {...floating(idx * 0.1)}>
              <img src={img} className="w-full h-48 object-contain" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-10 text-center">About Me</h2>

        <div className="grid md:grid-cols-2 gap-10">
          <div className="text-gray-300">
            <p className="text-lg">I'm <span className="text-blue-400">Ganesh M</span>, pursuing a B.E. in AI & Data Science.</p>
            <p className="mt-4">I specialize in building ML models, forecasting systems and AI applications.</p>
            <p className="mt-4">I aim to build intelligent, scalable solutions with real-world impact.</p>
          </div>

          <div id="contact" className="rounded-2xl p-8 border border-blue-500/20 bg-blue-900/10 shadow-lg">
            <h3 className="text-2xl text-blue-400 mb-4">Get in Touch</h3>

            <p className="text-sm text-gray-400">Email</p>
            <a href="mailto:metiganesh7@gmail.com" className="text-blue-300 block mb-3">metiganesh7@gmail.com</a>

            <p className="text-sm text-gray-400">Phone</p>
            <a href="tel:8431701043" className="text-blue-300 block">8431701043</a>
          </div>
        </div>
      </section>

      {/* LOADING ANIMATION */}
      <section className="max-w-6xl mx-auto px-6 py-8">
        <h3 className="text-2xl font-semibold mb-4 text-center">Loading Animation</h3>
        <div className="rounded-xl bg-[#071026] p-6">
          <LoadingAnimationSmall />
        </div>
      </section>

      {/* BLOG */}
      <section id="blog" className="max-w-6xl mx-auto px-6 py-8">
        <h3 className="text-2xl font-semibold mb-6 text-center">Blog</h3>

        <div className="grid md:grid-cols-3 gap-6">
          <ProjectCard3D
            title="Understanding Machine Learning"
            desc="Beginner explanation of ML, workflows & models."
            link="#"
            image="/fraud.jpg"
          />

          <ProjectCard3D
            title="Time-Series Forecasting"
            desc="ARIMA, LSTM and Prophet for forecasting."
            link="#"
            image="/forecast.jpg"
          />

          <ProjectCard3D
            title="Getting Started With AI Projects"
            desc="Project tips, dataset creation & deployment."
            link="#"
            image="/blog/ai.jpg"
          />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 text-center text-gray-500">
        © {new Date().getFullYear()} Ganesh M — Built with ❤️
      </footer>

      {/* CHATBOT */}
      <Chatbot />
    </div>
  );
}

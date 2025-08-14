import { useState, useRef, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Github,
  ArrowUpToLine,
} from "lucide-react";
import LaporinAja from "../assets/images/laporinaja.png";
import SateApp from "../assets/images/sate.png";
import OhMyGerd from "../assets/images/ohmygerd.png";

const projects = [
  {
    id: 1,
    title: "OhMyGerd",
    role: "Mobile App Developer",
    year: "2025",
    description:
      "OhMyGERD is a gamified mobile app designed to support young individuals—especially busy college students—in managing Gastroesophageal Reflux Disease (GERD).",
    image: OhMyGerd,
    githubLink: "https://github.com/scientivan/ohmygerd/",
    liveLink:
      "https://drive.google.com/file/d/1sZALCiWk_rCOWqBKDy14hzPA-BhPyEo-/view?usp=sharing",
    tags: ["Flutter", "Dart", "Gemini Flash"],
  },
  {
    id: 2,
    title: "Satu Teladan App",
    role: "Mobile App Developer",
    year: "2025",
    description:
      "Satu Teladan is a comprehensive mobile application designed to serve as the central hub for alumni engagement.",
    image: SateApp,
    githubLink: "https://github.com/Satu-Teladan-App",
    liveLink: "none",
    tags: ["React Native", "Nativewind", "Expo"],
  },
  {
    id: 3,
    title: "LaporinAja!",
    role: "Web and Design Developer",
    year: "2025",
    description:
      "LaporinAja! is a web application designed to facilitate the reporting of issues in public facilities.",
    image: LaporinAja,
    githubLink: "https://github.com/AncungAulia/laporinaja",
    liveLink: "none",
    tags: ["Figma", "Notion", "Next.js", "Tailwind CSS"],
  },
];

export const Projects = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animate, setAnimate] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  // Animation trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          console.log("Projects section intersection:", entry.isIntersecting);
          if (entry.isIntersecting) {
            setAnimate(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % projects.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const onTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) nextSlide();
    if (diff < -50) prevSlide();
  };

  // Auto-slide tiap 5 detik
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentSlide]);

  return (
    <section
      id="projects"
      ref={sectionRef} // TAMBAH REF INI!
      className="min-h-screen w-full flex flex-col items-center justify-center p-8 relative overflow-hidden bg-emerald-600"
    >
      <div className="hidden md:block absolute top-3 z-10 left-1/2 -translate-x-1/2 animate-bounce-up">
        <button
          onClick={() => {
            document
              .getElementById("home")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
          className="flex flex-col items-center gap-1 text-white hover:scale-110 hover:font-semibold transition-all duration-200 cursor-pointer"
        >
          <ArrowUpToLine size={18} />
          <p className="text-[10px]">To Top</p>
        </button>
      </div>

      {/* Heading */}
      <h2
        className={`text-3xl md:text-4xl font-bold text-white mb-8 transition-all duration-300 ${
          animate ? "animate-fade-in opacity-100" : "opacity-0"
        }`}
        style={{
          animationDelay: "0.1s",
          animationFillMode: "backwards",
        }}
      >
        Projects
      </h2>

      {/* Carousel container */}
      <div
        className={`relative overflow-hidden w-full max-w-6xl transition-all duration-300 ${
          animate ? "animate-fade-in opacity-100" : "opacity-0"
        }`}
        style={{
          animationDelay: "0.3s",
          animationFillMode: "backwards",
        }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="flex transition-transform duration-300 ease-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {projects.map((project, idx) => (
            <div key={idx} className="w-full flex-shrink-0 px-4">
              <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-lg overflow-hidden py-8 px-8">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full md:w-1/2 h-auto object-contain rounded-xl"
                />
                <div className="flex flex-col p-6 flex-1 justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">
                      {project.title}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">
                      {project.role} • {project.year}
                    </p>
                    <p className="text-gray-700 text-sm mb-4">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="bg-emerald-100 text-emerald-700 text-xs px-3 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-4 mt-4">
                    {project.githubLink !== "none" && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm text-gray-600 border-1 border-gray-300 p-2 rounded-[8px] hover:text-white hover:bg-gray-800 shadow-md transition-all"
                      >
                        <Github size={16} /> Source Code
                      </a>
                    )}
                    {project.liveLink !== "none" && (
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm text-black p-2 rounded-[8px] bg-yellow-400 shadow-md hover:opacity-80 transition"
                      >
                        <ExternalLink size={16} /> Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Prev Button */}
        <button
          onClick={prevSlide}
          className="absolute hidden sm:block left-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-emerald-300 border-2 border-white shadow hover:opacity-90 transition-all duration-200"
        >
          <ChevronLeft size={24} className="text-gray-600" />
        </button>

        {/* Next Button */}
        <button
          onClick={nextSlide}
          className="absolute hidden sm:block right-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-emerald-300 border-2 border-white shadow hover:opacity-90 transition-all duration-200"
        >
          <ChevronRight size={24} className="text-gray-600" />
        </button>
      </div>

      {/* Indicators */}
      <div
        className={`flex justify-center mt-6 gap-2 items-center transition-all duration-300 ${
          animate ? "animate-fade-in opacity-100" : "opacity-0"
        }`}
        style={{
          animationDelay: "0.5s",
          animationFillMode: "backwards",
        }}
      >
        {projects.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`rounded-full transition-all duration-300 ${
              currentSlide === idx
                ? "bg-yellow-400 h-1 w-4"
                : "bg-white/50 hover:bg-white/80 w-3 h-3"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

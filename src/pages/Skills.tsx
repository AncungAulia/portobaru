import { useState, useRef, useEffect } from "react";
import { ReactNode } from "react";
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaPython,
  FaFigma,
  FaGithub,
  FaGitAlt,
} from "react-icons/fa";
import { SiCplusplus, SiNextdotjs, SiTailwindcss } from "react-icons/si";
import { RiNotionFill } from "react-icons/ri";
import { TbBrandReactNative } from "react-icons/tb";
import { FaFlutter } from "react-icons/fa6";
import {
  CircleArrowDown,
  ArrowUpToLine,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Marquee from "react-fast-marquee";
import { SiVite } from "react-icons/si";

const skills = [
  { icon: <SiCplusplus />, name: "C++" },
  { icon: <FaPython />, name: "Python" },
  { icon: <FaHtml5 />, name: "HTML" },
  { icon: <FaCss3Alt />, name: "CSS" },
  { icon: <FaJs />, name: "JavaScript" },
  { icon: <FaReact />, name: "React" },
  { icon: <SiVite />, name: "Vite" },
  { icon: <SiNextdotjs />, name: "Next.js" },
  { icon: <SiTailwindcss />, name: "Tailwind CSS" },
  { icon: <FaFigma />, name: "Figma" },
  { icon: <RiNotionFill />, name: "Notion" },
  { icon: <TbBrandReactNative />, name: "React Native" },
  { icon: <FaFlutter />, name: "Flutter" },
  { icon: <FaGithub />, name: "GitHub" },
  { icon: <FaGitAlt />, name: "Git" },
];

// Types
interface Skill {
  icon: ReactNode;
  name: string;
  description: string;
}

interface SkillCard {
  title: string;
  skills: Skill[];
}

// Data untuk setiap skill card
const skillCards: SkillCard[] = [
  {
    title: "Basic Programming Language",
    skills: [
      {
        icon: <SiCplusplus className="text-4xl" />,
        name: "C++",
        description: "C++ for early programming concepts and problem-solving.",
      },
      {
        icon: <FaPython className="text-4xl" />,
        name: "Python",
        description:
          "Python for data analysis, automation, and web development.",
      },
    ],
  },
  {
    title: "Front-End Skills",
    skills: [
      {
        icon: <FaReact className="text-4xl" />,
        name: "React",
        description: "Component-based library for building user interfaces.",
      },
      {
        icon: <SiNextdotjs className="text-4xl" />,
        name: "Next.js",
        description: "Full-stack React framework for production applications.",
      },
      {
        icon: <SiTailwindcss className="text-4xl" />,
        name: "Tailwind CSS",
        description: "Utility-first CSS framework for rapid UI development.",
      },
    ],
  },
  {
    title: "Mobile Application Skills",
    skills: [
      {
        icon: <TbBrandReactNative className="text-4xl" />,
        name: "React Native",
        description: "Cross-platform mobile development with React principles.",
      },
      {
        icon: <FaFlutter className="text-4xl" />,
        name: "Flutter",
        description: "Google's UI toolkit for beautiful native mobile apps.",
      },
    ],
  },
  {
    title: "Software Development and Design",
    skills: [
      {
        icon: <FaFigma className="text-4xl" />,
        name: "Figma",
        description: "Collaborative design tool for UI/UX prototyping.",
      },
      {
        icon: <RiNotionFill className="text-4xl" />,
        name: "Notion",
        description:
          "All-in-one workspace for notes, docs, and project management.",
      },
      {
        icon: <FaGithub className="text-4xl" />,
        name: "GitHub",
        description: "Version control and collaborative development platform.",
      },
    ],
  },
];

const SkillCard = ({ cardData }: { cardData: SkillCard }) => {
  return (
    <div className="flex flex-col p-10 rounded-2xl gap-15 items-center justify-center w-full bg-transparent text-gray-600">
      <h1 className="text-lg font-bold text-center">{cardData.title}</h1>
      <div
        className={`flex flex-row gap-8 w-full justify-center flex-wrap ${
          cardData.skills.length > 3 ? "max-w-5xl" : ""
        }`}
      >
        {cardData.skills.map((skill: Skill, index: number) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center gap-3 max-w-[300px] hover:text-emerald-600 transition-colors duration-300"
          >
            {skill.icon}
            <p className="text-sm text-center">{skill.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const Marquees = ({ animate }: { animate: boolean }) => {
  return (
    <div
      className={`w-full md:w-[80%] overflow-hidden transition-all duration-300 ${
        animate ? "animate-fade-in opacity-100" : "opacity-0"
      }`}
      style={{
        animationDelay: "0.8s",
        animationFillMode: "backwards",
      }}
    >
      <Marquee
        pauseOnHover={true}
        gradient={true}
        speed={180}
        autoFill={true}
        gradientColor="#f9fafb"
        className="flex gap-24"
      >
        {skills.concat(skills).map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center min-w-[120px] text-gray-600 hover:text-emerald-600 transition duration-300"
          >
            <div className="text-4xl mb-2">{item.icon}</div>
            <span className="text-sm font-medium">{item.name}</span>
          </div>
        ))}
      </Marquee>
    </div>
  );
};

const Skills = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const [offset, setOffset] = useState(0);
  const [animate, setAnimate] = useState(false);
  const startX = useRef(0);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  // Animation trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          console.log("Skills section intersection:", entry.isIntersecting);
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

  const nextCard = () => {
    setCurrentCard((prev) => (prev + 1) % skillCards.length);
  };

  const prevCard = () => {
    setCurrentCard(
      (prev) => (prev - 1 + skillCards.length) % skillCards.length
    );
  };

  const onTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    const deltaX = e.touches[0].clientX - startX.current;
    setOffset(deltaX);
  };

  const onTouchEnd = () => {
    if (offset > 100) {
      prevCard();
    } else if (offset < -100) {
      nextCard();
    }
    setOffset(0);
  };

  return (
    <section
      id="skills"
      className="min-h-screen flex flex-col justify-center py-20 items-center gap-16 w-full relative overflow-hidden"
      ref={sectionRef}
    >
      <div className="hidden md:block absolute bottom-3 z-10 left-1/2 -translate-x-1/2 animate-bounce">
        <button
          onClick={() => {
            document
              .getElementById("projects")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
          className="flex flex-col items-center gap-1 text-gray-800 cursor-pointer"
        >
          <p className="text-[10px]">My Projects</p>
          <CircleArrowDown size={18} />
        </button>
      </div>

      <div className="hidden md:block absolute top-3 z-10 left-1/2 -translate-x-1/2 animate-bounce-up">
        <button
          onClick={() => {
            document
              .getElementById("home")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
          className="flex flex-col items-center gap-1 text-gray-800 hover:font-semibold transition-all duration-200 cursor-pointer"
        >
          <ArrowUpToLine size={18} />
          <p className="text-[10px]">To Top</p>
        </button>
      </div>

      {/* Section Heading */}
      <h2
        className={`text-2xl md:text-4xl text-center font-bold text-gray-800 transition-all duration-300 ${
          animate ? "animate-fade-in opacity-100" : "opacity-0"
        }`}
        style={{
          animationDelay: "0.1s",
          animationFillMode: "backwards",
        }}
      >
        Skills
      </h2>

      {/* Carousel Container */}
      <div
        className={`relative w-[90%] max-w-6xl flex items-center gap-2 justify-center transition-all duration-300 ${
          animate ? "animate-fade-in opacity-100" : "opacity-0"
        }`}
        style={{
          animationDelay: "0.3s",
          animationFillMode: "backwards",
        }}
      >
        {/* Previous Button */}
        <button
          onClick={prevCard}
          className="absolute left-0 z-10 p-2 rounded-full bg-emerald-600 shadow-lg hover:opacity-80 transition-all duration-200 hover:scale-110"
        >
          <ChevronLeft size={24} className="text-white" />
        </button>

        {/* Swipe Wrapper */}
        <div
          className="w-[90%] md:w-full overflow-hidden "
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div
            className="flex transition-transform duration-300 ease-out"
            style={{
              transform: `translateX(calc(-${
                currentCard * 100
              }% + ${offset}px))`,
            }}
          >
            {skillCards.map((card, idx) => (
              <div key={idx} className="w-full flex-shrink-0">
                <SkillCard cardData={card} />
              </div>
            ))}
          </div>
        </div>

        {/* Next Button */}
        <button
          onClick={nextCard}
          className="absolute right-0 z-10 p-2 rounded-full bg-emerald-600 shadow-lg hover:opacity-80 transition-all duration-200 hover:scale-110"
        >
          <ChevronRight size={24} className="text-white" />
        </button>
      </div>
      

      {/* Marquee */}
      <Marquees animate={animate} />
    </section>
  );
};

export default Skills;

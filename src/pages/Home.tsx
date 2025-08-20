import { Github, Linkedin, Mail, ExternalLink } from "lucide-react";
import { Typewriter } from "react-simple-typewriter";
import { CircleArrowDown } from "lucide-react";
import Profil from "../assets/images/profil.jpg";

export const Home = () => {
  return (
    <>
      <section
        data-theme="light"
        id="home"
        className="min-h-screen w-full flex flex-col items-center justify-center p-8 relative overflow-hidden"
      >
        <div className="hidden md:block absolute bottom-3 z-10 left-1/2 -translate-x-1/2 animate-bounce ">
          <button
            onClick={() => {
              document
                .getElementById("about")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="flex flex-col items-center gap-1 text-gray-800 cursor-pointer"
          >
            <p className="text-[10px]">About Me</p>
            <CircleArrowDown size={18} />
          </button>
        </div>
        <div className="max-w-6xl w-full flex flex-col-reverse md:flex-row items-center justify-between gap-12">
          <div className="flex flex-col lg:items-start items-center space-y-4">
            <div className="flex flex-col gap-3 sm:items-center w-[80%] sm:w-auto">
              <h1 className="text-lg md:text-4xl font-medium text-gray-600 self-center sm:self-start">
                Hi, I'm{" "}
              </h1>
              <span className="text-xl md:text-6xl font-semibold sm:self-start sm:text-left self-center text-center">
                <Typewriter
                  words={[
                    "Aulia Nur Fajri Tri Anggoro",
                    "Ancung",
                    "Mobile App Developer",
                    "Front-End Developer",
                  ]}
                  loop={false}
                  cursor
                  delaySpeed={3000}
                  typeSpeed={50}
                />
              </span>
            </div>

            <div
              className="flex w-full gap-10 sm:gap-4 mt-2 items-center justify-center sm:justify-start animate-fade-in"
              style={{ animationDelay: "2.0s", animationFillMode: "backwards" }}
            >
              <a
                href="https://github.com/AncungAulia"
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 flex items-center justify-center rounded-full bg-white border-1 border-gray-300 text-[#24292e] hover:bg-[#24292e] hover:text-white transition shadow-md"
              >
                <Github size={20} />
              </a>
              <a
                href="www.linkedin.com/in/aulianurfajri"
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 flex items-center justify-center rounded-full bg-white text-[#0a66c2] hover:bg-[#0a66c2] border-1 border-gray-300 hover:text-white transition shadow-md"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=ancungaulia@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 flex items-center justify-center rounded-full bg-white text-[#08851b] hover:bg-[#08851b] border-1 border-gray-300 hover:text-white transition shadow-md"
              >
                <Mail size={20} />
              </a>
            </div>

            <div
              className="
    flex flex-wrap gap-4 mt-6 justify-center sm:justify-start animate-fade-in
    absolute bottom-5 left-0 w-full px-4 sm:static sm:w-auto sm:px-0 sm:mt-6
    bg-white sm:bg-transparent py-3 sm:py-0
    border-t border-gray-200 sm:border-none
  "
              style={{ animationDelay: "2.5s", animationFillMode: "backwards" }}
            >
              <a
                href="/curriculum_vitae.pdf"
                download="ancungaulia_cv.pdf"
                className="inline-flex w-[95%] sm:w-auto text-base sm:text-lg items-center gap-2 bg-emerald-600 text-white py-3 px-6 rounded-[16px] hover:bg-emerald-700 transition shadow-lg hover:shadow-emerald-500/20 justify-center"
              >
                Download My CV
                <ExternalLink size={18} />
              </a>
            </div>
          </div>

          <div className="relative ">
            <div className="absolute inset-0 bg-emerald-400 rounded-full blur-3xl opacity-20 scale-110"></div>
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 blur-xl opacity-30 animate-pulse"></div>
              <div className="w-60 h-60 md:w-80 md:h-80 rounded-full bg-gray-100 p-1 shadow-2xl relative z-10">
                <div className="w-full h-full rounded-full overflow-hidden border-1 border-white">
                  <img
                    src={Profil || "/placeholder.svg"}
                    alt="Aulia Nur Fajri Tri Anggoro"
                    className="w-full h-full object-cover transform hover:scale-105 transition-all duration-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

import { useState, useEffect, useRef } from "react";
import { CircleArrowDown, ArrowUpToLine } from "lucide-react";

export const About = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isUserInteracting, setIsUserInteracting] = useState(false);

  const aboutData = [
    {
      title: "About Me?",
      text: `Hi! I am Aulia Nur Fajri Tri Anggoro, currently a student at
      Gadjah Mada University, majoring in Information Engineering. I am
      a software enthusiast with a passion for web application
      development and mobile application development. I enjoy creating
      innovative and user-friendly applications that solve real-world
      problems.`,
    },
    {
      title: "Why 'Ancung'?",
      text: `So, when I was born, I had a pointy nose, and my parents thought
      it would be cute to call me 'Ancung', which comes from the word
      'mancung' in Indonesian, meaning pointy, but without the 'm'. Over
      time, this nickname has become a part of my identity, and until
      now, I still use it as my nickname.`,
    },
  ];

  // Auto swipe settings
  const autoSwipeDelay = 5000;
  const resetInteractionDelay = 2000;

  // Animation state
  const [animate, setAnimate] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  // Trigger animasi kalau section masuk ke viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          console.log("Section intersection:", entry.isIntersecting); // Debug log
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

  useEffect(() => {
    if (isUserInteracting) return;

    const autoSlide = setInterval(() => {
      setCurrentSlide((prev) => {
        if (prev >= aboutData.length - 1) {
          return 0;
        }
        return prev + 1;
      });
    }, autoSwipeDelay);

    return () => clearInterval(autoSlide);
  }, [aboutData.length, isUserInteracting]);

  useEffect(() => {
    if (!isUserInteracting) return;

    const resetTimer = setTimeout(() => {
      setIsUserInteracting(false);
    }, resetInteractionDelay);

    return () => clearTimeout(resetTimer);
  }, [isUserInteracting]);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setIsUserInteracting(true);
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && currentSlide < aboutData.length - 1) {
      setCurrentSlide((prev) => prev + 1);
    }
    if (isRightSwipe && currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1);
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  const goToSlide = (index: number) => {
    setIsUserInteracting(true);
    setCurrentSlide(index);
  };

  return (
    <section
      id="about"
      ref={sectionRef} // PENTING: Tambah ref di sini!
      data-theme="emerald"
      className="min-h-screen flex flex-row items-center px-6 bg-emerald-600 relative overflow-hidden min-w-full justify-center"
    >
      <div className="hidden md:block absolute bottom-3 z-10 left-1/2 -translate-x-1/2 animate-bounce">
        <button
          onClick={() => {
            document
              .getElementById("skills")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
          className="flex flex-col items-center gap-1 text-white cursor-pointer"
        >
          <p className="text-[10px]">My Skills</p>
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
          className="flex flex-col items-center gap-1 text-white hover:scale-110 hover:font-semibold transition-all duration-200 cursor-pointer"
        >
          <ArrowUpToLine size={18} />
          <p className="text-[10px]">To Top</p>
        </button>
      </div>

      <div className="max-w-full sm:max-w-[80%] w-full flex flex-col md:flex-row items-center justify-between gap-20 sm:gap-40">
        {/* Mobile View - Auto Swipe Carousel */}
        <div
          className={`w-full mt-10 md:hidden transition-all duration-300 ${
            animate ? "animate-fade-in opacity-100" : "opacity-0"
          }`}
          style={{
            animationDelay: "0.2s",
            animationFillMode: "backwards",
          }}
        >
          <div
            className="relative overflow-hidden cursor-grab active:cursor-grabbing"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div
              className="flex transition-transform duration-300 ease-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {aboutData.map((item, idx) => (
                <div key={idx} className="w-full flex-shrink-0 px-4">
                  <div className="flex flex-col items-start text-white gap-6">
                    <div className="flex flex-col-reverse md:flex-row items-start sm:items-center gap-2 md:gap-4">
                      <div className="bg-black w-[100%] h-1 md:h-10"></div>
                      <h2 className="text-3xl font-bold select-none">
                        {item.title}
                      </h2>
                    </div>
                    <p className="text-base select-none">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator with Progress Ring */}
          <div
            className={`flex justify-center mt-8 gap-3 transition-all duration-300 ${
              animate ? "animate-fade-in opacity-100" : "opacity-0"
            }`}
            style={{
              animationDelay: "0.4s",
              animationFillMode: "backwards",
            }}
          >
            {aboutData.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                className="relative focus:outline-none"
              >
                <div
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    idx === currentSlide
                      ? "bg-yellow-400 scale-125"
                      : "bg-white/30 hover:bg-white/50"
                  }`}
                />
                {idx === currentSlide && !isUserInteracting && (
                  <div className="absolute inset-0 w-3 h-3 rounded-full border-2 border-yellow-400/30">
                    <div
                      className="absolute inset-0 rounded-full border-2 border-transparent border-t-yellow-400 animate-spin"
                      style={{
                        animationDuration: `${autoSwipeDelay}ms`,
                        animationTimingFunction: "linear",
                      }}
                    />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Desktop View - Normal Layout */}
        <div
          className={`hidden md:flex flex-col gap-12 transition-all duration-300 ${
            animate ? "animate-fade-in opacity-100" : "opacity-0"
          }`}
          style={{
            animationDelay: "0.3s", // Lebih lama supaya keliatan
            animationFillMode: "backwards",
          }}
        >
          {aboutData.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col items-start text-white gap-6"
            >
              <div className="flex flex-row items-center gap-4">
                <div className="bg-black w-[5px] h-10"></div>
                <h2 className="text-3xl font-bold">{item.title}</h2>
              </div>
              <p className="max-w-3xl text-[16px]">{item.text}</p>
            </div>
          ))}
        </div>

        {/* Vertical Progress With Nodes */}
        <div
          className={`flex items-center justify-center pb-10 sm:pb-0 transition-all duration-300 ${
            animate ? "animate-fade-in opacity-100" : "opacity-0"
          }`}
          style={{
            animationDelay: "0.5s", // Timeline muncul belakangan
            animationFillMode: "backwards",
          }}
        >
          <div className="relative flex flex-col justify-center gap-15">
            {/* Vertical line */}
            <div className="absolute left-[22.5px] h-[90%] md:h-[86%] top-0 bottom-0 w-1 bg-white/40" />

            {/* Timeline items */}
            {[
              {
                year: "10th Grade High School (2021)",
                text: "Learned basic Python — my very first coding experience.",
              },
              {
                year: "11th Grade High School (2022)",
                text: "Started learning web development (HTML, CSS, and JavaScript).",
              },
              {
                year: "1st Semester of College (2024)",
                text: "Dived deeper into front-end development using React JS.",
              },
              {
                year: "2nd Semester of College (2025)",
                text: "Developed <strong>two</strong> mobile applications using Flutter and React Native.",
              },
            ].map((item, index) => (
              <div key={index} className="relative flex items-start group">
                <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-yellow-400 border-4 border-white shadow-lg shadow-yellow-400/50 group-hover:scale-110 transition-transform flex-shrink-0"></div>
                <div className="ml-8">
                  <h3 className="text-lg font-semibold text-yellow-300 group-hover:text-yellow-400 transition-colors">
                    {item.year}
                  </h3>
                  <p
                    className="text-sm md:text-lg text-white/80"
                    dangerouslySetInnerHTML={{ __html: item.text }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

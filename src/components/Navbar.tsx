import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const lastScrollY = useRef(0);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setShowNavbar(false);
        setIsOpen(false);
      } else {
        setShowNavbar(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {showNavbar && (
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed z-30 top-2 left-2"
        >
          {/* Mobile Menu Button */}
          <div className="md:hidden flex justify-start items-center rounded-full bg-white shadow-md p-1">
            <button onClick={toggleMenu} className="p-2 rounded-full">
              {isOpen ? (
                <X className="w-6 h-6 text-[#454851]" />
              ) : (
                <Menu className="w-6 h-6 text-[#454851]" />
              )}
            </button>
          </div>

          {/* Mobile Dropdown Menu */}
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full ml-12 p-3 transform -translate-x-1/2 mt-3 shadow-md bg-white rounded-xl w-auto px-4 py-6"
            >
              <ul className="flex flex-col items-center space-y-4 text-base text-[#454851]">
                <li className="hover:text-black">
                  <a href="#home">Home</a>
                </li>
                <li className="hover:text-black">
                  <a href="#about">About</a>
                </li>
                <li className="hover:text-black">
                  <a href="#skills">Skills</a>
                </li>
                <li className="hover:text-black">
                  <a href="#projects">Projects</a>
                </li>
              </ul>
            </motion.div>
          )}
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

export default Navbar;

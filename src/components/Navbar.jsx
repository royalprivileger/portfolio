import { Link } from "react-scroll";
import { useState, useEffect } from "react";
import { Link as ScrollLink, Events, scrollSpy } from "react-scroll";
import logo from "../assets/ss512.png";
import ThemeToggle from "../utilities/ThemeToggle";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const sections = ["about", "experience", "contact"];

  useEffect(() => {
    Events.scrollEvent.register("begin", () => {});
    Events.scrollEvent.register("end", () => {});
    scrollSpy.update();
    return () => {
      Events.scrollEvent.remove("begin");
      Events.scrollEvent.remove("end");
    };
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white dark:bg-gray-900 shadow-md z-50">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between p-4">
        {/* Logo + Links group */}
        <div className="flex items-center space-x-6 md:order-1 md:w-auto">
          {/* Logo */}
          <Link
            to="about"
            smooth = {true}
            duration={500}
            offset={-80}
            className="flex items-center cursor-pointer mr-auto md:mr-0"
          >
            <img src={logo} alt="logo" className="h-10 md:h-15 w-auto mr-2" />
            <span className="text-xl font-bold text-indigo-600 max-[400px]:hidden">
              MyPortfolio
            </span>
          </Link>
        </div>

        {/* ThemeToggle + Hamburger group */}
        <div className="flex items-center space-x-4 md:order-2">
          {/* Theme switch */}
          {/* Desktop Links */}
          <ul className="hidden min-[900px]:flex space-x-6 text-gray-700 dark:text-gray-200 font-medium">
            {sections.map((section) => (
              <Link
                key={section}
                to={section}
                smooth = {true}
                duration={500}
                offset={-100}
                spy
                onSetActive={() => setActiveSection(section)}
                className={`cursor-pointer px-5 pt-1 pb-1 transition-all duration-300 ${
                  activeSection === section
                    ? "text-indigo-600 dark:text-white font-semibold border-b-2 rounded border-indigo-600 bg-indigo-transparent"
                    : "hover: text-indigo-600 dark:text-white"
                } `}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </Link>
            ))}
          </ul>
          <ThemeToggle />

          {/* Mobile hamburger */}
          <button
            className="min-[900px]:hidden p-2 text-gray-700 dark:text-gray-200"
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <XMarkIcon className="w-6 h-6" />
            ) : (
              <Bars3Icon className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile menu drawer */}
        <div
          className={`w-full min-[900px]:hidden mt-2 bg-white dark:bg-gray-900 overflow-hidden transition-max-h duration-300 ${
            open ? "max-h-60" : "max-h-0"
          }`}
        >
          <ul className="flex flex-col p-4 space-y-2">
            {sections.map((sec) => (
              <Link
                key={sec}
                to={sec}
                smooth
                duration={500}
                offset={-100}
                onClick={() => setOpen(false)}
                className="block py-2 text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-300"
              >
                {sec.charAt(0).toUpperCase() + sec.slice(1)}
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

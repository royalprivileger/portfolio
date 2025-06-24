import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import About from "./sections/About";
import Experience from "./sections/Experience";
import Contact from "./sections/Contact";
import Footer from "./components/Footer";
// import useSystemThemeDetector from "./hooks/useSystemThemeDetector"
// import { useEffect, useState } from "react";

function App() {
  // const [isDark, setIsDark] = useState("");
  
  // const systemTheme = useSystemThemeDetector();
  // useEffect(()=>{  
  //   const saved = localStorage.getItem('theme');
  //   if(saved === 'light' || saved === 'dark'){
  //     setIsDark(saved);
  //   }
  //   else{
  //     setIsDark(systemTheme ? 'light' : 'dark');
  //   }
  // });

  return (
    <div className="overflow-x-hidden min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white">
      <ToastContainer position="top-left" autoClose={2000}/>
      <Navbar />
      <main className="pt-20">
        <About />
        <Experience />
        <Contact />
        {/* Add About, Projects, Contact here later */}
      </main>
      <Footer />
    </div>
  );
}

export default App;

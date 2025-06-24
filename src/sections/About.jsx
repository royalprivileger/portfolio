import { ArrowDownTrayIcon } from "@heroicons/react/24/solid";
import { toast } from "react-toastify";


export default function About() {
  return (
    <section
      id="about"
      className="min-h-[85vh] sm:min-h-[90vh] lg:min-h-[95vh] flex flex-col items-center justify-center text-center px-4 rounded-b-[10vw] bg-gradient-to-bl from-white to-indigo-500 dark:from-gray-700 dark:to-gray-950 dark:bg-gradient-to-bl shadow-lg"
    >
      <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 dark:text-blue-500 mb-4">
        Hey there! 👋 I'm <span className="text-indigo-600">Shivendra</span>
      </h1>
      <p className="text-lg sm:text-2xl text-gray-600 dark:text-white max-w-2xl mb-6">
        I'm a passionate Frontend Developer who loves building clean and
        interactive user interfaces using React and modern web tools.
      </p>
      <a
        href="/ShivendraSharmaResume.pdf" 
        download
        className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-indigo-700 transition"
        onClick={()=>{
          toast.success("File downloaded");
        }}
      >
        <ArrowDownTrayIcon className="h-5 w-5 inline mx-1" /> Resume 
      </a>
    </section>
  );
}

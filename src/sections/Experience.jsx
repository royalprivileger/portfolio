/* 
TODO: Add responsive styles using flex-col on small screens 
*/


import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useMediaQuery from "../hooks/useMediaQuery"
import { timelineItems } from "../utilities/data";
import { fadeRight, fadeLeft } from "../utilities/constants";

export default function Experience() {
  
  const [selectedItem, setSelectedItem] = useState(null);
  
  const isMobile = useMediaQuery("(max-width: 599px)");

  /*
  *This useEffect is for handelling the escape button click to clear blur
  */

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setSelectedItem(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

/* 
* This callback is for handelling the selection of current content-box 
*/
  const handleSelect = useCallback((item) => {
    setSelectedItem(item);
  }, []);

  return (
    <>
      <section
        id="experience"
        className="py-20 text-gray-800 dark:text-blue-500 px-4"
        onClick={(e) => {
          if (selectedItem && !e.target.closest(".selected-item")) {
            setSelectedItem(null);
          }
        }}
      >
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">My Experience</h2>

          {/*Following Animate is for blur effect*/}

          <AnimatePresence>
            {selectedItem && (
              <motion.div
                className="fixed inset-0  bg-opacity-30 z-[30]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            )}
          </AnimatePresence>

          <div className="relative">
            
            {/* Following div is for the Vertical Line */}
            
            <div className="absolute left-4 min-[600px]:left-1/2 min-[600px]:transform min-[600px]:-translate-x-1/2 h-full w-1 bg-indigo-600 z-30"></div>

            {/* Following div is for all the timeline items and card */}

            <div className="space-y-16">
              {timelineItems.map((item, index) => {
                const isLeft = index % 2 === 0;

                const chosenVariant = isMobile ? fadeLeft  : isLeft ? fadeRight : fadeLeft;

                return (
                  <motion.div
                    key={index}
                    className={`relative flex flex-col min-[600px]:flex ${isLeft ? 'min-[600px]:flex-row' : 'min-[600px]:flex-row-reverse'} items-start justify-between pl-12 min-[600px]:pl-0 z-30`}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.3 }}
                    variants={chosenVariant}
                  >
                    <div className="absolute left-4 min-[600px]:left-1/2 min-[600px]:transform min-[600px]:-translate-x-1/2">

                    <div className="w-[6%] top-10 relative flex justify-center items-start">
                          <div className="w-6 h-6 ml-0.5 bg-indigo-600 rounded-full border-4 border-white absolute top-4"></div>
                        </div>
                    </div>
                        {/* Content box */}

                        <motion.div
                          layoutId={item.title}
                          layout
                          onClick={() => handleSelect(item)}
                          className={`w-full min-[600px]:w-[47%]  ${isMobile ? 'bg-gradient-to-br' : isLeft ? 'bg-gradient-to-bl' : 'bg-gradient-to-br'} from-indigo-100 to-indigo-400 dark:from-gray-700 dark:to-gray-800 dark:bg-gradient-to-bl shadow-lg p-6 rounded-md cursor-pointer z-30 ${
                            selectedItem?.title === item.title
                              ? ""
                              : selectedItem
                              ? "blur-sm"
                              : ""
                          }`}
                          transition={{
                            layout: { duration: 0.3, ease: "easeInOut" },
                          }}
                        >
                          <h3 className="text-xl font-semibold mb-1">
                            {item.title}
                          </h3>
                          {item.date && (
                            <p className="text-md text-gray-500 dark:text-white mb-2">
                              {item.date}
                              <AnimatePresence>
                                {selectedItem?.title === item.title && (
                                  <motion.span
                                    initial={{ opacity: 0, x: 5 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 5 }}
                                    transition={{ duration: 0.3 }}
                                    className="ml-1"
                                  >
                                    | {item.showDate}
                                  </motion.span>
                                )}
                              </AnimatePresence>
                            </p>
                          )}
                          <p>
                            {selectedItem?.title !== item.title && (
                              <motion.span
                                initial={{ opacity: 0, x: 5 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 5 }}
                                transition={{ duration: 0.3 }}
                                className="ml-1"
                              >
                                {item.description}
                              </motion.span>
                            )}
                          </p>

                          {/* * Show detailedDescription if selected */}
                          {selectedItem?.title === item.title && (
                            <motion.div
                              layout
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 10 }}
                              transition={{
                                layout: { duration: 0.3, ease: "easeInOut" },
                              }}
                              className="mt-4 text-md text-gray-700 dark:text-white whitespace-pre-line"
                            >
                              {item.detailedDescription}
                            </motion.div>
                          )}
                        </motion.div>

                        {/* Center line and dot */}
                        

                        {/* Show Date on right */}
                        <div className={`w-[47%] hidden min-[600px]:flex ${isLeft ? 'min-[600px]:flex-row' : 'min-[600px]:flex-row-reverse'} items-start justify-start pt-1`}>
                          <p
                            className={`text-xl pt-12 ${
                              selectedItem?.title === item.title
                                ? ""
                                : selectedItem
                                ? "blur-sm"
                                : ""
                            } text-gray-600 dark:text-white`}
                          >
                            <AnimatePresence>
                              {selectedItem?.title !== item.title && (
                                <motion.span
                                  initial={{ opacity: 0, x: -5 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  exit={{ opacity: 0, x: -5 }}
                                  transition={{ duration: 0.3 }}
                                  className="ml-1 "
                                >
                                  {item.showDate}
                                </motion.span>
                              )}
                            </AnimatePresence>
                          </p>
                        </div> 
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

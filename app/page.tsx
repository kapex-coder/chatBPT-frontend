"use client";

import { motion } from "framer-motion";
import Button from "./components/Button";

export default function Home() {
  return (
    <div className="relative flex flex-col items-center justify-center text-white h-full overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="z-10 text-center">
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-5xl font-extrabold mb-4">
          Welcome to ChatBPT
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-lg text-gray-100 mb-6 max-w-lg">
          An innovative platform to enhance your experience with ChatGPT. Log in
          to start chatting!
        </motion.p>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.2 }}>
          <Button href="/chat">Get Started</Button>
        </motion.div>
      </motion.div>
    </div>
  );
}

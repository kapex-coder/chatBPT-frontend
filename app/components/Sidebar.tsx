"use client";

import { useRouter } from "next/navigation";
import { Menu, X, MessageCircle } from "lucide-react";
import { useSidebar } from "../context/SidebarContext";
import { motion } from "framer-motion";
import BrandLogo from "./BrandLogo";

export default function Sidebar() {
  const router = useRouter();
  const { isOpen, toggleSidebar } = useSidebar();

  return (
    <motion.aside
      initial={{ width: "0px" }}
      animate={{ width: isOpen ? "256px" : "0px" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="max-md:fixed top-0 left-0 h-screen bg-black/80 backdrop-blur-lg text-white shadow-lg overflow-hidden z-50">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.2, delay: 0.1 }}
        className="flex items-center justify-between px-4 py-3 h-[10vh] border-b border-gray-700">
        <BrandLogo />
        <motion.button
          onClick={toggleSidebar}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="text-white">
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}>
            <X size={24} />
          </motion.div>
        </motion.button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="flex flex-col p-4 space-y-4 overflow-y-auto h-[calc(100vh-60px)] scrollbar-thin scrollbar-thumb-gray-600">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push("/chat")}
          className="w-full flex items-center gap-2 bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
          <MessageCircle size={20} />
          <span>New Chat</span>
        </motion.button>

        <h2 className="text-lg font-semibold">Chat History</h2>
        <ul className="space-y-2">
          {["Chat 1", "Chat 2", "Chat 3"].map((chat, index) => (
            <motion.li
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="cursor-pointer p-2 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors">
              {chat}
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </motion.aside>
  );
}

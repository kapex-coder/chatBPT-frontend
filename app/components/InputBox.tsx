import { useState } from "react";
import { motion } from "framer-motion";
import { SendHorizonal } from "lucide-react";

export default function InputBox({
  sendMessage,
}: {
  sendMessage: (text: string) => void;
}) {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    sendMessage(text);
    setText("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className=" flex items-center sticky bottom-0">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 px-3 py-2 border bg-inherit rounded-lg outline-none focus:ring-2 focus:ring-blue-400 transition-all"
      />

      <motion.button
        type="submit"
        whileTap={{ scale: 0.9 }}
        disabled={!text.trim()}
        className={`ml-2 flex items-center justify-center px-4 py-2.5 rounded-lg transition-all 
          ${
            text.trim()
              ? "bg-blue-500 hover:bg-blue-600 text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }
        `}>
        <SendHorizonal size={20} />
      </motion.button>
    </form>
  );
}

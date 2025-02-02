import { motion } from "framer-motion";

export default function ChatMessage({
  role,
  content,
}: {
  role: string;
  content: string;
}) {
  const isUser = role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 5, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={`flex items-end gap-2 ${
        isUser ? "justify-end" : "justify-start"
      } mb-2`}>
      {!isUser && (
        <div className="w-8 h-8 bg-gray-500 text-white flex items-center justify-center rounded-full text-sm">
          🤖
        </div>
      )}

      <div
        className={`p-3 rounded-lg shadow-md max-w-[75%] ${
          isUser
            ? "bg-blue-500 text-white rounded-br-none"
            : "bg-gray-300 text-black rounded-bl-none"
        }`}>
        {content}
      </div>

      {isUser && (
        <div className="w-8 h-8 bg-blue-500 text-white flex items-center justify-center rounded-full text-sm">
          😊
        </div>
      )}
    </motion.div>
  );
}

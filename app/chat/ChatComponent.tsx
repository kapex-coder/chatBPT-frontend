"use client";

import { useEffect, useRef, useState } from "react";
import ChatMessage from "./ChatMessage";
import InputBox from "../components/InputBox";
import { useSendMessageMutation } from "../lib/features/chat/chatApi";
import { motion } from "framer-motion";

export default function ChatComponent() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! How can I help you today?" },
  ]);
  const [sendMessage, { isLoading }] = useSendMessageMutation();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Scroll to bottom when a new message is added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const newMessages = [...messages, { role: "user", content: text }];
    setMessages(newMessages);

    const { data } = await sendMessage(newMessages);
    if (data) {
      setMessages([
        ...newMessages,
        { role: "assistant", content: data.choices[0].message.content },
      ]);
    }
  };

  return (
    <div className="flex flex-col bg-gray-900 text-white h-screen max-h-[90vh] rounded-lg shadow-lg overflow-hidden">
      {/* Messages Container */}
      <div className="flex-1 p-4 overflow-y-auto space-y-2 scrollbar-thin scrollbar-thumb-gray-700">
        {messages.map((msg, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: index * 0.05 }}>
            <ChatMessage
              role={msg.role}
              content={msg.content}
            />
          </motion.div>
        ))}

        {/* Loading Indicator */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="text-gray-400 text-sm flex items-center gap-2">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
            <span>Thinking...</span>
          </motion.div>
        )}

        {/* Auto-scroll target */}
        <div ref={messagesEndRef}></div>
      </div>

      {/* Input Box */}
      <div className="p-4 bg-gray-800 border-t border-gray-700">
        <InputBox sendMessage={handleSendMessage} />
      </div>
    </div>
  );
}

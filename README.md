# **ChatBPT - Frontend Documentation**

## **📌 Overview**

ChatBPT is a **ChatGPT-powered** web application that provides an intuitive and interactive chat experience. The frontend is built using **Next.js, Redux Toolkit, RTK Query, and Tailwind CSS**, supporting Google OAuth authentication and real-time chat interactions.

---

## **📐 Architecture Overview**

### **Frontend Architecture**

```
📂 chatBPT-frontend/
|-- 📂 app/
|   │-- 📂 api/auth/[...nextauth]/route.ts  # NextAuth API for authentication
|   │-- 📂 chat/
│   |   ├── ChatComponent.tsx  # Handles chat logic & API
│   |   ├── ChatMessage.tsx  # Handles chat message for User & AI
│   |   ├── page.tsx  # Chat UI
|   │-- 📂 components/
|   |   ├── BrandLogo.tsx  # Brand logo for the app
|   |   ├── Button.tsx  # Button component with variations
|   |   ├── ChatInputBox.tsx  # Chat input box to handle chat logic & API
|   |   ├── Loader.tsx  # Unique loader for the application
|   |   ├── Navbar.tsx  # Top navigation bar
|   |   ├── ProfileAvatar.tsx  # Profile avatar for the user in Navbar
|   |   ├── Sidebar.tsx  # Collapsible sidebar with chat history
|   │-- 📂 context/
|   |   ├── SidebarContext.tsx  # Manages global sidebar state
|   │-- 📂 lib/
|   |   │-- 📂 feature/chat/chatApi.ts # RTK Query API integration 
|   |   ├── store.ts  # Redux store configuration
|   |   ├── utils.ts  # Common utilities functions
|   │-- 📂 login/
|   |   ├── page.tsx # Login page & logic
|   │-- globals.css  # Tailwind CSS configurations
|   │-- layout.tsx  # Wraps app with global providers
|   │-- middleware.ts  # Middleware for authenticated routes
|   │-- page.tsx  # Home page UI
|   │-- providers.tsx  # App Providers wrapper
│-- 📂 public/ # Static images, icons
│-- .env.local  # Environment variables
│-- next.config.js  # Next.js configuration
│-- tsconfig.json  # TypeScript configuration
```

---

## **🛠️ Technology Stack**

| Technology                    | Usage                          |
| ----------------------------- | ------------------------------ |
| **Next.js**                   | Frontend framework             |
| **TypeScript**                | Strongly typed JavaScript      |
| **Tailwind CSS**              | Styling and responsive UI      |
| **Redux Toolkit (RTK Query)** | State management and API calls |
| **NextAuth.js**               | Authentication (Google OAuth)  |
| **Headless UI**               | Accessible UI components       |

---

## **🎯 Features**

✅ **Google OAuth Authentication** using NextAuth.js\
✅ **Chat Interface** similar to ChatGPT\
✅ **Collapsible Sidebar** with saved chat history\
✅ **ChatGPT API Integration** with RTK Query\

---

## **🚀 Installation & Setup**

### **1️⃣ Clone Repository**

```sh
git clone https://github.com/kapex-coder/chatBPT-frontend.git
cd chatBPT-frontend
```

### **2️⃣ Install Dependencies**

```sh
npm install
```

### **3️⃣ Configure Environment Variables**

Create a `.env.local` file and add:

```env
NEXT_PUBLIC_OPENAI_API_KEY=your_openai_api_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXTAUTH_SECRET=your_random_secret
```

### **4️⃣ Run Development Server**

```sh
npm run dev
```

Visit `http://localhost:3000` to view the app.

If you don't have `env` keys then visit here [https://kapex-chat-bpt.vercel.app/](https://kapex-chat-bpt.vercel.app/) to view the app.

---

## **📡 API Integration (RTK Query)**

The chat feature integrates **ChatGPT API** using **RTK Query**.

### **API Slice: **``

```tsx
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const chatApi = createApi({
  reducerPath: "chatApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.openai.com/v1/",
    prepareHeaders: (headers) => {
      headers.set(
        "Authorization",
        `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`
      );
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    sendMessage: builder.mutation({
      query: (message) => ({
        url: "chat/completions",
        method: "POST",
        body: {
          model: "gpt-3.5-turbo",
          messages: message,
          temperature: 0.7,
        },
      }),
    }),
  }),
});

export const { useSendMessageMutation } = chatApi;
```

---

## **🔒 Authentication (NextAuth.js)**

**Authentication is handled using Google OAuth.**

### **API Route: **``

```tsx
import NextAuth from "next-auth";
import { authOptions } from "@/app/lib/utils";

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
```

---

## **🖥️ UI Components**

### **1️⃣ Navbar (**``**)**

```tsx
"use client";

import ProfileAvatar from "./ProfileAvatar";
import { useSidebar } from "../context/SidebarContext";
import { Menu } from "lucide-react";
import Button from "./Button";
import { useSession } from "next-auth/react";
import BrandLogo from "./BrandLogo";

export default function Navbar() {
  const { isOpen, toggleSidebar } = useSidebar();
  const { data: session } = useSession();

  return (
    <nav className="flex justify-between items-center px-6 py-2 border-b border-gray-700 bg-gray-900 text-white w-full z-40 min-h-[10vh]">
      <div className="flex items-center gap-4">
        {!isOpen && (
          <>
            {session?.user && (
              <Button
                onClick={toggleSidebar}
                className="text-white p-0 bg-transparent hover:bg-transparent hover:scale-110 transition-transform duration-300">
                <Menu size={24} />
              </Button>
            )}

            <BrandLogo />
          </>
        )}
      </div>
      {session?.user && <ProfileAvatar />}
    </nav>
  );
}
```

### **2️⃣ Sidebar (**``**)**

```tsx
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
```

### **3️⃣ ChatInputBox (**``**)**

```tsx
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
```

### **4️⃣ ChatMessage (**``**)**

```tsx
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
```

---

## **📌 Future Enhancements**

🚀 **User Profiles & Settings Page**\
🚀 **WebSocket for Real-Time Conversations**\
🚀 **Mobile Version using React Native**

---

## **🎯 Conclusion**

ChatBPT provides a seamless and intuitive chat experience with **ChatGPT API integration**, **Google OAuth authentication**, and a **collapsible sidebar**. It is built with **Next.js, RTK Query, and Tailwind CSS** to ensure a **fast, scalable, and user-friendly** interface.

Let me know if you need any modifications! 🚀


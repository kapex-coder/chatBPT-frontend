"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { motion } from "framer-motion";
import Loader from "../components/Loader";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/chat");
    }
  }, [status, router]);

  if (status === "loading") {
    return <Loader />;
  }

  return (
    <div className="flex items-center justify-center h-[90vh] bg-gray-900 text-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-80 space-y-6 p-6 bg-gray-800 shadow-xl rounded-lg text-center">
        <h2 className="text-2xl font-bold">Welcome Back!</h2>
        <p className="text-gray-400">Sign in to continue</p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => signIn("google")}
          className="w-full bg-red-500 text-white p-3 rounded-lg shadow-md hover:bg-red-600 transition-all">
          Sign in with Google
        </motion.button>
        
        <p className="text-xs text-gray-500">
          By signing in, you agree to our Terms & Privacy.
        </p>
      </motion.div>
    </div>
  );
}

"use client";

import { useSession } from "next-auth/react";
import ChatComponent from "./ChatComponent";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loader from "../components/Loader";

export default function ChatPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);

  if (status === "loading" || status === "unauthenticated") {
    return <Loader />;
  }

  return <ChatComponent />;
}

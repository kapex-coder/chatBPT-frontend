"use client";

import Link from "next/link";
import ProfileAvatar from "../chat/ProfileAvatar";
import { useSidebar } from "../context/SidebarContext";
import { Menu } from "lucide-react";
import Button from "./Button";
import { useSession } from "next-auth/react"; // Import useSession from next-auth
import BrandLogo from "./BrandLogo";

export default function Navbar() {
  const { isOpen, toggleSidebar } = useSidebar();
  const { data: session } = useSession(); // Get session data

  return (
    <nav className="flex justify-between items-center px-6 py-2 border-b border-gray-700 bg-gray-900 text-white w-full z-40 min-h-[10vh]">
      {/* Left Section: Sidebar Toggle & Logo */}
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
      {/* Right Section: Profile Avatar (Only show if logged in) */}
      {session?.user && <ProfileAvatar />}
      {/* Check if session exists and user is present */}
    </nav>
  );
}

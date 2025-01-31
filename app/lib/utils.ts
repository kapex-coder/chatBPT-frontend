import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import GoogleProvider from "next-auth/providers/google";

export function cn(...classes: ClassValue[]) {
  return twMerge(clsx(classes));
}

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
};

import { Inter } from "next/font/google";
import "./globals.css";
import { getServerSession } from "next-auth";
import SessionProvider from "../components/SessionProvider";
import { authOptions } from "./api/auth/[...nextauth]/auth";
import { redirect } from "next/navigation";
import ReduxProvider from "@/state/ReduxProvider";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  if(!session||!session.user){
    redirect('/api/auth/signin');
  }
  return (
    <html lang="en">
      <body className={inter.className}>
          <SessionProvider>
            <ReduxProvider>
            <Navbar />
            {children}
            </ReduxProvider>
          </SessionProvider>
      </body>
    </html>
  );
}

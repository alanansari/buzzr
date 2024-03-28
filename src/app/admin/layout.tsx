import { Inter } from "next/font/google";
import "../globals.css";
import SessionProvider from "@/components/SessionProvider";
import { redirect } from "next/navigation";
import ReduxProvider from "@/state/ReduxProvider";
import Navbar from "@/components/Admin/Navbar";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/auth";

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

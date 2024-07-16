import SessionProvider from "@/components/SessionProvider";
import { redirect } from "next/navigation";
import ReduxProvider from "@/state/ReduxProvider";
import ClientImage from "@/components/ClientImage";

import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/auth";
import Link from "next/link";

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
      <>
        <SessionProvider>
          <ReduxProvider>
            <div className="flex flex-col w-[100vw]">
                <div className="p-2 px-4 md:px-8 bg-light-bg dark:bg-dark-bg hidden md:block">
                  <Link href="/admin">
                  <ClientImage
                      props={{
                          src: "/logo.svg",
                          darksrc: "/logo-dark.svg",
                          alt: "Buzzr Logo",
                          width: 80,
                          height: 80
                      }}
                  />
                  </Link>
                </div>
            {children}
            </div>
          </ReduxProvider>
        </SessionProvider>
      </>
  );
}

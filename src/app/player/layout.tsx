import { Inter } from "next/font/google";
import "../globals.css";
import "./styles.css"
import ReduxProvider from "@/state/ReduxProvider";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
//   const session = await getServerSession(authOptions);
//   if(!session||!session.user){
//     redirect('/api/auth/signin');
//   }
  return (
    <html lang="en">
      <body className={inter.className}>
            <ReduxProvider>
              {children}
            </ReduxProvider>
      </body>
    </html>
  );
}

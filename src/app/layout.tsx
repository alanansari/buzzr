import { Inter,IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/state/ReduxProvider";
import ThemeToggle from "@/components/ThemeToggle";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

const sans = IBM_Plex_Sans({
  weight: ['400'],
  subsets: ['latin']
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en">
      <body className={`${sans.className} bg-light-bg dark:bg-dark-bg`}>
            <ReduxProvider>
              {children}
              <Footer />
            </ReduxProvider>
      </body>
    </html>
  );
}

import "../globals.css";
import "./styles.css";
import { ToastContainer } from "react-toastify";
import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div className="flex flex-col h-full">
        {children}
        <ToastContainer />
        <Footer />
      </div>
  );
}

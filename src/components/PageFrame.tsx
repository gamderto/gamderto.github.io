import type { ReactNode } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

type PageFrameProps = { children: ReactNode; className?: string };

export default function PageFrame({ children, className = "" }: PageFrameProps) {
  return (
    <>
      <Navbar />
      <main className={className}>{children}</main>
      <Footer />
    </>
  );
}

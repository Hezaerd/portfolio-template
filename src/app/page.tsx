"use client";

import { Navbar } from "@/components/navbar";
import {
  Hero,
  About,
  Projects,
  Resume,
  Contact,
  Footer,
} from "@/components/sections";
import { useContactConfig } from "../stores/portfolio-store";

export default function Home() {
  const contactConfig = useContactConfig();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Resume />
      {contactConfig.service !== "none" && <Contact />}
      <Footer />
    </div>
  );
}

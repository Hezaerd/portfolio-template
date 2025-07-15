import { Navbar } from "@/components/navbar";
import {
  Hero,
  About,
  Projects,
  Resume,
  Contact,
  Footer,
} from "@/components/sections";
import { contactConfig } from "@/data/contact-config";

export default function Home() {
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

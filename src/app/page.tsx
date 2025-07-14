import { Navbar } from "@/components/navbar";
import {
  Hero,
  About,
  Projects,
  Resume,
  Contact,
  Footer,
} from "@/components/sections";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Resume />
      <Contact />
      <Footer />
    </div>
  );
}

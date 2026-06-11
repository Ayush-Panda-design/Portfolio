import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/portfolio/Navbar";
import { Hero } from "@/components/portfolio/Hero";
import { TrustBar } from "@/components/portfolio/TrustBar";
import { About } from "@/components/portfolio/About";
import { Skills } from "@/components/portfolio/Skills";
import { Projects } from "@/components/portfolio/Projects";
import { Blog } from "@/components/portfolio/Blog";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";
import { Cursor } from "@/components/portfolio/Cursor";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ayush Panda — Full-Stack Web Developer" },
      { name: "description", content: "CS undergrad at VSSUT building real, shipped full-stack products with React, Next.js, Node.js & PostgreSQL." },
      { property: "og:title", content: "Ayush Panda — Full-Stack Web Developer" },
      { property: "og:description", content: "CS undergrad at VSSUT building real, shipped full-stack products." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main style={{ background: "#faf8f5" }} className="min-h-screen overflow-x-hidden">
      <Cursor />
      <Navbar />
      <Hero />
      <TrustBar />
      <About />
      <Skills />
      <Projects />
      <Blog />
      <Contact />
      <Footer />
    </main>
  );
}

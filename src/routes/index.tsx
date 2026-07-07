import { createFileRoute } from "@tanstack/react-router";
import { Sidebar, MobileNav } from "@/components/portfolio/Sidebar";
import { Hero } from "@/components/portfolio/Hero";
import { TrustBar } from "@/components/portfolio/TrustBar";
import { About } from "@/components/portfolio/About";
import { Skills } from "@/components/portfolio/Skills";
import { LearningPath } from "@/components/portfolio/LearningPath";
import { Projects } from "@/components/portfolio/Projects";
import { Blog } from "@/components/portfolio/Blog";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";
import { Cursor } from "@/components/portfolio/Cursor";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ayush Panda — Full-Stack Web Developer" },
      {
        name: "description",
        content:
          "CS undergrad at VSSUT building real, shipped full-stack products with React, Next.js, Node.js & PostgreSQL.",
      },
      { property: "og:title", content: "Ayush Panda — Full-Stack Web Developer" },
      { property: "og:description", content: "CS undergrad at VSSUT building real, shipped full-stack products." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="min-h-screen bg-bg text-ink">
      <Cursor />
      <MobileNav />

      <div className="mx-auto max-w-[1120px] px-6 sm:px-8 lg:flex lg:gap-16 lg:px-12">
        <Sidebar />

        <div className="w-full min-w-0 flex-1 space-y-2 pb-16 pt-20 lg:max-w-[640px] lg:py-24">
          <Hero />
          <TrustBar />
          <Projects />
          <About />
          <Skills />
          <LearningPath />
          <Blog />
          <Contact />
          <Footer />
        </div>
      </div>
    </main>
  );
}

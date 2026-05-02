import HeroSection from "./_components/sections/hero";
import Navbar from "@/components/ui/navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="w-full max-w-6xl mx-auto">
        <HeroSection />
      </main>
    </>
  );
}

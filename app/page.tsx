import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import ProblemSolution from '@/components/ProblemSolution';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        <Hero />
        <Features />
        <ProblemSolution />
        <CTA />
      </main>
      <Footer />
    </>
  );
}

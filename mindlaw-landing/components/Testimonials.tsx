'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { AnimatedTestimonials } from '@/components/ui/animated-testimonials';

const testimonials = [
  {
    quote: "mindlaw has transformed how we approach legal research. What used to take hours now takes minutes, with better accuracy and comprehensive citations.",
    name: "Sarah Mitchell",
    designation: "Managing Partner, Mitchell & Associates",
    src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&h=500&fit=crop",
  },
  {
    quote: "The document analysis capabilities are game-changing. We've reduced contract review time by 70% while maintaining the highest quality standards.",
    name: "David Chen",
    designation: "General Counsel, TechCorp Global",
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop",
  },
  {
    quote: "The AI doesn't just save time—it elevates the quality of our work. Every associate now has access to partner-level insights and research capabilities.",
    name: "Jennifer Rodriguez",
    designation: "Senior Partner, Rodriguez Law Group",
    src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&h=500&fit=crop",
  },
];

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-5xl font-serif font-bold mb-6">
            Trusted by Legal Leaders
          </h2>
          <p className="text-xl text-gray-600">
            Hear from firms and legal departments that have transformed their practice with mindlaw
          </p>
        </motion.div>

        <AnimatedTestimonials testimonials={testimonials} autoplay={true} />
      </div>
    </section>
  );
}

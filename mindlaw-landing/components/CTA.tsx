'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { AuroraBackground } from '@/components/ui/aurora-background';
import { MagneticButton } from '@/components/ui/magnetic-button';

export default function CTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <AuroraBackground className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-5xl md:text-6xl font-serif font-bold mb-6">
            Ready to Transform Your Legal Practice?
          </h2>
          <p className="text-xl text-gray-300 mb-12 leading-relaxed">
            Join leading law firms and legal departments leveraging AI to deliver exceptional outcomes.
            Request a personalized demo today.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <MagneticButton
              strength={0.2}
              className="px-10 py-4 bg-white text-black text-base font-medium rounded-lg hover:bg-gray-100 transition-colors shadow-xl"
            >
              Request a Demo
            </MagneticButton>
            <MagneticButton
              strength={0.2}
              className="px-10 py-4 bg-transparent text-white text-base font-medium rounded-lg border-2 border-white hover:bg-white/10 transition-colors"
            >
              Contact Sales
            </MagneticButton>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 text-sm text-gray-400"
          >
            No credit card required • Enterprise-ready • White-glove onboarding included
          </motion.p>
        </motion.div>
      </div>
    </AuroraBackground>
  );
}
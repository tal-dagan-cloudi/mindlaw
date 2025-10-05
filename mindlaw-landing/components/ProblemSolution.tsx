'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
export default function ProblemSolution() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const problems = [
    'Hours spent on manual document review',
    'Inconsistent research quality',
    'Rising operational costs',
    'Limited scalability of expertise',
  ];

  const solutions = [
    'AI-powered document analysis in minutes',
    'Consistent, citation-backed research',
    'Reduced overhead, increased efficiency',
    'Scale expertise across your entire firm',
  ];

  return (
    <section id="solutions" className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-5xl font-serif font-bold mb-6">
            Transform Legal Workflows
          </h2>
          <p className="text-xl text-gray-600">
            From time-consuming manual work to intelligent automation
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Problem Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 rounded-full text-sm font-medium text-red-700 mb-4">
              Traditional Challenges
            </div>
            {problems.map((problem, idx) => (
              <motion.div
                key={problem}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.4, delay: 0.3 + idx * 0.1 }}
                className="flex items-start gap-4 p-6 bg-gray-50 rounded-xl"
              >
                <svg className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <p className="text-gray-700 font-medium">{problem}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Solution Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full text-sm font-medium text-green-700 mb-4">
              mindlaw Solutions
            </div>
            {solutions.map((solution, idx) => (
              <motion.div
                key={solution}
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                transition={{ duration: 0.4, delay: 0.3 + idx * 0.1 }}
                className="flex items-start gap-4 p-6 bg-white border border-gray-200 rounded-xl hover:border-green-200 transition-colors"
              >
                <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-gray-900 font-medium">{solution}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-black text-white text-base font-medium rounded-lg hover:bg-gray-900 transition-colors shadow-lg"
          >
            See How It Works
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { CountingNumber } from '@/components/ui/counting-number';

const stats = [
  {
    number: 85,
    suffix: '%',
    label: 'Reduction in research time',
    description: 'Average time saved on legal research tasks'
  },
  {
    number: 10000,
    suffix: '+',
    label: 'Documents analyzed daily',
    description: 'Contracts, briefs, and legal documents processed'
  },
  {
    number: 99.8,
    suffix: '%',
    label: 'Citation accuracy',
    description: 'Verified accuracy in legal citations and references'
  },
  {
    number: 500,
    suffix: '+',
    label: 'Law firms trust mindlaw',
    description: 'From boutique practices to Am Law 100 firms'
  },
];

export default function Stats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-5xl font-serif font-bold mb-6">
            Results That Matter
          </h2>
          <p className="text-xl text-gray-600">
            Quantifiable impact across every aspect of legal practice
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center p-8 bg-white rounded-2xl border border-gray-200 hover:border-black hover:shadow-xl transition-all duration-300"
            >
              <div className="text-5xl font-serif font-bold text-black mb-2">
                <CountingNumber
                  number={stat.number}
                  decimalPlaces={stat.number % 1 !== 0 ? 1 : 0}
                  className="inline-block"
                />
                <span className="text-4xl">{stat.suffix}</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">{stat.label}</h3>
              <p className="text-sm text-gray-600">{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

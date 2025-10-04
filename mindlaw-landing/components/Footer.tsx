'use client';

import { motion } from 'framer-motion';

const footerLinks = {
  Platform: [
    { name: 'Assistant', href: '#' },
    { name: 'Research', href: '#' },
    { name: 'Document Analysis', href: '#' },
    { name: 'Workflows', href: '#' },
  ],
  Solutions: [
    { name: 'Law Firms', href: '#' },
    { name: 'In-House Legal', href: '#' },
    { name: 'Litigation', href: '#' },
    { name: 'Transactional', href: '#' },
  ],
  Company: [
    { name: 'About', href: '#' },
    { name: 'Customers', href: '#' },
    { name: 'Security', href: '#' },
    { name: 'Careers', href: '#' },
  ],
  Legal: [
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
    { name: 'Cookie Policy', href: '#' },
    { name: 'Compliance', href: '#' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <h3 className="text-3xl font-medium text-gray-700 mb-4">
                <span className="underline">Mind</span><span className="text-gray-400">.</span><span className="underline">Law</span>
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Professional-class AI built for the legal industry.
              </p>
            </motion.div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <h4 className="font-semibold mb-4 text-sm">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-sm text-gray-600 hover:text-black transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600">
              © 2025 Mind.Law. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              {['LinkedIn', 'Twitter', 'GitHub'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="text-sm text-gray-600 hover:text-black transition-colors"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-8"
        >
          <h1 className="text-4xl md:text-6xl font-bold gradient-text">
            Smart Energy Management
            <br />
            for the Modern World
          </h1>
          <p className="text-xl text-light-text/80 dark:text-dark-text/80 max-w-2xl mx-auto">
            Monitor, analyze, and optimize your energy consumption in real-time
            with our advanced platform.
          </p>
          <div className="flex justify-center space-x-4">
            <Button>Get Started</Button>
            <Button variant="secondary">Learn More</Button>
          </div>
        </motion.div>
      </div>

      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-light-background via-light-accent-violet/5 to-light-accent-orange/5 dark:from-dark-background dark:via-dark-accent-cyan/5 dark:to-dark-accent-pink/5" />
      </div>
    </section>
  );
}
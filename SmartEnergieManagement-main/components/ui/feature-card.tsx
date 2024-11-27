'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
}

export function FeatureCard({ icon: Icon, title, description, index }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative group"
    >
      <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-light-accent-violet/10 to-light-accent-orange/10 dark:from-dark-accent-cyan/10 dark:to-dark-accent-pink/10 transform transition-transform group-hover:scale-105" />
      <div className="relative p-6 space-y-4">
        <div className="inline-block p-3 rounded-lg bg-light-accent-violet/10 dark:bg-dark-accent-cyan/10">
          <Icon className="h-6 w-6 text-light-accent-violet dark:text-dark-accent-cyan" />
        </div>
        <h3 className="text-xl font-semibold text-light-text dark:text-dark-text">
          {title}
        </h3>
        <p className="text-light-text/80 dark:text-dark-text/80">
          {description}
        </p>
      </div>
    </motion.div>
  );
}
'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

export function Button({ className, variant = 'primary', ...props }: ButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        'px-8 py-3 rounded-lg font-medium transition-colors',
        variant === 'primary'
          ? 'bg-light-accent-violet dark:bg-dark-accent-cyan text-white'
          : 'border border-light-text/20 dark:border-dark-text/20 text-light-text dark:text-dark-text',
        className
      )}
      {...props}
    />
  );
}
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Moon, Sun, Menu, X } from 'lucide-react';

const links = [
  { href: '/', label: 'Home' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/statistics', label: 'Statistics' },
];

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full bg-white/80 dark:bg-dark-background/80 backdrop-blur-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Activity className="h-8 w-8 text-dark-accent-cyan dark:text-dark-accent-cyan" />
              <span className="text-xl font-bold text-light-text dark:text-dark-text">
                Smart Energie Mangement
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-light-text dark:text-dark-text hover:text-light-accent-violet dark:hover:text-dark-accent-cyan transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-lg bg-light-background dark:bg-dark-background hover:bg-light-accent-violet/10 dark:hover:bg-dark-accent-cyan/10 transition-colors"
            >
              <Sun className="h-5 w-5 text-light-text dark:text-dark-text hidden dark:block" />
              <Moon className="h-5 w-5 text-light-text dark:text-dark-text block dark:hidden" />
            </button>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg bg-light-background dark:bg-dark-background"
            >
              {isOpen ? (
                <X className="h-6 w-6 text-light-text dark:text-dark-text" />
              ) : (
                <Menu className="h-6 w-6 text-light-text dark:text-dark-text" />
              )}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-dark-background">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-3 py-2 rounded-md text-base font-medium text-light-text dark:text-dark-text hover:bg-light-accent-violet/10 dark:hover:bg-dark-accent-cyan/10"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <button
                onClick={() => {
                  setTheme(theme === 'dark' ? 'light' : 'dark');
                  setIsOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-light-text dark:text-dark-text hover:bg-light-accent-violet/10 dark:hover:bg-dark-accent-cyan/10"
              >
                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
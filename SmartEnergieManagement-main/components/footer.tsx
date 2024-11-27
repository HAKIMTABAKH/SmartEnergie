'use client';

import { motion } from 'framer-motion';
import { Activity, Github, Twitter, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';

const footerLinks = {
  product: [
    { name: 'Features', href: '#features' },
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Statistics', href: '/statistics' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Careers', href: '#careers' },
    { name: 'Contact', href: '#contact' },
    { name: 'Blog', href: '#blog' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '#privacy' },
    { name: 'Terms of Service', href: '#terms' },
    { name: 'Cookie Policy', href: '#cookies' },
  ],
  contact: [
    { icon: MapPin, text: 'Ben Gerdan' },
    { icon: Phone, text: '+216 92686769' },
    { icon: Mail, text: 'contact@smartenergiemangment.com' },
  ],
};

const socialLinks = [
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
];

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center space-x-2">
              <Activity className="h-6 w-6 text-dark-accent-cyan" />
              <span className="text-xl font-bold">Smart Energie Managment</span>
            </Link>
            <p className="text-muted-foreground max-w-sm">
              Revolutionizing energy management with real-time monitoring and smart analytics
              for a sustainable future.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-full bg-muted hover:bg-primary/10 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              {footerLinks.contact.map((item) => (
                <li key={item.text} className="flex items-start space-x-3">
                  <item.icon className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <span className="text-sm text-muted-foreground">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()}  All rights reserved.
            </p>
            <ul className="flex flex-wrap justify-center space-x-6">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
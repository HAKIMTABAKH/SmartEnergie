'use client';

import { Activity, BarChart3, Zap, Shield } from 'lucide-react';
import { FeatureCard } from '@/components/ui/feature-card';

const features = [
  {
    icon: Activity,
    title: 'Real-time Monitoring',
    description: 'Track energy consumption with live updates and instant alerts.',
  },
  {
    icon: BarChart3,
    title: 'Advanced Analytics',
    description: 'Gain insights with detailed charts and comprehensive reports.',
  },
  {
    icon: Zap,
    title: 'Energy Optimization',
    description: 'Optimize your energy usage with AI-powered recommendations.',
  },
  {
    icon: Shield,
    title: 'Secure Platform',
    description: 'Enterprise-grade security for your energy monitoring needs.',
  },
];

export function Features() {
  return (
    <section className="py-20 bg-light-background/50 dark:bg-dark-background/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} {...feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
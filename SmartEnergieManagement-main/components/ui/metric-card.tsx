'use client';

import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  icon: LucideIcon;
  title: string;
  value: string;
  change: string;
  status: 'warning' | 'success' | 'normal';
}

export function MetricCard({ icon: Icon, title, value, change, status }: MetricCardProps) {
  return (
    <Card className="p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-light-text/60 dark:text-dark-text/60">
            {title}
          </p>
          <h3 className="text-2xl font-bold mt-2 text-light-text dark:text-dark-text">
            {value}
          </h3>
          <p className={`text-sm mt-2 ${
            status === 'warning' ? 'text-light-accent-orange dark:text-dark-accent-yellow' :
            status === 'success' ? 'text-light-accent-lime dark:text-dark-accent-cyan' :
            'text-light-text/60 dark:text-dark-text/60'
          }`}>
            {change} from last hour
          </p>
        </div>
        <Icon className="h-6 w-6 text-light-accent-violet dark:text-dark-accent-cyan" />
      </div>
    </Card>
  );
}
import { Hero } from '@/components/sections/hero';
import { Features } from '@/components/sections/features';

export default function Home() {
  return (
    <div className="min-h-screen pt-16">
      <Hero />
      <Features />
    </div>
  );
}
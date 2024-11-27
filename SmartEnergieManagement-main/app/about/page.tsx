import { Card } from '@/components/ui/card';
import { Github, Linkedin, Mail } from 'lucide-react';

const team = [
  {
    name: 'Sarah Johnson',
    role: 'Lead Developer',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=200&auto=format&fit=crop',
    social: {
      github: '#',
      linkedin: '#',
      email: 'sarah@energiflow.com',
    },
  },
  {
    name: 'Hakim Tabakh',
    role: 'Lead Developer',
    image: 'https://media.licdn.com/dms/image/v2/D4E03AQF1EPIxnpkXVA/profile-displayphoto-shrink_800_800/B4EZNawe13HwAc-/0/1732394479661?e=1738195200&v=beta&t=PnBljxxn77CuAW7vPL1Qqb-i2chcgBfI6ECZ42LgdQ4',
    social: {
      github: '#',
      linkedin: '#',
      email: 'michael@energiflow.com',
    },
  },
  {
    name: 'Emily Rodriguez',
    role: 'Data Scientist',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop',
    social: {
      github: '#',
      linkedin: '#',
      email: 'emily@energiflow.com',
    },
  },
];

export default function About() {
  return (
    <div className="min-h-screen p-8 pt-24">
      <div className="max-w-7xl mx-auto space-y-16">
        <section className="text-center space-y-8">
          <h1 className="text-4xl font-bold gradient-text">
            About EnergiFlow
          </h1>
          <p className="text-xl text-light-text/80 dark:text-dark-text/80 max-w-3xl mx-auto">
            EnergiFlow is a cutting-edge energy monitoring platform designed to help
            businesses and individuals optimize their energy consumption through
            real-time analytics and smart recommendations.
          </p>
        </section>

        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-center text-light-text dark:text-dark-text">
            Our Mission
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 text-center space-y-4">
              <h3 className="text-xl font-semibold text-light-text dark:text-dark-text">
                Innovation
              </h3>
              <p className="text-light-text/80 dark:text-dark-text/80">
                Pushing the boundaries of energy monitoring technology
              </p>
            </Card>
            <Card className="p-6 text-center space-y-4">
              <h3 className="text-xl font-semibold text-light-text dark:text-dark-text">
                Sustainability
              </h3>
              <p className="text-light-text/80 dark:text-dark-text/80">
                Promoting efficient energy usage for a greener future
              </p>
            </Card>
            <Card className="p-6 text-center space-y-4">
              <h3 className="text-xl font-semibold text-light-text dark:text-dark-text">
                Empowerment
              </h3>
              <p className="text-light-text/80 dark:text-dark-text/80">
                Giving users control over their energy consumption
              </p>
            </Card>
          </div>
        </section>

        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-center text-light-text dark:text-dark-text">
            Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member) => (
              <Card key={member.name} className="p-6 text-center space-y-4">
                <div className="relative mx-auto w-32 h-32 rounded-full overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={member.image}
                    alt={member.name}
                    className="object-cover w-full h-full"
                  />
                </div>
                <h3 className="text-xl font-semibold text-light-text dark:text-dark-text">
                  {member.name}
                </h3>
                <p className="text-light-text/80 dark:text-dark-text/80">
                  {member.role}
                </p>
                <div className="flex justify-center space-x-4">
                  <a
                    href={member.social.github}
                    className="text-light-text/60 hover:text-light-accent-violet dark:text-dark-text/60 dark:hover:text-dark-accent-cyan"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                  <a
                    href={member.social.linkedin}
                    className="text-light-text/60 hover:text-light-accent-violet dark:text-dark-text/60 dark:hover:text-dark-accent-cyan"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a
                    href={`mailto:${member.social.email}`}
                    className="text-light-text/60 hover:text-light-accent-violet dark:text-dark-text/60 dark:hover:text-dark-accent-cyan"
                  >
                    <Mail className="h-5 w-5" />
                  </a>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
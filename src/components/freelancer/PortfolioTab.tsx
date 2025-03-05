
import React from 'react';
import BlurCard from '@/components/ui/blur-card';
import { Freelancer } from '@/data/freelancers';

interface PortfolioTabProps {
  freelancer: Freelancer;
}

const PortfolioTab: React.FC<PortfolioTabProps> = ({ freelancer }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">Projets réalisés</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {freelancer.portfolio.map((project, index) => (
          <BlurCard key={index} className="overflow-hidden">
            <div className="aspect-video relative">
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-5">
              <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
              <p className="text-muted-foreground text-sm">{project.description}</p>
            </div>
          </BlurCard>
        ))}
      </div>
    </div>
  );
};

export default PortfolioTab;

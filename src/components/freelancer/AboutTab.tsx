
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Award } from 'lucide-react';
import BlurCard from '@/components/ui/blur-card';
import { Freelancer } from '@/data/freelancers';

interface AboutTabProps {
  freelancer: Freelancer;
}

const AboutTab: React.FC<AboutTabProps> = ({ freelancer }) => {
  return (
    <BlurCard className="p-6">
      <h2 className="text-xl font-semibold mb-4">Présentation</h2>
      <p className="text-muted-foreground whitespace-pre-line">
        {freelancer.description}
      </p>
      
      <h3 className="text-lg font-medium mt-6 mb-3">Compétences</h3>
      <div className="flex flex-wrap gap-2">
        {freelancer.skills.map((skill: string) => (
          <Badge key={skill} variant="secondary">
            {skill}
          </Badge>
        ))}
      </div>
      
      <h3 className="text-lg font-medium mt-6 mb-3">Formation</h3>
      <div className="space-y-3">
        {freelancer.education.map((edu, index) => (
          <div key={index} className="flex flex-col">
            <span className="font-medium">{edu.degree}</span>
            <span className="text-muted-foreground">{edu.institution}, {edu.year}</span>
          </div>
        ))}
      </div>
      
      <h3 className="text-lg font-medium mt-6 mb-3">Certifications</h3>
      <div className="space-y-2">
        {freelancer.certifications.map((cert: string, index: number) => (
          <div key={index} className="flex items-center gap-2">
            <Award className="h-4 w-4 text-primary" />
            <span>{cert}</span>
          </div>
        ))}
      </div>
    </BlurCard>
  );
};

export default AboutTab;

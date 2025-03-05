
import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import BlurCard from '@/components/ui/blur-card';
import { renderStars } from '@/utils/freelancer-utils';
import { Freelancer } from '@/data/freelancers';

interface FreelancerCardProps {
  freelancer: Freelancer;
  viewMode: 'grid' | 'list';
}

const FreelancerCard: React.FC<FreelancerCardProps> = ({ freelancer, viewMode }) => {
  if (viewMode === 'grid') {
    return (
      <BlurCard className="h-full">
        <div className="p-6">
          <div className="flex items-start gap-4">
            <img 
              src={freelancer.image} 
              alt={freelancer.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h3 className="font-semibold text-lg">{freelancer.name}</h3>
              <p className="text-muted-foreground">{freelancer.title}</p>
              <div className="flex items-center gap-1 mt-1">
                <div className="flex">{renderStars(freelancer.rating)}</div>
                <span className="font-medium">{freelancer.rating}</span>
                <span className="text-muted-foreground">
                  ({freelancer.reviews} avis)
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <div className="flex flex-wrap gap-2">
              {freelancer.skills.slice(0, 3).map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
              {freelancer.skills.length > 3 && (
                <Badge variant="outline">
                  +{freelancer.skills.length - 3}
                </Badge>
              )}
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <span className="text-lg font-semibold">
              {freelancer.price}€/h
            </span>
            <Link to={`/freelancers/${freelancer.id}`}>
              <Button variant="outline">
                Voir le profil
              </Button>
            </Link>
          </div>
        </div>
      </BlurCard>
    );
  }

  return (
    <BlurCard className="w-full">
      <div className="p-6 flex flex-col md:flex-row md:items-center gap-6">
        <div className="flex items-start gap-4 flex-1">
          <img 
            src={freelancer.image} 
            alt={freelancer.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold text-lg">{freelancer.name}</h3>
            <p className="text-muted-foreground">{freelancer.title}</p>
            <div className="flex items-center gap-1 mt-1">
              <div className="flex">{renderStars(freelancer.rating)}</div>
              <span className="font-medium">{freelancer.rating}</span>
              <span className="text-muted-foreground">
                ({freelancer.reviews} avis)
              </span>
            </div>
            
            <div className="mt-2 flex flex-wrap gap-2">
              {freelancer.skills.slice(0, 4).map((skill) => (
                <Badge key={skill} variant="secondary" className="mr-1">
                  {skill}
                </Badge>
              ))}
              {freelancer.skills.length > 4 && (
                <Badge variant="outline">
                  +{freelancer.skills.length - 4}
                </Badge>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between md:flex-col md:items-end gap-3">
          <span className="text-lg font-semibold">
            {freelancer.price}€/h
          </span>
          <Link to={`/freelancers/${freelancer.id}`}>
            <Button>
              Voir le profil
            </Button>
          </Link>
        </div>
      </div>
    </BlurCard>
  );
};

export default FreelancerCard;


import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { 
  Star, 
  ArrowLeft, 
  Calendar, 
  ThumbsUp, 
  Clock, 
  CheckCircle2 
} from 'lucide-react';
import { Freelancer } from '@/data/freelancers';
import { renderStars } from '@/utils/freelancer-utils';

interface FreelancerHeaderProps {
  freelancer: Freelancer;
}

const FreelancerHeader: React.FC<FreelancerHeaderProps> = ({ freelancer }) => {
  return (
    <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-6">
        <Link to="/browse" className="inline-flex items-center text-white/80 hover:text-white transition-colors mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour aux résultats
        </Link>
        
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/4">
            <div className="relative w-32 h-32 mx-auto md:mx-0">
              <img 
                src={freelancer.image} 
                alt={freelancer.name}
                className="w-full h-full object-cover rounded-full border-4 border-white/10"
              />
              <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-1">
                <CheckCircle2 className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>
          
          <div className="md:w-3/4 text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{freelancer.name}</h1>
            <p className="text-xl text-white/80 mb-4">{freelancer.title}</p>
            
            <div className="flex flex-wrap gap-4 justify-center md:justify-start mb-5">
              <div className="flex items-center gap-1">
                <div className="flex">
                  {renderStars(freelancer.rating)}
                </div>
                <span className="font-medium ml-1">{freelancer.rating}</span>
                <span className="text-white/70">
                  ({freelancer.reviews} avis)
                </span>
              </div>
              
              <div className="flex items-center gap-1">
                <ThumbsUp className="h-4 w-4 text-white/70" />
                <span>{freelancer.completionRate}% complétion</span>
              </div>
              
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4 text-white/70" />
                <span>Répond en {freelancer.responseTime}</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 justify-center md:justify-start mt-6">
              {freelancer.languages.map((language: string) => (
                <Badge key={language} variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/10">
                  {language}
                </Badge>
              ))}
              
              <Badge variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/10">
                <Calendar className="h-3 w-3 mr-1" />
                Membre depuis {freelancer.memberSince}
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelancerHeader;

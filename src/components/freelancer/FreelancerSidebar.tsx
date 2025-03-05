
import React from 'react';
import { Button } from '@/components/ui/button';
import { Mail, Phone } from 'lucide-react';
import BlurCard from '@/components/ui/blur-card';
import { Freelancer } from '@/data/freelancers';

interface FreelancerSidebarProps {
  freelancer: Freelancer;
}

const FreelancerSidebar: React.FC<FreelancerSidebarProps> = ({ freelancer }) => {
  return (
    <div className="sticky top-8 space-y-6">
      {/* Card de tarifs et contact */}
      <BlurCard className="p-6">
        <h3 className="text-xl font-semibold mb-4">Tarifs</h3>
        <div className="flex items-baseline mb-6">
          <span className="text-3xl font-bold">{freelancer.price}€</span>
          <span className="text-muted-foreground ml-1">/ heure</span>
        </div>
        
        <div className="space-y-3 mb-6">
          <Button className="w-full">Contacter</Button>
          <Button variant="outline" className="w-full">
            <Mail className="h-4 w-4 mr-2" />
            Envoyer un message
          </Button>
        </div>
        
        <div className="border-t border-border pt-4 mt-4">
          <h4 className="font-medium mb-3">Services proposés</h4>
          <div className="space-y-4">
            {freelancer.services.map((service) => (
              <div key={service.id} className="group">
                <h5 className="font-medium group-hover:text-primary transition-colors cursor-pointer">
                  {service.title}
                </h5>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>À partir de {service.price}€</span>
                  <span>{service.deliveryTime}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </BlurCard>
      
      {/* Card de coordonnées */}
      <BlurCard className="p-6">
        <h3 className="text-lg font-semibold mb-4">Coordonnées</h3>
        <div className="space-y-4">
          <Button variant="outline" className="w-full justify-start">
            <Phone className="h-4 w-4 mr-2" />
            Afficher le numéro
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Mail className="h-4 w-4 mr-2" />
            Afficher l'email
          </Button>
        </div>
      </BlurCard>
    </div>
  );
};

export default FreelancerSidebar;

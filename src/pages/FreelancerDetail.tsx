
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getFreelancerById } from '@/utils/freelancer-utils';
import FreelancerHeader from '@/components/freelancer/FreelancerHeader';
import AboutTab from '@/components/freelancer/AboutTab';
import PortfolioTab from '@/components/freelancer/PortfolioTab';
import ReviewsTab from '@/components/freelancer/ReviewsTab';
import FreelancerSidebar from '@/components/freelancer/FreelancerSidebar';
import { Freelancer } from '@/data/freelancers';

const FreelancerDetail = () => {
  const { id } = useParams();
  const [freelancer, setFreelancer] = useState<Freelancer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simuler un chargement de données
    setLoading(true);
    setTimeout(() => {
      const foundFreelancer = getFreelancerById(id);
      setFreelancer(foundFreelancer);
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-24 h-24 bg-gray-300 rounded-full mb-4"></div>
          <div className="h-4 w-48 bg-gray-300 rounded mb-2"></div>
          <div className="h-3 w-32 bg-gray-300 rounded"></div>
        </div>
      </div>
    );
  }

  if (!freelancer) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold mb-4">Freelance non trouvé</h2>
        <p className="text-muted-foreground mb-6">Le profil que vous recherchez n'existe pas ou a été supprimé.</p>
        <Link to="/browse">
          <Button>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retourner à la liste des freelances
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-16">
      {/* Header avec profil du freelance */}
      <FreelancerHeader freelancer={freelancer} />
      
      {/* Contenu principal */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Colonne principale avec les onglets */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="about" className="w-full">
              <TabsList className="w-full grid grid-cols-3 mb-8">
                <TabsTrigger value="about">À propos</TabsTrigger>
                <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
                <TabsTrigger value="reviews">Avis ({freelancer.reviewsList?.length || 0})</TabsTrigger>
              </TabsList>
              
              <TabsContent value="about" className="space-y-8">
                <AboutTab freelancer={freelancer} />
              </TabsContent>
              
              <TabsContent value="portfolio" className="space-y-6">
                <PortfolioTab freelancer={freelancer} />
              </TabsContent>
              
              <TabsContent value="reviews" className="space-y-6">
                <ReviewsTab freelancer={freelancer} />
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <FreelancerSidebar freelancer={freelancer} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelancerDetail;

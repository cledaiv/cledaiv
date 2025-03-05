
import React from 'react';
import SubscriptionPlans from '@/components/subscription/SubscriptionPlans';
import Navbar from '@/components/common/Navbar';

const Subscription = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-12">
        <h1 className="text-4xl font-bold text-center mb-2">Nos abonnements</h1>
        <p className="text-muted-foreground text-center mb-10 max-w-3xl mx-auto">
          Choisissez l'abonnement qui correspond à vos besoins et commencez à collaborer avec des freelances de qualité.
        </p>
        <SubscriptionPlans />
      </div>
    </div>
  );
};

export default Subscription;

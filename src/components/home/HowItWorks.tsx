
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Search, MessageSquare, Check, CreditCard } from 'lucide-react';
import { cn } from '@/lib/utils';

const steps = [
  {
    id: 1,
    title: "Trouvez le freelance idéal",
    description: "Parcourez notre sélection de freelances qualifiés ou publiez votre projet pour recevoir des propositions personnalisées.",
    icon: Search,
    color: "bg-indigo-500",
  },
  {
    id: 2,
    title: "Discutez des détails",
    description: "Échangez avec les freelances pour définir les spécifications, délais et budget de votre projet.",
    icon: MessageSquare,
    color: "bg-cyan-500",
  },
  {
    id: 3,
    title: "Validez le projet",
    description: "Choisissez la proposition qui vous convient et finalisez les termes de la collaboration.",
    icon: Check,
    color: "bg-green-500",
  },
  {
    id: 4,
    title: "Paiement sécurisé",
    description: "Payez via notre système d'escrow sécurisé. Les fonds sont libérés une fois le travail validé.",
    icon: CreditCard,
    color: "bg-purple-500",
  },
];

const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="how-it-works" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Comment ça fonctionne
          </h2>
          <p className="text-muted-foreground">
            Un processus simple et efficace pour collaborer avec nos freelances experts
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mt-12">
          {/* Step navigation - visible on desktop */}
          <div className="hidden lg:block lg:col-span-5 space-y-6">
            {steps.map((step, index) => (
              <div 
                key={step.id}
                className={cn(
                  "p-6 rounded-xl cursor-pointer transition-all duration-300 border",
                  activeStep === index 
                    ? "bg-white shadow-lg border-transparent" 
                    : "bg-transparent hover:bg-white/50 border-border"
                )}
                onClick={() => setActiveStep(index)}
              >
                <div className="flex items-start gap-4">
                  <div className={cn(
                    "rounded-full w-10 h-10 flex items-center justify-center text-white shrink-0",
                    step.color
                  )}>
                    {step.id}
                  </div>
                  <div>
                    <h3 className={cn(
                      "font-medium text-lg mb-2",
                      activeStep === index ? "text-primary" : "text-foreground"
                    )}>
                      {step.title}
                    </h3>
                    <p className={cn(
                      "text-sm",
                      activeStep === index ? "text-foreground" : "text-muted-foreground"
                    )}>
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Step illustration */}
          <div className="lg:col-span-7 p-8">
            <div className="relative bg-white rounded-2xl shadow-lg p-8 lg:p-10 border border-border/50 overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-indigo-200 to-cyan-100 rounded-bl-3xl opacity-50" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-indigo-100 to-purple-100 rounded-tr-3xl opacity-40" />
              
              <div className="relative flex flex-col items-center text-center">
                <span className={cn(
                  "rounded-full w-16 h-16 flex items-center justify-center text-white mb-6",
                  steps[activeStep].color
                )}>
                  {React.createElement(steps[activeStep].icon, { size: 28 })}
                </span>
                
                <h3 className="text-2xl font-bold mb-4">
                  {steps[activeStep].title}
                </h3>
                <p className="text-muted-foreground mb-8 max-w-md">
                  {steps[activeStep].description}
                </p>
                
                {/* Step indicators - mobile version */}
                <div className="flex space-x-2 mb-8 lg:hidden">
                  {steps.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveStep(index)}
                      className={cn(
                        "w-2.5 h-2.5 rounded-full transition-colors duration-300",
                        index === activeStep 
                          ? "bg-primary" 
                          : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                      )}
                      aria-label={`Go to step ${index + 1}`}
                    />
                  ))}
                </div>
                
                <Link to="/browse">
                  <Button size="lg" className="bg-gradient-to-r from-indigo-500 to-cyan-400 hover:from-indigo-600 hover:to-cyan-500 text-white">
                    Explorer les freelances
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

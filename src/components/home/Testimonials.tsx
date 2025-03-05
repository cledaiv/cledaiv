
import React, { useState, useRef, useEffect } from 'react';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import BlurCard from '@/components/ui/blur-card';

const testimonials = [
  {
    id: 1,
    content: "Notre chatbot d'IA développé par Thomas a révolutionné notre service client. Les temps de réponse ont été réduits de 70% et la satisfaction client a augmenté significativement.",
    author: "Marie Lefevre",
    position: "Directrice Marketing, TechSolutions",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=120&q=80",
    rating: 5,
  },
  {
    id: 2,
    content: "Sophie a créé un système de smart contracts qui a complètement transformé notre gestion de chaîne d'approvisionnement. Son expertise en blockchain a apporté sécurité et transparence à nos opérations.",
    author: "Pierre Dubois",
    position: "CEO, LogiChain",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=120&q=80",
    rating: 5,
  },
  {
    id: 3,
    content: "Alexandre nous a guidés dans le lancement de notre token avec une expertise remarquable. Son approche stratégique et sa connaissance du marché crypto ont été déterminantes pour notre succès.",
    author: "Camille Petit",
    position: "Fondatrice, CryptoHealth",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=120&q=80",
    rating: 4,
  },
  {
    id: 4,
    content: "La solution CRM personnalisée créée par Elise a parfaitement répondu aux besoins de notre PME. Sa compréhension de nos enjeux et sa capacité à traduire nos besoins en solution technique ont été impressionnantes.",
    author: "Julien Moreau",
    position: "Directeur des Opérations, GreenImpact",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=120&q=80",
    rating: 5,
  },
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [sliding, setSliding] = useState(false);
  const slidesRef = useRef<HTMLDivElement>(null);

  const nextSlide = () => {
    if (sliding) return;
    setSliding(true);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setSliding(false), 500);
  };

  const prevSlide = () => {
    if (sliding) return;
    setSliding(true);
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setSliding(false), 500);
  };
  
  // Auto-scroll
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 8000);
    
    return () => clearInterval(interval);
  }, [activeIndex, sliding]);

  return (
    <section className="py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ce que disent nos clients
          </h2>
          <p className="text-muted-foreground">
            Découvrez comment nos freelances ont contribué au succès de leurs projets
          </p>
        </div>
        
        <div className="relative">
          {/* Testimonial slider */}
          <div
            ref={slidesRef}
            className="relative overflow-hidden"
          >
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="w-full flex-shrink-0 px-4"
                >
                  <BlurCard className="max-w-4xl mx-auto p-8 md:p-10">
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 rounded-full overflow-hidden shadow-md border-2 border-white">
                          <img 
                            src={testimonial.image} 
                            alt={testimonial.author}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <Quote className="h-10 w-10 text-indigo-300/50 mb-2" />
                        <blockquote className="text-lg md:text-xl font-medium leading-relaxed mb-6">
                          "{testimonial.content}"
                        </blockquote>
                        
                        <div>
                          <div className="font-semibold">{testimonial.author}</div>
                          <div className="text-sm text-muted-foreground">{testimonial.position}</div>
                          
                          <div className="flex items-center mt-3">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                className={cn(
                                  "w-5 h-5",
                                  i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                                )}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                              >
                                <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                              </svg>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </BlurCard>
                </div>
              ))}
            </div>
            
            {/* Slider indicators */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    "w-3 h-3 rounded-full transition-all duration-300",
                    index === activeIndex
                      ? "bg-primary w-6"
                      : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  )}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
          
          {/* Navigation buttons */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm border-border/50 z-10 opacity-80 hover:opacity-100"
            onClick={prevSlide}
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm border-border/50 z-10 opacity-80 hover:opacity-100"
            onClick={nextSlide}
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

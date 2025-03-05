
import React, { useEffect } from 'react';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow mt-20">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-center mb-8">À propos de FreelanceAI</h1>
          
          <div className="max-w-3xl mx-auto space-y-8">
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">Notre mission</h2>
              <p className="text-muted-foreground">
                FreelanceAI a été créée avec une vision claire : connecter les entreprises avec les meilleurs talents indépendants 
                spécialisés dans l'intelligence artificielle, la blockchain et d'autres technologies de pointe. 
                Notre plateforme offre un espace où l'expertise rencontre l'innovation.
              </p>
            </section>
            
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">Qui sommes-nous ?</h2>
              <p className="text-muted-foreground">
                Nous sommes une équipe passionnée de professionnels qui croient au potentiel transformateur du travail indépendant 
                dans l'économie numérique. Issus nous-mêmes du monde freelance, nous comprenons les défis et les opportunités 
                que représente cette forme de travail.
              </p>
            </section>
            
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">Notre approche</h2>
              <p className="text-muted-foreground">
                Ce qui distingue FreelanceAI, c'est notre engagement envers la qualité et la transparence. 
                Chaque freelance sur notre plateforme fait l'objet d'une vérification rigoureuse, 
                garantissant ainsi que seuls les meilleurs talents sont présentés à nos clients.
              </p>
              <p className="text-muted-foreground">
                Nous pensons que les meilleures collaborations sont fondées sur la confiance mutuelle, 
                la communication claire et des attentes bien définies.
              </p>
            </section>
            
            <section className="bg-gradient-to-r from-indigo-500/10 to-cyan-400/10 p-6 rounded-xl border border-indigo-500/20">
              <h2 className="text-2xl font-semibold mb-4">Nos valeurs</h2>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <svg className="h-5 w-5 text-green-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span><strong>Excellence</strong> - Nous visons l'excellence dans chaque aspect de notre service.</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="h-5 w-5 text-green-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span><strong>Innovation</strong> - Nous embrassons le changement et l'amélioration continue.</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="h-5 w-5 text-green-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span><strong>Intégrité</strong> - Nous agissons avec honnêteté et transparence.</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="h-5 w-5 text-green-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span><strong>Communauté</strong> - Nous favorisons un environnement collaboratif et solidaire.</span>
                </li>
              </ul>
            </section>
            
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">Rejoignez-nous</h2>
              <p className="text-muted-foreground">
                Que vous soyez un client à la recherche de talents exceptionnels ou un freelance cherchant à développer 
                votre carrière, nous vous invitons à rejoindre la communauté FreelanceAI. Ensemble, nous pouvons créer, 
                innover et transformer le monde, un projet à la fois.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;

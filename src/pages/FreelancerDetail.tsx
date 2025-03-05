
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Star, 
  ArrowLeft, 
  Mail, 
  Phone, 
  Calendar, 
  MessageSquare, 
  ThumbsUp, 
  Clock, 
  CheckCircle2, 
  Award
} from 'lucide-react';
import BlurCard from '@/components/ui/blur-card';

// Mock data pour un freelance détaillé
const freelancersData = [
  {
    id: 1,
    name: "Thomas Laurent",
    title: "Expert IA & Machine Learning",
    rating: 4.9,
    reviews: 127,
    completionRate: 98,
    responseTime: "< 2 heures",
    lastActive: "Aujourd'hui",
    memberSince: "Janvier 2021",
    description: "Spécialiste en intelligence artificielle et machine learning avec plus de 8 ans d'expérience. J'aide les entreprises à développer des solutions IA sur-mesure pour optimiser leurs processus et extraire de la valeur de leurs données.",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
    skills: ["Machine Learning", "Python", "TensorFlow", "NLP", "Computer Vision", "Deep Learning"],
    price: 95,
    languages: ["Français", "Anglais", "Espagnol"],
    education: [
      { 
        degree: "Doctorat en Intelligence Artificielle", 
        institution: "École Polytechnique", 
        year: "2018" 
      },
      { 
        degree: "Master en Data Science", 
        institution: "École Normale Supérieure", 
        year: "2015" 
      }
    ],
    certifications: [
      "Google Professional ML Engineer",
      "AWS Certified Machine Learning Specialty",
      "NVIDIA Deep Learning Institute"
    ],
    portfolio: [
      {
        title: "Système de recommandation e-commerce",
        description: "Développement d'un algorithme de recommandation personnalisé pour une plateforme e-commerce majeure, augmentant les ventes de 24%.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
      },
      {
        title: "Chatbot IA pour service client",
        description: "Conception et implémentation d'un chatbot intelligent capable de résoudre 78% des requêtes clients sans intervention humaine.",
        image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
      },
      {
        title: "Système de détection de fraude",
        description: "Développement d'un modèle de ML pour détecter les transactions frauduleuses en temps réel pour une institution financière.",
        image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
      }
    ],
    reviews: [
      {
        id: 1,
        user: "Sophie Martin",
        rating: 5,
        date: "12 juin 2023",
        comment: "Thomas a été exceptionnel. Il a parfaitement compris nos besoins et a livré un modèle d'IA qui dépasse nos attentes. Communication claire et professionnelle tout au long du projet.",
        userImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80"
      },
      {
        id: 2,
        user: "Alexandre Dubois",
        rating: 5,
        date: "23 avril 2023",
        comment: "Un expert dans son domaine. Thomas a réussi à résoudre des problèmes complexes que d'autres consultants n'avaient pas pu résoudre. Je le recommande vivement pour tout projet d'IA avancé.",
        userImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80"
      },
      {
        id: 3,
        user: "Marie Lefebvre",
        rating: 4,
        date: "7 mars 2023",
        comment: "Excellent travail sur notre projet de NLP. Thomas est très compétent et pédagogue. Seul petit bémol sur les délais qui ont été un peu plus longs que prévu, mais le résultat final en valait la peine.",
        userImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80"
      }
    ],
    services: [
      {
        id: 1,
        title: "Développement de modèles ML personnalisés",
        description: "Conception et développement de modèles de machine learning adaptés à vos besoins spécifiques.",
        price: 2500,
        deliveryTime: "2-3 semaines"
      },
      {
        id: 2,
        title: "Implémentation de chatbots IA",
        description: "Création de chatbots intelligents capables d'interagir naturellement avec vos clients.",
        price: 1800,
        deliveryTime: "1-2 semaines"
      },
      {
        id: 3,
        title: "Consultation et formation IA",
        description: "Sessions de conseil et formation pour vos équipes internes sur l'IA et le ML.",
        price: 950,
        deliveryTime: "Sur mesure"
      }
    ]
  },
  {
    id: 2,
    name: "Sophie Dubois",
    title: "Développeuse Blockchain Senior",
    rating: 4.8,
    reviews: 94,
    completionRate: 97,
    responseTime: "< 3 heures",
    lastActive: "Hier",
    memberSince: "Mars 2020",
    description: "Développeuse blockchain expérimentée, spécialisée dans Ethereum et les smart contracts. Je crée des solutions DeFi sécurisées et évolutives pour les startups et entreprises.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
    skills: ["Ethereum", "Smart Contracts", "Solidity", "Web3.js", "DeFi", "NFT"],
    price: 110,
    languages: ["Français", "Anglais"],
    education: [
      { 
        degree: "Master en Cryptographie", 
        institution: "EPFL Lausanne", 
        year: "2019" 
      }
    ],
    certifications: [
      "Certified Blockchain Developer",
      "Ethereum Developer Certification",
      "Consensys Academy Graduate"
    ],
    portfolio: [
      {
        title: "Plateforme DeFi de prêts décentralisés",
        description: "Conception d'une plateforme DeFi permettant des prêts peer-to-peer sans intermédiaires.",
        image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
      },
      {
        title: "Collection NFT pour marque de luxe",
        description: "Développement des smart contracts pour une collection NFT d'une marque de luxe française.",
        image: "https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
      }
    ],
    reviews: [
      {
        id: 1,
        user: "Pierre Moreau",
        rating: 5,
        date: "2 mai 2023",
        comment: "Sophie a développé notre smart contract avec une expertise remarquable. Le code est propre, bien documenté et a passé l'audit de sécurité sans problèmes.",
        userImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80"
      },
      {
        id: 2,
        user: "Julien Robert",
        rating: 4,
        date: "14 mars 2023",
        comment: "Excellente développeuse blockchain. Sophie comprend parfaitement les enjeux techniques et business des projets Web3.",
        userImage: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80"
      }
    ],
    services: [
      {
        id: 1,
        title: "Développement de smart contracts",
        description: "Création de smart contracts sécurisés sur Ethereum, Binance Smart Chain ou Solana.",
        price: 3000,
        deliveryTime: "2-3 semaines"
      },
      {
        id: 2,
        title: "Audit de sécurité blockchain",
        description: "Audit complet de vos smart contracts pour identifier et corriger les vulnérabilités.",
        price: 2500,
        deliveryTime: "1 semaine"
      }
    ]
  },
  // Ajout des données pour les autres freelancers du Browse.tsx
  {
    id: 3,
    name: "Alexandre Martin",
    title: "Consultant Crypto & Finance",
    rating: 4.7,
    reviews: 78,
    completionRate: 95,
    responseTime: "< 5 heures",
    lastActive: "Il y a 2 jours",
    memberSince: "Juin 2021",
    description: "Consultant spécialisé dans la crypto-finance et les investissements blockchain. J'accompagne startups et investisseurs dans leurs stratégies d'investissement et de tokenisation.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
    skills: ["DeFi", "Trading", "NFT", "ICO", "Tokenisation", "Finance"],
    price: 85,
    languages: ["Français", "Anglais", "Allemand"],
    education: [
      { 
        degree: "MBA Finance", 
        institution: "HEC Paris", 
        year: "2017" 
      }
    ],
    certifications: [
      "Certified Financial Analyst (CFA)",
      "Certified Cryptocurrency Expert"
    ],
    portfolio: [
      {
        title: "Stratégie d'investissement DeFi",
        description: "Élaboration d'une stratégie DeFi pour un family office, générant +32% de rendement annuel.",
        image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
      }
    ],
    reviews: [
      {
        id: 1,
        user: "Claire Dupont",
        rating: 5,
        date: "28 avril 2023",
        comment: "Alexandre nous a fourni des conseils stratégiques précieux pour notre projet de tokenisation. Sa connaissance du marché crypto est impressionnante.",
        userImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80"
      }
    ],
    services: [
      {
        id: 1,
        title: "Consultation stratégique crypto",
        description: "Conseil stratégique pour vos investissements et projets dans l'écosystème crypto.",
        price: 1500,
        deliveryTime: "1 semaine"
      }
    ]
  },
  {
    id: 4,
    name: "Elise Bernard",
    title: "Architecte Solutions PME",
    rating: 4.9,
    reviews: 112,
    completionRate: 99,
    responseTime: "< 1 heure",
    lastActive: "Aujourd'hui",
    memberSince: "Septembre 2019",
    description: "Spécialiste en solutions digitales pour PME, j'accompagne les entreprises dans leur transformation numérique avec des outils adaptés à leurs besoins et budget.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
    skills: ["CRM", "ERP", "Cloud Solutions", "Digital Transformation", "Process Optimization"],
    price: 90,
    languages: ["Français", "Anglais"],
    education: [
      { 
        degree: "Master en Systèmes d'Information", 
        institution: "EM Lyon", 
        year: "2016" 
      }
    ],
    certifications: [
      "Salesforce Certified Consultant",
      "AWS Solutions Architect",
      "Microsoft Certified: Azure Solutions"
    ],
    portfolio: [
      {
        title: "Transformation digitale PME industrielle",
        description: "Implémentation d'une solution ERP complète pour une PME industrielle, réduisant les coûts opérationnels de 22%.",
        image: "https://images.unsplash.com/photo-1664575196044-195f135295df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
      }
    ],
    reviews: [
      {
        id: 1,
        user: "Jean Leroy",
        rating: 5,
        date: "15 mai 2023",
        comment: "Elise a complètement transformé notre approche digitale. Sa connaissance des besoins spécifiques des PME est inestimable. Je recommande sans hésitation.",
        userImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80"
      }
    ],
    services: [
      {
        id: 1,
        title: "Audit digital et stratégie",
        description: "Analyse complète de votre infrastructure digitale et proposition d'une stratégie d'optimisation.",
        price: 1200,
        deliveryTime: "1-2 semaines"
      }
    ]
  }
];

const FreelancerDetail = () => {
  const { id } = useParams();
  const [freelancer, setFreelancer] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simuler un chargement de données
    setLoading(true);
    setTimeout(() => {
      const foundFreelancer = freelancersData.find(f => f.id === Number(id));
      setFreelancer(foundFreelancer);
      setLoading(false);
    }, 500);
  }, [id]);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star 
        key={i} 
        className={`h-4 w-4 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
      />
    ));
  };

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
      {/* Header avec bouton retour */}
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
      
      {/* Contenu principal */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Colonne principale */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="about" className="w-full">
              <TabsList className="w-full grid grid-cols-3 mb-8">
                <TabsTrigger value="about">À propos</TabsTrigger>
                <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
                <TabsTrigger value="reviews">Avis ({freelancer.reviews?.length || 0})</TabsTrigger>
              </TabsList>
              
              <TabsContent value="about" className="space-y-8">
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
                    {freelancer.education.map((edu: any, index: number) => (
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
              </TabsContent>
              
              <TabsContent value="portfolio" className="space-y-6">
                <h2 className="text-xl font-semibold mb-4">Projets réalisés</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {freelancer.portfolio.map((project: any, index: number) => (
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
              </TabsContent>
              
              <TabsContent value="reviews" className="space-y-6">
                <h2 className="text-xl font-semibold mb-4">Avis clients</h2>
                
                <div className="space-y-4">
                  {freelancer.reviews.map((review: any) => (
                    <BlurCard key={review.id} className="p-5">
                      <div className="flex items-start gap-4">
                        <img 
                          src={review.userImage} 
                          alt={review.user}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <h4 className="font-medium">{review.user}</h4>
                              <div className="flex items-center gap-2">
                                <div className="flex">
                                  {renderStars(review.rating)}
                                </div>
                                <span className="text-sm text-muted-foreground">{review.date}</span>
                              </div>
                            </div>
                          </div>
                          <p className="text-muted-foreground mt-2">{review.comment}</p>
                        </div>
                      </div>
                    </BlurCard>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
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
                    {freelancer.services.map((service: any) => (
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelancerDetail;

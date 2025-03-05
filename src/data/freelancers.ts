
// Mock data for freelancers
export const freelancersData = [
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
    reviewsList: [
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
    reviewsList: [
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
    reviewsList: [
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
    reviewsList: [
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

export type Freelancer = typeof freelancersData[0];
export type FreelancerService = Freelancer['services'][0];
export type FreelancerReview = Freelancer['reviewsList'][0];
export type FreelancerPortfolio = Freelancer['portfolio'][0];
export type FreelancerEducation = Freelancer['education'][0];

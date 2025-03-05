
import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";

interface CookieSettings {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
}

const CookieConsent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [settings, setSettings] = useState<CookieSettings>({
    necessary: true,
    analytics: false,
    marketing: false,
    preferences: false
  });

  useEffect(() => {
    // Vérifier si l'utilisateur a déjà donné son consentement
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      // Attendre un peu avant d'afficher la bannière pour une meilleure expérience utilisateur
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    const newSettings = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true
    };
    setSettings(newSettings);
    saveConsent(newSettings);
  };

  const handleSavePreferences = () => {
    saveConsent(settings);
  };

  const handleRejectAll = () => {
    const newSettings = {
      necessary: true, // Les cookies nécessaires sont toujours acceptés
      analytics: false,
      marketing: false,
      preferences: false
    };
    setSettings(newSettings);
    saveConsent(newSettings);
  };

  const saveConsent = (consentSettings: CookieSettings) => {
    localStorage.setItem('cookieConsent', JSON.stringify(consentSettings));
    localStorage.setItem('cookieConsentDate', new Date().toISOString());
    setIsOpen(false);
  };

  const toggleSetting = (key: keyof CookieSettings) => {
    if (key === 'necessary') return; // Les cookies nécessaires ne peuvent pas être désactivés
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 bg-background/80 backdrop-blur-sm">
      <Card className="max-w-4xl mx-auto border shadow-lg">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">Paramètres de confidentialité</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Nous utilisons des cookies pour améliorer votre expérience sur notre site, personnaliser le contenu et les publicités, fournir des fonctionnalités de médias sociaux et analyser notre trafic. En savoir plus dans notre <Link to="/privacy-policy" className="text-primary underline">politique de confidentialité</Link>.
          </p>
          
          {expanded && (
            <div className="space-y-4 my-4">
              <div className="flex items-start space-x-2">
                <Checkbox 
                  id="necessary" 
                  checked={settings.necessary} 
                  disabled 
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="necessary"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Cookies nécessaires
                  </label>
                  <p className="text-xs text-muted-foreground">
                    Ces cookies sont essentiels au fonctionnement du site et ne peuvent pas être désactivés.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-2">
                <Checkbox 
                  id="analytics" 
                  checked={settings.analytics}
                  onCheckedChange={() => toggleSetting('analytics')}
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="analytics"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Cookies analytiques
                  </label>
                  <p className="text-xs text-muted-foreground">
                    Nous permettent de comprendre comment vous utilisez le site afin de l'améliorer.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-2">
                <Checkbox 
                  id="marketing" 
                  checked={settings.marketing}
                  onCheckedChange={() => toggleSetting('marketing')}
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="marketing"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Cookies marketing
                  </label>
                  <p className="text-xs text-muted-foreground">
                    Utilisés pour vous présenter des publicités pertinentes sur d'autres sites.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-2">
                <Checkbox 
                  id="preferences" 
                  checked={settings.preferences}
                  onCheckedChange={() => toggleSetting('preferences')}
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="preferences"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Cookies de préférences
                  </label>
                  <p className="text-xs text-muted-foreground">
                    Permettent de personnaliser votre expérience en sauvegardant vos préférences.
                  </p>
                </div>
              </div>
            </div>
          )}
          
          <Button 
            variant="link" 
            className="px-0 text-sm" 
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Masquer les détails" : "Afficher les détails"}
          </Button>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-2 justify-between">
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleRejectAll}
          >
            Refuser tout
          </Button>
          <div className="flex gap-2">
            {expanded && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleSavePreferences}
              >
                Enregistrer mes préférences
              </Button>
            )}
            <Button 
              size="sm"
              onClick={handleAcceptAll}
            >
              Accepter tout
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CookieConsent;


import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <Button 
        variant="ghost" 
        className="mb-6" 
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Retour
      </Button>

      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Politique de Confidentialité</h1>
          <p className="text-muted-foreground">
            Dernière mise à jour : {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="space-y-4">
          <section>
            <h2 className="text-xl font-semibold mb-2">1. Introduction</h2>
            <p>
              Cette politique de confidentialité explique comment nous collectons, utilisons, traitons et protégeons vos informations personnelles lorsque vous utilisez notre plateforme de freelance qui intègre des paiements traditionnels et en cryptomonnaie.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">2. Données que nous collectons</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Informations d'identification (nom, adresse email, numéro de téléphone)</li>
              <li>Informations de profil professionnel</li>
              <li>Données de paiement et informations financières</li>
              <li>Adresses de portefeuilles cryptographiques</li>
              <li>Historique des transactions</li>
              <li>Données techniques (adresse IP, cookies, données de navigation)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">3. Utilisation des données</h2>
            <p>Nous utilisons vos données pour :</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Faciliter la mise en relation entre freelances et clients</li>
              <li>Traiter les paiements et transactions</li>
              <li>Assurer la sécurité des transactions et prévenir la fraude</li>
              <li>Respecter nos obligations légales, notamment en matière de KYC et AML</li>
              <li>Améliorer nos services et votre expérience utilisateur</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">4. Base légale du traitement</h2>
            <p>
              Nous traitons vos données personnelles sur la base de :
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>L'exécution du contrat qui nous lie</li>
              <li>Nos obligations légales (notamment en matière de lutte contre le blanchiment d'argent)</li>
              <li>Votre consentement lorsque celui-ci est requis</li>
              <li>Nos intérêts légitimes (sécurité, amélioration des services)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">5. Conservation des données</h2>
            <p>
              Nous conservons vos données aussi longtemps que nécessaire pour fournir nos services, respecter nos obligations légales (notamment fiscales et en matière de lutte contre le blanchiment), résoudre les litiges et faire respecter nos accords.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">6. Vos droits RGPD</h2>
            <p>
              Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants :
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Droit d'accès à vos données personnelles</li>
              <li>Droit de rectification des données inexactes</li>
              <li>Droit à l'effacement ('droit à l'oubli')</li>
              <li>Droit à la limitation du traitement</li>
              <li>Droit à la portabilité des données</li>
              <li>Droit d'opposition au traitement</li>
              <li>Droits relatifs à la prise de décision automatisée et au profilage</li>
            </ul>
            <p className="mt-2">
              Pour exercer ces droits, contactez-nous à l'adresse email : dpo@exemple.com
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">7. Conformité aux réglementations sur les cryptomonnaies</h2>
            <p>
              Notre plateforme respecte les réglementations applicables en matière de cryptomonnaies, notamment :
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Le règlement MiCA (Markets in Crypto-Assets) dans l'Union européenne</li>
              <li>Les directives anti-blanchiment (AML) et Know Your Customer (KYC)</li>
              <li>Les obligations de déclaration fiscale applicables</li>
            </ul>
            <p className="mt-2">
              Dans ce cadre, nous pouvons être amenés à collecter des informations supplémentaires pour vérifier votre identité et nous conformer à ces obligations légales.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">8. Contacter notre DPO</h2>
            <p>
              Pour toute question concernant cette politique ou vos données personnelles, vous pouvez contacter notre Délégué à la Protection des Données (DPO) à l'adresse email suivante : dpo@exemple.com
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">9. Modifications de la politique de confidentialité</h2>
            <p>
              Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment. Les modifications prendront effet dès leur publication sur cette page. Nous vous encourageons à consulter régulièrement cette page pour prendre connaissance des éventuelles modifications.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

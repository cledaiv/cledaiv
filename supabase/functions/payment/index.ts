
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import Stripe from "https://esm.sh/stripe@14.7.0"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Récupère la clé secrète Stripe depuis les variables d'environnement
const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY')
const stripe = new Stripe(stripeSecretKey, {
  httpClient: Stripe.createFetchHttpClient(),
})

serve(async (req) => {
  // Gestion des requêtes CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { action, params } = await req.json()

    switch (action) {
      case 'createPaymentIntent': {
        if (!params.amount || !params.currency || !params.projectId) {
          throw new Error('Montant, devise et ID du projet sont requis')
        }

        // Création d'un intent de paiement avec Stripe
        const paymentIntent = await stripe.paymentIntents.create({
          amount: params.amount,
          currency: params.currency,
          metadata: { 
            projectId: params.projectId,
            isEscrow: params.isEscrow === true ? 'true' : 'false',
            freelancerId: params.freelancerId || '',
            clientId: params.clientId || ''
          },
        })
        
        return new Response(
          JSON.stringify({ 
            clientSecret: paymentIntent.client_secret,
            paymentIntentId: paymentIntent.id 
          }),
          { 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200,
          }
        )
      }

      case 'releaseEscrow': {
        if (!params.paymentIntentId) {
          throw new Error('ID de l\'intent de paiement requis')
        }

        // On vérifie d'abord que le paiement est bien en mode entiercement
        const paymentIntent = await stripe.paymentIntents.retrieve(params.paymentIntentId)
        
        if (paymentIntent.metadata.isEscrow !== 'true') {
          throw new Error('Ce paiement n\'est pas un paiement sous entiercement')
        }

        // Simuler la libération d'un paiement en entiercement
        // Dans un système réel, il faudrait ajouter des vérifications d'autorisation
        const updatedIntent = await stripe.paymentIntents.update(params.paymentIntentId, {
          metadata: { 
            ...paymentIntent.metadata,
            escrowReleased: 'true',
            releasedAt: new Date().toISOString() 
          }
        })
        
        return new Response(
          JSON.stringify({ 
            success: true,
            paymentIntentId: updatedIntent.id 
          }),
          { 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200,
          }
        )
      }

      case 'checkCryptoPayment': {
        // Simule une vérification de paiement crypto
        // Dans un système réel, il faudrait interroger la blockchain
        const mockValidation = {
          transactionId: params.txHash || 'tx_mock_' + Math.random().toString(36).substring(7),
          confirmed: true,
          confirmations: 6,
          amount: params.amount || '0.05',
          currency: params.currency || 'ETH'
        }
        
        return new Response(
          JSON.stringify(mockValidation),
          { 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200,
          }
        )
      }

      default:
        throw new Error('Action non supportée')
    }
  } catch (error) {
    console.error('Erreur dans la fonction payment:', error)
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})

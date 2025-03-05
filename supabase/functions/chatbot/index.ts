
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { Configuration, OpenAIApi } from "https://esm.sh/openai@3.2.1"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY')

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    if (!OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY is not set')
    }

    const { message, context } = await req.json()

    const configuration = new Configuration({ apiKey: OPENAI_API_KEY })
    const openai = new OpenAIApi(configuration)

    // Système de prompt pour contextualiser le chatbot
    const systemPrompt = `
    Tu es un assistant spécialisé dans l'aide aux utilisateurs sur une plateforme de freelances.
    
    Contexte de la plateforme:
    - La plateforme met en relation des clients avec des freelances spécialisés
    - Les freelances peuvent proposer des services dans de nombreux domaines, notamment l'IA, la blockchain, et le développement web
    
    Ton rôle:
    - Aider les utilisateurs à trouver des freelances appropriés
    - Répondre aux questions fréquentes sur la plateforme
    - Expliquer les différents services disponibles
    - Guider le processus de sélection d'un freelance
    
    Sois utile, clair et bienveillant dans tes réponses.
    ${context ? `Informations sur l'utilisateur: ${context}` : ''}
    `

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message }
      ],
      temperature: 0.7,
      max_tokens: 500,
    })

    const answer = response.data.choices[0].message?.content || "Désolé, je n'ai pas pu traiter votre demande."

    return new Response(
      JSON.stringify({ answer }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    console.error('Error in chatbot function:', error)
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})

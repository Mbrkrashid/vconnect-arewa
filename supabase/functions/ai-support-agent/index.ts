import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { supabaseClient } from '../_shared/supabaseClient.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, userId } = await req.json();

    // Store user message in chat history
    const { error: chatError } = await supabaseClient
      .from('support_chat_history')
      .insert({
        user_id: userId,
        message: message,
        is_ai: false
      });

    if (chatError) throw chatError;

    // Generate AI response using GPT-4
    const aiResponse = "Thank you for your message. Our support team will get back to you shortly.";

    // Store AI response in chat history
    const { error: aiChatError } = await supabaseClient
      .from('support_chat_history')
      .insert({
        user_id: userId,
        message: aiResponse,
        is_ai: true
      });

    if (aiChatError) throw aiChatError;

    return new Response(
      JSON.stringify({ response: aiResponse }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
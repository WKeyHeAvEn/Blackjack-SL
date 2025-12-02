import { supabase } from './supabase';
import { getSessionId } from './sessionManager';

export async function initializePlayer(): Promise<number> {
  const sessionId = getSessionId();

  const { data: existingPlayer } = await supabase
    .from('players')
    .select('tokens')
    .eq('session_id', sessionId)
    .maybeSingle();

  if (existingPlayer) {
    return existingPlayer.tokens;
  }

  const { data: newPlayer } = await supabase
    .from('players')
    .insert({ session_id: sessionId, tokens: 100 })
    .select('tokens')
    .single();

  return newPlayer?.tokens || 100;
}

export async function getPlayerTokens(): Promise<number> {
  const sessionId = getSessionId();

  const { data } = await supabase
    .from('players')
    .select('tokens')
    .eq('session_id', sessionId)
    .maybeSingle();

  return data?.tokens || 0;
}

export async function updatePlayerTokens(newTokenAmount: number): Promise<void> {
  const sessionId = getSessionId();

  await supabase
    .from('players')
    .update({ tokens: newTokenAmount, updated_at: new Date().toISOString() })
    .eq('session_id', sessionId);
}

export async function resetPlayerTokens(): Promise<number> {
  const sessionId = getSessionId();

  const { data } = await supabase
    .from('players')
    .update({ tokens: 100, updated_at: new Date().toISOString() })
    .eq('session_id', sessionId)
    .select('tokens')
    .single();

  return data?.tokens || 100;
}

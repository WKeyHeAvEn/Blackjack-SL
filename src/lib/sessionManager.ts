export function getSessionId(): string {
  let sessionId = localStorage.getItem('blackjack_session_id');

  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2)}`;
    localStorage.setItem('blackjack_session_id', sessionId);
  }

  return sessionId;
}

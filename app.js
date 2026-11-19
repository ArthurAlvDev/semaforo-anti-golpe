const SCAM_PATTERNS = [
  { regex: /pix.*(urgente|agora|bloqueado|taxa)/i, reason: 'Pressão por Pix urgente ou taxa para desbloqueio' },
  { regex: /(clique aqui|atualize seu cadastro|conta suspensa)/i, reason: 'Isca típica de phishing para roubo de dados' },
  { regex: /(mudei de n[uú]mero|oi m[aã]e|oi pai)/i, reason: 'Possível golpe do número novo / falso familiar' },
  { regex: /https?:\/\/(bit\.ly|tinyurl\.com|t\.co)\//i, reason: 'Link encurtado ocultando o destino real' }
];

export function analyzeMessage(text = '') {
  const trimmed = String(text).trim();
  if (!trimmed) return { light: 'VERDE', score: 0, reasons: ['Cole uma mensagem ou link para analisar.'] };
  const reasons = SCAM_PATTERNS.filter((p) => p.regex.test(trimmed)).map((p) => p.reason);
  if (reasons.length >= 2 || /pix.*(urgente|taxa)/i.test(trimmed)) {
    return { light: 'VERMELHO', score: reasons.length, reasons };
  }
  if (reasons.length === 1) {
    return { light: 'AMARELO', score: 1, reasons };
  }
  return { light: 'VERDE', score: 0, reasons: ['Nenhum padrão clássico de golpe detectado. Ainda assim, confirme por ligação antes de transferir.'] };
}

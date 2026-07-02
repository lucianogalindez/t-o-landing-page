const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid'];
const STORAGE_KEY = 'to_attribution';
const EXPIRY_DAYS = 30;

export function captureAttribution() {
  const params = new URLSearchParams(window.location.search);
  const hasAny = UTM_KEYS.some(k => params.has(k));
  if (!hasAny) return;

  const data: Record<string, string> = {};
  UTM_KEYS.forEach(k => {
    const v = params.get(k);
    if (v) data[k] = v;
  });

  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    ...data,
    _capturedAt: Date.now(),
  }));
}

export function getAttribution(): Record<string, string> {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return {};
  try {
    const parsed = JSON.parse(raw);
    const age = Date.now() - (parsed._capturedAt || 0);
    if (age > EXPIRY_DAYS * 24 * 60 * 60 * 1000) {
      localStorage.removeItem(STORAGE_KEY);
      return {};
    }
    const { _capturedAt, ...attribution } = parsed;
    return attribution;
  } catch {
    return {};
  }
}

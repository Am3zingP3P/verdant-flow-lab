export type ConsentCategories = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
};

export type StoredConsent = ConsentCategories & {
  version: number;
  timestamp: string;
};

export const CONSENT_VERSION = 1;
export const CONSENT_KEY = "natursense-consent";
export const CONSENT_EVENT = "natursense:consent";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function readConsent(): StoredConsent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredConsent;
    if (parsed.version !== CONSENT_VERSION) return null;
    return parsed;
  } catch {
    return null;
  }
}

/** Google Consent Mode v2 — default everything denied until the user chooses. */
export function initConsentMode() {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  const gtag: (...args: unknown[]) => void =
    window.gtag ??
    function (...args: unknown[]) {
      window.dataLayer!.push(args);
    };
  window.gtag = gtag;

  const stored = readConsent();
  gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied",
    functionality_storage: "denied",
    personalization_storage: "denied",
    security_storage: "granted",
    wait_for_update: 500,
  });
  if (stored) pushConsentUpdate(stored);
}

export function pushConsentUpdate(c: ConsentCategories) {
  if (typeof window === "undefined" || !window.gtag) return;
  const g = (v: boolean) => (v ? "granted" : "denied");
  window.gtag("consent", "update", {
    ad_storage: g(c.marketing),
    ad_user_data: g(c.marketing),
    ad_personalization: g(c.marketing),
    analytics_storage: g(c.analytics),
    functionality_storage: g(c.preferences),
    personalization_storage: g(c.preferences),
    security_storage: "granted",
  });
}

export function saveConsent(c: Omit<ConsentCategories, "necessary">) {
  const value: StoredConsent = {
    necessary: true,
    ...c,
    version: CONSENT_VERSION,
    timestamp: new Date().toISOString(),
  };
  try {
    window.localStorage.setItem(CONSENT_KEY, JSON.stringify(value));
  } catch {
    /* storage blocked — consent stays session-only */
  }
  pushConsentUpdate(value);
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: value }));
  return value;
}

export function openConsentSettings() {
  window.dispatchEvent(new CustomEvent(`${CONSENT_EVENT}:open`));
}

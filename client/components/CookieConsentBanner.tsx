import { useEffect, useState } from "react";

const COOKIE_CONSENT_KEY = "yww_cookie_consent_v1";

type CookieConsent = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
};

export default function CookieConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);
  const [marketingEnabled, setMarketingEnabled] = useState(true);

  useEffect(() => {
    const stored = window.localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!stored) {
      setIsVisible(true);
      return;
    }

    try {
      const parsed = JSON.parse(stored) as CookieConsent;
      setAnalyticsEnabled(Boolean(parsed.analytics));
      setMarketingEnabled(Boolean(parsed.marketing));
    } catch (_error) {
      setIsVisible(true);
    }
  }, []);

  useEffect(() => {
    const openSettings = () => {
      const stored = window.localStorage.getItem(COOKIE_CONSENT_KEY);
      if (stored) {
        try {
          const parsed = JSON.parse(stored) as CookieConsent;
          setAnalyticsEnabled(Boolean(parsed.analytics));
          setMarketingEnabled(Boolean(parsed.marketing));
        } catch (_error) {
          setAnalyticsEnabled(true);
          setMarketingEnabled(true);
        }
      }
      setShowSettings(true);
      setIsVisible(true);
    };

    window.addEventListener("yww:open-cookie-settings", openSettings);
    return () => window.removeEventListener("yww:open-cookie-settings", openSettings);
  }, []);

  const saveConsent = (consent: Omit<CookieConsent, "timestamp">) => {
    const payload: CookieConsent = {
      ...consent,
      timestamp: new Date().toISOString(),
    };
    window.localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(payload));
    window.dispatchEvent(new Event("yww:cookie-consent-updated"));
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 z-[70] md:left-auto md:max-w-xl">
      <div className="rounded-2xl border border-[#B46555]/35 bg-[#FBF9F5] p-4 md:p-5 shadow-2xl">
        <p className="text-sm font-medium text-gray-900 mb-1">Cookie-instellingen</p>
        <p className="text-sm text-gray-700 mb-4">
          We gebruiken cookies om de site goed te laten werken en om je ervaring te verbeteren.
        </p>

        {showSettings && (
          <div className="mb-4 space-y-3 rounded-xl border border-gray-200 bg-white p-3">
            <label className="flex items-start justify-between gap-3">
              <span>
                <span className="block text-sm font-medium text-gray-900">Noodzakelijk</span>
                <span className="block text-xs text-gray-600">Deze cookies zijn altijd actief.</span>
              </span>
              <span className="text-xs font-medium text-gray-500">Altijd aan</span>
            </label>

            <label className="flex items-start justify-between gap-3">
              <span>
                <span className="block text-sm font-medium text-gray-900">Analytics</span>
                <span className="block text-xs text-gray-600">Helpt ons de website te verbeteren.</span>
              </span>
              <input
                type="checkbox"
                checked={analyticsEnabled}
                onChange={(event) => setAnalyticsEnabled(event.target.checked)}
                className="mt-1 h-4 w-4 accent-[#B46555]"
              />
            </label>

            <label className="flex items-start justify-between gap-3">
              <span>
                <span className="block text-sm font-medium text-gray-900">Marketing</span>
                <span className="block text-xs text-gray-600">Voor relevante communicatie en campagnes.</span>
              </span>
              <input
                type="checkbox"
                checked={marketingEnabled}
                onChange={(event) => setMarketingEnabled(event.target.checked)}
                className="mt-1 h-4 w-4 accent-[#B46555]"
              />
            </label>
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() =>
              saveConsent({
                necessary: true,
                analytics: true,
                marketing: true,
              })
            }
            className="inline-flex items-center rounded-lg bg-[#6B705C] px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:scale-105 hover:bg-[#B46555]"
          >
            Alle cookies accepteren
          </button>

          <button
            type="button"
            onClick={() =>
              saveConsent({
                necessary: true,
                analytics: false,
                marketing: false,
              })
            }
            className="inline-flex items-center rounded-lg border border-[#1C2826]/30 bg-white px-4 py-2 text-sm font-medium text-[#1C2826] transition-all duration-300 hover:scale-105 hover:border-[#1C2826]"
          >
            Alleen noodzakelijk
          </button>

          <button
            type="button"
            onClick={() => {
              if (!showSettings) {
                setShowSettings(true);
                return;
              }
              saveConsent({
                necessary: true,
                analytics: analyticsEnabled,
                marketing: marketingEnabled,
              });
            }}
            className="inline-flex items-center rounded-lg border border-[#B46555]/40 bg-[#B46555]/10 px-4 py-2 text-sm font-medium text-[#1C2826] transition-all duration-300 hover:scale-105 hover:bg-[#B46555]/20"
          >
            {showSettings ? "Instellingen opslaan" : "Instellingen"}
          </button>
        </div>
      </div>
    </div>
  );
}

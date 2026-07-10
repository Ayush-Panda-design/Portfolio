import { useEffect } from "react";
import { useLocation } from "@tanstack/react-router";

export function GoogleAnalytics() {
  const location = useLocation();
  const gaId = import.meta.env.VITE_GA_MEASUREMENT_ID;

  useEffect(() => {
    if (!gaId) {
      if (import.meta.env.DEV) {
        console.warn(
          "Google Analytics Measurement ID (VITE_GA_MEASUREMENT_ID) is not set in environment variables."
        );
      }
      return;
    }

    // Load gtag script if not already loaded
    const scriptId = "google-analytics-script";
    const inlineScriptId = "google-analytics-inline-script";

    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
      document.head.appendChild(script);

      const inlineScript = document.createElement("script");
      inlineScript.id = inlineScriptId;
      inlineScript.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        window.gtag = function(){dataLayer.push(arguments);}
        window.gtag('js', new Date());
      `;
      document.head.appendChild(inlineScript);
    }
  }, [gaId]);

  // Track page views on route change
  useEffect(() => {
    if (!gaId) return;
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("config", gaId, {
        page_path: window.location.pathname + window.location.search,
      });
    }
  }, [location, gaId]);

  return null;
}

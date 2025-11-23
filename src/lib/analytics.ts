/**
 * Simple analytics tracking utility
 * Can be extended to integrate with Plausible, PostHog, or other analytics services
 */

type EventProperties = Record<string, string | number | boolean>;

export function track(eventName: string, properties?: EventProperties): void {
  // Log to console in development
  if (process.env.NODE_ENV === "development") {
    console.log("[Analytics]", eventName, properties);
  }

  // TODO: Integrate with analytics service (Plausible, PostHog, etc.)
  // Example for Plausible:
  // if (typeof window !== "undefined" && window.plausible) {
  //   window.plausible(eventName, { props: properties });
  // }

  // For now, we just log the event
  // In production, you would send this to your analytics service
}

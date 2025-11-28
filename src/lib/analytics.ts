// Analytics event tracking utility

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export const trackEvent = (eventName: string, params?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params)
  }
}

// Specific event tracking functions
export const trackDownloadClick = (platform: 'ios' | 'android' | 'universal') => {
  trackEvent('download_click', { platform })
}

export const trackEmailSignup = (location: string = 'footer') => {
  trackEvent('email_signup', { location })
}

export const trackReferralClick = (code: string) => {
  trackEvent('referral_click', { code })
}

export const trackContactFormSubmit = (subject: string) => {
  trackEvent('contact_form_submit', { subject })
}

export const trackModalOpen = (modalName: string) => {
  trackEvent('modal_open', { modal_name: modalName })
}

export const trackCalculatorUse = (action: 'add_person' | 'add_expense' | 'calculate') => {
  trackEvent('calculator_use', { action })
}

/**
 * Single source of truth for brand + contact details.
 * Drop the real WhatsApp number into WHATSAPP_PHONE when it's ready
 * (E.164 digits only, e.g. "919876543210").
 */
export const BUSINESS = {
  name: 'All is well',
  tagline: 'Pure care for your family',
  subLabel: 'Pure herbal care',
  address: 'C1/404, Sadguru Colony, AG Chowk, Kalawad Road, Rajkot – 360005, Gujarat',
  addressShort: 'C1/404, Sadguru Colony, AG Chowk, Kalawad Road, Rajkot – 360005',
  city: 'Rajkot',
  // WhatsApp business number. Digits only, no "+" (E.164): 91 = India.
  whatsappPhone: '917226010246',
} as const;

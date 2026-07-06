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
  whatsappPhone: '919510010079',
  // Call number. Digits only, no "+" (used to build tel: links).
  phone: '919510010079',
  phoneDisplay: '+91 95100 10079',
  email: 'sairajdr@gmail.com',
} as const;

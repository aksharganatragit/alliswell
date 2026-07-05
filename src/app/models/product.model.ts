export type ProductCategory = 'skin' | 'digestion' | 'immunity' | 'general';

export interface Product {
  id: string;
  /** URL slug for the detail route, e.g. /product/ayuska */
  slug: string;
  name: string;
  size: string;
  /** Price in INR (rupees, integer). */
  price: number;
  category: ProductCategory;
  /** Icon name used for the placeholder thumbnail (see IconComponent). */
  icon: string;
  /**
   * Product images. Icon placeholders for now; will later be real image
   * URLs passed as an array, e.g. ["front.jpg", "side.jpg", "label.jpg"].
   * The detail carousel renders one slide per entry.
   */
  images: string[];
  bestSeller?: boolean;
  shortDescription: string;
  description: string;
  dosage: string;
  ingredients: string;
  warnings: string;
}

/** Format an INR amount the way it should read across the UI: ₹1,400 */
export function formatPrice(value: number): string {
  return '₹' + value.toLocaleString('en-IN');
}

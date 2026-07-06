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
  /** Icon name used as the placeholder thumbnail when no images exist. */
  icon: string;
  /**
   * Real product image URLs, e.g. ["/products/ayuska.jpg", ...]. Served from
   * the `public/` folder (root-absolute paths). When empty, the UI falls back
   * to the `icon` placeholder. The detail carousel renders one slide per entry.
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

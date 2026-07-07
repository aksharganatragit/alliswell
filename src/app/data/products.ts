import { Product } from '../models/product.model';

/**
 * Current catalog — 4 products, scales to ~15. Add new entries here;
 * the whole app (home teaser, shop grid, detail page) is data-driven.
 *
 * `images` holds icon-placeholder keys today. When real photography lands,
 * replace each array with the product's image URLs — nothing else changes.
 */
export const PRODUCTS: Product[] = [
  {
    id: 'ayuska',
    slug: 'ayuska',
    name: 'Ayuska',
    size: '500 ml',
    price: 1400,
    category: 'general',
    icon: 'bottle',
    images: ['/products/ayuska-front.jpg', '/products/ayuska.jpg', '/products/ayuska-ingredients.jpg'],
    bestSeller: true,
    shortDescription: 'Daily herbal wellness tonic for the whole family.',
    description:
      'Ayuska is our flagship daily wellness tonic — a herb-infused formulation to support everyday vitality and balance. Crafted with natural-origin ingredients in small batches for freshness. (Full product copy to be finalised.)',
    dosage:
      '10–15 ml twice daily, ideally after meals, or as directed by your physician. Shake well before use.',
    ingredients:
      'A blend of herbs and botanical extracts in a natural base. (Full ingredient list to be added.)',
    warnings:
      'For adult use. Keep out of reach of children. Consult a physician before use if pregnant, nursing, or on medication. Store in a cool, dry place away from direct sunlight.',
  },
  {
    id: 'skeensudha',
    slug: 'skeensudha-skin-ointment',
    name: 'Skeensudha skin ointment',
    size: '30 gm',
    price: 450,
    category: 'skin',
    icon: 'jar',
    images: ['/products/skeensudha.jpg'],
    shortDescription: 'Soothing herbal ointment for everyday skin care.',
    description:
      'Skeensudha is a gentle herbal ointment made to soothe and care for everyday skin concerns. Non-greasy and suitable for regular use. (Full product copy to be finalised.)',
    dosage:
      'Apply a thin layer to the affected area 2–3 times daily, or as directed. For external use only.',
    ingredients:
      'Herbal extracts in a soothing ointment base. (Full ingredient list to be added.)',
    warnings:
      'For external use only. Avoid contact with eyes. Discontinue use if irritation occurs. Keep out of reach of children.',
  },
  {
    id: 'nityasudha',
    slug: 'nityasudha-churan',
    name: 'Nityasudha Churan',
    size: '200 gm',
    price: 550,
    category: 'digestion',
    icon: 'jar',
    images: [],
    shortDescription: 'Herbal churan to support regularity and digestion.',
    description:
      'Nityasudha Churan is a traditional herbal powder blended to gently support digestion and regularity. (Full product copy to be finalised.)',
    dosage:
      '1 teaspoon with warm water at bedtime, or as directed by your physician.',
    ingredients:
      'A classical blend of digestive herbs. (Full ingredient list to be added.)',
    warnings:
      'For adult use. Not a substitute for a balanced diet. Consult a physician before use if pregnant, nursing, or on medication. Keep out of reach of children.',
  },
  {
    id: 'gausudha',
    slug: 'gausudha-cap',
    name: 'Gausudha Cap',
    size: '60 capsules',
    price: 1100,
    category: 'immunity',
    icon: 'capsule',
    images: ['/products/gausudha.jpg'],
    shortDescription: 'Herbal capsules formulated to support immunity.',
    description:
      'Gausudha Cap is a herb-infused capsule formulation intended to support the body’s natural immunity. (Full product copy to be finalised.)',
    dosage:
      '1 capsule twice daily after meals with water, or as directed by your physician.',
    ingredients:
      'Immunity-supporting herbs in a vegetarian capsule. (Full ingredient list to be added.)',
    warnings:
      'For adult use. Keep out of reach of children. Consult a physician before use if pregnant, nursing, or on medication. Store in a cool, dry place.',
  },
];

/** Category display labels, kept here so filters/sort read consistently. */
export const CATEGORY_LABELS: Record<Product['category'], string> = {
  skin: 'Skin care',
  digestion: 'Digestion',
  immunity: 'Immunity',
  general: 'General wellness',
};

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

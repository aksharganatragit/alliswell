import { Injectable, computed, effect, signal } from '@angular/core';
import { Product } from '../models/product.model';

export interface CartItem {
  product: Product;
  qty: number;
}

const STORAGE_KEY = 'aiw_cart_v1';

/**
 * In-memory cart, mirrored to sessionStorage so it survives a page refresh
 * within the same browser session. No backend required yet.
 */
@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly _items = signal<CartItem[]>(this.restore());

  /** Reactive list of cart lines. */
  readonly items = this._items.asReadonly();

  /** Total number of units — drives the nav badge. */
  readonly count = computed(() =>
    this._items().reduce((n, i) => n + i.qty, 0),
  );

  /** Cart subtotal in rupees. */
  readonly subtotal = computed(() =>
    this._items().reduce((sum, i) => sum + i.product.price * i.qty, 0),
  );

  readonly isEmpty = computed(() => this._items().length === 0);

  constructor() {
    // Keep sessionStorage in sync whenever the cart changes.
    effect(() => this.persist(this._items()));
  }

  add(product: Product, qty = 1): void {
    this._items.update((items) => {
      const existing = items.find((i) => i.product.id === product.id);
      if (existing) {
        return items.map((i) =>
          i.product.id === product.id ? { ...i, qty: i.qty + qty } : i,
        );
      }
      return [...items, { product, qty }];
    });
  }

  setQty(productId: string, qty: number): void {
    if (qty <= 0) {
      this.remove(productId);
      return;
    }
    this._items.update((items) =>
      items.map((i) => (i.product.id === productId ? { ...i, qty } : i)),
    );
  }

  increment(productId: string): void {
    const item = this._items().find((i) => i.product.id === productId);
    if (item) this.setQty(productId, item.qty + 1);
  }

  decrement(productId: string): void {
    const item = this._items().find((i) => i.product.id === productId);
    if (item) this.setQty(productId, item.qty - 1);
  }

  remove(productId: string): void {
    this._items.update((items) => items.filter((i) => i.product.id !== productId));
  }

  clear(): void {
    this._items.set([]);
  }

  // --- persistence ---------------------------------------------------

  private restore(): CartItem[] {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as CartItem[]) : [];
    } catch {
      return [];
    }
  }

  private persist(items: CartItem[]): void {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* storage unavailable — cart stays in memory only */
    }
  }
}

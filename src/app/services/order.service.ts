import { Injectable, inject } from '@angular/core';
import { BUSINESS } from '../config/business';
import { formatPrice } from '../models/product.model';
import { Product } from '../models/product.model';
import { CartItem, CartService } from './cart.service';

export interface ContactDetails {
  name?: string;
  phone?: string;
  place?: string;
  message?: string;
}

/**
 * Order dispatch abstraction.
 *
 * Ordering is WhatsApp-only for now, but every order CTA in the app goes
 * through this one service. When a payment gateway is added later, add a
 * new dispatch path here (or a strategy behind `dispatch`) — the pages and
 * buttons that call `orderCart()` / `contact()` do not need to change.
 *
 * Messages use WhatsApp's native markdown (`*bold*`) to highlight the parts
 * that matter for confirming an order — item names, quantities and totals.
 *
 * TODO(payments): introduce a checkout flow (Razorpay / Stripe / etc.) as an
 * alternate OrderChannel and let the caller choose. Keep WhatsApp as fallback.
 */
@Injectable({ providedIn: 'root' })
export class OrderService {
  private readonly cart = inject(CartService);

  /** Send the current cart as a pre-filled WhatsApp order message. */
  orderCart(): void {
    const items = this.cart.items();
    const message = items.length
      ? this.buildOrderMessage(items, this.cart.subtotal())
      : this.genericOrderIntro();
    this.dispatch(message);
  }

  /** Order a single product directly from its detail page. */
  orderProduct(product: Product, qty = 1): void {
    const line = `*${product.name}* (${product.size}) × *${qty}* — *${formatPrice(
      product.price * qty,
    )}*`;
    this.dispatch(
      [
        `Hi *${BUSINESS.name}* 🌿, I'd like to order:`,
        '',
        `• ${line}`,
        '',
        'Please confirm availability and delivery. Thank you! 🙏',
      ].join('\n'),
    );
  }

  /** Generic "I'd like to order" opener (empty cart). */
  orderGeneric(): void {
    this.dispatch(this.genericOrderIntro());
  }

  /**
   * Lead-generation opener for the floating WhatsApp button — a warm,
   * low-commitment "let's connect" message rather than a hard order.
   */
  lead(): void {
    this.dispatch(
      `Hey *${BUSINESS.name}* 👋🌿 — I came across your site and I'd love to connect about the products you offer. Could you share a few details? 😊`,
    );
  }

  /** Open a WhatsApp chat for general contact / enquiry (free-text). */
  contact(message = `Hi 👋, I have a question about *${BUSINESS.name}*.`): void {
    this.dispatch(message);
  }

  /** Structured contact-form enquiry — labels are bolded, blanks are omitted. */
  contactForm(details: ContactDetails): void {
    const lines = [
      `Hi *${BUSINESS.name}* 👋, I have an enquiry.`,
      '',
      details.name ? `*Name:* ${details.name}` : '',
      details.phone ? `*Phone:* ${details.phone}` : '',
      details.place ? `*Place:* ${details.place}` : '',
      details.message ? `*Message:* ${details.message}` : '',
    ].filter(Boolean);
    this.dispatch(lines.join('\n'));
  }

  // --- message building ---------------------------------------------

  private genericOrderIntro(): string {
    return `Hi 👋, I'd like to place an order from *${BUSINESS.name}* 🌿.`;
  }

  private buildOrderMessage(items: CartItem[], subtotal: number): string {
    const lines = items.map(
      (i, idx) =>
        `${idx + 1}. *${i.product.name}* (${i.product.size}) × *${i.qty}* — *${formatPrice(
          i.product.price * i.qty,
        )}*`,
    );
    return [
      `Hi *${BUSINESS.name}* 🌿, I'd like to place an order:`,
      '',
      ...lines,
      '',
      `*Subtotal: ${formatPrice(subtotal)}*`,
      '',
      'Please confirm availability and delivery. Thank you! 🙏',
    ].join('\n');
  }

  // --- channel (swap this out to change how orders are sent) --------

  private dispatch(message: string): void {
    // api.whatsapp.com/send is used instead of the wa.me short-link: on
    // Windows, wa.me's redirect hop into the WhatsApp Desktop protocol
    // handler can mis-decode multi-byte UTF-8 (emoji show up as "?").
    // Hitting the API endpoint directly avoids that extra redirect.
    const url = `https://api.whatsapp.com/send?phone=${BUSINESS.whatsappPhone}&text=${encodeURIComponent(
      message,
    )}`;
    window.open(url, '_blank', 'noopener');
  }
}

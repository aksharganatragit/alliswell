import { ChangeDetectionStrategy, Component, HostListener, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../icon/icon.component';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { UiService } from '../../services/ui.service';
import { formatPrice } from '../../models/product.model';

@Component({
  selector: 'app-cart-drawer',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, IconComponent],
  templateUrl: './cart-drawer.component.html',
  styleUrl: './cart-drawer.component.scss',
})
export class CartDrawerComponent {
  private readonly cart = inject(CartService);
  private readonly orders = inject(OrderService);
  private readonly ui = inject(UiService);

  readonly open = this.ui.cartOpen;
  readonly items = this.cart.items;
  readonly subtotal = this.cart.subtotal;
  readonly count = this.cart.count;
  readonly isEmpty = this.cart.isEmpty;
  readonly formatPrice = formatPrice;

  close(): void {
    this.ui.closeCart();
  }
  inc(id: string): void {
    this.cart.increment(id);
  }
  dec(id: string): void {
    this.cart.decrement(id);
  }
  remove(id: string): void {
    this.cart.remove(id);
  }
  clear(): void {
    this.cart.clear();
  }

  /** All order CTAs route through OrderService (WhatsApp for now). */
  sendOrder(): void {
    this.orders.orderCart();
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.open()) this.close();
  }
}

import { ChangeDetectionStrategy, Component, Input, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../icon/icon.component';
import { Product, formatPrice } from '../../models/product.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, IconComponent],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  @Input({ required: true }) product!: Product;

  private readonly cart = inject(CartService);
  readonly formatPrice = formatPrice;

  /** Live quantity of this product in the cart — drives Add ↔ stepper. */
  readonly qty = computed(
    () => this.cart.items().find((i) => i.product.id === this.product.id)?.qty ?? 0,
  );

  add(): void {
    this.cart.add(this.product);
  }
  inc(): void {
    this.cart.increment(this.product.id);
  }
  dec(): void {
    this.cart.decrement(this.product.id);
  }
}

import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { IconComponent } from '../../components/icon/icon.component';
import { CarouselComponent } from '../../components/carousel/carousel.component';
import { getProductBySlug, CATEGORY_LABELS } from '../../data/products';
import { formatPrice } from '../../models/product.model';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, IconComponent, CarouselComponent],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly cart = inject(CartService);
  private readonly orders = inject(OrderService);

  readonly formatPrice = formatPrice;
  readonly categoryLabels = CATEGORY_LABELS;

  readonly product = toSignal(
    this.route.paramMap.pipe(map((pm) => getProductBySlug(pm.get('slug') ?? ''))),
  );

  readonly openPanel = signal<string>('description');

  /** Live quantity of this product in the cart. */
  readonly qty = computed(() => {
    const p = this.product();
    if (!p) return 0;
    return this.cart.items().find((i) => i.product.id === p.id)?.qty ?? 0;
  });

  readonly panels = computed(() => {
    const p = this.product();
    if (!p) return [];
    return [
      { id: 'description', label: 'Description', body: p.description },
      { id: 'dosage', label: 'Dosage & usage', body: p.dosage },
      { id: 'ingredients', label: 'Ingredients', body: p.ingredients },
      { id: 'warnings', label: 'Warnings', body: p.warnings },
    ];
  });

  togglePanel(id: string): void {
    this.openPanel.update((cur) => (cur === id ? '' : id));
  }

  add(): void {
    const p = this.product();
    if (p) this.cart.add(p);
  }
  inc(): void {
    const p = this.product();
    if (p) this.cart.increment(p.id);
  }
  dec(): void {
    const p = this.product();
    if (p) this.cart.decrement(p.id);
  }

  order(): void {
    const p = this.product();
    if (p) this.orders.orderProduct(p);
  }
}

import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { IconComponent } from '../../components/icon/icon.component';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { PRODUCTS } from '../../data/products';
import { Product } from '../../models/product.model';

type SortKey = 'featured' | 'price-asc' | 'price-desc' | 'name-asc' | 'best-seller';

@Component({
  selector: 'app-shop',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent, ProductCardComponent],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
})
export class ShopComponent {
  readonly sortKey = signal<SortKey>('featured');

  readonly sortOptions: { value: SortKey; label: string }[] = [
    { value: 'featured', label: 'Featured' },
    { value: 'best-seller', label: 'Best sellers first' },
    { value: 'price-asc', label: 'Price: low to high' },
    { value: 'price-desc', label: 'Price: high to low' },
    { value: 'name-asc', label: 'Name: A to Z' },
  ];

  /** Sorted view of the catalog — copy first so the source order is untouched. */
  readonly products = computed<Product[]>(() => {
    const list = [...PRODUCTS];
    switch (this.sortKey()) {
      case 'price-asc':
        return list.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return list.sort((a, b) => b.price - a.price);
      case 'name-asc':
        return list.sort((a, b) => a.name.localeCompare(b.name));
      case 'best-seller':
        return list.sort((a, b) => Number(b.bestSeller ?? false) - Number(a.bestSeller ?? false));
      default:
        return list;
    }
  });

  readonly count = computed(() => this.products().length);

  onSort(value: string): void {
    this.sortKey.set(value as SortKey);
  }
}

import { ChangeDetectionStrategy, Component, HostListener, computed, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IconComponent } from '../icon/icon.component';
import { BrandLogoComponent } from '../brand-logo/brand-logo.component';
import { CartService } from '../../services/cart.service';
import { UiService } from '../../services/ui.service';
import { PRODUCTS } from '../../data/products';
import { formatPrice } from '../../models/product.model';

interface NavLink {
  label: string;
  path: string;
}

@Component({
  selector: 'app-nav',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive, IconComponent, BrandLogoComponent],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent {
  private readonly cart = inject(CartService);
  private readonly ui = inject(UiService);

  readonly count = this.cart.count;

  readonly menuOpen = signal(false);
  readonly searchOpen = signal(false);
  readonly query = signal('');
  /** True once the page is scrolled — drives the solid header background. */
  readonly scrolled = signal(false);

  readonly links: NavLink[] = [
    { label: 'Home', path: '/' },
    { label: 'Shop', path: '/shop' },
    { label: 'How it works', path: '/how-it-works' },
    { label: 'About', path: '/about' },
    { label: 'FAQ', path: '/faq' },
    { label: 'Contact', path: '/contact' },
  ];

  /** Live product search results for the search overlay. */
  readonly results = computed(() => {
    const q = this.query().trim().toLowerCase();
    if (!q) return [];
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q),
    );
  });

  readonly formatPrice = formatPrice;

  toggleMenu(): void {
    this.menuOpen.update((v) => !v);
    if (this.menuOpen()) this.searchOpen.set(false);
  }
  closeMenu(): void {
    this.menuOpen.set(false);
  }

  toggleSearch(): void {
    this.searchOpen.update((v) => !v);
    if (this.searchOpen()) this.menuOpen.set(false);
    else this.query.set('');
  }
  closeSearch(): void {
    this.searchOpen.set(false);
    this.query.set('');
  }

  onSearchInput(value: string): void {
    this.query.set(value);
  }

  openCart(): void {
    this.ui.openCart();
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.closeMenu();
    this.closeSearch();
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled.set(window.scrollY > 8);
  }
}

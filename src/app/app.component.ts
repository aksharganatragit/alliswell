import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LeafBackgroundComponent } from './components/leaf-background/leaf-background.component';
import { NavComponent } from './components/nav/nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { WhatsappFabComponent } from './components/whatsapp-fab/whatsapp-fab.component';
import { CartDrawerComponent } from './components/cart-drawer/cart-drawer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    LeafBackgroundComponent,
    NavComponent,
    FooterComponent,
    WhatsappFabComponent,
    CartDrawerComponent,
  ],
  template: `
    <app-leaf-background></app-leaf-background>
    <div class="app-shell">
      <app-nav></app-nav>
      <main class="app-main">
        <router-outlet></router-outlet>
      </main>
      <app-footer></app-footer>
    </div>
    <app-whatsapp-fab></app-whatsapp-fab>
    <app-cart-drawer></app-cart-drawer>
  `,
  styles: [
    `
      .app-shell {
        position: relative;
        z-index: 1;
        display: flex;
        flex-direction: column;
        min-height: 100vh;
      }
      .app-main {
        flex: 1;
      }
    `,
  ],
})
export class AppComponent {}

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

/**
 * Lightweight inline outline-icon set (Tabler / Lucide style).
 * No external icon dependency — each glyph is a 24×24 stroked path.
 * Colour follows `currentColor`; size via the `size` input.
 */
@Component({
  selector: 'app-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg
      [attr.width]="size"
      [attr.height]="size"
      viewBox="0 0 24 24"
      [attr.fill]="filled ? 'currentColor' : 'none'"
      stroke="currentColor"
      [attr.stroke-width]="strokeWidth"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      @switch (name) {
        @case ('leaf') {
          <path d="M4 20 C4 12 9 5 20 4 C19 15 13 20 5 20" />
          <path d="M4 20 C7 15 11 12 16 10" />
        }
        @case ('sparkles') {
          <path d="M12 3 l1.6 4.4 4.4 1.6 -4.4 1.6 -1.6 4.4 -1.6 -4.4 -4.4 -1.6 4.4 -1.6 z" />
          <path d="M18 14 l.8 2 2 .8 -2 .8 -.8 2 -.8 -2 -2 -.8 2 -.8 z" />
        }
        @case ('receipt') {
          <path d="M6 3 h12 v18 l-2.2 -1.4 -2 1.4 -2 -1.4 -2 1.4 -2 -1.4 L6 21 z" />
          <path d="M9 8 h6" /><path d="M9 12 h6" /><path d="M9 16 h4" />
        }
        @case ('whatsapp') {
          <path d="M4 20 l1.4 -4.2 A8 8 0 1 1 8.5 18.7 z" />
          <path d="M9 9 c-.5 1.5 1 3.5 2.4 4.8 1.4 1.3 3.2 2.4 4.6 1.7 .6 -.3 .9 -1 .7 -1.6 l-1.6 -1 c-.4 -.2 -.8 0 -1 .3 l-.4 .5 c-.9 -.4 -2 -1.4 -2.4 -2.3 l.5 -.5 c.3 -.2 .4 -.6 .2 -1 l-.9 -1.7 c-.4 -.3 -1.1 -.1 -1.6 .6 z" />
        }
        @case ('search') {
          <circle cx="11" cy="11" r="7" /><path d="M20 20 l-3.5 -3.5" />
        }
        @case ('cart') {
          <path d="M6 7 h13 l-1.3 8 a2 2 0 0 1 -2 1.7 H9.3 a2 2 0 0 1 -2 -1.7 L6 4 H4" />
          <circle cx="9.5" cy="20" r="1.2" /><circle cx="16.5" cy="20" r="1.2" />
        }
        @case ('menu') {
          <path d="M4 7 h16" /><path d="M4 12 h16" /><path d="M4 17 h16" />
        }
        @case ('close') {
          <path d="M6 6 l12 12" /><path d="M18 6 l-12 12" />
        }
        @case ('shield-check') {
          <path d="M12 3 l7 2.5 V11 c0 5 -3.4 8 -7 9.5 C8.4 19 5 16 5 11 V5.5 z" />
          <path d="M9 12 l2 2 4 -4" />
        }
        @case ('truck') {
          <path d="M3 6 h11 v9 H3 z" /><path d="M14 9 h4 l3 3 v3 h-7 z" />
          <circle cx="7" cy="18" r="1.6" /><circle cx="17" cy="18" r="1.6" />
        }
        @case ('heart') {
          <path d="M12 20 C7 16 3 13 3 8.5 A3.8 3.8 0 0 1 12 6 A3.8 3.8 0 0 1 21 8.5 C21 13 17 16 12 20 z" />
        }
        @case ('coins') {
          <ellipse cx="9" cy="7" rx="5.5" ry="2.6" />
          <path d="M3.5 7 v4 c0 1.4 2.5 2.6 5.5 2.6 s5.5 -1.2 5.5 -2.6 V7" />
          <ellipse cx="15" cy="15" rx="5.5" ry="2.6" />
          <path d="M9.5 15 v2 c0 1.4 2.5 2.6 5.5 2.6 s5.5 -1.2 5.5 -2.6 v-4" />
        }
        @case ('chevron-left') { <path d="M15 5 l-7 7 7 7" /> }
        @case ('chevron-right') { <path d="M9 5 l7 7 -7 7" /> }
        @case ('chevron-down') { <path d="M6 9 l6 6 6 -6" /> }
        @case ('plus') { <path d="M12 5 v14" /><path d="M5 12 h14" /> }
        @case ('minus') { <path d="M5 12 h14" /> }
        @case ('trash') {
          <path d="M5 7 h14" /><path d="M9 7 V5 h6 v2" />
          <path d="M7 7 l1 13 h8 l1 -13" /><path d="M10 11 v6" /><path d="M14 11 v6" />
        }
        @case ('phone') {
          <path d="M5 4 h3.5 l1.5 4 -2 1.5 a11 11 0 0 0 5 5 l1.5 -2 4 1.5 V19 a2 2 0 0 1 -2 2 A15 15 0 0 1 3 6 a2 2 0 0 1 2 -2 z" />
        }
        @case ('map-pin') {
          <path d="M12 21 c4 -4.5 7 -7.5 7 -11 a7 7 0 0 0 -14 0 c0 3.5 3 6.5 7 11 z" />
          <circle cx="12" cy="10" r="2.5" />
        }
        @case ('arrow-right') { <path d="M4 12 h15" /><path d="M13 6 l6 6 -6 6" /> }
        @case ('send') {
          <path d="M4 12 L20 4 l-6 16 -3 -6 -7 -2 z" />
        }
        @case ('mail') {
          <rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7 l9 6 9 -6" />
        }
        @case ('clock') {
          <circle cx="12" cy="12" r="8" /><path d="M12 8 v4 l3 2" />
        }
        @case ('star') {
          <path d="M12 4 l2.3 5 5.3 .5 -4 3.6 1.2 5.2 -4.8 -2.8 -4.8 2.8 1.2 -5.2 -4 -3.6 5.3 -.5 z" />
        }
        @case ('check') { <path d="M5 12 l4 4 10 -10" /> }
        @case ('info') {
          <circle cx="12" cy="12" r="8" /><path d="M12 11 v5" /><path d="M12 8 h.01" />
        }
        @case ('help') {
          <circle cx="12" cy="12" r="8" />
          <path d="M9.5 9.5 a2.5 2.5 0 0 1 4 2 c0 1.5 -1.8 1.8 -1.8 3" /><path d="M12 17 h.01" />
        }
        @case ('sprout') {
          <path d="M12 21 V11" />
          <path d="M12 13 C12 9 15 7 19 7 C19 11 16 13 12 13 z" />
          <path d="M12 15 C12 12 9 10 5 10 C5 13.5 8 15 12 15 z" />
        }
        @case ('flower') {
          <circle cx="12" cy="12" r="2.4" />
          <path d="M12 5 a2.4 2.4 0 0 1 0 4.8" /><path d="M12 19 a2.4 2.4 0 0 1 0 -4.8" />
          <path d="M5 12 a2.4 2.4 0 0 1 4.8 0" /><path d="M19 12 a2.4 2.4 0 0 1 -4.8 0" />
        }
        @case ('bottle') {
          <path d="M10 3 h4 v2.5 l1.4 2.3 a3 3 0 0 1 .6 1.8 V19 a2 2 0 0 1 -2 2 H10 a2 2 0 0 1 -2 -2 V9.6 a3 3 0 0 1 .6 -1.8 L10 5.5 z" />
          <path d="M8 13 h8" />
        }
        @case ('jar') {
          <path d="M7 3 h10" /><path d="M8 3 v3" /><path d="M16 3 v3" />
          <path d="M6 8 a2 2 0 0 1 2 -2 h8 a2 2 0 0 1 2 2 v11 a2 2 0 0 1 -2 2 H8 a2 2 0 0 1 -2 -2 z" />
          <path d="M9 12 h6" />
        }
        @case ('capsule') {
          <path d="M7 17 L17 7 a3.5 3.5 0 0 0 -5 -5 L2 12 a3.5 3.5 0 0 0 5 5 z" transform="translate(2 2)" />
          <path d="M9 15 L14 10" transform="translate(2 2)" />
        }
        @default { <circle cx="12" cy="12" r="8" /> }
      }
    </svg>
  `,
  styles: [':host{display:inline-flex;line-height:0}'],
})
export class IconComponent {
  @Input() name = '';
  @Input() size: number | string = 20;
  @Input() strokeWidth: number | string = 1.7;
  /** Solid fill instead of outline — used for filled rating stars. */
  @Input() filled = false;
}

import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Botanical watermark that tiles behind every page.
 *
 * Built on the brief's leaf motif, enriched with flowers, herb sprigs and
 * berries (WhatsApp-doodle style) per the chosen direction. Deep green
 * (#2F5A43) strokes at ~7% opacity, tile rotated ~6°. Kept faint so it never
 * competes with text; cards/tickets sit on the near-white surface for
 * legibility. Absolutely positioned at z-index 0 — content wrapper sits above.
 */
@Component({
  selector: 'app-leaf-background',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 520 520"
    >
      <defs>
        <pattern
          id="aiw-botanicals"
          width="260"
          height="260"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(6)"
        >
          <g
            stroke="#2F5A43"
            stroke-width="1.5"
            fill="none"
            opacity="0.07"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <!-- veined leaf (from the brief) -->
            <path d="M34 22 C20 34, 20 60, 34 72 C48 60, 48 34, 34 22 Z" />
            <path d="M34 26 L34 68" />
            <path d="M34 40 C40 36, 44 36, 47 34" />
            <path d="M34 52 C28 48, 24 48, 21 46" />

            <!-- five-petal flower -->
            <g transform="translate(196 44)">
              <circle cx="0" cy="0" r="4.5" />
              <path d="M0 -6 C6 -12 14 -8 10 0" />
              <path d="M8 3 C16 3 17 12 9 12" />
              <path d="M4 11 C2 19 -6 19 -6 11" />
              <path d="M-8 6 C-16 2 -13 -6 -6 -4" />
              <path d="M-6 -6 C-9 -13 0 -15 0 -8" />
            </g>

            <!-- herb sprig (rosemary-like) -->
            <g transform="translate(120 120)">
              <path d="M0 40 C2 24 6 10 14 -6" />
              <path d="M4 30 L-4 26" /><path d="M6 22 L-2 18" />
              <path d="M8 14 L0 10" /><path d="M11 6 L3 3" />
              <path d="M5 30 L13 33" /><path d="M7 22 L15 24" />
              <path d="M9 14 L17 15" />
            </g>

            <!-- small three-leaf sprig -->
            <g transform="translate(70 176)">
              <path d="M0 22 L0 4" />
              <path d="M0 12 C-9 10 -12 2 -10 -4 C-3 -3 1 3 0 12 Z" />
              <path d="M0 8 C9 6 12 -2 10 -8 C3 -7 -1 -1 0 8 Z" />
            </g>

            <!-- berry cluster -->
            <g transform="translate(214 196)">
              <path d="M0 -14 L0 6" />
              <circle cx="0" cy="8" r="4" />
              <circle cx="-7" cy="2" r="3.4" />
              <circle cx="7" cy="2" r="3.4" />
              <path d="M0 -14 C-6 -18 -12 -16 -13 -11" />
              <path d="M0 -14 C6 -18 12 -16 13 -11" />
            </g>

            <!-- fern frond -->
            <g transform="translate(180 118)">
              <path d="M-14 22 C-6 12 2 2 10 -12" />
              <path d="M-9 15 C-13 12 -15 8 -15 4" />
              <path d="M-4 9 C-8 6 -10 2 -10 -2" />
              <path d="M1 3 C-3 0 -5 -4 -5 -8" />
            </g>

            <!-- second veined leaf, tilted -->
            <g transform="translate(46 214) rotate(-24)">
              <path d="M0 0 C-12 10, -12 32, 0 42 C12 32, 12 10, 0 0 Z" />
              <path d="M0 4 L0 38" />
              <path d="M0 16 C5 13 8 13 11 11" />
              <path d="M0 26 C-5 23 -8 23 -11 21" />
            </g>
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#aiw-botanicals)" />
    </svg>
  `,
  styles: [
    `
      :host {
        position: fixed;
        inset: 0;
        z-index: 0;
        pointer-events: none;
      }
      svg {
        width: 100%;
        height: 100%;
      }
    `,
  ],
})
export class LeafBackgroundComponent {}

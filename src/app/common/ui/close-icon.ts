import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'visp-close-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="gray">
        <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
    </svg>
  `,
  styles: [
    `
      :host {
        display: flex;
        align-items: center;
        justify-content: center;
        width: var(--app-icon-size, 24px);
        height: var(--app-icon-size, 24px);
        cursor:pointer;
      }

    `,
  ],
})
export class CloseIcon {}

import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'visp-menu-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 -960 960 960"  fill="white">
        <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/>
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
export class MenuIcon {}

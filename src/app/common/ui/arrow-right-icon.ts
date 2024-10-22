import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'visp-arrow-right-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#fff">
      <path d="m560-240-56-58 142-142H160v-80h486L504-662l56-58 240 240-240 240Z"/>
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
      }

    `,
  ],
})
export class ArrowRightIcon {}

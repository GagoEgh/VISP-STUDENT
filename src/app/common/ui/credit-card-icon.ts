import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'credit-card-icon',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"  fill="white">
            <path d="M880-720v480q0 33-23.5 56.5T800-160H160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720Zm-720 80h640v-80H160v80Zm0 160v240h640v-240H160Zm0 240v-480 480Z"/>
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

            svg circle,
            svg path {
                stroke: var(--app-icon-color, var(--color-white));
            }
        `
    ]
})
export class CreditCardIcon {}

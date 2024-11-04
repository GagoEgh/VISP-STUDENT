import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'user-icon',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="10" r="3" stroke-linecap="round" />
            <circle cx="12" cy="12" r="9" />
            <path
                d="M18 18.7059C17.6461 17.6427 16.8662 16.7033 15.7814 16.0332C14.6966 15.3632 13.3674 15 12 15C10.6326 15 9.30341 15.3632 8.21858 16.0332C7.13375 16.7033 6.35391 17.6427 6 18.7059"
                stroke-linecap="round"
            />
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
export class UserIcon {}

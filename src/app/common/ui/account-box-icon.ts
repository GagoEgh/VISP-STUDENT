import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'account-box-icon',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="white">
            <path d="M200-246q54-53 125.5-83.5T480-360q83 0 154.5 30.5T760-246v-514H200v514Zm280-194q58 0 99-41t41-99q0-58-41-99t-99-41q-58 0-99 41t-41 99q0 58 41 99t99 41ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm69-80h422q-44-39-99.5-59.5T480-280q-56 0-112.5 20.5T269-200Zm211-320q-25 0-42.5-17.5T420-580q0-25 17.5-42.5T480-640q25 0 42.5 17.5T540-580q0 25-17.5 42.5T480-520Zm0 17Z"/>
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
export class AccountBoxIcon {}
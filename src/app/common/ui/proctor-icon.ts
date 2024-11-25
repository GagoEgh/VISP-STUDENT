import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'proctor-icon',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="white">
            <path d="M480-80q-139-35-229.5-159.5T160-516v-244l320-120 320 120v244q0 85-29 163.5T688-214L560-342q-18 11-38.5 16.5T480-320q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 22-5.5 42.5T618-398l60 60q20-41 31-86t11-92v-189l-240-90-240 90v189q0 121 68 220t172 132q26-8 49.5-20.5T576-214l56 56q-33 27-71.5 47T480-80Zm0-320q33 0 56.5-23.5T560-480q0-33-23.5-56.5T480-560q-33 0-56.5 23.5T400-480q0 33 23.5 56.5T480-400Zm8-77Z"/>
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
export class ProctorIcon {}
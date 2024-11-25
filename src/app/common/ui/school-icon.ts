import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'school-icon',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
     
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="white">
        <path d="M480-120 200-272v-240L40-600l440-240 440 240v320h-80v-276l-80 44v240L480-120Zm0-332 274-148-274-148-274 148 274 148Zm0 241 200-108v-151L480-360 280-470v151l200 108Zm0-241Zm0 90Zm0 0Z"/>
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
export class SchoolIcon {}
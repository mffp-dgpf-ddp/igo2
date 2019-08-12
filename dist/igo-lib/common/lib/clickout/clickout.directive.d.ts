import { ElementRef, EventEmitter } from '@angular/core';
export declare class ClickoutDirective {
    private el;
    clickout: EventEmitter<MouseEvent>;
    handleMouseClick(event: MouseEvent, target: HTMLElement): void;
    constructor(el: ElementRef);
}

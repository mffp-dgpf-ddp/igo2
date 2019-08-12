import { EventEmitter, ElementRef, Renderer2 } from '@angular/core';
export declare class CollapseDirective {
    private renderer;
    private el;
    target: Element;
    private _target;
    collapsed: boolean;
    private _collapsed;
    toggle: EventEmitter<boolean>;
    click(): void;
    constructor(renderer: Renderer2, el: ElementRef);
    private collapseTarget;
    private expandTarget;
}

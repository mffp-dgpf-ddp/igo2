import { ElementRef, EventEmitter, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
export declare class ContextMenuDirective {
    overlay: Overlay;
    viewContainerRef: ViewContainerRef;
    private elementRef;
    overlayRef: OverlayRef | null;
    sub: Subscription;
    menuContext: TemplateRef<any>;
    menuPosition: EventEmitter<{
        x: number;
        y: number;
    }>;
    constructor(overlay: Overlay, viewContainerRef: ViewContainerRef, elementRef: ElementRef);
    onContextMenu({ x, y }: MouseEvent): void;
    close(): void;
}

import { Renderer2 } from '@angular/core';
import { MatSidenav } from '@angular/material';
/**
 * <igoSidenavShim> directive.
 *
 * This directive prevents a material sidenav with mode="side"
 * from focusing an element after it's closed
 */
export declare class SidenavShimDirective {
    private renderer;
    private focusedElement;
    private blurElement;
    onOpen(): void;
    onCloseStart(): void;
    onClose(): void;
    constructor(component: MatSidenav, renderer: Renderer2);
}

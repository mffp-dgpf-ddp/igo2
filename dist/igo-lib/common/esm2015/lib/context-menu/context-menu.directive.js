/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, TemplateRef, ViewContainerRef } from '@angular/core';
import { TemplatePortal } from '@angular/cdk/portal';
import { fromEvent } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { Overlay } from '@angular/cdk/overlay';
export class ContextMenuDirective {
    /**
     * @param {?} overlay
     * @param {?} viewContainerRef
     * @param {?} elementRef
     */
    constructor(overlay, viewContainerRef, elementRef) {
        this.overlay = overlay;
        this.viewContainerRef = viewContainerRef;
        this.elementRef = elementRef;
        this.menuPosition = new EventEmitter();
    }
    /**
     * @param {?} __0
     * @return {?}
     */
    onContextMenu({ x, y }) {
        this.close();
        event.preventDefault();
        this.menuPosition.emit({ x, y });
        this.overlayRef = null;
        /** @type {?} */
        const positionStrategy = this.overlay
            .position()
            .flexibleConnectedTo({ x, y })
            .withPositions([
            {
                originX: 'end',
                originY: 'bottom',
                overlayX: 'start',
                overlayY: 'top'
            }
        ]);
        this.overlayRef = this.overlay.create({
            positionStrategy,
            scrollStrategy: this.overlay.scrollStrategies.close()
        });
        this.overlayRef.attach(new TemplatePortal(this.menuContext, this.viewContainerRef, {
            $implicit: undefined
        }));
        this.sub = fromEvent(document, 'click')
            .pipe(filter((/**
         * @param {?} event
         * @return {?}
         */
        event => {
            /** @type {?} */
            const clickTarget = (/** @type {?} */ (event.target));
            this.close();
            return (!!this.overlayRef &&
                !this.overlayRef.overlayElement.contains(clickTarget));
        })), take(1))
            .subscribe((/**
         * @return {?}
         */
        () => this.close()));
        this.sub = fromEvent(document, 'contextmenu')
            .pipe(filter((/**
         * @param {?} event
         * @return {?}
         */
        event => {
            /** @type {?} */
            const clickTarget = (/** @type {?} */ (event.target));
            if (clickTarget &&
                !this.elementRef.nativeElement.contains(clickTarget) &&
                !this.overlayRef.overlayElement.contains(clickTarget)) {
                return true;
            }
            else {
                event.preventDefault();
            }
        })), take(1))
            .subscribe((/**
         * @return {?}
         */
        () => this.close()));
    }
    /**
     * @return {?}
     */
    close() {
        if (this.overlayRef) {
            this.overlayRef.dispose();
            this.overlayRef = null;
        }
    }
}
ContextMenuDirective.decorators = [
    { type: Directive, args: [{
                selector: '[igoContextMenu]'
            },] }
];
/** @nocollapse */
ContextMenuDirective.ctorParameters = () => [
    { type: Overlay },
    { type: ViewContainerRef },
    { type: ElementRef }
];
ContextMenuDirective.propDecorators = {
    menuContext: [{ type: Input, args: ['igoContextMenu',] }],
    menuPosition: [{ type: Output }],
    onContextMenu: [{ type: HostListener, args: ['contextmenu', ['$event'],] }]
};
if (false) {
    /** @type {?} */
    ContextMenuDirective.prototype.overlayRef;
    /** @type {?} */
    ContextMenuDirective.prototype.sub;
    /** @type {?} */
    ContextMenuDirective.prototype.menuContext;
    /** @type {?} */
    ContextMenuDirective.prototype.menuPosition;
    /** @type {?} */
    ContextMenuDirective.prototype.overlay;
    /** @type {?} */
    ContextMenuDirective.prototype.viewContainerRef;
    /**
     * @type {?}
     * @private
     */
    ContextMenuDirective.prototype.elementRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC1tZW51LmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2NvbW1vbi8iLCJzb3VyY2VzIjpbImxpYi9jb250ZXh0LW1lbnUvY29udGV4dC1tZW51LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLFlBQVksRUFDWixLQUFLLEVBQ0wsTUFBTSxFQUNOLFdBQVcsRUFDWCxnQkFBZ0IsRUFDakIsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxTQUFTLEVBQWdCLE1BQU0sTUFBTSxDQUFDO0FBQy9DLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDOUMsT0FBTyxFQUFFLE9BQU8sRUFBYyxNQUFNLHNCQUFzQixDQUFDO0FBSzNELE1BQU0sT0FBTyxvQkFBb0I7Ozs7OztJQU8vQixZQUNTLE9BQWdCLEVBQ2hCLGdCQUFrQyxFQUNqQyxVQUFzQjtRQUZ2QixZQUFPLEdBQVAsT0FBTyxDQUFTO1FBQ2hCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDakMsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUx0QixpQkFBWSxHQUFHLElBQUksWUFBWSxFQUE0QixDQUFDO0lBTW5FLENBQUM7Ozs7O0lBR0csYUFBYSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBYztRQUN2QyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDYixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNqQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQzs7Y0FDakIsZ0JBQWdCLEdBQUcsSUFBSSxD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ZixcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgSG9zdExpc3RlbmVyLFxyXG4gIElucHV0LFxyXG4gIE91dHB1dCxcclxuICBUZW1wbGF0ZVJlZixcclxuICBWaWV3Q29udGFpbmVyUmVmXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBUZW1wbGF0ZVBvcnRhbCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wb3J0YWwnO1xyXG5pbXBvcnQgeyBmcm9tRXZlbnQsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBmaWx0ZXIsIHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IE92ZXJsYXksIE92ZXJsYXlSZWYgfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ1tpZ29Db250ZXh0TWVudV0nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDb250ZXh0TWVudURpcmVjdGl2ZSB7XHJcbiAgb3ZlcmxheVJlZjogT3ZlcmxheVJlZiB8IG51bGw7XHJcbiAgc3ViOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIEBJbnB1dCgnaWdvQ29udGV4dE1lbnUnKSBtZW51Q29udGV4dDogVGVtcGxhdGVSZWY8YW55PjtcclxuICBAT3V0cHV0KCkgbWVudVBvc2l0aW9uID0gbmV3IEV2ZW50RW1pdHRlcjx7IHg6IG51bWJlcjsgeTogbnVtYmVyIH0+KCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHVibGljIG92ZXJsYXk6IE92ZXJsYXksXHJcbiAgICBwdWJsaWMgdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZixcclxuICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZlxyXG4gICkge31cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignY29udGV4dG1lbnUnLCBbJyRldmVudCddKVxyXG4gIHB1YmxpYyBvbkNvbnRleHRNZW51KHsgeCwgeSB9OiBNb3VzZUV2ZW50KTogdm9pZCB7XHJcbiAgICB0aGlzLmNsb3NlKCk7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgdGhpcy5tZW51UG9zaXRpb24uZW1pdCh7IHgsIHkgfSk7XHJcbiAgICB0aGlzLm92ZXJsYXlSZWYgPSBudWxsO1xyXG4gICAgY29uc3QgcG9zaXRpb25TdHJhdGVneSA9IHRoaXMub3ZlcmxheVxyXG4gICAgICAucG9zaXRpb24oKVxyXG4gICAgICAuZmxleGlibGVDb25uZWN0ZWRUbyh7IHgsIHkgfSlcclxuICAgICAgLndpdGhQb3NpdGlvbnMoW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIG9yaWdpblg6ICdlbmQnLFxyXG4gICAgICAgICAgb3JpZ2luWTogJ2JvdHRvbScsXHJcbiAgICAgICAgICBvdmVybGF5WDogJ3N0YXJ0JyxcclxuICAgICAgICAgIG92ZXJsYXlZOiAndG9wJ1xyXG4gICAgICAgIH1cclxuICAgICAgXSk7XHJcbiAgICB0aGlzLm92ZXJsYXlSZWYgPSB0aGlzLm92ZXJsYXkuY3JlYXRlKHtcclxuICAgICAgcG9zaXRpb25TdHJhdGVneSxcclxuICAgICAgc2Nyb2xsU3RyYXRlZ3k6IHRoaXMub3ZlcmxheS5zY3JvbGxTdHJhdGVnaWVzLmNsb3NlKClcclxuICAgIH0pO1xyXG4gICAgdGhpcy5vdmVybGF5UmVmLmF0dGFjaChcclxuICAgICAgbmV3IFRlbXBsYXRlUG9ydGFsKHRoaXMubWVudUNvbnRleHQsIHRoaXMudmlld0NvbnRhaW5lclJlZiwge1xyXG4gICAgICAgICRpbXBsaWNpdDogdW5kZWZpbmVkXHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG5cclxuICAgIHRoaXMuc3ViID0gZnJvbUV2ZW50PE1vdXNlRXZlbnQ+KGRvY3VtZW50LCAnY2xpY2snKVxyXG4gICAgICAucGlwZShcclxuICAgICAgICBmaWx0ZXIoZXZlbnQgPT4ge1xyXG4gICAgICAgICAgY29uc3QgY2xpY2tUYXJnZXQgPSBldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICAgICAgICB0aGlzLmNsb3NlKCk7XHJcbiAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAhIXRoaXMub3ZlcmxheVJlZiAmJlxyXG4gICAgICAgICAgICAhdGhpcy5vdmVybGF5UmVmLm92ZXJsYXlFbGVtZW50LmNvbnRhaW5zKGNsaWNrVGFyZ2V0KVxyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9KSxcclxuICAgICAgICB0YWtlKDEpXHJcbiAgICAgIClcclxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLmNsb3NlKCkpO1xyXG5cclxuICAgIHRoaXMuc3ViID0gZnJvbUV2ZW50PE1vdXNlRXZlbnQ+KGRvY3VtZW50LCAnY29udGV4dG1lbnUnKVxyXG4gICAgICAucGlwZShcclxuICAgICAgICBmaWx0ZXIoZXZlbnQgPT4ge1xyXG4gICAgICAgICAgY29uc3QgY2xpY2tUYXJnZXQgPSBldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgIGNsaWNrVGFyZ2V0ICYmXHJcbiAgICAgICAgICAgICF0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jb250YWlucyhjbGlja1RhcmdldCkgJiZcclxuICAgICAgICAgICAgIXRoaXMub3ZlcmxheVJlZi5vdmVybGF5RWxlbWVudC5jb250YWlucyhjbGlja1RhcmdldClcclxuICAgICAgICAgICkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgdGFrZSgxKVxyXG4gICAgICApXHJcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5jbG9zZSgpKTtcclxuICB9XHJcbiAgY2xvc2UoKSB7XHJcbiAgICBpZiAodGhpcy5vdmVybGF5UmVmKSB7XHJcbiAgICAgIHRoaXMub3ZlcmxheVJlZi5kaXNwb3NlKCk7XHJcbiAgICAgIHRoaXMub3ZlcmxheVJlZiA9IG51bGw7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==
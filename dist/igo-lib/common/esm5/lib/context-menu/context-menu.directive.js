/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, TemplateRef, ViewContainerRef } from '@angular/core';
import { TemplatePortal } from '@angular/cdk/portal';
import { fromEvent } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { Overlay } from '@angular/cdk/overlay';
var ContextMenuDirective = /** @class */ (function () {
    function ContextMenuDirective(overlay, viewContainerRef, elementRef) {
        this.overlay = overlay;
        this.viewContainerRef = viewContainerRef;
        this.elementRef = elementRef;
        this.menuPosition = new EventEmitter();
    }
    /**
     * @param {?} __0
     * @return {?}
     */
    ContextMenuDirective.prototype.onContextMenu = /**
     * @param {?} __0
     * @return {?}
     */
    function (_a) {
        var _this = this;
        var x = _a.x, y = _a.y;
        this.close();
        event.preventDefault();
        this.menuPosition.emit({ x: x, y: y });
        this.overlayRef = null;
        /** @type {?} */
        var positionStrategy = this.overlay
            .position()
            .flexibleConnectedTo({ x: x, y: y })
            .withPositions([
            {
                originX: 'end',
                originY: 'bottom',
                overlayX: 'start',
                overlayY: 'top'
            }
        ]);
        this.overlayRef = this.overlay.create({
            positionStrategy: positionStrategy,
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
        function (event) {
            /** @type {?} */
            var clickTarget = (/** @type {?} */ (event.target));
            _this.close();
            return (!!_this.overlayRef &&
                !_this.overlayRef.overlayElement.contains(clickTarget));
        })), take(1))
            .subscribe((/**
         * @return {?}
         */
        function () { return _this.close(); }));
        this.sub = fromEvent(document, 'contextmenu')
            .pipe(filter((/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            /** @type {?} */
            var clickTarget = (/** @type {?} */ (event.target));
            if (clickTarget &&
                !_this.elementRef.nativeElement.contains(clickTarget) &&
                !_this.overlayRef.overlayElement.contains(clickTarget)) {
                return true;
            }
            else {
                event.preventDefault();
            }
        })), take(1))
            .subscribe((/**
         * @return {?}
         */
        function () { return _this.close(); }));
    };
    /**
     * @return {?}
     */
    ContextMenuDirective.prototype.close = /**
     * @return {?}
     */
    function () {
        if (this.overlayRef) {
            this.overlayRef.dispose();
            this.overlayRef = null;
        }
    };
    ContextMenuDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[igoContextMenu]'
                },] }
    ];
    /** @nocollapse */
    ContextMenuDirective.ctorParameters = function () { return [
        { type: Overlay },
        { type: ViewContainerRef },
        { type: ElementRef }
    ]; };
    ContextMenuDirective.propDecorators = {
        menuContext: [{ type: Input, args: ['igoContextMenu',] }],
        menuPosition: [{ type: Output }],
        onContextMenu: [{ type: HostListener, args: ['contextmenu', ['$event'],] }]
    };
    return ContextMenuDirective;
}());
export { ContextMenuDirective };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC1tZW51LmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2NvbW1vbi8iLCJzb3VyY2VzIjpbImxpYi9jb250ZXh0LW1lbnUvY29udGV4dC1tZW51LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLFlBQVksRUFDWixLQUFLLEVBQ0wsTUFBTSxFQUNOLFdBQVcsRUFDWCxnQkFBZ0IsRUFDakIsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxTQUFTLEVBQWdCLE1BQU0sTUFBTSxDQUFDO0FBQy9DLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDOUMsT0FBTyxFQUFFLE9BQU8sRUFBYyxNQUFNLHNCQUFzQixDQUFDO0FBRTNEO0lBVUUsOEJBQ1MsT0FBZ0IsRUFDaEIsZ0JBQWtDLEVBQ2pDLFVBQXNCO1FBRnZCLFlBQU8sR0FBUCxPQUFPLENBQVM7UUFDaEIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNqQyxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBTHRCLGlCQUFZLEdBQUcsSUFBSSxZQUFZLEVBQTRCLENBQUM7SUFNbkUsQ0FBQzs7Ozs7SUFHRyw0Q0FBYTs7OztJQURwQixVQUNxQixFQUFvQjtRQUR6QyxpQkEwREM7WUF6RHNCLFFBQUMsRUFBRSxRQUFDO1FBQ3pCLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNiLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBQSxFQUFFLENBQUMsR0FBQSxFQUFFLENBQUMsQ0FBQztRQUNqQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQzs7WUFDakIsZ0JB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dkIsZ0RBQXlDOzs7OztJQUN6QywwQ0FBOEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIERpcmVjdGl2ZSxcclxuICBFbGVtZW50UmVmLFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBIb3N0TGlzdGVuZXIsXHJcbiAgSW5wdXQsXHJcbiAgT3V0cHV0LFxyXG4gIFRlbXBsYXRlUmVmLFxyXG4gIFZpZXdDb250YWluZXJSZWZcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IFRlbXBsYXRlUG9ydGFsIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XHJcbmltcG9ydCB7IGZyb21FdmVudCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IGZpbHRlciwgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgT3ZlcmxheSwgT3ZlcmxheVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW2lnb0NvbnRleHRNZW51XSdcclxufSlcclxuZXhwb3J0IGNsYXNzIENvbnRleHRNZW51RGlyZWN0aXZlIHtcclxuICBvdmVybGF5UmVmOiBPdmVybGF5UmVmIHwgbnVsbDtcclxuICBzdWI6IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgQElucHV0KCdpZ29Db250ZXh0TWVudScpIG1lbnVDb250ZXh0OiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG4gIEBPdXRwdXQoKSBtZW51UG9zaXRpb24gPSBuZXcgRXZlbnRFbWl0dGVyPHsgeDogbnVtYmVyOyB5OiBudW1iZXIgfT4oKTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwdWJsaWMgb3ZlcmxheTogT3ZlcmxheSxcclxuICAgIHB1YmxpYyB2aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxyXG4gICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmXHJcbiAgKSB7fVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdjb250ZXh0bWVudScsIFsnJGV2ZW50J10pXHJcbiAgcHVibGljIG9uQ29udGV4dE1lbnUoeyB4LCB5IH06IE1vdXNlRXZlbnQpOiB2b2lkIHtcclxuICAgIHRoaXMuY2xvc2UoKTtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB0aGlzLm1lbnVQb3NpdGlvbi5lbWl0KHsgeCwgeSB9KTtcclxuICAgIHRoaXMub3ZlcmxheVJlZiA9IG51bGw7XHJcbiAgICBjb25zdCBwb3NpdGlvblN0cmF0ZWd5ID0gdGhpcy5vdmVybGF5XHJcbiAgICAgIC5wb3NpdGlvbigpXHJcbiAgICAgIC5mbGV4aWJsZUNvbm5lY3RlZFRvKHsgeCwgeSB9KVxyXG4gICAgICAud2l0aFBvc2l0aW9ucyhbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgb3JpZ2luWDogJ2VuZCcsXHJcbiAgICAgICAgICBvcmlnaW5ZOiAnYm90dG9tJyxcclxuICAgICAgICAgIG92ZXJsYXlYOiAnc3RhcnQnLFxyXG4gICAgICAgICAgb3ZlcmxheVk6ICd0b3AnXHJcbiAgICAgICAgfVxyXG4gICAgICBdKTtcclxuICAgIHRoaXMub3ZlcmxheVJlZiA9IHRoaXMub3ZlcmxheS5jcmVhdGUoe1xyXG4gICAgICBwb3NpdGlvblN0cmF0ZWd5LFxyXG4gICAgICBzY3JvbGxTdHJhdGVneTogdGhpcy5vdmVybGF5LnNjcm9sbFN0cmF0ZWdpZXMuY2xvc2UoKVxyXG4gICAgfSk7XHJcbiAgICB0aGlzLm92ZXJsYXlSZWYuYXR0YWNoKFxyXG4gICAgICBuZXcgVGVtcGxhdGVQb3J0YWwodGhpcy5tZW51Q29udGV4dCwgdGhpcy52aWV3Q29udGFpbmVyUmVmLCB7XHJcbiAgICAgICAgJGltcGxpY2l0OiB1bmRlZmluZWRcclxuICAgICAgfSlcclxuICAgICk7XHJcblxyXG4gICAgdGhpcy5zdWIgPSBmcm9tRXZlbnQ8TW91c2VFdmVudD4oZG9jdW1lbnQsICdjbGljaycpXHJcbiAgICAgIC5waXBlKFxyXG4gICAgICAgIGZpbHRlcihldmVudCA9PiB7XHJcbiAgICAgICAgICBjb25zdCBjbGlja1RhcmdldCA9IGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudDtcclxuICAgICAgICAgIHRoaXMuY2xvc2UoKTtcclxuICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICEhdGhpcy5vdmVybGF5UmVmICYmXHJcbiAgICAgICAgICAgICF0aGlzLm92ZXJsYXlSZWYub3ZlcmxheUVsZW1lbnQuY29udGFpbnMoY2xpY2tUYXJnZXQpXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIHRha2UoMSlcclxuICAgICAgKVxyXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuY2xvc2UoKSk7XHJcblxyXG4gICAgdGhpcy5zdWIgPSBmcm9tRXZlbnQ8TW91c2VFdmVudD4oZG9jdW1lbnQsICdjb250ZXh0bWVudScpXHJcbiAgICAgIC5waXBlKFxyXG4gICAgICAgIGZpbHRlcihldmVudCA9PiB7XHJcbiAgICAgICAgICBjb25zdCBjbGlja1RhcmdldCA9IGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudDtcclxuICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgY2xpY2tUYXJnZXQgJiZcclxuICAgICAgICAgICAgIXRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKGNsaWNrVGFyZ2V0KSAmJlxyXG4gICAgICAgICAgICAhdGhpcy5vdmVybGF5UmVmLm92ZXJsYXlFbGVtZW50LmNvbnRhaW5zKGNsaWNrVGFyZ2V0KVxyXG4gICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KSxcclxuICAgICAgICB0YWtlKDEpXHJcbiAgICAgIClcclxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLmNsb3NlKCkpO1xyXG4gIH1cclxuICBjbG9zZSgpIHtcclxuICAgIGlmICh0aGlzLm92ZXJsYXlSZWYpIHtcclxuICAgICAgdGhpcy5vdmVybGF5UmVmLmRpc3Bvc2UoKTtcclxuICAgICAgdGhpcy5vdmVybGF5UmVmID0gbnVsbDtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19
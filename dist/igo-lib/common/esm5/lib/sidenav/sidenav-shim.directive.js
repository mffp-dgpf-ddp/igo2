/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, Self, HostListener, Renderer2 } from '@angular/core';
import { MatSidenav } from '@angular/material';
/**
 * <igoSidenavShim> directive.
 *
 * This directive prevents a material sidenav with mode="side"
 * from focusing an element after it's closed
 */
var SidenavShimDirective = /** @class */ (function () {
    function SidenavShimDirective(component, renderer) {
        this.renderer = renderer;
    }
    /**
     * @return {?}
     */
    SidenavShimDirective.prototype.onOpen = /**
     * @return {?}
     */
    function () {
        this.focusedElement = (/** @type {?} */ (document.activeElement));
    };
    /**
     * @return {?}
     */
    SidenavShimDirective.prototype.onCloseStart = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var focusedElement = (/** @type {?} */ (document.activeElement));
        if (focusedElement !== this.focusedElement) {
            this.blurElement = this.focusedElement;
        }
        else {
            this.blurElement = undefined;
        }
    };
    /**
     * @return {?}
     */
    SidenavShimDirective.prototype.onClose = /**
     * @return {?}
     */
    function () {
        if (this.blurElement) {
            this.renderer.selectRootElement(this.blurElement).blur();
        }
        this.blurElement = undefined;
        this.focusedElement = undefined;
    };
    SidenavShimDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[igoSidenavShim]'
                },] }
    ];
    /** @nocollapse */
    SidenavShimDirective.ctorParameters = function () { return [
        { type: MatSidenav, decorators: [{ type: Self }] },
        { type: Renderer2 }
    ]; };
    SidenavShimDirective.propDecorators = {
        onOpen: [{ type: HostListener, args: ['open', ['$event'],] }],
        onCloseStart: [{ type: HostListener, args: ['close-start', ['$event'],] }],
        onClose: [{ type: HostListener, args: ['close', ['$event'],] }]
    };
    return SidenavShimDirective;
}());
export { SidenavShimDirective };
if (false) {
    /**
     * @type {?}
     * @private
     */
    SidenavShimDirective.prototype.focusedElement;
    /**
     * @type {?}
     * @private
     */
    SidenavShimDirective.prototype.blurElement;
    /**
     * @type {?}
     * @private
     */
    SidenavShimDirective.prototype.renderer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZW5hdi1zaGltLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2NvbW1vbi8iLCJzb3VyY2VzIjpbImxpYi9zaWRlbmF2L3NpZGVuYXYtc2hpbS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG1CQUFtQixDQUFDOzs7Ozs7O0FBUS9DO0lBZ0NFLDhCQUFvQixTQUFxQixFQUFVLFFBQW1CO1FBQW5CLGFBQVEsR0FBUixRQUFRLENBQVc7SUFBRyxDQUFDOzs7O0lBeEIxRSxxQ0FBTTs7O0lBRE47UUFFRSxJQUFJLENBQUMsY0FBYyxHQUFHLG1CQUFBLFFBQVEsQ0FBQyxhQUFhLEVBQWUsQ0FBQztJQUM5RCxDQUFDOzs7O0lBR0QsMkNBQVk7OztJQURaOztZQUVRLGNBQWMsR0FBRyxtQkFBQSxRQUFRLENBQUMsYUFBYSxFQUFlO1FBQzVELElBQUksY0FBYyxLQUFLLElBQUksQ0FBQyxjQUFjLEVBQUU7WUFDMUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDO1NBQ3hDO2FBQU07WUFDTCxJQUFJLENBQUMsV0FBVyxHQUFHLFNBQVMsQ0FBQztTQUM5QjtJQUNILENBQUM7Ozs7SUFHRCxzQ0FBTzs7O0lBRFA7UUFFRSxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDcEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDMUQ7UUFFRCxJQUFJLENBQUMsV0FBVyxHQUFHLFNBQVMsQ0FBQztRQUM3QixJQUFJLENBQUMsY0FBYyxHQUFHLFNBQVMsQ0FBQztJQUNsQyxDQUFDOztnQkE5QkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxrQkFBa0I7aUJBQzdCOzs7O2dCQVZRLFVBQVUsdUJBd0NKLElBQUk7Z0JBekNxQixTQUFTOzs7eUJBZ0I5QyxZQUFZLFNBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxDQUFDOytCQUsvQixZQUFZLFNBQUMsYUFBYSxFQUFFLENBQUMsUUFBUSxDQUFDOzBCQVV0QyxZQUFZLFNBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDOztJQVduQywyQkFBQztDQUFBLEFBakNELElBaUNDO1NBOUJZLG9CQUFvQjs7Ozs7O0lBQy9CLDhDQUFvQzs7Ozs7SUFDcEMsMkNBQWlDOzs7OztJQTJCVSx3Q0FBMkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIFNlbGYsIEhvc3RMaXN0ZW5lciwgUmVuZGVyZXIyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE1hdFNpZGVuYXYgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XHJcblxyXG4vKipcclxuICogPGlnb1NpZGVuYXZTaGltPiBkaXJlY3RpdmUuXHJcbiAqXHJcbiAqIFRoaXMgZGlyZWN0aXZlIHByZXZlbnRzIGEgbWF0ZXJpYWwgc2lkZW5hdiB3aXRoIG1vZGU9XCJzaWRlXCJcclxuICogZnJvbSBmb2N1c2luZyBhbiBlbGVtZW50IGFmdGVyIGl0J3MgY2xvc2VkXHJcbiAqL1xyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ1tpZ29TaWRlbmF2U2hpbV0nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTaWRlbmF2U2hpbURpcmVjdGl2ZSB7XHJcbiAgcHJpdmF0ZSBmb2N1c2VkRWxlbWVudDogSFRNTEVsZW1lbnQ7XHJcbiAgcHJpdmF0ZSBibHVyRWxlbWVudDogSFRNTEVsZW1lbnQ7XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ29wZW4nLCBbJyRldmVudCddKVxyXG4gIG9uT3BlbigpIHtcclxuICAgIHRoaXMuZm9jdXNlZEVsZW1lbnQgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50IGFzIEhUTUxFbGVtZW50O1xyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignY2xvc2Utc3RhcnQnLCBbJyRldmVudCddKVxyXG4gIG9uQ2xvc2VTdGFydCgpIHtcclxuICAgIGNvbnN0IGZvY3VzZWRFbGVtZW50ID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudCBhcyBIVE1MRWxlbWVudDtcclxuICAgIGlmIChmb2N1c2VkRWxlbWVudCAhPT0gdGhpcy5mb2N1c2VkRWxlbWVudCkge1xyXG4gICAgICB0aGlzLmJsdXJFbGVtZW50ID0gdGhpcy5mb2N1c2VkRWxlbWVudDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuYmx1ckVsZW1lbnQgPSB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdjbG9zZScsIFsnJGV2ZW50J10pXHJcbiAgb25DbG9zZSgpIHtcclxuICAgIGlmICh0aGlzLmJsdXJFbGVtZW50KSB7XHJcbiAgICAgIHRoaXMucmVuZGVyZXIuc2VsZWN0Um9vdEVsZW1lbnQodGhpcy5ibHVyRWxlbWVudCkuYmx1cigpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuYmx1ckVsZW1lbnQgPSB1bmRlZmluZWQ7XHJcbiAgICB0aGlzLmZvY3VzZWRFbGVtZW50ID0gdW5kZWZpbmVkO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IoQFNlbGYoKSBjb21wb25lbnQ6IE1hdFNpZGVuYXYsIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMikge31cclxufVxyXG4iXX0=
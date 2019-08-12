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
export class SidenavShimDirective {
    /**
     * @param {?} component
     * @param {?} renderer
     */
    constructor(component, renderer) {
        this.renderer = renderer;
    }
    /**
     * @return {?}
     */
    onOpen() {
        this.focusedElement = (/** @type {?} */ (document.activeElement));
    }
    /**
     * @return {?}
     */
    onCloseStart() {
        /** @type {?} */
        const focusedElement = (/** @type {?} */ (document.activeElement));
        if (focusedElement !== this.focusedElement) {
            this.blurElement = this.focusedElement;
        }
        else {
            this.blurElement = undefined;
        }
    }
    /**
     * @return {?}
     */
    onClose() {
        if (this.blurElement) {
            this.renderer.selectRootElement(this.blurElement).blur();
        }
        this.blurElement = undefined;
        this.focusedElement = undefined;
    }
}
SidenavShimDirective.decorators = [
    { type: Directive, args: [{
                selector: '[igoSidenavShim]'
            },] }
];
/** @nocollapse */
SidenavShimDirective.ctorParameters = () => [
    { type: MatSidenav, decorators: [{ type: Self }] },
    { type: Renderer2 }
];
SidenavShimDirective.propDecorators = {
    onOpen: [{ type: HostListener, args: ['open', ['$event'],] }],
    onCloseStart: [{ type: HostListener, args: ['close-start', ['$event'],] }],
    onClose: [{ type: HostListener, args: ['close', ['$event'],] }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZW5hdi1zaGltLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2NvbW1vbi8iLCJzb3VyY2VzIjpbImxpYi9zaWRlbmF2L3NpZGVuYXYtc2hpbS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG1CQUFtQixDQUFDOzs7Ozs7O0FBVy9DLE1BQU0sT0FBTyxvQkFBb0I7Ozs7O0lBNkIvQixZQUFvQixTQUFxQixFQUFVLFFBQW1CO1FBQW5CLGFBQVEsR0FBUixRQUFRLENBQVc7SUFBRyxDQUFDOzs7O0lBeEIxRSxNQUFNO1FBQ0osSUFBSSxDQUFDLGNBQWMsR0FBRyxtQkFBQSxRQUFRLENBQUMsYUFBYSxFQUFlLENBQUM7SUFDOUQsQ0FBQzs7OztJQUdELFlBQVk7O2NBQ0osY0FBYyxHQUFHLG1CQUFBLFFBQVEsQ0FBQyxhQUFhLEVBQWU7UUFDNUQsSUFBSSxjQUFjLEtBQUssSUFBSSxDQUFDLGNBQWMsRUFBRTtZQUMxQyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUM7U0FDeEM7YUFBTTtZQUNMLElBQUksQ0FBQyxXQUFXLEdBQUcsU0FBUyxDQUFDO1NBQzlCO0lBQ0gsQ0FBQzs7OztJQUdELE9BQU87UUFDTCxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDcEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDMUQ7UUFFRCxJQUFJLENBQUMsV0FBVyxHQUFHLFNBQVMsQ0FBQztRQUM3QixJQUFJLENBQUMsY0FBYyxHQUFHLFNBQVMsQ0FBQztJQUNsQyxDQUFDOzs7WUE5QkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxrQkFBa0I7YUFDN0I7Ozs7WUFWUSxVQUFVLHVCQXdDSixJQUFJO1lBekNxQixTQUFTOzs7cUJBZ0I5QyxZQUFZLFNBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxDQUFDOzJCQUsvQixZQUFZLFNBQUMsYUFBYSxFQUFFLENBQUMsUUFBUSxDQUFDO3NCQVV0QyxZQUFZLFNBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDOzs7Ozs7O0lBbEJqQyw4Q0FBb0M7Ozs7O0lBQ3BDLDJDQUFpQzs7Ozs7SUEyQlUsd0NBQTJCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBTZWxmLCBIb3N0TGlzdGVuZXIsIFJlbmRlcmVyMiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBNYXRTaWRlbmF2IH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xyXG5cclxuLyoqXHJcbiAqIDxpZ29TaWRlbmF2U2hpbT4gZGlyZWN0aXZlLlxyXG4gKlxyXG4gKiBUaGlzIGRpcmVjdGl2ZSBwcmV2ZW50cyBhIG1hdGVyaWFsIHNpZGVuYXYgd2l0aCBtb2RlPVwic2lkZVwiXHJcbiAqIGZyb20gZm9jdXNpbmcgYW4gZWxlbWVudCBhZnRlciBpdCdzIGNsb3NlZFxyXG4gKi9cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbaWdvU2lkZW5hdlNoaW1dJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgU2lkZW5hdlNoaW1EaXJlY3RpdmUge1xyXG4gIHByaXZhdGUgZm9jdXNlZEVsZW1lbnQ6IEhUTUxFbGVtZW50O1xyXG4gIHByaXZhdGUgYmx1ckVsZW1lbnQ6IEhUTUxFbGVtZW50O1xyXG5cclxuICBASG9zdExpc3RlbmVyKCdvcGVuJywgWyckZXZlbnQnXSlcclxuICBvbk9wZW4oKSB7XHJcbiAgICB0aGlzLmZvY3VzZWRFbGVtZW50ID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudCBhcyBIVE1MRWxlbWVudDtcclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ2Nsb3NlLXN0YXJ0JywgWyckZXZlbnQnXSlcclxuICBvbkNsb3NlU3RhcnQoKSB7XHJcbiAgICBjb25zdCBmb2N1c2VkRWxlbWVudCA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICBpZiAoZm9jdXNlZEVsZW1lbnQgIT09IHRoaXMuZm9jdXNlZEVsZW1lbnQpIHtcclxuICAgICAgdGhpcy5ibHVyRWxlbWVudCA9IHRoaXMuZm9jdXNlZEVsZW1lbnQ7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmJsdXJFbGVtZW50ID0gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignY2xvc2UnLCBbJyRldmVudCddKVxyXG4gIG9uQ2xvc2UoKSB7XHJcbiAgICBpZiAodGhpcy5ibHVyRWxlbWVudCkge1xyXG4gICAgICB0aGlzLnJlbmRlcmVyLnNlbGVjdFJvb3RFbGVtZW50KHRoaXMuYmx1ckVsZW1lbnQpLmJsdXIoKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmJsdXJFbGVtZW50ID0gdW5kZWZpbmVkO1xyXG4gICAgdGhpcy5mb2N1c2VkRWxlbWVudCA9IHVuZGVmaW5lZDtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKEBTZWxmKCkgY29tcG9uZW50OiBNYXRTaWRlbmF2LCBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIpIHt9XHJcbn1cclxuIl19
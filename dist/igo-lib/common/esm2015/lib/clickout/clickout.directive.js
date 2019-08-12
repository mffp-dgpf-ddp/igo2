/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';
export class ClickoutDirective {
    /**
     * @param {?} el
     */
    constructor(el) {
        this.el = el;
        this.clickout = new EventEmitter();
    }
    /**
     * @param {?} event
     * @param {?} target
     * @return {?}
     */
    handleMouseClick(event, target) {
        if (!target) {
            return;
        }
        if (!this.el.nativeElement.contains(target)) {
            this.clickout.emit(event);
        }
    }
}
ClickoutDirective.decorators = [
    { type: Directive, args: [{
                selector: '[igoClickout]'
            },] }
];
/** @nocollapse */
ClickoutDirective.ctorParameters = () => [
    { type: ElementRef }
];
ClickoutDirective.propDecorators = {
    clickout: [{ type: Output }],
    handleMouseClick: [{ type: HostListener, args: ['document:click', ['$event', '$event.target'],] }]
};
if (false) {
    /** @type {?} */
    ClickoutDirective.prototype.clickout;
    /**
     * @type {?}
     * @private
     */
    ClickoutDirective.prototype.el;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpY2tvdXQuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvY29tbW9uLyIsInNvdXJjZXMiOlsibGliL2NsaWNrb3V0L2NsaWNrb3V0LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLFlBQVksRUFDWixNQUFNLEVBQ1AsTUFBTSxlQUFlLENBQUM7QUFLdkIsTUFBTSxPQUFPLGlCQUFpQjs7OztJQWM1QixZQUFvQixFQUFjO1FBQWQsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQWJ4QixhQUFRLEdBQUcsSUFBSSxZQUFZLEVBQWMsQ0FBQztJQWFmLENBQUM7Ozs7OztJQVZ0QyxnQkFBZ0IsQ0FBQyxLQUFpQixFQUFFLE1BQW1CO1FBQ3JELElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDWCxPQUFPO1NBQ1I7UUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQzNDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzNCO0lBQ0gsQ0FBQzs7O1lBZkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxlQUFlO2FBQzFCOzs7O1lBUkMsVUFBVTs7O3VCQVVULE1BQU07K0JBRU4sWUFBWSxTQUFDLGdCQUFnQixFQUFFLENBQUMsUUFBUSxFQUFFLGVBQWUsQ0FBQzs7OztJQUYzRCxxQ0FBb0Q7Ozs7O0lBYXhDLCtCQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgRGlyZWN0aXZlLFxyXG4gIEVsZW1lbnRSZWYsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIEhvc3RMaXN0ZW5lcixcclxuICBPdXRwdXRcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW2lnb0NsaWNrb3V0XSdcclxufSlcclxuZXhwb3J0IGNsYXNzIENsaWNrb3V0RGlyZWN0aXZlIHtcclxuICBAT3V0cHV0KCkgY2xpY2tvdXQgPSBuZXcgRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+KCk7XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ2RvY3VtZW50OmNsaWNrJywgWyckZXZlbnQnLCAnJGV2ZW50LnRhcmdldCddKVxyXG4gIGhhbmRsZU1vdXNlQ2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQsIHRhcmdldDogSFRNTEVsZW1lbnQpIHtcclxuICAgIGlmICghdGFyZ2V0KSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIXRoaXMuZWwubmF0aXZlRWxlbWVudC5jb250YWlucyh0YXJnZXQpKSB7XHJcbiAgICAgIHRoaXMuY2xpY2tvdXQuZW1pdChldmVudCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsOiBFbGVtZW50UmVmKSB7fVxyXG59XHJcbiJdfQ==
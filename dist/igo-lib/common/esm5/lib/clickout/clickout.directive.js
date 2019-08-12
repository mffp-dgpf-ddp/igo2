/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';
var ClickoutDirective = /** @class */ (function () {
    function ClickoutDirective(el) {
        this.el = el;
        this.clickout = new EventEmitter();
    }
    /**
     * @param {?} event
     * @param {?} target
     * @return {?}
     */
    ClickoutDirective.prototype.handleMouseClick = /**
     * @param {?} event
     * @param {?} target
     * @return {?}
     */
    function (event, target) {
        if (!target) {
            return;
        }
        if (!this.el.nativeElement.contains(target)) {
            this.clickout.emit(event);
        }
    };
    ClickoutDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[igoClickout]'
                },] }
    ];
    /** @nocollapse */
    ClickoutDirective.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    ClickoutDirective.propDecorators = {
        clickout: [{ type: Output }],
        handleMouseClick: [{ type: HostListener, args: ['document:click', ['$event', '$event.target'],] }]
    };
    return ClickoutDirective;
}());
export { ClickoutDirective };
if (false) {
    /** @type {?} */
    ClickoutDirective.prototype.clickout;
    /**
     * @type {?}
     * @private
     */
    ClickoutDirective.prototype.el;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpY2tvdXQuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvY29tbW9uLyIsInNvdXJjZXMiOlsibGliL2NsaWNrb3V0L2NsaWNrb3V0LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLFlBQVksRUFDWixNQUFNLEVBQ1AsTUFBTSxlQUFlLENBQUM7QUFFdkI7SUFpQkUsMkJBQW9CLEVBQWM7UUFBZCxPQUFFLEdBQUYsRUFBRSxDQUFZO1FBYnhCLGFBQVEsR0FBRyxJQUFJLFlBQVksRUFBYyxDQUFDO0lBYWYsQ0FBQzs7Ozs7O0lBVnRDLDRDQUFnQjs7Ozs7SUFEaEIsVUFDaUIsS0FBaUIsRUFBRSxNQUFtQjtRQUNyRCxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ1gsT0FBTztTQUNSO1FBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUMzQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUMzQjtJQUNILENBQUM7O2dCQWZGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsZUFBZTtpQkFDMUI7Ozs7Z0JBUkMsVUFBVTs7OzJCQVVULE1BQU07bUNBRU4sWUFBWSxTQUFDLGdCQUFnQixFQUFFLENBQUMsUUFBUSxFQUFFLGVBQWUsQ0FBQzs7SUFZN0Qsd0JBQUM7Q0FBQSxBQWxCRCxJQWtCQztTQWZZLGlCQUFpQjs7O0lBQzVCLHFDQUFvRDs7Ozs7SUFheEMsK0JBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBEaXJlY3RpdmUsXHJcbiAgRWxlbWVudFJlZixcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgSG9zdExpc3RlbmVyLFxyXG4gIE91dHB1dFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbaWdvQ2xpY2tvdXRdJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgQ2xpY2tvdXREaXJlY3RpdmUge1xyXG4gIEBPdXRwdXQoKSBjbGlja291dCA9IG5ldyBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4oKTtcclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignZG9jdW1lbnQ6Y2xpY2snLCBbJyRldmVudCcsICckZXZlbnQudGFyZ2V0J10pXHJcbiAgaGFuZGxlTW91c2VDbGljayhldmVudDogTW91c2VFdmVudCwgdGFyZ2V0OiBIVE1MRWxlbWVudCkge1xyXG4gICAgaWYgKCF0YXJnZXQpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghdGhpcy5lbC5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKHRhcmdldCkpIHtcclxuICAgICAgdGhpcy5jbGlja291dC5lbWl0KGV2ZW50KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWw6IEVsZW1lbnRSZWYpIHt9XHJcbn1cclxuIl19
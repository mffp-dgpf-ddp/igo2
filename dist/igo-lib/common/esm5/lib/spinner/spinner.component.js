/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
var SpinnerComponent = /** @class */ (function () {
    function SpinnerComponent() {
        this.shown$ = new BehaviorSubject(false);
    }
    Object.defineProperty(SpinnerComponent.prototype, "shown", {
        get: /**
         * @return {?}
         */
        function () { return this.shown$.value; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this.shown$.next(value); },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    SpinnerComponent.prototype.show = /**
     * @return {?}
     */
    function () {
        this.shown = true;
    };
    /**
     * @return {?}
     */
    SpinnerComponent.prototype.hide = /**
     * @return {?}
     */
    function () {
        this.shown = false;
    };
    SpinnerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-spinner',
                    template: "<div\r\n  [ngClass]=\"{'igo-spinner-container': true, 'igo-spinner-shown': (shown$ | async)}\">\r\n  <div class=\"igo-spinner-background\"></div>\r\n  <mat-progress-spinner diameter=\"40\" mode=\"indeterminate\"></mat-progress-spinner>\r\n</div>\r\n",
                    styles: [".igo-spinner-container{display:none;pointer-events:none}.igo-spinner-container.igo-spinner-shown{display:block}mat-progress-spinner{height:40px;width:40px;border-radius:50%}.igo-spinner-background{height:36px;width:36px;border-radius:50%;border:4px solid #fff;position:absolute;top:2px;left:2px}"]
                }] }
    ];
    /** @nocollapse */
    SpinnerComponent.ctorParameters = function () { return []; };
    SpinnerComponent.propDecorators = {
        shown: [{ type: Input }]
    };
    return SpinnerComponent;
}());
export { SpinnerComponent };
if (false) {
    /** @type {?} */
    SpinnerComponent.prototype.shown$;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Bpbm5lci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9jb21tb24vIiwic291cmNlcyI6WyJsaWIvc3Bpbm5lci9zcGlubmVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFakQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUV2QztJQWFFO1FBTk8sV0FBTSxHQUE2QixJQUFJLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQU10RCxDQUFDO0lBSmhCLHNCQUNJLG1DQUFLOzs7O1FBQ1QsY0FBdUIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Ozs7O1FBRmxELFVBQ1UsS0FBYyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzs7O09BQUE7Ozs7SUFLdEQsK0JBQUk7OztJQUFKO1FBQ0UsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7SUFDcEIsQ0FBQzs7OztJQUVELCtCQUFJOzs7SUFBSjtRQUNFLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0lBQ3JCLENBQUM7O2dCQXJCRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGFBQWE7b0JBQ3ZCLHFRQUF1Qzs7aUJBRXhDOzs7Ozt3QkFLRSxLQUFLOztJQWFSLHVCQUFDO0NBQUEsQUF0QkQsSUFzQkM7U0FqQlksZ0JBQWdCOzs7SUFFM0Isa0NBQXFFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2lnby1zcGlubmVyJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vc3Bpbm5lci5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vc3Bpbm5lci5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTcGlubmVyQ29tcG9uZW50IHtcclxuXHJcbiAgcHVibGljIHNob3duJDogQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IEJlaGF2aW9yU3ViamVjdChmYWxzZSk7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgc2V0IHNob3duKHZhbHVlOiBib29sZWFuKSB7IHRoaXMuc2hvd24kLm5leHQodmFsdWUpOyB9XHJcbiAgZ2V0IHNob3duKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5zaG93biQudmFsdWU7IH1cclxuXHJcbiAgY29uc3RydWN0b3IoKSB7fVxyXG5cclxuICBzaG93KCkge1xyXG4gICAgdGhpcy5zaG93biA9IHRydWU7XHJcbiAgfVxyXG5cclxuICBoaWRlKCkge1xyXG4gICAgdGhpcy5zaG93biA9IGZhbHNlO1xyXG4gIH1cclxufVxyXG4iXX0=
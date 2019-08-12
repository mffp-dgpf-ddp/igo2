/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, Self } from '@angular/core';
import { debounceTime } from 'rxjs/operators';
import { ActivityService } from '@igo2/core';
import { SpinnerComponent } from './spinner.component';
/**
 * A directive to bind a SpinnerComponent to the activity service.
 * The activity service tracks any HTTP request and this directive
 * will display the spinner it's attached to when the activity counter
 * is greater than 0.
 */
var SpinnerActivityDirective = /** @class */ (function () {
    function SpinnerActivityDirective(spinner, activityService) {
        this.spinner = spinner;
        this.activityService = activityService;
    }
    /**
     * Subscribe to the activity service counter and display the spinner
     * when it's is greater than 0.
     * @internal
     */
    /**
     * Subscribe to the activity service counter and display the spinner
     * when it's is greater than 0.
     * \@internal
     * @return {?}
     */
    SpinnerActivityDirective.prototype.ngOnInit = /**
     * Subscribe to the activity service counter and display the spinner
     * when it's is greater than 0.
     * \@internal
     * @return {?}
     */
    function () {
        var _this = this;
        this.counter$$ = this.activityService.counter$
            .pipe(debounceTime(50))
            .subscribe((/**
         * @param {?} count
         * @return {?}
         */
        function (count) {
            count > 0 ? _this.spinner.show() : _this.spinner.hide();
        }));
    };
    /**
     * Unsubcribe to the activity service counter.
     * @internal
     */
    /**
     * Unsubcribe to the activity service counter.
     * \@internal
     * @return {?}
     */
    SpinnerActivityDirective.prototype.ngOnDestroy = /**
     * Unsubcribe to the activity service counter.
     * \@internal
     * @return {?}
     */
    function () {
        this.counter$$.unsubscribe();
    };
    SpinnerActivityDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[igoSpinnerActivity]',
                    providers: [SpinnerComponent]
                },] }
    ];
    /** @nocollapse */
    SpinnerActivityDirective.ctorParameters = function () { return [
        { type: SpinnerComponent, decorators: [{ type: Self }] },
        { type: ActivityService }
    ]; };
    return SpinnerActivityDirective;
}());
export { SpinnerActivityDirective };
if (false) {
    /**
     * Subscription to the activity service counter
     * @type {?}
     * @private
     */
    SpinnerActivityDirective.prototype.counter$$;
    /**
     * @type {?}
     * @private
     */
    SpinnerActivityDirective.prototype.spinner;
    /**
     * @type {?}
     * @private
     */
    SpinnerActivityDirective.prototype.activityService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Bpbm5lci1hY3Rpdml0eS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9jb21tb24vIiwic291cmNlcyI6WyJsaWIvc3Bpbm5lci9zcGlubmVyLWFjdGl2aXR5LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQXFCLE1BQU0sZUFBZSxDQUFDO0FBRW5FLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUU5QyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQzdDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDOzs7Ozs7O0FBUXZEO0lBVUUsa0NBQ2tCLE9BQXlCLEVBQ2pDLGVBQWdDO1FBRHhCLFlBQU8sR0FBUCxPQUFPLENBQWtCO1FBQ2pDLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtJQUN2QyxDQUFDO0lBRUo7Ozs7T0FJRzs7Ozs7OztJQUNILDJDQUFROzs7Ozs7SUFBUjtRQUFBLGlCQU1DO1FBTEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVE7YUFDM0MsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQzthQUN0QixTQUFTOzs7O1FBQUMsVUFBQyxLQUFhO1lBQ3ZCLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDeEQsQ0FBQyxFQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQ7OztPQUdHOzs7Ozs7SUFDSCw4Q0FBVzs7Ozs7SUFBWDtRQUNFLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDL0IsQ0FBQzs7Z0JBbENGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsc0JBQXNCO29CQUNoQyxTQUFTLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQztpQkFDOUI7Ozs7Z0JBWFEsZ0JBQWdCLHVCQW1CcEIsSUFBSTtnQkFwQkEsZUFBZTs7SUE0Q3hCLCtCQUFDO0NBQUEsQUFuQ0QsSUFtQ0M7U0EvQlksd0JBQXdCOzs7Ozs7O0lBSW5DLDZDQUFnQzs7Ozs7SUFHOUIsMkNBQXlDOzs7OztJQUN6QyxtREFBd0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIFNlbGYsIE9uSW5pdCwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBkZWJvdW5jZVRpbWUgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5pbXBvcnQgeyBBY3Rpdml0eVNlcnZpY2UgfSBmcm9tICdAaWdvMi9jb3JlJztcclxuaW1wb3J0IHsgU3Bpbm5lckNvbXBvbmVudCB9IGZyb20gJy4vc3Bpbm5lci5jb21wb25lbnQnO1xyXG5cclxuLyoqXHJcbiAqIEEgZGlyZWN0aXZlIHRvIGJpbmQgYSBTcGlubmVyQ29tcG9uZW50IHRvIHRoZSBhY3Rpdml0eSBzZXJ2aWNlLlxyXG4gKiBUaGUgYWN0aXZpdHkgc2VydmljZSB0cmFja3MgYW55IEhUVFAgcmVxdWVzdCBhbmQgdGhpcyBkaXJlY3RpdmVcclxuICogd2lsbCBkaXNwbGF5IHRoZSBzcGlubmVyIGl0J3MgYXR0YWNoZWQgdG8gd2hlbiB0aGUgYWN0aXZpdHkgY291bnRlclxyXG4gKiBpcyBncmVhdGVyIHRoYW4gMC5cclxuICovXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW2lnb1NwaW5uZXJBY3Rpdml0eV0nLFxyXG4gIHByb3ZpZGVyczogW1NwaW5uZXJDb21wb25lbnRdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTcGlubmVyQWN0aXZpdHlEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcbiAgLyoqXHJcbiAgICogU3Vic2NyaXB0aW9uIHRvIHRoZSBhY3Rpdml0eSBzZXJ2aWNlIGNvdW50ZXJcclxuICAgKi9cclxuICBwcml2YXRlIGNvdW50ZXIkJDogU3Vic2NyaXB0aW9uO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIEBTZWxmKCkgcHJpdmF0ZSBzcGlubmVyOiBTcGlubmVyQ29tcG9uZW50LFxyXG4gICAgcHJpdmF0ZSBhY3Rpdml0eVNlcnZpY2U6IEFjdGl2aXR5U2VydmljZVxyXG4gICkge31cclxuXHJcbiAgLyoqXHJcbiAgICogU3Vic2NyaWJlIHRvIHRoZSBhY3Rpdml0eSBzZXJ2aWNlIGNvdW50ZXIgYW5kIGRpc3BsYXkgdGhlIHNwaW5uZXJcclxuICAgKiB3aGVuIGl0J3MgaXMgZ3JlYXRlciB0aGFuIDAuXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLmNvdW50ZXIkJCA9IHRoaXMuYWN0aXZpdHlTZXJ2aWNlLmNvdW50ZXIkXHJcbiAgICAgIC5waXBlKGRlYm91bmNlVGltZSg1MCkpXHJcbiAgICAgIC5zdWJzY3JpYmUoKGNvdW50OiBudW1iZXIpID0+IHtcclxuICAgICAgICBjb3VudCA+IDAgPyB0aGlzLnNwaW5uZXIuc2hvdygpIDogdGhpcy5zcGlubmVyLmhpZGUoKTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVbnN1YmNyaWJlIHRvIHRoZSBhY3Rpdml0eSBzZXJ2aWNlIGNvdW50ZXIuXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLmNvdW50ZXIkJC51bnN1YnNjcmliZSgpO1xyXG4gIH1cclxufVxyXG4iXX0=
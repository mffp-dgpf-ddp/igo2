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
export class SpinnerActivityDirective {
    /**
     * @param {?} spinner
     * @param {?} activityService
     */
    constructor(spinner, activityService) {
        this.spinner = spinner;
        this.activityService = activityService;
    }
    /**
     * Subscribe to the activity service counter and display the spinner
     * when it's is greater than 0.
     * \@internal
     * @return {?}
     */
    ngOnInit() {
        this.counter$$ = this.activityService.counter$
            .pipe(debounceTime(50))
            .subscribe((/**
         * @param {?} count
         * @return {?}
         */
        (count) => {
            count > 0 ? this.spinner.show() : this.spinner.hide();
        }));
    }
    /**
     * Unsubcribe to the activity service counter.
     * \@internal
     * @return {?}
     */
    ngOnDestroy() {
        this.counter$$.unsubscribe();
    }
}
SpinnerActivityDirective.decorators = [
    { type: Directive, args: [{
                selector: '[igoSpinnerActivity]',
                providers: [SpinnerComponent]
            },] }
];
/** @nocollapse */
SpinnerActivityDirective.ctorParameters = () => [
    { type: SpinnerComponent, decorators: [{ type: Self }] },
    { type: ActivityService }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Bpbm5lci1hY3Rpdml0eS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9jb21tb24vIiwic291cmNlcyI6WyJsaWIvc3Bpbm5lci9zcGlubmVyLWFjdGl2aXR5LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQXFCLE1BQU0sZUFBZSxDQUFDO0FBRW5FLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUU5QyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQzdDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDOzs7Ozs7O0FBWXZELE1BQU0sT0FBTyx3QkFBd0I7Ozs7O0lBTW5DLFlBQ2tCLE9BQXlCLEVBQ2pDLGVBQWdDO1FBRHhCLFlBQU8sR0FBUCxPQUFPLENBQWtCO1FBQ2pDLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtJQUN2QyxDQUFDOzs7Ozs7O0lBT0osUUFBUTtRQUNOLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRO2FBQzNDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLENBQUM7YUFDdEIsU0FBUzs7OztRQUFDLENBQUMsS0FBYSxFQUFFLEVBQUU7WUFDM0IsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN4RCxDQUFDLEVBQUMsQ0FBQztJQUNQLENBQUM7Ozs7OztJQU1ELFdBQVc7UUFDVCxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQy9CLENBQUM7OztZQWxDRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHNCQUFzQjtnQkFDaEMsU0FBUyxFQUFFLENBQUMsZ0JBQWdCLENBQUM7YUFDOUI7Ozs7WUFYUSxnQkFBZ0IsdUJBbUJwQixJQUFJO1lBcEJBLGVBQWU7Ozs7Ozs7O0lBaUJ0Qiw2Q0FBZ0M7Ozs7O0lBRzlCLDJDQUF5Qzs7Ozs7SUFDekMsbURBQXdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBTZWxmLCBPbkluaXQsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgZGVib3VuY2VUaW1lIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuaW1wb3J0IHsgQWN0aXZpdHlTZXJ2aWNlIH0gZnJvbSAnQGlnbzIvY29yZSc7XHJcbmltcG9ydCB7IFNwaW5uZXJDb21wb25lbnQgfSBmcm9tICcuL3NwaW5uZXIuY29tcG9uZW50JztcclxuXHJcbi8qKlxyXG4gKiBBIGRpcmVjdGl2ZSB0byBiaW5kIGEgU3Bpbm5lckNvbXBvbmVudCB0byB0aGUgYWN0aXZpdHkgc2VydmljZS5cclxuICogVGhlIGFjdGl2aXR5IHNlcnZpY2UgdHJhY2tzIGFueSBIVFRQIHJlcXVlc3QgYW5kIHRoaXMgZGlyZWN0aXZlXHJcbiAqIHdpbGwgZGlzcGxheSB0aGUgc3Bpbm5lciBpdCdzIGF0dGFjaGVkIHRvIHdoZW4gdGhlIGFjdGl2aXR5IGNvdW50ZXJcclxuICogaXMgZ3JlYXRlciB0aGFuIDAuXHJcbiAqL1xyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ1tpZ29TcGlubmVyQWN0aXZpdHldJyxcclxuICBwcm92aWRlcnM6IFtTcGlubmVyQ29tcG9uZW50XVxyXG59KVxyXG5leHBvcnQgY2xhc3MgU3Bpbm5lckFjdGl2aXR5RGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG4gIC8qKlxyXG4gICAqIFN1YnNjcmlwdGlvbiB0byB0aGUgYWN0aXZpdHkgc2VydmljZSBjb3VudGVyXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBjb3VudGVyJCQ6IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBAU2VsZigpIHByaXZhdGUgc3Bpbm5lcjogU3Bpbm5lckNvbXBvbmVudCxcclxuICAgIHByaXZhdGUgYWN0aXZpdHlTZXJ2aWNlOiBBY3Rpdml0eVNlcnZpY2VcclxuICApIHt9XHJcblxyXG4gIC8qKlxyXG4gICAqIFN1YnNjcmliZSB0byB0aGUgYWN0aXZpdHkgc2VydmljZSBjb3VudGVyIGFuZCBkaXNwbGF5IHRoZSBzcGlubmVyXHJcbiAgICogd2hlbiBpdCdzIGlzIGdyZWF0ZXIgdGhhbiAwLlxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5jb3VudGVyJCQgPSB0aGlzLmFjdGl2aXR5U2VydmljZS5jb3VudGVyJFxyXG4gICAgICAucGlwZShkZWJvdW5jZVRpbWUoNTApKVxyXG4gICAgICAuc3Vic2NyaWJlKChjb3VudDogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgY291bnQgPiAwID8gdGhpcy5zcGlubmVyLnNob3coKSA6IHRoaXMuc3Bpbm5lci5oaWRlKCk7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVW5zdWJjcmliZSB0byB0aGUgYWN0aXZpdHkgc2VydmljZSBjb3VudGVyLlxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgdGhpcy5jb3VudGVyJCQudW5zdWJzY3JpYmUoKTtcclxuICB9XHJcbn1cclxuIl19
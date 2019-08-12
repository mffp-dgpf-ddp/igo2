/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
export class SpinnerComponent {
    constructor() {
        this.shown$ = new BehaviorSubject(false);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set shown(value) { this.shown$.next(value); }
    /**
     * @return {?}
     */
    get shown() { return this.shown$.value; }
    /**
     * @return {?}
     */
    show() {
        this.shown = true;
    }
    /**
     * @return {?}
     */
    hide() {
        this.shown = false;
    }
}
SpinnerComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-spinner',
                template: "<div\r\n  [ngClass]=\"{'igo-spinner-container': true, 'igo-spinner-shown': (shown$ | async)}\">\r\n  <div class=\"igo-spinner-background\"></div>\r\n  <mat-progress-spinner diameter=\"40\" mode=\"indeterminate\"></mat-progress-spinner>\r\n</div>\r\n",
                styles: [".igo-spinner-container{display:none;pointer-events:none}.igo-spinner-container.igo-spinner-shown{display:block}mat-progress-spinner{height:40px;width:40px;border-radius:50%}.igo-spinner-background{height:36px;width:36px;border-radius:50%;border:4px solid #fff;position:absolute;top:2px;left:2px}"]
            }] }
];
/** @nocollapse */
SpinnerComponent.ctorParameters = () => [];
SpinnerComponent.propDecorators = {
    shown: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    SpinnerComponent.prototype.shown$;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Bpbm5lci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9jb21tb24vIiwic291cmNlcyI6WyJsaWIvc3Bpbm5lci9zcGlubmVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFakQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQU92QyxNQUFNLE9BQU8sZ0JBQWdCO0lBUTNCO1FBTk8sV0FBTSxHQUE2QixJQUFJLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQU10RCxDQUFDOzs7OztJQUpoQixJQUNJLEtBQUssQ0FBQyxLQUFjLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7O0lBQ3RELElBQUksS0FBSyxLQUFjLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDOzs7O0lBSWxELElBQUk7UUFDRixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztJQUNwQixDQUFDOzs7O0lBRUQsSUFBSTtRQUNGLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0lBQ3JCLENBQUM7OztZQXJCRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGFBQWE7Z0JBQ3ZCLHFRQUF1Qzs7YUFFeEM7Ozs7O29CQUtFLEtBQUs7Ozs7SUFGTixrQ0FBcUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaWdvLXNwaW5uZXInLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9zcGlubmVyLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9zcGlubmVyLmNvbXBvbmVudC5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIFNwaW5uZXJDb21wb25lbnQge1xyXG5cclxuICBwdWJsaWMgc2hvd24kOiBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KGZhbHNlKTtcclxuXHJcbiAgQElucHV0KClcclxuICBzZXQgc2hvd24odmFsdWU6IGJvb2xlYW4pIHsgdGhpcy5zaG93biQubmV4dCh2YWx1ZSk7IH1cclxuICBnZXQgc2hvd24oKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLnNob3duJC52YWx1ZTsgfVxyXG5cclxuICBjb25zdHJ1Y3RvcigpIHt9XHJcblxyXG4gIHNob3coKSB7XHJcbiAgICB0aGlzLnNob3duID0gdHJ1ZTtcclxuICB9XHJcblxyXG4gIGhpZGUoKSB7XHJcbiAgICB0aGlzLnNob3duID0gZmFsc2U7XHJcbiAgfVxyXG59XHJcbiJdfQ==
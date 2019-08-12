/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Input, ChangeDetectorRef, ChangeDetectionStrategy, Component, ViewContainerRef, ViewChild } from '@angular/core';
import { ObjectUtils } from '@igo2/utils';
import { DynamicComponent } from '../shared/dynamic-component';
import { DynamicComponentService } from '../shared/dynamic-component.service';
var DynamicOutletComponent = /** @class */ (function () {
    function DynamicOutletComponent(dynamicComponentService, cdRef) {
        this.dynamicComponentService = dynamicComponentService;
        this.cdRef = cdRef;
        /**
         * The dynamic component inputs
         */
        this.inputs = {};
        /**
         * The subscribers to the dynamic component outputs
         */
        this.subscribers = {};
    }
    /**
     * If the dynamic component changes, create it.
     * If the inputs or subscribers change, update the current component's
     * inputs or subscribers.
     * @internal
     */
    /**
     * If the dynamic component changes, create it.
     * If the inputs or subscribers change, update the current component's
     * inputs or subscribers.
     * \@internal
     * @param {?} changes
     * @return {?}
     */
    DynamicOutletComponent.prototype.ngOnChanges = /**
     * If the dynamic component changes, create it.
     * If the inputs or subscribers change, update the current component's
     * inputs or subscribers.
     * \@internal
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        /** @type {?} */
        var component = changes.component;
        /** @type {?} */
        var inputs = changes.inputs;
        /** @type {?} */
        var subscribers = changes.subscribers;
        /** @type {?} */
        var eq = ObjectUtils.objectsAreEquivalent;
        if (component && component.currentValue !== component.previousValue) {
            this.createComponent(component.currentValue);
        }
        else {
            /** @type {?} */
            var inputsAreEquivalents = inputs && eq(inputs.currentValue || {}, inputs.previousValue || {});
            /** @type {?} */
            var subscribersAreEquivalents = subscribers &&
                eq(subscribers.currentValue || {}, subscribers.previousValue || {});
            if (inputsAreEquivalents === false) {
                this.updateInputs();
            }
            if (subscribersAreEquivalents === false) {
                this.updateSubscribers();
            }
        }
        this.cdRef.detectChanges();
    };
    /**
     * Destroy the dynamic component and all it's subscribers
     * @internal
     */
    /**
     * Destroy the dynamic component and all it's subscribers
     * \@internal
     * @return {?}
     */
    DynamicOutletComponent.prototype.ngOnDestroy = /**
     * Destroy the dynamic component and all it's subscribers
     * \@internal
     * @return {?}
     */
    function () {
        if (this.dynamicComponent) {
            this.dynamicComponent.destroy();
        }
    };
    /**
     * Create a  DynamicComponent out of the component class and render it.
     * @internal
     */
    /**
     * Create a  DynamicComponent out of the component class and render it.
     * \@internal
     * @private
     * @param {?} component
     * @return {?}
     */
    DynamicOutletComponent.prototype.createComponent = /**
     * Create a  DynamicComponent out of the component class and render it.
     * \@internal
     * @private
     * @param {?} component
     * @return {?}
     */
    function (component) {
        if (this.dynamicComponent !== undefined) {
            this.dynamicComponent.destroy();
        }
        this.dynamicComponent =
            component instanceof DynamicComponent
                ? component
                : this.dynamicComponentService.create(component);
        this.renderComponent();
    };
    /**
     * Create and render the dynamic component. Set it's inputs and subscribers
     * @internal
     */
    /**
     * Create and render the dynamic component. Set it's inputs and subscribers
     * \@internal
     * @private
     * @return {?}
     */
    DynamicOutletComponent.prototype.renderComponent = /**
     * Create and render the dynamic component. Set it's inputs and subscribers
     * \@internal
     * @private
     * @return {?}
     */
    function () {
        this.updateInputs();
        this.updateSubscribers();
        this.dynamicComponent.setTarget(this.target);
    };
    /**
     * Update the dynamic component inputs. This is an update so any
     * key not defined won't be overwritten.
     * @internal
     */
    /**
     * Update the dynamic component inputs. This is an update so any
     * key not defined won't be overwritten.
     * \@internal
     * @private
     * @return {?}
     */
    DynamicOutletComponent.prototype.updateInputs = /**
     * Update the dynamic component inputs. This is an update so any
     * key not defined won't be overwritten.
     * \@internal
     * @private
     * @return {?}
     */
    function () {
        this.dynamicComponent.updateInputs(this.inputs);
    };
    /**
     * Update the dynamic component subscribers. This is an update so any
     * key not defined won't be overwritten.
     * @internal
     */
    /**
     * Update the dynamic component subscribers. This is an update so any
     * key not defined won't be overwritten.
     * \@internal
     * @private
     * @return {?}
     */
    DynamicOutletComponent.prototype.updateSubscribers = /**
     * Update the dynamic component subscribers. This is an update so any
     * key not defined won't be overwritten.
     * \@internal
     * @private
     * @return {?}
     */
    function () {
        this.dynamicComponent.updateSubscribers(this.subscribers);
    };
    DynamicOutletComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-dynamic-outlet',
                    template: "<ng-template #target></ng-template>\r\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [":host{display:block;width:100%;height:100%}"]
                }] }
    ];
    /** @nocollapse */
    DynamicOutletComponent.ctorParameters = function () { return [
        { type: DynamicComponentService },
        { type: ChangeDetectorRef }
    ]; };
    DynamicOutletComponent.propDecorators = {
        component: [{ type: Input }],
        inputs: [{ type: Input }],
        subscribers: [{ type: Input }],
        target: [{ type: ViewChild, args: ['target', { read: ViewContainerRef },] }]
    };
    return DynamicOutletComponent;
}());
export { DynamicOutletComponent };
if (false) {
    /**
     * The dynamic component base class or the dynamic component itself
     * @type {?}
     */
    DynamicOutletComponent.prototype.component;
    /**
     * The dynamic component inputs
     * @type {?}
     */
    DynamicOutletComponent.prototype.inputs;
    /**
     * The subscribers to the dynamic component outputs
     * @type {?}
     */
    DynamicOutletComponent.prototype.subscribers;
    /**
     * The dynamic component
     * @type {?}
     * @private
     */
    DynamicOutletComponent.prototype.dynamicComponent;
    /**
     * The view element to render the component to
     * @ignore
     * @type {?}
     * @private
     */
    DynamicOutletComponent.prototype.target;
    /**
     * @type {?}
     * @private
     */
    DynamicOutletComponent.prototype.dynamicComponentService;
    /**
     * @type {?}
     * @private
     */
    DynamicOutletComponent.prototype.cdRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHluYW1pYy1vdXRsZXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvY29tbW9uLyIsInNvdXJjZXMiOlsibGliL2R5bmFtaWMtY29tcG9uZW50L2R5bmFtaWMtb3V0bGV0L2R5bmFtaWMtb3V0bGV0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLEtBQUssRUFDTCxpQkFBaUIsRUFDakIsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFJVCxnQkFBZ0IsRUFDaEIsU0FBUyxFQUNWLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFFMUMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDL0QsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFFOUU7SUFrQ0UsZ0NBQ1UsdUJBQWdELEVBQ2hELEtBQXdCO1FBRHhCLDRCQUF1QixHQUF2Qix1QkFBdUIsQ0FBeUI7UUFDaEQsVUFBSyxHQUFMLEtBQUssQ0FBbUI7Ozs7UUFyQnpCLFdBQU0sR0FBMkIsRUFBRSxDQUFDOzs7O1FBS3BDLGdCQUFXLEdBQTRDLEVBQUUsQ0FBQztJQWlCaEUsQ0FBQztJQUVKOzs7OztPQUtHOzs7Ozs7Ozs7SUFDSCw0Q0FBVzs7Ozs7Ozs7SUFBWCxVQUFZLE9BQXNCOztZQUMxQixTQUFTLEdBQUcsT0FBTyxDQUFDLFNBQVM7O1lBQzdCLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTTs7WUFDdkIsV0FBVyxHQUFHLE9BQU8sQ0FBQyxXQUFXOztZQUNqQyxFQUFFLEdBQUcsV0FBVyxDQUFDLG9CQUFvQjtRQUUzQyxJQUFJLFNBQVMsSUFBSSxTQUFTLENBQUMsWUFBWSxLQUFLLFNBQVMsQ0FBQyxhQUFhLEVBQUU7WUFDbkUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDOUM7YUFBTTs7Z0JBQ0Msb0JBQW9CLEdBQ3hCLE1BQU0sSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLFlBQVksSUFBSSxFQUFFLEVBQUUsTUFBTSxDQUFDLGFBQWEsSUFBSSxFQUFFLENBQUM7O2dCQUMvRCx5QkFBeUIsR0FDN0IsV0FBVztnQkFDWCxFQUFFLENBQUMsV0FBVyxDQUFDLFlBQVksSUFBSSxFQUFFLEVBQUUsV0FBVyxDQUFDLGFBQWEsSUFBSSxFQUFFLENBQUM7WUFFckUsSUFBSSxvQkFBb0IsS0FBSyxLQUFLLEVBQUU7Z0JBQ2xDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQzthQUNyQjtZQUVELElBQUkseUJBQXlCLEtBQUssS0FBSyxFQUFFO2dCQUN2QyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQzthQUMxQjtTQUNGO1FBQ0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBRUQ7OztPQUdHOzs7Ozs7SUFDSCw0Q0FBVzs7Ozs7SUFBWDtRQUNFLElBQUksSUFBSSxDQUFDLGdCQUFnQixFQUFFO1lBQ3pCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUNqQztJQUNILENBQUM7SUFFRDs7O09BR0c7Ozs7Ozs7O0lBQ0ssZ0RBQWU7Ozs7Ozs7SUFBdkIsVUFBd0IsU0FBc0M7UUFDNUQsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEtBQUssU0FBUyxFQUFFO1lBQ3ZDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUNqQztRQUNELElBQUksQ0FBQyxnQkFBZ0I7WUFDbkIsU0FBUyxZQUFZLGdCQUFnQjtnQkFDbkMsQ0FBQyxDQUFDLFNBQVM7Z0JBQ1gsQ0FBQyxDQUFDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDckQsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFFRDs7O09BR0c7Ozs7Ozs7SUFDSyxnREFBZTs7Ozs7O0lBQXZCO1FBQ0UsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFRDs7OztPQUlHOzs7Ozs7OztJQUNLLDZDQUFZOzs7Ozs7O0lBQXBCO1FBQ0UsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUVEOzs7O09BSUc7Ozs7Ozs7O0lBQ0ssa0RBQWlCOzs7Ozs7O0lBQXpCO1FBQ0UsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUM1RCxDQUFDOztnQkExSEYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxvQkFBb0I7b0JBQzlCLG1EQUE0QztvQkFFNUMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2lCQUNoRDs7OztnQkFQUSx1QkFBdUI7Z0JBYjlCLGlCQUFpQjs7OzRCQXlCaEIsS0FBSzt5QkFLTCxLQUFLOzhCQUtMLEtBQUs7eUJBV0wsU0FBUyxTQUFDLFFBQVEsRUFBRSxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRTs7SUE0RmpELDZCQUFDO0NBQUEsQUEzSEQsSUEySEM7U0FySFksc0JBQXNCOzs7Ozs7SUFJakMsMkNBQWdEOzs7OztJQUtoRCx3Q0FBNkM7Ozs7O0lBSzdDLDZDQUFtRTs7Ozs7O0lBS25FLGtEQUFnRDs7Ozs7OztJQU1oRCx3Q0FDaUM7Ozs7O0lBRy9CLHlEQUF3RDs7Ozs7SUFDeEQsdUNBQWdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBJbnB1dCxcclxuICBDaGFuZ2VEZXRlY3RvclJlZixcclxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcclxuICBDb21wb25lbnQsXHJcbiAgT25DaGFuZ2VzLFxyXG4gIE9uRGVzdHJveSxcclxuICBTaW1wbGVDaGFuZ2VzLFxyXG4gIFZpZXdDb250YWluZXJSZWYsXHJcbiAgVmlld0NoaWxkXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBPYmplY3RVdGlscyB9IGZyb20gJ0BpZ28yL3V0aWxzJztcclxuXHJcbmltcG9ydCB7IER5bmFtaWNDb21wb25lbnQgfSBmcm9tICcuLi9zaGFyZWQvZHluYW1pYy1jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBEeW5hbWljQ29tcG9uZW50U2VydmljZSB9IGZyb20gJy4uL3NoYXJlZC9keW5hbWljLWNvbXBvbmVudC5zZXJ2aWNlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaWdvLWR5bmFtaWMtb3V0bGV0JyxcclxuICB0ZW1wbGF0ZVVybDogJ2R5bmFtaWMtb3V0bGV0LmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnZHluYW1pYy1vdXRsZXQuY29tcG9uZW50LnNjc3MnXSxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgRHluYW1pY091dGxldENvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcclxuICAvKipcclxuICAgKiBUaGUgZHluYW1pYyBjb21wb25lbnQgYmFzZSBjbGFzcyBvciB0aGUgZHluYW1pYyBjb21wb25lbnQgaXRzZWxmXHJcbiAgICovXHJcbiAgQElucHV0KCkgY29tcG9uZW50OiBEeW5hbWljQ29tcG9uZW50PGFueT4gfCBhbnk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBkeW5hbWljIGNvbXBvbmVudCBpbnB1dHNcclxuICAgKi9cclxuICBASW5wdXQoKSBpbnB1dHM6IHsgW2tleTogc3RyaW5nXTogYW55IH0gPSB7fTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIHN1YnNjcmliZXJzIHRvIHRoZSBkeW5hbWljIGNvbXBvbmVudCBvdXRwdXRzXHJcbiAgICovXHJcbiAgQElucHV0KCkgc3Vic2NyaWJlcnM6IHsgW2tleTogc3RyaW5nXTogKGV2ZW50OiBhbnkpID0+IHZvaWQgfSA9IHt9O1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgZHluYW1pYyBjb21wb25lbnRcclxuICAgKi9cclxuICBwcml2YXRlIGR5bmFtaWNDb21wb25lbnQ6IER5bmFtaWNDb21wb25lbnQ8YW55PjtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIHZpZXcgZWxlbWVudCB0byByZW5kZXIgdGhlIGNvbXBvbmVudCB0b1xyXG4gICAqIEBpZ25vcmVcclxuICAgKi9cclxuICBAVmlld0NoaWxkKCd0YXJnZXQnLCB7IHJlYWQ6IFZpZXdDb250YWluZXJSZWYgfSlcclxuICBwcml2YXRlIHRhcmdldDogVmlld0NvbnRhaW5lclJlZjtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGR5bmFtaWNDb21wb25lbnRTZXJ2aWNlOiBEeW5hbWljQ29tcG9uZW50U2VydmljZSxcclxuICAgIHByaXZhdGUgY2RSZWY6IENoYW5nZURldGVjdG9yUmVmXHJcbiAgKSB7fVxyXG5cclxuICAvKipcclxuICAgKiBJZiB0aGUgZHluYW1pYyBjb21wb25lbnQgY2hhbmdlcywgY3JlYXRlIGl0LlxyXG4gICAqIElmIHRoZSBpbnB1dHMgb3Igc3Vic2NyaWJlcnMgY2hhbmdlLCB1cGRhdGUgdGhlIGN1cnJlbnQgY29tcG9uZW50J3NcclxuICAgKiBpbnB1dHMgb3Igc3Vic2NyaWJlcnMuXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xyXG4gICAgY29uc3QgY29tcG9uZW50ID0gY2hhbmdlcy5jb21wb25lbnQ7XHJcbiAgICBjb25zdCBpbnB1dHMgPSBjaGFuZ2VzLmlucHV0cztcclxuICAgIGNvbnN0IHN1YnNjcmliZXJzID0gY2hhbmdlcy5zdWJzY3JpYmVycztcclxuICAgIGNvbnN0IGVxID0gT2JqZWN0VXRpbHMub2JqZWN0c0FyZUVxdWl2YWxlbnQ7XHJcblxyXG4gICAgaWYgKGNvbXBvbmVudCAmJiBjb21wb25lbnQuY3VycmVudFZhbHVlICE9PSBjb21wb25lbnQucHJldmlvdXNWYWx1ZSkge1xyXG4gICAgICB0aGlzLmNyZWF0ZUNvbXBvbmVudChjb21wb25lbnQuY3VycmVudFZhbHVlKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnN0IGlucHV0c0FyZUVxdWl2YWxlbnRzID1cclxuICAgICAgICBpbnB1dHMgJiYgZXEoaW5wdXRzLmN1cnJlbnRWYWx1ZSB8fCB7fSwgaW5wdXRzLnByZXZpb3VzVmFsdWUgfHwge30pO1xyXG4gICAgICBjb25zdCBzdWJzY3JpYmVyc0FyZUVxdWl2YWxlbnRzID1cclxuICAgICAgICBzdWJzY3JpYmVycyAmJlxyXG4gICAgICAgIGVxKHN1YnNjcmliZXJzLmN1cnJlbnRWYWx1ZSB8fCB7fSwgc3Vic2NyaWJlcnMucHJldmlvdXNWYWx1ZSB8fCB7fSk7XHJcblxyXG4gICAgICBpZiAoaW5wdXRzQXJlRXF1aXZhbGVudHMgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVJbnB1dHMoKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHN1YnNjcmliZXJzQXJlRXF1aXZhbGVudHMgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVTdWJzY3JpYmVycygpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB0aGlzLmNkUmVmLmRldGVjdENoYW5nZXMoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIERlc3Ryb3kgdGhlIGR5bmFtaWMgY29tcG9uZW50IGFuZCBhbGwgaXQncyBzdWJzY3JpYmVyc1xyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgaWYgKHRoaXMuZHluYW1pY0NvbXBvbmVudCkge1xyXG4gICAgICB0aGlzLmR5bmFtaWNDb21wb25lbnQuZGVzdHJveSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlIGEgIER5bmFtaWNDb21wb25lbnQgb3V0IG9mIHRoZSBjb21wb25lbnQgY2xhc3MgYW5kIHJlbmRlciBpdC5cclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBwcml2YXRlIGNyZWF0ZUNvbXBvbmVudChjb21wb25lbnQ6IER5bmFtaWNDb21wb25lbnQ8YW55PiB8IGFueSkge1xyXG4gICAgaWYgKHRoaXMuZHluYW1pY0NvbXBvbmVudCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMuZHluYW1pY0NvbXBvbmVudC5kZXN0cm95KCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmR5bmFtaWNDb21wb25lbnQgPVxyXG4gICAgICBjb21wb25lbnQgaW5zdGFuY2VvZiBEeW5hbWljQ29tcG9uZW50XHJcbiAgICAgICAgPyBjb21wb25lbnRcclxuICAgICAgICA6IHRoaXMuZHluYW1pY0NvbXBvbmVudFNlcnZpY2UuY3JlYXRlKGNvbXBvbmVudCk7XHJcbiAgICB0aGlzLnJlbmRlckNvbXBvbmVudCgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlIGFuZCByZW5kZXIgdGhlIGR5bmFtaWMgY29tcG9uZW50LiBTZXQgaXQncyBpbnB1dHMgYW5kIHN1YnNjcmliZXJzXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgcHJpdmF0ZSByZW5kZXJDb21wb25lbnQoKSB7XHJcbiAgICB0aGlzLnVwZGF0ZUlucHV0cygpO1xyXG4gICAgdGhpcy51cGRhdGVTdWJzY3JpYmVycygpO1xyXG4gICAgdGhpcy5keW5hbWljQ29tcG9uZW50LnNldFRhcmdldCh0aGlzLnRhcmdldCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVcGRhdGUgdGhlIGR5bmFtaWMgY29tcG9uZW50IGlucHV0cy4gVGhpcyBpcyBhbiB1cGRhdGUgc28gYW55XHJcbiAgICoga2V5IG5vdCBkZWZpbmVkIHdvbid0IGJlIG92ZXJ3cml0dGVuLlxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIHByaXZhdGUgdXBkYXRlSW5wdXRzKCkge1xyXG4gICAgdGhpcy5keW5hbWljQ29tcG9uZW50LnVwZGF0ZUlucHV0cyh0aGlzLmlucHV0cyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVcGRhdGUgdGhlIGR5bmFtaWMgY29tcG9uZW50IHN1YnNjcmliZXJzLiBUaGlzIGlzIGFuIHVwZGF0ZSBzbyBhbnlcclxuICAgKiBrZXkgbm90IGRlZmluZWQgd29uJ3QgYmUgb3ZlcndyaXR0ZW4uXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgcHJpdmF0ZSB1cGRhdGVTdWJzY3JpYmVycygpIHtcclxuICAgIHRoaXMuZHluYW1pY0NvbXBvbmVudC51cGRhdGVTdWJzY3JpYmVycyh0aGlzLnN1YnNjcmliZXJzKTtcclxuICB9XHJcbn1cclxuIl19
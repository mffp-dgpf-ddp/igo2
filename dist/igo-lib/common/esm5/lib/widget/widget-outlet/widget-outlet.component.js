/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { DynamicComponent } from '../../dynamic-component';
/**
 * This component dynamically renders a widget. It also subscribes
 * to the widget's 'cancel' and 'complete' events and destroys it
 * when any of those event is emitted.
 */
var WidgetOutletComponent = /** @class */ (function () {
    function WidgetOutletComponent() {
        var _this = this;
        /**
         * Widget subscribers to 'cancel' and 'complete'
         * \@internal
         */
        this.baseSubscribers = {
            cancel: (/**
             * @param {?} event
             * @return {?}
             */
            function (event) { return _this.onCancel(event); }),
            complete: (/**
             * @param {?} event
             * @return {?}
             */
            function (event) { return _this.onComplete(event); })
        };
        /**
         * Widget subscribers
         */
        this.subscribers = {};
        /**
         * Event emitted when the widget emits 'complete'
         */
        this.complete = new EventEmitter();
        /**
         * Event emitted when the widget emits 'cancel'
         */
        this.cancel = new EventEmitter();
    }
    /**
     * Destroy the current widget and all it's inner subscriptions
     * @internal
     */
    /**
     * Destroy the current widget and all it's inner subscriptions
     * \@internal
     * @return {?}
     */
    WidgetOutletComponent.prototype.ngOnDestroy = /**
     * Destroy the current widget and all it's inner subscriptions
     * \@internal
     * @return {?}
     */
    function () {
        this.destroyWidget();
    };
    /**
     * Get the effective subscribers. That means a combination of the base
     * subscribers and any subscriber given as input.
     * @returns Combined subscribers
     * @internal
     */
    /**
     * Get the effective subscribers. That means a combination of the base
     * subscribers and any subscriber given as input.
     * \@internal
     * @return {?} Combined subscribers
     */
    WidgetOutletComponent.prototype.getEffectiveSubscribers = /**
     * Get the effective subscribers. That means a combination of the base
     * subscribers and any subscriber given as input.
     * \@internal
     * @return {?} Combined subscribers
     */
    function () {
        var _this = this;
        /** @type {?} */
        var subscribers = Object.assign({}, this.subscribers);
        // Base subscribers
        Object.keys(this.baseSubscribers).forEach((/**
         * @param {?} key
         * @return {?}
         */
        function (key) {
            /** @type {?} */
            var subscriber = subscribers[key];
            /** @type {?} */
            var baseSubscriber = _this.baseSubscribers[key];
            if (subscriber !== undefined) {
                subscribers[key] = (/**
                 * @param {?} event
                 * @return {?}
                 */
                function (event) {
                    subscriber(event);
                    baseSubscriber(event);
                });
            }
            else {
                subscribers[key] = baseSubscriber;
            }
        }));
        return subscribers;
    };
    /**
     * When the widget emits 'cancel', propagate that event and destroy
     * the widget
     */
    /**
     * When the widget emits 'cancel', propagate that event and destroy
     * the widget
     * @private
     * @param {?} event
     * @return {?}
     */
    WidgetOutletComponent.prototype.onCancel = /**
     * When the widget emits 'cancel', propagate that event and destroy
     * the widget
     * @private
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.cancel.emit(event);
        this.destroyWidget();
    };
    /**
     * When the widget emits 'complete', propagate that event and destroy
     * the widget
     */
    /**
     * When the widget emits 'complete', propagate that event and destroy
     * the widget
     * @private
     * @param {?} event
     * @return {?}
     */
    WidgetOutletComponent.prototype.onComplete = /**
     * When the widget emits 'complete', propagate that event and destroy
     * the widget
     * @private
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.complete.emit(event);
        this.destroyWidget();
    };
    /**
     * Destroy the current widget
     */
    /**
     * Destroy the current widget
     * @private
     * @return {?}
     */
    WidgetOutletComponent.prototype.destroyWidget = /**
     * Destroy the current widget
     * @private
     * @return {?}
     */
    function () {
        if (this.widget !== undefined) {
            this.widget.destroy();
        }
        this.widget = undefined;
    };
    WidgetOutletComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-widget-outlet',
                    template: "<igo-dynamic-outlet\r\n  *ngIf=\"widget\"\r\n  [component]=\"widget\"\r\n  [inputs]=\"inputs\"\r\n  [subscribers]=\"getEffectiveSubscribers()\">\r\n</igo-dynamic-outlet>\r\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: ["igo-dynamic-outlet{height:100%}"]
                }] }
    ];
    /** @nocollapse */
    WidgetOutletComponent.ctorParameters = function () { return []; };
    WidgetOutletComponent.propDecorators = {
        widget: [{ type: Input }],
        inputs: [{ type: Input }],
        subscribers: [{ type: Input }],
        complete: [{ type: Output }],
        cancel: [{ type: Output }]
    };
    return WidgetOutletComponent;
}());
export { WidgetOutletComponent };
if (false) {
    /**
     * Widget subscribers to 'cancel' and 'complete'
     * \@internal
     * @type {?}
     * @private
     */
    WidgetOutletComponent.prototype.baseSubscribers;
    /**
     * Widget
     * @type {?}
     */
    WidgetOutletComponent.prototype.widget;
    /**
     * Widget inputs
     * @type {?}
     */
    WidgetOutletComponent.prototype.inputs;
    /**
     * Widget subscribers
     * @type {?}
     */
    WidgetOutletComponent.prototype.subscribers;
    /**
     * Event emitted when the widget emits 'complete'
     * @type {?}
     */
    WidgetOutletComponent.prototype.complete;
    /**
     * Event emitted when the widget emits 'cancel'
     * @type {?}
     */
    WidgetOutletComponent.prototype.cancel;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lkZ2V0LW91dGxldC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9jb21tb24vIiwic291cmNlcyI6WyJsaWIvd2lkZ2V0L3dpZGdldC1vdXRsZXQvd2lkZ2V0LW91dGxldC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBQ1osdUJBQXVCLEVBRXhCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDOzs7Ozs7QUFTM0Q7SUEwQ0U7UUFBQSxpQkFBZ0I7Ozs7O1FBOUJSLG9CQUFlLEdBQUc7WUFDeEIsTUFBTTs7OztZQUFFLFVBQUMsS0FBVSxJQUFLLE9BQUEsS0FBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBcEIsQ0FBb0IsQ0FBQTtZQUM1QyxRQUFROzs7O1lBQUUsVUFBQyxLQUFVLElBQUssT0FBQSxLQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxFQUF0QixDQUFzQixDQUFBO1NBQ2pELENBQUM7Ozs7UUFlTyxnQkFBVyxHQUEwQyxFQUFFLENBQUM7Ozs7UUFLdkQsYUFBUSxHQUFHLElBQUksWUFBWSxFQUFPLENBQUM7Ozs7UUFLbkMsV0FBTSxHQUFHLElBQUksWUFBWSxFQUFPLENBQUM7SUFFNUIsQ0FBQztJQUVoQjs7O09BR0c7Ozs7OztJQUNILDJDQUFXOzs7OztJQUFYO1FBQ0UsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFRDs7Ozs7T0FLRzs7Ozs7OztJQUNILHVEQUF1Qjs7Ozs7O0lBQXZCO1FBQUEsaUJBa0JDOztZQWpCTyxXQUFXLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUV2RCxtQkFBbUI7UUFDbkIsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsT0FBTzs7OztRQUFDLFVBQUMsR0FBVzs7Z0JBQzlDLFVBQVUsR0FBRyxXQUFXLENBQUMsR0FBRyxDQUFDOztnQkFDN0IsY0FBYyxHQUFHLEtBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDO1lBQ2hELElBQUksVUFBVSxLQUFLLFNBQVMsRUFBRTtnQkFDNUIsV0FBVyxDQUFDLEdBQUcsQ0FBQzs7OztnQkFBRyxVQUFDLEtBQVU7b0JBQzVCLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDbEIsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUN4QixDQUFDLENBQUEsQ0FBQzthQUNIO2lCQUFNO2dCQUNMLFdBQVcsQ0FBQyxHQUFHLENBQUMsR0FBRyxjQUFjLENBQUM7YUFDbkM7UUFDSCxDQUFDLEVBQUMsQ0FBQztRQUVILE9BQU8sV0FBVyxDQUFDO0lBQ3JCLENBQUM7SUFFRDs7O09BR0c7Ozs7Ozs7O0lBQ0ssd0NBQVE7Ozs7Ozs7SUFBaEIsVUFBaUIsS0FBVTtRQUN6QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN4QixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUVEOzs7T0FHRzs7Ozs7Ozs7SUFDSywwQ0FBVTs7Ozs7OztJQUFsQixVQUFtQixLQUFVO1FBQzNCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzFCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBRUQ7O09BRUc7Ozs7OztJQUNLLDZDQUFhOzs7OztJQUFyQjtRQUNFLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxTQUFTLEVBQUU7WUFDN0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUN2QjtRQUNELElBQUksQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDO0lBQzFCLENBQUM7O2dCQXhHRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLG1CQUFtQjtvQkFDN0IseUxBQTZDO29CQUU3QyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7aUJBQ2hEOzs7Ozt5QkFlRSxLQUFLO3lCQUtMLEtBQUs7OEJBS0wsS0FBSzsyQkFLTCxNQUFNO3lCQUtOLE1BQU07O0lBaUVULDRCQUFDO0NBQUEsQUF6R0QsSUF5R0M7U0FuR1kscUJBQXFCOzs7Ozs7OztJQU1oQyxnREFHRTs7Ozs7SUFLRix1Q0FBbUQ7Ozs7O0lBS25ELHVDQUFzQzs7Ozs7SUFLdEMsNENBQWlFOzs7OztJQUtqRSx5Q0FBNkM7Ozs7O0lBSzdDLHVDQUEyQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIElucHV0LFxyXG4gIE91dHB1dCxcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbiAgT25EZXN0cm95XHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBEeW5hbWljQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vZHluYW1pYy1jb21wb25lbnQnO1xyXG5cclxuaW1wb3J0IHsgV2lkZ2V0Q29tcG9uZW50IH0gZnJvbSAnLi4vc2hhcmVkL3dpZGdldC5pbnRlcmZhY2VzJztcclxuXHJcbi8qKlxyXG4gKiBUaGlzIGNvbXBvbmVudCBkeW5hbWljYWxseSByZW5kZXJzIGEgd2lkZ2V0LiBJdCBhbHNvIHN1YnNjcmliZXNcclxuICogdG8gdGhlIHdpZGdldCdzICdjYW5jZWwnIGFuZCAnY29tcGxldGUnIGV2ZW50cyBhbmQgZGVzdHJveXMgaXRcclxuICogd2hlbiBhbnkgb2YgdGhvc2UgZXZlbnQgaXMgZW1pdHRlZC5cclxuICovXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaWdvLXdpZGdldC1vdXRsZXQnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi93aWRnZXQtb3V0bGV0LmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi93aWRnZXQtb3V0bGV0LmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIFdpZGdldE91dGxldENvbXBvbmVudCBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XHJcblxyXG4gIC8qKlxyXG4gICAqIFdpZGdldCBzdWJzY3JpYmVycyB0byAnY2FuY2VsJyBhbmQgJ2NvbXBsZXRlJ1xyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIHByaXZhdGUgYmFzZVN1YnNjcmliZXJzID0ge1xyXG4gICAgY2FuY2VsOiAoZXZlbnQ6IGFueSkgPT4gdGhpcy5vbkNhbmNlbChldmVudCksXHJcbiAgICBjb21wbGV0ZTogKGV2ZW50OiBhbnkpID0+IHRoaXMub25Db21wbGV0ZShldmVudClcclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBXaWRnZXRcclxuICAgKi9cclxuICBASW5wdXQoKSB3aWRnZXQ6IER5bmFtaWNDb21wb25lbnQ8V2lkZ2V0Q29tcG9uZW50PjtcclxuXHJcbiAgLyoqXHJcbiAgICogV2lkZ2V0IGlucHV0c1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGlucHV0czoge1trZXk6IHN0cmluZ106IGFueX07XHJcblxyXG4gIC8qKlxyXG4gICAqIFdpZGdldCBzdWJzY3JpYmVyc1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHN1YnNjcmliZXJzOiB7W2tleTogc3RyaW5nXTogKGV2ZW50OiBhbnkpID0+IHZvaWR9ID0ge307XHJcblxyXG4gIC8qKlxyXG4gICAqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgd2lkZ2V0IGVtaXRzICdjb21wbGV0ZSdcclxuICAgKi9cclxuICBAT3V0cHV0KCkgY29tcGxldGUgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSB3aWRnZXQgZW1pdHMgJ2NhbmNlbCdcclxuICAgKi9cclxuICBAT3V0cHV0KCkgY2FuY2VsID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge31cclxuXHJcbiAgLyoqXHJcbiAgICogRGVzdHJveSB0aGUgY3VycmVudCB3aWRnZXQgYW5kIGFsbCBpdCdzIGlubmVyIHN1YnNjcmlwdGlvbnNcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMuZGVzdHJveVdpZGdldCgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBlZmZlY3RpdmUgc3Vic2NyaWJlcnMuIFRoYXQgbWVhbnMgYSBjb21iaW5hdGlvbiBvZiB0aGUgYmFzZVxyXG4gICAqIHN1YnNjcmliZXJzIGFuZCBhbnkgc3Vic2NyaWJlciBnaXZlbiBhcyBpbnB1dC5cclxuICAgKiBAcmV0dXJucyBDb21iaW5lZCBzdWJzY3JpYmVyc1xyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIGdldEVmZmVjdGl2ZVN1YnNjcmliZXJzKCk6IHtba2V5OiBzdHJpbmddOiAoZXZlbnQ6IGFueSkgPT4gdm9pZH0ge1xyXG4gICAgY29uc3Qgc3Vic2NyaWJlcnMgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLnN1YnNjcmliZXJzKTtcclxuXHJcbiAgICAvLyBCYXNlIHN1YnNjcmliZXJzXHJcbiAgICBPYmplY3Qua2V5cyh0aGlzLmJhc2VTdWJzY3JpYmVycykuZm9yRWFjaCgoa2V5OiBzdHJpbmcpID0+IHtcclxuICAgICAgY29uc3Qgc3Vic2NyaWJlciA9IHN1YnNjcmliZXJzW2tleV07XHJcbiAgICAgIGNvbnN0IGJhc2VTdWJzY3JpYmVyID0gdGhpcy5iYXNlU3Vic2NyaWJlcnNba2V5XTtcclxuICAgICAgaWYgKHN1YnNjcmliZXIgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHN1YnNjcmliZXJzW2tleV0gPSAoZXZlbnQ6IGFueSkgPT4ge1xyXG4gICAgICAgICAgc3Vic2NyaWJlcihldmVudCk7XHJcbiAgICAgICAgICBiYXNlU3Vic2NyaWJlcihldmVudCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBzdWJzY3JpYmVyc1trZXldID0gYmFzZVN1YnNjcmliZXI7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBzdWJzY3JpYmVycztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZW4gdGhlIHdpZGdldCBlbWl0cyAnY2FuY2VsJywgcHJvcGFnYXRlIHRoYXQgZXZlbnQgYW5kIGRlc3Ryb3lcclxuICAgKiB0aGUgd2lkZ2V0XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBvbkNhbmNlbChldmVudDogYW55KSB7XHJcbiAgICB0aGlzLmNhbmNlbC5lbWl0KGV2ZW50KTtcclxuICAgIHRoaXMuZGVzdHJveVdpZGdldCgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogV2hlbiB0aGUgd2lkZ2V0IGVtaXRzICdjb21wbGV0ZScsIHByb3BhZ2F0ZSB0aGF0IGV2ZW50IGFuZCBkZXN0cm95XHJcbiAgICogdGhlIHdpZGdldFxyXG4gICAqL1xyXG4gIHByaXZhdGUgb25Db21wbGV0ZShldmVudDogYW55KSB7XHJcbiAgICB0aGlzLmNvbXBsZXRlLmVtaXQoZXZlbnQpO1xyXG4gICAgdGhpcy5kZXN0cm95V2lkZ2V0KCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBEZXN0cm95IHRoZSBjdXJyZW50IHdpZGdldFxyXG4gICAqL1xyXG4gIHByaXZhdGUgZGVzdHJveVdpZGdldCgpIHtcclxuICAgIGlmICh0aGlzLndpZGdldCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMud2lkZ2V0LmRlc3Ryb3koKTtcclxuICAgIH1cclxuICAgIHRoaXMud2lkZ2V0ID0gdW5kZWZpbmVkO1xyXG4gIH1cclxufVxyXG4iXX0=
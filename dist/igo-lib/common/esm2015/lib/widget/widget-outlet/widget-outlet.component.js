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
export class WidgetOutletComponent {
    constructor() {
        /**
         * Widget subscribers to 'cancel' and 'complete'
         * \@internal
         */
        this.baseSubscribers = {
            cancel: (/**
             * @param {?} event
             * @return {?}
             */
            (event) => this.onCancel(event)),
            complete: (/**
             * @param {?} event
             * @return {?}
             */
            (event) => this.onComplete(event))
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
     * \@internal
     * @return {?}
     */
    ngOnDestroy() {
        this.destroyWidget();
    }
    /**
     * Get the effective subscribers. That means a combination of the base
     * subscribers and any subscriber given as input.
     * \@internal
     * @return {?} Combined subscribers
     */
    getEffectiveSubscribers() {
        /** @type {?} */
        const subscribers = Object.assign({}, this.subscribers);
        // Base subscribers
        Object.keys(this.baseSubscribers).forEach((/**
         * @param {?} key
         * @return {?}
         */
        (key) => {
            /** @type {?} */
            const subscriber = subscribers[key];
            /** @type {?} */
            const baseSubscriber = this.baseSubscribers[key];
            if (subscriber !== undefined) {
                subscribers[key] = (/**
                 * @param {?} event
                 * @return {?}
                 */
                (event) => {
                    subscriber(event);
                    baseSubscriber(event);
                });
            }
            else {
                subscribers[key] = baseSubscriber;
            }
        }));
        return subscribers;
    }
    /**
     * When the widget emits 'cancel', propagate that event and destroy
     * the widget
     * @private
     * @param {?} event
     * @return {?}
     */
    onCancel(event) {
        this.cancel.emit(event);
        this.destroyWidget();
    }
    /**
     * When the widget emits 'complete', propagate that event and destroy
     * the widget
     * @private
     * @param {?} event
     * @return {?}
     */
    onComplete(event) {
        this.complete.emit(event);
        this.destroyWidget();
    }
    /**
     * Destroy the current widget
     * @private
     * @return {?}
     */
    destroyWidget() {
        if (this.widget !== undefined) {
            this.widget.destroy();
        }
        this.widget = undefined;
    }
}
WidgetOutletComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-widget-outlet',
                template: "<igo-dynamic-outlet\r\n  *ngIf=\"widget\"\r\n  [component]=\"widget\"\r\n  [inputs]=\"inputs\"\r\n  [subscribers]=\"getEffectiveSubscribers()\">\r\n</igo-dynamic-outlet>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["igo-dynamic-outlet{height:100%}"]
            }] }
];
/** @nocollapse */
WidgetOutletComponent.ctorParameters = () => [];
WidgetOutletComponent.propDecorators = {
    widget: [{ type: Input }],
    inputs: [{ type: Input }],
    subscribers: [{ type: Input }],
    complete: [{ type: Output }],
    cancel: [{ type: Output }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lkZ2V0LW91dGxldC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9jb21tb24vIiwic291cmNlcyI6WyJsaWIvd2lkZ2V0L3dpZGdldC1vdXRsZXQvd2lkZ2V0LW91dGxldC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBQ1osdUJBQXVCLEVBRXhCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDOzs7Ozs7QUFlM0QsTUFBTSxPQUFPLHFCQUFxQjtJQW9DaEM7Ozs7O1FBOUJRLG9CQUFlLEdBQUc7WUFDeEIsTUFBTTs7OztZQUFFLENBQUMsS0FBVSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFBO1lBQzVDLFFBQVE7Ozs7WUFBRSxDQUFDLEtBQVUsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQTtTQUNqRCxDQUFDOzs7O1FBZU8sZ0JBQVcsR0FBMEMsRUFBRSxDQUFDOzs7O1FBS3ZELGFBQVEsR0FBRyxJQUFJLFlBQVksRUFBTyxDQUFDOzs7O1FBS25DLFdBQU0sR0FBRyxJQUFJLFlBQVksRUFBTyxDQUFDO0lBRTVCLENBQUM7Ozs7OztJQU1oQixXQUFXO1FBQ1QsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7Ozs7Ozs7SUFRRCx1QkFBdUI7O2NBQ2YsV0FBVyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUM7UUFFdkQsbUJBQW1CO1FBQ25CLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLE9BQU87Ozs7UUFBQyxDQUFDLEdBQVcsRUFBRSxFQUFFOztrQkFDbEQsVUFBVSxHQUFHLFdBQVcsQ0FBQyxHQUFHLENBQUM7O2tCQUM3QixjQUFjLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUM7WUFDaEQsSUFBSSxVQUFVLEtBQUssU0FBUyxFQUFFO2dCQUM1QixXQUFXLENBQUMsR0FBRyxDQUFDOzs7O2dCQUFHLENBQUMsS0FBVSxFQUFFLEVBQUU7b0JBQ2hDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDbEIsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUN4QixDQUFDLENBQUEsQ0FBQzthQUNIO2lCQUFNO2dCQUNMLFdBQVcsQ0FBQyxHQUFHLENBQUMsR0FBRyxjQUFjLENBQUM7YUFDbkM7UUFDSCxDQUFDLEVBQUMsQ0FBQztRQUVILE9BQU8sV0FBVyxDQUFDO0lBQ3JCLENBQUM7Ozs7Ozs7O0lBTU8sUUFBUSxDQUFDLEtBQVU7UUFDekIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDeEIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7Ozs7Ozs7O0lBTU8sVUFBVSxDQUFDLEtBQVU7UUFDM0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDMUIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7Ozs7OztJQUtPLGFBQWE7UUFDbkIsSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLFNBQVMsRUFBRTtZQUM3QixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQ3ZCO1FBQ0QsSUFBSSxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUM7SUFDMUIsQ0FBQzs7O1lBeEdGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsbUJBQW1CO2dCQUM3Qix5TEFBNkM7Z0JBRTdDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOzthQUNoRDs7Ozs7cUJBZUUsS0FBSztxQkFLTCxLQUFLOzBCQUtMLEtBQUs7dUJBS0wsTUFBTTtxQkFLTixNQUFNOzs7Ozs7Ozs7SUE1QlAsZ0RBR0U7Ozs7O0lBS0YsdUNBQW1EOzs7OztJQUtuRCx1Q0FBc0M7Ozs7O0lBS3RDLDRDQUFpRTs7Ozs7SUFLakUseUNBQTZDOzs7OztJQUs3Qyx1Q0FBMkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBJbnB1dCxcclxuICBPdXRwdXQsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gIE9uRGVzdHJveVxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgRHluYW1pY0NvbXBvbmVudCB9IGZyb20gJy4uLy4uL2R5bmFtaWMtY29tcG9uZW50JztcclxuXHJcbmltcG9ydCB7IFdpZGdldENvbXBvbmVudCB9IGZyb20gJy4uL3NoYXJlZC93aWRnZXQuaW50ZXJmYWNlcyc7XHJcblxyXG4vKipcclxuICogVGhpcyBjb21wb25lbnQgZHluYW1pY2FsbHkgcmVuZGVycyBhIHdpZGdldC4gSXQgYWxzbyBzdWJzY3JpYmVzXHJcbiAqIHRvIHRoZSB3aWRnZXQncyAnY2FuY2VsJyBhbmQgJ2NvbXBsZXRlJyBldmVudHMgYW5kIGRlc3Ryb3lzIGl0XHJcbiAqIHdoZW4gYW55IG9mIHRob3NlIGV2ZW50IGlzIGVtaXR0ZWQuXHJcbiAqL1xyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2lnby13aWRnZXQtb3V0bGV0JyxcclxuICB0ZW1wbGF0ZVVybDogJy4vd2lkZ2V0LW91dGxldC5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vd2lkZ2V0LW91dGxldC5jb21wb25lbnQuc2NzcyddLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBXaWRnZXRPdXRsZXRDb21wb25lbnQgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xyXG5cclxuICAvKipcclxuICAgKiBXaWRnZXQgc3Vic2NyaWJlcnMgdG8gJ2NhbmNlbCcgYW5kICdjb21wbGV0ZSdcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBwcml2YXRlIGJhc2VTdWJzY3JpYmVycyA9IHtcclxuICAgIGNhbmNlbDogKGV2ZW50OiBhbnkpID0+IHRoaXMub25DYW5jZWwoZXZlbnQpLFxyXG4gICAgY29tcGxldGU6IChldmVudDogYW55KSA9PiB0aGlzLm9uQ29tcGxldGUoZXZlbnQpXHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogV2lkZ2V0XHJcbiAgICovXHJcbiAgQElucHV0KCkgd2lkZ2V0OiBEeW5hbWljQ29tcG9uZW50PFdpZGdldENvbXBvbmVudD47XHJcblxyXG4gIC8qKlxyXG4gICAqIFdpZGdldCBpbnB1dHNcclxuICAgKi9cclxuICBASW5wdXQoKSBpbnB1dHM6IHtba2V5OiBzdHJpbmddOiBhbnl9O1xyXG5cclxuICAvKipcclxuICAgKiBXaWRnZXQgc3Vic2NyaWJlcnNcclxuICAgKi9cclxuICBASW5wdXQoKSBzdWJzY3JpYmVyczoge1trZXk6IHN0cmluZ106IChldmVudDogYW55KSA9PiB2b2lkfSA9IHt9O1xyXG5cclxuICAvKipcclxuICAgKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIHdpZGdldCBlbWl0cyAnY29tcGxldGUnXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIGNvbXBsZXRlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgd2lkZ2V0IGVtaXRzICdjYW5jZWwnXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIGNhbmNlbCA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHt9XHJcblxyXG4gIC8qKlxyXG4gICAqIERlc3Ryb3kgdGhlIGN1cnJlbnQgd2lkZ2V0IGFuZCBhbGwgaXQncyBpbm5lciBzdWJzY3JpcHRpb25zXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLmRlc3Ryb3lXaWRnZXQoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCB0aGUgZWZmZWN0aXZlIHN1YnNjcmliZXJzLiBUaGF0IG1lYW5zIGEgY29tYmluYXRpb24gb2YgdGhlIGJhc2VcclxuICAgKiBzdWJzY3JpYmVycyBhbmQgYW55IHN1YnNjcmliZXIgZ2l2ZW4gYXMgaW5wdXQuXHJcbiAgICogQHJldHVybnMgQ29tYmluZWQgc3Vic2NyaWJlcnNcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBnZXRFZmZlY3RpdmVTdWJzY3JpYmVycygpOiB7W2tleTogc3RyaW5nXTogKGV2ZW50OiBhbnkpID0+IHZvaWR9IHtcclxuICAgIGNvbnN0IHN1YnNjcmliZXJzID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5zdWJzY3JpYmVycyk7XHJcblxyXG4gICAgLy8gQmFzZSBzdWJzY3JpYmVyc1xyXG4gICAgT2JqZWN0LmtleXModGhpcy5iYXNlU3Vic2NyaWJlcnMpLmZvckVhY2goKGtleTogc3RyaW5nKSA9PiB7XHJcbiAgICAgIGNvbnN0IHN1YnNjcmliZXIgPSBzdWJzY3JpYmVyc1trZXldO1xyXG4gICAgICBjb25zdCBiYXNlU3Vic2NyaWJlciA9IHRoaXMuYmFzZVN1YnNjcmliZXJzW2tleV07XHJcbiAgICAgIGlmIChzdWJzY3JpYmVyICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBzdWJzY3JpYmVyc1trZXldID0gKGV2ZW50OiBhbnkpID0+IHtcclxuICAgICAgICAgIHN1YnNjcmliZXIoZXZlbnQpO1xyXG4gICAgICAgICAgYmFzZVN1YnNjcmliZXIoZXZlbnQpO1xyXG4gICAgICAgIH07XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgc3Vic2NyaWJlcnNba2V5XSA9IGJhc2VTdWJzY3JpYmVyO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gc3Vic2NyaWJlcnM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBXaGVuIHRoZSB3aWRnZXQgZW1pdHMgJ2NhbmNlbCcsIHByb3BhZ2F0ZSB0aGF0IGV2ZW50IGFuZCBkZXN0cm95XHJcbiAgICogdGhlIHdpZGdldFxyXG4gICAqL1xyXG4gIHByaXZhdGUgb25DYW5jZWwoZXZlbnQ6IGFueSkge1xyXG4gICAgdGhpcy5jYW5jZWwuZW1pdChldmVudCk7XHJcbiAgICB0aGlzLmRlc3Ryb3lXaWRnZXQoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZW4gdGhlIHdpZGdldCBlbWl0cyAnY29tcGxldGUnLCBwcm9wYWdhdGUgdGhhdCBldmVudCBhbmQgZGVzdHJveVxyXG4gICAqIHRoZSB3aWRnZXRcclxuICAgKi9cclxuICBwcml2YXRlIG9uQ29tcGxldGUoZXZlbnQ6IGFueSkge1xyXG4gICAgdGhpcy5jb21wbGV0ZS5lbWl0KGV2ZW50KTtcclxuICAgIHRoaXMuZGVzdHJveVdpZGdldCgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRGVzdHJveSB0aGUgY3VycmVudCB3aWRnZXRcclxuICAgKi9cclxuICBwcml2YXRlIGRlc3Ryb3lXaWRnZXQoKSB7XHJcbiAgICBpZiAodGhpcy53aWRnZXQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLndpZGdldC5kZXN0cm95KCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLndpZGdldCA9IHVuZGVmaW5lZDtcclxuICB9XHJcbn1cclxuIl19
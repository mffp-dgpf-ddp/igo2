/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * This class is used in the DynamicComponentOutlet component. It holds
 * a reference to a component factory and can render that component
 * in a target element on demand. It's also possible to set inputs
 * and to subscribe to outputs.
 * @template C
 */
var /**
 * This class is used in the DynamicComponentOutlet component. It holds
 * a reference to a component factory and can render that component
 * in a target element on demand. It's also possible to set inputs
 * and to subscribe to outputs.
 * @template C
 */
DynamicComponent = /** @class */ (function () {
    function DynamicComponent(componentFactory) {
        this.componentFactory = componentFactory;
        /**
         * Subscriptions to the component's outputs. Those need
         * to be unsubscribed when the component is destroyed.
         */
        this.subscriptions = [];
        /**
         * Component inputs
         */
        this.inputs = {};
        /**
         * Subscribers to the component's outputs
         */
        this.subscribers = {};
    }
    /**
     * Render the component to a target element.
     * Set it's inputs and subscribe to it's outputs.
     * @param target Target element
     */
    /**
     * Render the component to a target element.
     * Set it's inputs and subscribe to it's outputs.
     * @param {?} target Target element
     * @return {?}
     */
    DynamicComponent.prototype.setTarget = /**
     * Render the component to a target element.
     * Set it's inputs and subscribe to it's outputs.
     * @param {?} target Target element
     * @return {?}
     */
    function (target) {
        this.target = target;
        this.componentRef = target.createComponent(this.componentFactory);
        this.updateInputs(this.inputs);
        this.updateSubscribers(this.subscribers);
    };
    /**
     * Destroy this component. That means, removing from it's target
     * element and unsubscribing to it's outputs.
     */
    /**
     * Destroy this component. That means, removing from it's target
     * element and unsubscribing to it's outputs.
     * @return {?}
     */
    DynamicComponent.prototype.destroy = /**
     * Destroy this component. That means, removing from it's target
     * element and unsubscribing to it's outputs.
     * @return {?}
     */
    function () {
        if (this.target !== undefined) {
            this.target.clear();
        }
        if (this.componentRef !== undefined) {
            this.componentRef.destroy();
            this.componentRef = undefined;
        }
        this.unsubscribeAll();
    };
    /**
     * Update the component inputs. This is an update so any
     * key not defined won't be overwritten.
     */
    /**
     * Update the component inputs. This is an update so any
     * key not defined won't be overwritten.
     * @param {?} inputs
     * @return {?}
     */
    DynamicComponent.prototype.updateInputs = /**
     * Update the component inputs. This is an update so any
     * key not defined won't be overwritten.
     * @param {?} inputs
     * @return {?}
     */
    function (inputs) {
        this.inputs = inputs;
        if (this.componentRef === undefined) {
            return;
        }
        /** @type {?} */
        var instance = this.componentRef.instance;
        /** @type {?} */
        var allowedInputs = this.componentFactory.inputs;
        allowedInputs.forEach((/**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            /** @type {?} */
            var key = value.propName;
            if (inputs.hasOwnProperty(key)) {
                instance[key] = inputs[key];
            }
        }));
        if (typeof ((/** @type {?} */ (instance))).onUpdateInputs === 'function') {
            ((/** @type {?} */ (instance))).onUpdateInputs();
        }
    };
    /**
     * Update the component subscribers. This is an update so any
     * key not defined won't be overwritten.
     */
    /**
     * Update the component subscribers. This is an update so any
     * key not defined won't be overwritten.
     * @param {?} subscribers
     * @return {?}
     */
    DynamicComponent.prototype.updateSubscribers = /**
     * Update the component subscribers. This is an update so any
     * key not defined won't be overwritten.
     * @param {?} subscribers
     * @return {?}
     */
    function (subscribers) {
        var _this = this;
        this.subscribers = subscribers;
        if (this.componentRef === undefined) {
            return;
        }
        /** @type {?} */
        var instance = this.componentRef.instance;
        /** @type {?} */
        var allowedSubscribers = this.componentFactory.outputs;
        allowedSubscribers.forEach((/**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            /** @type {?} */
            var key = value.propName;
            if (subscribers.hasOwnProperty(key)) {
                /** @type {?} */
                var emitter_1 = instance[key];
                /** @type {?} */
                var subscriber = subscribers[key];
                if (Array.isArray(subscriber)) {
                    subscriber.forEach((/**
                     * @param {?} _subscriber
                     * @return {?}
                     */
                    function (_subscriber) {
                        _this.subscriptions.push(emitter_1.subscribe(_subscriber));
                    }));
                }
                else {
                    _this.subscriptions.push(emitter_1.subscribe(subscriber));
                }
            }
        }));
    };
    /**
     * Unsubscribe to all outputs.
     */
    /**
     * Unsubscribe to all outputs.
     * @private
     * @return {?}
     */
    DynamicComponent.prototype.unsubscribeAll = /**
     * Unsubscribe to all outputs.
     * @private
     * @return {?}
     */
    function () {
        this.subscriptions.forEach((/**
         * @param {?} s
         * @return {?}
         */
        function (s) { return s.unsubscribe(); }));
        this.subscriptions = [];
    };
    return DynamicComponent;
}());
/**
 * This class is used in the DynamicComponentOutlet component. It holds
 * a reference to a component factory and can render that component
 * in a target element on demand. It's also possible to set inputs
 * and to subscribe to outputs.
 * @template C
 */
export { DynamicComponent };
if (false) {
    /**
     * Component reference
     * @type {?}
     * @private
     */
    DynamicComponent.prototype.componentRef;
    /**
     * Subscriptions to the component's outputs. Those need
     * to be unsubscribed when the component is destroyed.
     * @type {?}
     * @private
     */
    DynamicComponent.prototype.subscriptions;
    /**
     * Component target element
     * @type {?}
     * @private
     */
    DynamicComponent.prototype.target;
    /**
     * Component inputs
     * @type {?}
     * @private
     */
    DynamicComponent.prototype.inputs;
    /**
     * Subscribers to the component's outputs
     * @type {?}
     * @private
     */
    DynamicComponent.prototype.subscribers;
    /**
     * @type {?}
     * @private
     */
    DynamicComponent.prototype.componentFactory;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHluYW1pYy1jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9jb21tb24vIiwic291cmNlcyI6WyJsaWIvZHluYW1pYy1jb21wb25lbnQvc2hhcmVkL2R5bmFtaWMtY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBY0E7Ozs7Ozs7O0lBNEJFLDBCQUFvQixnQkFBcUM7UUFBckMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFxQjs7Ozs7UUFqQmpELGtCQUFhLEdBQW1CLEVBQUUsQ0FBQzs7OztRQVVuQyxXQUFNLEdBQXlCLEVBQUUsQ0FBQzs7OztRQUtsQyxnQkFBVyxHQUEwQyxFQUFFLENBQUM7SUFFSixDQUFDO0lBRTdEOzs7O09BSUc7Ozs7Ozs7SUFDSCxvQ0FBUzs7Ozs7O0lBQVQsVUFBVSxNQUF3QjtRQUNoQyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDbEUsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDL0IsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRUQ7OztPQUdHOzs7Ozs7SUFDSCxrQ0FBTzs7Ozs7SUFBUDtRQUNFLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxTQUFTLEVBQUU7WUFDN0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUNyQjtRQUNELElBQUksSUFBSSxDQUFDLFlBQVksS0FBSyxTQUFTLEVBQUU7WUFDbkMsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUM1QixJQUFJLENBQUMsWUFBWSxHQUFHLFNBQVMsQ0FBQztTQUMvQjtRQUNELElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBRUQ7OztPQUdHOzs7Ozs7O0lBQ0gsdUNBQVk7Ozs7OztJQUFaLFVBQWEsTUFBNEI7UUFDdkMsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxJQUFJLENBQUMsWUFBWSxLQUFLLFNBQVMsRUFBRTtZQUNuQyxPQUFPO1NBQ1I7O1lBRUssUUFBUSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUTs7WUFDckMsYUFBYSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNO1FBQ2xELGFBQWEsQ0FBQyxPQUFPOzs7O1FBQUMsVUFBQyxLQUFpRDs7Z0JBQ2hFLEdBQUcsR0FBRyxLQUFLLENBQUMsUUFBUTtZQUMxQixJQUFJLE1BQU0sQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQzlCLFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDN0I7UUFDSCxDQUFDLEVBQUMsQ0FBQztRQUVILElBQUksT0FBTyxDQUFDLG1CQUFBLFFBQVEsRUFBTyxDQUFDLENBQUMsY0FBYyxLQUFLLFVBQVUsRUFBRTtZQUMxRCxDQUFDLG1CQUFBLFFBQVEsRUFBTyxDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7U0FDcEM7SUFDSCxDQUFDO0lBRUQ7OztPQUdHOzs7Ozs7O0lBQ0gsNENBQWlCOzs7Ozs7SUFBakIsVUFBa0IsV0FBa0Q7UUFBcEUsaUJBc0JDO1FBckJDLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1FBQy9CLElBQUksSUFBSSxDQUFDLFlBQVksS0FBSyxTQUFTLEVBQUU7WUFDbkMsT0FBTztTQUNSOztZQUVLLFFBQVEsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVE7O1lBQ3JDLGtCQUFrQixHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPO1FBQ3hELGtCQUFrQixDQUFDLE9BQU87Ozs7UUFBQyxVQUFDLEtBQWlEOztnQkFDckUsR0FBRyxHQUFHLEtBQUssQ0FBQyxRQUFRO1lBQzFCLElBQUksV0FBVyxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsRUFBRTs7b0JBQzdCLFNBQU8sR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDOztvQkFDdkIsVUFBVSxHQUFHLFdBQVcsQ0FBQyxHQUFHLENBQUM7Z0JBQ25DLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsRUFBRTtvQkFDN0IsVUFBVSxDQUFDLE9BQU87Ozs7b0JBQUMsVUFBQyxXQUFXO3dCQUM3QixLQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxTQUFPLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7b0JBQzFELENBQUMsRUFBQyxDQUFDO2lCQUNKO3FCQUFNO29CQUNMLEtBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFNBQU8sQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztpQkFDeEQ7YUFDRjtRQUNILENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQztJQUVEOztPQUVHOzs7Ozs7SUFDSyx5Q0FBYzs7Ozs7SUFBdEI7UUFDRSxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU87Ozs7UUFBQyxVQUFDLENBQWUsSUFBSyxPQUFBLENBQUMsQ0FBQyxXQUFXLEVBQUUsRUFBZixDQUFlLEVBQUMsQ0FBQztRQUNqRSxJQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBRUgsdUJBQUM7QUFBRCxDQUFDLEFBckhELElBcUhDOzs7Ozs7Ozs7Ozs7Ozs7SUFoSEMsd0NBQXNDOzs7Ozs7O0lBTXRDLHlDQUEyQzs7Ozs7O0lBSzNDLGtDQUFpQzs7Ozs7O0lBS2pDLGtDQUEwQzs7Ozs7O0lBSzFDLHVDQUFnRTs7Ozs7SUFFcEQsNENBQTZDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnRGYWN0b3J5LFxyXG4gIENvbXBvbmVudFJlZixcclxuICBWaWV3Q29udGFpbmVyUmVmXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuXHJcbi8qKlxyXG4gKiBUaGlzIGNsYXNzIGlzIHVzZWQgaW4gdGhlIER5bmFtaWNDb21wb25lbnRPdXRsZXQgY29tcG9uZW50LiBJdCBob2xkc1xyXG4gKiBhIHJlZmVyZW5jZSB0byBhIGNvbXBvbmVudCBmYWN0b3J5IGFuZCBjYW4gcmVuZGVyIHRoYXQgY29tcG9uZW50XHJcbiAqIGluIGEgdGFyZ2V0IGVsZW1lbnQgb24gZGVtYW5kLiBJdCdzIGFsc28gcG9zc2libGUgdG8gc2V0IGlucHV0c1xyXG4gKiBhbmQgdG8gc3Vic2NyaWJlIHRvIG91dHB1dHMuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgRHluYW1pY0NvbXBvbmVudDxDPiB7XHJcblxyXG4gIC8qKlxyXG4gICAqIENvbXBvbmVudCByZWZlcmVuY2VcclxuICAgKi9cclxuICBwcml2YXRlIGNvbXBvbmVudFJlZjogQ29tcG9uZW50UmVmPEM+O1xyXG5cclxuICAvKipcclxuICAgKiBTdWJzY3JpcHRpb25zIHRvIHRoZSBjb21wb25lbnQncyBvdXRwdXRzLiBUaG9zZSBuZWVkXHJcbiAgICogdG8gYmUgdW5zdWJzY3JpYmVkIHdoZW4gdGhlIGNvbXBvbmVudCBpcyBkZXN0cm95ZWQuXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xyXG5cclxuICAvKipcclxuICAgKiBDb21wb25lbnQgdGFyZ2V0IGVsZW1lbnRcclxuICAgKi9cclxuICBwcml2YXRlIHRhcmdldDogVmlld0NvbnRhaW5lclJlZjtcclxuXHJcbiAgLyoqXHJcbiAgICogQ29tcG9uZW50IGlucHV0c1xyXG4gICAqL1xyXG4gIHByaXZhdGUgaW5wdXRzOiB7W2tleTogc3RyaW5nXTogYW55fSA9IHt9O1xyXG5cclxuICAvKipcclxuICAgKiBTdWJzY3JpYmVycyB0byB0aGUgY29tcG9uZW50J3Mgb3V0cHV0c1xyXG4gICAqL1xyXG4gIHByaXZhdGUgc3Vic2NyaWJlcnM6IHtba2V5OiBzdHJpbmddOiAoZXZlbnQ6IGFueSkgPT4gdm9pZH0gPSB7fTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjb21wb25lbnRGYWN0b3J5OiBDb21wb25lbnRGYWN0b3J5PEM+KSB7fVxyXG5cclxuICAvKipcclxuICAgKiBSZW5kZXIgdGhlIGNvbXBvbmVudCB0byBhIHRhcmdldCBlbGVtZW50LlxyXG4gICAqIFNldCBpdCdzIGlucHV0cyBhbmQgc3Vic2NyaWJlIHRvIGl0J3Mgb3V0cHV0cy5cclxuICAgKiBAcGFyYW0gdGFyZ2V0IFRhcmdldCBlbGVtZW50XHJcbiAgICovXHJcbiAgc2V0VGFyZ2V0KHRhcmdldDogVmlld0NvbnRhaW5lclJlZikge1xyXG4gICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XHJcbiAgICB0aGlzLmNvbXBvbmVudFJlZiA9IHRhcmdldC5jcmVhdGVDb21wb25lbnQodGhpcy5jb21wb25lbnRGYWN0b3J5KTtcclxuICAgIHRoaXMudXBkYXRlSW5wdXRzKHRoaXMuaW5wdXRzKTtcclxuICAgIHRoaXMudXBkYXRlU3Vic2NyaWJlcnModGhpcy5zdWJzY3JpYmVycyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBEZXN0cm95IHRoaXMgY29tcG9uZW50LiBUaGF0IG1lYW5zLCByZW1vdmluZyBmcm9tIGl0J3MgdGFyZ2V0XHJcbiAgICogZWxlbWVudCBhbmQgdW5zdWJzY3JpYmluZyB0byBpdCdzIG91dHB1dHMuXHJcbiAgICovXHJcbiAgZGVzdHJveSgpIHtcclxuICAgIGlmICh0aGlzLnRhcmdldCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMudGFyZ2V0LmNsZWFyKCk7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5jb21wb25lbnRSZWYgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLmNvbXBvbmVudFJlZi5kZXN0cm95KCk7XHJcbiAgICAgIHRoaXMuY29tcG9uZW50UmVmID0gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG4gICAgdGhpcy51bnN1YnNjcmliZUFsbCgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXBkYXRlIHRoZSBjb21wb25lbnQgaW5wdXRzLiBUaGlzIGlzIGFuIHVwZGF0ZSBzbyBhbnlcclxuICAgKiBrZXkgbm90IGRlZmluZWQgd29uJ3QgYmUgb3ZlcndyaXR0ZW4uXHJcbiAgICovXHJcbiAgdXBkYXRlSW5wdXRzKGlucHV0czoge1trZXk6IHN0cmluZ106IGFueX0pIHtcclxuICAgIHRoaXMuaW5wdXRzID0gaW5wdXRzO1xyXG4gICAgaWYgKHRoaXMuY29tcG9uZW50UmVmID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGluc3RhbmNlID0gdGhpcy5jb21wb25lbnRSZWYuaW5zdGFuY2U7XHJcbiAgICBjb25zdCBhbGxvd2VkSW5wdXRzID0gdGhpcy5jb21wb25lbnRGYWN0b3J5LmlucHV0cztcclxuICAgIGFsbG93ZWRJbnB1dHMuZm9yRWFjaCgodmFsdWU6IHtwcm9wTmFtZTogc3RyaW5nOyB0ZW1wbGF0ZU5hbWU6IHN0cmluZzsgfSkgPT4ge1xyXG4gICAgICBjb25zdCBrZXkgPSB2YWx1ZS5wcm9wTmFtZTtcclxuICAgICAgaWYgKGlucHV0cy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcbiAgICAgICAgaW5zdGFuY2Vba2V5XSA9IGlucHV0c1trZXldO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAodHlwZW9mIChpbnN0YW5jZSBhcyBhbnkpLm9uVXBkYXRlSW5wdXRzID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgIChpbnN0YW5jZSBhcyBhbnkpLm9uVXBkYXRlSW5wdXRzKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVcGRhdGUgdGhlIGNvbXBvbmVudCBzdWJzY3JpYmVycy4gVGhpcyBpcyBhbiB1cGRhdGUgc28gYW55XHJcbiAgICoga2V5IG5vdCBkZWZpbmVkIHdvbid0IGJlIG92ZXJ3cml0dGVuLlxyXG4gICAqL1xyXG4gIHVwZGF0ZVN1YnNjcmliZXJzKHN1YnNjcmliZXJzOiB7W2tleTogc3RyaW5nXTogKGV2ZW50OiBhbnkpID0+IHZvaWR9KSB7XHJcbiAgICB0aGlzLnN1YnNjcmliZXJzID0gc3Vic2NyaWJlcnM7XHJcbiAgICBpZiAodGhpcy5jb21wb25lbnRSZWYgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgaW5zdGFuY2UgPSB0aGlzLmNvbXBvbmVudFJlZi5pbnN0YW5jZTtcclxuICAgIGNvbnN0IGFsbG93ZWRTdWJzY3JpYmVycyA9IHRoaXMuY29tcG9uZW50RmFjdG9yeS5vdXRwdXRzO1xyXG4gICAgYWxsb3dlZFN1YnNjcmliZXJzLmZvckVhY2goKHZhbHVlOiB7cHJvcE5hbWU6IHN0cmluZzsgdGVtcGxhdGVOYW1lOiBzdHJpbmc7IH0pID0+IHtcclxuICAgICAgY29uc3Qga2V5ID0gdmFsdWUucHJvcE5hbWU7XHJcbiAgICAgIGlmIChzdWJzY3JpYmVycy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcbiAgICAgICAgY29uc3QgZW1pdHRlciA9IGluc3RhbmNlW2tleV07XHJcbiAgICAgICAgY29uc3Qgc3Vic2NyaWJlciA9IHN1YnNjcmliZXJzW2tleV07XHJcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoc3Vic2NyaWJlcikpIHtcclxuICAgICAgICAgIHN1YnNjcmliZXIuZm9yRWFjaCgoX3N1YnNjcmliZXIpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goZW1pdHRlci5zdWJzY3JpYmUoX3N1YnNjcmliZXIpKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChlbWl0dGVyLnN1YnNjcmliZShzdWJzY3JpYmVyKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVuc3Vic2NyaWJlIHRvIGFsbCBvdXRwdXRzLlxyXG4gICAqL1xyXG4gIHByaXZhdGUgdW5zdWJzY3JpYmVBbGwoKSB7XHJcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuZm9yRWFjaCgoczogU3Vic2NyaXB0aW9uKSA9PiBzLnVuc3Vic2NyaWJlKCkpO1xyXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zID0gW107XHJcbiAgfVxyXG5cclxufVxyXG4iXX0=
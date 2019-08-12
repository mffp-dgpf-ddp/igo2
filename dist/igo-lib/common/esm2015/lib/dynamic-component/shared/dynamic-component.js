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
export class DynamicComponent {
    /**
     * @param {?} componentFactory
     */
    constructor(componentFactory) {
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
     * @param {?} target Target element
     * @return {?}
     */
    setTarget(target) {
        this.target = target;
        this.componentRef = target.createComponent(this.componentFactory);
        this.updateInputs(this.inputs);
        this.updateSubscribers(this.subscribers);
    }
    /**
     * Destroy this component. That means, removing from it's target
     * element and unsubscribing to it's outputs.
     * @return {?}
     */
    destroy() {
        if (this.target !== undefined) {
            this.target.clear();
        }
        if (this.componentRef !== undefined) {
            this.componentRef.destroy();
            this.componentRef = undefined;
        }
        this.unsubscribeAll();
    }
    /**
     * Update the component inputs. This is an update so any
     * key not defined won't be overwritten.
     * @param {?} inputs
     * @return {?}
     */
    updateInputs(inputs) {
        this.inputs = inputs;
        if (this.componentRef === undefined) {
            return;
        }
        /** @type {?} */
        const instance = this.componentRef.instance;
        /** @type {?} */
        const allowedInputs = this.componentFactory.inputs;
        allowedInputs.forEach((/**
         * @param {?} value
         * @return {?}
         */
        (value) => {
            /** @type {?} */
            const key = value.propName;
            if (inputs.hasOwnProperty(key)) {
                instance[key] = inputs[key];
            }
        }));
        if (typeof ((/** @type {?} */ (instance))).onUpdateInputs === 'function') {
            ((/** @type {?} */ (instance))).onUpdateInputs();
        }
    }
    /**
     * Update the component subscribers. This is an update so any
     * key not defined won't be overwritten.
     * @param {?} subscribers
     * @return {?}
     */
    updateSubscribers(subscribers) {
        this.subscribers = subscribers;
        if (this.componentRef === undefined) {
            return;
        }
        /** @type {?} */
        const instance = this.componentRef.instance;
        /** @type {?} */
        const allowedSubscribers = this.componentFactory.outputs;
        allowedSubscribers.forEach((/**
         * @param {?} value
         * @return {?}
         */
        (value) => {
            /** @type {?} */
            const key = value.propName;
            if (subscribers.hasOwnProperty(key)) {
                /** @type {?} */
                const emitter = instance[key];
                /** @type {?} */
                const subscriber = subscribers[key];
                if (Array.isArray(subscriber)) {
                    subscriber.forEach((/**
                     * @param {?} _subscriber
                     * @return {?}
                     */
                    (_subscriber) => {
                        this.subscriptions.push(emitter.subscribe(_subscriber));
                    }));
                }
                else {
                    this.subscriptions.push(emitter.subscribe(subscriber));
                }
            }
        }));
    }
    /**
     * Unsubscribe to all outputs.
     * @private
     * @return {?}
     */
    unsubscribeAll() {
        this.subscriptions.forEach((/**
         * @param {?} s
         * @return {?}
         */
        (s) => s.unsubscribe()));
        this.subscriptions = [];
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHluYW1pYy1jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9jb21tb24vIiwic291cmNlcyI6WyJsaWIvZHluYW1pYy1jb21wb25lbnQvc2hhcmVkL2R5bmFtaWMtY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBY0EsTUFBTSxPQUFPLGdCQUFnQjs7OztJQTRCM0IsWUFBb0IsZ0JBQXFDO1FBQXJDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBcUI7Ozs7O1FBakJqRCxrQkFBYSxHQUFtQixFQUFFLENBQUM7Ozs7UUFVbkMsV0FBTSxHQUF5QixFQUFFLENBQUM7Ozs7UUFLbEMsZ0JBQVcsR0FBMEMsRUFBRSxDQUFDO0lBRUosQ0FBQzs7Ozs7OztJQU83RCxTQUFTLENBQUMsTUFBd0I7UUFDaEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ2xFLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQy9CLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDM0MsQ0FBQzs7Ozs7O0lBTUQsT0FBTztRQUNMLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxTQUFTLEVBQUU7WUFDN0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUNyQjtRQUNELElBQUksSUFBSSxDQUFDLFlBQVksS0FBSyxTQUFTLEVBQUU7WUFDbkMsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUM1QixJQUFJLENBQUMsWUFBWSxHQUFHLFNBQVMsQ0FBQztTQUMvQjtRQUNELElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUN4QixDQUFDOzs7Ozs7O0lBTUQsWUFBWSxDQUFDLE1BQTRCO1FBQ3ZDLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksSUFBSSxDQUFDLFlBQVksS0FBSyxTQUFTLEVBQUU7WUFDbkMsT0FBTztTQUNSOztjQUVLLFFBQVEsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVE7O2NBQ3JDLGFBQWEsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTTtRQUNsRCxhQUFhLENBQUMsT0FBTzs7OztRQUFDLENBQUMsS0FBaUQsRUFBRSxFQUFFOztrQkFDcEUsR0FBRyxHQUFHLEtBQUssQ0FBQyxRQUFRO1lBQzFCLElBQUksTUFBTSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDOUIsUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUM3QjtRQUNILENBQUMsRUFBQyxDQUFDO1FBRUgsSUFBSSxPQUFPLENBQUMsbUJBQUEsUUFBUSxFQUFPLENBQUMsQ0FBQyxjQUFjLEtBQUssVUFBVSxFQUFFO1lBQzFELENBQUMsbUJBQUEsUUFBUSxFQUFPLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztTQUNwQztJQUNILENBQUM7Ozs7Ozs7SUFNRCxpQkFBaUIsQ0FBQyxXQUFrRDtRQUNsRSxJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztRQUMvQixJQUFJLElBQUksQ0FBQyxZQUFZLEtBQUssU0FBUyxFQUFFO1lBQ25DLE9BQU87U0FDUjs7Y0FFSyxRQUFRLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFROztjQUNyQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTztRQUN4RCxrQkFBa0IsQ0FBQyxPQUFPOzs7O1FBQUMsQ0FBQyxLQUFpRCxFQUFFLEVBQUU7O2tCQUN6RSxHQUFHLEdBQUcsS0FBSyxDQUFDLFFBQVE7WUFDMUIsSUFBSSxXQUFXLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxFQUFFOztzQkFDN0IsT0FBTyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUM7O3NCQUN2QixVQUFVLEdBQUcsV0FBVyxDQUFDLEdBQUcsQ0FBQztnQkFDbkMsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxFQUFFO29CQUM3QixVQUFVLENBQUMsT0FBTzs7OztvQkFBQyxDQUFDLFdBQVcsRUFBRSxFQUFFO3dCQUNqQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7b0JBQzFELENBQUMsRUFBQyxDQUFDO2lCQUNKO3FCQUFNO29CQUNMLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztpQkFDeEQ7YUFDRjtRQUNILENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7Ozs7O0lBS08sY0FBYztRQUNwQixJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU87Ozs7UUFBQyxDQUFDLENBQWUsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxFQUFDLENBQUM7UUFDakUsSUFBSSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUM7SUFDMUIsQ0FBQztDQUVGOzs7Ozs7O0lBaEhDLHdDQUFzQzs7Ozs7OztJQU10Qyx5Q0FBMkM7Ozs7OztJQUszQyxrQ0FBaUM7Ozs7OztJQUtqQyxrQ0FBMEM7Ozs7OztJQUsxQyx1Q0FBZ0U7Ozs7O0lBRXBELDRDQUE2QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50RmFjdG9yeSxcclxuICBDb21wb25lbnRSZWYsXHJcbiAgVmlld0NvbnRhaW5lclJlZlxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcblxyXG4vKipcclxuICogVGhpcyBjbGFzcyBpcyB1c2VkIGluIHRoZSBEeW5hbWljQ29tcG9uZW50T3V0bGV0IGNvbXBvbmVudC4gSXQgaG9sZHNcclxuICogYSByZWZlcmVuY2UgdG8gYSBjb21wb25lbnQgZmFjdG9yeSBhbmQgY2FuIHJlbmRlciB0aGF0IGNvbXBvbmVudFxyXG4gKiBpbiBhIHRhcmdldCBlbGVtZW50IG9uIGRlbWFuZC4gSXQncyBhbHNvIHBvc3NpYmxlIHRvIHNldCBpbnB1dHNcclxuICogYW5kIHRvIHN1YnNjcmliZSB0byBvdXRwdXRzLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIER5bmFtaWNDb21wb25lbnQ8Qz4ge1xyXG5cclxuICAvKipcclxuICAgKiBDb21wb25lbnQgcmVmZXJlbmNlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBjb21wb25lbnRSZWY6IENvbXBvbmVudFJlZjxDPjtcclxuXHJcbiAgLyoqXHJcbiAgICogU3Vic2NyaXB0aW9ucyB0byB0aGUgY29tcG9uZW50J3Mgb3V0cHV0cy4gVGhvc2UgbmVlZFxyXG4gICAqIHRvIGJlIHVuc3Vic2NyaWJlZCB3aGVuIHRoZSBjb21wb25lbnQgaXMgZGVzdHJveWVkLlxyXG4gICAqL1xyXG4gIHByaXZhdGUgc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcclxuXHJcbiAgLyoqXHJcbiAgICogQ29tcG9uZW50IHRhcmdldCBlbGVtZW50XHJcbiAgICovXHJcbiAgcHJpdmF0ZSB0YXJnZXQ6IFZpZXdDb250YWluZXJSZWY7XHJcblxyXG4gIC8qKlxyXG4gICAqIENvbXBvbmVudCBpbnB1dHNcclxuICAgKi9cclxuICBwcml2YXRlIGlucHV0czoge1trZXk6IHN0cmluZ106IGFueX0gPSB7fTtcclxuXHJcbiAgLyoqXHJcbiAgICogU3Vic2NyaWJlcnMgdG8gdGhlIGNvbXBvbmVudCdzIG91dHB1dHNcclxuICAgKi9cclxuICBwcml2YXRlIHN1YnNjcmliZXJzOiB7W2tleTogc3RyaW5nXTogKGV2ZW50OiBhbnkpID0+IHZvaWR9ID0ge307XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY29tcG9uZW50RmFjdG9yeTogQ29tcG9uZW50RmFjdG9yeTxDPikge31cclxuXHJcbiAgLyoqXHJcbiAgICogUmVuZGVyIHRoZSBjb21wb25lbnQgdG8gYSB0YXJnZXQgZWxlbWVudC5cclxuICAgKiBTZXQgaXQncyBpbnB1dHMgYW5kIHN1YnNjcmliZSB0byBpdCdzIG91dHB1dHMuXHJcbiAgICogQHBhcmFtIHRhcmdldCBUYXJnZXQgZWxlbWVudFxyXG4gICAqL1xyXG4gIHNldFRhcmdldCh0YXJnZXQ6IFZpZXdDb250YWluZXJSZWYpIHtcclxuICAgIHRoaXMudGFyZ2V0ID0gdGFyZ2V0O1xyXG4gICAgdGhpcy5jb21wb25lbnRSZWYgPSB0YXJnZXQuY3JlYXRlQ29tcG9uZW50KHRoaXMuY29tcG9uZW50RmFjdG9yeSk7XHJcbiAgICB0aGlzLnVwZGF0ZUlucHV0cyh0aGlzLmlucHV0cyk7XHJcbiAgICB0aGlzLnVwZGF0ZVN1YnNjcmliZXJzKHRoaXMuc3Vic2NyaWJlcnMpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRGVzdHJveSB0aGlzIGNvbXBvbmVudC4gVGhhdCBtZWFucywgcmVtb3ZpbmcgZnJvbSBpdCdzIHRhcmdldFxyXG4gICAqIGVsZW1lbnQgYW5kIHVuc3Vic2NyaWJpbmcgdG8gaXQncyBvdXRwdXRzLlxyXG4gICAqL1xyXG4gIGRlc3Ryb3koKSB7XHJcbiAgICBpZiAodGhpcy50YXJnZXQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLnRhcmdldC5jbGVhcigpO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuY29tcG9uZW50UmVmICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5jb21wb25lbnRSZWYuZGVzdHJveSgpO1xyXG4gICAgICB0aGlzLmNvbXBvbmVudFJlZiA9IHVuZGVmaW5lZDtcclxuICAgIH1cclxuICAgIHRoaXMudW5zdWJzY3JpYmVBbGwoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVwZGF0ZSB0aGUgY29tcG9uZW50IGlucHV0cy4gVGhpcyBpcyBhbiB1cGRhdGUgc28gYW55XHJcbiAgICoga2V5IG5vdCBkZWZpbmVkIHdvbid0IGJlIG92ZXJ3cml0dGVuLlxyXG4gICAqL1xyXG4gIHVwZGF0ZUlucHV0cyhpbnB1dHM6IHtba2V5OiBzdHJpbmddOiBhbnl9KSB7XHJcbiAgICB0aGlzLmlucHV0cyA9IGlucHV0cztcclxuICAgIGlmICh0aGlzLmNvbXBvbmVudFJlZiA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBpbnN0YW5jZSA9IHRoaXMuY29tcG9uZW50UmVmLmluc3RhbmNlO1xyXG4gICAgY29uc3QgYWxsb3dlZElucHV0cyA9IHRoaXMuY29tcG9uZW50RmFjdG9yeS5pbnB1dHM7XHJcbiAgICBhbGxvd2VkSW5wdXRzLmZvckVhY2goKHZhbHVlOiB7cHJvcE5hbWU6IHN0cmluZzsgdGVtcGxhdGVOYW1lOiBzdHJpbmc7IH0pID0+IHtcclxuICAgICAgY29uc3Qga2V5ID0gdmFsdWUucHJvcE5hbWU7XHJcbiAgICAgIGlmIChpbnB1dHMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xyXG4gICAgICAgIGluc3RhbmNlW2tleV0gPSBpbnB1dHNba2V5XTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKHR5cGVvZiAoaW5zdGFuY2UgYXMgYW55KS5vblVwZGF0ZUlucHV0cyA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAoaW5zdGFuY2UgYXMgYW55KS5vblVwZGF0ZUlucHV0cygpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXBkYXRlIHRoZSBjb21wb25lbnQgc3Vic2NyaWJlcnMuIFRoaXMgaXMgYW4gdXBkYXRlIHNvIGFueVxyXG4gICAqIGtleSBub3QgZGVmaW5lZCB3b24ndCBiZSBvdmVyd3JpdHRlbi5cclxuICAgKi9cclxuICB1cGRhdGVTdWJzY3JpYmVycyhzdWJzY3JpYmVyczoge1trZXk6IHN0cmluZ106IChldmVudDogYW55KSA9PiB2b2lkfSkge1xyXG4gICAgdGhpcy5zdWJzY3JpYmVycyA9IHN1YnNjcmliZXJzO1xyXG4gICAgaWYgKHRoaXMuY29tcG9uZW50UmVmID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGluc3RhbmNlID0gdGhpcy5jb21wb25lbnRSZWYuaW5zdGFuY2U7XHJcbiAgICBjb25zdCBhbGxvd2VkU3Vic2NyaWJlcnMgPSB0aGlzLmNvbXBvbmVudEZhY3Rvcnkub3V0cHV0cztcclxuICAgIGFsbG93ZWRTdWJzY3JpYmVycy5mb3JFYWNoKCh2YWx1ZToge3Byb3BOYW1lOiBzdHJpbmc7IHRlbXBsYXRlTmFtZTogc3RyaW5nOyB9KSA9PiB7XHJcbiAgICAgIGNvbnN0IGtleSA9IHZhbHVlLnByb3BOYW1lO1xyXG4gICAgICBpZiAoc3Vic2NyaWJlcnMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xyXG4gICAgICAgIGNvbnN0IGVtaXR0ZXIgPSBpbnN0YW5jZVtrZXldO1xyXG4gICAgICAgIGNvbnN0IHN1YnNjcmliZXIgPSBzdWJzY3JpYmVyc1trZXldO1xyXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHN1YnNjcmliZXIpKSB7XHJcbiAgICAgICAgICBzdWJzY3JpYmVyLmZvckVhY2goKF9zdWJzY3JpYmVyKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKGVtaXR0ZXIuc3Vic2NyaWJlKF9zdWJzY3JpYmVyKSk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goZW1pdHRlci5zdWJzY3JpYmUoc3Vic2NyaWJlcikpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVbnN1YnNjcmliZSB0byBhbGwgb3V0cHV0cy5cclxuICAgKi9cclxuICBwcml2YXRlIHVuc3Vic2NyaWJlQWxsKCkge1xyXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmZvckVhY2goKHM6IFN1YnNjcmlwdGlvbikgPT4gcy51bnN1YnNjcmliZSgpKTtcclxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucyA9IFtdO1xyXG4gIH1cclxuXHJcbn1cclxuIl19
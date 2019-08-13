/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { BehaviorSubject, Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
/**
 * This class is responsible of managing the relations between
 * entities and the actions that consume them. It also defines an
 * entity table template that may be used by an entity table component.
 * @template E
 */
var /**
 * This class is responsible of managing the relations between
 * entities and the actions that consume them. It also defines an
 * entity table template that may be used by an entity table component.
 * @template E
 */
Workspace = /** @class */ (function () {
    function Workspace(options) {
        this.options = options;
        /**
         * Observable of the selected widget
         */
        this.widget$ = new BehaviorSubject(undefined);
        /**
         * Observable of the selected widget's inputs
         */
        this.widgetInputs$ = new BehaviorSubject({});
        /**
         * Observable of the selected widget's subscribers
         */
        this.widgetSubscribers$ = new BehaviorSubject({});
        /**
         * Whether this workspace is active
         */
        this.active = false;
        /**
         * State change that trigger an update of the actions availability
         */
        this.change = new Subject();
    }
    Object.defineProperty(Workspace.prototype, "id", {
        /**
         * Workspace id
         */
        get: /**
         * Workspace id
         * @return {?}
         */
        function () { return this.options.id; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Workspace.prototype, "title", {
        /**
         * Workspace title
         */
        get: /**
         * Workspace title
         * @return {?}
         */
        function () { return this.options.title; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Workspace.prototype, "meta", {
        /**
         * Workspace title
         */
        get: /**
         * Workspace title
         * @return {?}
         */
        function () { return this.options.meta || {}; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Workspace.prototype, "entityStore", {
        /**
         * Entities store
         */
        get: /**
         * Entities store
         * @return {?}
         */
        function () { return (/** @type {?} */ (this.options.entityStore)); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Workspace.prototype, "actionStore", {
        /**
         * Actions store (some actions activate a widget)
         */
        get: /**
         * Actions store (some actions activate a widget)
         * @return {?}
         */
        function () { return this.options.actionStore; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Workspace.prototype, "widget", {
        /**
         * Selected widget
         */
        get: /**
         * Selected widget
         * @return {?}
         */
        function () { return this.widget$.value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Workspace.prototype, "hasWidget", {
        /**
         * Whether a widget is selected
         */
        get: /**
         * Whether a widget is selected
         * @return {?}
         */
        function () { return this.widget !== undefined; },
        enumerable: true,
        configurable: true
    });
    /**
     * Whether this workspace is active
     */
    /**
     * Whether this workspace is active
     * @return {?}
     */
    Workspace.prototype.isActive = /**
     * Whether this workspace is active
     * @return {?}
     */
    function () { return this.active; };
    /**
     * Activate the workspace. By doing that, the workspace will observe
     * the selected entity (from the store) and update the actions availability.
     * For example, some actions require an entity to be selected.
     */
    /**
     * Activate the workspace. By doing that, the workspace will observe
     * the selected entity (from the store) and update the actions availability.
     * For example, some actions require an entity to be selected.
     * @return {?}
     */
    Workspace.prototype.activate = /**
     * Activate the workspace. By doing that, the workspace will observe
     * the selected entity (from the store) and update the actions availability.
     * For example, some actions require an entity to be selected.
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.active === true) {
            this.deactivate();
        }
        this.active = true;
        if (this.entityStore !== undefined) {
            this.entities$$ = this.entityStore.stateView.all$()
                .subscribe((/**
             * @return {?}
             */
            function () { return _this.onStateChange(); }));
        }
        if (this.actionStore !== undefined) {
            this.change$ = this.change
                .pipe(debounceTime(35))
                .subscribe((/**
             * @return {?}
             */
            function () { return _this.actionStore.updateActionsAvailability(); }));
        }
        this.change.next();
    };
    /**
     * Deactivate the workspace. Unsubcribe to the selected entity.
     */
    /**
     * Deactivate the workspace. Unsubcribe to the selected entity.
     * @return {?}
     */
    Workspace.prototype.deactivate = /**
     * Deactivate the workspace. Unsubcribe to the selected entity.
     * @return {?}
     */
    function () {
        this.active = false;
        this.deactivateWidget();
        if (this.entities$$ !== undefined) {
            this.entities$$.unsubscribe();
        }
        if (this.change$ !== undefined) {
            this.change$.unsubscribe();
        }
    };
    /**
     * Activate a widget. In itself, activating a widget doesn't render it but,
     * if an WorkspaceWidgetOutlet component is bound to this workspace, the widget will
     * show up.
     * @param widget Widget
     * @param inputs Inputs the widget will receive
     */
    /**
     * Activate a widget. In itself, activating a widget doesn't render it but,
     * if an WorkspaceWidgetOutlet component is bound to this workspace, the widget will
     * show up.
     * @param {?} widget Widget
     * @param {?=} inputs Inputs the widget will receive
     * @param {?=} subscribers
     * @return {?}
     */
    Workspace.prototype.activateWidget = /**
     * Activate a widget. In itself, activating a widget doesn't render it but,
     * if an WorkspaceWidgetOutlet component is bound to this workspace, the widget will
     * show up.
     * @param {?} widget Widget
     * @param {?=} inputs Inputs the widget will receive
     * @param {?=} subscribers
     * @return {?}
     */
    function (widget, inputs, subscribers) {
        if (inputs === void 0) { inputs = {}; }
        if (subscribers === void 0) { subscribers = {}; }
        this.widget$.next(widget);
        this.widgetInputs$.next(inputs);
        this.widgetSubscribers$.next(subscribers);
        this.change.next();
    };
    /**
     * Deactivate a widget.
     */
    /**
     * Deactivate a widget.
     * @return {?}
     */
    Workspace.prototype.deactivateWidget = /**
     * Deactivate a widget.
     * @return {?}
     */
    function () {
        this.widget$.next(undefined);
        this.change.next();
    };
    /**
     * When the state changes, update the actions availability.
     */
    /**
     * When the state changes, update the actions availability.
     * @private
     * @return {?}
     */
    Workspace.prototype.onStateChange = /**
     * When the state changes, update the actions availability.
     * @private
     * @return {?}
     */
    function () {
        this.change.next();
    };
    return Workspace;
}());
/**
 * This class is responsible of managing the relations between
 * entities and the actions that consume them. It also defines an
 * entity table template that may be used by an entity table component.
 * @template E
 */
export { Workspace };
if (false) {
    /**
     * Observable of the selected widget
     * @type {?}
     */
    Workspace.prototype.widget$;
    /**
     * Observable of the selected widget's inputs
     * @type {?}
     */
    Workspace.prototype.widgetInputs$;
    /**
     * Observable of the selected widget's subscribers
     * @type {?}
     */
    Workspace.prototype.widgetSubscribers$;
    /**
     * Subscription to the selected entity
     * @type {?}
     * @private
     */
    Workspace.prototype.entities$$;
    /**
     * Whether this workspace is active
     * @type {?}
     * @private
     */
    Workspace.prototype.active;
    /**
     * State change that trigger an update of the actions availability
     * @type {?}
     * @private
     */
    Workspace.prototype.change;
    /**
     * Subscription to state changes
     * @type {?}
     * @private
     */
    Workspace.prototype.change$;
    /**
     * @type {?}
     * @protected
     */
    Workspace.prototype.options;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya3NwYWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvY29tbW9uLyIsInNvdXJjZXMiOlsibGliL3dvcmtzcGFjZS9zaGFyZWQvd29ya3NwYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQWdCLGVBQWUsRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDOUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7Ozs7O0FBYTlDOzs7Ozs7O0lBd0VFLG1CQUFzQixPQUF5QjtRQUF6QixZQUFPLEdBQVAsT0FBTyxDQUFrQjs7OztRQW5FdEMsWUFBTyxHQUFHLElBQUksZUFBZSxDQUFTLFNBQVMsQ0FBQyxDQUFDOzs7O1FBS2pELGtCQUFhLEdBQUcsSUFBSSxlQUFlLENBQXVCLEVBQUUsQ0FBQyxDQUFDOzs7O1FBSzlELHVCQUFrQixHQUFHLElBQUksZUFBZSxDQUF3QyxFQUFFLENBQUMsQ0FBQzs7OztRQVVyRixXQUFNLEdBQVksS0FBSyxDQUFDOzs7O1FBS3hCLFdBQU0sR0FBa0IsSUFBSSxPQUFPLEVBQUUsQ0FBQztJQTBDSSxDQUFDO0lBaENuRCxzQkFBSSx5QkFBRTtRQUhOOztXQUVHOzs7OztRQUNILGNBQW1CLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDOzs7T0FBQTtJQUs1QyxzQkFBSSw0QkFBSztRQUhUOztXQUVHOzs7OztRQUNILGNBQXNCLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDOzs7T0FBQTtJQUtsRCxzQkFBSSwyQkFBSTtRQUhSOztXQUVHOzs7OztRQUNILGNBQW1DLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUFLcEUsc0JBQUksa0NBQVc7UUFIZjs7V0FFRzs7Ozs7UUFDSCxjQUFvQyxPQUFPLG1CQUFBLElBQUksQ0FBQyxP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aUNBQWE7Ozs7O0lBQXJCO1FBQ0UsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRUgsZ0JBQUM7QUFBRCxDQUFDLEFBeEpELElBd0pDOzs7Ozs7Ozs7Ozs7O0lBbkpDLDRCQUEwRDs7Ozs7SUFLMUQsa0NBQXVFOzs7OztJQUt2RSx1Q0FBNkY7Ozs7OztJQUs3RiwrQkFBaUM7Ozs7OztJQUtqQywyQkFBZ0M7Ozs7OztJQUtoQywyQkFBOEM7Ozs7OztJQUs5Qyw0QkFBOEI7Ozs7O0lBcUNsQiw0QkFBbUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTdWJzY3JpcHRpb24sIEJlaGF2aW9yU3ViamVjdCwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBkZWJvdW5jZVRpbWUgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5pbXBvcnQgeyBBY3Rpb25TdG9yZSB9IGZyb20gJy4uLy4uL2FjdGlvbic7XHJcbmltcG9ydCB7IFdpZGdldCB9IGZyb20gJy4uLy4uL3dpZGdldCc7XHJcbmltcG9ydCB7IEVudGl0eVJlY29yZCwgRW50aXR5U3RvcmUgfSBmcm9tICcuLi8uLi9lbnRpdHknO1xyXG5cclxuaW1wb3J0IHsgV29ya3NwYWNlT3B0aW9ucyB9IGZyb20gJy4vd29ya3NwYWNlLmludGVyZmFjZXMnO1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgY2xhc3MgaXMgcmVzcG9uc2libGUgb2YgbWFuYWdpbmcgdGhlIHJlbGF0aW9ucyBiZXR3ZWVuXHJcbiAqIGVudGl0aWVzIGFuZCB0aGUgYWN0aW9ucyB0aGF0IGNvbnN1bWUgdGhlbS4gSXQgYWxzbyBkZWZpbmVzIGFuXHJcbiAqIGVudGl0eSB0YWJsZSB0ZW1wbGF0ZSB0aGF0IG1heSBiZSB1c2VkIGJ5IGFuIGVudGl0eSB0YWJsZSBjb21wb25lbnQuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgV29ya3NwYWNlPEUgZXh0ZW5kcyBvYmplY3QgPSBvYmplY3Q+IHtcclxuXHJcbiAgLyoqXHJcbiAgICogT2JzZXJ2YWJsZSBvZiB0aGUgc2VsZWN0ZWQgd2lkZ2V0XHJcbiAgICovXHJcbiAgcmVhZG9ubHkgd2lkZ2V0JCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8V2lkZ2V0Pih1bmRlZmluZWQpO1xyXG5cclxuICAvKipcclxuICAgKiBPYnNlcnZhYmxlIG9mIHRoZSBzZWxlY3RlZCB3aWRnZXQncyBpbnB1dHNcclxuICAgKi9cclxuICByZWFkb25seSB3aWRnZXRJbnB1dHMkID0gbmV3IEJlaGF2aW9yU3ViamVjdDx7W2tleTogc3RyaW5nXTogYW55fT4oe30pO1xyXG5cclxuICAvKipcclxuICAgKiBPYnNlcnZhYmxlIG9mIHRoZSBzZWxlY3RlZCB3aWRnZXQncyBzdWJzY3JpYmVyc1xyXG4gICAqL1xyXG4gIHJlYWRvbmx5IHdpZGdldFN1YnNjcmliZXJzJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8e1trZXk6IHN0cmluZ106IChldmVudDogYW55KSA9PiB2b2lkfT4oe30pO1xyXG5cclxuICAvKipcclxuICAgKiBTdWJzY3JpcHRpb24gdG8gdGhlIHNlbGVjdGVkIGVudGl0eVxyXG4gICAqL1xyXG4gIHByaXZhdGUgZW50aXRpZXMkJDogU3Vic2NyaXB0aW9uO1xyXG5cclxuICAvKipcclxuICAgKiBXaGV0aGVyIHRoaXMgd29ya3NwYWNlIGlzIGFjdGl2ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgYWN0aXZlOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIC8qKlxyXG4gICAqIFN0YXRlIGNoYW5nZSB0aGF0IHRyaWdnZXIgYW4gdXBkYXRlIG9mIHRoZSBhY3Rpb25zIGF2YWlsYWJpbGl0eVxyXG4gICAqL1xyXG4gIHByaXZhdGUgY2hhbmdlOiBTdWJqZWN0PHZvaWQ+ID0gbmV3IFN1YmplY3QoKTtcclxuXHJcbiAgLyoqXHJcbiAgICogU3Vic2NyaXB0aW9uIHRvIHN0YXRlIGNoYW5nZXNcclxuICAgKi9cclxuICBwcml2YXRlIGNoYW5nZSQ6IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgLyoqXHJcbiAgICogV29ya3NwYWNlIGlkXHJcbiAgICovXHJcbiAgZ2V0IGlkKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLm9wdGlvbnMuaWQ7IH1cclxuXHJcbiAgLyoqXHJcbiAgICogV29ya3NwYWNlIHRpdGxlXHJcbiAgICovXHJcbiAgZ2V0IHRpdGxlKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLm9wdGlvbnMudGl0bGU7IH1cclxuXHJcbiAgLyoqXHJcbiAgICogV29ya3NwYWNlIHRpdGxlXHJcbiAgICovXHJcbiAgZ2V0IG1ldGEoKToge1trZXk6IHN0cmluZ106IGFueX0geyByZXR1cm4gdGhpcy5vcHRpb25zLm1ldGEgfHwge307IH1cclxuXHJcbiAgLyoqXHJcbiAgICogRW50aXRpZXMgc3RvcmVcclxuICAgKi9cclxuICBnZXQgZW50aXR5U3RvcmUoKTogRW50aXR5U3RvcmU8RT4geyByZXR1cm4gdGhpcy5vcHRpb25zLmVudGl0eVN0b3JlIGFzIEVudGl0eVN0b3JlPEU+OyB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFjdGlvbnMgc3RvcmUgKHNvbWUgYWN0aW9ucyBhY3RpdmF0ZSBhIHdpZGdldClcclxuICAgKi9cclxuICBnZXQgYWN0aW9uU3RvcmUoKTogQWN0aW9uU3RvcmUgeyByZXR1cm4gdGhpcy5vcHRpb25zLmFjdGlvblN0b3JlOyB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNlbGVjdGVkIHdpZGdldFxyXG4gICAqL1xyXG4gIGdldCB3aWRnZXQoKTogV2lkZ2V0IHsgcmV0dXJuIHRoaXMud2lkZ2V0JC52YWx1ZTsgfVxyXG5cclxuICAvKipcclxuICAgKiBXaGV0aGVyIGEgd2lkZ2V0IGlzIHNlbGVjdGVkXHJcbiAgICovXHJcbiAgZ2V0IGhhc1dpZGdldCgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMud2lkZ2V0ICE9PSB1bmRlZmluZWQ7IH1cclxuXHJcbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIG9wdGlvbnM6IFdvcmtzcGFjZU9wdGlvbnMpIHt9XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZXRoZXIgdGhpcyB3b3Jrc3BhY2UgaXMgYWN0aXZlXHJcbiAgICovXHJcbiAgaXNBY3RpdmUoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLmFjdGl2ZTsgfVxyXG5cclxuICAvKipcclxuICAgKiBBY3RpdmF0ZSB0aGUgd29ya3NwYWNlLiBCeSBkb2luZyB0aGF0LCB0aGUgd29ya3NwYWNlIHdpbGwgb2JzZXJ2ZVxyXG4gICAqIHRoZSBzZWxlY3RlZCBlbnRpdHkgKGZyb20gdGhlIHN0b3JlKSBhbmQgdXBkYXRlIHRoZSBhY3Rpb25zIGF2YWlsYWJpbGl0eS5cclxuICAgKiBGb3IgZXhhbXBsZSwgc29tZSBhY3Rpb25zIHJlcXVpcmUgYW4gZW50aXR5IHRvIGJlIHNlbGVjdGVkLlxyXG4gICAqL1xyXG4gIGFjdGl2YXRlKCkge1xyXG4gICAgaWYgKHRoaXMuYWN0aXZlID09PSB0cnVlKSB7XHJcbiAgICAgIHRoaXMuZGVhY3RpdmF0ZSgpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5hY3RpdmUgPSB0cnVlO1xyXG5cclxuICAgIGlmICh0aGlzLmVudGl0eVN0b3JlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5lbnRpdGllcyQkID0gdGhpcy5lbnRpdHlTdG9yZS5zdGF0ZVZpZXcuYWxsJCgpXHJcbiAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLm9uU3RhdGVDaGFuZ2UoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuYWN0aW9uU3RvcmUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLmNoYW5nZSQgPSB0aGlzLmNoYW5nZVxyXG4gICAgICAgIC5waXBlKGRlYm91bmNlVGltZSgzNSkpXHJcbiAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLmFjdGlvblN0b3JlLnVwZGF0ZUFjdGlvbnNBdmFpbGFiaWxpdHkoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5jaGFuZ2UubmV4dCgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRGVhY3RpdmF0ZSB0aGUgd29ya3NwYWNlLiBVbnN1YmNyaWJlIHRvIHRoZSBzZWxlY3RlZCBlbnRpdHkuXHJcbiAgICovXHJcbiAgZGVhY3RpdmF0ZSgpIHtcclxuICAgIHRoaXMuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB0aGlzLmRlYWN0aXZhdGVXaWRnZXQoKTtcclxuXHJcbiAgICBpZiAodGhpcy5lbnRpdGllcyQkICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5lbnRpdGllcyQkLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5jaGFuZ2UkICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5jaGFuZ2UkLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBY3RpdmF0ZSBhIHdpZGdldC4gSW4gaXRzZWxmLCBhY3RpdmF0aW5nIGEgd2lkZ2V0IGRvZXNuJ3QgcmVuZGVyIGl0IGJ1dCxcclxuICAgKiBpZiBhbiBXb3Jrc3BhY2VXaWRnZXRPdXRsZXQgY29tcG9uZW50IGlzIGJvdW5kIHRvIHRoaXMgd29ya3NwYWNlLCB0aGUgd2lkZ2V0IHdpbGxcclxuICAgKiBzaG93IHVwLlxyXG4gICAqIEBwYXJhbSB3aWRnZXQgV2lkZ2V0XHJcbiAgICogQHBhcmFtIGlucHV0cyBJbnB1dHMgdGhlIHdpZGdldCB3aWxsIHJlY2VpdmVcclxuICAgKi9cclxuICBhY3RpdmF0ZVdpZGdldChcclxuICAgIHdpZGdldDogV2lkZ2V0LFxyXG4gICAgaW5wdXRzOiB7W2tleTogc3RyaW5nXTogYW55fSA9IHt9LFxyXG4gICAgc3Vic2NyaWJlcnM6IHtba2V5OiBzdHJpbmddOiAoZXZlbnQ6IGFueSkgPT4gdm9pZH0gPSB7fVxyXG4gICkge1xyXG4gICAgdGhpcy53aWRnZXQkLm5leHQod2lkZ2V0KTtcclxuICAgIHRoaXMud2lkZ2V0SW5wdXRzJC5uZXh0KGlucHV0cyk7XHJcbiAgICB0aGlzLndpZGdldFN1YnNjcmliZXJzJC5uZXh0KHN1YnNjcmliZXJzKTtcclxuICAgIHRoaXMuY2hhbmdlLm5leHQoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIERlYWN0aXZhdGUgYSB3aWRnZXQuXHJcbiAgICovXHJcbiAgZGVhY3RpdmF0ZVdpZGdldCgpIHtcclxuICAgIHRoaXMud2lkZ2V0JC5uZXh0KHVuZGVmaW5lZCk7XHJcbiAgICB0aGlzLmNoYW5nZS5uZXh0KCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBXaGVuIHRoZSBzdGF0ZSBjaGFuZ2VzLCB1cGRhdGUgdGhlIGFjdGlvbnMgYXZhaWxhYmlsaXR5LlxyXG4gICAqL1xyXG4gIHByaXZhdGUgb25TdGF0ZUNoYW5nZSgpIHtcclxuICAgIHRoaXMuY2hhbmdlLm5leHQoKTtcclxuICB9XHJcblxyXG59XHJcbiJdfQ==
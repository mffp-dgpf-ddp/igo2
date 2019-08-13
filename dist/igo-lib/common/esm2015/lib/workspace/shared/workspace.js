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
export class Workspace {
    /**
     * @param {?} options
     */
    constructor(options) {
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
    /**
     * Workspace id
     * @return {?}
     */
    get id() { return this.options.id; }
    /**
     * Workspace title
     * @return {?}
     */
    get title() { return this.options.title; }
    /**
     * Workspace title
     * @return {?}
     */
    get meta() { return this.options.meta || {}; }
    /**
     * Entities store
     * @return {?}
     */
    get entityStore() { return (/** @type {?} */ (this.options.entityStore)); }
    /**
     * Actions store (some actions activate a widget)
     * @return {?}
     */
    get actionStore() { return this.options.actionStore; }
    /**
     * Selected widget
     * @return {?}
     */
    get widget() { return this.widget$.value; }
    /**
     * Whether a widget is selected
     * @return {?}
     */
    get hasWidget() { return this.widget !== undefined; }
    /**
     * Whether this workspace is active
     * @return {?}
     */
    isActive() { return this.active; }
    /**
     * Activate the workspace. By doing that, the workspace will observe
     * the selected entity (from the store) and update the actions availability.
     * For example, some actions require an entity to be selected.
     * @return {?}
     */
    activate() {
        if (this.active === true) {
            this.deactivate();
        }
        this.active = true;
        if (this.entityStore !== undefined) {
            this.entities$$ = this.entityStore.stateView.all$()
                .subscribe((/**
             * @return {?}
             */
            () => this.onStateChange()));
        }
        if (this.actionStore !== undefined) {
            this.change$ = this.change
                .pipe(debounceTime(35))
                .subscribe((/**
             * @return {?}
             */
            () => this.actionStore.updateActionsAvailability()));
        }
        this.change.next();
    }
    /**
     * Deactivate the workspace. Unsubcribe to the selected entity.
     * @return {?}
     */
    deactivate() {
        this.active = false;
        this.deactivateWidget();
        if (this.entities$$ !== undefined) {
            this.entities$$.unsubscribe();
        }
        if (this.change$ !== undefined) {
            this.change$.unsubscribe();
        }
    }
    /**
     * Activate a widget. In itself, activating a widget doesn't render it but,
     * if an WorkspaceWidgetOutlet component is bound to this workspace, the widget will
     * show up.
     * @param {?} widget Widget
     * @param {?=} inputs Inputs the widget will receive
     * @param {?=} subscribers
     * @return {?}
     */
    activateWidget(widget, inputs = {}, subscribers = {}) {
        this.widget$.next(widget);
        this.widgetInputs$.next(inputs);
        this.widgetSubscribers$.next(subscribers);
        this.change.next();
    }
    /**
     * Deactivate a widget.
     * @return {?}
     */
    deactivateWidget() {
        this.widget$.next(undefined);
        this.change.next();
    }
    /**
     * When the state changes, update the actions availability.
     * @private
     * @return {?}
     */
    onStateChange() {
        this.change.next();
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya3NwYWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvY29tbW9uLyIsInNvdXJjZXMiOlsibGliL3dvcmtzcGFjZS9zaGFyZWQvd29ya3NwYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQWdCLGVBQWUsRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDOUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7Ozs7O0FBYTlDLE1BQU0sT0FBTyxTQUFTOzs7O0lBd0VwQixZQUFzQixPQUF5QjtRQUF6QixZQUFPLEdBQVAsT0FBTyxDQUFrQjs7OztRQW5FdEMsWUFBTyxHQUFHLElBQUksZUFBZSxDQUFTLFNBQVMsQ0FBQyxDQUFDOzs7O1FBS2pELGtCQUFhLEdBQUcsSUFBSSxlQUFlLENBQXVCLEVBQUUsQ0FBQyxDQUFDOzs7O1FBSzlELHVCQUFrQixHQUFHLElBQUksZUFBZSxDQUF3QyxFQUFFLENBQUMsQ0FBQzs7OztRQVVyRixXQUFNLEdBQVksS0FBSyxDQUFDOzs7O1FBS3hCLFdBQU0sR0FBa0IsSUFBSSxPQUFPLEVBQUUsQ0FBQztJQTBDSSxDQUFDOzs7OztJQWhDbkQsSUFBSSxFQUFFLEtBQWEsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Ozs7O0lBSzVDLElBQUksS0FBSyxLQUFhLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDOzs7OztJQUtsRCxJQUFJLElBQUksS0FBMkIsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDOzs7OztJQUtwRSxJQUFJLFdBQVcsS0FBcUIsT0FBTyxtQkFBQSxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBa0IsQ0FBQyxDQUFDLENBQUM7Ozs7O0lBS3hGLElBQUksV0FBVyxLQUFrQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQzs7Ozs7SUFLbkUsSUFBSSxNQUFNLEtBQWEsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Ozs7O0lBS25ELElBQUksU0FBUyxLQUFjLE9BQU8sSUFBSSxDQUFDLE1BQU0sS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDOzs7OztJQU85RCxRQUFRLEtBQWMsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzs7Ozs7OztJQU8zQyxRQUFRO1FBQ04sSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLElBQUksRUFBRTtZQUN4QixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7U0FDbkI7UUFDRCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUVuQixJQUFJLElBQUksQ0FBQyxXQUFXLEtBQUssU0FBUyxFQUFFO1lBQ2xDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFO2lCQUNoRCxTQUFTOzs7WUFBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLEVBQUMsQ0FBQztTQUMxQztRQUVELElBQUksSUFBSSxDQUFDLFdBQVcsS0FBSyxTQUFTLEVBQUU7WUFDbEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsTUFBTTtpQkFDdkIsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQztpQkFDdEIsU0FBUzs7O1lBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyx5QkFBeUIsRUFBRSxFQUFDLENBQUM7U0FDbEU7UUFFRCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3JCLENBQUM7Ozs7O0lBS0QsVUFBVTtRQUNSLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBRXhCLElBQUksSUFBSSxDQUFDLFVBQVUsS0FBSyxTQUFTLEVBQUU7WUFDakMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUMvQjtRQUNELElBQUksSUFBSSxDQUFDLE9BQU8sS0FBSyxTQUFTLEVBQUU7WUFDOUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUM1QjtJQUNILENBQUM7Ozs7Ozs7Ozs7SUFTRCxjQUFjLENBQ1osTUFBYyxFQUNkLFNBQStCLEVBQUUsRUFDakMsY0FBcUQsRUFBRTtRQUV2RCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMxQixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNoQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDckIsQ0FBQzs7Ozs7SUFLRCxnQkFBZ0I7UUFDZCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM3QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3JCLENBQUM7Ozs7OztJQUtPLGFBQWE7UUFDbkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNyQixDQUFDO0NBRUY7Ozs7OztJQW5KQyw0QkFBMEQ7Ozs7O0lBSzFELGtDQUF1RTs7Ozs7SUFLdkUsdUNBQTZGOzs7Ozs7SUFLN0YsK0JBQWlDOzs7Ozs7SUFLakMsMkJBQWdDOzs7Ozs7SUFLaEMsMkJBQThDOzs7Ozs7SUFLOUMsNEJBQThCOzs7OztJQXFDbEIsNEJBQW1DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU3Vic2NyaXB0aW9uLCBCZWhhdmlvclN1YmplY3QsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgZGVib3VuY2VUaW1lIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuaW1wb3J0IHsgQWN0aW9uU3RvcmUgfSBmcm9tICcuLi8uLi9hY3Rpb24nO1xyXG5pbXBvcnQgeyBXaWRnZXQgfSBmcm9tICcuLi8uLi93aWRnZXQnO1xyXG5pbXBvcnQgeyBFbnRpdHlSZWNvcmQsIEVudGl0eVN0b3JlIH0gZnJvbSAnLi4vLi4vZW50aXR5JztcclxuXHJcbmltcG9ydCB7IFdvcmtzcGFjZU9wdGlvbnMgfSBmcm9tICcuL3dvcmtzcGFjZS5pbnRlcmZhY2VzJztcclxuXHJcbi8qKlxyXG4gKiBUaGlzIGNsYXNzIGlzIHJlc3BvbnNpYmxlIG9mIG1hbmFnaW5nIHRoZSByZWxhdGlvbnMgYmV0d2VlblxyXG4gKiBlbnRpdGllcyBhbmQgdGhlIGFjdGlvbnMgdGhhdCBjb25zdW1lIHRoZW0uIEl0IGFsc28gZGVmaW5lcyBhblxyXG4gKiBlbnRpdHkgdGFibGUgdGVtcGxhdGUgdGhhdCBtYXkgYmUgdXNlZCBieSBhbiBlbnRpdHkgdGFibGUgY29tcG9uZW50LlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFdvcmtzcGFjZTxFIGV4dGVuZHMgb2JqZWN0ID0gb2JqZWN0PiB7XHJcblxyXG4gIC8qKlxyXG4gICAqIE9ic2VydmFibGUgb2YgdGhlIHNlbGVjdGVkIHdpZGdldFxyXG4gICAqL1xyXG4gIHJlYWRvbmx5IHdpZGdldCQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFdpZGdldD4odW5kZWZpbmVkKTtcclxuXHJcbiAgLyoqXHJcbiAgICogT2JzZXJ2YWJsZSBvZiB0aGUgc2VsZWN0ZWQgd2lkZ2V0J3MgaW5wdXRzXHJcbiAgICovXHJcbiAgcmVhZG9ubHkgd2lkZ2V0SW5wdXRzJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8e1trZXk6IHN0cmluZ106IGFueX0+KHt9KTtcclxuXHJcbiAgLyoqXHJcbiAgICogT2JzZXJ2YWJsZSBvZiB0aGUgc2VsZWN0ZWQgd2lkZ2V0J3Mgc3Vic2NyaWJlcnNcclxuICAgKi9cclxuICByZWFkb25seSB3aWRnZXRTdWJzY3JpYmVycyQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHtba2V5OiBzdHJpbmddOiAoZXZlbnQ6IGFueSkgPT4gdm9pZH0+KHt9KTtcclxuXHJcbiAgLyoqXHJcbiAgICogU3Vic2NyaXB0aW9uIHRvIHRoZSBzZWxlY3RlZCBlbnRpdHlcclxuICAgKi9cclxuICBwcml2YXRlIGVudGl0aWVzJCQ6IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgLyoqXHJcbiAgICogV2hldGhlciB0aGlzIHdvcmtzcGFjZSBpcyBhY3RpdmVcclxuICAgKi9cclxuICBwcml2YXRlIGFjdGl2ZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAvKipcclxuICAgKiBTdGF0ZSBjaGFuZ2UgdGhhdCB0cmlnZ2VyIGFuIHVwZGF0ZSBvZiB0aGUgYWN0aW9ucyBhdmFpbGFiaWxpdHlcclxuICAgKi9cclxuICBwcml2YXRlIGNoYW5nZTogU3ViamVjdDx2b2lkPiA9IG5ldyBTdWJqZWN0KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFN1YnNjcmlwdGlvbiB0byBzdGF0ZSBjaGFuZ2VzXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBjaGFuZ2UkOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIC8qKlxyXG4gICAqIFdvcmtzcGFjZSBpZFxyXG4gICAqL1xyXG4gIGdldCBpZCgpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5vcHRpb25zLmlkOyB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFdvcmtzcGFjZSB0aXRsZVxyXG4gICAqL1xyXG4gIGdldCB0aXRsZSgpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5vcHRpb25zLnRpdGxlOyB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFdvcmtzcGFjZSB0aXRsZVxyXG4gICAqL1xyXG4gIGdldCBtZXRhKCk6IHtba2V5OiBzdHJpbmddOiBhbnl9IHsgcmV0dXJuIHRoaXMub3B0aW9ucy5tZXRhIHx8IHt9OyB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEVudGl0aWVzIHN0b3JlXHJcbiAgICovXHJcbiAgZ2V0IGVudGl0eVN0b3JlKCk6IEVudGl0eVN0b3JlPEU+IHsgcmV0dXJuIHRoaXMub3B0aW9ucy5lbnRpdHlTdG9yZSBhcyBFbnRpdHlTdG9yZTxFPjsgfVxyXG5cclxuICAvKipcclxuICAgKiBBY3Rpb25zIHN0b3JlIChzb21lIGFjdGlvbnMgYWN0aXZhdGUgYSB3aWRnZXQpXHJcbiAgICovXHJcbiAgZ2V0IGFjdGlvblN0b3JlKCk6IEFjdGlvblN0b3JlIHsgcmV0dXJuIHRoaXMub3B0aW9ucy5hY3Rpb25TdG9yZTsgfVxyXG5cclxuICAvKipcclxuICAgKiBTZWxlY3RlZCB3aWRnZXRcclxuICAgKi9cclxuICBnZXQgd2lkZ2V0KCk6IFdpZGdldCB7IHJldHVybiB0aGlzLndpZGdldCQudmFsdWU7IH1cclxuXHJcbiAgLyoqXHJcbiAgICogV2hldGhlciBhIHdpZGdldCBpcyBzZWxlY3RlZFxyXG4gICAqL1xyXG4gIGdldCBoYXNXaWRnZXQoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLndpZGdldCAhPT0gdW5kZWZpbmVkOyB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBvcHRpb25zOiBXb3Jrc3BhY2VPcHRpb25zKSB7fVxyXG5cclxuICAvKipcclxuICAgKiBXaGV0aGVyIHRoaXMgd29ya3NwYWNlIGlzIGFjdGl2ZVxyXG4gICAqL1xyXG4gIGlzQWN0aXZlKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5hY3RpdmU7IH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWN0aXZhdGUgdGhlIHdvcmtzcGFjZS4gQnkgZG9pbmcgdGhhdCwgdGhlIHdvcmtzcGFjZSB3aWxsIG9ic2VydmVcclxuICAgKiB0aGUgc2VsZWN0ZWQgZW50aXR5IChmcm9tIHRoZSBzdG9yZSkgYW5kIHVwZGF0ZSB0aGUgYWN0aW9ucyBhdmFpbGFiaWxpdHkuXHJcbiAgICogRm9yIGV4YW1wbGUsIHNvbWUgYWN0aW9ucyByZXF1aXJlIGFuIGVudGl0eSB0byBiZSBzZWxlY3RlZC5cclxuICAgKi9cclxuICBhY3RpdmF0ZSgpIHtcclxuICAgIGlmICh0aGlzLmFjdGl2ZSA9PT0gdHJ1ZSkge1xyXG4gICAgICB0aGlzLmRlYWN0aXZhdGUoKTtcclxuICAgIH1cclxuICAgIHRoaXMuYWN0aXZlID0gdHJ1ZTtcclxuXHJcbiAgICBpZiAodGhpcy5lbnRpdHlTdG9yZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMuZW50aXRpZXMkJCA9IHRoaXMuZW50aXR5U3RvcmUuc3RhdGVWaWV3LmFsbCQoKVxyXG4gICAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5vblN0YXRlQ2hhbmdlKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLmFjdGlvblN0b3JlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5jaGFuZ2UkID0gdGhpcy5jaGFuZ2VcclxuICAgICAgICAucGlwZShkZWJvdW5jZVRpbWUoMzUpKVxyXG4gICAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5hY3Rpb25TdG9yZS51cGRhdGVBY3Rpb25zQXZhaWxhYmlsaXR5KCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuY2hhbmdlLm5leHQoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIERlYWN0aXZhdGUgdGhlIHdvcmtzcGFjZS4gVW5zdWJjcmliZSB0byB0aGUgc2VsZWN0ZWQgZW50aXR5LlxyXG4gICAqL1xyXG4gIGRlYWN0aXZhdGUoKSB7XHJcbiAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgdGhpcy5kZWFjdGl2YXRlV2lkZ2V0KCk7XHJcblxyXG4gICAgaWYgKHRoaXMuZW50aXRpZXMkJCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMuZW50aXRpZXMkJC51bnN1YnNjcmliZSgpO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuY2hhbmdlJCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMuY2hhbmdlJC51bnN1YnNjcmliZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWN0aXZhdGUgYSB3aWRnZXQuIEluIGl0c2VsZiwgYWN0aXZhdGluZyBhIHdpZGdldCBkb2Vzbid0IHJlbmRlciBpdCBidXQsXHJcbiAgICogaWYgYW4gV29ya3NwYWNlV2lkZ2V0T3V0bGV0IGNvbXBvbmVudCBpcyBib3VuZCB0byB0aGlzIHdvcmtzcGFjZSwgdGhlIHdpZGdldCB3aWxsXHJcbiAgICogc2hvdyB1cC5cclxuICAgKiBAcGFyYW0gd2lkZ2V0IFdpZGdldFxyXG4gICAqIEBwYXJhbSBpbnB1dHMgSW5wdXRzIHRoZSB3aWRnZXQgd2lsbCByZWNlaXZlXHJcbiAgICovXHJcbiAgYWN0aXZhdGVXaWRnZXQoXHJcbiAgICB3aWRnZXQ6IFdpZGdldCxcclxuICAgIGlucHV0czoge1trZXk6IHN0cmluZ106IGFueX0gPSB7fSxcclxuICAgIHN1YnNjcmliZXJzOiB7W2tleTogc3RyaW5nXTogKGV2ZW50OiBhbnkpID0+IHZvaWR9ID0ge31cclxuICApIHtcclxuICAgIHRoaXMud2lkZ2V0JC5uZXh0KHdpZGdldCk7XHJcbiAgICB0aGlzLndpZGdldElucHV0cyQubmV4dChpbnB1dHMpO1xyXG4gICAgdGhpcy53aWRnZXRTdWJzY3JpYmVycyQubmV4dChzdWJzY3JpYmVycyk7XHJcbiAgICB0aGlzLmNoYW5nZS5uZXh0KCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBEZWFjdGl2YXRlIGEgd2lkZ2V0LlxyXG4gICAqL1xyXG4gIGRlYWN0aXZhdGVXaWRnZXQoKSB7XHJcbiAgICB0aGlzLndpZGdldCQubmV4dCh1bmRlZmluZWQpO1xyXG4gICAgdGhpcy5jaGFuZ2UubmV4dCgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogV2hlbiB0aGUgc3RhdGUgY2hhbmdlcywgdXBkYXRlIHRoZSBhY3Rpb25zIGF2YWlsYWJpbGl0eS5cclxuICAgKi9cclxuICBwcml2YXRlIG9uU3RhdGVDaGFuZ2UoKSB7XHJcbiAgICB0aGlzLmNoYW5nZS5uZXh0KCk7XHJcbiAgfVxyXG5cclxufVxyXG4iXX0=
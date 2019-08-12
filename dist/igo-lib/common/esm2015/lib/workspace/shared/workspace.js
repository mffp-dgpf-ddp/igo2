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
         * Observable of the selected entity
         */
        this.entity$ = new BehaviorSubject(undefined);
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
        this.changes$ = new Subject();
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
     * Selected entity
     * @return {?}
     */
    get entity() { return this.entity$.value; }
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
            this.entities$$ = this.entityStore.stateView
                .manyBy$((/**
             * @param {?} record
             * @return {?}
             */
            (record) => record.state.selected === true))
                .subscribe((/**
             * @param {?} records
             * @return {?}
             */
            (records) => {
                // If more than one entity is selected, consider that no entity at all is selected.
                /** @type {?} */
                const entity = (records.length === 0 || records.length > 1) ? undefined : records[0].entity;
                this.onSelectEntity(entity);
            }));
        }
        if (this.actionStore !== undefined) {
            this.changes$$ = this.changes$
                .pipe(debounceTime(50))
                .subscribe((/**
             * @return {?}
             */
            () => this.actionStore.updateActionsAvailability()));
        }
        this.changes$.next();
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
        if (this.changes$$ !== undefined) {
            this.changes$$.unsubscribe();
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
    }
    /**
     * Deactivate a widget.
     * @return {?}
     */
    deactivateWidget() {
        this.widget$.next(undefined);
        this.changes$.next();
    }
    /**
     * When an entity is selected, keep a reference to that
     * entity and update the actions availability.
     * @private
     * @param {?} entity Entity
     * @return {?}
     */
    onSelectEntity(entity) {
        if (entity === this.entity$.value) {
            return;
        }
        this.entity$.next(entity);
        this.changes$.next();
    }
}
if (false) {
    /**
     * Observable of the selected entity
     * @type {?}
     */
    Workspace.prototype.entity$;
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
    Workspace.prototype.changes$;
    /**
     * Subscription to state changes
     * @type {?}
     * @private
     */
    Workspace.prototype.changes$$;
    /**
     * @type {?}
     * @protected
     */
    Workspace.prototype.options;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya3NwYWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvY29tbW9uLyIsInNvdXJjZXMiOlsibGliL3dvcmtzcGFjZS9zaGFyZWQvd29ya3NwYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQWdCLGVBQWUsRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDOUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7Ozs7O0FBYTlDLE1BQU0sT0FBTyxTQUFTOzs7O0lBa0ZwQixZQUFzQixPQUF5QjtRQUF6QixZQUFPLEdBQVAsT0FBTyxDQUFrQjs7OztRQTdFeEMsWUFBTyxHQUFHLElBQUksZUFBZSxDQUFJLFNBQVMsQ0FBQyxDQUFDOzs7O1FBSzVDLFlBQU8sR0FBRyxJQUFJLGVBQWUsQ0FBUyxTQUFTLENBQUMsQ0FBQzs7OztRQUtqRCxrQkFBYSxHQUFHLElBQUksZUFBZSxDQUF1QixFQUFFLENBQUMsQ0FBQzs7OztRQUs5RCx1QkFBa0IsR0FBRyxJQUFJLGVBQWUsQ0FBd0MsRUFBRSxDQUFDLENBQUM7Ozs7UUFVbkYsV0FBTSxHQUFZLEtBQUssQ0FBQzs7OztRQUt4QixhQUFRLEdBQWtCLElBQUksT0FBTyxFQUFFLENBQUM7SUErQ0UsQ0FBQzs7Ozs7SUFyQ25ELElBQUksRUFBRSxLQUFhLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDOzs7OztJQUs1QyxJQUFJLEtBQUssS0FBYSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQzs7Ozs7SUFLbEQsSUFBSSxJQUFJLEtBQTJCLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQzs7Ozs7SUFLcEUsSUFBSSxXQUFXLEtBQXFCLE9BQU8sbUJBQUEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQWtCLENBQUMsQ0FBQyxDQUFD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QzlCLElBQUksTUFBTSxLQUFLLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFO1lBQ2pDLE9BQU87U0FDUjtRQUNELElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzFCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDdkIsQ0FBQztDQUVGOzs7Ozs7SUF2S0MsNEJBQW1EOzs7OztJQUtuRCw0QkFBd0Q7Ozs7O0lBS3hELGtDQUFxRTs7Ozs7SUFLckUsdUNBQTJGOzs7Ozs7SUFLM0YsK0JBQWlDOzs7Ozs7SUFLakMsMkJBQWdDOzs7Ozs7SUFLaEMsNkJBQWdEOzs7Ozs7SUFLaEQsOEJBQWdDOzs7OztJQTBDcEIsNEJBQW1DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU3Vic2NyaXB0aW9uLCBCZWhhdmlvclN1YmplY3QsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgZGVib3VuY2VUaW1lIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuaW1wb3J0IHsgQWN0aW9uU3RvcmUgfSBmcm9tICcuLi8uLi9hY3Rpb24nO1xyXG5pbXBvcnQgeyBXaWRnZXQgfSBmcm9tICcuLi8uLi93aWRnZXQnO1xyXG5pbXBvcnQgeyBFbnRpdHlSZWNvcmQsIEVudGl0eVN0b3JlIH0gZnJvbSAnLi4vLi4vZW50aXR5JztcclxuXHJcbmltcG9ydCB7IFdvcmtzcGFjZU9wdGlvbnMgfSBmcm9tICcuL3dvcmtzcGFjZS5pbnRlcmZhY2VzJztcclxuXHJcbi8qKlxyXG4gKiBUaGlzIGNsYXNzIGlzIHJlc3BvbnNpYmxlIG9mIG1hbmFnaW5nIHRoZSByZWxhdGlvbnMgYmV0d2VlblxyXG4gKiBlbnRpdGllcyBhbmQgdGhlIGFjdGlvbnMgdGhhdCBjb25zdW1lIHRoZW0uIEl0IGFsc28gZGVmaW5lcyBhblxyXG4gKiBlbnRpdHkgdGFibGUgdGVtcGxhdGUgdGhhdCBtYXkgYmUgdXNlZCBieSBhbiBlbnRpdHkgdGFibGUgY29tcG9uZW50LlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFdvcmtzcGFjZTxFIGV4dGVuZHMgb2JqZWN0ID0gb2JqZWN0PiB7XHJcblxyXG4gIC8qKlxyXG4gICAqIE9ic2VydmFibGUgb2YgdGhlIHNlbGVjdGVkIGVudGl0eVxyXG4gICAqL1xyXG4gIHB1YmxpYyBlbnRpdHkkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxFPih1bmRlZmluZWQpO1xyXG5cclxuICAvKipcclxuICAgKiBPYnNlcnZhYmxlIG9mIHRoZSBzZWxlY3RlZCB3aWRnZXRcclxuICAgKi9cclxuICBwdWJsaWMgd2lkZ2V0JCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8V2lkZ2V0Pih1bmRlZmluZWQpO1xyXG5cclxuICAvKipcclxuICAgKiBPYnNlcnZhYmxlIG9mIHRoZSBzZWxlY3RlZCB3aWRnZXQncyBpbnB1dHNcclxuICAgKi9cclxuICBwdWJsaWMgd2lkZ2V0SW5wdXRzJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8e1trZXk6IHN0cmluZ106IGFueX0+KHt9KTtcclxuXHJcbiAgLyoqXHJcbiAgICogT2JzZXJ2YWJsZSBvZiB0aGUgc2VsZWN0ZWQgd2lkZ2V0J3Mgc3Vic2NyaWJlcnNcclxuICAgKi9cclxuICBwdWJsaWMgd2lkZ2V0U3Vic2NyaWJlcnMkID0gbmV3IEJlaGF2aW9yU3ViamVjdDx7W2tleTogc3RyaW5nXTogKGV2ZW50OiBhbnkpID0+IHZvaWR9Pih7fSk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFN1YnNjcmlwdGlvbiB0byB0aGUgc2VsZWN0ZWQgZW50aXR5XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBlbnRpdGllcyQkOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZXRoZXIgdGhpcyB3b3Jrc3BhY2UgaXMgYWN0aXZlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBhY3RpdmU6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgLyoqXHJcbiAgICogU3RhdGUgY2hhbmdlIHRoYXQgdHJpZ2dlciBhbiB1cGRhdGUgb2YgdGhlIGFjdGlvbnMgYXZhaWxhYmlsaXR5XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBjaGFuZ2VzJDogU3ViamVjdDx2b2lkPiA9IG5ldyBTdWJqZWN0KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFN1YnNjcmlwdGlvbiB0byBzdGF0ZSBjaGFuZ2VzXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBjaGFuZ2VzJCQ6IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgLyoqXHJcbiAgICogV29ya3NwYWNlIGlkXHJcbiAgICovXHJcbiAgZ2V0IGlkKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLm9wdGlvbnMuaWQ7IH1cclxuXHJcbiAgLyoqXHJcbiAgICogV29ya3NwYWNlIHRpdGxlXHJcbiAgICovXHJcbiAgZ2V0IHRpdGxlKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLm9wdGlvbnMudGl0bGU7IH1cclxuXHJcbiAgLyoqXHJcbiAgICogV29ya3NwYWNlIHRpdGxlXHJcbiAgICovXHJcbiAgZ2V0IG1ldGEoKToge1trZXk6IHN0cmluZ106IGFueX0geyByZXR1cm4gdGhpcy5vcHRpb25zLm1ldGEgfHwge307IH1cclxuXHJcbiAgLyoqXHJcbiAgICogRW50aXRpZXMgc3RvcmVcclxuICAgKi9cclxuICBnZXQgZW50aXR5U3RvcmUoKTogRW50aXR5U3RvcmU8RT4geyByZXR1cm4gdGhpcy5vcHRpb25zLmVudGl0eVN0b3JlIGFzIEVudGl0eVN0b3JlPEU+OyB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFjdGlvbnMgc3RvcmUgKHNvbWUgYWN0aW9ucyBhY3RpdmF0ZSBhIHdpZGdldClcclxuICAgKi9cclxuICBnZXQgYWN0aW9uU3RvcmUoKTogQWN0aW9uU3RvcmUgeyByZXR1cm4gdGhpcy5vcHRpb25zLmFjdGlvblN0b3JlOyB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNlbGVjdGVkIGVudGl0eVxyXG4gICAqL1xyXG4gIGdldCBlbnRpdHkoKTogRSB7IHJldHVybiB0aGlzLmVudGl0eSQudmFsdWU7IH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2VsZWN0ZWQgd2lkZ2V0XHJcbiAgICovXHJcbiAgZ2V0IHdpZGdldCgpOiBXaWRnZXQgeyByZXR1cm4gdGhpcy53aWRnZXQkLnZhbHVlOyB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZXRoZXIgYSB3aWRnZXQgaXMgc2VsZWN0ZWRcclxuICAgKi9cclxuICBnZXQgaGFzV2lkZ2V0KCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy53aWRnZXQgIT09IHVuZGVmaW5lZDsgfVxyXG5cclxuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgb3B0aW9uczogV29ya3NwYWNlT3B0aW9ucykge31cclxuXHJcbiAgLyoqXHJcbiAgICogV2hldGhlciB0aGlzIHdvcmtzcGFjZSBpcyBhY3RpdmVcclxuICAgKi9cclxuICBpc0FjdGl2ZSgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuYWN0aXZlOyB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFjdGl2YXRlIHRoZSB3b3Jrc3BhY2UuIEJ5IGRvaW5nIHRoYXQsIHRoZSB3b3Jrc3BhY2Ugd2lsbCBvYnNlcnZlXHJcbiAgICogdGhlIHNlbGVjdGVkIGVudGl0eSAoZnJvbSB0aGUgc3RvcmUpIGFuZCB1cGRhdGUgdGhlIGFjdGlvbnMgYXZhaWxhYmlsaXR5LlxyXG4gICAqIEZvciBleGFtcGxlLCBzb21lIGFjdGlvbnMgcmVxdWlyZSBhbiBlbnRpdHkgdG8gYmUgc2VsZWN0ZWQuXHJcbiAgICovXHJcbiAgYWN0aXZhdGUoKSB7XHJcbiAgICBpZiAodGhpcy5hY3RpdmUgPT09IHRydWUpIHtcclxuICAgICAgdGhpcy5kZWFjdGl2YXRlKCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmFjdGl2ZSA9IHRydWU7XHJcblxyXG4gICAgaWYgKHRoaXMuZW50aXR5U3RvcmUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLmVudGl0aWVzJCQgPSB0aGlzLmVudGl0eVN0b3JlLnN0YXRlVmlld1xyXG4gICAgICAgIC5tYW55QnkkKChyZWNvcmQ6IEVudGl0eVJlY29yZDxFPikgPT4gcmVjb3JkLnN0YXRlLnNlbGVjdGVkID09PSB0cnVlKVxyXG4gICAgICAgIC5zdWJzY3JpYmUoKHJlY29yZHM6IEVudGl0eVJlY29yZDxFPltdKSA9PiB7XHJcbiAgICAgICAgICAvLyBJZiBtb3JlIHRoYW4gb25lIGVudGl0eSBpcyBzZWxlY3RlZCwgY29uc2lkZXIgdGhhdCBubyBlbnRpdHkgYXQgYWxsIGlzIHNlbGVjdGVkLlxyXG4gICAgICAgICAgY29uc3QgZW50aXR5ID0gKHJlY29yZHMubGVuZ3RoID09PSAwIHx8IHJlY29yZHMubGVuZ3RoID4gMSkgPyB1bmRlZmluZWQgOiByZWNvcmRzWzBdLmVudGl0eTtcclxuICAgICAgICAgIHRoaXMub25TZWxlY3RFbnRpdHkoZW50aXR5KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5hY3Rpb25TdG9yZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMuY2hhbmdlcyQkID0gdGhpcy5jaGFuZ2VzJFxyXG4gICAgICAgIC5waXBlKGRlYm91bmNlVGltZSg1MCkpXHJcbiAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLmFjdGlvblN0b3JlLnVwZGF0ZUFjdGlvbnNBdmFpbGFiaWxpdHkoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5jaGFuZ2VzJC5uZXh0KCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBEZWFjdGl2YXRlIHRoZSB3b3Jrc3BhY2UuIFVuc3ViY3JpYmUgdG8gdGhlIHNlbGVjdGVkIGVudGl0eS5cclxuICAgKi9cclxuICBkZWFjdGl2YXRlKCkge1xyXG4gICAgdGhpcy5hY3RpdmUgPSBmYWxzZTtcclxuICAgIHRoaXMuZGVhY3RpdmF0ZVdpZGdldCgpO1xyXG5cclxuICAgIGlmICh0aGlzLmVudGl0aWVzJCQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLmVudGl0aWVzJCQudW5zdWJzY3JpYmUoKTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLmNoYW5nZXMkJCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMuY2hhbmdlcyQkLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBY3RpdmF0ZSBhIHdpZGdldC4gSW4gaXRzZWxmLCBhY3RpdmF0aW5nIGEgd2lkZ2V0IGRvZXNuJ3QgcmVuZGVyIGl0IGJ1dCxcclxuICAgKiBpZiBhbiBXb3Jrc3BhY2VXaWRnZXRPdXRsZXQgY29tcG9uZW50IGlzIGJvdW5kIHRvIHRoaXMgd29ya3NwYWNlLCB0aGUgd2lkZ2V0IHdpbGxcclxuICAgKiBzaG93IHVwLlxyXG4gICAqIEBwYXJhbSB3aWRnZXQgV2lkZ2V0XHJcbiAgICogQHBhcmFtIGlucHV0cyBJbnB1dHMgdGhlIHdpZGdldCB3aWxsIHJlY2VpdmVcclxuICAgKi9cclxuICBhY3RpdmF0ZVdpZGdldChcclxuICAgIHdpZGdldDogV2lkZ2V0LFxyXG4gICAgaW5wdXRzOiB7W2tleTogc3RyaW5nXTogYW55fSA9IHt9LFxyXG4gICAgc3Vic2NyaWJlcnM6IHtba2V5OiBzdHJpbmddOiAoZXZlbnQ6IGFueSkgPT4gdm9pZH0gPSB7fVxyXG4gICkge1xyXG4gICAgdGhpcy53aWRnZXQkLm5leHQod2lkZ2V0KTtcclxuICAgIHRoaXMud2lkZ2V0SW5wdXRzJC5uZXh0KGlucHV0cyk7XHJcbiAgICB0aGlzLndpZGdldFN1YnNjcmliZXJzJC5uZXh0KHN1YnNjcmliZXJzKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIERlYWN0aXZhdGUgYSB3aWRnZXQuXHJcbiAgICovXHJcbiAgZGVhY3RpdmF0ZVdpZGdldCgpIHtcclxuICAgIHRoaXMud2lkZ2V0JC5uZXh0KHVuZGVmaW5lZCk7XHJcbiAgICB0aGlzLmNoYW5nZXMkLm5leHQoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZW4gYW4gZW50aXR5IGlzIHNlbGVjdGVkLCBrZWVwIGEgcmVmZXJlbmNlIHRvIHRoYXRcclxuICAgKiBlbnRpdHkgYW5kIHVwZGF0ZSB0aGUgYWN0aW9ucyBhdmFpbGFiaWxpdHkuXHJcbiAgICogQHBhcmFtIGVudGl0eSBFbnRpdHlcclxuICAgKi9cclxuICBwcml2YXRlIG9uU2VsZWN0RW50aXR5KGVudGl0eTogRSkge1xyXG4gICAgaWYgKGVudGl0eSA9PT0gdGhpcy5lbnRpdHkkLnZhbHVlKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHRoaXMuZW50aXR5JC5uZXh0KGVudGl0eSk7XHJcbiAgICB0aGlzLmNoYW5nZXMkLm5leHQoKTtcclxuICB9XHJcblxyXG59XHJcbiJdfQ==
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EntityStore } from '../shared/store';
import { EntityStoreWatcher } from '../shared/watcher';
import { getEntityTitle } from '../shared/entity.utils';
var EntitySelectorComponent = /** @class */ (function () {
    function EntitySelectorComponent(cdRef) {
        this.cdRef = cdRef;
        /**
         * The selected entity
         * \@internal
         */
        this.selected$ = new BehaviorSubject(undefined);
        /**
         * Wheter selecting many entities is allowed
         */
        this.many = false;
        /**
         * Title accessor
         */
        this.titleAccessor = getEntityTitle;
        /**
         * Text to display when nothing is selected
         */
        this.emptyText = undefined;
        /**
         * Event emitted when the selection changes
         */
        this.selectedChange = new EventEmitter();
    }
    /**
     * Create a store watcher and subscribe to the selected entity
     * @internal
     */
    /**
     * Create a store watcher and subscribe to the selected entity
     * \@internal
     * @return {?}
     */
    EntitySelectorComponent.prototype.ngOnInit = /**
     * Create a store watcher and subscribe to the selected entity
     * \@internal
     * @return {?}
     */
    function () {
        var _this = this;
        this.watcher = new EntityStoreWatcher(this.store, this.cdRef);
        this.selected$$ = this.store.stateView
            .manyBy$((/**
         * @param {?} record
         * @return {?}
         */
        function (record) { return record.state.selected === true; }))
            .subscribe((/**
         * @param {?} records
         * @return {?}
         */
        function (records) {
            /** @type {?} */
            var entities = records.map((/**
             * @param {?} record
             * @return {?}
             */
            function (record) { return record.entity; }));
            if (_this.many === true) {
                _this.selected$.next(entities);
            }
            else {
                /** @type {?} */
                var entity = entities.length > 0 ? entities[0] : undefined;
                _this.selected$.next(entity);
            }
        }));
    };
    /**
     * Unsubscribe to the selected entity and destroy the store watcher
     * @internal
     */
    /**
     * Unsubscribe to the selected entity and destroy the store watcher
     * \@internal
     * @return {?}
     */
    EntitySelectorComponent.prototype.ngOnDestroy = /**
     * Unsubscribe to the selected entity and destroy the store watcher
     * \@internal
     * @return {?}
     */
    function () {
        this.watcher.destroy();
        this.selected$$.unsubscribe();
    };
    /**
     * On selection change, update the store's state and emit an event
     * @internal
     */
    /**
     * On selection change, update the store's state and emit an event
     * \@internal
     * @param {?} event
     * @return {?}
     */
    EntitySelectorComponent.prototype.onSelectionChange = /**
     * On selection change, update the store's state and emit an event
     * \@internal
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var entities = event.value instanceof Array ? event.value : [event.value];
        if (entities.length === 0) {
            this.store.state.updateAll({ selected: false });
        }
        else {
            this.store.state.updateMany(entities, { selected: true }, true);
        }
        this.selectedChange.emit({ selected: true, value: event.value });
    };
    EntitySelectorComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-entity-selector',
                    template: "<mat-form-field class=\"igo-entity-selector\">\r\n  <mat-select\r\n    [value]=\"selected$ | async\"\r\n    [multiple]=\"many\"\r\n    [placeholder]=\"placeholder\"\r\n    (selectionChange)=\"onSelectionChange($event)\">\r\n    <mat-option *ngIf=\"emptyText !== undefined\">{{emptyText}}</mat-option>\r\n    <ng-template ngFor let-entity [ngForOf]=\"store.view.all$() | async\">\r\n      <mat-option [value]=\"entity\">\r\n        {{titleAccessor(entity)}}\r\n      </mat-option>\r\n    </ng-template>\r\n  </mat-select>\r\n</mat-form-field>\r\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: ["mat-form-field{width:100%}"]
                }] }
    ];
    /** @nocollapse */
    EntitySelectorComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef }
    ]; };
    EntitySelectorComponent.propDecorators = {
        store: [{ type: Input }],
        many: [{ type: Input }],
        titleAccessor: [{ type: Input }],
        emptyText: [{ type: Input }],
        placeholder: [{ type: Input }],
        selectedChange: [{ type: Output }]
    };
    return EntitySelectorComponent;
}());
export { EntitySelectorComponent };
if (false) {
    /**
     * The selected entity
     * \@internal
     * @type {?}
     */
    EntitySelectorComponent.prototype.selected$;
    /**
     * Subscription to the selected entity
     * @type {?}
     * @private
     */
    EntitySelectorComponent.prototype.selected$$;
    /**
     * Store watcher
     * @type {?}
     * @private
     */
    EntitySelectorComponent.prototype.watcher;
    /**
     * Entity store
     * @type {?}
     */
    EntitySelectorComponent.prototype.store;
    /**
     * Wheter selecting many entities is allowed
     * @type {?}
     */
    EntitySelectorComponent.prototype.many;
    /**
     * Title accessor
     * @type {?}
     */
    EntitySelectorComponent.prototype.titleAccessor;
    /**
     * Text to display when nothing is selected
     * @type {?}
     */
    EntitySelectorComponent.prototype.emptyText;
    /**
     * Field placeholder
     * @type {?}
     */
    EntitySelectorComponent.prototype.placeholder;
    /**
     * Event emitted when the selection changes
     * @type {?}
     */
    EntitySelectorComponent.prototype.selectedChange;
    /**
     * @type {?}
     * @private
     */
    EntitySelectorComponent.prototype.cdRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW50aXR5LXNlbGVjdG9yLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2NvbW1vbi8iLCJzb3VyY2VzIjpbImxpYi9lbnRpdHkvZW50aXR5LXNlbGVjdG9yL2VudGl0eS1zZWxlY3Rvci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBQ1osdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUdsQixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsZUFBZSxFQUFnQixNQUFNLE1BQU0sQ0FBQztBQUdyRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDOUMsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDdkQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRXhEO0lBeURFLGlDQUFvQixLQUF3QjtRQUF4QixVQUFLLEdBQUwsS0FBSyxDQUFtQjs7Ozs7UUE3QzVDLGNBQVMsR0FBRyxJQUFJLGVBQWUsQ0FBUyxTQUFTLENBQUMsQ0FBQzs7OztRQW9CMUMsU0FBSSxHQUFZLEtBQUssQ0FBQzs7OztRQUt0QixrQkFBYSxHQUF1QixjQUFjLENBQUM7Ozs7UUFLbkQsY0FBUyxHQUFXLFNBQVMsQ0FBQzs7OztRQVU3QixtQkFBYyxHQUFHLElBQUksWUFBWSxFQUd2QyxDQUFDO0lBRTBDLENBQUM7SUFFaEQ7OztPQUdHOzs7Ozs7SUFDSCwwQ0FBUTs7Ozs7SUFBUjtRQUFBLGlCQWFDO1FBWkMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLGtCQUFrQixDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzlELElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTO2FBQ25DLE9BQU87Ozs7UUFBQyxVQUFDLE1BQTRCLElBQUssT0FBQSxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsS0FBSyxJQUFJLEVBQTlCLENBQThCLEVBQUM7YUFDekUsU0FBUzs7OztRQUFDLFVBQUMsT0FBK0I7O2dCQUNuQyxRQUFRLEdBQUcsT0FBTyxDQUFDLEdBQUc7Ozs7WUFBQyxVQUFDLE1BQTRCLElBQUssT0FBQSxNQUFNLENBQUMsTUFBTSxFQUFiLENBQWEsRUFBQztZQUM3RSxJQUFJLEtBQUksQ0FBQyxJQUFJLEtBQUssSUFBSSxFQUFFO2dCQUN0QixLQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUMvQjtpQkFBTTs7b0JBQ0MsTUFBTSxHQUFHLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVM7Z0JBQzVELEtBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQzdCO1FBQ0gsQ0FBQyxFQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQ7OztPQUdHOzs7Ozs7SUFDSCw2Q0FBVzs7Ozs7SUFBWDtRQUNFLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNoQyxDQUFDO0lBRUQ7OztPQUdHOzs7Ozs7O0lBQ0gsbURBQWlCOzs7Ozs7SUFBakIsVUFBa0IsS0FBa0M7O1lBQzVDLFFBQVEsR0FBRyxLQUFLLENBQUMsS0FBSyxZQUFZLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO1FBQzNFLElBQUksUUFBUSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDekIsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEVBQUMsUUFBUSxFQUFFLEtBQUssRUFBQyxDQUFDLENBQUM7U0FDL0M7YUFBTTtZQUNMLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDL0Q7UUFFRCxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxLQUFLLEVBQUMsQ0FBQyxDQUFDO0lBQ2pFLENBQUM7O2dCQXBHRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLHFCQUFxQjtvQkFDL0IsNmlCQUErQztvQkFFL0MsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2lCQUNoRDs7OztnQkFqQkMsaUJBQWlCOzs7d0JBdUNoQixLQUFLO3VCQUtMLEtBQUs7Z0NBS0wsS0FBSzs0QkFLTCxLQUFLOzhCQUtMLEtBQUs7aUNBS0wsTUFBTTs7SUFrRFQsOEJBQUM7Q0FBQSxBQXRHRCxJQXNHQztTQWhHWSx1QkFBdUI7Ozs7Ozs7SUFNbEMsNENBQW1EOzs7Ozs7SUFLbkQsNkNBQWlDOzs7Ozs7SUFLakMsMENBQTRDOzs7OztJQUs1Qyx3Q0FBb0M7Ozs7O0lBS3BDLHVDQUErQjs7Ozs7SUFLL0IsZ0RBQTREOzs7OztJQUs1RCw0Q0FBdUM7Ozs7O0lBS3ZDLDhDQUE2Qjs7Ozs7SUFLN0IsaURBR0s7Ozs7O0lBRU8sd0NBQWdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgSW5wdXQsXHJcbiAgT3V0cHV0LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcclxuICBDaGFuZ2VEZXRlY3RvclJlZixcclxuICBPbkluaXQsXHJcbiAgT25EZXN0cm95XHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IHsgRW50aXR5UmVjb3JkIH0gZnJvbSAnLi4vc2hhcmVkL2VudGl0eS5pbnRlcmZhY2VzJztcclxuaW1wb3J0IHsgRW50aXR5U3RvcmUgfSBmcm9tICcuLi9zaGFyZWQvc3RvcmUnO1xyXG5pbXBvcnQgeyBFbnRpdHlTdG9yZVdhdGNoZXIgfSBmcm9tICcuLi9zaGFyZWQvd2F0Y2hlcic7XHJcbmltcG9ydCB7IGdldEVudGl0eVRpdGxlIH0gZnJvbSAnLi4vc2hhcmVkL2VudGl0eS51dGlscyc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2lnby1lbnRpdHktc2VsZWN0b3InLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9lbnRpdHktc2VsZWN0b3IuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2VudGl0eS1zZWxlY3Rvci5jb21wb25lbnQuc2NzcyddLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBFbnRpdHlTZWxlY3RvckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIHNlbGVjdGVkIGVudGl0eVxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIHNlbGVjdGVkJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8b2JqZWN0Pih1bmRlZmluZWQpO1xyXG5cclxuICAvKipcclxuICAgKiBTdWJzY3JpcHRpb24gdG8gdGhlIHNlbGVjdGVkIGVudGl0eVxyXG4gICAqL1xyXG4gIHByaXZhdGUgc2VsZWN0ZWQkJDogU3Vic2NyaXB0aW9uO1xyXG5cclxuICAvKipcclxuICAgKiBTdG9yZSB3YXRjaGVyXHJcbiAgICovXHJcbiAgcHJpdmF0ZSB3YXRjaGVyOiBFbnRpdHlTdG9yZVdhdGNoZXI8b2JqZWN0PjtcclxuXHJcbiAgLyoqXHJcbiAgICogRW50aXR5IHN0b3JlXHJcbiAgICovXHJcbiAgQElucHV0KCkgc3RvcmU6IEVudGl0eVN0b3JlPG9iamVjdD47XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZXRlciBzZWxlY3RpbmcgbWFueSBlbnRpdGllcyBpcyBhbGxvd2VkXHJcbiAgICovXHJcbiAgQElucHV0KCkgbWFueTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAvKipcclxuICAgKiBUaXRsZSBhY2Nlc3NvclxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHRpdGxlQWNjZXNzb3I6IChvYmplY3QpID0+IHN0cmluZyA9IGdldEVudGl0eVRpdGxlO1xyXG5cclxuICAvKipcclxuICAgKiBUZXh0IHRvIGRpc3BsYXkgd2hlbiBub3RoaW5nIGlzIHNlbGVjdGVkXHJcbiAgICovXHJcbiAgQElucHV0KCkgZW1wdHlUZXh0OiBzdHJpbmcgPSB1bmRlZmluZWQ7XHJcblxyXG4gIC8qKlxyXG4gICAqIEZpZWxkIHBsYWNlaG9sZGVyXHJcbiAgICovXHJcbiAgQElucHV0KCkgcGxhY2Vob2xkZXI6IHN0cmluZztcclxuXHJcbiAgLyoqXHJcbiAgICogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBzZWxlY3Rpb24gY2hhbmdlc1xyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBzZWxlY3RlZENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8e1xyXG4gICAgc2VsZWN0ZWQ6IGJvb2xlYW47XHJcbiAgICB2YWx1ZTogb2JqZWN0IHwgb2JqZWN0W107XHJcbiAgfT4oKTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjZFJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHt9XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZSBhIHN0b3JlIHdhdGNoZXIgYW5kIHN1YnNjcmliZSB0byB0aGUgc2VsZWN0ZWQgZW50aXR5XHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLndhdGNoZXIgPSBuZXcgRW50aXR5U3RvcmVXYXRjaGVyKHRoaXMuc3RvcmUsIHRoaXMuY2RSZWYpO1xyXG4gICAgdGhpcy5zZWxlY3RlZCQkID0gdGhpcy5zdG9yZS5zdGF0ZVZpZXdcclxuICAgICAgLm1hbnlCeSQoKHJlY29yZDogRW50aXR5UmVjb3JkPG9iamVjdD4pID0+IHJlY29yZC5zdGF0ZS5zZWxlY3RlZCA9PT0gdHJ1ZSlcclxuICAgICAgLnN1YnNjcmliZSgocmVjb3JkczogRW50aXR5UmVjb3JkPG9iamVjdD5bXSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGVudGl0aWVzID0gcmVjb3Jkcy5tYXAoKHJlY29yZDogRW50aXR5UmVjb3JkPG9iamVjdD4pID0+IHJlY29yZC5lbnRpdHkpO1xyXG4gICAgICAgIGlmICh0aGlzLm1hbnkgPT09IHRydWUpIHtcclxuICAgICAgICAgIHRoaXMuc2VsZWN0ZWQkLm5leHQoZW50aXRpZXMpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBjb25zdCBlbnRpdHkgPSBlbnRpdGllcy5sZW5ndGggPiAwID8gZW50aXRpZXNbMF0gOiB1bmRlZmluZWQ7XHJcbiAgICAgICAgICB0aGlzLnNlbGVjdGVkJC5uZXh0KGVudGl0eSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVuc3Vic2NyaWJlIHRvIHRoZSBzZWxlY3RlZCBlbnRpdHkgYW5kIGRlc3Ryb3kgdGhlIHN0b3JlIHdhdGNoZXJcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMud2F0Y2hlci5kZXN0cm95KCk7XHJcbiAgICB0aGlzLnNlbGVjdGVkJCQudW5zdWJzY3JpYmUoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE9uIHNlbGVjdGlvbiBjaGFuZ2UsIHVwZGF0ZSB0aGUgc3RvcmUncyBzdGF0ZSBhbmQgZW1pdCBhbiBldmVudFxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIG9uU2VsZWN0aW9uQ2hhbmdlKGV2ZW50OiB7dmFsdWU6IG9iamVjdCB8IHVuZGVmaW5lZH0pIHtcclxuICAgIGNvbnN0IGVudGl0aWVzID0gZXZlbnQudmFsdWUgaW5zdGFuY2VvZiBBcnJheSA/IGV2ZW50LnZhbHVlIDogW2V2ZW50LnZhbHVlXTtcclxuICAgIGlmIChlbnRpdGllcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgdGhpcy5zdG9yZS5zdGF0ZS51cGRhdGVBbGwoe3NlbGVjdGVkOiBmYWxzZX0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5zdG9yZS5zdGF0ZS51cGRhdGVNYW55KGVudGl0aWVzLCB7c2VsZWN0ZWQ6IHRydWV9LCB0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnNlbGVjdGVkQ2hhbmdlLmVtaXQoe3NlbGVjdGVkOiB0cnVlLCB2YWx1ZTogZXZlbnQudmFsdWV9KTtcclxuICB9XHJcblxyXG59XHJcbiJdfQ==
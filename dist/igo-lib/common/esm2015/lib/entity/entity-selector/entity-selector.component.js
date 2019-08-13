/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EntityStore } from '../shared/store';
import { EntityStoreWatcher } from '../shared/watcher';
import { getEntityTitle } from '../shared/entity.utils';
export class EntitySelectorComponent {
    /**
     * @param {?} cdRef
     */
    constructor(cdRef) {
        this.cdRef = cdRef;
        /**
         * The selected entity
         * \@internal
         */
        this.selected$ = new BehaviorSubject(undefined);
        /**
         * The current multi select option text
         * \@internal
         */
        this.multiText$ = new BehaviorSubject(undefined);
        this.multiSelectValue = { id: 'IGO_MULTI_SELECT' };
        /**
         * Title accessor
         */
        this.titleAccessor = getEntityTitle;
        /**
         * Text to display when nothing is selected
         */
        this.emptyText = undefined;
        /**
         * Wheter selecting many entities is allowed
         */
        this.multi = false;
        /**
         * Text to display for the select all option
         */
        this.multiAllText = 'All';
        /**
         * Text to display for the select none option
         */
        this.multiNoneText = 'None';
        /**
         * Event emitted when the selection changes
         */
        this.selectedChange = new EventEmitter();
    }
    /**
     * Create a store watcher and subscribe to the selected entity
     * \@internal
     * @return {?}
     */
    ngOnInit() {
        this.watcher = new EntityStoreWatcher(this.store, this.cdRef);
        this.selected$$ = this.store.stateView
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
            /** @type {?} */
            const entities = records.map((/**
             * @param {?} record
             * @return {?}
             */
            (record) => record.entity));
            this.onSelectFromStore(entities);
        }));
    }
    /**
     * Unsubscribe to the selected entity and destroy the store watcher
     * \@internal
     * @return {?}
     */
    ngOnDestroy() {
        this.watcher.destroy();
        this.selected$$.unsubscribe();
    }
    /**
     * On selection change, update the store's state and emit an event
     * \@internal
     * @param {?} event
     * @return {?}
     */
    onSelectionChange(event) {
        /** @type {?} */
        const values = event.value instanceof Array ? event.value : [event.value];
        /** @type {?} */
        const multiSelect = values.find((/**
         * @param {?} _value
         * @return {?}
         */
        (_value) => _value === this.multiSelectValue));
        /** @type {?} */
        let entities = values.filter((/**
         * @param {?} _value
         * @return {?}
         */
        (_value) => _value !== this.multiSelectValue));
        if (multiSelect !== undefined) {
            if (entities.length === this.store.count) {
                entities = [];
            }
            else if (entities.length < this.store.count) {
                entities = this.store.all();
            }
        }
        if (entities.length === 0) {
            this.store.state.updateAll({ selected: false });
        }
        else {
            this.store.state.updateMany(entities, { selected: true }, true);
        }
        /** @type {?} */
        const value = this.multi ? entities : event.value;
        this.selectedChange.emit({ selected: true, value });
    }
    /**
     * @private
     * @param {?} entities
     * @return {?}
     */
    onSelectFromStore(entities) {
        if (this.multi === true) {
            this.selected$.next(entities);
        }
        else {
            /** @type {?} */
            const entity = entities.length > 0 ? entities[0] : undefined;
            this.selected$.next(entity);
        }
        this.updateMultiToggleWithEntities(entities);
    }
    /**
     * @private
     * @param {?} entities
     * @return {?}
     */
    updateMultiToggleWithEntities(entities) {
        if (entities.length === this.store.count && this.multiText$.value !== this.multiNoneText) {
            this.multiText$.next(this.multiNoneText);
        }
        else if (entities.length < this.store.count && this.multiText$.value !== this.multiAllText) {
            this.multiText$.next(this.multiAllText);
        }
    }
}
EntitySelectorComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-entity-selector',
                template: "<mat-form-field class=\"igo-entity-selector\">\r\n  <mat-select\r\n    [value]=\"selected$ | async\"\r\n    [multiple]=\"multi\"\r\n    [placeholder]=\"placeholder\"\r\n    (selectionChange)=\"onSelectionChange($event)\">\r\n    <mat-option *ngIf=\"emptyText !== undefined\">{{emptyText}}</mat-option>\r\n    <mat-option *ngIf=\"multi === true\" [value]=\"multiSelectValue\">{{multiText$ | async}}</mat-option>\r\n    <ng-template ngFor let-entity [ngForOf]=\"store.view.all$() | async\">\r\n      <mat-option [value]=\"entity\">\r\n        {{titleAccessor(entity)}}\r\n      </mat-option>\r\n    </ng-template>\r\n  </mat-select>\r\n</mat-form-field>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["mat-form-field{width:100%}"]
            }] }
];
/** @nocollapse */
EntitySelectorComponent.ctorParameters = () => [
    { type: ChangeDetectorRef }
];
EntitySelectorComponent.propDecorators = {
    store: [{ type: Input }],
    titleAccessor: [{ type: Input }],
    emptyText: [{ type: Input }],
    multi: [{ type: Input }],
    multiAllText: [{ type: Input }],
    multiNoneText: [{ type: Input }],
    placeholder: [{ type: Input }],
    selectedChange: [{ type: Output }]
};
if (false) {
    /**
     * The selected entity
     * \@internal
     * @type {?}
     */
    EntitySelectorComponent.prototype.selected$;
    /**
     * The current multi select option text
     * \@internal
     * @type {?}
     */
    EntitySelectorComponent.prototype.multiText$;
    /** @type {?} */
    EntitySelectorComponent.prototype.multiSelectValue;
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
     * Wheter selecting many entities is allowed
     * @type {?}
     */
    EntitySelectorComponent.prototype.multi;
    /**
     * Text to display for the select all option
     * @type {?}
     */
    EntitySelectorComponent.prototype.multiAllText;
    /**
     * Text to display for the select none option
     * @type {?}
     */
    EntitySelectorComponent.prototype.multiNoneText;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW50aXR5LXNlbGVjdG9yLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2NvbW1vbi8iLCJzb3VyY2VzIjpbImxpYi9lbnRpdHkvZW50aXR5LXNlbGVjdG9yL2VudGl0eS1zZWxlY3Rvci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBQ1osdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUdsQixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsZUFBZSxFQUFnQixNQUFNLE1BQU0sQ0FBQztBQUdyRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDOUMsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDdkQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBUXhELE1BQU0sT0FBTyx1QkFBdUI7Ozs7SUFxRWxDLFlBQW9CLEtBQXdCO1FBQXhCLFVBQUssR0FBTCxLQUFLLENBQW1COzs7OztRQS9ENUMsY0FBUyxHQUFHLElBQUksZUFBZSxDQUFTLFNBQVMsQ0FBQyxDQUFDOzs7OztRQU1uRCxlQUFVLEdBQUcsSUFBSSxlQUFlLENBQVMsU0FBUyxDQUFDLENBQUM7UUFFM0MscUJBQWdCLEdBQUcsRUFBQyxFQUFFLEVBQUUsa0JBQWtCLEVBQUMsQ0FBQzs7OztRQW9CNUMsa0JBQWEsR0FBdUIsY0FBYyxDQUFDOzs7O1FBS25ELGNBQVMsR0FBVyxTQUFTLENBQUM7Ozs7UUFLOUIsVUFBSyxHQUFZLEtBQUssQ0FBQzs7OztRQUt2QixpQkFBWSxHQUFXLEtBQUssQ0FBQzs7OztRQUs3QixrQkFBYSxHQUFXLE1BQU0sQ0FBQzs7OztRQVU5QixtQkFBYyxHQUFHLElBQUksWUFBWSxFQUd2QyxDQUFDO0lBRTBDLENBQUM7Ozs7OztJQU1oRCxRQUFRO1FBQ04sSUFB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c0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgSW5wdXQsXHJcbiAgT3V0cHV0LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcclxuICBDaGFuZ2VEZXRlY3RvclJlZixcclxuICBPbkluaXQsXHJcbiAgT25EZXN0cm95XHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IHsgRW50aXR5UmVjb3JkIH0gZnJvbSAnLi4vc2hhcmVkL2VudGl0eS5pbnRlcmZhY2VzJztcclxuaW1wb3J0IHsgRW50aXR5U3RvcmUgfSBmcm9tICcuLi9zaGFyZWQvc3RvcmUnO1xyXG5pbXBvcnQgeyBFbnRpdHlTdG9yZVdhdGNoZXIgfSBmcm9tICcuLi9zaGFyZWQvd2F0Y2hlcic7XHJcbmltcG9ydCB7IGdldEVudGl0eVRpdGxlIH0gZnJvbSAnLi4vc2hhcmVkL2VudGl0eS51dGlscyc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2lnby1lbnRpdHktc2VsZWN0b3InLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9lbnRpdHktc2VsZWN0b3IuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2VudGl0eS1zZWxlY3Rvci5jb21wb25lbnQuc2NzcyddLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBFbnRpdHlTZWxlY3RvckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIHNlbGVjdGVkIGVudGl0eVxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIHNlbGVjdGVkJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8b2JqZWN0Pih1bmRlZmluZWQpO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgY3VycmVudCBtdWx0aSBzZWxlY3Qgb3B0aW9uIHRleHRcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBtdWx0aVRleHQkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KHVuZGVmaW5lZCk7XHJcblxyXG4gIHJlYWRvbmx5IG11bHRpU2VsZWN0VmFsdWUgPSB7aWQ6ICdJR09fTVVMVElfU0VMRUNUJ307XHJcblxyXG4gIC8qKlxyXG4gICAqIFN1YnNjcmlwdGlvbiB0byB0aGUgc2VsZWN0ZWQgZW50aXR5XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBzZWxlY3RlZCQkOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIC8qKlxyXG4gICAqIFN0b3JlIHdhdGNoZXJcclxuICAgKi9cclxuICBwcml2YXRlIHdhdGNoZXI6IEVudGl0eVN0b3JlV2F0Y2hlcjxvYmplY3Q+O1xyXG5cclxuICAvKipcclxuICAgKiBFbnRpdHkgc3RvcmVcclxuICAgKi9cclxuICBASW5wdXQoKSBzdG9yZTogRW50aXR5U3RvcmU8b2JqZWN0PjtcclxuXHJcbiAgLyoqXHJcbiAgICogVGl0bGUgYWNjZXNzb3JcclxuICAgKi9cclxuICBASW5wdXQoKSB0aXRsZUFjY2Vzc29yOiAob2JqZWN0KSA9PiBzdHJpbmcgPSBnZXRFbnRpdHlUaXRsZTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGV4dCB0byBkaXNwbGF5IHdoZW4gbm90aGluZyBpcyBzZWxlY3RlZFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGVtcHR5VGV4dDogc3RyaW5nID0gdW5kZWZpbmVkO1xyXG5cclxuICAvKipcclxuICAgKiBXaGV0ZXIgc2VsZWN0aW5nIG1hbnkgZW50aXRpZXMgaXMgYWxsb3dlZFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG11bHRpOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRleHQgdG8gZGlzcGxheSBmb3IgdGhlIHNlbGVjdCBhbGwgb3B0aW9uXHJcbiAgICovXHJcbiAgQElucHV0KCkgbXVsdGlBbGxUZXh0OiBzdHJpbmcgPSAnQWxsJztcclxuXHJcbiAgLyoqXHJcbiAgICogVGV4dCB0byBkaXNwbGF5IGZvciB0aGUgc2VsZWN0IG5vbmUgb3B0aW9uXHJcbiAgICovXHJcbiAgQElucHV0KCkgbXVsdGlOb25lVGV4dDogc3RyaW5nID0gJ05vbmUnO1xyXG5cclxuICAvKipcclxuICAgKiBGaWVsZCBwbGFjZWhvbGRlclxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyOiBzdHJpbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgc2VsZWN0aW9uIGNoYW5nZXNcclxuICAgKi9cclxuICBAT3V0cHV0KCkgc2VsZWN0ZWRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPHtcclxuICAgIHNlbGVjdGVkOiBib29sZWFuO1xyXG4gICAgdmFsdWU6IG9iamVjdCB8IG9iamVjdFtdO1xyXG4gIH0+KCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2RSZWY6IENoYW5nZURldGVjdG9yUmVmKSB7fVxyXG5cclxuICAvKipcclxuICAgKiBDcmVhdGUgYSBzdG9yZSB3YXRjaGVyIGFuZCBzdWJzY3JpYmUgdG8gdGhlIHNlbGVjdGVkIGVudGl0eVxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy53YXRjaGVyID0gbmV3IEVudGl0eVN0b3JlV2F0Y2hlcih0aGlzLnN0b3JlLCB0aGlzLmNkUmVmKTtcclxuXHJcbiAgICB0aGlzLnNlbGVjdGVkJCQgPSB0aGlzLnN0b3JlLnN0YXRlVmlld1xyXG4gICAgICAubWFueUJ5JCgocmVjb3JkOiBFbnRpdHlSZWNvcmQ8b2JqZWN0PikgPT4gcmVjb3JkLnN0YXRlLnNlbGVjdGVkID09PSB0cnVlKVxyXG4gICAgICAuc3Vic2NyaWJlKChyZWNvcmRzOiBFbnRpdHlSZWNvcmQ8b2JqZWN0PltdKSA9PiB7XHJcbiAgICAgICAgY29uc3QgZW50aXRpZXMgPSByZWNvcmRzLm1hcCgocmVjb3JkOiBFbnRpdHlSZWNvcmQ8b2JqZWN0PikgPT4gcmVjb3JkLmVudGl0eSk7XHJcbiAgICAgICAgdGhpcy5vblNlbGVjdEZyb21TdG9yZShlbnRpdGllcyk7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVW5zdWJzY3JpYmUgdG8gdGhlIHNlbGVjdGVkIGVudGl0eSBhbmQgZGVzdHJveSB0aGUgc3RvcmUgd2F0Y2hlclxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgdGhpcy53YXRjaGVyLmRlc3Ryb3koKTtcclxuICAgIHRoaXMuc2VsZWN0ZWQkJC51bnN1YnNjcmliZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogT24gc2VsZWN0aW9uIGNoYW5nZSwgdXBkYXRlIHRoZSBzdG9yZSdzIHN0YXRlIGFuZCBlbWl0IGFuIGV2ZW50XHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgb25TZWxlY3Rpb25DaGFuZ2UoZXZlbnQ6IHt2YWx1ZTogb2JqZWN0IHwgdW5kZWZpbmVkfSkge1xyXG4gICAgY29uc3QgdmFsdWVzID0gZXZlbnQudmFsdWUgaW5zdGFuY2VvZiBBcnJheSA/IGV2ZW50LnZhbHVlIDogW2V2ZW50LnZhbHVlXTtcclxuXHJcbiAgICBjb25zdCBtdWx0aVNlbGVjdCA9IHZhbHVlcy5maW5kKChfdmFsdWU6IG9iamVjdCkgPT4gX3ZhbHVlID09PSB0aGlzLm11bHRpU2VsZWN0VmFsdWUpO1xyXG4gICAgbGV0IGVudGl0aWVzID0gdmFsdWVzLmZpbHRlcigoX3ZhbHVlOiBvYmplY3QpID0+IF92YWx1ZSAhPT0gdGhpcy5tdWx0aVNlbGVjdFZhbHVlKTtcclxuICAgIGlmIChtdWx0aVNlbGVjdCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIGlmIChlbnRpdGllcy5sZW5ndGggPT09IHRoaXMuc3RvcmUuY291bnQpIHtcclxuICAgICAgICBlbnRpdGllcyA9IFtdO1xyXG4gICAgICB9IGVsc2UgaWYgKGVudGl0aWVzLmxlbmd0aCA8IHRoaXMuc3RvcmUuY291bnQpIHtcclxuICAgICAgICBlbnRpdGllcyA9IHRoaXMuc3RvcmUuYWxsKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAoZW50aXRpZXMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIHRoaXMuc3RvcmUuc3RhdGUudXBkYXRlQWxsKHtzZWxlY3RlZDogZmFsc2V9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuc3RvcmUuc3RhdGUudXBkYXRlTWFueShlbnRpdGllcywge3NlbGVjdGVkOiB0cnVlfSwgdHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgdmFsdWUgPSB0aGlzLm11bHRpID8gZW50aXRpZXMgOiBldmVudC52YWx1ZTtcclxuICAgIHRoaXMuc2VsZWN0ZWRDaGFuZ2UuZW1pdCh7c2VsZWN0ZWQ6IHRydWUsIHZhbHVlfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG9uU2VsZWN0RnJvbVN0b3JlKGVudGl0aWVzOiBvYmplY3RbXSkge1xyXG4gICAgaWYgKHRoaXMubXVsdGkgPT09IHRydWUpIHtcclxuICAgICAgdGhpcy5zZWxlY3RlZCQubmV4dChlbnRpdGllcyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zdCBlbnRpdHkgPSBlbnRpdGllcy5sZW5ndGggPiAwID8gZW50aXRpZXNbMF0gOiB1bmRlZmluZWQ7XHJcbiAgICAgIHRoaXMuc2VsZWN0ZWQkLm5leHQoZW50aXR5KTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnVwZGF0ZU11bHRpVG9nZ2xlV2l0aEVudGl0aWVzKGVudGl0aWVzKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgdXBkYXRlTXVsdGlUb2dnbGVXaXRoRW50aXRpZXMoZW50aXRpZXM6IG9iamVjdFtdKSB7XHJcbiAgICBpZiAoZW50aXRpZXMubGVuZ3RoID09PSB0aGlzLnN0b3JlLmNvdW50ICYmIHRoaXMubXVsdGlUZXh0JC52YWx1ZSAhPT0gdGhpcy5tdWx0aU5vbmVUZXh0KSB7XHJcbiAgICAgIHRoaXMubXVsdGlUZXh0JC5uZXh0KHRoaXMubXVsdGlOb25lVGV4dCk7XHJcbiAgICB9IGVsc2UgaWYgKGVudGl0aWVzLmxlbmd0aCA8IHRoaXMuc3RvcmUuY291bnQgJiYgdGhpcy5tdWx0aVRleHQkLnZhbHVlICE9PSB0aGlzLm11bHRpQWxsVGV4dCkge1xyXG4gICAgICB0aGlzLm11bHRpVGV4dCQubmV4dCh0aGlzLm11bHRpQWxsVGV4dCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxufVxyXG4iXX0=
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EntityStateManager, EntityStore } from '@igo2/common';
import { CatalogItemType } from '../shared';
/**
 * Catalog browser group item
 */
export class CatalogBrowserGroupComponent {
    constructor() {
        /**
         * Group's items store
         * \@internal
         */
        this.store = new EntityStore([]);
        /**
         * Whether all the layers of the group are added
         * \@internal
         */
        this.added$ = new BehaviorSubject(false);
        /**
         * Whether the toggle button is disabled
         * \@internal
         */
        this.disabled$ = new BehaviorSubject(false);
        /**
         * Whether the group is collapsed
         */
        this.collapsed = true;
        /**
         * Whether the group can be toggled when it's collapsed
         */
        this.toggleCollapsed = true;
        /**
         * Event emitted when the add/remove button of the group is clicked
         */
        this.addedChange = new EventEmitter();
        /**
         * Event emitted when the add/remove button of a layer is clicked
         */
        this.layerAddedChange = new EventEmitter();
    }
    /**
     * \@internal
     * @return {?}
     */
    get title() {
        return this.group.title;
    }
    /**
     * \@internal
     * @return {?}
     */
    ngOnInit() {
        this.store.load(this.group.items);
        this.evaluateAdded();
        this.evaluateDisabled(this.collapsed);
        if (this.catalog && this.catalog.sortDirection !== undefined) {
            this.store.view.sort({
                direction: this.catalog.sortDirection,
                valueAccessor: (/**
                 * @param {?} item
                 * @return {?}
                 */
                (item) => item.title)
            });
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.store.destroy();
    }
    /**
     * \@internal
     * @param {?} item
     * @return {?}
     */
    isGroup(item) {
        return item.type === CatalogItemType.Group;
    }
    /**
     * \@internal
     * @param {?} item
     * @return {?}
     */
    isLayer(item) {
        return item.type === CatalogItemType.Layer;
    }
    /**
     * On toggle button click, emit the added change event
     * \@internal
     * @return {?}
     */
    onToggleClick() {
        this.added$.value ? this.remove() : this.add();
    }
    /**
     * On toggle button click, emit the added change event
     * \@internal
     * @param {?} collapsed
     * @return {?}
     */
    onToggleCollapsed(collapsed) {
        this.evaluateDisabled(collapsed);
    }
    /**
     * When a layer is added or removed, evaluate if all the layers of the group
     * are now added or removed. If so, consider that the group itself is added
     * or removed.
     * \@internal
     * @param {?} event Layer added change event
     * @return {?}
     */
    onLayerAddedChange(event) {
        this.layerAddedChange.emit(event);
        this.tryToggleGroup(event);
    }
    /**
     * Emit added change event with added = true
     * @private
     * @return {?}
     */
    add() {
        this.added$.next(true);
        this.addedChange.emit({
            added: true,
            group: this.group
        });
    }
    /**
     * Emit added change event with added = true
     * @private
     * @return {?}
     */
    remove() {
        this.added$.next(false);
        this.addedChange.emit({
            added: false,
            group: this.group
        });
    }
    /**
     * If all the layers of the group added or removed, add or remove the group itself.
     * @private
     * @param {?} event The last layer added change event to occur
     * @return {?}
     */
    tryToggleGroup(event) {
        /** @type {?} */
        const added = event.added;
        /** @type {?} */
        const layer = event.layer;
        /** @type {?} */
        const layersAdded = this.store.view
            .all()
            .filter((/**
         * @param {?} item
         * @return {?}
         */
        (item) => item.id !== layer.id))
            .map((/**
         * @param {?} item
         * @return {?}
         */
        (item) => this.state.get(item).added || false));
        if (layersAdded.every((/**
         * @param {?} value
         * @return {?}
         */
        value => value === added))) {
            added ? this.add() : this.remove();
        }
        else if (this.added$.value === true) {
            this.added$.next(false);
        }
    }
    /**
     * @private
     * @return {?}
     */
    evaluateAdded() {
        /** @type {?} */
        const added = this.store.all().every((/**
         * @param {?} item
         * @return {?}
         */
        (item) => {
            return (this.state.get(item).added || false) === true;
        }));
        this.added$.next(added);
    }
    /**
     * @private
     * @param {?} collapsed
     * @return {?}
     */
    evaluateDisabled(collapsed) {
        /** @type {?} */
        let disabled = false;
        if (this.toggleCollapsed === false) {
            disabled = collapsed;
        }
        this.disabled$.next(disabled);
    }
}
CatalogBrowserGroupComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-catalog-browser-group',
                template: "<mat-list-item>\r\n  <mat-icon\r\n    mat-list-avatar\r\n    svgIcon=\"chevron-up\"\r\n    igoCollapse\r\n    class=\"igo-chevron\"\r\n    [target]=\"items\"\r\n    [collapsed]=\"collapsed\"\r\n    (toggle)=\"onToggleCollapsed($event)\">\r\n  </mat-icon>\r\n\r\n  <h4 matLine>{{title}}</h4>\r\n\r\n  <ng-container *ngIf=\"added$ | async; else notadded\">\r\n    <button\r\n      mat-icon-button\r\n      tooltip-position=\"below\"\r\n      matTooltipShowDelay=\"500\"\r\n      [matTooltip]=\"'igo.geo.catalog.group.removeFromMap' | translate\"\r\n      color=\"warn\"\r\n      [disabled]=\"disabled$ | async\"\r\n      (click)=\"onToggleClick()\">\r\n      <mat-icon svgIcon=\"delete\"></mat-icon>\r\n    </button>\r\n  </ng-container>\r\n\r\n  <ng-template #notadded>\r\n    <button\r\n      mat-icon-button\r\n      tooltip-position=\"below\"\r\n      matTooltipShowDelay=\"500\"\r\n      [matTooltip]=\"'igo.geo.catalog.group.addToMap' | translate\"\r\n      [disabled]=\"disabled$ | async\"\r\n      (click)=\"onToggleClick()\">\r\n      <mat-icon svgIcon=\"plus\"></mat-icon>\r\n    </button>\r\n  </ng-template>\r\n</mat-list-item>\r\n\r\n<div #items>\r\n  <ng-template ngFor let-item [ngForOf]=\"store.view.all$() | async\">\r\n    <ng-container *ngIf=\"isGroup(item)\"></ng-container>\r\n    <ng-container *ngIf=\"isLayer(item)\">\r\n      <igo-catalog-browser-layer\r\n        igoListItem\r\n        [layer]=\"item\"\r\n        [added]=\"state.get(item).added\"\r\n        [disabled]=\"state.get(item).added\"\r\n        (addedChange)=\"onLayerAddedChange($event)\">\r\n      </igo-catalog-browser-layer>\r\n    </ng-container>\r\n  </ng-template>\r\n</div>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];
CatalogBrowserGroupComponent.propDecorators = {
    catalog: [{ type: Input }],
    group: [{ type: Input }],
    collapsed: [{ type: Input }],
    toggleCollapsed: [{ type: Input }],
    state: [{ type: Input }],
    addedChange: [{ type: Output }],
    layerAddedChange: [{ type: Output }]
};
if (false) {
    /**
     * Group's items store
     * \@internal
     * @type {?}
     */
    CatalogBrowserGroupComponent.prototype.store;
    /**
     * Whether all the layers of the group are added
     * \@internal
     * @type {?}
     */
    CatalogBrowserGroupComponent.prototype.added$;
    /**
     * Whether the toggle button is disabled
     * \@internal
     * @type {?}
     */
    CatalogBrowserGroupComponent.prototype.disabled$;
    /**
     * Catalog
     * @type {?}
     */
    CatalogBrowserGroupComponent.prototype.catalog;
    /**
     * Catalog group
     * @type {?}
     */
    CatalogBrowserGroupComponent.prototype.group;
    /**
     * Whether the group is collapsed
     * @type {?}
     */
    CatalogBrowserGroupComponent.prototype.collapsed;
    /**
     * Whether the group can be toggled when it's collapsed
     * @type {?}
     */
    CatalogBrowserGroupComponent.prototype.toggleCollapsed;
    /**
     * Parent catalog's items store state. Groups share a unique
     * EntityState that tracks the group and it's layers state (whether they are added or not).
     * Sharing a unique state would also allow us to expand this component to allow
     * the selection of a layer while unselecting any layer already selected in another group.
     * This could be useful to display some layer info before adding it, for example.
     * @type {?}
     */
    CatalogBrowserGroupComponent.prototype.state;
    /**
     * Event emitted when the add/remove button of the group is clicked
     * @type {?}
     */
    CatalogBrowserGroupComponent.prototype.addedChange;
    /**
     * Event emitted when the add/remove button of a layer is clicked
     * @type {?}
     */
    CatalogBrowserGroupComponent.prototype.layerAddedChange;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0YWxvZy1icm93c2VyLWdyb3VwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9jYXRhbG9nL2NhdGFsb2ctYnJvd3Nlci9jYXRhbG9nLWJyb3dzZXItZ3JvdXAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxFQUNaLHVCQUF1QixFQUd4QixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRXZDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxXQUFXLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFFL0QsT0FBTyxFQU1MLGVBQWUsRUFDaEIsTUFBTSxXQUFXLENBQUM7Ozs7QUFVbkIsTUFBTSxPQUFPLDRCQUE0QjtJQUx6Qzs7Ozs7UUFXRSxVQUFLLEdBQUcsSUFBSSxXQUFXLENBQWdDLEVBQUUsQ0FBQyxDQUFDOzs7OztRQU0zRCxXQUFNLEdBQTZCLElBQUksZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDOzs7OztRQU05RCxjQUFTLEdBQTZCLElBQUksZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDOzs7O1FBZXhELGNBQVMsR0FBWSxJQUFJLENBQUM7Ozs7UUFLMUIsb0JBQWUsR0FBWSxJQUFJLENBQUM7Ozs7UUFjL0IsZ0JBQVcsR0FBRyxJQUFJLFlBQVksRUFHcEMsQ0FBQzs7OztRQUtLLHFCQUFnQixHQUFHLElBQUksWUFBWSxFQUd6QyxDQUFDO0lBOEhQLENBQUM7Ozs7O0lBekhDLElBQUksS0FBSztRQUNQLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7SUFDMUIsQ0FBQzs7Ozs7SUFLRCxRQUFRO1FBQ04sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNsQyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN0QyxJQUFJLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEtBQUssU0FBUyxFQUFFO1lBQzVELElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztnQkFDbkIsU0FBUyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYTtnQkFDckMsYUFBYTs7OztnQkFBRSxDQUFDLElBQWlCLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUE7YUFDakQsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDOzs7O0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDdkIsQ0FBQzs7Ozs7O0lBS0QsT0FBTyxDQUFDLElBQWlCO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDLElBQUksS0FBSyxlQUFlLENBQUMsS0FBSyxDQUFDO0lBQzdDLENBQUM7Ozs7OztJQUtELE9BQU8sQ0FBQyxJQUFpQjtRQUN2QixPQUFPLElBQUksQ0FBQyxJQUFJLEtBQUssZUFBZSxDQUFDLEtBQUssQ0FBQztJQUM3QyxDQUFDOzs7Ozs7SUFNRCxhQUFhO1FBQ1gsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ2pELENBQUM7Ozs7Ozs7SUFNRCxpQkFBaUIsQ0FBQyxTQUFrQjtRQUNsQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDbkMsQ0FBQzs7Ozs7Ozs7O0lBU0Qsa0JBQWtCLENBQUMsS0FBa0Q7UUFDbkUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNsQyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzdCLENBQUM7Ozs7OztJQUtPLEdBQUc7UUFDVCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN2QixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQztZQUNwQixLQUFLLEVBQUUsSUFBSTtZQUNYLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztTQUNsQixDQUFDLENBQUM7SUFDTCxDQUFDOzs7Ozs7SUFLTyxNQUFNO1FBQ1osSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDeEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUM7WUFDcEIsS0FBSyxFQUFFLEtBQUs7WUFDWixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7U0FDbEIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7Ozs7OztJQU1PLGNBQWMsQ0FBQyxLQUFrRDs7Y0FDakUsS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLOztjQUNuQixLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUs7O2NBRW5CLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUk7YUFDaEMsR0FBRyxFQUFFO2FBQ0wsTUFBTTs7OztRQUFDLENBQUMsSUFBaUIsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxLQUFLLENBQUMsRUFBRSxFQUFDO2FBQ25ELEdBQUc7Ozs7UUFBQyxDQUFDLElBQWlCLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssSUFBSSxLQUFLLEVBQUM7UUFFbEUsSUFBSSxXQUFXLENBQUMsS0FBSzs7OztRQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSyxLQUFLLEtBQUssRUFBQyxFQUFFO1lBQy9DLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDcEM7YUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxLQUFLLElBQUksRUFBRTtZQUNyQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUN6QjtJQUNILENBQUM7Ozs7O0lBRU8sYUFBYTs7Y0FDYixLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQyxLQUFLOzs7O1FBQUMsQ0FBQyxJQUFpQixFQUFFLEVBQUU7WUFDekQsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUMsS0FBSyxJQUFJLENBQUM7UUFDeEQsQ0FBQyxFQUFDO1FBQ0YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDMUIsQ0FBQzs7Ozs7O0lBRU8sZ0JBQWdCLENBQUMsU0FBa0I7O1lBQ3JDLFFBQVEsR0FBRyxLQUFLO1FBQ3BCLElBQUksSUFBSSxDQUFDLGVBQWUsS0FBSyxLQUFLLEVBQUU7WUFDbEMsUUFBUSxHQUFHLFNBQVMsQ0FBQztTQUN0QjtRQUNELElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ2hDLENBQUM7OztZQWpNRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLDJCQUEyQjtnQkFDckMsa3BEQUFxRDtnQkFDckQsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07YUFDaEQ7OztzQkF3QkUsS0FBSztvQkFLTCxLQUFLO3dCQUtMLEtBQUs7OEJBS0wsS0FBSztvQkFTTCxLQUFLOzBCQUtMLE1BQU07K0JBUU4sTUFBTTs7Ozs7Ozs7SUF0RFAsNkNBQTJEOzs7Ozs7SUFNM0QsOENBQThEOzs7Ozs7SUFNOUQsaURBQWlFOzs7OztJQUtqRSwrQ0FBMEI7Ozs7O0lBSzFCLDZDQUFpQzs7Ozs7SUFLakMsaURBQW1DOzs7OztJQUtuQyx1REFBeUM7Ozs7Ozs7OztJQVN6Qyw2Q0FBa0U7Ozs7O0lBS2xFLG1EQUdLOzs7OztJQUtMLHdEQUdLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgSW5wdXQsXHJcbiAgT3V0cHV0LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcclxuICBPbkluaXQsXHJcbiAgT25EZXN0cm95XHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7IEVudGl0eVN0YXRlTWFuYWdlciwgRW50aXR5U3RvcmUgfSBmcm9tICdAaWdvMi9jb21tb24nO1xyXG5cclxuaW1wb3J0IHtcclxuICBDYXRhbG9nLFxyXG4gIENhdGFsb2dJdGVtLFxyXG4gIENhdGFsb2dJdGVtR3JvdXAsXHJcbiAgQ2F0YWxvZ0l0ZW1MYXllcixcclxuICBDYXRhbG9nSXRlbVN0YXRlLFxyXG4gIENhdGFsb2dJdGVtVHlwZVxyXG59IGZyb20gJy4uL3NoYXJlZCc7XHJcblxyXG4vKipcclxuICogQ2F0YWxvZyBicm93c2VyIGdyb3VwIGl0ZW1cclxuICovXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaWdvLWNhdGFsb2ctYnJvd3Nlci1ncm91cCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2NhdGFsb2ctYnJvd3Nlci1ncm91cC5jb21wb25lbnQuaHRtbCcsXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIENhdGFsb2dCcm93c2VyR3JvdXBDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcblxyXG4gIC8qKlxyXG4gICAqIEdyb3VwJ3MgaXRlbXMgc3RvcmVcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBzdG9yZSA9IG5ldyBFbnRpdHlTdG9yZTxDYXRhbG9nSXRlbSwgQ2F0YWxvZ0l0ZW1TdGF0ZT4oW10pO1xyXG5cclxuICAvKipcclxuICAgKiBXaGV0aGVyIGFsbCB0aGUgbGF5ZXJzIG9mIHRoZSBncm91cCBhcmUgYWRkZWRcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBhZGRlZCQ6IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPiA9IG5ldyBCZWhhdmlvclN1YmplY3QoZmFsc2UpO1xyXG5cclxuICAvKipcclxuICAgKiBXaGV0aGVyIHRoZSB0b2dnbGUgYnV0dG9uIGlzIGRpc2FibGVkXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgZGlzYWJsZWQkOiBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KGZhbHNlKTtcclxuXHJcbiAgLyoqXHJcbiAgICogQ2F0YWxvZ1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGNhdGFsb2c6IENhdGFsb2c7XHJcblxyXG4gIC8qKlxyXG4gICAqIENhdGFsb2cgZ3JvdXBcclxuICAgKi9cclxuICBASW5wdXQoKSBncm91cDogQ2F0YWxvZ0l0ZW1Hcm91cDtcclxuXHJcbiAgLyoqXHJcbiAgICogV2hldGhlciB0aGUgZ3JvdXAgaXMgY29sbGFwc2VkXHJcbiAgICovXHJcbiAgQElucHV0KCkgY29sbGFwc2VkOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgLyoqXHJcbiAgICogV2hldGhlciB0aGUgZ3JvdXAgY2FuIGJlIHRvZ2dsZWQgd2hlbiBpdCdzIGNvbGxhcHNlZFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHRvZ2dsZUNvbGxhcHNlZDogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gIC8qKlxyXG4gICAqIFBhcmVudCBjYXRhbG9nJ3MgaXRlbXMgc3RvcmUgc3RhdGUuIEdyb3VwcyBzaGFyZSBhIHVuaXF1ZVxyXG4gICAqIEVudGl0eVN0YXRlIHRoYXQgdHJhY2tzIHRoZSBncm91cCBhbmQgaXQncyBsYXllcnMgc3RhdGUgKHdoZXRoZXIgdGhleSBhcmUgYWRkZWQgb3Igbm90KS5cclxuICAgKiBTaGFyaW5nIGEgdW5pcXVlIHN0YXRlIHdvdWxkIGFsc28gYWxsb3cgdXMgdG8gZXhwYW5kIHRoaXMgY29tcG9uZW50IHRvIGFsbG93XHJcbiAgICogdGhlIHNlbGVjdGlvbiBvZiBhIGxheWVyIHdoaWxlIHVuc2VsZWN0aW5nIGFueSBsYXllciBhbHJlYWR5IHNlbGVjdGVkIGluIGFub3RoZXIgZ3JvdXAuXHJcbiAgICogVGhpcyBjb3VsZCBiZSB1c2VmdWwgdG8gZGlzcGxheSBzb21lIGxheWVyIGluZm8gYmVmb3JlIGFkZGluZyBpdCwgZm9yIGV4YW1wbGUuXHJcbiAgICovXHJcbiAgQElucHV0KCkgc3RhdGU6IEVudGl0eVN0YXRlTWFuYWdlcjxDYXRhbG9nSXRlbSwgQ2F0YWxvZ0l0ZW1TdGF0ZT47XHJcblxyXG4gIC8qKlxyXG4gICAqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgYWRkL3JlbW92ZSBidXR0b24gb2YgdGhlIGdyb3VwIGlzIGNsaWNrZWRcclxuICAgKi9cclxuICBAT3V0cHV0KCkgYWRkZWRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPHtcclxuICAgIGFkZGVkOiBib29sZWFuO1xyXG4gICAgZ3JvdXA6IENhdGFsb2dJdGVtR3JvdXA7XHJcbiAgfT4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBhZGQvcmVtb3ZlIGJ1dHRvbiBvZiBhIGxheWVyIGlzIGNsaWNrZWRcclxuICAgKi9cclxuICBAT3V0cHV0KCkgbGF5ZXJBZGRlZENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8e1xyXG4gICAgYWRkZWQ6IGJvb2xlYW47XHJcbiAgICBsYXllcjogQ2F0YWxvZ0l0ZW1MYXllcjtcclxuICB9PigpO1xyXG5cclxuICAvKipcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBnZXQgdGl0bGUoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLmdyb3VwLnRpdGxlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLnN0b3JlLmxvYWQodGhpcy5ncm91cC5pdGVtcyk7XHJcbiAgICB0aGlzLmV2YWx1YXRlQWRkZWQoKTtcclxuICAgIHRoaXMuZXZhbHVhdGVEaXNhYmxlZCh0aGlzLmNvbGxhcHNlZCk7XHJcbiAgICBpZiAodGhpcy5jYXRhbG9nICYmIHRoaXMuY2F0YWxvZy5zb3J0RGlyZWN0aW9uICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5zdG9yZS52aWV3LnNvcnQoe1xyXG4gICAgICAgIGRpcmVjdGlvbjogdGhpcy5jYXRhbG9nLnNvcnREaXJlY3Rpb24sXHJcbiAgICAgICAgdmFsdWVBY2Nlc3NvcjogKGl0ZW06IENhdGFsb2dJdGVtKSA9PiBpdGVtLnRpdGxlXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLnN0b3JlLmRlc3Ryb3koKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIGlzR3JvdXAoaXRlbTogQ2F0YWxvZ0l0ZW0pOiBib29sZWFuIHtcclxuICAgIHJldHVybiBpdGVtLnR5cGUgPT09IENhdGFsb2dJdGVtVHlwZS5Hcm91cDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIGlzTGF5ZXIoaXRlbTogQ2F0YWxvZ0l0ZW0pOiBib29sZWFuIHtcclxuICAgIHJldHVybiBpdGVtLnR5cGUgPT09IENhdGFsb2dJdGVtVHlwZS5MYXllcjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE9uIHRvZ2dsZSBidXR0b24gY2xpY2ssIGVtaXQgdGhlIGFkZGVkIGNoYW5nZSBldmVudFxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIG9uVG9nZ2xlQ2xpY2soKSB7XHJcbiAgICB0aGlzLmFkZGVkJC52YWx1ZSA/IHRoaXMucmVtb3ZlKCkgOiB0aGlzLmFkZCgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogT24gdG9nZ2xlIGJ1dHRvbiBjbGljaywgZW1pdCB0aGUgYWRkZWQgY2hhbmdlIGV2ZW50XHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgb25Ub2dnbGVDb2xsYXBzZWQoY29sbGFwc2VkOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLmV2YWx1YXRlRGlzYWJsZWQoY29sbGFwc2VkKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZW4gYSBsYXllciBpcyBhZGRlZCBvciByZW1vdmVkLCBldmFsdWF0ZSBpZiBhbGwgdGhlIGxheWVycyBvZiB0aGUgZ3JvdXBcclxuICAgKiBhcmUgbm93IGFkZGVkIG9yIHJlbW92ZWQuIElmIHNvLCBjb25zaWRlciB0aGF0IHRoZSBncm91cCBpdHNlbGYgaXMgYWRkZWRcclxuICAgKiBvciByZW1vdmVkLlxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqIEBwYXJhbSBldmVudCBMYXllciBhZGRlZCBjaGFuZ2UgZXZlbnRcclxuICAgKi9cclxuICBvbkxheWVyQWRkZWRDaGFuZ2UoZXZlbnQ6IHsgYWRkZWQ6IGJvb2xlYW47IGxheWVyOiBDYXRhbG9nSXRlbUxheWVyIH0pIHtcclxuICAgIHRoaXMubGF5ZXJBZGRlZENoYW5nZS5lbWl0KGV2ZW50KTtcclxuICAgIHRoaXMudHJ5VG9nZ2xlR3JvdXAoZXZlbnQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRW1pdCBhZGRlZCBjaGFuZ2UgZXZlbnQgd2l0aCBhZGRlZCA9IHRydWVcclxuICAgKi9cclxuICBwcml2YXRlIGFkZCgpIHtcclxuICAgIHRoaXMuYWRkZWQkLm5leHQodHJ1ZSk7XHJcbiAgICB0aGlzLmFkZGVkQ2hhbmdlLmVtaXQoe1xyXG4gICAgICBhZGRlZDogdHJ1ZSxcclxuICAgICAgZ3JvdXA6IHRoaXMuZ3JvdXBcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRW1pdCBhZGRlZCBjaGFuZ2UgZXZlbnQgd2l0aCBhZGRlZCA9IHRydWVcclxuICAgKi9cclxuICBwcml2YXRlIHJlbW92ZSgpIHtcclxuICAgIHRoaXMuYWRkZWQkLm5leHQoZmFsc2UpO1xyXG4gICAgdGhpcy5hZGRlZENoYW5nZS5lbWl0KHtcclxuICAgICAgYWRkZWQ6IGZhbHNlLFxyXG4gICAgICBncm91cDogdGhpcy5ncm91cFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBJZiBhbGwgdGhlIGxheWVycyBvZiB0aGUgZ3JvdXAgYWRkZWQgb3IgcmVtb3ZlZCwgYWRkIG9yIHJlbW92ZSB0aGUgZ3JvdXAgaXRzZWxmLlxyXG4gICAqIEBwYXJhbSBldmVudCBUaGUgbGFzdCBsYXllciBhZGRlZCBjaGFuZ2UgZXZlbnQgdG8gb2NjdXJcclxuICAgKi9cclxuICBwcml2YXRlIHRyeVRvZ2dsZUdyb3VwKGV2ZW50OiB7IGFkZGVkOiBib29sZWFuOyBsYXllcjogQ2F0YWxvZ0l0ZW1MYXllciB9KSB7XHJcbiAgICBjb25zdCBhZGRlZCA9IGV2ZW50LmFkZGVkO1xyXG4gICAgY29uc3QgbGF5ZXIgPSBldmVudC5sYXllcjtcclxuXHJcbiAgICBjb25zdCBsYXllcnNBZGRlZCA9IHRoaXMuc3RvcmUudmlld1xyXG4gICAgICAuYWxsKClcclxuICAgICAgLmZpbHRlcigoaXRlbTogQ2F0YWxvZ0l0ZW0pID0+IGl0ZW0uaWQgIT09IGxheWVyLmlkKVxyXG4gICAgICAubWFwKChpdGVtOiBDYXRhbG9nSXRlbSkgPT4gdGhpcy5zdGF0ZS5nZXQoaXRlbSkuYWRkZWQgfHwgZmFsc2UpO1xyXG5cclxuICAgIGlmIChsYXllcnNBZGRlZC5ldmVyeSh2YWx1ZSA9PiB2YWx1ZSA9PT0gYWRkZWQpKSB7XHJcbiAgICAgIGFkZGVkID8gdGhpcy5hZGQoKSA6IHRoaXMucmVtb3ZlKCk7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuYWRkZWQkLnZhbHVlID09PSB0cnVlKSB7XHJcbiAgICAgIHRoaXMuYWRkZWQkLm5leHQoZmFsc2UpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBldmFsdWF0ZUFkZGVkKCkge1xyXG4gICAgY29uc3QgYWRkZWQgPSB0aGlzLnN0b3JlLmFsbCgpLmV2ZXJ5KChpdGVtOiBDYXRhbG9nSXRlbSkgPT4ge1xyXG4gICAgICByZXR1cm4gKHRoaXMuc3RhdGUuZ2V0KGl0ZW0pLmFkZGVkIHx8IGZhbHNlKSA9PT0gdHJ1ZTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5hZGRlZCQubmV4dChhZGRlZCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGV2YWx1YXRlRGlzYWJsZWQoY29sbGFwc2VkOiBib29sZWFuKSB7XHJcbiAgICBsZXQgZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgIGlmICh0aGlzLnRvZ2dsZUNvbGxhcHNlZCA9PT0gZmFsc2UpIHtcclxuICAgICAgZGlzYWJsZWQgPSBjb2xsYXBzZWQ7XHJcbiAgICB9XHJcbiAgICB0aGlzLmRpc2FibGVkJC5uZXh0KGRpc2FibGVkKTtcclxuICB9XHJcbn1cclxuIl19
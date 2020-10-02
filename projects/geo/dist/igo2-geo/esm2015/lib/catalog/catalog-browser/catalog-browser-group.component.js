/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EntityStateManager, EntityStore } from '@igo2/common';
import { Catalog, CatalogItemType } from '../shared';
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
        this.preview$ = new BehaviorSubject(false);
        /**
         * Whether the toggle button is disabled
         * \@internal
         */
        this.disabled$ = new BehaviorSubject(false);
        /**
         * Whether the group is collapsed
         */
        this.collapsed = true;
        this.catalogAllowLegend = false;
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
     * @param {?} event
     * @return {?}
     */
    onLayerPreview(event) {
        this.preview$.next(event);
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
    /**
     * @return {?}
     */
    onTitleClick() {
        this.collapsed = !this.collapsed;
    }
}
CatalogBrowserGroupComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-catalog-browser-group',
                template: "<mat-list-item>\r\n  <mat-icon\r\n    mat-list-avatar\r\n    svgIcon=\"chevron-up\"\r\n    igoCollapse\r\n    class=\"igo-chevron\"\r\n    [target]=\"items\"\r\n    [collapsed]=\"collapsed\"\r\n    (toggle)=\"onToggleCollapsed($event)\">\r\n  </mat-icon>\r\n\r\n  <h4 class=\"igo-catalog-group-title\" id=\"catalog-group-title\" mat-line matTooltipShowDelay=\"500\" [matTooltip]=\"title\" (click)=\"onTitleClick()\">{{title}}</h4>\r\n  <ng-container *ngIf=\"(added$ | async) && !(preview$ | async); else notadded\">\r\n    <button\r\n      mat-icon-button\r\n      tooltip-position=\"below\"\r\n      matTooltipShowDelay=\"500\"\r\n      [matTooltip]=\"'igo.geo.catalog.group.removeFromMap' | translate\"\r\n      color=\"warn\"\r\n      [disabled]=\"disabled$ | async\"\r\n      (click)=\"onToggleClick()\">\r\n      <mat-icon svgIcon=\"delete\"></mat-icon>\r\n    </button>\r\n  </ng-container>\r\n\r\n  <ng-template #notadded>\r\n    <button\r\n      mat-icon-button\r\n      tooltip-position=\"below\"\r\n      matTooltipShowDelay=\"500\"\r\n      [matTooltip]=\"'igo.geo.catalog.group.addToMap' | translate\"\r\n      [disabled]=\"disabled$ | async\"\r\n      (click)=\"onToggleClick()\">\r\n      <mat-icon svgIcon=\"plus\"></mat-icon>\r\n    </button>\r\n  </ng-template>\r\n</mat-list-item>\r\n\r\n<div #items>\r\n  <ng-template ngFor let-item [ngForOf]=\"store.view.all$() | async\">\r\n    <ng-container *ngIf=\"isGroup(item)\">\r\n      <!-- todo: add display ans manage CatalogItemGroup -->\r\n    </ng-container>\r\n    <ng-container *ngIf=\"isLayer(item)\">\r\n      <igo-catalog-browser-layer\r\n        igoListItem\r\n        [layer]=\"item\"\r\n        [resolution]=\"resolution\"\r\n        [catalogAllowLegend]=\"catalogAllowLegend\"\r\n        [added]=\"state.get(item).added\"\r\n        (addedLayerIsPreview)=\"onLayerPreview($event)\"\r\n        (addedChange)=\"onLayerAddedChange($event)\">\r\n      </igo-catalog-browser-layer>\r\n    </ng-container>\r\n  </ng-template>\r\n</div>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".igo-catalog-group-title{cursor:pointer;opacity:.9}#catalog-group-title{font-weight:700}"]
            }] }
];
CatalogBrowserGroupComponent.propDecorators = {
    catalog: [{ type: Input }],
    group: [{ type: Input }],
    collapsed: [{ type: Input }],
    resolution: [{ type: Input }],
    catalogAllowLegend: [{ type: Input }],
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
    /** @type {?} */
    CatalogBrowserGroupComponent.prototype.preview$;
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
    /** @type {?} */
    CatalogBrowserGroupComponent.prototype.resolution;
    /** @type {?} */
    CatalogBrowserGroupComponent.prototype.catalogAllowLegend;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0YWxvZy1icm93c2VyLWdyb3VwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9jYXRhbG9nL2NhdGFsb2ctYnJvd3Nlci9jYXRhbG9nLWJyb3dzZXItZ3JvdXAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxFQUNaLHVCQUF1QixFQUd4QixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRXZDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxXQUFXLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFFL0QsT0FBTyxFQUNMLE9BQU8sRUFLUCxlQUFlLEVBQ2hCLE1BQU0sV0FBVyxDQUFDOzs7O0FBV25CLE1BQU0sT0FBTyw0QkFBNEI7SUFOekM7Ozs7O1FBWUUsVUFBSyxHQUFHLElBQUksV0FBVyxDQUFnQyxFQUFFLENBQUMsQ0FBQzs7Ozs7UUFNM0QsV0FBTSxHQUE2QixJQUFJLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM5RCxhQUFRLEdBQTZCLElBQUksZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDOzs7OztRQUtoRSxjQUFTLEdBQTZCLElBQUksZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDOzs7O1FBZXhELGNBQVMsR0FBWSxJQUFJLENBQUM7UUFJMUIsdUJBQWtCLEdBQUcsS0FBSyxDQUFDOzs7O1FBSzNCLG9CQUFlLEdBQVksSUFBSSxDQUFDOzs7O1FBYy9CLGdCQUFXLEdBQUcsSUFBSSxZQUFZLEVBR3BDLENBQUM7Ozs7UUFLSyxxQkFBZ0IsR0FBRyxJQUFJLFlBQVksRUFHekMsQ0FBQztJQXNJUCxDQUFDOzs7OztJQWpJQyxJQUFJLEtBQUs7UUFDUCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO0lBQzFCLENB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LENBQUMsTUFBTTs7YUFDaEQ7OztzQkF3QkUsS0FBSztvQkFLTCxLQUFLO3dCQUtMLEtBQUs7eUJBRUwsS0FBSztpQ0FFTCxLQUFLOzhCQUtMLEtBQUs7b0JBU0wsS0FBSzswQkFLTCxNQUFNOytCQVFOLE1BQU07Ozs7Ozs7O0lBMURQLDZDQUEyRDs7Ozs7O0lBTTNELDhDQUE4RDs7SUFDOUQsZ0RBQWdFOzs7Ozs7SUFLaEUsaURBQWlFOzs7OztJQUtqRSwrQ0FBMEI7Ozs7O0lBSzFCLDZDQUFpQzs7Ozs7SUFLakMsaURBQW1DOztJQUVuQyxrREFBNEI7O0lBRTVCLDBEQUFvQzs7Ozs7SUFLcEMsdURBQXlDOzs7Ozs7Ozs7SUFTekMsNkNBQWtFOzs7OztJQUtsRSxtREFHSzs7Ozs7SUFLTCx3REFHSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIElucHV0LFxyXG4gIE91dHB1dCxcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbiAgT25Jbml0LFxyXG4gIE9uRGVzdHJveVxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQgeyBFbnRpdHlTdGF0ZU1hbmFnZXIsIEVudGl0eVN0b3JlIH0gZnJvbSAnQGlnbzIvY29tbW9uJztcclxuXHJcbmltcG9ydCB7XHJcbiAgQ2F0YWxvZyxcclxuICBDYXRhbG9nSXRlbSxcclxuICBDYXRhbG9nSXRlbUdyb3VwLFxyXG4gIENhdGFsb2dJdGVtTGF5ZXIsXHJcbiAgQ2F0YWxvZ0l0ZW1TdGF0ZSxcclxuICBDYXRhbG9nSXRlbVR5cGVcclxufSBmcm9tICcuLi9zaGFyZWQnO1xyXG5cclxuLyoqXHJcbiAqIENhdGFsb2cgYnJvd3NlciBncm91cCBpdGVtXHJcbiAqL1xyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2lnby1jYXRhbG9nLWJyb3dzZXItZ3JvdXAnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9jYXRhbG9nLWJyb3dzZXItZ3JvdXAuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2NhdGFsb2ctYnJvd3Nlci1ncm91cC5jb21wb25lbnQuc2NzcyddLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDYXRhbG9nQnJvd3Nlckdyb3VwQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG5cclxuICAvKipcclxuICAgKiBHcm91cCdzIGl0ZW1zIHN0b3JlXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgc3RvcmUgPSBuZXcgRW50aXR5U3RvcmU8Q2F0YWxvZ0l0ZW0sIENhdGFsb2dJdGVtU3RhdGU+KFtdKTtcclxuXHJcbiAgLyoqXHJcbiAgICogV2hldGhlciBhbGwgdGhlIGxheWVycyBvZiB0aGUgZ3JvdXAgYXJlIGFkZGVkXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgYWRkZWQkOiBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KGZhbHNlKTtcclxuICBwcmV2aWV3JDogQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IEJlaGF2aW9yU3ViamVjdChmYWxzZSk7XHJcbiAgLyoqXHJcbiAgICogV2hldGhlciB0aGUgdG9nZ2xlIGJ1dHRvbiBpcyBkaXNhYmxlZFxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIGRpc2FibGVkJDogQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IEJlaGF2aW9yU3ViamVjdChmYWxzZSk7XHJcblxyXG4gIC8qKlxyXG4gICAqIENhdGFsb2dcclxuICAgKi9cclxuICBASW5wdXQoKSBjYXRhbG9nOiBDYXRhbG9nO1xyXG5cclxuICAvKipcclxuICAgKiBDYXRhbG9nIGdyb3VwXHJcbiAgICovXHJcbiAgQElucHV0KCkgZ3JvdXA6IENhdGFsb2dJdGVtR3JvdXA7XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZXRoZXIgdGhlIGdyb3VwIGlzIGNvbGxhcHNlZFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGNvbGxhcHNlZDogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gIEBJbnB1dCgpIHJlc29sdXRpb246IG51bWJlcjtcclxuXHJcbiAgQElucHV0KCkgY2F0YWxvZ0FsbG93TGVnZW5kID0gZmFsc2U7XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZXRoZXIgdGhlIGdyb3VwIGNhbiBiZSB0b2dnbGVkIHdoZW4gaXQncyBjb2xsYXBzZWRcclxuICAgKi9cclxuICBASW5wdXQoKSB0b2dnbGVDb2xsYXBzZWQ6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICAvKipcclxuICAgKiBQYXJlbnQgY2F0YWxvZydzIGl0ZW1zIHN0b3JlIHN0YXRlLiBHcm91cHMgc2hhcmUgYSB1bmlxdWVcclxuICAgKiBFbnRpdHlTdGF0ZSB0aGF0IHRyYWNrcyB0aGUgZ3JvdXAgYW5kIGl0J3MgbGF5ZXJzIHN0YXRlICh3aGV0aGVyIHRoZXkgYXJlIGFkZGVkIG9yIG5vdCkuXHJcbiAgICogU2hhcmluZyBhIHVuaXF1ZSBzdGF0ZSB3b3VsZCBhbHNvIGFsbG93IHVzIHRvIGV4cGFuZCB0aGlzIGNvbXBvbmVudCB0byBhbGxvd1xyXG4gICAqIHRoZSBzZWxlY3Rpb24gb2YgYSBsYXllciB3aGlsZSB1bnNlbGVjdGluZyBhbnkgbGF5ZXIgYWxyZWFkeSBzZWxlY3RlZCBpbiBhbm90aGVyIGdyb3VwLlxyXG4gICAqIFRoaXMgY291bGQgYmUgdXNlZnVsIHRvIGRpc3BsYXkgc29tZSBsYXllciBpbmZvIGJlZm9yZSBhZGRpbmcgaXQsIGZvciBleGFtcGxlLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHN0YXRlOiBFbnRpdHlTdGF0ZU1hbmFnZXI8Q2F0YWxvZ0l0ZW0sIENhdGFsb2dJdGVtU3RhdGU+O1xyXG5cclxuICAvKipcclxuICAgKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIGFkZC9yZW1vdmUgYnV0dG9uIG9mIHRoZSBncm91cCBpcyBjbGlja2VkXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIGFkZGVkQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjx7XHJcbiAgICBhZGRlZDogYm9vbGVhbjtcclxuICAgIGdyb3VwOiBDYXRhbG9nSXRlbUdyb3VwO1xyXG4gIH0+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgYWRkL3JlbW92ZSBidXR0b24gb2YgYSBsYXllciBpcyBjbGlja2VkXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIGxheWVyQWRkZWRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPHtcclxuICAgIGFkZGVkOiBib29sZWFuO1xyXG4gICAgbGF5ZXI6IENhdGFsb2dJdGVtTGF5ZXI7XHJcbiAgfT4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgZ2V0IHRpdGxlKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5ncm91cC50aXRsZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5zdG9yZS5sb2FkKHRoaXMuZ3JvdXAuaXRlbXMpO1xyXG4gICAgdGhpcy5ldmFsdWF0ZUFkZGVkKCk7XHJcbiAgICB0aGlzLmV2YWx1YXRlRGlzYWJsZWQodGhpcy5jb2xsYXBzZWQpO1xyXG4gICAgaWYgKHRoaXMuY2F0YWxvZyAmJiB0aGlzLmNhdGFsb2cuc29ydERpcmVjdGlvbiAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMuc3RvcmUudmlldy5zb3J0KHtcclxuICAgICAgICBkaXJlY3Rpb246IHRoaXMuY2F0YWxvZy5zb3J0RGlyZWN0aW9uLFxyXG4gICAgICAgIHZhbHVlQWNjZXNzb3I6IChpdGVtOiBDYXRhbG9nSXRlbSkgPT4gaXRlbS50aXRsZVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgdGhpcy5zdG9yZS5kZXN0cm95KCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBpc0dyb3VwKGl0ZW06IENhdGFsb2dJdGVtKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gaXRlbS50eXBlID09PSBDYXRhbG9nSXRlbVR5cGUuR3JvdXA7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBpc0xheWVyKGl0ZW06IENhdGFsb2dJdGVtKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gaXRlbS50eXBlID09PSBDYXRhbG9nSXRlbVR5cGUuTGF5ZXI7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBPbiB0b2dnbGUgYnV0dG9uIGNsaWNrLCBlbWl0IHRoZSBhZGRlZCBjaGFuZ2UgZXZlbnRcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBvblRvZ2dsZUNsaWNrKCkge1xyXG4gICAgdGhpcy5hZGRlZCQudmFsdWUgPyB0aGlzLnJlbW92ZSgpIDogdGhpcy5hZGQoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE9uIHRvZ2dsZSBidXR0b24gY2xpY2ssIGVtaXQgdGhlIGFkZGVkIGNoYW5nZSBldmVudFxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIG9uVG9nZ2xlQ29sbGFwc2VkKGNvbGxhcHNlZDogYm9vbGVhbikge1xyXG4gICAgdGhpcy5ldmFsdWF0ZURpc2FibGVkKGNvbGxhcHNlZCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBXaGVuIGEgbGF5ZXIgaXMgYWRkZWQgb3IgcmVtb3ZlZCwgZXZhbHVhdGUgaWYgYWxsIHRoZSBsYXllcnMgb2YgdGhlIGdyb3VwXHJcbiAgICogYXJlIG5vdyBhZGRlZCBvciByZW1vdmVkLiBJZiBzbywgY29uc2lkZXIgdGhhdCB0aGUgZ3JvdXAgaXRzZWxmIGlzIGFkZGVkXHJcbiAgICogb3IgcmVtb3ZlZC5cclxuICAgKiBAaW50ZXJuYWxcclxuICAgKiBAcGFyYW0gZXZlbnQgTGF5ZXIgYWRkZWQgY2hhbmdlIGV2ZW50XHJcbiAgICovXHJcbiAgb25MYXllckFkZGVkQ2hhbmdlKGV2ZW50OiB7IGFkZGVkOiBib29sZWFuOyBsYXllcjogQ2F0YWxvZ0l0ZW1MYXllciB9KSB7XHJcbiAgICB0aGlzLmxheWVyQWRkZWRDaGFuZ2UuZW1pdChldmVudCk7XHJcbiAgICB0aGlzLnRyeVRvZ2dsZUdyb3VwKGV2ZW50KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEVtaXQgYWRkZWQgY2hhbmdlIGV2ZW50IHdpdGggYWRkZWQgPSB0cnVlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBhZGQoKSB7XHJcbiAgICB0aGlzLmFkZGVkJC5uZXh0KHRydWUpO1xyXG4gICAgdGhpcy5hZGRlZENoYW5nZS5lbWl0KHtcclxuICAgICAgYWRkZWQ6IHRydWUsXHJcbiAgICAgIGdyb3VwOiB0aGlzLmdyb3VwXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEVtaXQgYWRkZWQgY2hhbmdlIGV2ZW50IHdpdGggYWRkZWQgPSB0cnVlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSByZW1vdmUoKSB7XHJcbiAgICB0aGlzLmFkZGVkJC5uZXh0KGZhbHNlKTtcclxuICAgIHRoaXMuYWRkZWRDaGFuZ2UuZW1pdCh7XHJcbiAgICAgIGFkZGVkOiBmYWxzZSxcclxuICAgICAgZ3JvdXA6IHRoaXMuZ3JvdXBcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgb25MYXllclByZXZpZXcoZXZlbnQpIHtcclxuICAgIHRoaXMucHJldmlldyQubmV4dChldmVudCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBJZiBhbGwgdGhlIGxheWVycyBvZiB0aGUgZ3JvdXAgYWRkZWQgb3IgcmVtb3ZlZCwgYWRkIG9yIHJlbW92ZSB0aGUgZ3JvdXAgaXRzZWxmLlxyXG4gICAqIEBwYXJhbSBldmVudCBUaGUgbGFzdCBsYXllciBhZGRlZCBjaGFuZ2UgZXZlbnQgdG8gb2NjdXJcclxuICAgKi9cclxuICBwcml2YXRlIHRyeVRvZ2dsZUdyb3VwKGV2ZW50OiB7IGFkZGVkOiBib29sZWFuOyBsYXllcjogQ2F0YWxvZ0l0ZW1MYXllciB9KSB7XHJcbiAgICBjb25zdCBhZGRlZCA9IGV2ZW50LmFkZGVkO1xyXG4gICAgY29uc3QgbGF5ZXIgPSBldmVudC5sYXllcjtcclxuXHJcbiAgICBjb25zdCBsYXllcnNBZGRlZCA9IHRoaXMuc3RvcmUudmlld1xyXG4gICAgICAuYWxsKClcclxuICAgICAgLmZpbHRlcigoaXRlbTogQ2F0YWxvZ0l0ZW0pID0+IGl0ZW0uaWQgIT09IGxheWVyLmlkKVxyXG4gICAgICAubWFwKChpdGVtOiBDYXRhbG9nSXRlbSkgPT4gdGhpcy5zdGF0ZS5nZXQoaXRlbSkuYWRkZWQgfHwgZmFsc2UpO1xyXG5cclxuICAgIGlmIChsYXllcnNBZGRlZC5ldmVyeSh2YWx1ZSA9PiB2YWx1ZSA9PT0gYWRkZWQpKSB7XHJcbiAgICAgIGFkZGVkID8gdGhpcy5hZGQoKSA6IHRoaXMucmVtb3ZlKCk7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuYWRkZWQkLnZhbHVlID09PSB0cnVlKSB7XHJcbiAgICAgIHRoaXMuYWRkZWQkLm5leHQoZmFsc2UpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBldmFsdWF0ZUFkZGVkKCkge1xyXG4gICAgY29uc3QgYWRkZWQgPSB0aGlzLnN0b3JlLmFsbCgpLmV2ZXJ5KChpdGVtOiBDYXRhbG9nSXRlbSkgPT4ge1xyXG4gICAgICByZXR1cm4gKHRoaXMuc3RhdGUuZ2V0KGl0ZW0pLmFkZGVkIHx8IGZhbHNlKSA9PT0gdHJ1ZTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5hZGRlZCQubmV4dChhZGRlZCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGV2YWx1YXRlRGlzYWJsZWQoY29sbGFwc2VkOiBib29sZWFuKSB7XHJcbiAgICBsZXQgZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgIGlmICh0aGlzLnRvZ2dsZUNvbGxhcHNlZCA9PT0gZmFsc2UpIHtcclxuICAgICAgZGlzYWJsZWQgPSBjb2xsYXBzZWQ7XHJcbiAgICB9XHJcbiAgICB0aGlzLmRpc2FibGVkJC5uZXh0KGRpc2FibGVkKTtcclxuICB9XHJcblxyXG4gIG9uVGl0bGVDbGljaygpIHtcclxuICAgIHRoaXMuY29sbGFwc2VkID0gIXRoaXMuY29sbGFwc2VkO1xyXG4gIH1cclxufVxyXG4iXX0=
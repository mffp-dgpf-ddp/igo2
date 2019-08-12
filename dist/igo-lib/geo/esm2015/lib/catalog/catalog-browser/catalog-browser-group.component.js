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
}
CatalogBrowserGroupComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-catalog-browser-group',
                template: "<mat-list-item>\r\n  <mat-icon\r\n    mat-list-avatar\r\n    igoCollapse\r\n    class=\"igo-chevron\"\r\n    [target]=\"items\"\r\n    [collapsed]=\"true\"\r\n    svgIcon=\"chevron-up\">\r\n  </mat-icon>\r\n\r\n  <h4 matLine>{{title}}</h4>\r\n\r\n  <ng-container *ngIf=\"added$ | async; else notadded\">\r\n    <button\r\n      mat-icon-button\r\n      tooltip-position=\"below\"\r\n      matTooltipShowDelay=\"500\"\r\n      [matTooltip]=\"'igo.geo.catalog.group.removeFromMap' | translate\"\r\n      color=\"warn\"\r\n      (click)=\"onToggleClick()\">\r\n      <mat-icon svgIcon=\"delete\"></mat-icon>\r\n    </button>\r\n  </ng-container>\r\n\r\n  <ng-template #notadded>\r\n    <button\r\n      mat-icon-button\r\n      tooltip-position=\"below\"\r\n      matTooltipShowDelay=\"500\"\r\n      [matTooltip]=\"'igo.geo.catalog.group.addToMap' | translate\"\r\n      (click)=\"onToggleClick()\">\r\n      <mat-icon svgIcon=\"plus\"></mat-icon>\r\n    </button>\r\n  </ng-template>\r\n</mat-list-item>\r\n\r\n<div #items>\r\n  <ng-template ngFor let-item [ngForOf]=\"store.view.all$() | async\">\r\n    <ng-container *ngIf=\"isGroup(item)\"></ng-container>\r\n    <ng-container *ngIf=\"isLayer(item)\">\r\n      <igo-catalog-browser-layer\r\n        igoListItem\r\n        [layer]=\"item\"\r\n        [added]=\"state.get(item).added\"\r\n        [disabled]=\"state.get(item).added\"\r\n        (addedChange)=\"onLayerAddedChange($event)\">\r\n      </igo-catalog-browser-layer>\r\n    </ng-container>\r\n  </ng-template>\r\n</div>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];
CatalogBrowserGroupComponent.propDecorators = {
    catalog: [{ type: Input }],
    group: [{ type: Input }],
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0YWxvZy1icm93c2VyLWdyb3VwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9jYXRhbG9nL2NhdGFsb2ctYnJvd3Nlci9jYXRhbG9nLWJyb3dzZXItZ3JvdXAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxFQUNaLHVCQUF1QixFQUd4QixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRXZDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxXQUFXLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFFL0QsT0FBTyxFQU1MLGVBQWUsRUFDaEIsTUFBTSxXQUFXLENBQUM7Ozs7QUFVbkIsTUFBTSxPQUFPLDRCQUE0QjtJQUx6Qzs7Ozs7UUFVRSxVQUFLLEdBQUcsSUFBSSxXQUFXLENBQWdDLEVBQUUsQ0FBQyxDQUFDOzs7OztRQU0zRCxXQUFNLEdBQTZCLElBQUksZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDOzs7O1FBd0JwRCxnQkFBVyxHQUFHLElBQUksWUFBWSxFQUdwQyxDQUFDOzs7O1FBS0sscUJBQWdCLEdBQUcsSUFBSSxZQUFZLEVBR3pDLENBQUM7SUE2R1AsQ0FBQzs7Ozs7SUF4R0MsSUFBSSxLQUFLO1FBQ1AsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQztJQUMxQixDQUFDOzs7OztJQUtELFFBQVE7UUFDTixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUNyQixJQUFJLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEtBQUssU0FBUyxFQUFFO1lBQzVE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S0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLEtBQUssSUFBSSxDQUFDO1FBQ3hELENBQUMsRUFBQztRQUNGLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzFCLENBQUM7OztZQS9KRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLDJCQUEyQjtnQkFDckMsMmdEQUFxRDtnQkFDckQsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07YUFDaEQ7OztzQkFpQkUsS0FBSztvQkFLTCxLQUFLO29CQVNMLEtBQUs7MEJBS0wsTUFBTTsrQkFRTixNQUFNOzs7Ozs7OztJQXRDUCw2Q0FBMkQ7Ozs7OztJQU0zRCw4Q0FBOEQ7Ozs7O0lBSzlELCtDQUEwQjs7Ozs7SUFLMUIsNkNBQWlDOzs7Ozs7Ozs7SUFTakMsNkNBQWtFOzs7OztJQUtsRSxtREFHSzs7Ozs7SUFLTCx3REFHSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIElucHV0LFxyXG4gIE91dHB1dCxcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbiAgT25Jbml0LFxyXG4gIE9uRGVzdHJveVxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQgeyBFbnRpdHlTdGF0ZU1hbmFnZXIsIEVudGl0eVN0b3JlIH0gZnJvbSAnQGlnbzIvY29tbW9uJztcclxuXHJcbmltcG9ydCB7XHJcbiAgQ2F0YWxvZyxcclxuICBDYXRhbG9nSXRlbSxcclxuICBDYXRhbG9nSXRlbUdyb3VwLFxyXG4gIENhdGFsb2dJdGVtTGF5ZXIsXHJcbiAgQ2F0YWxvZ0l0ZW1TdGF0ZSxcclxuICBDYXRhbG9nSXRlbVR5cGVcclxufSBmcm9tICcuLi9zaGFyZWQnO1xyXG5cclxuLyoqXHJcbiAqIENhdGFsb2cgYnJvd3NlciBncm91cCBpdGVtXHJcbiAqL1xyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2lnby1jYXRhbG9nLWJyb3dzZXItZ3JvdXAnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9jYXRhbG9nLWJyb3dzZXItZ3JvdXAuY29tcG9uZW50Lmh0bWwnLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDYXRhbG9nQnJvd3Nlckdyb3VwQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG4gIC8qKlxyXG4gICAqIEdyb3VwJ3MgaXRlbXMgc3RvcmVcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBzdG9yZSA9IG5ldyBFbnRpdHlTdG9yZTxDYXRhbG9nSXRlbSwgQ2F0YWxvZ0l0ZW1TdGF0ZT4oW10pO1xyXG5cclxuICAvKipcclxuICAgKiBXaGV0aGVyIGFsbCB0aGUgbGF5ZXJzIG9mIHRoZSBncm91cCBhcmUgYWRkZWRcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBhZGRlZCQ6IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPiA9IG5ldyBCZWhhdmlvclN1YmplY3QoZmFsc2UpO1xyXG5cclxuICAvKipcclxuICAgKiBDYXRhbG9nXHJcbiAgICovXHJcbiAgQElucHV0KCkgY2F0YWxvZzogQ2F0YWxvZztcclxuXHJcbiAgLyoqXHJcbiAgICogQ2F0YWxvZyBncm91cFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGdyb3VwOiBDYXRhbG9nSXRlbUdyb3VwO1xyXG5cclxuICAvKipcclxuICAgKiBQYXJlbnQgY2F0YWxvZydzIGl0ZW1zIHN0b3JlIHN0YXRlLiBHcm91cHMgc2hhcmUgYSB1bmlxdWVcclxuICAgKiBFbnRpdHlTdGF0ZSB0aGF0IHRyYWNrcyB0aGUgZ3JvdXAgYW5kIGl0J3MgbGF5ZXJzIHN0YXRlICh3aGV0aGVyIHRoZXkgYXJlIGFkZGVkIG9yIG5vdCkuXHJcbiAgICogU2hhcmluZyBhIHVuaXF1ZSBzdGF0ZSB3b3VsZCBhbHNvIGFsbG93IHVzIHRvIGV4cGFuZCB0aGlzIGNvbXBvbmVudCB0byBhbGxvd1xyXG4gICAqIHRoZSBzZWxlY3Rpb24gb2YgYSBsYXllciB3aGlsZSB1bnNlbGVjdGluZyBhbnkgbGF5ZXIgYWxyZWFkeSBzZWxlY3RlZCBpbiBhbm90aGVyIGdyb3VwLlxyXG4gICAqIFRoaXMgY291bGQgYmUgdXNlZnVsIHRvIGRpc3BsYXkgc29tZSBsYXllciBpbmZvIGJlZm9yZSBhZGRpbmcgaXQsIGZvciBleGFtcGxlLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHN0YXRlOiBFbnRpdHlTdGF0ZU1hbmFnZXI8Q2F0YWxvZ0l0ZW0sIENhdGFsb2dJdGVtU3RhdGU+O1xyXG5cclxuICAvKipcclxuICAgKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIGFkZC9yZW1vdmUgYnV0dG9uIG9mIHRoZSBncm91cCBpcyBjbGlja2VkXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIGFkZGVkQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjx7XHJcbiAgICBhZGRlZDogYm9vbGVhbjtcclxuICAgIGdyb3VwOiBDYXRhbG9nSXRlbUdyb3VwO1xyXG4gIH0+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgYWRkL3JlbW92ZSBidXR0b24gb2YgYSBsYXllciBpcyBjbGlja2VkXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIGxheWVyQWRkZWRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPHtcclxuICAgIGFkZGVkOiBib29sZWFuO1xyXG4gICAgbGF5ZXI6IENhdGFsb2dJdGVtTGF5ZXI7XHJcbiAgfT4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgZ2V0IHRpdGxlKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5ncm91cC50aXRsZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5zdG9yZS5sb2FkKHRoaXMuZ3JvdXAuaXRlbXMpO1xyXG4gICAgdGhpcy5ldmFsdWF0ZUFkZGVkKCk7XHJcbiAgICBpZiAodGhpcy5jYXRhbG9nICYmIHRoaXMuY2F0YWxvZy5zb3J0RGlyZWN0aW9uICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5zdG9yZS52aWV3LnNvcnQoe1xyXG4gICAgICAgIGRpcmVjdGlvbjogdGhpcy5jYXRhbG9nLnNvcnREaXJlY3Rpb24sXHJcbiAgICAgICAgdmFsdWVBY2Nlc3NvcjogKGl0ZW06IENhdGFsb2dJdGVtKSA9PiBpdGVtLnRpdGxlXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLnN0b3JlLmRlc3Ryb3koKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIGlzR3JvdXAoaXRlbTogQ2F0YWxvZ0l0ZW0pOiBib29sZWFuIHtcclxuICAgIHJldHVybiBpdGVtLnR5cGUgPT09IENhdGFsb2dJdGVtVHlwZS5Hcm91cDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIGlzTGF5ZXIoaXRlbTogQ2F0YWxvZ0l0ZW0pOiBib29sZWFuIHtcclxuICAgIHJldHVybiBpdGVtLnR5cGUgPT09IENhdGFsb2dJdGVtVHlwZS5MYXllcjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE9uIHRvZ2dsZSBidXR0b24gY2xpY2ssIGVtaXQgdGhlIGFkZGVkIGNoYW5nZSBldmVudFxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIG9uVG9nZ2xlQ2xpY2soKSB7XHJcbiAgICB0aGlzLmFkZGVkJC52YWx1ZSA/IHRoaXMucmVtb3ZlKCkgOiB0aGlzLmFkZCgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogV2hlbiBhIGxheWVyIGlzIGFkZGVkIG9yIHJlbW92ZWQsIGV2YWx1YXRlIGlmIGFsbCB0aGUgbGF5ZXJzIG9mIHRoZSBncm91cFxyXG4gICAqIGFyZSBub3cgYWRkZWQgb3IgcmVtb3ZlZC4gSWYgc28sIGNvbnNpZGVyIHRoYXQgdGhlIGdyb3VwIGl0c2VsZiBpcyBhZGRlZFxyXG4gICAqIG9yIHJlbW92ZWQuXHJcbiAgICogQGludGVybmFsXHJcbiAgICogQHBhcmFtIGV2ZW50IExheWVyIGFkZGVkIGNoYW5nZSBldmVudFxyXG4gICAqL1xyXG4gIG9uTGF5ZXJBZGRlZENoYW5nZShldmVudDogeyBhZGRlZDogYm9vbGVhbjsgbGF5ZXI6IENhdGFsb2dJdGVtTGF5ZXIgfSkge1xyXG4gICAgdGhpcy5sYXllckFkZGVkQ2hhbmdlLmVtaXQoZXZlbnQpO1xyXG4gICAgdGhpcy50cnlUb2dnbGVHcm91cChldmVudCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBFbWl0IGFkZGVkIGNoYW5nZSBldmVudCB3aXRoIGFkZGVkID0gdHJ1ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgYWRkKCkge1xyXG4gICAgdGhpcy5hZGRlZCQubmV4dCh0cnVlKTtcclxuICAgIHRoaXMuYWRkZWRDaGFuZ2UuZW1pdCh7XHJcbiAgICAgIGFkZGVkOiB0cnVlLFxyXG4gICAgICBncm91cDogdGhpcy5ncm91cFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBFbWl0IGFkZGVkIGNoYW5nZSBldmVudCB3aXRoIGFkZGVkID0gdHJ1ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgcmVtb3ZlKCkge1xyXG4gICAgdGhpcy5hZGRlZCQubmV4dChmYWxzZSk7XHJcbiAgICB0aGlzLmFkZGVkQ2hhbmdlLmVtaXQoe1xyXG4gICAgICBhZGRlZDogZmFsc2UsXHJcbiAgICAgIGdyb3VwOiB0aGlzLmdyb3VwXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIElmIGFsbCB0aGUgbGF5ZXJzIG9mIHRoZSBncm91cCBhZGRlZCBvciByZW1vdmVkLCBhZGQgb3IgcmVtb3ZlIHRoZSBncm91cCBpdHNlbGYuXHJcbiAgICogQHBhcmFtIGV2ZW50IFRoZSBsYXN0IGxheWVyIGFkZGVkIGNoYW5nZSBldmVudCB0byBvY2N1clxyXG4gICAqL1xyXG4gIHByaXZhdGUgdHJ5VG9nZ2xlR3JvdXAoZXZlbnQ6IHsgYWRkZWQ6IGJvb2xlYW47IGxheWVyOiBDYXRhbG9nSXRlbUxheWVyIH0pIHtcclxuICAgIGNvbnN0IGFkZGVkID0gZXZlbnQuYWRkZWQ7XHJcbiAgICBjb25zdCBsYXllciA9IGV2ZW50LmxheWVyO1xyXG5cclxuICAgIGNvbnN0IGxheWVyc0FkZGVkID0gdGhpcy5zdG9yZS52aWV3XHJcbiAgICAgIC5hbGwoKVxyXG4gICAgICAuZmlsdGVyKChpdGVtOiBDYXRhbG9nSXRlbSkgPT4gaXRlbS5pZCAhPT0gbGF5ZXIuaWQpXHJcbiAgICAgIC5tYXAoKGl0ZW06IENhdGFsb2dJdGVtKSA9PiB0aGlzLnN0YXRlLmdldChpdGVtKS5hZGRlZCB8fCBmYWxzZSk7XHJcblxyXG4gICAgaWYgKGxheWVyc0FkZGVkLmV2ZXJ5KHZhbHVlID0+IHZhbHVlID09PSBhZGRlZCkpIHtcclxuICAgICAgYWRkZWQgPyB0aGlzLmFkZCgpIDogdGhpcy5yZW1vdmUoKTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5hZGRlZCQudmFsdWUgPT09IHRydWUpIHtcclxuICAgICAgdGhpcy5hZGRlZCQubmV4dChmYWxzZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGV2YWx1YXRlQWRkZWQoKSB7XHJcbiAgICBjb25zdCBhZGRlZCA9IHRoaXMuc3RvcmUuYWxsKCkuZXZlcnkoKGl0ZW06IENhdGFsb2dJdGVtKSA9PiB7XHJcbiAgICAgIHJldHVybiAodGhpcy5zdGF0ZS5nZXQoaXRlbSkuYWRkZWQgfHwgZmFsc2UpID09PSB0cnVlO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLmFkZGVkJC5uZXh0KGFkZGVkKTtcclxuICB9XHJcbn1cclxuIl19
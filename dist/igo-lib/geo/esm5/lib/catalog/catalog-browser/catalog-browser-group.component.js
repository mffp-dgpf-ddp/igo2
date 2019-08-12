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
var CatalogBrowserGroupComponent = /** @class */ (function () {
    function CatalogBrowserGroupComponent() {
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
    Object.defineProperty(CatalogBrowserGroupComponent.prototype, "title", {
        /**
         * @internal
         */
        get: /**
         * \@internal
         * @return {?}
         */
        function () {
            return this.group.title;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @internal
     */
    /**
     * \@internal
     * @return {?}
     */
    CatalogBrowserGroupComponent.prototype.ngOnInit = /**
     * \@internal
     * @return {?}
     */
    function () {
        this.store.load(this.group.items);
        this.evaluateAdded();
        if (this.catalog && this.catalog.sortDirection !== undefined) {
            this.store.view.sort({
                direction: this.catalog.sortDirection,
                valueAccessor: (/**
                 * @param {?} item
                 * @return {?}
                 */
                function (item) { return item.title; })
            });
        }
    };
    /**
     * @return {?}
     */
    CatalogBrowserGroupComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.store.destroy();
    };
    /**
     * @internal
     */
    /**
     * \@internal
     * @param {?} item
     * @return {?}
     */
    CatalogBrowserGroupComponent.prototype.isGroup = /**
     * \@internal
     * @param {?} item
     * @return {?}
     */
    function (item) {
        return item.type === CatalogItemType.Group;
    };
    /**
     * @internal
     */
    /**
     * \@internal
     * @param {?} item
     * @return {?}
     */
    CatalogBrowserGroupComponent.prototype.isLayer = /**
     * \@internal
     * @param {?} item
     * @return {?}
     */
    function (item) {
        return item.type === CatalogItemType.Layer;
    };
    /**
     * On toggle button click, emit the added change event
     * @internal
     */
    /**
     * On toggle button click, emit the added change event
     * \@internal
     * @return {?}
     */
    CatalogBrowserGroupComponent.prototype.onToggleClick = /**
     * On toggle button click, emit the added change event
     * \@internal
     * @return {?}
     */
    function () {
        this.added$.value ? this.remove() : this.add();
    };
    /**
     * When a layer is added or removed, evaluate if all the layers of the group
     * are now added or removed. If so, consider that the group itself is added
     * or removed.
     * @internal
     * @param event Layer added change event
     */
    /**
     * When a layer is added or removed, evaluate if all the layers of the group
     * are now added or removed. If so, consider that the group itself is added
     * or removed.
     * \@internal
     * @param {?} event Layer added change event
     * @return {?}
     */
    CatalogBrowserGroupComponent.prototype.onLayerAddedChange = /**
     * When a layer is added or removed, evaluate if all the layers of the group
     * are now added or removed. If so, consider that the group itself is added
     * or removed.
     * \@internal
     * @param {?} event Layer added change event
     * @return {?}
     */
    function (event) {
        this.layerAddedChange.emit(event);
        this.tryToggleGroup(event);
    };
    /**
     * Emit added change event with added = true
     */
    /**
     * Emit added change event with added = true
     * @private
     * @return {?}
     */
    CatalogBrowserGroupComponent.prototype.add = /**
     * Emit added change event with added = true
     * @private
     * @return {?}
     */
    function () {
        this.added$.next(true);
        this.addedChange.emit({
            added: true,
            group: this.group
        });
    };
    /**
     * Emit added change event with added = true
     */
    /**
     * Emit added change event with added = true
     * @private
     * @return {?}
     */
    CatalogBrowserGroupComponent.prototype.remove = /**
     * Emit added change event with added = true
     * @private
     * @return {?}
     */
    function () {
        this.added$.next(false);
        this.addedChange.emit({
            added: false,
            group: this.group
        });
    };
    /**
     * If all the layers of the group added or removed, add or remove the group itself.
     * @param event The last layer added change event to occur
     */
    /**
     * If all the layers of the group added or removed, add or remove the group itself.
     * @private
     * @param {?} event The last layer added change event to occur
     * @return {?}
     */
    CatalogBrowserGroupComponent.prototype.tryToggleGroup = /**
     * If all the layers of the group added or removed, add or remove the group itself.
     * @private
     * @param {?} event The last layer added change event to occur
     * @return {?}
     */
    function (event) {
        var _this = this;
        /** @type {?} */
        var added = event.added;
        /** @type {?} */
        var layer = event.layer;
        /** @type {?} */
        var layersAdded = this.store.view
            .all()
            .filter((/**
         * @param {?} item
         * @return {?}
         */
        function (item) { return item.id !== layer.id; }))
            .map((/**
         * @param {?} item
         * @return {?}
         */
        function (item) { return _this.state.get(item).added || false; }));
        if (layersAdded.every((/**
         * @param {?} value
         * @return {?}
         */
        function (value) { return value === added; }))) {
            added ? this.add() : this.remove();
        }
        else if (this.added$.value === true) {
            this.added$.next(false);
        }
    };
    /**
     * @private
     * @return {?}
     */
    CatalogBrowserGroupComponent.prototype.evaluateAdded = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var added = this.store.all().every((/**
         * @param {?} item
         * @return {?}
         */
        function (item) {
            return (_this.state.get(item).added || false) === true;
        }));
        this.added$.next(added);
    };
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
    return CatalogBrowserGroupComponent;
}());
export { CatalogBrowserGroupComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0YWxvZy1icm93c2VyLWdyb3VwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9jYXRhbG9nL2NhdGFsb2ctYnJvd3Nlci9jYXRhbG9nLWJyb3dzZXItZ3JvdXAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxFQUNaLHVCQUF1QixFQUd4QixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRXZDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxXQUFXLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFFL0QsT0FBTyxFQU1MLGVBQWUsRUFDaEIsTUFBTSxXQUFXLENBQUM7Ozs7QUFLbkI7SUFBQTs7Ozs7UUFVRSxVQUFLLEdBQUcsSUFBSSxXQUFXLENBQWdDLEVBQUUsQ0FBQyxDQUFDOzs7OztRQU0zRCxXQUFNLEdBQTZCLElBQUksZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDOzs7O1FBd0JwRCxnQkFBVyxHQUFHLElBQUksWUFBWSxFQUdwQyxDQUFDOzs7O1FBS0sscUJBQWdCLEdBQUcsSUFBSSxZQUFZLEVBR3pDLENBQUM7SUE2R1AsQ0FBQztJQXhHQyxzQkFBSSwrQ0FBSztRQUhUOztXQUVHOzs7OztRQUNIO1lBQ0UsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQztRQUMxQixDQUFDOzs7T0FBQTtJQUVEOztPQUVHOzs7OztJQUNILCtDQUFROzs7O0lBQVI7UUFDRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUNyQixJQUFJLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEtBQUssU0FBUyxFQUFFO1lBQzVELElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztnQkFDbkIsU0FBUyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYTtnQkFDckMsYUFBYTs7OztnQkFBRSxVQUFDLElBQWlCLElBQUssT0FBQSxJQUFJLENBQUMsS0FBSyxFQUFWLENBQVUsQ0FBQTthQUNqRCxDQUFDLENBQUM7U0FDSjtJQUNILENBQUM7Ozs7SUFFRCxrREFBVzs7O0lBQVg7UUFDRSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFRDs7T0FFRzs7Ozs7O0lBQ0gsOENBQU87Ozs7O0lBQVAsVUFBUSxJQUFpQjtRQUN2QixPQUFPLElBQUksQ0FBQyxJQUFJLEtBQUssZUFBZSxDQUFDLEtBQUssQ0FBQztJQUM3QyxDQUFDO0lBRUQ7O09BRUc7Ozs7OztJQUNILDhDQUFPOzs7OztJQUFQLFVBQVEsSUFBaUI7UUFDdkIsT0FBTyxJQUFJLENBQUMsSUFBSSxLQUFLLGVBQWUsQ0FBQyxLQUFLLENBQUM7SUFDN0MsQ0FBQztJQUVEOzs7T0FHRzs7Ozs7O0lBQ0gsb0RBQWE7Ozs7O0lBQWI7UUFDRSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDakQsQ0FBQztJQUVEOzs7Ozs7T0FNRzs7Ozs7Ozs7O0lBQ0gseURBQWtCOzs7Ozs7OztJQUFsQixVQUFtQixLQUFrRDtRQUNuRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVEOztPQUVHOzs7Ozs7SUFDSywwQ0FBRzs7Ozs7SUFBWDtRQUNFLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDO1lBQ3BCLEtBQUssRUFBRSxJQUFJO1lBQ1gsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO1NBQ2xCLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRDs7T0FFRzs7Ozs7O0lBQ0ssNkNBQU07Ozs7O0lBQWQ7UUFDRSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN4QixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQztZQUNwQixLQUFLLEVBQUUsS0FBSztZQUNaLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztTQUNsQixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQ7OztPQUdHOzs7Ozs7O0lBQ0sscURBQWM7Ozs7OztJQUF0QixVQUF1QixLQUFrRDtRQUF6RSxpQkFjQzs7WUFiTyxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUs7O1lBQ25CLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSzs7WUFFbkIsV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSTthQUNoQyxHQUFHLEVBQUU7YUFDTCxNQUFNOzs7O1FBQUMsVUFBQyxJQUFpQixJQUFLLE9BQUEsSUFBSSxDQUFDLEVBQUUsS0FBSyxLQUFLLENBQUMsRUFBRSxFQUFwQixDQUFvQixFQUFDO2FBQ25ELEdBQUc7Ozs7UUFBQyxVQUFDLElBQWlCLElBQUssT0FBQSxLQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLElBQUksS0FBSyxFQUFuQyxDQUFtQyxFQUFDO1FBRWxFLElBQUksV0FBVyxDQUFDLEtBQUs7Ozs7UUFBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUssS0FBSyxLQUFLLEVBQWYsQ0FBZSxFQUFDLEVBQUU7WUFDL0MsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUNwQzthQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEtBQUssSUFBSSxFQUFFO1lBQ3JDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3pCO0lBQ0gsQ0FBQzs7Ozs7SUFFTyxvREFBYTs7OztJQUFyQjtRQUFBLGlCQUtDOztZQUpPLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDLEtBQUs7Ozs7UUFBQyxVQUFDLElBQWlCO1lBQ3JELE9BQU8sQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLEtBQUssSUFBSSxDQUFDO1FBQ3hELENBQUMsRUFBQztRQUNGLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzFCLENBQUM7O2dCQS9KRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLDJCQUEyQjtvQkFDckMsMmdEQUFxRDtvQkFDckQsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07aUJBQ2hEOzs7MEJBaUJFLEtBQUs7d0JBS0wsS0FBSzt3QkFTTCxLQUFLOzhCQUtMLE1BQU07bUNBUU4sTUFBTTs7SUFnSFQsbUNBQUM7Q0FBQSxBQWhLRCxJQWdLQztTQTNKWSw0QkFBNEI7Ozs7Ozs7SUFLdkMsNkNBQTJEOzs7Ozs7SUFNM0QsOENBQThEOzs7OztJQUs5RCwrQ0FBMEI7Ozs7O0lBSzFCLDZDQUFpQzs7Ozs7Ozs7O0lBU2pDLDZDQUFrRTs7Ozs7SUFLbEUsbURBR0s7Ozs7O0lBS0wsd0RBR0siLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBJbnB1dCxcclxuICBPdXRwdXQsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gIE9uSW5pdCxcclxuICBPbkRlc3Ryb3lcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IHsgRW50aXR5U3RhdGVNYW5hZ2VyLCBFbnRpdHlTdG9yZSB9IGZyb20gJ0BpZ28yL2NvbW1vbic7XHJcblxyXG5pbXBvcnQge1xyXG4gIENhdGFsb2csXHJcbiAgQ2F0YWxvZ0l0ZW0sXHJcbiAgQ2F0YWxvZ0l0ZW1Hcm91cCxcclxuICBDYXRhbG9nSXRlbUxheWVyLFxyXG4gIENhdGFsb2dJdGVtU3RhdGUsXHJcbiAgQ2F0YWxvZ0l0ZW1UeXBlXHJcbn0gZnJvbSAnLi4vc2hhcmVkJztcclxuXHJcbi8qKlxyXG4gKiBDYXRhbG9nIGJyb3dzZXIgZ3JvdXAgaXRlbVxyXG4gKi9cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdpZ28tY2F0YWxvZy1icm93c2VyLWdyb3VwJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vY2F0YWxvZy1icm93c2VyLWdyb3VwLmNvbXBvbmVudC5odG1sJyxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgQ2F0YWxvZ0Jyb3dzZXJHcm91cENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuICAvKipcclxuICAgKiBHcm91cCdzIGl0ZW1zIHN0b3JlXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgc3RvcmUgPSBuZXcgRW50aXR5U3RvcmU8Q2F0YWxvZ0l0ZW0sIENhdGFsb2dJdGVtU3RhdGU+KFtdKTtcclxuXHJcbiAgLyoqXHJcbiAgICogV2hldGhlciBhbGwgdGhlIGxheWVycyBvZiB0aGUgZ3JvdXAgYXJlIGFkZGVkXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgYWRkZWQkOiBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KGZhbHNlKTtcclxuXHJcbiAgLyoqXHJcbiAgICogQ2F0YWxvZ1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGNhdGFsb2c6IENhdGFsb2c7XHJcblxyXG4gIC8qKlxyXG4gICAqIENhdGFsb2cgZ3JvdXBcclxuICAgKi9cclxuICBASW5wdXQoKSBncm91cDogQ2F0YWxvZ0l0ZW1Hcm91cDtcclxuXHJcbiAgLyoqXHJcbiAgICogUGFyZW50IGNhdGFsb2cncyBpdGVtcyBzdG9yZSBzdGF0ZS4gR3JvdXBzIHNoYXJlIGEgdW5pcXVlXHJcbiAgICogRW50aXR5U3RhdGUgdGhhdCB0cmFja3MgdGhlIGdyb3VwIGFuZCBpdCdzIGxheWVycyBzdGF0ZSAod2hldGhlciB0aGV5IGFyZSBhZGRlZCBvciBub3QpLlxyXG4gICAqIFNoYXJpbmcgYSB1bmlxdWUgc3RhdGUgd291bGQgYWxzbyBhbGxvdyB1cyB0byBleHBhbmQgdGhpcyBjb21wb25lbnQgdG8gYWxsb3dcclxuICAgKiB0aGUgc2VsZWN0aW9uIG9mIGEgbGF5ZXIgd2hpbGUgdW5zZWxlY3RpbmcgYW55IGxheWVyIGFscmVhZHkgc2VsZWN0ZWQgaW4gYW5vdGhlciBncm91cC5cclxuICAgKiBUaGlzIGNvdWxkIGJlIHVzZWZ1bCB0byBkaXNwbGF5IHNvbWUgbGF5ZXIgaW5mbyBiZWZvcmUgYWRkaW5nIGl0LCBmb3IgZXhhbXBsZS5cclxuICAgKi9cclxuICBASW5wdXQoKSBzdGF0ZTogRW50aXR5U3RhdGVNYW5hZ2VyPENhdGFsb2dJdGVtLCBDYXRhbG9nSXRlbVN0YXRlPjtcclxuXHJcbiAgLyoqXHJcbiAgICogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBhZGQvcmVtb3ZlIGJ1dHRvbiBvZiB0aGUgZ3JvdXAgaXMgY2xpY2tlZFxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBhZGRlZENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8e1xyXG4gICAgYWRkZWQ6IGJvb2xlYW47XHJcbiAgICBncm91cDogQ2F0YWxvZ0l0ZW1Hcm91cDtcclxuICB9PigpO1xyXG5cclxuICAvKipcclxuICAgKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIGFkZC9yZW1vdmUgYnV0dG9uIG9mIGEgbGF5ZXIgaXMgY2xpY2tlZFxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBsYXllckFkZGVkQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjx7XHJcbiAgICBhZGRlZDogYm9vbGVhbjtcclxuICAgIGxheWVyOiBDYXRhbG9nSXRlbUxheWVyO1xyXG4gIH0+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIGdldCB0aXRsZSgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMuZ3JvdXAudGl0bGU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMuc3RvcmUubG9hZCh0aGlzLmdyb3VwLml0ZW1zKTtcclxuICAgIHRoaXMuZXZhbHVhdGVBZGRlZCgpO1xyXG4gICAgaWYgKHRoaXMuY2F0YWxvZyAmJiB0aGlzLmNhdGFsb2cuc29ydERpcmVjdGlvbiAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMuc3RvcmUudmlldy5zb3J0KHtcclxuICAgICAgICBkaXJlY3Rpb246IHRoaXMuY2F0YWxvZy5zb3J0RGlyZWN0aW9uLFxyXG4gICAgICAgIHZhbHVlQWNjZXNzb3I6IChpdGVtOiBDYXRhbG9nSXRlbSkgPT4gaXRlbS50aXRsZVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgdGhpcy5zdG9yZS5kZXN0cm95KCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBpc0dyb3VwKGl0ZW06IENhdGFsb2dJdGVtKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gaXRlbS50eXBlID09PSBDYXRhbG9nSXRlbVR5cGUuR3JvdXA7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBpc0xheWVyKGl0ZW06IENhdGFsb2dJdGVtKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gaXRlbS50eXBlID09PSBDYXRhbG9nSXRlbVR5cGUuTGF5ZXI7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBPbiB0b2dnbGUgYnV0dG9uIGNsaWNrLCBlbWl0IHRoZSBhZGRlZCBjaGFuZ2UgZXZlbnRcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBvblRvZ2dsZUNsaWNrKCkge1xyXG4gICAgdGhpcy5hZGRlZCQudmFsdWUgPyB0aGlzLnJlbW92ZSgpIDogdGhpcy5hZGQoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZW4gYSBsYXllciBpcyBhZGRlZCBvciByZW1vdmVkLCBldmFsdWF0ZSBpZiBhbGwgdGhlIGxheWVycyBvZiB0aGUgZ3JvdXBcclxuICAgKiBhcmUgbm93IGFkZGVkIG9yIHJlbW92ZWQuIElmIHNvLCBjb25zaWRlciB0aGF0IHRoZSBncm91cCBpdHNlbGYgaXMgYWRkZWRcclxuICAgKiBvciByZW1vdmVkLlxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqIEBwYXJhbSBldmVudCBMYXllciBhZGRlZCBjaGFuZ2UgZXZlbnRcclxuICAgKi9cclxuICBvbkxheWVyQWRkZWRDaGFuZ2UoZXZlbnQ6IHsgYWRkZWQ6IGJvb2xlYW47IGxheWVyOiBDYXRhbG9nSXRlbUxheWVyIH0pIHtcclxuICAgIHRoaXMubGF5ZXJBZGRlZENoYW5nZS5lbWl0KGV2ZW50KTtcclxuICAgIHRoaXMudHJ5VG9nZ2xlR3JvdXAoZXZlbnQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRW1pdCBhZGRlZCBjaGFuZ2UgZXZlbnQgd2l0aCBhZGRlZCA9IHRydWVcclxuICAgKi9cclxuICBwcml2YXRlIGFkZCgpIHtcclxuICAgIHRoaXMuYWRkZWQkLm5leHQodHJ1ZSk7XHJcbiAgICB0aGlzLmFkZGVkQ2hhbmdlLmVtaXQoe1xyXG4gICAgICBhZGRlZDogdHJ1ZSxcclxuICAgICAgZ3JvdXA6IHRoaXMuZ3JvdXBcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRW1pdCBhZGRlZCBjaGFuZ2UgZXZlbnQgd2l0aCBhZGRlZCA9IHRydWVcclxuICAgKi9cclxuICBwcml2YXRlIHJlbW92ZSgpIHtcclxuICAgIHRoaXMuYWRkZWQkLm5leHQoZmFsc2UpO1xyXG4gICAgdGhpcy5hZGRlZENoYW5nZS5lbWl0KHtcclxuICAgICAgYWRkZWQ6IGZhbHNlLFxyXG4gICAgICBncm91cDogdGhpcy5ncm91cFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBJZiBhbGwgdGhlIGxheWVycyBvZiB0aGUgZ3JvdXAgYWRkZWQgb3IgcmVtb3ZlZCwgYWRkIG9yIHJlbW92ZSB0aGUgZ3JvdXAgaXRzZWxmLlxyXG4gICAqIEBwYXJhbSBldmVudCBUaGUgbGFzdCBsYXllciBhZGRlZCBjaGFuZ2UgZXZlbnQgdG8gb2NjdXJcclxuICAgKi9cclxuICBwcml2YXRlIHRyeVRvZ2dsZUdyb3VwKGV2ZW50OiB7IGFkZGVkOiBib29sZWFuOyBsYXllcjogQ2F0YWxvZ0l0ZW1MYXllciB9KSB7XHJcbiAgICBjb25zdCBhZGRlZCA9IGV2ZW50LmFkZGVkO1xyXG4gICAgY29uc3QgbGF5ZXIgPSBldmVudC5sYXllcjtcclxuXHJcbiAgICBjb25zdCBsYXllcnNBZGRlZCA9IHRoaXMuc3RvcmUudmlld1xyXG4gICAgICAuYWxsKClcclxuICAgICAgLmZpbHRlcigoaXRlbTogQ2F0YWxvZ0l0ZW0pID0+IGl0ZW0uaWQgIT09IGxheWVyLmlkKVxyXG4gICAgICAubWFwKChpdGVtOiBDYXRhbG9nSXRlbSkgPT4gdGhpcy5zdGF0ZS5nZXQoaXRlbSkuYWRkZWQgfHwgZmFsc2UpO1xyXG5cclxuICAgIGlmIChsYXllcnNBZGRlZC5ldmVyeSh2YWx1ZSA9PiB2YWx1ZSA9PT0gYWRkZWQpKSB7XHJcbiAgICAgIGFkZGVkID8gdGhpcy5hZGQoKSA6IHRoaXMucmVtb3ZlKCk7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuYWRkZWQkLnZhbHVlID09PSB0cnVlKSB7XHJcbiAgICAgIHRoaXMuYWRkZWQkLm5leHQoZmFsc2UpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBldmFsdWF0ZUFkZGVkKCkge1xyXG4gICAgY29uc3QgYWRkZWQgPSB0aGlzLnN0b3JlLmFsbCgpLmV2ZXJ5KChpdGVtOiBDYXRhbG9nSXRlbSkgPT4ge1xyXG4gICAgICByZXR1cm4gKHRoaXMuc3RhdGUuZ2V0KGl0ZW0pLmFkZGVkIHx8IGZhbHNlKSA9PT0gdHJ1ZTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5hZGRlZCQubmV4dChhZGRlZCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==
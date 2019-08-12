/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { getEntityTitle, getEntityIcon } from '@igo2/common';
/**
 * Catalog browser layer item
 */
export class CatalogBrowserLayerComponent {
    constructor() {
        /**
         * Event emitted when the add/remove button is clicked
         */
        this.addedChange = new EventEmitter();
    }
    /**
     * \@internal
     * @return {?}
     */
    get title() { return getEntityTitle(this.layer); }
    /**
     * \@internal
     * @return {?}
     */
    get icon() { return getEntityIcon(this.layer) || 'layers'; }
    /**
     * On toggle button click, emit the added change event
     * \@internal
     * @return {?}
     */
    onToggleClick() {
        this.added ? this.remove() : this.add();
    }
    /**
     * Emit added change event with added = true
     * @private
     * @return {?}
     */
    add() {
        this.added = true;
        this.addedChange.emit({ added: true, layer: this.layer });
    }
    /**
     * Emit added change event with added = false
     * @private
     * @return {?}
     */
    remove() {
        this.added = false;
        this.addedChange.emit({ added: false, layer: this.layer });
    }
}
CatalogBrowserLayerComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-catalog-browser-layer',
                template: "<mat-list-item>\r\n  <mat-icon mat-list-avatar svgIcon=\"{{icon}}\"></mat-icon>\r\n  <h4 mat-line>{{title}}</h4>\r\n  \r\n  <button\r\n    mat-icon-button\r\n    tooltip-position=\"below\"\r\n    matTooltipShowDelay=\"500\"\r\n    [matTooltip]=\"(added ? 'igo.geo.catalog.layer.removeFromMap' : 'igo.geo.catalog.layer.addToMap') | translate\"\r\n    [color]=\"added ? 'warn' : ''\"\r\n    (click)=\"onToggleClick()\">\r\n    <mat-icon [svgIcon]=\"added ? 'delete' : 'plus'\"></mat-icon>\r\n  </button>\r\n</mat-list-item>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];
/** @nocollapse */
CatalogBrowserLayerComponent.ctorParameters = () => [];
CatalogBrowserLayerComponent.propDecorators = {
    layer: [{ type: Input }],
    added: [{ type: Input }],
    addedChange: [{ type: Output }]
};
if (false) {
    /**
     * Catalog layer
     * @type {?}
     */
    CatalogBrowserLayerComponent.prototype.layer;
    /**
     * Whether the layer is already added to the map
     * @type {?}
     */
    CatalogBrowserLayerComponent.prototype.added;
    /**
     * Event emitted when the add/remove button is clicked
     * @type {?}
     */
    CatalogBrowserLayerComponent.prototype.addedChange;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0YWxvZy1icm93c2VyLWxheWVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9jYXRhbG9nL2NhdGFsb2ctYnJvd3Nlci9jYXRhbG9nLWJyb3dzZXItbGF5ZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSx1QkFBdUIsRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRWhHLE9BQU8sRUFBRSxjQUFjLEVBQUUsYUFBYSxFQUFFLE1BQU0sY0FBYyxDQUFDOzs7O0FBWTdELE1BQU0sT0FBTyw0QkFBNEI7SUE4QnZDOzs7O1FBZlUsZ0JBQVcsR0FBRyxJQUFJLFlBQVksRUFHcEMsQ0FBQztJQVlVLENBQUM7Ozs7O0lBUGhCLElBQUksS0FBSyxLQUFhLE9BQU8sY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Ozs7O0lBSzFELElBQUksSUFBSSxLQUFhLE9BQU8sYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDOzs7Ozs7SUFRcEUsYUFBYTtRQUNYLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQzFDLENBQUM7Ozs7OztJQUtPLEdBQUc7UUFDVCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUNsQixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUMsQ0FBQyxDQUFDO0lBQzFELENBQUM7Ozs7OztJQUtPLE1BQU07UUFDWixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUMsQ0FBQyxDQUFDO0lBQzNELENBQUM7OztZQTNERixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLDJCQUEyQjtnQkFDckMseWhCQUFxRDtnQkFDckQsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07YUFDaEQ7Ozs7O29CQU1FLEtBQUs7b0JBS0wsS0FBSzswQkFLTCxNQUFNOzs7Ozs7O0lBVlAsNkNBQWlDOzs7OztJQUtqQyw2Q0FBd0I7Ozs7O0lBS3hCLG1EQUdLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBnZXRFbnRpdHlUaXRsZSwgZ2V0RW50aXR5SWNvbiB9IGZyb20gJ0BpZ28yL2NvbW1vbic7XHJcblxyXG5pbXBvcnQgeyBDYXRhbG9nSXRlbUxheWVyIH0gZnJvbSAnLi4vc2hhcmVkJztcclxuXHJcbi8qKlxyXG4gKiBDYXRhbG9nIGJyb3dzZXIgbGF5ZXIgaXRlbVxyXG4gKi9cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdpZ28tY2F0YWxvZy1icm93c2VyLWxheWVyJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vY2F0YWxvZy1icm93c2VyLWxheWVyLmNvbXBvbmVudC5odG1sJyxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgQ2F0YWxvZ0Jyb3dzZXJMYXllckNvbXBvbmVudCB7XHJcblxyXG4gIC8qKlxyXG4gICAqIENhdGFsb2cgbGF5ZXJcclxuICAgKi9cclxuICBASW5wdXQoKSBsYXllcjogQ2F0YWxvZ0l0ZW1MYXllcjtcclxuXHJcbiAgLyoqXHJcbiAgICogV2hldGhlciB0aGUgbGF5ZXIgaXMgYWxyZWFkeSBhZGRlZCB0byB0aGUgbWFwXHJcbiAgICovXHJcbiAgQElucHV0KCkgYWRkZWQ6IGJvb2xlYW47XHJcblxyXG4gIC8qKlxyXG4gICAqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgYWRkL3JlbW92ZSBidXR0b24gaXMgY2xpY2tlZFxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBhZGRlZENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8e1xyXG4gICAgYWRkZWQ6IGJvb2xlYW47XHJcbiAgICBsYXllcjogQ2F0YWxvZ0l0ZW1MYXllcjtcclxuICB9PigpO1xyXG5cclxuICAvKipcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBnZXQgdGl0bGUoKTogc3RyaW5nIHsgcmV0dXJuIGdldEVudGl0eVRpdGxlKHRoaXMubGF5ZXIpOyB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIGdldCBpY29uKCk6IHN0cmluZyB7IHJldHVybiBnZXRFbnRpdHlJY29uKHRoaXMubGF5ZXIpIHx8ICdsYXllcnMnOyB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge31cclxuXHJcbiAgLyoqXHJcbiAgICogT24gdG9nZ2xlIGJ1dHRvbiBjbGljaywgZW1pdCB0aGUgYWRkZWQgY2hhbmdlIGV2ZW50XHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgb25Ub2dnbGVDbGljaygpIHtcclxuICAgIHRoaXMuYWRkZWQgPyB0aGlzLnJlbW92ZSgpIDogdGhpcy5hZGQoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEVtaXQgYWRkZWQgY2hhbmdlIGV2ZW50IHdpdGggYWRkZWQgPSB0cnVlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBhZGQoKSB7XHJcbiAgICB0aGlzLmFkZGVkID0gdHJ1ZTtcclxuICAgIHRoaXMuYWRkZWRDaGFuZ2UuZW1pdCh7YWRkZWQ6IHRydWUsIGxheWVyOiB0aGlzLmxheWVyfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBFbWl0IGFkZGVkIGNoYW5nZSBldmVudCB3aXRoIGFkZGVkID0gZmFsc2VcclxuICAgKi9cclxuICBwcml2YXRlIHJlbW92ZSgpIHtcclxuICAgIHRoaXMuYWRkZWQgPSBmYWxzZTtcclxuICAgIHRoaXMuYWRkZWRDaGFuZ2UuZW1pdCh7YWRkZWQ6IGZhbHNlLCBsYXllcjogdGhpcy5sYXllcn0pO1xyXG4gIH1cclxuXHJcbn1cclxuIl19
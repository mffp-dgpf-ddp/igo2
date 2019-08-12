/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { getEntityTitle, getEntityIcon } from '@igo2/common';
/**
 * Catalog browser layer item
 */
var CatalogBrowserLayerComponent = /** @class */ (function () {
    function CatalogBrowserLayerComponent() {
        /**
         * Event emitted when the add/remove button is clicked
         */
        this.addedChange = new EventEmitter();
    }
    Object.defineProperty(CatalogBrowserLayerComponent.prototype, "title", {
        /**
         * @internal
         */
        get: /**
         * \@internal
         * @return {?}
         */
        function () { return getEntityTitle(this.layer); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CatalogBrowserLayerComponent.prototype, "icon", {
        /**
         * @internal
         */
        get: /**
         * \@internal
         * @return {?}
         */
        function () { return getEntityIcon(this.layer) || 'layers'; },
        enumerable: true,
        configurable: true
    });
    /**
     * On toggle button click, emit the added change event
     * @internal
     */
    /**
     * On toggle button click, emit the added change event
     * \@internal
     * @return {?}
     */
    CatalogBrowserLayerComponent.prototype.onToggleClick = /**
     * On toggle button click, emit the added change event
     * \@internal
     * @return {?}
     */
    function () {
        this.added ? this.remove() : this.add();
    };
    /**
     * Emit added change event with added = true
     */
    /**
     * Emit added change event with added = true
     * @private
     * @return {?}
     */
    CatalogBrowserLayerComponent.prototype.add = /**
     * Emit added change event with added = true
     * @private
     * @return {?}
     */
    function () {
        this.added = true;
        this.addedChange.emit({ added: true, layer: this.layer });
    };
    /**
     * Emit added change event with added = false
     */
    /**
     * Emit added change event with added = false
     * @private
     * @return {?}
     */
    CatalogBrowserLayerComponent.prototype.remove = /**
     * Emit added change event with added = false
     * @private
     * @return {?}
     */
    function () {
        this.added = false;
        this.addedChange.emit({ added: false, layer: this.layer });
    };
    CatalogBrowserLayerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-catalog-browser-layer',
                    template: "<mat-list-item>\r\n  <mat-icon mat-list-avatar svgIcon=\"{{icon}}\"></mat-icon>\r\n  <h4 mat-line>{{title}}</h4>\r\n  \r\n  <button\r\n    mat-icon-button\r\n    tooltip-position=\"below\"\r\n    matTooltipShowDelay=\"500\"\r\n    [matTooltip]=\"(added ? 'igo.geo.catalog.layer.removeFromMap' : 'igo.geo.catalog.layer.addToMap') | translate\"\r\n    [color]=\"added ? 'warn' : ''\"\r\n    (click)=\"onToggleClick()\">\r\n    <mat-icon [svgIcon]=\"added ? 'delete' : 'plus'\"></mat-icon>\r\n  </button>\r\n</mat-list-item>\r\n",
                    changeDetection: ChangeDetectionStrategy.OnPush
                }] }
    ];
    /** @nocollapse */
    CatalogBrowserLayerComponent.ctorParameters = function () { return []; };
    CatalogBrowserLayerComponent.propDecorators = {
        layer: [{ type: Input }],
        added: [{ type: Input }],
        addedChange: [{ type: Output }]
    };
    return CatalogBrowserLayerComponent;
}());
export { CatalogBrowserLayerComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0YWxvZy1icm93c2VyLWxheWVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9jYXRhbG9nL2NhdGFsb2ctYnJvd3Nlci9jYXRhbG9nLWJyb3dzZXItbGF5ZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSx1QkFBdUIsRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRWhHLE9BQU8sRUFBRSxjQUFjLEVBQUUsYUFBYSxFQUFFLE1BQU0sY0FBYyxDQUFDOzs7O0FBTzdEO0lBbUNFOzs7O1FBZlUsZ0JBQVcsR0FBRyxJQUFJLFlBQVksRUFHcEMsQ0FBQztJQVlVLENBQUM7SUFQaEIsc0JBQUksK0NBQUs7UUFIVDs7V0FFRzs7Ozs7UUFDSCxjQUFzQixPQUFPLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7T0FBQTtJQUsxRCxzQkFBSSw4Q0FBSTtRQUhSOztXQUVHOzs7OztRQUNILGNBQXFCLE9BQU8sYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDOzs7T0FBQTtJQUlwRTs7O09BR0c7Ozs7OztJQUNILG9EQUFhOzs7OztJQUFiO1FBQ0UsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDMUMsQ0FBQztJQUVEOztPQUVHOzs7Ozs7SUFDSywwQ0FBRzs7Ozs7SUFBWDtRQUNFLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEVBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBQyxDQUFDLENBQUM7SUFDMUQsQ0FBQztJQUVEOztPQUVHOzs7Ozs7SUFDSyw2Q0FBTTs7Ozs7SUFBZDtRQUNFLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEVBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBQyxDQUFDLENBQUM7SUFDM0QsQ0FBQzs7Z0JBM0RGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsMkJBQTJCO29CQUNyQyx5aEJBQXFEO29CQUNyRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtpQkFDaEQ7Ozs7O3dCQU1FLEtBQUs7d0JBS0wsS0FBSzs4QkFLTCxNQUFNOztJQXlDVCxtQ0FBQztDQUFBLEFBN0RELElBNkRDO1NBeERZLDRCQUE0Qjs7Ozs7O0lBS3ZDLDZDQUFpQzs7Ozs7SUFLakMsNkNBQXdCOzs7OztJQUt4QixtREFHSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgZ2V0RW50aXR5VGl0bGUsIGdldEVudGl0eUljb24gfSBmcm9tICdAaWdvMi9jb21tb24nO1xyXG5cclxuaW1wb3J0IHsgQ2F0YWxvZ0l0ZW1MYXllciB9IGZyb20gJy4uL3NoYXJlZCc7XHJcblxyXG4vKipcclxuICogQ2F0YWxvZyBicm93c2VyIGxheWVyIGl0ZW1cclxuICovXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaWdvLWNhdGFsb2ctYnJvd3Nlci1sYXllcicsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2NhdGFsb2ctYnJvd3Nlci1sYXllci5jb21wb25lbnQuaHRtbCcsXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIENhdGFsb2dCcm93c2VyTGF5ZXJDb21wb25lbnQge1xyXG5cclxuICAvKipcclxuICAgKiBDYXRhbG9nIGxheWVyXHJcbiAgICovXHJcbiAgQElucHV0KCkgbGF5ZXI6IENhdGFsb2dJdGVtTGF5ZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZXRoZXIgdGhlIGxheWVyIGlzIGFscmVhZHkgYWRkZWQgdG8gdGhlIG1hcFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGFkZGVkOiBib29sZWFuO1xyXG5cclxuICAvKipcclxuICAgKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIGFkZC9yZW1vdmUgYnV0dG9uIGlzIGNsaWNrZWRcclxuICAgKi9cclxuICBAT3V0cHV0KCkgYWRkZWRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPHtcclxuICAgIGFkZGVkOiBib29sZWFuO1xyXG4gICAgbGF5ZXI6IENhdGFsb2dJdGVtTGF5ZXI7XHJcbiAgfT4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgZ2V0IHRpdGxlKCk6IHN0cmluZyB7IHJldHVybiBnZXRFbnRpdHlUaXRsZSh0aGlzLmxheWVyKTsgfVxyXG5cclxuICAvKipcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBnZXQgaWNvbigpOiBzdHJpbmcgeyByZXR1cm4gZ2V0RW50aXR5SWNvbih0aGlzLmxheWVyKSB8fCAnbGF5ZXJzJzsgfVxyXG5cclxuICBjb25zdHJ1Y3RvcigpIHt9XHJcblxyXG4gIC8qKlxyXG4gICAqIE9uIHRvZ2dsZSBidXR0b24gY2xpY2ssIGVtaXQgdGhlIGFkZGVkIGNoYW5nZSBldmVudFxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIG9uVG9nZ2xlQ2xpY2soKSB7XHJcbiAgICB0aGlzLmFkZGVkID8gdGhpcy5yZW1vdmUoKSA6IHRoaXMuYWRkKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBFbWl0IGFkZGVkIGNoYW5nZSBldmVudCB3aXRoIGFkZGVkID0gdHJ1ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgYWRkKCkge1xyXG4gICAgdGhpcy5hZGRlZCA9IHRydWU7XHJcbiAgICB0aGlzLmFkZGVkQ2hhbmdlLmVtaXQoe2FkZGVkOiB0cnVlLCBsYXllcjogdGhpcy5sYXllcn0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRW1pdCBhZGRlZCBjaGFuZ2UgZXZlbnQgd2l0aCBhZGRlZCA9IGZhbHNlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSByZW1vdmUoKSB7XHJcbiAgICB0aGlzLmFkZGVkID0gZmFsc2U7XHJcbiAgICB0aGlzLmFkZGVkQ2hhbmdlLmVtaXQoe2FkZGVkOiBmYWxzZSwgbGF5ZXI6IHRoaXMubGF5ZXJ9KTtcclxuICB9XHJcblxyXG59XHJcbiJdfQ==
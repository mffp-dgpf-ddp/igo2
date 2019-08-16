/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { IgoMap } from '../../map/shared/map';
import { LayerService } from '../../layer/shared/layer.service';
import { LAYER } from '../../layer/shared/layer.enums';
export class SearchResultAddButtonComponent {
    /**
     * @param {?} layerService
     */
    constructor(layerService) {
        this.layerService = layerService;
        this._color = 'primary';
    }
    /**
     * @return {?}
     */
    get color() {
        return this._color;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set color(value) {
        this._color = value;
    }
    /**
     * \@internal
     * @return {?}
     */
    ngOnInit() {
        if (this.layer.meta.dataType === 'Layer') {
            this.added = this.map.layers.findIndex((/**
             * @param {?} lay
             * @return {?}
             */
            (lay) => lay.id === this.layer.data.sourceOptions.id)) !== -1;
        }
    }
    /**
     * On toggle button click, emit the added change event
     * \@internal
     * @return {?}
     */
    onToggleClick() {
        this.added ? this.remove() : this.add();
    }
    /**
     * @private
     * @return {?}
     */
    add() {
        this.added = true;
        this.addLayerToMap();
    }
    /**
     * @private
     * @return {?}
     */
    remove() {
        this.added = false;
        this.removeLayerFromMap();
    }
    /**
     * Emit added change event with added = true
     * @private
     * @return {?}
     */
    addLayerToMap() {
        if (this.map === undefined) {
            return;
        }
        if (this.layer.meta.dataType !== LAYER) {
            return undefined;
        }
        /** @type {?} */
        const layerOptions = ((/** @type {?} */ (this.layer))).data;
        this.layerService
            .createAsyncLayer(layerOptions)
            .subscribe((/**
         * @param {?} layer
         * @return {?}
         */
        layer => this.map.addLayer(layer)));
    }
    /**
     * Emit added change event with added = false
     * @private
     * @return {?}
     */
    removeLayerFromMap() {
        if (this.map === undefined) {
            return;
        }
        if (this.layer.meta.dataType !== LAYER) {
            return undefined;
        }
        /** @type {?} */
        const oLayer = this.map.getLayerById(this.layer.data.sourceOptions.id);
        this.map.removeLayer(oLayer);
    }
}
SearchResultAddButtonComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-search-add-button',
                template: "<button\r\n*ngIf=\"layer.meta.dataType === 'Layer'\"\r\nmat-icon-button\r\ntooltip-position=\"below\"\r\nmatTooltipShowDelay=\"500\"\r\n[matTooltip]=\"(added ? 'igo.geo.catalog.layer.removeFromMap' : 'igo.geo.catalog.layer.addToMap') | translate\"\r\n[color]=\"added ? 'warn' : ''\"\r\n(click)=\"onToggleClick()\">\r\n<mat-icon [svgIcon]=\"added ? 'delete' : 'plus'\"></mat-icon>\r\n</button>",
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];
/** @nocollapse */
SearchResultAddButtonComponent.ctorParameters = () => [
    { type: LayerService }
];
SearchResultAddButtonComponent.propDecorators = {
    layer: [{ type: Input }],
    added: [{ type: Input }],
    map: [{ type: Input }],
    color: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    SearchResultAddButtonComponent.prototype.layer;
    /**
     * Whether the layer is already added to the map
     * @type {?}
     */
    SearchResultAddButtonComponent.prototype.added;
    /**
     * The map to add the search result layer to
     * @type {?}
     */
    SearchResultAddButtonComponent.prototype.map;
    /**
     * @type {?}
     * @private
     */
    SearchResultAddButtonComponent.prototype._color;
    /**
     * @type {?}
     * @private
     */
    SearchResultAddButtonComponent.prototype.layerService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLXJlc3VsdHMtYWRkLWJ1dHRvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvc2VhcmNoL3NlYXJjaC1yZXN1bHRzL3NlYXJjaC1yZXN1bHRzLWFkZC1idXR0b24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSx1QkFBdUIsRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUdsRixPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFOUMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQU92RCxNQUFNLE9BQU8sOEJBQThCOzs7O0lBdUJ6QyxZQUFvQixZQUEwQjtRQUExQixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUZ0QyxXQUFNLEdBQUcsU0FBUyxDQUFDO0lBRXNCLENBQUM7Ozs7SUFUbEQsSUFDSSxLQUFLO1FBQ1AsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3JCLENBQUM7Ozs7O0lBQ0QsSUFBSSxLQUFLLENBQUMsS0FBYTtRQUNyQixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztJQUN0QixDQUFDOzs7OztJQVFELFFBQVE7UUFDTixJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsS0FBSyxPQUFPLEVBQUU7WUFDeEMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxTQUFTOzs7O1lBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEVBQUUsRUFBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1NBQ3JHO0lBQ0gsQ0FBQzs7Ozs7O0lBTUQsYUFBYTtRQUNYLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQzFDLENBQUM7Ozs7O0lBRU8sR0FBRztRQUNULElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUN2QixDQUFDOzs7OztJQUVPLE1BQU07UUFDWixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztJQUM1QixDQUFDOzs7Ozs7SUFLTyxhQUFhO1FBQ25CLElBQUksSUFBSSxDQUFDLEdBQUcsS0FBSyxTQUFTLEVBQUU7WUFDMUIsT0FBTztTQUNSO1FBRUQsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLEtBQUssS0FBSyxFQUFFO1lBQ3RDLE9BQU8sU0FBUyxDQUFDO1NBQ2xCOztjQUVLLFlBQVksR0FBRyxDQUFDLG1CQUFBLElBQUksQ0FBQyxLQUFLLEVBQThCLENBQUMsQ0FBQyxJQUFJO1FBQ3BFLElBQUksQ0FBQyxZQUFZO2FBQ2QsZ0JBQWdCLENBQUMsWUFBWSxDQUFDO2FBQzlCLFNBQVM7Ozs7UUFBQyxLQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFDLENBQUM7SUFDbEQsQ0FBQzs7Ozs7O0lBS08sa0JBQWtCO1FBQ3hCLElBQUksSUFBSSxDQUFDLEdBQUcsS0FBSyxTQUFTLEVBQUU7WUFDMUIsT0FBTztTQUNSO1FBRUQsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLEtBQUssS0FBSyxFQUFFO1lBQ3RDLE9BQU8sU0FBUyxDQUFDO1NBQ2xCOztjQUVLLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDO1FBQ3RFLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQy9CLENBQUM7OztZQXpGRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHVCQUF1QjtnQkFDakMsb1pBQXlEO2dCQUN6RCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTthQUNoRDs7OztZQVBRLFlBQVk7OztvQkFVbEIsS0FBSztvQkFLTCxLQUFLO2tCQUtMLEtBQUs7b0JBRUwsS0FBSzs7OztJQVpOLCtDQUE2Qjs7Ozs7SUFLN0IsK0NBQXdCOzs7OztJQUt4Qiw2Q0FBcUI7Ozs7O0lBU3JCLGdEQUEyQjs7Ozs7SUFFZixzREFBa0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBTZWFyY2hSZXN1bHQgfSBmcm9tICcuLi9zaGFyZWQvc2VhcmNoLmludGVyZmFjZXMnO1xyXG5pbXBvcnQgeyBJZ29NYXAgfSBmcm9tICcuLi8uLi9tYXAvc2hhcmVkL21hcCc7XHJcbmltcG9ydCB7IExheWVyT3B0aW9ucyB9IGZyb20gJy4uLy4uL2xheWVyL3NoYXJlZC9sYXllcnMvbGF5ZXIuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgTGF5ZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vbGF5ZXIvc2hhcmVkL2xheWVyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBMQVlFUiB9IGZyb20gJy4uLy4uL2xheWVyL3NoYXJlZC9sYXllci5lbnVtcyc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2lnby1zZWFyY2gtYWRkLWJ1dHRvbicsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3NlYXJjaC1yZXN1bHRzLWFkZC1idXR0b24uY29tcG9uZW50Lmh0bWwnLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTZWFyY2hSZXN1bHRBZGRCdXR0b25Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cclxuICBASW5wdXQoKSBsYXllcjogU2VhcmNoUmVzdWx0O1xyXG5cclxuICAvKipcclxuICAgKiBXaGV0aGVyIHRoZSBsYXllciBpcyBhbHJlYWR5IGFkZGVkIHRvIHRoZSBtYXBcclxuICAgKi9cclxuICBASW5wdXQoKSBhZGRlZDogYm9vbGVhbjtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIG1hcCB0byBhZGQgdGhlIHNlYXJjaCByZXN1bHQgbGF5ZXIgdG9cclxuICAgKi9cclxuICBASW5wdXQoKSBtYXA6IElnb01hcDtcclxuXHJcbiAgQElucHV0KClcclxuICBnZXQgY29sb3IoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fY29sb3I7XHJcbiAgfVxyXG4gIHNldCBjb2xvcih2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICB0aGlzLl9jb2xvciA9IHZhbHVlO1xyXG4gIH1cclxuICBwcml2YXRlIF9jb2xvciA9ICdwcmltYXJ5JztcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBsYXllclNlcnZpY2U6IExheWVyU2VydmljZSkge31cclxuXHJcbiAgLyoqXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5sYXllci5tZXRhLmRhdGFUeXBlID09PSAnTGF5ZXInKSB7XHJcbiAgICAgIHRoaXMuYWRkZWQgPSB0aGlzLm1hcC5sYXllcnMuZmluZEluZGV4KChsYXkpID0+IGxheS5pZCA9PT0gdGhpcy5sYXllci5kYXRhLnNvdXJjZU9wdGlvbnMuaWQpICE9PSAtMTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE9uIHRvZ2dsZSBidXR0b24gY2xpY2ssIGVtaXQgdGhlIGFkZGVkIGNoYW5nZSBldmVudFxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIG9uVG9nZ2xlQ2xpY2soKSB7XHJcbiAgICB0aGlzLmFkZGVkID8gdGhpcy5yZW1vdmUoKSA6IHRoaXMuYWRkKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGFkZCgpIHtcclxuICAgIHRoaXMuYWRkZWQgPSB0cnVlO1xyXG4gICAgdGhpcy5hZGRMYXllclRvTWFwKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHJlbW92ZSgpIHtcclxuICAgIHRoaXMuYWRkZWQgPSBmYWxzZTtcclxuICAgIHRoaXMucmVtb3ZlTGF5ZXJGcm9tTWFwKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBFbWl0IGFkZGVkIGNoYW5nZSBldmVudCB3aXRoIGFkZGVkID0gdHJ1ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgYWRkTGF5ZXJUb01hcCgpIHtcclxuICAgIGlmICh0aGlzLm1hcCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5sYXllci5tZXRhLmRhdGFUeXBlICE9PSBMQVlFUikge1xyXG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGxheWVyT3B0aW9ucyA9ICh0aGlzLmxheWVyIGFzIFNlYXJjaFJlc3VsdDxMYXllck9wdGlvbnM+KS5kYXRhO1xyXG4gICAgdGhpcy5sYXllclNlcnZpY2VcclxuICAgICAgLmNyZWF0ZUFzeW5jTGF5ZXIobGF5ZXJPcHRpb25zKVxyXG4gICAgICAuc3Vic2NyaWJlKGxheWVyID0+IHRoaXMubWFwLmFkZExheWVyKGxheWVyKSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBFbWl0IGFkZGVkIGNoYW5nZSBldmVudCB3aXRoIGFkZGVkID0gZmFsc2VcclxuICAgKi9cclxuICBwcml2YXRlIHJlbW92ZUxheWVyRnJvbU1hcCgpIHtcclxuICAgIGlmICh0aGlzLm1hcCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5sYXllci5tZXRhLmRhdGFUeXBlICE9PSBMQVlFUikge1xyXG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG9MYXllciA9IHRoaXMubWFwLmdldExheWVyQnlJZCh0aGlzLmxheWVyLmRhdGEuc291cmNlT3B0aW9ucy5pZCk7XHJcbiAgICB0aGlzLm1hcC5yZW1vdmVMYXllcihvTGF5ZXIpO1xyXG4gIH1cclxuXHJcbn1cclxuIl19
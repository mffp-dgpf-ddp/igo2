/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ApplicationRef } from '@angular/core';
import { Layer } from '../../layer/shared';
import { LayerService } from '../../layer/shared/layer.service';
import { IgoMap } from '../shared';
export class MiniBaseMapComponent {
    /**
     * @param {?} layerService
     * @param {?} appRef
     */
    constructor(layerService, appRef) {
        this.layerService = layerService;
        this.appRef = appRef;
        this.basemap = new IgoMap({
            controls: {},
            interactions: false
        });
    }
    /**
     * @return {?}
     */
    get map() {
        return this._map;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set map(value) {
        this._map = value;
        this.handleMoveEnd();
    }
    /**
     * @return {?}
     */
    get baseLayer() {
        return this._baseLayer;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set baseLayer(value) {
        this._baseLayer = value;
        this.handleBaseLayerChanged(value);
    }
    /**
     * @return {?}
     */
    get disabled() {
        return this._disabled;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set disabled(value) {
        this._disabled = value;
    }
    /**
     * @return {?}
     */
    get display() {
        return this._display;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set display(value) {
        this._display = value;
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.map.ol.on('moveend', (/**
         * @return {?}
         */
        () => this.handleMoveEnd()));
        this.handleMoveEnd();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.map.ol.un('moveend', (/**
         * @return {?}
         */
        () => this.handleMoveEnd()));
    }
    /**
     * @param {?} baseLayer
     * @return {?}
     */
    changeBaseLayer(baseLayer) {
        if (this.disabled) {
            return;
        }
        this.map.changeBaseLayer(baseLayer);
        this.appRef.tick();
    }
    /**
     * @private
     * @return {?}
     */
    handleMoveEnd() {
        this.basemap.ol.setView(this.map.ol.getView());
    }
    /**
     * @private
     * @param {?} baselayer
     * @return {?}
     */
    handleBaseLayerChanged(baselayer) {
        this.basemap.removeAllLayers();
        /** @type {?} */
        const options = Object.assign(Object.create(baselayer.options), baselayer.options);
        options.visible = true;
        /** @type {?} */
        const layer = this.layerService.createLayer(options);
        this.basemap.addLayer(layer);
    }
}
MiniBaseMapComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-mini-basemap',
                template: "<div class=\"igo-mini-basemap-container\">\r\n\r\n  <div *ngIf=\"display\" (click)=\"changeBaseLayer(baseLayer)\">\r\n    <igo-map-browser [map]=\"basemap\"></igo-map-browser>\r\n    <div class='igo-mini-basemap-title'>{{baseLayer.title}}</div>\r\n  </div>\r\n\r\n</div>\r\n",
                styles: [".igo-mini-basemap-container{width:calc(40px * 2);height:calc(40px * 2);background-color:rgba(255,255,255,.01);border:2px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,.3);cursor:pointer;margin-top:5px}.igo-mini-basemap-container:hover .igo-mini-basemap-title{color:#000;text-shadow:0 0 5px #fff}.igo-mini-basemap-container>div{width:100%;height:100%}.igo-mini-basemap-title{position:relative;top:-76px;height:76px;width:76px;text-align:center;vertical-align:bottom;color:#fff;text-shadow:0 0 5px #000;white-space:normal;display:flex;align-items:flex-end;justify-content:center}"]
            }] }
];
/** @nocollapse */
MiniBaseMapComponent.ctorParameters = () => [
    { type: LayerService },
    { type: ApplicationRef }
];
MiniBaseMapComponent.propDecorators = {
    map: [{ type: Input }],
    baseLayer: [{ type: Input }],
    disabled: [{ type: Input }],
    display: [{ type: Input }]
};
if (false) {
    /**
     * @type {?}
     * @private
     */
    MiniBaseMapComponent.prototype._map;
    /**
     * @type {?}
     * @private
     */
    MiniBaseMapComponent.prototype._baseLayer;
    /**
     * @type {?}
     * @private
     */
    MiniBaseMapComponent.prototype._disabled;
    /**
     * @type {?}
     * @private
     */
    MiniBaseMapComponent.prototype._display;
    /** @type {?} */
    MiniBaseMapComponent.prototype.basemap;
    /**
     * @type {?}
     * @private
     */
    MiniBaseMapComponent.prototype.layerService;
    /**
     * @type {?}
     * @private
     */
    MiniBaseMapComponent.prototype.appRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWluaS1iYXNlbWFwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9tYXAvYmFzZWxheWVycy1zd2l0Y2hlci9taW5pLWJhc2VtYXAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBNEIsY0FBYyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNGLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUMzQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDaEUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLFdBQVcsQ0FBQztBQU9uQyxNQUFNLE9BQU8sb0JBQW9COzs7OztJQTRDL0IsWUFBb0IsWUFBMEIsRUFBVSxNQUFzQjtRQUExRCxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUFVLFdBQU0sR0FBTixNQUFNLENBQWdCO1FBTHZFLFlBQU8sR0FBRyxJQUFJLE1BQU0sQ0FBQztZQUMxQixRQUFRLEVBQUUsRUFBRTtZQUNaLFlBQVksRUFBRSxLQUFLO1NBQ3BCLENBQUMsQ0FBQztJQUU4RSxDQUFDOzs7O0lBM0NsRixJQUNJLEdBQUc7UUFDTCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDbkIsQ0FBQzs7Ozs7SUFDRCxJQUFJLEdBQUcsQ0FBQyxLQUFhO1FBQ25CLElBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO1FBQ2xCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUN2QixDQUFDOzs7O0lBR0QsSUFDSSxTQUFTO1FBQ1gsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQ3pCLENBQUM7Ozs7O0lBQ0QsSUFBSSxTQUFTLENBQUMsS0FBWTtRQUN4QixJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztRQUN4QixJQUFJLENBQUMsc0JBQXNCLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDckMsQ0FBQzs7OztJQUdELElBQ0ksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN4QixDQUFDOzs7OztJQUNELElBQUksUUFBUSxDQUFDLEtBQWM7UUFDekIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7SUFDekIsQ0FBQzs7OztJQUdELElBQ0ksT0FBTztRQUNULE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN2QixDQUFDOzs7OztJQUNELElBQUksT0FBTyxDQUFDLEtBQWM7UUFDeEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7SUFDeEIsQ0FBQzs7OztJQVVELGVBQWU7UUFDYixJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsU0FBUzs7O1FBQUUsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxFQUFDLENBQUM7UUFDdEQsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7Ozs7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLFNBQVM7OztRQUFFLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsRUFBQyxDQUFDO0lBQ3hELENBQUM7Ozs7O0lBRUQsZUFBZSxDQUFDLFNBQWdCO1FBQzlCLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNqQixPQUFPO1NBQ1I7UUFDRCxJQUFJLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNwQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3JCLENBQUM7Ozs7O0lBRU8sYUFBYTtRQUNuQixJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztJQUNqRCxDQUFDOzs7Ozs7SUFFTyxzQkFBc0IsQ0FBQyxTQUFnQjtRQUM3QyxJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsRUFBRSxDQUFDOztjQUV6QixPQUFPLEdBQVEsTUFBTSxDQUFDLE1BQU0sQ0FDaEMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEVBQ2hDLFNBQVMsQ0FBQyxPQUFPLENBQ2xCO1FBQ0QsT0FBTyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7O2NBRWpCLEtBQUssR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUM7UUFDcEQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDL0IsQ0FBQzs7O1lBbkZGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsa0JBQWtCO2dCQUM1Qiw4UkFBNEM7O2FBRTdDOzs7O1lBUFEsWUFBWTtZQUhnQyxjQUFjOzs7a0JBWWhFLEtBQUs7d0JBVUwsS0FBSzt1QkFVTCxLQUFLO3NCQVNMLEtBQUs7Ozs7Ozs7SUFyQk4sb0NBQXFCOzs7OztJQVVyQiwwQ0FBMEI7Ozs7O0lBUzFCLHlDQUEyQjs7Ozs7SUFTM0Isd0NBQTBCOztJQUUxQix1Q0FHRzs7Ozs7SUFFUyw0Q0FBa0M7Ozs7O0lBQUUsc0NBQThCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95LCBBcHBsaWNhdGlvblJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgTGF5ZXIgfSBmcm9tICcuLi8uLi9sYXllci9zaGFyZWQnO1xyXG5pbXBvcnQgeyBMYXllclNlcnZpY2UgfSBmcm9tICcuLi8uLi9sYXllci9zaGFyZWQvbGF5ZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IElnb01hcCB9IGZyb20gJy4uL3NoYXJlZCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2lnby1taW5pLWJhc2VtYXAnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9taW5pLWJhc2VtYXAuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL21pbmktYmFzZW1hcC5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNaW5pQmFzZU1hcENvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XHJcbiAgQElucHV0KClcclxuICBnZXQgbWFwKCk6IElnb01hcCB7XHJcbiAgICByZXR1cm4gdGhpcy5fbWFwO1xyXG4gIH1cclxuICBzZXQgbWFwKHZhbHVlOiBJZ29NYXApIHtcclxuICAgIHRoaXMuX21hcCA9IHZhbHVlO1xyXG4gICAgdGhpcy5oYW5kbGVNb3ZlRW5kKCk7XHJcbiAgfVxyXG4gIHByaXZhdGUgX21hcDogSWdvTWFwO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIGdldCBiYXNlTGF5ZXIoKTogTGF5ZXIge1xyXG4gICAgcmV0dXJuIHRoaXMuX2Jhc2VMYXllcjtcclxuICB9XHJcbiAgc2V0IGJhc2VMYXllcih2YWx1ZTogTGF5ZXIpIHtcclxuICAgIHRoaXMuX2Jhc2VMYXllciA9IHZhbHVlO1xyXG4gICAgdGhpcy5oYW5kbGVCYXNlTGF5ZXJDaGFuZ2VkKHZhbHVlKTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfYmFzZUxheWVyOiBMYXllcjtcclxuXHJcbiAgQElucHV0KClcclxuICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWQ7XHJcbiAgfVxyXG4gIHNldCBkaXNhYmxlZCh2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgdGhpcy5fZGlzYWJsZWQgPSB2YWx1ZTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfZGlzYWJsZWQ6IGJvb2xlYW47XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IGRpc3BsYXkoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5fZGlzcGxheTtcclxuICB9XHJcbiAgc2V0IGRpc3BsYXkodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMuX2Rpc3BsYXkgPSB2YWx1ZTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfZGlzcGxheTogYm9vbGVhbjtcclxuXHJcbiAgcHVibGljIGJhc2VtYXAgPSBuZXcgSWdvTWFwKHtcclxuICAgIGNvbnRyb2xzOiB7fSxcclxuICAgIGludGVyYWN0aW9uczogZmFsc2VcclxuICB9KTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBsYXllclNlcnZpY2U6IExheWVyU2VydmljZSwgcHJpdmF0ZSBhcHBSZWY6IEFwcGxpY2F0aW9uUmVmKSB7fVxyXG5cclxuICBuZ0FmdGVyVmlld0luaXQoKSB7XHJcbiAgICB0aGlzLm1hcC5vbC5vbignbW92ZWVuZCcsICgpID0+IHRoaXMuaGFuZGxlTW92ZUVuZCgpKTtcclxuICAgIHRoaXMuaGFuZGxlTW92ZUVuZCgpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLm1hcC5vbC51bignbW92ZWVuZCcsICgpID0+IHRoaXMuaGFuZGxlTW92ZUVuZCgpKTtcclxuICB9XHJcblxyXG4gIGNoYW5nZUJhc2VMYXllcihiYXNlTGF5ZXI6IExheWVyKSB7XHJcbiAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB0aGlzLm1hcC5jaGFuZ2VCYXNlTGF5ZXIoYmFzZUxheWVyKTtcclxuICAgIHRoaXMuYXBwUmVmLnRpY2soKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaGFuZGxlTW92ZUVuZCgpIHtcclxuICAgIHRoaXMuYmFzZW1hcC5vbC5zZXRWaWV3KHRoaXMubWFwLm9sLmdldFZpZXcoKSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGhhbmRsZUJhc2VMYXllckNoYW5nZWQoYmFzZWxheWVyOiBMYXllcikge1xyXG4gICAgdGhpcy5iYXNlbWFwLnJlbW92ZUFsbExheWVycygpO1xyXG5cclxuICAgIGNvbnN0IG9wdGlvbnM6IGFueSA9IE9iamVjdC5hc3NpZ24oXHJcbiAgICAgIE9iamVjdC5jcmVhdGUoYmFzZWxheWVyLm9wdGlvbnMpLFxyXG4gICAgICBiYXNlbGF5ZXIub3B0aW9uc1xyXG4gICAgKTtcclxuICAgIG9wdGlvbnMudmlzaWJsZSA9IHRydWU7XHJcblxyXG4gICAgY29uc3QgbGF5ZXIgPSB0aGlzLmxheWVyU2VydmljZS5jcmVhdGVMYXllcihvcHRpb25zKTtcclxuICAgIHRoaXMuYmFzZW1hcC5hZGRMYXllcihsYXllcik7XHJcbiAgfVxyXG59XHJcbiJdfQ==
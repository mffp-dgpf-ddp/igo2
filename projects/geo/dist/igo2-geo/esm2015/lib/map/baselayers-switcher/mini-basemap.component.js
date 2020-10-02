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
        const options = Object.assign(Object.create(baselayer.options), baselayer.options, {
            visible: true,
            baseLayer: false
        });
        /** @type {?} */
        const layer = this.layerService.createLayer(options);
        this.basemap.addLayer(layer);
    }
}
MiniBaseMapComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-mini-basemap',
                template: "<div class=\"igo-mini-basemap-container\">\r\n\r\n  <div *ngIf=\"display\" (click)=\"changeBaseLayer(baseLayer)\">\r\n    <igo-map-browser [map]=\"basemap\"></igo-map-browser>\r\n    <div *ngIf='title' class='igo-mini-basemap-title'> {{title}} </div>\r\n  </div>\r\n\r\n</div>\r\n",
                styles: [".igo-mini-basemap-container{width:calc(40px * 2);height:calc(40px * 2);background-color:rgba(255,255,255,.01);border:2px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,.3);cursor:pointer;margin-top:5px}.igo-mini-basemap-container:hover .igo-mini-basemap-title{color:#000;text-shadow:0 0 5px #fff}.igo-mini-basemap-container>div{width:100%;height:100%}.igo-mini-basemap-title{position:relative;top:-76px;height:76px;width:76px;text-align:center;vertical-align:bottom;color:#fff;text-shadow:0 0 5px #000;white-space:normal;display:-webkit-box;display:flex;-webkit-box-align:end;align-items:flex-end;-webkit-box-pack:center;justify-content:center}"]
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
    display: [{ type: Input }],
    title: [{ type: Input }]
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
    /** @type {?} */
    MiniBaseMapComponent.prototype.title;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWluaS1iYXNlbWFwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9tYXAvYmFzZWxheWVycy1zd2l0Y2hlci9taW5pLWJhc2VtYXAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFHTCxjQUFjLEVBQ2YsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNoRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBT25DLE1BQU0sT0FBTyxvQkFBb0I7Ozs7O0lBOEMvQixZQUNVLFlBQTBCLEVBQzFCLE1BQXNCO1FBRHRCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzFCLFdBQU0sR0FBTixNQUFNLENBQWdCO1FBVHpCLFlBQU8sR0FBRyxJQUFJLE1BQU0sQ0FBQztZQUMxQixRQUFRLEVBQUUsRUFBRTtZQUNaLFlBQVksRUFBRSxLQUFLO1NBQ3BCLENBQUMsQ0FBQztJQU9BLENBQUM7Ozs7SUFoREosSUFDSSxHQUFHO1FBQ0wsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ25CLENBQUM7Ozs7O0lBQ0QsSUFBSSxHQUFHLENBQUMsS0FBYTtRQUNuQixJQUFJLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztRQUNsQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDdkIsQ0FBQzs7OztJQUdELElBQ0ksU0FBUztRQUNYLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUN6QixDQUFDOzs7OztJQUNELElBQUksU0FBUyxDQUFDLEtBQVk7UUFDeEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7UUFDeEIsSUFBSSxDQUFDLHNCQUFzQixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3JDLENBQUM7Ozs7SUFHRCxJQUNJLFFBQVE7UUFDVixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDeEIsQ0FBQzs7Ozs7SUFDRCxJQUFJLFFBQVEsQ0FBQyxLQUFjO1FBQ3pCLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO0lBQ3pCLENBQUM7Ozs7SUFHRCxJQUNJLE9BQU87UUFDVCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQzs7Ozs7SUFDRCxJQUFJLE9BQU8sQ0FBQyxLQUFjO1FBQ3hCLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO0lBQ3hCLENBQUM7Ozs7SUFlRCxlQUFlO1FBQ2IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLFNBQVM7OztRQUFFLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsRUFBQyxDQUFDO1FBQ3RELElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUN2QixDQUFDOzs7O0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxTQUFTOzs7UUFBRSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLEVBQUMsQ0FBQztJQUN4RCxDQUFDOzs7OztJQUVELGVBQWUsQ0FBQyxTQUFnQjtRQUM5QixJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDakIsT0FBTztTQUNSO1FBQ0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDcEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNyQixDQUFDOzs7OztJQUVPLGFBQWE7UUFDbkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7SUFDakQsQ0FBQzs7Ozs7O0lBRU8sc0JBQXNCLENBQUMsU0FBZ0I7UUFDN0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLEVBQUUsQ0FBQzs7Y0FFekIsT0FBTyxHQUFRLE1BQU0sQ0FBQyxNQUFNLENBQ2hDLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxFQUNoQyxTQUFTLENBQUMsT0FBTyxFQUNqQjtZQUNFLE9BQU8sRUFBRSxJQUFJO1lBQ2IsU0FBUyxFQUFFLEtBQUs7U0FDakIsQ0FDRjs7Y0FFSyxLQUFLLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDO1FBQ3BELElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQy9CLENBQUM7OztZQTNGRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGtCQUFrQjtnQkFDNUIsb1NBQTRDOzthQUU3Qzs7OztZQVBRLFlBQVk7WUFKbkIsY0FBYzs7O2tCQWFiLEtBQUs7d0JBVUwsS0FBSzt1QkFVTCxLQUFLO3NCQVNMLEtBQUs7b0JBY0wsS0FBSzs7Ozs7OztJQW5DTixvQ0FBcUI7Ozs7O0lBVXJCLDBDQUEwQjs7Ozs7SUFTMUIseUNBQTJCOzs7OztJQVMzQix3Q0FBMEI7O0lBRTFCLHVDQUdHOztJQUVILHFDQUF1Qjs7Ozs7SUFHckIsNENBQWtDOzs7OztJQUNsQyxzQ0FBOEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBJbnB1dCxcclxuICBBZnRlclZpZXdJbml0LFxyXG4gIE9uRGVzdHJveSxcclxuICBBcHBsaWNhdGlvblJlZlxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgTGF5ZXIgfSBmcm9tICcuLi8uLi9sYXllci9zaGFyZWQnO1xyXG5pbXBvcnQgeyBMYXllclNlcnZpY2UgfSBmcm9tICcuLi8uLi9sYXllci9zaGFyZWQvbGF5ZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IElnb01hcCB9IGZyb20gJy4uL3NoYXJlZCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2lnby1taW5pLWJhc2VtYXAnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9taW5pLWJhc2VtYXAuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL21pbmktYmFzZW1hcC5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNaW5pQmFzZU1hcENvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XHJcbiAgQElucHV0KClcclxuICBnZXQgbWFwKCk6IElnb01hcCB7XHJcbiAgICByZXR1cm4gdGhpcy5fbWFwO1xyXG4gIH1cclxuICBzZXQgbWFwKHZhbHVlOiBJZ29NYXApIHtcclxuICAgIHRoaXMuX21hcCA9IHZhbHVlO1xyXG4gICAgdGhpcy5oYW5kbGVNb3ZlRW5kKCk7XHJcbiAgfVxyXG4gIHByaXZhdGUgX21hcDogSWdvTWFwO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIGdldCBiYXNlTGF5ZXIoKTogTGF5ZXIge1xyXG4gICAgcmV0dXJuIHRoaXMuX2Jhc2VMYXllcjtcclxuICB9XHJcbiAgc2V0IGJhc2VMYXllcih2YWx1ZTogTGF5ZXIpIHtcclxuICAgIHRoaXMuX2Jhc2VMYXllciA9IHZhbHVlO1xyXG4gICAgdGhpcy5oYW5kbGVCYXNlTGF5ZXJDaGFuZ2VkKHZhbHVlKTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfYmFzZUxheWVyOiBMYXllcjtcclxuXHJcbiAgQElucHV0KClcclxuICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWQ7XHJcbiAgfVxyXG4gIHNldCBkaXNhYmxlZCh2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgdGhpcy5fZGlzYWJsZWQgPSB2YWx1ZTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfZGlzYWJsZWQ6IGJvb2xlYW47XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IGRpc3BsYXkoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5fZGlzcGxheTtcclxuICB9XHJcbiAgc2V0IGRpc3BsYXkodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMuX2Rpc3BsYXkgPSB2YWx1ZTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfZGlzcGxheTogYm9vbGVhbjtcclxuXHJcbiAgcHVibGljIGJhc2VtYXAgPSBuZXcgSWdvTWFwKHtcclxuICAgIGNvbnRyb2xzOiB7fSxcclxuICAgIGludGVyYWN0aW9uczogZmFsc2VcclxuICB9KTtcclxuXHJcbiAgQElucHV0KCkgdGl0bGU6IHN0cmluZztcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGxheWVyU2VydmljZTogTGF5ZXJTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBhcHBSZWY6IEFwcGxpY2F0aW9uUmVmXHJcbiAgKSB7fVxyXG5cclxuICBuZ0FmdGVyVmlld0luaXQoKSB7XHJcbiAgICB0aGlzLm1hcC5vbC5vbignbW92ZWVuZCcsICgpID0+IHRoaXMuaGFuZGxlTW92ZUVuZCgpKTtcclxuICAgIHRoaXMuaGFuZGxlTW92ZUVuZCgpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLm1hcC5vbC51bignbW92ZWVuZCcsICgpID0+IHRoaXMuaGFuZGxlTW92ZUVuZCgpKTtcclxuICB9XHJcblxyXG4gIGNoYW5nZUJhc2VMYXllcihiYXNlTGF5ZXI6IExheWVyKSB7XHJcbiAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB0aGlzLm1hcC5jaGFuZ2VCYXNlTGF5ZXIoYmFzZUxheWVyKTtcclxuICAgIHRoaXMuYXBwUmVmLnRpY2soKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaGFuZGxlTW92ZUVuZCgpIHtcclxuICAgIHRoaXMuYmFzZW1hcC5vbC5zZXRWaWV3KHRoaXMubWFwLm9sLmdldFZpZXcoKSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGhhbmRsZUJhc2VMYXllckNoYW5nZWQoYmFzZWxheWVyOiBMYXllcikge1xyXG4gICAgdGhpcy5iYXNlbWFwLnJlbW92ZUFsbExheWVycygpO1xyXG5cclxuICAgIGNvbnN0IG9wdGlvbnM6IGFueSA9IE9iamVjdC5hc3NpZ24oXHJcbiAgICAgIE9iamVjdC5jcmVhdGUoYmFzZWxheWVyLm9wdGlvbnMpLFxyXG4gICAgICBiYXNlbGF5ZXIub3B0aW9ucyxcclxuICAgICAge1xyXG4gICAgICAgIHZpc2libGU6IHRydWUsXHJcbiAgICAgICAgYmFzZUxheWVyOiBmYWxzZVxyXG4gICAgICB9XHJcbiAgICApO1xyXG5cclxuICAgIGNvbnN0IGxheWVyID0gdGhpcy5sYXllclNlcnZpY2UuY3JlYXRlTGF5ZXIob3B0aW9ucyk7XHJcbiAgICB0aGlzLmJhc2VtYXAuYWRkTGF5ZXIobGF5ZXIpO1xyXG4gIH1cclxufVxyXG4iXX0=
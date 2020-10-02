/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ApplicationRef } from '@angular/core';
import { Layer } from '../../layer/shared';
import { LayerService } from '../../layer/shared/layer.service';
import { IgoMap } from '../shared';
var MiniBaseMapComponent = /** @class */ (function () {
    function MiniBaseMapComponent(layerService, appRef) {
        this.layerService = layerService;
        this.appRef = appRef;
        this.basemap = new IgoMap({
            controls: {},
            interactions: false
        });
    }
    Object.defineProperty(MiniBaseMapComponent.prototype, "map", {
        get: /**
         * @return {?}
         */
        function () {
            return this._map;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._map = value;
            this.handleMoveEnd();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MiniBaseMapComponent.prototype, "baseLayer", {
        get: /**
         * @return {?}
         */
        function () {
            return this._baseLayer;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._baseLayer = value;
            this.handleBaseLayerChanged(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MiniBaseMapComponent.prototype, "disabled", {
        get: /**
         * @return {?}
         */
        function () {
            return this._disabled;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._disabled = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MiniBaseMapComponent.prototype, "display", {
        get: /**
         * @return {?}
         */
        function () {
            return this._display;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._display = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    MiniBaseMapComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.map.ol.on('moveend', (/**
         * @return {?}
         */
        function () { return _this.handleMoveEnd(); }));
        this.handleMoveEnd();
    };
    /**
     * @return {?}
     */
    MiniBaseMapComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.map.ol.un('moveend', (/**
         * @return {?}
         */
        function () { return _this.handleMoveEnd(); }));
    };
    /**
     * @param {?} baseLayer
     * @return {?}
     */
    MiniBaseMapComponent.prototype.changeBaseLayer = /**
     * @param {?} baseLayer
     * @return {?}
     */
    function (baseLayer) {
        if (this.disabled) {
            return;
        }
        this.map.changeBaseLayer(baseLayer);
        this.appRef.tick();
    };
    /**
     * @private
     * @return {?}
     */
    MiniBaseMapComponent.prototype.handleMoveEnd = /**
     * @private
     * @return {?}
     */
    function () {
        this.basemap.ol.setView(this.map.ol.getView());
    };
    /**
     * @private
     * @param {?} baselayer
     * @return {?}
     */
    MiniBaseMapComponent.prototype.handleBaseLayerChanged = /**
     * @private
     * @param {?} baselayer
     * @return {?}
     */
    function (baselayer) {
        this.basemap.removeAllLayers();
        /** @type {?} */
        var options = Object.assign(Object.create(baselayer.options), baselayer.options, {
            visible: true,
            baseLayer: false
        });
        /** @type {?} */
        var layer = this.layerService.createLayer(options);
        this.basemap.addLayer(layer);
    };
    MiniBaseMapComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-mini-basemap',
                    template: "<div class=\"igo-mini-basemap-container\">\r\n\r\n  <div *ngIf=\"display\" (click)=\"changeBaseLayer(baseLayer)\">\r\n    <igo-map-browser [map]=\"basemap\"></igo-map-browser>\r\n    <div *ngIf='title' class='igo-mini-basemap-title'> {{title}} </div>\r\n  </div>\r\n\r\n</div>\r\n",
                    styles: [".igo-mini-basemap-container{width:calc(40px * 2);height:calc(40px * 2);background-color:rgba(255,255,255,.01);border:2px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,.3);cursor:pointer;margin-top:5px}.igo-mini-basemap-container:hover .igo-mini-basemap-title{color:#000;text-shadow:0 0 5px #fff}.igo-mini-basemap-container>div{width:100%;height:100%}.igo-mini-basemap-title{position:relative;top:-76px;height:76px;width:76px;text-align:center;vertical-align:bottom;color:#fff;text-shadow:0 0 5px #000;white-space:normal;display:-webkit-box;display:flex;-webkit-box-align:end;align-items:flex-end;-webkit-box-pack:center;justify-content:center}"]
                }] }
    ];
    /** @nocollapse */
    MiniBaseMapComponent.ctorParameters = function () { return [
        { type: LayerService },
        { type: ApplicationRef }
    ]; };
    MiniBaseMapComponent.propDecorators = {
        map: [{ type: Input }],
        baseLayer: [{ type: Input }],
        disabled: [{ type: Input }],
        display: [{ type: Input }],
        title: [{ type: Input }]
    };
    return MiniBaseMapComponent;
}());
export { MiniBaseMapComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWluaS1iYXNlbWFwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9tYXAvYmFzZWxheWVycy1zd2l0Y2hlci9taW5pLWJhc2VtYXAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFHTCxjQUFjLEVBQ2YsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNoRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBRW5DO0lBbURFLDhCQUNVLFlBQTBCLEVBQzFCLE1BQXNCO1FBRHRCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzFCLFdBQU0sR0FBTixNQUFNLENBQWdCO1FBVHpCLFlBQU8sR0FBRyxJQUFJLE1BQU0sQ0FBQztZQUMxQixRQUFRLEVBQUUsRUFBRTtZQUNaLFlBQVksRUFBRSxLQUFLO1NBQ3BCLENBQUMsQ0FBQztJQU9BLENBQUM7SUFoREosc0JBQ0kscUNBQUc7Ozs7UUFEUDtZQUVFLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQztRQUNuQixDQUFDOzs7OztRQUNELFVBQVEsS0FBYTtZQUNuQixJQUFJLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztZQUNsQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDdkIsQ0FBQzs7O09BSkE7SUFPRCxzQkFDSSwyQ0FBUzs7OztRQURiO1lBRUUsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQ3pCLENBQUM7Ozs7O1FBQ0QsVUFBYyxLQUFZO1lBQ3hCLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1lBQ3hCLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNyQyxDQUFDOzs7T0FKQTtJQU9ELHNCQUNJLDBDQUFROzs7O1FBRFo7WUFFRSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDeEIsQ0FBQzs7Ozs7UUFDRCxVQUFhLEtBQWM7WUFDekIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDekIsQ0FBQzs7O09BSEE7SUFNRCxzQkFDSSx5Q0FBTzs7OztRQURYO1lBRUUsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ3ZCLENBQUM7Ozs7O1FBQ0QsVUFBWSxLQUFjO1lBQ3hCLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLENBQUM7OztPQUhBOzs7O0lBa0JELDhDQUFlOzs7SUFBZjtRQUFBLGlCQUdDO1FBRkMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLFNBQVM7OztRQUFFLGNBQU0sT0FBQSxLQUFJLENBQUMsYUFBYSxFQUFFLEVBQXBCLENBQW9CLEVBQUMsQ0FBQztRQUN0RCxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDdkIsQ0FBQzs7OztJQUVELDBDQUFXOzs7SUFBWDtRQUFBLGlCQUVDO1FBREMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLFNBQVM7OztRQUFFLGNBQU0sT0FBQSxLQUFJLENBQUMsYUFBYSxFQUFFLEVBQXBCLENBQW9CLEVBQUMsQ0FBQztJQUN4RCxDQUFDOzs7OztJQUVELDhDQUFlOzs7O0lBQWYsVUFBZ0IsU0FBZ0I7UUFDOUIsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2pCLE9BQU87U0FDUjtRQUNELElBQUksQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDckIsQ0FBQzs7Ozs7SUFFTyw0Q0FBYTs7OztJQUFyQjtRQUNFLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO0lBQ2pELENBQUM7Ozs7OztJQUVPLHFEQUFzQjs7Ozs7SUFBOUIsVUFBK0IsU0FBZ0I7UUFDN0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLEVBQUUsQ0FBQzs7WUFFekIsT0FBTyxHQUFRLE1BQU0sQ0FBQyxNQUFNLENBQ2hDLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxFQUNoQyxTQUFTLENBQUMsT0FBTyxFQUNqQjtZQUNFLE9BQU8sRUFBRSxJQUFJO1lBQ2IsU0FBUyxFQUFFLEtBQUs7U0FDakIsQ0FDRjs7WUFFSyxLQUFLLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDO1FBQ3BELElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQy9CLENBQUM7O2dCQTNGRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGtCQUFrQjtvQkFDNUIsb1NBQTRDOztpQkFFN0M7Ozs7Z0JBUFEsWUFBWTtnQkFKbkIsY0FBYzs7O3NCQWFiLEtBQUs7NEJBVUwsS0FBSzsyQkFVTCxLQUFLOzBCQVNMLEtBQUs7d0JBY0wsS0FBSzs7SUEyQ1IsMkJBQUM7Q0FBQSxBQTVGRCxJQTRGQztTQXZGWSxvQkFBb0I7Ozs7OztJQVMvQixvQ0FBcUI7Ozs7O0lBVXJCLDBDQUEwQjs7Ozs7SUFTMUIseUNBQTJCOzs7OztJQVMzQix3Q0FBMEI7O0lBRTFCLHVDQUdHOztJQUVILHFDQUF1Qjs7Ozs7SUFHckIsNENBQWtDOzs7OztJQUNsQyxzQ0FBOEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBJbnB1dCxcclxuICBBZnRlclZpZXdJbml0LFxyXG4gIE9uRGVzdHJveSxcclxuICBBcHBsaWNhdGlvblJlZlxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgTGF5ZXIgfSBmcm9tICcuLi8uLi9sYXllci9zaGFyZWQnO1xyXG5pbXBvcnQgeyBMYXllclNlcnZpY2UgfSBmcm9tICcuLi8uLi9sYXllci9zaGFyZWQvbGF5ZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IElnb01hcCB9IGZyb20gJy4uL3NoYXJlZCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2lnby1taW5pLWJhc2VtYXAnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9taW5pLWJhc2VtYXAuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL21pbmktYmFzZW1hcC5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNaW5pQmFzZU1hcENvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XHJcbiAgQElucHV0KClcclxuICBnZXQgbWFwKCk6IElnb01hcCB7XHJcbiAgICByZXR1cm4gdGhpcy5fbWFwO1xyXG4gIH1cclxuICBzZXQgbWFwKHZhbHVlOiBJZ29NYXApIHtcclxuICAgIHRoaXMuX21hcCA9IHZhbHVlO1xyXG4gICAgdGhpcy5oYW5kbGVNb3ZlRW5kKCk7XHJcbiAgfVxyXG4gIHByaXZhdGUgX21hcDogSWdvTWFwO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIGdldCBiYXNlTGF5ZXIoKTogTGF5ZXIge1xyXG4gICAgcmV0dXJuIHRoaXMuX2Jhc2VMYXllcjtcclxuICB9XHJcbiAgc2V0IGJhc2VMYXllcih2YWx1ZTogTGF5ZXIpIHtcclxuICAgIHRoaXMuX2Jhc2VMYXllciA9IHZhbHVlO1xyXG4gICAgdGhpcy5oYW5kbGVCYXNlTGF5ZXJDaGFuZ2VkKHZhbHVlKTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfYmFzZUxheWVyOiBMYXllcjtcclxuXHJcbiAgQElucHV0KClcclxuICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWQ7XHJcbiAgfVxyXG4gIHNldCBkaXNhYmxlZCh2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgdGhpcy5fZGlzYWJsZWQgPSB2YWx1ZTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfZGlzYWJsZWQ6IGJvb2xlYW47XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IGRpc3BsYXkoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5fZGlzcGxheTtcclxuICB9XHJcbiAgc2V0IGRpc3BsYXkodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMuX2Rpc3BsYXkgPSB2YWx1ZTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfZGlzcGxheTogYm9vbGVhbjtcclxuXHJcbiAgcHVibGljIGJhc2VtYXAgPSBuZXcgSWdvTWFwKHtcclxuICAgIGNvbnRyb2xzOiB7fSxcclxuICAgIGludGVyYWN0aW9uczogZmFsc2VcclxuICB9KTtcclxuXHJcbiAgQElucHV0KCkgdGl0bGU6IHN0cmluZztcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGxheWVyU2VydmljZTogTGF5ZXJTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBhcHBSZWY6IEFwcGxpY2F0aW9uUmVmXHJcbiAgKSB7fVxyXG5cclxuICBuZ0FmdGVyVmlld0luaXQoKSB7XHJcbiAgICB0aGlzLm1hcC5vbC5vbignbW92ZWVuZCcsICgpID0+IHRoaXMuaGFuZGxlTW92ZUVuZCgpKTtcclxuICAgIHRoaXMuaGFuZGxlTW92ZUVuZCgpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLm1hcC5vbC51bignbW92ZWVuZCcsICgpID0+IHRoaXMuaGFuZGxlTW92ZUVuZCgpKTtcclxuICB9XHJcblxyXG4gIGNoYW5nZUJhc2VMYXllcihiYXNlTGF5ZXI6IExheWVyKSB7XHJcbiAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB0aGlzLm1hcC5jaGFuZ2VCYXNlTGF5ZXIoYmFzZUxheWVyKTtcclxuICAgIHRoaXMuYXBwUmVmLnRpY2soKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaGFuZGxlTW92ZUVuZCgpIHtcclxuICAgIHRoaXMuYmFzZW1hcC5vbC5zZXRWaWV3KHRoaXMubWFwLm9sLmdldFZpZXcoKSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGhhbmRsZUJhc2VMYXllckNoYW5nZWQoYmFzZWxheWVyOiBMYXllcikge1xyXG4gICAgdGhpcy5iYXNlbWFwLnJlbW92ZUFsbExheWVycygpO1xyXG5cclxuICAgIGNvbnN0IG9wdGlvbnM6IGFueSA9IE9iamVjdC5hc3NpZ24oXHJcbiAgICAgIE9iamVjdC5jcmVhdGUoYmFzZWxheWVyLm9wdGlvbnMpLFxyXG4gICAgICBiYXNlbGF5ZXIub3B0aW9ucyxcclxuICAgICAge1xyXG4gICAgICAgIHZpc2libGU6IHRydWUsXHJcbiAgICAgICAgYmFzZUxheWVyOiBmYWxzZVxyXG4gICAgICB9XHJcbiAgICApO1xyXG5cclxuICAgIGNvbnN0IGxheWVyID0gdGhpcy5sYXllclNlcnZpY2UuY3JlYXRlTGF5ZXIob3B0aW9ucyk7XHJcbiAgICB0aGlzLmJhc2VtYXAuYWRkTGF5ZXIobGF5ZXIpO1xyXG4gIH1cclxufVxyXG4iXX0=
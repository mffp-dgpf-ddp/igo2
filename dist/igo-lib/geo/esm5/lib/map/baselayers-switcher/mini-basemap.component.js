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
        var options = Object.assign(Object.create(baselayer.options), baselayer.options);
        options.visible = true;
        /** @type {?} */
        var layer = this.layerService.createLayer(options);
        this.basemap.addLayer(layer);
    };
    MiniBaseMapComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-mini-basemap',
                    template: "<div class=\"igo-mini-basemap-container\">\r\n\r\n  <div *ngIf=\"display\" (click)=\"changeBaseLayer(baseLayer)\">\r\n    <igo-map-browser [map]=\"basemap\"></igo-map-browser>\r\n    <div class='igo-mini-basemap-title'>{{baseLayer.title}}</div>\r\n  </div>\r\n\r\n</div>\r\n",
                    styles: [".igo-mini-basemap-container{width:calc(40px * 2);height:calc(40px * 2);background-color:rgba(255,255,255,.01);border:2px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,.3);cursor:pointer;margin-top:5px}.igo-mini-basemap-container:hover .igo-mini-basemap-title{color:#000;text-shadow:0 0 5px #fff}.igo-mini-basemap-container>div{width:100%;height:100%}.igo-mini-basemap-title{position:relative;top:-76px;height:76px;width:76px;text-align:center;vertical-align:bottom;color:#fff;text-shadow:0 0 5px #000;white-space:normal;display:flex;align-items:flex-end;justify-content:center}"]
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
        display: [{ type: Input }]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWluaS1iYXNlbWFwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9tYXAvYmFzZWxheWVycy1zd2l0Y2hlci9taW5pLWJhc2VtYXAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBNEIsY0FBYyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNGLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUMzQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDaEUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUVuQztJQWlERSw4QkFBb0IsWUFBMEIsRUFBVSxNQUFzQjtRQUExRCxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUFVLFdBQU0sR0FBTixNQUFNLENBQWdCO1FBTHZFLFlBQU8sR0FBRyxJQUFJLE1BQU0sQ0FBQztZQUMxQixRQUFRLEVBQUUsRUFBRTtZQUNaLFlBQVksRUFBRSxLQUFLO1NBQ3BCLENBQUMsQ0FBQztJQUU4RSxDQUFDO0lBM0NsRixzQkFDSSxxQ0FBRzs7OztRQURQO1lBRUUsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ25CLENBQUM7Ozs7O1FBQ0QsVUFBUSxLQUFhO1lBQ25CLElBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO1lBQ2xCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUN2QixDQUFDOzs7T0FKQTtJQU9ELHNCQUNJLDJDQUFTOzs7O1FBRGI7WUFFRSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDekIsQ0FBQzs7Ozs7UUFDRCxVQUFjLEtBQVk7WUFDeEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7WUFDeEIsSUFBSSxDQUFDLHNCQUFzQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3JDLENBQUM7OztPQUpBO0lBT0Qsc0JBQ0ksMENBQVE7Ozs7UUFEWjtZQUVFLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUN4QixDQUFDOzs7OztRQUNELFVBQWEsS0FBYztZQUN6QixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUN6QixDQUFDOzs7T0FIQTtJQU1ELHNCQUNJLHlDQUFPOzs7O1FBRFg7WUFFRSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDdkIsQ0FBQzs7Ozs7UUFDRCxVQUFZLEtBQWM7WUFDeEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFDeEIsQ0FBQzs7O09BSEE7Ozs7SUFhRCw4Q0FBZTs7O0lBQWY7UUFBQSxpQkFHQztRQUZDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxTQUFTOzs7UUFBRSxjQUFNLE9BQUEsS0FBSSxDQUFDLGFBQWEsRUFBRSxFQUFwQixDQUFvQixFQUFDLENBQUM7UUFDdEQsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7Ozs7SUFFRCwwQ0FBVzs7O0lBQVg7UUFBQSxpQkFFQztRQURDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxTQUFTOzs7UUFBRSxjQUFNLE9BQUEsS0FBSSxDQUFDLGFBQWEsRUFBRSxFQUFwQixDQUFvQixFQUFDLENBQUM7SUFDeEQsQ0FBQzs7Ozs7SUFFRCw4Q0FBZTs7OztJQUFmLFVBQWdCLFNBQWdCO1FBQzlCLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNqQixPQUFPO1NBQ1I7UUFDRCxJQUFJLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNwQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3JCLENBQUM7Ozs7O0lBRU8sNENBQWE7Ozs7SUFBckI7UUFDRSxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztJQUNqRCxDQUFDOzs7Ozs7SUFFTyxxREFBc0I7Ozs7O0lBQTlCLFVBQStCLFNBQWdCO1FBQzdDLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxFQUFFLENBQUM7O1lBRXpCLE9BQU8sR0FBUSxNQUFNLENBQUMsTUFBTSxDQUNoQyxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsRUFDaEMsU0FBUyxDQUFDLE9BQU8sQ0FDbEI7UUFDRCxPQUFPLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQzs7WUFFakIsS0FBSyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQztRQUNwRCxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMvQixDQUFDOztnQkFuRkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxrQkFBa0I7b0JBQzVCLDhSQUE0Qzs7aUJBRTdDOzs7O2dCQVBRLFlBQVk7Z0JBSGdDLGNBQWM7OztzQkFZaEUsS0FBSzs0QkFVTCxLQUFLOzJCQVVMLEtBQUs7MEJBU0wsS0FBSzs7SUFpRFIsMkJBQUM7Q0FBQSxBQXBGRCxJQW9GQztTQS9FWSxvQkFBb0I7Ozs7OztJQVMvQixvQ0FBcUI7Ozs7O0lBVXJCLDBDQUEwQjs7Ozs7SUFTMUIseUNBQTJCOzs7OztJQVMzQix3Q0FBMEI7O0lBRTFCLHVDQUdHOzs7OztJQUVTLDRDQUFrQzs7Ozs7SUFBRSxzQ0FBOEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3ksIEFwcGxpY2F0aW9uUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBMYXllciB9IGZyb20gJy4uLy4uL2xheWVyL3NoYXJlZCc7XHJcbmltcG9ydCB7IExheWVyU2VydmljZSB9IGZyb20gJy4uLy4uL2xheWVyL3NoYXJlZC9sYXllci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgSWdvTWFwIH0gZnJvbSAnLi4vc2hhcmVkJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaWdvLW1pbmktYmFzZW1hcCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL21pbmktYmFzZW1hcC5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vbWluaS1iYXNlbWFwLmNvbXBvbmVudC5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIE1pbmlCYXNlTWFwQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcclxuICBASW5wdXQoKVxyXG4gIGdldCBtYXAoKTogSWdvTWFwIHtcclxuICAgIHJldHVybiB0aGlzLl9tYXA7XHJcbiAgfVxyXG4gIHNldCBtYXAodmFsdWU6IElnb01hcCkge1xyXG4gICAgdGhpcy5fbWFwID0gdmFsdWU7XHJcbiAgICB0aGlzLmhhbmRsZU1vdmVFbmQoKTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfbWFwOiBJZ29NYXA7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IGJhc2VMYXllcigpOiBMYXllciB7XHJcbiAgICByZXR1cm4gdGhpcy5fYmFzZUxheWVyO1xyXG4gIH1cclxuICBzZXQgYmFzZUxheWVyKHZhbHVlOiBMYXllcikge1xyXG4gICAgdGhpcy5fYmFzZUxheWVyID0gdmFsdWU7XHJcbiAgICB0aGlzLmhhbmRsZUJhc2VMYXllckNoYW5nZWQodmFsdWUpO1xyXG4gIH1cclxuICBwcml2YXRlIF9iYXNlTGF5ZXI6IExheWVyO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLl9kaXNhYmxlZDtcclxuICB9XHJcbiAgc2V0IGRpc2FibGVkKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLl9kaXNhYmxlZCA9IHZhbHVlO1xyXG4gIH1cclxuICBwcml2YXRlIF9kaXNhYmxlZDogYm9vbGVhbjtcclxuXHJcbiAgQElucHV0KClcclxuICBnZXQgZGlzcGxheSgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLl9kaXNwbGF5O1xyXG4gIH1cclxuICBzZXQgZGlzcGxheSh2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgdGhpcy5fZGlzcGxheSA9IHZhbHVlO1xyXG4gIH1cclxuICBwcml2YXRlIF9kaXNwbGF5OiBib29sZWFuO1xyXG5cclxuICBwdWJsaWMgYmFzZW1hcCA9IG5ldyBJZ29NYXAoe1xyXG4gICAgY29udHJvbHM6IHt9LFxyXG4gICAgaW50ZXJhY3Rpb25zOiBmYWxzZVxyXG4gIH0pO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGxheWVyU2VydmljZTogTGF5ZXJTZXJ2aWNlLCBwcml2YXRlIGFwcFJlZjogQXBwbGljYXRpb25SZWYpIHt9XHJcblxyXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcclxuICAgIHRoaXMubWFwLm9sLm9uKCdtb3ZlZW5kJywgKCkgPT4gdGhpcy5oYW5kbGVNb3ZlRW5kKCkpO1xyXG4gICAgdGhpcy5oYW5kbGVNb3ZlRW5kKCk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMubWFwLm9sLnVuKCdtb3ZlZW5kJywgKCkgPT4gdGhpcy5oYW5kbGVNb3ZlRW5kKCkpO1xyXG4gIH1cclxuXHJcbiAgY2hhbmdlQmFzZUxheWVyKGJhc2VMYXllcjogTGF5ZXIpIHtcclxuICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHRoaXMubWFwLmNoYW5nZUJhc2VMYXllcihiYXNlTGF5ZXIpO1xyXG4gICAgdGhpcy5hcHBSZWYudGljaygpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBoYW5kbGVNb3ZlRW5kKCkge1xyXG4gICAgdGhpcy5iYXNlbWFwLm9sLnNldFZpZXcodGhpcy5tYXAub2wuZ2V0VmlldygpKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaGFuZGxlQmFzZUxheWVyQ2hhbmdlZChiYXNlbGF5ZXI6IExheWVyKSB7XHJcbiAgICB0aGlzLmJhc2VtYXAucmVtb3ZlQWxsTGF5ZXJzKCk7XHJcblxyXG4gICAgY29uc3Qgb3B0aW9uczogYW55ID0gT2JqZWN0LmFzc2lnbihcclxuICAgICAgT2JqZWN0LmNyZWF0ZShiYXNlbGF5ZXIub3B0aW9ucyksXHJcbiAgICAgIGJhc2VsYXllci5vcHRpb25zXHJcbiAgICApO1xyXG4gICAgb3B0aW9ucy52aXNpYmxlID0gdHJ1ZTtcclxuXHJcbiAgICBjb25zdCBsYXllciA9IHRoaXMubGF5ZXJTZXJ2aWNlLmNyZWF0ZUxheWVyKG9wdGlvbnMpO1xyXG4gICAgdGhpcy5iYXNlbWFwLmFkZExheWVyKGxheWVyKTtcclxuICB9XHJcbn1cclxuIl19
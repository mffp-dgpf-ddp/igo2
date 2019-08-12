/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { Layer } from '../../layer/shared';
import { LayerService } from '../../layer/shared/layer.service';
import { IgoMap } from '../shared';
var MiniBaseMapComponent = /** @class */ (function () {
    function MiniBaseMapComponent(layerService) {
        this.layerService = layerService;
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
        { type: LayerService }
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
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWluaS1iYXNlbWFwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9tYXAvYmFzZWxheWVycy1zd2l0Y2hlci9taW5pLWJhc2VtYXAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBNEIsTUFBTSxlQUFlLENBQUM7QUFFM0UsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNoRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBRW5DO0lBaURFLDhCQUFvQixZQUEwQjtRQUExQixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUx2QyxZQUFPLEdBQUcsSUFBSSxNQUFNLENBQUM7WUFDMUIsUUFBUSxFQUFFLEVBQUU7WUFDWixZQUFZLEVBQUUsS0FBSztTQUNwQixDQUFDLENBQUM7SUFFOEMsQ0FBQztJQTNDbEQsc0JBQ0kscUNBQUc7Ozs7UUFEUDtZQUVFLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQztRQUNuQixDQUFDOzs7OztRQUNELFVBQVEsS0FBYTtZQUNuQixJQUFJLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztZQUNsQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDdkIsQ0FBQzs7O09BSkE7SUFPRCxzQkFDSSwyQ0FBUzs7OztRQURiO1lBRUUsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQ3pCLENBQUM7Ozs7O1FBQ0QsVUFBYyxLQUFZO1lBQ3hCLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1lBQ3hCLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNyQyxDQUFDOzs7T0FKQTtJQU9ELHNCQUNJLDBDQUFROzs7O1FBRFo7WUFFRSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDeEIsQ0FBQzs7Ozs7UUFDRCxVQUFhLEtBQWM7WUFDekIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDekIsQ0FBQzs7O09BSEE7SUFNRCxzQkFDSSx5Q0FBTzs7OztRQURYO1lBRUUsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ3ZCLENBQUM7Ozs7O1FBQ0QsVUFBWSxLQUFjO1lBQ3hCLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLENBQUM7OztPQUhBOzs7O0lBYUQsOENBQWU7OztJQUFmO1FBQUEsaUJBR0M7UUFGQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsU0FBUzs7O1FBQUUsY0FBTSxPQUFBLEtBQUksQ0FBQyxhQUFhLEVBQUUsRUFBcEIsQ0FBb0IsRUFBQyxDQUFDO1FBQ3RELElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUN2QixDQUFDOzs7O0lBRUQsMENBQVc7OztJQUFYO1FBQUEsaUJBRUM7UUFEQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsU0FBUzs7O1FBQUUsY0FBTSxPQUFBLEtBQUksQ0FBQyxhQUFhLEVBQUUsRUFBcEIsQ0FBb0IsRUFBQyxDQUFDO0lBQ3hELENBQUM7Ozs7O0lBRUQsOENBQWU7Ozs7SUFBZixVQUFnQixTQUFnQjtRQUM5QixJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDakIsT0FBTztTQUNSO1FBQ0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDdEMsQ0FBQzs7Ozs7SUFFTyw0Q0FBYTs7OztJQUFyQjtRQUNFLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO0lBQ2pELENBQUM7Ozs7OztJQUVPLHFEQUFzQjs7Ozs7SUFBOUIsVUFBK0IsU0FBUztRQUN0QyxJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsRUFBRSxDQUFDOztZQUV6QixPQUFPLEdBQVEsTUFBTSxDQUFDLE1BQU0sQ0FDaEMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEVBQ2hDLFNBQVMsQ0FBQyxPQUFPLENBQ2xCO1FBQ0QsT0FBTyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7O1lBRWpCLEtBQUssR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUM7UUFDcEQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDL0IsQ0FBQzs7Z0JBbEZGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsa0JBQWtCO29CQUM1Qiw4UkFBNEM7O2lCQUU3Qzs7OztnQkFQUSxZQUFZOzs7c0JBU2xCLEtBQUs7NEJBVUwsS0FBSzsyQkFVTCxLQUFLOzBCQVNMLEtBQUs7O0lBZ0RSLDJCQUFDO0NBQUEsQUFuRkQsSUFtRkM7U0E5RVksb0JBQW9COzs7Ozs7SUFTL0Isb0NBQXFCOzs7OztJQVVyQiwwQ0FBMEI7Ozs7O0lBUzFCLHlDQUEyQjs7Ozs7SUFTM0Isd0NBQTBCOztJQUUxQix1Q0FHRzs7Ozs7SUFFUyw0Q0FBa0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IExheWVyIH0gZnJvbSAnLi4vLi4vbGF5ZXIvc2hhcmVkJztcclxuaW1wb3J0IHsgTGF5ZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vbGF5ZXIvc2hhcmVkL2xheWVyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBJZ29NYXAgfSBmcm9tICcuLi9zaGFyZWQnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdpZ28tbWluaS1iYXNlbWFwJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vbWluaS1iYXNlbWFwLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9taW5pLWJhc2VtYXAuY29tcG9uZW50LnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTWluaUJhc2VNYXBDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IG1hcCgpOiBJZ29NYXAge1xyXG4gICAgcmV0dXJuIHRoaXMuX21hcDtcclxuICB9XHJcbiAgc2V0IG1hcCh2YWx1ZTogSWdvTWFwKSB7XHJcbiAgICB0aGlzLl9tYXAgPSB2YWx1ZTtcclxuICAgIHRoaXMuaGFuZGxlTW92ZUVuZCgpO1xyXG4gIH1cclxuICBwcml2YXRlIF9tYXA6IElnb01hcDtcclxuXHJcbiAgQElucHV0KClcclxuICBnZXQgYmFzZUxheWVyKCk6IExheWVyIHtcclxuICAgIHJldHVybiB0aGlzLl9iYXNlTGF5ZXI7XHJcbiAgfVxyXG4gIHNldCBiYXNlTGF5ZXIodmFsdWU6IExheWVyKSB7XHJcbiAgICB0aGlzLl9iYXNlTGF5ZXIgPSB2YWx1ZTtcclxuICAgIHRoaXMuaGFuZGxlQmFzZUxheWVyQ2hhbmdlZCh2YWx1ZSk7XHJcbiAgfVxyXG4gIHByaXZhdGUgX2Jhc2VMYXllcjogTGF5ZXI7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkO1xyXG4gIH1cclxuICBzZXQgZGlzYWJsZWQodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMuX2Rpc2FibGVkID0gdmFsdWU7XHJcbiAgfVxyXG4gIHByaXZhdGUgX2Rpc2FibGVkOiBib29sZWFuO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIGdldCBkaXNwbGF5KCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX2Rpc3BsYXk7XHJcbiAgfVxyXG4gIHNldCBkaXNwbGF5KHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLl9kaXNwbGF5ID0gdmFsdWU7XHJcbiAgfVxyXG4gIHByaXZhdGUgX2Rpc3BsYXk6IGJvb2xlYW47XHJcblxyXG4gIHB1YmxpYyBiYXNlbWFwID0gbmV3IElnb01hcCh7XHJcbiAgICBjb250cm9sczoge30sXHJcbiAgICBpbnRlcmFjdGlvbnM6IGZhbHNlXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbGF5ZXJTZXJ2aWNlOiBMYXllclNlcnZpY2UpIHt9XHJcblxyXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcclxuICAgIHRoaXMubWFwLm9sLm9uKCdtb3ZlZW5kJywgKCkgPT4gdGhpcy5oYW5kbGVNb3ZlRW5kKCkpO1xyXG4gICAgdGhpcy5oYW5kbGVNb3ZlRW5kKCk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMubWFwLm9sLnVuKCdtb3ZlZW5kJywgKCkgPT4gdGhpcy5oYW5kbGVNb3ZlRW5kKCkpO1xyXG4gIH1cclxuXHJcbiAgY2hhbmdlQmFzZUxheWVyKGJhc2VMYXllcjogTGF5ZXIpIHtcclxuICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHRoaXMubWFwLmNoYW5nZUJhc2VMYXllcihiYXNlTGF5ZXIpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBoYW5kbGVNb3ZlRW5kKCkge1xyXG4gICAgdGhpcy5iYXNlbWFwLm9sLnNldFZpZXcodGhpcy5tYXAub2wuZ2V0VmlldygpKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaGFuZGxlQmFzZUxheWVyQ2hhbmdlZChiYXNlbGF5ZXIpIHtcclxuICAgIHRoaXMuYmFzZW1hcC5yZW1vdmVBbGxMYXllcnMoKTtcclxuXHJcbiAgICBjb25zdCBvcHRpb25zOiBhbnkgPSBPYmplY3QuYXNzaWduKFxyXG4gICAgICBPYmplY3QuY3JlYXRlKGJhc2VsYXllci5vcHRpb25zKSxcclxuICAgICAgYmFzZWxheWVyLm9wdGlvbnNcclxuICAgICk7XHJcbiAgICBvcHRpb25zLnZpc2libGUgPSB0cnVlO1xyXG5cclxuICAgIGNvbnN0IGxheWVyID0gdGhpcy5sYXllclNlcnZpY2UuY3JlYXRlTGF5ZXIob3B0aW9ucyk7XHJcbiAgICB0aGlzLmJhc2VtYXAuYWRkTGF5ZXIobGF5ZXIpO1xyXG4gIH1cclxufVxyXG4iXX0=
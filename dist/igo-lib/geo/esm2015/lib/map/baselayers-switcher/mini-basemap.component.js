/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { Layer } from '../../layer/shared';
import { LayerService } from '../../layer/shared/layer.service';
import { IgoMap } from '../shared';
export class MiniBaseMapComponent {
    /**
     * @param {?} layerService
     */
    constructor(layerService) {
        this.layerService = layerService;
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
    { type: LayerService }
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
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWluaS1iYXNlbWFwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9tYXAvYmFzZWxheWVycy1zd2l0Y2hlci9taW5pLWJhc2VtYXAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBNEIsTUFBTSxlQUFlLENBQUM7QUFFM0UsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNoRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBT25DLE1BQU0sT0FBTyxvQkFBb0I7Ozs7SUE0Qy9CLFlBQW9CLFlBQTBCO1FBQTFCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBTHZDLFlBQU8sR0FBRyxJQUFJLE1BQU0sQ0FBQztZQUMxQixRQUFRLEVBQUUsRUFBRTtZQUNaLFlBQVksRUFBRSxLQUFLO1NBQ3BCLENBQUMsQ0FBQztJQUU4QyxDQUFDOzs7O0lBM0NsRCxJQUNJLEdBQUc7UUFDTCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDbkIsQ0FBQzs7Ozs7SUFDRCxJQUFJLEdBQUcsQ0FBQyxLQUFhO1FBQ25CLElBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO1FBQ2xCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUN2QixDQUFDOzs7O0lBR0QsSUFDSSxTQUFTO1FBQ1gsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQ3pCLENBQUM7Ozs7O0lBQ0QsSUFBSSxTQUFTLENBQUMsS0FBWTtRQUN4QixJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztRQUN4QixJQUFJLENBQUMsc0JBQXNCLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDckMsQ0FBQzs7OztJQUdELElBQ0ksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN4QixDQUFDOzs7OztJQUNELElBQUksUUFBUSxDQUFDLEtBQWM7UUFDekIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7SUFDekIsQ0FBQzs7OztJQUdELElBQ0ksT0FBTztRQUNULE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN2QixDQUFDOzs7OztJQUNELElBQUksT0FBTyxDQUFDLEtBQWM7UUFDeEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7SUFDeEIsQ0FBQzs7OztJQVVELGVBQWU7UUFDYixJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsU0FBUzs7O1FBQUUsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxFQUFDLENBQUM7UUFDdEQsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7Ozs7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLFNBQVM7OztRQUFFLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsRUFBQyxDQUFDO0lBQ3hELENBQUM7Ozs7O0lBRUQsZUFBZSxDQUFDLFNBQWdCO1FBQzlCLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNqQixPQUFPO1NBQ1I7UUFDRCxJQUFJLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUN0QyxDQUFDOzs7OztJQUVPLGFBQWE7UUFDbkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7SUFDakQsQ0FBQzs7Ozs7O0lBRU8sc0JBQXNCLENBQUMsU0FBUztRQUN0QyxJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsRUFBRSxDQUFDOztjQUV6QixPQUFPLEdBQVEsTUFBTSxDQUFDLE1BQU0sQ0FDaEMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEVBQ2hDLFNBQVMsQ0FBQyxPQUFPLENBQ2xCO1FBQ0QsT0FBTyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7O2NBRWpCLEtBQUssR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUM7UUFDcEQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDL0IsQ0FBQzs7O1lBbEZGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsa0JBQWtCO2dCQUM1Qiw4UkFBNEM7O2FBRTdDOzs7O1lBUFEsWUFBWTs7O2tCQVNsQixLQUFLO3dCQVVMLEtBQUs7dUJBVUwsS0FBSztzQkFTTCxLQUFLOzs7Ozs7O0lBckJOLG9DQUFxQjs7Ozs7SUFVckIsMENBQTBCOzs7OztJQVMxQix5Q0FBMkI7Ozs7O0lBUzNCLHdDQUEwQjs7SUFFMUIsdUNBR0c7Ozs7O0lBRVMsNENBQWtDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBMYXllciB9IGZyb20gJy4uLy4uL2xheWVyL3NoYXJlZCc7XHJcbmltcG9ydCB7IExheWVyU2VydmljZSB9IGZyb20gJy4uLy4uL2xheWVyL3NoYXJlZC9sYXllci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgSWdvTWFwIH0gZnJvbSAnLi4vc2hhcmVkJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaWdvLW1pbmktYmFzZW1hcCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL21pbmktYmFzZW1hcC5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vbWluaS1iYXNlbWFwLmNvbXBvbmVudC5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIE1pbmlCYXNlTWFwQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcclxuICBASW5wdXQoKVxyXG4gIGdldCBtYXAoKTogSWdvTWFwIHtcclxuICAgIHJldHVybiB0aGlzLl9tYXA7XHJcbiAgfVxyXG4gIHNldCBtYXAodmFsdWU6IElnb01hcCkge1xyXG4gICAgdGhpcy5fbWFwID0gdmFsdWU7XHJcbiAgICB0aGlzLmhhbmRsZU1vdmVFbmQoKTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfbWFwOiBJZ29NYXA7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IGJhc2VMYXllcigpOiBMYXllciB7XHJcbiAgICByZXR1cm4gdGhpcy5fYmFzZUxheWVyO1xyXG4gIH1cclxuICBzZXQgYmFzZUxheWVyKHZhbHVlOiBMYXllcikge1xyXG4gICAgdGhpcy5fYmFzZUxheWVyID0gdmFsdWU7XHJcbiAgICB0aGlzLmhhbmRsZUJhc2VMYXllckNoYW5nZWQodmFsdWUpO1xyXG4gIH1cclxuICBwcml2YXRlIF9iYXNlTGF5ZXI6IExheWVyO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLl9kaXNhYmxlZDtcclxuICB9XHJcbiAgc2V0IGRpc2FibGVkKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLl9kaXNhYmxlZCA9IHZhbHVlO1xyXG4gIH1cclxuICBwcml2YXRlIF9kaXNhYmxlZDogYm9vbGVhbjtcclxuXHJcbiAgQElucHV0KClcclxuICBnZXQgZGlzcGxheSgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLl9kaXNwbGF5O1xyXG4gIH1cclxuICBzZXQgZGlzcGxheSh2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgdGhpcy5fZGlzcGxheSA9IHZhbHVlO1xyXG4gIH1cclxuICBwcml2YXRlIF9kaXNwbGF5OiBib29sZWFuO1xyXG5cclxuICBwdWJsaWMgYmFzZW1hcCA9IG5ldyBJZ29NYXAoe1xyXG4gICAgY29udHJvbHM6IHt9LFxyXG4gICAgaW50ZXJhY3Rpb25zOiBmYWxzZVxyXG4gIH0pO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGxheWVyU2VydmljZTogTGF5ZXJTZXJ2aWNlKSB7fVxyXG5cclxuICBuZ0FmdGVyVmlld0luaXQoKSB7XHJcbiAgICB0aGlzLm1hcC5vbC5vbignbW92ZWVuZCcsICgpID0+IHRoaXMuaGFuZGxlTW92ZUVuZCgpKTtcclxuICAgIHRoaXMuaGFuZGxlTW92ZUVuZCgpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLm1hcC5vbC51bignbW92ZWVuZCcsICgpID0+IHRoaXMuaGFuZGxlTW92ZUVuZCgpKTtcclxuICB9XHJcblxyXG4gIGNoYW5nZUJhc2VMYXllcihiYXNlTGF5ZXI6IExheWVyKSB7XHJcbiAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB0aGlzLm1hcC5jaGFuZ2VCYXNlTGF5ZXIoYmFzZUxheWVyKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaGFuZGxlTW92ZUVuZCgpIHtcclxuICAgIHRoaXMuYmFzZW1hcC5vbC5zZXRWaWV3KHRoaXMubWFwLm9sLmdldFZpZXcoKSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGhhbmRsZUJhc2VMYXllckNoYW5nZWQoYmFzZWxheWVyKSB7XHJcbiAgICB0aGlzLmJhc2VtYXAucmVtb3ZlQWxsTGF5ZXJzKCk7XHJcblxyXG4gICAgY29uc3Qgb3B0aW9uczogYW55ID0gT2JqZWN0LmFzc2lnbihcclxuICAgICAgT2JqZWN0LmNyZWF0ZShiYXNlbGF5ZXIub3B0aW9ucyksXHJcbiAgICAgIGJhc2VsYXllci5vcHRpb25zXHJcbiAgICApO1xyXG4gICAgb3B0aW9ucy52aXNpYmxlID0gdHJ1ZTtcclxuXHJcbiAgICBjb25zdCBsYXllciA9IHRoaXMubGF5ZXJTZXJ2aWNlLmNyZWF0ZUxheWVyKG9wdGlvbnMpO1xyXG4gICAgdGhpcy5iYXNlbWFwLmFkZExheWVyKGxheWVyKTtcclxuICB9XHJcbn1cclxuIl19
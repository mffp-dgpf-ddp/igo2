/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive } from '@angular/core';
import { MapBrowserComponent } from '../map-browser/map-browser.component';
import { NetworkService } from '@igo2/core';
var MapLayerDirective = /** @class */ (function () {
    function MapLayerDirective(component, networkService) {
        this.networkService = networkService;
        this.component = component;
    }
    Object.defineProperty(MapLayerDirective.prototype, "map", {
        get: /**
         * @return {?}
         */
        function () {
            return this.component.map;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    MapLayerDirective.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.networkService.currentState().subscribe((/**
         * @param {?} state
         * @return {?}
         */
        function (state) {
            console.log(state);
            _this.state = state;
            _this.changeLayer();
        }));
        this.map.layers$.subscribe((/**
         * @param {?} layers
         * @return {?}
         */
        function (layers) {
            _this.changeLayer();
        }));
    };
    /**
     * @private
     * @return {?}
     */
    MapLayerDirective.prototype.changeLayer = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var layerList = this.map.layers$.value;
        layerList.forEach((/**
         * @param {?} layer
         * @return {?}
         */
        function (layer) {
            if (layer.options.sourceOptions) {
                if (layer.options.sourceOptions.pathOffline &&
                    _this.state.connection === false) {
                    if (layer.options.sourceOptions.excludeAttributeOffline) {
                        layer.options.sourceOptions.excludeAttributeBackUp = layer.options.sourceOptions.excludeAttribute;
                        layer.options.sourceOptions.excludeAttribute = layer.options.sourceOptions.excludeAttributeOffline;
                    }
                    layer.ol.getSource().clear();
                    layer.ol.getSource().setUrl(layer.options.sourceOptions.pathOffline);
                }
                else if (layer.options.sourceOptions.pathOffline &&
                    _this.state.connection === true) {
                    if (layer.options.sourceOptions.excludeAttributeBackUp) {
                        layer.options.sourceOptions.excludeAttribute = layer.options.sourceOptions.excludeAttributeBackUp;
                    }
                    layer.ol.getSource().clear();
                    layer.ol.getSource().setUrl(layer.options.sourceOptions.url);
                }
            }
        }));
    };
    MapLayerDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[igoMapLayer]'
                },] }
    ];
    /** @nocollapse */
    MapLayerDirective.ctorParameters = function () { return [
        { type: MapBrowserComponent },
        { type: NetworkService }
    ]; };
    return MapLayerDirective;
}());
export { MapLayerDirective };
if (false) {
    /**
     * @type {?}
     * @private
     */
    MapLayerDirective.prototype.context$$;
    /**
     * @type {?}
     * @private
     */
    MapLayerDirective.prototype.state;
    /**
     * @type {?}
     * @private
     */
    MapLayerDirective.prototype.component;
    /**
     * @type {?}
     * @private
     */
    MapLayerDirective.prototype.networkService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwTGF5ZXIuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL21hcC9zaGFyZWQvbWFwTGF5ZXIuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFnRSxNQUFNLGVBQWUsQ0FBQztBQUV4RyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUMzRSxPQUFPLEVBQUUsY0FBYyxFQUFtQixNQUFNLFlBQVksQ0FBQztBQUs3RDtJQWFFLDJCQUNFLFNBQThCLEVBQ3RCLGNBQThCO1FBQTlCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUVwQyxJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztJQUM3QixDQUFDO0lBVEgsc0JBQUksa0NBQUc7Ozs7UUFBUDtZQUNFLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUM7UUFDNUIsQ0FBQzs7O09BQUE7Ozs7SUFTRCwyQ0FBZTs7O0lBQWY7UUFBQSxpQkFVQztRQVRDLElBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxFQUFFLENBQUMsU0FBUzs7OztRQUFDLFVBQUMsS0FBc0I7WUFDbEUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNuQixLQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUNuQixLQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDckIsQ0FBQyxFQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxTQUFTOzs7O1FBQUMsVUFBQyxNQUFlO1lBQ3pDLEtBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNyQixDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7Ozs7O0lBRU8sdUNBQVc7Ozs7SUFBbkI7UUFBQSxpQkFzQkM7O1lBckJPLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLO1FBQ3hDLFNBQVMsQ0FBQyxPQUFPOzs7O1FBQUMsVUFBQSxLQUFLO1lBQ3JCLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUU7Z0JBQy9CLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsV0FBVztvQkFDekMsS0FBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEtBQUssS0FBSyxFQUFFO29CQUMvQixJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLHVCQUF1QixFQUFFO3dCQUN2RCxLQUFLLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxzQkFBc0IsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQzt3QkFDbEcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsdUJBQXVCLENBQUM7cUJBQ3BHO29CQUNELEtBQUssQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7b0JBQzdCLEtBQUssQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2lCQUN4RTtxQkFBTSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLFdBQVc7b0JBQ2hELEtBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxLQUFLLElBQUksRUFBRTtvQkFDOUIsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxzQkFBc0IsRUFBRTt3QkFDdEQsS0FBSyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsc0JBQXNCLENBQUM7cUJBQ25HO29CQUNELEtBQUssQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7b0JBQzdCLEtBQUssQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2lCQUNoRTthQUNGO1FBQ0gsQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDOztnQkF0REYsU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxlQUFlO2lCQUMxQjs7OztnQkFSTSxtQkFBbUI7Z0JBQ25CLGNBQWM7O0lBNER2Qix3QkFBQztDQUFBLEFBdkRELElBdURDO1NBcERZLGlCQUFpQjs7Ozs7O0lBRTVCLHNDQUFnQzs7Ozs7SUFDaEMsa0NBQStCOzs7OztJQUMvQixzQ0FBdUM7Ozs7O0lBUXJDLDJDQUFzQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95LCBTZWxmLCBPbkluaXQsIEV2ZW50RW1pdHRlciwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IElnb01hcCB9IGZyb20gJy4vbWFwJztcclxuaW1wb3J0IHsgTWFwQnJvd3NlckNvbXBvbmVudCB9IGZyb20gJy4uL21hcC1icm93c2VyL21hcC1icm93c2VyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE5ldHdvcmtTZXJ2aWNlLCBDb25uZWN0aW9uU3RhdGUgfSBmcm9tICdAaWdvMi9jb3JlJztcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IGZpbHRlciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgTGF5ZXIgfSBmcm9tICcuLi8uLi9sYXllci9zaGFyZWQvbGF5ZXJzL2xheWVyJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gICAgc2VsZWN0b3I6ICdbaWdvTWFwTGF5ZXJdJ1xyXG4gIH0pXHJcbmV4cG9ydCBjbGFzcyBNYXBMYXllckRpcmVjdGl2ZSBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xyXG5cclxuICBwcml2YXRlIGNvbnRleHQkJDogU3Vic2NyaXB0aW9uO1xyXG4gIHByaXZhdGUgc3RhdGU6IENvbm5lY3Rpb25TdGF0ZTtcclxuICBwcml2YXRlIGNvbXBvbmVudDogTWFwQnJvd3NlckNvbXBvbmVudDtcclxuXHJcbiAgZ2V0IG1hcCgpOiBJZ29NYXAge1xyXG4gICAgcmV0dXJuIHRoaXMuY29tcG9uZW50Lm1hcDtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgY29tcG9uZW50OiBNYXBCcm93c2VyQ29tcG9uZW50LFxyXG4gICAgcHJpdmF0ZSBuZXR3b3JrU2VydmljZTogTmV0d29ya1NlcnZpY2VcclxuICAgICkge1xyXG4gICAgICB0aGlzLmNvbXBvbmVudCA9IGNvbXBvbmVudDtcclxuICAgIH1cclxuXHJcbiAgbmdBZnRlclZpZXdJbml0KCkge1xyXG4gICAgdGhpcy5uZXR3b3JrU2VydmljZS5jdXJyZW50U3RhdGUoKS5zdWJzY3JpYmUoKHN0YXRlOiBDb25uZWN0aW9uU3RhdGUpID0+IHtcclxuICAgICAgY29uc29sZS5sb2coc3RhdGUpO1xyXG4gICAgICB0aGlzLnN0YXRlID0gc3RhdGU7XHJcbiAgICAgIHRoaXMuY2hhbmdlTGF5ZXIoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMubWFwLmxheWVycyQuc3Vic2NyaWJlKChsYXllcnM6IExheWVyW10pID0+IHtcclxuICAgICAgdGhpcy5jaGFuZ2VMYXllcigpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNoYW5nZUxheWVyKCkge1xyXG4gICAgY29uc3QgbGF5ZXJMaXN0ID0gdGhpcy5tYXAubGF5ZXJzJC52YWx1ZTtcclxuICAgIGxheWVyTGlzdC5mb3JFYWNoKGxheWVyID0+IHtcclxuICAgICAgaWYgKGxheWVyLm9wdGlvbnMuc291cmNlT3B0aW9ucykge1xyXG4gICAgICAgIGlmIChsYXllci5vcHRpb25zLnNvdXJjZU9wdGlvbnMucGF0aE9mZmxpbmUgICYmXHJcbiAgICAgICAgICB0aGlzLnN0YXRlLmNvbm5lY3Rpb24gPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIGlmIChsYXllci5vcHRpb25zLnNvdXJjZU9wdGlvbnMuZXhjbHVkZUF0dHJpYnV0ZU9mZmxpbmUpIHtcclxuICAgICAgICAgICAgICBsYXllci5vcHRpb25zLnNvdXJjZU9wdGlvbnMuZXhjbHVkZUF0dHJpYnV0ZUJhY2tVcCA9IGxheWVyLm9wdGlvbnMuc291cmNlT3B0aW9ucy5leGNsdWRlQXR0cmlidXRlO1xyXG4gICAgICAgICAgICAgIGxheWVyLm9wdGlvbnMuc291cmNlT3B0aW9ucy5leGNsdWRlQXR0cmlidXRlID0gbGF5ZXIub3B0aW9ucy5zb3VyY2VPcHRpb25zLmV4Y2x1ZGVBdHRyaWJ1dGVPZmZsaW5lO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxheWVyLm9sLmdldFNvdXJjZSgpLmNsZWFyKCk7XHJcbiAgICAgICAgICAgIGxheWVyLm9sLmdldFNvdXJjZSgpLnNldFVybChsYXllci5vcHRpb25zLnNvdXJjZU9wdGlvbnMucGF0aE9mZmxpbmUpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAobGF5ZXIub3B0aW9ucy5zb3VyY2VPcHRpb25zLnBhdGhPZmZsaW5lICYmXHJcbiAgICAgICAgICB0aGlzLnN0YXRlLmNvbm5lY3Rpb24gPT09IHRydWUpIHtcclxuICAgICAgICAgICAgaWYgKGxheWVyLm9wdGlvbnMuc291cmNlT3B0aW9ucy5leGNsdWRlQXR0cmlidXRlQmFja1VwKSB7XHJcbiAgICAgICAgICAgICAgbGF5ZXIub3B0aW9ucy5zb3VyY2VPcHRpb25zLmV4Y2x1ZGVBdHRyaWJ1dGUgPSBsYXllci5vcHRpb25zLnNvdXJjZU9wdGlvbnMuZXhjbHVkZUF0dHJpYnV0ZUJhY2tVcDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsYXllci5vbC5nZXRTb3VyY2UoKS5jbGVhcigpO1xyXG4gICAgICAgICAgICBsYXllci5vbC5nZXRTb3VyY2UoKS5zZXRVcmwobGF5ZXIub3B0aW9ucy5zb3VyY2VPcHRpb25zLnVybCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIl19
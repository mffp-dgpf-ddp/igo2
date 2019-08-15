/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive } from '@angular/core';
import { MapBrowserComponent } from '../map-browser/map-browser.component';
import { NetworkService } from '@igo2/core';
var MapOfflineDirective = /** @class */ (function () {
    function MapOfflineDirective(component, networkService) {
        this.networkService = networkService;
        this.component = component;
    }
    Object.defineProperty(MapOfflineDirective.prototype, "map", {
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
    MapOfflineDirective.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.networkService.currentState().subscribe((/**
         * @param {?} state
         * @return {?}
         */
        function (state) {
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
    MapOfflineDirective.prototype.changeLayer = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var sourceOptions;
        /** @type {?} */
        var layerList = this.map.layers$.value;
        layerList.forEach((/**
         * @param {?} layer
         * @return {?}
         */
        function (layer) {
            if (layer.options.sourceOptions.type === 'mvt') {
                sourceOptions = ((/** @type {?} */ (layer.options.sourceOptions)));
                layer.ol.getSource().clear();
            }
            else if (layer.options.sourceOptions.type === 'xyz') {
                sourceOptions = ((/** @type {?} */ (layer.options.sourceOptions)));
            }
            else if (layer.options.sourceOptions.type === 'vector') {
                sourceOptions = ((/** @type {?} */ (layer.options.sourceOptions)));
            }
            else {
                if (_this.state.connection === false) {
                    layer.ol.setMaxResolution(0);
                    return;
                }
                else if (_this.state.connection === true) {
                    layer.ol.setMaxResolution(Infinity);
                    return;
                }
            }
            if (sourceOptions.pathOffline &&
                _this.state.connection === false) {
                if (sourceOptions.type === 'vector') {
                    return;
                }
                layer.ol.getSource().setUrl(sourceOptions.pathOffline);
            }
            else if (sourceOptions.pathOffline &&
                _this.state.connection === true) {
                if (sourceOptions.type === 'vector') {
                    return;
                }
                layer.ol.getSource().setUrl(sourceOptions.url);
            }
            else {
                if (_this.state.connection === false) {
                    layer.ol.setMaxResolution(0);
                }
                else if (_this.state.connection === true) {
                    layer.ol.setMaxResolution(Infinity);
                }
            }
        }));
    };
    MapOfflineDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[igoMapOffline]'
                },] }
    ];
    /** @nocollapse */
    MapOfflineDirective.ctorParameters = function () { return [
        { type: MapBrowserComponent },
        { type: NetworkService }
    ]; };
    return MapOfflineDirective;
}());
export { MapOfflineDirective };
if (false) {
    /**
     * @type {?}
     * @private
     */
    MapOfflineDirective.prototype.context$$;
    /**
     * @type {?}
     * @private
     */
    MapOfflineDirective.prototype.state;
    /**
     * @type {?}
     * @private
     */
    MapOfflineDirective.prototype.component;
    /**
     * @type {?}
     * @private
     */
    MapOfflineDirective.prototype.networkService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwT2ZmbGluZS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvbWFwL3NoYXJlZC9tYXBPZmZsaW5lLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFFekQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDM0UsT0FBTyxFQUFFLGNBQWMsRUFBbUIsTUFBTSxZQUFZLENBQUM7QUFLN0Q7SUFhRSw2QkFDRSxTQUE4QixFQUN0QixjQUE4QjtRQUE5QixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFFcEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7SUFDN0IsQ0FBQztJQVRILHNCQUFJLG9DQUFHOzs7O1FBQVA7WUFDRSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDO1FBQzVCLENBQUM7OztPQUFBOzs7O0lBU0QsNkNBQWU7OztJQUFmO1FBQUEsaUJBU0M7UUFSQyxJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksRUFBRSxDQUFDLFNBQVM7Ozs7UUFBQyxVQUFDLEtBQXNCO1lBQ2xFLEtBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1lBQ25CLEtBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNyQixDQUFDLEVBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFNBQVM7Ozs7UUFBQyxVQUFDLE1BQWU7WUFDekMsS0FBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3JCLENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7Ozs7SUFFTyx5Q0FBVzs7OztJQUFuQjtRQUFBLGlCQXdDQzs7WUF2Q0ssYUFBYTs7WUFDWCxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSztRQUN4QyxTQUFTLENBQUMsT0FBTzs7OztRQUFDLFVBQUEsS0FBSztZQUNyQixJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLElBQUksS0FBSyxLQUFLLEVBQUU7Z0JBQzlDLGFBQWEsR0FBRyxDQUFDLG1CQUFBLEtBQUssQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUF3QixDQUFDLENBQUM7Z0JBQ3RFLEtBQUssQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7YUFDOUI7aUJBQU0sSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxJQUFJLEtBQUssS0FBSyxFQUFFO2dCQUNyRCxhQUFhLEdBQUcsQ0FBQyxtQkFBQSxLQUFLLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBd0IsQ0FBQyxDQUFDO2FBQ3ZFO2lCQUFNLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsSUFBSSxLQUFLLFFBQVEsRUFBRTtnQkFDeEQsYUFBYSxHQUFHLENBQUMsbUJBQUEsS0FBSyxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQTRCLENBQUMsQ0FBQzthQUMzRTtpQkFBTTtnQkFDTCxJQUFJLEtBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxLQUFLLEtBQUssRUFBRTtvQkFDbkMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDN0IsT0FBTztpQkFDUjtxQkFBTSxJQUFJLEtBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxLQUFLLElBQUksRUFBRTtvQkFDekMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFDcEMsT0FBTztpQkFDUjthQUNGO1lBQ0QsSUFBSSxhQUFhLENBQUMsV0FBVztnQkFDM0IsS0FBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEtBQUssS0FBSyxFQUFFO2dCQUMvQixJQUFJLGFBQWEsQ0FBQyxJQUFJLEtBQUssUUFBUSxFQUFFO29CQUNuQyxPQUFPO2lCQUNSO2dCQUNELEtBQUssQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQzthQUMxRDtpQkFBTSxJQUFJLGFBQWEsQ0FBQyxXQUFXO2dCQUNsQyxLQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsS0FBSyxJQUFJLEVBQUU7Z0JBQzlCLElBQUksYUFBYSxDQUFDLElBQUksS0FBSyxRQUFRLEVBQUU7b0JBQ25DLE9BQU87aUJBQ1I7Z0JBQ0QsS0FBSyxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ2xEO2lCQUFNO2dCQUNMLElBQUksS0FBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEtBQUssS0FBSyxFQUFFO29CQUNuQyxLQUFLLENBQUMsRUFBRSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUM5QjtxQkFBTSxJQUFJLEtBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxLQUFLLElBQUksRUFBRTtvQkFDekMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztpQkFDckM7YUFDRjtRQUNILENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7Z0JBdkVGLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsaUJBQWlCO2lCQUM1Qjs7OztnQkFSTSxtQkFBbUI7Z0JBQ25CLGNBQWM7O0lBNkV2QiwwQkFBQztDQUFBLEFBeEVELElBd0VDO1NBckVZLG1CQUFtQjs7Ozs7O0lBRTlCLHdDQUFnQzs7Ozs7SUFDaEMsb0NBQStCOzs7OztJQUMvQix3Q0FBdUM7Ozs7O0lBUXJDLDZDQUFzQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgQWZ0ZXJWaWV3SW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBJZ29NYXAgfSBmcm9tICcuL21hcCc7XHJcbmltcG9ydCB7IE1hcEJyb3dzZXJDb21wb25lbnQgfSBmcm9tICcuLi9tYXAtYnJvd3Nlci9tYXAtYnJvd3Nlci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBOZXR3b3JrU2VydmljZSwgQ29ubmVjdGlvblN0YXRlIH0gZnJvbSAnQGlnbzIvY29yZSc7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBMYXllciB9IGZyb20gJy4uLy4uL2xheWVyL3NoYXJlZC9sYXllcnMvbGF5ZXInO1xyXG5pbXBvcnQgeyBNVlREYXRhU291cmNlT3B0aW9ucywgWFlaRGF0YVNvdXJjZU9wdGlvbnMsIEZlYXR1cmVEYXRhU291cmNlT3B0aW9ucyB9IGZyb20gJy4uLy4uL2RhdGFzb3VyY2UnO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgICBzZWxlY3RvcjogJ1tpZ29NYXBPZmZsaW5lXSdcclxuICB9KVxyXG5leHBvcnQgY2xhc3MgTWFwT2ZmbGluZURpcmVjdGl2ZSBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xyXG5cclxuICBwcml2YXRlIGNvbnRleHQkJDogU3Vic2NyaXB0aW9uO1xyXG4gIHByaXZhdGUgc3RhdGU6IENvbm5lY3Rpb25TdGF0ZTtcclxuICBwcml2YXRlIGNvbXBvbmVudDogTWFwQnJvd3NlckNvbXBvbmVudDtcclxuXHJcbiAgZ2V0IG1hcCgpOiBJZ29NYXAge1xyXG4gICAgcmV0dXJuIHRoaXMuY29tcG9uZW50Lm1hcDtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgY29tcG9uZW50OiBNYXBCcm93c2VyQ29tcG9uZW50LFxyXG4gICAgcHJpdmF0ZSBuZXR3b3JrU2VydmljZTogTmV0d29ya1NlcnZpY2VcclxuICAgICkge1xyXG4gICAgICB0aGlzLmNvbXBvbmVudCA9IGNvbXBvbmVudDtcclxuICAgIH1cclxuXHJcbiAgbmdBZnRlclZpZXdJbml0KCkge1xyXG4gICAgdGhpcy5uZXR3b3JrU2VydmljZS5jdXJyZW50U3RhdGUoKS5zdWJzY3JpYmUoKHN0YXRlOiBDb25uZWN0aW9uU3RhdGUpID0+IHtcclxuICAgICAgdGhpcy5zdGF0ZSA9IHN0YXRlO1xyXG4gICAgICB0aGlzLmNoYW5nZUxheWVyKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLm1hcC5sYXllcnMkLnN1YnNjcmliZSgobGF5ZXJzOiBMYXllcltdKSA9PiB7XHJcbiAgICAgIHRoaXMuY2hhbmdlTGF5ZXIoKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjaGFuZ2VMYXllcigpIHtcclxuICAgIGxldCBzb3VyY2VPcHRpb25zO1xyXG4gICAgY29uc3QgbGF5ZXJMaXN0ID0gdGhpcy5tYXAubGF5ZXJzJC52YWx1ZTtcclxuICAgIGxheWVyTGlzdC5mb3JFYWNoKGxheWVyID0+IHtcclxuICAgICAgaWYgKGxheWVyLm9wdGlvbnMuc291cmNlT3B0aW9ucy50eXBlID09PSAnbXZ0Jykge1xyXG4gICAgICAgIHNvdXJjZU9wdGlvbnMgPSAobGF5ZXIub3B0aW9ucy5zb3VyY2VPcHRpb25zIGFzIE1WVERhdGFTb3VyY2VPcHRpb25zKTtcclxuICAgICAgICBsYXllci5vbC5nZXRTb3VyY2UoKS5jbGVhcigpO1xyXG4gICAgICB9IGVsc2UgaWYgKGxheWVyLm9wdGlvbnMuc291cmNlT3B0aW9ucy50eXBlID09PSAneHl6Jykge1xyXG4gICAgICAgIHNvdXJjZU9wdGlvbnMgPSAobGF5ZXIub3B0aW9ucy5zb3VyY2VPcHRpb25zIGFzIFhZWkRhdGFTb3VyY2VPcHRpb25zKTtcclxuICAgICAgfSBlbHNlIGlmIChsYXllci5vcHRpb25zLnNvdXJjZU9wdGlvbnMudHlwZSA9PT0gJ3ZlY3RvcicpIHtcclxuICAgICAgICBzb3VyY2VPcHRpb25zID0gKGxheWVyLm9wdGlvbnMuc291cmNlT3B0aW9ucyBhcyBGZWF0dXJlRGF0YVNvdXJjZU9wdGlvbnMpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmNvbm5lY3Rpb24gPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICBsYXllci5vbC5zZXRNYXhSZXNvbHV0aW9uKDApO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5zdGF0ZS5jb25uZWN0aW9uID09PSB0cnVlKSB7XHJcbiAgICAgICAgICBsYXllci5vbC5zZXRNYXhSZXNvbHV0aW9uKEluZmluaXR5KTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHNvdXJjZU9wdGlvbnMucGF0aE9mZmxpbmUgICYmXHJcbiAgICAgICAgdGhpcy5zdGF0ZS5jb25uZWN0aW9uID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgaWYgKHNvdXJjZU9wdGlvbnMudHlwZSA9PT0gJ3ZlY3RvcicpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgbGF5ZXIub2wuZ2V0U291cmNlKCkuc2V0VXJsKHNvdXJjZU9wdGlvbnMucGF0aE9mZmxpbmUpO1xyXG4gICAgICB9IGVsc2UgaWYgKHNvdXJjZU9wdGlvbnMucGF0aE9mZmxpbmUgJiZcclxuICAgICAgICB0aGlzLnN0YXRlLmNvbm5lY3Rpb24gPT09IHRydWUpIHtcclxuICAgICAgICAgIGlmIChzb3VyY2VPcHRpb25zLnR5cGUgPT09ICd2ZWN0b3InKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGxheWVyLm9sLmdldFNvdXJjZSgpLnNldFVybChzb3VyY2VPcHRpb25zLnVybCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuY29ubmVjdGlvbiA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgIGxheWVyLm9sLnNldE1heFJlc29sdXRpb24oMCk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnN0YXRlLmNvbm5lY3Rpb24gPT09IHRydWUpIHtcclxuICAgICAgICAgIGxheWVyLm9sLnNldE1heFJlc29sdXRpb24oSW5maW5pdHkpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==
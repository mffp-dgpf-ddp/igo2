/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive } from '@angular/core';
import { MapBrowserComponent } from '../map-browser/map-browser.component';
import { NetworkService } from '@igo2/core';
export class MapLayerDirective {
    /**
     * @param {?} component
     * @param {?} networkService
     */
    constructor(component, networkService) {
        this.networkService = networkService;
        this.component = component;
    }
    /**
     * @return {?}
     */
    get map() {
        return this.component.map;
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.networkService.currentState().subscribe((/**
         * @param {?} state
         * @return {?}
         */
        (state) => {
            console.log(state);
            this.state = state;
            this.changeLayer();
        }));
        this.map.layers$.subscribe((/**
         * @param {?} layers
         * @return {?}
         */
        (layers) => {
            this.changeLayer();
        }));
    }
    /**
     * @private
     * @return {?}
     */
    changeLayer() {
        /** @type {?} */
        const layerList = this.map.layers$.value;
        layerList.forEach((/**
         * @param {?} layer
         * @return {?}
         */
        layer => {
            if (layer.options.sourceOptions) {
                if (layer.options.sourceOptions.pathOffline &&
                    this.state.connection === false) {
                    if (layer.options.sourceOptions.excludeAttributeOffline) {
                        layer.options.sourceOptions.excludeAttributeBackUp = layer.options.sourceOptions.excludeAttribute;
                        layer.options.sourceOptions.excludeAttribute = layer.options.sourceOptions.excludeAttributeOffline;
                    }
                    layer.ol.getSource().clear();
                    layer.ol.getSource().setUrl(layer.options.sourceOptions.pathOffline);
                }
                else if (layer.options.sourceOptions.pathOffline &&
                    this.state.connection === true) {
                    if (layer.options.sourceOptions.excludeAttributeBackUp) {
                        layer.options.sourceOptions.excludeAttribute = layer.options.sourceOptions.excludeAttributeBackUp;
                    }
                    layer.ol.getSource().clear();
                    layer.ol.getSource().setUrl(layer.options.sourceOptions.url);
                }
            }
        }));
    }
}
MapLayerDirective.decorators = [
    { type: Directive, args: [{
                selector: '[igoMapLayer]'
            },] }
];
/** @nocollapse */
MapLayerDirective.ctorParameters = () => [
    { type: MapBrowserComponent },
    { type: NetworkService }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwTGF5ZXIuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL21hcC9zaGFyZWQvbWFwTGF5ZXIuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFnRSxNQUFNLGVBQWUsQ0FBQztBQUV4RyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUMzRSxPQUFPLEVBQUUsY0FBYyxFQUFtQixNQUFNLFlBQVksQ0FBQztBQVE3RCxNQUFNLE9BQU8saUJBQWlCOzs7OztJQVU1QixZQUNFLFNBQThCLEVBQ3RCLGNBQThCO1FBQTlCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUVwQyxJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztJQUM3QixDQUFDOzs7O0lBVEgsSUFBSSxHQUFHO1FBQ0wsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQztJQUM1QixDQUFDOzs7O0lBU0QsZUFBZTtRQUNiLElBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxFQUFFLENBQUMsU0FBUzs7OztRQUFDLENBQUMsS0FBc0IsRUFBRSxFQUFFO1lBQ3RFLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDbkIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7WUFDbkIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3JCLENBQUMsRUFBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsU0FBUzs7OztRQUFDLENBQUMsTUFBZSxFQUFFLEVBQUU7WUFDN0MsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3JCLENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7Ozs7SUFFTyxXQUFXOztjQUNYLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLO1FBQ3hDLFNBQVMsQ0FBQyxPQUFPOzs7O1FBQUMsS0FBSyxDQUFDLEVBQUU7WUFDeEIsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRTtnQkFDL0IsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxXQUFXO29CQUN6QyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsS0FBSyxLQUFLLEVBQUU7b0JBQy9CLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsdUJBQXVCLEVBQUU7d0JBQ3ZELEtBQUssQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLHNCQUFzQixHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDO3dCQUNsRyxLQUFLLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyx1QkFBdUIsQ0FBQztxQkFDcEc7b0JBQ0QsS0FBSyxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztvQkFDN0IsS0FBSyxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLENBQUM7aUJBQ3hFO3FCQUFNLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsV0FBVztvQkFDaEQsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEtBQUssSUFBSSxFQUFFO29CQUM5QixJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLHNCQUFzQixFQUFFO3dCQUN0RCxLQUFLLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxzQkFBc0IsQ0FBQztxQkFDbkc7b0JBQ0QsS0FBSyxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztvQkFDN0IsS0FBSyxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7aUJBQ2hFO2FBQ0Y7UUFDSCxDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7OztZQXRERixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLGVBQWU7YUFDMUI7Ozs7WUFSTSxtQkFBbUI7WUFDbkIsY0FBYzs7Ozs7OztJQVVyQixzQ0FBZ0M7Ozs7O0lBQ2hDLGtDQUErQjs7Ozs7SUFDL0Isc0NBQXVDOzs7OztJQVFyQywyQ0FBc0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSwgU2VsZiwgT25Jbml0LCBFdmVudEVtaXR0ZXIsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBJZ29NYXAgfSBmcm9tICcuL21hcCc7XHJcbmltcG9ydCB7IE1hcEJyb3dzZXJDb21wb25lbnQgfSBmcm9tICcuLi9tYXAtYnJvd3Nlci9tYXAtYnJvd3Nlci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBOZXR3b3JrU2VydmljZSwgQ29ubmVjdGlvblN0YXRlIH0gZnJvbSAnQGlnbzIvY29yZSc7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IExheWVyIH0gZnJvbSAnLi4vLi4vbGF5ZXIvc2hhcmVkL2xheWVycy9sYXllcic7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICAgIHNlbGVjdG9yOiAnW2lnb01hcExheWVyXSdcclxuICB9KVxyXG5leHBvcnQgY2xhc3MgTWFwTGF5ZXJEaXJlY3RpdmUgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcclxuXHJcbiAgcHJpdmF0ZSBjb250ZXh0JCQ6IFN1YnNjcmlwdGlvbjtcclxuICBwcml2YXRlIHN0YXRlOiBDb25uZWN0aW9uU3RhdGU7XHJcbiAgcHJpdmF0ZSBjb21wb25lbnQ6IE1hcEJyb3dzZXJDb21wb25lbnQ7XHJcblxyXG4gIGdldCBtYXAoKTogSWdvTWFwIHtcclxuICAgIHJldHVybiB0aGlzLmNvbXBvbmVudC5tYXA7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIGNvbXBvbmVudDogTWFwQnJvd3NlckNvbXBvbmVudCxcclxuICAgIHByaXZhdGUgbmV0d29ya1NlcnZpY2U6IE5ldHdvcmtTZXJ2aWNlXHJcbiAgICApIHtcclxuICAgICAgdGhpcy5jb21wb25lbnQgPSBjb21wb25lbnQ7XHJcbiAgICB9XHJcblxyXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcclxuICAgIHRoaXMubmV0d29ya1NlcnZpY2UuY3VycmVudFN0YXRlKCkuc3Vic2NyaWJlKChzdGF0ZTogQ29ubmVjdGlvblN0YXRlKSA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKHN0YXRlKTtcclxuICAgICAgdGhpcy5zdGF0ZSA9IHN0YXRlO1xyXG4gICAgICB0aGlzLmNoYW5nZUxheWVyKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLm1hcC5sYXllcnMkLnN1YnNjcmliZSgobGF5ZXJzOiBMYXllcltdKSA9PiB7XHJcbiAgICAgIHRoaXMuY2hhbmdlTGF5ZXIoKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjaGFuZ2VMYXllcigpIHtcclxuICAgIGNvbnN0IGxheWVyTGlzdCA9IHRoaXMubWFwLmxheWVycyQudmFsdWU7XHJcbiAgICBsYXllckxpc3QuZm9yRWFjaChsYXllciA9PiB7XHJcbiAgICAgIGlmIChsYXllci5vcHRpb25zLnNvdXJjZU9wdGlvbnMpIHtcclxuICAgICAgICBpZiAobGF5ZXIub3B0aW9ucy5zb3VyY2VPcHRpb25zLnBhdGhPZmZsaW5lICAmJlxyXG4gICAgICAgICAgdGhpcy5zdGF0ZS5jb25uZWN0aW9uID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICBpZiAobGF5ZXIub3B0aW9ucy5zb3VyY2VPcHRpb25zLmV4Y2x1ZGVBdHRyaWJ1dGVPZmZsaW5lKSB7XHJcbiAgICAgICAgICAgICAgbGF5ZXIub3B0aW9ucy5zb3VyY2VPcHRpb25zLmV4Y2x1ZGVBdHRyaWJ1dGVCYWNrVXAgPSBsYXllci5vcHRpb25zLnNvdXJjZU9wdGlvbnMuZXhjbHVkZUF0dHJpYnV0ZTtcclxuICAgICAgICAgICAgICBsYXllci5vcHRpb25zLnNvdXJjZU9wdGlvbnMuZXhjbHVkZUF0dHJpYnV0ZSA9IGxheWVyLm9wdGlvbnMuc291cmNlT3B0aW9ucy5leGNsdWRlQXR0cmlidXRlT2ZmbGluZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsYXllci5vbC5nZXRTb3VyY2UoKS5jbGVhcigpO1xyXG4gICAgICAgICAgICBsYXllci5vbC5nZXRTb3VyY2UoKS5zZXRVcmwobGF5ZXIub3B0aW9ucy5zb3VyY2VPcHRpb25zLnBhdGhPZmZsaW5lKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGxheWVyLm9wdGlvbnMuc291cmNlT3B0aW9ucy5wYXRoT2ZmbGluZSAmJlxyXG4gICAgICAgICAgdGhpcy5zdGF0ZS5jb25uZWN0aW9uID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIGlmIChsYXllci5vcHRpb25zLnNvdXJjZU9wdGlvbnMuZXhjbHVkZUF0dHJpYnV0ZUJhY2tVcCkge1xyXG4gICAgICAgICAgICAgIGxheWVyLm9wdGlvbnMuc291cmNlT3B0aW9ucy5leGNsdWRlQXR0cmlidXRlID0gbGF5ZXIub3B0aW9ucy5zb3VyY2VPcHRpb25zLmV4Y2x1ZGVBdHRyaWJ1dGVCYWNrVXA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGF5ZXIub2wuZ2V0U291cmNlKCkuY2xlYXIoKTtcclxuICAgICAgICAgICAgbGF5ZXIub2wuZ2V0U291cmNlKCkuc2V0VXJsKGxheWVyLm9wdGlvbnMuc291cmNlT3B0aW9ucy51cmwpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==
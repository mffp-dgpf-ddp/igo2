/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive } from '@angular/core';
import { MapBrowserComponent } from '../map-browser/map-browser.component';
import { NetworkService } from '@igo2/core';
export class MapOfflineDirective {
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
        let sourceOptions;
        /** @type {?} */
        const layerList = this.map.layers$.value;
        layerList.forEach((/**
         * @param {?} layer
         * @return {?}
         */
        layer => {
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
                if (this.state.connection === false) {
                    layer.ol.setMaxResolution(0);
                    return;
                }
                else if (this.state.connection === true) {
                    layer.ol.setMaxResolution(Infinity);
                    return;
                }
            }
            if (sourceOptions.pathOffline &&
                this.state.connection === false) {
                if (sourceOptions.type === 'vector') {
                    return;
                }
                layer.ol.getSource().setUrl(sourceOptions.pathOffline);
            }
            else if (sourceOptions.pathOffline &&
                this.state.connection === true) {
                if (sourceOptions.type === 'vector') {
                    return;
                }
                layer.ol.getSource().setUrl(sourceOptions.url);
            }
            else {
                if (this.state.connection === false) {
                    layer.ol.setMaxResolution(0);
                }
                else if (this.state.connection === true) {
                    layer.ol.setMaxResolution(Infinity);
                }
            }
        }));
    }
}
MapOfflineDirective.decorators = [
    { type: Directive, args: [{
                selector: '[igoMapOffline]'
            },] }
];
/** @nocollapse */
MapOfflineDirective.ctorParameters = () => [
    { type: MapBrowserComponent },
    { type: NetworkService }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwT2ZmbGluZS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvbWFwL3NoYXJlZC9tYXBPZmZsaW5lLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFFekQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDM0UsT0FBTyxFQUFFLGNBQWMsRUFBbUIsTUFBTSxZQUFZLENBQUM7QUFRN0QsTUFBTSxPQUFPLG1CQUFtQjs7Ozs7SUFVOUIsWUFDRSxTQUE4QixFQUN0QixjQUE4QjtRQUE5QixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFFcEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7SUFDN0IsQ0FBQzs7OztJQVRILElBQUksR0FBRztRQUNMLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUM7SUFDNUIsQ0FBQzs7OztJQVNELGVBQWU7UUFDYixJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksRUFBRSxDQUFDLFNBQVM7Ozs7UUFBQyxDQUFDLEtBQXNCLEVBQUUsRUFBRTtZQUN0RSxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUNuQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDckIsQ0FBQyxFQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxTQUFTOzs7O1FBQUMsQ0FBQyxNQUFlLEVBQUUsRUFBRTtZQUM3QyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDckIsQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDOzs7OztJQUVPLFdBQVc7O1lBQ2IsYUFBYTs7Y0FDWCxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSztRQUN4QyxTQUFTLENBQUMsT0FBTzs7OztRQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3hCLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsSUFBSSxLQUFLLEtBQUssRUFBRTtnQkFDOUMsYUFBYSxHQUFHLENBQUMsbUJBQUEsS0FBSyxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQXdCLENBQUMsQ0FBQztnQkFDdEUsS0FBSyxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQzthQUM5QjtpQkFBTSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLElBQUksS0FBSyxLQUFLLEVBQUU7Z0JBQ3JELGFBQWEsR0FBRyxDQUFDLG1CQUFBLEtBQUssQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUF3QixDQUFDLENBQUM7YUFDdkU7aUJBQU0sSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxJQUFJLEtBQUssUUFBUSxFQUFFO2dCQUN4RCxhQUFhLEdBQUcsQ0FBQyxtQkFBQSxLQUFLLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBNEIsQ0FBQyxDQUFDO2FBQzNFO2lCQUFNO2dCQUNMLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEtBQUssS0FBSyxFQUFFO29CQUNuQyxLQUFLLENBQUMsRUFBRSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUM3QixPQUFPO2lCQUNSO3FCQUFNLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEtBQUssSUFBSSxFQUFFO29CQUN6QyxLQUFLLENBQUMsRUFBRSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUNwQyxPQUFPO2lCQUNSO2FBQ0Y7WUFDRCxJQUFJLGFBQWEsQ0FBQyxXQUFXO2dCQUMzQixJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsS0FBSyxLQUFLLEVBQUU7Z0JBQy9CLElBQUksYUFBYSxDQUFDLElBQUksS0FBSyxRQUFRLEVBQUU7b0JBQ25DLE9BQU87aUJBQ1I7Z0JBQ0QsS0FBSyxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2FBQzFEO2lCQUFNLElBQUksYUFBYSxDQUFDLFdBQVc7Z0JBQ2xDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxLQUFLLElBQUksRUFBRTtnQkFDOUIsSUFBSSxhQUFhLENBQUMsSUFBSSxLQUFLLFFBQVEsRUFBRTtvQkFDbkMsT0FBTztpQkFDUjtnQkFDRCxLQUFLLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDbEQ7aUJBQU07Z0JBQ0wsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsS0FBSyxLQUFLLEVBQUU7b0JBQ25DLEtBQUssQ0FBQyxFQUFFLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQzlCO3FCQUFNLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEtBQUssSUFBSSxFQUFFO29CQUN6QyxLQUFLLENBQUMsRUFBRSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDO2lCQUNyQzthQUNGO1FBQ0gsQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDOzs7WUF2RUYsU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxpQkFBaUI7YUFDNUI7Ozs7WUFSTSxtQkFBbUI7WUFDbkIsY0FBYzs7Ozs7OztJQVVyQix3Q0FBZ0M7Ozs7O0lBQ2hDLG9DQUErQjs7Ozs7SUFDL0Isd0NBQXVDOzs7OztJQVFyQyw2Q0FBc0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEFmdGVyVmlld0luaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSWdvTWFwIH0gZnJvbSAnLi9tYXAnO1xyXG5pbXBvcnQgeyBNYXBCcm93c2VyQ29tcG9uZW50IH0gZnJvbSAnLi4vbWFwLWJyb3dzZXIvbWFwLWJyb3dzZXIuY29tcG9uZW50JztcclxuaW1wb3J0IHsgTmV0d29ya1NlcnZpY2UsIENvbm5lY3Rpb25TdGF0ZSB9IGZyb20gJ0BpZ28yL2NvcmUnO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgTGF5ZXIgfSBmcm9tICcuLi8uLi9sYXllci9zaGFyZWQvbGF5ZXJzL2xheWVyJztcclxuaW1wb3J0IHsgTVZURGF0YVNvdXJjZU9wdGlvbnMsIFhZWkRhdGFTb3VyY2VPcHRpb25zLCBGZWF0dXJlRGF0YVNvdXJjZU9wdGlvbnMgfSBmcm9tICcuLi8uLi9kYXRhc291cmNlJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gICAgc2VsZWN0b3I6ICdbaWdvTWFwT2ZmbGluZV0nXHJcbiAgfSlcclxuZXhwb3J0IGNsYXNzIE1hcE9mZmxpbmVEaXJlY3RpdmUgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcclxuXHJcbiAgcHJpdmF0ZSBjb250ZXh0JCQ6IFN1YnNjcmlwdGlvbjtcclxuICBwcml2YXRlIHN0YXRlOiBDb25uZWN0aW9uU3RhdGU7XHJcbiAgcHJpdmF0ZSBjb21wb25lbnQ6IE1hcEJyb3dzZXJDb21wb25lbnQ7XHJcblxyXG4gIGdldCBtYXAoKTogSWdvTWFwIHtcclxuICAgIHJldHVybiB0aGlzLmNvbXBvbmVudC5tYXA7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIGNvbXBvbmVudDogTWFwQnJvd3NlckNvbXBvbmVudCxcclxuICAgIHByaXZhdGUgbmV0d29ya1NlcnZpY2U6IE5ldHdvcmtTZXJ2aWNlXHJcbiAgICApIHtcclxuICAgICAgdGhpcy5jb21wb25lbnQgPSBjb21wb25lbnQ7XHJcbiAgICB9XHJcblxyXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcclxuICAgIHRoaXMubmV0d29ya1NlcnZpY2UuY3VycmVudFN0YXRlKCkuc3Vic2NyaWJlKChzdGF0ZTogQ29ubmVjdGlvblN0YXRlKSA9PiB7XHJcbiAgICAgIHRoaXMuc3RhdGUgPSBzdGF0ZTtcclxuICAgICAgdGhpcy5jaGFuZ2VMYXllcigpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5tYXAubGF5ZXJzJC5zdWJzY3JpYmUoKGxheWVyczogTGF5ZXJbXSkgPT4ge1xyXG4gICAgICB0aGlzLmNoYW5nZUxheWVyKCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY2hhbmdlTGF5ZXIoKSB7XHJcbiAgICBsZXQgc291cmNlT3B0aW9ucztcclxuICAgIGNvbnN0IGxheWVyTGlzdCA9IHRoaXMubWFwLmxheWVycyQudmFsdWU7XHJcbiAgICBsYXllckxpc3QuZm9yRWFjaChsYXllciA9PiB7XHJcbiAgICAgIGlmIChsYXllci5vcHRpb25zLnNvdXJjZU9wdGlvbnMudHlwZSA9PT0gJ212dCcpIHtcclxuICAgICAgICBzb3VyY2VPcHRpb25zID0gKGxheWVyLm9wdGlvbnMuc291cmNlT3B0aW9ucyBhcyBNVlREYXRhU291cmNlT3B0aW9ucyk7XHJcbiAgICAgICAgbGF5ZXIub2wuZ2V0U291cmNlKCkuY2xlYXIoKTtcclxuICAgICAgfSBlbHNlIGlmIChsYXllci5vcHRpb25zLnNvdXJjZU9wdGlvbnMudHlwZSA9PT0gJ3h5eicpIHtcclxuICAgICAgICBzb3VyY2VPcHRpb25zID0gKGxheWVyLm9wdGlvbnMuc291cmNlT3B0aW9ucyBhcyBYWVpEYXRhU291cmNlT3B0aW9ucyk7XHJcbiAgICAgIH0gZWxzZSBpZiAobGF5ZXIub3B0aW9ucy5zb3VyY2VPcHRpb25zLnR5cGUgPT09ICd2ZWN0b3InKSB7XHJcbiAgICAgICAgc291cmNlT3B0aW9ucyA9IChsYXllci5vcHRpb25zLnNvdXJjZU9wdGlvbnMgYXMgRmVhdHVyZURhdGFTb3VyY2VPcHRpb25zKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAodGhpcy5zdGF0ZS5jb25uZWN0aW9uID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgbGF5ZXIub2wuc2V0TWF4UmVzb2x1dGlvbigwKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc3RhdGUuY29ubmVjdGlvbiA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgbGF5ZXIub2wuc2V0TWF4UmVzb2x1dGlvbihJbmZpbml0eSk7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGlmIChzb3VyY2VPcHRpb25zLnBhdGhPZmZsaW5lICAmJlxyXG4gICAgICAgIHRoaXMuc3RhdGUuY29ubmVjdGlvbiA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgIGlmIChzb3VyY2VPcHRpb25zLnR5cGUgPT09ICd2ZWN0b3InKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGxheWVyLm9sLmdldFNvdXJjZSgpLnNldFVybChzb3VyY2VPcHRpb25zLnBhdGhPZmZsaW5lKTtcclxuICAgICAgfSBlbHNlIGlmIChzb3VyY2VPcHRpb25zLnBhdGhPZmZsaW5lICYmXHJcbiAgICAgICAgdGhpcy5zdGF0ZS5jb25uZWN0aW9uID09PSB0cnVlKSB7XHJcbiAgICAgICAgICBpZiAoc291cmNlT3B0aW9ucy50eXBlID09PSAndmVjdG9yJykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBsYXllci5vbC5nZXRTb3VyY2UoKS5zZXRVcmwoc291cmNlT3B0aW9ucy51cmwpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmNvbm5lY3Rpb24gPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICBsYXllci5vbC5zZXRNYXhSZXNvbHV0aW9uKDApO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5zdGF0ZS5jb25uZWN0aW9uID09PSB0cnVlKSB7XHJcbiAgICAgICAgICBsYXllci5vbC5zZXRNYXhSZXNvbHV0aW9uKEluZmluaXR5KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iXX0=
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
                return;
            }
            if (sourceOptions.pathOffline &&
                this.state.connection === false) {
                if (sourceOptions.excludeAttributeOffline) {
                    sourceOptions.excludeAttributeBackUp = sourceOptions.excludeAttribute;
                    sourceOptions.excludeAttribute = sourceOptions.excludeAttributeOffline;
                }
                layer.ol.getSource().setUrl(sourceOptions.pathOffline);
            }
            else if (sourceOptions.pathOffline &&
                this.state.connection === true) {
                if (sourceOptions.excludeAttributeBackUp) {
                    sourceOptions.excludeAttribute = sourceOptions.excludeAttributeBackUp;
                }
                layer.ol.getSource().setUrl(sourceOptions.url);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwT2ZmbGluZS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvbWFwL3NoYXJlZC9tYXBPZmZsaW5lLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFFekQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDM0UsT0FBTyxFQUFFLGNBQWMsRUFBbUIsTUFBTSxZQUFZLENBQUM7QUFRN0QsTUFBTSxPQUFPLG1CQUFtQjs7Ozs7SUFVOUIsWUFDRSxTQUE4QixFQUN0QixjQUE4QjtRQUE5QixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFFcEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7SUFDN0IsQ0FBQzs7OztJQVRILElBQUksR0FBRztRQUNMLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUM7SUFDNUIsQ0FBQzs7OztJQVNELGVBQWU7UUFDYixJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksRUFBRSxDQUFDLFNBQVM7Ozs7UUFBQyxDQUFDLEtBQXNCLEVBQUUsRUFBRTtZQUN0RSxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ25CLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1lBQ25CLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNyQixDQUFDLEVBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFNBQVM7Ozs7UUFBQyxDQUFDLE1BQWUsRUFBRSxFQUFFO1lBQzdDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNyQixDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7Ozs7O0lBRU8sV0FBVzs7WUFDYixhQUFhOztjQUNYLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLO1FBQ3hDLFNBQVMsQ0FBQyxPQUFPOzs7O1FBQUMsS0FBSyxDQUFDLEVBQUU7WUFDeEIsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxJQUFJLEtBQUssS0FBSyxFQUFFO2dCQUM5QyxhQUFhLEdBQUcsQ0FBQyxtQkFBQSxLQUFLLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBd0IsQ0FBQyxDQUFDO2dCQUN0RSxLQUFLLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDO2FBQzlCO2lCQUFNLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsSUFBSSxLQUFLLEtBQUssRUFBRTtnQkFDckQsYUFBYSxHQUFHLENBQUMsbUJBQUEsS0FBSyxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQXdCLENBQUMsQ0FBQzthQUN2RTtpQkFBTSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLElBQUksS0FBSyxRQUFRLEVBQUU7Z0JBQ3hELGFBQWEsR0FBRyxDQUFDLG1CQUFBLEtBQUssQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUE0QixDQUFDLENBQUM7YUFDM0U7aUJBQU07Z0JBQ0wsT0FBTzthQUNSO1lBQ0QsSUFBSSxhQUFhLENBQUMsV0FBVztnQkFDM0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEtBQUssS0FBSyxFQUFFO2dCQUMvQixJQUFJLGFBQWEsQ0FBQyx1QkFBdUIsRUFBRTtvQkFDekMsYUFBYSxDQUFDLHNCQUFzQixHQUFHLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQztvQkFDdEUsYUFBYSxDQUFDLGdCQUFnQixHQUFHLGFBQWEsQ0FBQyx1QkFBdUIsQ0FBQztpQkFDeEU7Z0JBQ0QsS0FBSyxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2FBQzFEO2lCQUFNLElBQUksYUFBYSxDQUFDLFdBQVc7Z0JBQ2xDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxLQUFLLElBQUksRUFBRTtnQkFDOUIsSUFBSSxhQUFhLENBQUMsc0JBQXNCLEVBQUU7b0JBQ3hDLGFBQWEsQ0FBQyxnQkFBZ0IsR0FBRyxhQUFhLENBQUMsc0JBQXNCLENBQUM7aUJBQ3ZFO2dCQUNELEtBQUssQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUNsRDtRQUNILENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7O1lBN0RGLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsaUJBQWlCO2FBQzVCOzs7O1lBUk0sbUJBQW1CO1lBQ25CLGNBQWM7Ozs7Ozs7SUFVckIsd0NBQWdDOzs7OztJQUNoQyxvQ0FBK0I7Ozs7O0lBQy9CLHdDQUF1Qzs7Ozs7SUFRckMsNkNBQXNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBBZnRlclZpZXdJbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IElnb01hcCB9IGZyb20gJy4vbWFwJztcclxuaW1wb3J0IHsgTWFwQnJvd3NlckNvbXBvbmVudCB9IGZyb20gJy4uL21hcC1icm93c2VyL21hcC1icm93c2VyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE5ldHdvcmtTZXJ2aWNlLCBDb25uZWN0aW9uU3RhdGUgfSBmcm9tICdAaWdvMi9jb3JlJztcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IExheWVyIH0gZnJvbSAnLi4vLi4vbGF5ZXIvc2hhcmVkL2xheWVycy9sYXllcic7XHJcbmltcG9ydCB7IE1WVERhdGFTb3VyY2VPcHRpb25zLCBYWVpEYXRhU291cmNlT3B0aW9ucywgRmVhdHVyZURhdGFTb3VyY2VPcHRpb25zIH0gZnJvbSAnLi4vLi4vZGF0YXNvdXJjZSc7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICAgIHNlbGVjdG9yOiAnW2lnb01hcE9mZmxpbmVdJ1xyXG4gIH0pXHJcbmV4cG9ydCBjbGFzcyBNYXBPZmZsaW5lRGlyZWN0aXZlIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XHJcblxyXG4gIHByaXZhdGUgY29udGV4dCQkOiBTdWJzY3JpcHRpb247XHJcbiAgcHJpdmF0ZSBzdGF0ZTogQ29ubmVjdGlvblN0YXRlO1xyXG4gIHByaXZhdGUgY29tcG9uZW50OiBNYXBCcm93c2VyQ29tcG9uZW50O1xyXG5cclxuICBnZXQgbWFwKCk6IElnb01hcCB7XHJcbiAgICByZXR1cm4gdGhpcy5jb21wb25lbnQubWFwO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBjb21wb25lbnQ6IE1hcEJyb3dzZXJDb21wb25lbnQsXHJcbiAgICBwcml2YXRlIG5ldHdvcmtTZXJ2aWNlOiBOZXR3b3JrU2VydmljZVxyXG4gICAgKSB7XHJcbiAgICAgIHRoaXMuY29tcG9uZW50ID0gY29tcG9uZW50O1xyXG4gICAgfVxyXG5cclxuICBuZ0FmdGVyVmlld0luaXQoKSB7XHJcbiAgICB0aGlzLm5ldHdvcmtTZXJ2aWNlLmN1cnJlbnRTdGF0ZSgpLnN1YnNjcmliZSgoc3RhdGU6IENvbm5lY3Rpb25TdGF0ZSkgPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZyhzdGF0ZSk7XHJcbiAgICAgIHRoaXMuc3RhdGUgPSBzdGF0ZTtcclxuICAgICAgdGhpcy5jaGFuZ2VMYXllcigpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5tYXAubGF5ZXJzJC5zdWJzY3JpYmUoKGxheWVyczogTGF5ZXJbXSkgPT4ge1xyXG4gICAgICB0aGlzLmNoYW5nZUxheWVyKCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY2hhbmdlTGF5ZXIoKSB7XHJcbiAgICBsZXQgc291cmNlT3B0aW9ucztcclxuICAgIGNvbnN0IGxheWVyTGlzdCA9IHRoaXMubWFwLmxheWVycyQudmFsdWU7XHJcbiAgICBsYXllckxpc3QuZm9yRWFjaChsYXllciA9PiB7XHJcbiAgICAgIGlmIChsYXllci5vcHRpb25zLnNvdXJjZU9wdGlvbnMudHlwZSA9PT0gJ212dCcpIHtcclxuICAgICAgICBzb3VyY2VPcHRpb25zID0gKGxheWVyLm9wdGlvbnMuc291cmNlT3B0aW9ucyBhcyBNVlREYXRhU291cmNlT3B0aW9ucyk7XHJcbiAgICAgICAgbGF5ZXIub2wuZ2V0U291cmNlKCkuY2xlYXIoKTtcclxuICAgICAgfSBlbHNlIGlmIChsYXllci5vcHRpb25zLnNvdXJjZU9wdGlvbnMudHlwZSA9PT0gJ3h5eicpIHtcclxuICAgICAgICBzb3VyY2VPcHRpb25zID0gKGxheWVyLm9wdGlvbnMuc291cmNlT3B0aW9ucyBhcyBYWVpEYXRhU291cmNlT3B0aW9ucyk7XHJcbiAgICAgIH0gZWxzZSBpZiAobGF5ZXIub3B0aW9ucy5zb3VyY2VPcHRpb25zLnR5cGUgPT09ICd2ZWN0b3InKSB7XHJcbiAgICAgICAgc291cmNlT3B0aW9ucyA9IChsYXllci5vcHRpb25zLnNvdXJjZU9wdGlvbnMgYXMgRmVhdHVyZURhdGFTb3VyY2VPcHRpb25zKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHNvdXJjZU9wdGlvbnMucGF0aE9mZmxpbmUgICYmXHJcbiAgICAgICAgdGhpcy5zdGF0ZS5jb25uZWN0aW9uID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgaWYgKHNvdXJjZU9wdGlvbnMuZXhjbHVkZUF0dHJpYnV0ZU9mZmxpbmUpIHtcclxuICAgICAgICAgICAgc291cmNlT3B0aW9ucy5leGNsdWRlQXR0cmlidXRlQmFja1VwID0gc291cmNlT3B0aW9ucy5leGNsdWRlQXR0cmlidXRlO1xyXG4gICAgICAgICAgICBzb3VyY2VPcHRpb25zLmV4Y2x1ZGVBdHRyaWJ1dGUgPSBzb3VyY2VPcHRpb25zLmV4Y2x1ZGVBdHRyaWJ1dGVPZmZsaW5lO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgbGF5ZXIub2wuZ2V0U291cmNlKCkuc2V0VXJsKHNvdXJjZU9wdGlvbnMucGF0aE9mZmxpbmUpO1xyXG4gICAgICB9IGVsc2UgaWYgKHNvdXJjZU9wdGlvbnMucGF0aE9mZmxpbmUgJiZcclxuICAgICAgICB0aGlzLnN0YXRlLmNvbm5lY3Rpb24gPT09IHRydWUpIHtcclxuICAgICAgICAgIGlmIChzb3VyY2VPcHRpb25zLmV4Y2x1ZGVBdHRyaWJ1dGVCYWNrVXApIHtcclxuICAgICAgICAgICAgc291cmNlT3B0aW9ucy5leGNsdWRlQXR0cmlidXRlID0gc291cmNlT3B0aW9ucy5leGNsdWRlQXR0cmlidXRlQmFja1VwO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgbGF5ZXIub2wuZ2V0U291cmNlKCkuc2V0VXJsKHNvdXJjZU9wdGlvbnMudXJsKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==
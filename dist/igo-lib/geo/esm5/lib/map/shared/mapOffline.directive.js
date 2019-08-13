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
                return;
            }
            if (sourceOptions.pathOffline &&
                _this.state.connection === false) {
                if (sourceOptions.excludeAttributeOffline) {
                    sourceOptions.excludeAttributeBackUp = sourceOptions.excludeAttribute;
                    sourceOptions.excludeAttribute = sourceOptions.excludeAttributeOffline;
                }
                layer.ol.getSource().setUrl(sourceOptions.pathOffline);
            }
            else if (sourceOptions.pathOffline &&
                _this.state.connection === true) {
                if (sourceOptions.excludeAttributeBackUp) {
                    sourceOptions.excludeAttribute = sourceOptions.excludeAttributeBackUp;
                }
                layer.ol.getSource().setUrl(sourceOptions.url);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwT2ZmbGluZS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvbWFwL3NoYXJlZC9tYXBPZmZsaW5lLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFFekQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDM0UsT0FBTyxFQUFFLGNBQWMsRUFBbUIsTUFBTSxZQUFZLENBQUM7QUFLN0Q7SUFhRSw2QkFDRSxTQUE4QixFQUN0QixjQUE4QjtRQUE5QixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFFcEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7SUFDN0IsQ0FBQztJQVRILHNCQUFJLG9DQUFHOzs7O1FBQVA7WUFDRSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDO1FBQzVCLENBQUM7OztPQUFBOzs7O0lBU0QsNkNBQWU7OztJQUFmO1FBQUEsaUJBVUM7UUFUQyxJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksRUFBRSxDQUFDLFNBQVM7Ozs7UUFBQyxVQUFDLEtBQXNCO1lBQ2xFLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDbkIsS0FBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7WUFDbkIsS0FBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3JCLENBQUMsRUFBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsU0FBUzs7OztRQUFDLFVBQUMsTUFBZTtZQUN6QyxLQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDckIsQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDOzs7OztJQUVPLHlDQUFXOzs7O0lBQW5CO1FBQUEsaUJBNkJDOztZQTVCSyxhQUFhOztZQUNYLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLO1FBQ3hDLFNBQVMsQ0FBQyxPQUFPOzs7O1FBQUMsVUFBQSxLQUFLO1lBQ3JCLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsSUFBSSxLQUFLLEtBQUssRUFBRTtnQkFDOUMsYUFBYSxHQUFHLENBQUMsbUJBQUEsS0FBSyxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQXdCLENBQUMsQ0FBQztnQkFDdEUsS0FBSyxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQzthQUM5QjtpQkFBTSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLElBQUksS0FBSyxLQUFLLEVBQUU7Z0JBQ3JELGFBQWEsR0FBRyxDQUFDLG1CQUFBLEtBQUssQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUF3QixDQUFDLENBQUM7YUFDdkU7aUJBQU0sSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxJQUFJLEtBQUssUUFBUSxFQUFFO2dCQUN4RCxhQUFhLEdBQUcsQ0FBQyxtQkFBQSxLQUFLLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBNEIsQ0FBQyxDQUFDO2FBQzNFO2lCQUFNO2dCQUNMLE9BQU87YUFDUjtZQUNELElBQUksYUFBYSxDQUFDLFdBQVc7Z0JBQzNCLEtBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxLQUFLLEtBQUssRUFBRTtnQkFDL0IsSUFBSSxhQUFhLENBQUMsdUJBQXVCLEVBQUU7b0JBQ3pDLGFBQWEsQ0FBQyxzQkFBc0IsR0FBRyxhQUFhLENBQUMsZ0JBQWdCLENBQUM7b0JBQ3RFLGFBQWEsQ0FBQyxnQkFBZ0IsR0FBRyxhQUFhLENBQUMsdUJBQXVCLENBQUM7aUJBQ3hFO2dCQUNELEtBQUssQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQzthQUMxRDtpQkFBTSxJQUFJLGFBQWEsQ0FBQyxXQUFXO2dCQUNsQyxLQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsS0FBSyxJQUFJLEVBQUU7Z0JBQzlCLElBQUksYUFBYSxDQUFDLHNCQUFzQixFQUFFO29CQUN4QyxhQUFhLENBQUMsZ0JBQWdCLEdBQUcsYUFBYSxDQUFDLHNCQUFzQixDQUFDO2lCQUN2RTtnQkFDRCxLQUFLLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDbEQ7UUFDSCxDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7O2dCQTdERixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLGlCQUFpQjtpQkFDNUI7Ozs7Z0JBUk0sbUJBQW1CO2dCQUNuQixjQUFjOztJQW1FdkIsMEJBQUM7Q0FBQSxBQTlERCxJQThEQztTQTNEWSxtQkFBbUI7Ozs7OztJQUU5Qix3Q0FBZ0M7Ozs7O0lBQ2hDLG9DQUErQjs7Ozs7SUFDL0Isd0NBQXVDOzs7OztJQVFyQyw2Q0FBc0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEFmdGVyVmlld0luaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSWdvTWFwIH0gZnJvbSAnLi9tYXAnO1xyXG5pbXBvcnQgeyBNYXBCcm93c2VyQ29tcG9uZW50IH0gZnJvbSAnLi4vbWFwLWJyb3dzZXIvbWFwLWJyb3dzZXIuY29tcG9uZW50JztcclxuaW1wb3J0IHsgTmV0d29ya1NlcnZpY2UsIENvbm5lY3Rpb25TdGF0ZSB9IGZyb20gJ0BpZ28yL2NvcmUnO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgTGF5ZXIgfSBmcm9tICcuLi8uLi9sYXllci9zaGFyZWQvbGF5ZXJzL2xheWVyJztcclxuaW1wb3J0IHsgTVZURGF0YVNvdXJjZU9wdGlvbnMsIFhZWkRhdGFTb3VyY2VPcHRpb25zLCBGZWF0dXJlRGF0YVNvdXJjZU9wdGlvbnMgfSBmcm9tICcuLi8uLi9kYXRhc291cmNlJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gICAgc2VsZWN0b3I6ICdbaWdvTWFwT2ZmbGluZV0nXHJcbiAgfSlcclxuZXhwb3J0IGNsYXNzIE1hcE9mZmxpbmVEaXJlY3RpdmUgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcclxuXHJcbiAgcHJpdmF0ZSBjb250ZXh0JCQ6IFN1YnNjcmlwdGlvbjtcclxuICBwcml2YXRlIHN0YXRlOiBDb25uZWN0aW9uU3RhdGU7XHJcbiAgcHJpdmF0ZSBjb21wb25lbnQ6IE1hcEJyb3dzZXJDb21wb25lbnQ7XHJcblxyXG4gIGdldCBtYXAoKTogSWdvTWFwIHtcclxuICAgIHJldHVybiB0aGlzLmNvbXBvbmVudC5tYXA7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIGNvbXBvbmVudDogTWFwQnJvd3NlckNvbXBvbmVudCxcclxuICAgIHByaXZhdGUgbmV0d29ya1NlcnZpY2U6IE5ldHdvcmtTZXJ2aWNlXHJcbiAgICApIHtcclxuICAgICAgdGhpcy5jb21wb25lbnQgPSBjb21wb25lbnQ7XHJcbiAgICB9XHJcblxyXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcclxuICAgIHRoaXMubmV0d29ya1NlcnZpY2UuY3VycmVudFN0YXRlKCkuc3Vic2NyaWJlKChzdGF0ZTogQ29ubmVjdGlvblN0YXRlKSA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKHN0YXRlKTtcclxuICAgICAgdGhpcy5zdGF0ZSA9IHN0YXRlO1xyXG4gICAgICB0aGlzLmNoYW5nZUxheWVyKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLm1hcC5sYXllcnMkLnN1YnNjcmliZSgobGF5ZXJzOiBMYXllcltdKSA9PiB7XHJcbiAgICAgIHRoaXMuY2hhbmdlTGF5ZXIoKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjaGFuZ2VMYXllcigpIHtcclxuICAgIGxldCBzb3VyY2VPcHRpb25zO1xyXG4gICAgY29uc3QgbGF5ZXJMaXN0ID0gdGhpcy5tYXAubGF5ZXJzJC52YWx1ZTtcclxuICAgIGxheWVyTGlzdC5mb3JFYWNoKGxheWVyID0+IHtcclxuICAgICAgaWYgKGxheWVyLm9wdGlvbnMuc291cmNlT3B0aW9ucy50eXBlID09PSAnbXZ0Jykge1xyXG4gICAgICAgIHNvdXJjZU9wdGlvbnMgPSAobGF5ZXIub3B0aW9ucy5zb3VyY2VPcHRpb25zIGFzIE1WVERhdGFTb3VyY2VPcHRpb25zKTtcclxuICAgICAgICBsYXllci5vbC5nZXRTb3VyY2UoKS5jbGVhcigpO1xyXG4gICAgICB9IGVsc2UgaWYgKGxheWVyLm9wdGlvbnMuc291cmNlT3B0aW9ucy50eXBlID09PSAneHl6Jykge1xyXG4gICAgICAgIHNvdXJjZU9wdGlvbnMgPSAobGF5ZXIub3B0aW9ucy5zb3VyY2VPcHRpb25zIGFzIFhZWkRhdGFTb3VyY2VPcHRpb25zKTtcclxuICAgICAgfSBlbHNlIGlmIChsYXllci5vcHRpb25zLnNvdXJjZU9wdGlvbnMudHlwZSA9PT0gJ3ZlY3RvcicpIHtcclxuICAgICAgICBzb3VyY2VPcHRpb25zID0gKGxheWVyLm9wdGlvbnMuc291cmNlT3B0aW9ucyBhcyBGZWF0dXJlRGF0YVNvdXJjZU9wdGlvbnMpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICBpZiAoc291cmNlT3B0aW9ucy5wYXRoT2ZmbGluZSAgJiZcclxuICAgICAgICB0aGlzLnN0YXRlLmNvbm5lY3Rpb24gPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICBpZiAoc291cmNlT3B0aW9ucy5leGNsdWRlQXR0cmlidXRlT2ZmbGluZSkge1xyXG4gICAgICAgICAgICBzb3VyY2VPcHRpb25zLmV4Y2x1ZGVBdHRyaWJ1dGVCYWNrVXAgPSBzb3VyY2VPcHRpb25zLmV4Y2x1ZGVBdHRyaWJ1dGU7XHJcbiAgICAgICAgICAgIHNvdXJjZU9wdGlvbnMuZXhjbHVkZUF0dHJpYnV0ZSA9IHNvdXJjZU9wdGlvbnMuZXhjbHVkZUF0dHJpYnV0ZU9mZmxpbmU7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBsYXllci5vbC5nZXRTb3VyY2UoKS5zZXRVcmwoc291cmNlT3B0aW9ucy5wYXRoT2ZmbGluZSk7XHJcbiAgICAgIH0gZWxzZSBpZiAoc291cmNlT3B0aW9ucy5wYXRoT2ZmbGluZSAmJlxyXG4gICAgICAgIHRoaXMuc3RhdGUuY29ubmVjdGlvbiA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgaWYgKHNvdXJjZU9wdGlvbnMuZXhjbHVkZUF0dHJpYnV0ZUJhY2tVcCkge1xyXG4gICAgICAgICAgICBzb3VyY2VPcHRpb25zLmV4Y2x1ZGVBdHRyaWJ1dGUgPSBzb3VyY2VPcHRpb25zLmV4Y2x1ZGVBdHRyaWJ1dGVCYWNrVXA7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBsYXllci5vbC5nZXRTb3VyY2UoKS5zZXRVcmwoc291cmNlT3B0aW9ucy51cmwpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIl19
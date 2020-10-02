/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive } from '@angular/core';
import { NetworkService, MessageService, LanguageService } from '@igo2/core';
import { MapBrowserComponent } from '../map-browser/map-browser.component';
import { ClusterDataSource } from '../../datasource/shared/datasources/cluster-datasource';
import { MVTDataSource } from '../../datasource/shared/datasources/mvt-datasource';
import { FeatureDataSource } from '../../datasource/shared/datasources/feature-datasource';
import { XYZDataSource } from '../../datasource/shared/datasources/xyz-datasource';
var MapOfflineDirective = /** @class */ (function () {
    function MapOfflineDirective(component, networkService, messageService, languageService) {
        this.networkService = networkService;
        this.messageService = messageService;
        this.languageService = languageService;
        this.offlineButtonStatus = false;
        this.networkState = {
            connection: true
        };
        this.offlineButtonState = {
            connection: true
        };
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
        this.map.offlineButtonToggle$.subscribe((/**
         * @param {?} offlineButtonToggle
         * @return {?}
         */
        function (offlineButtonToggle) {
            _this.offlineButtonStatus = offlineButtonToggle;
            /** @type {?} */
            var translate = _this.languageService.translate;
            if (_this.offlineButtonStatus && _this.networkState.connection) {
                /** @type {?} */
                var message = translate.instant('igo.geo.network.offline.message');
                /** @type {?} */
                var title = translate.instant('igo.geo.network.offline.title');
                _this.messageService.info(message, title);
                _this.offlineButtonState.connection = false;
                _this.changeLayer();
            }
            else if (!_this.offlineButtonStatus && !_this.networkState.connection) {
                /** @type {?} */
                var message = translate.instant('igo.geo.network.offline.message');
                /** @type {?} */
                var title = translate.instant('igo.geo.network.offline.title');
                _this.messageService.info(message, title);
                _this.offlineButtonState.connection = false;
                _this.changeLayer();
            }
            else if (!_this.offlineButtonStatus && _this.networkState.connection) {
                /** @type {?} */
                var message_1;
                /** @type {?} */
                var title_1;
                /** @type {?} */
                var messageObs = translate.get('igo.geo.network.online.message');
                /** @type {?} */
                var titleObs = translate.get('igo.geo.network.online.title');
                messageObs.subscribe((/**
                 * @param {?} message1
                 * @return {?}
                 */
                function (message1) {
                    message_1 = message1;
                }));
                titleObs.subscribe((/**
                 * @param {?} title1
                 * @return {?}
                 */
                function (title1) {
                    title_1 = title1;
                }));
                _this.messageService.info(message_1, title_1);
                _this.offlineButtonState.connection = true;
                _this.changeLayer();
            }
        }));
        this.networkService.currentState().subscribe((/**
         * @param {?} state
         * @return {?}
         */
        function (state) {
            _this.networkState = state;
            if (!_this.offlineButtonStatus) {
                _this.changeLayer();
            }
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
            if (layer.options.source instanceof MVTDataSource) {
                sourceOptions = ((/** @type {?} */ (layer.options.sourceOptions)));
                layer.ol.getSource().clear();
            }
            else if (layer.options.source instanceof XYZDataSource) {
                sourceOptions = ((/** @type {?} */ (layer.options.sourceOptions)));
            }
            else if (layer.options.source instanceof ClusterDataSource) {
                sourceOptions = ((/** @type {?} */ (layer.options.sourceOptions)));
            }
            else if (layer.options.source instanceof FeatureDataSource) {
                sourceOptions = ((/** @type {?} */ (layer.options.sourceOptions)));
            }
            else {
                if (_this.networkState.connection === false || _this.offlineButtonState.connection === false) {
                    layer.ol.setMaxResolution(0);
                    return;
                }
                else if (_this.networkState.connection === true || _this.offlineButtonState.connection === true) {
                    layer.ol.setMaxResolution(Infinity);
                    return;
                }
            }
            if (sourceOptions) {
                if (sourceOptions.pathOffline && _this.networkState.connection === false ||
                    sourceOptions.pathOffline && _this.offlineButtonState.connection === false) {
                    if (sourceOptions.type === 'vector' || sourceOptions.type === 'cluster') {
                        return;
                    }
                    layer.ol.getSource().setUrl(sourceOptions.pathOffline);
                }
                else if (sourceOptions.pathOffline && _this.networkState.connection === false ||
                    sourceOptions.pathOffline && _this.offlineButtonState.connection === true) {
                    if (sourceOptions.type === 'vector' || sourceOptions.type === 'cluster') {
                        return;
                    }
                    layer.ol.getSource().setUrl(sourceOptions.url);
                }
                else {
                    if (_this.networkState.connection === false || _this.offlineButtonState.connection === false) {
                        layer.ol.setMaxResolution(0);
                    }
                    else if (_this.networkState.connection === true || _this.offlineButtonState.connection === true) {
                        layer.ol.setMaxResolution(Infinity);
                    }
                }
            }
            else {
                if (_this.networkState.connection === false || _this.offlineButtonState.connection === false) {
                    layer.ol.setMaxResolution(0);
                }
                else if (_this.networkState.connection === true || _this.offlineButtonState.connection === true) {
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
        { type: NetworkService },
        { type: MessageService },
        { type: LanguageService }
    ]; };
    return MapOfflineDirective;
}());
export { MapOfflineDirective };
if (false) {
    /**
     * @type {?}
     * @private
     */
    MapOfflineDirective.prototype.component;
    /**
     * @type {?}
     * @private
     */
    MapOfflineDirective.prototype.offlineButtonStatus;
    /**
     * @type {?}
     * @private
     */
    MapOfflineDirective.prototype.networkState;
    /**
     * @type {?}
     * @private
     */
    MapOfflineDirective.prototype.offlineButtonState;
    /**
     * @type {?}
     * @private
     */
    MapOfflineDirective.prototype.networkService;
    /**
     * @type {?}
     * @private
     */
    MapOfflineDirective.prototype.messageService;
    /**
     * @type {?}
     * @private
     */
    MapOfflineDirective.prototype.languageService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwT2ZmbGluZS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvbWFwL3NoYXJlZC9tYXBPZmZsaW5lLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFDekQsT0FBTyxFQUFFLGNBQWMsRUFBbUIsY0FBYyxFQUFFLGVBQWUsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUc5RixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQU0zRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx3REFBd0QsQ0FBQztBQUMzRixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sb0RBQW9ELENBQUM7QUFDbkYsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sd0RBQXdELENBQUM7QUFDM0YsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG9EQUFvRCxDQUFDO0FBRW5GO0lBa0JFLDZCQUNFLFNBQThCLEVBQ3RCLGNBQThCLEVBQzlCLGNBQThCLEVBQzlCLGVBQWdDO1FBRmhDLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBaEJsQyx3QkFBbUIsR0FBWSxLQUFLLENBQUM7UUFDckMsaUJBQVksR0FBb0I7WUFDdEMsVUFBVSxFQUFFLElBQUk7U0FDakIsQ0FBQztRQUNNLHVCQUFrQixHQUFvQjtZQUM1QyxVQUFVLEVBQUUsSUFBSTtTQUNqQixDQUFDO1FBWUUsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7SUFDN0IsQ0FBQztJQVhILHNCQUFJLG9DQUFHOzs7O1FBQVA7WUFDRSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDO1FBQzVCLENBQUM7OztPQUFBOzs7O0lBV0MsNkNBQWU7OztJ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QUMsRUFBRSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDO3FCQUNyQztpQkFDRjthQUNGO2lCQUFNO2dCQUNMLElBQUksS0FBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLEtBQUssS0FBSyxJQUFJLEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxVQUFVLEtBQUssS0FBSyxFQUFFO29CQUMxRixLQUFLLENBQUMsRUFBRSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUM5QjtxQkFBTSxJQUFJLEtBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxLQUFLLElBQUksSUFBSSxLQUFJLENBQUMsa0JBQWtCLENBQUMsVUFBVSxLQUFLLElBQUksRUFBRTtvQkFDL0YsS0FBSyxDQUFDLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztpQkFDckM7YUFDRjtRQUNILENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7Z0JBM0hGLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsaUJBQWlCO2lCQUM1Qjs7OztnQkFiTSxtQkFBbUI7Z0JBSG5CLGNBQWM7Z0JBQW1CLGNBQWM7Z0JBQUUsZUFBZTs7SUEwSXpFLDBCQUFDO0NBQUEsQUE1SEQsSUE0SEM7U0F6SFksbUJBQW1COzs7Ozs7SUFFOUIsd0NBQXVDOzs7OztJQUN2QyxrREFBNkM7Ozs7O0lBQzdDLDJDQUVFOzs7OztJQUNGLGlEQUVFOzs7OztJQVFBLDZDQUFzQzs7Ozs7SUFDdEMsNkNBQXNDOzs7OztJQUN0Qyw4Q0FBd0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEFmdGVyVmlld0luaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTmV0d29ya1NlcnZpY2UsIENvbm5lY3Rpb25TdGF0ZSwgTWVzc2FnZVNlcnZpY2UsIExhbmd1YWdlU2VydmljZSB9IGZyb20gJ0BpZ28yL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgSWdvTWFwIH0gZnJvbSAnLi9tYXAnO1xyXG5pbXBvcnQgeyBNYXBCcm93c2VyQ29tcG9uZW50IH0gZnJvbSAnLi4vbWFwLWJyb3dzZXIvbWFwLWJyb3dzZXIuY29tcG9uZW50JztcclxuaW1wb3J0IHsgRmVhdHVyZURhdGFTb3VyY2VPcHRpb25zIH0gZnJvbSAnLi4vLi4vZGF0YXNvdXJjZS9zaGFyZWQvZGF0YXNvdXJjZXMvZmVhdHVyZS1kYXRhc291cmNlLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IFhZWkRhdGFTb3VyY2VPcHRpb25zIH0gZnJvbSAnLi4vLi4vZGF0YXNvdXJjZS9zaGFyZWQvZGF0YXNvdXJjZXMveHl6LWRhdGFzb3VyY2UuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgTVZURGF0YVNvdXJjZU9wdGlvbnMgfSBmcm9tICcuLi8uLi9kYXRhc291cmNlL3NoYXJlZC9kYXRhc291cmNlcy9tdnQtZGF0YXNvdXJjZS5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBDbHVzdGVyRGF0YVNvdXJjZU9wdGlvbnMgfSBmcm9tICcuLi8uLi9kYXRhc291cmNlL3NoYXJlZC9kYXRhc291cmNlcy9jbHVzdGVyLWRhdGFzb3VyY2UuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgTGF5ZXIgfSBmcm9tICcuLi8uLi9sYXllci9zaGFyZWQvbGF5ZXJzL2xheWVyJztcclxuaW1wb3J0IHsgQ2x1c3RlckRhdGFTb3VyY2UgfSBmcm9tICcuLi8uLi9kYXRhc291cmNlL3NoYXJlZC9kYXRhc291cmNlcy9jbHVzdGVyLWRhdGFzb3VyY2UnO1xyXG5pbXBvcnQgeyBNVlREYXRhU291cmNlIH0gZnJvbSAnLi4vLi4vZGF0YXNvdXJjZS9zaGFyZWQvZGF0YXNvdXJjZXMvbXZ0LWRhdGFzb3VyY2UnO1xyXG5pbXBvcnQgeyBGZWF0dXJlRGF0YVNvdXJjZSB9IGZyb20gJy4uLy4uL2RhdGFzb3VyY2Uvc2hhcmVkL2RhdGFzb3VyY2VzL2ZlYXR1cmUtZGF0YXNvdXJjZSc7XHJcbmltcG9ydCB7IFhZWkRhdGFTb3VyY2UgfSBmcm9tICcuLi8uLi9kYXRhc291cmNlL3NoYXJlZC9kYXRhc291cmNlcy94eXotZGF0YXNvdXJjZSc7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICAgIHNlbGVjdG9yOiAnW2lnb01hcE9mZmxpbmVdJ1xyXG4gIH0pXHJcbmV4cG9ydCBjbGFzcyBNYXBPZmZsaW5lRGlyZWN0aXZlIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XHJcblxyXG4gIHByaXZhdGUgY29tcG9uZW50OiBNYXBCcm93c2VyQ29tcG9uZW50O1xyXG4gIHByaXZhdGUgb2ZmbGluZUJ1dHRvblN0YXR1czogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIHByaXZhdGUgbmV0d29ya1N0YXRlOiBDb25uZWN0aW9uU3RhdGUgPSB7XHJcbiAgICBjb25uZWN0aW9uOiB0cnVlXHJcbiAgfTtcclxuICBwcml2YXRlIG9mZmxpbmVCdXR0b25TdGF0ZTogQ29ubmVjdGlvblN0YXRlID0ge1xyXG4gICAgY29ubmVjdGlvbjogdHJ1ZVxyXG4gIH07XHJcblxyXG4gIGdldCBtYXAoKTogSWdvTWFwIHtcclxuICAgIHJldHVybiB0aGlzLmNvbXBvbmVudC5tYXA7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIGNvbXBvbmVudDogTWFwQnJvd3NlckNvbXBvbmVudCxcclxuICAgIHByaXZhdGUgbmV0d29ya1NlcnZpY2U6IE5ldHdvcmtTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBtZXNzYWdlU2VydmljZTogTWVzc2FnZVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGxhbmd1YWdlU2VydmljZTogTGFuZ3VhZ2VTZXJ2aWNlXHJcbiAgICApIHtcclxuICAgICAgdGhpcy5jb21wb25lbnQgPSBjb21wb25lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xyXG4gICAgICB0aGlzLm1hcC5vZmZsaW5lQnV0dG9uVG9nZ2xlJC5zdWJzY3JpYmUoKG9mZmxpbmVCdXR0b25Ub2dnbGU6IGJvb2xlYW4pID0+IHtcclxuICAgICAgICB0aGlzLm9mZmxpbmVCdXR0b25TdGF0dXMgPSBvZmZsaW5lQnV0dG9uVG9nZ2xlO1xyXG4gICAgICAgIGNvbnN0IHRyYW5zbGF0ZSA9IHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLnRyYW5zbGF0ZTtcclxuICAgICAgICBpZiAodGhpcy5vZmZsaW5lQnV0dG9uU3RhdHVzICYmIHRoaXMubmV0d29ya1N0YXRlLmNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgIGNvbnN0IG1lc3NhZ2UgPSB0cmFuc2xhdGUuaW5zdGFudCgnaWdvLmdlby5uZXR3b3JrLm9mZmxpbmUubWVzc2FnZScpO1xyXG4gICAgICAgICAgY29uc3QgdGl0bGUgPSB0cmFuc2xhdGUuaW5zdGFudCgnaWdvLmdlby5uZXR3b3JrLm9mZmxpbmUudGl0bGUnKTtcclxuICAgICAgICAgIHRoaXMubWVzc2FnZVNlcnZpY2UuaW5mbyhtZXNzYWdlLCB0aXRsZSk7XHJcbiAgICAgICAgICB0aGlzLm9mZmxpbmVCdXR0b25TdGF0ZS5jb25uZWN0aW9uID0gZmFsc2U7XHJcbiAgICAgICAgICB0aGlzLmNoYW5nZUxheWVyKCk7XHJcbiAgICAgICAgfSBlbHNlIGlmICghdGhpcy5vZmZsaW5lQnV0dG9uU3RhdHVzICYmICF0aGlzLm5ldHdvcmtTdGF0ZS5jb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICBjb25zdCBtZXNzYWdlID0gdHJhbnNsYXRlLmluc3RhbnQoJ2lnby5nZW8ubmV0d29yay5vZmZsaW5lLm1lc3NhZ2UnKTtcclxuICAgICAgICAgIGNvbnN0IHRpdGxlID0gdHJhbnNsYXRlLmluc3RhbnQoJ2lnby5nZW8ubmV0d29yay5vZmZsaW5lLnRpdGxlJyk7XHJcbiAgICAgICAgICB0aGlzLm1lc3NhZ2VTZXJ2aWNlLmluZm8obWVzc2FnZSwgdGl0bGUpO1xyXG4gICAgICAgICAgdGhpcy5vZmZsaW5lQnV0dG9uU3RhdGUuY29ubmVjdGlvbiA9IGZhbHNlO1xyXG4gICAgICAgICAgdGhpcy5jaGFuZ2VMYXllcigpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoIXRoaXMub2ZmbGluZUJ1dHRvblN0YXR1cyAmJiB0aGlzLm5ldHdvcmtTdGF0ZS5jb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICBsZXQgbWVzc2FnZTtcclxuICAgICAgICAgIGxldCB0aXRsZTtcclxuICAgICAgICAgIGNvbnN0IG1lc3NhZ2VPYnMgPSB0cmFuc2xhdGUuZ2V0KCdpZ28uZ2VvLm5ldHdvcmsub25saW5lLm1lc3NhZ2UnKTtcclxuICAgICAgICAgIGNvbnN0IHRpdGxlT2JzID0gdHJhbnNsYXRlLmdldCgnaWdvLmdlby5uZXR3b3JrLm9ubGluZS50aXRsZScpO1xyXG4gICAgICAgICAgbWVzc2FnZU9icy5zdWJzY3JpYmUoKG1lc3NhZ2UxOiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgbWVzc2FnZSA9IG1lc3NhZ2UxO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICB0aXRsZU9icy5zdWJzY3JpYmUoKHRpdGxlMTogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgIHRpdGxlID0gdGl0bGUxO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICB0aGlzLm1lc3NhZ2VTZXJ2aWNlLmluZm8obWVzc2FnZSwgdGl0bGUpO1xyXG4gICAgICAgICAgdGhpcy5vZmZsaW5lQnV0dG9uU3RhdGUuY29ubmVjdGlvbiA9IHRydWU7XHJcbiAgICAgICAgICB0aGlzLmNoYW5nZUxheWVyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHRoaXMubmV0d29ya1NlcnZpY2UuY3VycmVudFN0YXRlKCkuc3Vic2NyaWJlKChzdGF0ZTogQ29ubmVjdGlvblN0YXRlKSA9PiB7XHJcbiAgICAgICAgdGhpcy5uZXR3b3JrU3RhdGUgPSBzdGF0ZTtcclxuICAgICAgICBpZiAoIXRoaXMub2ZmbGluZUJ1dHRvblN0YXR1cykge1xyXG4gICAgICAgICAgdGhpcy5jaGFuZ2VMYXllcigpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcblxyXG4gICAgICB0aGlzLm1hcC5sYXllcnMkLnN1YnNjcmliZSgobGF5ZXJzOiBMYXllcltdKSA9PiB7XHJcbiAgICAgICAgdGhpcy5jaGFuZ2VMYXllcigpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgcHJpdmF0ZSBjaGFuZ2VMYXllcigpIHtcclxuICAgIGxldCBzb3VyY2VPcHRpb25zO1xyXG4gICAgY29uc3QgbGF5ZXJMaXN0ID0gdGhpcy5tYXAubGF5ZXJzJC52YWx1ZTtcclxuICAgIGxheWVyTGlzdC5mb3JFYWNoKGxheWVyID0+IHtcclxuICAgICAgaWYgKGxheWVyLm9wdGlvbnMuc291cmNlIGluc3RhbmNlb2YgTVZURGF0YVNvdXJjZSkge1xyXG4gICAgICAgIHNvdXJjZU9wdGlvbnMgPSAobGF5ZXIub3B0aW9ucy5zb3VyY2VPcHRpb25zIGFzIE1WVERhdGFTb3VyY2VPcHRpb25zKTtcclxuICAgICAgICBsYXllci5vbC5nZXRTb3VyY2UoKS5jbGVhcigpO1xyXG4gICAgICB9IGVsc2UgaWYgKGxheWVyLm9wdGlvbnMuc291cmNlIGluc3RhbmNlb2YgWFlaRGF0YVNvdXJjZSkge1xyXG4gICAgICAgIHNvdXJjZU9wdGlvbnMgPSAobGF5ZXIub3B0aW9ucy5zb3VyY2VPcHRpb25zIGFzIFhZWkRhdGFTb3VyY2VPcHRpb25zKTtcclxuICAgICAgfSBlbHNlIGlmIChsYXllci5vcHRpb25zLnNvdXJjZSBpbnN0YW5jZW9mIENsdXN0ZXJEYXRhU291cmNlKSB7XHJcbiAgICAgICAgc291cmNlT3B0aW9ucyA9IChsYXllci5vcHRpb25zLnNvdXJjZU9wdGlvbnMgYXMgQ2x1c3RlckRhdGFTb3VyY2VPcHRpb25zKTtcclxuICAgICAgfSBlbHNlIGlmIChsYXllci5vcHRpb25zLnNvdXJjZSBpbnN0YW5jZW9mIEZlYXR1cmVEYXRhU291cmNlKSB7XHJcbiAgICAgICAgc291cmNlT3B0aW9ucyA9IChsYXllci5vcHRpb25zLnNvdXJjZU9wdGlvbnMgYXMgRmVhdHVyZURhdGFTb3VyY2VPcHRpb25zKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAodGhpcy5uZXR3b3JrU3RhdGUuY29ubmVjdGlvbiA9PT0gZmFsc2UgfHwgdGhpcy5vZmZsaW5lQnV0dG9uU3RhdGUuY29ubmVjdGlvbiA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgIGxheWVyLm9sLnNldE1heFJlc29sdXRpb24oMCk7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLm5ldHdvcmtTdGF0ZS5jb25uZWN0aW9uID09PSB0cnVlIHx8IHRoaXMub2ZmbGluZUJ1dHRvblN0YXRlLmNvbm5lY3Rpb24gPT09IHRydWUpIHtcclxuICAgICAgICAgIGxheWVyLm9sLnNldE1heFJlc29sdXRpb24oSW5maW5pdHkpO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHNvdXJjZU9wdGlvbnMpIHtcclxuICAgICAgICBpZiAoc291cmNlT3B0aW9ucy5wYXRoT2ZmbGluZSAmJiB0aGlzLm5ldHdvcmtTdGF0ZS5jb25uZWN0aW9uID09PSBmYWxzZSB8fFxyXG4gICAgICAgICAgc291cmNlT3B0aW9ucy5wYXRoT2ZmbGluZSAmJiB0aGlzLm9mZmxpbmVCdXR0b25TdGF0ZS5jb25uZWN0aW9uID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICBpZiAoc291cmNlT3B0aW9ucy50eXBlID09PSAndmVjdG9yJyB8fCBzb3VyY2VPcHRpb25zLnR5cGUgPT09ICdjbHVzdGVyJykge1xyXG4gICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsYXllci5vbC5nZXRTb3VyY2UoKS5zZXRVcmwoc291cmNlT3B0aW9ucy5wYXRoT2ZmbGluZSk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChzb3VyY2VPcHRpb25zLnBhdGhPZmZsaW5lICYmIHRoaXMubmV0d29ya1N0YXRlLmNvbm5lY3Rpb24gPT09IGZhbHNlIHx8XHJcbiAgICAgICAgICBzb3VyY2VPcHRpb25zLnBhdGhPZmZsaW5lICYmIHRoaXMub2ZmbGluZUJ1dHRvblN0YXRlLmNvbm5lY3Rpb24gPT09IHRydWUpIHtcclxuICAgICAgICAgICAgaWYgKHNvdXJjZU9wdGlvbnMudHlwZSA9PT0gJ3ZlY3RvcicgfHwgc291cmNlT3B0aW9ucy50eXBlID09PSAnY2x1c3RlcicpIHtcclxuICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGF5ZXIub2wuZ2V0U291cmNlKCkuc2V0VXJsKHNvdXJjZU9wdGlvbnMudXJsKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgaWYgKHRoaXMubmV0d29ya1N0YXRlLmNvbm5lY3Rpb24gPT09IGZhbHNlIHx8IHRoaXMub2ZmbGluZUJ1dHRvblN0YXRlLmNvbm5lY3Rpb24gPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIGxheWVyLm9sLnNldE1heFJlc29sdXRpb24oMCk7XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMubmV0d29ya1N0YXRlLmNvbm5lY3Rpb24gPT09IHRydWUgfHwgdGhpcy5vZmZsaW5lQnV0dG9uU3RhdGUuY29ubmVjdGlvbiA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICBsYXllci5vbC5zZXRNYXhSZXNvbHV0aW9uKEluZmluaXR5KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKHRoaXMubmV0d29ya1N0YXRlLmNvbm5lY3Rpb24gPT09IGZhbHNlIHx8IHRoaXMub2ZmbGluZUJ1dHRvblN0YXRlLmNvbm5lY3Rpb24gPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICBsYXllci5vbC5zZXRNYXhSZXNvbHV0aW9uKDApO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5uZXR3b3JrU3RhdGUuY29ubmVjdGlvbiA9PT0gdHJ1ZSB8fCB0aGlzLm9mZmxpbmVCdXR0b25TdGF0ZS5jb25uZWN0aW9uID09PSB0cnVlKSB7XHJcbiAgICAgICAgICBsYXllci5vbC5zZXRNYXhSZXNvbHV0aW9uKEluZmluaXR5KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iXX0=
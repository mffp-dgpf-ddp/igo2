/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive } from '@angular/core';
import { NetworkService, MessageService, LanguageService } from '@igo2/core';
import { MapBrowserComponent } from '../map-browser/map-browser.component';
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
            if (layer.options.sourceOptions) {
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
                else if (layer.options.sourceOptions.type === 'cluster') {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwT2ZmbGluZS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvbWFwL3NoYXJlZC9tYXBPZmZsaW5lLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFDekQsT0FBTyxFQUFFLGNBQWMsRUFBbUIsY0FBYyxFQUFFLGVBQWUsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUc5RixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQU8zRTtJQWtCRSw2QkFDRSxTQUE4QixFQUN0QixjQUE4QixFQUM5QixjQUE4QixFQUM5QixlQUFnQztRQUZoQyxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQWhCbEMsd0JBQW1CLEdBQVksS0FBSyxDQUFDO1FBQ3JDLGlCQUFZLEdBQW9CO1lBQ3RDLFVBQVUsRUFBRSxJQUFJO1NBQ2pCLENBQUM7UUFDTSx1QkFBa0IsR0FBb0I7WUFDNUMsVUFBVSxFQUFFLElBQUk7U0FDakIsQ0FBQztRQVlFLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO0lBQzdCLENBQUM7SUFYSCxzQkFBSSxvQ0FBRzs7OztRQUFQO1lBQ0UsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQztRQUM1QixDQUFDOzs7T0FBQTs7OztJQVdDLDZDQUFlOzs7SUFBZjtRQUFBLGlCQTJDQztRQTFDQyxJQUFJLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLFNBQVM7Ozs7UUFBQyxVQUFDLG1CQUE0QjtZQUNuRSxLQUFJLENBQUMsbUJBQW1CLEdBQUcsbUJBQW1CLENBQUM7O2dCQUN6QyxTQUFTLEdBQUcsS0FBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTO1lBQ2hELElBQUksS0FB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LEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxVQUFVLEtBQUssS0FBSyxFQUFFO29CQUMxRixLQUFLLENBQUMsRUFBRSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUM5QjtxQkFBTSxJQUFJLEtBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxLQUFLLElBQUksSUFBSSxLQUFJLENBQUMsa0JBQWtCLENBQUMsVUFBVSxLQUFLLElBQUksRUFBRTtvQkFDL0YsS0FBSyxDQUFDLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztpQkFDckM7YUFDRjtRQUNILENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7Z0JBM0hGLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsaUJBQWlCO2lCQUM1Qjs7OztnQkFUTSxtQkFBbUI7Z0JBSG5CLGNBQWM7Z0JBQW1CLGNBQWM7Z0JBQUUsZUFBZTs7SUFzSXpFLDBCQUFDO0NBQUEsQUE1SEQsSUE0SEM7U0F6SFksbUJBQW1COzs7Ozs7SUFFOUIsd0NBQXVDOzs7OztJQUN2QyxrREFBNkM7Ozs7O0lBQzdDLDJDQUVFOzs7OztJQUNGLGlEQUVFOzs7OztJQVFBLDZDQUFzQzs7Ozs7SUFDdEMsNkNBQXNDOzs7OztJQUN0Qyw4Q0FBd0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEFmdGVyVmlld0luaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTmV0d29ya1NlcnZpY2UsIENvbm5lY3Rpb25TdGF0ZSwgTWVzc2FnZVNlcnZpY2UsIExhbmd1YWdlU2VydmljZSB9IGZyb20gJ0BpZ28yL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgSWdvTWFwIH0gZnJvbSAnLi9tYXAnO1xyXG5pbXBvcnQgeyBNYXBCcm93c2VyQ29tcG9uZW50IH0gZnJvbSAnLi4vbWFwLWJyb3dzZXIvbWFwLWJyb3dzZXIuY29tcG9uZW50JztcclxuaW1wb3J0IHsgRmVhdHVyZURhdGFTb3VyY2VPcHRpb25zIH0gZnJvbSAnLi4vLi4vZGF0YXNvdXJjZS9zaGFyZWQvZGF0YXNvdXJjZXMvZmVhdHVyZS1kYXRhc291cmNlLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IFhZWkRhdGFTb3VyY2VPcHRpb25zIH0gZnJvbSAnLi4vLi4vZGF0YXNvdXJjZS9zaGFyZWQvZGF0YXNvdXJjZXMveHl6LWRhdGFzb3VyY2UuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgTVZURGF0YVNvdXJjZU9wdGlvbnMgfSBmcm9tICcuLi8uLi9kYXRhc291cmNlL3NoYXJlZC9kYXRhc291cmNlcy9tdnQtZGF0YXNvdXJjZS5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBDbHVzdGVyRGF0YVNvdXJjZU9wdGlvbnMgfSBmcm9tICcuLi8uLi9kYXRhc291cmNlL3NoYXJlZC9kYXRhc291cmNlcy9jbHVzdGVyLWRhdGFzb3VyY2UuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgTGF5ZXIgfSBmcm9tICcuLi8uLi9sYXllci9zaGFyZWQvbGF5ZXJzL2xheWVyJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gICAgc2VsZWN0b3I6ICdbaWdvTWFwT2ZmbGluZV0nXHJcbiAgfSlcclxuZXhwb3J0IGNsYXNzIE1hcE9mZmxpbmVEaXJlY3RpdmUgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcclxuXHJcbiAgcHJpdmF0ZSBjb21wb25lbnQ6IE1hcEJyb3dzZXJDb21wb25lbnQ7XHJcbiAgcHJpdmF0ZSBvZmZsaW5lQnV0dG9uU3RhdHVzOiBib29sZWFuID0gZmFsc2U7XHJcbiAgcHJpdmF0ZSBuZXR3b3JrU3RhdGU6IENvbm5lY3Rpb25TdGF0ZSA9IHtcclxuICAgIGNvbm5lY3Rpb246IHRydWVcclxuICB9O1xyXG4gIHByaXZhdGUgb2ZmbGluZUJ1dHRvblN0YXRlOiBDb25uZWN0aW9uU3RhdGUgPSB7XHJcbiAgICBjb25uZWN0aW9uOiB0cnVlXHJcbiAgfTtcclxuXHJcbiAgZ2V0IG1hcCgpOiBJZ29NYXAge1xyXG4gICAgcmV0dXJuIHRoaXMuY29tcG9uZW50Lm1hcDtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgY29tcG9uZW50OiBNYXBCcm93c2VyQ29tcG9uZW50LFxyXG4gICAgcHJpdmF0ZSBuZXR3b3JrU2VydmljZTogTmV0d29ya1NlcnZpY2UsXHJcbiAgICBwcml2YXRlIG1lc3NhZ2VTZXJ2aWNlOiBNZXNzYWdlU2VydmljZSxcclxuICAgIHByaXZhdGUgbGFuZ3VhZ2VTZXJ2aWNlOiBMYW5ndWFnZVNlcnZpY2VcclxuICAgICkge1xyXG4gICAgICB0aGlzLmNvbXBvbmVudCA9IGNvbXBvbmVudDtcclxuICAgIH1cclxuXHJcbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XHJcbiAgICAgIHRoaXMubWFwLm9mZmxpbmVCdXR0b25Ub2dnbGUkLnN1YnNjcmliZSgob2ZmbGluZUJ1dHRvblRvZ2dsZTogYm9vbGVhbikgPT4ge1xyXG4gICAgICAgIHRoaXMub2ZmbGluZUJ1dHRvblN0YXR1cyA9IG9mZmxpbmVCdXR0b25Ub2dnbGU7XHJcbiAgICAgICAgY29uc3QgdHJhbnNsYXRlID0gdGhpcy5sYW5ndWFnZVNlcnZpY2UudHJhbnNsYXRlO1xyXG4gICAgICAgIGlmICh0aGlzLm9mZmxpbmVCdXR0b25TdGF0dXMgJiYgdGhpcy5uZXR3b3JrU3RhdGUuY29ubmVjdGlvbikge1xyXG4gICAgICAgICAgY29uc3QgbWVzc2FnZSA9IHRyYW5zbGF0ZS5pbnN0YW50KCdpZ28uZ2VvLm5ldHdvcmsub2ZmbGluZS5tZXNzYWdlJyk7XHJcbiAgICAgICAgICBjb25zdCB0aXRsZSA9IHRyYW5zbGF0ZS5pbnN0YW50KCdpZ28uZ2VvLm5ldHdvcmsub2ZmbGluZS50aXRsZScpO1xyXG4gICAgICAgICAgdGhpcy5tZXNzYWdlU2VydmljZS5pbmZvKG1lc3NhZ2UsIHRpdGxlKTtcclxuICAgICAgICAgIHRoaXMub2ZmbGluZUJ1dHRvblN0YXRlLmNvbm5lY3Rpb24gPSBmYWxzZTtcclxuICAgICAgICAgIHRoaXMuY2hhbmdlTGF5ZXIoKTtcclxuICAgICAgICB9IGVsc2UgaWYgKCF0aGlzLm9mZmxpbmVCdXR0b25TdGF0dXMgJiYgIXRoaXMubmV0d29ya1N0YXRlLmNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgIGNvbnN0IG1lc3NhZ2UgPSB0cmFuc2xhdGUuaW5zdGFudCgnaWdvLmdlby5uZXR3b3JrLm9mZmxpbmUubWVzc2FnZScpO1xyXG4gICAgICAgICAgY29uc3QgdGl0bGUgPSB0cmFuc2xhdGUuaW5zdGFudCgnaWdvLmdlby5uZXR3b3JrLm9mZmxpbmUudGl0bGUnKTtcclxuICAgICAgICAgIHRoaXMubWVzc2FnZVNlcnZpY2UuaW5mbyhtZXNzYWdlLCB0aXRsZSk7XHJcbiAgICAgICAgICB0aGlzLm9mZmxpbmVCdXR0b25TdGF0ZS5jb25uZWN0aW9uID0gZmFsc2U7XHJcbiAgICAgICAgICB0aGlzLmNoYW5nZUxheWVyKCk7XHJcbiAgICAgICAgfSBlbHNlIGlmICghdGhpcy5vZmZsaW5lQnV0dG9uU3RhdHVzICYmIHRoaXMubmV0d29ya1N0YXRlLmNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgIGxldCBtZXNzYWdlO1xyXG4gICAgICAgICAgbGV0IHRpdGxlO1xyXG4gICAgICAgICAgY29uc3QgbWVzc2FnZU9icyA9IHRyYW5zbGF0ZS5nZXQoJ2lnby5nZW8ubmV0d29yay5vbmxpbmUubWVzc2FnZScpO1xyXG4gICAgICAgICAgY29uc3QgdGl0bGVPYnMgPSB0cmFuc2xhdGUuZ2V0KCdpZ28uZ2VvLm5ldHdvcmsub25saW5lLnRpdGxlJyk7XHJcbiAgICAgICAgICBtZXNzYWdlT2JzLnN1YnNjcmliZSgobWVzc2FnZTE6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICBtZXNzYWdlID0gbWVzc2FnZTE7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIHRpdGxlT2JzLnN1YnNjcmliZSgodGl0bGUxOiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgdGl0bGUgPSB0aXRsZTE7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIHRoaXMubWVzc2FnZVNlcnZpY2UuaW5mbyhtZXNzYWdlLCB0aXRsZSk7XHJcbiAgICAgICAgICB0aGlzLm9mZmxpbmVCdXR0b25TdGF0ZS5jb25uZWN0aW9uID0gdHJ1ZTtcclxuICAgICAgICAgIHRoaXMuY2hhbmdlTGF5ZXIoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgdGhpcy5uZXR3b3JrU2VydmljZS5jdXJyZW50U3RhdGUoKS5zdWJzY3JpYmUoKHN0YXRlOiBDb25uZWN0aW9uU3RhdGUpID0+IHtcclxuICAgICAgICB0aGlzLm5ldHdvcmtTdGF0ZSA9IHN0YXRlO1xyXG4gICAgICAgIGlmICghdGhpcy5vZmZsaW5lQnV0dG9uU3RhdHVzKSB7XHJcbiAgICAgICAgICB0aGlzLmNoYW5nZUxheWVyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHRoaXMubWFwLmxheWVycyQuc3Vic2NyaWJlKChsYXllcnM6IExheWVyW10pID0+IHtcclxuICAgICAgICB0aGlzLmNoYW5nZUxheWVyKCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICBwcml2YXRlIGNoYW5nZUxheWVyKCkge1xyXG4gICAgbGV0IHNvdXJjZU9wdGlvbnM7XHJcbiAgICBjb25zdCBsYXllckxpc3QgPSB0aGlzLm1hcC5sYXllcnMkLnZhbHVlO1xyXG4gICAgbGF5ZXJMaXN0LmZvckVhY2gobGF5ZXIgPT4ge1xyXG4gICAgICBpZiAobGF5ZXIub3B0aW9ucy5zb3VyY2VPcHRpb25zKSB7XHJcbiAgICAgICAgaWYgKGxheWVyLm9wdGlvbnMuc291cmNlT3B0aW9ucy50eXBlID09PSAnbXZ0Jykge1xyXG4gICAgICAgICAgc291cmNlT3B0aW9ucyA9IChsYXllci5vcHRpb25zLnNvdXJjZU9wdGlvbnMgYXMgTVZURGF0YVNvdXJjZU9wdGlvbnMpO1xyXG4gICAgICAgICAgbGF5ZXIub2wuZ2V0U291cmNlKCkuY2xlYXIoKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGxheWVyLm9wdGlvbnMuc291cmNlT3B0aW9ucy50eXBlID09PSAneHl6Jykge1xyXG4gICAgICAgICAgc291cmNlT3B0aW9ucyA9IChsYXllci5vcHRpb25zLnNvdXJjZU9wdGlvbnMgYXMgWFlaRGF0YVNvdXJjZU9wdGlvbnMpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAobGF5ZXIub3B0aW9ucy5zb3VyY2VPcHRpb25zLnR5cGUgPT09ICd2ZWN0b3InKSB7XHJcbiAgICAgICAgICBzb3VyY2VPcHRpb25zID0gKGxheWVyLm9wdGlvbnMuc291cmNlT3B0aW9ucyBhcyBGZWF0dXJlRGF0YVNvdXJjZU9wdGlvbnMpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAobGF5ZXIub3B0aW9ucy5zb3VyY2VPcHRpb25zLnR5cGUgPT09ICdjbHVzdGVyJykge1xyXG4gICAgICAgICAgc291cmNlT3B0aW9ucyA9IChsYXllci5vcHRpb25zLnNvdXJjZU9wdGlvbnMgYXMgQ2x1c3RlckRhdGFTb3VyY2VPcHRpb25zKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgaWYgKHRoaXMubmV0d29ya1N0YXRlLmNvbm5lY3Rpb24gPT09IGZhbHNlIHx8IHRoaXMub2ZmbGluZUJ1dHRvblN0YXRlLmNvbm5lY3Rpb24gPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIGxheWVyLm9sLnNldE1heFJlc29sdXRpb24oMCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5uZXR3b3JrU3RhdGUuY29ubmVjdGlvbiA9PT0gdHJ1ZSB8fCB0aGlzLm9mZmxpbmVCdXR0b25TdGF0ZS5jb25uZWN0aW9uID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIGxheWVyLm9sLnNldE1heFJlc29sdXRpb24oSW5maW5pdHkpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoc291cmNlT3B0aW9ucy5wYXRoT2ZmbGluZSAmJiB0aGlzLm5ldHdvcmtTdGF0ZS5jb25uZWN0aW9uID09PSBmYWxzZSB8fFxyXG4gICAgICAgICAgc291cmNlT3B0aW9ucy5wYXRoT2ZmbGluZSAmJiB0aGlzLm9mZmxpbmVCdXR0b25TdGF0ZS5jb25uZWN0aW9uID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICBpZiAoc291cmNlT3B0aW9ucy50eXBlID09PSAndmVjdG9yJyB8fCBzb3VyY2VPcHRpb25zLnR5cGUgPT09ICdjbHVzdGVyJykge1xyXG4gICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsYXllci5vbC5nZXRTb3VyY2UoKS5zZXRVcmwoc291cmNlT3B0aW9ucy5wYXRoT2ZmbGluZSk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChzb3VyY2VPcHRpb25zLnBhdGhPZmZsaW5lICYmIHRoaXMubmV0d29ya1N0YXRlLmNvbm5lY3Rpb24gPT09IGZhbHNlIHx8XHJcbiAgICAgICAgICBzb3VyY2VPcHRpb25zLnBhdGhPZmZsaW5lICYmIHRoaXMub2ZmbGluZUJ1dHRvblN0YXRlLmNvbm5lY3Rpb24gPT09IHRydWUpIHtcclxuICAgICAgICAgICAgaWYgKHNvdXJjZU9wdGlvbnMudHlwZSA9PT0gJ3ZlY3RvcicgfHwgc291cmNlT3B0aW9ucy50eXBlID09PSAnY2x1c3RlcicpIHtcclxuICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGF5ZXIub2wuZ2V0U291cmNlKCkuc2V0VXJsKHNvdXJjZU9wdGlvbnMudXJsKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgaWYgKHRoaXMubmV0d29ya1N0YXRlLmNvbm5lY3Rpb24gPT09IGZhbHNlIHx8IHRoaXMub2ZmbGluZUJ1dHRvblN0YXRlLmNvbm5lY3Rpb24gPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIGxheWVyLm9sLnNldE1heFJlc29sdXRpb24oMCk7XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMubmV0d29ya1N0YXRlLmNvbm5lY3Rpb24gPT09IHRydWUgfHwgdGhpcy5vZmZsaW5lQnV0dG9uU3RhdGUuY29ubmVjdGlvbiA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICBsYXllci5vbC5zZXRNYXhSZXNvbHV0aW9uKEluZmluaXR5KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKHRoaXMubmV0d29ya1N0YXRlLmNvbm5lY3Rpb24gPT09IGZhbHNlIHx8IHRoaXMub2ZmbGluZUJ1dHRvblN0YXRlLmNvbm5lY3Rpb24gPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICBsYXllci5vbC5zZXRNYXhSZXNvbHV0aW9uKDApO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5uZXR3b3JrU3RhdGUuY29ubmVjdGlvbiA9PT0gdHJ1ZSB8fCB0aGlzLm9mZmxpbmVCdXR0b25TdGF0ZS5jb25uZWN0aW9uID09PSB0cnVlKSB7XHJcbiAgICAgICAgICBsYXllci5vbC5zZXRNYXhSZXNvbHV0aW9uKEluZmluaXR5KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iXX0=
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive } from '@angular/core';
import { NetworkService, MessageService, LanguageService } from '@igo2/core';
import { MapBrowserComponent } from '../map-browser/map-browser.component';
export class MapOfflineDirective {
    /**
     * @param {?} component
     * @param {?} networkService
     * @param {?} messageService
     * @param {?} languageService
     */
    constructor(component, networkService, messageService, languageService) {
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
        this.map.offlineButtonToggle$.subscribe((/**
         * @param {?} offlineButtonToggle
         * @return {?}
         */
        (offlineButtonToggle) => {
            this.offlineButtonStatus = offlineButtonToggle;
            /** @type {?} */
            const translate = this.languageService.translate;
            if (this.offlineButtonStatus && this.networkState.connection) {
                /** @type {?} */
                const message = translate.instant('igo.geo.network.offline.message');
                /** @type {?} */
                const title = translate.instant('igo.geo.network.offline.title');
                this.messageService.info(message, title);
                this.offlineButtonState.connection = false;
                this.changeLayer();
            }
            else if (!this.offlineButtonStatus && !this.networkState.connection) {
                /** @type {?} */
                const message = translate.instant('igo.geo.network.offline.message');
                /** @type {?} */
                const title = translate.instant('igo.geo.network.offline.title');
                this.messageService.info(message, title);
                this.offlineButtonState.connection = false;
                this.changeLayer();
            }
            else if (!this.offlineButtonStatus && this.networkState.connection) {
                /** @type {?} */
                let message;
                /** @type {?} */
                let title;
                /** @type {?} */
                const messageObs = translate.get('igo.geo.network.online.message');
                /** @type {?} */
                const titleObs = translate.get('igo.geo.network.online.title');
                messageObs.subscribe((/**
                 * @param {?} message1
                 * @return {?}
                 */
                (message1) => {
                    message = message1;
                }));
                titleObs.subscribe((/**
                 * @param {?} title1
                 * @return {?}
                 */
                (title1) => {
                    title = title1;
                }));
                this.messageService.info(message, title);
                this.offlineButtonState.connection = true;
                this.changeLayer();
            }
        }));
        this.networkService.currentState().subscribe((/**
         * @param {?} state
         * @return {?}
         */
        (state) => {
            this.networkState = state;
            if (!this.offlineButtonStatus) {
                this.changeLayer();
            }
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
                    if (this.networkState.connection === false || this.offlineButtonState.connection === false) {
                        layer.ol.setMaxResolution(0);
                        return;
                    }
                    else if (this.networkState.connection === true || this.offlineButtonState.connection === true) {
                        layer.ol.setMaxResolution(Infinity);
                        return;
                    }
                }
                if (sourceOptions.pathOffline && this.networkState.connection === false ||
                    sourceOptions.pathOffline && this.offlineButtonState.connection === false) {
                    if (sourceOptions.type === 'vector' || sourceOptions.type === 'cluster') {
                        return;
                    }
                    layer.ol.getSource().setUrl(sourceOptions.pathOffline);
                }
                else if (sourceOptions.pathOffline && this.networkState.connection === false ||
                    sourceOptions.pathOffline && this.offlineButtonState.connection === true) {
                    if (sourceOptions.type === 'vector' || sourceOptions.type === 'cluster') {
                        return;
                    }
                    layer.ol.getSource().setUrl(sourceOptions.url);
                }
                else {
                    if (this.networkState.connection === false || this.offlineButtonState.connection === false) {
                        layer.ol.setMaxResolution(0);
                    }
                    else if (this.networkState.connection === true || this.offlineButtonState.connection === true) {
                        layer.ol.setMaxResolution(Infinity);
                    }
                }
            }
            else {
                if (this.networkState.connection === false || this.offlineButtonState.connection === false) {
                    layer.ol.setMaxResolution(0);
                }
                else if (this.networkState.connection === true || this.offlineButtonState.connection === true) {
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
    { type: NetworkService },
    { type: MessageService },
    { type: LanguageService }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwT2ZmbGluZS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvbWFwL3NoYXJlZC9tYXBPZmZsaW5lLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFDekQsT0FBTyxFQUFFLGNBQWMsRUFBbUIsY0FBYyxFQUFFLGVBQWUsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUc5RixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQVUzRSxNQUFNLE9BQU8sbUJBQW1COzs7Ozs7O0lBZTlCLFlBQ0UsU0FBOEIsRUFDdEIsY0FBOEIsRUFDOUIsY0FBOEIsRUFDOUIsZUFBZ0M7UUFGaEMsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFoQmxDLHdCQUFtQixHQUFZLEtBQUssQ0FBQztRQUNyQyxpQkFBWSxHQUFvQjtZQUN0QyxVQUFVLEVBQUUsSUFBSTtTQUNqQixDQUFDO1FBQ00sdUJBQWtCLEdBQW9CO1lBQzVDLFVBQVUsRUFBRSxJQUFJO1NBQ2pCLENBQUM7UUFZRSxJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztJQUM3QixDQUFDOzs7O0lBWEgsSUFBSSxHQUFHO1FBQ0wsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQztJQUM1QixDQUFDOzs7O0lBV0MsZUFBZTtRQUNiLElBQUksQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsU0FBUzs7OztRQUFDLENBQUMsbUJBQTRCLEVBQUUsRUFBRTtZQUN2RSxJQUFJLENBQUMsbUJBQW1CLEdBQUcsbUJBQW1CLENBQUM7O2tCQUN6QyxTQUFTLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTO1lBQ2hELElBQUksSUFBSSxD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VUFBVSxLQUFLLEtBQUssSUFBSSxJQUFJLENBQUMsa0JBQWtCLENBQUMsVUFBVSxLQUFLLEtBQUssRUFBRTtvQkFDMUYsS0FBSyxDQUFDLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDOUI7cUJBQU0sSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsS0FBSyxJQUFJLElBQUksSUFBSSxDQUFDLGtCQUFrQixDQUFDLFVBQVUsS0FBSyxJQUFJLEVBQUU7b0JBQy9GLEtBQUssQ0FBQyxFQUFFLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUM7aUJBQ3JDO2FBQ0Y7UUFDSCxDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7OztZQTNIRixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLGlCQUFpQjthQUM1Qjs7OztZQVRNLG1CQUFtQjtZQUhuQixjQUFjO1lBQW1CLGNBQWM7WUFBRSxlQUFlOzs7Ozs7O0lBZXZFLHdDQUF1Qzs7Ozs7SUFDdkMsa0RBQTZDOzs7OztJQUM3QywyQ0FFRTs7Ozs7SUFDRixpREFFRTs7Ozs7SUFRQSw2Q0FBc0M7Ozs7O0lBQ3RDLDZDQUFzQzs7Ozs7SUFDdEMsOENBQXdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBBZnRlclZpZXdJbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE5ldHdvcmtTZXJ2aWNlLCBDb25uZWN0aW9uU3RhdGUsIE1lc3NhZ2VTZXJ2aWNlLCBMYW5ndWFnZVNlcnZpY2UgfSBmcm9tICdAaWdvMi9jb3JlJztcclxuXHJcbmltcG9ydCB7IElnb01hcCB9IGZyb20gJy4vbWFwJztcclxuaW1wb3J0IHsgTWFwQnJvd3NlckNvbXBvbmVudCB9IGZyb20gJy4uL21hcC1icm93c2VyL21hcC1icm93c2VyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEZlYXR1cmVEYXRhU291cmNlT3B0aW9ucyB9IGZyb20gJy4uLy4uL2RhdGFzb3VyY2Uvc2hhcmVkL2RhdGFzb3VyY2VzL2ZlYXR1cmUtZGF0YXNvdXJjZS5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBYWVpEYXRhU291cmNlT3B0aW9ucyB9IGZyb20gJy4uLy4uL2RhdGFzb3VyY2Uvc2hhcmVkL2RhdGFzb3VyY2VzL3h5ei1kYXRhc291cmNlLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IE1WVERhdGFTb3VyY2VPcHRpb25zIH0gZnJvbSAnLi4vLi4vZGF0YXNvdXJjZS9zaGFyZWQvZGF0YXNvdXJjZXMvbXZ0LWRhdGFzb3VyY2UuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgQ2x1c3RlckRhdGFTb3VyY2VPcHRpb25zIH0gZnJvbSAnLi4vLi4vZGF0YXNvdXJjZS9zaGFyZWQvZGF0YXNvdXJjZXMvY2x1c3Rlci1kYXRhc291cmNlLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IExheWVyIH0gZnJvbSAnLi4vLi4vbGF5ZXIvc2hhcmVkL2xheWVycy9sYXllcic7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICAgIHNlbGVjdG9yOiAnW2lnb01hcE9mZmxpbmVdJ1xyXG4gIH0pXHJcbmV4cG9ydCBjbGFzcyBNYXBPZmZsaW5lRGlyZWN0aXZlIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XHJcblxyXG4gIHByaXZhdGUgY29tcG9uZW50OiBNYXBCcm93c2VyQ29tcG9uZW50O1xyXG4gIHByaXZhdGUgb2ZmbGluZUJ1dHRvblN0YXR1czogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIHByaXZhdGUgbmV0d29ya1N0YXRlOiBDb25uZWN0aW9uU3RhdGUgPSB7XHJcbiAgICBjb25uZWN0aW9uOiB0cnVlXHJcbiAgfTtcclxuICBwcml2YXRlIG9mZmxpbmVCdXR0b25TdGF0ZTogQ29ubmVjdGlvblN0YXRlID0ge1xyXG4gICAgY29ubmVjdGlvbjogdHJ1ZVxyXG4gIH07XHJcblxyXG4gIGdldCBtYXAoKTogSWdvTWFwIHtcclxuICAgIHJldHVybiB0aGlzLmNvbXBvbmVudC5tYXA7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIGNvbXBvbmVudDogTWFwQnJvd3NlckNvbXBvbmVudCxcclxuICAgIHByaXZhdGUgbmV0d29ya1NlcnZpY2U6IE5ldHdvcmtTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBtZXNzYWdlU2VydmljZTogTWVzc2FnZVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGxhbmd1YWdlU2VydmljZTogTGFuZ3VhZ2VTZXJ2aWNlXHJcbiAgICApIHtcclxuICAgICAgdGhpcy5jb21wb25lbnQgPSBjb21wb25lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xyXG4gICAgICB0aGlzLm1hcC5vZmZsaW5lQnV0dG9uVG9nZ2xlJC5zdWJzY3JpYmUoKG9mZmxpbmVCdXR0b25Ub2dnbGU6IGJvb2xlYW4pID0+IHtcclxuICAgICAgICB0aGlzLm9mZmxpbmVCdXR0b25TdGF0dXMgPSBvZmZsaW5lQnV0dG9uVG9nZ2xlO1xyXG4gICAgICAgIGNvbnN0IHRyYW5zbGF0ZSA9IHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLnRyYW5zbGF0ZTtcclxuICAgICAgICBpZiAodGhpcy5vZmZsaW5lQnV0dG9uU3RhdHVzICYmIHRoaXMubmV0d29ya1N0YXRlLmNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgIGNvbnN0IG1lc3NhZ2UgPSB0cmFuc2xhdGUuaW5zdGFudCgnaWdvLmdlby5uZXR3b3JrLm9mZmxpbmUubWVzc2FnZScpO1xyXG4gICAgICAgICAgY29uc3QgdGl0bGUgPSB0cmFuc2xhdGUuaW5zdGFudCgnaWdvLmdlby5uZXR3b3JrLm9mZmxpbmUudGl0bGUnKTtcclxuICAgICAgICAgIHRoaXMubWVzc2FnZVNlcnZpY2UuaW5mbyhtZXNzYWdlLCB0aXRsZSk7XHJcbiAgICAgICAgICB0aGlzLm9mZmxpbmVCdXR0b25TdGF0ZS5jb25uZWN0aW9uID0gZmFsc2U7XHJcbiAgICAgICAgICB0aGlzLmNoYW5nZUxheWVyKCk7XHJcbiAgICAgICAgfSBlbHNlIGlmICghdGhpcy5vZmZsaW5lQnV0dG9uU3RhdHVzICYmICF0aGlzLm5ldHdvcmtTdGF0ZS5jb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICBjb25zdCBtZXNzYWdlID0gdHJhbnNsYXRlLmluc3RhbnQoJ2lnby5nZW8ubmV0d29yay5vZmZsaW5lLm1lc3NhZ2UnKTtcclxuICAgICAgICAgIGNvbnN0IHRpdGxlID0gdHJhbnNsYXRlLmluc3RhbnQoJ2lnby5nZW8ubmV0d29yay5vZmZsaW5lLnRpdGxlJyk7XHJcbiAgICAgICAgICB0aGlzLm1lc3NhZ2VTZXJ2aWNlLmluZm8obWVzc2FnZSwgdGl0bGUpO1xyXG4gICAgICAgICAgdGhpcy5vZmZsaW5lQnV0dG9uU3RhdGUuY29ubmVjdGlvbiA9IGZhbHNlO1xyXG4gICAgICAgICAgdGhpcy5jaGFuZ2VMYXllcigpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoIXRoaXMub2ZmbGluZUJ1dHRvblN0YXR1cyAmJiB0aGlzLm5ldHdvcmtTdGF0ZS5jb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICBsZXQgbWVzc2FnZTtcclxuICAgICAgICAgIGxldCB0aXRsZTtcclxuICAgICAgICAgIGNvbnN0IG1lc3NhZ2VPYnMgPSB0cmFuc2xhdGUuZ2V0KCdpZ28uZ2VvLm5ldHdvcmsub25saW5lLm1lc3NhZ2UnKTtcclxuICAgICAgICAgIGNvbnN0IHRpdGxlT2JzID0gdHJhbnNsYXRlLmdldCgnaWdvLmdlby5uZXR3b3JrLm9ubGluZS50aXRsZScpO1xyXG4gICAgICAgICAgbWVzc2FnZU9icy5zdWJzY3JpYmUoKG1lc3NhZ2UxOiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgbWVzc2FnZSA9IG1lc3NhZ2UxO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICB0aXRsZU9icy5zdWJzY3JpYmUoKHRpdGxlMTogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgIHRpdGxlID0gdGl0bGUxO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICB0aGlzLm1lc3NhZ2VTZXJ2aWNlLmluZm8obWVzc2FnZSwgdGl0bGUpO1xyXG4gICAgICAgICAgdGhpcy5vZmZsaW5lQnV0dG9uU3RhdGUuY29ubmVjdGlvbiA9IHRydWU7XHJcbiAgICAgICAgICB0aGlzLmNoYW5nZUxheWVyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHRoaXMubmV0d29ya1NlcnZpY2UuY3VycmVudFN0YXRlKCkuc3Vic2NyaWJlKChzdGF0ZTogQ29ubmVjdGlvblN0YXRlKSA9PiB7XHJcbiAgICAgICAgdGhpcy5uZXR3b3JrU3RhdGUgPSBzdGF0ZTtcclxuICAgICAgICBpZiAoIXRoaXMub2ZmbGluZUJ1dHRvblN0YXR1cykge1xyXG4gICAgICAgICAgdGhpcy5jaGFuZ2VMYXllcigpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcblxyXG4gICAgICB0aGlzLm1hcC5sYXllcnMkLnN1YnNjcmliZSgobGF5ZXJzOiBMYXllcltdKSA9PiB7XHJcbiAgICAgICAgdGhpcy5jaGFuZ2VMYXllcigpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgcHJpdmF0ZSBjaGFuZ2VMYXllcigpIHtcclxuICAgIGxldCBzb3VyY2VPcHRpb25zO1xyXG4gICAgY29uc3QgbGF5ZXJMaXN0ID0gdGhpcy5tYXAubGF5ZXJzJC52YWx1ZTtcclxuICAgIGxheWVyTGlzdC5mb3JFYWNoKGxheWVyID0+IHtcclxuICAgICAgaWYgKGxheWVyLm9wdGlvbnMuc291cmNlT3B0aW9ucykge1xyXG4gICAgICAgIGlmIChsYXllci5vcHRpb25zLnNvdXJjZU9wdGlvbnMudHlwZSA9PT0gJ212dCcpIHtcclxuICAgICAgICAgIHNvdXJjZU9wdGlvbnMgPSAobGF5ZXIub3B0aW9ucy5zb3VyY2VPcHRpb25zIGFzIE1WVERhdGFTb3VyY2VPcHRpb25zKTtcclxuICAgICAgICAgIGxheWVyLm9sLmdldFNvdXJjZSgpLmNsZWFyKCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChsYXllci5vcHRpb25zLnNvdXJjZU9wdGlvbnMudHlwZSA9PT0gJ3h5eicpIHtcclxuICAgICAgICAgIHNvdXJjZU9wdGlvbnMgPSAobGF5ZXIub3B0aW9ucy5zb3VyY2VPcHRpb25zIGFzIFhZWkRhdGFTb3VyY2VPcHRpb25zKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGxheWVyLm9wdGlvbnMuc291cmNlT3B0aW9ucy50eXBlID09PSAndmVjdG9yJykge1xyXG4gICAgICAgICAgc291cmNlT3B0aW9ucyA9IChsYXllci5vcHRpb25zLnNvdXJjZU9wdGlvbnMgYXMgRmVhdHVyZURhdGFTb3VyY2VPcHRpb25zKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGxheWVyLm9wdGlvbnMuc291cmNlT3B0aW9ucy50eXBlID09PSAnY2x1c3RlcicpIHtcclxuICAgICAgICAgIHNvdXJjZU9wdGlvbnMgPSAobGF5ZXIub3B0aW9ucy5zb3VyY2VPcHRpb25zIGFzIENsdXN0ZXJEYXRhU291cmNlT3B0aW9ucyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGlmICh0aGlzLm5ldHdvcmtTdGF0ZS5jb25uZWN0aW9uID09PSBmYWxzZSB8fCB0aGlzLm9mZmxpbmVCdXR0b25TdGF0ZS5jb25uZWN0aW9uID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICBsYXllci5vbC5zZXRNYXhSZXNvbHV0aW9uKDApO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMubmV0d29ya1N0YXRlLmNvbm5lY3Rpb24gPT09IHRydWUgfHwgdGhpcy5vZmZsaW5lQnV0dG9uU3RhdGUuY29ubmVjdGlvbiA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICBsYXllci5vbC5zZXRNYXhSZXNvbHV0aW9uKEluZmluaXR5KTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHNvdXJjZU9wdGlvbnMucGF0aE9mZmxpbmUgJiYgdGhpcy5uZXR3b3JrU3RhdGUuY29ubmVjdGlvbiA9PT0gZmFsc2UgfHxcclxuICAgICAgICAgIHNvdXJjZU9wdGlvbnMucGF0aE9mZmxpbmUgJiYgdGhpcy5vZmZsaW5lQnV0dG9uU3RhdGUuY29ubmVjdGlvbiA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgaWYgKHNvdXJjZU9wdGlvbnMudHlwZSA9PT0gJ3ZlY3RvcicgfHwgc291cmNlT3B0aW9ucy50eXBlID09PSAnY2x1c3RlcicpIHtcclxuICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGF5ZXIub2wuZ2V0U291cmNlKCkuc2V0VXJsKHNvdXJjZU9wdGlvbnMucGF0aE9mZmxpbmUpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoc291cmNlT3B0aW9ucy5wYXRoT2ZmbGluZSAmJiB0aGlzLm5ldHdvcmtTdGF0ZS5jb25uZWN0aW9uID09PSBmYWxzZSB8fFxyXG4gICAgICAgICAgc291cmNlT3B0aW9ucy5wYXRoT2ZmbGluZSAmJiB0aGlzLm9mZmxpbmVCdXR0b25TdGF0ZS5jb25uZWN0aW9uID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIGlmIChzb3VyY2VPcHRpb25zLnR5cGUgPT09ICd2ZWN0b3InIHx8IHNvdXJjZU9wdGlvbnMudHlwZSA9PT0gJ2NsdXN0ZXInKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxheWVyLm9sLmdldFNvdXJjZSgpLnNldFVybChzb3VyY2VPcHRpb25zLnVybCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGlmICh0aGlzLm5ldHdvcmtTdGF0ZS5jb25uZWN0aW9uID09PSBmYWxzZSB8fCB0aGlzLm9mZmxpbmVCdXR0b25TdGF0ZS5jb25uZWN0aW9uID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICBsYXllci5vbC5zZXRNYXhSZXNvbHV0aW9uKDApO1xyXG4gICAgICAgICAgfSBlbHNlIGlmICh0aGlzLm5ldHdvcmtTdGF0ZS5jb25uZWN0aW9uID09PSB0cnVlIHx8IHRoaXMub2ZmbGluZUJ1dHRvblN0YXRlLmNvbm5lY3Rpb24gPT09IHRydWUpIHtcclxuICAgICAgICAgICAgbGF5ZXIub2wuc2V0TWF4UmVzb2x1dGlvbihJbmZpbml0eSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmICh0aGlzLm5ldHdvcmtTdGF0ZS5jb25uZWN0aW9uID09PSBmYWxzZSB8fCB0aGlzLm9mZmxpbmVCdXR0b25TdGF0ZS5jb25uZWN0aW9uID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgbGF5ZXIub2wuc2V0TWF4UmVzb2x1dGlvbigwKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMubmV0d29ya1N0YXRlLmNvbm5lY3Rpb24gPT09IHRydWUgfHwgdGhpcy5vZmZsaW5lQnV0dG9uU3RhdGUuY29ubmVjdGlvbiA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgbGF5ZXIub2wuc2V0TWF4UmVzb2x1dGlvbihJbmZpbml0eSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIl19
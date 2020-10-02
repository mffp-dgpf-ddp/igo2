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
                if (this.networkState.connection === false || this.offlineButtonState.connection === false) {
                    layer.ol.setMaxResolution(0);
                    return;
                }
                else if (this.networkState.connection === true || this.offlineButtonState.connection === true) {
                    layer.ol.setMaxResolution(Infinity);
                    return;
                }
            }
            if (sourceOptions) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwT2ZmbGluZS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvbWFwL3NoYXJlZC9tYXBPZmZsaW5lLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFDekQsT0FBTyxFQUFFLGNBQWMsRUFBbUIsY0FBYyxFQUFFLGVBQWUsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUc5RixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQU0zRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx3REFBd0QsQ0FBQztBQUMzRixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sb0RBQW9ELENBQUM7QUFDbkYsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sd0RBQXdELENBQUM7QUFDM0YsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG9EQUFvRCxDQUFDO0FBS25GLE1BQU0sT0FBTyxtQkFBbUI7Ozs7Ozs7SUFlOUIsWUFDRSxTQUE4QixFQUN0QixjQUE4QixFQUM5QixjQUE4QixFQUM5QixlQUFnQztRQUZoQyxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQWhCbEMsd0JBQW1CLEdBQVksS0FBSyxDQUFDO1FBQ3JDLGlCQUFZLEdBQW9CO1lBQ3RDLFVBQVUsRUFBRSxJQUFJO1NBQ2pCLENBQUM7UUFDTSx1QkFBa0IsR0FBb0I7WUFDNUMsVUFBVSxFQUFFLElBQUk7U0FDakIsQ0FBQztRQVlFLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO0lBQzdCLENBQUM7Ozs7SUFYSCxJQUFJLEdBQUc7UUFDTCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDO0lBQzVCLENBQUM7Ozs7SUFXQyxl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RUFBRTt3QkFDL0YsS0FBSyxDQUFDLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztxQkFDckM7aUJBQ0Y7YUFDRjtpQkFBTTtnQkFDTCxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxLQUFLLEtBQUssSUFBSSxJQUFJLENBQUMsa0JBQWtCLENBQUMsVUFBVSxLQUFLLEtBQUssRUFBRTtvQkFDMUYsS0FBSyxDQUFDLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDOUI7cUJBQU0sSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsS0FBSyxJQUFJLElBQUksSUFBSSxDQUFDLGtCQUFrQixDQUFDLFVBQVUsS0FBSyxJQUFJLEVBQUU7b0JBQy9GLEtBQUssQ0FBQyxFQUFFLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUM7aUJBQ3JDO2FBQ0Y7UUFDSCxDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7OztZQTNIRixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLGlCQUFpQjthQUM1Qjs7OztZQWJNLG1CQUFtQjtZQUhuQixjQUFjO1lBQW1CLGNBQWM7WUFBRSxlQUFlOzs7Ozs7O0lBbUJ2RSx3Q0FBdUM7Ozs7O0lBQ3ZDLGtEQUE2Qzs7Ozs7SUFDN0MsMkNBRUU7Ozs7O0lBQ0YsaURBRUU7Ozs7O0lBUUEsNkNBQXNDOzs7OztJQUN0Qyw2Q0FBc0M7Ozs7O0lBQ3RDLDhDQUF3QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgQWZ0ZXJWaWV3SW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBOZXR3b3JrU2VydmljZSwgQ29ubmVjdGlvblN0YXRlLCBNZXNzYWdlU2VydmljZSwgTGFuZ3VhZ2VTZXJ2aWNlIH0gZnJvbSAnQGlnbzIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBJZ29NYXAgfSBmcm9tICcuL21hcCc7XHJcbmltcG9ydCB7IE1hcEJyb3dzZXJDb21wb25lbnQgfSBmcm9tICcuLi9tYXAtYnJvd3Nlci9tYXAtYnJvd3Nlci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBGZWF0dXJlRGF0YVNvdXJjZU9wdGlvbnMgfSBmcm9tICcuLi8uLi9kYXRhc291cmNlL3NoYXJlZC9kYXRhc291cmNlcy9mZWF0dXJlLWRhdGFzb3VyY2UuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgWFlaRGF0YVNvdXJjZU9wdGlvbnMgfSBmcm9tICcuLi8uLi9kYXRhc291cmNlL3NoYXJlZC9kYXRhc291cmNlcy94eXotZGF0YXNvdXJjZS5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBNVlREYXRhU291cmNlT3B0aW9ucyB9IGZyb20gJy4uLy4uL2RhdGFzb3VyY2Uvc2hhcmVkL2RhdGFzb3VyY2VzL212dC1kYXRhc291cmNlLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IENsdXN0ZXJEYXRhU291cmNlT3B0aW9ucyB9IGZyb20gJy4uLy4uL2RhdGFzb3VyY2Uvc2hhcmVkL2RhdGFzb3VyY2VzL2NsdXN0ZXItZGF0YXNvdXJjZS5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBMYXllciB9IGZyb20gJy4uLy4uL2xheWVyL3NoYXJlZC9sYXllcnMvbGF5ZXInO1xyXG5pbXBvcnQgeyBDbHVzdGVyRGF0YVNvdXJjZSB9IGZyb20gJy4uLy4uL2RhdGFzb3VyY2Uvc2hhcmVkL2RhdGFzb3VyY2VzL2NsdXN0ZXItZGF0YXNvdXJjZSc7XHJcbmltcG9ydCB7IE1WVERhdGFTb3VyY2UgfSBmcm9tICcuLi8uLi9kYXRhc291cmNlL3NoYXJlZC9kYXRhc291cmNlcy9tdnQtZGF0YXNvdXJjZSc7XHJcbmltcG9ydCB7IEZlYXR1cmVEYXRhU291cmNlIH0gZnJvbSAnLi4vLi4vZGF0YXNvdXJjZS9zaGFyZWQvZGF0YXNvdXJjZXMvZmVhdHVyZS1kYXRhc291cmNlJztcclxuaW1wb3J0IHsgWFlaRGF0YVNvdXJjZSB9IGZyb20gJy4uLy4uL2RhdGFzb3VyY2Uvc2hhcmVkL2RhdGFzb3VyY2VzL3h5ei1kYXRhc291cmNlJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gICAgc2VsZWN0b3I6ICdbaWdvTWFwT2ZmbGluZV0nXHJcbiAgfSlcclxuZXhwb3J0IGNsYXNzIE1hcE9mZmxpbmVEaXJlY3RpdmUgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcclxuXHJcbiAgcHJpdmF0ZSBjb21wb25lbnQ6IE1hcEJyb3dzZXJDb21wb25lbnQ7XHJcbiAgcHJpdmF0ZSBvZmZsaW5lQnV0dG9uU3RhdHVzOiBib29sZWFuID0gZmFsc2U7XHJcbiAgcHJpdmF0ZSBuZXR3b3JrU3RhdGU6IENvbm5lY3Rpb25TdGF0ZSA9IHtcclxuICAgIGNvbm5lY3Rpb246IHRydWVcclxuICB9O1xyXG4gIHByaXZhdGUgb2ZmbGluZUJ1dHRvblN0YXRlOiBDb25uZWN0aW9uU3RhdGUgPSB7XHJcbiAgICBjb25uZWN0aW9uOiB0cnVlXHJcbiAgfTtcclxuXHJcbiAgZ2V0IG1hcCgpOiBJZ29NYXAge1xyXG4gICAgcmV0dXJuIHRoaXMuY29tcG9uZW50Lm1hcDtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgY29tcG9uZW50OiBNYXBCcm93c2VyQ29tcG9uZW50LFxyXG4gICAgcHJpdmF0ZSBuZXR3b3JrU2VydmljZTogTmV0d29ya1NlcnZpY2UsXHJcbiAgICBwcml2YXRlIG1lc3NhZ2VTZXJ2aWNlOiBNZXNzYWdlU2VydmljZSxcclxuICAgIHByaXZhdGUgbGFuZ3VhZ2VTZXJ2aWNlOiBMYW5ndWFnZVNlcnZpY2VcclxuICAgICkge1xyXG4gICAgICB0aGlzLmNvbXBvbmVudCA9IGNvbXBvbmVudDtcclxuICAgIH1cclxuXHJcbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XHJcbiAgICAgIHRoaXMubWFwLm9mZmxpbmVCdXR0b25Ub2dnbGUkLnN1YnNjcmliZSgob2ZmbGluZUJ1dHRvblRvZ2dsZTogYm9vbGVhbikgPT4ge1xyXG4gICAgICAgIHRoaXMub2ZmbGluZUJ1dHRvblN0YXR1cyA9IG9mZmxpbmVCdXR0b25Ub2dnbGU7XHJcbiAgICAgICAgY29uc3QgdHJhbnNsYXRlID0gdGhpcy5sYW5ndWFnZVNlcnZpY2UudHJhbnNsYXRlO1xyXG4gICAgICAgIGlmICh0aGlzLm9mZmxpbmVCdXR0b25TdGF0dXMgJiYgdGhpcy5uZXR3b3JrU3RhdGUuY29ubmVjdGlvbikge1xyXG4gICAgICAgICAgY29uc3QgbWVzc2FnZSA9IHRyYW5zbGF0ZS5pbnN0YW50KCdpZ28uZ2VvLm5ldHdvcmsub2ZmbGluZS5tZXNzYWdlJyk7XHJcbiAgICAgICAgICBjb25zdCB0aXRsZSA9IHRyYW5zbGF0ZS5pbnN0YW50KCdpZ28uZ2VvLm5ldHdvcmsub2ZmbGluZS50aXRsZScpO1xyXG4gICAgICAgICAgdGhpcy5tZXNzYWdlU2VydmljZS5pbmZvKG1lc3NhZ2UsIHRpdGxlKTtcclxuICAgICAgICAgIHRoaXMub2ZmbGluZUJ1dHRvblN0YXRlLmNvbm5lY3Rpb24gPSBmYWxzZTtcclxuICAgICAgICAgIHRoaXMuY2hhbmdlTGF5ZXIoKTtcclxuICAgICAgICB9IGVsc2UgaWYgKCF0aGlzLm9mZmxpbmVCdXR0b25TdGF0dXMgJiYgIXRoaXMubmV0d29ya1N0YXRlLmNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgIGNvbnN0IG1lc3NhZ2UgPSB0cmFuc2xhdGUuaW5zdGFudCgnaWdvLmdlby5uZXR3b3JrLm9mZmxpbmUubWVzc2FnZScpO1xyXG4gICAgICAgICAgY29uc3QgdGl0bGUgPSB0cmFuc2xhdGUuaW5zdGFudCgnaWdvLmdlby5uZXR3b3JrLm9mZmxpbmUudGl0bGUnKTtcclxuICAgICAgICAgIHRoaXMubWVzc2FnZVNlcnZpY2UuaW5mbyhtZXNzYWdlLCB0aXRsZSk7XHJcbiAgICAgICAgICB0aGlzLm9mZmxpbmVCdXR0b25TdGF0ZS5jb25uZWN0aW9uID0gZmFsc2U7XHJcbiAgICAgICAgICB0aGlzLmNoYW5nZUxheWVyKCk7XHJcbiAgICAgICAgfSBlbHNlIGlmICghdGhpcy5vZmZsaW5lQnV0dG9uU3RhdHVzICYmIHRoaXMubmV0d29ya1N0YXRlLmNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgIGxldCBtZXNzYWdlO1xyXG4gICAgICAgICAgbGV0IHRpdGxlO1xyXG4gICAgICAgICAgY29uc3QgbWVzc2FnZU9icyA9IHRyYW5zbGF0ZS5nZXQoJ2lnby5nZW8ubmV0d29yay5vbmxpbmUubWVzc2FnZScpO1xyXG4gICAgICAgICAgY29uc3QgdGl0bGVPYnMgPSB0cmFuc2xhdGUuZ2V0KCdpZ28uZ2VvLm5ldHdvcmsub25saW5lLnRpdGxlJyk7XHJcbiAgICAgICAgICBtZXNzYWdlT2JzLnN1YnNjcmliZSgobWVzc2FnZTE6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICBtZXNzYWdlID0gbWVzc2FnZTE7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIHRpdGxlT2JzLnN1YnNjcmliZSgodGl0bGUxOiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgdGl0bGUgPSB0aXRsZTE7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIHRoaXMubWVzc2FnZVNlcnZpY2UuaW5mbyhtZXNzYWdlLCB0aXRsZSk7XHJcbiAgICAgICAgICB0aGlzLm9mZmxpbmVCdXR0b25TdGF0ZS5jb25uZWN0aW9uID0gdHJ1ZTtcclxuICAgICAgICAgIHRoaXMuY2hhbmdlTGF5ZXIoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgdGhpcy5uZXR3b3JrU2VydmljZS5jdXJyZW50U3RhdGUoKS5zdWJzY3JpYmUoKHN0YXRlOiBDb25uZWN0aW9uU3RhdGUpID0+IHtcclxuICAgICAgICB0aGlzLm5ldHdvcmtTdGF0ZSA9IHN0YXRlO1xyXG4gICAgICAgIGlmICghdGhpcy5vZmZsaW5lQnV0dG9uU3RhdHVzKSB7XHJcbiAgICAgICAgICB0aGlzLmNoYW5nZUxheWVyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHRoaXMubWFwLmxheWVycyQuc3Vic2NyaWJlKChsYXllcnM6IExheWVyW10pID0+IHtcclxuICAgICAgICB0aGlzLmNoYW5nZUxheWVyKCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICBwcml2YXRlIGNoYW5nZUxheWVyKCkge1xyXG4gICAgbGV0IHNvdXJjZU9wdGlvbnM7XHJcbiAgICBjb25zdCBsYXllckxpc3QgPSB0aGlzLm1hcC5sYXllcnMkLnZhbHVlO1xyXG4gICAgbGF5ZXJMaXN0LmZvckVhY2gobGF5ZXIgPT4ge1xyXG4gICAgICBpZiAobGF5ZXIub3B0aW9ucy5zb3VyY2UgaW5zdGFuY2VvZiBNVlREYXRhU291cmNlKSB7XHJcbiAgICAgICAgc291cmNlT3B0aW9ucyA9IChsYXllci5vcHRpb25zLnNvdXJjZU9wdGlvbnMgYXMgTVZURGF0YVNvdXJjZU9wdGlvbnMpO1xyXG4gICAgICAgIGxheWVyLm9sLmdldFNvdXJjZSgpLmNsZWFyKCk7XHJcbiAgICAgIH0gZWxzZSBpZiAobGF5ZXIub3B0aW9ucy5zb3VyY2UgaW5zdGFuY2VvZiBYWVpEYXRhU291cmNlKSB7XHJcbiAgICAgICAgc291cmNlT3B0aW9ucyA9IChsYXllci5vcHRpb25zLnNvdXJjZU9wdGlvbnMgYXMgWFlaRGF0YVNvdXJjZU9wdGlvbnMpO1xyXG4gICAgICB9IGVsc2UgaWYgKGxheWVyLm9wdGlvbnMuc291cmNlIGluc3RhbmNlb2YgQ2x1c3RlckRhdGFTb3VyY2UpIHtcclxuICAgICAgICBzb3VyY2VPcHRpb25zID0gKGxheWVyLm9wdGlvbnMuc291cmNlT3B0aW9ucyBhcyBDbHVzdGVyRGF0YVNvdXJjZU9wdGlvbnMpO1xyXG4gICAgICB9IGVsc2UgaWYgKGxheWVyLm9wdGlvbnMuc291cmNlIGluc3RhbmNlb2YgRmVhdHVyZURhdGFTb3VyY2UpIHtcclxuICAgICAgICBzb3VyY2VPcHRpb25zID0gKGxheWVyLm9wdGlvbnMuc291cmNlT3B0aW9ucyBhcyBGZWF0dXJlRGF0YVNvdXJjZU9wdGlvbnMpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmICh0aGlzLm5ldHdvcmtTdGF0ZS5jb25uZWN0aW9uID09PSBmYWxzZSB8fCB0aGlzLm9mZmxpbmVCdXR0b25TdGF0ZS5jb25uZWN0aW9uID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgbGF5ZXIub2wuc2V0TWF4UmVzb2x1dGlvbigwKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMubmV0d29ya1N0YXRlLmNvbm5lY3Rpb24gPT09IHRydWUgfHwgdGhpcy5vZmZsaW5lQnV0dG9uU3RhdGUuY29ubmVjdGlvbiA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgbGF5ZXIub2wuc2V0TWF4UmVzb2x1dGlvbihJbmZpbml0eSk7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoc291cmNlT3B0aW9ucykge1xyXG4gICAgICAgIGlmIChzb3VyY2VPcHRpb25zLnBhdGhPZmZsaW5lICYmIHRoaXMubmV0d29ya1N0YXRlLmNvbm5lY3Rpb24gPT09IGZhbHNlIHx8XHJcbiAgICAgICAgICBzb3VyY2VPcHRpb25zLnBhdGhPZmZsaW5lICYmIHRoaXMub2ZmbGluZUJ1dHRvblN0YXRlLmNvbm5lY3Rpb24gPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIGlmIChzb3VyY2VPcHRpb25zLnR5cGUgPT09ICd2ZWN0b3InIHx8IHNvdXJjZU9wdGlvbnMudHlwZSA9PT0gJ2NsdXN0ZXInKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxheWVyLm9sLmdldFNvdXJjZSgpLnNldFVybChzb3VyY2VPcHRpb25zLnBhdGhPZmZsaW5lKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHNvdXJjZU9wdGlvbnMucGF0aE9mZmxpbmUgJiYgdGhpcy5uZXR3b3JrU3RhdGUuY29ubmVjdGlvbiA9PT0gZmFsc2UgfHxcclxuICAgICAgICAgIHNvdXJjZU9wdGlvbnMucGF0aE9mZmxpbmUgJiYgdGhpcy5vZmZsaW5lQnV0dG9uU3RhdGUuY29ubmVjdGlvbiA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICBpZiAoc291cmNlT3B0aW9ucy50eXBlID09PSAndmVjdG9yJyB8fCBzb3VyY2VPcHRpb25zLnR5cGUgPT09ICdjbHVzdGVyJykge1xyXG4gICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsYXllci5vbC5nZXRTb3VyY2UoKS5zZXRVcmwoc291cmNlT3B0aW9ucy51cmwpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBpZiAodGhpcy5uZXR3b3JrU3RhdGUuY29ubmVjdGlvbiA9PT0gZmFsc2UgfHwgdGhpcy5vZmZsaW5lQnV0dG9uU3RhdGUuY29ubmVjdGlvbiA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgbGF5ZXIub2wuc2V0TWF4UmVzb2x1dGlvbigwKTtcclxuICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5uZXR3b3JrU3RhdGUuY29ubmVjdGlvbiA9PT0gdHJ1ZSB8fCB0aGlzLm9mZmxpbmVCdXR0b25TdGF0ZS5jb25uZWN0aW9uID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIGxheWVyLm9sLnNldE1heFJlc29sdXRpb24oSW5maW5pdHkpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAodGhpcy5uZXR3b3JrU3RhdGUuY29ubmVjdGlvbiA9PT0gZmFsc2UgfHwgdGhpcy5vZmZsaW5lQnV0dG9uU3RhdGUuY29ubmVjdGlvbiA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgIGxheWVyLm9sLnNldE1heFJlc29sdXRpb24oMCk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLm5ldHdvcmtTdGF0ZS5jb25uZWN0aW9uID09PSB0cnVlIHx8IHRoaXMub2ZmbGluZUJ1dHRvblN0YXRlLmNvbm5lY3Rpb24gPT09IHRydWUpIHtcclxuICAgICAgICAgIGxheWVyLm9sLnNldE1heFJlc29sdXRpb24oSW5maW5pdHkpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==
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
            else if (layer.options.sourceOptions.type === 'cluster') {
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
                else if (sourceOptions.type === 'cluster') {
                    return;
                }
                layer.ol.getSource().setUrl(sourceOptions.pathOffline);
            }
            else if (sourceOptions.pathOffline &&
                this.state.connection === true) {
                if (sourceOptions.type === 'vector') {
                    return;
                }
                else if (sourceOptions.type === 'cluster') {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwT2ZmbGluZS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvbWFwL3NoYXJlZC9tYXBPZmZsaW5lLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFFekQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDM0UsT0FBTyxFQUFFLGNBQWMsRUFBbUIsTUFBTSxZQUFZLENBQUM7QUFRN0QsTUFBTSxPQUFPLG1CQUFtQjs7Ozs7SUFVOUIsWUFDRSxTQUE4QixFQUN0QixjQUE4QjtRQUE5QixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFFcEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7SUFDN0IsQ0FBQzs7OztJQVRILElBQUksR0FBRztRQUNMLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUM7SUFDNUIsQ0FBQzs7OztJQVNELGVBQWU7UUFDYixJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksRUFBRSxDQUFDLFNBQVM7Ozs7UUFBQyxDQUFDLEtBQXNCLEVBQUUsRUFBRTtZQUN0RSxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUNuQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDckIsQ0FBQyxFQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxTQUFTOzs7O1FBQUMsQ0FBQyxNQUFlLEVBQUUsRUFBRTtZQUM3QyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDckIsQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDOzs7OztJQUVPLFdBQVc7O1lBQ2IsYUFBYTs7Y0FDWCxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSztRQUN4QyxTQUFTLENBQUMsT0FBTzs7OztRQUFDLEtBQUss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Q0FBdUM7Ozs7O0lBUXJDLDZDQUFzQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgQWZ0ZXJWaWV3SW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBJZ29NYXAgfSBmcm9tICcuL21hcCc7XHJcbmltcG9ydCB7IE1hcEJyb3dzZXJDb21wb25lbnQgfSBmcm9tICcuLi9tYXAtYnJvd3Nlci9tYXAtYnJvd3Nlci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBOZXR3b3JrU2VydmljZSwgQ29ubmVjdGlvblN0YXRlIH0gZnJvbSAnQGlnbzIvY29yZSc7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBMYXllciB9IGZyb20gJy4uLy4uL2xheWVyL3NoYXJlZC9sYXllcnMvbGF5ZXInO1xyXG5pbXBvcnQgeyBNVlREYXRhU291cmNlT3B0aW9ucywgWFlaRGF0YVNvdXJjZU9wdGlvbnMsIEZlYXR1cmVEYXRhU291cmNlT3B0aW9ucywgQ2x1c3RlckRhdGFTb3VyY2VPcHRpb25zIH0gZnJvbSAnLi4vLi4vZGF0YXNvdXJjZSc7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICAgIHNlbGVjdG9yOiAnW2lnb01hcE9mZmxpbmVdJ1xyXG4gIH0pXHJcbmV4cG9ydCBjbGFzcyBNYXBPZmZsaW5lRGlyZWN0aXZlIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XHJcblxyXG4gIHByaXZhdGUgY29udGV4dCQkOiBTdWJzY3JpcHRpb247XHJcbiAgcHJpdmF0ZSBzdGF0ZTogQ29ubmVjdGlvblN0YXRlO1xyXG4gIHByaXZhdGUgY29tcG9uZW50OiBNYXBCcm93c2VyQ29tcG9uZW50O1xyXG5cclxuICBnZXQgbWFwKCk6IElnb01hcCB7XHJcbiAgICByZXR1cm4gdGhpcy5jb21wb25lbnQubWFwO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBjb21wb25lbnQ6IE1hcEJyb3dzZXJDb21wb25lbnQsXHJcbiAgICBwcml2YXRlIG5ldHdvcmtTZXJ2aWNlOiBOZXR3b3JrU2VydmljZVxyXG4gICAgKSB7XHJcbiAgICAgIHRoaXMuY29tcG9uZW50ID0gY29tcG9uZW50O1xyXG4gICAgfVxyXG5cclxuICBuZ0FmdGVyVmlld0luaXQoKSB7XHJcbiAgICB0aGlzLm5ldHdvcmtTZXJ2aWNlLmN1cnJlbnRTdGF0ZSgpLnN1YnNjcmliZSgoc3RhdGU6IENvbm5lY3Rpb25TdGF0ZSkgPT4ge1xyXG4gICAgICB0aGlzLnN0YXRlID0gc3RhdGU7XHJcbiAgICAgIHRoaXMuY2hhbmdlTGF5ZXIoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMubWFwLmxheWVycyQuc3Vic2NyaWJlKChsYXllcnM6IExheWVyW10pID0+IHtcclxuICAgICAgdGhpcy5jaGFuZ2VMYXllcigpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNoYW5nZUxheWVyKCkge1xyXG4gICAgbGV0IHNvdXJjZU9wdGlvbnM7XHJcbiAgICBjb25zdCBsYXllckxpc3QgPSB0aGlzLm1hcC5sYXllcnMkLnZhbHVlO1xyXG4gICAgbGF5ZXJMaXN0LmZvckVhY2gobGF5ZXIgPT4ge1xyXG4gICAgICBpZiAobGF5ZXIub3B0aW9ucy5zb3VyY2VPcHRpb25zLnR5cGUgPT09ICdtdnQnKSB7XHJcbiAgICAgICAgc291cmNlT3B0aW9ucyA9IChsYXllci5vcHRpb25zLnNvdXJjZU9wdGlvbnMgYXMgTVZURGF0YVNvdXJjZU9wdGlvbnMpO1xyXG4gICAgICAgIGxheWVyLm9sLmdldFNvdXJjZSgpLmNsZWFyKCk7XHJcbiAgICAgIH0gZWxzZSBpZiAobGF5ZXIub3B0aW9ucy5zb3VyY2VPcHRpb25zLnR5cGUgPT09ICd4eXonKSB7XHJcbiAgICAgICAgc291cmNlT3B0aW9ucyA9IChsYXllci5vcHRpb25zLnNvdXJjZU9wdGlvbnMgYXMgWFlaRGF0YVNvdXJjZU9wdGlvbnMpO1xyXG4gICAgICB9IGVsc2UgaWYgKGxheWVyLm9wdGlvbnMuc291cmNlT3B0aW9ucy50eXBlID09PSAndmVjdG9yJykge1xyXG4gICAgICAgIHNvdXJjZU9wdGlvbnMgPSAobGF5ZXIub3B0aW9ucy5zb3VyY2VPcHRpb25zIGFzIEZlYXR1cmVEYXRhU291cmNlT3B0aW9ucyk7XHJcbiAgICAgIH0gZWxzZSBpZiAobGF5ZXIub3B0aW9ucy5zb3VyY2VPcHRpb25zLnR5cGUgPT09ICdjbHVzdGVyJykge1xyXG4gICAgICAgICAgc291cmNlT3B0aW9ucyA9IChsYXllci5vcHRpb25zLnNvdXJjZU9wdGlvbnMgYXMgQ2x1c3RlckRhdGFTb3VyY2VPcHRpb25zKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAodGhpcy5zdGF0ZS5jb25uZWN0aW9uID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgbGF5ZXIub2wuc2V0TWF4UmVzb2x1dGlvbigwKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc3RhdGUuY29ubmVjdGlvbiA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgbGF5ZXIub2wuc2V0TWF4UmVzb2x1dGlvbihJbmZpbml0eSk7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGlmIChzb3VyY2VPcHRpb25zLnBhdGhPZmZsaW5lICAmJlxyXG4gICAgICAgIHRoaXMuc3RhdGUuY29ubmVjdGlvbiA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgIGlmIChzb3VyY2VPcHRpb25zLnR5cGUgPT09ICd2ZWN0b3InKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgIH0gZWxzZSBpZiAoc291cmNlT3B0aW9ucy50eXBlID09PSAnY2x1c3RlcicpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgbGF5ZXIub2wuZ2V0U291cmNlKCkuc2V0VXJsKHNvdXJjZU9wdGlvbnMucGF0aE9mZmxpbmUpO1xyXG4gICAgICB9IGVsc2UgaWYgKHNvdXJjZU9wdGlvbnMucGF0aE9mZmxpbmUgJiZcclxuICAgICAgICB0aGlzLnN0YXRlLmNvbm5lY3Rpb24gPT09IHRydWUpIHtcclxuICAgICAgICAgIGlmIChzb3VyY2VPcHRpb25zLnR5cGUgPT09ICd2ZWN0b3InKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgIH0gZWxzZSBpZiAoc291cmNlT3B0aW9ucy50eXBlID09PSAnY2x1c3RlcicpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgbGF5ZXIub2wuZ2V0U291cmNlKCkuc2V0VXJsKHNvdXJjZU9wdGlvbnMudXJsKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAodGhpcy5zdGF0ZS5jb25uZWN0aW9uID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgbGF5ZXIub2wuc2V0TWF4UmVzb2x1dGlvbigwKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc3RhdGUuY29ubmVjdGlvbiA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgbGF5ZXIub2wuc2V0TWF4UmVzb2x1dGlvbihJbmZpbml0eSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIl19
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { IgoMap } from '../../map/shared/map';
import { LayerService } from '../../layer/shared/layer.service';
import { LAYER } from '../../layer/shared/layer.enums';
import { BehaviorSubject } from 'rxjs';
export class SearchResultAddButtonComponent {
    /**
     * @param {?} layerService
     */
    constructor(layerService) {
        this.layerService = layerService;
        this.tooltip$ = new BehaviorSubject('igo.geo.catalog.layer.addToMap');
        this.inRange$ = new BehaviorSubject(true);
        this.isPreview$ = new BehaviorSubject(false);
        this.layersSubcriptions = [];
        this._color = 'primary';
    }
    /**
     * @return {?}
     */
    get color() {
        return this._color;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set color(value) {
        this._color = value;
    }
    /**
     * \@internal
     * @return {?}
     */
    ngOnInit() {
        if (this.layer.meta.dataType === 'Layer') {
            this.added =
                this.map.layers.findIndex((/**
                 * @param {?} lay
                 * @return {?}
                 */
                lay => lay.id === this.layer.data.sourceOptions.id)) !== -1;
        }
        this.resolution$$ = this.map.viewController.resolution$.subscribe((/**
         * @param {?} value
         * @return {?}
         */
        value => {
            this.isInResolutionsRange(value);
            this.tooltip$.next(this.computeTooltip());
        }));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.resolution$$.unsubscribe();
    }
    /**
     * On mouse event, mouseenter /mouseleave
     * \@internal
     * @param {?} event
     * @return {?}
     */
    onMouseEvent(event) {
        this.onToggleClick(event);
    }
    /**
     * On toggle button click, emit the added change event
     * \@internal
     * @param {?} event
     * @return {?}
     */
    onToggleClick(event) {
        if (typeof this.lastTimeoutRequest !== 'undefined') {
            clearTimeout(this.lastTimeoutRequest);
        }
        switch (event.type) {
            case 'click':
                if (!this.isPreview$.value) {
                    if (this.added) {
                        this.remove();
                    }
                    else {
                        this.add();
                    }
                }
                this.isPreview$.next(false);
                break;
            case 'mouseenter':
                if (!this.isPreview$.value && !this.added) {
                    this.lastTimeoutRequest = setTimeout((/**
                     * @return {?}
                     */
                    () => {
                        this.add();
                        this.isPreview$.next(true);
                    }), 500);
                }
                break;
            case 'mouseleave':
                if (this.isPreview$.value) {
                    this.remove();
                    this.isPreview$.next(false);
                }
                break;
            default:
                break;
        }
    }
    /**
     * @private
     * @return {?}
     */
    add() {
        if (!this.added) {
            this.added = true;
            this.addLayerToMap();
        }
    }
    /**
     * @private
     * @return {?}
     */
    remove() {
        if (this.added) {
            this.added = false;
            this.removeLayerFromMap();
            this.layersSubcriptions.map((/**
             * @param {?} s
             * @return {?}
             */
            s => s.unsubscribe()));
            this.layersSubcriptions = [];
        }
    }
    /**
     * Emit added change event with added = true
     * @private
     * @return {?}
     */
    addLayerToMap() {
        if (this.map === undefined) {
            return;
        }
        if (this.layer.meta.dataType !== LAYER) {
            return undefined;
        }
        /** @type {?} */
        const layerOptions = ((/** @type {?} */ (this.layer))).data;
        if (layerOptions.sourceOptions.optionsFromApi === undefined) {
            layerOptions.sourceOptions.optionsFromApi = true;
        }
        this.layersSubcriptions.push(this.layerService
            .createAsyncLayer(layerOptions)
            .subscribe((/**
         * @param {?} layer
         * @return {?}
         */
        layer => this.map.addLayer(layer))));
    }
    /**
     * Emit added change event with added = false
     * @private
     * @return {?}
     */
    removeLayerFromMap() {
        if (this.map === undefined) {
            return;
        }
        if (this.layer.meta.dataType !== LAYER) {
            return undefined;
        }
        /** @type {?} */
        const oLayer = this.map.getLayerById(this.layer.data.sourceOptions.id);
        this.map.removeLayer(oLayer);
    }
    /**
     * @param {?} resolution
     * @return {?}
     */
    isInResolutionsRange(resolution) {
        /** @type {?} */
        const minResolution = this.layer.data.minResolution || 0;
        /** @type {?} */
        const maxResolution = this.layer.data.maxResolution || Infinity;
        this.inRange$.next(resolution >= minResolution && resolution <= maxResolution);
    }
    /**
     * @return {?}
     */
    computeTooltip() {
        if (this.added) {
            return this.inRange$.value
                ? 'igo.geo.catalog.layer.removeFromMap'
                : 'igo.geo.catalog.layer.removeFromMapOutRange';
        }
        else {
            return this.inRange$.value
                ? 'igo.geo.catalog.layer.addToMap'
                : 'igo.geo.catalog.layer.addToMapOutRange';
        }
    }
}
SearchResultAddButtonComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-search-add-button',
                template: "<button\r\n(mouseenter)=\"onMouseEvent($event)\" (mouseleave)=\"onMouseEvent($event)\"\r\n*ngIf=\"layer.meta.dataType === 'Layer'\"\r\nmat-icon-button\r\ntooltip-position=\"below\"\r\nmatTooltipShowDelay=\"500\"\r\n[matTooltip]=\"(tooltip$ | async) | translate\"\r\n[color]=\"(isPreview$ | async) ? '' : added ? 'warn' : ''\"\r\n(click)=\"onToggleClick($event)\">\r\n<mat-icon \r\n  matBadge\r\n  igoMatBadgeIcon=\"eye-off\"\r\n  [matBadgeHidden]=\"(inRange$ | async)\"\r\n  matBadgeColor=\"primary\" \r\n  matBadgeSize=\"small\" \r\n  matBadgePosition=\"after\"\r\n  [svgIcon]=\"(isPreview$ | async) ? 'plus' : added ? 'delete' : 'plus'\">\r\n</mat-icon>\r\n</button>",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".mat-badge-small .mat-badge-content{color:rgba(0,0,0,.38)}"]
            }] }
];
/** @nocollapse */
SearchResultAddButtonComponent.ctorParameters = () => [
    { type: LayerService }
];
SearchResultAddButtonComponent.propDecorators = {
    layer: [{ type: Input }],
    added: [{ type: Input }],
    map: [{ type: Input }],
    color: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    SearchResultAddButtonComponent.prototype.tooltip$;
    /**
     * @type {?}
     * @private
     */
    SearchResultAddButtonComponent.prototype.resolution$$;
    /** @type {?} */
    SearchResultAddButtonComponent.prototype.inRange$;
    /** @type {?} */
    SearchResultAddButtonComponent.prototype.isPreview$;
    /**
     * @type {?}
     * @private
     */
    SearchResultAddButtonComponent.prototype.layersSubcriptions;
    /**
     * @type {?}
     * @private
     */
    SearchResultAddButtonComponent.prototype.lastTimeoutRequest;
    /** @type {?} */
    SearchResultAddButtonComponent.prototype.layer;
    /**
     * Whether the layer is already added to the map
     * @type {?}
     */
    SearchResultAddButtonComponent.prototype.added;
    /**
     * The map to add the search result layer to
     * @type {?}
     */
    SearchResultAddButtonComponent.prototype.map;
    /**
     * @type {?}
     * @private
     */
    SearchResultAddButtonComponent.prototype._color;
    /**
     * @type {?}
     * @private
     */
    SearchResultAddButtonComponent.prototype.layerService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLXJlc3VsdHMtYWRkLWJ1dHRvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvc2VhcmNoL3NlYXJjaC1yZXN1bHRzL3NlYXJjaC1yZXN1bHRzLWFkZC1idXR0b24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCx1QkFBdUIsRUFHeEIsTUFBTSxlQUFlLENBQUM7QUFHdkIsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRTlDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNoRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDdkQsT0FBTyxFQUFnQixlQUFlLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFRckQsTUFBTSxPQUFPLDhCQUE4Qjs7OztJQW9DekMsWUFBb0IsWUFBMEI7UUFBMUIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFuQ3ZDLGFBQVEsR0FBNEIsSUFBSSxlQUFlLENBQzVELGdDQUFnQyxDQUNqQyxDQUFDO1FBSUssYUFBUSxHQUE2QixJQUFJLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUUvRCxlQUFVLEdBQTZCLElBQUksZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRWpFLHVCQUFrQixHQUFHLEVBQUUsQ0FBQztRQXVCeEIsV0FBTSxHQUFHLFNBQVMsQ0FBQztJQUVzQixDQUFDOzs7O0lBVGxELElBQ0ksS0FBSztRQUNQLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUNyQixDQUFDOzs7OztJQUNELElBQUksS0FBSyxDQUFDLEtBQWE7UUFDckIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7SUFDdEIsQ0FBQzs7Ozs7SUFRRCxRQUFRO1FBQ04sSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUks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QUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsYUFBYSxJQUFJLENBQUM7O2NBQ2xELGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxhQUFhLElBQUksUUFBUTtRQUMvRCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FDaEIsVUFBVSxJQUFJLGFBQWEsSUFBSSxVQUFVLElBQUksYUFBYSxDQUMzRCxDQUFDO0lBQ0osQ0FBQzs7OztJQUVELGNBQWM7UUFDWixJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDZCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSztnQkFDeEIsQ0FBQyxDQUFDLHFDQUFxQztnQkFDdkMsQ0FBQyxDQUFDLDZDQUE2QyxDQUFDO1NBQ25EO2FBQU07WUFDTCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSztnQkFDeEIsQ0FBQyxDQUFDLGdDQUFnQztnQkFDbEMsQ0FBQyxDQUFDLHdDQUF3QyxDQUFDO1NBQzlDO0lBQ0gsQ0FBQzs7O1lBeExGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsdUJBQXVCO2dCQUNqQyx3cUJBQXlEO2dCQUV6RCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7YUFDaEQ7Ozs7WUFUUSxZQUFZOzs7b0JBeUJsQixLQUFLO29CQUtMLEtBQUs7a0JBS0wsS0FBSztvQkFFTCxLQUFLOzs7O0lBMUJOLGtEQUVFOzs7OztJQUVGLHNEQUFtQzs7SUFFbkMsa0RBQXNFOztJQUV0RSxvREFBeUU7Ozs7O0lBRXpFLDREQUFnQzs7Ozs7SUFFaEMsNERBQTJCOztJQUUzQiwrQ0FBNkI7Ozs7O0lBSzdCLCtDQUF3Qjs7Ozs7SUFLeEIsNkNBQXFCOzs7OztJQVNyQixnREFBMkI7Ozs7O0lBRWYsc0RBQWtDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgSW5wdXQsXHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbiAgT25Jbml0LFxyXG4gIE9uRGVzdHJveVxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgU2VhcmNoUmVzdWx0IH0gZnJvbSAnLi4vc2hhcmVkL3NlYXJjaC5pbnRlcmZhY2VzJztcclxuaW1wb3J0IHsgSWdvTWFwIH0gZnJvbSAnLi4vLi4vbWFwL3NoYXJlZC9tYXAnO1xyXG5pbXBvcnQgeyBMYXllck9wdGlvbnMgfSBmcm9tICcuLi8uLi9sYXllci9zaGFyZWQvbGF5ZXJzL2xheWVyLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IExheWVyU2VydmljZSB9IGZyb20gJy4uLy4uL2xheWVyL3NoYXJlZC9sYXllci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTEFZRVIgfSBmcm9tICcuLi8uLi9sYXllci9zaGFyZWQvbGF5ZXIuZW51bXMnO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24sIEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdpZ28tc2VhcmNoLWFkZC1idXR0b24nLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9zZWFyY2gtcmVzdWx0cy1hZGQtYnV0dG9uLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9zZWFyY2gtcmVzdWx0cy1hZGQtYnV0dG9uLmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIFNlYXJjaFJlc3VsdEFkZEJ1dHRvbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuICBwdWJsaWMgdG9vbHRpcCQ6IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+ID0gbmV3IEJlaGF2aW9yU3ViamVjdChcclxuICAgICdpZ28uZ2VvLmNhdGFsb2cubGF5ZXIuYWRkVG9NYXAnXHJcbiAgKTtcclxuXHJcbiAgcHJpdmF0ZSByZXNvbHV0aW9uJCQ6IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgcHVibGljIGluUmFuZ2UkOiBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KHRydWUpO1xyXG5cclxuICBwdWJsaWMgaXNQcmV2aWV3JDogQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IEJlaGF2aW9yU3ViamVjdChmYWxzZSk7XHJcblxyXG4gIHByaXZhdGUgbGF5ZXJzU3ViY3JpcHRpb25zID0gW107XHJcblxyXG4gIHByaXZhdGUgbGFzdFRpbWVvdXRSZXF1ZXN0O1xyXG5cclxuICBASW5wdXQoKSBsYXllcjogU2VhcmNoUmVzdWx0O1xyXG5cclxuICAvKipcclxuICAgKiBXaGV0aGVyIHRoZSBsYXllciBpcyBhbHJlYWR5IGFkZGVkIHRvIHRoZSBtYXBcclxuICAgKi9cclxuICBASW5wdXQoKSBhZGRlZDogYm9vbGVhbjtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIG1hcCB0byBhZGQgdGhlIHNlYXJjaCByZXN1bHQgbGF5ZXIgdG9cclxuICAgKi9cclxuICBASW5wdXQoKSBtYXA6IElnb01hcDtcclxuXHJcbiAgQElucHV0KClcclxuICBnZXQgY29sb3IoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fY29sb3I7XHJcbiAgfVxyXG4gIHNldCBjb2xvcih2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICB0aGlzLl9jb2xvciA9IHZhbHVlO1xyXG4gIH1cclxuICBwcml2YXRlIF9jb2xvciA9ICdwcmltYXJ5JztcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBsYXllclNlcnZpY2U6IExheWVyU2VydmljZSkge31cclxuXHJcbiAgLyoqXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5sYXllci5tZXRhLmRhdGFUeXBlID09PSAnTGF5ZXInKSB7XHJcbiAgICAgIHRoaXMuYWRkZWQgPVxyXG4gICAgICAgIHRoaXMubWFwLmxheWVycy5maW5kSW5kZXgoXHJcbiAgICAgICAgICBsYXkgPT4gbGF5LmlkID09PSB0aGlzLmxheWVyLmRhdGEuc291cmNlT3B0aW9ucy5pZFxyXG4gICAgICAgICkgIT09IC0xO1xyXG4gICAgfVxyXG4gICAgdGhpcy5yZXNvbHV0aW9uJCQgPSB0aGlzLm1hcC52aWV3Q29udHJvbGxlci5yZXNvbHV0aW9uJC5zdWJzY3JpYmUodmFsdWUgPT4ge1xyXG4gICAgICB0aGlzLmlzSW5SZXNvbHV0aW9uc1JhbmdlKHZhbHVlKTtcclxuICAgICAgdGhpcy50b29sdGlwJC5uZXh0KHRoaXMuY29tcHV0ZVRvb2x0aXAoKSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgdGhpcy5yZXNvbHV0aW9uJCQudW5zdWJzY3JpYmUoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE9uIG1vdXNlIGV2ZW50LCBtb3VzZWVudGVyIC9tb3VzZWxlYXZlXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgb25Nb3VzZUV2ZW50KGV2ZW50KSB7XHJcbiAgICB0aGlzLm9uVG9nZ2xlQ2xpY2soZXZlbnQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogT24gdG9nZ2xlIGJ1dHRvbiBjbGljaywgZW1pdCB0aGUgYWRkZWQgY2hhbmdlIGV2ZW50XHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgb25Ub2dnbGVDbGljayhldmVudCkge1xyXG4gICAgaWYgKHR5cGVvZiB0aGlzLmxhc3RUaW1lb3V0UmVxdWVzdCAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMubGFzdFRpbWVvdXRSZXF1ZXN0KTtcclxuICAgIH1cclxuXHJcbiAgICBzd2l0Y2ggKGV2ZW50LnR5cGUpIHtcclxuICAgICAgY2FzZSAnY2xpY2snOlxyXG4gICAgICAgIGlmICghdGhpcy5pc1ByZXZpZXckLnZhbHVlKSB7XHJcbiAgICAgICAgICBpZiAodGhpcy5hZGRlZCkge1xyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZSgpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5hZGQoKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5pc1ByZXZpZXckLm5leHQoZmFsc2UpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdtb3VzZWVudGVyJzpcclxuICAgICAgICBpZiAoIXRoaXMuaXNQcmV2aWV3JC52YWx1ZSAmJiAhdGhpcy5hZGRlZCkge1xyXG4gICAgICAgICAgdGhpcy5sYXN0VGltZW91dFJlcXVlc3QgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5hZGQoKTtcclxuICAgICAgICAgICAgdGhpcy5pc1ByZXZpZXckLm5leHQodHJ1ZSk7XHJcbiAgICAgICAgICB9LCA1MDApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnbW91c2VsZWF2ZSc6XHJcbiAgICAgICAgaWYgKHRoaXMuaXNQcmV2aWV3JC52YWx1ZSkge1xyXG4gICAgICAgICAgdGhpcy5yZW1vdmUoKTtcclxuICAgICAgICAgIHRoaXMuaXNQcmV2aWV3JC5uZXh0KGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGFkZCgpIHtcclxuICAgIGlmICghdGhpcy5hZGRlZCkge1xyXG4gICAgICB0aGlzLmFkZGVkID0gdHJ1ZTtcclxuICAgICAgdGhpcy5hZGRMYXllclRvTWFwKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHJlbW92ZSgpIHtcclxuICAgIGlmICh0aGlzLmFkZGVkKSB7XHJcbiAgICAgIHRoaXMuYWRkZWQgPSBmYWxzZTtcclxuICAgICAgdGhpcy5yZW1vdmVMYXllckZyb21NYXAoKTtcclxuICAgICAgdGhpcy5sYXllcnNTdWJjcmlwdGlvbnMubWFwKHMgPT4gcy51bnN1YnNjcmliZSgpKTtcclxuICAgICAgdGhpcy5sYXllcnNTdWJjcmlwdGlvbnMgPSBbXTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEVtaXQgYWRkZWQgY2hhbmdlIGV2ZW50IHdpdGggYWRkZWQgPSB0cnVlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBhZGRMYXllclRvTWFwKCkge1xyXG4gICAgaWYgKHRoaXMubWFwID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLmxheWVyLm1ldGEuZGF0YVR5cGUgIT09IExBWUVSKSB7XHJcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgbGF5ZXJPcHRpb25zID0gKHRoaXMubGF5ZXIgYXMgU2VhcmNoUmVzdWx0PExheWVyT3B0aW9ucz4pLmRhdGE7XHJcbiAgICBpZiAobGF5ZXJPcHRpb25zLnNvdXJjZU9wdGlvbnMub3B0aW9uc0Zyb21BcGkgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBsYXllck9wdGlvbnMuc291cmNlT3B0aW9ucy5vcHRpb25zRnJvbUFwaSA9IHRydWU7XHJcbiAgICB9XHJcbiAgICB0aGlzLmxheWVyc1N1YmNyaXB0aW9ucy5wdXNoKFxyXG4gICAgICB0aGlzLmxheWVyU2VydmljZVxyXG4gICAgICAgIC5jcmVhdGVBc3luY0xheWVyKGxheWVyT3B0aW9ucylcclxuICAgICAgICAuc3Vic2NyaWJlKGxheWVyID0+IHRoaXMubWFwLmFkZExheWVyKGxheWVyKSlcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBFbWl0IGFkZGVkIGNoYW5nZSBldmVudCB3aXRoIGFkZGVkID0gZmFsc2VcclxuICAgKi9cclxuICBwcml2YXRlIHJlbW92ZUxheWVyRnJvbU1hcCgpIHtcclxuICAgIGlmICh0aGlzLm1hcCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5sYXllci5tZXRhLmRhdGFUeXBlICE9PSBMQVlFUikge1xyXG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG9MYXllciA9IHRoaXMubWFwLmdldExheWVyQnlJZCh0aGlzLmxheWVyLmRhdGEuc291cmNlT3B0aW9ucy5pZCk7XHJcbiAgICB0aGlzLm1hcC5yZW1vdmVMYXllcihvTGF5ZXIpO1xyXG4gIH1cclxuXHJcbiAgaXNJblJlc29sdXRpb25zUmFuZ2UocmVzb2x1dGlvbjogbnVtYmVyKSB7XHJcbiAgICBjb25zdCBtaW5SZXNvbHV0aW9uID0gdGhpcy5sYXllci5kYXRhLm1pblJlc29sdXRpb24gfHwgMDtcclxuICAgIGNvbnN0IG1heFJlc29sdXRpb24gPSB0aGlzLmxheWVyLmRhdGEubWF4UmVzb2x1dGlvbiB8fCBJbmZpbml0eTtcclxuICAgIHRoaXMuaW5SYW5nZSQubmV4dChcclxuICAgICAgcmVzb2x1dGlvbiA+PSBtaW5SZXNvbHV0aW9uICYmIHJlc29sdXRpb24gPD0gbWF4UmVzb2x1dGlvblxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGNvbXB1dGVUb29sdGlwKCk6IHN0cmluZyB7XHJcbiAgICBpZiAodGhpcy5hZGRlZCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5pblJhbmdlJC52YWx1ZVxyXG4gICAgICAgID8gJ2lnby5nZW8uY2F0YWxvZy5sYXllci5yZW1vdmVGcm9tTWFwJ1xyXG4gICAgICAgIDogJ2lnby5nZW8uY2F0YWxvZy5sYXllci5yZW1vdmVGcm9tTWFwT3V0UmFuZ2UnO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIHRoaXMuaW5SYW5nZSQudmFsdWVcclxuICAgICAgICA/ICdpZ28uZ2VvLmNhdGFsb2cubGF5ZXIuYWRkVG9NYXAnXHJcbiAgICAgICAgOiAnaWdvLmdlby5jYXRhbG9nLmxheWVyLmFkZFRvTWFwT3V0UmFuZ2UnO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=
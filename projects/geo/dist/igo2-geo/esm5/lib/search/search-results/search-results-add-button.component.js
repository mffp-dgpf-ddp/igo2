/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { IgoMap } from '../../map/shared/map';
import { LayerService } from '../../layer/shared/layer.service';
import { LAYER } from '../../layer/shared/layer.enums';
import { BehaviorSubject } from 'rxjs';
var SearchResultAddButtonComponent = /** @class */ (function () {
    function SearchResultAddButtonComponent(layerService) {
        this.layerService = layerService;
        this.tooltip$ = new BehaviorSubject('igo.geo.catalog.layer.addToMap');
        this.inRange$ = new BehaviorSubject(true);
        this.isPreview$ = new BehaviorSubject(false);
        this.layersSubcriptions = [];
        this._color = 'primary';
    }
    Object.defineProperty(SearchResultAddButtonComponent.prototype, "color", {
        get: /**
         * @return {?}
         */
        function () {
            return this._color;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._color = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @internal
     */
    /**
     * \@internal
     * @return {?}
     */
    SearchResultAddButtonComponent.prototype.ngOnInit = /**
     * \@internal
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.layer.meta.dataType === 'Layer') {
            this.added =
                this.map.layers.findIndex((/**
                 * @param {?} lay
                 * @return {?}
                 */
                function (lay) { return lay.id === _this.layer.data.sourceOptions.id; })) !== -1;
        }
        this.resolution$$ = this.map.viewController.resolution$.subscribe((/**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            _this.isInResolutionsRange(value);
            _this.tooltip$.next(_this.computeTooltip());
        }));
    };
    /**
     * @return {?}
     */
    SearchResultAddButtonComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.resolution$$.unsubscribe();
    };
    /**
     * On mouse event, mouseenter /mouseleave
     * @internal
     */
    /**
     * On mouse event, mouseenter /mouseleave
     * \@internal
     * @param {?} event
     * @return {?}
     */
    SearchResultAddButtonComponent.prototype.onMouseEvent = /**
     * On mouse event, mouseenter /mouseleave
     * \@internal
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.onToggleClick(event);
    };
    /**
     * On toggle button click, emit the added change event
     * @internal
     */
    /**
     * On toggle button click, emit the added change event
     * \@internal
     * @param {?} event
     * @return {?}
     */
    SearchResultAddButtonComponent.prototype.onToggleClick = /**
     * On toggle button click, emit the added change event
     * \@internal
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var _this = this;
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
                    function () {
                        _this.add();
                        _this.isPreview$.next(true);
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
    };
    /**
     * @private
     * @return {?}
     */
    SearchResultAddButtonComponent.prototype.add = /**
     * @private
     * @return {?}
     */
    function () {
        if (!this.added) {
            this.added = true;
            this.addLayerToMap();
        }
    };
    /**
     * @private
     * @return {?}
     */
    SearchResultAddButtonComponent.prototype.remove = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.added) {
            this.added = false;
            this.removeLayerFromMap();
            this.layersSubcriptions.map((/**
             * @param {?} s
             * @return {?}
             */
            function (s) { return s.unsubscribe(); }));
            this.layersSubcriptions = [];
        }
    };
    /**
     * Emit added change event with added = true
     */
    /**
     * Emit added change event with added = true
     * @private
     * @return {?}
     */
    SearchResultAddButtonComponent.prototype.addLayerToMap = /**
     * Emit added change event with added = true
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.map === undefined) {
            return;
        }
        if (this.layer.meta.dataType !== LAYER) {
            return undefined;
        }
        /** @type {?} */
        var layerOptions = ((/** @type {?} */ (this.layer))).data;
        this.layersSubcriptions.push(this.layerService
            .createAsyncLayer(layerOptions)
            .subscribe((/**
         * @param {?} layer
         * @return {?}
         */
        function (layer) { return _this.map.addLayer(layer); })));
    };
    /**
     * Emit added change event with added = false
     */
    /**
     * Emit added change event with added = false
     * @private
     * @return {?}
     */
    SearchResultAddButtonComponent.prototype.removeLayerFromMap = /**
     * Emit added change event with added = false
     * @private
     * @return {?}
     */
    function () {
        if (this.map === undefined) {
            return;
        }
        if (this.layer.meta.dataType !== LAYER) {
            return undefined;
        }
        /** @type {?} */
        var oLayer = this.map.getLayerById(this.layer.data.sourceOptions.id);
        this.map.removeLayer(oLayer);
    };
    /**
     * @param {?} resolution
     * @return {?}
     */
    SearchResultAddButtonComponent.prototype.isInResolutionsRange = /**
     * @param {?} resolution
     * @return {?}
     */
    function (resolution) {
        /** @type {?} */
        var minResolution = this.layer.data.minResolution;
        /** @type {?} */
        var maxResolution = this.layer.data.maxResolution;
        this.inRange$.next(resolution >= minResolution && resolution <= maxResolution);
    };
    /**
     * @return {?}
     */
    SearchResultAddButtonComponent.prototype.computeTooltip = /**
     * @return {?}
     */
    function () {
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
    };
    SearchResultAddButtonComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-search-add-button',
                    template: "<button\r\n(mouseenter)=\"onMouseEvent($event)\" (mouseleave)=\"onMouseEvent($event)\"\r\n*ngIf=\"layer.meta.dataType === 'Layer'\"\r\nmat-icon-button\r\ntooltip-position=\"below\"\r\nmatTooltipShowDelay=\"500\"\r\n[matTooltip]=\"(tooltip$ | async) | translate\"\r\n[color]=\"(isPreview$ | async) ? '' : added ? 'warn' : ''\"\r\n(click)=\"onToggleClick($event)\">\r\n<mat-icon \r\n  matBadge\r\n  igoMatBadgeIcon=\"eye-off\"\r\n  [matBadgeHidden]=\"(inRange$ | async)\"\r\n  matBadgeColor=\"primary\" \r\n  matBadgeSize=\"small\" \r\n  matBadgePosition=\"after\"\r\n  [svgIcon]=\"(isPreview$ | async) ? 'plus' : added ? 'delete' : 'plus'\">\r\n</mat-icon>\r\n</button>",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [".mat-badge-small .mat-badge-content{color:rgba(0,0,0,.38)}"]
                }] }
    ];
    /** @nocollapse */
    SearchResultAddButtonComponent.ctorParameters = function () { return [
        { type: LayerService }
    ]; };
    SearchResultAddButtonComponent.propDecorators = {
        layer: [{ type: Input }],
        added: [{ type: Input }],
        map: [{ type: Input }],
        color: [{ type: Input }]
    };
    return SearchResultAddButtonComponent;
}());
export { SearchResultAddButtonComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLXJlc3VsdHMtYWRkLWJ1dHRvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvc2VhcmNoL3NlYXJjaC1yZXN1bHRzL3NlYXJjaC1yZXN1bHRzLWFkZC1idXR0b24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCx1QkFBdUIsRUFHeEIsTUFBTSxlQUFlLENBQUM7QUFHdkIsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRTlDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNoRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDdkQsT0FBTyxFQUFnQixlQUFlLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFckQ7SUEwQ0Usd0NBQW9CLFlBQTBCO1FBQTFCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBbkN2QyxhQUFRLEdBQTRCLElBQUksZUFBZSxDQUM1RCxnQ0FBZ0MsQ0FDakMsQ0FBQztRQUlLLGFBQVEsR0FBNkIsSUFBSSxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFL0QsZUFBVSxHQUE2QixJQUFJLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUVqRSx1QkFBa0IsR0FBRyxFQUFFLENBQUM7UUF1QnhCLFdBQU0sR0FBRyxTQUFTLENBQUM7SUFFc0IsQ0FBQztJQVRsRCxzQkFDSSxpREFBSzs7OztRQURUO1lBRUUsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3JCLENBQUM7Ozs7O1FBQ0QsVUFBVSxLQUFhO1lBQ3JCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLENBQUM7OztPQUhBO0lBUUQ7O09BRUc7Ozs7O0lBQ0gsaURBQVE7Ozs7SUFBUjtRQUFBLGlCQVdDO1FBVkMsSUFBSSxJQUFJLENBQUMs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c0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgSW5wdXQsXHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbiAgT25Jbml0LFxyXG4gIE9uRGVzdHJveVxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgU2VhcmNoUmVzdWx0IH0gZnJvbSAnLi4vc2hhcmVkL3NlYXJjaC5pbnRlcmZhY2VzJztcclxuaW1wb3J0IHsgSWdvTWFwIH0gZnJvbSAnLi4vLi4vbWFwL3NoYXJlZC9tYXAnO1xyXG5pbXBvcnQgeyBMYXllck9wdGlvbnMgfSBmcm9tICcuLi8uLi9sYXllci9zaGFyZWQvbGF5ZXJzL2xheWVyLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IExheWVyU2VydmljZSB9IGZyb20gJy4uLy4uL2xheWVyL3NoYXJlZC9sYXllci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTEFZRVIgfSBmcm9tICcuLi8uLi9sYXllci9zaGFyZWQvbGF5ZXIuZW51bXMnO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24sIEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdpZ28tc2VhcmNoLWFkZC1idXR0b24nLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9zZWFyY2gtcmVzdWx0cy1hZGQtYnV0dG9uLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9zZWFyY2gtcmVzdWx0cy1hZGQtYnV0dG9uLmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIFNlYXJjaFJlc3VsdEFkZEJ1dHRvbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuICBwdWJsaWMgdG9vbHRpcCQ6IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+ID0gbmV3IEJlaGF2aW9yU3ViamVjdChcclxuICAgICdpZ28uZ2VvLmNhdGFsb2cubGF5ZXIuYWRkVG9NYXAnXHJcbiAgKTtcclxuXHJcbiAgcHJpdmF0ZSByZXNvbHV0aW9uJCQ6IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgcHVibGljIGluUmFuZ2UkOiBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KHRydWUpO1xyXG5cclxuICBwdWJsaWMgaXNQcmV2aWV3JDogQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IEJlaGF2aW9yU3ViamVjdChmYWxzZSk7XHJcblxyXG4gIHByaXZhdGUgbGF5ZXJzU3ViY3JpcHRpb25zID0gW107XHJcblxyXG4gIHByaXZhdGUgbGFzdFRpbWVvdXRSZXF1ZXN0O1xyXG5cclxuICBASW5wdXQoKSBsYXllcjogU2VhcmNoUmVzdWx0O1xyXG5cclxuICAvKipcclxuICAgKiBXaGV0aGVyIHRoZSBsYXllciBpcyBhbHJlYWR5IGFkZGVkIHRvIHRoZSBtYXBcclxuICAgKi9cclxuICBASW5wdXQoKSBhZGRlZDogYm9vbGVhbjtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIG1hcCB0byBhZGQgdGhlIHNlYXJjaCByZXN1bHQgbGF5ZXIgdG9cclxuICAgKi9cclxuICBASW5wdXQoKSBtYXA6IElnb01hcDtcclxuXHJcbiAgQElucHV0KClcclxuICBnZXQgY29sb3IoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fY29sb3I7XHJcbiAgfVxyXG4gIHNldCBjb2xvcih2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICB0aGlzLl9jb2xvciA9IHZhbHVlO1xyXG4gIH1cclxuICBwcml2YXRlIF9jb2xvciA9ICdwcmltYXJ5JztcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBsYXllclNlcnZpY2U6IExheWVyU2VydmljZSkge31cclxuXHJcbiAgLyoqXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5sYXllci5tZXRhLmRhdGFUeXBlID09PSAnTGF5ZXInKSB7XHJcbiAgICAgIHRoaXMuYWRkZWQgPVxyXG4gICAgICAgIHRoaXMubWFwLmxheWVycy5maW5kSW5kZXgoXHJcbiAgICAgICAgICBsYXkgPT4gbGF5LmlkID09PSB0aGlzLmxheWVyLmRhdGEuc291cmNlT3B0aW9ucy5pZFxyXG4gICAgICAgICkgIT09IC0xO1xyXG4gICAgfVxyXG4gICAgdGhpcy5yZXNvbHV0aW9uJCQgPSB0aGlzLm1hcC52aWV3Q29udHJvbGxlci5yZXNvbHV0aW9uJC5zdWJzY3JpYmUodmFsdWUgPT4ge1xyXG4gICAgICB0aGlzLmlzSW5SZXNvbHV0aW9uc1JhbmdlKHZhbHVlKTtcclxuICAgICAgdGhpcy50b29sdGlwJC5uZXh0KHRoaXMuY29tcHV0ZVRvb2x0aXAoKSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgdGhpcy5yZXNvbHV0aW9uJCQudW5zdWJzY3JpYmUoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE9uIG1vdXNlIGV2ZW50LCBtb3VzZWVudGVyIC9tb3VzZWxlYXZlXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgb25Nb3VzZUV2ZW50KGV2ZW50KSB7XHJcbiAgICB0aGlzLm9uVG9nZ2xlQ2xpY2soZXZlbnQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogT24gdG9nZ2xlIGJ1dHRvbiBjbGljaywgZW1pdCB0aGUgYWRkZWQgY2hhbmdlIGV2ZW50XHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgb25Ub2dnbGVDbGljayhldmVudCkge1xyXG4gICAgaWYgKHR5cGVvZiB0aGlzLmxhc3RUaW1lb3V0UmVxdWVzdCAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMubGFzdFRpbWVvdXRSZXF1ZXN0KTtcclxuICAgIH1cclxuXHJcbiAgICBzd2l0Y2ggKGV2ZW50LnR5cGUpIHtcclxuICAgICAgY2FzZSAnY2xpY2snOlxyXG4gICAgICAgIGlmICghdGhpcy5pc1ByZXZpZXckLnZhbHVlKSB7XHJcbiAgICAgICAgICBpZiAodGhpcy5hZGRlZCkge1xyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZSgpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5hZGQoKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5pc1ByZXZpZXckLm5leHQoZmFsc2UpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdtb3VzZWVudGVyJzpcclxuICAgICAgICBpZiAoIXRoaXMuaXNQcmV2aWV3JC52YWx1ZSAmJiAhdGhpcy5hZGRlZCkge1xyXG4gICAgICAgICAgdGhpcy5sYXN0VGltZW91dFJlcXVlc3QgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5hZGQoKTtcclxuICAgICAgICAgICAgdGhpcy5pc1ByZXZpZXckLm5leHQodHJ1ZSk7XHJcbiAgICAgICAgICB9LCA1MDApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnbW91c2VsZWF2ZSc6XHJcbiAgICAgICAgaWYgKHRoaXMuaXNQcmV2aWV3JC52YWx1ZSkge1xyXG4gICAgICAgICAgdGhpcy5yZW1vdmUoKTtcclxuICAgICAgICAgIHRoaXMuaXNQcmV2aWV3JC5uZXh0KGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGFkZCgpIHtcclxuICAgIGlmICghdGhpcy5hZGRlZCkge1xyXG4gICAgICB0aGlzLmFkZGVkID0gdHJ1ZTtcclxuICAgICAgdGhpcy5hZGRMYXllclRvTWFwKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHJlbW92ZSgpIHtcclxuICAgIGlmICh0aGlzLmFkZGVkKSB7XHJcbiAgICAgIHRoaXMuYWRkZWQgPSBmYWxzZTtcclxuICAgICAgdGhpcy5yZW1vdmVMYXllckZyb21NYXAoKTtcclxuICAgICAgdGhpcy5sYXllcnNTdWJjcmlwdGlvbnMubWFwKHMgPT4gcy51bnN1YnNjcmliZSgpKTtcclxuICAgICAgdGhpcy5sYXllcnNTdWJjcmlwdGlvbnMgPSBbXTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEVtaXQgYWRkZWQgY2hhbmdlIGV2ZW50IHdpdGggYWRkZWQgPSB0cnVlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBhZGRMYXllclRvTWFwKCkge1xyXG4gICAgaWYgKHRoaXMubWFwID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLmxheWVyLm1ldGEuZGF0YVR5cGUgIT09IExBWUVSKSB7XHJcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgbGF5ZXJPcHRpb25zID0gKHRoaXMubGF5ZXIgYXMgU2VhcmNoUmVzdWx0PExheWVyT3B0aW9ucz4pLmRhdGE7XHJcbiAgICB0aGlzLmxheWVyc1N1YmNyaXB0aW9ucy5wdXNoKFxyXG4gICAgICB0aGlzLmxheWVyU2VydmljZVxyXG4gICAgICAgIC5jcmVhdGVBc3luY0xheWVyKGxheWVyT3B0aW9ucylcclxuICAgICAgICAuc3Vic2NyaWJlKGxheWVyID0+IHRoaXMubWFwLmFkZExheWVyKGxheWVyKSlcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBFbWl0IGFkZGVkIGNoYW5nZSBldmVudCB3aXRoIGFkZGVkID0gZmFsc2VcclxuICAgKi9cclxuICBwcml2YXRlIHJlbW92ZUxheWVyRnJvbU1hcCgpIHtcclxuICAgIGlmICh0aGlzLm1hcCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5sYXllci5tZXRhLmRhdGFUeXBlICE9PSBMQVlFUikge1xyXG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG9MYXllciA9IHRoaXMubWFwLmdldExheWVyQnlJZCh0aGlzLmxheWVyLmRhdGEuc291cmNlT3B0aW9ucy5pZCk7XHJcbiAgICB0aGlzLm1hcC5yZW1vdmVMYXllcihvTGF5ZXIpO1xyXG4gIH1cclxuXHJcbiAgaXNJblJlc29sdXRpb25zUmFuZ2UocmVzb2x1dGlvbjogbnVtYmVyKSB7XHJcbiAgICBjb25zdCBtaW5SZXNvbHV0aW9uID0gdGhpcy5sYXllci5kYXRhLm1pblJlc29sdXRpb247XHJcbiAgICBjb25zdCBtYXhSZXNvbHV0aW9uID0gdGhpcy5sYXllci5kYXRhLm1heFJlc29sdXRpb247XHJcbiAgICB0aGlzLmluUmFuZ2UkLm5leHQoXHJcbiAgICAgIHJlc29sdXRpb24gPj0gbWluUmVzb2x1dGlvbiAmJiByZXNvbHV0aW9uIDw9IG1heFJlc29sdXRpb25cclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBjb21wdXRlVG9vbHRpcCgpOiBzdHJpbmcge1xyXG4gICAgaWYgKHRoaXMuYWRkZWQpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuaW5SYW5nZSQudmFsdWVcclxuICAgICAgICA/ICdpZ28uZ2VvLmNhdGFsb2cubGF5ZXIucmVtb3ZlRnJvbU1hcCdcclxuICAgICAgICA6ICdpZ28uZ2VvLmNhdGFsb2cubGF5ZXIucmVtb3ZlRnJvbU1hcE91dFJhbmdlJztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmluUmFuZ2UkLnZhbHVlXHJcbiAgICAgICAgPyAnaWdvLmdlby5jYXRhbG9nLmxheWVyLmFkZFRvTWFwJ1xyXG4gICAgICAgIDogJ2lnby5nZW8uY2F0YWxvZy5sYXllci5hZGRUb01hcE91dFJhbmdlJztcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19
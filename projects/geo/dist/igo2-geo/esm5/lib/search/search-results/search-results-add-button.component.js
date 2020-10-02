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
        if (layerOptions.sourceOptions.optionsFromApi === undefined) {
            layerOptions.sourceOptions.optionsFromApi = true;
        }
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
        var minResolution = this.layer.data.minResolution || 0;
        /** @type {?} */
        var maxResolution = this.layer.data.maxResolution || Infinity;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLXJlc3VsdHMtYWRkLWJ1dHRvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvc2VhcmNoL3NlYXJjaC1yZXN1bHRzL3NlYXJjaC1yZXN1bHRzLWFkZC1idXR0b24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCx1QkFBdUIsRUFHeEIsTUFBTSxlQUFlLENBQUM7QUFHdkIsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRTlDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNoRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDdkQsT0FBTyxFQUFnQixlQUFlLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFckQ7SUEwQ0Usd0NBQW9CLFlBQTBCO1FBQTFCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBbkN2QyxhQUFRLEdBQTRCLElBQUksZUFBZSxDQUM1RCxnQ0FBZ0MsQ0FDakMsQ0FBQztRQUlLLGFBQVEsR0FBNkIsSUFBSSxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFL0QsZUFBVSxHQUE2QixJQUFJLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUVqRSx1QkFBa0IsR0FBRyxFQUFFLENBQUM7UUF1QnhCLFdBQU0sR0FBRyxTQUFTLENBQUM7SUFFc0IsQ0FBQztJQVRsRCxzQkFDSSxpREFBSzs7OztRQURUO1lBRUUsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3JCLENBQUM7Ozs7O1FBQ0QsVUFBVSxLQUFhO1lBQ3JCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLENBQUM7OztPQUhBO0lBUUQ7O09BRUc7Ozs7O0lBQ0gsaURBQVE7Ozs7SUFBUjtRQUFBLGlCQVdDO1FBVkMsSUFBSSxJQUFJLENBQUMs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Ozs7OztJQUV6RSw0REFBZ0M7Ozs7O0lBRWhDLDREQUEyQjs7SUFFM0IsK0NBQTZCOzs7OztJQUs3QiwrQ0FBd0I7Ozs7O0lBS3hCLDZDQUFxQjs7Ozs7SUFTckIsZ0RBQTJCOzs7OztJQUVmLHNEQUFrQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIElucHV0LFxyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gIE9uSW5pdCxcclxuICBPbkRlc3Ryb3lcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IFNlYXJjaFJlc3VsdCB9IGZyb20gJy4uL3NoYXJlZC9zZWFyY2guaW50ZXJmYWNlcyc7XHJcbmltcG9ydCB7IElnb01hcCB9IGZyb20gJy4uLy4uL21hcC9zaGFyZWQvbWFwJztcclxuaW1wb3J0IHsgTGF5ZXJPcHRpb25zIH0gZnJvbSAnLi4vLi4vbGF5ZXIvc2hhcmVkL2xheWVycy9sYXllci5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBMYXllclNlcnZpY2UgfSBmcm9tICcuLi8uLi9sYXllci9zaGFyZWQvbGF5ZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IExBWUVSIH0gZnJvbSAnLi4vLi4vbGF5ZXIvc2hhcmVkL2xheWVyLmVudW1zJztcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uLCBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaWdvLXNlYXJjaC1hZGQtYnV0dG9uJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vc2VhcmNoLXJlc3VsdHMtYWRkLWJ1dHRvbi5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vc2VhcmNoLXJlc3VsdHMtYWRkLWJ1dHRvbi5jb21wb25lbnQuc2NzcyddLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTZWFyY2hSZXN1bHRBZGRCdXR0b25Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcbiAgcHVibGljIHRvb2x0aXAkOiBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPiA9IG5ldyBCZWhhdmlvclN1YmplY3QoXHJcbiAgICAnaWdvLmdlby5jYXRhbG9nLmxheWVyLmFkZFRvTWFwJ1xyXG4gICk7XHJcblxyXG4gIHByaXZhdGUgcmVzb2x1dGlvbiQkOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIHB1YmxpYyBpblJhbmdlJDogQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IEJlaGF2aW9yU3ViamVjdCh0cnVlKTtcclxuXHJcbiAgcHVibGljIGlzUHJldmlldyQ6IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPiA9IG5ldyBCZWhhdmlvclN1YmplY3QoZmFsc2UpO1xyXG5cclxuICBwcml2YXRlIGxheWVyc1N1YmNyaXB0aW9ucyA9IFtdO1xyXG5cclxuICBwcml2YXRlIGxhc3RUaW1lb3V0UmVxdWVzdDtcclxuXHJcbiAgQElucHV0KCkgbGF5ZXI6IFNlYXJjaFJlc3VsdDtcclxuXHJcbiAgLyoqXHJcbiAgICogV2hldGhlciB0aGUgbGF5ZXIgaXMgYWxyZWFkeSBhZGRlZCB0byB0aGUgbWFwXHJcbiAgICovXHJcbiAgQElucHV0KCkgYWRkZWQ6IGJvb2xlYW47XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBtYXAgdG8gYWRkIHRoZSBzZWFyY2ggcmVzdWx0IGxheWVyIHRvXHJcbiAgICovXHJcbiAgQElucHV0KCkgbWFwOiBJZ29NYXA7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IGNvbG9yKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2NvbG9yO1xyXG4gIH1cclxuICBzZXQgY29sb3IodmFsdWU6IHN0cmluZykge1xyXG4gICAgdGhpcy5fY29sb3IgPSB2YWx1ZTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfY29sb3IgPSAncHJpbWFyeSc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbGF5ZXJTZXJ2aWNlOiBMYXllclNlcnZpY2UpIHt9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMubGF5ZXIubWV0YS5kYXRhVHlwZSA9PT0gJ0xheWVyJykge1xyXG4gICAgICB0aGlzLmFkZGVkID1cclxuICAgICAgICB0aGlzLm1hcC5sYXllcnMuZmluZEluZGV4KFxyXG4gICAgICAgICAgbGF5ID0+IGxheS5pZCA9PT0gdGhpcy5sYXllci5kYXRhLnNvdXJjZU9wdGlvbnMuaWRcclxuICAgICAgICApICE9PSAtMTtcclxuICAgIH1cclxuICAgIHRoaXMucmVzb2x1dGlvbiQkID0gdGhpcy5tYXAudmlld0NvbnRyb2xsZXIucmVzb2x1dGlvbiQuc3Vic2NyaWJlKHZhbHVlID0+IHtcclxuICAgICAgdGhpcy5pc0luUmVzb2x1dGlvbnNSYW5nZSh2YWx1ZSk7XHJcbiAgICAgIHRoaXMudG9vbHRpcCQubmV4dCh0aGlzLmNvbXB1dGVUb29sdGlwKCkpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMucmVzb2x1dGlvbiQkLnVuc3Vic2NyaWJlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBPbiBtb3VzZSBldmVudCwgbW91c2VlbnRlciAvbW91c2VsZWF2ZVxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIG9uTW91c2VFdmVudChldmVudCkge1xyXG4gICAgdGhpcy5vblRvZ2dsZUNsaWNrKGV2ZW50KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE9uIHRvZ2dsZSBidXR0b24gY2xpY2ssIGVtaXQgdGhlIGFkZGVkIGNoYW5nZSBldmVudFxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIG9uVG9nZ2xlQ2xpY2soZXZlbnQpIHtcclxuICAgIGlmICh0eXBlb2YgdGhpcy5sYXN0VGltZW91dFJlcXVlc3QgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLmxhc3RUaW1lb3V0UmVxdWVzdCk7XHJcbiAgICB9XHJcblxyXG4gICAgc3dpdGNoIChldmVudC50eXBlKSB7XHJcbiAgICAgIGNhc2UgJ2NsaWNrJzpcclxuICAgICAgICBpZiAoIXRoaXMuaXNQcmV2aWV3JC52YWx1ZSkge1xyXG4gICAgICAgICAgaWYgKHRoaXMuYWRkZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5yZW1vdmUoKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkKCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuaXNQcmV2aWV3JC5uZXh0KGZhbHNlKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnbW91c2VlbnRlcic6XHJcbiAgICAgICAgaWYgKCF0aGlzLmlzUHJldmlldyQudmFsdWUgJiYgIXRoaXMuYWRkZWQpIHtcclxuICAgICAgICAgIHRoaXMubGFzdFRpbWVvdXRSZXF1ZXN0ID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkKCk7XHJcbiAgICAgICAgICAgIHRoaXMuaXNQcmV2aWV3JC5uZXh0KHRydWUpO1xyXG4gICAgICAgICAgfSwgNTAwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ21vdXNlbGVhdmUnOlxyXG4gICAgICAgIGlmICh0aGlzLmlzUHJldmlldyQudmFsdWUpIHtcclxuICAgICAgICAgIHRoaXMucmVtb3ZlKCk7XHJcbiAgICAgICAgICB0aGlzLmlzUHJldmlldyQubmV4dChmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhZGQoKSB7XHJcbiAgICBpZiAoIXRoaXMuYWRkZWQpIHtcclxuICAgICAgdGhpcy5hZGRlZCA9IHRydWU7XHJcbiAgICAgIHRoaXMuYWRkTGF5ZXJUb01hcCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSByZW1vdmUoKSB7XHJcbiAgICBpZiAodGhpcy5hZGRlZCkge1xyXG4gICAgICB0aGlzLmFkZGVkID0gZmFsc2U7XHJcbiAgICAgIHRoaXMucmVtb3ZlTGF5ZXJGcm9tTWFwKCk7XHJcbiAgICAgIHRoaXMubGF5ZXJzU3ViY3JpcHRpb25zLm1hcChzID0+IHMudW5zdWJzY3JpYmUoKSk7XHJcbiAgICAgIHRoaXMubGF5ZXJzU3ViY3JpcHRpb25zID0gW107XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBFbWl0IGFkZGVkIGNoYW5nZSBldmVudCB3aXRoIGFkZGVkID0gdHJ1ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgYWRkTGF5ZXJUb01hcCgpIHtcclxuICAgIGlmICh0aGlzLm1hcCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5sYXllci5tZXRhLmRhdGFUeXBlICE9PSBMQVlFUikge1xyXG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGxheWVyT3B0aW9ucyA9ICh0aGlzLmxheWVyIGFzIFNlYXJjaFJlc3VsdDxMYXllck9wdGlvbnM+KS5kYXRhO1xyXG4gICAgaWYgKGxheWVyT3B0aW9ucy5zb3VyY2VPcHRpb25zLm9wdGlvbnNGcm9tQXBpID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgbGF5ZXJPcHRpb25zLnNvdXJjZU9wdGlvbnMub3B0aW9uc0Zyb21BcGkgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgdGhpcy5sYXllcnNTdWJjcmlwdGlvbnMucHVzaChcclxuICAgICAgdGhpcy5sYXllclNlcnZpY2VcclxuICAgICAgICAuY3JlYXRlQXN5bmNMYXllcihsYXllck9wdGlvbnMpXHJcbiAgICAgICAgLnN1YnNjcmliZShsYXllciA9PiB0aGlzLm1hcC5hZGRMYXllcihsYXllcikpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRW1pdCBhZGRlZCBjaGFuZ2UgZXZlbnQgd2l0aCBhZGRlZCA9IGZhbHNlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSByZW1vdmVMYXllckZyb21NYXAoKSB7XHJcbiAgICBpZiAodGhpcy5tYXAgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMubGF5ZXIubWV0YS5kYXRhVHlwZSAhPT0gTEFZRVIpIHtcclxuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBvTGF5ZXIgPSB0aGlzLm1hcC5nZXRMYXllckJ5SWQodGhpcy5sYXllci5kYXRhLnNvdXJjZU9wdGlvbnMuaWQpO1xyXG4gICAgdGhpcy5tYXAucmVtb3ZlTGF5ZXIob0xheWVyKTtcclxuICB9XHJcblxyXG4gIGlzSW5SZXNvbHV0aW9uc1JhbmdlKHJlc29sdXRpb246IG51bWJlcikge1xyXG4gICAgY29uc3QgbWluUmVzb2x1dGlvbiA9IHRoaXMubGF5ZXIuZGF0YS5taW5SZXNvbHV0aW9uIHx8IDA7XHJcbiAgICBjb25zdCBtYXhSZXNvbHV0aW9uID0gdGhpcy5sYXllci5kYXRhLm1heFJlc29sdXRpb24gfHwgSW5maW5pdHk7XHJcbiAgICB0aGlzLmluUmFuZ2UkLm5leHQoXHJcbiAgICAgIHJlc29sdXRpb24gPj0gbWluUmVzb2x1dGlvbiAmJiByZXNvbHV0aW9uIDw9IG1heFJlc29sdXRpb25cclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBjb21wdXRlVG9vbHRpcCgpOiBzdHJpbmcge1xyXG4gICAgaWYgKHRoaXMuYWRkZWQpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuaW5SYW5nZSQudmFsdWVcclxuICAgICAgICA/ICdpZ28uZ2VvLmNhdGFsb2cubGF5ZXIucmVtb3ZlRnJvbU1hcCdcclxuICAgICAgICA6ICdpZ28uZ2VvLmNhdGFsb2cubGF5ZXIucmVtb3ZlRnJvbU1hcE91dFJhbmdlJztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmluUmFuZ2UkLnZhbHVlXHJcbiAgICAgICAgPyAnaWdvLmdlby5jYXRhbG9nLmxheWVyLmFkZFRvTWFwJ1xyXG4gICAgICAgIDogJ2lnby5nZW8uY2F0YWxvZy5sYXllci5hZGRUb01hcE91dFJhbmdlJztcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19
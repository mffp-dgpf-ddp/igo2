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
        const minResolution = this.layer.data.minResolution;
        /** @type {?} */
        const maxResolution = this.layer.data.maxResolution;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLXJlc3VsdHMtYWRkLWJ1dHRvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvc2VhcmNoL3NlYXJjaC1yZXN1bHRzL3NlYXJjaC1yZXN1bHRzLWFkZC1idXR0b24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCx1QkFBdUIsRUFHeEIsTUFBTSxlQUFlLENBQUM7QUFHdkIsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRTlDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNoRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDdkQsT0FBTyxFQUFnQixlQUFlLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFRckQsTUFBTSxPQUFPLDhCQUE4Qjs7OztJQW9DekMsWUFBb0IsWUFBMEI7UUFBMUIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFuQ3ZDLGFBQVEsR0FBNEIsSUFBSSxlQUFlLENBQzVELGdDQUFnQyxDQUNqQyxDQUFDO1FBSUssYUFBUSxHQUE2QixJQUFJLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUUvRCxlQUFVLEdBQTZCLElBQUksZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRWpFLHVCQUFrQixHQUFHLEVBQUUsQ0FBQztRQXVCeEIsV0FBTSxHQUFHLFNBQVMsQ0FBQztJQUVzQixDQUFDOzs7O0lBVGxELElBQ0ksS0FBSztRQUNQLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUNyQixDQUFDOzs7OztJQUNELElBQUksS0FBSyxDQUFDLEtBQWE7UUFDckIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7SUFDdEIsQ0FBQzs7Ozs7SUFRRCxRQUFRO1FBQ04sSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUks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QUFDLFFBQVEsQ0FBQyxJQUFJLENBQ2hCLFVBQVUsSUFBSSxhQUFhLElBQUksVUFBVSxJQUFJLGFBQWEsQ0FDM0QsQ0FBQztJQUNKLENBQUM7Ozs7SUFFRCxjQUFjO1FBQ1osSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ2QsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUs7Z0JBQ3hCLENBQUMsQ0FBQyxxQ0FBcUM7Z0JBQ3ZDLENBQUMsQ0FBQyw2Q0FBNkMsQ0FBQztTQUNuRDthQUFNO1lBQ0wsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUs7Z0JBQ3hCLENBQUMsQ0FBQyxnQ0FBZ0M7Z0JBQ2xDLENBQUMsQ0FBQyx3Q0FBd0MsQ0FBQztTQUM5QztJQUNILENBQUM7OztZQXJMRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHVCQUF1QjtnQkFDakMsd3FCQUF5RDtnQkFFekQsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2hEOzs7O1lBVFEsWUFBWTs7O29CQXlCbEIsS0FBSztvQkFLTCxLQUFLO2tCQUtMLEtBQUs7b0JBRUwsS0FBSzs7OztJQTFCTixrREFFRTs7Ozs7SUFFRixzREFBbUM7O0lBRW5DLGtEQUFzRTs7SUFFdEUsb0RBQXlFOzs7OztJQUV6RSw0REFBZ0M7Ozs7O0lBRWhDLDREQUEyQjs7SUFFM0IsK0NBQTZCOzs7OztJQUs3QiwrQ0FBd0I7Ozs7O0lBS3hCLDZDQUFxQjs7Ozs7SUFTckIsZ0RBQTJCOzs7OztJQUVmLHNEQUFrQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIElucHV0LFxyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gIE9uSW5pdCxcclxuICBPbkRlc3Ryb3lcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IFNlYXJjaFJlc3VsdCB9IGZyb20gJy4uL3NoYXJlZC9zZWFyY2guaW50ZXJmYWNlcyc7XHJcbmltcG9ydCB7IElnb01hcCB9IGZyb20gJy4uLy4uL21hcC9zaGFyZWQvbWFwJztcclxuaW1wb3J0IHsgTGF5ZXJPcHRpb25zIH0gZnJvbSAnLi4vLi4vbGF5ZXIvc2hhcmVkL2xheWVycy9sYXllci5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBMYXllclNlcnZpY2UgfSBmcm9tICcuLi8uLi9sYXllci9zaGFyZWQvbGF5ZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IExBWUVSIH0gZnJvbSAnLi4vLi4vbGF5ZXIvc2hhcmVkL2xheWVyLmVudW1zJztcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uLCBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaWdvLXNlYXJjaC1hZGQtYnV0dG9uJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vc2VhcmNoLXJlc3VsdHMtYWRkLWJ1dHRvbi5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vc2VhcmNoLXJlc3VsdHMtYWRkLWJ1dHRvbi5jb21wb25lbnQuc2NzcyddLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTZWFyY2hSZXN1bHRBZGRCdXR0b25Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcbiAgcHVibGljIHRvb2x0aXAkOiBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPiA9IG5ldyBCZWhhdmlvclN1YmplY3QoXHJcbiAgICAnaWdvLmdlby5jYXRhbG9nLmxheWVyLmFkZFRvTWFwJ1xyXG4gICk7XHJcblxyXG4gIHByaXZhdGUgcmVzb2x1dGlvbiQkOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIHB1YmxpYyBpblJhbmdlJDogQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IEJlaGF2aW9yU3ViamVjdCh0cnVlKTtcclxuXHJcbiAgcHVibGljIGlzUHJldmlldyQ6IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPiA9IG5ldyBCZWhhdmlvclN1YmplY3QoZmFsc2UpO1xyXG5cclxuICBwcml2YXRlIGxheWVyc1N1YmNyaXB0aW9ucyA9IFtdO1xyXG5cclxuICBwcml2YXRlIGxhc3RUaW1lb3V0UmVxdWVzdDtcclxuXHJcbiAgQElucHV0KCkgbGF5ZXI6IFNlYXJjaFJlc3VsdDtcclxuXHJcbiAgLyoqXHJcbiAgICogV2hldGhlciB0aGUgbGF5ZXIgaXMgYWxyZWFkeSBhZGRlZCB0byB0aGUgbWFwXHJcbiAgICovXHJcbiAgQElucHV0KCkgYWRkZWQ6IGJvb2xlYW47XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBtYXAgdG8gYWRkIHRoZSBzZWFyY2ggcmVzdWx0IGxheWVyIHRvXHJcbiAgICovXHJcbiAgQElucHV0KCkgbWFwOiBJZ29NYXA7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IGNvbG9yKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2NvbG9yO1xyXG4gIH1cclxuICBzZXQgY29sb3IodmFsdWU6IHN0cmluZykge1xyXG4gICAgdGhpcy5fY29sb3IgPSB2YWx1ZTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfY29sb3IgPSAncHJpbWFyeSc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbGF5ZXJTZXJ2aWNlOiBMYXllclNlcnZpY2UpIHt9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMubGF5ZXIubWV0YS5kYXRhVHlwZSA9PT0gJ0xheWVyJykge1xyXG4gICAgICB0aGlzLmFkZGVkID1cclxuICAgICAgICB0aGlzLm1hcC5sYXllcnMuZmluZEluZGV4KFxyXG4gICAgICAgICAgbGF5ID0+IGxheS5pZCA9PT0gdGhpcy5sYXllci5kYXRhLnNvdXJjZU9wdGlvbnMuaWRcclxuICAgICAgICApICE9PSAtMTtcclxuICAgIH1cclxuICAgIHRoaXMucmVzb2x1dGlvbiQkID0gdGhpcy5tYXAudmlld0NvbnRyb2xsZXIucmVzb2x1dGlvbiQuc3Vic2NyaWJlKHZhbHVlID0+IHtcclxuICAgICAgdGhpcy5pc0luUmVzb2x1dGlvbnNSYW5nZSh2YWx1ZSk7XHJcbiAgICAgIHRoaXMudG9vbHRpcCQubmV4dCh0aGlzLmNvbXB1dGVUb29sdGlwKCkpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMucmVzb2x1dGlvbiQkLnVuc3Vic2NyaWJlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBPbiBtb3VzZSBldmVudCwgbW91c2VlbnRlciAvbW91c2VsZWF2ZVxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIG9uTW91c2VFdmVudChldmVudCkge1xyXG4gICAgdGhpcy5vblRvZ2dsZUNsaWNrKGV2ZW50KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE9uIHRvZ2dsZSBidXR0b24gY2xpY2ssIGVtaXQgdGhlIGFkZGVkIGNoYW5nZSBldmVudFxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIG9uVG9nZ2xlQ2xpY2soZXZlbnQpIHtcclxuICAgIGlmICh0eXBlb2YgdGhpcy5sYXN0VGltZW91dFJlcXVlc3QgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLmxhc3RUaW1lb3V0UmVxdWVzdCk7XHJcbiAgICB9XHJcblxyXG4gICAgc3dpdGNoIChldmVudC50eXBlKSB7XHJcbiAgICAgIGNhc2UgJ2NsaWNrJzpcclxuICAgICAgICBpZiAoIXRoaXMuaXNQcmV2aWV3JC52YWx1ZSkge1xyXG4gICAgICAgICAgaWYgKHRoaXMuYWRkZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5yZW1vdmUoKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkKCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuaXNQcmV2aWV3JC5uZXh0KGZhbHNlKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnbW91c2VlbnRlcic6XHJcbiAgICAgICAgaWYgKCF0aGlzLmlzUHJldmlldyQudmFsdWUgJiYgIXRoaXMuYWRkZWQpIHtcclxuICAgICAgICAgIHRoaXMubGFzdFRpbWVvdXRSZXF1ZXN0ID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkKCk7XHJcbiAgICAgICAgICAgIHRoaXMuaXNQcmV2aWV3JC5uZXh0KHRydWUpO1xyXG4gICAgICAgICAgfSwgNTAwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ21vdXNlbGVhdmUnOlxyXG4gICAgICAgIGlmICh0aGlzLmlzUHJldmlldyQudmFsdWUpIHtcclxuICAgICAgICAgIHRoaXMucmVtb3ZlKCk7XHJcbiAgICAgICAgICB0aGlzLmlzUHJldmlldyQubmV4dChmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhZGQoKSB7XHJcbiAgICBpZiAoIXRoaXMuYWRkZWQpIHtcclxuICAgICAgdGhpcy5hZGRlZCA9IHRydWU7XHJcbiAgICAgIHRoaXMuYWRkTGF5ZXJUb01hcCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSByZW1vdmUoKSB7XHJcbiAgICBpZiAodGhpcy5hZGRlZCkge1xyXG4gICAgICB0aGlzLmFkZGVkID0gZmFsc2U7XHJcbiAgICAgIHRoaXMucmVtb3ZlTGF5ZXJGcm9tTWFwKCk7XHJcbiAgICAgIHRoaXMubGF5ZXJzU3ViY3JpcHRpb25zLm1hcChzID0+IHMudW5zdWJzY3JpYmUoKSk7XHJcbiAgICAgIHRoaXMubGF5ZXJzU3ViY3JpcHRpb25zID0gW107XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBFbWl0IGFkZGVkIGNoYW5nZSBldmVudCB3aXRoIGFkZGVkID0gdHJ1ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgYWRkTGF5ZXJUb01hcCgpIHtcclxuICAgIGlmICh0aGlzLm1hcCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5sYXllci5tZXRhLmRhdGFUeXBlICE9PSBMQVlFUikge1xyXG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGxheWVyT3B0aW9ucyA9ICh0aGlzLmxheWVyIGFzIFNlYXJjaFJlc3VsdDxMYXllck9wdGlvbnM+KS5kYXRhO1xyXG4gICAgdGhpcy5sYXllcnNTdWJjcmlwdGlvbnMucHVzaChcclxuICAgICAgdGhpcy5sYXllclNlcnZpY2VcclxuICAgICAgICAuY3JlYXRlQXN5bmNMYXllcihsYXllck9wdGlvbnMpXHJcbiAgICAgICAgLnN1YnNjcmliZShsYXllciA9PiB0aGlzLm1hcC5hZGRMYXllcihsYXllcikpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRW1pdCBhZGRlZCBjaGFuZ2UgZXZlbnQgd2l0aCBhZGRlZCA9IGZhbHNlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSByZW1vdmVMYXllckZyb21NYXAoKSB7XHJcbiAgICBpZiAodGhpcy5tYXAgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMubGF5ZXIubWV0YS5kYXRhVHlwZSAhPT0gTEFZRVIpIHtcclxuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBvTGF5ZXIgPSB0aGlzLm1hcC5nZXRMYXllckJ5SWQodGhpcy5sYXllci5kYXRhLnNvdXJjZU9wdGlvbnMuaWQpO1xyXG4gICAgdGhpcy5tYXAucmVtb3ZlTGF5ZXIob0xheWVyKTtcclxuICB9XHJcblxyXG4gIGlzSW5SZXNvbHV0aW9uc1JhbmdlKHJlc29sdXRpb246IG51bWJlcikge1xyXG4gICAgY29uc3QgbWluUmVzb2x1dGlvbiA9IHRoaXMubGF5ZXIuZGF0YS5taW5SZXNvbHV0aW9uO1xyXG4gICAgY29uc3QgbWF4UmVzb2x1dGlvbiA9IHRoaXMubGF5ZXIuZGF0YS5tYXhSZXNvbHV0aW9uO1xyXG4gICAgdGhpcy5pblJhbmdlJC5uZXh0KFxyXG4gICAgICByZXNvbHV0aW9uID49IG1pblJlc29sdXRpb24gJiYgcmVzb2x1dGlvbiA8PSBtYXhSZXNvbHV0aW9uXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgY29tcHV0ZVRvb2x0aXAoKTogc3RyaW5nIHtcclxuICAgIGlmICh0aGlzLmFkZGVkKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmluUmFuZ2UkLnZhbHVlXHJcbiAgICAgICAgPyAnaWdvLmdlby5jYXRhbG9nLmxheWVyLnJlbW92ZUZyb21NYXAnXHJcbiAgICAgICAgOiAnaWdvLmdlby5jYXRhbG9nLmxheWVyLnJlbW92ZUZyb21NYXBPdXRSYW5nZSc7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gdGhpcy5pblJhbmdlJC52YWx1ZVxyXG4gICAgICAgID8gJ2lnby5nZW8uY2F0YWxvZy5sYXllci5hZGRUb01hcCdcclxuICAgICAgICA6ICdpZ28uZ2VvLmNhdGFsb2cubGF5ZXIuYWRkVG9NYXBPdXRSYW5nZSc7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==
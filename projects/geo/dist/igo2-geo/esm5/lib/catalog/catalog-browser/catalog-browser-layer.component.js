/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { getEntityTitle, getEntityIcon } from '@igo2/common';
import { BehaviorSubject } from 'rxjs';
import { LayerService } from '../../layer/shared/layer.service';
import { first } from 'rxjs/operators';
/**
 * Catalog browser layer item
 */
var CatalogBrowserLayerComponent = /** @class */ (function () {
    function CatalogBrowserLayerComponent(layerService) {
        this.layerService = layerService;
        this.inRange$ = new BehaviorSubject(true);
        this.isPreview$ = new BehaviorSubject(false);
        this.layerLegendShown$ = new BehaviorSubject(false);
        this.igoLayer$ = new BehaviorSubject(undefined);
        this.catalogAllowLegend = false;
        /**
         * Whether the layer is already added to the map
         */
        this.added = false;
        /**
         * Event emitted when the add/remove button is clicked
         */
        this.addedChange = new EventEmitter();
        this.addedLayerIsPreview = new EventEmitter();
    }
    Object.defineProperty(CatalogBrowserLayerComponent.prototype, "title", {
        /**
         * @internal
         */
        get: /**
         * \@internal
         * @return {?}
         */
        function () {
            return getEntityTitle(this.layer);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CatalogBrowserLayerComponent.prototype, "icon", {
        /**
         * @internal
         */
        get: /**
         * \@internal
         * @return {?}
         */
        function () {
            return getEntityIcon(this.layer) || 'layers';
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    CatalogBrowserLayerComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.isInResolutionsRange();
        this.isPreview$.subscribe((/**
         * @param {?} value
         * @return {?}
         */
        function (value) { return _this.addedLayerIsPreview.emit(value); }));
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
    CatalogBrowserLayerComponent.prototype.onMouseEvent = /**
     * On mouse event, mouseenter /mouseleave
     * \@internal
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.onToggleClick(event);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    CatalogBrowserLayerComponent.prototype.askForLegend = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var _this = this;
        this.layerLegendShown$.next(!this.layerLegendShown$.value);
        this.layerService.createAsyncLayer(this.layer.options).pipe(first())
            .subscribe((/**
         * @param {?} layer
         * @return {?}
         */
        function (layer) { return _this.igoLayer$.next(layer); }));
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
    CatalogBrowserLayerComponent.prototype.onToggleClick = /**
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
     * Emit added change event with added = true
     */
    /**
     * Emit added change event with added = true
     * @private
     * @return {?}
     */
    CatalogBrowserLayerComponent.prototype.add = /**
     * Emit added change event with added = true
     * @private
     * @return {?}
     */
    function () {
        if (!this.added) {
            this.added = true;
            this.addedChange.emit({ added: true, layer: this.layer });
        }
    };
    /**
     * Emit added change event with added = false
     */
    /**
     * Emit added change event with added = false
     * @private
     * @return {?}
     */
    CatalogBrowserLayerComponent.prototype.remove = /**
     * Emit added change event with added = false
     * @private
     * @return {?}
     */
    function () {
        if (this.added) {
            this.added = false;
            this.addedChange.emit({ added: false, layer: this.layer });
        }
    };
    /**
     * @return {?}
     */
    CatalogBrowserLayerComponent.prototype.haveGroup = /**
     * @return {?}
     */
    function () {
        return !(!this.layer.address || this.layer.address.split('.').length === 1);
    };
    /**
     * @return {?}
     */
    CatalogBrowserLayerComponent.prototype.isInResolutionsRange = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var minResolution = this.layer.options.minResolution || 0;
        /** @type {?} */
        var maxResolution = this.layer.options.maxResolution || Infinity;
        this.inRange$.next(this.resolution >= minResolution && this.resolution <= maxResolution);
        return this.inRange$.value;
    };
    /**
     * @return {?}
     */
    CatalogBrowserLayerComponent.prototype.computeTooltip = /**
     * @return {?}
     */
    function () {
        if (this.added) {
            return this.isPreview$.value
                ? 'igo.geo.catalog.layer.addToMap'
                : this.inRange$.value
                    ? 'igo.geo.catalog.layer.removeFromMap'
                    : 'igo.geo.catalog.layer.removeFromMapOutRange';
        }
        else {
            return this.inRange$.value
                ? 'igo.geo.catalog.layer.addToMap'
                : 'igo.geo.catalog.layer.addToMapOutRange';
        }
    };
    CatalogBrowserLayerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-catalog-browser-layer',
                    template: "<mat-list-item>\r\n  <mat-icon *ngIf=\"haveGroup()\" mat-list-avatar svgIcon=\"blank\"></mat-icon>\r\n  <h4 mat-line matTooltipShowDelay=\"500\" [ngClass]=\"(catalogAllowLegend)?'igo-cataloglayer-title':''\" (click)=\"askForLegend($event)\" [matTooltip]=\"title\">{{title}}</h4>\r\n\r\n  <igo-metadata-button [layer]=\"layer\"></igo-metadata-button>\r\n\r\n  <button\r\n    (mouseenter)=\"onMouseEvent($event)\" (mouseleave)=\"onMouseEvent($event)\"\r\n    mat-icon-button\r\n    tooltip-position=\"below\"\r\n    matTooltipShowDelay=\"500\"\r\n    [matTooltip]=\"computeTooltip() | translate\"\r\n    [color]=\"(isPreview$ | async) ? '' : added ? 'warn' : ''\"\r\n    (click)=\"onToggleClick($event)\">\r\n    <mat-icon\r\n       matBadge\r\n       igoMatBadgeIcon=\"eye-off\"\r\n       [matBadgeHidden]=\"isInResolutionsRange()\"\r\n       matBadgeColor=\"accent\"\r\n       matBadgeSize=\"small\"\r\n       matBadgePosition=\"after\"\r\n       [svgIcon]=\"(isPreview$ | async) ? 'plus' : added ? 'delete' : 'plus'\">\r\n    </mat-icon>\r\n  </button>\r\n\r\n</mat-list-item>\r\n\r\n<div #legend class=\"igo-cataloglayer-legend-container\">\r\n  <igo-layer-legend\r\n    *ngIf=\"(layerLegendShown$ | async) && (igoLayer$ | async) && catalogAllowLegend\"\r\n    [layer]=\"igoLayer$ | async\">\r\n  </igo-layer-legend>\r\n</div>\r\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [".mat-badge-small .mat-badge-content{color:rgba(0,0,0,.38)}.igo-cataloglayer-title{cursor:pointer}.igo-cataloglayer-legend-container{padding-left:18px;width:calc(100% - 18px);margin-left:40px}"]
                }] }
    ];
    /** @nocollapse */
    CatalogBrowserLayerComponent.ctorParameters = function () { return [
        { type: LayerService }
    ]; };
    CatalogBrowserLayerComponent.propDecorators = {
        resolution: [{ type: Input }],
        catalogAllowLegend: [{ type: Input }],
        layer: [{ type: Input }],
        added: [{ type: Input }],
        addedChange: [{ type: Output }],
        addedLayerIsPreview: [{ type: Output }]
    };
    return CatalogBrowserLayerComponent;
}());
export { CatalogBrowserLayerComponent };
if (false) {
    /** @type {?} */
    CatalogBrowserLayerComponent.prototype.inRange$;
    /** @type {?} */
    CatalogBrowserLayerComponent.prototype.isPreview$;
    /**
     * @type {?}
     * @private
     */
    CatalogBrowserLayerComponent.prototype.lastTimeoutRequest;
    /** @type {?} */
    CatalogBrowserLayerComponent.prototype.layerLegendShown$;
    /** @type {?} */
    CatalogBrowserLayerComponent.prototype.igoLayer$;
    /** @type {?} */
    CatalogBrowserLayerComponent.prototype.resolution;
    /** @type {?} */
    CatalogBrowserLayerComponent.prototype.catalogAllowLegend;
    /**
     * Catalog layer
     * @type {?}
     */
    CatalogBrowserLayerComponent.prototype.layer;
    /**
     * Whether the layer is already added to the map
     * @type {?}
     */
    CatalogBrowserLayerComponent.prototype.added;
    /**
     * Event emitted when the add/remove button is clicked
     * @type {?}
     */
    CatalogBrowserLayerComponent.prototype.addedChange;
    /** @type {?} */
    CatalogBrowserLayerComponent.prototype.addedLayerIsPreview;
    /**
     * @type {?}
     * @private
     */
    CatalogBrowserLayerComponent.prototype.layerService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0YWxvZy1icm93c2VyLWxheWVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9jYXRhbG9nL2NhdGFsb2ctYnJvd3Nlci9jYXRhbG9nLWJyb3dzZXItbGF5ZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCx1QkFBdUIsRUFDdkIsTUFBTSxFQUNOLFlBQVksRUFFYixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsY0FBYyxFQUFFLGFBQWEsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUc3RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3ZDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNoRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7QUFNdkM7SUFxREUsc0NBQW9CLFlBQTBCO1FBQTFCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBOUN2QyxhQUFRLEdBQTZCLElBQUksZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQy9ELGVBQVUsR0FBNkIsSUFBSSxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7UUFJbEUsc0JBQWlCLEdBQTZCLElBQUksZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3pFLGNBQVMsR0FBRyxJQUFJLGVBQWUsQ0FBUSxTQUFTLENBQUMsQ0FBQztRQUloRCx1QkFBa0IsR0FBRyxLQUFLLENBQUM7Ozs7UUFVM0IsVUFBSyxHQUFHLEtBQUssQ0FBQzs7OztRQUtiLGdCQUFXLEdBQUcsSUFBSSxZQUFZLEVBR3BDLENBQUM7UUFFSyx3QkFBbUIsR0FBRyxJQUFJLFlBQVksRUFBVyxDQUFDO0lBZ0JWLENBQUM7SUFYbkQsc0JBQUksK0NBQUs7UUFIVDs7V0FFRzs7Ozs7UUFDSDtZQUNFLE9BQU8sY0FBYyxDQUFD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QyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUs7b0JBQ3JCLENBQUMsQ0FBQyxxQ0FBcUM7b0JBQ3ZDLENBQUMsQ0FBQyw2Q0FBNkMsQ0FBQztTQUNuRDthQUFNO1lBQ0wsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUs7Z0JBQ3hCLENBQUMsQ0FBQyxnQ0FBZ0M7Z0JBQ2xDLENBQUMsQ0FBQyx3Q0FBd0MsQ0FBQztTQUM5QztJQUNILENBQUM7O2dCQTlKRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLDJCQUEyQjtvQkFDckMsZzBDQUFxRDtvQkFFckQsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2lCQUNoRDs7OztnQkFaUSxZQUFZOzs7NkJBc0JsQixLQUFLO3FDQUVMLEtBQUs7d0JBS0wsS0FBSzt3QkFLTCxLQUFLOzhCQUtMLE1BQU07c0NBS04sTUFBTTs7SUEwSFQsbUNBQUM7Q0FBQSxBQS9KRCxJQStKQztTQXpKWSw0QkFBNEI7OztJQUN2QyxnREFBc0U7O0lBQ3RFLGtEQUF5RTs7Ozs7SUFFekUsMERBQTJCOztJQUUzQix5REFBZ0Y7O0lBQ2hGLGlEQUF5RDs7SUFFekQsa0RBQTRCOztJQUU1QiwwREFBb0M7Ozs7O0lBS3BDLDZDQUFpQzs7Ozs7SUFLakMsNkNBQXVCOzs7OztJQUt2QixtREFHSzs7SUFFTCwyREFBNEQ7Ozs7O0lBZ0JoRCxvREFBa0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBJbnB1dCxcclxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcclxuICBPdXRwdXQsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIE9uSW5pdFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgZ2V0RW50aXR5VGl0bGUsIGdldEVudGl0eUljb24gfSBmcm9tICdAaWdvMi9jb21tb24nO1xyXG5cclxuaW1wb3J0IHsgQ2F0YWxvZ0l0ZW1MYXllciB9IGZyb20gJy4uL3NoYXJlZCc7XHJcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBMYXllclNlcnZpY2UgfSBmcm9tICcuLi8uLi9sYXllci9zaGFyZWQvbGF5ZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IGZpcnN0IH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBMYXllciB9IGZyb20gJy4uLy4uL2xheWVyL3NoYXJlZC9sYXllcnMnO1xyXG5cclxuLyoqXHJcbiAqIENhdGFsb2cgYnJvd3NlciBsYXllciBpdGVtXHJcbiAqL1xyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2lnby1jYXRhbG9nLWJyb3dzZXItbGF5ZXInLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9jYXRhbG9nLWJyb3dzZXItbGF5ZXIuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2NhdGFsb2ctYnJvd3Nlci1sYXllci5jb21wb25lbnQuc2NzcyddLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDYXRhbG9nQnJvd3NlckxheWVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICBwdWJsaWMgaW5SYW5nZSQ6IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPiA9IG5ldyBCZWhhdmlvclN1YmplY3QodHJ1ZSk7XHJcbiAgcHVibGljIGlzUHJldmlldyQ6IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPiA9IG5ldyBCZWhhdmlvclN1YmplY3QoZmFsc2UpO1xyXG5cclxuICBwcml2YXRlIGxhc3RUaW1lb3V0UmVxdWVzdDtcclxuXHJcbiAgcHVibGljIGxheWVyTGVnZW5kU2hvd24kOiBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KGZhbHNlKTtcclxuICBwdWJsaWMgaWdvTGF5ZXIkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxMYXllcj4odW5kZWZpbmVkKTtcclxuXHJcbiAgQElucHV0KCkgcmVzb2x1dGlvbjogbnVtYmVyO1xyXG5cclxuICBASW5wdXQoKSBjYXRhbG9nQWxsb3dMZWdlbmQgPSBmYWxzZTtcclxuXHJcbiAgLyoqXHJcbiAgICogQ2F0YWxvZyBsYXllclxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGxheWVyOiBDYXRhbG9nSXRlbUxheWVyO1xyXG5cclxuICAvKipcclxuICAgKiBXaGV0aGVyIHRoZSBsYXllciBpcyBhbHJlYWR5IGFkZGVkIHRvIHRoZSBtYXBcclxuICAgKi9cclxuICBASW5wdXQoKSBhZGRlZCA9IGZhbHNlO1xyXG5cclxuICAvKipcclxuICAgKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIGFkZC9yZW1vdmUgYnV0dG9uIGlzIGNsaWNrZWRcclxuICAgKi9cclxuICBAT3V0cHV0KCkgYWRkZWRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPHtcclxuICAgIGFkZGVkOiBib29sZWFuO1xyXG4gICAgbGF5ZXI6IENhdGFsb2dJdGVtTGF5ZXI7XHJcbiAgfT4oKTtcclxuXHJcbiAgQE91dHB1dCgpIGFkZGVkTGF5ZXJJc1ByZXZpZXcgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIGdldCB0aXRsZSgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIGdldEVudGl0eVRpdGxlKHRoaXMubGF5ZXIpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgZ2V0IGljb24oKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBnZXRFbnRpdHlJY29uKHRoaXMubGF5ZXIpIHx8ICdsYXllcnMnO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBsYXllclNlcnZpY2U6IExheWVyU2VydmljZSApIHt9XHJcblxyXG4gIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5pc0luUmVzb2x1dGlvbnNSYW5nZSgpO1xyXG4gICAgdGhpcy5pc1ByZXZpZXckLnN1YnNjcmliZSh2YWx1ZSA9PiB0aGlzLmFkZGVkTGF5ZXJJc1ByZXZpZXcuZW1pdCh2YWx1ZSkpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogT24gbW91c2UgZXZlbnQsIG1vdXNlZW50ZXIgL21vdXNlbGVhdmVcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBvbk1vdXNlRXZlbnQoZXZlbnQpIHtcclxuICAgIHRoaXMub25Ub2dnbGVDbGljayhldmVudCk7XHJcbiAgfVxyXG5cclxuICBhc2tGb3JMZWdlbmQoZXZlbnQpIHtcclxuICAgIHRoaXMubGF5ZXJMZWdlbmRTaG93biQubmV4dCghdGhpcy5sYXllckxlZ2VuZFNob3duJC52YWx1ZSk7XHJcbiAgICB0aGlzLmxheWVyU2VydmljZS5jcmVhdGVBc3luY0xheWVyKHRoaXMubGF5ZXIub3B0aW9ucykucGlwZShmaXJzdCgpKVxyXG4gICAgLnN1YnNjcmliZShsYXllciA9PiB0aGlzLmlnb0xheWVyJC5uZXh0KGxheWVyKSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBPbiB0b2dnbGUgYnV0dG9uIGNsaWNrLCBlbWl0IHRoZSBhZGRlZCBjaGFuZ2UgZXZlbnRcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBvblRvZ2dsZUNsaWNrKGV2ZW50KSB7XHJcbiAgICBpZiAodHlwZW9mIHRoaXMubGFzdFRpbWVvdXRSZXF1ZXN0ICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICBjbGVhclRpbWVvdXQodGhpcy5sYXN0VGltZW91dFJlcXVlc3QpO1xyXG4gICAgfVxyXG5cclxuICAgIHN3aXRjaCAoZXZlbnQudHlwZSkge1xyXG4gICAgICBjYXNlICdjbGljayc6XHJcbiAgICAgICAgaWYgKCF0aGlzLmlzUHJldmlldyQudmFsdWUpIHtcclxuICAgICAgICAgIGlmICh0aGlzLmFkZGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlKCk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmFkZCgpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmlzUHJldmlldyQubmV4dChmYWxzZSk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ21vdXNlZW50ZXInOlxyXG4gICAgICAgIGlmICghdGhpcy5pc1ByZXZpZXckLnZhbHVlICYmICF0aGlzLmFkZGVkKSB7XHJcbiAgICAgICAgICB0aGlzLmxhc3RUaW1lb3V0UmVxdWVzdCA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmFkZCgpO1xyXG4gICAgICAgICAgICB0aGlzLmlzUHJldmlldyQubmV4dCh0cnVlKTtcclxuICAgICAgICAgIH0sIDUwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdtb3VzZWxlYXZlJzpcclxuICAgICAgICBpZiAodGhpcy5pc1ByZXZpZXckLnZhbHVlKSB7XHJcbiAgICAgICAgICB0aGlzLnJlbW92ZSgpO1xyXG4gICAgICAgICAgdGhpcy5pc1ByZXZpZXckLm5leHQoZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEVtaXQgYWRkZWQgY2hhbmdlIGV2ZW50IHdpdGggYWRkZWQgPSB0cnVlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBhZGQoKSB7XHJcbiAgICBpZiAoIXRoaXMuYWRkZWQpIHtcclxuICAgICAgdGhpcy5hZGRlZCA9IHRydWU7XHJcbiAgICAgIHRoaXMuYWRkZWRDaGFuZ2UuZW1pdCh7IGFkZGVkOiB0cnVlLCBsYXllcjogdGhpcy5sYXllciB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEVtaXQgYWRkZWQgY2hhbmdlIGV2ZW50IHdpdGggYWRkZWQgPSBmYWxzZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgcmVtb3ZlKCkge1xyXG4gICAgaWYgKHRoaXMuYWRkZWQpIHtcclxuICAgICAgdGhpcy5hZGRlZCA9IGZhbHNlO1xyXG4gICAgICB0aGlzLmFkZGVkQ2hhbmdlLmVtaXQoeyBhZGRlZDogZmFsc2UsIGxheWVyOiB0aGlzLmxheWVyIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaGF2ZUdyb3VwKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuICEoIXRoaXMubGF5ZXIuYWRkcmVzcyB8fCB0aGlzLmxheWVyLmFkZHJlc3Muc3BsaXQoJy4nKS5sZW5ndGggPT09IDEpO1xyXG4gIH1cclxuXHJcbiAgaXNJblJlc29sdXRpb25zUmFuZ2UoKTogYm9vbGVhbiB7XHJcbiAgICBjb25zdCBtaW5SZXNvbHV0aW9uID0gdGhpcy5sYXllci5vcHRpb25zLm1pblJlc29sdXRpb24gfHwgMDtcclxuICAgIGNvbnN0IG1heFJlc29sdXRpb24gPSB0aGlzLmxheWVyLm9wdGlvbnMubWF4UmVzb2x1dGlvbiB8fCBJbmZpbml0eTtcclxuICAgIHRoaXMuaW5SYW5nZSQubmV4dChcclxuICAgICAgdGhpcy5yZXNvbHV0aW9uID49IG1pblJlc29sdXRpb24gJiYgdGhpcy5yZXNvbHV0aW9uIDw9IG1heFJlc29sdXRpb25cclxuICAgICk7XHJcbiAgICByZXR1cm4gdGhpcy5pblJhbmdlJC52YWx1ZTtcclxuICB9XHJcblxyXG4gIGNvbXB1dGVUb29sdGlwKCk6IHN0cmluZyB7XHJcbiAgICBpZiAodGhpcy5hZGRlZCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5pc1ByZXZpZXckLnZhbHVlXHJcbiAgICAgICAgPyAnaWdvLmdlby5jYXRhbG9nLmxheWVyLmFkZFRvTWFwJ1xyXG4gICAgICAgIDogdGhpcy5pblJhbmdlJC52YWx1ZVxyXG4gICAgICAgID8gJ2lnby5nZW8uY2F0YWxvZy5sYXllci5yZW1vdmVGcm9tTWFwJ1xyXG4gICAgICAgIDogJ2lnby5nZW8uY2F0YWxvZy5sYXllci5yZW1vdmVGcm9tTWFwT3V0UmFuZ2UnO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIHRoaXMuaW5SYW5nZSQudmFsdWVcclxuICAgICAgICA/ICdpZ28uZ2VvLmNhdGFsb2cubGF5ZXIuYWRkVG9NYXAnXHJcbiAgICAgICAgOiAnaWdvLmdlby5jYXRhbG9nLmxheWVyLmFkZFRvTWFwT3V0UmFuZ2UnO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=
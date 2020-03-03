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
export class CatalogBrowserLayerComponent {
    /**
     * @param {?} layerService
     */
    constructor(layerService) {
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
    /**
     * \@internal
     * @return {?}
     */
    get title() {
        return getEntityTitle(this.layer);
    }
    /**
     * \@internal
     * @return {?}
     */
    get icon() {
        return getEntityIcon(this.layer) || 'layers';
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.isInResolutionsRange();
        this.isPreview$.subscribe((/**
         * @param {?} value
         * @return {?}
         */
        value => this.addedLayerIsPreview.emit(value)));
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
     * @param {?} event
     * @return {?}
     */
    askForLegend(event) {
        this.layerLegendShown$.next(!this.layerLegendShown$.value);
        this.layerService.createAsyncLayer(this.layer.options).pipe(first())
            .subscribe((/**
         * @param {?} layer
         * @return {?}
         */
        layer => this.igoLayer$.next(layer)));
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
     * Emit added change event with added = true
     * @private
     * @return {?}
     */
    add() {
        if (!this.added) {
            this.added = true;
            this.addedChange.emit({ added: true, layer: this.layer });
        }
    }
    /**
     * Emit added change event with added = false
     * @private
     * @return {?}
     */
    remove() {
        if (this.added) {
            this.added = false;
            this.addedChange.emit({ added: false, layer: this.layer });
        }
    }
    /**
     * @return {?}
     */
    haveGroup() {
        return !(!this.layer.address || this.layer.address.split('.').length === 1);
    }
    /**
     * @return {?}
     */
    isInResolutionsRange() {
        /** @type {?} */
        const minResolution = this.layer.options.minResolution;
        /** @type {?} */
        const maxResolution = this.layer.options.maxResolution;
        this.inRange$.next(this.resolution >= minResolution && this.resolution <= maxResolution);
        return this.inRange$.value;
    }
    /**
     * @return {?}
     */
    computeTooltip() {
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
    }
}
CatalogBrowserLayerComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-catalog-browser-layer',
                template: "<mat-list-item>\r\n  <mat-icon *ngIf=\"haveGroup()\" mat-list-avatar svgIcon=\"blank\"></mat-icon>\r\n  <h4 mat-line matTooltipShowDelay=\"500\" [ngClass]=\"(catalogAllowLegend)?'igo-cataloglayer-title':''\" (click)=\"askForLegend($event)\" [matTooltip]=\"title\">{{title}}</h4>\r\n\r\n  <igo-metadata-button [layer]=\"layer\"></igo-metadata-button>\r\n\r\n  <button\r\n    (mouseenter)=\"onMouseEvent($event)\" (mouseleave)=\"onMouseEvent($event)\"\r\n    mat-icon-button\r\n    tooltip-position=\"below\"\r\n    matTooltipShowDelay=\"500\"\r\n    [matTooltip]=\"computeTooltip() | translate\"\r\n    [color]=\"(isPreview$ | async) ? '' : added ? 'warn' : ''\"\r\n    (click)=\"onToggleClick($event)\">\r\n    <mat-icon\r\n       matBadge\r\n       igoMatBadgeIcon=\"eye-off\"\r\n       [matBadgeHidden]=\"isInResolutionsRange()\"\r\n       matBadgeColor=\"accent\"\r\n       matBadgeSize=\"small\"\r\n       matBadgePosition=\"after\"\r\n       [svgIcon]=\"(isPreview$ | async) ? 'plus' : added ? 'delete' : 'plus'\">\r\n    </mat-icon>\r\n  </button>\r\n\r\n</mat-list-item>\r\n\r\n<div #legend class=\"igo-cataloglayer-legend-container\">\r\n  <igo-layer-legend\r\n    *ngIf=\"(layerLegendShown$ | async) && (igoLayer$ | async) && catalogAllowLegend\"\r\n    [layer]=\"igoLayer$ | async\">\r\n  </igo-layer-legend>\r\n</div>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".mat-badge-small .mat-badge-content{color:rgba(0,0,0,.38)}.igo-cataloglayer-title{cursor:pointer}.igo-cataloglayer-legend-container{padding-left:18px;width:calc(100% - 18px);margin-left:40px}"]
            }] }
];
/** @nocollapse */
CatalogBrowserLayerComponent.ctorParameters = () => [
    { type: LayerService }
];
CatalogBrowserLayerComponent.propDecorators = {
    resolution: [{ type: Input }],
    catalogAllowLegend: [{ type: Input }],
    layer: [{ type: Input }],
    added: [{ type: Input }],
    addedChange: [{ type: Output }],
    addedLayerIsPreview: [{ type: Output }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0YWxvZy1icm93c2VyLWxheWVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9jYXRhbG9nL2NhdGFsb2ctYnJvd3Nlci9jYXRhbG9nLWJyb3dzZXItbGF5ZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCx1QkFBdUIsRUFDdkIsTUFBTSxFQUNOLFlBQVksRUFFYixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsY0FBYyxFQUFFLGFBQWEsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUc3RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3ZDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNoRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7QUFZdkMsTUFBTSxPQUFPLDRCQUE0Qjs7OztJQStDdkMsWUFBb0IsWUFBMEI7UUFBMUIsaUJBQVksR0FBWixZQUFZLENBQWM7UUE5Q3ZDLGFBQVEsR0FBNkIsSUFBSSxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDL0QsZUFBVSxHQUE2QixJQUFJLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUlsRSxzQkFBaUIsR0FBNkIsSUFBSSxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDekUsY0FBUyxHQUFHLElBQUksZUFBZSxDQUFRLFNBQVMsQ0FBQyxDQUFDO1FBSWhELHVCQUFrQixHQUFHLEtBQUssQ0FBQzs7OztRQVUzQixVQUFLLEdBQUcsS0FBSyxDQUFDOzs7O1FBS2IsZ0JBQVcsR0FBRyxJQUFJLFlBQVksRUFHcEMsQ0FBQztRQUVLLHdCQUFtQixHQUFHLElBQUksWUFBWSxFQUFXLENBQUM7SUFnQlYsQ0FBQzs7Ozs7SUFYbkQsSUFBSSxLQUFLO1FBQ1AsT0FBTyxjQUFjLENB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LDJCQUEyQjtnQkFDckMsZzBDQUFxRDtnQkFFckQsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2hEOzs7O1lBWlEsWUFBWTs7O3lCQXNCbEIsS0FBSztpQ0FFTCxLQUFLO29CQUtMLEtBQUs7b0JBS0wsS0FBSzswQkFLTCxNQUFNO2tDQUtOLE1BQU07Ozs7SUE5QlAsZ0RBQXNFOztJQUN0RSxrREFBeUU7Ozs7O0lBRXpFLDBEQUEyQjs7SUFFM0IseURBQWdGOztJQUNoRixpREFBeUQ7O0lBRXpELGtEQUE0Qjs7SUFFNUIsMERBQW9DOzs7OztJQUtwQyw2Q0FBaUM7Ozs7O0lBS2pDLDZDQUF1Qjs7Ozs7SUFLdkIsbURBR0s7O0lBRUwsMkRBQTREOzs7OztJQWdCaEQsb0RBQWtDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgSW5wdXQsXHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbiAgT3V0cHV0LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBPbkluaXRcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IGdldEVudGl0eVRpdGxlLCBnZXRFbnRpdHlJY29uIH0gZnJvbSAnQGlnbzIvY29tbW9uJztcclxuXHJcbmltcG9ydCB7IENhdGFsb2dJdGVtTGF5ZXIgfSBmcm9tICcuLi9zaGFyZWQnO1xyXG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgTGF5ZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vbGF5ZXIvc2hhcmVkL2xheWVyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBmaXJzdCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgTGF5ZXIgfSBmcm9tICcuLi8uLi9sYXllci9zaGFyZWQvbGF5ZXJzJztcclxuXHJcbi8qKlxyXG4gKiBDYXRhbG9nIGJyb3dzZXIgbGF5ZXIgaXRlbVxyXG4gKi9cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdpZ28tY2F0YWxvZy1icm93c2VyLWxheWVyJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vY2F0YWxvZy1icm93c2VyLWxheWVyLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9jYXRhbG9nLWJyb3dzZXItbGF5ZXIuY29tcG9uZW50LnNjc3MnXSxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgQ2F0YWxvZ0Jyb3dzZXJMYXllckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgcHVibGljIGluUmFuZ2UkOiBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KHRydWUpO1xyXG4gIHB1YmxpYyBpc1ByZXZpZXckOiBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KGZhbHNlKTtcclxuXHJcbiAgcHJpdmF0ZSBsYXN0VGltZW91dFJlcXVlc3Q7XHJcblxyXG4gIHB1YmxpYyBsYXllckxlZ2VuZFNob3duJDogQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IEJlaGF2aW9yU3ViamVjdChmYWxzZSk7XHJcbiAgcHVibGljIGlnb0xheWVyJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8TGF5ZXI+KHVuZGVmaW5lZCk7XHJcblxyXG4gIEBJbnB1dCgpIHJlc29sdXRpb246IG51bWJlcjtcclxuXHJcbiAgQElucHV0KCkgY2F0YWxvZ0FsbG93TGVnZW5kID0gZmFsc2U7XHJcblxyXG4gIC8qKlxyXG4gICAqIENhdGFsb2cgbGF5ZXJcclxuICAgKi9cclxuICBASW5wdXQoKSBsYXllcjogQ2F0YWxvZ0l0ZW1MYXllcjtcclxuXHJcbiAgLyoqXHJcbiAgICogV2hldGhlciB0aGUgbGF5ZXIgaXMgYWxyZWFkeSBhZGRlZCB0byB0aGUgbWFwXHJcbiAgICovXHJcbiAgQElucHV0KCkgYWRkZWQgPSBmYWxzZTtcclxuXHJcbiAgLyoqXHJcbiAgICogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBhZGQvcmVtb3ZlIGJ1dHRvbiBpcyBjbGlja2VkXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIGFkZGVkQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjx7XHJcbiAgICBhZGRlZDogYm9vbGVhbjtcclxuICAgIGxheWVyOiBDYXRhbG9nSXRlbUxheWVyO1xyXG4gIH0+KCk7XHJcblxyXG4gIEBPdXRwdXQoKSBhZGRlZExheWVySXNQcmV2aWV3ID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xyXG5cclxuICAvKipcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBnZXQgdGl0bGUoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBnZXRFbnRpdHlUaXRsZSh0aGlzLmxheWVyKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIGdldCBpY29uKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gZ2V0RW50aXR5SWNvbih0aGlzLmxheWVyKSB8fCAnbGF5ZXJzJztcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbGF5ZXJTZXJ2aWNlOiBMYXllclNlcnZpY2UgKSB7fVxyXG5cclxuICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgIHRoaXMuaXNJblJlc29sdXRpb25zUmFuZ2UoKTtcclxuICAgIHRoaXMuaXNQcmV2aWV3JC5zdWJzY3JpYmUodmFsdWUgPT4gdGhpcy5hZGRlZExheWVySXNQcmV2aWV3LmVtaXQodmFsdWUpKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE9uIG1vdXNlIGV2ZW50LCBtb3VzZWVudGVyIC9tb3VzZWxlYXZlXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgb25Nb3VzZUV2ZW50KGV2ZW50KSB7XHJcbiAgICB0aGlzLm9uVG9nZ2xlQ2xpY2soZXZlbnQpO1xyXG4gIH1cclxuXHJcbiAgYXNrRm9yTGVnZW5kKGV2ZW50KSB7XHJcbiAgICB0aGlzLmxheWVyTGVnZW5kU2hvd24kLm5leHQoIXRoaXMubGF5ZXJMZWdlbmRTaG93biQudmFsdWUpO1xyXG4gICAgdGhpcy5sYXllclNlcnZpY2UuY3JlYXRlQXN5bmNMYXllcih0aGlzLmxheWVyLm9wdGlvbnMpLnBpcGUoZmlyc3QoKSlcclxuICAgIC5zdWJzY3JpYmUobGF5ZXIgPT4gdGhpcy5pZ29MYXllciQubmV4dChsYXllcikpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogT24gdG9nZ2xlIGJ1dHRvbiBjbGljaywgZW1pdCB0aGUgYWRkZWQgY2hhbmdlIGV2ZW50XHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgb25Ub2dnbGVDbGljayhldmVudCkge1xyXG4gICAgaWYgKHR5cGVvZiB0aGlzLmxhc3RUaW1lb3V0UmVxdWVzdCAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMubGFzdFRpbWVvdXRSZXF1ZXN0KTtcclxuICAgIH1cclxuXHJcbiAgICBzd2l0Y2ggKGV2ZW50LnR5cGUpIHtcclxuICAgICAgY2FzZSAnY2xpY2snOlxyXG4gICAgICAgIGlmICghdGhpcy5pc1ByZXZpZXckLnZhbHVlKSB7XHJcbiAgICAgICAgICBpZiAodGhpcy5hZGRlZCkge1xyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZSgpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5hZGQoKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5pc1ByZXZpZXckLm5leHQoZmFsc2UpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdtb3VzZWVudGVyJzpcclxuICAgICAgICBpZiAoIXRoaXMuaXNQcmV2aWV3JC52YWx1ZSAmJiAhdGhpcy5hZGRlZCkge1xyXG4gICAgICAgICAgdGhpcy5sYXN0VGltZW91dFJlcXVlc3QgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5hZGQoKTtcclxuICAgICAgICAgICAgdGhpcy5pc1ByZXZpZXckLm5leHQodHJ1ZSk7XHJcbiAgICAgICAgICB9LCA1MDApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnbW91c2VsZWF2ZSc6XHJcbiAgICAgICAgaWYgKHRoaXMuaXNQcmV2aWV3JC52YWx1ZSkge1xyXG4gICAgICAgICAgdGhpcy5yZW1vdmUoKTtcclxuICAgICAgICAgIHRoaXMuaXNQcmV2aWV3JC5uZXh0KGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBFbWl0IGFkZGVkIGNoYW5nZSBldmVudCB3aXRoIGFkZGVkID0gdHJ1ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgYWRkKCkge1xyXG4gICAgaWYgKCF0aGlzLmFkZGVkKSB7XHJcbiAgICAgIHRoaXMuYWRkZWQgPSB0cnVlO1xyXG4gICAgICB0aGlzLmFkZGVkQ2hhbmdlLmVtaXQoeyBhZGRlZDogdHJ1ZSwgbGF5ZXI6IHRoaXMubGF5ZXIgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBFbWl0IGFkZGVkIGNoYW5nZSBldmVudCB3aXRoIGFkZGVkID0gZmFsc2VcclxuICAgKi9cclxuICBwcml2YXRlIHJlbW92ZSgpIHtcclxuICAgIGlmICh0aGlzLmFkZGVkKSB7XHJcbiAgICAgIHRoaXMuYWRkZWQgPSBmYWxzZTtcclxuICAgICAgdGhpcy5hZGRlZENoYW5nZS5lbWl0KHsgYWRkZWQ6IGZhbHNlLCBsYXllcjogdGhpcy5sYXllciB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGhhdmVHcm91cCgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiAhKCF0aGlzLmxheWVyLmFkZHJlc3MgfHwgdGhpcy5sYXllci5hZGRyZXNzLnNwbGl0KCcuJykubGVuZ3RoID09PSAxKTtcclxuICB9XHJcblxyXG4gIGlzSW5SZXNvbHV0aW9uc1JhbmdlKCk6IGJvb2xlYW4ge1xyXG4gICAgY29uc3QgbWluUmVzb2x1dGlvbiA9IHRoaXMubGF5ZXIub3B0aW9ucy5taW5SZXNvbHV0aW9uO1xyXG4gICAgY29uc3QgbWF4UmVzb2x1dGlvbiA9IHRoaXMubGF5ZXIub3B0aW9ucy5tYXhSZXNvbHV0aW9uO1xyXG4gICAgdGhpcy5pblJhbmdlJC5uZXh0KFxyXG4gICAgICB0aGlzLnJlc29sdXRpb24gPj0gbWluUmVzb2x1dGlvbiAmJiB0aGlzLnJlc29sdXRpb24gPD0gbWF4UmVzb2x1dGlvblxyXG4gICAgKTtcclxuICAgIHJldHVybiB0aGlzLmluUmFuZ2UkLnZhbHVlO1xyXG4gIH1cclxuXHJcbiAgY29tcHV0ZVRvb2x0aXAoKTogc3RyaW5nIHtcclxuICAgIGlmICh0aGlzLmFkZGVkKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmlzUHJldmlldyQudmFsdWVcclxuICAgICAgICA/ICdpZ28uZ2VvLmNhdGFsb2cubGF5ZXIuYWRkVG9NYXAnXHJcbiAgICAgICAgOiB0aGlzLmluUmFuZ2UkLnZhbHVlXHJcbiAgICAgICAgPyAnaWdvLmdlby5jYXRhbG9nLmxheWVyLnJlbW92ZUZyb21NYXAnXHJcbiAgICAgICAgOiAnaWdvLmdlby5jYXRhbG9nLmxheWVyLnJlbW92ZUZyb21NYXBPdXRSYW5nZSc7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gdGhpcy5pblJhbmdlJC52YWx1ZVxyXG4gICAgICAgID8gJ2lnby5nZW8uY2F0YWxvZy5sYXllci5hZGRUb01hcCdcclxuICAgICAgICA6ICdpZ28uZ2VvLmNhdGFsb2cubGF5ZXIuYWRkVG9NYXBPdXRSYW5nZSc7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==
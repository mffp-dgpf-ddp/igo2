/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { layerIsQueryable } from '../../query/shared/query.utils';
import { Layer, TooltipType } from '../shared/layers';
import { NetworkService } from '@igo2/core';
export class LayerItemComponent {
    /**
     * @param {?} networkService
     */
    constructor(networkService) {
        this.networkService = networkService;
        this.showLegend$ = new BehaviorSubject(true);
        this.inResolutionRange$ = new BehaviorSubject(true);
        this.queryBadgeHidden$ = new BehaviorSubject(true);
        this.toggleLegendOnVisibilityChange = false;
        this.expandLegendIfVisible = false;
        this.updateLegendOnResolutionChange = false;
        this.orderable = true;
        this.lowerDisabled = false;
        this.raiseDisabled = false;
        this.queryBadge = false;
    }
    /**
     * @return {?}
     */
    get removable() {
        return this.layer.options.removable !== false;
    }
    /**
     * @return {?}
     */
    get opacity() {
        return this.layer.opacity * 100;
    }
    /**
     * @param {?} opacity
     * @return {?}
     */
    set opacity(opacity) {
        this.layer.opacity = opacity / 100;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this.layer.visible &&
            this.expandLegendIfVisible &&
            this.layer.firstLoadComponent === true) {
            this.layer.firstLoadComponent = false;
            this.layer.legendCollapsed = false;
        }
        this.toggleLegend(this.layer.legendCollapsed);
        this.updateQueryBadge();
        /** @type {?} */
        const resolution$ = this.layer.map.viewController.resolution$;
        this.resolution$$ = resolution$.subscribe((/**
         * @return {?}
         */
        () => {
            this.onResolutionChange();
        }));
        this.tooltipText = this.computeTooltip();
        this.networkService.currentState().subscribe((/**
         * @param {?} state
         * @return {?}
         */
        (state) => {
            this.state = state;
            this.onResolutionChange();
        }));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.resolution$$.unsubscribe();
    }
    /**
     * @param {?} collapsed
     * @return {?}
     */
    toggleLegend(collapsed) {
        this.layer.legendCollapsed = collapsed;
        this.showLegend$.next(!collapsed);
    }
    /**
     * @return {?}
     */
    toggleLegendOnClick() {
        this.toggleLegend(this.showLegend$.value);
    }
    /**
     * @return {?}
     */
    toggleVisibility() {
        this.layer.visible = !this.layer.visible;
        if (this.toggleLegendOnVisibilityChange) {
            this.toggleLegend(!this.layer.visible);
        }
        this.updateQueryBadge();
    }
    /**
     * @return {?}
     */
    computeTooltip() {
        /** @type {?} */
        const layerOptions = this.layer.options;
        if (!layerOptions.tooltip) {
            return this.layer.title;
        }
        /** @type {?} */
        const layerTooltip = layerOptions.tooltip;
        /** @type {?} */
        const layerMetadata = ((/** @type {?} */ (layerOptions))).metadata;
        switch (layerOptions.tooltip.type) {
            case TooltipType.TITLE:
                return this.layer.title;
            case TooltipType.ABSTRACT:
                if (layerMetadata && layerMetadata.abstract) {
                    return layerMetadata.abstract;
                }
                else {
                    return this.layer.title;
                }
            case TooltipType.CUSTOM:
                if (layerTooltip && layerTooltip.text) {
                    return layerTooltip.text;
                }
                else {
                    return this.layer.title;
                }
            default:
                return this.layer.title;
        }
    }
    /**
     * @private
     * @return {?}
     */
    onResolutionChange() {
        /** @type {?} */
        const inResolutionRange = this.layer.isInResolutionsRange;
        if (inResolutionRange === false &&
            this.updateLegendOnResolutionChange === true) {
            this.toggleLegend(true);
        }
        this.inResolutionRange$.next(inResolutionRange);
    }
    /**
     * @private
     * @return {?}
     */
    updateQueryBadge() {
        /** @type {?} */
        const hidden = this.queryBadge === false ||
            this.layer.visible === false ||
            !layerIsQueryable(this.layer);
        this.queryBadgeHidden$.next(hidden);
    }
}
LayerItemComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-layer-item',
                template: "<mat-list-item class= \"igo-layer-list-item\">\r\n  <h4 (click)=\"toggleLegendOnClick()\" matLine class=\"igo-layer-title\" [matTooltip]=\"tooltipText\" matTooltipShowDelay=\"500\">{{layer.title}}</h4>\r\n\r\n  <button\r\n    mat-icon-button\r\n    [color]=\"layer.visible ? 'primary' : 'default'\"\r\n    collapsibleButton\r\n    tooltip-position=\"below\"\r\n    matTooltipShowDelay=\"500\"\r\n    [matTooltip]=\"layer.visible ?\r\n                  ('igo.geo.layer.hideLayer' | translate) :\r\n                  ('igo.geo.layer.showLayer' | translate)\"\r\n    (click)=\"toggleVisibility()\">\r\n    <mat-icon\r\n      matBadge=\"?\"\r\n      matBadgeColor=\"accent\"\r\n      matBadgeSize=\"small\"\r\n      matBadgePosition=\"after\"\r\n      [matBadgeHidden]=\"queryBadgeHidden$ | async\"\r\n      [ngClass]=\"{disabled: !(inResolutionRange$ | async)}\"\r\n      [svgIcon]=\"layer.visible ? 'eye' : 'eye-off'\">\r\n    </mat-icon>\r\n  </button>\r\n\r\n  <button\r\n    tooltip-position=\"below\"\r\n    matTooltipShowDelay=\"500\"\r\n    [matTooltip]= \"'igo.geo.layer.moreOptions' | translate\"\r\n    mat-icon-button\r\n    color=\"primary\"\r\n    igoCollapse\r\n    [target]=\"actions\"\r\n    [collapsed]=\"true\">\r\n    <mat-icon svgIcon=\"dots-horizontal\"></mat-icon>\r\n  </button>\r\n</mat-list-item>\r\n\r\n<div #actions class=\"igo-layer-actions-container\">\r\n  <div class=\"igo-col igo-col-100 igo-col-100-m\">\r\n\r\n    <div class=\"igo-layer-button-group\">\r\n      <!-- <label>{{ 'igo.geo.layer.opacity' | translate }} </label> -->\r\n      <mat-slider\r\n        id=\"opacity-slider\"\r\n        color=\"primary\"\r\n        thumbLabel\r\n        tickInterval=\"5\"\r\n        step=\"5\"\r\n        [min]=\"0\"\r\n        [max]=\"100\"\r\n        [(ngModel)]=\"opacity\"\r\n        [matTooltip]=\"'igo.geo.layer.opacity' | translate\"\r\n        matTooltipShowDelay=\"500\"\r\n        tooltip-position=\"below\">\r\n      </mat-slider>\r\n      \r\n      <button\r\n        color=\"primary\"\r\n        mat-icon-button\r\n        tooltip-position=\"below\"\r\n        matTooltipShowDelay=\"500\"\r\n        [matTooltip]=\"'igo.geo.layer.raiseLayer' | translate\"\r\n        [disabled]=\"!orderable || raiseDisabled\"\r\n        (click)=\"layer.map.raiseLayer(layer)\">\r\n        <mat-icon svgIcon=\"arrow-up\"></mat-icon>\r\n      </button>\r\n\r\n      <button\r\n        mat-icon-button\r\n        color=\"primary\"\r\n        tooltip-position=\"below\"\r\n        matTooltipShowDelay=\"500\"\r\n        [matTooltip]=\"'igo.geo.layer.lowerLayer' | translate\"\r\n        [disabled]=\"!orderable || lowerDisabled\"\r\n        (click)=\"layer.map.lowerLayer(layer)\">\r\n        <mat-icon svgIcon=\"arrow-down\"></mat-icon>\r\n      </button>\r\n\r\n      <button\r\n        *ngIf=\"removable === true\"\r\n        mat-icon-button\r\n        color=\"warn\"\r\n        tooltip-position=\"below\"\r\n        matTooltipShowDelay=\"500\"\r\n        [matTooltip]=\"'igo.geo.layer.removeLayer' | translate\"\r\n        (click)=\"layer.map.removeLayer(layer)\">\r\n        <mat-icon svgIcon=\"delete\"></mat-icon>\r\n      </button>\r\n      <ng-content select=\"[igoLayerItemToolbar]\"></ng-content>\r\n\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n<div #legend class=\"igo-layer-legend-container\">\r\n  <igo-layer-legend\r\n    *ngIf=\"showLegend$ | async\"\r\n    [layer]=\"layer\"\r\n    [updateLegendOnResolutionChange]=\"updateLegendOnResolutionChange\">\r\n  </igo-layer-legend>\r\n</div>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{overflow:hidden}.igo-layer-list-item{height:46px;clear:both}.igo-layer-title{cursor:pointer}.igo-layer-actions-container{width:100%;display:inline-block;padding-left:10px}.igo-layer-actions-container>div{text-align:center}.igo-layer-legend-container{padding-left:18px;width:calc(100% - 18px)}#opacity-slider{float:left}.igo-layer-button-group{text-align:right;padding:0 10px 0 0;width:100%}mat-icon.disabled{color:rgba(0,0,0,.38)}.mat-badge-small .mat-badge-content{font-size:12px}"]
            }] }
];
/** @nocollapse */
LayerItemComponent.ctorParameters = () => [
    { type: NetworkService }
];
LayerItemComponent.propDecorators = {
    layer: [{ type: Input }],
    toggleLegendOnVisibilityChange: [{ type: Input }],
    expandLegendIfVisible: [{ type: Input }],
    updateLegendOnResolutionChange: [{ type: Input }],
    orderable: [{ type: Input }],
    lowerDisabled: [{ type: Input }],
    raiseDisabled: [{ type: Input }],
    queryBadge: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    LayerItemComponent.prototype.showLegend$;
    /** @type {?} */
    LayerItemComponent.prototype.inResolutionRange$;
    /** @type {?} */
    LayerItemComponent.prototype.queryBadgeHidden$;
    /** @type {?} */
    LayerItemComponent.prototype.tooltipText;
    /** @type {?} */
    LayerItemComponent.prototype.state;
    /**
     * @type {?}
     * @private
     */
    LayerItemComponent.prototype.resolution$$;
    /** @type {?} */
    LayerItemComponent.prototype.layer;
    /** @type {?} */
    LayerItemComponent.prototype.toggleLegendOnVisibilityChange;
    /** @type {?} */
    LayerItemComponent.prototype.expandLegendIfVisible;
    /** @type {?} */
    LayerItemComponent.prototype.updateLegendOnResolutionChange;
    /** @type {?} */
    LayerItemComponent.prototype.orderable;
    /** @type {?} */
    LayerItemComponent.prototype.lowerDisabled;
    /** @type {?} */
    LayerItemComponent.prototype.raiseDisabled;
    /** @type {?} */
    LayerItemComponent.prototype.queryBadge;
    /**
     * @type {?}
     * @private
     */
    LayerItemComponent.prototype.networkService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5ZXItaXRlbS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvbGF5ZXIvbGF5ZXItaXRlbS9sYXllci1pdGVtLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBR0wsdUJBQXVCLEVBQ3hCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBZ0IsZUFBZSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBR3JELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ2xFLE9BQU8sRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDdEQsT0FBTyxFQUFFLGNBQWMsRUFBbUIsTUFBTSxZQUFZLENBQUM7QUFRN0QsTUFBTSxPQUFPLGtCQUFrQjs7OztJQXdDN0IsWUFBb0IsY0FBOEI7UUFBOUIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBdkNsRCxnQkFBVyxHQUE2QixJQUFJLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVsRSx1QkFBa0IsR0FBNkIsSUFBSSxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFekUsc0JBQWlCLEdBQTZCLElBQUksZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBVS9ELG1DQUE4QixHQUFZLEtBQUssQ0FBQztRQUVoRCwwQkFBcUIsR0FBWSxLQUFLLENBQUM7UUFFdkMsbUNBQThCLEdBQVksS0FBSyxDQUFDO1FBRWhELGNBQVMsR0FBWSxJQUFJLENBQUM7UUFFMUIsa0JBQWEsR0FBWSxLQUFLLENBQUM7UUFFL0Isa0JBQWEsR0FBWSxLQUFLLENBQUM7UUFFL0IsZUFBVSxHQUFZLEtBQUssQ0FBQztJQWFnQixDQUFDOzs7O0lBWHRELElBQUksU0FBUztRQUNYLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsU0FBUyxLQUFLLEtB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QkFxQnBCLEtBQUs7NkNBRUwsS0FBSztvQ0FFTCxLQUFLOzZDQUVMLEtBQUs7d0JBRUwsS0FBSzs0QkFFTCxLQUFLOzRCQUVMLEtBQUs7eUJBRUwsS0FBSzs7OztJQTFCTix5Q0FBa0U7O0lBRWxFLGdEQUF5RTs7SUFFekUsK0NBQXdFOztJQUV4RSx5Q0FBb0I7O0lBRXBCLG1DQUF1Qjs7Ozs7SUFFdkIsMENBQW1DOztJQUVuQyxtQ0FBc0I7O0lBRXRCLDREQUF5RDs7SUFFekQsbURBQWdEOztJQUVoRCw0REFBeUQ7O0lBRXpELHVDQUFtQzs7SUFFbkMsMkNBQXdDOztJQUV4QywyQ0FBd0M7O0lBRXhDLHdDQUFxQzs7Ozs7SUFhekIsNENBQXNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgSW5wdXQsXHJcbiAgT25Jbml0LFxyXG4gIE9uRGVzdHJveSxcclxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneVxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24sIEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IHsgTWV0YWRhdGFMYXllck9wdGlvbnMgfSBmcm9tICcuLi8uLi9tZXRhZGF0YS9zaGFyZWQvbWV0YWRhdGEuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgbGF5ZXJJc1F1ZXJ5YWJsZSB9IGZyb20gJy4uLy4uL3F1ZXJ5L3NoYXJlZC9xdWVyeS51dGlscyc7XHJcbmltcG9ydCB7IExheWVyLCBUb29sdGlwVHlwZSB9IGZyb20gJy4uL3NoYXJlZC9sYXllcnMnO1xyXG5pbXBvcnQgeyBOZXR3b3JrU2VydmljZSwgQ29ubmVjdGlvblN0YXRlIH0gZnJvbSAnQGlnbzIvY29yZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2lnby1sYXllci1pdGVtJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vbGF5ZXItaXRlbS5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vbGF5ZXItaXRlbS5jb21wb25lbnQuc2NzcyddLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBMYXllckl0ZW1Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcbiAgc2hvd0xlZ2VuZCQ6IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPiA9IG5ldyBCZWhhdmlvclN1YmplY3QodHJ1ZSk7XHJcblxyXG4gIGluUmVzb2x1dGlvblJhbmdlJDogQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IEJlaGF2aW9yU3ViamVjdCh0cnVlKTtcclxuXHJcbiAgcXVlcnlCYWRnZUhpZGRlbiQ6IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPiA9IG5ldyBCZWhhdmlvclN1YmplY3QodHJ1ZSk7XHJcblxyXG4gIHRvb2x0aXBUZXh0OiBzdHJpbmc7XHJcblxyXG4gIHN0YXRlOiBDb25uZWN0aW9uU3RhdGU7XHJcblxyXG4gIHByaXZhdGUgcmVzb2x1dGlvbiQkOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIEBJbnB1dCgpIGxheWVyOiBMYXllcjtcclxuXHJcbiAgQElucHV0KCkgdG9nZ2xlTGVnZW5kT25WaXNpYmlsaXR5Q2hhbmdlOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIEBJbnB1dCgpIGV4cGFuZExlZ2VuZElmVmlzaWJsZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICBASW5wdXQoKSB1cGRhdGVMZWdlbmRPblJlc29sdXRpb25DaGFuZ2U6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgQElucHV0KCkgb3JkZXJhYmxlOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgQElucHV0KCkgbG93ZXJEaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICBASW5wdXQoKSByYWlzZURpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIEBJbnB1dCgpIHF1ZXJ5QmFkZ2U6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgZ2V0IHJlbW92YWJsZSgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLmxheWVyLm9wdGlvbnMucmVtb3ZhYmxlICE9PSBmYWxzZTtcclxuICB9XHJcblxyXG4gIGdldCBvcGFjaXR5KCkge1xyXG4gICAgcmV0dXJuIHRoaXMubGF5ZXIub3BhY2l0eSAqIDEwMDtcclxuICB9XHJcbiAgc2V0IG9wYWNpdHkob3BhY2l0eTogbnVtYmVyKSB7XHJcbiAgICB0aGlzLmxheWVyLm9wYWNpdHkgPSBvcGFjaXR5IC8gMTAwO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBuZXR3b3JrU2VydmljZTogTmV0d29ya1NlcnZpY2UpIHt9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgaWYgKFxyXG4gICAgICB0aGlzLmxheWVyLnZpc2libGUgJiZcclxuICAgICAgdGhpcy5leHBhbmRMZWdlbmRJZlZpc2libGUgJiZcclxuICAgICAgdGhpcy5sYXllci5maXJzdExvYWRDb21wb25lbnQgPT09IHRydWVcclxuICAgICkge1xyXG4gICAgICB0aGlzLmxheWVyLmZpcnN0TG9hZENvbXBvbmVudCA9IGZhbHNlO1xyXG4gICAgICB0aGlzLmxheWVyLmxlZ2VuZENvbGxhcHNlZCA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgdGhpcy50b2dnbGVMZWdlbmQodGhpcy5sYXllci5sZWdlbmRDb2xsYXBzZWQpO1xyXG4gICAgdGhpcy51cGRhdGVRdWVyeUJhZGdlKCk7XHJcblxyXG4gICAgY29uc3QgcmVzb2x1dGlvbiQgPSB0aGlzLmxheWVyLm1hcC52aWV3Q29udHJvbGxlci5yZXNvbHV0aW9uJDtcclxuICAgIHRoaXMucmVzb2x1dGlvbiQkID0gcmVzb2x1dGlvbiQuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgdGhpcy5vblJlc29sdXRpb25DaGFuZ2UoKTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy50b29sdGlwVGV4dCA9IHRoaXMuY29tcHV0ZVRvb2x0aXAoKTtcclxuXHJcbiAgICB0aGlzLm5ldHdvcmtTZXJ2aWNlLmN1cnJlbnRTdGF0ZSgpLnN1YnNjcmliZSgoc3RhdGU6IENvbm5lY3Rpb25TdGF0ZSkgPT4ge1xyXG4gICAgICB0aGlzLnN0YXRlID0gc3RhdGU7XHJcbiAgICAgIHRoaXMub25SZXNvbHV0aW9uQ2hhbmdlKCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgdGhpcy5yZXNvbHV0aW9uJCQudW5zdWJzY3JpYmUoKTtcclxuICB9XHJcblxyXG4gIHRvZ2dsZUxlZ2VuZChjb2xsYXBzZWQ6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMubGF5ZXIubGVnZW5kQ29sbGFwc2VkID0gY29sbGFwc2VkO1xyXG4gICAgdGhpcy5zaG93TGVnZW5kJC5uZXh0KCFjb2xsYXBzZWQpO1xyXG4gIH1cclxuXHJcbiAgdG9nZ2xlTGVnZW5kT25DbGljaygpIHtcclxuICAgIHRoaXMudG9nZ2xlTGVnZW5kKHRoaXMuc2hvd0xlZ2VuZCQudmFsdWUpO1xyXG4gIH1cclxuXHJcbiAgdG9nZ2xlVmlzaWJpbGl0eSgpIHtcclxuICAgIHRoaXMubGF5ZXIudmlzaWJsZSA9ICF0aGlzLmxheWVyLnZpc2libGU7XHJcbiAgICBpZiAodGhpcy50b2dnbGVMZWdlbmRPblZpc2liaWxpdHlDaGFuZ2UpIHtcclxuICAgICAgdGhpcy50b2dnbGVMZWdlbmQoIXRoaXMubGF5ZXIudmlzaWJsZSk7XHJcbiAgICB9XHJcbiAgICB0aGlzLnVwZGF0ZVF1ZXJ5QmFkZ2UoKTtcclxuICB9XHJcblxyXG4gIGNvbXB1dGVUb29sdGlwKCk6IHN0cmluZyB7XHJcbiAgICBjb25zdCBsYXllck9wdGlvbnMgPSB0aGlzLmxheWVyLm9wdGlvbnM7XHJcbiAgICBpZiAoIWxheWVyT3B0aW9ucy50b29sdGlwKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmxheWVyLnRpdGxlO1xyXG4gICAgfVxyXG4gICAgY29uc3QgbGF5ZXJUb29sdGlwID0gbGF5ZXJPcHRpb25zLnRvb2x0aXA7XHJcbiAgICBjb25zdCBsYXllck1ldGFkYXRhID0gKGxheWVyT3B0aW9ucyBhcyBNZXRhZGF0YUxheWVyT3B0aW9ucykubWV0YWRhdGE7XHJcbiAgICBzd2l0Y2ggKGxheWVyT3B0aW9ucy50b29sdGlwLnR5cGUpIHtcclxuICAgICAgY2FzZSBUb29sdGlwVHlwZS5USVRMRTpcclxuICAgICAgICByZXR1cm4gdGhpcy5sYXllci50aXRsZTtcclxuICAgICAgY2FzZSBUb29sdGlwVHlwZS5BQlNUUkFDVDpcclxuICAgICAgICBpZiAobGF5ZXJNZXRhZGF0YSAmJiBsYXllck1ldGFkYXRhLmFic3RyYWN0KSB7XHJcbiAgICAgICAgICByZXR1cm4gbGF5ZXJNZXRhZGF0YS5hYnN0cmFjdDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcmV0dXJuIHRoaXMubGF5ZXIudGl0bGU7XHJcbiAgICAgICAgfVxyXG4gICAgICBjYXNlIFRvb2x0aXBUeXBlLkNVU1RPTTpcclxuICAgICAgICBpZiAobGF5ZXJUb29sdGlwICYmIGxheWVyVG9vbHRpcC50ZXh0KSB7XHJcbiAgICAgICAgICByZXR1cm4gbGF5ZXJUb29sdGlwLnRleHQ7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHJldHVybiB0aGlzLmxheWVyLnRpdGxlO1xyXG4gICAgICAgIH1cclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICByZXR1cm4gdGhpcy5sYXllci50aXRsZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgb25SZXNvbHV0aW9uQ2hhbmdlKCkge1xyXG4gICAgY29uc3QgaW5SZXNvbHV0aW9uUmFuZ2UgPSB0aGlzLmxheWVyLmlzSW5SZXNvbHV0aW9uc1JhbmdlO1xyXG4gICAgaWYgKFxyXG4gICAgICBpblJlc29sdXRpb25SYW5nZSA9PT0gZmFsc2UgJiZcclxuICAgICAgdGhpcy51cGRhdGVMZWdlbmRPblJlc29sdXRpb25DaGFuZ2UgPT09IHRydWVcclxuICAgICkge1xyXG4gICAgICB0aGlzLnRvZ2dsZUxlZ2VuZCh0cnVlKTtcclxuICAgIH1cclxuICAgIHRoaXMuaW5SZXNvbHV0aW9uUmFuZ2UkLm5leHQoaW5SZXNvbHV0aW9uUmFuZ2UpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSB1cGRhdGVRdWVyeUJhZGdlKCkge1xyXG4gICAgY29uc3QgaGlkZGVuID1cclxuICAgICAgdGhpcy5xdWVyeUJhZGdlID09PSBmYWxzZSB8fFxyXG4gICAgICB0aGlzLmxheWVyLnZpc2libGUgPT09IGZhbHNlIHx8XHJcbiAgICAgICFsYXllcklzUXVlcnlhYmxlKHRoaXMubGF5ZXIpO1xyXG4gICAgdGhpcy5xdWVyeUJhZGdlSGlkZGVuJC5uZXh0KGhpZGRlbik7XHJcbiAgfVxyXG59XHJcbiJdfQ==
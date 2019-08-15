/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { layerIsQueryable } from '../../query/shared/query.utils';
import { Layer, TooltipType } from '../shared/layers';
var LayerItemComponent = /** @class */ (function () {
    function LayerItemComponent() {
        this.showLegend$ = new BehaviorSubject(false);
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
    Object.defineProperty(LayerItemComponent.prototype, "removable", {
        get: /**
         * @return {?}
         */
        function () { return this.layer.options.removable !== false; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayerItemComponent.prototype, "opacity", {
        get: /**
         * @return {?}
         */
        function () { return this.layer.opacity * 100; },
        set: /**
         * @param {?} opacity
         * @return {?}
         */
        function (opacity) { this.layer.opacity = opacity / 100; },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    LayerItemComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var legend = this.layer.dataSource.options.legend || {};
        /** @type {?} */
        var legendCollapsed = legend.collapsed === false ? false : true;
        if (this.layer.visible && this.expandLegendIfVisible) {
            legendCollapsed = false;
        }
        this.toggleLegend(legendCollapsed);
        this.updateQueryBadge();
        /** @type {?} */
        var resolution$ = this.layer.map.viewController.resolution$;
        this.resolution$$ = resolution$.subscribe((/**
         * @return {?}
         */
        function () {
            _this.onResolutionChange();
        }));
        this.tooltipText = this.computeTooltip();
    };
    /**
     * @return {?}
     */
    LayerItemComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.resolution$$.unsubscribe();
    };
    /**
     * @param {?} collapsed
     * @return {?}
     */
    LayerItemComponent.prototype.toggleLegend = /**
     * @param {?} collapsed
     * @return {?}
     */
    function (collapsed) {
        this.showLegend$.next(!collapsed);
    };
    /**
     * @return {?}
     */
    LayerItemComponent.prototype.toggleVisibility = /**
     * @return {?}
     */
    function () {
        this.layer.visible = !this.layer.visible;
        if (this.toggleLegendOnVisibilityChange) {
            this.toggleLegend(!this.layer.visible);
        }
        this.updateQueryBadge();
    };
    /**
     * @return {?}
     */
    LayerItemComponent.prototype.computeTooltip = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var layerOptions = this.layer.options;
        if (!layerOptions.tooltip) {
            return this.layer.title;
        }
        /** @type {?} */
        var layerTooltip = layerOptions.tooltip;
        /** @type {?} */
        var layerMetadata = ((/** @type {?} */ (layerOptions))).metadata;
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
    };
    /**
     * @private
     * @return {?}
     */
    LayerItemComponent.prototype.onResolutionChange = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var inResolutionRange = this.layer.isInResolutionsRange;
        if (inResolutionRange === false && this.updateLegendOnResolutionChange === true) {
            this.toggleLegend(true);
        }
        this.inResolutionRange$.next(inResolutionRange);
    };
    /**
     * @private
     * @return {?}
     */
    LayerItemComponent.prototype.updateQueryBadge = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var hidden = this.queryBadge === false ||
            this.layer.visible === false ||
            !layerIsQueryable(this.layer);
        this.queryBadgeHidden$.next(hidden);
    };
    LayerItemComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-layer-item',
                    template: "<mat-list-item>\r\n  <mat-icon\r\n    class=\"igo-chevron\"\r\n    mat-list-avatar\r\n    igoCollapse\r\n    [target]=\"legend\"\r\n    [collapsed]=\"!(showLegend$ | async)\"\r\n    (toggle)=\"toggleLegend($event)\"\r\n    svgIcon=\"chevron-up\" >\r\n  </mat-icon>\r\n  <h4 matLine [matTooltip]=\"tooltipText\" matTooltipShowDelay=\"500\">{{layer.title}}</h4>\r\n\r\n  <button\r\n    mat-icon-button\r\n    [color]=\"layer.visible ? 'primary' : 'default'\"\r\n    collapsibleButton\r\n    tooltip-position=\"below\"\r\n    matTooltipShowDelay=\"500\"\r\n    [matTooltip]=\"layer.visible ?\r\n                  ('igo.geo.layer.hideLayer' | translate) :\r\n                  ('igo.geo.layer.showLayer' | translate)\"\r\n    (click)=\"toggleVisibility()\">\r\n    <mat-icon\r\n      matBadge=\"?\"\r\n      matBadgeColor=\"accent\"\r\n      matBadgeSize=\"small\"\r\n      matBadgePosition=\"after\"\r\n      [matBadgeHidden]=\"queryBadgeHidden$ | async\"\r\n      [ngClass]=\"{disabled: !(inResolutionRange$ | async)}\"\r\n      [svgIcon]=\"layer.visible ? 'eye' : 'eye-off'\">\r\n    </mat-icon>\r\n  </button>\r\n\r\n  <button\r\n    mat-icon-button\r\n    color=\"primary\"\r\n    igoCollapse\r\n    [target]=\"actions\"\r\n    [collapsed]=\"true\">\r\n    <mat-icon svgIcon=\"dots-horizontal\"></mat-icon>\r\n  </button>\r\n</mat-list-item>\r\n\r\n<div #actions class=\"igo-layer-actions-container\">\r\n  <div class=\"igo-col igo-col-100 igo-col-100-m\">\r\n    <mat-slider\r\n      id=\"opacity-slider\"\r\n      thumbLabel\r\n      tickInterval=\"5\"\r\n      step=\"5\"\r\n      [min]=\"0\"\r\n      [max]=\"100\"\r\n      [(ngModel)]=\"opacity\"\r\n      [matTooltip]=\"'igo.geo.layer.opacity' | translate\"\r\n      matTooltipShowDelay=\"500\"\r\n      tooltip-position=\"below\">\r\n    </mat-slider>\r\n  </div>\r\n\r\n  <div class=\"igo-col igo-col-100 igo-col-100-m\">\r\n    <div class=\"igo-layer-button-group\">\r\n      <button\r\n        color=\"primary\"\r\n        mat-icon-button\r\n        tooltip-position=\"below\"\r\n        matTooltipShowDelay=\"500\"\r\n        [matTooltip]=\"'igo.geo.layer.raiseLayer' | translate\"\r\n        [disabled]=\"!orderable || raiseDisabled\"\r\n        (click)=\"layer.map.raiseLayer(layer)\">\r\n        <mat-icon svgIcon=\"arrow-up\"></mat-icon>\r\n      </button>\r\n\r\n      <button\r\n        mat-icon-button\r\n        color=\"primary\"\r\n        tooltip-position=\"below\"\r\n        matTooltipShowDelay=\"500\"\r\n        [matTooltip]=\"'igo.geo.layer.lowerLayer' | translate\"\r\n        [disabled]=\"!orderable || lowerDisabled\"\r\n        (click)=\"layer.map.lowerLayer(layer)\">\r\n        <mat-icon svgIcon=\"arrow-down\"></mat-icon>\r\n      </button>\r\n\r\n      <button\r\n        *ngIf=\"removable === true\"\r\n        mat-icon-button\r\n        color=\"warn\"\r\n        tooltip-position=\"below\"\r\n        matTooltipShowDelay=\"500\"\r\n        [matTooltip]=\"'igo.geo.layer.removeLayer' | translate\"\r\n        (click)=\"layer.map.removeLayer(layer)\">\r\n        <mat-icon svgIcon=\"delete\"></mat-icon>\r\n      </button>\r\n      <ng-content select=\"[igoLayerItemToolbar]\"></ng-content>\r\n\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n<div #legend class=\"igo-layer-legend-container\">\r\n  <igo-layer-legend\r\n    *ngIf=\"showLegend$ | async\"\r\n    [layer]=\"layer\"\r\n    [updateLegendOnResolutionChange]=\"updateLegendOnResolutionChange\">\r\n  </igo-layer-legend>\r\n</div>\r\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [":host{overflow:hidden}.igo-layer-actions-container{width:100%;display:inline-block}.igo-layer-actions-container>div{text-align:center}.igo-layer-legend-container{padding-left:18px;width:calc(100% - 18px);display:inline-block}#opacity-slider{width:100%}.igo-layer-button-group{float:right;padding:0 3px}@media only screen and (max-width:450px),only screen and (max-height:450px){#opacity-slider{width:70%}.igo-layer-button-group{float:none}}mat-icon.disabled{color:rgba(0,0,0,.38)}.mat-badge-small .mat-badge-content{font-size:12px}"]
                }] }
    ];
    /** @nocollapse */
    LayerItemComponent.ctorParameters = function () { return []; };
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
    return LayerItemComponent;
}());
export { LayerItemComponent };
if (false) {
    /** @type {?} */
    LayerItemComponent.prototype.showLegend$;
    /** @type {?} */
    LayerItemComponent.prototype.inResolutionRange$;
    /** @type {?} */
    LayerItemComponent.prototype.queryBadgeHidden$;
    /** @type {?} */
    LayerItemComponent.prototype.tooltipText;
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
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5ZXItaXRlbS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvbGF5ZXIvbGF5ZXItaXRlbS9sYXllci1pdGVtLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBR0wsdUJBQXVCLEVBQ3hCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBZ0IsZUFBZSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBR3JELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ2xFLE9BQU8sRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFFdEQ7SUF1Q0U7UUEvQkEsZ0JBQVcsR0FBNkIsSUFBSSxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFbkUsdUJBQWtCLEdBQTZCLElBQUksZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXpFLHNCQUFpQixHQUE2QixJQUFJLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQVEvRCxtQ0FBOEIsR0FBWSxLQUFLLENBQUM7UUFFaEQsMEJBQXFCLEdBQVksS0FBSyxDQUFDO1FBRXZDLG1DQUE4QixHQUFZLEtBQUssQ0FBQztRQUVoRCxjQUFTLEdBQVksSUFBSSxDQUFDO1FBRTFCLGtCQUFhLEdBQVksS0FBSyxDQUFDO1FBRS9CLGtCQUFhLEdBQVksS0FBSyxDQUFDO1FBRS9CLGVBQVUsR0FBWSxLQUFLLENBQUM7SUFPdEIsQ0FBQztJQUxoQixzQkFBSSx5Q0FBUzs7OztRQUFiLGNBQTJCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsU0FBUyxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUM7OztPQUFBO0lBRTNFLHNCQUFJLHVDQUFPOzs7O1FBQVgsY0FBZ0IsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxHQUFH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QXFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgSW5wdXQsXHJcbiAgT25Jbml0LFxyXG4gIE9uRGVzdHJveSxcclxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneVxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24sIEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IHsgTWV0YWRhdGFMYXllck9wdGlvbnMgfSBmcm9tICcuLi8uLi9tZXRhZGF0YS9zaGFyZWQvbWV0YWRhdGEuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgbGF5ZXJJc1F1ZXJ5YWJsZSB9IGZyb20gJy4uLy4uL3F1ZXJ5L3NoYXJlZC9xdWVyeS51dGlscyc7XHJcbmltcG9ydCB7IExheWVyLCBUb29sdGlwVHlwZSB9IGZyb20gJy4uL3NoYXJlZC9sYXllcnMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdpZ28tbGF5ZXItaXRlbScsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2xheWVyLWl0ZW0uY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2xheWVyLWl0ZW0uY29tcG9uZW50LnNjc3MnXSxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTGF5ZXJJdGVtQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG5cclxuICBzaG93TGVnZW5kJDogQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IEJlaGF2aW9yU3ViamVjdChmYWxzZSk7XHJcblxyXG4gIGluUmVzb2x1dGlvblJhbmdlJDogQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IEJlaGF2aW9yU3ViamVjdCh0cnVlKTtcclxuXHJcbiAgcXVlcnlCYWRnZUhpZGRlbiQ6IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPiA9IG5ldyBCZWhhdmlvclN1YmplY3QodHJ1ZSk7XHJcblxyXG4gIHRvb2x0aXBUZXh0OiBzdHJpbmc7XHJcblxyXG4gIHByaXZhdGUgcmVzb2x1dGlvbiQkOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIEBJbnB1dCgpIGxheWVyOiBMYXllcjtcclxuXHJcbiAgQElucHV0KCkgdG9nZ2xlTGVnZW5kT25WaXNpYmlsaXR5Q2hhbmdlOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIEBJbnB1dCgpIGV4cGFuZExlZ2VuZElmVmlzaWJsZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICBASW5wdXQoKSB1cGRhdGVMZWdlbmRPblJlc29sdXRpb25DaGFuZ2U6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgQElucHV0KCkgb3JkZXJhYmxlOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgQElucHV0KCkgbG93ZXJEaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICBASW5wdXQoKSByYWlzZURpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIEBJbnB1dCgpIHF1ZXJ5QmFkZ2U6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgZ2V0IHJlbW92YWJsZSgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMubGF5ZXIub3B0aW9ucy5yZW1vdmFibGUgIT09IGZhbHNlOyB9XHJcblxyXG4gIGdldCBvcGFjaXR5KCkgeyByZXR1cm4gdGhpcy5sYXllci5vcGFjaXR5ICogMTAwOyB9XHJcbiAgc2V0IG9wYWNpdHkob3BhY2l0eTogbnVtYmVyKSB7IHRoaXMubGF5ZXIub3BhY2l0eSA9IG9wYWNpdHkgLyAxMDA7IH1cclxuXHJcbiAgY29uc3RydWN0b3IoKSB7fVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIGNvbnN0IGxlZ2VuZCA9IHRoaXMubGF5ZXIuZGF0YVNvdXJjZS5vcHRpb25zLmxlZ2VuZCB8fCB7fTtcclxuICAgIGxldCBsZWdlbmRDb2xsYXBzZWQgPSBsZWdlbmQuY29sbGFwc2VkID09PSBmYWxzZSA/IGZhbHNlIDogdHJ1ZTtcclxuICAgIGlmICh0aGlzLmxheWVyLnZpc2libGUgJiYgdGhpcy5leHBhbmRMZWdlbmRJZlZpc2libGUpIHtcclxuICAgICAgbGVnZW5kQ29sbGFwc2VkID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICB0aGlzLnRvZ2dsZUxlZ2VuZChsZWdlbmRDb2xsYXBzZWQpO1xyXG4gICAgdGhpcy51cGRhdGVRdWVyeUJhZGdlKCk7XHJcblxyXG4gICAgY29uc3QgcmVzb2x1dGlvbiQgPSB0aGlzLmxheWVyLm1hcC52aWV3Q29udHJvbGxlci5yZXNvbHV0aW9uJDtcclxuICAgIHRoaXMucmVzb2x1dGlvbiQkID0gcmVzb2x1dGlvbiQuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgdGhpcy5vblJlc29sdXRpb25DaGFuZ2UoKTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy50b29sdGlwVGV4dCA9IHRoaXMuY29tcHV0ZVRvb2x0aXAoKTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgdGhpcy5yZXNvbHV0aW9uJCQudW5zdWJzY3JpYmUoKTtcclxuICB9XHJcblxyXG4gIHRvZ2dsZUxlZ2VuZChjb2xsYXBzZWQ6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMuc2hvd0xlZ2VuZCQubmV4dCghY29sbGFwc2VkKTtcclxuICB9XHJcblxyXG4gIHRvZ2dsZVZpc2liaWxpdHkoKSB7XHJcbiAgICB0aGlzLmxheWVyLnZpc2libGUgPSAhdGhpcy5sYXllci52aXNpYmxlO1xyXG4gICAgaWYgKHRoaXMudG9nZ2xlTGVnZW5kT25WaXNpYmlsaXR5Q2hhbmdlKSB7XHJcbiAgICAgIHRoaXMudG9nZ2xlTGVnZW5kKCF0aGlzLmxheWVyLnZpc2libGUpO1xyXG4gICAgfVxyXG4gICAgdGhpcy51cGRhdGVRdWVyeUJhZGdlKCk7XHJcbiAgfVxyXG5cclxuICBjb21wdXRlVG9vbHRpcCgpOiBzdHJpbmcge1xyXG4gICAgY29uc3QgbGF5ZXJPcHRpb25zID0gdGhpcy5sYXllci5vcHRpb25zO1xyXG4gICAgaWYgKCFsYXllck9wdGlvbnMudG9vbHRpcCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5sYXllci50aXRsZTtcclxuICAgIH1cclxuICAgIGNvbnN0IGxheWVyVG9vbHRpcCA9IGxheWVyT3B0aW9ucy50b29sdGlwO1xyXG4gICAgY29uc3QgbGF5ZXJNZXRhZGF0YSA9IChsYXllck9wdGlvbnMgYXMgTWV0YWRhdGFMYXllck9wdGlvbnMpLm1ldGFkYXRhO1xyXG4gICAgc3dpdGNoIChsYXllck9wdGlvbnMudG9vbHRpcC50eXBlKSB7XHJcbiAgICAgIGNhc2UgVG9vbHRpcFR5cGUuVElUTEU6XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubGF5ZXIudGl0bGU7XHJcbiAgICAgIGNhc2UgVG9vbHRpcFR5cGUuQUJTVFJBQ1Q6XHJcbiAgICAgICAgaWYgKGxheWVyTWV0YWRhdGEgJiYgbGF5ZXJNZXRhZGF0YS5hYnN0cmFjdCkge1xyXG4gICAgICAgICAgcmV0dXJuIGxheWVyTWV0YWRhdGEuYWJzdHJhY3Q7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHJldHVybiB0aGlzLmxheWVyLnRpdGxlO1xyXG4gICAgICAgIH1cclxuICAgICAgY2FzZSBUb29sdGlwVHlwZS5DVVNUT006XHJcbiAgICAgICAgaWYgKGxheWVyVG9vbHRpcCAmJiBsYXllclRvb2x0aXAudGV4dCkge1xyXG4gICAgICAgICAgcmV0dXJuIGxheWVyVG9vbHRpcC50ZXh0O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICByZXR1cm4gdGhpcy5sYXllci50aXRsZTtcclxuICAgICAgICB9XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubGF5ZXIudGl0bGU7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG9uUmVzb2x1dGlvbkNoYW5nZSgpIHtcclxuICAgIGNvbnN0IGluUmVzb2x1dGlvblJhbmdlID0gdGhpcy5sYXllci5pc0luUmVzb2x1dGlvbnNSYW5nZTtcclxuICAgIGlmIChpblJlc29sdXRpb25SYW5nZSA9PT0gZmFsc2UgJiYgdGhpcy51cGRhdGVMZWdlbmRPblJlc29sdXRpb25DaGFuZ2UgPT09IHRydWUpIHtcclxuICAgICAgdGhpcy50b2dnbGVMZWdlbmQodHJ1ZSk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmluUmVzb2x1dGlvblJhbmdlJC5uZXh0KGluUmVzb2x1dGlvblJhbmdlKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgdXBkYXRlUXVlcnlCYWRnZSgpIHtcclxuICAgIGNvbnN0IGhpZGRlbiA9IHRoaXMucXVlcnlCYWRnZSA9PT0gZmFsc2UgfHxcclxuICAgICAgdGhpcy5sYXllci52aXNpYmxlID09PSBmYWxzZSB8fFxyXG4gICAgICAhbGF5ZXJJc1F1ZXJ5YWJsZSh0aGlzLmxheWVyKTtcclxuICAgIHRoaXMucXVlcnlCYWRnZUhpZGRlbiQubmV4dChoaWRkZW4pO1xyXG4gIH1cclxufVxyXG4iXX0=
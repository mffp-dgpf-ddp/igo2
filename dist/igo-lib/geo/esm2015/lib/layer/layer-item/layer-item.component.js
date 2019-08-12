/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { layerIsQueryable } from '../../query/shared/query.utils';
import { Layer, TooltipType } from '../shared/layers';
export class LayerItemComponent {
    /**
     * @param {?} cdRef
     */
    constructor(cdRef) {
        this.cdRef = cdRef;
        this.showLegend$ = new BehaviorSubject(false);
        this.inResolutionRange$ = new BehaviorSubject(true);
        this.queryBadgeHidden$ = new BehaviorSubject(true);
        this.toggleLegendOnVisibilityChange = false;
        this.expandLegendIfVisible = false;
        this.updateLegendOnResolutionChange = false;
        this.orderable = true;
        this.queryBadge = false;
    }
    /**
     * @return {?}
     */
    get removable() { return this.layer.options.removable !== false; }
    /**
     * @return {?}
     */
    get opacity() { return this.layer.opacity * 100; }
    /**
     * @param {?} opacity
     * @return {?}
     */
    set opacity(opacity) { this.layer.opacity = opacity / 100; }
    /**
     * @return {?}
     */
    ngOnInit() {
        /** @type {?} */
        const legend = this.layer.dataSource.options.legend || {};
        /** @type {?} */
        let legendCollapsed = legend.collapsed === false ? false : true;
        if (this.layer.visible && this.expandLegendIfVisible) {
            legendCollapsed = false;
        }
        this.toggleLegend(legendCollapsed);
        this.updateQueryBadge();
        /** @type {?} */
        const resolution$ = this.layer.map.viewController.resolution$;
        this.resolution$$ = resolution$.subscribe((/**
         * @param {?} resolution
         * @return {?}
         */
        (resolution) => {
            this.onResolutionChange(resolution);
        }));
        this.tooltipText = this.computeTooltip();
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
        this.showLegend$.next(!collapsed);
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
     * @param {?} resolution
     * @return {?}
     */
    onResolutionChange(resolution) {
        /** @type {?} */
        const inResolutionRange = this.layer.isInResolutionsRange;
        if (inResolutionRange === false && this.updateLegendOnResolutionChange === true) {
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
                template: "<mat-list-item>\r\n  <mat-icon\r\n    class=\"igo-chevron\"\r\n    mat-list-avatar\r\n    igoCollapse\r\n    [target]=\"legend\"\r\n    [collapsed]=\"!(showLegend$ | async)\"\r\n    (toggle)=\"toggleLegend($event)\"\r\n    svgIcon=\"chevron-up\" >\r\n  </mat-icon>\r\n  <h4 matLine [matTooltip]=\"tooltipText\" matTooltipShowDelay=\"500\">{{layer.title}}</h4>\r\n\r\n  <button\r\n    mat-icon-button\r\n    [color]=\"layer.visible ? 'primary' : 'default'\"\r\n    collapsibleButton\r\n    tooltip-position=\"below\"\r\n    matTooltipShowDelay=\"500\"\r\n    [matTooltip]=\"layer.visible ?\r\n                  ('igo.geo.layer.hideLayer' | translate) :\r\n                  ('igo.geo.layer.showLayer' | translate)\"\r\n    (click)=\"toggleVisibility()\">\r\n    <mat-icon\r\n      matBadge=\"?\"\r\n      matBadgeColor=\"accent\"\r\n      matBadgeSize=\"small\"\r\n      matBadgePosition=\"after\"\r\n      [matBadgeHidden]=\"queryBadgeHidden$ | async\"\r\n      [ngClass]=\"{disabled: !(inResolutionRange$ | async)}\"\r\n      [svgIcon]=\"layer.visible ? 'eye' : 'eye-off'\">\r\n    </mat-icon>\r\n  </button>\r\n\r\n  <button\r\n    mat-icon-button\r\n    color=\"primary\"\r\n    igoCollapse\r\n    [target]=\"actions\"\r\n    [collapsed]=\"true\">\r\n    <mat-icon svgIcon=\"dots-horizontal\"></mat-icon>\r\n  </button>\r\n</mat-list-item>\r\n\r\n<div #actions class=\"igo-layer-actions-container\">\r\n  <div class=\"igo-col igo-col-100 igo-col-100-m\">\r\n    <mat-slider\r\n      id=\"opacity-slider\"\r\n      thumbLabel\r\n      tickInterval=\"5\"\r\n      step=\"5\"\r\n      [min]=\"0\"\r\n      [max]=\"100\"\r\n      [(ngModel)]=\"opacity\"\r\n      [matTooltip]=\"'igo.geo.layer.opacity' | translate\"\r\n      matTooltipShowDelay=\"500\"\r\n      tooltip-position=\"below\">\r\n    </mat-slider>\r\n  </div>\r\n\r\n  <div class=\"igo-col igo-col-100 igo-col-100-m\">\r\n    <div class=\"igo-layer-button-group\">\r\n      <button\r\n        color=\"primary\"\r\n        mat-icon-button\r\n        tooltip-position=\"below\"\r\n        matTooltipShowDelay=\"500\"\r\n        [matTooltip]=\"'igo.geo.layer.raiseLayer' | translate\"\r\n        [disabled]=\"!orderable\"\r\n        (click)=\"layer.map.raiseLayer(layer)\">\r\n        <mat-icon svgIcon=\"arrow-up\"></mat-icon>\r\n      </button>\r\n\r\n      <button\r\n        mat-icon-button\r\n        color=\"primary\"\r\n        tooltip-position=\"below\"\r\n        matTooltipShowDelay=\"500\"\r\n        [matTooltip]=\"'igo.geo.layer.lowerLayer' | translate\"\r\n        [disabled]=\"!orderable\"\r\n        (click)=\"layer.map.lowerLayer(layer)\">\r\n        <mat-icon svgIcon=\"arrow-down\"></mat-icon>\r\n      </button>\r\n\r\n      <button\r\n        *ngIf=\"removable === true\"\r\n        mat-icon-button\r\n        color=\"warn\"\r\n        tooltip-position=\"below\"\r\n        matTooltipShowDelay=\"500\"\r\n        [matTooltip]=\"'igo.geo.layer.removeLayer' | translate\"\r\n        (click)=\"layer.map.removeLayer(layer)\">\r\n        <mat-icon svgIcon=\"delete\"></mat-icon>\r\n      </button>\r\n      <ng-content select=\"[igoLayerItemToolbar]\"></ng-content>\r\n\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n<div #legend class=\"igo-layer-legend-container\">\r\n  <igo-layer-legend\r\n    *ngIf=\"showLegend$ | async\"\r\n    [layer]=\"layer\"\r\n    [updateLegendOnResolutionChange]=\"updateLegendOnResolutionChange\">\r\n  </igo-layer-legend>\r\n</div>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{overflow:hidden}.igo-layer-actions-container{width:100%;display:inline-block}.igo-layer-actions-container>div{text-align:center}.igo-layer-legend-container{padding-left:18px;width:calc(100% - 18px);display:inline-block}#opacity-slider{width:100%}.igo-layer-button-group{float:right;padding:0 3px}@media only screen and (max-width:450px),only screen and (max-height:450px){#opacity-slider{width:70%}.igo-layer-button-group{float:none}}mat-icon.disabled{color:rgba(0,0,0,.38)}.mat-badge-small .mat-badge-content{font-size:12px}"]
            }] }
];
/** @nocollapse */
LayerItemComponent.ctorParameters = () => [
    { type: ChangeDetectorRef }
];
LayerItemComponent.propDecorators = {
    layer: [{ type: Input }],
    toggleLegendOnVisibilityChange: [{ type: Input }],
    expandLegendIfVisible: [{ type: Input }],
    updateLegendOnResolutionChange: [{ type: Input }],
    orderable: [{ type: Input }],
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
    LayerItemComponent.prototype.queryBadge;
    /**
     * @type {?}
     * @private
     */
    LayerItemComponent.prototype.cdRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5ZXItaXRlbS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvbGF5ZXIvbGF5ZXItaXRlbS9sYXllci1pdGVtLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBR0wsaUJBQWlCLEVBQ2pCLHVCQUF1QixFQUN4QixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQWdCLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUdyRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNsRSxPQUFPLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBUXRELE1BQU0sT0FBTyxrQkFBa0I7Ozs7SUE2QjdCLFlBQW9CLEtBQXdCO1FBQXhCLFVBQUssR0FBTCxLQUFLLENBQW1CO1FBM0I1QyxnQkFBVyxHQUE2QixJQUFJLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUVuRSx1QkFBa0IsR0FBNkIsSUFBSSxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFekUsc0JBQWlCLEdBQTZCLElBQUksZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBUS9ELG1DQUE4QixHQUFZLEtBQUssQ0FBQztRQUVoRCwwQkFBcUIsR0FBWSxLQUFLLENBQUM7UUFFdkMsbUNBQThCLEdBQVksS0FBSyxDQUFDO1FBRWhELGNBQVMsR0FBWSxJQUFJLENBQUM7UUFFMUIsZUFBVSxHQUFZLEtBQUssQ0FBQztJQU9VLENBQUM7Ozs7SUFMaEQsSUFBSSxTQUFTLEtBQWMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxTQUFTLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQzs7OztJQUUzRSxJQUFJLE9BQU8sS0FBSyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FB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Qzs7Ozs7O0lBRU8sa0JBQWtCLENBQUMsVUFBa0I7O2NBQ3JDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsb0JBQW9CO1FBQ3pELElBQUksaUJBQWlCLEtBQUssS0FBSyxJQUFJLElBQUksQ0FBQyw4QkFBOEIsS0FBSyxJQUFJLEVBQUU7WUFDL0UsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN6QjtRQUNELElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUNsRCxDQUFDOzs7OztJQUVPLGdCQUFnQjs7Y0FDaEIsTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLEtBQUssS0FBSztZQUN0QyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sS0FBSyxLQUFLO1lBQzVCLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUMvQixJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3RDLENBQUM7OztZQTdHRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGdCQUFnQjtnQkFDMUIsMjNHQUEwQztnQkFFMUMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2hEOzs7O1lBZEMsaUJBQWlCOzs7b0JBMkJoQixLQUFLOzZDQUVMLEtBQUs7b0NBRUwsS0FBSzs2Q0FFTCxLQUFLO3dCQUVMLEtBQUs7eUJBRUwsS0FBSzs7OztJQXBCTix5Q0FBbUU7O0lBRW5FLGdEQUF5RTs7SUFFekUsK0NBQXdFOztJQUV4RSx5Q0FBb0I7Ozs7O0lBRXBCLDBDQUFtQzs7SUFFbkMsbUNBQXNCOztJQUV0Qiw0REFBeUQ7O0lBRXpELG1EQUFnRDs7SUFFaEQsNERBQXlEOztJQUV6RCx1Q0FBbUM7O0lBRW5DLHdDQUFxQzs7Ozs7SUFPekIsbUNBQWdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgSW5wdXQsXHJcbiAgT25Jbml0LFxyXG4gIE9uRGVzdHJveSxcclxuICBDaGFuZ2VEZXRlY3RvclJlZixcclxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneVxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24sIEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IHsgTWV0YWRhdGFMYXllck9wdGlvbnMgfSBmcm9tICcuLi8uLi9tZXRhZGF0YS9zaGFyZWQvbWV0YWRhdGEuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgbGF5ZXJJc1F1ZXJ5YWJsZSB9IGZyb20gJy4uLy4uL3F1ZXJ5L3NoYXJlZC9xdWVyeS51dGlscyc7XHJcbmltcG9ydCB7IExheWVyLCBUb29sdGlwVHlwZSB9IGZyb20gJy4uL3NoYXJlZC9sYXllcnMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdpZ28tbGF5ZXItaXRlbScsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2xheWVyLWl0ZW0uY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2xheWVyLWl0ZW0uY29tcG9uZW50LnNjc3MnXSxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTGF5ZXJJdGVtQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG5cclxuICBzaG93TGVnZW5kJDogQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IEJlaGF2aW9yU3ViamVjdChmYWxzZSk7XHJcblxyXG4gIGluUmVzb2x1dGlvblJhbmdlJDogQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IEJlaGF2aW9yU3ViamVjdCh0cnVlKTtcclxuXHJcbiAgcXVlcnlCYWRnZUhpZGRlbiQ6IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPiA9IG5ldyBCZWhhdmlvclN1YmplY3QodHJ1ZSk7XHJcblxyXG4gIHRvb2x0aXBUZXh0OiBzdHJpbmc7XHJcblxyXG4gIHByaXZhdGUgcmVzb2x1dGlvbiQkOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIEBJbnB1dCgpIGxheWVyOiBMYXllcjtcclxuXHJcbiAgQElucHV0KCkgdG9nZ2xlTGVnZW5kT25WaXNpYmlsaXR5Q2hhbmdlOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIEBJbnB1dCgpIGV4cGFuZExlZ2VuZElmVmlzaWJsZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICBASW5wdXQoKSB1cGRhdGVMZWdlbmRPblJlc29sdXRpb25DaGFuZ2U6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgQElucHV0KCkgb3JkZXJhYmxlOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgQElucHV0KCkgcXVlcnlCYWRnZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICBnZXQgcmVtb3ZhYmxlKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5sYXllci5vcHRpb25zLnJlbW92YWJsZSAhPT0gZmFsc2U7IH1cclxuXHJcbiAgZ2V0IG9wYWNpdHkoKSB7IHJldHVybiB0aGlzLmxheWVyLm9wYWNpdHkgKiAxMDA7IH1cclxuICBzZXQgb3BhY2l0eShvcGFjaXR5OiBudW1iZXIpIHsgdGhpcy5sYXllci5vcGFjaXR5ID0gb3BhY2l0eSAvIDEwMDsgfVxyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNkUmVmOiBDaGFuZ2VEZXRlY3RvclJlZikge31cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICBjb25zdCBsZWdlbmQgPSB0aGlzLmxheWVyLmRhdGFTb3VyY2Uub3B0aW9ucy5sZWdlbmQgfHwge307XHJcbiAgICBsZXQgbGVnZW5kQ29sbGFwc2VkID0gbGVnZW5kLmNvbGxhcHNlZCA9PT0gZmFsc2UgPyBmYWxzZSA6IHRydWU7XHJcbiAgICBpZiAodGhpcy5sYXllci52aXNpYmxlICYmIHRoaXMuZXhwYW5kTGVnZW5kSWZWaXNpYmxlKSB7XHJcbiAgICAgIGxlZ2VuZENvbGxhcHNlZCA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgdGhpcy50b2dnbGVMZWdlbmQobGVnZW5kQ29sbGFwc2VkKTtcclxuICAgIHRoaXMudXBkYXRlUXVlcnlCYWRnZSgpO1xyXG5cclxuICAgIGNvbnN0IHJlc29sdXRpb24kID0gdGhpcy5sYXllci5tYXAudmlld0NvbnRyb2xsZXIucmVzb2x1dGlvbiQ7XHJcbiAgICB0aGlzLnJlc29sdXRpb24kJCA9IHJlc29sdXRpb24kLnN1YnNjcmliZSgocmVzb2x1dGlvbjogbnVtYmVyKSA9PiB7XHJcbiAgICAgIHRoaXMub25SZXNvbHV0aW9uQ2hhbmdlKHJlc29sdXRpb24pO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLnRvb2x0aXBUZXh0ID0gdGhpcy5jb21wdXRlVG9vbHRpcCgpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLnJlc29sdXRpb24kJC51bnN1YnNjcmliZSgpO1xyXG4gIH1cclxuXHJcbiAgdG9nZ2xlTGVnZW5kKGNvbGxhcHNlZDogYm9vbGVhbikge1xyXG4gICAgdGhpcy5zaG93TGVnZW5kJC5uZXh0KCFjb2xsYXBzZWQpO1xyXG4gIH1cclxuXHJcbiAgdG9nZ2xlVmlzaWJpbGl0eSgpIHtcclxuICAgIHRoaXMubGF5ZXIudmlzaWJsZSA9ICF0aGlzLmxheWVyLnZpc2libGU7XHJcbiAgICBpZiAodGhpcy50b2dnbGVMZWdlbmRPblZpc2liaWxpdHlDaGFuZ2UpIHtcclxuICAgICAgdGhpcy50b2dnbGVMZWdlbmQoIXRoaXMubGF5ZXIudmlzaWJsZSk7XHJcbiAgICB9XHJcbiAgICB0aGlzLnVwZGF0ZVF1ZXJ5QmFkZ2UoKTtcclxuICB9XHJcblxyXG4gIGNvbXB1dGVUb29sdGlwKCk6IHN0cmluZyB7XHJcbiAgICBjb25zdCBsYXllck9wdGlvbnMgPSB0aGlzLmxheWVyLm9wdGlvbnM7XHJcbiAgICBpZiAoIWxheWVyT3B0aW9ucy50b29sdGlwKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmxheWVyLnRpdGxlO1xyXG4gICAgfVxyXG4gICAgY29uc3QgbGF5ZXJUb29sdGlwID0gbGF5ZXJPcHRpb25zLnRvb2x0aXA7XHJcbiAgICBjb25zdCBsYXllck1ldGFkYXRhID0gKGxheWVyT3B0aW9ucyBhcyBNZXRhZGF0YUxheWVyT3B0aW9ucykubWV0YWRhdGE7XHJcbiAgICBzd2l0Y2ggKGxheWVyT3B0aW9ucy50b29sdGlwLnR5cGUpIHtcclxuICAgICAgY2FzZSBUb29sdGlwVHlwZS5USVRMRTpcclxuICAgICAgICByZXR1cm4gdGhpcy5sYXllci50aXRsZTtcclxuICAgICAgY2FzZSBUb29sdGlwVHlwZS5BQlNUUkFDVDpcclxuICAgICAgICBpZiAobGF5ZXJNZXRhZGF0YSAmJiBsYXllck1ldGFkYXRhLmFic3RyYWN0KSB7XHJcbiAgICAgICAgICByZXR1cm4gbGF5ZXJNZXRhZGF0YS5hYnN0cmFjdDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcmV0dXJuIHRoaXMubGF5ZXIudGl0bGU7XHJcbiAgICAgICAgfVxyXG4gICAgICBjYXNlIFRvb2x0aXBUeXBlLkNVU1RPTTpcclxuICAgICAgICBpZiAobGF5ZXJUb29sdGlwICYmIGxheWVyVG9vbHRpcC50ZXh0KSB7XHJcbiAgICAgICAgICByZXR1cm4gbGF5ZXJUb29sdGlwLnRleHQ7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHJldHVybiB0aGlzLmxheWVyLnRpdGxlO1xyXG4gICAgICAgIH1cclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICByZXR1cm4gdGhpcy5sYXllci50aXRsZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgb25SZXNvbHV0aW9uQ2hhbmdlKHJlc29sdXRpb246IG51bWJlcikge1xyXG4gICAgY29uc3QgaW5SZXNvbHV0aW9uUmFuZ2UgPSB0aGlzLmxheWVyLmlzSW5SZXNvbHV0aW9uc1JhbmdlO1xyXG4gICAgaWYgKGluUmVzb2x1dGlvblJhbmdlID09PSBmYWxzZSAmJiB0aGlzLnVwZGF0ZUxlZ2VuZE9uUmVzb2x1dGlvbkNoYW5nZSA9PT0gdHJ1ZSkge1xyXG4gICAgICB0aGlzLnRvZ2dsZUxlZ2VuZCh0cnVlKTtcclxuICAgIH1cclxuICAgIHRoaXMuaW5SZXNvbHV0aW9uUmFuZ2UkLm5leHQoaW5SZXNvbHV0aW9uUmFuZ2UpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSB1cGRhdGVRdWVyeUJhZGdlKCkge1xyXG4gICAgY29uc3QgaGlkZGVuID0gdGhpcy5xdWVyeUJhZGdlID09PSBmYWxzZSB8fFxyXG4gICAgICB0aGlzLmxheWVyLnZpc2libGUgPT09IGZhbHNlIHx8XHJcbiAgICAgICFsYXllcklzUXVlcnlhYmxlKHRoaXMubGF5ZXIpO1xyXG4gICAgdGhpcy5xdWVyeUJhZGdlSGlkZGVuJC5uZXh0KGhpZGRlbik7XHJcbiAgfVxyXG59XHJcbiJdfQ==
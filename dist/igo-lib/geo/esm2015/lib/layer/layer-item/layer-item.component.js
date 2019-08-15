/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { layerIsQueryable } from '../../query/shared/query.utils';
import { Layer, TooltipType } from '../shared/layers';
export class LayerItemComponent {
    constructor() {
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
         * @return {?}
         */
        () => {
            this.onResolutionChange();
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
     * @return {?}
     */
    onResolutionChange() {
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
                template: "<mat-list-item>\r\n  <mat-icon\r\n    class=\"igo-chevron\"\r\n    mat-list-avatar\r\n    igoCollapse\r\n    [target]=\"legend\"\r\n    [collapsed]=\"!(showLegend$ | async)\"\r\n    (toggle)=\"toggleLegend($event)\"\r\n    svgIcon=\"chevron-up\" >\r\n  </mat-icon>\r\n  <h4 matLine [matTooltip]=\"tooltipText\" matTooltipShowDelay=\"500\">{{layer.title}}</h4>\r\n\r\n  <button\r\n    mat-icon-button\r\n    [color]=\"layer.visible ? 'primary' : 'default'\"\r\n    collapsibleButton\r\n    tooltip-position=\"below\"\r\n    matTooltipShowDelay=\"500\"\r\n    [matTooltip]=\"layer.visible ?\r\n                  ('igo.geo.layer.hideLayer' | translate) :\r\n                  ('igo.geo.layer.showLayer' | translate)\"\r\n    (click)=\"toggleVisibility()\">\r\n    <mat-icon\r\n      matBadge=\"?\"\r\n      matBadgeColor=\"accent\"\r\n      matBadgeSize=\"small\"\r\n      matBadgePosition=\"after\"\r\n      [matBadgeHidden]=\"queryBadgeHidden$ | async\"\r\n      [ngClass]=\"{disabled: !(inResolutionRange$ | async)}\"\r\n      [svgIcon]=\"layer.visible ? 'eye' : 'eye-off'\">\r\n    </mat-icon>\r\n  </button>\r\n\r\n  <button\r\n    mat-icon-button\r\n    color=\"primary\"\r\n    igoCollapse\r\n    [target]=\"actions\"\r\n    [collapsed]=\"true\">\r\n    <mat-icon svgIcon=\"dots-horizontal\"></mat-icon>\r\n  </button>\r\n</mat-list-item>\r\n\r\n<div #actions class=\"igo-layer-actions-container\">\r\n  <div class=\"igo-col igo-col-100 igo-col-100-m\">\r\n    <mat-slider\r\n      id=\"opacity-slider\"\r\n      thumbLabel\r\n      tickInterval=\"5\"\r\n      step=\"5\"\r\n      [min]=\"0\"\r\n      [max]=\"100\"\r\n      [(ngModel)]=\"opacity\"\r\n      [matTooltip]=\"'igo.geo.layer.opacity' | translate\"\r\n      matTooltipShowDelay=\"500\"\r\n      tooltip-position=\"below\">\r\n    </mat-slider>\r\n  </div>\r\n\r\n  <div class=\"igo-col igo-col-100 igo-col-100-m\">\r\n    <div class=\"igo-layer-button-group\">\r\n      <button\r\n        color=\"primary\"\r\n        mat-icon-button\r\n        tooltip-position=\"below\"\r\n        matTooltipShowDelay=\"500\"\r\n        [matTooltip]=\"'igo.geo.layer.raiseLayer' | translate\"\r\n        [disabled]=\"!orderable || raiseDisabled\"\r\n        (click)=\"layer.map.raiseLayer(layer)\">\r\n        <mat-icon svgIcon=\"arrow-up\"></mat-icon>\r\n      </button>\r\n\r\n      <button\r\n        mat-icon-button\r\n        color=\"primary\"\r\n        tooltip-position=\"below\"\r\n        matTooltipShowDelay=\"500\"\r\n        [matTooltip]=\"'igo.geo.layer.lowerLayer' | translate\"\r\n        [disabled]=\"!orderable || lowerDisabled\"\r\n        (click)=\"layer.map.lowerLayer(layer)\">\r\n        <mat-icon svgIcon=\"arrow-down\"></mat-icon>\r\n      </button>\r\n\r\n      <button\r\n        *ngIf=\"removable === true\"\r\n        mat-icon-button\r\n        color=\"warn\"\r\n        tooltip-position=\"below\"\r\n        matTooltipShowDelay=\"500\"\r\n        [matTooltip]=\"'igo.geo.layer.removeLayer' | translate\"\r\n        (click)=\"layer.map.removeLayer(layer)\">\r\n        <mat-icon svgIcon=\"delete\"></mat-icon>\r\n      </button>\r\n      <ng-content select=\"[igoLayerItemToolbar]\"></ng-content>\r\n\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n<div #legend class=\"igo-layer-legend-container\">\r\n  <igo-layer-legend\r\n    *ngIf=\"showLegend$ | async\"\r\n    [layer]=\"layer\"\r\n    [updateLegendOnResolutionChange]=\"updateLegendOnResolutionChange\">\r\n  </igo-layer-legend>\r\n</div>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{overflow:hidden}.igo-layer-actions-container{width:100%;display:inline-block}.igo-layer-actions-container>div{text-align:center}.igo-layer-legend-container{padding-left:18px;width:calc(100% - 18px);display:inline-block}#opacity-slider{width:100%}.igo-layer-button-group{float:right;padding:0 3px}@media only screen and (max-width:450px),only screen and (max-height:450px){#opacity-slider{width:70%}.igo-layer-button-group{float:none}}mat-icon.disabled{color:rgba(0,0,0,.38)}.mat-badge-small .mat-badge-content{font-size:12px}"]
            }] }
];
/** @nocollapse */
LayerItemComponent.ctorParameters = () => [];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5ZXItaXRlbS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvbGF5ZXIvbGF5ZXItaXRlbS9sYXllci1pdGVtLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBR0wsdUJBQXVCLEVBQ3hCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBZ0IsZUFBZSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBR3JELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ2xFLE9BQU8sRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFRdEQsTUFBTSxPQUFPLGtCQUFrQjtJQWlDN0I7UUEvQkEsZ0JBQVcsR0FBNkIsSUFBSSxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFbkUsdUJBQWtCLEdBQTZCLElBQUksZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXpFLHNCQUFpQixHQUE2QixJQUFJLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQVEvRCxtQ0FBOEIsR0FBWSxLQUFLLENBQUM7UUFFaEQsMEJBQXFCLEdBQVksS0FBSyxDQUFDO1FBRXZDLG1DQUE4QixHQUFZLEtBQUssQ0FBQztRQUVoRCxjQUFTLEdBQVksSUFBSSxDQUFDO1FBRTFCLGtCQUFhLEdBQVksS0FBSyxDQUFDO1FBRS9CLGtCQUFhLEdBQVksS0FBSyxDQUFDO1FBRS9CLGVBQVUsR0FBWSxLQUFLLENBQUM7SUFPdEIsQ0FBQzs7OztJQUxoQixJQUFJLFNBQVMsS0FBYyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFNBQVMsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDOzs7O0lBRTNFLElBQUksT0FBTyxLQUFLLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFD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QixpQkFBaUIsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLG9CQUFvQjtRQUN6RCxJQUFJLGlCQUFpQixLQUFLLEtBQUssSUFBSSxJQUFJLENBQUMsOEJBQThCLEtBQUssSUFBSSxFQUFFO1lBQy9FLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDekI7UUFDRCxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFDbEQsQ0FBQzs7Ozs7SUFFTyxnQkFBZ0I7O2NBQ2hCLE1BQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxLQUFLLEtBQUs7WUFDdEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEtBQUssS0FBSztZQUM1QixDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDL0IsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN0QyxDQUFDOzs7WUFqSEYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxnQkFBZ0I7Z0JBQzFCLDY1R0FBMEM7Z0JBRTFDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOzthQUNoRDs7Ozs7b0JBYUUsS0FBSzs2Q0FFTCxLQUFLO29DQUVMLEtBQUs7NkNBRUwsS0FBSzt3QkFFTCxLQUFLOzRCQUVMLEtBQUs7NEJBRUwsS0FBSzt5QkFFTCxLQUFLOzs7O0lBeEJOLHlDQUFtRTs7SUFFbkUsZ0RBQXlFOztJQUV6RSwrQ0FBd0U7O0lBRXhFLHlDQUFvQjs7Ozs7SUFFcEIsMENBQW1DOztJQUVuQyxtQ0FBc0I7O0lBRXRCLDREQUF5RDs7SUFFekQsbURBQWdEOztJQUVoRCw0REFBeUQ7O0lBRXpELHVDQUFtQzs7SUFFbkMsMkNBQXdDOztJQUV4QywyQ0FBd0M7O0lBRXhDLHdDQUFxQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIElucHV0LFxyXG4gIE9uSW5pdCxcclxuICBPbkRlc3Ryb3ksXHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3lcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uLCBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7IE1ldGFkYXRhTGF5ZXJPcHRpb25zIH0gZnJvbSAnLi4vLi4vbWV0YWRhdGEvc2hhcmVkL21ldGFkYXRhLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IGxheWVySXNRdWVyeWFibGUgfSBmcm9tICcuLi8uLi9xdWVyeS9zaGFyZWQvcXVlcnkudXRpbHMnO1xyXG5pbXBvcnQgeyBMYXllciwgVG9vbHRpcFR5cGUgfSBmcm9tICcuLi9zaGFyZWQvbGF5ZXJzJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaWdvLWxheWVyLWl0ZW0nLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9sYXllci1pdGVtLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9sYXllci1pdGVtLmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIExheWVySXRlbUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuXHJcbiAgc2hvd0xlZ2VuZCQ6IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPiA9IG5ldyBCZWhhdmlvclN1YmplY3QoZmFsc2UpO1xyXG5cclxuICBpblJlc29sdXRpb25SYW5nZSQ6IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPiA9IG5ldyBCZWhhdmlvclN1YmplY3QodHJ1ZSk7XHJcblxyXG4gIHF1ZXJ5QmFkZ2VIaWRkZW4kOiBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KHRydWUpO1xyXG5cclxuICB0b29sdGlwVGV4dDogc3RyaW5nO1xyXG5cclxuICBwcml2YXRlIHJlc29sdXRpb24kJDogU3Vic2NyaXB0aW9uO1xyXG5cclxuICBASW5wdXQoKSBsYXllcjogTGF5ZXI7XHJcblxyXG4gIEBJbnB1dCgpIHRvZ2dsZUxlZ2VuZE9uVmlzaWJpbGl0eUNoYW5nZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICBASW5wdXQoKSBleHBhbmRMZWdlbmRJZlZpc2libGU6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgQElucHV0KCkgdXBkYXRlTGVnZW5kT25SZXNvbHV0aW9uQ2hhbmdlOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIEBJbnB1dCgpIG9yZGVyYWJsZTogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gIEBJbnB1dCgpIGxvd2VyRGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgQElucHV0KCkgcmFpc2VEaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICBASW5wdXQoKSBxdWVyeUJhZGdlOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIGdldCByZW1vdmFibGUoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLmxheWVyLm9wdGlvbnMucmVtb3ZhYmxlICE9PSBmYWxzZTsgfVxyXG5cclxuICBnZXQgb3BhY2l0eSgpIHsgcmV0dXJuIHRoaXMubGF5ZXIub3BhY2l0eSAqIDEwMDsgfVxyXG4gIHNldCBvcGFjaXR5KG9wYWNpdHk6IG51bWJlcikgeyB0aGlzLmxheWVyLm9wYWNpdHkgPSBvcGFjaXR5IC8gMTAwOyB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge31cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICBjb25zdCBsZWdlbmQgPSB0aGlzLmxheWVyLmRhdGFTb3VyY2Uub3B0aW9ucy5sZWdlbmQgfHwge307XHJcbiAgICBsZXQgbGVnZW5kQ29sbGFwc2VkID0gbGVnZW5kLmNvbGxhcHNlZCA9PT0gZmFsc2UgPyBmYWxzZSA6IHRydWU7XHJcbiAgICBpZiAodGhpcy5sYXllci52aXNpYmxlICYmIHRoaXMuZXhwYW5kTGVnZW5kSWZWaXNpYmxlKSB7XHJcbiAgICAgIGxlZ2VuZENvbGxhcHNlZCA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgdGhpcy50b2dnbGVMZWdlbmQobGVnZW5kQ29sbGFwc2VkKTtcclxuICAgIHRoaXMudXBkYXRlUXVlcnlCYWRnZSgpO1xyXG5cclxuICAgIGNvbnN0IHJlc29sdXRpb24kID0gdGhpcy5sYXllci5tYXAudmlld0NvbnRyb2xsZXIucmVzb2x1dGlvbiQ7XHJcbiAgICB0aGlzLnJlc29sdXRpb24kJCA9IHJlc29sdXRpb24kLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgIHRoaXMub25SZXNvbHV0aW9uQ2hhbmdlKCk7XHJcbiAgICB9KTtcclxuICAgIHRoaXMudG9vbHRpcFRleHQgPSB0aGlzLmNvbXB1dGVUb29sdGlwKCk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMucmVzb2x1dGlvbiQkLnVuc3Vic2NyaWJlKCk7XHJcbiAgfVxyXG5cclxuICB0b2dnbGVMZWdlbmQoY29sbGFwc2VkOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLnNob3dMZWdlbmQkLm5leHQoIWNvbGxhcHNlZCk7XHJcbiAgfVxyXG5cclxuICB0b2dnbGVWaXNpYmlsaXR5KCkge1xyXG4gICAgdGhpcy5sYXllci52aXNpYmxlID0gIXRoaXMubGF5ZXIudmlzaWJsZTtcclxuICAgIGlmICh0aGlzLnRvZ2dsZUxlZ2VuZE9uVmlzaWJpbGl0eUNoYW5nZSkge1xyXG4gICAgICB0aGlzLnRvZ2dsZUxlZ2VuZCghdGhpcy5sYXllci52aXNpYmxlKTtcclxuICAgIH1cclxuICAgIHRoaXMudXBkYXRlUXVlcnlCYWRnZSgpO1xyXG4gIH1cclxuXHJcbiAgY29tcHV0ZVRvb2x0aXAoKTogc3RyaW5nIHtcclxuICAgIGNvbnN0IGxheWVyT3B0aW9ucyA9IHRoaXMubGF5ZXIub3B0aW9ucztcclxuICAgIGlmICghbGF5ZXJPcHRpb25zLnRvb2x0aXApIHtcclxuICAgICAgcmV0dXJuIHRoaXMubGF5ZXIudGl0bGU7XHJcbiAgICB9XHJcbiAgICBjb25zdCBsYXllclRvb2x0aXAgPSBsYXllck9wdGlvbnMudG9vbHRpcDtcclxuICAgIGNvbnN0IGxheWVyTWV0YWRhdGEgPSAobGF5ZXJPcHRpb25zIGFzIE1ldGFkYXRhTGF5ZXJPcHRpb25zKS5tZXRhZGF0YTtcclxuICAgIHN3aXRjaCAobGF5ZXJPcHRpb25zLnRvb2x0aXAudHlwZSkge1xyXG4gICAgICBjYXNlIFRvb2x0aXBUeXBlLlRJVExFOlxyXG4gICAgICAgIHJldHVybiB0aGlzLmxheWVyLnRpdGxlO1xyXG4gICAgICBjYXNlIFRvb2x0aXBUeXBlLkFCU1RSQUNUOlxyXG4gICAgICAgIGlmIChsYXllck1ldGFkYXRhICYmIGxheWVyTWV0YWRhdGEuYWJzdHJhY3QpIHtcclxuICAgICAgICAgIHJldHVybiBsYXllck1ldGFkYXRhLmFic3RyYWN0O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICByZXR1cm4gdGhpcy5sYXllci50aXRsZTtcclxuICAgICAgICB9XHJcbiAgICAgIGNhc2UgVG9vbHRpcFR5cGUuQ1VTVE9NOlxyXG4gICAgICAgIGlmIChsYXllclRvb2x0aXAgJiYgbGF5ZXJUb29sdGlwLnRleHQpIHtcclxuICAgICAgICAgIHJldHVybiBsYXllclRvb2x0aXAudGV4dDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcmV0dXJuIHRoaXMubGF5ZXIudGl0bGU7XHJcbiAgICAgICAgfVxyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIHJldHVybiB0aGlzLmxheWVyLnRpdGxlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBvblJlc29sdXRpb25DaGFuZ2UoKSB7XHJcbiAgICBjb25zdCBpblJlc29sdXRpb25SYW5nZSA9IHRoaXMubGF5ZXIuaXNJblJlc29sdXRpb25zUmFuZ2U7XHJcbiAgICBpZiAoaW5SZXNvbHV0aW9uUmFuZ2UgPT09IGZhbHNlICYmIHRoaXMudXBkYXRlTGVnZW5kT25SZXNvbHV0aW9uQ2hhbmdlID09PSB0cnVlKSB7XHJcbiAgICAgIHRoaXMudG9nZ2xlTGVnZW5kKHRydWUpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5pblJlc29sdXRpb25SYW5nZSQubmV4dChpblJlc29sdXRpb25SYW5nZSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHVwZGF0ZVF1ZXJ5QmFkZ2UoKSB7XHJcbiAgICBjb25zdCBoaWRkZW4gPSB0aGlzLnF1ZXJ5QmFkZ2UgPT09IGZhbHNlIHx8XHJcbiAgICAgIHRoaXMubGF5ZXIudmlzaWJsZSA9PT0gZmFsc2UgfHxcclxuICAgICAgIWxheWVySXNRdWVyeWFibGUodGhpcy5sYXllcik7XHJcbiAgICB0aGlzLnF1ZXJ5QmFkZ2VIaWRkZW4kLm5leHQoaGlkZGVuKTtcclxuICB9XHJcbn1cclxuIl19
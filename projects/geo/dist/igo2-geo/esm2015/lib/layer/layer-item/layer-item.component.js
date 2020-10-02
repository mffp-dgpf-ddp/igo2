/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter, Renderer2, ElementRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { layerIsQueryable } from '../../query/shared/query.utils';
import { TooltipType } from '../shared/layers';
import { NetworkService } from '@igo2/core';
export class LayerItemComponent {
    /**
     * @param {?} networkService
     * @param {?} renderer
     * @param {?} elRef
     */
    constructor(networkService, renderer, elRef) {
        this.networkService = networkService;
        this.renderer = renderer;
        this.elRef = elRef;
        this.focusedCls = 'igo-layer-item-focused';
        this.layerTool$ = new BehaviorSubject(false);
        this.showLegend$ = new BehaviorSubject(true);
        this.inResolutionRange$ = new BehaviorSubject(true);
        this.queryBadgeHidden$ = new BehaviorSubject(true);
        this._selectAll = false;
        this.layers$ = new BehaviorSubject(undefined);
        this.toggleLegendOnVisibilityChange = false;
        this.expandLegendIfVisible = false;
        this.updateLegendOnResolutionChange = false;
        this.orderable = true;
        this.lowerDisabled = false;
        this.raiseDisabled = false;
        this.queryBadge = false;
        this.action = new EventEmitter(undefined);
        this.checkbox = new EventEmitter();
    }
    /**
     * @return {?}
     */
    get activeLayer() {
        return this._activeLayer;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set activeLayer(value) {
        if (value && this.layer && value.id === this.layer.id && !this.selectionMode) {
            this.layerTool$.next(true);
            this.renderer.addClass(this.elRef.nativeElement, this.focusedCls);
        }
        else {
            this.renderer.removeClass(this.elRef.nativeElement, this.focusedCls);
        }
    }
    /**
     * @return {?}
     */
    get selectAll() {
        return this._selectAll;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set selectAll(value) {
        this._selectAll = value;
        if (value === true) {
            this.layerCheck = true;
        }
    }
    /**
     * @return {?}
     */
    get layer() {
        return this._layer;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set layer(value) {
        this._layer = value;
        this.layers$.next(value);
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
        this.layers$.subscribe((/**
         * @return {?}
         */
        () => {
            if (this.layer && this.layer.options.active) {
                this.layerTool$.next(true);
                this.renderer.addClass(this.elRef.nativeElement, this.focusedCls);
            }
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
    /**
     * @return {?}
     */
    toggleLayerTool() {
        this.layerTool$.next(!this.layerTool$.getValue());
        if (this.layerTool$.getValue() === true) {
            this.renderer.addClass(this.elRef.nativeElement, this.focusedCls);
        }
        else {
            this.renderer.removeClass(this.elRef.nativeElement, this.focusedCls);
        }
        this.action.emit(this.layer);
    }
    /**
     * @return {?}
     */
    check() {
        this.layerCheck = !this.layerCheck;
        this.checkbox.emit({ layer: this.layer, check: this.layerCheck });
    }
}
LayerItemComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-layer-item',
                template: "<mat-list-item class= \"igo-layer-list-item\">\r\n  <mat-checkbox *ngIf=\"selectionMode\"\r\n    class=\"layerCheck\"\r\n    mat-list-icon\r\n    (change)=\"check()\"\r\n    [checked]=\"layerCheck\">\r\n  </mat-checkbox>\r\n  <h4 (click)=\"toggleLegendOnClick()\" matLine class=\"igo-layer-title\" [matTooltip]=\"tooltipText\" matTooltipShowDelay=\"500\">{{layer.title}}</h4>\r\n\r\n  <button *ngIf=\"!selectionMode\"\r\n    mat-icon-button\r\n    [color]=\"layer.visible ? 'primary' : 'default'\"\r\n    collapsibleButton\r\n    tooltip-position=\"below\"\r\n    matTooltipShowDelay=\"500\"\r\n    [matTooltip]=\"layer.visible ?\r\n                  ('igo.geo.layer.hideLayer' | translate) :\r\n                  ('igo.geo.layer.showLayer' | translate)\"\r\n    (click)=\"toggleVisibility()\">\r\n    <mat-icon\r\n      matBadge=\"?\"\r\n      matBadgeColor=\"accent\"\r\n      matBadgeSize=\"small\"\r\n      matBadgePosition=\"after\"\r\n      [matBadgeHidden]=\"queryBadgeHidden$ | async\"\r\n      [ngClass]=\"{disabled: !(inResolutionRange$ | async)}\"\r\n      [svgIcon]=\"layer.visible ? 'eye' : 'eye-off'\">\r\n    </mat-icon>\r\n  </button>\r\n\r\n  <button *ngIf=\"selectionMode\" class=\"selection-eye\"\r\n  mat-icon-button\r\n  [color]=\"layer.visible ? 'primary' : 'default'\"\r\n  collapsibleButton\r\n  tooltip-position=\"below\"\r\n  matTooltipShowDelay=\"500\"\r\n  [matTooltip]=\"layer.visible ?\r\n                ('igo.geo.layer.hideLayer' | translate) :\r\n                ('igo.geo.layer.showLayer' | translate)\"\r\n  (click)=\"toggleVisibility()\">\r\n  <mat-icon\r\n    matBadge=\"?\"\r\n    matBadgeColor=\"accent\"\r\n    matBadgeSize=\"small\"\r\n    matBadgePosition=\"after\"\r\n    [matBadgeHidden]=\"queryBadgeHidden$ | async\"\r\n    [ngClass]=\"{disabled: !(inResolutionRange$ | async)}\"\r\n    [svgIcon]=\"layer.visible ? 'eye' : 'eye-off'\">\r\n  </mat-icon>\r\n</button>\r\n\r\n  <button *ngIf=\"!selectionMode\"\r\n    tooltip-position=\"below\"\r\n    matTooltipShowDelay=\"500\"\r\n    [matTooltip]= \"'igo.geo.layer.moreOptions' | translate\"\r\n    mat-icon-button\r\n    color=\"primary\"\r\n    (click)=\"toggleLayerTool()\">\r\n    <mat-icon svgIcon=\"dots-horizontal\"></mat-icon>\r\n  </button>\r\n</mat-list-item>\r\n\r\n<div #legend class=\"igo-layer-legend-container\">\r\n  <igo-layer-legend\r\n    *ngIf=\"showLegend$ | async\"\r\n    [layer]=\"layer\"\r\n    [updateLegendOnResolutionChange]=\"updateLegendOnResolutionChange\">\r\n  </igo-layer-legend>\r\n</div>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{overflow:hidden}mat-list-item ::ng-deep .mat-list-item-content .layerCheck{align-self:baseline;width:16px;padding-right:0}.igo-layer-list-item{height:46px;clear:both}.igo-layer-title{cursor:pointer}.igo-layer-legend-container{padding-left:18px;width:calc(100% - 18px)}mat-icon.disabled{color:rgba(0,0,0,.38)}.mat-badge-small .mat-badge-content{font-size:12px}.selection-eye{padding-right:45px}"]
            }] }
];
/** @nocollapse */
LayerItemComponent.ctorParameters = () => [
    { type: NetworkService },
    { type: Renderer2 },
    { type: ElementRef }
];
LayerItemComponent.propDecorators = {
    activeLayer: [{ type: Input }],
    selectAll: [{ type: Input }],
    layerCheck: [{ type: Input }],
    layer: [{ type: Input }],
    toggleLegendOnVisibilityChange: [{ type: Input }],
    expandLegendIfVisible: [{ type: Input }],
    updateLegendOnResolutionChange: [{ type: Input }],
    orderable: [{ type: Input }],
    lowerDisabled: [{ type: Input }],
    raiseDisabled: [{ type: Input }],
    queryBadge: [{ type: Input }],
    selectionMode: [{ type: Input }],
    action: [{ type: Output }],
    checkbox: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    LayerItemComponent.prototype.focusedCls;
    /**
     * @type {?}
     * @private
     */
    LayerItemComponent.prototype._activeLayer;
    /** @type {?} */
    LayerItemComponent.prototype.layerTool$;
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
    LayerItemComponent.prototype._selectAll;
    /** @type {?} */
    LayerItemComponent.prototype.layerCheck;
    /**
     * @type {?}
     * @private
     */
    LayerItemComponent.prototype.resolution$$;
    /** @type {?} */
    LayerItemComponent.prototype.layers$;
    /**
     * @type {?}
     * @private
     */
    LayerItemComponent.prototype._layer;
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
    /** @type {?} */
    LayerItemComponent.prototype.selectionMode;
    /** @type {?} */
    LayerItemComponent.prototype.action;
    /** @type {?} */
    LayerItemComponent.prototype.checkbox;
    /**
     * @type {?}
     * @private
     */
    LayerItemComponent.prototype.networkService;
    /**
     * @type {?}
     * @private
     */
    LayerItemComponent.prototype.renderer;
    /**
     * @type {?}
     * @private
     */
    LayerItemComponent.prototype.elRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5ZXItaXRlbS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvbGF5ZXIvbGF5ZXItaXRlbS9sYXllci1pdGVtLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBR0wsdUJBQXVCLEVBQ3ZCLE1BQU0sRUFDTixZQUFZLEVBQ1osU0FBUyxFQUNULFVBQVUsRUFDWCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQWdCLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUdyRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNsRSxPQUFPLEVBQVMsV0FBVyxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDdEQsT0FBTyxFQUFFLGNBQWMsRUFBbUIsTUFBTSxZQUFZLENBQUM7QUFRN0QsTUFBTSxPQUFPLGtCQUFrQjs7Ozs7O0lBMkY3QixZQUNVLGNBQThCLEVBQzlCLFFBQW1CLEVBQ25CLEtBQWlCO1FBRmpCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQ25CLFVBQUssR0FBTCxLQUFLLENBQVk7UUE1RnBCLGVBQVUsR0FBRyx3QkFBd0IsQ0FBQztRQWdCN0MsZUFBVSxHQUE2QixJQUFJLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUVsRSxnQkFBVyxHQUE2QixJQUFJLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVsRSx1QkFBa0IsR0FBNkIsSUFBSSxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFekUsc0JBQWlCLEdBQTZCLElBQUksZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBZ0JoRSxlQUFVLEdBQUcsS0FBSyxDQUFDO1FBTTNCLFlBQU8sR0FBMkIsSUFBSSxlQUFlLENBQVEsU0FBUyxDQUFDLENBQUM7UUFZL0QsbUNBQThCLEdB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cHV0LFxyXG4gIE9uSW5pdCxcclxuICBPbkRlc3Ryb3ksXHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbiAgT3V0cHV0LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBSZW5kZXJlcjIsXHJcbiAgRWxlbWVudFJlZlxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24sIEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IHsgTWV0YWRhdGFMYXllck9wdGlvbnMgfSBmcm9tICcuLi8uLi9tZXRhZGF0YS9zaGFyZWQvbWV0YWRhdGEuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgbGF5ZXJJc1F1ZXJ5YWJsZSB9IGZyb20gJy4uLy4uL3F1ZXJ5L3NoYXJlZC9xdWVyeS51dGlscyc7XHJcbmltcG9ydCB7IExheWVyLCBUb29sdGlwVHlwZSB9IGZyb20gJy4uL3NoYXJlZC9sYXllcnMnO1xyXG5pbXBvcnQgeyBOZXR3b3JrU2VydmljZSwgQ29ubmVjdGlvblN0YXRlIH0gZnJvbSAnQGlnbzIvY29yZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2lnby1sYXllci1pdGVtJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vbGF5ZXItaXRlbS5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vbGF5ZXItaXRlbS5jb21wb25lbnQuc2NzcyddLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBMYXllckl0ZW1Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcblxyXG4gIHB1YmxpYyBmb2N1c2VkQ2xzID0gJ2lnby1sYXllci1pdGVtLWZvY3VzZWQnO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIGdldCBhY3RpdmVMYXllcigpIHtcclxuICAgIHJldHVybiB0aGlzLl9hY3RpdmVMYXllcjtcclxuICB9XHJcbiAgc2V0IGFjdGl2ZUxheWVyKHZhbHVlKSB7XHJcbiAgICBpZiAodmFsdWUgJiYgdGhpcy5sYXllciAmJiB2YWx1ZS5pZCA9PT0gdGhpcy5sYXllci5pZCAmJiAhdGhpcy5zZWxlY3Rpb25Nb2RlKSB7XHJcbiAgICAgIHRoaXMubGF5ZXJUb29sJC5uZXh0KHRydWUpO1xyXG4gICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudCwgdGhpcy5mb2N1c2VkQ2xzKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LCB0aGlzLmZvY3VzZWRDbHMpO1xyXG4gICAgfVxyXG4gIH1cclxuICBwcml2YXRlIF9hY3RpdmVMYXllcjtcclxuXHJcbiAgbGF5ZXJUb29sJDogQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IEJlaGF2aW9yU3ViamVjdChmYWxzZSk7XHJcblxyXG4gIHNob3dMZWdlbmQkOiBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KHRydWUpO1xyXG5cclxuICBpblJlc29sdXRpb25SYW5nZSQ6IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPiA9IG5ldyBCZWhhdmlvclN1YmplY3QodHJ1ZSk7XHJcblxyXG4gIHF1ZXJ5QmFkZ2VIaWRkZW4kOiBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KHRydWUpO1xyXG5cclxuICB0b29sdGlwVGV4dDogc3RyaW5nO1xyXG5cclxuICBzdGF0ZTogQ29ubmVjdGlvblN0YXRlO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIGdldCBzZWxlY3RBbGwoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fc2VsZWN0QWxsO1xyXG4gIH1cclxuICBzZXQgc2VsZWN0QWxsKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLl9zZWxlY3RBbGwgPSB2YWx1ZTtcclxuICAgIGlmICh2YWx1ZSA9PT0gdHJ1ZSkge1xyXG4gICAgICB0aGlzLmxheWVyQ2hlY2sgPSB0cnVlO1xyXG4gICAgfVxyXG4gIH1cclxuICBwcml2YXRlIF9zZWxlY3RBbGwgPSBmYWxzZTtcclxuXHJcbiAgQElucHV0KCkgbGF5ZXJDaGVjaztcclxuXHJcbiAgcHJpdmF0ZSByZXNvbHV0aW9uJCQ6IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgbGF5ZXJzJDogQmVoYXZpb3JTdWJqZWN0PExheWVyPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8TGF5ZXI+KHVuZGVmaW5lZCk7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IGxheWVyKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2xheWVyO1xyXG4gIH1cclxuICBzZXQgbGF5ZXIodmFsdWUpIHtcclxuICAgIHRoaXMuX2xheWVyID0gdmFsdWU7XHJcbiAgICB0aGlzLmxheWVycyQubmV4dCh2YWx1ZSk7XHJcbiAgfVxyXG4gIHByaXZhdGUgX2xheWVyO1xyXG5cclxuICBASW5wdXQoKSB0b2dnbGVMZWdlbmRPblZpc2liaWxpdHlDaGFuZ2U6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgQElucHV0KCkgZXhwYW5kTGVnZW5kSWZWaXNpYmxlOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIEBJbnB1dCgpIHVwZGF0ZUxlZ2VuZE9uUmVzb2x1dGlvbkNoYW5nZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICBASW5wdXQoKSBvcmRlcmFibGU6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICBASW5wdXQoKSBsb3dlckRpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIEBJbnB1dCgpIHJhaXNlRGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgQElucHV0KCkgcXVlcnlCYWRnZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICBASW5wdXQoKSBzZWxlY3Rpb25Nb2RlO1xyXG5cclxuICBnZXQgcmVtb3ZhYmxlKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMubGF5ZXIub3B0aW9ucy5yZW1vdmFibGUgIT09IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgZ2V0IG9wYWNpdHkoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5sYXllci5vcGFjaXR5ICogMTAwO1xyXG4gIH1cclxuICBzZXQgb3BhY2l0eShvcGFjaXR5OiBudW1iZXIpIHtcclxuICAgIHRoaXMubGF5ZXIub3BhY2l0eSA9IG9wYWNpdHkgLyAxMDA7XHJcbiAgfVxyXG5cclxuICBAT3V0cHV0KCkgYWN0aW9uOiBFdmVudEVtaXR0ZXI8TGF5ZXI+ID0gbmV3IEV2ZW50RW1pdHRlcjxMYXllcj4odW5kZWZpbmVkKTtcclxuICBAT3V0cHV0KCkgY2hlY2tib3ggPSBuZXcgRXZlbnRFbWl0dGVyPHtcclxuICAgIGxheWVyOiBMYXllcjtcclxuICAgIGNoZWNrOiBib29sZWFuO1xyXG4gIH0+KCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBuZXR3b3JrU2VydmljZTogTmV0d29ya1NlcnZpY2UsXHJcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXHJcbiAgICBwcml2YXRlIGVsUmVmOiBFbGVtZW50UmVmKSB7fVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIGlmIChcclxuICAgICAgdGhpcy5sYXllci52aXNpYmxlICYmXHJcbiAgICAgIHRoaXMuZXhwYW5kTGVnZW5kSWZWaXNpYmxlICYmXHJcbiAgICAgIHRoaXMubGF5ZXIuZmlyc3RMb2FkQ29tcG9uZW50ID09PSB0cnVlXHJcbiAgICApIHtcclxuICAgICAgdGhpcy5sYXllci5maXJzdExvYWRDb21wb25lbnQgPSBmYWxzZTtcclxuICAgICAgdGhpcy5sYXllci5sZWdlbmRDb2xsYXBzZWQgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIHRoaXMudG9nZ2xlTGVnZW5kKHRoaXMubGF5ZXIubGVnZW5kQ29sbGFwc2VkKTtcclxuICAgIHRoaXMudXBkYXRlUXVlcnlCYWRnZSgpO1xyXG5cclxuICAgIGNvbnN0IHJlc29sdXRpb24kID0gdGhpcy5sYXllci5tYXAudmlld0NvbnRyb2xsZXIucmVzb2x1dGlvbiQ7XHJcbiAgICB0aGlzLnJlc29sdXRpb24kJCA9IHJlc29sdXRpb24kLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgIHRoaXMub25SZXNvbHV0aW9uQ2hhbmdlKCk7XHJcbiAgICB9KTtcclxuICAgIHRoaXMudG9vbHRpcFRleHQgPSB0aGlzLmNvbXB1dGVUb29sdGlwKCk7XHJcblxyXG4gICAgdGhpcy5uZXR3b3JrU2VydmljZS5jdXJyZW50U3RhdGUoKS5zdWJzY3JpYmUoKHN0YXRlOiBDb25uZWN0aW9uU3RhdGUpID0+IHtcclxuICAgICAgdGhpcy5zdGF0ZSA9IHN0YXRlO1xyXG4gICAgICB0aGlzLm9uUmVzb2x1dGlvbkNoYW5nZSgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5sYXllcnMkLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgIGlmICh0aGlzLmxheWVyICYmIHRoaXMubGF5ZXIub3B0aW9ucy5hY3RpdmUpIHtcclxuICAgICAgICB0aGlzLmxheWVyVG9vbCQubmV4dCh0cnVlKTtcclxuICAgICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudCwgdGhpcy5mb2N1c2VkQ2xzKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMucmVzb2x1dGlvbiQkLnVuc3Vic2NyaWJlKCk7XHJcbiAgfVxyXG5cclxuICB0b2dnbGVMZWdlbmQoY29sbGFwc2VkOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLmxheWVyLmxlZ2VuZENvbGxhcHNlZCA9IGNvbGxhcHNlZDtcclxuICAgIHRoaXMuc2hvd0xlZ2VuZCQubmV4dCghY29sbGFwc2VkKTtcclxuICB9XHJcblxyXG4gIHRvZ2dsZUxlZ2VuZE9uQ2xpY2soKSB7XHJcbiAgICB0aGlzLnRvZ2dsZUxlZ2VuZCh0aGlzLnNob3dMZWdlbmQkLnZhbHVlKTtcclxuICB9XHJcblxyXG4gIHRvZ2dsZVZpc2liaWxpdHkoKSB7XHJcbiAgICB0aGlzLmxheWVyLnZpc2libGUgPSAhdGhpcy5sYXllci52aXNpYmxlO1xyXG4gICAgaWYgKHRoaXMudG9nZ2xlTGVnZW5kT25WaXNpYmlsaXR5Q2hhbmdlKSB7XHJcbiAgICAgIHRoaXMudG9nZ2xlTGVnZW5kKCF0aGlzLmxheWVyLnZpc2libGUpO1xyXG4gICAgfVxyXG4gICAgdGhpcy51cGRhdGVRdWVyeUJhZGdlKCk7XHJcbiAgfVxyXG5cclxuICBjb21wdXRlVG9vbHRpcCgpOiBzdHJpbmcge1xyXG4gICAgY29uc3QgbGF5ZXJPcHRpb25zID0gdGhpcy5sYXllci5vcHRpb25zO1xyXG4gICAgaWYgKCFsYXllck9wdGlvbnMudG9vbHRpcCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5sYXllci50aXRsZTtcclxuICAgIH1cclxuICAgIGNvbnN0IGxheWVyVG9vbHRpcCA9IGxheWVyT3B0aW9ucy50b29sdGlwO1xyXG4gICAgY29uc3QgbGF5ZXJNZXRhZGF0YSA9IChsYXllck9wdGlvbnMgYXMgTWV0YWRhdGFMYXllck9wdGlvbnMpLm1ldGFkYXRhO1xyXG4gICAgc3dpdGNoIChsYXllck9wdGlvbnMudG9vbHRpcC50eXBlKSB7XHJcbiAgICAgIGNhc2UgVG9vbHRpcFR5cGUuVElUTEU6XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubGF5ZXIudGl0bGU7XHJcbiAgICAgIGNhc2UgVG9vbHRpcFR5cGUuQUJTVFJBQ1Q6XHJcbiAgICAgICAgaWYgKGxheWVyTWV0YWRhdGEgJiYgbGF5ZXJNZXRhZGF0YS5hYnN0cmFjdCkge1xyXG4gICAgICAgICAgcmV0dXJuIGxheWVyTWV0YWRhdGEuYWJzdHJhY3Q7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHJldHVybiB0aGlzLmxheWVyLnRpdGxlO1xyXG4gICAgICAgIH1cclxuICAgICAgY2FzZSBUb29sdGlwVHlwZS5DVVNUT006XHJcbiAgICAgICAgaWYgKGxheWVyVG9vbHRpcCAmJiBsYXllclRvb2x0aXAudGV4dCkge1xyXG4gICAgICAgICAgcmV0dXJuIGxheWVyVG9vbHRpcC50ZXh0O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICByZXR1cm4gdGhpcy5sYXllci50aXRsZTtcclxuICAgICAgICB9XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubGF5ZXIudGl0bGU7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG9uUmVzb2x1dGlvbkNoYW5nZSgpIHtcclxuICAgIGNvbnN0IGluUmVzb2x1dGlvblJhbmdlID0gdGhpcy5sYXllci5pc0luUmVzb2x1dGlvbnNSYW5nZTtcclxuICAgIGlmIChcclxuICAgICAgaW5SZXNvbHV0aW9uUmFuZ2UgPT09IGZhbHNlICYmXHJcbiAgICAgIHRoaXMudXBkYXRlTGVnZW5kT25SZXNvbHV0aW9uQ2hhbmdlID09PSB0cnVlXHJcbiAgICApIHtcclxuICAgICAgdGhpcy50b2dnbGVMZWdlbmQodHJ1ZSk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmluUmVzb2x1dGlvblJhbmdlJC5uZXh0KGluUmVzb2x1dGlvblJhbmdlKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgdXBkYXRlUXVlcnlCYWRnZSgpIHtcclxuICAgIGNvbnN0IGhpZGRlbiA9XHJcbiAgICAgIHRoaXMucXVlcnlCYWRnZSA9PT0gZmFsc2UgfHxcclxuICAgICAgdGhpcy5sYXllci52aXNpYmxlID09PSBmYWxzZSB8fFxyXG4gICAgICAhbGF5ZXJJc1F1ZXJ5YWJsZSh0aGlzLmxheWVyKTtcclxuICAgIHRoaXMucXVlcnlCYWRnZUhpZGRlbiQubmV4dChoaWRkZW4pO1xyXG4gIH1cclxuXHJcbiAgdG9nZ2xlTGF5ZXJUb29sKCkge1xyXG4gICAgdGhpcy5sYXllclRvb2wkLm5leHQoIXRoaXMubGF5ZXJUb29sJC5nZXRWYWx1ZSgpKTtcclxuICAgIGlmICh0aGlzLmxheWVyVG9vbCQuZ2V0VmFsdWUoKSA9PT0gdHJ1ZSkge1xyXG4gICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudCwgdGhpcy5mb2N1c2VkQ2xzKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LCB0aGlzLmZvY3VzZWRDbHMpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5hY3Rpb24uZW1pdCh0aGlzLmxheWVyKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBjaGVjaygpIHtcclxuICAgIHRoaXMubGF5ZXJDaGVjayA9ICF0aGlzLmxheWVyQ2hlY2s7XHJcbiAgICB0aGlzLmNoZWNrYm94LmVtaXQoe2xheWVyOiB0aGlzLmxheWVyLCBjaGVjazogdGhpcy5sYXllckNoZWNrfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==
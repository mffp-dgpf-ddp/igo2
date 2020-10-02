/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter, Renderer2, ElementRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { layerIsQueryable } from '../../query/shared/query.utils';
import { TooltipType } from '../shared/layers';
import { NetworkService } from '@igo2/core';
var LayerItemComponent = /** @class */ (function () {
    function LayerItemComponent(networkService, renderer, elRef) {
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
    Object.defineProperty(LayerItemComponent.prototype, "activeLayer", {
        get: /**
         * @return {?}
         */
        function () {
            return this._activeLayer;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value && this.layer && value.id === this.layer.id && !this.selectionMode) {
                this.layerTool$.next(true);
                this.renderer.addClass(this.elRef.nativeElement, this.focusedCls);
            }
            else {
                this.renderer.removeClass(this.elRef.nativeElement, this.focusedCls);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayerItemComponent.prototype, "selectAll", {
        get: /**
         * @return {?}
         */
        function () {
            return this._selectAll;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._selectAll = value;
            if (value === true) {
                this.layerCheck = true;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayerItemComponent.prototype, "layer", {
        get: /**
         * @return {?}
         */
        function () {
            return this._layer;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._layer = value;
            this.layers$.next(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayerItemComponent.prototype, "removable", {
        get: /**
         * @return {?}
         */
        function () {
            return this.layer.options.removable !== false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayerItemComponent.prototype, "opacity", {
        get: /**
         * @return {?}
         */
        function () {
            return this.layer.opacity * 100;
        },
        set: /**
         * @param {?} opacity
         * @return {?}
         */
        function (opacity) {
            this.layer.opacity = opacity / 100;
        },
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
        if (this.layer.visible &&
            this.expandLegendIfVisible &&
            this.layer.firstLoadComponent === true) {
            this.layer.firstLoadComponent = false;
            this.layer.legendCollapsed = false;
        }
        this.toggleLegend(this.layer.legendCollapsed);
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
        this.networkService.currentState().subscribe((/**
         * @param {?} state
         * @return {?}
         */
        function (state) {
            _this.state = state;
            _this.onResolutionChange();
        }));
        this.layers$.subscribe((/**
         * @return {?}
         */
        function () {
            if (_this.layer && _this.layer.options.active) {
                _this.layerTool$.next(true);
                _this.renderer.addClass(_this.elRef.nativeElement, _this.focusedCls);
            }
        }));
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
        this.layer.legendCollapsed = collapsed;
        this.showLegend$.next(!collapsed);
    };
    /**
     * @return {?}
     */
    LayerItemComponent.prototype.toggleLegendOnClick = /**
     * @return {?}
     */
    function () {
        this.toggleLegend(this.showLegend$.value);
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
        if (inResolutionRange === false &&
            this.updateLegendOnResolutionChange === true) {
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
    /**
     * @return {?}
     */
    LayerItemComponent.prototype.toggleLayerTool = /**
     * @return {?}
     */
    function () {
        this.layerTool$.next(!this.layerTool$.getValue());
        if (this.layerTool$.getValue() === true) {
            this.renderer.addClass(this.elRef.nativeElement, this.focusedCls);
        }
        else {
            this.renderer.removeClass(this.elRef.nativeElement, this.focusedCls);
        }
        this.action.emit(this.layer);
    };
    /**
     * @return {?}
     */
    LayerItemComponent.prototype.check = /**
     * @return {?}
     */
    function () {
        this.layerCheck = !this.layerCheck;
        this.checkbox.emit({ layer: this.layer, check: this.layerCheck });
    };
    LayerItemComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-layer-item',
                    template: "<mat-list-item class= \"igo-layer-list-item\">\r\n  <mat-checkbox *ngIf=\"selectionMode\"\r\n    class=\"layerCheck\"\r\n    mat-list-icon\r\n    (change)=\"check()\"\r\n    [checked]=\"layerCheck\">\r\n  </mat-checkbox>\r\n  <h4 (click)=\"toggleLegendOnClick()\" matLine class=\"igo-layer-title\" [matTooltip]=\"tooltipText\" matTooltipShowDelay=\"500\">{{layer.title}}</h4>\r\n\r\n  <button *ngIf=\"!selectionMode\"\r\n    mat-icon-button\r\n    [color]=\"layer.visible ? 'primary' : 'default'\"\r\n    collapsibleButton\r\n    tooltip-position=\"below\"\r\n    matTooltipShowDelay=\"500\"\r\n    [matTooltip]=\"layer.visible ?\r\n                  ('igo.geo.layer.hideLayer' | translate) :\r\n                  ('igo.geo.layer.showLayer' | translate)\"\r\n    (click)=\"toggleVisibility()\">\r\n    <mat-icon\r\n      matBadge=\"?\"\r\n      matBadgeColor=\"accent\"\r\n      matBadgeSize=\"small\"\r\n      matBadgePosition=\"after\"\r\n      [matBadgeHidden]=\"queryBadgeHidden$ | async\"\r\n      [ngClass]=\"{disabled: !(inResolutionRange$ | async)}\"\r\n      [svgIcon]=\"layer.visible ? 'eye' : 'eye-off'\">\r\n    </mat-icon>\r\n  </button>\r\n\r\n  <button *ngIf=\"selectionMode\" class=\"selection-eye\"\r\n  mat-icon-button\r\n  [color]=\"layer.visible ? 'primary' : 'default'\"\r\n  collapsibleButton\r\n  tooltip-position=\"below\"\r\n  matTooltipShowDelay=\"500\"\r\n  [matTooltip]=\"layer.visible ?\r\n                ('igo.geo.layer.hideLayer' | translate) :\r\n                ('igo.geo.layer.showLayer' | translate)\"\r\n  (click)=\"toggleVisibility()\">\r\n  <mat-icon\r\n    matBadge=\"?\"\r\n    matBadgeColor=\"accent\"\r\n    matBadgeSize=\"small\"\r\n    matBadgePosition=\"after\"\r\n    [matBadgeHidden]=\"queryBadgeHidden$ | async\"\r\n    [ngClass]=\"{disabled: !(inResolutionRange$ | async)}\"\r\n    [svgIcon]=\"layer.visible ? 'eye' : 'eye-off'\">\r\n  </mat-icon>\r\n</button>\r\n\r\n  <button *ngIf=\"!selectionMode\"\r\n    tooltip-position=\"below\"\r\n    matTooltipShowDelay=\"500\"\r\n    [matTooltip]= \"'igo.geo.layer.moreOptions' | translate\"\r\n    mat-icon-button\r\n    color=\"primary\"\r\n    (click)=\"toggleLayerTool()\">\r\n    <mat-icon svgIcon=\"dots-horizontal\"></mat-icon>\r\n  </button>\r\n</mat-list-item>\r\n\r\n<div #legend class=\"igo-layer-legend-container\">\r\n  <igo-layer-legend\r\n    *ngIf=\"showLegend$ | async\"\r\n    [layer]=\"layer\"\r\n    [updateLegendOnResolutionChange]=\"updateLegendOnResolutionChange\">\r\n  </igo-layer-legend>\r\n</div>\r\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [":host{overflow:hidden}mat-list-item ::ng-deep .mat-list-item-content .layerCheck{align-self:baseline;width:16px;padding-right:0}.igo-layer-list-item{height:46px;clear:both}.igo-layer-title{cursor:pointer}.igo-layer-legend-container{padding-left:18px;width:calc(100% - 18px)}mat-icon.disabled{color:rgba(0,0,0,.38)}.mat-badge-small .mat-badge-content{font-size:12px}.selection-eye{padding-right:45px}"]
                }] }
    ];
    /** @nocollapse */
    LayerItemComponent.ctorParameters = function () { return [
        { type: NetworkService },
        { type: Renderer2 },
        { type: ElementRef }
    ]; };
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
    return LayerItemComponent;
}());
export { LayerItemComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5ZXItaXRlbS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvbGF5ZXIvbGF5ZXItaXRlbS9sYXllci1pdGVtLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBR0wsdUJBQXVCLEVBQ3ZCLE1BQU0sRUFDTixZQUFZLEVBQ1osU0FBUyxFQUNULFVBQVUsRUFDWCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQWdCLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUdyRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNsRSxPQUFPLEVBQVMsV0FBVyxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDdEQsT0FBTyxFQUFFLGNBQWMsRUFBbUIsTUFBTSxZQUFZLENBQUM7QUFFN0Q7SUFpR0UsNEJBQ1UsY0FBOEIsRUFDOUIsUUFBbUIsRUFDbkIsS0FBaUI7UUFGakIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLGFBQVEsR0FBUixRQUFRLENBQVc7UUFDbkIsVUFBSyxHQUFMLEtBQUssQ0FBWTtRQTVGcEIsZUFBVSxHQUFHLHdCQUF3QixDQUFDO1FBZ0I3QyxlQUFVLEdBQTZCLElBQUksZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRWxFLGdCQUFXLEdBQTZCLElBQUksZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRWxFLHVCQUFrQixHQUE2QixJQUFJLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUV6RSxzQkFBaUIsR0FBNkIsSUFBSSxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7UUFnQmhFLGVBQVUsR0FBRyxLQUFLLENBQUM7UUFNM0IsWUFBTyxHQUEyQixJQUFJLGVBQWUsQ0FBUSxTQUFTLENBQUMsQ0FBQztRQVkvRCxtQ0FBOEIsR0FBWSxLQUFLLENBQUM7UUFFaEQsMEJB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dkIsb0NBQTJFOztJQUMzRSxzQ0FHSzs7Ozs7SUFHSCw0Q0FBc0M7Ozs7O0lBQ3RDLHNDQUEyQjs7Ozs7SUFDM0IsbUNBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgSW5wdXQsXHJcbiAgT25Jbml0LFxyXG4gIE9uRGVzdHJveSxcclxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcclxuICBPdXRwdXQsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIFJlbmRlcmVyMixcclxuICBFbGVtZW50UmVmXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiwgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQgeyBNZXRhZGF0YUxheWVyT3B0aW9ucyB9IGZyb20gJy4uLy4uL21ldGFkYXRhL3NoYXJlZC9tZXRhZGF0YS5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBsYXllcklzUXVlcnlhYmxlIH0gZnJvbSAnLi4vLi4vcXVlcnkvc2hhcmVkL3F1ZXJ5LnV0aWxzJztcclxuaW1wb3J0IHsgTGF5ZXIsIFRvb2x0aXBUeXBlIH0gZnJvbSAnLi4vc2hhcmVkL2xheWVycyc7XHJcbmltcG9ydCB7IE5ldHdvcmtTZXJ2aWNlLCBDb25uZWN0aW9uU3RhdGUgfSBmcm9tICdAaWdvMi9jb3JlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaWdvLWxheWVyLWl0ZW0nLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9sYXllci1pdGVtLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9sYXllci1pdGVtLmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIExheWVySXRlbUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuXHJcbiAgcHVibGljIGZvY3VzZWRDbHMgPSAnaWdvLWxheWVyLWl0ZW0tZm9jdXNlZCc7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IGFjdGl2ZUxheWVyKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2FjdGl2ZUxheWVyO1xyXG4gIH1cclxuICBzZXQgYWN0aXZlTGF5ZXIodmFsdWUpIHtcclxuICAgIGlmICh2YWx1ZSAmJiB0aGlzLmxheWVyICYmIHZhbHVlLmlkID09PSB0aGlzLmxheWVyLmlkICYmICF0aGlzLnNlbGVjdGlvbk1vZGUpIHtcclxuICAgICAgdGhpcy5sYXllclRvb2wkLm5leHQodHJ1ZSk7XHJcbiAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LCB0aGlzLmZvY3VzZWRDbHMpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQsIHRoaXMuZm9jdXNlZENscyk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHByaXZhdGUgX2FjdGl2ZUxheWVyO1xyXG5cclxuICBsYXllclRvb2wkOiBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KGZhbHNlKTtcclxuXHJcbiAgc2hvd0xlZ2VuZCQ6IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPiA9IG5ldyBCZWhhdmlvclN1YmplY3QodHJ1ZSk7XHJcblxyXG4gIGluUmVzb2x1dGlvblJhbmdlJDogQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IEJlaGF2aW9yU3ViamVjdCh0cnVlKTtcclxuXHJcbiAgcXVlcnlCYWRnZUhpZGRlbiQ6IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPiA9IG5ldyBCZWhhdmlvclN1YmplY3QodHJ1ZSk7XHJcblxyXG4gIHRvb2x0aXBUZXh0OiBzdHJpbmc7XHJcblxyXG4gIHN0YXRlOiBDb25uZWN0aW9uU3RhdGU7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IHNlbGVjdEFsbCgpIHtcclxuICAgIHJldHVybiB0aGlzLl9zZWxlY3RBbGw7XHJcbiAgfVxyXG4gIHNldCBzZWxlY3RBbGwodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMuX3NlbGVjdEFsbCA9IHZhbHVlO1xyXG4gICAgaWYgKHZhbHVlID09PSB0cnVlKSB7XHJcbiAgICAgIHRoaXMubGF5ZXJDaGVjayA9IHRydWU7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHByaXZhdGUgX3NlbGVjdEFsbCA9IGZhbHNlO1xyXG5cclxuICBASW5wdXQoKSBsYXllckNoZWNrO1xyXG5cclxuICBwcml2YXRlIHJlc29sdXRpb24kJDogU3Vic2NyaXB0aW9uO1xyXG5cclxuICBsYXllcnMkOiBCZWhhdmlvclN1YmplY3Q8TGF5ZXI+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxMYXllcj4odW5kZWZpbmVkKTtcclxuXHJcbiAgQElucHV0KClcclxuICBnZXQgbGF5ZXIoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fbGF5ZXI7XHJcbiAgfVxyXG4gIHNldCBsYXllcih2YWx1ZSkge1xyXG4gICAgdGhpcy5fbGF5ZXIgPSB2YWx1ZTtcclxuICAgIHRoaXMubGF5ZXJzJC5uZXh0KHZhbHVlKTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfbGF5ZXI7XHJcblxyXG4gIEBJbnB1dCgpIHRvZ2dsZUxlZ2VuZE9uVmlzaWJpbGl0eUNoYW5nZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICBASW5wdXQoKSBleHBhbmRMZWdlbmRJZlZpc2libGU6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgQElucHV0KCkgdXBkYXRlTGVnZW5kT25SZXNvbHV0aW9uQ2hhbmdlOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIEBJbnB1dCgpIG9yZGVyYWJsZTogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gIEBJbnB1dCgpIGxvd2VyRGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgQElucHV0KCkgcmFpc2VEaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICBASW5wdXQoKSBxdWVyeUJhZGdlOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIEBJbnB1dCgpIHNlbGVjdGlvbk1vZGU7XHJcblxyXG4gIGdldCByZW1vdmFibGUoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5sYXllci5vcHRpb25zLnJlbW92YWJsZSAhPT0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBnZXQgb3BhY2l0eSgpIHtcclxuICAgIHJldHVybiB0aGlzLmxheWVyLm9wYWNpdHkgKiAxMDA7XHJcbiAgfVxyXG4gIHNldCBvcGFjaXR5KG9wYWNpdHk6IG51bWJlcikge1xyXG4gICAgdGhpcy5sYXllci5vcGFjaXR5ID0gb3BhY2l0eSAvIDEwMDtcclxuICB9XHJcblxyXG4gIEBPdXRwdXQoKSBhY3Rpb246IEV2ZW50RW1pdHRlcjxMYXllcj4gPSBuZXcgRXZlbnRFbWl0dGVyPExheWVyPih1bmRlZmluZWQpO1xyXG4gIEBPdXRwdXQoKSBjaGVja2JveCA9IG5ldyBFdmVudEVtaXR0ZXI8e1xyXG4gICAgbGF5ZXI6IExheWVyO1xyXG4gICAgY2hlY2s6IGJvb2xlYW47XHJcbiAgfT4oKTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIG5ldHdvcmtTZXJ2aWNlOiBOZXR3b3JrU2VydmljZSxcclxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcclxuICAgIHByaXZhdGUgZWxSZWY6IEVsZW1lbnRSZWYpIHt9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgaWYgKFxyXG4gICAgICB0aGlzLmxheWVyLnZpc2libGUgJiZcclxuICAgICAgdGhpcy5leHBhbmRMZWdlbmRJZlZpc2libGUgJiZcclxuICAgICAgdGhpcy5sYXllci5maXJzdExvYWRDb21wb25lbnQgPT09IHRydWVcclxuICAgICkge1xyXG4gICAgICB0aGlzLmxheWVyLmZpcnN0TG9hZENvbXBvbmVudCA9IGZhbHNlO1xyXG4gICAgICB0aGlzLmxheWVyLmxlZ2VuZENvbGxhcHNlZCA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgdGhpcy50b2dnbGVMZWdlbmQodGhpcy5sYXllci5sZWdlbmRDb2xsYXBzZWQpO1xyXG4gICAgdGhpcy51cGRhdGVRdWVyeUJhZGdlKCk7XHJcblxyXG4gICAgY29uc3QgcmVzb2x1dGlvbiQgPSB0aGlzLmxheWVyLm1hcC52aWV3Q29udHJvbGxlci5yZXNvbHV0aW9uJDtcclxuICAgIHRoaXMucmVzb2x1dGlvbiQkID0gcmVzb2x1dGlvbiQuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgdGhpcy5vblJlc29sdXRpb25DaGFuZ2UoKTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy50b29sdGlwVGV4dCA9IHRoaXMuY29tcHV0ZVRvb2x0aXAoKTtcclxuXHJcbiAgICB0aGlzLm5ldHdvcmtTZXJ2aWNlLmN1cnJlbnRTdGF0ZSgpLnN1YnNjcmliZSgoc3RhdGU6IENvbm5lY3Rpb25TdGF0ZSkgPT4ge1xyXG4gICAgICB0aGlzLnN0YXRlID0gc3RhdGU7XHJcbiAgICAgIHRoaXMub25SZXNvbHV0aW9uQ2hhbmdlKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLmxheWVycyQuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgaWYgKHRoaXMubGF5ZXIgJiYgdGhpcy5sYXllci5vcHRpb25zLmFjdGl2ZSkge1xyXG4gICAgICAgIHRoaXMubGF5ZXJUb29sJC5uZXh0KHRydWUpO1xyXG4gICAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LCB0aGlzLmZvY3VzZWRDbHMpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgdGhpcy5yZXNvbHV0aW9uJCQudW5zdWJzY3JpYmUoKTtcclxuICB9XHJcblxyXG4gIHRvZ2dsZUxlZ2VuZChjb2xsYXBzZWQ6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMubGF5ZXIubGVnZW5kQ29sbGFwc2VkID0gY29sbGFwc2VkO1xyXG4gICAgdGhpcy5zaG93TGVnZW5kJC5uZXh0KCFjb2xsYXBzZWQpO1xyXG4gIH1cclxuXHJcbiAgdG9nZ2xlTGVnZW5kT25DbGljaygpIHtcclxuICAgIHRoaXMudG9nZ2xlTGVnZW5kKHRoaXMuc2hvd0xlZ2VuZCQudmFsdWUpO1xyXG4gIH1cclxuXHJcbiAgdG9nZ2xlVmlzaWJpbGl0eSgpIHtcclxuICAgIHRoaXMubGF5ZXIudmlzaWJsZSA9ICF0aGlzLmxheWVyLnZpc2libGU7XHJcbiAgICBpZiAodGhpcy50b2dnbGVMZWdlbmRPblZpc2liaWxpdHlDaGFuZ2UpIHtcclxuICAgICAgdGhpcy50b2dnbGVMZWdlbmQoIXRoaXMubGF5ZXIudmlzaWJsZSk7XHJcbiAgICB9XHJcbiAgICB0aGlzLnVwZGF0ZVF1ZXJ5QmFkZ2UoKTtcclxuICB9XHJcblxyXG4gIGNvbXB1dGVUb29sdGlwKCk6IHN0cmluZyB7XHJcbiAgICBjb25zdCBsYXllck9wdGlvbnMgPSB0aGlzLmxheWVyLm9wdGlvbnM7XHJcbiAgICBpZiAoIWxheWVyT3B0aW9ucy50b29sdGlwKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmxheWVyLnRpdGxlO1xyXG4gICAgfVxyXG4gICAgY29uc3QgbGF5ZXJUb29sdGlwID0gbGF5ZXJPcHRpb25zLnRvb2x0aXA7XHJcbiAgICBjb25zdCBsYXllck1ldGFkYXRhID0gKGxheWVyT3B0aW9ucyBhcyBNZXRhZGF0YUxheWVyT3B0aW9ucykubWV0YWRhdGE7XHJcbiAgICBzd2l0Y2ggKGxheWVyT3B0aW9ucy50b29sdGlwLnR5cGUpIHtcclxuICAgICAgY2FzZSBUb29sdGlwVHlwZS5USVRMRTpcclxuICAgICAgICByZXR1cm4gdGhpcy5sYXllci50aXRsZTtcclxuICAgICAgY2FzZSBUb29sdGlwVHlwZS5BQlNUUkFDVDpcclxuICAgICAgICBpZiAobGF5ZXJNZXRhZGF0YSAmJiBsYXllck1ldGFkYXRhLmFic3RyYWN0KSB7XHJcbiAgICAgICAgICByZXR1cm4gbGF5ZXJNZXRhZGF0YS5hYnN0cmFjdDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcmV0dXJuIHRoaXMubGF5ZXIudGl0bGU7XHJcbiAgICAgICAgfVxyXG4gICAgICBjYXNlIFRvb2x0aXBUeXBlLkNVU1RPTTpcclxuICAgICAgICBpZiAobGF5ZXJUb29sdGlwICYmIGxheWVyVG9vbHRpcC50ZXh0KSB7XHJcbiAgICAgICAgICByZXR1cm4gbGF5ZXJUb29sdGlwLnRleHQ7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHJldHVybiB0aGlzLmxheWVyLnRpdGxlO1xyXG4gICAgICAgIH1cclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICByZXR1cm4gdGhpcy5sYXllci50aXRsZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgb25SZXNvbHV0aW9uQ2hhbmdlKCkge1xyXG4gICAgY29uc3QgaW5SZXNvbHV0aW9uUmFuZ2UgPSB0aGlzLmxheWVyLmlzSW5SZXNvbHV0aW9uc1JhbmdlO1xyXG4gICAgaWYgKFxyXG4gICAgICBpblJlc29sdXRpb25SYW5nZSA9PT0gZmFsc2UgJiZcclxuICAgICAgdGhpcy51cGRhdGVMZWdlbmRPblJlc29sdXRpb25DaGFuZ2UgPT09IHRydWVcclxuICAgICkge1xyXG4gICAgICB0aGlzLnRvZ2dsZUxlZ2VuZCh0cnVlKTtcclxuICAgIH1cclxuICAgIHRoaXMuaW5SZXNvbHV0aW9uUmFuZ2UkLm5leHQoaW5SZXNvbHV0aW9uUmFuZ2UpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSB1cGRhdGVRdWVyeUJhZGdlKCkge1xyXG4gICAgY29uc3QgaGlkZGVuID1cclxuICAgICAgdGhpcy5xdWVyeUJhZGdlID09PSBmYWxzZSB8fFxyXG4gICAgICB0aGlzLmxheWVyLnZpc2libGUgPT09IGZhbHNlIHx8XHJcbiAgICAgICFsYXllcklzUXVlcnlhYmxlKHRoaXMubGF5ZXIpO1xyXG4gICAgdGhpcy5xdWVyeUJhZGdlSGlkZGVuJC5uZXh0KGhpZGRlbik7XHJcbiAgfVxyXG5cclxuICB0b2dnbGVMYXllclRvb2woKSB7XHJcbiAgICB0aGlzLmxheWVyVG9vbCQubmV4dCghdGhpcy5sYXllclRvb2wkLmdldFZhbHVlKCkpO1xyXG4gICAgaWYgKHRoaXMubGF5ZXJUb29sJC5nZXRWYWx1ZSgpID09PSB0cnVlKSB7XHJcbiAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LCB0aGlzLmZvY3VzZWRDbHMpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQsIHRoaXMuZm9jdXNlZENscyk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmFjdGlvbi5lbWl0KHRoaXMubGF5ZXIpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGNoZWNrKCkge1xyXG4gICAgdGhpcy5sYXllckNoZWNrID0gIXRoaXMubGF5ZXJDaGVjaztcclxuICAgIHRoaXMuY2hlY2tib3guZW1pdCh7bGF5ZXI6IHRoaXMubGF5ZXIsIGNoZWNrOiB0aGlzLmxheWVyQ2hlY2t9KTtcclxuICB9XHJcbn1cclxuIl19
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Layer, TooltipType } from '../shared/layers';
import { NetworkService } from '@igo2/core';
export class LayerLegendItemComponent {
    /**
     * @param {?} networkService
     */
    constructor(networkService) {
        this.networkService = networkService;
        this.inResolutionRange$ = new BehaviorSubject(true);
        this.updateLegendOnResolutionChange = false;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.layer.legendCollapsed = true;
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
        this.inResolutionRange$.next(inResolutionRange);
    }
}
LayerLegendItemComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-layer-legend-item',
                template: "<mat-list-item class= \"igo-layer-list-item\">\r\n  <h4 matLine class=\"igo-layer-title\" [matTooltip]=\"tooltipText\" matTooltipShowDelay=\"500\">{{layer.title}}</h4>\r\n</mat-list-item>\r\n\r\n<div #legend class=\"igo-layer-legend-container\">\r\n  <igo-layer-legend\r\n    [layer]=\"layer\"\r\n    [updateLegendOnResolutionChange]=\"updateLegendOnResolutionChange\">\r\n  </igo-layer-legend>\r\n</div>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{overflow:hidden}.igo-layer-list-item{height:46px;clear:both}.igo-layer-actions-container{width:100%;display:inline-block;padding-left:10px}.igo-layer-actions-container>div{text-align:center}.igo-layer-legend-container{padding-left:18px;width:calc(100% - 18px)}#opacity-slider{float:left}.igo-layer-button-group{text-align:right;padding:0 10px 0 0;width:100%}mat-icon.disabled{color:rgba(0,0,0,.38)}.mat-badge-small .mat-badge-content{font-size:12px}"]
            }] }
];
/** @nocollapse */
LayerLegendItemComponent.ctorParameters = () => [
    { type: NetworkService }
];
LayerLegendItemComponent.propDecorators = {
    layer: [{ type: Input }],
    updateLegendOnResolutionChange: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    LayerLegendItemComponent.prototype.inResolutionRange$;
    /** @type {?} */
    LayerLegendItemComponent.prototype.tooltipText;
    /** @type {?} */
    LayerLegendItemComponent.prototype.state;
    /**
     * @type {?}
     * @private
     */
    LayerLegendItemComponent.prototype.resolution$$;
    /** @type {?} */
    LayerLegendItemComponent.prototype.layer;
    /** @type {?} */
    LayerLegendItemComponent.prototype.updateLegendOnResolutionChange;
    /**
     * @type {?}
     * @private
     */
    LayerLegendItemComponent.prototype.networkService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5ZXItbGVnZW5kLWl0ZW0uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL2xheWVyL2xheWVyLWxlZ2VuZC1pdGVtL2xheWVyLWxlZ2VuZC1pdGVtLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBR0wsdUJBQXVCLEVBQ3hCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBZ0IsZUFBZSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBR3JELE9BQU8sRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDdEQsT0FBTyxFQUFFLGNBQWMsRUFBbUIsTUFBTSxZQUFZLENBQUM7QUFRN0QsTUFBTSxPQUFPLHdCQUF3Qjs7OztJQWNuQyxZQUFvQixjQUE4QjtRQUE5QixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFabEQsdUJBQWtCLEdBQTZCLElBQUksZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBVWhFLG1DQUE4QixHQUFZLEtBQUssQ0FBQztJQUVKLENBQUM7Ozs7SUFFdEQsUUFBUTtRQUNOLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQzs7Y0FFNUIsV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxXQUFXO1FBQzdELElBQUksQ0FBQyxZQUFZLEdBQUcsV0FBVyxDQUFDLFNBQVM7OztRQUFDLEdBQUcsRUFBRTtZQUM3QyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUM1QixDQUFDLEVBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBRXpDLElBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxFQUFFLENBQUMsU0FBUzs7OztRQUFDLENBQUMsS0FBc0IsRUFBRSxFQUFFO1lBQ3RFLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1lBQ25CLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBQzVCLENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7OztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ2xDLENBQUM7Ozs7SUFFRCxjQUFjOztjQUNOLFlBQVksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU87UUFDdkMsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUU7WUFDekIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQztTQUN6Qjs7Y0FDSyxZQUFZLEdBQUcsWUFBWSxDQUFDLE9BQU87O2NBQ25DLGFBQWEsR0FBRyxDQUFDLG1CQUFBLFlBQVksRUFBd0IsQ0FBQyxDQUFDLFFBQVE7UUFDckUsUUFBUSxZQUFZLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRTtZQUNqQyxLQUFLLFdBQVcsQ0FBQyxLQUFLO2dCQUNwQixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO1lBQzFCLEtBQUssV0FBVyxDQUFDLFFBQVE7Z0JBQ3ZCLElBQUksYUFBYSxJQUFJLGFBQWEsQ0FBQyxRQUFRLEVBQUU7b0JBQzNDLE9BQU8sYUFBYSxDQUFDLFFBQVEsQ0FBQztpQkFDL0I7cUJBQU07b0JBQ0wsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQztpQkFDekI7WUFDSCxLQUFLLFdBQVcsQ0FBQyxNQUFNO2dCQUNyQixJQUFJLFlBQVksSUFBSSxZQUFZLENBQUMsSUFBSSxFQUFFO29CQUNyQyxPQUFPLFlBQVksQ0FBQyxJQUFJLENBQUM7aUJBQzFCO3FCQUFNO29CQUNMLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7aUJBQ3pCO1lBQ0g7Z0JBQ0UsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQztTQUMzQjtJQUNILENBQUM7Ozs7O0lBRU8sa0JBQWtCOztjQUNsQixpQkFBaUIsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLG9CQUFvQjtRQUN6RCxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFDbEQsQ0FBQzs7O1lBdkVGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsdUJBQXVCO2dCQUNqQyxvYUFBaUQ7Z0JBRWpELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOzthQUNoRDs7OztZQVBRLGNBQWM7OztvQkFrQnBCLEtBQUs7NkNBRUwsS0FBSzs7OztJQVZOLHNEQUF5RTs7SUFFekUsK0NBQW9COztJQUVwQix5Q0FBdUI7Ozs7O0lBRXZCLGdEQUFtQzs7SUFFbkMseUNBQXNCOztJQUV0QixrRUFBeUQ7Ozs7O0lBRTdDLGtEQUFzQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIElucHV0LFxyXG4gIE9uSW5pdCxcclxuICBPbkRlc3Ryb3ksXHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3lcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uLCBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7IE1ldGFkYXRhTGF5ZXJPcHRpb25zIH0gZnJvbSAnLi4vLi4vbWV0YWRhdGEvc2hhcmVkL21ldGFkYXRhLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IExheWVyLCBUb29sdGlwVHlwZSB9IGZyb20gJy4uL3NoYXJlZC9sYXllcnMnO1xyXG5pbXBvcnQgeyBOZXR3b3JrU2VydmljZSwgQ29ubmVjdGlvblN0YXRlIH0gZnJvbSAnQGlnbzIvY29yZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2lnby1sYXllci1sZWdlbmQtaXRlbScsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2xheWVyLWxlZ2VuZC1pdGVtLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9sYXllci1sZWdlbmQtaXRlbS5jb21wb25lbnQuc2NzcyddLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBMYXllckxlZ2VuZEl0ZW1Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcblxyXG4gIGluUmVzb2x1dGlvblJhbmdlJDogQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IEJlaGF2aW9yU3ViamVjdCh0cnVlKTtcclxuXHJcbiAgdG9vbHRpcFRleHQ6IHN0cmluZztcclxuXHJcbiAgc3RhdGU6IENvbm5lY3Rpb25TdGF0ZTtcclxuXHJcbiAgcHJpdmF0ZSByZXNvbHV0aW9uJCQ6IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgQElucHV0KCkgbGF5ZXI6IExheWVyO1xyXG5cclxuICBASW5wdXQoKSB1cGRhdGVMZWdlbmRPblJlc29sdXRpb25DaGFuZ2U6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBuZXR3b3JrU2VydmljZTogTmV0d29ya1NlcnZpY2UpIHt9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5sYXllci5sZWdlbmRDb2xsYXBzZWQgPSB0cnVlO1xyXG5cclxuICAgIGNvbnN0IHJlc29sdXRpb24kID0gdGhpcy5sYXllci5tYXAudmlld0NvbnRyb2xsZXIucmVzb2x1dGlvbiQ7XHJcbiAgICB0aGlzLnJlc29sdXRpb24kJCA9IHJlc29sdXRpb24kLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgIHRoaXMub25SZXNvbHV0aW9uQ2hhbmdlKCk7XHJcbiAgICB9KTtcclxuICAgIHRoaXMudG9vbHRpcFRleHQgPSB0aGlzLmNvbXB1dGVUb29sdGlwKCk7XHJcblxyXG4gICAgdGhpcy5uZXR3b3JrU2VydmljZS5jdXJyZW50U3RhdGUoKS5zdWJzY3JpYmUoKHN0YXRlOiBDb25uZWN0aW9uU3RhdGUpID0+IHtcclxuICAgICAgdGhpcy5zdGF0ZSA9IHN0YXRlO1xyXG4gICAgICB0aGlzLm9uUmVzb2x1dGlvbkNoYW5nZSgpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMucmVzb2x1dGlvbiQkLnVuc3Vic2NyaWJlKCk7XHJcbiAgfVxyXG5cclxuICBjb21wdXRlVG9vbHRpcCgpOiBzdHJpbmcge1xyXG4gICAgY29uc3QgbGF5ZXJPcHRpb25zID0gdGhpcy5sYXllci5vcHRpb25zO1xyXG4gICAgaWYgKCFsYXllck9wdGlvbnMudG9vbHRpcCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5sYXllci50aXRsZTtcclxuICAgIH1cclxuICAgIGNvbnN0IGxheWVyVG9vbHRpcCA9IGxheWVyT3B0aW9ucy50b29sdGlwO1xyXG4gICAgY29uc3QgbGF5ZXJNZXRhZGF0YSA9IChsYXllck9wdGlvbnMgYXMgTWV0YWRhdGFMYXllck9wdGlvbnMpLm1ldGFkYXRhO1xyXG4gICAgc3dpdGNoIChsYXllck9wdGlvbnMudG9vbHRpcC50eXBlKSB7XHJcbiAgICAgIGNhc2UgVG9vbHRpcFR5cGUuVElUTEU6XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubGF5ZXIudGl0bGU7XHJcbiAgICAgIGNhc2UgVG9vbHRpcFR5cGUuQUJTVFJBQ1Q6XHJcbiAgICAgICAgaWYgKGxheWVyTWV0YWRhdGEgJiYgbGF5ZXJNZXRhZGF0YS5hYnN0cmFjdCkge1xyXG4gICAgICAgICAgcmV0dXJuIGxheWVyTWV0YWRhdGEuYWJzdHJhY3Q7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHJldHVybiB0aGlzLmxheWVyLnRpdGxlO1xyXG4gICAgICAgIH1cclxuICAgICAgY2FzZSBUb29sdGlwVHlwZS5DVVNUT006XHJcbiAgICAgICAgaWYgKGxheWVyVG9vbHRpcCAmJiBsYXllclRvb2x0aXAudGV4dCkge1xyXG4gICAgICAgICAgcmV0dXJuIGxheWVyVG9vbHRpcC50ZXh0O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICByZXR1cm4gdGhpcy5sYXllci50aXRsZTtcclxuICAgICAgICB9XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubGF5ZXIudGl0bGU7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG9uUmVzb2x1dGlvbkNoYW5nZSgpIHtcclxuICAgIGNvbnN0IGluUmVzb2x1dGlvblJhbmdlID0gdGhpcy5sYXllci5pc0luUmVzb2x1dGlvbnNSYW5nZTtcclxuICAgIHRoaXMuaW5SZXNvbHV0aW9uUmFuZ2UkLm5leHQoaW5SZXNvbHV0aW9uUmFuZ2UpO1xyXG4gIH1cclxufVxyXG4iXX0=
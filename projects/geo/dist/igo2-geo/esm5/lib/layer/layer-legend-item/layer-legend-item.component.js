/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Layer, TooltipType } from '../shared/layers';
import { NetworkService } from '@igo2/core';
var LayerLegendItemComponent = /** @class */ (function () {
    function LayerLegendItemComponent(networkService) {
        this.networkService = networkService;
        this.inResolutionRange$ = new BehaviorSubject(true);
        this.updateLegendOnResolutionChange = false;
    }
    /**
     * @return {?}
     */
    LayerLegendItemComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.layer.legendCollapsed = true;
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
    };
    /**
     * @return {?}
     */
    LayerLegendItemComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.resolution$$.unsubscribe();
    };
    /**
     * @return {?}
     */
    LayerLegendItemComponent.prototype.computeTooltip = /**
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
    LayerLegendItemComponent.prototype.onResolutionChange = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var inResolutionRange = this.layer.isInResolutionsRange;
        this.inResolutionRange$.next(inResolutionRange);
    };
    LayerLegendItemComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-layer-legend-item',
                    template: "<mat-list-item class= \"igo-layer-list-item\">\r\n  <h4 matLine class=\"igo-layer-title\" [matTooltip]=\"tooltipText\" matTooltipShowDelay=\"500\">{{layer.title}}</h4>\r\n</mat-list-item>\r\n\r\n<div #legend class=\"igo-layer-legend-container\">\r\n  <igo-layer-legend\r\n    [layer]=\"layer\"\r\n    [updateLegendOnResolutionChange]=\"updateLegendOnResolutionChange\">\r\n  </igo-layer-legend>\r\n</div>\r\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [":host{overflow:hidden}.igo-layer-list-item{height:46px;clear:both}.igo-layer-actions-container{width:100%;display:inline-block;padding-left:10px}.igo-layer-actions-container>div{text-align:center}.igo-layer-legend-container{padding-left:18px;width:calc(100% - 18px)}#opacity-slider{float:left}.igo-layer-button-group{text-align:right;padding:0 10px 0 0;width:100%}mat-icon.disabled{color:rgba(0,0,0,.38)}.mat-badge-small .mat-badge-content{font-size:12px}"]
                }] }
    ];
    /** @nocollapse */
    LayerLegendItemComponent.ctorParameters = function () { return [
        { type: NetworkService }
    ]; };
    LayerLegendItemComponent.propDecorators = {
        layer: [{ type: Input }],
        updateLegendOnResolutionChange: [{ type: Input }]
    };
    return LayerLegendItemComponent;
}());
export { LayerLegendItemComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5ZXItbGVnZW5kLWl0ZW0uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL2xheWVyL2xheWVyLWxlZ2VuZC1pdGVtL2xheWVyLWxlZ2VuZC1pdGVtLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBR0wsdUJBQXVCLEVBQ3hCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBZ0IsZUFBZSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBR3JELE9BQU8sRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDdEQsT0FBTyxFQUFFLGNBQWMsRUFBbUIsTUFBTSxZQUFZLENBQUM7QUFFN0Q7SUFvQkUsa0NBQW9CLGNBQThCO1FBQTlCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQVpsRCx1QkFBa0IsR0FBNkIsSUFBSSxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7UUFVaEUsbUNBQThCLEdBQVksS0FBSyxDQUFDO0lBRUosQ0FBQzs7OztJQUV0RCwyQ0FBUTs7O0lBQVI7UUFBQSxpQkFhQztRQVpDLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQzs7WUFFNUIsV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxXQUFXO1FBQzdELElBQUksQ0FBQyxZQUFZLEdBQUcsV0FBVyxDQUFDLFNBQVM7OztRQUFDO1lBQ3hDLEtBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBQzVCLENBQUMsRUFBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFFekMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxTQUFTOzs7O1FBQUMsVUFBQyxLQUFzQjtZQUNsRSxLQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUNuQixLQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUM1QixDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7Ozs7SUFFRCw4Q0FBVzs7O0lBQVg7UUFDRSxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ2xDLENBQUM7Ozs7SUFFRCxpREFBYzs7O0lBQWQ7O1lBQ1EsWUFBWSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTztRQUN2QyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRTtZQUN6QixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO1NBQ3pCOztZQUNLLFlBQVksR0FBRyxZQUFZLENBQUMsT0FBTzs7WUFDbkMsYUFBYSxHQUFHLENBQUMsbUJBQUEsWUFBWSxFQUF3QixDQUFDLENBQUMsUUFBUTtRQUNyRSxRQUFRLFlBQVksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFO1lBQ2pDLEtBQUssV0FBVyxDQUFDLEtBQUs7Z0JBQ3BCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7WUFDMUIsS0FBSyxXQUFXLENBQUMsUUFBUTtnQkFDdkIsSUFBSSxhQUFhLElBQUksYUFBYSxDQUFDLFFBQVEsRUFBRTtvQkFDM0MsT0FBTyxhQUFhLENBQUMsUUFBUSxDQUFDO2lCQUMvQjtxQkFBTTtvQkFDTCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO2lCQUN6QjtZQUNILEtBQUssV0FBVyxDQUFDLE1BQU07Z0JBQ3JCLElBQUksWUFBWSxJQUFJLFlBQVksQ0FBQyxJQUFJLEVBQUU7b0JBQ3JDLE9BQU8sWUFBWSxDQUFDLElBQUksQ0FBQztpQkFDMUI7cUJBQU07b0JBQ0wsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQztpQkFDekI7WUFDSDtnQkFDRSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO1NBQzNCO0lBQ0gsQ0FBQzs7Ozs7SUFFTyxxREFBa0I7Ozs7SUFBMUI7O1lBQ1EsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxvQkFBb0I7UUFDekQsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBQ2xELENBQUM7O2dCQXZFRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLHVCQUF1QjtvQkFDakMsb2FBQWlEO29CQUVqRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7aUJBQ2hEOzs7O2dCQVBRLGNBQWM7Ozt3QkFrQnBCLEtBQUs7aURBRUwsS0FBSzs7SUFzRFIsK0JBQUM7Q0FBQSxBQXhFRCxJQXdFQztTQWxFWSx3QkFBd0I7OztJQUVuQyxzREFBeUU7O0lBRXpFLCtDQUFvQjs7SUFFcEIseUNBQXVCOzs7OztJQUV2QixnREFBbUM7O0lBRW5DLHlDQUFzQjs7SUFFdEIsa0VBQXlEOzs7OztJQUU3QyxrREFBc0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBJbnB1dCxcclxuICBPbkluaXQsXHJcbiAgT25EZXN0cm95LFxyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5XHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiwgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQgeyBNZXRhZGF0YUxheWVyT3B0aW9ucyB9IGZyb20gJy4uLy4uL21ldGFkYXRhL3NoYXJlZC9tZXRhZGF0YS5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBMYXllciwgVG9vbHRpcFR5cGUgfSBmcm9tICcuLi9zaGFyZWQvbGF5ZXJzJztcclxuaW1wb3J0IHsgTmV0d29ya1NlcnZpY2UsIENvbm5lY3Rpb25TdGF0ZSB9IGZyb20gJ0BpZ28yL2NvcmUnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdpZ28tbGF5ZXItbGVnZW5kLWl0ZW0nLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9sYXllci1sZWdlbmQtaXRlbS5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vbGF5ZXItbGVnZW5kLWl0ZW0uY29tcG9uZW50LnNjc3MnXSxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTGF5ZXJMZWdlbmRJdGVtQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG5cclxuICBpblJlc29sdXRpb25SYW5nZSQ6IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPiA9IG5ldyBCZWhhdmlvclN1YmplY3QodHJ1ZSk7XHJcblxyXG4gIHRvb2x0aXBUZXh0OiBzdHJpbmc7XHJcblxyXG4gIHN0YXRlOiBDb25uZWN0aW9uU3RhdGU7XHJcblxyXG4gIHByaXZhdGUgcmVzb2x1dGlvbiQkOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIEBJbnB1dCgpIGxheWVyOiBMYXllcjtcclxuXHJcbiAgQElucHV0KCkgdXBkYXRlTGVnZW5kT25SZXNvbHV0aW9uQ2hhbmdlOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbmV0d29ya1NlcnZpY2U6IE5ldHdvcmtTZXJ2aWNlKSB7fVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMubGF5ZXIubGVnZW5kQ29sbGFwc2VkID0gdHJ1ZTtcclxuXHJcbiAgICBjb25zdCByZXNvbHV0aW9uJCA9IHRoaXMubGF5ZXIubWFwLnZpZXdDb250cm9sbGVyLnJlc29sdXRpb24kO1xyXG4gICAgdGhpcy5yZXNvbHV0aW9uJCQgPSByZXNvbHV0aW9uJC5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICB0aGlzLm9uUmVzb2x1dGlvbkNoYW5nZSgpO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLnRvb2x0aXBUZXh0ID0gdGhpcy5jb21wdXRlVG9vbHRpcCgpO1xyXG5cclxuICAgIHRoaXMubmV0d29ya1NlcnZpY2UuY3VycmVudFN0YXRlKCkuc3Vic2NyaWJlKChzdGF0ZTogQ29ubmVjdGlvblN0YXRlKSA9PiB7XHJcbiAgICAgIHRoaXMuc3RhdGUgPSBzdGF0ZTtcclxuICAgICAgdGhpcy5vblJlc29sdXRpb25DaGFuZ2UoKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLnJlc29sdXRpb24kJC51bnN1YnNjcmliZSgpO1xyXG4gIH1cclxuXHJcbiAgY29tcHV0ZVRvb2x0aXAoKTogc3RyaW5nIHtcclxuICAgIGNvbnN0IGxheWVyT3B0aW9ucyA9IHRoaXMubGF5ZXIub3B0aW9ucztcclxuICAgIGlmICghbGF5ZXJPcHRpb25zLnRvb2x0aXApIHtcclxuICAgICAgcmV0dXJuIHRoaXMubGF5ZXIudGl0bGU7XHJcbiAgICB9XHJcbiAgICBjb25zdCBsYXllclRvb2x0aXAgPSBsYXllck9wdGlvbnMudG9vbHRpcDtcclxuICAgIGNvbnN0IGxheWVyTWV0YWRhdGEgPSAobGF5ZXJPcHRpb25zIGFzIE1ldGFkYXRhTGF5ZXJPcHRpb25zKS5tZXRhZGF0YTtcclxuICAgIHN3aXRjaCAobGF5ZXJPcHRpb25zLnRvb2x0aXAudHlwZSkge1xyXG4gICAgICBjYXNlIFRvb2x0aXBUeXBlLlRJVExFOlxyXG4gICAgICAgIHJldHVybiB0aGlzLmxheWVyLnRpdGxlO1xyXG4gICAgICBjYXNlIFRvb2x0aXBUeXBlLkFCU1RSQUNUOlxyXG4gICAgICAgIGlmIChsYXllck1ldGFkYXRhICYmIGxheWVyTWV0YWRhdGEuYWJzdHJhY3QpIHtcclxuICAgICAgICAgIHJldHVybiBsYXllck1ldGFkYXRhLmFic3RyYWN0O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICByZXR1cm4gdGhpcy5sYXllci50aXRsZTtcclxuICAgICAgICB9XHJcbiAgICAgIGNhc2UgVG9vbHRpcFR5cGUuQ1VTVE9NOlxyXG4gICAgICAgIGlmIChsYXllclRvb2x0aXAgJiYgbGF5ZXJUb29sdGlwLnRleHQpIHtcclxuICAgICAgICAgIHJldHVybiBsYXllclRvb2x0aXAudGV4dDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcmV0dXJuIHRoaXMubGF5ZXIudGl0bGU7XHJcbiAgICAgICAgfVxyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIHJldHVybiB0aGlzLmxheWVyLnRpdGxlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBvblJlc29sdXRpb25DaGFuZ2UoKSB7XHJcbiAgICBjb25zdCBpblJlc29sdXRpb25SYW5nZSA9IHRoaXMubGF5ZXIuaXNJblJlc29sdXRpb25zUmFuZ2U7XHJcbiAgICB0aGlzLmluUmVzb2x1dGlvblJhbmdlJC5uZXh0KGluUmVzb2x1dGlvblJhbmdlKTtcclxuICB9XHJcbn1cclxuIl19
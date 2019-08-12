/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { Layer } from '../shared/layers';
import { CapabilitiesService } from '../../datasource/shared/capabilities.service';
import { map } from 'rxjs/operators';
var LayerLegendComponent = /** @class */ (function () {
    function LayerLegendComponent(capabilitiesService) {
        this.capabilitiesService = capabilitiesService;
        this.updateLegendOnResolutionChange = false;
        /**
         * Observable of the legend items
         */
        this.legendItems$ = new BehaviorSubject([]);
    }
    /**
     * On init, subscribe to the map's resolution and update the legend accordingly
     */
    /**
     * On init, subscribe to the map's resolution and update the legend accordingly
     * @return {?}
     */
    LayerLegendComponent.prototype.ngOnInit = /**
     * On init, subscribe to the map's resolution and update the legend accordingly
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.updateLegendOnResolutionChange === true) {
            /** @type {?} */
            var resolution$ = this.layer.map.viewController.resolution$;
            this.resolution$$ = resolution$.subscribe((/**
             * @param {?} resolution
             * @return {?}
             */
            function (resolution) { return _this.onResolutionChange(resolution); }));
        }
        else {
            this.updateLegend(undefined);
        }
    };
    /**
     * On destroy, unsubscribe to the map,s resolution
     */
    /**
     * On destroy, unsubscribe to the map,s resolution
     * @return {?}
     */
    LayerLegendComponent.prototype.ngOnDestroy = /**
     * On destroy, unsubscribe to the map,s resolution
     * @return {?}
     */
    function () {
        if (this.resolution$$ !== undefined) {
            this.resolution$$.unsubscribe();
        }
    };
    /**
     * @param {?} layerLegend
     * @return {?}
     */
    LayerLegendComponent.prototype.computeItemTitle = /**
     * @param {?} layerLegend
     * @return {?}
     */
    function (layerLegend) {
        /** @type {?} */
        var layerOptions = (/** @type {?} */ (this.layer.dataSource.options));
        if (layerOptions.type !== 'wms') {
            return of(layerLegend.title);
        }
        /** @type {?} */
        var layers = layerOptions.params.layers.split(',');
        /** @type {?} */
        var localLayerOptions = JSON.parse(JSON.stringify(layerOptions));
        localLayerOptions.params.layers = layers.find((/**
         * @param {?} layer
         * @return {?}
         */
        function (layer) { return layer === layerLegend.title; }));
        return this.capabilitiesService
            .getWMSOptions(localLayerOptions)
            .pipe(map((/**
         * @param {?} wmsDataSourceOptions
         * @return {?}
         */
        function (wmsDataSourceOptions) {
            return wmsDataSourceOptions._layerOptionsFromCapabilities.title;
        })));
    };
    /**
     * On resolution change, compute the effective scale level and update the
     * legend accordingly.
     * @param resolutione Map resolution
     */
    /**
     * On resolution change, compute the effective scale level and update the
     * legend accordingly.
     * @private
     * @param {?} resolution
     * @return {?}
     */
    LayerLegendComponent.prototype.onResolutionChange = /**
     * On resolution change, compute the effective scale level and update the
     * legend accordingly.
     * @private
     * @param {?} resolution
     * @return {?}
     */
    function (resolution) {
        /** @type {?} */
        var scale = this.layer.map.viewController.getScale();
        this.updateLegend(scale);
    };
    /**
     * Update the legend according the scale level
     * @param scale Map scale level
     */
    /**
     * Update the legend according the scale level
     * @private
     * @param {?} scale Map scale level
     * @return {?}
     */
    LayerLegendComponent.prototype.updateLegend = /**
     * Update the legend according the scale level
     * @private
     * @param {?} scale Map scale level
     * @return {?}
     */
    function (scale) {
        /** @type {?} */
        var legendItems = this.layer.dataSource.getLegend(scale);
        if (legendItems.length === 0 && this.legendItems$.value.length === 0) {
            return;
        }
        this.legendItems$.next(legendItems);
    };
    LayerLegendComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-layer-legend',
                    template: "<ng-container *ngIf=\"legendItems$ | async as items\">\r\n  <ng-container *ngIf=\"items.length; else noItems\">\r\n    <ng-container *ngFor=\"let item of items\">\r\n      <mat-list-item *ngIf=\"item.title\">\r\n        <mat-icon\r\n          id=\"legend-toggle\"\r\n          class=\"igo-chevron\"\r\n          mat-list-avatar\r\n          igoCollapse\r\n          [target]=\"legend\"\r\n          [collapsed]=\"false\"\r\n          svgIcon=\"chevron-up\">\r\n        </mat-icon>\r\n        <h4 matLine>{{computeItemTitle(item) | async}}</h4>\r\n      </mat-list-item>\r\n    \r\n      <div #legend class=\"igo-layer-legend\" [ngClass]=\"{'with-title': item.title}\">\r\n        <img\r\n          *ngIf=\"item.url\"\r\n          src=\"{{(item.url | secureImage) |\u00A0async}}\"\r\n          alt=\"{{'igo.geo.layer.loadingLegendText' | translate}}\">\r\n        <div\r\n          [ngStyle]=\"item.style\"\r\n          [innerHTML]=\"item.html\"\r\n          *ngIf=\"item.html\">\r\n        </div>\r\n      </div>\r\n    </ng-container>\r\n  </ng-container>\r\n\r\n  <ng-template #noItems>\r\n    <small>\r\n      {{'igo.geo.layer.noLegendText' | translate}}\r\n    </small>\r\n  </ng-template>\r\n\r\n</ng-container>\r\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [".igo-layer-legend.with-title{padding-left:18px}"]
                }] }
    ];
    /** @nocollapse */
    LayerLegendComponent.ctorParameters = function () { return [
        { type: CapabilitiesService }
    ]; };
    LayerLegendComponent.propDecorators = {
        updateLegendOnResolutionChange: [{ type: Input }],
        layer: [{ type: Input }]
    };
    return LayerLegendComponent;
}());
export { LayerLegendComponent };
if (false) {
    /** @type {?} */
    LayerLegendComponent.prototype.updateLegendOnResolutionChange;
    /**
     * Observable of the legend items
     * @type {?}
     */
    LayerLegendComponent.prototype.legendItems$;
    /**
     * Subscription to the map's resolution
     * @type {?}
     * @private
     */
    LayerLegendComponent.prototype.resolution$$;
    /**
     * Layer
     * @type {?}
     */
    LayerLegendComponent.prototype.layer;
    /**
     * @type {?}
     * @private
     */
    LayerLegendComponent.prototype.capabilitiesService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5ZXItbGVnZW5kLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9sYXllci9sYXllci1sZWdlbmQvbGF5ZXItbGVnZW5kLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQXFCLHVCQUF1QixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTdGLE9BQU8sRUFBZ0IsZUFBZSxFQUFFLEVBQUUsRUFBYyxNQUFNLE1BQU0sQ0FBQztBQUdyRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDekMsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sOENBQThDLENBQUM7QUFDbkYsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXJDO0lBd0JFLDhCQUFvQixtQkFBd0M7UUFBeEMsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQWhCbkQsbUNBQThCLEdBQVksS0FBSyxDQUFDOzs7O1FBS3pELGlCQUFZLEdBQStDLElBQUksZUFBZSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBV3BCLENBQUM7SUFFaEU7O09BRUc7Ozs7O0lBQ0gsdUNBQVE7Ozs7SUFBUjtRQUFBLGlCQU9DO1FBTkMsSUFBSSxJQUFJLENBQUMsOEJBQThCLEtBQUssSUFBSSxFQUFFOztnQkFDMUMsV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxXQUFXO1lBQzdELElBQUksQ0FBQyxZQUFZLEdBQUcsV0FBVyxDQUFDLFNBQVM7Ozs7WUFBQyxVQUFDLFVBQWtCLElBQUssT0FBQSxLQUFJLENBQUMsa0JBQWtCLENBQUMsVUFBVSxDQUFDLEVBQW5DLENBQW1DLEVBQUMsQ0FBQztTQUN4RzthQUFNO1lBQ0wsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUM5QjtJQUNILENBQUM7SUFFRDs7T0FFRzs7Ozs7SUFDSCwwQ0FBVzs7OztJQUFYO1FBQ0UsSUFBSSxJQUFJLENBQUMsWUFBWSxLQUFLLFNBQVMsRUFBRTtZQUNuQyxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ2pDO0lBQ0gsQ0FBQzs7Ozs7SUFFRCwrQ0FBZ0I7Ozs7SUFBaEIsVUFBaUIsV0FBVzs7WUFDcEIsWUFBWSxHQUFHLG1CQUFBLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBTztRQUN6RCxJQUFJLFlBQVksQ0FBQyxJQUFJLEtBQUssS0FBSyxFQUFFO1lBQy9CLE9BQU8sRUFBRSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUM5Qjs7WUFFSyxNQUFNLEdBQUcsWUFBWSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQzs7WUFDOUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ2xFLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLElBQUk7Ozs7UUFBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUssS0FBSyxXQUFXLENBQUMsS0FBSyxFQUEzQixDQUEyQixFQUFDLENBQUM7UUFDcEYsT0FBTyxJQUFJLENBQUMsbUJBQW1CO2FBQzVCLGFBQWEsQ0FBQyxpQkFBaUIsQ0FBQzthQUNoQyxJQUFJLENBQUMsR0FBRzs7OztRQUFDLFVBQUEsb0JBQW9CO1lBQzVCLE9BQU8sb0JBQW9CLENBQUMsNkJBQTZCLENBQUMsS0FBSyxDQUFDO1FBQ2xFLENBQUMsRUFBQyxDQUFDLENBQUM7SUFDUixDQUFDO0lBRUQ7Ozs7T0FJRzs7Ozs7Ozs7SUFDSyxpREFBa0I7Ozs7Ozs7SUFBMUIsVUFBMkIsVUFBa0I7O1lBQ3JDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsUUFBUSxFQUFFO1FBQ3RELElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUVEOzs7T0FHRzs7Ozs7OztJQUNLLDJDQUFZOzs7Ozs7SUFBcEIsVUFBcUIsS0FBeUI7O1lBQ3RDLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDO1FBQzFELElBQUksV0FBVyxDQUFDLE1BQU0sS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUNwRSxPQUFPO1NBQ1I7UUFDRCxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUN0QyxDQUFDOztnQkFuRkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxrQkFBa0I7b0JBQzVCLGd0Q0FBNEM7b0JBRTVDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOztpQkFDaEQ7Ozs7Z0JBUlEsbUJBQW1COzs7aURBV3pCLEtBQUs7d0JBY0wsS0FBSzs7SUE4RFIsMkJBQUM7Q0FBQSxBQXBGRCxJQW9GQztTQTlFWSxvQkFBb0I7OztJQUUvQiw4REFBeUQ7Ozs7O0lBS3pELDRDQUFtRjs7Ozs7O0lBS25GLDRDQUFtQzs7Ozs7SUFJbkMscUNBQXNCOzs7OztJQUVWLG1EQUFnRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCwgT25EZXN0cm95LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uLCBCZWhhdmlvclN1YmplY3QsIG9mLCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQgeyBEYXRhU291cmNlTGVnZW5kT3B0aW9ucyB9IGZyb20gJy4uLy4uL2RhdGFzb3VyY2Uvc2hhcmVkL2RhdGFzb3VyY2VzL2RhdGFzb3VyY2UuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgTGF5ZXIgfSBmcm9tICcuLi9zaGFyZWQvbGF5ZXJzJztcclxuaW1wb3J0IHsgQ2FwYWJpbGl0aWVzU2VydmljZSB9IGZyb20gJy4uLy4uL2RhdGFzb3VyY2Uvc2hhcmVkL2NhcGFiaWxpdGllcy5zZXJ2aWNlJztcclxuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdpZ28tbGF5ZXItbGVnZW5kJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vbGF5ZXItbGVnZW5kLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9sYXllci1sZWdlbmQuY29tcG9uZW50LnNjc3MnXSxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTGF5ZXJMZWdlbmRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcblxyXG4gIEBJbnB1dCgpIHVwZGF0ZUxlZ2VuZE9uUmVzb2x1dGlvbkNoYW5nZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAvKipcclxuICAgKiBPYnNlcnZhYmxlIG9mIHRoZSBsZWdlbmQgaXRlbXNcclxuICAgKi9cclxuICBsZWdlbmRJdGVtcyQ6IEJlaGF2aW9yU3ViamVjdDxEYXRhU291cmNlTGVnZW5kT3B0aW9uc1tdPiA9IG5ldyBCZWhhdmlvclN1YmplY3QoW10pO1xyXG5cclxuICAvKipcclxuICAgKiBTdWJzY3JpcHRpb24gdG8gdGhlIG1hcCdzIHJlc29sdXRpb25cclxuICAgKi9cclxuICBwcml2YXRlIHJlc29sdXRpb24kJDogU3Vic2NyaXB0aW9uO1xyXG4gIC8qKlxyXG4gICAqIExheWVyXHJcbiAgICovXHJcbiAgQElucHV0KCkgbGF5ZXI6IExheWVyO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNhcGFiaWxpdGllc1NlcnZpY2U6IENhcGFiaWxpdGllc1NlcnZpY2UpIHt9XHJcblxyXG4gIC8qKlxyXG4gICAqIE9uIGluaXQsIHN1YnNjcmliZSB0byB0aGUgbWFwJ3MgcmVzb2x1dGlvbiBhbmQgdXBkYXRlIHRoZSBsZWdlbmQgYWNjb3JkaW5nbHlcclxuICAgKi9cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIGlmICh0aGlzLnVwZGF0ZUxlZ2VuZE9uUmVzb2x1dGlvbkNoYW5nZSA9PT0gdHJ1ZSkge1xyXG4gICAgICBjb25zdCByZXNvbHV0aW9uJCA9IHRoaXMubGF5ZXIubWFwLnZpZXdDb250cm9sbGVyLnJlc29sdXRpb24kO1xyXG4gICAgICB0aGlzLnJlc29sdXRpb24kJCA9IHJlc29sdXRpb24kLnN1YnNjcmliZSgocmVzb2x1dGlvbjogbnVtYmVyKSA9PiB0aGlzLm9uUmVzb2x1dGlvbkNoYW5nZShyZXNvbHV0aW9uKSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnVwZGF0ZUxlZ2VuZCh1bmRlZmluZWQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogT24gZGVzdHJveSwgdW5zdWJzY3JpYmUgdG8gdGhlIG1hcCxzIHJlc29sdXRpb25cclxuICAgKi9cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIGlmICh0aGlzLnJlc29sdXRpb24kJCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMucmVzb2x1dGlvbiQkLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjb21wdXRlSXRlbVRpdGxlKGxheWVyTGVnZW5kKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcclxuICAgIGNvbnN0IGxheWVyT3B0aW9ucyA9IHRoaXMubGF5ZXIuZGF0YVNvdXJjZS5vcHRpb25zIGFzIGFueTtcclxuICAgIGlmIChsYXllck9wdGlvbnMudHlwZSAhPT0gJ3dtcycpIHtcclxuICAgICAgcmV0dXJuIG9mKGxheWVyTGVnZW5kLnRpdGxlKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBsYXllcnMgPSBsYXllck9wdGlvbnMucGFyYW1zLmxheWVycy5zcGxpdCgnLCcpO1xyXG4gICAgY29uc3QgbG9jYWxMYXllck9wdGlvbnMgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGxheWVyT3B0aW9ucykpOyAvLyB0byBhdm9pZCB0byBhbHRlciB0aGUgb3JpZ2luYWwgb3B0aW9ucy5cclxuICAgIGxvY2FsTGF5ZXJPcHRpb25zLnBhcmFtcy5sYXllcnMgPSBsYXllcnMuZmluZChsYXllciA9PiBsYXllciA9PT0gbGF5ZXJMZWdlbmQudGl0bGUpO1xyXG4gICAgcmV0dXJuIHRoaXMuY2FwYWJpbGl0aWVzU2VydmljZVxyXG4gICAgICAuZ2V0V01TT3B0aW9ucyhsb2NhbExheWVyT3B0aW9ucylcclxuICAgICAgLnBpcGUobWFwKHdtc0RhdGFTb3VyY2VPcHRpb25zID0+IHtcclxuICAgICAgICByZXR1cm4gd21zRGF0YVNvdXJjZU9wdGlvbnMuX2xheWVyT3B0aW9uc0Zyb21DYXBhYmlsaXRpZXMudGl0bGU7XHJcbiAgICAgIH0pKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE9uIHJlc29sdXRpb24gY2hhbmdlLCBjb21wdXRlIHRoZSBlZmZlY3RpdmUgc2NhbGUgbGV2ZWwgYW5kIHVwZGF0ZSB0aGVcclxuICAgKiBsZWdlbmQgYWNjb3JkaW5nbHkuXHJcbiAgICogQHBhcmFtIHJlc29sdXRpb25lIE1hcCByZXNvbHV0aW9uXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBvblJlc29sdXRpb25DaGFuZ2UocmVzb2x1dGlvbjogbnVtYmVyKSB7XHJcbiAgICBjb25zdCBzY2FsZSA9IHRoaXMubGF5ZXIubWFwLnZpZXdDb250cm9sbGVyLmdldFNjYWxlKCk7XHJcbiAgICB0aGlzLnVwZGF0ZUxlZ2VuZChzY2FsZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVcGRhdGUgdGhlIGxlZ2VuZCBhY2NvcmRpbmcgdGhlIHNjYWxlIGxldmVsXHJcbiAgICogQHBhcmFtIHNjYWxlIE1hcCBzY2FsZSBsZXZlbFxyXG4gICAqL1xyXG4gIHByaXZhdGUgdXBkYXRlTGVnZW5kKHNjYWxlOiBudW1iZXIgfCB1bmRlZmluZWQpIHtcclxuICAgIGNvbnN0IGxlZ2VuZEl0ZW1zID0gdGhpcy5sYXllci5kYXRhU291cmNlLmdldExlZ2VuZChzY2FsZSk7XHJcbiAgICBpZiAobGVnZW5kSXRlbXMubGVuZ3RoID09PSAwICYmIHRoaXMubGVnZW5kSXRlbXMkLnZhbHVlLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB0aGlzLmxlZ2VuZEl0ZW1zJC5uZXh0KGxlZ2VuZEl0ZW1zKTtcclxuICB9XHJcbn1cclxuIl19
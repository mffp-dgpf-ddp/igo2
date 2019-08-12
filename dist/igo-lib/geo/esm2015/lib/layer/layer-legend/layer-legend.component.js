/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { Layer } from '../shared/layers';
import { CapabilitiesService } from '../../datasource/shared/capabilities.service';
import { map } from 'rxjs/operators';
export class LayerLegendComponent {
    /**
     * @param {?} capabilitiesService
     */
    constructor(capabilitiesService) {
        this.capabilitiesService = capabilitiesService;
        this.updateLegendOnResolutionChange = false;
        /**
         * Observable of the legend items
         */
        this.legendItems$ = new BehaviorSubject([]);
    }
    /**
     * On init, subscribe to the map's resolution and update the legend accordingly
     * @return {?}
     */
    ngOnInit() {
        if (this.updateLegendOnResolutionChange === true) {
            /** @type {?} */
            const resolution$ = this.layer.map.viewController.resolution$;
            this.resolution$$ = resolution$.subscribe((/**
             * @param {?} resolution
             * @return {?}
             */
            (resolution) => this.onResolutionChange(resolution)));
        }
        else {
            this.updateLegend(undefined);
        }
    }
    /**
     * On destroy, unsubscribe to the map,s resolution
     * @return {?}
     */
    ngOnDestroy() {
        if (this.resolution$$ !== undefined) {
            this.resolution$$.unsubscribe();
        }
    }
    /**
     * @param {?} layerLegend
     * @return {?}
     */
    computeItemTitle(layerLegend) {
        /** @type {?} */
        const layerOptions = (/** @type {?} */ (this.layer.dataSource.options));
        if (layerOptions.type !== 'wms') {
            return of(layerLegend.title);
        }
        /** @type {?} */
        const layers = layerOptions.params.layers.split(',');
        /** @type {?} */
        const localLayerOptions = JSON.parse(JSON.stringify(layerOptions));
        localLayerOptions.params.layers = layers.find((/**
         * @param {?} layer
         * @return {?}
         */
        layer => layer === layerLegend.title));
        return this.capabilitiesService
            .getWMSOptions(localLayerOptions)
            .pipe(map((/**
         * @param {?} wmsDataSourceOptions
         * @return {?}
         */
        wmsDataSourceOptions => {
            return wmsDataSourceOptions._layerOptionsFromCapabilities.title;
        })));
    }
    /**
     * On resolution change, compute the effective scale level and update the
     * legend accordingly.
     * @private
     * @param {?} resolution
     * @return {?}
     */
    onResolutionChange(resolution) {
        /** @type {?} */
        const scale = this.layer.map.viewController.getScale();
        this.updateLegend(scale);
    }
    /**
     * Update the legend according the scale level
     * @private
     * @param {?} scale Map scale level
     * @return {?}
     */
    updateLegend(scale) {
        /** @type {?} */
        const legendItems = this.layer.dataSource.getLegend(scale);
        if (legendItems.length === 0 && this.legendItems$.value.length === 0) {
            return;
        }
        this.legendItems$.next(legendItems);
    }
}
LayerLegendComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-layer-legend',
                template: "<ng-container *ngIf=\"legendItems$ | async as items\">\r\n  <ng-container *ngIf=\"items.length; else noItems\">\r\n    <ng-container *ngFor=\"let item of items\">\r\n      <mat-list-item *ngIf=\"item.title\">\r\n        <mat-icon\r\n          id=\"legend-toggle\"\r\n          class=\"igo-chevron\"\r\n          mat-list-avatar\r\n          igoCollapse\r\n          [target]=\"legend\"\r\n          [collapsed]=\"false\"\r\n          svgIcon=\"chevron-up\">\r\n        </mat-icon>\r\n        <h4 matLine>{{computeItemTitle(item) | async}}</h4>\r\n      </mat-list-item>\r\n    \r\n      <div #legend class=\"igo-layer-legend\" [ngClass]=\"{'with-title': item.title}\">\r\n        <img\r\n          *ngIf=\"item.url\"\r\n          src=\"{{(item.url | secureImage) |\u00A0async}}\"\r\n          alt=\"{{'igo.geo.layer.loadingLegendText' | translate}}\">\r\n        <div\r\n          [ngStyle]=\"item.style\"\r\n          [innerHTML]=\"item.html\"\r\n          *ngIf=\"item.html\">\r\n        </div>\r\n      </div>\r\n    </ng-container>\r\n  </ng-container>\r\n\r\n  <ng-template #noItems>\r\n    <small>\r\n      {{'igo.geo.layer.noLegendText' | translate}}\r\n    </small>\r\n  </ng-template>\r\n\r\n</ng-container>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".igo-layer-legend.with-title{padding-left:18px}"]
            }] }
];
/** @nocollapse */
LayerLegendComponent.ctorParameters = () => [
    { type: CapabilitiesService }
];
LayerLegendComponent.propDecorators = {
    updateLegendOnResolutionChange: [{ type: Input }],
    layer: [{ type: Input }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5ZXItbGVnZW5kLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9sYXllci9sYXllci1sZWdlbmQvbGF5ZXItbGVnZW5kLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQXFCLHVCQUF1QixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTdGLE9BQU8sRUFBZ0IsZUFBZSxFQUFFLEVBQUUsRUFBYyxNQUFNLE1BQU0sQ0FBQztBQUdyRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDekMsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sOENBQThDLENBQUM7QUFDbkYsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBUXJDLE1BQU0sT0FBTyxvQkFBb0I7Ozs7SUFrQi9CLFlBQW9CLG1CQUF3QztRQUF4Qyx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBaEJuRCxtQ0FBOEIsR0FBWSxLQUFLLENBQUM7Ozs7UUFLekQsaUJBQVksR0FBK0MsSUFBSSxlQUFlLENBQUMsRUFBRSxDQUFDLENBQUM7SUFXcEIsQ0FBQzs7Ozs7SUFLaEUsUUFBUTtRQUNOLElBQUksSUFBSSxDQUFDLDhCQUE4QixLQUFLLElBQUksRUFBRTs7a0JBQzFDLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsV0FBVztZQUM3RCxJQUFJLENBQUMsWUFBWSxHQUFHLFdBQVcsQ0FBQyxTQUFTOzs7O1lBQUMsQ0FBQyxVQUFrQixFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsVUFBVSxDQUFDLEVBQUMsQ0FBQztTQUN4RzthQUFNO1lBQ0wsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUM5QjtJQUNILENBQUM7Ozs7O0lBS0QsV0FBVztRQUNULElBQUksSUFBSSxDQUFDLFlBQVksS0FBSyxTQUFTLEVBQUU7WUFDbkMsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUNqQztJQUNILENBQUM7Ozs7O0lBRUQsZ0JBQWdCLENBQUMsV0FBVzs7Y0FDcEIsWUFBWSxHQUFHLG1CQUFBLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBTztRQUN6RCxJQUFJLFlBQVksQ0FBQyxJQUFJLEtBQUssS0FBSyxFQUFFO1lBQy9CLE9BQU8sRUFBRSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUM5Qjs7Y0FFSyxNQUFNLEdBQUcsWUFBWSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQzs7Y0FDOUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ2xFLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLElBQUk7Ozs7UUFBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssS0FBSyxXQUFXLENBQUMsS0FBSyxFQUFDLENBQUM7UUFDcEYsT0FBTyxJQUFJLENBQUMsbUJBQW1CO2FBQzVCLGFBQWEsQ0FBQyxpQkFBaUIsQ0FBQzthQUNoQyxJQUFJLENBQUMsR0FBRzs7OztRQUFDLG9CQUFvQixDQUFDLEVBQUU7WUFDL0IsT0FBTyxvQkFBb0IsQ0FBQyw2QkFBNkIsQ0FBQyxLQUFLLENBQUM7UUFDbEUsQ0FBQyxFQUFDLENBQUMsQ0FBQztJQUNSLENBQUM7Ozs7Ozs7O0lBT08sa0JBQWtCLENBQUMsVUFBa0I7O2NBQ3JDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsUUFBUSxFQUFFO1FBQ3RELElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDM0IsQ0FBQzs7Ozs7OztJQU1PLFlBQVksQ0FBQyxLQUF5Qjs7Y0FDdEMsV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUM7UUFDMUQsSUFBSSxXQUFXLENBQUMsTUFBTSxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQ3BFLE9BQU87U0FDUjtRQUNELElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7OztZQW5GRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGtCQUFrQjtnQkFDNUIsZ3RDQUE0QztnQkFFNUMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2hEOzs7O1lBUlEsbUJBQW1COzs7NkNBV3pCLEtBQUs7b0JBY0wsS0FBSzs7OztJQWROLDhEQUF5RDs7Ozs7SUFLekQsNENBQW1GOzs7Ozs7SUFLbkYsNENBQW1DOzs7OztJQUluQyxxQ0FBc0I7Ozs7O0lBRVYsbURBQWdEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0LCBPbkRlc3Ryb3ksIENoYW5nZURldGVjdGlvblN0cmF0ZWd5IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24sIEJlaGF2aW9yU3ViamVjdCwgb2YsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7IERhdGFTb3VyY2VMZWdlbmRPcHRpb25zIH0gZnJvbSAnLi4vLi4vZGF0YXNvdXJjZS9zaGFyZWQvZGF0YXNvdXJjZXMvZGF0YXNvdXJjZS5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBMYXllciB9IGZyb20gJy4uL3NoYXJlZC9sYXllcnMnO1xyXG5pbXBvcnQgeyBDYXBhYmlsaXRpZXNTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vZGF0YXNvdXJjZS9zaGFyZWQvY2FwYWJpbGl0aWVzLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2lnby1sYXllci1sZWdlbmQnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9sYXllci1sZWdlbmQuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2xheWVyLWxlZ2VuZC5jb21wb25lbnQuc2NzcyddLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBMYXllckxlZ2VuZENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuXHJcbiAgQElucHV0KCkgdXBkYXRlTGVnZW5kT25SZXNvbHV0aW9uQ2hhbmdlOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIC8qKlxyXG4gICAqIE9ic2VydmFibGUgb2YgdGhlIGxlZ2VuZCBpdGVtc1xyXG4gICAqL1xyXG4gIGxlZ2VuZEl0ZW1zJDogQmVoYXZpb3JTdWJqZWN0PERhdGFTb3VyY2VMZWdlbmRPcHRpb25zW10+ID0gbmV3IEJlaGF2aW9yU3ViamVjdChbXSk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFN1YnNjcmlwdGlvbiB0byB0aGUgbWFwJ3MgcmVzb2x1dGlvblxyXG4gICAqL1xyXG4gIHByaXZhdGUgcmVzb2x1dGlvbiQkOiBTdWJzY3JpcHRpb247XHJcbiAgLyoqXHJcbiAgICogTGF5ZXJcclxuICAgKi9cclxuICBASW5wdXQoKSBsYXllcjogTGF5ZXI7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2FwYWJpbGl0aWVzU2VydmljZTogQ2FwYWJpbGl0aWVzU2VydmljZSkge31cclxuXHJcbiAgLyoqXHJcbiAgICogT24gaW5pdCwgc3Vic2NyaWJlIHRvIHRoZSBtYXAncyByZXNvbHV0aW9uIGFuZCB1cGRhdGUgdGhlIGxlZ2VuZCBhY2NvcmRpbmdseVxyXG4gICAqL1xyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgaWYgKHRoaXMudXBkYXRlTGVnZW5kT25SZXNvbHV0aW9uQ2hhbmdlID09PSB0cnVlKSB7XHJcbiAgICAgIGNvbnN0IHJlc29sdXRpb24kID0gdGhpcy5sYXllci5tYXAudmlld0NvbnRyb2xsZXIucmVzb2x1dGlvbiQ7XHJcbiAgICAgIHRoaXMucmVzb2x1dGlvbiQkID0gcmVzb2x1dGlvbiQuc3Vic2NyaWJlKChyZXNvbHV0aW9uOiBudW1iZXIpID0+IHRoaXMub25SZXNvbHV0aW9uQ2hhbmdlKHJlc29sdXRpb24pKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMudXBkYXRlTGVnZW5kKHVuZGVmaW5lZCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBPbiBkZXN0cm95LCB1bnN1YnNjcmliZSB0byB0aGUgbWFwLHMgcmVzb2x1dGlvblxyXG4gICAqL1xyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgaWYgKHRoaXMucmVzb2x1dGlvbiQkICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5yZXNvbHV0aW9uJCQudW5zdWJzY3JpYmUoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNvbXB1dGVJdGVtVGl0bGUobGF5ZXJMZWdlbmQpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xyXG4gICAgY29uc3QgbGF5ZXJPcHRpb25zID0gdGhpcy5sYXllci5kYXRhU291cmNlLm9wdGlvbnMgYXMgYW55O1xyXG4gICAgaWYgKGxheWVyT3B0aW9ucy50eXBlICE9PSAnd21zJykge1xyXG4gICAgICByZXR1cm4gb2YobGF5ZXJMZWdlbmQudGl0bGUpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGxheWVycyA9IGxheWVyT3B0aW9ucy5wYXJhbXMubGF5ZXJzLnNwbGl0KCcsJyk7XHJcbiAgICBjb25zdCBsb2NhbExheWVyT3B0aW9ucyA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkobGF5ZXJPcHRpb25zKSk7IC8vIHRvIGF2b2lkIHRvIGFsdGVyIHRoZSBvcmlnaW5hbCBvcHRpb25zLlxyXG4gICAgbG9jYWxMYXllck9wdGlvbnMucGFyYW1zLmxheWVycyA9IGxheWVycy5maW5kKGxheWVyID0+IGxheWVyID09PSBsYXllckxlZ2VuZC50aXRsZSk7XHJcbiAgICByZXR1cm4gdGhpcy5jYXBhYmlsaXRpZXNTZXJ2aWNlXHJcbiAgICAgIC5nZXRXTVNPcHRpb25zKGxvY2FsTGF5ZXJPcHRpb25zKVxyXG4gICAgICAucGlwZShtYXAod21zRGF0YVNvdXJjZU9wdGlvbnMgPT4ge1xyXG4gICAgICAgIHJldHVybiB3bXNEYXRhU291cmNlT3B0aW9ucy5fbGF5ZXJPcHRpb25zRnJvbUNhcGFiaWxpdGllcy50aXRsZTtcclxuICAgICAgfSkpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogT24gcmVzb2x1dGlvbiBjaGFuZ2UsIGNvbXB1dGUgdGhlIGVmZmVjdGl2ZSBzY2FsZSBsZXZlbCBhbmQgdXBkYXRlIHRoZVxyXG4gICAqIGxlZ2VuZCBhY2NvcmRpbmdseS5cclxuICAgKiBAcGFyYW0gcmVzb2x1dGlvbmUgTWFwIHJlc29sdXRpb25cclxuICAgKi9cclxuICBwcml2YXRlIG9uUmVzb2x1dGlvbkNoYW5nZShyZXNvbHV0aW9uOiBudW1iZXIpIHtcclxuICAgIGNvbnN0IHNjYWxlID0gdGhpcy5sYXllci5tYXAudmlld0NvbnRyb2xsZXIuZ2V0U2NhbGUoKTtcclxuICAgIHRoaXMudXBkYXRlTGVnZW5kKHNjYWxlKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVwZGF0ZSB0aGUgbGVnZW5kIGFjY29yZGluZyB0aGUgc2NhbGUgbGV2ZWxcclxuICAgKiBAcGFyYW0gc2NhbGUgTWFwIHNjYWxlIGxldmVsXHJcbiAgICovXHJcbiAgcHJpdmF0ZSB1cGRhdGVMZWdlbmQoc2NhbGU6IG51bWJlciB8IHVuZGVmaW5lZCkge1xyXG4gICAgY29uc3QgbGVnZW5kSXRlbXMgPSB0aGlzLmxheWVyLmRhdGFTb3VyY2UuZ2V0TGVnZW5kKHNjYWxlKTtcclxuICAgIGlmIChsZWdlbmRJdGVtcy5sZW5ndGggPT09IDAgJiYgdGhpcy5sZWdlbmRJdGVtcyQudmFsdWUubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHRoaXMubGVnZW5kSXRlbXMkLm5leHQobGVnZW5kSXRlbXMpO1xyXG4gIH1cclxufVxyXG4iXX0=
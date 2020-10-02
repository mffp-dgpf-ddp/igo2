/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ChangeDetectionStrategy, ViewChildren, QueryList } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { Layer } from '../shared/layers';
import { CapabilitiesService } from '../../datasource/shared/capabilities.service';
import { map } from 'rxjs/operators';
import { LanguageService } from '@igo2/core';
export class LayerLegendComponent {
    /**
     * @param {?} capabilitiesService
     * @param {?} languageService
     */
    constructor(capabilitiesService, languageService) {
        this.capabilitiesService = capabilitiesService;
        this.languageService = languageService;
        this.updateLegendOnResolutionChange = false;
        /**
         * Observable of the legend items
         */
        this.legendItems$ = new BehaviorSubject([]);
        /**
         * The scale used to make the legend
         */
        this.scale = undefined;
        /**
         * List of size of images displayed
         */
        this.imagesHeight = {};
    }
    /**
     * On init, subscribe to the map's resolution and update the legend accordingly
     * @return {?}
     */
    ngOnInit() {
        /** @type {?} */
        let lastlLegend = this.layer.legend;
        this.styles = this.listStyles();
        /** @type {?} */
        const sourceOptions = (/** @type {?} */ (this.layer.options.source.options));
        if (sourceOptions &&
            sourceOptions.params &&
            sourceOptions.params.STYLES) {
            // if a styles is provided into the layers wms params
            this.currentStyle = this.styles.find((/**
             * @param {?} style
             * @return {?}
             */
            style => style.name === sourceOptions.params.STYLES)).name;
        }
        else if (!this.layer.legend) {
            // if no legend is manually provided
            if (this.styles && this.styles.length > 1) {
                this.currentStyle = this.styles[0].name;
            }
        }
        else if (this.styles && this.styles.length > 1) {
            this.currentStyle = lastlLegend[0].currentStyle;
        }
        lastlLegend = this.layer.dataSource.getLegend(this.currentStyle, this.scale);
        if (this.updateLegendOnResolutionChange === true) {
            /** @type {?} */
            const resolution$ = this.layer.map.viewController.resolution$;
            this.resolution$$ = resolution$.subscribe((/**
             * @param {?} resolution
             * @return {?}
             */
            (resolution) => this.onResolutionChange(resolution)));
        }
        else if (lastlLegend.length !== 0) {
            this.legendItems$.next(lastlLegend);
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
     * @param {?} collapsed
     * @param {?} item
     * @return {?}
     */
    toggleLegendItem(collapsed, item) {
        item.collapsed = collapsed;
    }
    /**
     * @private
     * @param {?} newLegends
     * @return {?}
     */
    transfertToggleLegendItem(newLegends) {
        /** @type {?} */
        const outLegends = newLegends;
        /** @type {?} */
        const lastLegends = this.layer.legend;
        for (let i = 0; i < lastLegends.length; i++) {
            outLegends[i].collapsed = lastLegends[i].collapsed;
        }
        return outLegends;
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
        const layers = layerOptions.params.LAYERS.split(',');
        /** @type {?} */
        const localLayerOptions = JSON.parse(JSON.stringify(layerOptions));
        localLayerOptions.params.LAYERS = layers.find((/**
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
            return wmsDataSourceOptions._layerOptionsFromSource.title;
        })));
    }
    /**
     * On resolution change, compute the effective scale level and update the
     * legend accordingly.
     * @private
     * @param {?} resolution Map resolution
     * @return {?}
     */
    onResolutionChange(resolution) {
        this.scale = this.layer.map.viewController.getScale();
        this.updateLegend();
    }
    /**
     * Update the legend with scale level and style define
     * @private
     * @return {?}
     */
    updateLegend() {
        /** @type {?} */
        let legendItems = this.layer.dataSource.getLegend(this.currentStyle, this.scale);
        if (this.layer.legend && this.layer.legend.length > 1) {
            legendItems = this.transfertToggleLegendItem(legendItems);
        }
        this.layer.legend = legendItems;
        if (legendItems.length === 0 && this.legendItems$.value.length === 0) {
            return;
        }
        this.legendItems$.next(legendItems);
    }
    /**
     * @private
     * @return {?}
     */
    listStyles() {
        /** @type {?} */
        const layerOptions = this.layer.options;
        if (layerOptions && layerOptions.legendOptions) {
            /** @type {?} */
            const translate = this.languageService.translate;
            /** @type {?} */
            const title = translate.instant('igo.geo.layer.legend.default');
            /** @type {?} */
            const stylesAvailable = [(/** @type {?} */ ({ name: '', title }))]
                .concat(layerOptions.legendOptions.stylesAvailable.filter((/**
             * @param {?} sA
             * @return {?}
             */
            sA => (sA.name.normalize('NFD').replace(/[\u0300-\u036f]/gi, '') !== 'default' &&
                sA.name.normalize('NFD').replace(/[\u0300-\u036f]/gi, '') !== 'defaut'))));
            stylesAvailable.map((/**
             * @param {?} s
             * @return {?}
             */
            s => s.title = s.title.charAt(0).toUpperCase() + s.title.slice(1).replace(/_/g, ' ')));
            return stylesAvailable;
        }
        return;
    }
    /**
     * @return {?}
     */
    onChangeStyle() {
        this.updateLegend();
        /** @type {?} */
        let STYLES = '';
        this.layer.dataSource.ol.getParams().LAYERS.split(',').map((/**
         * @param {?} layer
         * @return {?}
         */
        layer => STYLES += this.currentStyle + ','));
        STYLES = STYLES.slice(0, -1);
        this.layer.dataSource.ol.updateParams({ STYLES });
    }
    /**
     * @param {?} id
     * @return {?}
     */
    onLoadImage(id) {
        /** @type {?} */
        let elemRef;
        if (this.renderedLegends.length === 1) {
            elemRef = (/** @type {?} */ (this.renderedLegends.first.nativeElement));
        }
        else {
            elemRef = (/** @type {?} */ (this.renderedLegends.find((/**
             * @param {?} renderedLegend
             * @return {?}
             */
            renderedLegend => renderedLegend.nativeElement.id === id)).nativeElement));
        }
        this.imagesHeight[id] = elemRef.height;
    }
}
LayerLegendComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-layer-legend',
                template: "<ng-container *ngIf=\"legendItems$ | async as items\">\r\n  <ng-container *ngIf=\"items.length; else noItems\">\r\n    <ng-container *ngFor=\"let item of items.slice().reverse()\" #renderedLegends >\r\n      <mat-list-item *ngIf=\"item.title\">\r\n        <mat-icon\r\n          id=\"legend-toggle\"\r\n          class=\"igo-chevron\"\r\n          mat-list-avatar\r\n          igoCollapse\r\n          [target]=\"legend\"\r\n          [collapsed]=\"(item.collapsed)\"\r\n          (toggle)=\"toggleLegendItem($event, item)\"\r\n          svgIcon=\"chevron-up\">\r\n        </mat-icon>\r\n        <h4 matLine>{{computeItemTitle(item) | async}} </h4>\r\n      </mat-list-item>  \r\n      <div #legend class=\"igo-layer-legend\" [ngClass]=\"{'with-title': item.title}\">\r\n        <div *ngIf=\"currentStyle !== undefined\">\r\n            <mat-form-field>\r\n              <mat-select tooltip-position=\"below\" matTooltipShowDelay=\"500\"\r\n                [matTooltip]=\"'igo.geo.layer.legend.selectStyle' | translate\" [(ngModel)]=\"currentStyle\"\r\n                (selectionChange)=\"onChangeStyle()\">\r\n                <mat-option *ngFor=\"let style of styles\" [value]=\"style.name\">{{style.title}}</mat-option>\r\n              </mat-select>\r\n          </mat-form-field>\r\n        </div>\r\n        <div *ngIf=\"!(item.collapsed)\">\r\n          <div *ngIf=\"item.url\">\r\n            <img #renderedLegend id=\"{{item.title}}\" (load)=\"onLoadImage(item.title)\"\r\n              src=\"{{(item.url | secureImage) |\u00A0async}}\"\r\n              alt=\"{{'igo.geo.layer.legend.loadingLegendText' | translate}}\"\r\n            >\r\n            <small *ngIf=\"imagesHeight[item.title]<16\">\r\n                {{'igo.geo.layer.legend.noLegendScale' | translate}}\r\n            </small>\r\n          </div>\r\n          <div\r\n            [ngStyle]=\"item.style\"\r\n            [innerHTML]=\"item.html\"\r\n            *ngIf=\"item.html\">\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </ng-container>\r\n  </ng-container>\r\n\r\n  <ng-template #noItems>\r\n    <small>\r\n      {{'igo.geo.layer.legend.noLegendText' | translate}}\r\n    </small>\r\n  </ng-template>\r\n\r\n</ng-container>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".igo-layer-legend.with-title{padding-left:18px}img:after{content:' ';position:relative;height:17px;float:left;width:17px;top:-3px;right:19px;background-color:#fff;border:3px solid #f3f3f3;border-radius:50%;-webkit-animation:2s linear infinite spin;animation:2s linear infinite spin}@-moz-document url-prefix(){img:after{margin-left:19px}}@-webkit-keyframes spin{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes spin{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}"]
            }] }
];
/** @nocollapse */
LayerLegendComponent.ctorParameters = () => [
    { type: CapabilitiesService },
    { type: LanguageService }
];
LayerLegendComponent.propDecorators = {
    updateLegendOnResolutionChange: [{ type: Input }],
    renderedLegends: [{ type: ViewChildren, args: ['renderedLegend',] }],
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
     * The available styles
     * @type {?}
     */
    LayerLegendComponent.prototype.styles;
    /**
     * The style used to make the legend
     * @type {?}
     */
    LayerLegendComponent.prototype.currentStyle;
    /**
     * The scale used to make the legend
     * @type {?}
     * @private
     */
    LayerLegendComponent.prototype.scale;
    /**
     * Get list of images display
     * @type {?}
     */
    LayerLegendComponent.prototype.renderedLegends;
    /**
     * List of size of images displayed
     * @type {?}
     */
    LayerLegendComponent.prototype.imagesHeight;
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
    /**
     * @type {?}
     * @private
     */
    LayerLegendComponent.prototype.languageService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5ZXItbGVnZW5kLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9sYXllci9sYXllci1sZWdlbmQvbGF5ZXItbGVnZW5kLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQXFCLHVCQUF1QixFQUFFLFlBQVksRUFBYyxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFbEksT0FBTyxFQUFnQixlQUFlLEVBQUUsRUFBRSxFQUFjLE1BQU0sTUFBTSxDQUFDO0FBR3JFLE9BQU8sRUFBRSxLQUFLLEVBQW9CLE1BQU0sa0JBQWtCLENBQUM7QUFDM0QsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sOENBQThDLENBQUM7QUFDbkYsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFRN0MsTUFBTSxPQUFPLG9CQUFvQjs7Ozs7SUE0Qy9CLFlBQ1UsbUJBQXdDLEVBQ3hDLGVBQWdDO1FBRGhDLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFDeEMsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBNUNqQyxtQ0FBOEIsR0FBWSxLQUFLLENBQUM7Ozs7UUFLekQsaUJBQVksR0FBOEIsSUFBSSxlQUFlLENBQUMsRUFBRSxDQUFDLENBQUM7Ozs7UUFvQjFELFVBQUssR0FBVyxTQUFTLENBQUM7Ozs7UUFVM0IsaUJBQVksR0FBaUMsRUFBRSxDQUFDO0lBU1YsQ0FBQzs7Ozs7SUFLOUMsUUFBUTs7WUFDRixXQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNO1FBQ25DLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDOztjQUMxQixhQUFhLEdBQUcsbUJBQUEsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFP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TCxZQUFZLFNBQUMsZ0JBQWdCO29CQVU3QixLQUFLOzs7O0lBeENOLDhEQUF5RDs7Ozs7SUFLekQsNENBQWtFOzs7Ozs7SUFLbEUsNENBQW1DOzs7OztJQUtuQyxzQ0FBYzs7Ozs7SUFLZCw0Q0FBb0I7Ozs7OztJQUtwQixxQ0FBa0M7Ozs7O0lBS2xDLCtDQUF1RTs7Ozs7SUFLdkUsNENBQXVEOzs7OztJQUt2RCxxQ0FBc0I7Ozs7O0lBR3BCLG1EQUFnRDs7Ozs7SUFDaEQsK0NBQXdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0LCBPbkRlc3Ryb3ksIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBWaWV3Q2hpbGRyZW4sIEVsZW1lbnRSZWYsIFF1ZXJ5TGlzdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uLCBCZWhhdmlvclN1YmplY3QsIG9mLCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQgeyBMZWdlbmQgfSBmcm9tICcuLi8uLi9kYXRhc291cmNlL3NoYXJlZC9kYXRhc291cmNlcy9kYXRhc291cmNlLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IExheWVyLCBJdGVtU3R5bGVPcHRpb25zIH0gZnJvbSAnLi4vc2hhcmVkL2xheWVycyc7XHJcbmltcG9ydCB7IENhcGFiaWxpdGllc1NlcnZpY2UgfSBmcm9tICcuLi8uLi9kYXRhc291cmNlL3NoYXJlZC9jYXBhYmlsaXRpZXMuc2VydmljZSc7XHJcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgTGFuZ3VhZ2VTZXJ2aWNlIH0gZnJvbSAnQGlnbzIvY29yZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2lnby1sYXllci1sZWdlbmQnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9sYXllci1sZWdlbmQuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2xheWVyLWxlZ2VuZC5jb21wb25lbnQuc2NzcyddLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBMYXllckxlZ2VuZENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuXHJcbiAgQElucHV0KCkgdXBkYXRlTGVnZW5kT25SZXNvbHV0aW9uQ2hhbmdlOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIC8qKlxyXG4gICAqIE9ic2VydmFibGUgb2YgdGhlIGxlZ2VuZCBpdGVtc1xyXG4gICAqL1xyXG4gIGxlZ2VuZEl0ZW1zJDogQmVoYXZpb3JTdWJqZWN0PExlZ2VuZFtdPiA9IG5ldyBCZWhhdmlvclN1YmplY3QoW10pO1xyXG5cclxuICAvKipcclxuICAgKiBTdWJzY3JpcHRpb24gdG8gdGhlIG1hcCdzIHJlc29sdXRpb25cclxuICAgKi9cclxuICBwcml2YXRlIHJlc29sdXRpb24kJDogU3Vic2NyaXB0aW9uO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgYXZhaWxhYmxlIHN0eWxlc1xyXG4gICAqL1xyXG4gIHB1YmxpYyBzdHlsZXM7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBzdHlsZSB1c2VkIHRvIG1ha2UgdGhlIGxlZ2VuZFxyXG4gICAqL1xyXG4gIHB1YmxpYyBjdXJyZW50U3R5bGU7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBzY2FsZSB1c2VkIHRvIG1ha2UgdGhlIGxlZ2VuZFxyXG4gICAqL1xyXG4gIHByaXZhdGUgc2NhbGU6IG51bWJlciA9IHVuZGVmaW5lZDtcclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IGxpc3Qgb2YgaW1hZ2VzIGRpc3BsYXlcclxuICAgKi9cclxuICBAVmlld0NoaWxkcmVuKCdyZW5kZXJlZExlZ2VuZCcpIHJlbmRlcmVkTGVnZW5kczogUXVlcnlMaXN0PEVsZW1lbnRSZWY+O1xyXG5cclxuICAvKipcclxuICAgKiBMaXN0IG9mIHNpemUgb2YgaW1hZ2VzIGRpc3BsYXllZFxyXG4gICAqL1xyXG4gIHB1YmxpYyBpbWFnZXNIZWlnaHQ6IHsgW3NyY0tleTogc3RyaW5nXTogbnVtYmVyIH0gPSB7fTtcclxuXHJcbiAgLyoqXHJcbiAgICogTGF5ZXJcclxuICAgKi9cclxuICBASW5wdXQoKSBsYXllcjogTGF5ZXI7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBjYXBhYmlsaXRpZXNTZXJ2aWNlOiBDYXBhYmlsaXRpZXNTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBsYW5ndWFnZVNlcnZpY2U6IExhbmd1YWdlU2VydmljZSkge31cclxuXHJcbiAgLyoqXHJcbiAgICogT24gaW5pdCwgc3Vic2NyaWJlIHRvIHRoZSBtYXAncyByZXNvbHV0aW9uIGFuZCB1cGRhdGUgdGhlIGxlZ2VuZCBhY2NvcmRpbmdseVxyXG4gICAqL1xyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgbGV0IGxhc3RsTGVnZW5kID0gdGhpcy5sYXllci5sZWdlbmQ7XHJcbiAgICB0aGlzLnN0eWxlcyA9IHRoaXMubGlzdFN0eWxlcygpO1xyXG4gICAgY29uc3Qgc291cmNlT3B0aW9ucyA9IHRoaXMubGF5ZXIub3B0aW9ucy5zb3VyY2Uub3B0aW9ucyBhcyBhbnk7XHJcbiAgICBpZiAoXHJcbiAgICAgIHNvdXJjZU9wdGlvbnMgJiZcclxuICAgICAgc291cmNlT3B0aW9ucy5wYXJhbXMgJiZcclxuICAgICAgc291cmNlT3B0aW9ucy5wYXJhbXMuU1RZTEVTKSB7XHJcbiAgICAgIC8vIGlmIGEgc3R5bGVzIGlzIHByb3ZpZGVkIGludG8gdGhlIGxheWVycyB3bXMgcGFyYW1zXHJcbiAgICAgIHRoaXMuY3VycmVudFN0eWxlID0gdGhpcy5zdHlsZXMuZmluZChzdHlsZSA9PiBzdHlsZS5uYW1lID09PSBzb3VyY2VPcHRpb25zLnBhcmFtcy5TVFlMRVMpLm5hbWU7XHJcbiAgICB9IGVsc2UgaWYgKCF0aGlzLmxheWVyLmxlZ2VuZCkge1xyXG4gICAgICAvLyBpZiBubyBsZWdlbmQgaXMgbWFudWFsbHkgcHJvdmlkZWRcclxuICAgICAgaWYgKHRoaXMuc3R5bGVzICYmIHRoaXMuc3R5bGVzLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICB0aGlzLmN1cnJlbnRTdHlsZSA9IHRoaXMuc3R5bGVzWzBdLm5hbWU7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAodGhpcy5zdHlsZXMgJiYgdGhpcy5zdHlsZXMubGVuZ3RoID4gMSkge1xyXG4gICAgICB0aGlzLmN1cnJlbnRTdHlsZSA9IGxhc3RsTGVnZW5kWzBdLmN1cnJlbnRTdHlsZTtcclxuICAgIH1cclxuXHJcbiAgICBsYXN0bExlZ2VuZCA9IHRoaXMubGF5ZXIuZGF0YVNvdXJjZS5nZXRMZWdlbmQodGhpcy5jdXJyZW50U3R5bGUsIHRoaXMuc2NhbGUpO1xyXG4gICAgaWYgKHRoaXMudXBkYXRlTGVnZW5kT25SZXNvbHV0aW9uQ2hhbmdlID09PSB0cnVlKSB7XHJcbiAgICAgIGNvbnN0IHJlc29sdXRpb24kID0gdGhpcy5sYXllci5tYXAudmlld0NvbnRyb2xsZXIucmVzb2x1dGlvbiQ7XHJcbiAgICAgIHRoaXMucmVzb2x1dGlvbiQkID0gcmVzb2x1dGlvbiQuc3Vic2NyaWJlKChyZXNvbHV0aW9uOiBudW1iZXIpID0+IHRoaXMub25SZXNvbHV0aW9uQ2hhbmdlKHJlc29sdXRpb24pKTtcclxuICAgIH0gZWxzZSBpZiAobGFzdGxMZWdlbmQubGVuZ3RoICE9PSAwKSB7XHJcbiAgICAgIHRoaXMubGVnZW5kSXRlbXMkLm5leHQobGFzdGxMZWdlbmQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogT24gZGVzdHJveSwgdW5zdWJzY3JpYmUgdG8gdGhlIG1hcCxzIHJlc29sdXRpb25cclxuICAgKi9cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIGlmICh0aGlzLnJlc29sdXRpb24kJCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMucmVzb2x1dGlvbiQkLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB0b2dnbGVMZWdlbmRJdGVtKGNvbGxhcHNlZDogYm9vbGVhbiwgaXRlbTogTGVnZW5kKSB7XHJcbiAgICBpdGVtLmNvbGxhcHNlZCA9IGNvbGxhcHNlZDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgdHJhbnNmZXJ0VG9nZ2xlTGVnZW5kSXRlbShuZXdMZWdlbmRzOiBMZWdlbmRbXSk6IExlZ2VuZFtdIHtcclxuICAgIGNvbnN0IG91dExlZ2VuZHM6IExlZ2VuZFtdID0gbmV3TGVnZW5kcztcclxuICAgIGNvbnN0IGxhc3RMZWdlbmRzID0gdGhpcy5sYXllci5sZWdlbmQ7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxhc3RMZWdlbmRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIG91dExlZ2VuZHNbaV0uY29sbGFwc2VkID0gbGFzdExlZ2VuZHNbaV0uY29sbGFwc2VkO1xyXG4gICB9XHJcbiAgICByZXR1cm4gb3V0TGVnZW5kcztcclxuICB9XHJcblxyXG4gIGNvbXB1dGVJdGVtVGl0bGUobGF5ZXJMZWdlbmQpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xyXG4gICAgY29uc3QgbGF5ZXJPcHRpb25zID0gdGhpcy5sYXllci5kYXRhU291cmNlLm9wdGlvbnMgYXMgYW55O1xyXG4gICAgaWYgKGxheWVyT3B0aW9ucy50eXBlICE9PSAnd21zJykge1xyXG4gICAgICByZXR1cm4gb2YobGF5ZXJMZWdlbmQudGl0bGUpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGxheWVycyA9IGxheWVyT3B0aW9ucy5wYXJhbXMuTEFZRVJTLnNwbGl0KCcsJyk7XHJcbiAgICBjb25zdCBsb2NhbExheWVyT3B0aW9ucyA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkobGF5ZXJPcHRpb25zKSk7IC8vIHRvIGF2b2lkIHRvIGFsdGVyIHRoZSBvcmlnaW5hbCBvcHRpb25zLlxyXG4gICAgbG9jYWxMYXllck9wdGlvbnMucGFyYW1zLkxBWUVSUyA9IGxheWVycy5maW5kKGxheWVyID0+IGxheWVyID09PSBsYXllckxlZ2VuZC50aXRsZSk7XHJcbiAgICByZXR1cm4gdGhpcy5jYXBhYmlsaXRpZXNTZXJ2aWNlXHJcbiAgICAgIC5nZXRXTVNPcHRpb25zKGxvY2FsTGF5ZXJPcHRpb25zKVxyXG4gICAgICAucGlwZShtYXAod21zRGF0YVNvdXJjZU9wdGlvbnMgPT4ge1xyXG4gICAgICAgIHJldHVybiB3bXNEYXRhU291cmNlT3B0aW9ucy5fbGF5ZXJPcHRpb25zRnJvbVNvdXJjZS50aXRsZTtcclxuICAgICAgfSkpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogT24gcmVzb2x1dGlvbiBjaGFuZ2UsIGNvbXB1dGUgdGhlIGVmZmVjdGl2ZSBzY2FsZSBsZXZlbCBhbmQgdXBkYXRlIHRoZVxyXG4gICAqIGxlZ2VuZCBhY2NvcmRpbmdseS5cclxuICAgKiBAcGFyYW0gcmVzb2x1dGlvbiBNYXAgcmVzb2x1dGlvblxyXG4gICAqL1xyXG4gIHByaXZhdGUgb25SZXNvbHV0aW9uQ2hhbmdlKHJlc29sdXRpb246IG51bWJlcikge1xyXG4gICAgdGhpcy5zY2FsZSA9IHRoaXMubGF5ZXIubWFwLnZpZXdDb250cm9sbGVyLmdldFNjYWxlKCk7XHJcbiAgICB0aGlzLnVwZGF0ZUxlZ2VuZCgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXBkYXRlIHRoZSBsZWdlbmQgd2l0aCBzY2FsZSBsZXZlbCBhbmQgc3R5bGUgZGVmaW5lXHJcbiAgICovXHJcbiAgcHJpdmF0ZSB1cGRhdGVMZWdlbmQoKSB7XHJcbiAgICBsZXQgbGVnZW5kSXRlbXMgPSB0aGlzLmxheWVyLmRhdGFTb3VyY2UuZ2V0TGVnZW5kKHRoaXMuY3VycmVudFN0eWxlLCB0aGlzLnNjYWxlKTtcclxuICAgIGlmICh0aGlzLmxheWVyLmxlZ2VuZCAmJiB0aGlzLmxheWVyLmxlZ2VuZC5sZW5ndGggPiAxKSB7IGxlZ2VuZEl0ZW1zID0gdGhpcy50cmFuc2ZlcnRUb2dnbGVMZWdlbmRJdGVtKGxlZ2VuZEl0ZW1zKTsgfVxyXG4gICAgdGhpcy5sYXllci5sZWdlbmQgPSBsZWdlbmRJdGVtcztcclxuXHJcbiAgICBpZiAobGVnZW5kSXRlbXMubGVuZ3RoID09PSAwICYmIHRoaXMubGVnZW5kSXRlbXMkLnZhbHVlLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB0aGlzLmxlZ2VuZEl0ZW1zJC5uZXh0KGxlZ2VuZEl0ZW1zKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgbGlzdFN0eWxlcygpIHtcclxuICAgIGNvbnN0IGxheWVyT3B0aW9ucyA9IHRoaXMubGF5ZXIub3B0aW9ucztcclxuICAgIGlmIChsYXllck9wdGlvbnMgJiYgbGF5ZXJPcHRpb25zLmxlZ2VuZE9wdGlvbnMpIHtcclxuICAgICAgY29uc3QgdHJhbnNsYXRlID0gdGhpcy5sYW5ndWFnZVNlcnZpY2UudHJhbnNsYXRlO1xyXG4gICAgICBjb25zdCB0aXRsZSA9IHRyYW5zbGF0ZS5pbnN0YW50KCdpZ28uZ2VvLmxheWVyLmxlZ2VuZC5kZWZhdWx0Jyk7XHJcbiAgICAgIGNvbnN0IHN0eWxlc0F2YWlsYWJsZSA9ICBbeyBuYW1lOiAnJywgdGl0bGUgfSBhcyBJdGVtU3R5bGVPcHRpb25zXVxyXG4gICAgICAgIC5jb25jYXQobGF5ZXJPcHRpb25zLmxlZ2VuZE9wdGlvbnMuc3R5bGVzQXZhaWxhYmxlLmZpbHRlcihzQSA9PiAoXHJcbiAgICAgICAgICBzQS5uYW1lLm5vcm1hbGl6ZSgnTkZEJykucmVwbGFjZSgvW1xcdTAzMDAtXFx1MDM2Zl0vZ2ksICcnKSAhPT0gJ2RlZmF1bHQnICYmXHJcbiAgICAgICAgICBzQS5uYW1lLm5vcm1hbGl6ZSgnTkZEJykucmVwbGFjZSgvW1xcdTAzMDAtXFx1MDM2Zl0vZ2ksICcnKSAhPT0gJ2RlZmF1dCcpKSk7XHJcbiAgICAgIHN0eWxlc0F2YWlsYWJsZS5tYXAocyA9PiBzLnRpdGxlID0gcy50aXRsZS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHMudGl0bGUuc2xpY2UoMSkucmVwbGFjZSgvXy9nLCAnICcpKTtcclxuICAgICAgcmV0dXJuIHN0eWxlc0F2YWlsYWJsZTtcclxuICAgIH1cclxuICAgIHJldHVybiA7XHJcbiAgfVxyXG5cclxuICBvbkNoYW5nZVN0eWxlKCkge1xyXG4gICAgdGhpcy51cGRhdGVMZWdlbmQoKTtcclxuICAgIGxldCBTVFlMRVMgPSAnJztcclxuICAgIHRoaXMubGF5ZXIuZGF0YVNvdXJjZS5vbC5nZXRQYXJhbXMoKS5MQVlFUlMuc3BsaXQoJywnKS5tYXAobGF5ZXIgPT5cclxuICAgICAgU1RZTEVTICs9IHRoaXMuY3VycmVudFN0eWxlICsgJywnXHJcbiAgICApO1xyXG4gICAgU1RZTEVTID0gU1RZTEVTLnNsaWNlKDAsIC0xKTtcclxuICAgIHRoaXMubGF5ZXIuZGF0YVNvdXJjZS5vbC51cGRhdGVQYXJhbXMoe1NUWUxFU30pO1xyXG4gIH1cclxuXHJcbiAgb25Mb2FkSW1hZ2UoaWQ6IHN0cmluZykge1xyXG4gICAgbGV0IGVsZW1SZWY6IEhUTUxJbWFnZUVsZW1lbnQ7XHJcbiAgICBpZiAodGhpcy5yZW5kZXJlZExlZ2VuZHMubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgIGVsZW1SZWYgPSB0aGlzLnJlbmRlcmVkTGVnZW5kcy5maXJzdC5uYXRpdmVFbGVtZW50IGFzIEhUTUxJbWFnZUVsZW1lbnQ7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBlbGVtUmVmID0gdGhpcy5yZW5kZXJlZExlZ2VuZHMuZmluZChyZW5kZXJlZExlZ2VuZCA9PiByZW5kZXJlZExlZ2VuZC5uYXRpdmVFbGVtZW50LmlkID09PSBpZCkubmF0aXZlRWxlbWVudCBhcyBIVE1MSW1hZ2VFbGVtZW50O1xyXG4gICAgfVxyXG4gICAgdGhpcy5pbWFnZXNIZWlnaHRbaWRdID0gZWxlbVJlZi5oZWlnaHQ7XHJcbiAgfVxyXG59XHJcbiJdfQ==
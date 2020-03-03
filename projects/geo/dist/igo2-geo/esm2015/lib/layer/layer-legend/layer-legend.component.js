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
            return wmsDataSourceOptions._layerOptionsFromCapabilities.title;
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
        this.layer.dataSource.ol.updateParams({ STYLES: this.currentStyle });
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
                template: "<ng-container *ngIf=\"legendItems$ | async as items\">\r\n  <ng-container *ngIf=\"items.length; else noItems\">\r\n    <ng-container *ngFor=\"let item of items.slice().reverse()\" #renderedLegends >\r\n      <mat-list-item *ngIf=\"item.title\">\r\n        <mat-icon\r\n          id=\"legend-toggle\"\r\n          class=\"igo-chevron\"\r\n          mat-list-avatar\r\n          igoCollapse\r\n          [target]=\"legend\"\r\n          [collapsed]=\"(item.collapsed)\"\r\n          (toggle)=\"toggleLegendItem($event, item)\"\r\n          svgIcon=\"chevron-up\">\r\n        </mat-icon>\r\n        <h4 matLine>{{computeItemTitle(item) | async}}</h4>\r\n      </mat-list-item>  \r\n      <div #legend class=\"igo-layer-legend\" [ngClass]=\"{'with-title': item.title}\">\r\n        <div *ngIf=\"currentStyle !== undefined\">\r\n            <mat-form-field>\r\n              <mat-select tooltip-position=\"below\" matTooltipShowDelay=\"500\"\r\n                [matTooltip]=\"'igo.geo.layer.legend.selectStyle' | translate\" [(ngModel)]=\"currentStyle\"\r\n                (selectionChange)=\"onChangeStyle()\">\r\n                <mat-option *ngFor=\"let style of styles\" [value]=\"style.name\">{{style.title}}</mat-option>\r\n              </mat-select>\r\n          </mat-form-field>\r\n        </div>\r\n        <div *ngIf=\"!(item.collapsed)\">\r\n          <div *ngIf=\"item.url\">\r\n            <img #renderedLegend id=\"{{item.title}}\" (load)=\"onLoadImage(item.title)\"\r\n              src=\"{{(item.url | secureImage) |\u00A0async}}\"\r\n              alt=\"{{'igo.geo.layer.legend.loadingLegendText' | translate}}\"\r\n            >\r\n            <small *ngIf=\"imagesHeight[item.title]<16\">\r\n                {{'igo.geo.layer.legend.noLegendScale' | translate}}\r\n            </small>\r\n          </div>\r\n          <div\r\n            [ngStyle]=\"item.style\"\r\n            [innerHTML]=\"item.html\"\r\n            *ngIf=\"item.html\">\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </ng-container>\r\n  </ng-container>\r\n\r\n  <ng-template #noItems>\r\n    <small>\r\n      {{'igo.geo.layer.legend.noLegendText' | translate}}\r\n    </small>\r\n  </ng-template>\r\n\r\n</ng-container>\r\n",
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5ZXItbGVnZW5kLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9sYXllci9sYXllci1sZWdlbmQvbGF5ZXItbGVnZW5kLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQXFCLHVCQUF1QixFQUFFLFlBQVksRUFBYyxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFbEksT0FBTyxFQUFnQixlQUFlLEVBQUUsRUFBRSxFQUFjLE1BQU0sTUFBTSxDQUFDO0FBR3JFLE9BQU8sRUFBRSxLQUFLLEVBQW9CLE1BQU0sa0JBQWtCLENBQUM7QUFDM0QsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sOENBQThDLENBQUM7QUFDbkYsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFRN0MsTUFBTSxPQUFPLG9CQUFvQjs7Ozs7SUE0Qy9CLFlBQ1UsbUJBQXdDLEVBQ3hDLGVBQWdDO1FBRGhDLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFDeEMsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBNUNqQyxtQ0FBOEIsR0FBWSxLQUFLLENBQUM7Ozs7UUFLekQsaUJBQVksR0FBOEIsSUFBSSxlQUFlLENBQUMsRUFBRSxDQUFDLENBQUM7Ozs7UUFvQjFELFVBQUssR0FBVyxTQUFTLENBQUM7Ozs7UUFVM0IsaUJBQVksR0FBaUMsRUFBRSxDQUFDO0lBU1YsQ0FBQzs7Ozs7SUFLOUMsUUFBUTs7WUFDRixXQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNO1FBQ25DLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDOztjQUMxQixhQUFhLEdBQUcsbUJBQUEsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFP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dCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCwgT25EZXN0cm95LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgVmlld0NoaWxkcmVuLCBFbGVtZW50UmVmLCBRdWVyeUxpc3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiwgQmVoYXZpb3JTdWJqZWN0LCBvZiwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IHsgTGVnZW5kIH0gZnJvbSAnLi4vLi4vZGF0YXNvdXJjZS9zaGFyZWQvZGF0YXNvdXJjZXMvZGF0YXNvdXJjZS5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBMYXllciwgSXRlbVN0eWxlT3B0aW9ucyB9IGZyb20gJy4uL3NoYXJlZC9sYXllcnMnO1xyXG5pbXBvcnQgeyBDYXBhYmlsaXRpZXNTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vZGF0YXNvdXJjZS9zaGFyZWQvY2FwYWJpbGl0aWVzLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IExhbmd1YWdlU2VydmljZSB9IGZyb20gJ0BpZ28yL2NvcmUnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdpZ28tbGF5ZXItbGVnZW5kJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vbGF5ZXItbGVnZW5kLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9sYXllci1sZWdlbmQuY29tcG9uZW50LnNjc3MnXSxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTGF5ZXJMZWdlbmRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcblxyXG4gIEBJbnB1dCgpIHVwZGF0ZUxlZ2VuZE9uUmVzb2x1dGlvbkNoYW5nZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAvKipcclxuICAgKiBPYnNlcnZhYmxlIG9mIHRoZSBsZWdlbmQgaXRlbXNcclxuICAgKi9cclxuICBsZWdlbmRJdGVtcyQ6IEJlaGF2aW9yU3ViamVjdDxMZWdlbmRbXT4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KFtdKTtcclxuXHJcbiAgLyoqXHJcbiAgICogU3Vic2NyaXB0aW9uIHRvIHRoZSBtYXAncyByZXNvbHV0aW9uXHJcbiAgICovXHJcbiAgcHJpdmF0ZSByZXNvbHV0aW9uJCQ6IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGF2YWlsYWJsZSBzdHlsZXNcclxuICAgKi9cclxuICBwdWJsaWMgc3R5bGVzO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgc3R5bGUgdXNlZCB0byBtYWtlIHRoZSBsZWdlbmRcclxuICAgKi9cclxuICBwdWJsaWMgY3VycmVudFN0eWxlO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgc2NhbGUgdXNlZCB0byBtYWtlIHRoZSBsZWdlbmRcclxuICAgKi9cclxuICBwcml2YXRlIHNjYWxlOiBudW1iZXIgPSB1bmRlZmluZWQ7XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCBsaXN0IG9mIGltYWdlcyBkaXNwbGF5XHJcbiAgICovXHJcbiAgQFZpZXdDaGlsZHJlbigncmVuZGVyZWRMZWdlbmQnKSByZW5kZXJlZExlZ2VuZHM6IFF1ZXJ5TGlzdDxFbGVtZW50UmVmPjtcclxuXHJcbiAgLyoqXHJcbiAgICogTGlzdCBvZiBzaXplIG9mIGltYWdlcyBkaXNwbGF5ZWRcclxuICAgKi9cclxuICBwdWJsaWMgaW1hZ2VzSGVpZ2h0OiB7IFtzcmNLZXk6IHN0cmluZ106IG51bWJlciB9ID0ge307XHJcblxyXG4gIC8qKlxyXG4gICAqIExheWVyXHJcbiAgICovXHJcbiAgQElucHV0KCkgbGF5ZXI6IExheWVyO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgY2FwYWJpbGl0aWVzU2VydmljZTogQ2FwYWJpbGl0aWVzU2VydmljZSxcclxuICAgIHByaXZhdGUgbGFuZ3VhZ2VTZXJ2aWNlOiBMYW5ndWFnZVNlcnZpY2UpIHt9XHJcblxyXG4gIC8qKlxyXG4gICAqIE9uIGluaXQsIHN1YnNjcmliZSB0byB0aGUgbWFwJ3MgcmVzb2x1dGlvbiBhbmQgdXBkYXRlIHRoZSBsZWdlbmQgYWNjb3JkaW5nbHlcclxuICAgKi9cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIGxldCBsYXN0bExlZ2VuZCA9IHRoaXMubGF5ZXIubGVnZW5kO1xyXG4gICAgdGhpcy5zdHlsZXMgPSB0aGlzLmxpc3RTdHlsZXMoKTtcclxuICAgIGNvbnN0IHNvdXJjZU9wdGlvbnMgPSB0aGlzLmxheWVyLm9wdGlvbnMuc291cmNlLm9wdGlvbnMgYXMgYW55O1xyXG4gICAgaWYgKFxyXG4gICAgICBzb3VyY2VPcHRpb25zICYmXHJcbiAgICAgIHNvdXJjZU9wdGlvbnMucGFyYW1zICYmXHJcbiAgICAgIHNvdXJjZU9wdGlvbnMucGFyYW1zLlNUWUxFUykge1xyXG4gICAgICAvLyBpZiBhIHN0eWxlcyBpcyBwcm92aWRlZCBpbnRvIHRoZSBsYXllcnMgd21zIHBhcmFtc1xyXG4gICAgICB0aGlzLmN1cnJlbnRTdHlsZSA9IHRoaXMuc3R5bGVzLmZpbmQoc3R5bGUgPT4gc3R5bGUubmFtZSA9PT0gc291cmNlT3B0aW9ucy5wYXJhbXMuU1RZTEVTKS5uYW1lO1xyXG4gICAgfSBlbHNlIGlmICghdGhpcy5sYXllci5sZWdlbmQpIHtcclxuICAgICAgLy8gaWYgbm8gbGVnZW5kIGlzIG1hbnVhbGx5IHByb3ZpZGVkXHJcbiAgICAgIGlmICh0aGlzLnN0eWxlcyAmJiB0aGlzLnN0eWxlcy5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50U3R5bGUgPSB0aGlzLnN0eWxlc1swXS5uYW1lO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuc3R5bGVzICYmIHRoaXMuc3R5bGVzLmxlbmd0aCA+IDEpIHtcclxuICAgICAgdGhpcy5jdXJyZW50U3R5bGUgPSBsYXN0bExlZ2VuZFswXS5jdXJyZW50U3R5bGU7XHJcbiAgICB9XHJcblxyXG4gICAgbGFzdGxMZWdlbmQgPSB0aGlzLmxheWVyLmRhdGFTb3VyY2UuZ2V0TGVnZW5kKHRoaXMuY3VycmVudFN0eWxlLCB0aGlzLnNjYWxlKTtcclxuICAgIGlmICh0aGlzLnVwZGF0ZUxlZ2VuZE9uUmVzb2x1dGlvbkNoYW5nZSA9PT0gdHJ1ZSkge1xyXG4gICAgICBjb25zdCByZXNvbHV0aW9uJCA9IHRoaXMubGF5ZXIubWFwLnZpZXdDb250cm9sbGVyLnJlc29sdXRpb24kO1xyXG4gICAgICB0aGlzLnJlc29sdXRpb24kJCA9IHJlc29sdXRpb24kLnN1YnNjcmliZSgocmVzb2x1dGlvbjogbnVtYmVyKSA9PiB0aGlzLm9uUmVzb2x1dGlvbkNoYW5nZShyZXNvbHV0aW9uKSk7XHJcbiAgICB9IGVsc2UgaWYgKGxhc3RsTGVnZW5kLmxlbmd0aCAhPT0gMCkge1xyXG4gICAgICB0aGlzLmxlZ2VuZEl0ZW1zJC5uZXh0KGxhc3RsTGVnZW5kKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE9uIGRlc3Ryb3ksIHVuc3Vic2NyaWJlIHRvIHRoZSBtYXAscyByZXNvbHV0aW9uXHJcbiAgICovXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICBpZiAodGhpcy5yZXNvbHV0aW9uJCQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLnJlc29sdXRpb24kJC51bnN1YnNjcmliZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdG9nZ2xlTGVnZW5kSXRlbShjb2xsYXBzZWQ6IGJvb2xlYW4sIGl0ZW06IExlZ2VuZCkge1xyXG4gICAgaXRlbS5jb2xsYXBzZWQgPSBjb2xsYXBzZWQ7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHRyYW5zZmVydFRvZ2dsZUxlZ2VuZEl0ZW0obmV3TGVnZW5kczogTGVnZW5kW10pOiBMZWdlbmRbXSB7XHJcbiAgICBjb25zdCBvdXRMZWdlbmRzOiBMZWdlbmRbXSA9IG5ld0xlZ2VuZHM7XHJcbiAgICBjb25zdCBsYXN0TGVnZW5kcyA9IHRoaXMubGF5ZXIubGVnZW5kO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsYXN0TGVnZW5kcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBvdXRMZWdlbmRzW2ldLmNvbGxhcHNlZCA9IGxhc3RMZWdlbmRzW2ldLmNvbGxhcHNlZDtcclxuICAgfVxyXG4gICAgcmV0dXJuIG91dExlZ2VuZHM7XHJcbiAgfVxyXG5cclxuICBjb21wdXRlSXRlbVRpdGxlKGxheWVyTGVnZW5kKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcclxuICAgIGNvbnN0IGxheWVyT3B0aW9ucyA9IHRoaXMubGF5ZXIuZGF0YVNvdXJjZS5vcHRpb25zIGFzIGFueTtcclxuICAgIGlmIChsYXllck9wdGlvbnMudHlwZSAhPT0gJ3dtcycpIHtcclxuICAgICAgcmV0dXJuIG9mKGxheWVyTGVnZW5kLnRpdGxlKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBsYXllcnMgPSBsYXllck9wdGlvbnMucGFyYW1zLkxBWUVSUy5zcGxpdCgnLCcpO1xyXG4gICAgY29uc3QgbG9jYWxMYXllck9wdGlvbnMgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGxheWVyT3B0aW9ucykpOyAvLyB0byBhdm9pZCB0byBhbHRlciB0aGUgb3JpZ2luYWwgb3B0aW9ucy5cclxuICAgIGxvY2FsTGF5ZXJPcHRpb25zLnBhcmFtcy5MQVlFUlMgPSBsYXllcnMuZmluZChsYXllciA9PiBsYXllciA9PT0gbGF5ZXJMZWdlbmQudGl0bGUpO1xyXG4gICAgcmV0dXJuIHRoaXMuY2FwYWJpbGl0aWVzU2VydmljZVxyXG4gICAgICAuZ2V0V01TT3B0aW9ucyhsb2NhbExheWVyT3B0aW9ucylcclxuICAgICAgLnBpcGUobWFwKHdtc0RhdGFTb3VyY2VPcHRpb25zID0+IHtcclxuICAgICAgICByZXR1cm4gd21zRGF0YVNvdXJjZU9wdGlvbnMuX2xheWVyT3B0aW9uc0Zyb21DYXBhYmlsaXRpZXMudGl0bGU7XHJcbiAgICAgIH0pKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE9uIHJlc29sdXRpb24gY2hhbmdlLCBjb21wdXRlIHRoZSBlZmZlY3RpdmUgc2NhbGUgbGV2ZWwgYW5kIHVwZGF0ZSB0aGVcclxuICAgKiBsZWdlbmQgYWNjb3JkaW5nbHkuXHJcbiAgICogQHBhcmFtIHJlc29sdXRpb24gTWFwIHJlc29sdXRpb25cclxuICAgKi9cclxuICBwcml2YXRlIG9uUmVzb2x1dGlvbkNoYW5nZShyZXNvbHV0aW9uOiBudW1iZXIpIHtcclxuICAgIHRoaXMuc2NhbGUgPSB0aGlzLmxheWVyLm1hcC52aWV3Q29udHJvbGxlci5nZXRTY2FsZSgpO1xyXG4gICAgdGhpcy51cGRhdGVMZWdlbmQoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVwZGF0ZSB0aGUgbGVnZW5kIHdpdGggc2NhbGUgbGV2ZWwgYW5kIHN0eWxlIGRlZmluZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgdXBkYXRlTGVnZW5kKCkge1xyXG4gICAgbGV0IGxlZ2VuZEl0ZW1zID0gdGhpcy5sYXllci5kYXRhU291cmNlLmdldExlZ2VuZCh0aGlzLmN1cnJlbnRTdHlsZSwgdGhpcy5zY2FsZSk7XHJcbiAgICBpZiAodGhpcy5sYXllci5sZWdlbmQgJiYgdGhpcy5sYXllci5sZWdlbmQubGVuZ3RoID4gMSkgeyBsZWdlbmRJdGVtcyA9IHRoaXMudHJhbnNmZXJ0VG9nZ2xlTGVnZW5kSXRlbShsZWdlbmRJdGVtcyk7IH1cclxuICAgIHRoaXMubGF5ZXIubGVnZW5kID0gbGVnZW5kSXRlbXM7XHJcblxyXG4gICAgaWYgKGxlZ2VuZEl0ZW1zLmxlbmd0aCA9PT0gMCAmJiB0aGlzLmxlZ2VuZEl0ZW1zJC52YWx1ZS5sZW5ndGggPT09IDApIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdGhpcy5sZWdlbmRJdGVtcyQubmV4dChsZWdlbmRJdGVtcyk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGxpc3RTdHlsZXMoKSB7XHJcbiAgICBjb25zdCBsYXllck9wdGlvbnMgPSB0aGlzLmxheWVyLm9wdGlvbnM7XHJcbiAgICBpZiAobGF5ZXJPcHRpb25zICYmIGxheWVyT3B0aW9ucy5sZWdlbmRPcHRpb25zKSB7XHJcbiAgICAgIGNvbnN0IHRyYW5zbGF0ZSA9IHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLnRyYW5zbGF0ZTtcclxuICAgICAgY29uc3QgdGl0bGUgPSB0cmFuc2xhdGUuaW5zdGFudCgnaWdvLmdlby5sYXllci5sZWdlbmQuZGVmYXVsdCcpO1xyXG4gICAgICBjb25zdCBzdHlsZXNBdmFpbGFibGUgPSAgW3sgbmFtZTogJycsIHRpdGxlIH0gYXMgSXRlbVN0eWxlT3B0aW9uc11cclxuICAgICAgICAuY29uY2F0KGxheWVyT3B0aW9ucy5sZWdlbmRPcHRpb25zLnN0eWxlc0F2YWlsYWJsZS5maWx0ZXIoc0EgPT4gKFxyXG4gICAgICAgICAgc0EubmFtZS5ub3JtYWxpemUoJ05GRCcpLnJlcGxhY2UoL1tcXHUwMzAwLVxcdTAzNmZdL2dpLCAnJykgIT09ICdkZWZhdWx0JyAmJlxyXG4gICAgICAgICAgc0EubmFtZS5ub3JtYWxpemUoJ05GRCcpLnJlcGxhY2UoL1tcXHUwMzAwLVxcdTAzNmZdL2dpLCAnJykgIT09ICdkZWZhdXQnKSkpO1xyXG4gICAgICBzdHlsZXNBdmFpbGFibGUubWFwKHMgPT4gcy50aXRsZSA9IHMudGl0bGUuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzLnRpdGxlLnNsaWNlKDEpLnJlcGxhY2UoL18vZywgJyAnKSk7XHJcbiAgICAgIHJldHVybiBzdHlsZXNBdmFpbGFibGU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gO1xyXG4gIH1cclxuXHJcbiAgb25DaGFuZ2VTdHlsZSgpIHtcclxuICAgIHRoaXMudXBkYXRlTGVnZW5kKCk7XHJcbiAgICB0aGlzLmxheWVyLmRhdGFTb3VyY2Uub2wudXBkYXRlUGFyYW1zKHtTVFlMRVM6IHRoaXMuY3VycmVudFN0eWxlfSk7XHJcbiAgfVxyXG5cclxuICBvbkxvYWRJbWFnZShpZDogc3RyaW5nKSB7XHJcbiAgICBsZXQgZWxlbVJlZjogSFRNTEltYWdlRWxlbWVudDtcclxuICAgIGlmICh0aGlzLnJlbmRlcmVkTGVnZW5kcy5sZW5ndGggPT09IDEpIHtcclxuICAgICAgZWxlbVJlZiA9IHRoaXMucmVuZGVyZWRMZWdlbmRzLmZpcnN0Lm5hdGl2ZUVsZW1lbnQgYXMgSFRNTEltYWdlRWxlbWVudDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGVsZW1SZWYgPSB0aGlzLnJlbmRlcmVkTGVnZW5kcy5maW5kKHJlbmRlcmVkTGVnZW5kID0+IHJlbmRlcmVkTGVnZW5kLm5hdGl2ZUVsZW1lbnQuaWQgPT09IGlkKS5uYXRpdmVFbGVtZW50IGFzIEhUTUxJbWFnZUVsZW1lbnQ7XHJcbiAgICB9XHJcbiAgICB0aGlzLmltYWdlc0hlaWdodFtpZF0gPSBlbGVtUmVmLmhlaWdodDtcclxuICB9XHJcbn1cclxuIl19
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ChangeDetectionStrategy, TemplateRef, ContentChild } from '@angular/core';
import { LayerListControlsEnum } from './layer-list.enum';
import { LayerListService } from './layer-list.service';
import { BehaviorSubject, ReplaySubject, EMPTY, timer } from 'rxjs';
import { debounce } from 'rxjs/operators';
// TODO: This class could use a clean up. Also, some methods could be moved ealsewhere
export class LayerListComponent {
    /**
     * @param {?} layerListService
     */
    constructor(layerListService) {
        this.layerListService = layerListService;
        this.orderable = true;
        this.thresholdToFilterAndSort = 5;
        this.layers$ = new BehaviorSubject([]);
        this.change$ = new ReplaySubject(1);
        this.showToolbar$ = new BehaviorSubject(false);
        this.layersAreAllVisible = true;
        this.layersAreAllInRange = true;
        this.floatLabel = 'auto';
        this.layerFilterAndSortOptions = {};
        this.excludeBaseLayers = false;
        this.toggleLegendOnVisibilityChange = false;
        this.expandLegendOfVisibleLayers = false;
        this.updateLegendOnResolutionChange = false;
        this.queryBadge = false;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set layers(value) {
        this._layers = value;
        this.next();
    }
    /**
     * @return {?}
     */
    get layers() {
        return this._layers;
    }
    /**
     * @return {?}
     */
    get keyword() {
        return this.layerListService.keyword;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set keyword(value) {
        this.layerListService.keyword = value;
        this.next();
    }
    /**
     * @return {?}
     */
    get keywordInitialized() {
        return this.layerListService.keywordInitialized;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set keywordInitialized(value) {
        this.layerListService.keywordInitialized = value;
    }
    /**
     * @return {?}
     */
    get onlyVisible() {
        return this.layerListService.onlyVisible;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set onlyVisible(value) {
        this.layerListService.onlyVisible = value;
        this.next();
    }
    /**
     * @return {?}
     */
    get onlyVisibleInitialized() {
        return this.layerListService.onlyVisibleInitialized;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set onlyVisibleInitialized(value) {
        this.layerListService.onlyVisibleInitialized = value;
    }
    /**
     * @return {?}
     */
    get onlyInRange() {
        return this.layerListService.onlyInRange;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set onlyInRange(value) {
        this.layerListService.onlyInRange = value;
        this.next();
    }
    /**
     * @return {?}
     */
    get onlyInRangeInitialized() {
        return this.layerListService.onlyInRangeInitialized;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set onlyInRangeInitialized(value) {
        this.layerListService.onlyInRangeInitialized = value;
    }
    /**
     * @return {?}
     */
    get sortedAlpha() {
        return this.layerListService.sortedAlpha;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set sortedAlpha(value) {
        this.layerListService.sortedAlpha = value;
        this.next();
    }
    /**
     * @return {?}
     */
    get sortedAlphaInitialized() {
        return this.layerListService.sortedAlphaInitialized;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set sortedAlphaInitialized(value) {
        this.layerListService.sortedAlphaInitialized = value;
    }
    /**
     * Subscribe to the search term stream and trigger researches
     * \@internal
     * @return {?}
     */
    ngOnInit() {
        this.change$$ = this.change$
            .pipe(debounce((/**
         * @return {?}
         */
        () => {
            return this.layers.length === 0 ? EMPTY : timer(50);
        })))
            .subscribe((/**
         * @return {?}
         */
        () => {
            this.showToolbar$.next(this.computeShowToolbar());
            this.layers$.next(this.computeLayers(this.layers.slice(0)));
        }));
        this.initLayerFilterAndSortOptions();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.change$$.unsubscribe();
    }
    /**
     * @return {?}
     */
    toggleOnlyVisible() {
        this.onlyVisible = !this.onlyVisible;
    }
    /**
     * @return {?}
     */
    toggleOnlyInRange() {
        this.onlyInRange = !this.onlyInRange;
    }
    /**
     * @param {?} sortAlpha
     * @return {?}
     */
    toggleSort(sortAlpha) {
        this.sortedAlpha = sortAlpha;
    }
    /**
     * @return {?}
     */
    clearKeyword() {
        this.keyword = undefined;
    }
    /**
     * @return {?}
     */
    getLowerLayer() {
        return this.layers
            .filter((/**
         * @param {?} l
         * @return {?}
         */
        l => !l.baseLayer))
            .reduce((/**
         * @param {?} prev
         * @param {?} current
         * @return {?}
         */
        (prev, current) => {
            return prev.zIndex < current.zIndex ? prev : current;
        }), { zIndex: undefined, id: undefined });
    }
    /**
     * @return {?}
     */
    getUpperLayer() {
        return this.layers
            .filter((/**
         * @param {?} l
         * @return {?}
         */
        l => !l.baseLayer))
            .reduce((/**
         * @param {?} prev
         * @param {?} current
         * @return {?}
         */
        (prev, current) => {
            return prev.zIndex > current.zIndex ? prev : current;
        }), { zIndex: undefined, id: undefined });
    }
    /**
     * @private
     * @return {?}
     */
    next() {
        this.change$.next();
    }
    /**
     * @private
     * @param {?} layers
     * @return {?}
     */
    computeLayers(layers) {
        /** @type {?} */
        let layersOut = this.filterLayers(layers);
        if (this.sortedAlpha) {
            layersOut = this.sortLayersByTitle(layersOut);
        }
        else {
            layersOut = this.sortLayersByZindex(layersOut);
        }
        return layersOut;
    }
    /**
     * @private
     * @param {?} layers
     * @return {?}
     */
    filterLayers(layers) {
        /** @type {?} */
        const keyword = this.keyword;
        if (this.layerFilterAndSortOptions.showToolbar === LayerListControlsEnum.never) {
            return layers;
        }
        if (!keyword && !this.onlyInRange && !this.onlyVisible) {
            return layers;
        }
        /** @type {?} */
        const keepLayerIds = layers.map((/**
         * @param {?} layer
         * @return {?}
         */
        (layer) => layer.id));
        layers.forEach((/**
         * @param {?} layer
         * @return {?}
         */
        (layer) => {
            /** @type {?} */
            const layerOptions = ((/** @type {?} */ (layer.options))) || {};
            /** @type {?} */
            const dataSourceOptions = layer.dataSource.options || {};
            /** @type {?} */
            const metadata = layerOptions.metadata || ((/** @type {?} */ ({})));
            /** @type {?} */
            const keywords = metadata.keywordList || [];
            /** @type {?} */
            const layerKeywords = keywords.map((/**
             * @param {?} kw
             * @return {?}
             */
            (kw) => {
                return kw.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
            }));
            if (keyword) {
                /** @type {?} */
                const localKeyword = keyword
                    .normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, '');
                /** @type {?} */
                const layerTitle = layer.title
                    .normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, '');
                /** @type {?} */
                const dataSourceType = dataSourceOptions.type || '';
                /** @type {?} */
                const keywordRegex = new RegExp(localKeyword, 'gi');
                /** @type {?} */
                const keywordInList = layerKeywords.find((/**
                 * @param {?} kw
                 * @return {?}
                 */
                (kw) => keywordRegex.test(kw))) !==
                    undefined;
                if (!keywordRegex.test(layerTitle) &&
                    !(keyword.toLowerCase() === dataSourceType.toLowerCase()) &&
                    !keywordInList) {
                    /** @type {?} */
                    const index = keepLayerIds.indexOf(layer.id);
                    if (index > -1) {
                        keepLayerIds.splice(index, 1);
                    }
                }
            }
            if (this.onlyVisible && layer.visible === false) {
                /** @type {?} */
                const index = keepLayerIds.indexOf(layer.id);
                if (index > -1) {
                    keepLayerIds.splice(index, 1);
                }
            }
            if (this.onlyInRange && layer.isInResolutionsRange === false) {
                /** @type {?} */
                const index = keepLayerIds.indexOf(layer.id);
                if (index > -1) {
                    keepLayerIds.splice(index, 1);
                }
            }
        }));
        return layers.filter((/**
         * @param {?} layer
         * @return {?}
         */
        (layer) => keepLayerIds.indexOf(layer.id) !== -1));
    }
    /**
     * @private
     * @param {?} layers
     * @return {?}
     */
    sortLayersByZindex(layers) {
        return layers.sort((/**
         * @param {?} layer1
         * @param {?} layer2
         * @return {?}
         */
        (layer1, layer2) => layer2.zIndex - layer1.zIndex));
    }
    /**
     * @private
     * @param {?} layers
     * @return {?}
     */
    sortLayersByTitle(layers) {
        return layers.sort((/**
         * @param {?} a
         * @param {?} b
         * @return {?}
         */
        (a, b) => {
            if (a.title < b.title) {
                return -1;
            }
            if (a.title > b.title) {
                return 1;
            }
            return 0;
        }));
    }
    /**
     * @private
     * @return {?}
     */
    computeShowToolbar() {
        switch (this.layerFilterAndSortOptions.showToolbar) {
            case LayerListControlsEnum.always:
                return true;
            case LayerListControlsEnum.never:
                return false;
            default:
                if (this.layers.length >= this.thresholdToFilterAndSort ||
                    this.keyword ||
                    this.onlyInRange ||
                    this.onlyVisible) {
                    return true;
                }
                return false;
        }
    }
    /**
     * @private
     * @return {?}
     */
    initLayerFilterAndSortOptions() {
        if (this.layerFilterAndSortOptions.toolbarThreshold) {
            this.thresholdToFilterAndSort = this.layerFilterAndSortOptions.toolbarThreshold;
        }
        if (this.layerFilterAndSortOptions.keyword && !this.keywordInitialized) {
            this.keyword = this.layerFilterAndSortOptions.keyword;
            this.keywordInitialized = true;
        }
        if (this.layerFilterAndSortOptions.sortedAlpha &&
            !this.sortedAlphaInitialized) {
            this.sortedAlpha = this.layerFilterAndSortOptions.sortedAlpha;
            this.sortedAlphaInitialized = true;
        }
        if (this.layerFilterAndSortOptions.onlyVisible &&
            !this.onlyVisibleInitialized &&
            !this.layersAreAllVisible) {
            this.onlyVisible = this.layerFilterAndSortOptions.onlyVisible;
            this.onlyVisibleInitialized = true;
        }
        if (this.layerFilterAndSortOptions.onlyInRange &&
            !this.onlyInRangeInitialized &&
            !this.layersAreAllInRange) {
            this.onlyInRange = this.layerFilterAndSortOptions.onlyInRange;
            this.onlyInRangeInitialized = true;
        }
    }
}
LayerListComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-layer-list',
                template: "<igo-list [navigation]=\"false\" [selection]=\"false\">\r\n  <mat-list-item *ngIf=\"showToolbar$ | async\">\r\n    <ng-container>\r\n      <mat-form-field class=\"inputFilter\" [floatLabel]=\"floatLabel\">\r\n        <input\r\n          matInput\r\n          [placeholder]=\"'igo.geo.layer.filterPlaceholder' | translate\"\r\n          [matTooltip]=\"'igo.geo.layer.subsetLayersListKeyword' | translate\"\r\n          matTooltipShowDelay=\"500\"\r\n          type=\"text\" [(ngModel)]=\"keyword\">\r\n        <button\r\n          mat-button\r\n          *ngIf=\"keyword\"\r\n          matSuffix\r\n          mat-icon-button\r\n          aria-label=\"Clear\"\r\n          color=\"warn\"\r\n          (click)=\"clearKeyword()\">\r\n          <mat-icon svgIcon=\"close\"></mat-icon>\r\n        </button>\r\n      </mat-form-field>\r\n      <button\r\n        *ngIf=\"!sortedAlpha\"\r\n        mat-icon-button\r\n        [matTooltip]=\"'igo.geo.layer.sortAlphabetically' | translate\"\r\n        matTooltipShowDelay=\"500\"\r\n        (click)=\"toggleSort(true)\">\r\n        <mat-icon color=\"primary\" svgIcon=\"sort-alphabetical\"></mat-icon>\r\n      </button>\r\n      <button\r\n        *ngIf=\"sortedAlpha\"\r\n        mat-icon-button\r\n        [matTooltip]=\"'igo.geo.layer.sortMapOrder' | translate\"\r\n        matTooltipShowDelay=\"500\"\r\n        (click)=\"toggleSort(false)\">\r\n        <mat-icon color=\"warn\" svgIcon=\"sort-variant-remove\"></mat-icon>\r\n      </button>\r\n      <div [matTooltip]=\"onlyVisible ?\r\n        ('igo.geo.layer.resetLayersList' | translate) :\r\n        ('igo.geo.layer.subsetLayersListOnlyVisible' | translate)\"\r\n        matTooltipShowDelay=\"500\">\r\n        <button\r\n          mat-icon-button\r\n          [disabled]=\"layersAreAllVisible && !onlyVisible\"\r\n          [color]=\"onlyVisible ? 'warn' : 'primary'\"\r\n          (click)=\"toggleOnlyVisible()\">\r\n          <mat-icon\r\n          [svgIcon]=\"onlyVisible ? 'sort-variant-remove' : 'eye'\"></mat-icon>\r\n        </button>\r\n      </div>\r\n      <div [matTooltip]=\"onlyInRange ?\r\n        ('igo.geo.layer.resetLayersList' | translate) :\r\n        ('igo.geo.layer.subsetLayersListOnlyInRange' | translate)\"\r\n        matTooltipShowDelay=\"500\">\r\n        <button\r\n          mat-icon-button\r\n          [disabled]=\"layersAreAllInRange && !onlyInRange\"\r\n          [color]=\"onlyInRange ? 'warn' : 'primary'\"\r\n          (click)=\"toggleOnlyInRange()\">\r\n          <mat-icon\r\n          [svgIcon]=\"onlyInRange ? 'sort-variant-remove' : 'playlist-check'\"></mat-icon>\r\n        </button>\r\n      </div>\r\n    </ng-container>\r\n  </mat-list-item>\r\n\r\n  <ng-template ngFor let-layer let-i=\"index\" [ngForOf]=\"layers$ | async\">\r\n    <igo-layer-item *ngIf=\"!(excludeBaseLayers && layer.baseLayer)\"\r\n        igoListItem\r\n        [layer]=\"layer\"\r\n        [orderable]=\"orderable && !layer.baseLayer\"\r\n        [lowerDisabled]=\"getLowerLayer().id === layer.id\"\r\n        [raiseDisabled]=\"getUpperLayer().id === layer.id\"\r\n        [queryBadge]=\"queryBadge\"\r\n        [expandLegendIfVisible]=\"expandLegendOfVisibleLayers\"\r\n        [updateLegendOnResolutionChange]=\"updateLegendOnResolutionChange\"\r\n        [toggleLegendOnVisibilityChange]=\"toggleLegendOnVisibilityChange\">\r\n\r\n        <ng-container igoLayerItemToolbar\r\n          [ngTemplateOutlet]=\"templateLayerToolbar\"\r\n          [ngTemplateOutletContext]=\"{layer: layer}\">\r\n        </ng-container>\r\n\r\n    </igo-layer-item>\r\n  </ng-template>\r\n</igo-list>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["mat-form-field.inputFilter{width:calc(100% - 100px);max-width:200px}"]
            }] }
];
/** @nocollapse */
LayerListComponent.ctorParameters = () => [
    { type: LayerListService }
];
LayerListComponent.propDecorators = {
    templateLayerToolbar: [{ type: ContentChild, args: ['igoLayerItemToolbar',] }],
    layersAreAllVisible: [{ type: Input }],
    layersAreAllInRange: [{ type: Input }],
    layers: [{ type: Input }],
    floatLabel: [{ type: Input }],
    layerFilterAndSortOptions: [{ type: Input }],
    excludeBaseLayers: [{ type: Input }],
    toggleLegendOnVisibilityChange: [{ type: Input }],
    expandLegendOfVisibleLayers: [{ type: Input }],
    updateLegendOnResolutionChange: [{ type: Input }],
    queryBadge: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    LayerListComponent.prototype.orderable;
    /** @type {?} */
    LayerListComponent.prototype.thresholdToFilterAndSort;
    /** @type {?} */
    LayerListComponent.prototype.layers$;
    /** @type {?} */
    LayerListComponent.prototype.change$;
    /** @type {?} */
    LayerListComponent.prototype.showToolbar$;
    /**
     * @type {?}
     * @private
     */
    LayerListComponent.prototype.change$$;
    /** @type {?} */
    LayerListComponent.prototype.templateLayerToolbar;
    /** @type {?} */
    LayerListComponent.prototype.layersAreAllVisible;
    /** @type {?} */
    LayerListComponent.prototype.layersAreAllInRange;
    /**
     * @type {?}
     * @private
     */
    LayerListComponent.prototype._layers;
    /** @type {?} */
    LayerListComponent.prototype.floatLabel;
    /** @type {?} */
    LayerListComponent.prototype.layerFilterAndSortOptions;
    /** @type {?} */
    LayerListComponent.prototype.excludeBaseLayers;
    /** @type {?} */
    LayerListComponent.prototype.toggleLegendOnVisibilityChange;
    /** @type {?} */
    LayerListComponent.prototype.expandLegendOfVisibleLayers;
    /** @type {?} */
    LayerListComponent.prototype.updateLegendOnResolutionChange;
    /** @type {?} */
    LayerListComponent.prototype.queryBadge;
    /**
     * @type {?}
     * @private
     */
    LayerListComponent.prototype.layerListService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5ZXItbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvbGF5ZXIvbGF5ZXItbGlzdC9sYXllci1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsdUJBQXVCLEVBQ3ZCLFdBQVcsRUFDWCxZQUFZLEVBR2IsTUFBTSxlQUFlLENBQUM7QUFJdkIsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDMUQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDeEQsT0FBTyxFQUNMLGVBQWUsRUFDZixhQUFhLEVBRWIsS0FBSyxFQUNMLEtBQUssRUFDTixNQUFNLE1BQU0sQ0FBQztBQUNkLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7QUFhMUMsTUFBTSxPQUFPLGtCQUFrQjs7OztJQXNHN0IsWUFBb0IsZ0JBQWtDO1FBQWxDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFyR3RELGNBQVMsR0FBRyxJQUFJLENBQUM7UUFDakIsNkJBQXdCLEdBQUcsQ0FBQyxDQUFDO1FBRTdCLFlBQU8sR0FBNkIsSUFBSSxlQUFlLENBQUMsRUFBRSxDQUFDLENBQUM7UUFFNUQsWUFBTyxHQUFHLElBQUksYUFBYSxDQUFPLENBQUMsQ0FBQyxDQUFDO1FBRXJDLGlCQUFZLEdBQTZCLElBQUksZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBTTNELHdCQUFtQixHQUFZLElBQUksQ0FBQztRQUVwQyx3QkFBbUIsR0FBWSxJQUFJLENBQUM7UUFZcEMsZUFBVSxHQUFtQixNQUFNLENBQUM7UUFFcEMsOEJBQXlCLEdBQVEsRUFBRSxDQUFDO1FBRXBDLHNCQUFpQixHQUFZLEtBQUssQ0FBQztRQUVuQyxtQ0FBOEIsR0FBWSxLQUFLLENBQUM7UUFFaEQsZ0NB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LENBQUM7WUFDOUQsSUFBSSxDQUFDLHNCQUFzQixHQUFHLElBQUksQ0FBQztTQUNwQztJQUNILENBQUM7OztZQTlURixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGdCQUFnQjtnQkFDMUIsZ2lIQUEwQztnQkFFMUMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2hEOzs7O1lBcEJRLGdCQUFnQjs7O21DQWlDdEIsWUFBWSxTQUFDLHFCQUFxQjtrQ0FFbEMsS0FBSztrQ0FFTCxLQUFLO3FCQUVMLEtBQUs7eUJBVUwsS0FBSzt3Q0FFTCxLQUFLO2dDQUVMLEtBQUs7NkNBRUwsS0FBSzswQ0FFTCxLQUFLOzZDQUVMLEtBQUs7eUJBRUwsS0FBSzs7OztJQXZDTix1Q0FBaUI7O0lBQ2pCLHNEQUE2Qjs7SUFFN0IscUNBQTREOztJQUU1RCxxQ0FBcUM7O0lBRXJDLDBDQUFvRTs7Ozs7SUFFcEUsc0NBQStCOztJQUUvQixrREFBNEU7O0lBRTVFLGlEQUE2Qzs7SUFFN0MsaURBQTZDOzs7OztJQVU3QyxxQ0FBeUI7O0lBRXpCLHdDQUE2Qzs7SUFFN0MsdURBQTZDOztJQUU3QywrQ0FBNEM7O0lBRTVDLDREQUF5RDs7SUFFekQseURBQXNEOztJQUV0RCw0REFBeUQ7O0lBRXpELHdDQUFxQzs7Ozs7SUE4RHpCLDhDQUEwQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIElucHV0LFxyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gIFRlbXBsYXRlUmVmLFxyXG4gIENvbnRlbnRDaGlsZCxcclxuICBPbkluaXQsXHJcbiAgT25EZXN0cm95XHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEZsb2F0TGFiZWxUeXBlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xyXG5cclxuaW1wb3J0IHsgTGF5ZXIgfSBmcm9tICcuLi9zaGFyZWQnO1xyXG5pbXBvcnQgeyBMYXllckxpc3RDb250cm9sc0VudW0gfSBmcm9tICcuL2xheWVyLWxpc3QuZW51bSc7XHJcbmltcG9ydCB7IExheWVyTGlzdFNlcnZpY2UgfSBmcm9tICcuL2xheWVyLWxpc3Quc2VydmljZSc7XHJcbmltcG9ydCB7XHJcbiAgQmVoYXZpb3JTdWJqZWN0LFxyXG4gIFJlcGxheVN1YmplY3QsXHJcbiAgU3Vic2NyaXB0aW9uLFxyXG4gIEVNUFRZLFxyXG4gIHRpbWVyXHJcbn0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IGRlYm91bmNlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQge1xyXG4gIE1ldGFkYXRhT3B0aW9ucyxcclxuICBNZXRhZGF0YUxheWVyT3B0aW9uc1xyXG59IGZyb20gJy4uLy4uL21ldGFkYXRhL3NoYXJlZC9tZXRhZGF0YS5pbnRlcmZhY2UnO1xyXG5cclxuLy8gVE9ETzogVGhpcyBjbGFzcyBjb3VsZCB1c2UgYSBjbGVhbiB1cC4gQWxzbywgc29tZSBtZXRob2RzIGNvdWxkIGJlIG1vdmVkIGVhbHNld2hlcmVcclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdpZ28tbGF5ZXItbGlzdCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2xheWVyLWxpc3QuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2xheWVyLWxpc3QuY29tcG9uZW50LnNjc3MnXSxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTGF5ZXJMaXN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG4gIG9yZGVyYWJsZSA9IHRydWU7XHJcbiAgdGhyZXNob2xkVG9GaWx0ZXJBbmRTb3J0ID0gNTtcclxuXHJcbiAgbGF5ZXJzJDogQmVoYXZpb3JTdWJqZWN0PExheWVyW10+ID0gbmV3IEJlaGF2aW9yU3ViamVjdChbXSk7XHJcblxyXG4gIGNoYW5nZSQgPSBuZXcgUmVwbGF5U3ViamVjdDx2b2lkPigxKTtcclxuXHJcbiAgc2hvd1Rvb2xiYXIkOiBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KGZhbHNlKTtcclxuXHJcbiAgcHJpdmF0ZSBjaGFuZ2UkJDogU3Vic2NyaXB0aW9uO1xyXG5cclxuICBAQ29udGVudENoaWxkKCdpZ29MYXllckl0ZW1Ub29sYmFyJykgdGVtcGxhdGVMYXllclRvb2xiYXI6IFRlbXBsYXRlUmVmPGFueT47XHJcblxyXG4gIEBJbnB1dCgpIGxheWVyc0FyZUFsbFZpc2libGU6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICBASW5wdXQoKSBsYXllcnNBcmVBbGxJblJhbmdlOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgQElucHV0KClcclxuICBzZXQgbGF5ZXJzKHZhbHVlOiBMYXllcltdKSB7XHJcbiAgICB0aGlzLl9sYXllcnMgPSB2YWx1ZTtcclxuICAgIHRoaXMubmV4dCgpO1xyXG4gIH1cclxuICBnZXQgbGF5ZXJzKCk6IExheWVyW10ge1xyXG4gICAgcmV0dXJuIHRoaXMuX2xheWVycztcclxuICB9XHJcbiAgcHJpdmF0ZSBfbGF5ZXJzOiBMYXllcltdO1xyXG5cclxuICBASW5wdXQoKSBmbG9hdExhYmVsOiBGbG9hdExhYmVsVHlwZSA9ICdhdXRvJztcclxuXHJcbiAgQElucHV0KCkgbGF5ZXJGaWx0ZXJBbmRTb3J0T3B0aW9uczogYW55ID0ge307XHJcblxyXG4gIEBJbnB1dCgpIGV4Y2x1ZGVCYXNlTGF5ZXJzOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIEBJbnB1dCgpIHRvZ2dsZUxlZ2VuZE9uVmlzaWJpbGl0eUNoYW5nZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICBASW5wdXQoKSBleHBhbmRMZWdlbmRPZlZpc2libGVMYXllcnM6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgQElucHV0KCkgdXBkYXRlTGVnZW5kT25SZXNvbHV0aW9uQ2hhbmdlOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIEBJbnB1dCgpIHF1ZXJ5QmFkZ2U6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgZ2V0IGtleXdvcmQoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLmxheWVyTGlzdFNlcnZpY2Uua2V5d29yZDtcclxuICB9XHJcbiAgc2V0IGtleXdvcmQodmFsdWU6IHN0cmluZykge1xyXG4gICAgdGhpcy5sYXllckxpc3RTZXJ2aWNlLmtleXdvcmQgPSB2YWx1ZTtcclxuICAgIHRoaXMubmV4dCgpO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGtleXdvcmRJbml0aWFsaXplZCgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLmxheWVyTGlzdFNlcnZpY2Uua2V5d29yZEluaXRpYWxpemVkO1xyXG4gIH1cclxuICBzZXQga2V5d29yZEluaXRpYWxpemVkKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLmxheWVyTGlzdFNlcnZpY2Uua2V5d29yZEluaXRpYWxpemVkID0gdmFsdWU7XHJcbiAgfVxyXG5cclxuICBnZXQgb25seVZpc2libGUoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5sYXllckxpc3RTZXJ2aWNlLm9ubHlWaXNpYmxlO1xyXG4gIH1cclxuICBzZXQgb25seVZpc2libGUodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMubGF5ZXJMaXN0U2VydmljZS5vbmx5VmlzaWJsZSA9IHZhbHVlO1xyXG4gICAgdGhpcy5uZXh0KCk7XHJcbiAgfVxyXG5cclxuICBnZXQgb25seVZpc2libGVJbml0aWFsaXplZCgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLmxheWVyTGlzdFNlcnZpY2Uub25seVZpc2libGVJbml0aWFsaXplZDtcclxuICB9XHJcbiAgc2V0IG9ubHlWaXNpYmxlSW5pdGlhbGl6ZWQodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMubGF5ZXJMaXN0U2VydmljZS5vbmx5VmlzaWJsZUluaXRpYWxpemVkID0gdmFsdWU7XHJcbiAgfVxyXG5cclxuICBnZXQgb25seUluUmFuZ2UoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5sYXllckxpc3RTZXJ2aWNlLm9ubHlJblJhbmdlO1xyXG4gIH1cclxuICBzZXQgb25seUluUmFuZ2UodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMubGF5ZXJMaXN0U2VydmljZS5vbmx5SW5SYW5nZSA9IHZhbHVlO1xyXG4gICAgdGhpcy5uZXh0KCk7XHJcbiAgfVxyXG5cclxuICBnZXQgb25seUluUmFuZ2VJbml0aWFsaXplZCgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLmxheWVyTGlzdFNlcnZpY2Uub25seUluUmFuZ2VJbml0aWFsaXplZDtcclxuICB9XHJcbiAgc2V0IG9ubHlJblJhbmdlSW5pdGlhbGl6ZWQodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMubGF5ZXJMaXN0U2VydmljZS5vbmx5SW5SYW5nZUluaXRpYWxpemVkID0gdmFsdWU7XHJcbiAgfVxyXG5cclxuICBnZXQgc29ydGVkQWxwaGEoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5sYXllckxpc3RTZXJ2aWNlLnNvcnRlZEFscGhhO1xyXG4gIH1cclxuICBzZXQgc29ydGVkQWxwaGEodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMubGF5ZXJMaXN0U2VydmljZS5zb3J0ZWRBbHBoYSA9IHZhbHVlO1xyXG4gICAgdGhpcy5uZXh0KCk7XHJcbiAgfVxyXG5cclxuICBnZXQgc29ydGVkQWxwaGFJbml0aWFsaXplZCgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLmxheWVyTGlzdFNlcnZpY2Uuc29ydGVkQWxwaGFJbml0aWFsaXplZDtcclxuICB9XHJcbiAgc2V0IHNvcnRlZEFscGhhSW5pdGlhbGl6ZWQodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMubGF5ZXJMaXN0U2VydmljZS5zb3J0ZWRBbHBoYUluaXRpYWxpemVkID0gdmFsdWU7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGxheWVyTGlzdFNlcnZpY2U6IExheWVyTGlzdFNlcnZpY2UpIHt9XHJcblxyXG4gIC8qKlxyXG4gICAqIFN1YnNjcmliZSB0byB0aGUgc2VhcmNoIHRlcm0gc3RyZWFtIGFuZCB0cmlnZ2VyIHJlc2VhcmNoZXNcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgIHRoaXMuY2hhbmdlJCQgPSB0aGlzLmNoYW5nZSRcclxuICAgICAgLnBpcGUoXHJcbiAgICAgICAgZGVib3VuY2UoKCkgPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIHRoaXMubGF5ZXJzLmxlbmd0aCA9PT0gMCA/IEVNUFRZIDogdGltZXIoNTApO1xyXG4gICAgICAgIH0pXHJcbiAgICAgIClcclxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5zaG93VG9vbGJhciQubmV4dCh0aGlzLmNvbXB1dGVTaG93VG9vbGJhcigpKTtcclxuICAgICAgICB0aGlzLmxheWVycyQubmV4dCh0aGlzLmNvbXB1dGVMYXllcnModGhpcy5sYXllcnMuc2xpY2UoMCkpKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgdGhpcy5pbml0TGF5ZXJGaWx0ZXJBbmRTb3J0T3B0aW9ucygpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLmNoYW5nZSQkLnVuc3Vic2NyaWJlKCk7XHJcbiAgfVxyXG5cclxuICB0b2dnbGVPbmx5VmlzaWJsZSgpIHtcclxuICAgIHRoaXMub25seVZpc2libGUgPSAhdGhpcy5vbmx5VmlzaWJsZTtcclxuICB9XHJcblxyXG4gIHRvZ2dsZU9ubHlJblJhbmdlKCkge1xyXG4gICAgdGhpcy5vbmx5SW5SYW5nZSA9ICF0aGlzLm9ubHlJblJhbmdlO1xyXG4gIH1cclxuXHJcbiAgdG9nZ2xlU29ydChzb3J0QWxwaGE6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMuc29ydGVkQWxwaGEgPSBzb3J0QWxwaGE7XHJcbiAgfVxyXG5cclxuICBjbGVhcktleXdvcmQoKSB7XHJcbiAgICB0aGlzLmtleXdvcmQgPSB1bmRlZmluZWQ7XHJcbiAgfVxyXG5cclxuICBnZXRMb3dlckxheWVyKCkge1xyXG4gICAgcmV0dXJuIHRoaXMubGF5ZXJzXHJcbiAgICAgIC5maWx0ZXIobCA9PiAhbC5iYXNlTGF5ZXIpXHJcbiAgICAgIC5yZWR1Y2UoXHJcbiAgICAgICAgKHByZXYsIGN1cnJlbnQpID0+IHtcclxuICAgICAgICAgIHJldHVybiBwcmV2LnpJbmRleCA8IGN1cnJlbnQuekluZGV4ID8gcHJldiA6IGN1cnJlbnQ7XHJcbiAgICAgICAgfSxcclxuICAgICAgICB7IHpJbmRleDogdW5kZWZpbmVkLCBpZDogdW5kZWZpbmVkIH1cclxuICAgICAgKTtcclxuICB9XHJcblxyXG4gIGdldFVwcGVyTGF5ZXIoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5sYXllcnNcclxuICAgICAgLmZpbHRlcihsID0+ICFsLmJhc2VMYXllcilcclxuICAgICAgLnJlZHVjZShcclxuICAgICAgICAocHJldiwgY3VycmVudCkgPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIHByZXYuekluZGV4ID4gY3VycmVudC56SW5kZXggPyBwcmV2IDogY3VycmVudDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHsgekluZGV4OiB1bmRlZmluZWQsIGlkOiB1bmRlZmluZWQgfVxyXG4gICAgICApO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBuZXh0KCkge1xyXG4gICAgdGhpcy5jaGFuZ2UkLm5leHQoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY29tcHV0ZUxheWVycyhsYXllcnM6IExheWVyW10pOiBMYXllcltdIHtcclxuICAgIGxldCBsYXllcnNPdXQgPSB0aGlzLmZpbHRlckxheWVycyhsYXllcnMpO1xyXG4gICAgaWYgKHRoaXMuc29ydGVkQWxwaGEpIHtcclxuICAgICAgbGF5ZXJzT3V0ID0gdGhpcy5zb3J0TGF5ZXJzQnlUaXRsZShsYXllcnNPdXQpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbGF5ZXJzT3V0ID0gdGhpcy5zb3J0TGF5ZXJzQnlaaW5kZXgobGF5ZXJzT3V0KTtcclxuICAgIH1cclxuICAgIHJldHVybiBsYXllcnNPdXQ7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGZpbHRlckxheWVycyhsYXllcnM6IExheWVyW10pOiBMYXllcltdIHtcclxuICAgIGNvbnN0IGtleXdvcmQgPSB0aGlzLmtleXdvcmQ7XHJcbiAgICBpZiAoXHJcbiAgICAgIHRoaXMubGF5ZXJGaWx0ZXJBbmRTb3J0T3B0aW9ucy5zaG93VG9vbGJhciA9PT0gTGF5ZXJMaXN0Q29udHJvbHNFbnVtLm5ldmVyXHJcbiAgICApIHtcclxuICAgICAgcmV0dXJuIGxheWVycztcclxuICAgIH1cclxuICAgIGlmICgha2V5d29yZCAmJiAhdGhpcy5vbmx5SW5SYW5nZSAmJiAhdGhpcy5vbmx5VmlzaWJsZSkge1xyXG4gICAgICByZXR1cm4gbGF5ZXJzO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGtlZXBMYXllcklkcyA9IGxheWVycy5tYXAoKGxheWVyOiBMYXllcikgPT4gbGF5ZXIuaWQpO1xyXG5cclxuICAgIGxheWVycy5mb3JFYWNoKChsYXllcjogTGF5ZXIpID0+IHtcclxuICAgICAgY29uc3QgbGF5ZXJPcHRpb25zID0gKGxheWVyLm9wdGlvbnMgYXMgTWV0YWRhdGFMYXllck9wdGlvbnMpIHx8IHt9O1xyXG4gICAgICBjb25zdCBkYXRhU291cmNlT3B0aW9ucyA9IGxheWVyLmRhdGFTb3VyY2Uub3B0aW9ucyB8fCB7fTtcclxuICAgICAgY29uc3QgbWV0YWRhdGEgPSBsYXllck9wdGlvbnMubWV0YWRhdGEgfHwgKHt9IGFzIE1ldGFkYXRhT3B0aW9ucyk7XHJcbiAgICAgIGNvbnN0IGtleXdvcmRzID0gbWV0YWRhdGEua2V5d29yZExpc3QgfHwgW107XHJcbiAgICAgIGNvbnN0IGxheWVyS2V5d29yZHMgPSBrZXl3b3Jkcy5tYXAoKGt3OiBzdHJpbmcpID0+IHtcclxuICAgICAgICByZXR1cm4ga3cubm9ybWFsaXplKCdORkQnKS5yZXBsYWNlKC9bXFx1MDMwMC1cXHUwMzZmXS9nLCAnJyk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgaWYgKGtleXdvcmQpIHtcclxuICAgICAgICBjb25zdCBsb2NhbEtleXdvcmQgPSBrZXl3b3JkXHJcbiAgICAgICAgICAubm9ybWFsaXplKCdORkQnKVxyXG4gICAgICAgICAgLnJlcGxhY2UoL1tcXHUwMzAwLVxcdTAzNmZdL2csICcnKTtcclxuICAgICAgICBjb25zdCBsYXllclRpdGxlID0gbGF5ZXIudGl0bGVcclxuICAgICAgICAgIC5ub3JtYWxpemUoJ05GRCcpXHJcbiAgICAgICAgICAucmVwbGFjZSgvW1xcdTAzMDAtXFx1MDM2Zl0vZywgJycpO1xyXG4gICAgICAgIGNvbnN0IGRhdGFTb3VyY2VUeXBlID0gZGF0YVNvdXJjZU9wdGlvbnMudHlwZSB8fCAnJztcclxuICAgICAgICBjb25zdCBrZXl3b3JkUmVnZXggPSBuZXcgUmVnRXhwKGxvY2FsS2V5d29yZCwgJ2dpJyk7XHJcbiAgICAgICAgY29uc3Qga2V5d29yZEluTGlzdCA9XHJcbiAgICAgICAgICBsYXllcktleXdvcmRzLmZpbmQoKGt3OiBzdHJpbmcpID0+IGtleXdvcmRSZWdleC50ZXN0KGt3KSkgIT09XHJcbiAgICAgICAgICB1bmRlZmluZWQ7XHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAgIWtleXdvcmRSZWdleC50ZXN0KGxheWVyVGl0bGUpICYmXHJcbiAgICAgICAgICAhKGtleXdvcmQudG9Mb3dlckNhc2UoKSA9PT0gZGF0YVNvdXJjZVR5cGUudG9Mb3dlckNhc2UoKSkgJiZcclxuICAgICAgICAgICFrZXl3b3JkSW5MaXN0XHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICBjb25zdCBpbmRleCA9IGtlZXBMYXllcklkcy5pbmRleE9mKGxheWVyLmlkKTtcclxuICAgICAgICAgIGlmIChpbmRleCA+IC0xKSB7XHJcbiAgICAgICAgICAgIGtlZXBMYXllcklkcy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHRoaXMub25seVZpc2libGUgJiYgbGF5ZXIudmlzaWJsZSA9PT0gZmFsc2UpIHtcclxuICAgICAgICBjb25zdCBpbmRleCA9IGtlZXBMYXllcklkcy5pbmRleE9mKGxheWVyLmlkKTtcclxuICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xyXG4gICAgICAgICAga2VlcExheWVySWRzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAodGhpcy5vbmx5SW5SYW5nZSAmJiBsYXllci5pc0luUmVzb2x1dGlvbnNSYW5nZSA9PT0gZmFsc2UpIHtcclxuICAgICAgICBjb25zdCBpbmRleCA9IGtlZXBMYXllcklkcy5pbmRleE9mKGxheWVyLmlkKTtcclxuICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xyXG4gICAgICAgICAga2VlcExheWVySWRzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gbGF5ZXJzLmZpbHRlcihcclxuICAgICAgKGxheWVyOiBMYXllcikgPT4ga2VlcExheWVySWRzLmluZGV4T2YobGF5ZXIuaWQpICE9PSAtMVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgc29ydExheWVyc0J5WmluZGV4KGxheWVyczogTGF5ZXJbXSkge1xyXG4gICAgcmV0dXJuIGxheWVycy5zb3J0KChsYXllcjEsIGxheWVyMikgPT4gbGF5ZXIyLnpJbmRleCAtIGxheWVyMS56SW5kZXgpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzb3J0TGF5ZXJzQnlUaXRsZShsYXllcnM6IExheWVyW10pIHtcclxuICAgIHJldHVybiBsYXllcnMuc29ydCgoYSwgYikgPT4ge1xyXG4gICAgICBpZiAoYS50aXRsZSA8IGIudGl0bGUpIHtcclxuICAgICAgICByZXR1cm4gLTE7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGEudGl0bGUgPiBiLnRpdGxlKSB7XHJcbiAgICAgICAgcmV0dXJuIDE7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIDA7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY29tcHV0ZVNob3dUb29sYmFyKCk6IGJvb2xlYW4ge1xyXG4gICAgc3dpdGNoICh0aGlzLmxheWVyRmlsdGVyQW5kU29ydE9wdGlvbnMuc2hvd1Rvb2xiYXIpIHtcclxuICAgICAgY2FzZSBMYXllckxpc3RDb250cm9sc0VudW0uYWx3YXlzOlxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICBjYXNlIExheWVyTGlzdENvbnRyb2xzRW51bS5uZXZlcjpcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAgdGhpcy5sYXllcnMubGVuZ3RoID49IHRoaXMudGhyZXNob2xkVG9GaWx0ZXJBbmRTb3J0IHx8XHJcbiAgICAgICAgICB0aGlzLmtleXdvcmQgfHxcclxuICAgICAgICAgIHRoaXMub25seUluUmFuZ2UgfHxcclxuICAgICAgICAgIHRoaXMub25seVZpc2libGVcclxuICAgICAgICApIHtcclxuICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGluaXRMYXllckZpbHRlckFuZFNvcnRPcHRpb25zKCkge1xyXG4gICAgaWYgKHRoaXMubGF5ZXJGaWx0ZXJBbmRTb3J0T3B0aW9ucy50b29sYmFyVGhyZXNob2xkKSB7XHJcbiAgICAgIHRoaXMudGhyZXNob2xkVG9GaWx0ZXJBbmRTb3J0ID0gdGhpcy5sYXllckZpbHRlckFuZFNvcnRPcHRpb25zLnRvb2xiYXJUaHJlc2hvbGQ7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMubGF5ZXJGaWx0ZXJBbmRTb3J0T3B0aW9ucy5rZXl3b3JkICYmICF0aGlzLmtleXdvcmRJbml0aWFsaXplZCkge1xyXG4gICAgICB0aGlzLmtleXdvcmQgPSB0aGlzLmxheWVyRmlsdGVyQW5kU29ydE9wdGlvbnMua2V5d29yZDtcclxuICAgICAgdGhpcy5rZXl3b3JkSW5pdGlhbGl6ZWQgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgaWYgKFxyXG4gICAgICB0aGlzLmxheWVyRmlsdGVyQW5kU29ydE9wdGlvbnMuc29ydGVkQWxwaGEgJiZcclxuICAgICAgIXRoaXMuc29ydGVkQWxwaGFJbml0aWFsaXplZFxyXG4gICAgKSB7XHJcbiAgICAgIHRoaXMuc29ydGVkQWxwaGEgPSB0aGlzLmxheWVyRmlsdGVyQW5kU29ydE9wdGlvbnMuc29ydGVkQWxwaGE7XHJcbiAgICAgIHRoaXMuc29ydGVkQWxwaGFJbml0aWFsaXplZCA9IHRydWU7XHJcbiAgICB9XHJcbiAgICBpZiAoXHJcbiAgICAgIHRoaXMubGF5ZXJGaWx0ZXJBbmRTb3J0T3B0aW9ucy5vbmx5VmlzaWJsZSAmJlxyXG4gICAgICAhdGhpcy5vbmx5VmlzaWJsZUluaXRpYWxpemVkICYmXHJcbiAgICAgICF0aGlzLmxheWVyc0FyZUFsbFZpc2libGVcclxuICAgICkge1xyXG4gICAgICB0aGlzLm9ubHlWaXNpYmxlID0gdGhpcy5sYXllckZpbHRlckFuZFNvcnRPcHRpb25zLm9ubHlWaXNpYmxlO1xyXG4gICAgICB0aGlzLm9ubHlWaXNpYmxlSW5pdGlhbGl6ZWQgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgaWYgKFxyXG4gICAgICB0aGlzLmxheWVyRmlsdGVyQW5kU29ydE9wdGlvbnMub25seUluUmFuZ2UgJiZcclxuICAgICAgIXRoaXMub25seUluUmFuZ2VJbml0aWFsaXplZCAmJlxyXG4gICAgICAhdGhpcy5sYXllcnNBcmVBbGxJblJhbmdlXHJcbiAgICApIHtcclxuICAgICAgdGhpcy5vbmx5SW5SYW5nZSA9IHRoaXMubGF5ZXJGaWx0ZXJBbmRTb3J0T3B0aW9ucy5vbmx5SW5SYW5nZTtcclxuICAgICAgdGhpcy5vbmx5SW5SYW5nZUluaXRpYWxpemVkID0gdHJ1ZTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19
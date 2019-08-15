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
        this.hasLayerNotVisible = false;
        this.hasLayerOutOfRange = false;
        this.orderable = true;
        this.thresholdToFilterAndSort = 5;
        this.layers$ = new BehaviorSubject([]);
        this.change$ = new ReplaySubject(1);
        this.showToolbar$ = new BehaviorSubject(false);
        this.placeholder = '';
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
        this.setLayers(value);
        this.next();
    }
    /**
     * @return {?}
     */
    get layers() { return this._layers; }
    /**
     * @return {?}
     */
    get keyword() { return this.layerListService.keyword; }
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
    get keywordInitialized() { return this.layerListService.keywordInitialized; }
    /**
     * @param {?} value
     * @return {?}
     */
    set keywordInitialized(value) { this.layerListService.keywordInitialized = value; }
    /**
     * @return {?}
     */
    get onlyVisible() { return this.layerListService.onlyVisible; }
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
    get onlyVisibleInitialized() { return this.layerListService.onlyVisibleInitialized; }
    /**
     * @param {?} value
     * @return {?}
     */
    set onlyVisibleInitialized(value) { this.layerListService.onlyVisibleInitialized = value; }
    /**
     * @return {?}
     */
    get onlyInRange() { return this.layerListService.onlyInRange; }
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
    get onlyInRangeInitialized() { return this.layerListService.onlyInRangeInitialized; }
    /**
     * @param {?} value
     * @return {?}
     */
    set onlyInRangeInitialized(value) { this.layerListService.onlyInRangeInitialized = value; }
    /**
     * @return {?}
     */
    get sortedAlpha() { return this.layerListService.sortedAlpha; }
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
    get sortedAlphaInitialized() { return this.layerListService.sortedAlphaInitialized; }
    /**
     * @param {?} value
     * @return {?}
     */
    set sortedAlphaInitialized(value) { this.layerListService.sortedAlphaInitialized = value; }
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
        }))).subscribe((/**
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
        return this.layers.filter((/**
         * @param {?} l
         * @return {?}
         */
        l => !l.baseLayer)).reduce((/**
         * @param {?} prev
         * @param {?} current
         * @return {?}
         */
        (prev, current) => {
            return (prev.zIndex < current.zIndex) ? prev : current;
        }));
    }
    /**
     * @return {?}
     */
    getUpperLayer() {
        return this.layers.filter((/**
         * @param {?} l
         * @return {?}
         */
        l => !l.baseLayer)).reduce((/**
         * @param {?} prev
         * @param {?} current
         * @return {?}
         */
        (prev, current) => {
            return (prev.zIndex > current.zIndex) ? prev : current;
        }));
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
            const layerOptions = (/** @type {?} */ (layer.options)) || {};
            /** @type {?} */
            const dataSourceOptions = layer.dataSource.options || {};
            /** @type {?} */
            const metadata = layerOptions.metadata || (/** @type {?} */ ({}));
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
                const localKeyword = keyword.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
                /** @type {?} */
                const layerTitle = layer.title.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
                /** @type {?} */
                const dataSourceType = dataSourceOptions.type || '';
                /** @type {?} */
                const keywordRegex = new RegExp(localKeyword, 'gi');
                /** @type {?} */
                const keywordInList = layerKeywords.find((/**
                 * @param {?} kw
                 * @return {?}
                 */
                (kw) => keywordRegex.test(kw))) !== undefined;
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
        if (this.layerFilterAndSortOptions.sortedAlpha && !this.sortedAlphaInitialized) {
            this.sortedAlpha = this.layerFilterAndSortOptions.sortedAlpha;
            this.sortedAlphaInitialized = true;
        }
        if (this.layerFilterAndSortOptions.onlyVisible && !this.onlyVisibleInitialized &&
            this.hasLayerNotVisible) {
            this.onlyVisible = this.layerFilterAndSortOptions.onlyVisible;
            this.onlyVisibleInitialized = true;
        }
        if (this.layerFilterAndSortOptions.onlyInRange && !this.onlyInRangeInitialized &&
            this.hasLayerOutOfRange) {
            this.onlyInRange = this.layerFilterAndSortOptions.onlyInRange;
            this.onlyInRangeInitialized = true;
        }
    }
    /**
     * @private
     * @param {?} layers
     * @return {?}
     */
    setLayers(layers) {
        this._layers = layers;
        if (this.excludeBaseLayers) {
            this.hasLayerNotVisible = layers.find((/**
             * @param {?} l
             * @return {?}
             */
            l => l.visible === false && !l.baseLayer)) !== undefined;
            this.hasLayerOutOfRange = layers.find((/**
             * @param {?} l
             * @return {?}
             */
            l => l.isInResolutionsRange === false && !l.baseLayer)) !== undefined;
        }
        else {
            this.hasLayerNotVisible = layers.find((/**
             * @param {?} l
             * @return {?}
             */
            l => l.visible === false)) !== undefined;
            this.hasLayerOutOfRange = layers.find((/**
             * @param {?} l
             * @return {?}
             */
            l => l.isInResolutionsRange === false)) !== undefined;
        }
    }
}
LayerListComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-layer-list',
                template: "<igo-list [navigation]=\"false\" [selection]=\"false\">\r\n  <mat-list-item *ngIf=\"showToolbar$ | async\">\r\n    <ng-container>\r\n      <mat-form-field class=\"inputFilter\" [floatLabel]=\"floatLabel\">\r\n        <input\r\n          matInput\r\n          [placeholder]=\"placeholder\"\r\n          [matTooltip]=\"'igo.geo.layer.subsetLayersListKeyword' | translate\"\r\n          matTooltipShowDelay=\"500\"\r\n          type=\"text\" [(ngModel)]=\"keyword\">\r\n        <button\r\n          mat-button\r\n          *ngIf=\"keyword\"\r\n          matSuffix\r\n          mat-icon-button\r\n          aria-label=\"Clear\"\r\n          color=\"warn\"\r\n          (click)=\"clearKeyword()\">\r\n          <mat-icon svgIcon=\"close\"></mat-icon>\r\n        </button>\r\n      </mat-form-field>\r\n      <button\r\n        *ngIf=\"!sortedAlpha\"\r\n        mat-icon-button\r\n        [matTooltip]=\"'igo.geo.layer.sortAlphabetically' | translate\"\r\n        matTooltipShowDelay=\"500\"\r\n        (click)=\"toggleSort(true)\">\r\n        <mat-icon color=\"primary\" svgIcon=\"sort-alphabetical\"></mat-icon>\r\n      </button>\r\n      <button\r\n        *ngIf=\"sortedAlpha\"\r\n        mat-icon-button\r\n        [matTooltip]=\"'igo.geo.layer.sortMapOrder' | translate\"\r\n        matTooltipShowDelay=\"500\"\r\n        (click)=\"toggleSort(false)\">\r\n        <mat-icon color=\"warn\" svgIcon=\"alert\"></mat-icon>\r\n      </button>\r\n      <button\r\n        mat-icon-button\r\n        [disabled]=\"!hasLayerNotVisible\"\r\n        [matTooltip]=\"onlyVisible ?\r\n        ('igo.geo.layer.resetLayersList' | translate) :\r\n        ('igo.geo.layer.subsetLayersListOnlyVisible' | translate)\"\r\n        matTooltipShowDelay=\"500\"\r\n        [color]=\"onlyVisible ? 'warn' : 'primary'\"\r\n        (click)=\"toggleOnlyVisible()\">\r\n        <mat-icon [svgIcon]=\"!onlyVisible ? 'eye' : 'alert'\"></mat-icon>\r\n      </button>\r\n      <button\r\n        mat-icon-button\r\n        [disabled]=\"!hasLayerOutOfRange\"\r\n        [matTooltip]=\"onlyInRange ?\r\n        ('igo.geo.layer.resetLayersList' | translate) :\r\n        ('igo.geo.layer.subsetLayersListOnlyInRange' | translate)\"\r\n        matTooltipShowDelay=\"500\"\r\n        [color]=\"onlyInRange ? 'warn' : 'primary'\"\r\n        (click)=\"toggleOnlyInRange()\">\r\n        <mat-icon [svgIcon]=\"!onlyInRange ? 'playlist-check' : 'alert'\"></mat-icon>\r\n      </button>\r\n    </ng-container>\r\n  </mat-list-item>\r\n\r\n  <ng-template ngFor let-layer let-i=\"index\" [ngForOf]=\"layers$ | async\">\r\n    <igo-layer-item *ngIf=\"!(excludeBaseLayers && layer.baseLayer)\"\r\n        igoListItem\r\n        [layer]=\"layer\"\r\n        [orderable]=\"orderable && !layer.baseLayer\"\r\n        [lowerDisabled]=\"getLowerLayer().id === layer.id\"\r\n        [raiseDisabled]=\"getUpperLayer().id === layer.id\"\r\n        [queryBadge]=\"queryBadge\"\r\n        [expandLegendIfVisible]=\"expandLegendOfVisibleLayers\"\r\n        [updateLegendOnResolutionChange]=\"updateLegendOnResolutionChange\"\r\n        [toggleLegendOnVisibilityChange]=\"toggleLegendOnVisibilityChange\">\r\n\r\n        <ng-container igoLayerItemToolbar\r\n          [ngTemplateOutlet]=\"templateLayerToolbar\"\r\n          [ngTemplateOutletContext]=\"{layer: layer}\">\r\n        </ng-container>\r\n\r\n    </igo-layer-item>\r\n  </ng-template>\r\n</igo-list>\r\n",
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
    layers: [{ type: Input }],
    placeholder: [{ type: Input }],
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
    LayerListComponent.prototype.hasLayerNotVisible;
    /** @type {?} */
    LayerListComponent.prototype.hasLayerOutOfRange;
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
    /**
     * @type {?}
     * @private
     */
    LayerListComponent.prototype._layers;
    /** @type {?} */
    LayerListComponent.prototype.placeholder;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5ZXItbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvbGF5ZXIvbGF5ZXItbGlzdC9sYXllci1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsdUJBQXVCLEVBQ3ZCLFdBQVcsRUFDWCxZQUFZLEVBR2IsTUFBTSxlQUFlLENBQUM7QUFJdkIsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDMUQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDeEQsT0FBTyxFQUFFLGVBQWUsRUFBRSxhQUFhLEVBQWdCLEtBQUssRUFBRSxLQUFLLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDbEYsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGdCQUFnQixDQUFDOztBQVUxQyxNQUFNLE9BQU8sa0JBQWtCOzs7O0lBNkU3QixZQUNVLGdCQUFrQztRQUFsQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBNUU1Qyx1QkFBa0IsR0FBRyxLQUFLLENBQUM7UUFDM0IsdUJBQWtCLEdBQUcsS0FBSyxDQUFDO1FBQzNCLGNBQVMsR0FBRyxJQUFJLENBQUM7UUFDakIsNkJBQXdCLEdBQUcsQ0FBQyxDQUFDO1FBRTdCLFlBQU8sR0FBNkIsSUFBSSxlQUFlLENBQUMsRUFBRSxDQUFDLENBQUM7UUFFNUQsWUFBTyxHQUFHLElBQUksYUFBYSxDQUFPLENBQUMsQ0FBQyxDQUFDO1FBRXJDLGlCQUFZLEdBQTZCLElBQUksZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBYzNELGdCQUFXLEdBQVcsRUFBRSxDQUFDO1FBRXpCLGVBQVUsR0FBbUIsTUFBTSxDQUFDO1FBRXBDLDhCQUF5QixHQUFRLEVBQUUsQ0FBQztRQUVwQyxzQkFBaUIsR0FBWSxLQUFLLENBQUM7UUFFbkMsbUNB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QUE0RDs7SUFFNUQscUNBQXFDOztJQUVyQywwQ0FBb0U7Ozs7O0lBRXBFLHNDQUErQjs7SUFFL0Isa0RBQTRFOzs7OztJQVE1RSxxQ0FBeUI7O0lBRXpCLHlDQUFrQzs7SUFFbEMsd0NBQTZDOztJQUU3Qyx1REFBNkM7O0lBRTdDLCtDQUE0Qzs7SUFFNUMsNERBQXlEOztJQUV6RCx5REFBc0Q7O0lBRXRELDREQUF5RDs7SUFFekQsd0NBQXFDOzs7OztJQXVDbkMsOENBQTBDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgSW5wdXQsXHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbiAgVGVtcGxhdGVSZWYsXHJcbiAgQ29udGVudENoaWxkLFxyXG4gIE9uSW5pdCxcclxuICBPbkRlc3Ryb3lcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRmxvYXRMYWJlbFR5cGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XHJcblxyXG5pbXBvcnQgeyBMYXllciB9IGZyb20gJy4uL3NoYXJlZCc7XHJcbmltcG9ydCB7IExheWVyTGlzdENvbnRyb2xzRW51bSB9IGZyb20gJy4vbGF5ZXItbGlzdC5lbnVtJztcclxuaW1wb3J0IHsgTGF5ZXJMaXN0U2VydmljZSB9IGZyb20gJy4vbGF5ZXItbGlzdC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBSZXBsYXlTdWJqZWN0LCBTdWJzY3JpcHRpb24sIEVNUFRZLCB0aW1lciB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBkZWJvdW5jZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgTWV0YWRhdGFPcHRpb25zLCBNZXRhZGF0YUxheWVyT3B0aW9ucyB9IGZyb20gJy4uLy4uL21ldGFkYXRhL3NoYXJlZC9tZXRhZGF0YS5pbnRlcmZhY2UnO1xyXG5cclxuLy8gVE9ETzogVGhpcyBjbGFzcyBjb3VsZCB1c2UgYSBjbGVhbiB1cC4gQWxzbywgc29tZSBtZXRob2RzIGNvdWxkIGJlIG1vdmVkIGVhbHNld2hlcmVcclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdpZ28tbGF5ZXItbGlzdCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2xheWVyLWxpc3QuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2xheWVyLWxpc3QuY29tcG9uZW50LnNjc3MnXSxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTGF5ZXJMaXN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG5cclxuICBoYXNMYXllck5vdFZpc2libGUgPSBmYWxzZTtcclxuICBoYXNMYXllck91dE9mUmFuZ2UgPSBmYWxzZTtcclxuICBvcmRlcmFibGUgPSB0cnVlO1xyXG4gIHRocmVzaG9sZFRvRmlsdGVyQW5kU29ydCA9IDU7XHJcblxyXG4gIGxheWVycyQ6IEJlaGF2aW9yU3ViamVjdDxMYXllcltdPiA9IG5ldyBCZWhhdmlvclN1YmplY3QoW10pO1xyXG5cclxuICBjaGFuZ2UkID0gbmV3IFJlcGxheVN1YmplY3Q8dm9pZD4oMSk7XHJcblxyXG4gIHNob3dUb29sYmFyJDogQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IEJlaGF2aW9yU3ViamVjdChmYWxzZSk7XHJcblxyXG4gIHByaXZhdGUgY2hhbmdlJCQ6IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgQENvbnRlbnRDaGlsZCgnaWdvTGF5ZXJJdGVtVG9vbGJhcicpIHRlbXBsYXRlTGF5ZXJUb29sYmFyOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG5cclxuICBASW5wdXQoKVxyXG4gIHNldCBsYXllcnModmFsdWU6IExheWVyW10pIHtcclxuICAgIHRoaXMuc2V0TGF5ZXJzKHZhbHVlKTtcclxuICAgIHRoaXMubmV4dCgpO1xyXG4gIH1cclxuICBnZXQgbGF5ZXJzKCk6IExheWVyW10geyByZXR1cm4gdGhpcy5fbGF5ZXJzOyB9XHJcbiAgcHJpdmF0ZSBfbGF5ZXJzOiBMYXllcltdO1xyXG5cclxuICBASW5wdXQoKSBwbGFjZWhvbGRlcjogc3RyaW5nID0gJyc7XHJcblxyXG4gIEBJbnB1dCgpIGZsb2F0TGFiZWw6IEZsb2F0TGFiZWxUeXBlID0gJ2F1dG8nO1xyXG5cclxuICBASW5wdXQoKSBsYXllckZpbHRlckFuZFNvcnRPcHRpb25zOiBhbnkgPSB7fTtcclxuXHJcbiAgQElucHV0KCkgZXhjbHVkZUJhc2VMYXllcnM6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgQElucHV0KCkgdG9nZ2xlTGVnZW5kT25WaXNpYmlsaXR5Q2hhbmdlOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIEBJbnB1dCgpIGV4cGFuZExlZ2VuZE9mVmlzaWJsZUxheWVyczogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICBASW5wdXQoKSB1cGRhdGVMZWdlbmRPblJlc29sdXRpb25DaGFuZ2U6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgQElucHV0KCkgcXVlcnlCYWRnZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICBnZXQga2V5d29yZCgpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5sYXllckxpc3RTZXJ2aWNlLmtleXdvcmQ7IH1cclxuICBzZXQga2V5d29yZCh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICB0aGlzLmxheWVyTGlzdFNlcnZpY2Uua2V5d29yZCA9IHZhbHVlO1xyXG4gICAgdGhpcy5uZXh0KCk7XHJcbiAgfVxyXG5cclxuICBnZXQga2V5d29yZEluaXRpYWxpemVkKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5sYXllckxpc3RTZXJ2aWNlLmtleXdvcmRJbml0aWFsaXplZDsgfVxyXG4gIHNldCBrZXl3b3JkSW5pdGlhbGl6ZWQodmFsdWU6IGJvb2xlYW4pIHsgdGhpcy5sYXllckxpc3RTZXJ2aWNlLmtleXdvcmRJbml0aWFsaXplZCA9IHZhbHVlOyB9XHJcblxyXG4gIGdldCBvbmx5VmlzaWJsZSgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMubGF5ZXJMaXN0U2VydmljZS5vbmx5VmlzaWJsZTsgfVxyXG4gIHNldCBvbmx5VmlzaWJsZSh2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgdGhpcy5sYXllckxpc3RTZXJ2aWNlLm9ubHlWaXNpYmxlID0gdmFsdWU7XHJcbiAgICB0aGlzLm5leHQoKTtcclxuICB9XHJcblxyXG4gIGdldCBvbmx5VmlzaWJsZUluaXRpYWxpemVkKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5sYXllckxpc3RTZXJ2aWNlLm9ubHlWaXNpYmxlSW5pdGlhbGl6ZWQ7IH1cclxuICBzZXQgb25seVZpc2libGVJbml0aWFsaXplZCh2YWx1ZTogYm9vbGVhbikgeyB0aGlzLmxheWVyTGlzdFNlcnZpY2Uub25seVZpc2libGVJbml0aWFsaXplZCA9IHZhbHVlOyB9XHJcblxyXG4gIGdldCBvbmx5SW5SYW5nZSgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMubGF5ZXJMaXN0U2VydmljZS5vbmx5SW5SYW5nZTsgfVxyXG4gIHNldCBvbmx5SW5SYW5nZSh2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgdGhpcy5sYXllckxpc3RTZXJ2aWNlLm9ubHlJblJhbmdlID0gdmFsdWU7XHJcbiAgICB0aGlzLm5leHQoKTtcclxuICB9XHJcblxyXG4gIGdldCBvbmx5SW5SYW5nZUluaXRpYWxpemVkKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5sYXllckxpc3RTZXJ2aWNlLm9ubHlJblJhbmdlSW5pdGlhbGl6ZWQ7IH1cclxuICBzZXQgb25seUluUmFuZ2VJbml0aWFsaXplZCh2YWx1ZTogYm9vbGVhbikgeyB0aGlzLmxheWVyTGlzdFNlcnZpY2Uub25seUluUmFuZ2VJbml0aWFsaXplZCA9IHZhbHVlOyB9XHJcblxyXG4gIGdldCBzb3J0ZWRBbHBoYSgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMubGF5ZXJMaXN0U2VydmljZS5zb3J0ZWRBbHBoYTsgfVxyXG4gIHNldCBzb3J0ZWRBbHBoYSh2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgdGhpcy5sYXllckxpc3RTZXJ2aWNlLnNvcnRlZEFscGhhID0gdmFsdWU7XHJcbiAgICB0aGlzLm5leHQoKTtcclxuICB9XHJcblxyXG4gIGdldCBzb3J0ZWRBbHBoYUluaXRpYWxpemVkKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5sYXllckxpc3RTZXJ2aWNlLnNvcnRlZEFscGhhSW5pdGlhbGl6ZWQ7IH1cclxuICBzZXQgc29ydGVkQWxwaGFJbml0aWFsaXplZCh2YWx1ZTogYm9vbGVhbikgeyB0aGlzLmxheWVyTGlzdFNlcnZpY2Uuc29ydGVkQWxwaGFJbml0aWFsaXplZCA9IHZhbHVlOyB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBsYXllckxpc3RTZXJ2aWNlOiBMYXllckxpc3RTZXJ2aWNlXHJcbiAgKSB7fVxyXG5cclxuICAvKipcclxuICAgKiBTdWJzY3JpYmUgdG8gdGhlIHNlYXJjaCB0ZXJtIHN0cmVhbSBhbmQgdHJpZ2dlciByZXNlYXJjaGVzXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICB0aGlzLmNoYW5nZSQkID0gdGhpcy5jaGFuZ2UkXHJcbiAgICAgIC5waXBlKFxyXG4gICAgICAgIGRlYm91bmNlKCgpID0+IHtcclxuICAgICAgICAgIHJldHVybiB0aGlzLmxheWVycy5sZW5ndGggPT09IDAgPyBFTVBUWSA6IHRpbWVyKDUwKTtcclxuICAgICAgICB9KVxyXG4gICAgICApLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5zaG93VG9vbGJhciQubmV4dCh0aGlzLmNvbXB1dGVTaG93VG9vbGJhcigpKTtcclxuICAgICAgICB0aGlzLmxheWVycyQubmV4dCh0aGlzLmNvbXB1dGVMYXllcnModGhpcy5sYXllcnMuc2xpY2UoMCkpKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgdGhpcy5pbml0TGF5ZXJGaWx0ZXJBbmRTb3J0T3B0aW9ucygpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLmNoYW5nZSQkLnVuc3Vic2NyaWJlKCk7XHJcbiAgfVxyXG5cclxuICB0b2dnbGVPbmx5VmlzaWJsZSgpIHtcclxuICAgIHRoaXMub25seVZpc2libGUgPSAhdGhpcy5vbmx5VmlzaWJsZTtcclxuICB9XHJcblxyXG4gIHRvZ2dsZU9ubHlJblJhbmdlKCkge1xyXG4gICAgdGhpcy5vbmx5SW5SYW5nZSA9ICF0aGlzLm9ubHlJblJhbmdlO1xyXG4gIH1cclxuXHJcbiAgdG9nZ2xlU29ydChzb3J0QWxwaGE6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMuc29ydGVkQWxwaGEgPSBzb3J0QWxwaGE7XHJcbiAgfVxyXG5cclxuICBjbGVhcktleXdvcmQoKSB7XHJcbiAgICB0aGlzLmtleXdvcmQgPSB1bmRlZmluZWQ7XHJcbiAgfVxyXG5cclxuICBnZXRMb3dlckxheWVyKCkge1xyXG4gICAgcmV0dXJuIHRoaXMubGF5ZXJzLmZpbHRlcihsID0+ICFsLmJhc2VMYXllcikucmVkdWNlKChwcmV2LCBjdXJyZW50KSA9PiB7XHJcbiAgICAgIHJldHVybiAocHJldi56SW5kZXggPCBjdXJyZW50LnpJbmRleCkgPyBwcmV2IDogY3VycmVudDtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZ2V0VXBwZXJMYXllcigpIHtcclxuICAgIHJldHVybiB0aGlzLmxheWVycy5maWx0ZXIobCA9PiAhbC5iYXNlTGF5ZXIpLnJlZHVjZSgocHJldiwgY3VycmVudCkgPT4ge1xyXG4gICAgICByZXR1cm4gKHByZXYuekluZGV4ID4gY3VycmVudC56SW5kZXgpID8gcHJldiA6IGN1cnJlbnQ7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgbmV4dCgpIHtcclxuICAgIHRoaXMuY2hhbmdlJC5uZXh0KCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNvbXB1dGVMYXllcnMobGF5ZXJzOiBMYXllcltdKTogTGF5ZXJbXSB7XHJcbiAgICBsZXQgbGF5ZXJzT3V0ID0gdGhpcy5maWx0ZXJMYXllcnMobGF5ZXJzKTtcclxuICAgIGlmICh0aGlzLnNvcnRlZEFscGhhKSB7XHJcbiAgICAgIGxheWVyc091dCA9IHRoaXMuc29ydExheWVyc0J5VGl0bGUobGF5ZXJzT3V0KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGxheWVyc091dCA9IHRoaXMuc29ydExheWVyc0J5WmluZGV4KGxheWVyc091dCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbGF5ZXJzT3V0O1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBmaWx0ZXJMYXllcnMobGF5ZXJzOiBMYXllcltdKTogTGF5ZXJbXSB7XHJcbiAgICBjb25zdCBrZXl3b3JkID0gdGhpcy5rZXl3b3JkO1xyXG4gICAgaWYgKHRoaXMubGF5ZXJGaWx0ZXJBbmRTb3J0T3B0aW9ucy5zaG93VG9vbGJhciA9PT0gTGF5ZXJMaXN0Q29udHJvbHNFbnVtLm5ldmVyKSB7XHJcbiAgICAgIHJldHVybiBsYXllcnM7XHJcbiAgICB9XHJcbiAgICBpZiAoIWtleXdvcmQgJiYgIXRoaXMub25seUluUmFuZ2UgJiYgIXRoaXMub25seVZpc2libGUpIHtcclxuICAgICAgcmV0dXJuIGxheWVycztcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBrZWVwTGF5ZXJJZHMgPSBsYXllcnMubWFwKChsYXllcjogTGF5ZXIpID0+IGxheWVyLmlkKTtcclxuXHJcbiAgICBsYXllcnMuZm9yRWFjaCgobGF5ZXI6IExheWVyKSA9PiB7XHJcbiAgICAgIGNvbnN0IGxheWVyT3B0aW9ucyA9IGxheWVyLm9wdGlvbnMgYXMgTWV0YWRhdGFMYXllck9wdGlvbnMgfHwge307XHJcbiAgICAgIGNvbnN0IGRhdGFTb3VyY2VPcHRpb25zID0gbGF5ZXIuZGF0YVNvdXJjZS5vcHRpb25zIHx8IHt9O1xyXG4gICAgICBjb25zdCBtZXRhZGF0YSA9IGxheWVyT3B0aW9ucy5tZXRhZGF0YSB8fCB7fSBhcyBNZXRhZGF0YU9wdGlvbnM7XHJcbiAgICAgIGNvbnN0IGtleXdvcmRzID0gbWV0YWRhdGEua2V5d29yZExpc3QgfHwgW10gO1xyXG4gICAgICBjb25zdCBsYXllcktleXdvcmRzID0ga2V5d29yZHMubWFwKChrdzogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGt3Lm5vcm1hbGl6ZSgnTkZEJykucmVwbGFjZSgvW1xcdTAzMDAtXFx1MDM2Zl0vZywgJycpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGlmIChrZXl3b3JkKSB7XHJcbiAgICAgICAgY29uc3QgbG9jYWxLZXl3b3JkID0ga2V5d29yZC5ub3JtYWxpemUoJ05GRCcpLnJlcGxhY2UoL1tcXHUwMzAwLVxcdTAzNmZdL2csICcnKTtcclxuICAgICAgICBjb25zdCBsYXllclRpdGxlID0gbGF5ZXIudGl0bGUubm9ybWFsaXplKCdORkQnKS5yZXBsYWNlKC9bXFx1MDMwMC1cXHUwMzZmXS9nLCAnJyk7XHJcbiAgICAgICAgY29uc3QgZGF0YVNvdXJjZVR5cGUgPSBkYXRhU291cmNlT3B0aW9ucy50eXBlIHx8ICcnO1xyXG4gICAgICAgIGNvbnN0IGtleXdvcmRSZWdleCA9IG5ldyBSZWdFeHAobG9jYWxLZXl3b3JkLCAnZ2knKTtcclxuICAgICAgICBjb25zdCBrZXl3b3JkSW5MaXN0ID0gbGF5ZXJLZXl3b3Jkcy5maW5kKChrdzogc3RyaW5nKSA9PiBrZXl3b3JkUmVnZXgudGVzdChrdykpICE9PSB1bmRlZmluZWQ7XHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAgIWtleXdvcmRSZWdleC50ZXN0KGxheWVyVGl0bGUpICYmXHJcbiAgICAgICAgICAhKGtleXdvcmQudG9Mb3dlckNhc2UoKSA9PT0gZGF0YVNvdXJjZVR5cGUudG9Mb3dlckNhc2UoKSkgJiZcclxuICAgICAgICAgICFrZXl3b3JkSW5MaXN0XHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICBjb25zdCBpbmRleCA9IGtlZXBMYXllcklkcy5pbmRleE9mKGxheWVyLmlkKTtcclxuICAgICAgICAgIGlmIChpbmRleCA+IC0xKSB7XHJcbiAgICAgICAgICAgIGtlZXBMYXllcklkcy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHRoaXMub25seVZpc2libGUgJiYgbGF5ZXIudmlzaWJsZSA9PT0gZmFsc2UpIHtcclxuICAgICAgICBjb25zdCBpbmRleCA9IGtlZXBMYXllcklkcy5pbmRleE9mKGxheWVyLmlkKTtcclxuICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xyXG4gICAgICAgICAga2VlcExheWVySWRzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAodGhpcy5vbmx5SW5SYW5nZSAmJiBsYXllci5pc0luUmVzb2x1dGlvbnNSYW5nZSA9PT0gZmFsc2UpIHtcclxuICAgICAgICBjb25zdCBpbmRleCA9IGtlZXBMYXllcklkcy5pbmRleE9mKGxheWVyLmlkKTtcclxuICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xyXG4gICAgICAgICAga2VlcExheWVySWRzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gbGF5ZXJzLmZpbHRlcigobGF5ZXI6IExheWVyKSA9PiBrZWVwTGF5ZXJJZHMuaW5kZXhPZihsYXllci5pZCkgIT09IC0xKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgc29ydExheWVyc0J5WmluZGV4KGxheWVyczogTGF5ZXJbXSkge1xyXG4gICAgcmV0dXJuIGxheWVycy5zb3J0KChsYXllcjEsIGxheWVyMikgPT4gbGF5ZXIyLnpJbmRleCAtIGxheWVyMS56SW5kZXgpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzb3J0TGF5ZXJzQnlUaXRsZShsYXllcnM6IExheWVyW10pIHtcclxuICAgIHJldHVybiBsYXllcnMuc29ydCgoYSwgYikgPT4ge1xyXG4gICAgICBpZiAoYS50aXRsZSA8IGIudGl0bGUpIHtcclxuICAgICAgICByZXR1cm4gLTE7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGEudGl0bGUgPiBiLnRpdGxlKSB7XHJcbiAgICAgICAgcmV0dXJuIDE7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIDA7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY29tcHV0ZVNob3dUb29sYmFyKCk6IGJvb2xlYW4ge1xyXG4gICAgc3dpdGNoICh0aGlzLmxheWVyRmlsdGVyQW5kU29ydE9wdGlvbnMuc2hvd1Rvb2xiYXIpIHtcclxuICAgICAgY2FzZSBMYXllckxpc3RDb250cm9sc0VudW0uYWx3YXlzOlxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICBjYXNlIExheWVyTGlzdENvbnRyb2xzRW51bS5uZXZlcjpcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgaWYgKHRoaXMubGF5ZXJzLmxlbmd0aCA+PSB0aGlzLnRocmVzaG9sZFRvRmlsdGVyQW5kU29ydCB8fFxyXG4gICAgICAgICAgdGhpcy5rZXl3b3JkIHx8XHJcbiAgICAgICAgICB0aGlzLm9ubHlJblJhbmdlIHx8XHJcbiAgICAgICAgICB0aGlzLm9ubHlWaXNpYmxlKSB7XHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpbml0TGF5ZXJGaWx0ZXJBbmRTb3J0T3B0aW9ucygpIHtcclxuICAgIGlmICh0aGlzLmxheWVyRmlsdGVyQW5kU29ydE9wdGlvbnMudG9vbGJhclRocmVzaG9sZCkge1xyXG4gICAgICB0aGlzLnRocmVzaG9sZFRvRmlsdGVyQW5kU29ydCA9IHRoaXMubGF5ZXJGaWx0ZXJBbmRTb3J0T3B0aW9ucy50b29sYmFyVGhyZXNob2xkO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLmxheWVyRmlsdGVyQW5kU29ydE9wdGlvbnMua2V5d29yZCAmJiAhdGhpcy5rZXl3b3JkSW5pdGlhbGl6ZWQpIHtcclxuICAgICAgdGhpcy5rZXl3b3JkID0gdGhpcy5sYXllckZpbHRlckFuZFNvcnRPcHRpb25zLmtleXdvcmQ7XHJcbiAgICAgIHRoaXMua2V5d29yZEluaXRpYWxpemVkID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLmxheWVyRmlsdGVyQW5kU29ydE9wdGlvbnMuc29ydGVkQWxwaGEgJiYgIXRoaXMuc29ydGVkQWxwaGFJbml0aWFsaXplZCkge1xyXG4gICAgICB0aGlzLnNvcnRlZEFscGhhID0gdGhpcy5sYXllckZpbHRlckFuZFNvcnRPcHRpb25zLnNvcnRlZEFscGhhO1xyXG4gICAgICB0aGlzLnNvcnRlZEFscGhhSW5pdGlhbGl6ZWQgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMubGF5ZXJGaWx0ZXJBbmRTb3J0T3B0aW9ucy5vbmx5VmlzaWJsZSAmJiAhdGhpcy5vbmx5VmlzaWJsZUluaXRpYWxpemVkICYmXHJcbiAgICAgIHRoaXMuaGFzTGF5ZXJOb3RWaXNpYmxlKSB7XHJcbiAgICAgIHRoaXMub25seVZpc2libGUgPSB0aGlzLmxheWVyRmlsdGVyQW5kU29ydE9wdGlvbnMub25seVZpc2libGU7XHJcbiAgICAgIHRoaXMub25seVZpc2libGVJbml0aWFsaXplZCA9IHRydWU7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5sYXllckZpbHRlckFuZFNvcnRPcHRpb25zLm9ubHlJblJhbmdlICYmICF0aGlzLm9ubHlJblJhbmdlSW5pdGlhbGl6ZWQgJiZcclxuICAgICAgdGhpcy5oYXNMYXllck91dE9mUmFuZ2UpIHtcclxuICAgICAgdGhpcy5vbmx5SW5SYW5nZSA9IHRoaXMubGF5ZXJGaWx0ZXJBbmRTb3J0T3B0aW9ucy5vbmx5SW5SYW5nZTtcclxuICAgICAgdGhpcy5vbmx5SW5SYW5nZUluaXRpYWxpemVkID0gdHJ1ZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgc2V0TGF5ZXJzKGxheWVyczogTGF5ZXJbXSkge1xyXG4gICAgdGhpcy5fbGF5ZXJzID0gbGF5ZXJzO1xyXG5cclxuICAgIGlmICh0aGlzLmV4Y2x1ZGVCYXNlTGF5ZXJzKSB7XHJcbiAgICAgIHRoaXMuaGFzTGF5ZXJOb3RWaXNpYmxlID0gbGF5ZXJzLmZpbmQobCA9PiBsLnZpc2libGUgPT09IGZhbHNlICYmICFsLmJhc2VMYXllcikgIT09IHVuZGVmaW5lZDtcclxuICAgICAgdGhpcy5oYXNMYXllck91dE9mUmFuZ2UgPSBsYXllcnMuZmluZChsID0+IGwuaXNJblJlc29sdXRpb25zUmFuZ2UgPT09IGZhbHNlICYmICFsLmJhc2VMYXllcikgIT09IHVuZGVmaW5lZDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuaGFzTGF5ZXJOb3RWaXNpYmxlID0gbGF5ZXJzLmZpbmQobCA9PiBsLnZpc2libGUgPT09IGZhbHNlKSAhPT0gdW5kZWZpbmVkO1xyXG4gICAgICB0aGlzLmhhc0xheWVyT3V0T2ZSYW5nZSA9IGxheWVycy5maW5kKGwgPT4gbC5pc0luUmVzb2x1dGlvbnNSYW5nZSA9PT0gZmFsc2UpICE9PSB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==
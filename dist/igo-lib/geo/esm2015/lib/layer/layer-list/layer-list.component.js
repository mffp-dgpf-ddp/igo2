/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ChangeDetectionStrategy, ChangeDetectorRef, TemplateRef, ContentChild } from '@angular/core';
import { LayerListControlsEnum } from './layer-list.enum';
import { LayerListService } from './layer-list.service';
import { BehaviorSubject, ReplaySubject, EMPTY, timer } from 'rxjs';
import { debounce } from 'rxjs/operators';
// TODO: This class could use a clean up. Also, some methods could be moved ealsewhere
export class LayerListComponent {
    /**
     * @param {?} cdRef
     * @param {?} layerListService
     */
    constructor(cdRef, layerListService) {
        this.cdRef = cdRef;
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
    computeOrderable() {
        if (this.onlyInRange || this.onlyVisible ||
            this.sortedAlpha || this.keyword) {
            return false;
        }
        return true;
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
        this.orderable = this.computeOrderable();
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
                template: "<igo-list [navigation]=\"false\" [selection]=\"false\">\r\n  <mat-list-item *ngIf=\"showToolbar$ | async\">\r\n    <ng-container>\r\n      <mat-form-field class=\"inputFilter\" [floatLabel]=\"floatLabel\">\r\n        <input\r\n          matInput\r\n          [placeholder]=\"placeholder\"\r\n          [matTooltip]=\"'igo.geo.layer.subsetLayersListKeyword' | translate\"\r\n          matTooltipShowDelay=\"500\"\r\n          type=\"text\" [(ngModel)]=\"keyword\">\r\n        <button\r\n          mat-button\r\n          *ngIf=\"keyword\"\r\n          matSuffix\r\n          mat-icon-button\r\n          aria-label=\"Clear\"\r\n          color=\"warn\"\r\n          (click)=\"clearKeyword()\">\r\n          <mat-icon svgIcon=\"close\"></mat-icon>\r\n        </button>\r\n      </mat-form-field>\r\n      <button\r\n        *ngIf=\"!sortedAlpha\"\r\n        mat-icon-button\r\n        [matTooltip]=\"'igo.geo.layer.sortAlphabetically' | translate\"\r\n        matTooltipShowDelay=\"500\"\r\n        (click)=\"toggleSort(true)\">\r\n        <mat-icon color=\"primary\" svgIcon=\"sort-alphabetical\"></mat-icon>\r\n      </button>\r\n      <button\r\n        *ngIf=\"sortedAlpha\"\r\n        mat-icon-button\r\n        [matTooltip]=\"'igo.geo.layer.sortMapOrder' | translate\"\r\n        matTooltipShowDelay=\"500\"\r\n        (click)=\"toggleSort(false)\">\r\n        <mat-icon color=\"warn\" svgIcon=\"alert\"></mat-icon>\r\n      </button>\r\n      <button\r\n        mat-icon-button\r\n        [disabled]=\"!hasLayerNotVisible\"\r\n        [matTooltip]=\"onlyVisible ?\r\n        ('igo.geo.layer.resetLayersList' | translate) :\r\n        ('igo.geo.layer.subsetLayersListOnlyVisible' | translate)\"\r\n        matTooltipShowDelay=\"500\"\r\n        [color]=\"onlyVisible ? 'warn' : 'primary'\"\r\n        (click)=\"toggleOnlyVisible()\">\r\n        <mat-icon [svgIcon]=\"!onlyVisible ? 'eye' : 'alert'\"></mat-icon>\r\n      </button>\r\n      <button\r\n        mat-icon-button\r\n        [disabled]=\"!hasLayerOutOfRange\"\r\n        [matTooltip]=\"onlyInRange ?\r\n        ('igo.geo.layer.resetLayersList' | translate) :\r\n        ('igo.geo.layer.subsetLayersListOnlyInRange' | translate)\"\r\n        matTooltipShowDelay=\"500\"\r\n        [color]=\"onlyInRange ? 'warn' : 'primary'\"\r\n        (click)=\"toggleOnlyInRange()\">\r\n        <mat-icon [svgIcon]=\"!onlyInRange ? 'playlist-check' : 'alert'\"></mat-icon>\r\n      </button>\r\n    </ng-container>\r\n  </mat-list-item>\r\n\r\n  <ng-template ngFor let-layer [ngForOf]=\"layers$ | async\">\r\n    <igo-layer-item *ngIf=\"!(excludeBaseLayers && layer.baseLayer)\"\r\n        igoListItem\r\n        [layer]=\"layer\"\r\n        [orderable]=\"orderable\"\r\n        [queryBadge]=\"queryBadge\"\r\n        [expandLegendIfVisible]=\"expandLegendOfVisibleLayers\"\r\n        [updateLegendOnResolutionChange]=\"updateLegendOnResolutionChange\"\r\n        [toggleLegendOnVisibilityChange]=\"toggleLegendOnVisibilityChange\">\r\n\r\n        <ng-container igoLayerItemToolbar\r\n          [ngTemplateOutlet]=\"templateLayerToolbar\"\r\n          [ngTemplateOutletContext]=\"{layer: layer}\">\r\n        </ng-container>\r\n\r\n    </igo-layer-item>\r\n  </ng-template>\r\n</igo-list>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["mat-form-field.inputFilter{width:calc(100% - 100px);max-width:200px}"]
            }] }
];
/** @nocollapse */
LayerListComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
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
    LayerListComponent.prototype.cdRef;
    /**
     * @type {?}
     * @private
     */
    LayerListComponent.prototype.layerListService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5ZXItbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvbGF5ZXIvbGF5ZXItbGlzdC9sYXllci1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixXQUFXLEVBQ1gsWUFBWSxFQUdiLE1BQU0sZUFBZSxDQUFDO0FBSXZCLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQzFELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxlQUFlLEVBQUUsYUFBYSxFQUFnQixLQUFLLEVBQUUsS0FBSyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2xGLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7QUFVMUMsTUFBTSxPQUFPLGtCQUFrQjs7Ozs7SUE2RTdCLFlBQ1UsS0FBd0IsRUFDeEIsZ0JBQWtDO1FBRGxDLFVBQUssR0FBTCxLQUFLLENBQW1CO1FBQ3hCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUE3RTVDLHVCQUFrQixHQUFHLEtBQUssQ0FBQztRQUMzQix1QkFBa0IsR0FBRyxLQUFLLENBQUM7UUFDM0IsY0FBUyxHQUFHLElBQUksQ0FBQztRQUNqQiw2QkFBd0IsR0FBRyxDQUFDLENBQUM7UUFFN0IsWUFBTyxHQUE2QixJQUFJLGVBQWUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUU1RCxZQUFPLEdBQUcsSUFBSSxhQUFhLENBQU8sQ0FBQyxDQUFDLENBQUM7UUFFckMsaUJBQVksR0FBNkIsSUFBSSxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7UUFjM0QsZ0JBQVcsR0FBVyxFQUFFLENBQUM7UUFFekIsZUFBVSxHQUFtQixNQUFNLENBQUM7UUFFcEMsOEJBQXlC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dXQsXHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgVGVtcGxhdGVSZWYsXHJcbiAgQ29udGVudENoaWxkLFxyXG4gIE9uSW5pdCxcclxuICBPbkRlc3Ryb3lcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRmxvYXRMYWJlbFR5cGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XHJcblxyXG5pbXBvcnQgeyBMYXllciB9IGZyb20gJy4uL3NoYXJlZCc7XHJcbmltcG9ydCB7IExheWVyTGlzdENvbnRyb2xzRW51bSB9IGZyb20gJy4vbGF5ZXItbGlzdC5lbnVtJztcclxuaW1wb3J0IHsgTGF5ZXJMaXN0U2VydmljZSB9IGZyb20gJy4vbGF5ZXItbGlzdC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBSZXBsYXlTdWJqZWN0LCBTdWJzY3JpcHRpb24sIEVNUFRZLCB0aW1lciB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBkZWJvdW5jZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgTWV0YWRhdGFPcHRpb25zLCBNZXRhZGF0YUxheWVyT3B0aW9ucyB9IGZyb20gJy4uLy4uL21ldGFkYXRhL3NoYXJlZC9tZXRhZGF0YS5pbnRlcmZhY2UnO1xyXG5cclxuLy8gVE9ETzogVGhpcyBjbGFzcyBjb3VsZCB1c2UgYSBjbGVhbiB1cC4gQWxzbywgc29tZSBtZXRob2RzIGNvdWxkIGJlIG1vdmVkIGVhbHNld2hlcmVcclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdpZ28tbGF5ZXItbGlzdCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2xheWVyLWxpc3QuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2xheWVyLWxpc3QuY29tcG9uZW50LnNjc3MnXSxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTGF5ZXJMaXN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG5cclxuICBoYXNMYXllck5vdFZpc2libGUgPSBmYWxzZTtcclxuICBoYXNMYXllck91dE9mUmFuZ2UgPSBmYWxzZTtcclxuICBvcmRlcmFibGUgPSB0cnVlO1xyXG4gIHRocmVzaG9sZFRvRmlsdGVyQW5kU29ydCA9IDU7XHJcblxyXG4gIGxheWVycyQ6IEJlaGF2aW9yU3ViamVjdDxMYXllcltdPiA9IG5ldyBCZWhhdmlvclN1YmplY3QoW10pO1xyXG5cclxuICBjaGFuZ2UkID0gbmV3IFJlcGxheVN1YmplY3Q8dm9pZD4oMSk7XHJcblxyXG4gIHNob3dUb29sYmFyJDogQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IEJlaGF2aW9yU3ViamVjdChmYWxzZSk7XHJcblxyXG4gIHByaXZhdGUgY2hhbmdlJCQ6IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgQENvbnRlbnRDaGlsZCgnaWdvTGF5ZXJJdGVtVG9vbGJhcicpIHRlbXBsYXRlTGF5ZXJUb29sYmFyOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG5cclxuICBASW5wdXQoKVxyXG4gIHNldCBsYXllcnModmFsdWU6IExheWVyW10pIHtcclxuICAgIHRoaXMuc2V0TGF5ZXJzKHZhbHVlKTtcclxuICAgIHRoaXMubmV4dCgpO1xyXG4gIH1cclxuICBnZXQgbGF5ZXJzKCk6IExheWVyW10geyByZXR1cm4gdGhpcy5fbGF5ZXJzOyB9XHJcbiAgcHJpdmF0ZSBfbGF5ZXJzOiBMYXllcltdO1xyXG5cclxuICBASW5wdXQoKSBwbGFjZWhvbGRlcjogc3RyaW5nID0gJyc7XHJcblxyXG4gIEBJbnB1dCgpIGZsb2F0TGFiZWw6IEZsb2F0TGFiZWxUeXBlID0gJ2F1dG8nO1xyXG5cclxuICBASW5wdXQoKSBsYXllckZpbHRlckFuZFNvcnRPcHRpb25zOiBhbnkgPSB7fTtcclxuXHJcbiAgQElucHV0KCkgZXhjbHVkZUJhc2VMYXllcnM6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgQElucHV0KCkgdG9nZ2xlTGVnZW5kT25WaXNpYmlsaXR5Q2hhbmdlOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIEBJbnB1dCgpIGV4cGFuZExlZ2VuZE9mVmlzaWJsZUxheWVyczogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICBASW5wdXQoKSB1cGRhdGVMZWdlbmRPblJlc29sdXRpb25DaGFuZ2U6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgQElucHV0KCkgcXVlcnlCYWRnZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICBnZXQga2V5d29yZCgpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5sYXllckxpc3RTZXJ2aWNlLmtleXdvcmQ7IH1cclxuICBzZXQga2V5d29yZCh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICB0aGlzLmxheWVyTGlzdFNlcnZpY2Uua2V5d29yZCA9IHZhbHVlO1xyXG4gICAgdGhpcy5uZXh0KCk7XHJcbiAgfVxyXG5cclxuICBnZXQga2V5d29yZEluaXRpYWxpemVkKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5sYXllckxpc3RTZXJ2aWNlLmtleXdvcmRJbml0aWFsaXplZDsgfVxyXG4gIHNldCBrZXl3b3JkSW5pdGlhbGl6ZWQodmFsdWU6IGJvb2xlYW4pIHsgdGhpcy5sYXllckxpc3RTZXJ2aWNlLmtleXdvcmRJbml0aWFsaXplZCA9IHZhbHVlOyB9XHJcblxyXG4gIGdldCBvbmx5VmlzaWJsZSgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMubGF5ZXJMaXN0U2VydmljZS5vbmx5VmlzaWJsZTsgfVxyXG4gIHNldCBvbmx5VmlzaWJsZSh2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgdGhpcy5sYXllckxpc3RTZXJ2aWNlLm9ubHlWaXNpYmxlID0gdmFsdWU7XHJcbiAgICB0aGlzLm5leHQoKTtcclxuICB9XHJcblxyXG4gIGdldCBvbmx5VmlzaWJsZUluaXRpYWxpemVkKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5sYXllckxpc3RTZXJ2aWNlLm9ubHlWaXNpYmxlSW5pdGlhbGl6ZWQ7IH1cclxuICBzZXQgb25seVZpc2libGVJbml0aWFsaXplZCh2YWx1ZTogYm9vbGVhbikgeyB0aGlzLmxheWVyTGlzdFNlcnZpY2Uub25seVZpc2libGVJbml0aWFsaXplZCA9IHZhbHVlOyB9XHJcblxyXG4gIGdldCBvbmx5SW5SYW5nZSgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMubGF5ZXJMaXN0U2VydmljZS5vbmx5SW5SYW5nZTsgfVxyXG4gIHNldCBvbmx5SW5SYW5nZSh2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgdGhpcy5sYXllckxpc3RTZXJ2aWNlLm9ubHlJblJhbmdlID0gdmFsdWU7XHJcbiAgICB0aGlzLm5leHQoKTtcclxuICB9XHJcblxyXG4gIGdldCBvbmx5SW5SYW5nZUluaXRpYWxpemVkKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5sYXllckxpc3RTZXJ2aWNlLm9ubHlJblJhbmdlSW5pdGlhbGl6ZWQ7IH1cclxuICBzZXQgb25seUluUmFuZ2VJbml0aWFsaXplZCh2YWx1ZTogYm9vbGVhbikgeyB0aGlzLmxheWVyTGlzdFNlcnZpY2Uub25seUluUmFuZ2VJbml0aWFsaXplZCA9IHZhbHVlOyB9XHJcblxyXG4gIGdldCBzb3J0ZWRBbHBoYSgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMubGF5ZXJMaXN0U2VydmljZS5zb3J0ZWRBbHBoYTsgfVxyXG4gIHNldCBzb3J0ZWRBbHBoYSh2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgdGhpcy5sYXllckxpc3RTZXJ2aWNlLnNvcnRlZEFscGhhID0gdmFsdWU7XHJcbiAgICB0aGlzLm5leHQoKTtcclxuICB9XHJcblxyXG4gIGdldCBzb3J0ZWRBbHBoYUluaXRpYWxpemVkKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5sYXllckxpc3RTZXJ2aWNlLnNvcnRlZEFscGhhSW5pdGlhbGl6ZWQ7IH1cclxuICBzZXQgc29ydGVkQWxwaGFJbml0aWFsaXplZCh2YWx1ZTogYm9vbGVhbikgeyB0aGlzLmxheWVyTGlzdFNlcnZpY2Uuc29ydGVkQWxwaGFJbml0aWFsaXplZCA9IHZhbHVlOyB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBjZFJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgICBwcml2YXRlIGxheWVyTGlzdFNlcnZpY2U6IExheWVyTGlzdFNlcnZpY2VcclxuICApIHt9XHJcblxyXG4gIC8qKlxyXG4gICAqIFN1YnNjcmliZSB0byB0aGUgc2VhcmNoIHRlcm0gc3RyZWFtIGFuZCB0cmlnZ2VyIHJlc2VhcmNoZXNcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgIHRoaXMuY2hhbmdlJCQgPSB0aGlzLmNoYW5nZSRcclxuICAgICAgLnBpcGUoXHJcbiAgICAgICAgZGVib3VuY2UoKCkgPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIHRoaXMubGF5ZXJzLmxlbmd0aCA9PT0gMCA/IEVNUFRZIDogdGltZXIoNTApO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICkuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICB0aGlzLnNob3dUb29sYmFyJC5uZXh0KHRoaXMuY29tcHV0ZVNob3dUb29sYmFyKCkpO1xyXG4gICAgICAgIHRoaXMubGF5ZXJzJC5uZXh0KHRoaXMuY29tcHV0ZUxheWVycyh0aGlzLmxheWVycy5zbGljZSgwKSkpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICB0aGlzLmluaXRMYXllckZpbHRlckFuZFNvcnRPcHRpb25zKCk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMuY2hhbmdlJCQudW5zdWJzY3JpYmUoKTtcclxuICB9XHJcblxyXG4gIHRvZ2dsZU9ubHlWaXNpYmxlKCkge1xyXG4gICAgdGhpcy5vbmx5VmlzaWJsZSA9ICF0aGlzLm9ubHlWaXNpYmxlO1xyXG4gIH1cclxuXHJcbiAgdG9nZ2xlT25seUluUmFuZ2UoKSB7XHJcbiAgICB0aGlzLm9ubHlJblJhbmdlID0gIXRoaXMub25seUluUmFuZ2U7XHJcbiAgfVxyXG5cclxuICB0b2dnbGVTb3J0KHNvcnRBbHBoYTogYm9vbGVhbikge1xyXG4gICAgdGhpcy5zb3J0ZWRBbHBoYSA9IHNvcnRBbHBoYTtcclxuICB9XHJcblxyXG4gIGNsZWFyS2V5d29yZCgpIHtcclxuICAgIHRoaXMua2V5d29yZCA9IHVuZGVmaW5lZDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgbmV4dCgpIHtcclxuICAgIHRoaXMuY2hhbmdlJC5uZXh0KCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNvbXB1dGVMYXllcnMobGF5ZXJzOiBMYXllcltdKTogTGF5ZXJbXSB7XHJcbiAgICBsZXQgbGF5ZXJzT3V0ID0gdGhpcy5maWx0ZXJMYXllcnMobGF5ZXJzKTtcclxuICAgIGlmICh0aGlzLnNvcnRlZEFscGhhKSB7XHJcbiAgICAgIGxheWVyc091dCA9IHRoaXMuc29ydExheWVyc0J5VGl0bGUobGF5ZXJzT3V0KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGxheWVyc091dCA9IHRoaXMuc29ydExheWVyc0J5WmluZGV4KGxheWVyc091dCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbGF5ZXJzT3V0O1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBmaWx0ZXJMYXllcnMobGF5ZXJzOiBMYXllcltdKTogTGF5ZXJbXSB7XHJcbiAgICBjb25zdCBrZXl3b3JkID0gdGhpcy5rZXl3b3JkO1xyXG4gICAgaWYgKHRoaXMubGF5ZXJGaWx0ZXJBbmRTb3J0T3B0aW9ucy5zaG93VG9vbGJhciA9PT0gTGF5ZXJMaXN0Q29udHJvbHNFbnVtLm5ldmVyKSB7XHJcbiAgICAgIHJldHVybiBsYXllcnM7XHJcbiAgICB9XHJcbiAgICBpZiAoIWtleXdvcmQgJiYgIXRoaXMub25seUluUmFuZ2UgJiYgIXRoaXMub25seVZpc2libGUpIHtcclxuICAgICAgcmV0dXJuIGxheWVycztcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBrZWVwTGF5ZXJJZHMgPSBsYXllcnMubWFwKChsYXllcjogTGF5ZXIpID0+IGxheWVyLmlkKTtcclxuXHJcbiAgICBsYXllcnMuZm9yRWFjaCgobGF5ZXI6IExheWVyKSA9PiB7XHJcbiAgICAgIGNvbnN0IGxheWVyT3B0aW9ucyA9IGxheWVyLm9wdGlvbnMgYXMgTWV0YWRhdGFMYXllck9wdGlvbnMgfHwge307XHJcbiAgICAgIGNvbnN0IGRhdGFTb3VyY2VPcHRpb25zID0gbGF5ZXIuZGF0YVNvdXJjZS5vcHRpb25zIHx8IHt9O1xyXG4gICAgICBjb25zdCBtZXRhZGF0YSA9IGxheWVyT3B0aW9ucy5tZXRhZGF0YSB8fCB7fSBhcyBNZXRhZGF0YU9wdGlvbnM7XHJcbiAgICAgIGNvbnN0IGtleXdvcmRzID0gbWV0YWRhdGEua2V5d29yZExpc3QgfHwgW10gO1xyXG4gICAgICBjb25zdCBsYXllcktleXdvcmRzID0ga2V5d29yZHMubWFwKChrdzogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGt3Lm5vcm1hbGl6ZSgnTkZEJykucmVwbGFjZSgvW1xcdTAzMDAtXFx1MDM2Zl0vZywgJycpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGlmIChrZXl3b3JkKSB7XHJcbiAgICAgICAgY29uc3QgbG9jYWxLZXl3b3JkID0ga2V5d29yZC5ub3JtYWxpemUoJ05GRCcpLnJlcGxhY2UoL1tcXHUwMzAwLVxcdTAzNmZdL2csICcnKTtcclxuICAgICAgICBjb25zdCBsYXllclRpdGxlID0gbGF5ZXIudGl0bGUubm9ybWFsaXplKCdORkQnKS5yZXBsYWNlKC9bXFx1MDMwMC1cXHUwMzZmXS9nLCAnJyk7XHJcbiAgICAgICAgY29uc3QgZGF0YVNvdXJjZVR5cGUgPSBkYXRhU291cmNlT3B0aW9ucy50eXBlIHx8ICcnO1xyXG4gICAgICAgIGNvbnN0IGtleXdvcmRSZWdleCA9IG5ldyBSZWdFeHAobG9jYWxLZXl3b3JkLCAnZ2knKTtcclxuICAgICAgICBjb25zdCBrZXl3b3JkSW5MaXN0ID0gbGF5ZXJLZXl3b3Jkcy5maW5kKChrdzogc3RyaW5nKSA9PiBrZXl3b3JkUmVnZXgudGVzdChrdykpICE9PSB1bmRlZmluZWQ7XHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAgIWtleXdvcmRSZWdleC50ZXN0KGxheWVyVGl0bGUpICYmXHJcbiAgICAgICAgICAhKGtleXdvcmQudG9Mb3dlckNhc2UoKSA9PT0gZGF0YVNvdXJjZVR5cGUudG9Mb3dlckNhc2UoKSkgJiZcclxuICAgICAgICAgICFrZXl3b3JkSW5MaXN0XHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICBjb25zdCBpbmRleCA9IGtlZXBMYXllcklkcy5pbmRleE9mKGxheWVyLmlkKTtcclxuICAgICAgICAgIGlmIChpbmRleCA+IC0xKSB7XHJcbiAgICAgICAgICAgIGtlZXBMYXllcklkcy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHRoaXMub25seVZpc2libGUgJiYgbGF5ZXIudmlzaWJsZSA9PT0gZmFsc2UpIHtcclxuICAgICAgICBjb25zdCBpbmRleCA9IGtlZXBMYXllcklkcy5pbmRleE9mKGxheWVyLmlkKTtcclxuICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xyXG4gICAgICAgICAga2VlcExheWVySWRzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAodGhpcy5vbmx5SW5SYW5nZSAmJiBsYXllci5pc0luUmVzb2x1dGlvbnNSYW5nZSA9PT0gZmFsc2UpIHtcclxuICAgICAgICBjb25zdCBpbmRleCA9IGtlZXBMYXllcklkcy5pbmRleE9mKGxheWVyLmlkKTtcclxuICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xyXG4gICAgICAgICAga2VlcExheWVySWRzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gbGF5ZXJzLmZpbHRlcigobGF5ZXI6IExheWVyKSA9PiBrZWVwTGF5ZXJJZHMuaW5kZXhPZihsYXllci5pZCkgIT09IC0xKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgc29ydExheWVyc0J5WmluZGV4KGxheWVyczogTGF5ZXJbXSkge1xyXG4gICAgcmV0dXJuIGxheWVycy5zb3J0KChsYXllcjEsIGxheWVyMikgPT4gbGF5ZXIyLnpJbmRleCAtIGxheWVyMS56SW5kZXgpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzb3J0TGF5ZXJzQnlUaXRsZShsYXllcnM6IExheWVyW10pIHtcclxuICAgIHJldHVybiBsYXllcnMuc29ydCgoYSwgYikgPT4ge1xyXG4gICAgICBpZiAoYS50aXRsZSA8IGIudGl0bGUpIHtcclxuICAgICAgICByZXR1cm4gLTE7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGEudGl0bGUgPiBiLnRpdGxlKSB7XHJcbiAgICAgICAgcmV0dXJuIDE7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIDA7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY29tcHV0ZU9yZGVyYWJsZSgpOiBib29sZWFuIHtcclxuICAgIGlmICh0aGlzLm9ubHlJblJhbmdlIHx8IHRoaXMub25seVZpc2libGUgfHxcclxuICAgICAgdGhpcy5zb3J0ZWRBbHBoYSB8fCB0aGlzLmtleXdvcmQpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNvbXB1dGVTaG93VG9vbGJhcigpOiBib29sZWFuIHtcclxuICAgIHN3aXRjaCAodGhpcy5sYXllckZpbHRlckFuZFNvcnRPcHRpb25zLnNob3dUb29sYmFyKSB7XHJcbiAgICAgIGNhc2UgTGF5ZXJMaXN0Q29udHJvbHNFbnVtLmFsd2F5czpcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgY2FzZSBMYXllckxpc3RDb250cm9sc0VudW0ubmV2ZXI6XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIGlmICh0aGlzLmxheWVycy5sZW5ndGggPj0gdGhpcy50aHJlc2hvbGRUb0ZpbHRlckFuZFNvcnQgfHxcclxuICAgICAgICAgIHRoaXMua2V5d29yZCB8fFxyXG4gICAgICAgICAgdGhpcy5vbmx5SW5SYW5nZSB8fFxyXG4gICAgICAgICAgdGhpcy5vbmx5VmlzaWJsZSkge1xyXG4gICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgaW5pdExheWVyRmlsdGVyQW5kU29ydE9wdGlvbnMoKSB7XHJcbiAgICBpZiAodGhpcy5sYXllckZpbHRlckFuZFNvcnRPcHRpb25zLnRvb2xiYXJUaHJlc2hvbGQpIHtcclxuICAgICAgdGhpcy50aHJlc2hvbGRUb0ZpbHRlckFuZFNvcnQgPSB0aGlzLmxheWVyRmlsdGVyQW5kU29ydE9wdGlvbnMudG9vbGJhclRocmVzaG9sZDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5sYXllckZpbHRlckFuZFNvcnRPcHRpb25zLmtleXdvcmQgJiYgIXRoaXMua2V5d29yZEluaXRpYWxpemVkKSB7XHJcbiAgICAgIHRoaXMua2V5d29yZCA9IHRoaXMubGF5ZXJGaWx0ZXJBbmRTb3J0T3B0aW9ucy5rZXl3b3JkO1xyXG4gICAgICB0aGlzLmtleXdvcmRJbml0aWFsaXplZCA9IHRydWU7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5sYXllckZpbHRlckFuZFNvcnRPcHRpb25zLnNvcnRlZEFscGhhICYmICF0aGlzLnNvcnRlZEFscGhhSW5pdGlhbGl6ZWQpIHtcclxuICAgICAgdGhpcy5zb3J0ZWRBbHBoYSA9IHRoaXMubGF5ZXJGaWx0ZXJBbmRTb3J0T3B0aW9ucy5zb3J0ZWRBbHBoYTtcclxuICAgICAgdGhpcy5zb3J0ZWRBbHBoYUluaXRpYWxpemVkID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLmxheWVyRmlsdGVyQW5kU29ydE9wdGlvbnMub25seVZpc2libGUgJiYgIXRoaXMub25seVZpc2libGVJbml0aWFsaXplZCAmJlxyXG4gICAgICB0aGlzLmhhc0xheWVyTm90VmlzaWJsZSkge1xyXG4gICAgICB0aGlzLm9ubHlWaXNpYmxlID0gdGhpcy5sYXllckZpbHRlckFuZFNvcnRPcHRpb25zLm9ubHlWaXNpYmxlO1xyXG4gICAgICB0aGlzLm9ubHlWaXNpYmxlSW5pdGlhbGl6ZWQgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMubGF5ZXJGaWx0ZXJBbmRTb3J0T3B0aW9ucy5vbmx5SW5SYW5nZSAmJiAhdGhpcy5vbmx5SW5SYW5nZUluaXRpYWxpemVkICYmXHJcbiAgICAgIHRoaXMuaGFzTGF5ZXJPdXRPZlJhbmdlKSB7XHJcbiAgICAgIHRoaXMub25seUluUmFuZ2UgPSB0aGlzLmxheWVyRmlsdGVyQW5kU29ydE9wdGlvbnMub25seUluUmFuZ2U7XHJcbiAgICAgIHRoaXMub25seUluUmFuZ2VJbml0aWFsaXplZCA9IHRydWU7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHNldExheWVycyhsYXllcnM6IExheWVyW10pIHtcclxuICAgIHRoaXMuX2xheWVycyA9IGxheWVycztcclxuXHJcbiAgICB0aGlzLm9yZGVyYWJsZSA9IHRoaXMuY29tcHV0ZU9yZGVyYWJsZSgpO1xyXG5cclxuICAgIGlmICh0aGlzLmV4Y2x1ZGVCYXNlTGF5ZXJzKSB7XHJcbiAgICAgIHRoaXMuaGFzTGF5ZXJOb3RWaXNpYmxlID0gbGF5ZXJzLmZpbmQobCA9PiBsLnZpc2libGUgPT09IGZhbHNlICYmICFsLmJhc2VMYXllcikgIT09IHVuZGVmaW5lZDtcclxuICAgICAgdGhpcy5oYXNMYXllck91dE9mUmFuZ2UgPSBsYXllcnMuZmluZChsID0+IGwuaXNJblJlc29sdXRpb25zUmFuZ2UgPT09IGZhbHNlICYmICFsLmJhc2VMYXllcikgIT09IHVuZGVmaW5lZDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuaGFzTGF5ZXJOb3RWaXNpYmxlID0gbGF5ZXJzLmZpbmQobCA9PiBsLnZpc2libGUgPT09IGZhbHNlKSAhPT0gdW5kZWZpbmVkO1xyXG4gICAgICB0aGlzLmhhc0xheWVyT3V0T2ZSYW5nZSA9IGxheWVycy5maW5kKGwgPT4gbC5pc0luUmVzb2x1dGlvbnNSYW5nZSA9PT0gZmFsc2UpICE9PSB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==
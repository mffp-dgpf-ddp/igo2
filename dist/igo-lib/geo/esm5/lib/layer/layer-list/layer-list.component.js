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
var LayerListComponent = /** @class */ (function () {
    function LayerListComponent(cdRef, layerListService) {
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
    Object.defineProperty(LayerListComponent.prototype, "layers", {
        get: /**
         * @return {?}
         */
        function () { return this._layers; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.setLayers(value);
            this.next();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayerListComponent.prototype, "keyword", {
        get: /**
         * @return {?}
         */
        function () { return this.layerListService.keyword; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.layerListService.keyword = value;
            this.next();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayerListComponent.prototype, "keywordInitialized", {
        get: /**
         * @return {?}
         */
        function () { return this.layerListService.keywordInitialized; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this.layerListService.keywordInitialized = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayerListComponent.prototype, "onlyVisible", {
        get: /**
         * @return {?}
         */
        function () { return this.layerListService.onlyVisible; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.layerListService.onlyVisible = value;
            this.next();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayerListComponent.prototype, "onlyVisibleInitialized", {
        get: /**
         * @return {?}
         */
        function () { return this.layerListService.onlyVisibleInitialized; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this.layerListService.onlyVisibleInitialized = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayerListComponent.prototype, "onlyInRange", {
        get: /**
         * @return {?}
         */
        function () { return this.layerListService.onlyInRange; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.layerListService.onlyInRange = value;
            this.next();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayerListComponent.prototype, "onlyInRangeInitialized", {
        get: /**
         * @return {?}
         */
        function () { return this.layerListService.onlyInRangeInitialized; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this.layerListService.onlyInRangeInitialized = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayerListComponent.prototype, "sortedAlpha", {
        get: /**
         * @return {?}
         */
        function () { return this.layerListService.sortedAlpha; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.layerListService.sortedAlpha = value;
            this.next();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayerListComponent.prototype, "sortedAlphaInitialized", {
        get: /**
         * @return {?}
         */
        function () { return this.layerListService.sortedAlphaInitialized; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this.layerListService.sortedAlphaInitialized = value; },
        enumerable: true,
        configurable: true
    });
    /**
     * Subscribe to the search term stream and trigger researches
     * @internal
     */
    /**
     * Subscribe to the search term stream and trigger researches
     * \@internal
     * @return {?}
     */
    LayerListComponent.prototype.ngOnInit = /**
     * Subscribe to the search term stream and trigger researches
     * \@internal
     * @return {?}
     */
    function () {
        var _this = this;
        this.change$$ = this.change$
            .pipe(debounce((/**
         * @return {?}
         */
        function () {
            return _this.layers.length === 0 ? EMPTY : timer(50);
        }))).subscribe((/**
         * @return {?}
         */
        function () {
            _this.showToolbar$.next(_this.computeShowToolbar());
            _this.layers$.next(_this.computeLayers(_this.layers.slice(0)));
        }));
        this.initLayerFilterAndSortOptions();
    };
    /**
     * @return {?}
     */
    LayerListComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.change$$.unsubscribe();
    };
    /**
     * @return {?}
     */
    LayerListComponent.prototype.toggleOnlyVisible = /**
     * @return {?}
     */
    function () {
        this.onlyVisible = !this.onlyVisible;
    };
    /**
     * @return {?}
     */
    LayerListComponent.prototype.toggleOnlyInRange = /**
     * @return {?}
     */
    function () {
        this.onlyInRange = !this.onlyInRange;
    };
    /**
     * @param {?} sortAlpha
     * @return {?}
     */
    LayerListComponent.prototype.toggleSort = /**
     * @param {?} sortAlpha
     * @return {?}
     */
    function (sortAlpha) {
        this.sortedAlpha = sortAlpha;
    };
    /**
     * @return {?}
     */
    LayerListComponent.prototype.clearKeyword = /**
     * @return {?}
     */
    function () {
        this.keyword = undefined;
    };
    /**
     * @private
     * @return {?}
     */
    LayerListComponent.prototype.next = /**
     * @private
     * @return {?}
     */
    function () {
        this.change$.next();
    };
    /**
     * @private
     * @param {?} layers
     * @return {?}
     */
    LayerListComponent.prototype.computeLayers = /**
     * @private
     * @param {?} layers
     * @return {?}
     */
    function (layers) {
        /** @type {?} */
        var layersOut = this.filterLayers(layers);
        if (this.sortedAlpha) {
            layersOut = this.sortLayersByTitle(layersOut);
        }
        else {
            layersOut = this.sortLayersByZindex(layersOut);
        }
        return layersOut;
    };
    /**
     * @private
     * @param {?} layers
     * @return {?}
     */
    LayerListComponent.prototype.filterLayers = /**
     * @private
     * @param {?} layers
     * @return {?}
     */
    function (layers) {
        var _this = this;
        /** @type {?} */
        var keyword = this.keyword;
        if (this.layerFilterAndSortOptions.showToolbar === LayerListControlsEnum.never) {
            return layers;
        }
        if (!keyword && !this.onlyInRange && !this.onlyVisible) {
            return layers;
        }
        /** @type {?} */
        var keepLayerIds = layers.map((/**
         * @param {?} layer
         * @return {?}
         */
        function (layer) { return layer.id; }));
        layers.forEach((/**
         * @param {?} layer
         * @return {?}
         */
        function (layer) {
            /** @type {?} */
            var layerOptions = (/** @type {?} */ (layer.options)) || {};
            /** @type {?} */
            var dataSourceOptions = layer.dataSource.options || {};
            /** @type {?} */
            var metadata = layerOptions.metadata || (/** @type {?} */ ({}));
            /** @type {?} */
            var keywords = metadata.keywordList || [];
            /** @type {?} */
            var layerKeywords = keywords.map((/**
             * @param {?} kw
             * @return {?}
             */
            function (kw) {
                return kw.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
            }));
            if (keyword) {
                /** @type {?} */
                var localKeyword = keyword.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
                /** @type {?} */
                var layerTitle = layer.title.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
                /** @type {?} */
                var dataSourceType = dataSourceOptions.type || '';
                /** @type {?} */
                var keywordRegex_1 = new RegExp(localKeyword, 'gi');
                /** @type {?} */
                var keywordInList = layerKeywords.find((/**
                 * @param {?} kw
                 * @return {?}
                 */
                function (kw) { return keywordRegex_1.test(kw); })) !== undefined;
                if (!keywordRegex_1.test(layerTitle) &&
                    !(keyword.toLowerCase() === dataSourceType.toLowerCase()) &&
                    !keywordInList) {
                    /** @type {?} */
                    var index = keepLayerIds.indexOf(layer.id);
                    if (index > -1) {
                        keepLayerIds.splice(index, 1);
                    }
                }
            }
            if (_this.onlyVisible && layer.visible === false) {
                /** @type {?} */
                var index = keepLayerIds.indexOf(layer.id);
                if (index > -1) {
                    keepLayerIds.splice(index, 1);
                }
            }
            if (_this.onlyInRange && layer.isInResolutionsRange === false) {
                /** @type {?} */
                var index = keepLayerIds.indexOf(layer.id);
                if (index > -1) {
                    keepLayerIds.splice(index, 1);
                }
            }
        }));
        return layers.filter((/**
         * @param {?} layer
         * @return {?}
         */
        function (layer) { return keepLayerIds.indexOf(layer.id) !== -1; }));
    };
    /**
     * @private
     * @param {?} layers
     * @return {?}
     */
    LayerListComponent.prototype.sortLayersByZindex = /**
     * @private
     * @param {?} layers
     * @return {?}
     */
    function (layers) {
        return layers.sort((/**
         * @param {?} layer1
         * @param {?} layer2
         * @return {?}
         */
        function (layer1, layer2) { return layer2.zIndex - layer1.zIndex; }));
    };
    /**
     * @private
     * @param {?} layers
     * @return {?}
     */
    LayerListComponent.prototype.sortLayersByTitle = /**
     * @private
     * @param {?} layers
     * @return {?}
     */
    function (layers) {
        return layers.sort((/**
         * @param {?} a
         * @param {?} b
         * @return {?}
         */
        function (a, b) {
            if (a.title < b.title) {
                return -1;
            }
            if (a.title > b.title) {
                return 1;
            }
            return 0;
        }));
    };
    /**
     * @private
     * @return {?}
     */
    LayerListComponent.prototype.computeOrderable = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.onlyInRange || this.onlyVisible ||
            this.sortedAlpha || this.keyword) {
            return false;
        }
        return true;
    };
    /**
     * @private
     * @return {?}
     */
    LayerListComponent.prototype.computeShowToolbar = /**
     * @private
     * @return {?}
     */
    function () {
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
    };
    /**
     * @private
     * @return {?}
     */
    LayerListComponent.prototype.initLayerFilterAndSortOptions = /**
     * @private
     * @return {?}
     */
    function () {
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
    };
    /**
     * @private
     * @param {?} layers
     * @return {?}
     */
    LayerListComponent.prototype.setLayers = /**
     * @private
     * @param {?} layers
     * @return {?}
     */
    function (layers) {
        this._layers = layers;
        this.orderable = this.computeOrderable();
        if (this.excludeBaseLayers) {
            this.hasLayerNotVisible = layers.find((/**
             * @param {?} l
             * @return {?}
             */
            function (l) { return l.visible === false && !l.baseLayer; })) !== undefined;
            this.hasLayerOutOfRange = layers.find((/**
             * @param {?} l
             * @return {?}
             */
            function (l) { return l.isInResolutionsRange === false && !l.baseLayer; })) !== undefined;
        }
        else {
            this.hasLayerNotVisible = layers.find((/**
             * @param {?} l
             * @return {?}
             */
            function (l) { return l.visible === false; })) !== undefined;
            this.hasLayerOutOfRange = layers.find((/**
             * @param {?} l
             * @return {?}
             */
            function (l) { return l.isInResolutionsRange === false; })) !== undefined;
        }
    };
    LayerListComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-layer-list',
                    template: "<igo-list [navigation]=\"false\" [selection]=\"false\">\r\n  <mat-list-item *ngIf=\"showToolbar$ | async\">\r\n    <ng-container>\r\n      <mat-form-field class=\"inputFilter\" [floatLabel]=\"floatLabel\">\r\n        <input\r\n          matInput\r\n          [placeholder]=\"placeholder\"\r\n          [matTooltip]=\"'igo.geo.layer.subsetLayersListKeyword' | translate\"\r\n          matTooltipShowDelay=\"500\"\r\n          type=\"text\" [(ngModel)]=\"keyword\">\r\n        <button\r\n          mat-button\r\n          *ngIf=\"keyword\"\r\n          matSuffix\r\n          mat-icon-button\r\n          aria-label=\"Clear\"\r\n          color=\"warn\"\r\n          (click)=\"clearKeyword()\">\r\n          <mat-icon svgIcon=\"close\"></mat-icon>\r\n        </button>\r\n      </mat-form-field>\r\n      <button\r\n        *ngIf=\"!sortedAlpha\"\r\n        mat-icon-button\r\n        [matTooltip]=\"'igo.geo.layer.sortAlphabetically' | translate\"\r\n        matTooltipShowDelay=\"500\"\r\n        (click)=\"toggleSort(true)\">\r\n        <mat-icon color=\"primary\" svgIcon=\"sort-alphabetical\"></mat-icon>\r\n      </button>\r\n      <button\r\n        *ngIf=\"sortedAlpha\"\r\n        mat-icon-button\r\n        [matTooltip]=\"'igo.geo.layer.sortMapOrder' | translate\"\r\n        matTooltipShowDelay=\"500\"\r\n        (click)=\"toggleSort(false)\">\r\n        <mat-icon color=\"warn\" svgIcon=\"alert\"></mat-icon>\r\n      </button>\r\n      <button\r\n        mat-icon-button\r\n        [disabled]=\"!hasLayerNotVisible\"\r\n        [matTooltip]=\"onlyVisible ?\r\n        ('igo.geo.layer.resetLayersList' | translate) :\r\n        ('igo.geo.layer.subsetLayersListOnlyVisible' | translate)\"\r\n        matTooltipShowDelay=\"500\"\r\n        [color]=\"onlyVisible ? 'warn' : 'primary'\"\r\n        (click)=\"toggleOnlyVisible()\">\r\n        <mat-icon [svgIcon]=\"!onlyVisible ? 'eye' : 'alert'\"></mat-icon>\r\n      </button>\r\n      <button\r\n        mat-icon-button\r\n        [disabled]=\"!hasLayerOutOfRange\"\r\n        [matTooltip]=\"onlyInRange ?\r\n        ('igo.geo.layer.resetLayersList' | translate) :\r\n        ('igo.geo.layer.subsetLayersListOnlyInRange' | translate)\"\r\n        matTooltipShowDelay=\"500\"\r\n        [color]=\"onlyInRange ? 'warn' : 'primary'\"\r\n        (click)=\"toggleOnlyInRange()\">\r\n        <mat-icon [svgIcon]=\"!onlyInRange ? 'playlist-check' : 'alert'\"></mat-icon>\r\n      </button>\r\n    </ng-container>\r\n  </mat-list-item>\r\n\r\n  <ng-template ngFor let-layer [ngForOf]=\"layers$ | async\">\r\n    <igo-layer-item *ngIf=\"!(excludeBaseLayers && layer.baseLayer)\"\r\n        igoListItem\r\n        [layer]=\"layer\"\r\n        [orderable]=\"orderable\"\r\n        [queryBadge]=\"queryBadge\"\r\n        [expandLegendIfVisible]=\"expandLegendOfVisibleLayers\"\r\n        [updateLegendOnResolutionChange]=\"updateLegendOnResolutionChange\"\r\n        [toggleLegendOnVisibilityChange]=\"toggleLegendOnVisibilityChange\">\r\n\r\n        <ng-container igoLayerItemToolbar\r\n          [ngTemplateOutlet]=\"templateLayerToolbar\"\r\n          [ngTemplateOutletContext]=\"{layer: layer}\">\r\n        </ng-container>\r\n\r\n    </igo-layer-item>\r\n  </ng-template>\r\n</igo-list>\r\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: ["mat-form-field.inputFilter{width:calc(100% - 100px);max-width:200px}"]
                }] }
    ];
    /** @nocollapse */
    LayerListComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: LayerListService }
    ]; };
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
    return LayerListComponent;
}());
export { LayerListComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5ZXItbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvbGF5ZXIvbGF5ZXItbGlzdC9sYXllci1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixXQUFXLEVBQ1gsWUFBWSxFQUdiLE1BQU0sZUFBZSxDQUFDO0FBSXZCLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQzFELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxlQUFlLEVBQUUsYUFBYSxFQUFnQixLQUFLLEVBQUUsS0FBSyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2xGLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7QUFJMUM7SUFtRkUsNEJBQ1UsS0FBd0IsRUFDeEIsZ0JBQWtDO1FBRGxDLFVBQUssR0FBTCxLQUFLLENBQW1CO1FBQ3hCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUE3RTVDLHVCQUFrQixHQUFHLEtBQUssQ0FBQztRQUMzQix1QkFBa0IsR0FBRyxLQUFLLENBQUM7UUFDM0IsY0FBUyxHQUFHLElBQUksQ0FBQztRQUNqQiw2QkFBd0IsR0FBRyxDQUFDLENBQUM7UUFFN0IsWUFBTyxHQUE2QixJQUFJLGVBQWUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUU1RCxZQUFPLEdBQUcsSUFBSSxhQUFhLENBQU8sQ0FBQyxDQUFDLENBQUM7UUFFckMsaUJBQVksR0FBNkIsSUFBSSxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7UUFjM0QsZ0JBQVcsR0FBVyxFQUFFLENBQUM7UUFFekIsZUFBVSxHQUFtQixNQUFNLENBQUM7UUFFcEMsOEJBQXlCLEdBQVEsRUFBRSxDQUFDO1FBRXBD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RDs7SUFFNUQscUNBQXFDOztJQUVyQywwQ0FBb0U7Ozs7O0lBRXBFLHNDQUErQjs7SUFFL0Isa0RBQTRFOzs7OztJQVE1RSxxQ0FBeUI7O0lBRXpCLHlDQUFrQzs7SUFFbEMsd0NBQTZDOztJQUU3Qyx1REFBNkM7O0lBRTdDLCtDQUE0Qzs7SUFFNUMsNERBQXlEOztJQUV6RCx5REFBc0Q7O0lBRXRELDREQUF5RDs7SUFFekQsd0NBQXFDOzs7OztJQXVDbkMsbUNBQWdDOzs7OztJQUNoQyw4Q0FBMEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBJbnB1dCxcclxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcclxuICBDaGFuZ2VEZXRlY3RvclJlZixcclxuICBUZW1wbGF0ZVJlZixcclxuICBDb250ZW50Q2hpbGQsXHJcbiAgT25Jbml0LFxyXG4gIE9uRGVzdHJveVxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBGbG9hdExhYmVsVHlwZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcclxuXHJcbmltcG9ydCB7IExheWVyIH0gZnJvbSAnLi4vc2hhcmVkJztcclxuaW1wb3J0IHsgTGF5ZXJMaXN0Q29udHJvbHNFbnVtIH0gZnJvbSAnLi9sYXllci1saXN0LmVudW0nO1xyXG5pbXBvcnQgeyBMYXllckxpc3RTZXJ2aWNlIH0gZnJvbSAnLi9sYXllci1saXN0LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIFJlcGxheVN1YmplY3QsIFN1YnNjcmlwdGlvbiwgRU1QVFksIHRpbWVyIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IGRlYm91bmNlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBNZXRhZGF0YU9wdGlvbnMsIE1ldGFkYXRhTGF5ZXJPcHRpb25zIH0gZnJvbSAnLi4vLi4vbWV0YWRhdGEvc2hhcmVkL21ldGFkYXRhLmludGVyZmFjZSc7XHJcblxyXG4vLyBUT0RPOiBUaGlzIGNsYXNzIGNvdWxkIHVzZSBhIGNsZWFuIHVwLiBBbHNvLCBzb21lIG1ldGhvZHMgY291bGQgYmUgbW92ZWQgZWFsc2V3aGVyZVxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2lnby1sYXllci1saXN0JyxcclxuICB0ZW1wbGF0ZVVybDogJy4vbGF5ZXItbGlzdC5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vbGF5ZXItbGlzdC5jb21wb25lbnQuc2NzcyddLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBMYXllckxpc3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcblxyXG4gIGhhc0xheWVyTm90VmlzaWJsZSA9IGZhbHNlO1xyXG4gIGhhc0xheWVyT3V0T2ZSYW5nZSA9IGZhbHNlO1xyXG4gIG9yZGVyYWJsZSA9IHRydWU7XHJcbiAgdGhyZXNob2xkVG9GaWx0ZXJBbmRTb3J0ID0gNTtcclxuXHJcbiAgbGF5ZXJzJDogQmVoYXZpb3JTdWJqZWN0PExheWVyW10+ID0gbmV3IEJlaGF2aW9yU3ViamVjdChbXSk7XHJcblxyXG4gIGNoYW5nZSQgPSBuZXcgUmVwbGF5U3ViamVjdDx2b2lkPigxKTtcclxuXHJcbiAgc2hvd1Rvb2xiYXIkOiBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KGZhbHNlKTtcclxuXHJcbiAgcHJpdmF0ZSBjaGFuZ2UkJDogU3Vic2NyaXB0aW9uO1xyXG5cclxuICBAQ29udGVudENoaWxkKCdpZ29MYXllckl0ZW1Ub29sYmFyJykgdGVtcGxhdGVMYXllclRvb2xiYXI6IFRlbXBsYXRlUmVmPGFueT47XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgc2V0IGxheWVycyh2YWx1ZTogTGF5ZXJbXSkge1xyXG4gICAgdGhpcy5zZXRMYXllcnModmFsdWUpO1xyXG4gICAgdGhpcy5uZXh0KCk7XHJcbiAgfVxyXG4gIGdldCBsYXllcnMoKTogTGF5ZXJbXSB7IHJldHVybiB0aGlzLl9sYXllcnM7IH1cclxuICBwcml2YXRlIF9sYXllcnM6IExheWVyW107XHJcblxyXG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyOiBzdHJpbmcgPSAnJztcclxuXHJcbiAgQElucHV0KCkgZmxvYXRMYWJlbDogRmxvYXRMYWJlbFR5cGUgPSAnYXV0byc7XHJcblxyXG4gIEBJbnB1dCgpIGxheWVyRmlsdGVyQW5kU29ydE9wdGlvbnM6IGFueSA9IHt9O1xyXG5cclxuICBASW5wdXQoKSBleGNsdWRlQmFzZUxheWVyczogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICBASW5wdXQoKSB0b2dnbGVMZWdlbmRPblZpc2liaWxpdHlDaGFuZ2U6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgQElucHV0KCkgZXhwYW5kTGVnZW5kT2ZWaXNpYmxlTGF5ZXJzOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIEBJbnB1dCgpIHVwZGF0ZUxlZ2VuZE9uUmVzb2x1dGlvbkNoYW5nZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICBASW5wdXQoKSBxdWVyeUJhZGdlOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIGdldCBrZXl3b3JkKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLmxheWVyTGlzdFNlcnZpY2Uua2V5d29yZDsgfVxyXG4gIHNldCBrZXl3b3JkKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgIHRoaXMubGF5ZXJMaXN0U2VydmljZS5rZXl3b3JkID0gdmFsdWU7XHJcbiAgICB0aGlzLm5leHQoKTtcclxuICB9XHJcblxyXG4gIGdldCBrZXl3b3JkSW5pdGlhbGl6ZWQoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLmxheWVyTGlzdFNlcnZpY2Uua2V5d29yZEluaXRpYWxpemVkOyB9XHJcbiAgc2V0IGtleXdvcmRJbml0aWFsaXplZCh2YWx1ZTogYm9vbGVhbikgeyB0aGlzLmxheWVyTGlzdFNlcnZpY2Uua2V5d29yZEluaXRpYWxpemVkID0gdmFsdWU7IH1cclxuXHJcbiAgZ2V0IG9ubHlWaXNpYmxlKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5sYXllckxpc3RTZXJ2aWNlLm9ubHlWaXNpYmxlOyB9XHJcbiAgc2V0IG9ubHlWaXNpYmxlKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLmxheWVyTGlzdFNlcnZpY2Uub25seVZpc2libGUgPSB2YWx1ZTtcclxuICAgIHRoaXMubmV4dCgpO1xyXG4gIH1cclxuXHJcbiAgZ2V0IG9ubHlWaXNpYmxlSW5pdGlhbGl6ZWQoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLmxheWVyTGlzdFNlcnZpY2Uub25seVZpc2libGVJbml0aWFsaXplZDsgfVxyXG4gIHNldCBvbmx5VmlzaWJsZUluaXRpYWxpemVkKHZhbHVlOiBib29sZWFuKSB7IHRoaXMubGF5ZXJMaXN0U2VydmljZS5vbmx5VmlzaWJsZUluaXRpYWxpemVkID0gdmFsdWU7IH1cclxuXHJcbiAgZ2V0IG9ubHlJblJhbmdlKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5sYXllckxpc3RTZXJ2aWNlLm9ubHlJblJhbmdlOyB9XHJcbiAgc2V0IG9ubHlJblJhbmdlKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLmxheWVyTGlzdFNlcnZpY2Uub25seUluUmFuZ2UgPSB2YWx1ZTtcclxuICAgIHRoaXMubmV4dCgpO1xyXG4gIH1cclxuXHJcbiAgZ2V0IG9ubHlJblJhbmdlSW5pdGlhbGl6ZWQoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLmxheWVyTGlzdFNlcnZpY2Uub25seUluUmFuZ2VJbml0aWFsaXplZDsgfVxyXG4gIHNldCBvbmx5SW5SYW5nZUluaXRpYWxpemVkKHZhbHVlOiBib29sZWFuKSB7IHRoaXMubGF5ZXJMaXN0U2VydmljZS5vbmx5SW5SYW5nZUluaXRpYWxpemVkID0gdmFsdWU7IH1cclxuXHJcbiAgZ2V0IHNvcnRlZEFscGhhKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5sYXllckxpc3RTZXJ2aWNlLnNvcnRlZEFscGhhOyB9XHJcbiAgc2V0IHNvcnRlZEFscGhhKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLmxheWVyTGlzdFNlcnZpY2Uuc29ydGVkQWxwaGEgPSB2YWx1ZTtcclxuICAgIHRoaXMubmV4dCgpO1xyXG4gIH1cclxuXHJcbiAgZ2V0IHNvcnRlZEFscGhhSW5pdGlhbGl6ZWQoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLmxheWVyTGlzdFNlcnZpY2Uuc29ydGVkQWxwaGFJbml0aWFsaXplZDsgfVxyXG4gIHNldCBzb3J0ZWRBbHBoYUluaXRpYWxpemVkKHZhbHVlOiBib29sZWFuKSB7IHRoaXMubGF5ZXJMaXN0U2VydmljZS5zb3J0ZWRBbHBoYUluaXRpYWxpemVkID0gdmFsdWU7IH1cclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGNkUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcclxuICAgIHByaXZhdGUgbGF5ZXJMaXN0U2VydmljZTogTGF5ZXJMaXN0U2VydmljZVxyXG4gICkge31cclxuXHJcbiAgLyoqXHJcbiAgICogU3Vic2NyaWJlIHRvIHRoZSBzZWFyY2ggdGVybSBzdHJlYW0gYW5kIHRyaWdnZXIgcmVzZWFyY2hlc1xyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5jaGFuZ2UkJCA9IHRoaXMuY2hhbmdlJFxyXG4gICAgICAucGlwZShcclxuICAgICAgICBkZWJvdW5jZSgoKSA9PiB7XHJcbiAgICAgICAgICByZXR1cm4gdGhpcy5sYXllcnMubGVuZ3RoID09PSAwID8gRU1QVFkgOiB0aW1lcig1MCk7XHJcbiAgICAgICAgfSlcclxuICAgICAgKS5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuc2hvd1Rvb2xiYXIkLm5leHQodGhpcy5jb21wdXRlU2hvd1Rvb2xiYXIoKSk7XHJcbiAgICAgICAgdGhpcy5sYXllcnMkLm5leHQodGhpcy5jb21wdXRlTGF5ZXJzKHRoaXMubGF5ZXJzLnNsaWNlKDApKSk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgIHRoaXMuaW5pdExheWVyRmlsdGVyQW5kU29ydE9wdGlvbnMoKTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgdGhpcy5jaGFuZ2UkJC51bnN1YnNjcmliZSgpO1xyXG4gIH1cclxuXHJcbiAgdG9nZ2xlT25seVZpc2libGUoKSB7XHJcbiAgICB0aGlzLm9ubHlWaXNpYmxlID0gIXRoaXMub25seVZpc2libGU7XHJcbiAgfVxyXG5cclxuICB0b2dnbGVPbmx5SW5SYW5nZSgpIHtcclxuICAgIHRoaXMub25seUluUmFuZ2UgPSAhdGhpcy5vbmx5SW5SYW5nZTtcclxuICB9XHJcblxyXG4gIHRvZ2dsZVNvcnQoc29ydEFscGhhOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLnNvcnRlZEFscGhhID0gc29ydEFscGhhO1xyXG4gIH1cclxuXHJcbiAgY2xlYXJLZXl3b3JkKCkge1xyXG4gICAgdGhpcy5rZXl3b3JkID0gdW5kZWZpbmVkO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBuZXh0KCkge1xyXG4gICAgdGhpcy5jaGFuZ2UkLm5leHQoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY29tcHV0ZUxheWVycyhsYXllcnM6IExheWVyW10pOiBMYXllcltdIHtcclxuICAgIGxldCBsYXllcnNPdXQgPSB0aGlzLmZpbHRlckxheWVycyhsYXllcnMpO1xyXG4gICAgaWYgKHRoaXMuc29ydGVkQWxwaGEpIHtcclxuICAgICAgbGF5ZXJzT3V0ID0gdGhpcy5zb3J0TGF5ZXJzQnlUaXRsZShsYXllcnNPdXQpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbGF5ZXJzT3V0ID0gdGhpcy5zb3J0TGF5ZXJzQnlaaW5kZXgobGF5ZXJzT3V0KTtcclxuICAgIH1cclxuICAgIHJldHVybiBsYXllcnNPdXQ7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGZpbHRlckxheWVycyhsYXllcnM6IExheWVyW10pOiBMYXllcltdIHtcclxuICAgIGNvbnN0IGtleXdvcmQgPSB0aGlzLmtleXdvcmQ7XHJcbiAgICBpZiAodGhpcy5sYXllckZpbHRlckFuZFNvcnRPcHRpb25zLnNob3dUb29sYmFyID09PSBMYXllckxpc3RDb250cm9sc0VudW0ubmV2ZXIpIHtcclxuICAgICAgcmV0dXJuIGxheWVycztcclxuICAgIH1cclxuICAgIGlmICgha2V5d29yZCAmJiAhdGhpcy5vbmx5SW5SYW5nZSAmJiAhdGhpcy5vbmx5VmlzaWJsZSkge1xyXG4gICAgICByZXR1cm4gbGF5ZXJzO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGtlZXBMYXllcklkcyA9IGxheWVycy5tYXAoKGxheWVyOiBMYXllcikgPT4gbGF5ZXIuaWQpO1xyXG5cclxuICAgIGxheWVycy5mb3JFYWNoKChsYXllcjogTGF5ZXIpID0+IHtcclxuICAgICAgY29uc3QgbGF5ZXJPcHRpb25zID0gbGF5ZXIub3B0aW9ucyBhcyBNZXRhZGF0YUxheWVyT3B0aW9ucyB8fCB7fTtcclxuICAgICAgY29uc3QgZGF0YVNvdXJjZU9wdGlvbnMgPSBsYXllci5kYXRhU291cmNlLm9wdGlvbnMgfHwge307XHJcbiAgICAgIGNvbnN0IG1ldGFkYXRhID0gbGF5ZXJPcHRpb25zLm1ldGFkYXRhIHx8IHt9IGFzIE1ldGFkYXRhT3B0aW9ucztcclxuICAgICAgY29uc3Qga2V5d29yZHMgPSBtZXRhZGF0YS5rZXl3b3JkTGlzdCB8fCBbXSA7XHJcbiAgICAgIGNvbnN0IGxheWVyS2V5d29yZHMgPSBrZXl3b3Jkcy5tYXAoKGt3OiBzdHJpbmcpID0+IHtcclxuICAgICAgICByZXR1cm4ga3cubm9ybWFsaXplKCdORkQnKS5yZXBsYWNlKC9bXFx1MDMwMC1cXHUwMzZmXS9nLCAnJyk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgaWYgKGtleXdvcmQpIHtcclxuICAgICAgICBjb25zdCBsb2NhbEtleXdvcmQgPSBrZXl3b3JkLm5vcm1hbGl6ZSgnTkZEJykucmVwbGFjZSgvW1xcdTAzMDAtXFx1MDM2Zl0vZywgJycpO1xyXG4gICAgICAgIGNvbnN0IGxheWVyVGl0bGUgPSBsYXllci50aXRsZS5ub3JtYWxpemUoJ05GRCcpLnJlcGxhY2UoL1tcXHUwMzAwLVxcdTAzNmZdL2csICcnKTtcclxuICAgICAgICBjb25zdCBkYXRhU291cmNlVHlwZSA9IGRhdGFTb3VyY2VPcHRpb25zLnR5cGUgfHwgJyc7XHJcbiAgICAgICAgY29uc3Qga2V5d29yZFJlZ2V4ID0gbmV3IFJlZ0V4cChsb2NhbEtleXdvcmQsICdnaScpO1xyXG4gICAgICAgIGNvbnN0IGtleXdvcmRJbkxpc3QgPSBsYXllcktleXdvcmRzLmZpbmQoKGt3OiBzdHJpbmcpID0+IGtleXdvcmRSZWdleC50ZXN0KGt3KSkgIT09IHVuZGVmaW5lZDtcclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICAha2V5d29yZFJlZ2V4LnRlc3QobGF5ZXJUaXRsZSkgJiZcclxuICAgICAgICAgICEoa2V5d29yZC50b0xvd2VyQ2FzZSgpID09PSBkYXRhU291cmNlVHlwZS50b0xvd2VyQ2FzZSgpKSAmJlxyXG4gICAgICAgICAgIWtleXdvcmRJbkxpc3RcclxuICAgICAgICApIHtcclxuICAgICAgICAgIGNvbnN0IGluZGV4ID0ga2VlcExheWVySWRzLmluZGV4T2YobGF5ZXIuaWQpO1xyXG4gICAgICAgICAgaWYgKGluZGV4ID4gLTEpIHtcclxuICAgICAgICAgICAga2VlcExheWVySWRzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAodGhpcy5vbmx5VmlzaWJsZSAmJiBsYXllci52aXNpYmxlID09PSBmYWxzZSkge1xyXG4gICAgICAgIGNvbnN0IGluZGV4ID0ga2VlcExheWVySWRzLmluZGV4T2YobGF5ZXIuaWQpO1xyXG4gICAgICAgIGlmIChpbmRleCA+IC0xKSB7XHJcbiAgICAgICAgICBrZWVwTGF5ZXJJZHMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICh0aGlzLm9ubHlJblJhbmdlICYmIGxheWVyLmlzSW5SZXNvbHV0aW9uc1JhbmdlID09PSBmYWxzZSkge1xyXG4gICAgICAgIGNvbnN0IGluZGV4ID0ga2VlcExheWVySWRzLmluZGV4T2YobGF5ZXIuaWQpO1xyXG4gICAgICAgIGlmIChpbmRleCA+IC0xKSB7XHJcbiAgICAgICAgICBrZWVwTGF5ZXJJZHMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBsYXllcnMuZmlsdGVyKChsYXllcjogTGF5ZXIpID0+IGtlZXBMYXllcklkcy5pbmRleE9mKGxheWVyLmlkKSAhPT0gLTEpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzb3J0TGF5ZXJzQnlaaW5kZXgobGF5ZXJzOiBMYXllcltdKSB7XHJcbiAgICByZXR1cm4gbGF5ZXJzLnNvcnQoKGxheWVyMSwgbGF5ZXIyKSA9PiBsYXllcjIuekluZGV4IC0gbGF5ZXIxLnpJbmRleCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHNvcnRMYXllcnNCeVRpdGxlKGxheWVyczogTGF5ZXJbXSkge1xyXG4gICAgcmV0dXJuIGxheWVycy5zb3J0KChhLCBiKSA9PiB7XHJcbiAgICAgIGlmIChhLnRpdGxlIDwgYi50aXRsZSkge1xyXG4gICAgICAgIHJldHVybiAtMTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoYS50aXRsZSA+IGIudGl0bGUpIHtcclxuICAgICAgICByZXR1cm4gMTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gMDtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjb21wdXRlT3JkZXJhYmxlKCk6IGJvb2xlYW4ge1xyXG4gICAgaWYgKHRoaXMub25seUluUmFuZ2UgfHwgdGhpcy5vbmx5VmlzaWJsZSB8fFxyXG4gICAgICB0aGlzLnNvcnRlZEFscGhhIHx8IHRoaXMua2V5d29yZCkge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY29tcHV0ZVNob3dUb29sYmFyKCk6IGJvb2xlYW4ge1xyXG4gICAgc3dpdGNoICh0aGlzLmxheWVyRmlsdGVyQW5kU29ydE9wdGlvbnMuc2hvd1Rvb2xiYXIpIHtcclxuICAgICAgY2FzZSBMYXllckxpc3RDb250cm9sc0VudW0uYWx3YXlzOlxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICBjYXNlIExheWVyTGlzdENvbnRyb2xzRW51bS5uZXZlcjpcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgaWYgKHRoaXMubGF5ZXJzLmxlbmd0aCA+PSB0aGlzLnRocmVzaG9sZFRvRmlsdGVyQW5kU29ydCB8fFxyXG4gICAgICAgICAgdGhpcy5rZXl3b3JkIHx8XHJcbiAgICAgICAgICB0aGlzLm9ubHlJblJhbmdlIHx8XHJcbiAgICAgICAgICB0aGlzLm9ubHlWaXNpYmxlKSB7XHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpbml0TGF5ZXJGaWx0ZXJBbmRTb3J0T3B0aW9ucygpIHtcclxuICAgIGlmICh0aGlzLmxheWVyRmlsdGVyQW5kU29ydE9wdGlvbnMudG9vbGJhclRocmVzaG9sZCkge1xyXG4gICAgICB0aGlzLnRocmVzaG9sZFRvRmlsdGVyQW5kU29ydCA9IHRoaXMubGF5ZXJGaWx0ZXJBbmRTb3J0T3B0aW9ucy50b29sYmFyVGhyZXNob2xkO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLmxheWVyRmlsdGVyQW5kU29ydE9wdGlvbnMua2V5d29yZCAmJiAhdGhpcy5rZXl3b3JkSW5pdGlhbGl6ZWQpIHtcclxuICAgICAgdGhpcy5rZXl3b3JkID0gdGhpcy5sYXllckZpbHRlckFuZFNvcnRPcHRpb25zLmtleXdvcmQ7XHJcbiAgICAgIHRoaXMua2V5d29yZEluaXRpYWxpemVkID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLmxheWVyRmlsdGVyQW5kU29ydE9wdGlvbnMuc29ydGVkQWxwaGEgJiYgIXRoaXMuc29ydGVkQWxwaGFJbml0aWFsaXplZCkge1xyXG4gICAgICB0aGlzLnNvcnRlZEFscGhhID0gdGhpcy5sYXllckZpbHRlckFuZFNvcnRPcHRpb25zLnNvcnRlZEFscGhhO1xyXG4gICAgICB0aGlzLnNvcnRlZEFscGhhSW5pdGlhbGl6ZWQgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMubGF5ZXJGaWx0ZXJBbmRTb3J0T3B0aW9ucy5vbmx5VmlzaWJsZSAmJiAhdGhpcy5vbmx5VmlzaWJsZUluaXRpYWxpemVkICYmXHJcbiAgICAgIHRoaXMuaGFzTGF5ZXJOb3RWaXNpYmxlKSB7XHJcbiAgICAgIHRoaXMub25seVZpc2libGUgPSB0aGlzLmxheWVyRmlsdGVyQW5kU29ydE9wdGlvbnMub25seVZpc2libGU7XHJcbiAgICAgIHRoaXMub25seVZpc2libGVJbml0aWFsaXplZCA9IHRydWU7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5sYXllckZpbHRlckFuZFNvcnRPcHRpb25zLm9ubHlJblJhbmdlICYmICF0aGlzLm9ubHlJblJhbmdlSW5pdGlhbGl6ZWQgJiZcclxuICAgICAgdGhpcy5oYXNMYXllck91dE9mUmFuZ2UpIHtcclxuICAgICAgdGhpcy5vbmx5SW5SYW5nZSA9IHRoaXMubGF5ZXJGaWx0ZXJBbmRTb3J0T3B0aW9ucy5vbmx5SW5SYW5nZTtcclxuICAgICAgdGhpcy5vbmx5SW5SYW5nZUluaXRpYWxpemVkID0gdHJ1ZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgc2V0TGF5ZXJzKGxheWVyczogTGF5ZXJbXSkge1xyXG4gICAgdGhpcy5fbGF5ZXJzID0gbGF5ZXJzO1xyXG5cclxuICAgIHRoaXMub3JkZXJhYmxlID0gdGhpcy5jb21wdXRlT3JkZXJhYmxlKCk7XHJcblxyXG4gICAgaWYgKHRoaXMuZXhjbHVkZUJhc2VMYXllcnMpIHtcclxuICAgICAgdGhpcy5oYXNMYXllck5vdFZpc2libGUgPSBsYXllcnMuZmluZChsID0+IGwudmlzaWJsZSA9PT0gZmFsc2UgJiYgIWwuYmFzZUxheWVyKSAhPT0gdW5kZWZpbmVkO1xyXG4gICAgICB0aGlzLmhhc0xheWVyT3V0T2ZSYW5nZSA9IGxheWVycy5maW5kKGwgPT4gbC5pc0luUmVzb2x1dGlvbnNSYW5nZSA9PT0gZmFsc2UgJiYgIWwuYmFzZUxheWVyKSAhPT0gdW5kZWZpbmVkO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5oYXNMYXllck5vdFZpc2libGUgPSBsYXllcnMuZmluZChsID0+IGwudmlzaWJsZSA9PT0gZmFsc2UpICE9PSB1bmRlZmluZWQ7XHJcbiAgICAgIHRoaXMuaGFzTGF5ZXJPdXRPZlJhbmdlID0gbGF5ZXJzLmZpbmQobCA9PiBsLmlzSW5SZXNvbHV0aW9uc1JhbmdlID09PSBmYWxzZSkgIT09IHVuZGVmaW5lZDtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19
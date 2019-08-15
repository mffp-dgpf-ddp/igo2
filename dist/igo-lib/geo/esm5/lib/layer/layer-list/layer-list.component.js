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
var LayerListComponent = /** @class */ (function () {
    function LayerListComponent(layerListService) {
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
     * @return {?}
     */
    LayerListComponent.prototype.getLowerLayer = /**
     * @return {?}
     */
    function () {
        return this.layers.filter((/**
         * @param {?} l
         * @return {?}
         */
        function (l) { return !l.baseLayer; })).reduce((/**
         * @param {?} prev
         * @param {?} current
         * @return {?}
         */
        function (prev, current) {
            return (prev.zIndex < current.zIndex) ? prev : current;
        }));
    };
    /**
     * @return {?}
     */
    LayerListComponent.prototype.getUpperLayer = /**
     * @return {?}
     */
    function () {
        return this.layers.filter((/**
         * @param {?} l
         * @return {?}
         */
        function (l) { return !l.baseLayer; })).reduce((/**
         * @param {?} prev
         * @param {?} current
         * @return {?}
         */
        function (prev, current) {
            return (prev.zIndex > current.zIndex) ? prev : current;
        }));
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
                    template: "<igo-list [navigation]=\"false\" [selection]=\"false\">\r\n  <mat-list-item *ngIf=\"showToolbar$ | async\">\r\n    <ng-container>\r\n      <mat-form-field class=\"inputFilter\" [floatLabel]=\"floatLabel\">\r\n        <input\r\n          matInput\r\n          [placeholder]=\"placeholder\"\r\n          [matTooltip]=\"'igo.geo.layer.subsetLayersListKeyword' | translate\"\r\n          matTooltipShowDelay=\"500\"\r\n          type=\"text\" [(ngModel)]=\"keyword\">\r\n        <button\r\n          mat-button\r\n          *ngIf=\"keyword\"\r\n          matSuffix\r\n          mat-icon-button\r\n          aria-label=\"Clear\"\r\n          color=\"warn\"\r\n          (click)=\"clearKeyword()\">\r\n          <mat-icon svgIcon=\"close\"></mat-icon>\r\n        </button>\r\n      </mat-form-field>\r\n      <button\r\n        *ngIf=\"!sortedAlpha\"\r\n        mat-icon-button\r\n        [matTooltip]=\"'igo.geo.layer.sortAlphabetically' | translate\"\r\n        matTooltipShowDelay=\"500\"\r\n        (click)=\"toggleSort(true)\">\r\n        <mat-icon color=\"primary\" svgIcon=\"sort-alphabetical\"></mat-icon>\r\n      </button>\r\n      <button\r\n        *ngIf=\"sortedAlpha\"\r\n        mat-icon-button\r\n        [matTooltip]=\"'igo.geo.layer.sortMapOrder' | translate\"\r\n        matTooltipShowDelay=\"500\"\r\n        (click)=\"toggleSort(false)\">\r\n        <mat-icon color=\"warn\" svgIcon=\"alert\"></mat-icon>\r\n      </button>\r\n      <button\r\n        mat-icon-button\r\n        [disabled]=\"!hasLayerNotVisible\"\r\n        [matTooltip]=\"onlyVisible ?\r\n        ('igo.geo.layer.resetLayersList' | translate) :\r\n        ('igo.geo.layer.subsetLayersListOnlyVisible' | translate)\"\r\n        matTooltipShowDelay=\"500\"\r\n        [color]=\"onlyVisible ? 'warn' : 'primary'\"\r\n        (click)=\"toggleOnlyVisible()\">\r\n        <mat-icon [svgIcon]=\"!onlyVisible ? 'eye' : 'alert'\"></mat-icon>\r\n      </button>\r\n      <button\r\n        mat-icon-button\r\n        [disabled]=\"!hasLayerOutOfRange\"\r\n        [matTooltip]=\"onlyInRange ?\r\n        ('igo.geo.layer.resetLayersList' | translate) :\r\n        ('igo.geo.layer.subsetLayersListOnlyInRange' | translate)\"\r\n        matTooltipShowDelay=\"500\"\r\n        [color]=\"onlyInRange ? 'warn' : 'primary'\"\r\n        (click)=\"toggleOnlyInRange()\">\r\n        <mat-icon [svgIcon]=\"!onlyInRange ? 'playlist-check' : 'alert'\"></mat-icon>\r\n      </button>\r\n    </ng-container>\r\n  </mat-list-item>\r\n\r\n  <ng-template ngFor let-layer let-i=\"index\" [ngForOf]=\"layers$ | async\">\r\n    <igo-layer-item *ngIf=\"!(excludeBaseLayers && layer.baseLayer)\"\r\n        igoListItem\r\n        [layer]=\"layer\"\r\n        [orderable]=\"orderable && !layer.baseLayer\"\r\n        [lowerDisabled]=\"getLowerLayer().id === layer.id\"\r\n        [raiseDisabled]=\"getUpperLayer().id === layer.id\"\r\n        [queryBadge]=\"queryBadge\"\r\n        [expandLegendIfVisible]=\"expandLegendOfVisibleLayers\"\r\n        [updateLegendOnResolutionChange]=\"updateLegendOnResolutionChange\"\r\n        [toggleLegendOnVisibilityChange]=\"toggleLegendOnVisibilityChange\">\r\n\r\n        <ng-container igoLayerItemToolbar\r\n          [ngTemplateOutlet]=\"templateLayerToolbar\"\r\n          [ngTemplateOutletContext]=\"{layer: layer}\">\r\n        </ng-container>\r\n\r\n    </igo-layer-item>\r\n  </ng-template>\r\n</igo-list>\r\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: ["mat-form-field.inputFilter{width:calc(100% - 100px);max-width:200px}"]
                }] }
    ];
    /** @nocollapse */
    LayerListComponent.ctorParameters = function () { return [
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
    LayerListComponent.prototype.layerListService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5ZXItbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvbGF5ZXIvbGF5ZXItbGlzdC9sYXllci1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsdUJBQXVCLEVBQ3ZCLFdBQVcsRUFDWCxZQUFZLEVBR2IsTUFBTSxlQUFlLENBQUM7QUFJdkIsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDMUQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDeEQsT0FBTyxFQUFFLGVBQWUsRUFBRSxhQUFhLEVBQWdCLEtBQUssRUFBRSxLQUFLLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDbEYsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGdCQUFnQixDQUFDOztBQUkxQztJQW1GRSw0QkFDVSxnQkFBa0M7UUFBbEMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQTVFNUMsdUJBQWtCLEdBQUcsS0FBSyxDQUFDO1FBQzNCLHVCQUFrQixHQUFHLEtBQUssQ0FBQztRQUMzQixjQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLDZCQUF3QixHQUFHLENBQUMsQ0FBQztRQUU3QixZQUFPLEdBQTZCLElBQUksZUFBZSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRTVELFlBQU8sR0FBRyxJQUFJLGFBQWEsQ0FBTyxDQUFDLENBQUMsQ0FBQztRQUVyQyxpQkFBWSxHQUE2QixJQUFJLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQWMzRCxnQkFBVyxHQUFXLEVBQUUsQ0FBQztRQUV6QixlQUFVLEdBQW1CLE1BQU0sQ0FBQztRQUVwQyw4QkFBeUIsR0FBUSxFQUFFLENBQUM7UUFFcEMsc0JBQWlCLEdBQVksS0FBSyxDQUFDO1FBRW5DLG1DQUE4QixHQUFZLEtBQUssQ0FBQztR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QUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7aUJBQ2hEOzs7O2dCQVhRLGdCQUFnQjs7O3VDQTJCdEIsWUFBWSxTQUFDLHFCQUFxQjt5QkFFbEMsS0FBSzs4QkFRTCxLQUFLOzZCQUVMLEtBQUs7NENBRUwsS0FBSztvQ0FFTCxLQUFLO2lEQUVMLEtBQUs7OENBRUwsS0FBSztpREFFTCxLQUFLOzZCQUVMLEtBQUs7O0lBdU9SLHlCQUFDO0NBQUEsQUFwUkQsSUFvUkM7U0E5UVksa0JBQWtCOzs7SUFFN0IsZ0RBQTJCOztJQUMzQixnREFBMkI7O0lBQzNCLHVDQUFpQjs7SUFDakIsc0RBQTZCOztJQUU3QixxQ0FBNEQ7O0lBRTVELHFDQUFxQzs7SUFFckMsMENBQW9FOzs7OztJQUVwRSxzQ0FBK0I7O0lBRS9CLGtEQUE0RTs7Ozs7SUFRNUUscUNBQXlCOztJQUV6Qix5Q0FBa0M7O0lBRWxDLHdDQUE2Qzs7SUFFN0MsdURBQTZDOztJQUU3QywrQ0FBNEM7O0lBRTVDLDREQUF5RDs7SUFFekQseURBQXNEOztJQUV0RCw0REFBeUQ7O0lBRXpELHdDQUFxQzs7Ozs7SUF1Q25DLDhDQUEwQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIElucHV0LFxyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gIFRlbXBsYXRlUmVmLFxyXG4gIENvbnRlbnRDaGlsZCxcclxuICBPbkluaXQsXHJcbiAgT25EZXN0cm95XHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEZsb2F0TGFiZWxUeXBlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xyXG5cclxuaW1wb3J0IHsgTGF5ZXIgfSBmcm9tICcuLi9zaGFyZWQnO1xyXG5pbXBvcnQgeyBMYXllckxpc3RDb250cm9sc0VudW0gfSBmcm9tICcuL2xheWVyLWxpc3QuZW51bSc7XHJcbmltcG9ydCB7IExheWVyTGlzdFNlcnZpY2UgfSBmcm9tICcuL2xheWVyLWxpc3Quc2VydmljZSc7XHJcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgUmVwbGF5U3ViamVjdCwgU3Vic2NyaXB0aW9uLCBFTVBUWSwgdGltZXIgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgZGVib3VuY2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IE1ldGFkYXRhT3B0aW9ucywgTWV0YWRhdGFMYXllck9wdGlvbnMgfSBmcm9tICcuLi8uLi9tZXRhZGF0YS9zaGFyZWQvbWV0YWRhdGEuaW50ZXJmYWNlJztcclxuXHJcbi8vIFRPRE86IFRoaXMgY2xhc3MgY291bGQgdXNlIGEgY2xlYW4gdXAuIEFsc28sIHNvbWUgbWV0aG9kcyBjb3VsZCBiZSBtb3ZlZCBlYWxzZXdoZXJlXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaWdvLWxheWVyLWxpc3QnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9sYXllci1saXN0LmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9sYXllci1saXN0LmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIExheWVyTGlzdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuXHJcbiAgaGFzTGF5ZXJOb3RWaXNpYmxlID0gZmFsc2U7XHJcbiAgaGFzTGF5ZXJPdXRPZlJhbmdlID0gZmFsc2U7XHJcbiAgb3JkZXJhYmxlID0gdHJ1ZTtcclxuICB0aHJlc2hvbGRUb0ZpbHRlckFuZFNvcnQgPSA1O1xyXG5cclxuICBsYXllcnMkOiBCZWhhdmlvclN1YmplY3Q8TGF5ZXJbXT4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KFtdKTtcclxuXHJcbiAgY2hhbmdlJCA9IG5ldyBSZXBsYXlTdWJqZWN0PHZvaWQ+KDEpO1xyXG5cclxuICBzaG93VG9vbGJhciQ6IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPiA9IG5ldyBCZWhhdmlvclN1YmplY3QoZmFsc2UpO1xyXG5cclxuICBwcml2YXRlIGNoYW5nZSQkOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIEBDb250ZW50Q2hpbGQoJ2lnb0xheWVySXRlbVRvb2xiYXInKSB0ZW1wbGF0ZUxheWVyVG9vbGJhcjogVGVtcGxhdGVSZWY8YW55PjtcclxuXHJcbiAgQElucHV0KClcclxuICBzZXQgbGF5ZXJzKHZhbHVlOiBMYXllcltdKSB7XHJcbiAgICB0aGlzLnNldExheWVycyh2YWx1ZSk7XHJcbiAgICB0aGlzLm5leHQoKTtcclxuICB9XHJcbiAgZ2V0IGxheWVycygpOiBMYXllcltdIHsgcmV0dXJuIHRoaXMuX2xheWVyczsgfVxyXG4gIHByaXZhdGUgX2xheWVyczogTGF5ZXJbXTtcclxuXHJcbiAgQElucHV0KCkgcGxhY2Vob2xkZXI6IHN0cmluZyA9ICcnO1xyXG5cclxuICBASW5wdXQoKSBmbG9hdExhYmVsOiBGbG9hdExhYmVsVHlwZSA9ICdhdXRvJztcclxuXHJcbiAgQElucHV0KCkgbGF5ZXJGaWx0ZXJBbmRTb3J0T3B0aW9uczogYW55ID0ge307XHJcblxyXG4gIEBJbnB1dCgpIGV4Y2x1ZGVCYXNlTGF5ZXJzOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIEBJbnB1dCgpIHRvZ2dsZUxlZ2VuZE9uVmlzaWJpbGl0eUNoYW5nZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICBASW5wdXQoKSBleHBhbmRMZWdlbmRPZlZpc2libGVMYXllcnM6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgQElucHV0KCkgdXBkYXRlTGVnZW5kT25SZXNvbHV0aW9uQ2hhbmdlOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIEBJbnB1dCgpIHF1ZXJ5QmFkZ2U6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgZ2V0IGtleXdvcmQoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMubGF5ZXJMaXN0U2VydmljZS5rZXl3b3JkOyB9XHJcbiAgc2V0IGtleXdvcmQodmFsdWU6IHN0cmluZykge1xyXG4gICAgdGhpcy5sYXllckxpc3RTZXJ2aWNlLmtleXdvcmQgPSB2YWx1ZTtcclxuICAgIHRoaXMubmV4dCgpO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGtleXdvcmRJbml0aWFsaXplZCgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMubGF5ZXJMaXN0U2VydmljZS5rZXl3b3JkSW5pdGlhbGl6ZWQ7IH1cclxuICBzZXQga2V5d29yZEluaXRpYWxpemVkKHZhbHVlOiBib29sZWFuKSB7IHRoaXMubGF5ZXJMaXN0U2VydmljZS5rZXl3b3JkSW5pdGlhbGl6ZWQgPSB2YWx1ZTsgfVxyXG5cclxuICBnZXQgb25seVZpc2libGUoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLmxheWVyTGlzdFNlcnZpY2Uub25seVZpc2libGU7IH1cclxuICBzZXQgb25seVZpc2libGUodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMubGF5ZXJMaXN0U2VydmljZS5vbmx5VmlzaWJsZSA9IHZhbHVlO1xyXG4gICAgdGhpcy5uZXh0KCk7XHJcbiAgfVxyXG5cclxuICBnZXQgb25seVZpc2libGVJbml0aWFsaXplZCgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMubGF5ZXJMaXN0U2VydmljZS5vbmx5VmlzaWJsZUluaXRpYWxpemVkOyB9XHJcbiAgc2V0IG9ubHlWaXNpYmxlSW5pdGlhbGl6ZWQodmFsdWU6IGJvb2xlYW4pIHsgdGhpcy5sYXllckxpc3RTZXJ2aWNlLm9ubHlWaXNpYmxlSW5pdGlhbGl6ZWQgPSB2YWx1ZTsgfVxyXG5cclxuICBnZXQgb25seUluUmFuZ2UoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLmxheWVyTGlzdFNlcnZpY2Uub25seUluUmFuZ2U7IH1cclxuICBzZXQgb25seUluUmFuZ2UodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMubGF5ZXJMaXN0U2VydmljZS5vbmx5SW5SYW5nZSA9IHZhbHVlO1xyXG4gICAgdGhpcy5uZXh0KCk7XHJcbiAgfVxyXG5cclxuICBnZXQgb25seUluUmFuZ2VJbml0aWFsaXplZCgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMubGF5ZXJMaXN0U2VydmljZS5vbmx5SW5SYW5nZUluaXRpYWxpemVkOyB9XHJcbiAgc2V0IG9ubHlJblJhbmdlSW5pdGlhbGl6ZWQodmFsdWU6IGJvb2xlYW4pIHsgdGhpcy5sYXllckxpc3RTZXJ2aWNlLm9ubHlJblJhbmdlSW5pdGlhbGl6ZWQgPSB2YWx1ZTsgfVxyXG5cclxuICBnZXQgc29ydGVkQWxwaGEoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLmxheWVyTGlzdFNlcnZpY2Uuc29ydGVkQWxwaGE7IH1cclxuICBzZXQgc29ydGVkQWxwaGEodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMubGF5ZXJMaXN0U2VydmljZS5zb3J0ZWRBbHBoYSA9IHZhbHVlO1xyXG4gICAgdGhpcy5uZXh0KCk7XHJcbiAgfVxyXG5cclxuICBnZXQgc29ydGVkQWxwaGFJbml0aWFsaXplZCgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMubGF5ZXJMaXN0U2VydmljZS5zb3J0ZWRBbHBoYUluaXRpYWxpemVkOyB9XHJcbiAgc2V0IHNvcnRlZEFscGhhSW5pdGlhbGl6ZWQodmFsdWU6IGJvb2xlYW4pIHsgdGhpcy5sYXllckxpc3RTZXJ2aWNlLnNvcnRlZEFscGhhSW5pdGlhbGl6ZWQgPSB2YWx1ZTsgfVxyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgbGF5ZXJMaXN0U2VydmljZTogTGF5ZXJMaXN0U2VydmljZVxyXG4gICkge31cclxuXHJcbiAgLyoqXHJcbiAgICogU3Vic2NyaWJlIHRvIHRoZSBzZWFyY2ggdGVybSBzdHJlYW0gYW5kIHRyaWdnZXIgcmVzZWFyY2hlc1xyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5jaGFuZ2UkJCA9IHRoaXMuY2hhbmdlJFxyXG4gICAgICAucGlwZShcclxuICAgICAgICBkZWJvdW5jZSgoKSA9PiB7XHJcbiAgICAgICAgICByZXR1cm4gdGhpcy5sYXllcnMubGVuZ3RoID09PSAwID8gRU1QVFkgOiB0aW1lcig1MCk7XHJcbiAgICAgICAgfSlcclxuICAgICAgKS5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuc2hvd1Rvb2xiYXIkLm5leHQodGhpcy5jb21wdXRlU2hvd1Rvb2xiYXIoKSk7XHJcbiAgICAgICAgdGhpcy5sYXllcnMkLm5leHQodGhpcy5jb21wdXRlTGF5ZXJzKHRoaXMubGF5ZXJzLnNsaWNlKDApKSk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgIHRoaXMuaW5pdExheWVyRmlsdGVyQW5kU29ydE9wdGlvbnMoKTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgdGhpcy5jaGFuZ2UkJC51bnN1YnNjcmliZSgpO1xyXG4gIH1cclxuXHJcbiAgdG9nZ2xlT25seVZpc2libGUoKSB7XHJcbiAgICB0aGlzLm9ubHlWaXNpYmxlID0gIXRoaXMub25seVZpc2libGU7XHJcbiAgfVxyXG5cclxuICB0b2dnbGVPbmx5SW5SYW5nZSgpIHtcclxuICAgIHRoaXMub25seUluUmFuZ2UgPSAhdGhpcy5vbmx5SW5SYW5nZTtcclxuICB9XHJcblxyXG4gIHRvZ2dsZVNvcnQoc29ydEFscGhhOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLnNvcnRlZEFscGhhID0gc29ydEFscGhhO1xyXG4gIH1cclxuXHJcbiAgY2xlYXJLZXl3b3JkKCkge1xyXG4gICAgdGhpcy5rZXl3b3JkID0gdW5kZWZpbmVkO1xyXG4gIH1cclxuXHJcbiAgZ2V0TG93ZXJMYXllcigpIHtcclxuICAgIHJldHVybiB0aGlzLmxheWVycy5maWx0ZXIobCA9PiAhbC5iYXNlTGF5ZXIpLnJlZHVjZSgocHJldiwgY3VycmVudCkgPT4ge1xyXG4gICAgICByZXR1cm4gKHByZXYuekluZGV4IDwgY3VycmVudC56SW5kZXgpID8gcHJldiA6IGN1cnJlbnQ7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGdldFVwcGVyTGF5ZXIoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5sYXllcnMuZmlsdGVyKGwgPT4gIWwuYmFzZUxheWVyKS5yZWR1Y2UoKHByZXYsIGN1cnJlbnQpID0+IHtcclxuICAgICAgcmV0dXJuIChwcmV2LnpJbmRleCA+IGN1cnJlbnQuekluZGV4KSA/IHByZXYgOiBjdXJyZW50O1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG5leHQoKSB7XHJcbiAgICB0aGlzLmNoYW5nZSQubmV4dCgpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjb21wdXRlTGF5ZXJzKGxheWVyczogTGF5ZXJbXSk6IExheWVyW10ge1xyXG4gICAgbGV0IGxheWVyc091dCA9IHRoaXMuZmlsdGVyTGF5ZXJzKGxheWVycyk7XHJcbiAgICBpZiAodGhpcy5zb3J0ZWRBbHBoYSkge1xyXG4gICAgICBsYXllcnNPdXQgPSB0aGlzLnNvcnRMYXllcnNCeVRpdGxlKGxheWVyc091dCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBsYXllcnNPdXQgPSB0aGlzLnNvcnRMYXllcnNCeVppbmRleChsYXllcnNPdXQpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGxheWVyc091dDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZmlsdGVyTGF5ZXJzKGxheWVyczogTGF5ZXJbXSk6IExheWVyW10ge1xyXG4gICAgY29uc3Qga2V5d29yZCA9IHRoaXMua2V5d29yZDtcclxuICAgIGlmICh0aGlzLmxheWVyRmlsdGVyQW5kU29ydE9wdGlvbnMuc2hvd1Rvb2xiYXIgPT09IExheWVyTGlzdENvbnRyb2xzRW51bS5uZXZlcikge1xyXG4gICAgICByZXR1cm4gbGF5ZXJzO1xyXG4gICAgfVxyXG4gICAgaWYgKCFrZXl3b3JkICYmICF0aGlzLm9ubHlJblJhbmdlICYmICF0aGlzLm9ubHlWaXNpYmxlKSB7XHJcbiAgICAgIHJldHVybiBsYXllcnM7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qga2VlcExheWVySWRzID0gbGF5ZXJzLm1hcCgobGF5ZXI6IExheWVyKSA9PiBsYXllci5pZCk7XHJcblxyXG4gICAgbGF5ZXJzLmZvckVhY2goKGxheWVyOiBMYXllcikgPT4ge1xyXG4gICAgICBjb25zdCBsYXllck9wdGlvbnMgPSBsYXllci5vcHRpb25zIGFzIE1ldGFkYXRhTGF5ZXJPcHRpb25zIHx8IHt9O1xyXG4gICAgICBjb25zdCBkYXRhU291cmNlT3B0aW9ucyA9IGxheWVyLmRhdGFTb3VyY2Uub3B0aW9ucyB8fCB7fTtcclxuICAgICAgY29uc3QgbWV0YWRhdGEgPSBsYXllck9wdGlvbnMubWV0YWRhdGEgfHwge30gYXMgTWV0YWRhdGFPcHRpb25zO1xyXG4gICAgICBjb25zdCBrZXl3b3JkcyA9IG1ldGFkYXRhLmtleXdvcmRMaXN0IHx8IFtdIDtcclxuICAgICAgY29uc3QgbGF5ZXJLZXl3b3JkcyA9IGtleXdvcmRzLm1hcCgoa3c6IHN0cmluZykgPT4ge1xyXG4gICAgICAgIHJldHVybiBrdy5ub3JtYWxpemUoJ05GRCcpLnJlcGxhY2UoL1tcXHUwMzAwLVxcdTAzNmZdL2csICcnKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBpZiAoa2V5d29yZCkge1xyXG4gICAgICAgIGNvbnN0IGxvY2FsS2V5d29yZCA9IGtleXdvcmQubm9ybWFsaXplKCdORkQnKS5yZXBsYWNlKC9bXFx1MDMwMC1cXHUwMzZmXS9nLCAnJyk7XHJcbiAgICAgICAgY29uc3QgbGF5ZXJUaXRsZSA9IGxheWVyLnRpdGxlLm5vcm1hbGl6ZSgnTkZEJykucmVwbGFjZSgvW1xcdTAzMDAtXFx1MDM2Zl0vZywgJycpO1xyXG4gICAgICAgIGNvbnN0IGRhdGFTb3VyY2VUeXBlID0gZGF0YVNvdXJjZU9wdGlvbnMudHlwZSB8fCAnJztcclxuICAgICAgICBjb25zdCBrZXl3b3JkUmVnZXggPSBuZXcgUmVnRXhwKGxvY2FsS2V5d29yZCwgJ2dpJyk7XHJcbiAgICAgICAgY29uc3Qga2V5d29yZEluTGlzdCA9IGxheWVyS2V5d29yZHMuZmluZCgoa3c6IHN0cmluZykgPT4ga2V5d29yZFJlZ2V4LnRlc3Qoa3cpKSAhPT0gdW5kZWZpbmVkO1xyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgICFrZXl3b3JkUmVnZXgudGVzdChsYXllclRpdGxlKSAmJlxyXG4gICAgICAgICAgIShrZXl3b3JkLnRvTG93ZXJDYXNlKCkgPT09IGRhdGFTb3VyY2VUeXBlLnRvTG93ZXJDYXNlKCkpICYmXHJcbiAgICAgICAgICAha2V5d29yZEluTGlzdFxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgY29uc3QgaW5kZXggPSBrZWVwTGF5ZXJJZHMuaW5kZXhPZihsYXllci5pZCk7XHJcbiAgICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xyXG4gICAgICAgICAgICBrZWVwTGF5ZXJJZHMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICh0aGlzLm9ubHlWaXNpYmxlICYmIGxheWVyLnZpc2libGUgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgY29uc3QgaW5kZXggPSBrZWVwTGF5ZXJJZHMuaW5kZXhPZihsYXllci5pZCk7XHJcbiAgICAgICAgaWYgKGluZGV4ID4gLTEpIHtcclxuICAgICAgICAgIGtlZXBMYXllcklkcy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHRoaXMub25seUluUmFuZ2UgJiYgbGF5ZXIuaXNJblJlc29sdXRpb25zUmFuZ2UgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgY29uc3QgaW5kZXggPSBrZWVwTGF5ZXJJZHMuaW5kZXhPZihsYXllci5pZCk7XHJcbiAgICAgICAgaWYgKGluZGV4ID4gLTEpIHtcclxuICAgICAgICAgIGtlZXBMYXllcklkcy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIGxheWVycy5maWx0ZXIoKGxheWVyOiBMYXllcikgPT4ga2VlcExheWVySWRzLmluZGV4T2YobGF5ZXIuaWQpICE9PSAtMSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHNvcnRMYXllcnNCeVppbmRleChsYXllcnM6IExheWVyW10pIHtcclxuICAgIHJldHVybiBsYXllcnMuc29ydCgobGF5ZXIxLCBsYXllcjIpID0+IGxheWVyMi56SW5kZXggLSBsYXllcjEuekluZGV4KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgc29ydExheWVyc0J5VGl0bGUobGF5ZXJzOiBMYXllcltdKSB7XHJcbiAgICByZXR1cm4gbGF5ZXJzLnNvcnQoKGEsIGIpID0+IHtcclxuICAgICAgaWYgKGEudGl0bGUgPCBiLnRpdGxlKSB7XHJcbiAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChhLnRpdGxlID4gYi50aXRsZSkge1xyXG4gICAgICAgIHJldHVybiAxO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiAwO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNvbXB1dGVTaG93VG9vbGJhcigpOiBib29sZWFuIHtcclxuICAgIHN3aXRjaCAodGhpcy5sYXllckZpbHRlckFuZFNvcnRPcHRpb25zLnNob3dUb29sYmFyKSB7XHJcbiAgICAgIGNhc2UgTGF5ZXJMaXN0Q29udHJvbHNFbnVtLmFsd2F5czpcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgY2FzZSBMYXllckxpc3RDb250cm9sc0VudW0ubmV2ZXI6XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIGlmICh0aGlzLmxheWVycy5sZW5ndGggPj0gdGhpcy50aHJlc2hvbGRUb0ZpbHRlckFuZFNvcnQgfHxcclxuICAgICAgICAgIHRoaXMua2V5d29yZCB8fFxyXG4gICAgICAgICAgdGhpcy5vbmx5SW5SYW5nZSB8fFxyXG4gICAgICAgICAgdGhpcy5vbmx5VmlzaWJsZSkge1xyXG4gICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgaW5pdExheWVyRmlsdGVyQW5kU29ydE9wdGlvbnMoKSB7XHJcbiAgICBpZiAodGhpcy5sYXllckZpbHRlckFuZFNvcnRPcHRpb25zLnRvb2xiYXJUaHJlc2hvbGQpIHtcclxuICAgICAgdGhpcy50aHJlc2hvbGRUb0ZpbHRlckFuZFNvcnQgPSB0aGlzLmxheWVyRmlsdGVyQW5kU29ydE9wdGlvbnMudG9vbGJhclRocmVzaG9sZDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5sYXllckZpbHRlckFuZFNvcnRPcHRpb25zLmtleXdvcmQgJiYgIXRoaXMua2V5d29yZEluaXRpYWxpemVkKSB7XHJcbiAgICAgIHRoaXMua2V5d29yZCA9IHRoaXMubGF5ZXJGaWx0ZXJBbmRTb3J0T3B0aW9ucy5rZXl3b3JkO1xyXG4gICAgICB0aGlzLmtleXdvcmRJbml0aWFsaXplZCA9IHRydWU7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5sYXllckZpbHRlckFuZFNvcnRPcHRpb25zLnNvcnRlZEFscGhhICYmICF0aGlzLnNvcnRlZEFscGhhSW5pdGlhbGl6ZWQpIHtcclxuICAgICAgdGhpcy5zb3J0ZWRBbHBoYSA9IHRoaXMubGF5ZXJGaWx0ZXJBbmRTb3J0T3B0aW9ucy5zb3J0ZWRBbHBoYTtcclxuICAgICAgdGhpcy5zb3J0ZWRBbHBoYUluaXRpYWxpemVkID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLmxheWVyRmlsdGVyQW5kU29ydE9wdGlvbnMub25seVZpc2libGUgJiYgIXRoaXMub25seVZpc2libGVJbml0aWFsaXplZCAmJlxyXG4gICAgICB0aGlzLmhhc0xheWVyTm90VmlzaWJsZSkge1xyXG4gICAgICB0aGlzLm9ubHlWaXNpYmxlID0gdGhpcy5sYXllckZpbHRlckFuZFNvcnRPcHRpb25zLm9ubHlWaXNpYmxlO1xyXG4gICAgICB0aGlzLm9ubHlWaXNpYmxlSW5pdGlhbGl6ZWQgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMubGF5ZXJGaWx0ZXJBbmRTb3J0T3B0aW9ucy5vbmx5SW5SYW5nZSAmJiAhdGhpcy5vbmx5SW5SYW5nZUluaXRpYWxpemVkICYmXHJcbiAgICAgIHRoaXMuaGFzTGF5ZXJPdXRPZlJhbmdlKSB7XHJcbiAgICAgIHRoaXMub25seUluUmFuZ2UgPSB0aGlzLmxheWVyRmlsdGVyQW5kU29ydE9wdGlvbnMub25seUluUmFuZ2U7XHJcbiAgICAgIHRoaXMub25seUluUmFuZ2VJbml0aWFsaXplZCA9IHRydWU7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHNldExheWVycyhsYXllcnM6IExheWVyW10pIHtcclxuICAgIHRoaXMuX2xheWVycyA9IGxheWVycztcclxuXHJcbiAgICBpZiAodGhpcy5leGNsdWRlQmFzZUxheWVycykge1xyXG4gICAgICB0aGlzLmhhc0xheWVyTm90VmlzaWJsZSA9IGxheWVycy5maW5kKGwgPT4gbC52aXNpYmxlID09PSBmYWxzZSAmJiAhbC5iYXNlTGF5ZXIpICE9PSB1bmRlZmluZWQ7XHJcbiAgICAgIHRoaXMuaGFzTGF5ZXJPdXRPZlJhbmdlID0gbGF5ZXJzLmZpbmQobCA9PiBsLmlzSW5SZXNvbHV0aW9uc1JhbmdlID09PSBmYWxzZSAmJiAhbC5iYXNlTGF5ZXIpICE9PSB1bmRlZmluZWQ7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmhhc0xheWVyTm90VmlzaWJsZSA9IGxheWVycy5maW5kKGwgPT4gbC52aXNpYmxlID09PSBmYWxzZSkgIT09IHVuZGVmaW5lZDtcclxuICAgICAgdGhpcy5oYXNMYXllck91dE9mUmFuZ2UgPSBsYXllcnMuZmluZChsID0+IGwuaXNJblJlc29sdXRpb25zUmFuZ2UgPT09IGZhbHNlKSAhPT0gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=
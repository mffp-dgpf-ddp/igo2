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
    Object.defineProperty(LayerListComponent.prototype, "layers", {
        get: /**
         * @return {?}
         */
        function () {
            return this._layers;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._layers = value;
            this.next();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayerListComponent.prototype, "keyword", {
        get: /**
         * @return {?}
         */
        function () {
            return this.layerListService.keyword;
        },
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
        function () {
            return this.layerListService.keywordInitialized;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.layerListService.keywordInitialized = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayerListComponent.prototype, "onlyVisible", {
        get: /**
         * @return {?}
         */
        function () {
            return this.layerListService.onlyVisible;
        },
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
        function () {
            return this.layerListService.onlyVisibleInitialized;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.layerListService.onlyVisibleInitialized = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayerListComponent.prototype, "onlyInRange", {
        get: /**
         * @return {?}
         */
        function () {
            return this.layerListService.onlyInRange;
        },
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
        function () {
            return this.layerListService.onlyInRangeInitialized;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.layerListService.onlyInRangeInitialized = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayerListComponent.prototype, "sortedAlpha", {
        get: /**
         * @return {?}
         */
        function () {
            return this.layerListService.sortedAlpha;
        },
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
        function () {
            return this.layerListService.sortedAlphaInitialized;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.layerListService.sortedAlphaInitialized = value;
        },
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
        })))
            .subscribe((/**
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
        return this.layers
            .filter((/**
         * @param {?} l
         * @return {?}
         */
        function (l) { return !l.baseLayer; }))
            .reduce((/**
         * @param {?} prev
         * @param {?} current
         * @return {?}
         */
        function (prev, current) {
            return prev.zIndex < current.zIndex ? prev : current;
        }), { zIndex: undefined, id: undefined });
    };
    /**
     * @return {?}
     */
    LayerListComponent.prototype.getUpperLayer = /**
     * @return {?}
     */
    function () {
        return this.layers
            .filter((/**
         * @param {?} l
         * @return {?}
         */
        function (l) { return !l.baseLayer; }))
            .reduce((/**
         * @param {?} prev
         * @param {?} current
         * @return {?}
         */
        function (prev, current) {
            return prev.zIndex > current.zIndex ? prev : current;
        }), { zIndex: undefined, id: undefined });
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
            var layerOptions = ((/** @type {?} */ (layer.options))) || {};
            /** @type {?} */
            var dataSourceOptions = layer.dataSource.options || {};
            /** @type {?} */
            var metadata = layerOptions.metadata || ((/** @type {?} */ ({})));
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
                var localKeyword = keyword
                    .normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, '');
                /** @type {?} */
                var layerTitle = layer.title
                    .normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, '');
                /** @type {?} */
                var dataSourceType = dataSourceOptions.type || '';
                /** @type {?} */
                var keywordRegex_1 = new RegExp(localKeyword, 'gi');
                /** @type {?} */
                var keywordInList = layerKeywords.find((/**
                 * @param {?} kw
                 * @return {?}
                 */
                function (kw) { return keywordRegex_1.test(kw); })) !==
                    undefined;
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
    };
    LayerListComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-layer-list',
                    template: "<igo-list [navigation]=\"false\" [selection]=\"false\">\r\n  <mat-list-item *ngIf=\"showToolbar$ | async\">\r\n    <ng-container>\r\n      <mat-form-field class=\"inputFilter\" [floatLabel]=\"floatLabel\">\r\n        <input\r\n          matInput\r\n          [placeholder]=\"'igo.geo.layer.filterPlaceholder' | translate\"\r\n          [matTooltip]=\"'igo.geo.layer.subsetLayersListKeyword' | translate\"\r\n          matTooltipShowDelay=\"500\"\r\n          type=\"text\" [(ngModel)]=\"keyword\">\r\n        <button\r\n          mat-button\r\n          *ngIf=\"keyword\"\r\n          matSuffix\r\n          mat-icon-button\r\n          aria-label=\"Clear\"\r\n          color=\"warn\"\r\n          (click)=\"clearKeyword()\">\r\n          <mat-icon svgIcon=\"close\"></mat-icon>\r\n        </button>\r\n      </mat-form-field>\r\n      <button\r\n        *ngIf=\"!sortedAlpha\"\r\n        mat-icon-button\r\n        [matTooltip]=\"'igo.geo.layer.sortAlphabetically' | translate\"\r\n        matTooltipShowDelay=\"500\"\r\n        (click)=\"toggleSort(true)\">\r\n        <mat-icon color=\"primary\" svgIcon=\"sort-alphabetical\"></mat-icon>\r\n      </button>\r\n      <button\r\n        *ngIf=\"sortedAlpha\"\r\n        mat-icon-button\r\n        [matTooltip]=\"'igo.geo.layer.sortMapOrder' | translate\"\r\n        matTooltipShowDelay=\"500\"\r\n        (click)=\"toggleSort(false)\">\r\n        <mat-icon color=\"warn\" svgIcon=\"sort-variant-remove\"></mat-icon>\r\n      </button>\r\n      <div [matTooltip]=\"onlyVisible ?\r\n        ('igo.geo.layer.resetLayersList' | translate) :\r\n        ('igo.geo.layer.subsetLayersListOnlyVisible' | translate)\"\r\n        matTooltipShowDelay=\"500\">\r\n        <button\r\n          mat-icon-button\r\n          [disabled]=\"layersAreAllVisible && !onlyVisible\"\r\n          [color]=\"onlyVisible ? 'warn' : 'primary'\"\r\n          (click)=\"toggleOnlyVisible()\">\r\n          <mat-icon\r\n          [svgIcon]=\"onlyVisible ? 'sort-variant-remove' : 'eye'\"></mat-icon>\r\n        </button>\r\n      </div>\r\n      <div [matTooltip]=\"onlyInRange ?\r\n        ('igo.geo.layer.resetLayersList' | translate) :\r\n        ('igo.geo.layer.subsetLayersListOnlyInRange' | translate)\"\r\n        matTooltipShowDelay=\"500\">\r\n        <button\r\n          mat-icon-button\r\n          [disabled]=\"layersAreAllInRange && !onlyInRange\"\r\n          [color]=\"onlyInRange ? 'warn' : 'primary'\"\r\n          (click)=\"toggleOnlyInRange()\">\r\n          <mat-icon\r\n          [svgIcon]=\"onlyInRange ? 'sort-variant-remove' : 'playlist-check'\"></mat-icon>\r\n        </button>\r\n      </div>\r\n    </ng-container>\r\n  </mat-list-item>\r\n\r\n  <ng-template ngFor let-layer let-i=\"index\" [ngForOf]=\"layers$ | async\">\r\n    <igo-layer-item *ngIf=\"!(excludeBaseLayers && layer.baseLayer)\"\r\n        igoListItem\r\n        [layer]=\"layer\"\r\n        [orderable]=\"orderable && !layer.baseLayer\"\r\n        [lowerDisabled]=\"getLowerLayer().id === layer.id\"\r\n        [raiseDisabled]=\"getUpperLayer().id === layer.id\"\r\n        [queryBadge]=\"queryBadge\"\r\n        [expandLegendIfVisible]=\"expandLegendOfVisibleLayers\"\r\n        [updateLegendOnResolutionChange]=\"updateLegendOnResolutionChange\"\r\n        [toggleLegendOnVisibilityChange]=\"toggleLegendOnVisibilityChange\">\r\n\r\n        <ng-container igoLayerItemToolbar\r\n          [ngTemplateOutlet]=\"templateLayerToolbar\"\r\n          [ngTemplateOutletContext]=\"{layer: layer}\">\r\n        </ng-container>\r\n\r\n    </igo-layer-item>\r\n  </ng-template>\r\n</igo-list>\r\n",
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
    return LayerListComponent;
}());
export { LayerListComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5ZXItbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvbGF5ZXIvbGF5ZXItbGlzdC9sYXllci1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsdUJBQXVCLEVBQ3ZCLFdBQVcsRUFDWCxZQUFZLEVBR2IsTUFBTSxlQUFlLENBQUM7QUFJdkIsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDMUQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDeEQsT0FBTyxFQUNMLGVBQWUsRUFDZixhQUFhLEVBRWIsS0FBSyxFQUNMLEtBQUssRUFDTixNQUFNLE1BQU0sQ0FBQztBQUNkLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7QUFPMUM7SUE0R0UsNEJBQW9CLGdCQUFrQztRQUFsQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBckd0RCxjQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLDZCQUF3QixHQUFHLENBQUMsQ0FBQztRQUU3QixZQUFPLEdBQTZCLElBQUksZUFBZSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRTVELFlBQU8sR0FBRyxJQUFJLGFBQWEsQ0FBTyxDQUFDLENBQUMsQ0FBQztRQUVyQyxpQkFBWSxHQUE2QixJQUFJLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQU0zRCx3QkFBbUIsR0FBWSxJQUFJLENBQUM7UUFFcEMsd0JBQW1CLEdBQVksSUFBSSxDQUFDO1FBWXBDLGVBQVUsR0FBbUIsTUFBTSxDQUFDO1FBRXBDLDhCQUF5QixHQUFRLEVBQUUsQ0FBQztRQUVwQyxzQkFBaUIsR0FBWSxLQUFLLENBQUM7UUFFbkMsbUNBQThCLEdBQVksS0FBSyxDQUFDO1FBRWhELGdDQUEyQixHQUFZLEtBQUssQ0FBQztR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QUM7U0FDcEM7UUFDRCxJQUNFLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxXQUFXO1lBQzFDLENBQUMsSUFBSSxDQUFDLHNCQUFzQjtZQUM1QixDQUFDLElBQUksQ0FBQyxtQkFBbUIsRUFDekI7WUFDQSxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxXQUFXLENBQUM7WUFDOUQsSUFBSSxDQUFDLHNCQUFzQixHQUFHLElBQUksQ0FBQztTQUNwQztJQUNILENBQUM7O2dCQTlURixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGdCQUFnQjtvQkFDMUIsZ2lIQUEwQztvQkFFMUMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2lCQUNoRDs7OztnQkFwQlEsZ0JBQWdCOzs7dUNBaUN0QixZQUFZLFNBQUMscUJBQXFCO3NDQUVsQyxLQUFLO3NDQUVMLEtBQUs7eUJBRUwsS0FBSzs2QkFVTCxLQUFLOzRDQUVMLEtBQUs7b0NBRUwsS0FBSztpREFFTCxLQUFLOzhDQUVMLEtBQUs7aURBRUwsS0FBSzs2QkFFTCxLQUFLOztJQWlSUix5QkFBQztDQUFBLEFBL1RELElBK1RDO1NBelRZLGtCQUFrQjs7O0lBQzdCLHVDQUFpQjs7SUFDakIsc0RBQTZCOztJQUU3QixxQ0FBNEQ7O0lBRTVELHFDQUFxQzs7SUFFckMsMENBQW9FOzs7OztJQUVwRSxzQ0FBK0I7O0lBRS9CLGtEQUE0RTs7SUFFNUUsaURBQTZDOztJQUU3QyxpREFBNkM7Ozs7O0lBVTdDLHFDQUF5Qjs7SUFFekIsd0NBQTZDOztJQUU3Qyx1REFBNkM7O0lBRTdDLCtDQUE0Qzs7SUFFNUMsNERBQXlEOztJQUV6RCx5REFBc0Q7O0lBRXRELDREQUF5RDs7SUFFekQsd0NBQXFDOzs7OztJQThEekIsOENBQTBDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgSW5wdXQsXHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbiAgVGVtcGxhdGVSZWYsXHJcbiAgQ29udGVudENoaWxkLFxyXG4gIE9uSW5pdCxcclxuICBPbkRlc3Ryb3lcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRmxvYXRMYWJlbFR5cGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XHJcblxyXG5pbXBvcnQgeyBMYXllciB9IGZyb20gJy4uL3NoYXJlZCc7XHJcbmltcG9ydCB7IExheWVyTGlzdENvbnRyb2xzRW51bSB9IGZyb20gJy4vbGF5ZXItbGlzdC5lbnVtJztcclxuaW1wb3J0IHsgTGF5ZXJMaXN0U2VydmljZSB9IGZyb20gJy4vbGF5ZXItbGlzdC5zZXJ2aWNlJztcclxuaW1wb3J0IHtcclxuICBCZWhhdmlvclN1YmplY3QsXHJcbiAgUmVwbGF5U3ViamVjdCxcclxuICBTdWJzY3JpcHRpb24sXHJcbiAgRU1QVFksXHJcbiAgdGltZXJcclxufSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgZGVib3VuY2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7XHJcbiAgTWV0YWRhdGFPcHRpb25zLFxyXG4gIE1ldGFkYXRhTGF5ZXJPcHRpb25zXHJcbn0gZnJvbSAnLi4vLi4vbWV0YWRhdGEvc2hhcmVkL21ldGFkYXRhLmludGVyZmFjZSc7XHJcblxyXG4vLyBUT0RPOiBUaGlzIGNsYXNzIGNvdWxkIHVzZSBhIGNsZWFuIHVwLiBBbHNvLCBzb21lIG1ldGhvZHMgY291bGQgYmUgbW92ZWQgZWFsc2V3aGVyZVxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2lnby1sYXllci1saXN0JyxcclxuICB0ZW1wbGF0ZVVybDogJy4vbGF5ZXItbGlzdC5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vbGF5ZXItbGlzdC5jb21wb25lbnQuc2NzcyddLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBMYXllckxpc3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcbiAgb3JkZXJhYmxlID0gdHJ1ZTtcclxuICB0aHJlc2hvbGRUb0ZpbHRlckFuZFNvcnQgPSA1O1xyXG5cclxuICBsYXllcnMkOiBCZWhhdmlvclN1YmplY3Q8TGF5ZXJbXT4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KFtdKTtcclxuXHJcbiAgY2hhbmdlJCA9IG5ldyBSZXBsYXlTdWJqZWN0PHZvaWQ+KDEpO1xyXG5cclxuICBzaG93VG9vbGJhciQ6IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPiA9IG5ldyBCZWhhdmlvclN1YmplY3QoZmFsc2UpO1xyXG5cclxuICBwcml2YXRlIGNoYW5nZSQkOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIEBDb250ZW50Q2hpbGQoJ2lnb0xheWVySXRlbVRvb2xiYXInKSB0ZW1wbGF0ZUxheWVyVG9vbGJhcjogVGVtcGxhdGVSZWY8YW55PjtcclxuXHJcbiAgQElucHV0KCkgbGF5ZXJzQXJlQWxsVmlzaWJsZTogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gIEBJbnB1dCgpIGxheWVyc0FyZUFsbEluUmFuZ2U6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIHNldCBsYXllcnModmFsdWU6IExheWVyW10pIHtcclxuICAgIHRoaXMuX2xheWVycyA9IHZhbHVlO1xyXG4gICAgdGhpcy5uZXh0KCk7XHJcbiAgfVxyXG4gIGdldCBsYXllcnMoKTogTGF5ZXJbXSB7XHJcbiAgICByZXR1cm4gdGhpcy5fbGF5ZXJzO1xyXG4gIH1cclxuICBwcml2YXRlIF9sYXllcnM6IExheWVyW107XHJcblxyXG4gIEBJbnB1dCgpIGZsb2F0TGFiZWw6IEZsb2F0TGFiZWxUeXBlID0gJ2F1dG8nO1xyXG5cclxuICBASW5wdXQoKSBsYXllckZpbHRlckFuZFNvcnRPcHRpb25zOiBhbnkgPSB7fTtcclxuXHJcbiAgQElucHV0KCkgZXhjbHVkZUJhc2VMYXllcnM6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgQElucHV0KCkgdG9nZ2xlTGVnZW5kT25WaXNpYmlsaXR5Q2hhbmdlOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIEBJbnB1dCgpIGV4cGFuZExlZ2VuZE9mVmlzaWJsZUxheWVyczogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICBASW5wdXQoKSB1cGRhdGVMZWdlbmRPblJlc29sdXRpb25DaGFuZ2U6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgQElucHV0KCkgcXVlcnlCYWRnZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICBnZXQga2V5d29yZCgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMubGF5ZXJMaXN0U2VydmljZS5rZXl3b3JkO1xyXG4gIH1cclxuICBzZXQga2V5d29yZCh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICB0aGlzLmxheWVyTGlzdFNlcnZpY2Uua2V5d29yZCA9IHZhbHVlO1xyXG4gICAgdGhpcy5uZXh0KCk7XHJcbiAgfVxyXG5cclxuICBnZXQga2V5d29yZEluaXRpYWxpemVkKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMubGF5ZXJMaXN0U2VydmljZS5rZXl3b3JkSW5pdGlhbGl6ZWQ7XHJcbiAgfVxyXG4gIHNldCBrZXl3b3JkSW5pdGlhbGl6ZWQodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMubGF5ZXJMaXN0U2VydmljZS5rZXl3b3JkSW5pdGlhbGl6ZWQgPSB2YWx1ZTtcclxuICB9XHJcblxyXG4gIGdldCBvbmx5VmlzaWJsZSgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLmxheWVyTGlzdFNlcnZpY2Uub25seVZpc2libGU7XHJcbiAgfVxyXG4gIHNldCBvbmx5VmlzaWJsZSh2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgdGhpcy5sYXllckxpc3RTZXJ2aWNlLm9ubHlWaXNpYmxlID0gdmFsdWU7XHJcbiAgICB0aGlzLm5leHQoKTtcclxuICB9XHJcblxyXG4gIGdldCBvbmx5VmlzaWJsZUluaXRpYWxpemVkKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMubGF5ZXJMaXN0U2VydmljZS5vbmx5VmlzaWJsZUluaXRpYWxpemVkO1xyXG4gIH1cclxuICBzZXQgb25seVZpc2libGVJbml0aWFsaXplZCh2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgdGhpcy5sYXllckxpc3RTZXJ2aWNlLm9ubHlWaXNpYmxlSW5pdGlhbGl6ZWQgPSB2YWx1ZTtcclxuICB9XHJcblxyXG4gIGdldCBvbmx5SW5SYW5nZSgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLmxheWVyTGlzdFNlcnZpY2Uub25seUluUmFuZ2U7XHJcbiAgfVxyXG4gIHNldCBvbmx5SW5SYW5nZSh2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgdGhpcy5sYXllckxpc3RTZXJ2aWNlLm9ubHlJblJhbmdlID0gdmFsdWU7XHJcbiAgICB0aGlzLm5leHQoKTtcclxuICB9XHJcblxyXG4gIGdldCBvbmx5SW5SYW5nZUluaXRpYWxpemVkKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMubGF5ZXJMaXN0U2VydmljZS5vbmx5SW5SYW5nZUluaXRpYWxpemVkO1xyXG4gIH1cclxuICBzZXQgb25seUluUmFuZ2VJbml0aWFsaXplZCh2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgdGhpcy5sYXllckxpc3RTZXJ2aWNlLm9ubHlJblJhbmdlSW5pdGlhbGl6ZWQgPSB2YWx1ZTtcclxuICB9XHJcblxyXG4gIGdldCBzb3J0ZWRBbHBoYSgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLmxheWVyTGlzdFNlcnZpY2Uuc29ydGVkQWxwaGE7XHJcbiAgfVxyXG4gIHNldCBzb3J0ZWRBbHBoYSh2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgdGhpcy5sYXllckxpc3RTZXJ2aWNlLnNvcnRlZEFscGhhID0gdmFsdWU7XHJcbiAgICB0aGlzLm5leHQoKTtcclxuICB9XHJcblxyXG4gIGdldCBzb3J0ZWRBbHBoYUluaXRpYWxpemVkKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMubGF5ZXJMaXN0U2VydmljZS5zb3J0ZWRBbHBoYUluaXRpYWxpemVkO1xyXG4gIH1cclxuICBzZXQgc29ydGVkQWxwaGFJbml0aWFsaXplZCh2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgdGhpcy5sYXllckxpc3RTZXJ2aWNlLnNvcnRlZEFscGhhSW5pdGlhbGl6ZWQgPSB2YWx1ZTtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbGF5ZXJMaXN0U2VydmljZTogTGF5ZXJMaXN0U2VydmljZSkge31cclxuXHJcbiAgLyoqXHJcbiAgICogU3Vic2NyaWJlIHRvIHRoZSBzZWFyY2ggdGVybSBzdHJlYW0gYW5kIHRyaWdnZXIgcmVzZWFyY2hlc1xyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5jaGFuZ2UkJCA9IHRoaXMuY2hhbmdlJFxyXG4gICAgICAucGlwZShcclxuICAgICAgICBkZWJvdW5jZSgoKSA9PiB7XHJcbiAgICAgICAgICByZXR1cm4gdGhpcy5sYXllcnMubGVuZ3RoID09PSAwID8gRU1QVFkgOiB0aW1lcig1MCk7XHJcbiAgICAgICAgfSlcclxuICAgICAgKVxyXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICB0aGlzLnNob3dUb29sYmFyJC5uZXh0KHRoaXMuY29tcHV0ZVNob3dUb29sYmFyKCkpO1xyXG4gICAgICAgIHRoaXMubGF5ZXJzJC5uZXh0KHRoaXMuY29tcHV0ZUxheWVycyh0aGlzLmxheWVycy5zbGljZSgwKSkpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICB0aGlzLmluaXRMYXllckZpbHRlckFuZFNvcnRPcHRpb25zKCk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMuY2hhbmdlJCQudW5zdWJzY3JpYmUoKTtcclxuICB9XHJcblxyXG4gIHRvZ2dsZU9ubHlWaXNpYmxlKCkge1xyXG4gICAgdGhpcy5vbmx5VmlzaWJsZSA9ICF0aGlzLm9ubHlWaXNpYmxlO1xyXG4gIH1cclxuXHJcbiAgdG9nZ2xlT25seUluUmFuZ2UoKSB7XHJcbiAgICB0aGlzLm9ubHlJblJhbmdlID0gIXRoaXMub25seUluUmFuZ2U7XHJcbiAgfVxyXG5cclxuICB0b2dnbGVTb3J0KHNvcnRBbHBoYTogYm9vbGVhbikge1xyXG4gICAgdGhpcy5zb3J0ZWRBbHBoYSA9IHNvcnRBbHBoYTtcclxuICB9XHJcblxyXG4gIGNsZWFyS2V5d29yZCgpIHtcclxuICAgIHRoaXMua2V5d29yZCA9IHVuZGVmaW5lZDtcclxuICB9XHJcblxyXG4gIGdldExvd2VyTGF5ZXIoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5sYXllcnNcclxuICAgICAgLmZpbHRlcihsID0+ICFsLmJhc2VMYXllcilcclxuICAgICAgLnJlZHVjZShcclxuICAgICAgICAocHJldiwgY3VycmVudCkgPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIHByZXYuekluZGV4IDwgY3VycmVudC56SW5kZXggPyBwcmV2IDogY3VycmVudDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHsgekluZGV4OiB1bmRlZmluZWQsIGlkOiB1bmRlZmluZWQgfVxyXG4gICAgICApO1xyXG4gIH1cclxuXHJcbiAgZ2V0VXBwZXJMYXllcigpIHtcclxuICAgIHJldHVybiB0aGlzLmxheWVyc1xyXG4gICAgICAuZmlsdGVyKGwgPT4gIWwuYmFzZUxheWVyKVxyXG4gICAgICAucmVkdWNlKFxyXG4gICAgICAgIChwcmV2LCBjdXJyZW50KSA9PiB7XHJcbiAgICAgICAgICByZXR1cm4gcHJldi56SW5kZXggPiBjdXJyZW50LnpJbmRleCA/IHByZXYgOiBjdXJyZW50O1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgeyB6SW5kZXg6IHVuZGVmaW5lZCwgaWQ6IHVuZGVmaW5lZCB9XHJcbiAgICAgICk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG5leHQoKSB7XHJcbiAgICB0aGlzLmNoYW5nZSQubmV4dCgpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjb21wdXRlTGF5ZXJzKGxheWVyczogTGF5ZXJbXSk6IExheWVyW10ge1xyXG4gICAgbGV0IGxheWVyc091dCA9IHRoaXMuZmlsdGVyTGF5ZXJzKGxheWVycyk7XHJcbiAgICBpZiAodGhpcy5zb3J0ZWRBbHBoYSkge1xyXG4gICAgICBsYXllcnNPdXQgPSB0aGlzLnNvcnRMYXllcnNCeVRpdGxlKGxheWVyc091dCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBsYXllcnNPdXQgPSB0aGlzLnNvcnRMYXllcnNCeVppbmRleChsYXllcnNPdXQpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGxheWVyc091dDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZmlsdGVyTGF5ZXJzKGxheWVyczogTGF5ZXJbXSk6IExheWVyW10ge1xyXG4gICAgY29uc3Qga2V5d29yZCA9IHRoaXMua2V5d29yZDtcclxuICAgIGlmIChcclxuICAgICAgdGhpcy5sYXllckZpbHRlckFuZFNvcnRPcHRpb25zLnNob3dUb29sYmFyID09PSBMYXllckxpc3RDb250cm9sc0VudW0ubmV2ZXJcclxuICAgICkge1xyXG4gICAgICByZXR1cm4gbGF5ZXJzO1xyXG4gICAgfVxyXG4gICAgaWYgKCFrZXl3b3JkICYmICF0aGlzLm9ubHlJblJhbmdlICYmICF0aGlzLm9ubHlWaXNpYmxlKSB7XHJcbiAgICAgIHJldHVybiBsYXllcnM7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qga2VlcExheWVySWRzID0gbGF5ZXJzLm1hcCgobGF5ZXI6IExheWVyKSA9PiBsYXllci5pZCk7XHJcblxyXG4gICAgbGF5ZXJzLmZvckVhY2goKGxheWVyOiBMYXllcikgPT4ge1xyXG4gICAgICBjb25zdCBsYXllck9wdGlvbnMgPSAobGF5ZXIub3B0aW9ucyBhcyBNZXRhZGF0YUxheWVyT3B0aW9ucykgfHwge307XHJcbiAgICAgIGNvbnN0IGRhdGFTb3VyY2VPcHRpb25zID0gbGF5ZXIuZGF0YVNvdXJjZS5vcHRpb25zIHx8IHt9O1xyXG4gICAgICBjb25zdCBtZXRhZGF0YSA9IGxheWVyT3B0aW9ucy5tZXRhZGF0YSB8fCAoe30gYXMgTWV0YWRhdGFPcHRpb25zKTtcclxuICAgICAgY29uc3Qga2V5d29yZHMgPSBtZXRhZGF0YS5rZXl3b3JkTGlzdCB8fCBbXTtcclxuICAgICAgY29uc3QgbGF5ZXJLZXl3b3JkcyA9IGtleXdvcmRzLm1hcCgoa3c6IHN0cmluZykgPT4ge1xyXG4gICAgICAgIHJldHVybiBrdy5ub3JtYWxpemUoJ05GRCcpLnJlcGxhY2UoL1tcXHUwMzAwLVxcdTAzNmZdL2csICcnKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBpZiAoa2V5d29yZCkge1xyXG4gICAgICAgIGNvbnN0IGxvY2FsS2V5d29yZCA9IGtleXdvcmRcclxuICAgICAgICAgIC5ub3JtYWxpemUoJ05GRCcpXHJcbiAgICAgICAgICAucmVwbGFjZSgvW1xcdTAzMDAtXFx1MDM2Zl0vZywgJycpO1xyXG4gICAgICAgIGNvbnN0IGxheWVyVGl0bGUgPSBsYXllci50aXRsZVxyXG4gICAgICAgICAgLm5vcm1hbGl6ZSgnTkZEJylcclxuICAgICAgICAgIC5yZXBsYWNlKC9bXFx1MDMwMC1cXHUwMzZmXS9nLCAnJyk7XHJcbiAgICAgICAgY29uc3QgZGF0YVNvdXJjZVR5cGUgPSBkYXRhU291cmNlT3B0aW9ucy50eXBlIHx8ICcnO1xyXG4gICAgICAgIGNvbnN0IGtleXdvcmRSZWdleCA9IG5ldyBSZWdFeHAobG9jYWxLZXl3b3JkLCAnZ2knKTtcclxuICAgICAgICBjb25zdCBrZXl3b3JkSW5MaXN0ID1cclxuICAgICAgICAgIGxheWVyS2V5d29yZHMuZmluZCgoa3c6IHN0cmluZykgPT4ga2V5d29yZFJlZ2V4LnRlc3Qoa3cpKSAhPT1cclxuICAgICAgICAgIHVuZGVmaW5lZDtcclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICAha2V5d29yZFJlZ2V4LnRlc3QobGF5ZXJUaXRsZSkgJiZcclxuICAgICAgICAgICEoa2V5d29yZC50b0xvd2VyQ2FzZSgpID09PSBkYXRhU291cmNlVHlwZS50b0xvd2VyQ2FzZSgpKSAmJlxyXG4gICAgICAgICAgIWtleXdvcmRJbkxpc3RcclxuICAgICAgICApIHtcclxuICAgICAgICAgIGNvbnN0IGluZGV4ID0ga2VlcExheWVySWRzLmluZGV4T2YobGF5ZXIuaWQpO1xyXG4gICAgICAgICAgaWYgKGluZGV4ID4gLTEpIHtcclxuICAgICAgICAgICAga2VlcExheWVySWRzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAodGhpcy5vbmx5VmlzaWJsZSAmJiBsYXllci52aXNpYmxlID09PSBmYWxzZSkge1xyXG4gICAgICAgIGNvbnN0IGluZGV4ID0ga2VlcExheWVySWRzLmluZGV4T2YobGF5ZXIuaWQpO1xyXG4gICAgICAgIGlmIChpbmRleCA+IC0xKSB7XHJcbiAgICAgICAgICBrZWVwTGF5ZXJJZHMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICh0aGlzLm9ubHlJblJhbmdlICYmIGxheWVyLmlzSW5SZXNvbHV0aW9uc1JhbmdlID09PSBmYWxzZSkge1xyXG4gICAgICAgIGNvbnN0IGluZGV4ID0ga2VlcExheWVySWRzLmluZGV4T2YobGF5ZXIuaWQpO1xyXG4gICAgICAgIGlmIChpbmRleCA+IC0xKSB7XHJcbiAgICAgICAgICBrZWVwTGF5ZXJJZHMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBsYXllcnMuZmlsdGVyKFxyXG4gICAgICAobGF5ZXI6IExheWVyKSA9PiBrZWVwTGF5ZXJJZHMuaW5kZXhPZihsYXllci5pZCkgIT09IC0xXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzb3J0TGF5ZXJzQnlaaW5kZXgobGF5ZXJzOiBMYXllcltdKSB7XHJcbiAgICByZXR1cm4gbGF5ZXJzLnNvcnQoKGxheWVyMSwgbGF5ZXIyKSA9PiBsYXllcjIuekluZGV4IC0gbGF5ZXIxLnpJbmRleCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHNvcnRMYXllcnNCeVRpdGxlKGxheWVyczogTGF5ZXJbXSkge1xyXG4gICAgcmV0dXJuIGxheWVycy5zb3J0KChhLCBiKSA9PiB7XHJcbiAgICAgIGlmIChhLnRpdGxlIDwgYi50aXRsZSkge1xyXG4gICAgICAgIHJldHVybiAtMTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoYS50aXRsZSA+IGIudGl0bGUpIHtcclxuICAgICAgICByZXR1cm4gMTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gMDtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjb21wdXRlU2hvd1Rvb2xiYXIoKTogYm9vbGVhbiB7XHJcbiAgICBzd2l0Y2ggKHRoaXMubGF5ZXJGaWx0ZXJBbmRTb3J0T3B0aW9ucy5zaG93VG9vbGJhcikge1xyXG4gICAgICBjYXNlIExheWVyTGlzdENvbnRyb2xzRW51bS5hbHdheXM6XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIGNhc2UgTGF5ZXJMaXN0Q29udHJvbHNFbnVtLm5ldmVyOlxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICB0aGlzLmxheWVycy5sZW5ndGggPj0gdGhpcy50aHJlc2hvbGRUb0ZpbHRlckFuZFNvcnQgfHxcclxuICAgICAgICAgIHRoaXMua2V5d29yZCB8fFxyXG4gICAgICAgICAgdGhpcy5vbmx5SW5SYW5nZSB8fFxyXG4gICAgICAgICAgdGhpcy5vbmx5VmlzaWJsZVxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgaW5pdExheWVyRmlsdGVyQW5kU29ydE9wdGlvbnMoKSB7XHJcbiAgICBpZiAodGhpcy5sYXllckZpbHRlckFuZFNvcnRPcHRpb25zLnRvb2xiYXJUaHJlc2hvbGQpIHtcclxuICAgICAgdGhpcy50aHJlc2hvbGRUb0ZpbHRlckFuZFNvcnQgPSB0aGlzLmxheWVyRmlsdGVyQW5kU29ydE9wdGlvbnMudG9vbGJhclRocmVzaG9sZDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5sYXllckZpbHRlckFuZFNvcnRPcHRpb25zLmtleXdvcmQgJiYgIXRoaXMua2V5d29yZEluaXRpYWxpemVkKSB7XHJcbiAgICAgIHRoaXMua2V5d29yZCA9IHRoaXMubGF5ZXJGaWx0ZXJBbmRTb3J0T3B0aW9ucy5rZXl3b3JkO1xyXG4gICAgICB0aGlzLmtleXdvcmRJbml0aWFsaXplZCA9IHRydWU7XHJcbiAgICB9XHJcbiAgICBpZiAoXHJcbiAgICAgIHRoaXMubGF5ZXJGaWx0ZXJBbmRTb3J0T3B0aW9ucy5zb3J0ZWRBbHBoYSAmJlxyXG4gICAgICAhdGhpcy5zb3J0ZWRBbHBoYUluaXRpYWxpemVkXHJcbiAgICApIHtcclxuICAgICAgdGhpcy5zb3J0ZWRBbHBoYSA9IHRoaXMubGF5ZXJGaWx0ZXJBbmRTb3J0T3B0aW9ucy5zb3J0ZWRBbHBoYTtcclxuICAgICAgdGhpcy5zb3J0ZWRBbHBoYUluaXRpYWxpemVkID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIGlmIChcclxuICAgICAgdGhpcy5sYXllckZpbHRlckFuZFNvcnRPcHRpb25zLm9ubHlWaXNpYmxlICYmXHJcbiAgICAgICF0aGlzLm9ubHlWaXNpYmxlSW5pdGlhbGl6ZWQgJiZcclxuICAgICAgIXRoaXMubGF5ZXJzQXJlQWxsVmlzaWJsZVxyXG4gICAgKSB7XHJcbiAgICAgIHRoaXMub25seVZpc2libGUgPSB0aGlzLmxheWVyRmlsdGVyQW5kU29ydE9wdGlvbnMub25seVZpc2libGU7XHJcbiAgICAgIHRoaXMub25seVZpc2libGVJbml0aWFsaXplZCA9IHRydWU7XHJcbiAgICB9XHJcbiAgICBpZiAoXHJcbiAgICAgIHRoaXMubGF5ZXJGaWx0ZXJBbmRTb3J0T3B0aW9ucy5vbmx5SW5SYW5nZSAmJlxyXG4gICAgICAhdGhpcy5vbmx5SW5SYW5nZUluaXRpYWxpemVkICYmXHJcbiAgICAgICF0aGlzLmxheWVyc0FyZUFsbEluUmFuZ2VcclxuICAgICkge1xyXG4gICAgICB0aGlzLm9ubHlJblJhbmdlID0gdGhpcy5sYXllckZpbHRlckFuZFNvcnRPcHRpb25zLm9ubHlJblJhbmdlO1xyXG4gICAgICB0aGlzLm9ubHlJblJhbmdlSW5pdGlhbGl6ZWQgPSB0cnVlO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=
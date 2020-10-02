/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input, ChangeDetectionStrategy, TemplateRef, ContentChild, Output, EventEmitter, ElementRef } from '@angular/core';
import { LayerListControlsEnum } from './layer-list.enum';
import { BehaviorSubject, ReplaySubject, EMPTY, timer } from 'rxjs';
import { debounce } from 'rxjs/operators';
import { IgoMap } from '../../map/shared/map';
// TODO: This class could use a clean up. Also, some methods could be moved ealsewhere
var LayerListComponent = /** @class */ (function () {
    function LayerListComponent(elRef) {
        this.elRef = elRef;
        this.orderable = true;
        this.thresholdToFilterAndSort = 5;
        this.layers$ = new BehaviorSubject([]);
        this.change$ = new ReplaySubject(1);
        this.showToolbar$ = new BehaviorSubject(false);
        this.activeLayer$ = new BehaviorSubject(undefined);
        this.layersChecked = [];
        this.layersAreAllVisible = true;
        this.ogcButton = true;
        this.timeButton = true;
        this.floatLabel = 'auto';
        this.layerFilterAndSortOptions = {};
        this.excludeBaseLayers = false;
        this.toggleLegendOnVisibilityChange = false;
        this.expandLegendOfVisibleLayers = false;
        this.updateLegendOnResolutionChange = false;
        this.queryBadge = false;
        this.appliedFilterAndSort = new EventEmitter();
        this._keyword = undefined;
        this._onlyVisible = false;
        this._sortedAlpha = false;
        this.toggleOpacity = false;
        this.selectAllCheck$ = new BehaviorSubject(undefined);
    }
    Object.defineProperty(LayerListComponent.prototype, "map", {
        get: /**
         * @return {?}
         */
        function () {
            return this._map;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._map = value;
        },
        enumerable: true,
        configurable: true
    });
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
    Object.defineProperty(LayerListComponent.prototype, "activeLayer", {
        get: /**
         * @return {?}
         */
        function () {
            return this._activeLayer;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._activeLayer = value;
            this.activeLayer$.next(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayerListComponent.prototype, "keyword", {
        get: /**
         * @return {?}
         */
        function () {
            return this._keyword;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._keyword = value;
            this.next();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayerListComponent.prototype, "onlyVisible", {
        get: /**
         * @return {?}
         */
        function () {
            return this._onlyVisible;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._onlyVisible = value;
            this.next();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayerListComponent.prototype, "sortAlpha", {
        get: /**
         * @return {?}
         */
        function () {
            return this._sortedAlpha;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._sortedAlpha = value;
            this.next();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayerListComponent.prototype, "opacity", {
        get: /**
         * @return {?}
         */
        function () {
            return Math.round(this.activeLayer$.getValue().opacity * 100);
        },
        set: /**
         * @param {?} opacity
         * @return {?}
         */
        function (opacity) {
            this.activeLayer$.getValue().opacity = opacity / 100;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayerListComponent.prototype, "badgeOpacity", {
        get: /**
         * @return {?}
         */
        function () {
            if (this.opacity === 100) {
                return;
            }
            return this.opacity;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayerListComponent.prototype, "raiseDisabled", {
        get: /**
         * @return {?}
         */
        function () {
            if (!this.orderable || this.activeLayer.baseLayer || this.getUpperLayer().id === this.activeLayer.id ||
                this.isUpperBaselayer(this.activeLayer)) {
                return true;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayerListComponent.prototype, "lowerDisabled", {
        get: /**
         * @return {?}
         */
        function () {
            if (!this.orderable || this.activeLayer.baseLayer || this.getLowerLayer().id === this.activeLayer.id ||
                this.isLowerBaselayer(this.activeLayer)) {
                return true;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayerListComponent.prototype, "raiseDisabledSelection", {
        get: /**
         * @return {?}
         */
        function () {
            if (this.layersChecked.length === 0 || !this.orderable || !this.raisableLayers(this.layersChecked) || this.selectAllCheck === true) {
                return true;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayerListComponent.prototype, "lowerDisabledSelection", {
        get: /**
         * @return {?}
         */
        function () {
            if (this.layersChecked.length === 0 || !this.orderable || !this.lowerableLayers(this.layersChecked) || this.selectAllCheck === true) {
                return true;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayerListComponent.prototype, "checkOpacity", {
        get: /**
         * @return {?}
         */
        function () {
            return this.layersCheckedOpacity() * 100;
        },
        set: /**
         * @param {?} opacity
         * @return {?}
         */
        function (opacity) {
            var e_1, _a;
            try {
                for (var _b = tslib_1.__values(this.layersChecked), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var layer = _c.value;
                    layer.opacity = opacity / 100;
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
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
            _this.appliedFilterAndSort.emit({
                keyword: _this.keyword,
                sortAlpha: _this.sortAlpha,
                onlyVisible: _this.onlyVisible
            });
        }));
        this.selectAllCheck$$ = this.selectAllCheck$.subscribe((/**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            _this.selectAllCheck = value;
        }));
        this.layers$.subscribe((/**
         * @return {?}
         */
        function () {
            var e_2, _a;
            if (_this.layers) {
                /** @type {?} */
                var checks = 0;
                try {
                    for (var _b = tslib_1.__values(_this.layers), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var layer = _c.value;
                        if (layer.options.active) {
                            _this.activeLayer = layer;
                            _this.layerTool = true;
                        }
                        if (layer.options.check) {
                            checks += 1;
                        }
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
                if (_this.excludeBaseLayers) {
                    _this.selectAllCheck = checks === _this.layers.filter((/**
                     * @param {?} lay
                     * @return {?}
                     */
                    function (lay) { return lay.baseLayer !== true && lay.showInLayerList; })).length ? true : false;
                }
                else {
                    _this.selectAllCheck = checks === _this.layers.filter((/**
                     * @param {?} lay
                     * @return {?}
                     */
                    function (lay) { return lay.showInLayerList; })).length ? true : false;
                }
            }
        }));
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
     * @param {?} layer
     * @return {?}
     */
    LayerListComponent.prototype.isLowerBaselayer = /**
     * @param {?} layer
     * @return {?}
     */
    function (layer) {
        /** @type {?} */
        var index = this.layers.findIndex((/**
         * @param {?} lay
         * @return {?}
         */
        function (lay) { return layer.id === lay.id; }));
        if (this.layers && this.layers[index + 1] && this.layers[index + 1].baseLayer === true) {
            return true;
        }
        return false;
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
     * @param {?} layer
     * @return {?}
     */
    LayerListComponent.prototype.isUpperBaselayer = /**
     * @param {?} layer
     * @return {?}
     */
    function (layer) {
        /** @type {?} */
        var index = this.layers.findIndex((/**
         * @param {?} lay
         * @return {?}
         */
        function (lay) { return layer.id === lay.id; }));
        if (this.layers && this.layers[index - 1] && this.layers[index - 1].baseLayer === true) {
            return true;
        }
        return false;
    };
    /*
     * For selection mode disabled attribute
     */
    /*
       * For selection mode disabled attribute
       */
    /**
     * @param {?} layers
     * @return {?}
     */
    LayerListComponent.prototype.raisableLayers = /*
       * For selection mode disabled attribute
       */
    /**
     * @param {?} layers
     * @return {?}
     */
    function (layers) {
        var e_3, _a;
        /** @type {?} */
        var response = false;
        /** @type {?} */
        var base = 0;
        var _loop_1 = function (layer) {
            /** @type {?} */
            var mapIndex = this_1.layers.findIndex((/**
             * @param {?} lay
             * @return {?}
             */
            function (lay) { return layer.id === lay.id; }));
            /** @type {?} */
            var currentLayer = this_1.layers[mapIndex];
            if (currentLayer.baseLayer) {
                base += 1;
            }
            /** @type {?} */
            var previousLayer = this_1.layers[mapIndex - 1];
            if (previousLayer && previousLayer.baseLayer !== true && !layers.find((/**
             * @param {?} lay
             * @return {?}
             */
            function (lay) { return previousLayer.id === lay.id; })) &&
                currentLayer.baseLayer !== true) {
                response = true;
            }
        };
        var this_1 = this;
        try {
            for (var layers_1 = tslib_1.__values(layers), layers_1_1 = layers_1.next(); !layers_1_1.done; layers_1_1 = layers_1.next()) {
                var layer = layers_1_1.value;
                _loop_1(layer);
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (layers_1_1 && !layers_1_1.done && (_a = layers_1.return)) _a.call(layers_1);
            }
            finally { if (e_3) throw e_3.error; }
        }
        if ((this.layersChecked.length === 1 && this.layersChecked[0].baseLayer) || base === this.layersChecked.length) {
            response = false;
        }
        return response;
    };
    /*
     * When multiple layers is selected but some may be allow to move
     */
    /*
       * When multiple layers is selected but some may be allow to move
       */
    /**
     * @param {?} index
     * @return {?}
     */
    LayerListComponent.prototype.raisableLayer = /*
       * When multiple layers is selected but some may be allow to move
       */
    /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        if (index < 1) {
            return false;
        }
        if (this.layers[index - 1].options.check) {
            return this.raisableLayer(index - 1);
        }
        return true;
    };
    /**
     * @param {?} layers
     * @return {?}
     */
    LayerListComponent.prototype.raiseLayers = /**
     * @param {?} layers
     * @return {?}
     */
    function (layers) {
        var _this = this;
        var e_4, _a;
        /** @type {?} */
        var layersToRaise = [];
        var _loop_2 = function (layer) {
            /** @type {?} */
            var index = this_2.layers.findIndex((/**
             * @param {?} lay
             * @return {?}
             */
            function (lay) { return lay.id === layer.id; }));
            if (this_2.raisableLayer(index)) {
                layersToRaise.push(layer);
            }
        };
        var this_2 = this;
        try {
            for (var layers_2 = tslib_1.__values(layers), layers_2_1 = layers_2.next(); !layers_2_1.done; layers_2_1 = layers_2.next()) {
                var layer = layers_2_1.value;
                _loop_2(layer);
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (layers_2_1 && !layers_2_1.done && (_a = layers_2.return)) _a.call(layers_2);
            }
            finally { if (e_4) throw e_4.error; }
        }
        this.map.raiseLayers(layersToRaise);
        setTimeout((/**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var elements = _this.computeElementRef();
            if (!_this.isScrolledIntoView(elements[0], elements[1].offsetParent)) {
                elements[0].scrollTop = elements[1].offsetParent.offsetTop;
            }
        }), 100);
    };
    /*
     * For selection mode disabled attribute
     */
    /*
       * For selection mode disabled attribute
       */
    /**
     * @param {?} layers
     * @return {?}
     */
    LayerListComponent.prototype.lowerableLayers = /*
       * For selection mode disabled attribute
       */
    /**
     * @param {?} layers
     * @return {?}
     */
    function (layers) {
        var e_5, _a;
        /** @type {?} */
        var response = false;
        /** @type {?} */
        var base = 0;
        var _loop_3 = function (layer) {
            /** @type {?} */
            var mapIndex = this_3.layers.findIndex((/**
             * @param {?} lay
             * @return {?}
             */
            function (lay) { return layer.id === lay.id; }));
            /** @type {?} */
            var currentLayer = this_3.layers[mapIndex];
            if (currentLayer.baseLayer) {
                base += 1;
            }
            /** @type {?} */
            var nextLayer = this_3.layers[mapIndex + 1];
            if (nextLayer && nextLayer.baseLayer !== true && !layers.find((/**
             * @param {?} lay
             * @return {?}
             */
            function (lay) { return nextLayer.id === lay.id; }))) {
                response = true;
            }
        };
        var this_3 = this;
        try {
            for (var layers_3 = tslib_1.__values(layers), layers_3_1 = layers_3.next(); !layers_3_1.done; layers_3_1 = layers_3.next()) {
                var layer = layers_3_1.value;
                _loop_3(layer);
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (layers_3_1 && !layers_3_1.done && (_a = layers_3.return)) _a.call(layers_3);
            }
            finally { if (e_5) throw e_5.error; }
        }
        if ((this.layersChecked.length === 1 && this.layersChecked[0].baseLayer) || base === this.layersChecked.length) {
            response = false;
        }
        return response;
    };
    /*
     * When multiple layers is selected but some may be allow to move
     */
    /*
       * When multiple layers is selected but some may be allow to move
       */
    /**
     * @param {?} index
     * @return {?}
     */
    LayerListComponent.prototype.lowerableLayer = /*
       * When multiple layers is selected but some may be allow to move
       */
    /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        if (index > this.layers.filter((/**
         * @param {?} lay
         * @return {?}
         */
        function (lay) { return lay.baseLayer !== true; })).length - 2) {
            return false;
        }
        if (this.layers[index + 1].options.check) {
            return this.lowerableLayer(index + 1);
        }
        return true;
    };
    /**
     * @param {?} layers
     * @return {?}
     */
    LayerListComponent.prototype.lowerLayers = /**
     * @param {?} layers
     * @return {?}
     */
    function (layers) {
        var _this = this;
        var e_6, _a;
        /** @type {?} */
        var layersToLower = [];
        var _loop_4 = function (layer) {
            /** @type {?} */
            var index = this_4.layers.findIndex((/**
             * @param {?} lay
             * @return {?}
             */
            function (lay) { return lay.id === layer.id; }));
            if (this_4.lowerableLayer(index)) {
                layersToLower.push(layer);
            }
        };
        var this_4 = this;
        try {
            for (var layers_4 = tslib_1.__values(layers), layers_4_1 = layers_4.next(); !layers_4_1.done; layers_4_1 = layers_4.next()) {
                var layer = layers_4_1.value;
                _loop_4(layer);
            }
        }
        catch (e_6_1) { e_6 = { error: e_6_1 }; }
        finally {
            try {
                if (layers_4_1 && !layers_4_1.done && (_a = layers_4.return)) _a.call(layers_4);
            }
            finally { if (e_6) throw e_6.error; }
        }
        this.map.lowerLayers(layersToLower);
        setTimeout((/**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var elements = _this.computeElementRef('lower');
            if (!_this.isScrolledIntoView(elements[0], elements[1].offsetParent)) {
                elements[0].scrollTop = elements[1].offsetParent.offsetTop + elements[1].offsetParent.offsetHeight - elements[0].clientHeight;
            }
        }), 100);
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
        if (this.sortAlpha) {
            layersOut = this.sortLayersByTitle(layersOut);
        }
        else {
            layersOut = this.sortLayersByZindex(layersOut);
        }
        return layersOut;
    };
    /**
     * @param {?} term
     * @return {?}
     */
    LayerListComponent.prototype.onKeywordChange = /**
     * @param {?} term
     * @return {?}
     */
    function (term) {
        this.keyword = term;
    };
    /**
     * @param {?} appliedFilter
     * @return {?}
     */
    LayerListComponent.prototype.onAppliedFilterAndSortChange = /**
     * @param {?} appliedFilter
     * @return {?}
     */
    function (appliedFilter) {
        this.keyword = appliedFilter.keyword;
        this.onlyVisible = appliedFilter.onlyVisible;
        this.sortAlpha = appliedFilter.sortAlpha;
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
        if (this.layerFilterAndSortOptions.showToolbar === LayerListControlsEnum.never) {
            return layers;
        }
        if (!this.keyword && !this.onlyVisible) {
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
            if (_this.keyword && layer.title) {
                /** @type {?} */
                var localKeyword = _this.keyword
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
                    !(_this.keyword.toLowerCase() === dataSourceType.toLowerCase()) &&
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
        var _this = this;
        return layers.sort((/**
         * @param {?} a
         * @param {?} b
         * @return {?}
         */
        function (a, b) {
            if (_this.normalize(a.title) < _this.normalize(b.title)) {
                return -1;
            }
            if (_this.normalize(a.title) > _this.normalize(b.title)) {
                return 1;
            }
            return 0;
        }));
    };
    /**
     * @private
     * @param {?} str
     * @return {?}
     */
    LayerListComponent.prototype.normalize = /**
     * @private
     * @param {?} str
     * @return {?}
     */
    function (str) {
        return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
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
                    this.onlyVisible) {
                    return true;
                }
                return false;
        }
    };
    /**
     * @param {?} layer
     * @return {?}
     */
    LayerListComponent.prototype.toggleLayerTool = /**
     * @param {?} layer
     * @return {?}
     */
    function (layer) {
        var e_7, _a;
        this.toggleOpacity = false;
        if (this.layerTool && layer === this.activeLayer) {
            this.layerTool = false;
        }
        else {
            this.layerTool = true;
        }
        try {
            for (var _b = tslib_1.__values(this.layers), _c = _b.next(); !_c.done; _c = _b.next()) {
                var lay = _c.value;
                lay.options.active = false;
            }
        }
        catch (e_7_1) { e_7 = { error: e_7_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_7) throw e_7.error; }
        }
        layer.options.active = true;
        this.activeLayer = layer;
        return;
    };
    /**
     * @param {?=} layers
     * @return {?}
     */
    LayerListComponent.prototype.removeLayers = /**
     * @param {?=} layers
     * @return {?}
     */
    function (layers) {
        var e_8, _a;
        if (layers && layers.length > 0) {
            try {
                for (var layers_5 = tslib_1.__values(layers), layers_5_1 = layers_5.next(); !layers_5_1.done; layers_5_1 = layers_5.next()) {
                    var layer = layers_5_1.value;
                    layer.map.removeLayer(layer);
                }
            }
            catch (e_8_1) { e_8 = { error: e_8_1 }; }
            finally {
                try {
                    if (layers_5_1 && !layers_5_1.done && (_a = layers_5.return)) _a.call(layers_5);
                }
                finally { if (e_8) throw e_8.error; }
            }
            this.layersChecked = [];
        }
        else if (!layers) {
            this.activeLayer.map.removeLayer(this.activeLayer);
            this.layerTool = false;
        }
        return;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    LayerListComponent.prototype.layersCheck = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var e_9, _a;
        event.layer.options.check = event.check;
        if (event.check === true) {
            /** @type {?} */
            var eventMapIndex = this.layers.findIndex((/**
             * @param {?} layer
             * @return {?}
             */
            function (layer) { return event.layer.id === layer.id; }));
            var _loop_5 = function (layer) {
                /** @type {?} */
                var mapIndex = this_5.layers.findIndex((/**
                 * @param {?} lay
                 * @return {?}
                 */
                function (lay) { return layer.id === lay.id; }));
                if (eventMapIndex < mapIndex) {
                    this_5.layersChecked.splice(this_5.layersChecked.findIndex((/**
                     * @param {?} lay
                     * @return {?}
                     */
                    function (lay) { return layer.id === lay.id; })), 0, event.layer);
                    if (this_5.excludeBaseLayers) {
                        if (this_5.layersChecked.length === this_5.layers.filter((/**
                         * @param {?} lay
                         * @return {?}
                         */
                        function (lay) { return (lay.baseLayer !== true && lay.showInLayerList); })).length) {
                            this_5.selectAllCheck = true;
                        }
                        else {
                            this_5.selectAllCheck = false;
                        }
                    }
                    else if (!this_5.excludeBaseLayers) {
                        if (this_5.layersChecked.length === this_5.layers.filter((/**
                         * @param {?} lay
                         * @return {?}
                         */
                        function (lay) { return lay.showInLayerList; })).length) {
                            this_5.selectAllCheck = true;
                        }
                        else {
                            this_5.selectAllCheck = false;
                        }
                    }
                    return { value: void 0 };
                }
            };
            var this_5 = this;
            try {
                for (var _b = tslib_1.__values(this.layersChecked), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var layer = _c.value;
                    var state_1 = _loop_5(layer);
                    if (typeof state_1 === "object")
                        return state_1.value;
                }
            }
            catch (e_9_1) { e_9 = { error: e_9_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_9) throw e_9.error; }
            }
            this.layersChecked.push(event.layer);
        }
        else {
            /** @type {?} */
            var index = this.layersChecked.findIndex((/**
             * @param {?} layer
             * @return {?}
             */
            function (layer) { return event.layer.id === layer.id; }));
            this.layersChecked.splice(index, 1);
        }
        if (this.excludeBaseLayers) {
            if (this.layersChecked.length === this.layers.filter((/**
             * @param {?} lay
             * @return {?}
             */
            function (lay) { return (lay.baseLayer !== true && lay.showInLayerList); })).length) {
                this.selectAllCheck = true;
            }
            else {
                this.selectAllCheck = false;
            }
        }
        else if (!this.excludeBaseLayers) {
            if (this.layersChecked.length === this.layers.filter((/**
             * @param {?} lay
             * @return {?}
             */
            function (lay) { return lay.showInLayerList; })).length) {
                this.selectAllCheck = true;
            }
            else {
                this.selectAllCheck = false;
            }
        }
    };
    /**
     * @param {?} value
     * @return {?}
     */
    LayerListComponent.prototype.toggleSelectionMode = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        var e_10, _a;
        this.selection = value;
        this.activeLayer = undefined;
        if (value === true) {
            this.layerTool = false;
            try {
                for (var _b = tslib_1.__values(this.layers), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var layer = _c.value;
                    if (layer.options.check) {
                        this.layersChecked.push(layer);
                    }
                }
            }
            catch (e_10_1) { e_10 = { error: e_10_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_10) throw e_10.error; }
            }
        }
    };
    /**
     * @return {?}
     */
    LayerListComponent.prototype.layersCheckedOpacity = /**
     * @return {?}
     */
    function () {
        var e_11, _a;
        if (this.layersChecked.length > 1) {
            return 1;
        }
        else {
            /** @type {?} */
            var opacity = [];
            try {
                for (var _b = tslib_1.__values(this.layersChecked), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var layer = _c.value;
                    opacity.push(layer.opacity);
                }
            }
            catch (e_11_1) { e_11 = { error: e_11_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_11) throw e_11.error; }
            }
            return opacity;
        }
    };
    /**
     * @return {?}
     */
    LayerListComponent.prototype.selectAll = /**
     * @return {?}
     */
    function () {
        var e_12, _a, e_13, _b;
        if (!this.selectAllCheck) {
            try {
                for (var _c = tslib_1.__values(this.layers), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var layer = _d.value;
                    if (this.excludeBaseLayers && layer.baseLayer !== true && layer.showInLayerList) {
                        layer.options.check = true;
                        this.layersChecked.push(layer);
                    }
                    else if (!this.excludeBaseLayers && layer.showInLayerList) {
                        layer.options.check = true;
                        this.layersChecked.push(layer);
                    }
                }
            }
            catch (e_12_1) { e_12 = { error: e_12_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_12) throw e_12.error; }
            }
            this.selectAllCheck$.next(true);
        }
        else {
            try {
                for (var _e = tslib_1.__values(this.layers), _f = _e.next(); !_f.done; _f = _e.next()) {
                    var layer = _f.value;
                    layer.options.check = false;
                }
            }
            catch (e_13_1) { e_13 = { error: e_13_1 }; }
            finally {
                try {
                    if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                }
                finally { if (e_13) throw e_13.error; }
            }
            this.layersChecked = [];
            this.selectAllCheck$.next(false);
        }
    };
    /**
     * @param {?} elemSource
     * @param {?} elem
     * @return {?}
     */
    LayerListComponent.prototype.isScrolledIntoView = /**
     * @param {?} elemSource
     * @param {?} elem
     * @return {?}
     */
    function (elemSource, elem) {
        /** @type {?} */
        var docViewTop = elemSource.scrollTop;
        /** @type {?} */
        var docViewBottom = docViewTop + elemSource.clientHeight;
        /** @type {?} */
        var elemTop = elem.offsetTop;
        /** @type {?} */
        var elemBottom = elemTop + elem.clientHeight;
        return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
    };
    /**
     * @param {?=} type
     * @return {?}
     */
    LayerListComponent.prototype.computeElementRef = /**
     * @param {?=} type
     * @return {?}
     */
    function (type) {
        /** @type {?} */
        var checkItems = this.elRef.nativeElement.getElementsByClassName('mat-checkbox-checked');
        /** @type {?} */
        var checkItem = type === 'lower' ? this.elRef.nativeElement.getElementsByClassName('mat-checkbox-checked')[checkItems.length - 1] :
            this.elRef.nativeElement.getElementsByClassName('mat-checkbox-checked')[0];
        /** @type {?} */
        var igoList = this.elRef.nativeElement.getElementsByTagName('igo-list')[0];
        return [igoList, checkItem];
    };
    LayerListComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-layer-list',
                    template: "<igo-list #igoList [ngClass]=\"(layerTool || selection) ? 'igo-list-min-height': 'igo-list-max-height'\" [navigation]=\"false\" [selection]=\"false\">\r\n  <igo-layer-list-tool *ngIf=\"showToolbar$ | async\"\r\n      floatLabel=\"auto\"\r\n      [layersAreAllVisible]=\"layersAreAllVisible\"\r\n      [term]=\"layerFilterAndSortOptions.keyword\"\r\n      [onlyVisible]=\"layerFilterAndSortOptions.onlyVisible\"\r\n      [sortAlpha]=\"layerFilterAndSortOptions.sortAlpha\"\r\n      (appliedFilterAndSort)=\"onAppliedFilterAndSortChange($event)\"\r\n      (selection)=\"toggleSelectionMode($event)\">\r\n    </igo-layer-list-tool>\r\n\r\n  <ng-template ngFor let-layer let-i=\"index\" [ngForOf]=\"layers$ | async\">\r\n    <igo-layer-item *ngIf=\"!(excludeBaseLayers && layer.baseLayer)\"\r\n        igoListItem\r\n        [layer]=\"layer\"\r\n        [activeLayer]=\"activeLayer\"\r\n        [orderable]=\"orderable && !layer.baseLayer\"\r\n        [lowerDisabled]=\"getLowerLayer().id === layer.id\"\r\n        [raiseDisabled]=\"getUpperLayer().id === layer.id\"\r\n        [queryBadge]=\"queryBadge\"\r\n        [expandLegendIfVisible]=\"expandLegendOfVisibleLayers\"\r\n        [updateLegendOnResolutionChange]=\"updateLegendOnResolutionChange\"\r\n        [toggleLegendOnVisibilityChange]=\"toggleLegendOnVisibilityChange\"\r\n        [selectionMode]=\"selection\"\r\n        [selectAll]=\"selectAllCheck\"\r\n        [layerCheck]=\"layer.options.check\"\r\n        (action)=\"toggleLayerTool($event)\"\r\n        (checkbox)=\"layersCheck($event)\">\r\n    </igo-layer-item>\r\n  </ng-template>\r\n</igo-list>\r\n\r\n<igo-panel *ngIf=\"!selection && layerTool && activeLayer\" class=\"igo-layer-actions-container\" [title]=\"activeLayer.title\">\r\n  <div class=\"igo-layer-button-group\">\r\n  <ng-container igoLayerItemToolbar\r\n    [ngTemplateOutlet]=\"templateLayerToolbar\"\r\n    [ngTemplateOutletContext]=\"{layer: activeLayer}\">\r\n  </ng-container>\r\n\r\n  <ng-content select=\"[igoLayerItemToolbar]\"></ng-content>\r\n    <!-- <label>{{ 'igo.geo.layer.opacity' | translate }} </label> -->\r\n    <button\r\n      color=\"primary\"\r\n      mat-icon-button\r\n      tooltip-position=\"below\"\r\n      matTooltipShowDelay=\"500\"\r\n      [matMenuTriggerFor]=\"opacityMenu\"\r\n      [matTooltip]=\"'igo.geo.layer.opacity' | translate\">\r\n      <mat-icon [matBadge]=\"badgeOpacity\" matBadgeColor=\"primary\" matBadgeSize=\"medium\" svgIcon=\"opacity\"></mat-icon>\r\n    </button>\r\n\r\n    <mat-menu #opacityMenu=\"matMenu\" class=\"mat-menu-opacity-slider\">\r\n      <div id=\"opacity-menu\">\r\n        <mat-slider\r\n          id=\"opacity-slider\"\r\n          color=\"primary\"\r\n          thumbLabel\r\n          tickInterval=\"5\"\r\n          step=\"5\"\r\n          [min]=\"0\"\r\n          [max]=\"100\"\r\n          [(ngModel)]=\"opacity\"\r\n          [matTooltip]=\"'igo.geo.layer.opacity' | translate\"\r\n          (click) = \"$event.stopPropagation()\"\r\n          matTooltipShowDelay=\"500\"\r\n          tooltip-position=\"below\">\r\n        </mat-slider>\r\n      </div>\r\n    </mat-menu>\r\n\r\n    <button\r\n      color=\"primary\"\r\n      mat-icon-button\r\n      tooltip-position=\"below\"\r\n      matTooltipShowDelay=\"500\"\r\n      [matTooltip]=\"(sortAlpha || onlyVisible || keyword) ? ('igo.geo.layer.filterRaiseLayer' | translate) : ('igo.geo.layer.raiseLayer' | translate)\"\r\n      [disabled]=\"raiseDisabled\"\r\n      (click)=\"activeLayer.map.raiseLayer(activeLayer)\">\r\n      <mat-icon [matBadge]=\"(sortAlpha || onlyVisible || keyword) ? '!' : ''\" matBadgeColor=\"warn\" matBadgeSize=\"medium\" [matBadgeHidden]=\"raiseDisabled\"\r\n                svgIcon=\"arrow-up\"></mat-icon>\r\n    </button>\r\n\r\n    <button\r\n      mat-icon-button\r\n      color=\"primary\"\r\n      tooltip-position=\"below\"\r\n      matTooltipShowDelay=\"500\"\r\n      [matTooltip]=\"(sortAlpha || onlyVisible || keyword) ? ('igo.geo.layer.filterLowerLayer' | translate) : ('igo.geo.layer.lowerLayer' | translate)\"\r\n      [disabled]=\"lowerDisabled\"\r\n      (click)=\"activeLayer.map.lowerLayer(activeLayer)\">\r\n      <mat-icon [matBadge]=\"(sortAlpha || onlyVisible || keyword) ? '!' : ''\" matBadgeColor=\"warn\" matBadgeSize=\"medium\" [matBadgeHidden]=\"lowerDisabled\"\r\n                svgIcon=\"arrow-down\"></mat-icon>\r\n    </button>\r\n\r\n    <button\r\n      mat-icon-button\r\n      color=\"warn\"\r\n      tooltip-position=\"below\"\r\n      matTooltipShowDelay=\"500\"\r\n      [matTooltip]=\"'igo.geo.layer.removeLayer' | translate\"\r\n      (click)=\"removeLayers()\">\r\n      <mat-icon svgIcon=\"delete\"></mat-icon>\r\n    </button>\r\n  </div>\r\n</igo-panel>\r\n\r\n<igo-panel *ngIf=\"selection && layers.length > 0\" class=\"igo-layer-actions-container\" [title]=\"'igo.geo.layer.tools' | translate\">\r\n  <div class=\"igo-layer-button-group\">\r\n\r\n    <button\r\n      mat-stroked-button\r\n      tooltip-position=\"below\"\r\n      matTooltipShowDelay=\"500\"\r\n      [disabled]=\"layers.length === 0\"\r\n      [matTooltip]=\"selectAllCheck ?\r\n                    ('igo.geo.layer.deselectAll' | translate) :\r\n                    ('igo.geo.layer.selectAll' | translate)\"\r\n      (click)=\"selectAll()\">\r\n      {{selectAllCheck ? ('igo.geo.layer.deselectAll' | translate) :\r\n                    ('igo.geo.layer.selectAll' | translate)}}\r\n    </button>\r\n\r\n    <!-- <label>{{ 'igo.geo.layer.opacity' | translate }} </label> -->\r\n    <button\r\n      color=\"primary\"\r\n      mat-icon-button\r\n      tooltip-position=\"below\"\r\n      matTooltipShowDelay=\"500\"\r\n      [disabled]=\"layersChecked.length === 0\"\r\n      [matMenuTriggerFor]=\"opacityMenu\"\r\n      [matTooltip]=\"'igo.geo.layer.opacity' | translate\">\r\n      <mat-icon svgIcon=\"opacity\"></mat-icon>\r\n    </button>\r\n\r\n    <mat-menu #opacityMenu=\"matMenu\"  class=\"mat-menu-opacity-slider\">\r\n      <div id=\"opacity-menu\">\r\n        <mat-slider *ngIf=\"layersChecked.length\"\r\n          id=\"opacity-slider\"\r\n          color=\"primary\"\r\n          thumbLabel\r\n          tickInterval=\"5\"\r\n          step=\"5\"\r\n          [min]=\"0\"\r\n          [max]=\"100\"\r\n          [(ngModel)]=\"checkOpacity\"\r\n          [matTooltip]=\"'igo.geo.layer.opacity' | translate\"\r\n          matTooltipShowDelay=\"500\"\r\n          tooltip-position=\"below\"\r\n          (click) = \"$event.stopPropagation()\">\r\n        </mat-slider>\r\n      </div>\r\n    </mat-menu>\r\n\r\n    <button\r\n      color=\"primary\"\r\n      mat-icon-button\r\n      tooltip-position=\"below\"\r\n      matTooltipShowDelay=\"500\"\r\n      [matTooltip]=\"(sortAlpha || onlyVisible || keyword) ? ('igo.geo.layer.filterRaiseLayer' | translate) : ('igo.geo.layer.raiseLayer' | translate)\"\r\n      [disabled]=\"raiseDisabledSelection\"\r\n      (click)=\"raiseLayers(layersChecked)\">\r\n      <mat-icon [matBadge]=\"(sortAlpha || onlyVisible || keyword) ? '!' : ''\" matBadgeColor=\"warn\" matBadgeSize=\"medium\" [matBadgeHidden]=\"raiseDisabledSelection\"\r\n                svgIcon=\"arrow-up\"></mat-icon>\r\n    </button>\r\n\r\n    <button\r\n      mat-icon-button\r\n      color=\"primary\"\r\n      tooltip-position=\"below\"\r\n      matTooltipShowDelay=\"500\"\r\n      [matTooltip]=\"(sortAlpha || onlyVisible || keyword) ? ('igo.geo.layer.filterLowerLayer' | translate) : ('igo.geo.layer.lowerLayer' | translate)\"\r\n      [disabled]=\"lowerDisabledSelection\"\r\n      (click)=\"lowerLayers(layersChecked)\">\r\n      <mat-icon [matBadge]=\"(sortAlpha || onlyVisible || keyword) ? '!' : ''\" matBadgeColor=\"warn\" matBadgeSize=\"medium\" [matBadgeHidden]=\"lowerDisabledSelection\"\r\n                svgIcon=\"arrow-down\"></mat-icon>\r\n    </button>\r\n\r\n    <button\r\n      mat-icon-button\r\n      color=\"warn\"\r\n      tooltip-position=\"below\"\r\n      matTooltipShowDelay=\"500\"\r\n      [disabled]=\"layersChecked.length === 0\"\r\n      [matTooltip]=\"'igo.geo.layer.removeLayer' | translate\"\r\n      (click)=\"removeLayers(layersChecked)\">\r\n      <mat-icon svgIcon=\"delete\"></mat-icon>\r\n    </button>\r\n  </div>\r\n</igo-panel>\r\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [":host .igo-list-min-height{height:calc(100% - 91px);padding-top:8px}:host .igo-list-max-height{padding-top:8px}mat-form-field.inputFilter{width:calc(100% - 100px);max-width:200px}.igo-layer-actions-container{width:calc(100% - 5px);padding-left:5px}.igo-layer-actions-container>div{text-align:center}#opacity-slider{float:left;min-width:unset;width:110px;left:10px;top:10px}.igo-layer-button-group{display:-webkit-box;display:flex;float:right;padding-top:5px}:host igo-panel{height:unset}#opacity-menu{max-width:unset;width:132px;height:50px}#opacity-menu .mat-menu-content:not(:empty){padding-top:20px}"]
                }] }
    ];
    /** @nocollapse */
    LayerListComponent.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    LayerListComponent.propDecorators = {
        templateLayerToolbar: [{ type: ContentChild, args: ['igoLayerItemToolbar',] }],
        layersAreAllVisible: [{ type: Input }],
        ogcButton: [{ type: Input }],
        timeButton: [{ type: Input }],
        map: [{ type: Input }],
        layers: [{ type: Input }],
        floatLabel: [{ type: Input }],
        layerFilterAndSortOptions: [{ type: Input }],
        excludeBaseLayers: [{ type: Input }],
        toggleLegendOnVisibilityChange: [{ type: Input }],
        expandLegendOfVisibleLayers: [{ type: Input }],
        updateLegendOnResolutionChange: [{ type: Input }],
        queryBadge: [{ type: Input }],
        appliedFilterAndSort: [{ type: Output }]
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
    /** @type {?} */
    LayerListComponent.prototype.layerTool;
    /** @type {?} */
    LayerListComponent.prototype.activeLayer$;
    /** @type {?} */
    LayerListComponent.prototype.layersChecked;
    /** @type {?} */
    LayerListComponent.prototype.selection;
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
    LayerListComponent.prototype.ogcButton;
    /** @type {?} */
    LayerListComponent.prototype.timeButton;
    /**
     * @type {?}
     * @private
     */
    LayerListComponent.prototype._map;
    /**
     * @type {?}
     * @private
     */
    LayerListComponent.prototype._layers;
    /**
     * @type {?}
     * @private
     */
    LayerListComponent.prototype._activeLayer;
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
    /** @type {?} */
    LayerListComponent.prototype.appliedFilterAndSort;
    /**
     * @type {?}
     * @private
     */
    LayerListComponent.prototype._keyword;
    /**
     * @type {?}
     * @private
     */
    LayerListComponent.prototype._onlyVisible;
    /**
     * @type {?}
     * @private
     */
    LayerListComponent.prototype._sortedAlpha;
    /** @type {?} */
    LayerListComponent.prototype.toggleOpacity;
    /** @type {?} */
    LayerListComponent.prototype.selectAllCheck$;
    /** @type {?} */
    LayerListComponent.prototype.selectAllCheck$$;
    /** @type {?} */
    LayerListComponent.prototype.selectAllCheck;
    /**
     * @type {?}
     * @private
     */
    LayerListComponent.prototype.elRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5ZXItbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvbGF5ZXIvbGF5ZXItbGlzdC9sYXllci1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLHVCQUF1QixFQUN2QixXQUFXLEVBQ1gsWUFBWSxFQUdaLE1BQU0sRUFDTixZQUFZLEVBQ1osVUFBVSxFQUNYLE1BQU0sZUFBZSxDQUFDO0FBSXZCLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQzFELE9BQU8sRUFDTCxlQUFlLEVBQ2YsYUFBYSxFQUViLEtBQUssRUFDTCxLQUFLLEVBQ04sTUFBTSxNQUFNLENBQUM7QUFDZCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFNMUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLHNCQUFzQixDQUFDOztBQUc5QztJQWtLRSw0QkFDVSxLQUFpQjtRQUFqQixVQUFLLEdBQUwsS0FBSyxDQUFZO1FBNUozQixjQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLDZCQUF3QixHQUFHLENBQUMsQ0FBQztRQUU3QixZQUFPLEdBQTZCLElBQUksZUFBZSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRTVELFlBQU8sR0FBRyxJQUFJLGFBQWEsQ0FBTyxDQUFDLENBQUMsQ0FBQztRQUVyQyxpQkFBWSxHQUE2QixJQUFJLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUdwRSxpQkFBWSxHQUEyQixJQUFJLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUV0RSxrQkFBYSxHQUFZLEVBQUUsQ0FBQztRQU9uQix3QkFBbUIsR0FBWSxJQUFJLENBQUM7UUFFcEMsY0FBUyxHQUFZLElBQUksQ0FBQztRQUUxQixlQUFVLEdBQVksSUFBSSxDQUFDO1FBOEIzQixlQUFVLEdBQW1CLE1B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Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgSW5wdXQsXHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbiAgVGVtcGxhdGVSZWYsXHJcbiAgQ29udGVudENoaWxkLFxyXG4gIE9uSW5pdCxcclxuICBPbkRlc3Ryb3ksXHJcbiAgT3V0cHV0LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBFbGVtZW50UmVmXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEZsb2F0TGFiZWxUeXBlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xyXG5cclxuaW1wb3J0IHsgTGF5ZXIgfSBmcm9tICcuLi9zaGFyZWQnO1xyXG5pbXBvcnQgeyBMYXllckxpc3RDb250cm9sc0VudW0gfSBmcm9tICcuL2xheWVyLWxpc3QuZW51bSc7XHJcbmltcG9ydCB7XHJcbiAgQmVoYXZpb3JTdWJqZWN0LFxyXG4gIFJlcGxheVN1YmplY3QsXHJcbiAgU3Vic2NyaXB0aW9uLFxyXG4gIEVNUFRZLFxyXG4gIHRpbWVyXHJcbn0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IGRlYm91bmNlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQge1xyXG4gIE1ldGFkYXRhT3B0aW9ucyxcclxuICBNZXRhZGF0YUxheWVyT3B0aW9uc1xyXG59IGZyb20gJy4uLy4uL21ldGFkYXRhL3NoYXJlZC9tZXRhZGF0YS5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBMYXllckxpc3RDb250cm9sc09wdGlvbnMgfSBmcm9tICcuLi9sYXllci1saXN0LXRvb2wvbGF5ZXItbGlzdC10b29sLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IElnb01hcCB9IGZyb20gJy4uLy4uL21hcC9zaGFyZWQvbWFwJztcclxuXHJcbi8vIFRPRE86IFRoaXMgY2xhc3MgY291bGQgdXNlIGEgY2xlYW4gdXAuIEFsc28sIHNvbWUgbWV0aG9kcyBjb3VsZCBiZSBtb3ZlZCBlYWxzZXdoZXJlXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaWdvLWxheWVyLWxpc3QnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9sYXllci1saXN0LmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9sYXllci1saXN0LmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIExheWVyTGlzdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuICBvcmRlcmFibGUgPSB0cnVlO1xyXG4gIHRocmVzaG9sZFRvRmlsdGVyQW5kU29ydCA9IDU7XHJcblxyXG4gIGxheWVycyQ6IEJlaGF2aW9yU3ViamVjdDxMYXllcltdPiA9IG5ldyBCZWhhdmlvclN1YmplY3QoW10pO1xyXG5cclxuICBjaGFuZ2UkID0gbmV3IFJlcGxheVN1YmplY3Q8dm9pZD4oMSk7XHJcblxyXG4gIHNob3dUb29sYmFyJDogQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IEJlaGF2aW9yU3ViamVjdChmYWxzZSk7XHJcblxyXG4gIHB1YmxpYyBsYXllclRvb2w6IGJvb2xlYW47XHJcbiAgYWN0aXZlTGF5ZXIkOiBCZWhhdmlvclN1YmplY3Q8TGF5ZXI+ID0gbmV3IEJlaGF2aW9yU3ViamVjdCh1bmRlZmluZWQpO1xyXG5cclxuICBsYXllcnNDaGVja2VkOiBMYXllcltdID0gW107XHJcbiAgcHVibGljIHNlbGVjdGlvbjtcclxuXHJcbiAgcHJpdmF0ZSBjaGFuZ2UkJDogU3Vic2NyaXB0aW9uO1xyXG5cclxuICBAQ29udGVudENoaWxkKCdpZ29MYXllckl0ZW1Ub29sYmFyJykgdGVtcGxhdGVMYXllclRvb2xiYXI6IFRlbXBsYXRlUmVmPGFueT47XHJcblxyXG4gIEBJbnB1dCgpIGxheWVyc0FyZUFsbFZpc2libGU6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICBASW5wdXQoKSBvZ2NCdXR0b246IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICBASW5wdXQoKSB0aW1lQnV0dG9uOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgQElucHV0KClcclxuICBnZXQgbWFwKCk6IElnb01hcCB7XHJcbiAgICByZXR1cm4gdGhpcy5fbWFwO1xyXG4gIH1cclxuICBzZXQgbWFwKHZhbHVlOiBJZ29NYXApIHtcclxuICAgIHRoaXMuX21hcCA9IHZhbHVlO1xyXG4gIH1cclxuICBwcml2YXRlIF9tYXA6IElnb01hcDtcclxuXHJcbiAgQElucHV0KClcclxuICBzZXQgbGF5ZXJzKHZhbHVlOiBMYXllcltdKSB7XHJcbiAgICB0aGlzLl9sYXllcnMgPSB2YWx1ZTtcclxuICAgIHRoaXMubmV4dCgpO1xyXG4gIH1cclxuICBnZXQgbGF5ZXJzKCk6IExheWVyW10ge1xyXG4gICAgcmV0dXJuIHRoaXMuX2xheWVycztcclxuICB9XHJcbiAgcHJpdmF0ZSBfbGF5ZXJzOiBMYXllcltdO1xyXG5cclxuICBzZXQgYWN0aXZlTGF5ZXIodmFsdWU6IExheWVyKSB7XHJcbiAgICB0aGlzLl9hY3RpdmVMYXllciA9IHZhbHVlO1xyXG4gICAgdGhpcy5hY3RpdmVMYXllciQubmV4dCh2YWx1ZSk7XHJcbiAgfVxyXG4gIGdldCBhY3RpdmVMYXllcigpOiBMYXllciB7XHJcbiAgICByZXR1cm4gdGhpcy5fYWN0aXZlTGF5ZXI7XHJcbiAgfVxyXG4gIHByaXZhdGUgX2FjdGl2ZUxheWVyOiBMYXllcjtcclxuXHJcbiAgQElucHV0KCkgZmxvYXRMYWJlbDogRmxvYXRMYWJlbFR5cGUgPSAnYXV0byc7XHJcblxyXG4gIEBJbnB1dCgpIGxheWVyRmlsdGVyQW5kU29ydE9wdGlvbnM6IExheWVyTGlzdENvbnRyb2xzT3B0aW9ucyA9IHt9O1xyXG5cclxuICBASW5wdXQoKSBleGNsdWRlQmFzZUxheWVyczogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICBASW5wdXQoKSB0b2dnbGVMZWdlbmRPblZpc2liaWxpdHlDaGFuZ2U6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgQElucHV0KCkgZXhwYW5kTGVnZW5kT2ZWaXNpYmxlTGF5ZXJzOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIEBJbnB1dCgpIHVwZGF0ZUxlZ2VuZE9uUmVzb2x1dGlvbkNoYW5nZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICBASW5wdXQoKSBxdWVyeUJhZGdlOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIEBPdXRwdXQoKSBhcHBsaWVkRmlsdGVyQW5kU29ydCA9IG5ldyBFdmVudEVtaXR0ZXI8TGF5ZXJMaXN0Q29udHJvbHNPcHRpb25zPigpO1xyXG5cclxuICBnZXQga2V5d29yZCgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMuX2tleXdvcmQ7XHJcbiAgfVxyXG4gIHNldCBrZXl3b3JkKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuX2tleXdvcmQgPSB2YWx1ZTtcclxuICAgIHRoaXMubmV4dCgpO1xyXG4gIH1cclxuICBwcml2YXRlIF9rZXl3b3JkID0gdW5kZWZpbmVkO1xyXG5cclxuICBnZXQgb25seVZpc2libGUoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5fb25seVZpc2libGU7XHJcbiAgfVxyXG4gIHNldCBvbmx5VmlzaWJsZSh2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgdGhpcy5fb25seVZpc2libGUgPSB2YWx1ZTtcclxuICAgIHRoaXMubmV4dCgpO1xyXG4gIH1cclxuICBwcml2YXRlIF9vbmx5VmlzaWJsZSA9IGZhbHNlO1xyXG5cclxuICBnZXQgc29ydEFscGhhKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX3NvcnRlZEFscGhhO1xyXG4gIH1cclxuICBzZXQgc29ydEFscGhhKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLl9zb3J0ZWRBbHBoYSA9IHZhbHVlO1xyXG4gICAgdGhpcy5uZXh0KCk7XHJcbiAgfVxyXG4gIHByaXZhdGUgX3NvcnRlZEFscGhhID0gZmFsc2U7XHJcblxyXG4gIGdldCBvcGFjaXR5KCkge1xyXG4gICAgcmV0dXJuIE1hdGgucm91bmQodGhpcy5hY3RpdmVMYXllciQuZ2V0VmFsdWUoKS5vcGFjaXR5ICogMTAwKTtcclxuICB9XHJcbiAgc2V0IG9wYWNpdHkob3BhY2l0eTogbnVtYmVyKSB7XHJcbiAgICB0aGlzLmFjdGl2ZUxheWVyJC5nZXRWYWx1ZSgpLm9wYWNpdHkgPSBvcGFjaXR5IC8gMTAwO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGJhZGdlT3BhY2l0eSgpIHtcclxuICAgIGlmICh0aGlzLm9wYWNpdHkgPT09IDEwMCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5vcGFjaXR5O1xyXG4gIH1cclxuXHJcbiAgZ2V0IHJhaXNlRGlzYWJsZWQoKTogYm9vbGVhbiB7XHJcbiAgICBpZiAoIXRoaXMub3JkZXJhYmxlIHx8IHRoaXMuYWN0aXZlTGF5ZXIuYmFzZUxheWVyIHx8IHRoaXMuZ2V0VXBwZXJMYXllcigpLmlkID09PSB0aGlzLmFjdGl2ZUxheWVyLmlkIHx8XHJcbiAgICAgICAgdGhpcy5pc1VwcGVyQmFzZWxheWVyKHRoaXMuYWN0aXZlTGF5ZXIpKSB7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGxvd2VyRGlzYWJsZWQoKTogYm9vbGVhbiB7XHJcbiAgICBpZiAoIXRoaXMub3JkZXJhYmxlIHx8IHRoaXMuYWN0aXZlTGF5ZXIuYmFzZUxheWVyIHx8IHRoaXMuZ2V0TG93ZXJMYXllcigpLmlkID09PSB0aGlzLmFjdGl2ZUxheWVyLmlkIHx8XHJcbiAgICAgICAgdGhpcy5pc0xvd2VyQmFzZWxheWVyKHRoaXMuYWN0aXZlTGF5ZXIpKSB7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgZ2V0IHJhaXNlRGlzYWJsZWRTZWxlY3Rpb24oKTogYm9vbGVhbiB7XHJcbiAgICBpZiAodGhpcy5sYXllcnNDaGVja2VkLmxlbmd0aCA9PT0gMCB8fCAhdGhpcy5vcmRlcmFibGUgfHwgIXRoaXMucmFpc2FibGVMYXllcnModGhpcy5sYXllcnNDaGVja2VkKSB8fCB0aGlzLnNlbGVjdEFsbENoZWNrID09PSB0cnVlKSB7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGxvd2VyRGlzYWJsZWRTZWxlY3Rpb24oKTogYm9vbGVhbiB7XHJcbiAgICBpZiAodGhpcy5sYXllcnNDaGVja2VkLmxlbmd0aCA9PT0gMCB8fCAhdGhpcy5vcmRlcmFibGUgfHwgIXRoaXMubG93ZXJhYmxlTGF5ZXJzKHRoaXMubGF5ZXJzQ2hlY2tlZCkgfHwgdGhpcy5zZWxlY3RBbGxDaGVjayA9PT0gdHJ1ZSkge1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIGdldCBjaGVja09wYWNpdHkoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5sYXllcnNDaGVja2VkT3BhY2l0eSgpICogMTAwO1xyXG4gIH1cclxuICBzZXQgY2hlY2tPcGFjaXR5KG9wYWNpdHk6IG51bWJlcikge1xyXG4gICAgZm9yIChjb25zdCBsYXllciBvZiB0aGlzLmxheWVyc0NoZWNrZWQpIHtcclxuICAgICAgbGF5ZXIub3BhY2l0eSA9IG9wYWNpdHkgLyAxMDA7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgdG9nZ2xlT3BhY2l0eSA9IGZhbHNlO1xyXG5cclxuICBwdWJsaWMgc2VsZWN0QWxsQ2hlY2skID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPih1bmRlZmluZWQpO1xyXG4gIHNlbGVjdEFsbENoZWNrJCQ6IFN1YnNjcmlwdGlvbjtcclxuICBwdWJsaWMgc2VsZWN0QWxsQ2hlY2s7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBlbFJlZjogRWxlbWVudFJlZixcclxuICApIHt9XHJcblxyXG4gIC8qKlxyXG4gICAqIFN1YnNjcmliZSB0byB0aGUgc2VhcmNoIHRlcm0gc3RyZWFtIGFuZCB0cmlnZ2VyIHJlc2VhcmNoZXNcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgIHRoaXMuY2hhbmdlJCQgPSB0aGlzLmNoYW5nZSRcclxuICAgICAgLnBpcGUoXHJcbiAgICAgICAgZGVib3VuY2UoKCkgPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIHRoaXMubGF5ZXJzLmxlbmd0aCA9PT0gMCA/IEVNUFRZIDogdGltZXIoNTApO1xyXG4gICAgICAgIH0pXHJcbiAgICAgIClcclxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5zaG93VG9vbGJhciQubmV4dCh0aGlzLmNvbXB1dGVTaG93VG9vbGJhcigpKTtcclxuICAgICAgICB0aGlzLmxheWVycyQubmV4dCh0aGlzLmNvbXB1dGVMYXllcnModGhpcy5sYXllcnMuc2xpY2UoMCkpKTtcclxuICAgICAgICB0aGlzLmFwcGxpZWRGaWx0ZXJBbmRTb3J0LmVtaXQoe1xyXG4gICAgICAgICAga2V5d29yZDogdGhpcy5rZXl3b3JkLFxyXG4gICAgICAgICAgc29ydEFscGhhOiB0aGlzLnNvcnRBbHBoYSxcclxuICAgICAgICAgIG9ubHlWaXNpYmxlOiB0aGlzLm9ubHlWaXNpYmxlXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgIHRoaXMuc2VsZWN0QWxsQ2hlY2skJCA9IHRoaXMuc2VsZWN0QWxsQ2hlY2skLnN1YnNjcmliZSgodmFsdWUpID0+IHtcclxuICAgICAgdGhpcy5zZWxlY3RBbGxDaGVjayA9IHZhbHVlO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5sYXllcnMkLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgIGlmICh0aGlzLmxheWVycykge1xyXG4gICAgICAgIGxldCBjaGVja3MgPSAwO1xyXG4gICAgICAgIGZvciAoY29uc3QgbGF5ZXIgb2YgdGhpcy5sYXllcnMpIHtcclxuICAgICAgICAgIGlmIChsYXllci5vcHRpb25zLmFjdGl2ZSkge1xyXG4gICAgICAgICAgICB0aGlzLmFjdGl2ZUxheWVyID0gbGF5ZXI7XHJcbiAgICAgICAgICAgIHRoaXMubGF5ZXJUb29sID0gdHJ1ZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmIChsYXllci5vcHRpb25zLmNoZWNrKSB7XHJcbiAgICAgICAgICAgIGNoZWNrcyArPSAxO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5leGNsdWRlQmFzZUxheWVycykge1xyXG4gICAgICAgICAgdGhpcy5zZWxlY3RBbGxDaGVjayA9IGNoZWNrcyA9PT0gdGhpcy5sYXllcnMuZmlsdGVyKGxheSA9PiBsYXkuYmFzZUxheWVyICE9PSB0cnVlICYmIGxheS5zaG93SW5MYXllckxpc3QpLmxlbmd0aCA/IHRydWUgOiBmYWxzZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5zZWxlY3RBbGxDaGVjayA9IGNoZWNrcyA9PT0gdGhpcy5sYXllcnMuZmlsdGVyKGxheSA9PiBsYXkuc2hvd0luTGF5ZXJMaXN0KS5sZW5ndGggPyB0cnVlIDogZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgdGhpcy5jaGFuZ2UkJC51bnN1YnNjcmliZSgpO1xyXG4gIH1cclxuXHJcbiAgY2xlYXJLZXl3b3JkKCkge1xyXG4gICAgdGhpcy5rZXl3b3JkID0gdW5kZWZpbmVkO1xyXG4gIH1cclxuXHJcbiAgZ2V0TG93ZXJMYXllcigpIHtcclxuICAgIHJldHVybiB0aGlzLmxheWVyc1xyXG4gICAgICAuZmlsdGVyKGwgPT4gIWwuYmFzZUxheWVyKVxyXG4gICAgICAucmVkdWNlKFxyXG4gICAgICAgIChwcmV2LCBjdXJyZW50KSA9PiB7XHJcbiAgICAgICAgICByZXR1cm4gcHJldi56SW5kZXggPCBjdXJyZW50LnpJbmRleCA/IHByZXYgOiBjdXJyZW50O1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgeyB6SW5kZXg6IHVuZGVmaW5lZCwgaWQ6IHVuZGVmaW5lZCB9XHJcbiAgICAgICk7XHJcbiAgfVxyXG5cclxuICBpc0xvd2VyQmFzZWxheWVyKGxheWVyKSB7XHJcbiAgICBjb25zdCBpbmRleCA9IHRoaXMubGF5ZXJzLmZpbmRJbmRleChsYXkgPT7CoGxheWVyLmlkID09PSBsYXkuaWQpO1xyXG4gICAgaWYgKHRoaXMubGF5ZXJzICYmIHRoaXMubGF5ZXJzW2luZGV4ICsgMV0gJiYgdGhpcy5sYXllcnNbaW5kZXggKyAxXS5iYXNlTGF5ZXIgPT09IHRydWUpIHtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBnZXRVcHBlckxheWVyKCkge1xyXG4gICAgcmV0dXJuIHRoaXMubGF5ZXJzXHJcbiAgICAgIC5maWx0ZXIobCA9PiAhbC5iYXNlTGF5ZXIpXHJcbiAgICAgIC5yZWR1Y2UoXHJcbiAgICAgICAgKHByZXYsIGN1cnJlbnQpID0+IHtcclxuICAgICAgICAgIHJldHVybiBwcmV2LnpJbmRleCA+IGN1cnJlbnQuekluZGV4ID8gcHJldiA6IGN1cnJlbnQ7XHJcbiAgICAgICAgfSxcclxuICAgICAgICB7IHpJbmRleDogdW5kZWZpbmVkLCBpZDogdW5kZWZpbmVkIH1cclxuICAgICAgKTtcclxuICB9XHJcblxyXG4gIGlzVXBwZXJCYXNlbGF5ZXIobGF5ZXIpIHtcclxuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5sYXllcnMuZmluZEluZGV4KGxheSA9PsKgbGF5ZXIuaWQgPT09IGxheS5pZCk7XHJcbiAgICBpZiAodGhpcy5sYXllcnMgJiYgdGhpcy5sYXllcnNbaW5kZXggLSAxXSAmJiB0aGlzLmxheWVyc1tpbmRleCAtIDFdLmJhc2VMYXllciA9PT0gdHJ1ZSkge1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIC8qXHJcbiAgICogRm9yIHNlbGVjdGlvbiBtb2RlIGRpc2FibGVkIGF0dHJpYnV0ZVxyXG4gICAqL1xyXG4gIHJhaXNhYmxlTGF5ZXJzKGxheWVyczogTGF5ZXJbXSkge1xyXG4gICAgbGV0IHJlc3BvbnNlID0gZmFsc2U7XHJcbiAgICBsZXQgYmFzZSA9IDA7XHJcbiAgICBmb3IgKGNvbnN0IGxheWVyIG9mIGxheWVycykge1xyXG4gICAgICBjb25zdCBtYXBJbmRleCA9IHRoaXMubGF5ZXJzLmZpbmRJbmRleChsYXkgPT7CoGxheWVyLmlkID09PSBsYXkuaWQpO1xyXG4gICAgICBjb25zdCBjdXJyZW50TGF5ZXIgPSB0aGlzLmxheWVyc1ttYXBJbmRleF07XHJcbiAgICAgIGlmIChjdXJyZW50TGF5ZXIuYmFzZUxheWVyKSB7XHJcbiAgICAgICAgYmFzZSArPSAxO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBwcmV2aW91c0xheWVyID0gdGhpcy5sYXllcnNbbWFwSW5kZXggLSAxXTtcclxuICAgICAgaWYgKHByZXZpb3VzTGF5ZXIgJiYgcHJldmlvdXNMYXllci5iYXNlTGF5ZXIgIT09IHRydWUgJiYgIWxheWVycy5maW5kKGxheSA9PiBwcmV2aW91c0xheWVyLmlkID09PSBsYXkuaWQpICYmXHJcbiAgICAgICAgICAgIGN1cnJlbnRMYXllci5iYXNlTGF5ZXIgIT09IHRydWUpIHtcclxuICAgICAgICByZXNwb25zZSA9IHRydWU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAoKHRoaXMubGF5ZXJzQ2hlY2tlZC5sZW5ndGggPT09IDEgJiYgdGhpcy5sYXllcnNDaGVja2VkWzBdLmJhc2VMYXllcikgfHwgYmFzZSA9PT0gdGhpcy5sYXllcnNDaGVja2VkLmxlbmd0aCkge1xyXG4gICAgICByZXNwb25zZSA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3BvbnNlO1xyXG4gIH1cclxuXHJcbiAgLypcclxuICAgKiBXaGVuIG11bHRpcGxlIGxheWVycyBpcyBzZWxlY3RlZCBidXQgc29tZSBtYXkgYmUgYWxsb3cgdG8gbW92ZVxyXG4gICAqL1xyXG4gIHJhaXNhYmxlTGF5ZXIoaW5kZXg6IG51bWJlcikge1xyXG4gICAgaWYgKGluZGV4IDwgMSkge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMubGF5ZXJzW2luZGV4IC0gMV0ub3B0aW9ucy5jaGVjaykge1xyXG4gICAgICByZXR1cm4gdGhpcy5yYWlzYWJsZUxheWVyKGluZGV4IC0gMSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcblxyXG4gIHJhaXNlTGF5ZXJzKGxheWVyczogTGF5ZXJbXSkge1xyXG4gICAgY29uc3QgbGF5ZXJzVG9SYWlzZSA9IFtdO1xyXG4gICAgZm9yIChjb25zdCBsYXllciBvZiBsYXllcnMpIHtcclxuICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmxheWVycy5maW5kSW5kZXgobGF5ID0+IGxheS5pZCA9PT0gbGF5ZXIuaWQpO1xyXG4gICAgICBpZiAodGhpcy5yYWlzYWJsZUxheWVyKGluZGV4KSkge1xyXG4gICAgICAgIGxheWVyc1RvUmFpc2UucHVzaChsYXllcik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHRoaXMubWFwLnJhaXNlTGF5ZXJzKGxheWVyc1RvUmFpc2UpO1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIGNvbnN0IGVsZW1lbnRzID0gdGhpcy5jb21wdXRlRWxlbWVudFJlZigpO1xyXG4gICAgICBpZiAoIXRoaXMuaXNTY3JvbGxlZEludG9WaWV3KGVsZW1lbnRzWzBdLCBlbGVtZW50c1sxXS5vZmZzZXRQYXJlbnQpKSB7XHJcbiAgICAgICAgZWxlbWVudHNbMF0uc2Nyb2xsVG9wID0gZWxlbWVudHNbMV0ub2Zmc2V0UGFyZW50Lm9mZnNldFRvcDtcclxuICAgICAgfVxyXG4gICAgfSwgMTAwKTtcclxuICB9XHJcblxyXG4gIC8qXHJcbiAgICogRm9yIHNlbGVjdGlvbiBtb2RlIGRpc2FibGVkIGF0dHJpYnV0ZVxyXG4gICAqL1xyXG4gIGxvd2VyYWJsZUxheWVycyhsYXllcnM6IExheWVyW10pIHtcclxuICAgIGxldCByZXNwb25zZSA9IGZhbHNlO1xyXG4gICAgbGV0IGJhc2UgPSAwO1xyXG4gICAgZm9yIChjb25zdCBsYXllciBvZiBsYXllcnMpIHtcclxuICAgICAgY29uc3QgbWFwSW5kZXggPSB0aGlzLmxheWVycy5maW5kSW5kZXgobGF5ID0+wqBsYXllci5pZCA9PT0gbGF5LmlkKTtcclxuICAgICAgY29uc3QgY3VycmVudExheWVyID0gdGhpcy5sYXllcnNbbWFwSW5kZXhdO1xyXG4gICAgICBpZiAoY3VycmVudExheWVyLmJhc2VMYXllcikge1xyXG4gICAgICAgIGJhc2UgKz0gMTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgbmV4dExheWVyID0gdGhpcy5sYXllcnNbbWFwSW5kZXggKyAxXTtcclxuICAgICAgaWYgKG5leHRMYXllciAmJiBuZXh0TGF5ZXIuYmFzZUxheWVyICE9PSB0cnVlICYmICFsYXllcnMuZmluZChsYXkgPT4gbmV4dExheWVyLmlkID09PSBsYXkuaWQpKSB7XHJcbiAgICAgICAgcmVzcG9uc2UgPSB0cnVlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCh0aGlzLmxheWVyc0NoZWNrZWQubGVuZ3RoID09PSAxICYmIHRoaXMubGF5ZXJzQ2hlY2tlZFswXS5iYXNlTGF5ZXIpIHx8IGJhc2UgPT09IHRoaXMubGF5ZXJzQ2hlY2tlZC5sZW5ndGgpIHtcclxuICAgICAgcmVzcG9uc2UgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIHJldHVybiByZXNwb25zZTtcclxuICB9XHJcblxyXG4gIC8qXHJcbiAgICogV2hlbiBtdWx0aXBsZSBsYXllcnMgaXMgc2VsZWN0ZWQgYnV0IHNvbWUgbWF5IGJlIGFsbG93IHRvIG1vdmVcclxuICAgKi9cclxuICBsb3dlcmFibGVMYXllcihpbmRleDogbnVtYmVyKSB7XHJcbiAgICBpZiAoaW5kZXggPiB0aGlzLmxheWVycy5maWx0ZXIobGF5ID0+IGxheS5iYXNlTGF5ZXIgIT09IHRydWUpLmxlbmd0aCAtIDIpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLmxheWVyc1tpbmRleCArIDFdLm9wdGlvbnMuY2hlY2spIHtcclxuICAgICAgcmV0dXJuIHRoaXMubG93ZXJhYmxlTGF5ZXIoaW5kZXggKyAxKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuXHJcbiAgbG93ZXJMYXllcnMobGF5ZXJzOiBMYXllcltdKSB7XHJcbiAgICBjb25zdCBsYXllcnNUb0xvd2VyID0gW107XHJcbiAgICBmb3IgKGNvbnN0IGxheWVyIG9mIGxheWVycykge1xyXG4gICAgICBjb25zdCBpbmRleCA9IHRoaXMubGF5ZXJzLmZpbmRJbmRleChsYXkgPT4gbGF5LmlkID09PSBsYXllci5pZCk7XHJcbiAgICAgIGlmICh0aGlzLmxvd2VyYWJsZUxheWVyKGluZGV4KSkge1xyXG4gICAgICAgIGxheWVyc1RvTG93ZXIucHVzaChsYXllcik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHRoaXMubWFwLmxvd2VyTGF5ZXJzKGxheWVyc1RvTG93ZXIpO1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIGNvbnN0IGVsZW1lbnRzID0gdGhpcy5jb21wdXRlRWxlbWVudFJlZignbG93ZXInKTtcclxuICAgICAgaWYgKCF0aGlzLmlzU2Nyb2xsZWRJbnRvVmlldyhlbGVtZW50c1swXSwgZWxlbWVudHNbMV0ub2Zmc2V0UGFyZW50KSkge1xyXG4gICAgICAgIGVsZW1lbnRzWzBdLnNjcm9sbFRvcCA9IGVsZW1lbnRzWzFdLm9mZnNldFBhcmVudC5vZmZzZXRUb3AgKyBlbGVtZW50c1sxXS5vZmZzZXRQYXJlbnQub2Zmc2V0SGVpZ2h0IC0gZWxlbWVudHNbMF0uY2xpZW50SGVpZ2h0O1xyXG4gICAgICB9XHJcbiAgICB9LCAxMDApO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBuZXh0KCkge1xyXG4gICAgdGhpcy5jaGFuZ2UkLm5leHQoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY29tcHV0ZUxheWVycyhsYXllcnM6IExheWVyW10pOiBMYXllcltdIHtcclxuICAgIGxldCBsYXllcnNPdXQgPSB0aGlzLmZpbHRlckxheWVycyhsYXllcnMpO1xyXG4gICAgaWYgKHRoaXMuc29ydEFscGhhKSB7XHJcbiAgICAgIGxheWVyc091dCA9IHRoaXMuc29ydExheWVyc0J5VGl0bGUobGF5ZXJzT3V0KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGxheWVyc091dCA9IHRoaXMuc29ydExheWVyc0J5WmluZGV4KGxheWVyc091dCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbGF5ZXJzT3V0O1xyXG4gIH1cclxuXHJcbiAgb25LZXl3b3JkQ2hhbmdlKHRlcm0pIHtcclxuICAgIHRoaXMua2V5d29yZCA9IHRlcm07XHJcbiAgfVxyXG5cclxuICBvbkFwcGxpZWRGaWx0ZXJBbmRTb3J0Q2hhbmdlKGFwcGxpZWRGaWx0ZXI6IExheWVyTGlzdENvbnRyb2xzT3B0aW9ucykge1xyXG4gICAgdGhpcy5rZXl3b3JkID0gYXBwbGllZEZpbHRlci5rZXl3b3JkO1xyXG4gICAgdGhpcy5vbmx5VmlzaWJsZSA9IGFwcGxpZWRGaWx0ZXIub25seVZpc2libGU7XHJcbiAgICB0aGlzLnNvcnRBbHBoYSA9IGFwcGxpZWRGaWx0ZXIuc29ydEFscGhhO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBmaWx0ZXJMYXllcnMobGF5ZXJzOiBMYXllcltdKTogTGF5ZXJbXSB7XHJcbiAgICBpZiAoXHJcbiAgICAgIHRoaXMubGF5ZXJGaWx0ZXJBbmRTb3J0T3B0aW9ucy5zaG93VG9vbGJhciA9PT0gTGF5ZXJMaXN0Q29udHJvbHNFbnVtLm5ldmVyXHJcbiAgICApIHtcclxuICAgICAgcmV0dXJuIGxheWVycztcclxuICAgIH1cclxuICAgIGlmICghdGhpcy5rZXl3b3JkICYmICF0aGlzLm9ubHlWaXNpYmxlKSB7XHJcbiAgICAgIHJldHVybiBsYXllcnM7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qga2VlcExheWVySWRzID0gbGF5ZXJzLm1hcCgobGF5ZXI6IExheWVyKSA9PiBsYXllci5pZCk7XHJcblxyXG4gICAgbGF5ZXJzLmZvckVhY2goKGxheWVyOiBMYXllcikgPT4ge1xyXG4gICAgICBjb25zdCBsYXllck9wdGlvbnMgPSAobGF5ZXIub3B0aW9ucyBhcyBNZXRhZGF0YUxheWVyT3B0aW9ucykgfHwge307XHJcbiAgICAgIGNvbnN0IGRhdGFTb3VyY2VPcHRpb25zID0gbGF5ZXIuZGF0YVNvdXJjZS5vcHRpb25zIHx8IHt9O1xyXG4gICAgICBjb25zdCBtZXRhZGF0YSA9IGxheWVyT3B0aW9ucy5tZXRhZGF0YSB8fCAoe30gYXMgTWV0YWRhdGFPcHRpb25zKTtcclxuICAgICAgY29uc3Qga2V5d29yZHMgPSBtZXRhZGF0YS5rZXl3b3JkTGlzdCB8fCBbXTtcclxuICAgICAgY29uc3QgbGF5ZXJLZXl3b3JkcyA9IGtleXdvcmRzLm1hcCgoa3c6IHN0cmluZykgPT4ge1xyXG4gICAgICAgIHJldHVybiBrdy5ub3JtYWxpemUoJ05GRCcpLnJlcGxhY2UoL1tcXHUwMzAwLVxcdTAzNmZdL2csICcnKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBpZiAodGhpcy5rZXl3b3JkICYmIGxheWVyLnRpdGxlKSB7XHJcbiAgICAgICAgY29uc3QgbG9jYWxLZXl3b3JkID0gdGhpcy5rZXl3b3JkXHJcbiAgICAgICAgICAubm9ybWFsaXplKCdORkQnKVxyXG4gICAgICAgICAgLnJlcGxhY2UoL1tcXHUwMzAwLVxcdTAzNmZdL2csICcnKTtcclxuICAgICAgICBjb25zdCBsYXllclRpdGxlID0gbGF5ZXIudGl0bGVcclxuICAgICAgICAgIC5ub3JtYWxpemUoJ05GRCcpXHJcbiAgICAgICAgICAucmVwbGFjZSgvW1xcdTAzMDAtXFx1MDM2Zl0vZywgJycpO1xyXG4gICAgICAgIGNvbnN0IGRhdGFTb3VyY2VUeXBlID0gZGF0YVNvdXJjZU9wdGlvbnMudHlwZSB8fCAnJztcclxuICAgICAgICBjb25zdCBrZXl3b3JkUmVnZXggPSBuZXcgUmVnRXhwKGxvY2FsS2V5d29yZCwgJ2dpJyk7XHJcbiAgICAgICAgY29uc3Qga2V5d29yZEluTGlzdCA9XHJcbiAgICAgICAgICBsYXllcktleXdvcmRzLmZpbmQoKGt3OiBzdHJpbmcpID0+IGtleXdvcmRSZWdleC50ZXN0KGt3KSkgIT09XHJcbiAgICAgICAgICB1bmRlZmluZWQ7XHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAgIWtleXdvcmRSZWdleC50ZXN0KGxheWVyVGl0bGUpICYmXHJcbiAgICAgICAgICAhKHRoaXMua2V5d29yZC50b0xvd2VyQ2FzZSgpID09PSBkYXRhU291cmNlVHlwZS50b0xvd2VyQ2FzZSgpKSAmJlxyXG4gICAgICAgICAgIWtleXdvcmRJbkxpc3RcclxuICAgICAgICApIHtcclxuICAgICAgICAgIGNvbnN0IGluZGV4ID0ga2VlcExheWVySWRzLmluZGV4T2YobGF5ZXIuaWQpO1xyXG4gICAgICAgICAgaWYgKGluZGV4ID4gLTEpIHtcclxuICAgICAgICAgICAga2VlcExheWVySWRzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAodGhpcy5vbmx5VmlzaWJsZSAmJiBsYXllci52aXNpYmxlID09PSBmYWxzZSkge1xyXG4gICAgICAgIGNvbnN0IGluZGV4ID0ga2VlcExheWVySWRzLmluZGV4T2YobGF5ZXIuaWQpO1xyXG4gICAgICAgIGlmIChpbmRleCA+IC0xKSB7XHJcbiAgICAgICAgICBrZWVwTGF5ZXJJZHMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBsYXllcnMuZmlsdGVyKFxyXG4gICAgICAobGF5ZXI6IExheWVyKSA9PiBrZWVwTGF5ZXJJZHMuaW5kZXhPZihsYXllci5pZCkgIT09IC0xXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzb3J0TGF5ZXJzQnlaaW5kZXgobGF5ZXJzOiBMYXllcltdKSB7XHJcbiAgICByZXR1cm4gbGF5ZXJzLnNvcnQoKGxheWVyMSwgbGF5ZXIyKSA9PiBsYXllcjIuekluZGV4IC0gbGF5ZXIxLnpJbmRleCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHNvcnRMYXllcnNCeVRpdGxlKGxheWVyczogTGF5ZXJbXSkge1xyXG4gICAgcmV0dXJuIGxheWVycy5zb3J0KChhLCBiKSA9PiB7XHJcbiAgICAgIGlmICh0aGlzLm5vcm1hbGl6ZShhLnRpdGxlKSA8IHRoaXMubm9ybWFsaXplKGIudGl0bGUpKSB7XHJcbiAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICh0aGlzLm5vcm1hbGl6ZShhLnRpdGxlKSA+IHRoaXMubm9ybWFsaXplKGIudGl0bGUpKSB7XHJcbiAgICAgICAgcmV0dXJuIDE7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIDA7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgbm9ybWFsaXplKHN0cjogc3RyaW5nKSB7XHJcbiAgICByZXR1cm4gc3RyLm5vcm1hbGl6ZSgnTkZEJykucmVwbGFjZSgvW1xcdTAzMDAtXFx1MDM2Zl0vZywgJycpLnRvTG93ZXJDYXNlKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNvbXB1dGVTaG93VG9vbGJhcigpOiBib29sZWFuIHtcclxuICAgIHN3aXRjaCAodGhpcy5sYXllckZpbHRlckFuZFNvcnRPcHRpb25zLnNob3dUb29sYmFyKSB7XHJcbiAgICAgIGNhc2UgTGF5ZXJMaXN0Q29udHJvbHNFbnVtLmFsd2F5czpcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgY2FzZSBMYXllckxpc3RDb250cm9sc0VudW0ubmV2ZXI6XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgIHRoaXMubGF5ZXJzLmxlbmd0aCA+PSB0aGlzLnRocmVzaG9sZFRvRmlsdGVyQW5kU29ydCB8fFxyXG4gICAgICAgICAgdGhpcy5rZXl3b3JkIHx8XHJcbiAgICAgICAgICB0aGlzLm9ubHlWaXNpYmxlXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdG9nZ2xlTGF5ZXJUb29sKGxheWVyKSB7XHJcbiAgICB0aGlzLnRvZ2dsZU9wYWNpdHkgPSBmYWxzZTtcclxuICAgIGlmICh0aGlzLmxheWVyVG9vbCAmJiBsYXllciA9PT0gdGhpcy5hY3RpdmVMYXllcikge1xyXG4gICAgICB0aGlzLmxheWVyVG9vbCA9IGZhbHNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5sYXllclRvb2wgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAoY29uc3QgbGF5IG9mIHRoaXMubGF5ZXJzKSB7XHJcbiAgICAgIGxheS5vcHRpb25zLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgbGF5ZXIub3B0aW9ucy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgdGhpcy5hY3RpdmVMYXllciA9IGxheWVyO1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuXHJcbiAgcmVtb3ZlTGF5ZXJzKGxheWVycz86IExheWVyW10pIHtcclxuICAgIGlmIChsYXllcnMgJiYgbGF5ZXJzLmxlbmd0aCA+IDApIHtcclxuICAgICAgZm9yIChjb25zdCBsYXllciBvZiBsYXllcnMpIHtcclxuICAgICAgICBsYXllci5tYXAucmVtb3ZlTGF5ZXIobGF5ZXIpO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMubGF5ZXJzQ2hlY2tlZCA9IFtdO1xyXG4gICAgfSBlbHNlIGlmICghbGF5ZXJzKSB7XHJcbiAgICAgIHRoaXMuYWN0aXZlTGF5ZXIubWFwLnJlbW92ZUxheWVyKHRoaXMuYWN0aXZlTGF5ZXIpO1xyXG4gICAgICB0aGlzLmxheWVyVG9vbCA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuXHJcbiAgbGF5ZXJzQ2hlY2soZXZlbnQ6IHtsYXllcjogTGF5ZXI7IGNoZWNrOiBib29sZWFufSkge1xyXG4gICAgZXZlbnQubGF5ZXIub3B0aW9ucy5jaGVjayA9IGV2ZW50LmNoZWNrO1xyXG4gICAgaWYgKGV2ZW50LmNoZWNrID09PSB0cnVlKSB7XHJcbiAgICAgIGNvbnN0IGV2ZW50TWFwSW5kZXggPSB0aGlzLmxheWVycy5maW5kSW5kZXgobGF5ZXIgPT7CoGV2ZW50LmxheWVyLmlkID09PSBsYXllci5pZCk7XHJcbiAgICAgIGZvciAoY29uc3QgbGF5ZXIgb2YgdGhpcy5sYXllcnNDaGVja2VkKSB7XHJcbiAgICAgICAgY29uc3QgbWFwSW5kZXggPSB0aGlzLmxheWVycy5maW5kSW5kZXgobGF5ID0+wqBsYXllci5pZCA9PT0gbGF5LmlkKTtcclxuICAgICAgICBpZiAoZXZlbnRNYXBJbmRleCA8IG1hcEluZGV4KSB7XHJcbiAgICAgICAgICB0aGlzLmxheWVyc0NoZWNrZWQuc3BsaWNlKHRoaXMubGF5ZXJzQ2hlY2tlZC5maW5kSW5kZXgobGF5ID0+wqBsYXllci5pZCA9PT0gbGF5LmlkKSwgMCwgZXZlbnQubGF5ZXIpO1xyXG5cclxuICAgICAgICAgIGlmICh0aGlzLmV4Y2x1ZGVCYXNlTGF5ZXJzKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmxheWVyc0NoZWNrZWQubGVuZ3RoID09PSB0aGlzLmxheWVycy5maWx0ZXIobGF5ID0+IChsYXkuYmFzZUxheWVyICE9PSB0cnVlICYmIGxheS5zaG93SW5MYXllckxpc3QpKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICB0aGlzLnNlbGVjdEFsbENoZWNrID0gdHJ1ZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICB0aGlzLnNlbGVjdEFsbENoZWNrID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0gZWxzZSBpZiAoIXRoaXMuZXhjbHVkZUJhc2VMYXllcnMpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMubGF5ZXJzQ2hlY2tlZC5sZW5ndGggPT09IHRoaXMubGF5ZXJzLmZpbHRlcihsYXkgPT4gbGF5LnNob3dJbkxheWVyTGlzdCkubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5zZWxlY3RBbGxDaGVjayA9IHRydWU7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5zZWxlY3RBbGxDaGVjayA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHRoaXMubGF5ZXJzQ2hlY2tlZC5wdXNoKGV2ZW50LmxheWVyKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5sYXllcnNDaGVja2VkLmZpbmRJbmRleChsYXllciA9PiBldmVudC5sYXllci5pZCA9PT0gbGF5ZXIuaWQpO1xyXG4gICAgICB0aGlzLmxheWVyc0NoZWNrZWQuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5leGNsdWRlQmFzZUxheWVycykge1xyXG4gICAgICBpZiAodGhpcy5sYXllcnNDaGVja2VkLmxlbmd0aCA9PT0gdGhpcy5sYXllcnMuZmlsdGVyKGxheSA9PiAobGF5LmJhc2VMYXllciAhPT0gdHJ1ZSAmJiBsYXkuc2hvd0luTGF5ZXJMaXN0KSkubGVuZ3RoKSB7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RBbGxDaGVjayA9IHRydWU7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RBbGxDaGVjayA9IGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKCF0aGlzLmV4Y2x1ZGVCYXNlTGF5ZXJzKSB7XHJcbiAgICAgIGlmICh0aGlzLmxheWVyc0NoZWNrZWQubGVuZ3RoID09PSB0aGlzLmxheWVycy5maWx0ZXIobGF5ID0+IGxheS5zaG93SW5MYXllckxpc3QpLmxlbmd0aCkge1xyXG4gICAgICAgIHRoaXMuc2VsZWN0QWxsQ2hlY2sgPSB0cnVlO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuc2VsZWN0QWxsQ2hlY2sgPSBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdG9nZ2xlU2VsZWN0aW9uTW9kZSh2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgdGhpcy5zZWxlY3Rpb24gPSB2YWx1ZTtcclxuICAgIHRoaXMuYWN0aXZlTGF5ZXIgPSB1bmRlZmluZWQ7XHJcbiAgICBpZiAodmFsdWUgPT09IHRydWUpIHtcclxuICAgICAgdGhpcy5sYXllclRvb2wgPSBmYWxzZTtcclxuICAgICAgZm9yIChjb25zdCBsYXllciBvZiB0aGlzLmxheWVycykge1xyXG4gICAgICAgIGlmIChsYXllci5vcHRpb25zLmNoZWNrKSB7XHJcbiAgICAgICAgICB0aGlzLmxheWVyc0NoZWNrZWQucHVzaChsYXllcik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBsYXllcnNDaGVja2VkT3BhY2l0eSgpOiBhbnkge1xyXG4gICAgaWYgKHRoaXMubGF5ZXJzQ2hlY2tlZC5sZW5ndGggPiAxKSB7XHJcbiAgICAgIHJldHVybiAxO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc3Qgb3BhY2l0eSA9IFtdO1xyXG4gICAgICBmb3IgKGNvbnN0IGxheWVyIG9mIHRoaXMubGF5ZXJzQ2hlY2tlZCkge1xyXG4gICAgICAgIG9wYWNpdHkucHVzaChsYXllci5vcGFjaXR5KTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gb3BhY2l0eTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNlbGVjdEFsbCgpIHtcclxuICAgIGlmICghdGhpcy5zZWxlY3RBbGxDaGVjaykge1xyXG4gICAgICBmb3IgKGNvbnN0IGxheWVyIG9mIHRoaXMubGF5ZXJzKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZXhjbHVkZUJhc2VMYXllcnMgJiYgbGF5ZXIuYmFzZUxheWVyICE9PSB0cnVlICYmIGxheWVyLnNob3dJbkxheWVyTGlzdCkge1xyXG4gICAgICAgICAgbGF5ZXIub3B0aW9ucy5jaGVjayA9IHRydWU7XHJcbiAgICAgICAgICB0aGlzLmxheWVyc0NoZWNrZWQucHVzaChsYXllcik7XHJcbiAgICAgICAgfSBlbHNlIGlmICghdGhpcy5leGNsdWRlQmFzZUxheWVycyAmJiBsYXllci5zaG93SW5MYXllckxpc3QpIHtcclxuICAgICAgICAgIGxheWVyLm9wdGlvbnMuY2hlY2sgPSB0cnVlO1xyXG4gICAgICAgICAgdGhpcy5sYXllcnNDaGVja2VkLnB1c2gobGF5ZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICB0aGlzLnNlbGVjdEFsbENoZWNrJC5uZXh0KHRydWUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZm9yIChjb25zdCBsYXllciBvZiB0aGlzLmxheWVycykge1xyXG4gICAgICAgIGxheWVyLm9wdGlvbnMuY2hlY2sgPSBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmxheWVyc0NoZWNrZWQgPSBbXTtcclxuICAgICAgdGhpcy5zZWxlY3RBbGxDaGVjayQubmV4dChmYWxzZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBpc1Njcm9sbGVkSW50b1ZpZXcoZWxlbVNvdXJjZSwgZWxlbSkge1xyXG4gICAgY29uc3QgZG9jVmlld1RvcCA9IGVsZW1Tb3VyY2Uuc2Nyb2xsVG9wO1xyXG4gICAgY29uc3QgZG9jVmlld0JvdHRvbSA9IGRvY1ZpZXdUb3AgKyBlbGVtU291cmNlLmNsaWVudEhlaWdodDtcclxuXHJcbiAgICBjb25zdCBlbGVtVG9wID0gZWxlbS5vZmZzZXRUb3A7XHJcbiAgICBjb25zdCBlbGVtQm90dG9tID0gZWxlbVRvcCArIGVsZW0uY2xpZW50SGVpZ2h0O1xyXG4gICAgcmV0dXJuICgoZWxlbUJvdHRvbSA8PSBkb2NWaWV3Qm90dG9tKSAmJiAoZWxlbVRvcCA+PSBkb2NWaWV3VG9wKSk7XHJcbiAgfVxyXG5cclxuICBjb21wdXRlRWxlbWVudFJlZih0eXBlPzogc3RyaW5nKSB7XHJcbiAgICBjb25zdCBjaGVja0l0ZW1zID0gdGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ21hdC1jaGVja2JveC1jaGVja2VkJyk7XHJcbiAgICBjb25zdCBjaGVja0l0ZW0gPSB0eXBlID09PSAnbG93ZXInID8gdGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ21hdC1jaGVja2JveC1jaGVja2VkJylbY2hlY2tJdGVtcy5sZW5ndGggLSAxXSA6XHJcbiAgICAgIHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdtYXQtY2hlY2tib3gtY2hlY2tlZCcpWzBdO1xyXG4gICAgY29uc3QgaWdvTGlzdCA9IHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaWdvLWxpc3QnKVswXTtcclxuXHJcbiAgICByZXR1cm4gW2lnb0xpc3QsIGNoZWNrSXRlbV07XHJcbiAgfVxyXG59XHJcbiJdfQ==
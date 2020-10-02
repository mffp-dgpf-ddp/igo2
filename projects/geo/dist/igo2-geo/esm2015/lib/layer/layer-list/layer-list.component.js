/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ChangeDetectionStrategy, TemplateRef, ContentChild, Output, EventEmitter, ElementRef } from '@angular/core';
import { LayerListControlsEnum } from './layer-list.enum';
import { BehaviorSubject, ReplaySubject, EMPTY, timer } from 'rxjs';
import { debounce } from 'rxjs/operators';
import { IgoMap } from '../../map/shared/map';
// TODO: This class could use a clean up. Also, some methods could be moved ealsewhere
export class LayerListComponent {
    /**
     * @param {?} elRef
     */
    constructor(elRef) {
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
    /**
     * @return {?}
     */
    get map() {
        return this._map;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set map(value) {
        this._map = value;
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
     * @param {?} value
     * @return {?}
     */
    set activeLayer(value) {
        this._activeLayer = value;
        this.activeLayer$.next(value);
    }
    /**
     * @return {?}
     */
    get activeLayer() {
        return this._activeLayer;
    }
    /**
     * @return {?}
     */
    get keyword() {
        return this._keyword;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set keyword(value) {
        this._keyword = value;
        this.next();
    }
    /**
     * @return {?}
     */
    get onlyVisible() {
        return this._onlyVisible;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set onlyVisible(value) {
        this._onlyVisible = value;
        this.next();
    }
    /**
     * @return {?}
     */
    get sortAlpha() {
        return this._sortedAlpha;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set sortAlpha(value) {
        this._sortedAlpha = value;
        this.next();
    }
    /**
     * @return {?}
     */
    get opacity() {
        return Math.round(this.activeLayer$.getValue().opacity * 100);
    }
    /**
     * @param {?} opacity
     * @return {?}
     */
    set opacity(opacity) {
        this.activeLayer$.getValue().opacity = opacity / 100;
    }
    /**
     * @return {?}
     */
    get badgeOpacity() {
        if (this.opacity === 100) {
            return;
        }
        return this.opacity;
    }
    /**
     * @return {?}
     */
    get raiseDisabled() {
        if (!this.orderable || this.activeLayer.baseLayer || this.getUpperLayer().id === this.activeLayer.id ||
            this.isUpperBaselayer(this.activeLayer)) {
            return true;
        }
        return false;
    }
    /**
     * @return {?}
     */
    get lowerDisabled() {
        if (!this.orderable || this.activeLayer.baseLayer || this.getLowerLayer().id === this.activeLayer.id ||
            this.isLowerBaselayer(this.activeLayer)) {
            return true;
        }
        return false;
    }
    /**
     * @return {?}
     */
    get raiseDisabledSelection() {
        if (this.layersChecked.length === 0 || !this.orderable || !this.raisableLayers(this.layersChecked) || this.selectAllCheck === true) {
            return true;
        }
        return false;
    }
    /**
     * @return {?}
     */
    get lowerDisabledSelection() {
        if (this.layersChecked.length === 0 || !this.orderable || !this.lowerableLayers(this.layersChecked) || this.selectAllCheck === true) {
            return true;
        }
        return false;
    }
    /**
     * @return {?}
     */
    get checkOpacity() {
        return this.layersCheckedOpacity() * 100;
    }
    /**
     * @param {?} opacity
     * @return {?}
     */
    set checkOpacity(opacity) {
        for (const layer of this.layersChecked) {
            layer.opacity = opacity / 100;
        }
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
            this.appliedFilterAndSort.emit({
                keyword: this.keyword,
                sortAlpha: this.sortAlpha,
                onlyVisible: this.onlyVisible
            });
        }));
        this.selectAllCheck$$ = this.selectAllCheck$.subscribe((/**
         * @param {?} value
         * @return {?}
         */
        (value) => {
            this.selectAllCheck = value;
        }));
        this.layers$.subscribe((/**
         * @return {?}
         */
        () => {
            if (this.layers) {
                /** @type {?} */
                let checks = 0;
                for (const layer of this.layers) {
                    if (layer.options.active) {
                        this.activeLayer = layer;
                        this.layerTool = true;
                    }
                    if (layer.options.check) {
                        checks += 1;
                    }
                }
                if (this.excludeBaseLayers) {
                    this.selectAllCheck = checks === this.layers.filter((/**
                     * @param {?} lay
                     * @return {?}
                     */
                    lay => lay.baseLayer !== true && lay.showInLayerList)).length ? true : false;
                }
                else {
                    this.selectAllCheck = checks === this.layers.filter((/**
                     * @param {?} lay
                     * @return {?}
                     */
                    lay => lay.showInLayerList)).length ? true : false;
                }
            }
        }));
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
     * @param {?} layer
     * @return {?}
     */
    isLowerBaselayer(layer) {
        /** @type {?} */
        const index = this.layers.findIndex((/**
         * @param {?} lay
         * @return {?}
         */
        lay => layer.id === lay.id));
        if (this.layers && this.layers[index + 1] && this.layers[index + 1].baseLayer === true) {
            return true;
        }
        return false;
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
     * @param {?} layer
     * @return {?}
     */
    isUpperBaselayer(layer) {
        /** @type {?} */
        const index = this.layers.findIndex((/**
         * @param {?} lay
         * @return {?}
         */
        lay => layer.id === lay.id));
        if (this.layers && this.layers[index - 1] && this.layers[index - 1].baseLayer === true) {
            return true;
        }
        return false;
    }
    /*
       * For selection mode disabled attribute
       */
    /**
     * @param {?} layers
     * @return {?}
     */
    raisableLayers(layers) {
        /** @type {?} */
        let response = false;
        /** @type {?} */
        let base = 0;
        for (const layer of layers) {
            /** @type {?} */
            const mapIndex = this.layers.findIndex((/**
             * @param {?} lay
             * @return {?}
             */
            lay => layer.id === lay.id));
            /** @type {?} */
            const currentLayer = this.layers[mapIndex];
            if (currentLayer.baseLayer) {
                base += 1;
            }
            /** @type {?} */
            const previousLayer = this.layers[mapIndex - 1];
            if (previousLayer && previousLayer.baseLayer !== true && !layers.find((/**
             * @param {?} lay
             * @return {?}
             */
            lay => previousLayer.id === lay.id)) &&
                currentLayer.baseLayer !== true) {
                response = true;
            }
        }
        if ((this.layersChecked.length === 1 && this.layersChecked[0].baseLayer) || base === this.layersChecked.length) {
            response = false;
        }
        return response;
    }
    /*
       * When multiple layers is selected but some may be allow to move
       */
    /**
     * @param {?} index
     * @return {?}
     */
    raisableLayer(index) {
        if (index < 1) {
            return false;
        }
        if (this.layers[index - 1].options.check) {
            return this.raisableLayer(index - 1);
        }
        return true;
    }
    /**
     * @param {?} layers
     * @return {?}
     */
    raiseLayers(layers) {
        /** @type {?} */
        const layersToRaise = [];
        for (const layer of layers) {
            /** @type {?} */
            const index = this.layers.findIndex((/**
             * @param {?} lay
             * @return {?}
             */
            lay => lay.id === layer.id));
            if (this.raisableLayer(index)) {
                layersToRaise.push(layer);
            }
        }
        this.map.raiseLayers(layersToRaise);
        setTimeout((/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            const elements = this.computeElementRef();
            if (!this.isScrolledIntoView(elements[0], elements[1].offsetParent)) {
                elements[0].scrollTop = elements[1].offsetParent.offsetTop;
            }
        }), 100);
    }
    /*
       * For selection mode disabled attribute
       */
    /**
     * @param {?} layers
     * @return {?}
     */
    lowerableLayers(layers) {
        /** @type {?} */
        let response = false;
        /** @type {?} */
        let base = 0;
        for (const layer of layers) {
            /** @type {?} */
            const mapIndex = this.layers.findIndex((/**
             * @param {?} lay
             * @return {?}
             */
            lay => layer.id === lay.id));
            /** @type {?} */
            const currentLayer = this.layers[mapIndex];
            if (currentLayer.baseLayer) {
                base += 1;
            }
            /** @type {?} */
            const nextLayer = this.layers[mapIndex + 1];
            if (nextLayer && nextLayer.baseLayer !== true && !layers.find((/**
             * @param {?} lay
             * @return {?}
             */
            lay => nextLayer.id === lay.id))) {
                response = true;
            }
        }
        if ((this.layersChecked.length === 1 && this.layersChecked[0].baseLayer) || base === this.layersChecked.length) {
            response = false;
        }
        return response;
    }
    /*
       * When multiple layers is selected but some may be allow to move
       */
    /**
     * @param {?} index
     * @return {?}
     */
    lowerableLayer(index) {
        if (index > this.layers.filter((/**
         * @param {?} lay
         * @return {?}
         */
        lay => lay.baseLayer !== true)).length - 2) {
            return false;
        }
        if (this.layers[index + 1].options.check) {
            return this.lowerableLayer(index + 1);
        }
        return true;
    }
    /**
     * @param {?} layers
     * @return {?}
     */
    lowerLayers(layers) {
        /** @type {?} */
        const layersToLower = [];
        for (const layer of layers) {
            /** @type {?} */
            const index = this.layers.findIndex((/**
             * @param {?} lay
             * @return {?}
             */
            lay => lay.id === layer.id));
            if (this.lowerableLayer(index)) {
                layersToLower.push(layer);
            }
        }
        this.map.lowerLayers(layersToLower);
        setTimeout((/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            const elements = this.computeElementRef('lower');
            if (!this.isScrolledIntoView(elements[0], elements[1].offsetParent)) {
                elements[0].scrollTop = elements[1].offsetParent.offsetTop + elements[1].offsetParent.offsetHeight - elements[0].clientHeight;
            }
        }), 100);
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
        if (this.sortAlpha) {
            layersOut = this.sortLayersByTitle(layersOut);
        }
        else {
            layersOut = this.sortLayersByZindex(layersOut);
        }
        return layersOut;
    }
    /**
     * @param {?} term
     * @return {?}
     */
    onKeywordChange(term) {
        this.keyword = term;
    }
    /**
     * @param {?} appliedFilter
     * @return {?}
     */
    onAppliedFilterAndSortChange(appliedFilter) {
        this.keyword = appliedFilter.keyword;
        this.onlyVisible = appliedFilter.onlyVisible;
        this.sortAlpha = appliedFilter.sortAlpha;
    }
    /**
     * @private
     * @param {?} layers
     * @return {?}
     */
    filterLayers(layers) {
        if (this.layerFilterAndSortOptions.showToolbar === LayerListControlsEnum.never) {
            return layers;
        }
        if (!this.keyword && !this.onlyVisible) {
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
            if (this.keyword && layer.title) {
                /** @type {?} */
                const localKeyword = this.keyword
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
                    !(this.keyword.toLowerCase() === dataSourceType.toLowerCase()) &&
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
            if (this.normalize(a.title) < this.normalize(b.title)) {
                return -1;
            }
            if (this.normalize(a.title) > this.normalize(b.title)) {
                return 1;
            }
            return 0;
        }));
    }
    /**
     * @private
     * @param {?} str
     * @return {?}
     */
    normalize(str) {
        return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
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
                    this.onlyVisible) {
                    return true;
                }
                return false;
        }
    }
    /**
     * @param {?} layer
     * @return {?}
     */
    toggleLayerTool(layer) {
        this.toggleOpacity = false;
        if (this.layerTool && layer === this.activeLayer) {
            this.layerTool = false;
        }
        else {
            this.layerTool = true;
        }
        for (const lay of this.layers) {
            lay.options.active = false;
        }
        layer.options.active = true;
        this.activeLayer = layer;
        return;
    }
    /**
     * @param {?=} layers
     * @return {?}
     */
    removeLayers(layers) {
        if (layers && layers.length > 0) {
            for (const layer of layers) {
                layer.map.removeLayer(layer);
            }
            this.layersChecked = [];
        }
        else if (!layers) {
            this.activeLayer.map.removeLayer(this.activeLayer);
            this.layerTool = false;
        }
        return;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    layersCheck(event) {
        event.layer.options.check = event.check;
        if (event.check === true) {
            /** @type {?} */
            const eventMapIndex = this.layers.findIndex((/**
             * @param {?} layer
             * @return {?}
             */
            layer => event.layer.id === layer.id));
            for (const layer of this.layersChecked) {
                /** @type {?} */
                const mapIndex = this.layers.findIndex((/**
                 * @param {?} lay
                 * @return {?}
                 */
                lay => layer.id === lay.id));
                if (eventMapIndex < mapIndex) {
                    this.layersChecked.splice(this.layersChecked.findIndex((/**
                     * @param {?} lay
                     * @return {?}
                     */
                    lay => layer.id === lay.id)), 0, event.layer);
                    if (this.excludeBaseLayers) {
                        if (this.layersChecked.length === this.layers.filter((/**
                         * @param {?} lay
                         * @return {?}
                         */
                        lay => (lay.baseLayer !== true && lay.showInLayerList))).length) {
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
                        lay => lay.showInLayerList)).length) {
                            this.selectAllCheck = true;
                        }
                        else {
                            this.selectAllCheck = false;
                        }
                    }
                    return;
                }
            }
            this.layersChecked.push(event.layer);
        }
        else {
            /** @type {?} */
            const index = this.layersChecked.findIndex((/**
             * @param {?} layer
             * @return {?}
             */
            layer => event.layer.id === layer.id));
            this.layersChecked.splice(index, 1);
        }
        if (this.excludeBaseLayers) {
            if (this.layersChecked.length === this.layers.filter((/**
             * @param {?} lay
             * @return {?}
             */
            lay => (lay.baseLayer !== true && lay.showInLayerList))).length) {
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
            lay => lay.showInLayerList)).length) {
                this.selectAllCheck = true;
            }
            else {
                this.selectAllCheck = false;
            }
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    toggleSelectionMode(value) {
        this.selection = value;
        this.activeLayer = undefined;
        if (value === true) {
            this.layerTool = false;
            for (const layer of this.layers) {
                if (layer.options.check) {
                    this.layersChecked.push(layer);
                }
            }
        }
    }
    /**
     * @return {?}
     */
    layersCheckedOpacity() {
        if (this.layersChecked.length > 1) {
            return 1;
        }
        else {
            /** @type {?} */
            const opacity = [];
            for (const layer of this.layersChecked) {
                opacity.push(layer.opacity);
            }
            return opacity;
        }
    }
    /**
     * @return {?}
     */
    selectAll() {
        if (!this.selectAllCheck) {
            for (const layer of this.layers) {
                if (this.excludeBaseLayers && layer.baseLayer !== true && layer.showInLayerList) {
                    layer.options.check = true;
                    this.layersChecked.push(layer);
                }
                else if (!this.excludeBaseLayers && layer.showInLayerList) {
                    layer.options.check = true;
                    this.layersChecked.push(layer);
                }
            }
            this.selectAllCheck$.next(true);
        }
        else {
            for (const layer of this.layers) {
                layer.options.check = false;
            }
            this.layersChecked = [];
            this.selectAllCheck$.next(false);
        }
    }
    /**
     * @param {?} elemSource
     * @param {?} elem
     * @return {?}
     */
    isScrolledIntoView(elemSource, elem) {
        /** @type {?} */
        const docViewTop = elemSource.scrollTop;
        /** @type {?} */
        const docViewBottom = docViewTop + elemSource.clientHeight;
        /** @type {?} */
        const elemTop = elem.offsetTop;
        /** @type {?} */
        const elemBottom = elemTop + elem.clientHeight;
        return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
    }
    /**
     * @param {?=} type
     * @return {?}
     */
    computeElementRef(type) {
        /** @type {?} */
        const checkItems = this.elRef.nativeElement.getElementsByClassName('mat-checkbox-checked');
        /** @type {?} */
        const checkItem = type === 'lower' ? this.elRef.nativeElement.getElementsByClassName('mat-checkbox-checked')[checkItems.length - 1] :
            this.elRef.nativeElement.getElementsByClassName('mat-checkbox-checked')[0];
        /** @type {?} */
        const igoList = this.elRef.nativeElement.getElementsByTagName('igo-list')[0];
        return [igoList, checkItem];
    }
}
LayerListComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-layer-list',
                template: "<igo-list #igoList [ngClass]=\"(layerTool || selection) ? 'igo-list-min-height': 'igo-list-max-height'\" [navigation]=\"false\" [selection]=\"false\">\r\n  <igo-layer-list-tool *ngIf=\"showToolbar$ | async\"\r\n      floatLabel=\"auto\"\r\n      [layersAreAllVisible]=\"layersAreAllVisible\"\r\n      [term]=\"layerFilterAndSortOptions.keyword\"\r\n      [onlyVisible]=\"layerFilterAndSortOptions.onlyVisible\"\r\n      [sortAlpha]=\"layerFilterAndSortOptions.sortAlpha\"\r\n      (appliedFilterAndSort)=\"onAppliedFilterAndSortChange($event)\"\r\n      (selection)=\"toggleSelectionMode($event)\">\r\n    </igo-layer-list-tool>\r\n\r\n  <ng-template ngFor let-layer let-i=\"index\" [ngForOf]=\"layers$ | async\">\r\n    <igo-layer-item *ngIf=\"!(excludeBaseLayers && layer.baseLayer)\"\r\n        igoListItem\r\n        [layer]=\"layer\"\r\n        [activeLayer]=\"activeLayer\"\r\n        [orderable]=\"orderable && !layer.baseLayer\"\r\n        [lowerDisabled]=\"getLowerLayer().id === layer.id\"\r\n        [raiseDisabled]=\"getUpperLayer().id === layer.id\"\r\n        [queryBadge]=\"queryBadge\"\r\n        [expandLegendIfVisible]=\"expandLegendOfVisibleLayers\"\r\n        [updateLegendOnResolutionChange]=\"updateLegendOnResolutionChange\"\r\n        [toggleLegendOnVisibilityChange]=\"toggleLegendOnVisibilityChange\"\r\n        [selectionMode]=\"selection\"\r\n        [selectAll]=\"selectAllCheck\"\r\n        [layerCheck]=\"layer.options.check\"\r\n        (action)=\"toggleLayerTool($event)\"\r\n        (checkbox)=\"layersCheck($event)\">\r\n    </igo-layer-item>\r\n  </ng-template>\r\n</igo-list>\r\n\r\n<igo-panel *ngIf=\"!selection && layerTool && activeLayer\" class=\"igo-layer-actions-container\" [title]=\"activeLayer.title\">\r\n  <div class=\"igo-layer-button-group\">\r\n  <ng-container igoLayerItemToolbar\r\n    [ngTemplateOutlet]=\"templateLayerToolbar\"\r\n    [ngTemplateOutletContext]=\"{layer: activeLayer}\">\r\n  </ng-container>\r\n\r\n  <ng-content select=\"[igoLayerItemToolbar]\"></ng-content>\r\n    <!-- <label>{{ 'igo.geo.layer.opacity' | translate }} </label> -->\r\n    <button\r\n      color=\"primary\"\r\n      mat-icon-button\r\n      tooltip-position=\"below\"\r\n      matTooltipShowDelay=\"500\"\r\n      [matMenuTriggerFor]=\"opacityMenu\"\r\n      [matTooltip]=\"'igo.geo.layer.opacity' | translate\">\r\n      <mat-icon [matBadge]=\"badgeOpacity\" matBadgeColor=\"primary\" matBadgeSize=\"medium\" svgIcon=\"opacity\"></mat-icon>\r\n    </button>\r\n\r\n    <mat-menu #opacityMenu=\"matMenu\" class=\"mat-menu-opacity-slider\">\r\n      <div id=\"opacity-menu\">\r\n        <mat-slider\r\n          id=\"opacity-slider\"\r\n          color=\"primary\"\r\n          thumbLabel\r\n          tickInterval=\"5\"\r\n          step=\"5\"\r\n          [min]=\"0\"\r\n          [max]=\"100\"\r\n          [(ngModel)]=\"opacity\"\r\n          [matTooltip]=\"'igo.geo.layer.opacity' | translate\"\r\n          (click) = \"$event.stopPropagation()\"\r\n          matTooltipShowDelay=\"500\"\r\n          tooltip-position=\"below\">\r\n        </mat-slider>\r\n      </div>\r\n    </mat-menu>\r\n\r\n    <button\r\n      color=\"primary\"\r\n      mat-icon-button\r\n      tooltip-position=\"below\"\r\n      matTooltipShowDelay=\"500\"\r\n      [matTooltip]=\"(sortAlpha || onlyVisible || keyword) ? ('igo.geo.layer.filterRaiseLayer' | translate) : ('igo.geo.layer.raiseLayer' | translate)\"\r\n      [disabled]=\"raiseDisabled\"\r\n      (click)=\"activeLayer.map.raiseLayer(activeLayer)\">\r\n      <mat-icon [matBadge]=\"(sortAlpha || onlyVisible || keyword) ? '!' : ''\" matBadgeColor=\"warn\" matBadgeSize=\"medium\" [matBadgeHidden]=\"raiseDisabled\"\r\n                svgIcon=\"arrow-up\"></mat-icon>\r\n    </button>\r\n\r\n    <button\r\n      mat-icon-button\r\n      color=\"primary\"\r\n      tooltip-position=\"below\"\r\n      matTooltipShowDelay=\"500\"\r\n      [matTooltip]=\"(sortAlpha || onlyVisible || keyword) ? ('igo.geo.layer.filterLowerLayer' | translate) : ('igo.geo.layer.lowerLayer' | translate)\"\r\n      [disabled]=\"lowerDisabled\"\r\n      (click)=\"activeLayer.map.lowerLayer(activeLayer)\">\r\n      <mat-icon [matBadge]=\"(sortAlpha || onlyVisible || keyword) ? '!' : ''\" matBadgeColor=\"warn\" matBadgeSize=\"medium\" [matBadgeHidden]=\"lowerDisabled\"\r\n                svgIcon=\"arrow-down\"></mat-icon>\r\n    </button>\r\n\r\n    <button\r\n      mat-icon-button\r\n      color=\"warn\"\r\n      tooltip-position=\"below\"\r\n      matTooltipShowDelay=\"500\"\r\n      [matTooltip]=\"'igo.geo.layer.removeLayer' | translate\"\r\n      (click)=\"removeLayers()\">\r\n      <mat-icon svgIcon=\"delete\"></mat-icon>\r\n    </button>\r\n  </div>\r\n</igo-panel>\r\n\r\n<igo-panel *ngIf=\"selection && layers.length > 0\" class=\"igo-layer-actions-container\" [title]=\"'igo.geo.layer.tools' | translate\">\r\n  <div class=\"igo-layer-button-group\">\r\n\r\n    <button\r\n      mat-stroked-button\r\n      tooltip-position=\"below\"\r\n      matTooltipShowDelay=\"500\"\r\n      [disabled]=\"layers.length === 0\"\r\n      [matTooltip]=\"selectAllCheck ?\r\n                    ('igo.geo.layer.deselectAll' | translate) :\r\n                    ('igo.geo.layer.selectAll' | translate)\"\r\n      (click)=\"selectAll()\">\r\n      {{selectAllCheck ? ('igo.geo.layer.deselectAll' | translate) :\r\n                    ('igo.geo.layer.selectAll' | translate)}}\r\n    </button>\r\n\r\n    <!-- <label>{{ 'igo.geo.layer.opacity' | translate }} </label> -->\r\n    <button\r\n      color=\"primary\"\r\n      mat-icon-button\r\n      tooltip-position=\"below\"\r\n      matTooltipShowDelay=\"500\"\r\n      [disabled]=\"layersChecked.length === 0\"\r\n      [matMenuTriggerFor]=\"opacityMenu\"\r\n      [matTooltip]=\"'igo.geo.layer.opacity' | translate\">\r\n      <mat-icon svgIcon=\"opacity\"></mat-icon>\r\n    </button>\r\n\r\n    <mat-menu #opacityMenu=\"matMenu\"  class=\"mat-menu-opacity-slider\">\r\n      <div id=\"opacity-menu\">\r\n        <mat-slider *ngIf=\"layersChecked.length\"\r\n          id=\"opacity-slider\"\r\n          color=\"primary\"\r\n          thumbLabel\r\n          tickInterval=\"5\"\r\n          step=\"5\"\r\n          [min]=\"0\"\r\n          [max]=\"100\"\r\n          [(ngModel)]=\"checkOpacity\"\r\n          [matTooltip]=\"'igo.geo.layer.opacity' | translate\"\r\n          matTooltipShowDelay=\"500\"\r\n          tooltip-position=\"below\"\r\n          (click) = \"$event.stopPropagation()\">\r\n        </mat-slider>\r\n      </div>\r\n    </mat-menu>\r\n\r\n    <button\r\n      color=\"primary\"\r\n      mat-icon-button\r\n      tooltip-position=\"below\"\r\n      matTooltipShowDelay=\"500\"\r\n      [matTooltip]=\"(sortAlpha || onlyVisible || keyword) ? ('igo.geo.layer.filterRaiseLayer' | translate) : ('igo.geo.layer.raiseLayer' | translate)\"\r\n      [disabled]=\"raiseDisabledSelection\"\r\n      (click)=\"raiseLayers(layersChecked)\">\r\n      <mat-icon [matBadge]=\"(sortAlpha || onlyVisible || keyword) ? '!' : ''\" matBadgeColor=\"warn\" matBadgeSize=\"medium\" [matBadgeHidden]=\"raiseDisabledSelection\"\r\n                svgIcon=\"arrow-up\"></mat-icon>\r\n    </button>\r\n\r\n    <button\r\n      mat-icon-button\r\n      color=\"primary\"\r\n      tooltip-position=\"below\"\r\n      matTooltipShowDelay=\"500\"\r\n      [matTooltip]=\"(sortAlpha || onlyVisible || keyword) ? ('igo.geo.layer.filterLowerLayer' | translate) : ('igo.geo.layer.lowerLayer' | translate)\"\r\n      [disabled]=\"lowerDisabledSelection\"\r\n      (click)=\"lowerLayers(layersChecked)\">\r\n      <mat-icon [matBadge]=\"(sortAlpha || onlyVisible || keyword) ? '!' : ''\" matBadgeColor=\"warn\" matBadgeSize=\"medium\" [matBadgeHidden]=\"lowerDisabledSelection\"\r\n                svgIcon=\"arrow-down\"></mat-icon>\r\n    </button>\r\n\r\n    <button\r\n      mat-icon-button\r\n      color=\"warn\"\r\n      tooltip-position=\"below\"\r\n      matTooltipShowDelay=\"500\"\r\n      [disabled]=\"layersChecked.length === 0\"\r\n      [matTooltip]=\"'igo.geo.layer.removeLayer' | translate\"\r\n      (click)=\"removeLayers(layersChecked)\">\r\n      <mat-icon svgIcon=\"delete\"></mat-icon>\r\n    </button>\r\n  </div>\r\n</igo-panel>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host .igo-list-min-height{height:calc(100% - 91px);padding-top:8px}:host .igo-list-max-height{padding-top:8px}mat-form-field.inputFilter{width:calc(100% - 100px);max-width:200px}.igo-layer-actions-container{width:calc(100% - 5px);padding-left:5px}.igo-layer-actions-container>div{text-align:center}#opacity-slider{float:left;min-width:unset;width:110px;left:10px;top:10px}.igo-layer-button-group{display:-webkit-box;display:flex;float:right;padding-top:5px}:host igo-panel{height:unset}#opacity-menu{max-width:unset;width:132px;height:50px}#opacity-menu .mat-menu-content:not(:empty){padding-top:20px}"]
            }] }
];
/** @nocollapse */
LayerListComponent.ctorParameters = () => [
    { type: ElementRef }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5ZXItbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvbGF5ZXIvbGF5ZXItbGlzdC9sYXllci1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsdUJBQXVCLEVBQ3ZCLFdBQVcsRUFDWCxZQUFZLEVBR1osTUFBTSxFQUNOLFlBQVksRUFDWixVQUFVLEVBQ1gsTUFBTSxlQUFlLENBQUM7QUFJdkIsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDMUQsT0FBTyxFQUNMLGVBQWUsRUFDZixhQUFhLEVBRWIsS0FBSyxFQUNMLEtBQUssRUFDTixNQUFNLE1BQU0sQ0FBQztBQUNkLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQU0xQyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7O0FBUzlDLE1BQU0sT0FBTyxrQkFBa0I7Ozs7SUE0SjdCLFlBQ1UsS0FBaUI7UUFBakIsVUFBSyxHQUFMLEtBQUssQ0FBWTtRQTVKM0IsY0FBUyxHQUFHLElBQUksQ0FBQztRQUNqQiw2QkFBd0IsR0FBRyxDQUFDLENBQUM7UUFFN0IsWUFBTyxHQUE2QixJQUFJLGVBQWUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUU1RCxZQUFPLEdBQUcsSUFBSSxhQUFhLENBQU8sQ0FBQyxDQUFDLENBQUM7UUFFckMsaUJBQVksR0FBNkIsSUFBSSxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7UUFHcEUsaUJBQVksR0FBMkIsSUFBSSxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFdEUsa0JBQWEsR0FBWSxFQUFFLENBQUM7UUFPbkIsd0JBQW1CLEdBQVksSUFBSSxDQUFDO1FBRXBDLGNBQVMsR0FBWSxJQUFJLENBQUM7UUFFMUIsZUFBVSxHQUFZLElBQUksQ0FBQztR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eUJBRUwsS0FBSzttQ0FFTCxNQUFNOzs7O0lBbkVQLHVDQUFpQjs7SUFDakIsc0RBQTZCOztJQUU3QixxQ0FBNEQ7O0lBRTVELHFDQUFxQzs7SUFFckMsMENBQW9FOztJQUVwRSx1Q0FBMEI7O0lBQzFCLDBDQUFzRTs7SUFFdEUsMkNBQTRCOztJQUM1Qix1Q0FBaUI7Ozs7O0lBRWpCLHNDQUErQjs7SUFFL0Isa0RBQTRFOztJQUU1RSxpREFBNkM7O0lBRTdDLHVDQUFtQzs7SUFFbkMsd0NBQW9DOzs7OztJQVNwQyxrQ0FBcUI7Ozs7O0lBVXJCLHFDQUF5Qjs7Ozs7SUFTekIsMENBQTRCOztJQUU1Qix3Q0FBNkM7O0lBRTdDLHVEQUFrRTs7SUFFbEUsK0NBQTRDOztJQUU1Qyw0REFBeUQ7O0lBRXpELHlEQUFzRDs7SUFFdEQsNERBQXlEOztJQUV6RCx3Q0FBcUM7O0lBRXJDLGtEQUE4RTs7Ozs7SUFTOUUsc0NBQTZCOzs7OztJQVM3QiwwQ0FBNkI7Ozs7O0lBUzdCLDBDQUE2Qjs7SUF1RDdCLDJDQUE2Qjs7SUFFN0IsNkNBQWlFOztJQUNqRSw4Q0FBK0I7O0lBQy9CLDRDQUFzQjs7Ozs7SUFHcEIsbUNBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgSW5wdXQsXHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbiAgVGVtcGxhdGVSZWYsXHJcbiAgQ29udGVudENoaWxkLFxyXG4gIE9uSW5pdCxcclxuICBPbkRlc3Ryb3ksXHJcbiAgT3V0cHV0LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBFbGVtZW50UmVmXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEZsb2F0TGFiZWxUeXBlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xyXG5cclxuaW1wb3J0IHsgTGF5ZXIgfSBmcm9tICcuLi9zaGFyZWQnO1xyXG5pbXBvcnQgeyBMYXllckxpc3RDb250cm9sc0VudW0gfSBmcm9tICcuL2xheWVyLWxpc3QuZW51bSc7XHJcbmltcG9ydCB7XHJcbiAgQmVoYXZpb3JTdWJqZWN0LFxyXG4gIFJlcGxheVN1YmplY3QsXHJcbiAgU3Vic2NyaXB0aW9uLFxyXG4gIEVNUFRZLFxyXG4gIHRpbWVyXHJcbn0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IGRlYm91bmNlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQge1xyXG4gIE1ldGFkYXRhT3B0aW9ucyxcclxuICBNZXRhZGF0YUxheWVyT3B0aW9uc1xyXG59IGZyb20gJy4uLy4uL21ldGFkYXRhL3NoYXJlZC9tZXRhZGF0YS5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBMYXllckxpc3RDb250cm9sc09wdGlvbnMgfSBmcm9tICcuLi9sYXllci1saXN0LXRvb2wvbGF5ZXItbGlzdC10b29sLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IElnb01hcCB9IGZyb20gJy4uLy4uL21hcC9zaGFyZWQvbWFwJztcclxuXHJcbi8vIFRPRE86IFRoaXMgY2xhc3MgY291bGQgdXNlIGEgY2xlYW4gdXAuIEFsc28sIHNvbWUgbWV0aG9kcyBjb3VsZCBiZSBtb3ZlZCBlYWxzZXdoZXJlXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaWdvLWxheWVyLWxpc3QnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9sYXllci1saXN0LmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9sYXllci1saXN0LmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIExheWVyTGlzdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuICBvcmRlcmFibGUgPSB0cnVlO1xyXG4gIHRocmVzaG9sZFRvRmlsdGVyQW5kU29ydCA9IDU7XHJcblxyXG4gIGxheWVycyQ6IEJlaGF2aW9yU3ViamVjdDxMYXllcltdPiA9IG5ldyBCZWhhdmlvclN1YmplY3QoW10pO1xyXG5cclxuICBjaGFuZ2UkID0gbmV3IFJlcGxheVN1YmplY3Q8dm9pZD4oMSk7XHJcblxyXG4gIHNob3dUb29sYmFyJDogQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IEJlaGF2aW9yU3ViamVjdChmYWxzZSk7XHJcblxyXG4gIHB1YmxpYyBsYXllclRvb2w6IGJvb2xlYW47XHJcbiAgYWN0aXZlTGF5ZXIkOiBCZWhhdmlvclN1YmplY3Q8TGF5ZXI+ID0gbmV3IEJlaGF2aW9yU3ViamVjdCh1bmRlZmluZWQpO1xyXG5cclxuICBsYXllcnNDaGVja2VkOiBMYXllcltdID0gW107XHJcbiAgcHVibGljIHNlbGVjdGlvbjtcclxuXHJcbiAgcHJpdmF0ZSBjaGFuZ2UkJDogU3Vic2NyaXB0aW9uO1xyXG5cclxuICBAQ29udGVudENoaWxkKCdpZ29MYXllckl0ZW1Ub29sYmFyJykgdGVtcGxhdGVMYXllclRvb2xiYXI6IFRlbXBsYXRlUmVmPGFueT47XHJcblxyXG4gIEBJbnB1dCgpIGxheWVyc0FyZUFsbFZpc2libGU6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICBASW5wdXQoKSBvZ2NCdXR0b246IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICBASW5wdXQoKSB0aW1lQnV0dG9uOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgQElucHV0KClcclxuICBnZXQgbWFwKCk6IElnb01hcCB7XHJcbiAgICByZXR1cm4gdGhpcy5fbWFwO1xyXG4gIH1cclxuICBzZXQgbWFwKHZhbHVlOiBJZ29NYXApIHtcclxuICAgIHRoaXMuX21hcCA9IHZhbHVlO1xyXG4gIH1cclxuICBwcml2YXRlIF9tYXA6IElnb01hcDtcclxuXHJcbiAgQElucHV0KClcclxuICBzZXQgbGF5ZXJzKHZhbHVlOiBMYXllcltdKSB7XHJcbiAgICB0aGlzLl9sYXllcnMgPSB2YWx1ZTtcclxuICAgIHRoaXMubmV4dCgpO1xyXG4gIH1cclxuICBnZXQgbGF5ZXJzKCk6IExheWVyW10ge1xyXG4gICAgcmV0dXJuIHRoaXMuX2xheWVycztcclxuICB9XHJcbiAgcHJpdmF0ZSBfbGF5ZXJzOiBMYXllcltdO1xyXG5cclxuICBzZXQgYWN0aXZlTGF5ZXIodmFsdWU6IExheWVyKSB7XHJcbiAgICB0aGlzLl9hY3RpdmVMYXllciA9IHZhbHVlO1xyXG4gICAgdGhpcy5hY3RpdmVMYXllciQubmV4dCh2YWx1ZSk7XHJcbiAgfVxyXG4gIGdldCBhY3RpdmVMYXllcigpOiBMYXllciB7XHJcbiAgICByZXR1cm4gdGhpcy5fYWN0aXZlTGF5ZXI7XHJcbiAgfVxyXG4gIHByaXZhdGUgX2FjdGl2ZUxheWVyOiBMYXllcjtcclxuXHJcbiAgQElucHV0KCkgZmxvYXRMYWJlbDogRmxvYXRMYWJlbFR5cGUgPSAnYXV0byc7XHJcblxyXG4gIEBJbnB1dCgpIGxheWVyRmlsdGVyQW5kU29ydE9wdGlvbnM6IExheWVyTGlzdENvbnRyb2xzT3B0aW9ucyA9IHt9O1xyXG5cclxuICBASW5wdXQoKSBleGNsdWRlQmFzZUxheWVyczogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICBASW5wdXQoKSB0b2dnbGVMZWdlbmRPblZpc2liaWxpdHlDaGFuZ2U6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgQElucHV0KCkgZXhwYW5kTGVnZW5kT2ZWaXNpYmxlTGF5ZXJzOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIEBJbnB1dCgpIHVwZGF0ZUxlZ2VuZE9uUmVzb2x1dGlvbkNoYW5nZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICBASW5wdXQoKSBxdWVyeUJhZGdlOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIEBPdXRwdXQoKSBhcHBsaWVkRmlsdGVyQW5kU29ydCA9IG5ldyBFdmVudEVtaXR0ZXI8TGF5ZXJMaXN0Q29udHJvbHNPcHRpb25zPigpO1xyXG5cclxuICBnZXQga2V5d29yZCgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMuX2tleXdvcmQ7XHJcbiAgfVxyXG4gIHNldCBrZXl3b3JkKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuX2tleXdvcmQgPSB2YWx1ZTtcclxuICAgIHRoaXMubmV4dCgpO1xyXG4gIH1cclxuICBwcml2YXRlIF9rZXl3b3JkID0gdW5kZWZpbmVkO1xyXG5cclxuICBnZXQgb25seVZpc2libGUoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5fb25seVZpc2libGU7XHJcbiAgfVxyXG4gIHNldCBvbmx5VmlzaWJsZSh2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgdGhpcy5fb25seVZpc2libGUgPSB2YWx1ZTtcclxuICAgIHRoaXMubmV4dCgpO1xyXG4gIH1cclxuICBwcml2YXRlIF9vbmx5VmlzaWJsZSA9IGZhbHNlO1xyXG5cclxuICBnZXQgc29ydEFscGhhKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX3NvcnRlZEFscGhhO1xyXG4gIH1cclxuICBzZXQgc29ydEFscGhhKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLl9zb3J0ZWRBbHBoYSA9IHZhbHVlO1xyXG4gICAgdGhpcy5uZXh0KCk7XHJcbiAgfVxyXG4gIHByaXZhdGUgX3NvcnRlZEFscGhhID0gZmFsc2U7XHJcblxyXG4gIGdldCBvcGFjaXR5KCkge1xyXG4gICAgcmV0dXJuIE1hdGgucm91bmQodGhpcy5hY3RpdmVMYXllciQuZ2V0VmFsdWUoKS5vcGFjaXR5ICogMTAwKTtcclxuICB9XHJcbiAgc2V0IG9wYWNpdHkob3BhY2l0eTogbnVtYmVyKSB7XHJcbiAgICB0aGlzLmFjdGl2ZUxheWVyJC5nZXRWYWx1ZSgpLm9wYWNpdHkgPSBvcGFjaXR5IC8gMTAwO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGJhZGdlT3BhY2l0eSgpIHtcclxuICAgIGlmICh0aGlzLm9wYWNpdHkgPT09IDEwMCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5vcGFjaXR5O1xyXG4gIH1cclxuXHJcbiAgZ2V0IHJhaXNlRGlzYWJsZWQoKTogYm9vbGVhbiB7XHJcbiAgICBpZiAoIXRoaXMub3JkZXJhYmxlIHx8IHRoaXMuYWN0aXZlTGF5ZXIuYmFzZUxheWVyIHx8IHRoaXMuZ2V0VXBwZXJMYXllcigpLmlkID09PSB0aGlzLmFjdGl2ZUxheWVyLmlkIHx8XHJcbiAgICAgICAgdGhpcy5pc1VwcGVyQmFzZWxheWVyKHRoaXMuYWN0aXZlTGF5ZXIpKSB7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGxvd2VyRGlzYWJsZWQoKTogYm9vbGVhbiB7XHJcbiAgICBpZiAoIXRoaXMub3JkZXJhYmxlIHx8IHRoaXMuYWN0aXZlTGF5ZXIuYmFzZUxheWVyIHx8IHRoaXMuZ2V0TG93ZXJMYXllcigpLmlkID09PSB0aGlzLmFjdGl2ZUxheWVyLmlkIHx8XHJcbiAgICAgICAgdGhpcy5pc0xvd2VyQmFzZWxheWVyKHRoaXMuYWN0aXZlTGF5ZXIpKSB7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgZ2V0IHJhaXNlRGlzYWJsZWRTZWxlY3Rpb24oKTogYm9vbGVhbiB7XHJcbiAgICBpZiAodGhpcy5sYXllcnNDaGVja2VkLmxlbmd0aCA9PT0gMCB8fCAhdGhpcy5vcmRlcmFibGUgfHwgIXRoaXMucmFpc2FibGVMYXllcnModGhpcy5sYXllcnNDaGVja2VkKSB8fCB0aGlzLnNlbGVjdEFsbENoZWNrID09PSB0cnVlKSB7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGxvd2VyRGlzYWJsZWRTZWxlY3Rpb24oKTogYm9vbGVhbiB7XHJcbiAgICBpZiAodGhpcy5sYXllcnNDaGVja2VkLmxlbmd0aCA9PT0gMCB8fCAhdGhpcy5vcmRlcmFibGUgfHwgIXRoaXMubG93ZXJhYmxlTGF5ZXJzKHRoaXMubGF5ZXJzQ2hlY2tlZCkgfHwgdGhpcy5zZWxlY3RBbGxDaGVjayA9PT0gdHJ1ZSkge1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIGdldCBjaGVja09wYWNpdHkoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5sYXllcnNDaGVja2VkT3BhY2l0eSgpICogMTAwO1xyXG4gIH1cclxuICBzZXQgY2hlY2tPcGFjaXR5KG9wYWNpdHk6IG51bWJlcikge1xyXG4gICAgZm9yIChjb25zdCBsYXllciBvZiB0aGlzLmxheWVyc0NoZWNrZWQpIHtcclxuICAgICAgbGF5ZXIub3BhY2l0eSA9IG9wYWNpdHkgLyAxMDA7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgdG9nZ2xlT3BhY2l0eSA9IGZhbHNlO1xyXG5cclxuICBwdWJsaWMgc2VsZWN0QWxsQ2hlY2skID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPih1bmRlZmluZWQpO1xyXG4gIHNlbGVjdEFsbENoZWNrJCQ6IFN1YnNjcmlwdGlvbjtcclxuICBwdWJsaWMgc2VsZWN0QWxsQ2hlY2s7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBlbFJlZjogRWxlbWVudFJlZixcclxuICApIHt9XHJcblxyXG4gIC8qKlxyXG4gICAqIFN1YnNjcmliZSB0byB0aGUgc2VhcmNoIHRlcm0gc3RyZWFtIGFuZCB0cmlnZ2VyIHJlc2VhcmNoZXNcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgIHRoaXMuY2hhbmdlJCQgPSB0aGlzLmNoYW5nZSRcclxuICAgICAgLnBpcGUoXHJcbiAgICAgICAgZGVib3VuY2UoKCkgPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIHRoaXMubGF5ZXJzLmxlbmd0aCA9PT0gMCA/IEVNUFRZIDogdGltZXIoNTApO1xyXG4gICAgICAgIH0pXHJcbiAgICAgIClcclxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5zaG93VG9vbGJhciQubmV4dCh0aGlzLmNvbXB1dGVTaG93VG9vbGJhcigpKTtcclxuICAgICAgICB0aGlzLmxheWVycyQubmV4dCh0aGlzLmNvbXB1dGVMYXllcnModGhpcy5sYXllcnMuc2xpY2UoMCkpKTtcclxuICAgICAgICB0aGlzLmFwcGxpZWRGaWx0ZXJBbmRTb3J0LmVtaXQoe1xyXG4gICAgICAgICAga2V5d29yZDogdGhpcy5rZXl3b3JkLFxyXG4gICAgICAgICAgc29ydEFscGhhOiB0aGlzLnNvcnRBbHBoYSxcclxuICAgICAgICAgIG9ubHlWaXNpYmxlOiB0aGlzLm9ubHlWaXNpYmxlXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgIHRoaXMuc2VsZWN0QWxsQ2hlY2skJCA9IHRoaXMuc2VsZWN0QWxsQ2hlY2skLnN1YnNjcmliZSgodmFsdWUpID0+IHtcclxuICAgICAgdGhpcy5zZWxlY3RBbGxDaGVjayA9IHZhbHVlO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5sYXllcnMkLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgIGlmICh0aGlzLmxheWVycykge1xyXG4gICAgICAgIGxldCBjaGVja3MgPSAwO1xyXG4gICAgICAgIGZvciAoY29uc3QgbGF5ZXIgb2YgdGhpcy5sYXllcnMpIHtcclxuICAgICAgICAgIGlmIChsYXllci5vcHRpb25zLmFjdGl2ZSkge1xyXG4gICAgICAgICAgICB0aGlzLmFjdGl2ZUxheWVyID0gbGF5ZXI7XHJcbiAgICAgICAgICAgIHRoaXMubGF5ZXJUb29sID0gdHJ1ZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmIChsYXllci5vcHRpb25zLmNoZWNrKSB7XHJcbiAgICAgICAgICAgIGNoZWNrcyArPSAxO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5leGNsdWRlQmFzZUxheWVycykge1xyXG4gICAgICAgICAgdGhpcy5zZWxlY3RBbGxDaGVjayA9IGNoZWNrcyA9PT0gdGhpcy5sYXllcnMuZmlsdGVyKGxheSA9PiBsYXkuYmFzZUxheWVyICE9PSB0cnVlICYmIGxheS5zaG93SW5MYXllckxpc3QpLmxlbmd0aCA/IHRydWUgOiBmYWxzZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5zZWxlY3RBbGxDaGVjayA9IGNoZWNrcyA9PT0gdGhpcy5sYXllcnMuZmlsdGVyKGxheSA9PiBsYXkuc2hvd0luTGF5ZXJMaXN0KS5sZW5ndGggPyB0cnVlIDogZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgdGhpcy5jaGFuZ2UkJC51bnN1YnNjcmliZSgpO1xyXG4gIH1cclxuXHJcbiAgY2xlYXJLZXl3b3JkKCkge1xyXG4gICAgdGhpcy5rZXl3b3JkID0gdW5kZWZpbmVkO1xyXG4gIH1cclxuXHJcbiAgZ2V0TG93ZXJMYXllcigpIHtcclxuICAgIHJldHVybiB0aGlzLmxheWVyc1xyXG4gICAgICAuZmlsdGVyKGwgPT4gIWwuYmFzZUxheWVyKVxyXG4gICAgICAucmVkdWNlKFxyXG4gICAgICAgIChwcmV2LCBjdXJyZW50KSA9PiB7XHJcbiAgICAgICAgICByZXR1cm4gcHJldi56SW5kZXggPCBjdXJyZW50LnpJbmRleCA/IHByZXYgOiBjdXJyZW50O1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgeyB6SW5kZXg6IHVuZGVmaW5lZCwgaWQ6IHVuZGVmaW5lZCB9XHJcbiAgICAgICk7XHJcbiAgfVxyXG5cclxuICBpc0xvd2VyQmFzZWxheWVyKGxheWVyKSB7XHJcbiAgICBjb25zdCBpbmRleCA9IHRoaXMubGF5ZXJzLmZpbmRJbmRleChsYXkgPT7CoGxheWVyLmlkID09PSBsYXkuaWQpO1xyXG4gICAgaWYgKHRoaXMubGF5ZXJzICYmIHRoaXMubGF5ZXJzW2luZGV4ICsgMV0gJiYgdGhpcy5sYXllcnNbaW5kZXggKyAxXS5iYXNlTGF5ZXIgPT09IHRydWUpIHtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBnZXRVcHBlckxheWVyKCkge1xyXG4gICAgcmV0dXJuIHRoaXMubGF5ZXJzXHJcbiAgICAgIC5maWx0ZXIobCA9PiAhbC5iYXNlTGF5ZXIpXHJcbiAgICAgIC5yZWR1Y2UoXHJcbiAgICAgICAgKHByZXYsIGN1cnJlbnQpID0+IHtcclxuICAgICAgICAgIHJldHVybiBwcmV2LnpJbmRleCA+IGN1cnJlbnQuekluZGV4ID8gcHJldiA6IGN1cnJlbnQ7XHJcbiAgICAgICAgfSxcclxuICAgICAgICB7IHpJbmRleDogdW5kZWZpbmVkLCBpZDogdW5kZWZpbmVkIH1cclxuICAgICAgKTtcclxuICB9XHJcblxyXG4gIGlzVXBwZXJCYXNlbGF5ZXIobGF5ZXIpIHtcclxuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5sYXllcnMuZmluZEluZGV4KGxheSA9PsKgbGF5ZXIuaWQgPT09IGxheS5pZCk7XHJcbiAgICBpZiAodGhpcy5sYXllcnMgJiYgdGhpcy5sYXllcnNbaW5kZXggLSAxXSAmJiB0aGlzLmxheWVyc1tpbmRleCAtIDFdLmJhc2VMYXllciA9PT0gdHJ1ZSkge1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIC8qXHJcbiAgICogRm9yIHNlbGVjdGlvbiBtb2RlIGRpc2FibGVkIGF0dHJpYnV0ZVxyXG4gICAqL1xyXG4gIHJhaXNhYmxlTGF5ZXJzKGxheWVyczogTGF5ZXJbXSkge1xyXG4gICAgbGV0IHJlc3BvbnNlID0gZmFsc2U7XHJcbiAgICBsZXQgYmFzZSA9IDA7XHJcbiAgICBmb3IgKGNvbnN0IGxheWVyIG9mIGxheWVycykge1xyXG4gICAgICBjb25zdCBtYXBJbmRleCA9IHRoaXMubGF5ZXJzLmZpbmRJbmRleChsYXkgPT7CoGxheWVyLmlkID09PSBsYXkuaWQpO1xyXG4gICAgICBjb25zdCBjdXJyZW50TGF5ZXIgPSB0aGlzLmxheWVyc1ttYXBJbmRleF07XHJcbiAgICAgIGlmIChjdXJyZW50TGF5ZXIuYmFzZUxheWVyKSB7XHJcbiAgICAgICAgYmFzZSArPSAxO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBwcmV2aW91c0xheWVyID0gdGhpcy5sYXllcnNbbWFwSW5kZXggLSAxXTtcclxuICAgICAgaWYgKHByZXZpb3VzTGF5ZXIgJiYgcHJldmlvdXNMYXllci5iYXNlTGF5ZXIgIT09IHRydWUgJiYgIWxheWVycy5maW5kKGxheSA9PiBwcmV2aW91c0xheWVyLmlkID09PSBsYXkuaWQpICYmXHJcbiAgICAgICAgICAgIGN1cnJlbnRMYXllci5iYXNlTGF5ZXIgIT09IHRydWUpIHtcclxuICAgICAgICByZXNwb25zZSA9IHRydWU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAoKHRoaXMubGF5ZXJzQ2hlY2tlZC5sZW5ndGggPT09IDEgJiYgdGhpcy5sYXllcnNDaGVja2VkWzBdLmJhc2VMYXllcikgfHwgYmFzZSA9PT0gdGhpcy5sYXllcnNDaGVja2VkLmxlbmd0aCkge1xyXG4gICAgICByZXNwb25zZSA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3BvbnNlO1xyXG4gIH1cclxuXHJcbiAgLypcclxuICAgKiBXaGVuIG11bHRpcGxlIGxheWVycyBpcyBzZWxlY3RlZCBidXQgc29tZSBtYXkgYmUgYWxsb3cgdG8gbW92ZVxyXG4gICAqL1xyXG4gIHJhaXNhYmxlTGF5ZXIoaW5kZXg6IG51bWJlcikge1xyXG4gICAgaWYgKGluZGV4IDwgMSkge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMubGF5ZXJzW2luZGV4IC0gMV0ub3B0aW9ucy5jaGVjaykge1xyXG4gICAgICByZXR1cm4gdGhpcy5yYWlzYWJsZUxheWVyKGluZGV4IC0gMSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcblxyXG4gIHJhaXNlTGF5ZXJzKGxheWVyczogTGF5ZXJbXSkge1xyXG4gICAgY29uc3QgbGF5ZXJzVG9SYWlzZSA9IFtdO1xyXG4gICAgZm9yIChjb25zdCBsYXllciBvZiBsYXllcnMpIHtcclxuICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmxheWVycy5maW5kSW5kZXgobGF5ID0+IGxheS5pZCA9PT0gbGF5ZXIuaWQpO1xyXG4gICAgICBpZiAodGhpcy5yYWlzYWJsZUxheWVyKGluZGV4KSkge1xyXG4gICAgICAgIGxheWVyc1RvUmFpc2UucHVzaChsYXllcik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHRoaXMubWFwLnJhaXNlTGF5ZXJzKGxheWVyc1RvUmFpc2UpO1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIGNvbnN0IGVsZW1lbnRzID0gdGhpcy5jb21wdXRlRWxlbWVudFJlZigpO1xyXG4gICAgICBpZiAoIXRoaXMuaXNTY3JvbGxlZEludG9WaWV3KGVsZW1lbnRzWzBdLCBlbGVtZW50c1sxXS5vZmZzZXRQYXJlbnQpKSB7XHJcbiAgICAgICAgZWxlbWVudHNbMF0uc2Nyb2xsVG9wID0gZWxlbWVudHNbMV0ub2Zmc2V0UGFyZW50Lm9mZnNldFRvcDtcclxuICAgICAgfVxyXG4gICAgfSwgMTAwKTtcclxuICB9XHJcblxyXG4gIC8qXHJcbiAgICogRm9yIHNlbGVjdGlvbiBtb2RlIGRpc2FibGVkIGF0dHJpYnV0ZVxyXG4gICAqL1xyXG4gIGxvd2VyYWJsZUxheWVycyhsYXllcnM6IExheWVyW10pIHtcclxuICAgIGxldCByZXNwb25zZSA9IGZhbHNlO1xyXG4gICAgbGV0IGJhc2UgPSAwO1xyXG4gICAgZm9yIChjb25zdCBsYXllciBvZiBsYXllcnMpIHtcclxuICAgICAgY29uc3QgbWFwSW5kZXggPSB0aGlzLmxheWVycy5maW5kSW5kZXgobGF5ID0+wqBsYXllci5pZCA9PT0gbGF5LmlkKTtcclxuICAgICAgY29uc3QgY3VycmVudExheWVyID0gdGhpcy5sYXllcnNbbWFwSW5kZXhdO1xyXG4gICAgICBpZiAoY3VycmVudExheWVyLmJhc2VMYXllcikge1xyXG4gICAgICAgIGJhc2UgKz0gMTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgbmV4dExheWVyID0gdGhpcy5sYXllcnNbbWFwSW5kZXggKyAxXTtcclxuICAgICAgaWYgKG5leHRMYXllciAmJiBuZXh0TGF5ZXIuYmFzZUxheWVyICE9PSB0cnVlICYmICFsYXllcnMuZmluZChsYXkgPT4gbmV4dExheWVyLmlkID09PSBsYXkuaWQpKSB7XHJcbiAgICAgICAgcmVzcG9uc2UgPSB0cnVlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCh0aGlzLmxheWVyc0NoZWNrZWQubGVuZ3RoID09PSAxICYmIHRoaXMubGF5ZXJzQ2hlY2tlZFswXS5iYXNlTGF5ZXIpIHx8IGJhc2UgPT09IHRoaXMubGF5ZXJzQ2hlY2tlZC5sZW5ndGgpIHtcclxuICAgICAgcmVzcG9uc2UgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIHJldHVybiByZXNwb25zZTtcclxuICB9XHJcblxyXG4gIC8qXHJcbiAgICogV2hlbiBtdWx0aXBsZSBsYXllcnMgaXMgc2VsZWN0ZWQgYnV0IHNvbWUgbWF5IGJlIGFsbG93IHRvIG1vdmVcclxuICAgKi9cclxuICBsb3dlcmFibGVMYXllcihpbmRleDogbnVtYmVyKSB7XHJcbiAgICBpZiAoaW5kZXggPiB0aGlzLmxheWVycy5maWx0ZXIobGF5ID0+IGxheS5iYXNlTGF5ZXIgIT09IHRydWUpLmxlbmd0aCAtIDIpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLmxheWVyc1tpbmRleCArIDFdLm9wdGlvbnMuY2hlY2spIHtcclxuICAgICAgcmV0dXJuIHRoaXMubG93ZXJhYmxlTGF5ZXIoaW5kZXggKyAxKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuXHJcbiAgbG93ZXJMYXllcnMobGF5ZXJzOiBMYXllcltdKSB7XHJcbiAgICBjb25zdCBsYXllcnNUb0xvd2VyID0gW107XHJcbiAgICBmb3IgKGNvbnN0IGxheWVyIG9mIGxheWVycykge1xyXG4gICAgICBjb25zdCBpbmRleCA9IHRoaXMubGF5ZXJzLmZpbmRJbmRleChsYXkgPT4gbGF5LmlkID09PSBsYXllci5pZCk7XHJcbiAgICAgIGlmICh0aGlzLmxvd2VyYWJsZUxheWVyKGluZGV4KSkge1xyXG4gICAgICAgIGxheWVyc1RvTG93ZXIucHVzaChsYXllcik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHRoaXMubWFwLmxvd2VyTGF5ZXJzKGxheWVyc1RvTG93ZXIpO1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIGNvbnN0IGVsZW1lbnRzID0gdGhpcy5jb21wdXRlRWxlbWVudFJlZignbG93ZXInKTtcclxuICAgICAgaWYgKCF0aGlzLmlzU2Nyb2xsZWRJbnRvVmlldyhlbGVtZW50c1swXSwgZWxlbWVudHNbMV0ub2Zmc2V0UGFyZW50KSkge1xyXG4gICAgICAgIGVsZW1lbnRzWzBdLnNjcm9sbFRvcCA9IGVsZW1lbnRzWzFdLm9mZnNldFBhcmVudC5vZmZzZXRUb3AgKyBlbGVtZW50c1sxXS5vZmZzZXRQYXJlbnQub2Zmc2V0SGVpZ2h0IC0gZWxlbWVudHNbMF0uY2xpZW50SGVpZ2h0O1xyXG4gICAgICB9XHJcbiAgICB9LCAxMDApO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBuZXh0KCkge1xyXG4gICAgdGhpcy5jaGFuZ2UkLm5leHQoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY29tcHV0ZUxheWVycyhsYXllcnM6IExheWVyW10pOiBMYXllcltdIHtcclxuICAgIGxldCBsYXllcnNPdXQgPSB0aGlzLmZpbHRlckxheWVycyhsYXllcnMpO1xyXG4gICAgaWYgKHRoaXMuc29ydEFscGhhKSB7XHJcbiAgICAgIGxheWVyc091dCA9IHRoaXMuc29ydExheWVyc0J5VGl0bGUobGF5ZXJzT3V0KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGxheWVyc091dCA9IHRoaXMuc29ydExheWVyc0J5WmluZGV4KGxheWVyc091dCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbGF5ZXJzT3V0O1xyXG4gIH1cclxuXHJcbiAgb25LZXl3b3JkQ2hhbmdlKHRlcm0pIHtcclxuICAgIHRoaXMua2V5d29yZCA9IHRlcm07XHJcbiAgfVxyXG5cclxuICBvbkFwcGxpZWRGaWx0ZXJBbmRTb3J0Q2hhbmdlKGFwcGxpZWRGaWx0ZXI6IExheWVyTGlzdENvbnRyb2xzT3B0aW9ucykge1xyXG4gICAgdGhpcy5rZXl3b3JkID0gYXBwbGllZEZpbHRlci5rZXl3b3JkO1xyXG4gICAgdGhpcy5vbmx5VmlzaWJsZSA9IGFwcGxpZWRGaWx0ZXIub25seVZpc2libGU7XHJcbiAgICB0aGlzLnNvcnRBbHBoYSA9IGFwcGxpZWRGaWx0ZXIuc29ydEFscGhhO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBmaWx0ZXJMYXllcnMobGF5ZXJzOiBMYXllcltdKTogTGF5ZXJbXSB7XHJcbiAgICBpZiAoXHJcbiAgICAgIHRoaXMubGF5ZXJGaWx0ZXJBbmRTb3J0T3B0aW9ucy5zaG93VG9vbGJhciA9PT0gTGF5ZXJMaXN0Q29udHJvbHNFbnVtLm5ldmVyXHJcbiAgICApIHtcclxuICAgICAgcmV0dXJuIGxheWVycztcclxuICAgIH1cclxuICAgIGlmICghdGhpcy5rZXl3b3JkICYmICF0aGlzLm9ubHlWaXNpYmxlKSB7XHJcbiAgICAgIHJldHVybiBsYXllcnM7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qga2VlcExheWVySWRzID0gbGF5ZXJzLm1hcCgobGF5ZXI6IExheWVyKSA9PiBsYXllci5pZCk7XHJcblxyXG4gICAgbGF5ZXJzLmZvckVhY2goKGxheWVyOiBMYXllcikgPT4ge1xyXG4gICAgICBjb25zdCBsYXllck9wdGlvbnMgPSAobGF5ZXIub3B0aW9ucyBhcyBNZXRhZGF0YUxheWVyT3B0aW9ucykgfHwge307XHJcbiAgICAgIGNvbnN0IGRhdGFTb3VyY2VPcHRpb25zID0gbGF5ZXIuZGF0YVNvdXJjZS5vcHRpb25zIHx8IHt9O1xyXG4gICAgICBjb25zdCBtZXRhZGF0YSA9IGxheWVyT3B0aW9ucy5tZXRhZGF0YSB8fCAoe30gYXMgTWV0YWRhdGFPcHRpb25zKTtcclxuICAgICAgY29uc3Qga2V5d29yZHMgPSBtZXRhZGF0YS5rZXl3b3JkTGlzdCB8fCBbXTtcclxuICAgICAgY29uc3QgbGF5ZXJLZXl3b3JkcyA9IGtleXdvcmRzLm1hcCgoa3c6IHN0cmluZykgPT4ge1xyXG4gICAgICAgIHJldHVybiBrdy5ub3JtYWxpemUoJ05GRCcpLnJlcGxhY2UoL1tcXHUwMzAwLVxcdTAzNmZdL2csICcnKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBpZiAodGhpcy5rZXl3b3JkICYmIGxheWVyLnRpdGxlKSB7XHJcbiAgICAgICAgY29uc3QgbG9jYWxLZXl3b3JkID0gdGhpcy5rZXl3b3JkXHJcbiAgICAgICAgICAubm9ybWFsaXplKCdORkQnKVxyXG4gICAgICAgICAgLnJlcGxhY2UoL1tcXHUwMzAwLVxcdTAzNmZdL2csICcnKTtcclxuICAgICAgICBjb25zdCBsYXllclRpdGxlID0gbGF5ZXIudGl0bGVcclxuICAgICAgICAgIC5ub3JtYWxpemUoJ05GRCcpXHJcbiAgICAgICAgICAucmVwbGFjZSgvW1xcdTAzMDAtXFx1MDM2Zl0vZywgJycpO1xyXG4gICAgICAgIGNvbnN0IGRhdGFTb3VyY2VUeXBlID0gZGF0YVNvdXJjZU9wdGlvbnMudHlwZSB8fCAnJztcclxuICAgICAgICBjb25zdCBrZXl3b3JkUmVnZXggPSBuZXcgUmVnRXhwKGxvY2FsS2V5d29yZCwgJ2dpJyk7XHJcbiAgICAgICAgY29uc3Qga2V5d29yZEluTGlzdCA9XHJcbiAgICAgICAgICBsYXllcktleXdvcmRzLmZpbmQoKGt3OiBzdHJpbmcpID0+IGtleXdvcmRSZWdleC50ZXN0KGt3KSkgIT09XHJcbiAgICAgICAgICB1bmRlZmluZWQ7XHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAgIWtleXdvcmRSZWdleC50ZXN0KGxheWVyVGl0bGUpICYmXHJcbiAgICAgICAgICAhKHRoaXMua2V5d29yZC50b0xvd2VyQ2FzZSgpID09PSBkYXRhU291cmNlVHlwZS50b0xvd2VyQ2FzZSgpKSAmJlxyXG4gICAgICAgICAgIWtleXdvcmRJbkxpc3RcclxuICAgICAgICApIHtcclxuICAgICAgICAgIGNvbnN0IGluZGV4ID0ga2VlcExheWVySWRzLmluZGV4T2YobGF5ZXIuaWQpO1xyXG4gICAgICAgICAgaWYgKGluZGV4ID4gLTEpIHtcclxuICAgICAgICAgICAga2VlcExheWVySWRzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAodGhpcy5vbmx5VmlzaWJsZSAmJiBsYXllci52aXNpYmxlID09PSBmYWxzZSkge1xyXG4gICAgICAgIGNvbnN0IGluZGV4ID0ga2VlcExheWVySWRzLmluZGV4T2YobGF5ZXIuaWQpO1xyXG4gICAgICAgIGlmIChpbmRleCA+IC0xKSB7XHJcbiAgICAgICAgICBrZWVwTGF5ZXJJZHMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBsYXllcnMuZmlsdGVyKFxyXG4gICAgICAobGF5ZXI6IExheWVyKSA9PiBrZWVwTGF5ZXJJZHMuaW5kZXhPZihsYXllci5pZCkgIT09IC0xXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzb3J0TGF5ZXJzQnlaaW5kZXgobGF5ZXJzOiBMYXllcltdKSB7XHJcbiAgICByZXR1cm4gbGF5ZXJzLnNvcnQoKGxheWVyMSwgbGF5ZXIyKSA9PiBsYXllcjIuekluZGV4IC0gbGF5ZXIxLnpJbmRleCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHNvcnRMYXllcnNCeVRpdGxlKGxheWVyczogTGF5ZXJbXSkge1xyXG4gICAgcmV0dXJuIGxheWVycy5zb3J0KChhLCBiKSA9PiB7XHJcbiAgICAgIGlmICh0aGlzLm5vcm1hbGl6ZShhLnRpdGxlKSA8IHRoaXMubm9ybWFsaXplKGIudGl0bGUpKSB7XHJcbiAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICh0aGlzLm5vcm1hbGl6ZShhLnRpdGxlKSA+IHRoaXMubm9ybWFsaXplKGIudGl0bGUpKSB7XHJcbiAgICAgICAgcmV0dXJuIDE7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIDA7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgbm9ybWFsaXplKHN0cjogc3RyaW5nKSB7XHJcbiAgICByZXR1cm4gc3RyLm5vcm1hbGl6ZSgnTkZEJykucmVwbGFjZSgvW1xcdTAzMDAtXFx1MDM2Zl0vZywgJycpLnRvTG93ZXJDYXNlKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNvbXB1dGVTaG93VG9vbGJhcigpOiBib29sZWFuIHtcclxuICAgIHN3aXRjaCAodGhpcy5sYXllckZpbHRlckFuZFNvcnRPcHRpb25zLnNob3dUb29sYmFyKSB7XHJcbiAgICAgIGNhc2UgTGF5ZXJMaXN0Q29udHJvbHNFbnVtLmFsd2F5czpcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgY2FzZSBMYXllckxpc3RDb250cm9sc0VudW0ubmV2ZXI6XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgIHRoaXMubGF5ZXJzLmxlbmd0aCA+PSB0aGlzLnRocmVzaG9sZFRvRmlsdGVyQW5kU29ydCB8fFxyXG4gICAgICAgICAgdGhpcy5rZXl3b3JkIHx8XHJcbiAgICAgICAgICB0aGlzLm9ubHlWaXNpYmxlXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdG9nZ2xlTGF5ZXJUb29sKGxheWVyKSB7XHJcbiAgICB0aGlzLnRvZ2dsZU9wYWNpdHkgPSBmYWxzZTtcclxuICAgIGlmICh0aGlzLmxheWVyVG9vbCAmJiBsYXllciA9PT0gdGhpcy5hY3RpdmVMYXllcikge1xyXG4gICAgICB0aGlzLmxheWVyVG9vbCA9IGZhbHNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5sYXllclRvb2wgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAoY29uc3QgbGF5IG9mIHRoaXMubGF5ZXJzKSB7XHJcbiAgICAgIGxheS5vcHRpb25zLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgbGF5ZXIub3B0aW9ucy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgdGhpcy5hY3RpdmVMYXllciA9IGxheWVyO1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuXHJcbiAgcmVtb3ZlTGF5ZXJzKGxheWVycz86IExheWVyW10pIHtcclxuICAgIGlmIChsYXllcnMgJiYgbGF5ZXJzLmxlbmd0aCA+IDApIHtcclxuICAgICAgZm9yIChjb25zdCBsYXllciBvZiBsYXllcnMpIHtcclxuICAgICAgICBsYXllci5tYXAucmVtb3ZlTGF5ZXIobGF5ZXIpO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMubGF5ZXJzQ2hlY2tlZCA9IFtdO1xyXG4gICAgfSBlbHNlIGlmICghbGF5ZXJzKSB7XHJcbiAgICAgIHRoaXMuYWN0aXZlTGF5ZXIubWFwLnJlbW92ZUxheWVyKHRoaXMuYWN0aXZlTGF5ZXIpO1xyXG4gICAgICB0aGlzLmxheWVyVG9vbCA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuXHJcbiAgbGF5ZXJzQ2hlY2soZXZlbnQ6IHtsYXllcjogTGF5ZXI7IGNoZWNrOiBib29sZWFufSkge1xyXG4gICAgZXZlbnQubGF5ZXIub3B0aW9ucy5jaGVjayA9IGV2ZW50LmNoZWNrO1xyXG4gICAgaWYgKGV2ZW50LmNoZWNrID09PSB0cnVlKSB7XHJcbiAgICAgIGNvbnN0IGV2ZW50TWFwSW5kZXggPSB0aGlzLmxheWVycy5maW5kSW5kZXgobGF5ZXIgPT7CoGV2ZW50LmxheWVyLmlkID09PSBsYXllci5pZCk7XHJcbiAgICAgIGZvciAoY29uc3QgbGF5ZXIgb2YgdGhpcy5sYXllcnNDaGVja2VkKSB7XHJcbiAgICAgICAgY29uc3QgbWFwSW5kZXggPSB0aGlzLmxheWVycy5maW5kSW5kZXgobGF5ID0+wqBsYXllci5pZCA9PT0gbGF5LmlkKTtcclxuICAgICAgICBpZiAoZXZlbnRNYXBJbmRleCA8IG1hcEluZGV4KSB7XHJcbiAgICAgICAgICB0aGlzLmxheWVyc0NoZWNrZWQuc3BsaWNlKHRoaXMubGF5ZXJzQ2hlY2tlZC5maW5kSW5kZXgobGF5ID0+wqBsYXllci5pZCA9PT0gbGF5LmlkKSwgMCwgZXZlbnQubGF5ZXIpO1xyXG5cclxuICAgICAgICAgIGlmICh0aGlzLmV4Y2x1ZGVCYXNlTGF5ZXJzKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmxheWVyc0NoZWNrZWQubGVuZ3RoID09PSB0aGlzLmxheWVycy5maWx0ZXIobGF5ID0+IChsYXkuYmFzZUxheWVyICE9PSB0cnVlICYmIGxheS5zaG93SW5MYXllckxpc3QpKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICB0aGlzLnNlbGVjdEFsbENoZWNrID0gdHJ1ZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICB0aGlzLnNlbGVjdEFsbENoZWNrID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0gZWxzZSBpZiAoIXRoaXMuZXhjbHVkZUJhc2VMYXllcnMpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMubGF5ZXJzQ2hlY2tlZC5sZW5ndGggPT09IHRoaXMubGF5ZXJzLmZpbHRlcihsYXkgPT4gbGF5LnNob3dJbkxheWVyTGlzdCkubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5zZWxlY3RBbGxDaGVjayA9IHRydWU7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5zZWxlY3RBbGxDaGVjayA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHRoaXMubGF5ZXJzQ2hlY2tlZC5wdXNoKGV2ZW50LmxheWVyKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5sYXllcnNDaGVja2VkLmZpbmRJbmRleChsYXllciA9PiBldmVudC5sYXllci5pZCA9PT0gbGF5ZXIuaWQpO1xyXG4gICAgICB0aGlzLmxheWVyc0NoZWNrZWQuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5leGNsdWRlQmFzZUxheWVycykge1xyXG4gICAgICBpZiAodGhpcy5sYXllcnNDaGVja2VkLmxlbmd0aCA9PT0gdGhpcy5sYXllcnMuZmlsdGVyKGxheSA9PiAobGF5LmJhc2VMYXllciAhPT0gdHJ1ZSAmJiBsYXkuc2hvd0luTGF5ZXJMaXN0KSkubGVuZ3RoKSB7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RBbGxDaGVjayA9IHRydWU7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RBbGxDaGVjayA9IGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKCF0aGlzLmV4Y2x1ZGVCYXNlTGF5ZXJzKSB7XHJcbiAgICAgIGlmICh0aGlzLmxheWVyc0NoZWNrZWQubGVuZ3RoID09PSB0aGlzLmxheWVycy5maWx0ZXIobGF5ID0+IGxheS5zaG93SW5MYXllckxpc3QpLmxlbmd0aCkge1xyXG4gICAgICAgIHRoaXMuc2VsZWN0QWxsQ2hlY2sgPSB0cnVlO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuc2VsZWN0QWxsQ2hlY2sgPSBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdG9nZ2xlU2VsZWN0aW9uTW9kZSh2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgdGhpcy5zZWxlY3Rpb24gPSB2YWx1ZTtcclxuICAgIHRoaXMuYWN0aXZlTGF5ZXIgPSB1bmRlZmluZWQ7XHJcbiAgICBpZiAodmFsdWUgPT09IHRydWUpIHtcclxuICAgICAgdGhpcy5sYXllclRvb2wgPSBmYWxzZTtcclxuICAgICAgZm9yIChjb25zdCBsYXllciBvZiB0aGlzLmxheWVycykge1xyXG4gICAgICAgIGlmIChsYXllci5vcHRpb25zLmNoZWNrKSB7XHJcbiAgICAgICAgICB0aGlzLmxheWVyc0NoZWNrZWQucHVzaChsYXllcik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBsYXllcnNDaGVja2VkT3BhY2l0eSgpOiBhbnkge1xyXG4gICAgaWYgKHRoaXMubGF5ZXJzQ2hlY2tlZC5sZW5ndGggPiAxKSB7XHJcbiAgICAgIHJldHVybiAxO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc3Qgb3BhY2l0eSA9IFtdO1xyXG4gICAgICBmb3IgKGNvbnN0IGxheWVyIG9mIHRoaXMubGF5ZXJzQ2hlY2tlZCkge1xyXG4gICAgICAgIG9wYWNpdHkucHVzaChsYXllci5vcGFjaXR5KTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gb3BhY2l0eTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNlbGVjdEFsbCgpIHtcclxuICAgIGlmICghdGhpcy5zZWxlY3RBbGxDaGVjaykge1xyXG4gICAgICBmb3IgKGNvbnN0IGxheWVyIG9mIHRoaXMubGF5ZXJzKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZXhjbHVkZUJhc2VMYXllcnMgJiYgbGF5ZXIuYmFzZUxheWVyICE9PSB0cnVlICYmIGxheWVyLnNob3dJbkxheWVyTGlzdCkge1xyXG4gICAgICAgICAgbGF5ZXIub3B0aW9ucy5jaGVjayA9IHRydWU7XHJcbiAgICAgICAgICB0aGlzLmxheWVyc0NoZWNrZWQucHVzaChsYXllcik7XHJcbiAgICAgICAgfSBlbHNlIGlmICghdGhpcy5leGNsdWRlQmFzZUxheWVycyAmJiBsYXllci5zaG93SW5MYXllckxpc3QpIHtcclxuICAgICAgICAgIGxheWVyLm9wdGlvbnMuY2hlY2sgPSB0cnVlO1xyXG4gICAgICAgICAgdGhpcy5sYXllcnNDaGVja2VkLnB1c2gobGF5ZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICB0aGlzLnNlbGVjdEFsbENoZWNrJC5uZXh0KHRydWUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZm9yIChjb25zdCBsYXllciBvZiB0aGlzLmxheWVycykge1xyXG4gICAgICAgIGxheWVyLm9wdGlvbnMuY2hlY2sgPSBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmxheWVyc0NoZWNrZWQgPSBbXTtcclxuICAgICAgdGhpcy5zZWxlY3RBbGxDaGVjayQubmV4dChmYWxzZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBpc1Njcm9sbGVkSW50b1ZpZXcoZWxlbVNvdXJjZSwgZWxlbSkge1xyXG4gICAgY29uc3QgZG9jVmlld1RvcCA9IGVsZW1Tb3VyY2Uuc2Nyb2xsVG9wO1xyXG4gICAgY29uc3QgZG9jVmlld0JvdHRvbSA9IGRvY1ZpZXdUb3AgKyBlbGVtU291cmNlLmNsaWVudEhlaWdodDtcclxuXHJcbiAgICBjb25zdCBlbGVtVG9wID0gZWxlbS5vZmZzZXRUb3A7XHJcbiAgICBjb25zdCBlbGVtQm90dG9tID0gZWxlbVRvcCArIGVsZW0uY2xpZW50SGVpZ2h0O1xyXG4gICAgcmV0dXJuICgoZWxlbUJvdHRvbSA8PSBkb2NWaWV3Qm90dG9tKSAmJiAoZWxlbVRvcCA+PSBkb2NWaWV3VG9wKSk7XHJcbiAgfVxyXG5cclxuICBjb21wdXRlRWxlbWVudFJlZih0eXBlPzogc3RyaW5nKSB7XHJcbiAgICBjb25zdCBjaGVja0l0ZW1zID0gdGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ21hdC1jaGVja2JveC1jaGVja2VkJyk7XHJcbiAgICBjb25zdCBjaGVja0l0ZW0gPSB0eXBlID09PSAnbG93ZXInID8gdGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ21hdC1jaGVja2JveC1jaGVja2VkJylbY2hlY2tJdGVtcy5sZW5ndGggLSAxXSA6XHJcbiAgICAgIHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdtYXQtY2hlY2tib3gtY2hlY2tlZCcpWzBdO1xyXG4gICAgY29uc3QgaWdvTGlzdCA9IHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaWdvLWxpc3QnKVswXTtcclxuXHJcbiAgICByZXR1cm4gW2lnb0xpc3QsIGNoZWNrSXRlbV07XHJcbiAgfVxyXG59XHJcbiJdfQ==
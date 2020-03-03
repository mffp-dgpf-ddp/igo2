/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ChangeDetectionStrategy, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { SpatialFilterQueryType, SpatialFilterType } from '../../shared/spatial-filter.enum';
import { SelectionModel } from '@angular/cdk/collections';
import { IgoMap } from '../../../map';
import { SpatialFilterItemType } from './../../shared/spatial-filter.enum';
import { FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import * as olstyle from 'ol/style';
import * as olproj from 'ol/proj';
import { MatTreeNestedDataSource } from '@angular/material';
import { SpatialFilterService } from '../../shared/spatial-filter.service';
import { MeasureLengthUnit } from '../../../measure';
import { EntityStore } from '@igo2/common';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MessageService, LanguageService } from '@igo2/core';
/**
 * Spatial-Filter-Item (search parameters)
 */
export class SpatialFilterItemComponent {
    /**
     * @param {?} cdRef
     * @param {?} spatialFilterService
     * @param {?} messageService
     * @param {?} languageService
     */
    constructor(cdRef, spatialFilterService, messageService, languageService) {
        this.cdRef = cdRef;
        this.spatialFilterService = spatialFilterService;
        this.messageService = messageService;
        this.languageService = languageService;
        this.layers = [];
        this.toggleSearch = new EventEmitter();
        this.itemTypeChange = new EventEmitter();
        this.thematicChange = new EventEmitter();
        this.drawZoneEvent = new EventEmitter();
        this.radiusEvent = new EventEmitter();
        this.freehandControl = new EventEmitter();
        this.clearButtonEvent = new EventEmitter();
        this.clearSearchEvent = new EventEmitter();
        this.itemType = [SpatialFilterItemType.Address, SpatialFilterItemType.Thematics];
        this.selectedItemType = SpatialFilterItemType.Address;
        this.treeControl = new NestedTreeControl((/**
         * @param {?} node
         * @return {?}
         */
        node => node.children));
        // For thematics and results tables
        this.displayedColumns = ['name', 'select'];
        this.childrens = [];
        this.groups = [];
        this.thematics = [];
        this.dataSource = new MatTreeNestedDataSource();
        this.selectedThematics = new SelectionModel(true, []);
        this.displayedColumnsResults = ['typeResults', 'nameResults'];
        // For geometry form field input
        this.value$ = new BehaviorSubject(undefined);
        this.drawGuide$ = new BehaviorSubject(null);
        this.overlayStyle$ = new BehaviorSubject(undefined);
        this.drawStyle$ = new BehaviorSubject(undefined);
        this.formControl = new FormControl();
        this.geometryTypeField = false;
        this.geometryTypes = ['Point', 'Polygon'];
        this.drawGuideField = false;
        this.drawGuide = null;
        this.drawGuidePlaceholder = '';
        this.measure = false;
        this.drawControlIsActive = true;
        this.freehandDrawIsActive = false;
        this.radiusFormControl = new FormControl();
        this.measureUnit = MeasureLengthUnit.Meters;
    }
    /**
     * @return {?}
     */
    get type() {
        return this._type;
    }
    /**
     * @param {?} type
     * @return {?}
     */
    set type(type) {
        this._type = type;
        /** @type {?} */
        const index = this.geometryTypes.findIndex((/**
         * @param {?} geom
         * @return {?}
         */
        geom => geom === this.type));
        this.geometryType = this.geometryTypes[index];
        this.formControl.reset();
        this.radius = undefined;
        this.drawGuide$.next(null);
        this.drawStyle$.next(undefined);
        // Necessary to keep reference to the geometry form field input
        if (this.type === SpatialFilterType.Predefined) {
            /** @type {?} */
            const geojson = {
                type: 'Point',
                coordinates: ''
            };
            this.formControl.setValue(geojson);
        }
        // Necessary to apply the right style when geometry type is Point
        if (this.type === SpatialFilterType.Point) {
            this.radius = 1000; // Base radius
            this.radiusFormControl.setValue(this.radius);
            this.PointStyle = (/**
             * @param {?} feature
             * @param {?} resolution
             * @return {?}
             */
            (feature, resolution) => {
                /** @type {?} */
                const coordinates = olproj.transform(feature.getGeometry().getCoordinates(), this.map.projection, 'EPSG:4326');
                return new olstyle.Style({
                    image: new olstyle.Circle({
                        radius: this.radius / (Math.cos((Math.PI / 180) * coordinates[1])) / resolution,
                        // Latitude correction
                        stroke: new olstyle.Stroke({
                            width: 2,
                            color: 'rgba(0, 153, 255)'
                        }),
                        fill: new olstyle.Fill({
                            color: 'rgba(0, 153, 255, 0.2)'
                        })
                    })
                });
            });
            this.overlayStyle = this.PointStyle;
            this.drawStyle$.next(this.overlayStyle);
        }
        else {
            // If geometry types is Polygon
            this.radius = undefined;
            this.PolyStyle = (/**
             * @param {?} feature
             * @param {?} resolution
             * @return {?}
             */
            (feature, resolution) => {
                return new olstyle.Style({
                    stroke: new olstyle.Stroke({
                        width: 2,
                        color: 'rgba(0, 153, 255)'
                    }),
                    fill: new olstyle.Fill({
                        color: 'rgba(0, 153, 255, 0.2)'
                    })
                });
            });
            this.overlayStyle = this.PolyStyle;
        }
        this.overlayStyle$.next(this.overlayStyle);
    }
    /**
     * @return {?}
     */
    get store() {
        return this._store;
    }
    /**
     * @param {?} store
     * @return {?}
     */
    set store(store) {
        this._store = store;
        this._store.entities$.subscribe((/**
         * @return {?}
         */
        () => { this.cdRef.detectChanges(); }));
    }
    /**
     * Available measure units for the measure type given
     * \@internal
     * @return {?}
     */
    get measureUnits() {
        return [MeasureLengthUnit.Meters];
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.spatialFilterService.loadThematicsList()
            .subscribe((/**
         * @param {?} items
         * @return {?}
         */
        (items) => {
            for (const item of items) {
                this.childrens.push(item);
                this.childrens.sort((/**
                 * @param {?} a
                 * @param {?} b
                 * @return {?}
                 */
                (a, b) => {
                    return a.name.localeCompare(b.name);
                }));
            }
            this.childrens.forEach((/**
             * @param {?} child
             * @return {?}
             */
            child => {
                if (child.group && (this.groups.indexOf(child.group) === -1)) {
                    this.groups.push(child.group);
                    /** @type {?} */
                    const thematic = {
                        name: child.group,
                        children: []
                    };
                    this.thematics.push(thematic);
                }
                if (!child.group) {
                    /** @type {?} */
                    const thematic = {
                        name: child.name,
                        children: [],
                        source: child.source
                    };
                    this.thematics.push(thematic);
                }
                this.thematics.sort((/**
                 * @param {?} a
                 * @param {?} b
                 * @return {?}
                 */
                (a, b) => {
                    return a.name.localeCompare(b.name);
                }));
            }));
            this.thematics.forEach((/**
             * @param {?} thematic
             * @return {?}
             */
            thematic => {
                for (const child of this.childrens) {
                    if (child.group === thematic.name) {
                        thematic.children.push(child);
                    }
                }
            }));
        }));
        this.dataSource.data = this.thematics;
        this.drawGuide$.next(null);
        this.value$.next(this.formControl.value ? this.formControl.value : undefined);
        this.value$$ = this.formControl.valueChanges.subscribe((/**
         * @param {?} value
         * @return {?}
         */
        (value) => {
            this.value$.next(value ? value : undefined);
        }));
        this.value$.subscribe((/**
         * @return {?}
         */
        () => {
            this.getRadius();
            this.cdRef.detectChanges();
        }));
        this.radiusChanges$$ = this.radiusFormControl.valueChanges.subscribe((/**
         * @return {?}
         */
        () => {
            this.getRadius();
            this.cdRef.detectChanges();
        }));
    }
    /**
     * Unsubscribe to the value stream
     * \@internal
     * @return {?}
     */
    ngOnDestroy() {
        this.value$$.unsubscribe();
        this.cdRef.detach();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onItemTypeChange(event) {
        this.selectedItemType = event.value;
        this.itemTypeChange.emit(this.selectedItemType);
    }
    /**
     * Set the measure unit
     * \@internal
     * @param {?} unit
     * @return {?}
     */
    onMeasureUnitChange(unit) {
        this.measureUnit = unit;
    }
    /**
     * @return {?}
     */
    isPredefined() {
        return this.type === SpatialFilterType.Predefined;
    }
    /**
     * @return {?}
     */
    isPolygon() {
        return this.type === SpatialFilterType.Polygon;
    }
    /**
     * @return {?}
     */
    isPoint() {
        return this.type === SpatialFilterType.Point;
    }
    /**
     * @param {?} _
     * @param {?} node
     * @return {?}
     */
    hasChild(_, node) {
        if (node.children) {
            return node.children.length;
        }
        return false;
    }
    /**
     * @param {?} node
     * @return {?}
     */
    onToggleClick(node) {
        this.treeControl.isExpanded(node) ? this.treeControl.collapse(node) : this.treeControl.expand(node);
    }
    /**
     * @param {?=} node
     * @return {?}
     */
    isAllSelected(node) {
        /** @type {?} */
        let numSelected;
        /** @type {?} */
        let numNodes = 0;
        if (!node) {
            numSelected = this.selectedThematics.selected.length;
            this.thematics.forEach((/**
             * @param {?} thematic
             * @return {?}
             */
            thematic => {
                if (this.groups.indexOf(thematic.name) === -1) {
                    numNodes++;
                }
            }));
            this.childrens.forEach((/**
             * @param {?} children
             * @return {?}
             */
            children => {
                if (!this.thematics.find((/**
                 * @param {?} thematic
                 * @return {?}
                 */
                thematic => thematic.source === children.source))) {
                    numNodes++;
                }
            }));
        }
        else {
            numSelected = node.children.length;
            node.children.forEach((/**
             * @param {?} children
             * @return {?}
             */
            children => {
                if (this.selectedThematics.selected.find((/**
                 * @param {?} thematic
                 * @return {?}
                 */
                thematic => thematic === children))) {
                    numNodes++;
                }
            }));
        }
        if (numNodes >= 1) {
            return numSelected === numNodes;
        }
        else {
            return false;
        }
    }
    /**
     * @param {?} node
     * @return {?}
     */
    hasChildrenSelected(node) {
        /** @type {?} */
        let bool = false;
        node.children.forEach((/**
         * @param {?} child
         * @return {?}
         */
        child => {
            if (this.selectedThematics.selected.find((/**
             * @param {?} thematic
             * @return {?}
             */
            thematic => thematic.source === child.source))) {
                bool = true;
            }
        }));
        return bool;
    }
    /**
     * Apply header checkbox
     * @return {?}
     */
    masterToggle() {
        this.isAllSelected() ?
            this.selectedThematics.clear() :
            this.selectAll();
        /** @type {?} */
        const selectedThematicsName = [];
        for (const thematic of this.selectedThematics.selected) {
            selectedThematicsName.push(thematic);
        }
        if (this.isAllSelected()) {
            this.thematics.forEach((/**
             * @param {?} thematic
             * @return {?}
             */
            thematic => {
                if (this.hasChild(0, thematic)) {
                    this.treeControl.expand(thematic);
                }
            }));
        }
        else {
            this.thematics.forEach((/**
             * @param {?} thematic
             * @return {?}
             */
            thematic => {
                if (this.hasChild(0, thematic)) {
                    this.treeControl.collapse(thematic);
                }
            }));
        }
        this.thematicChange.emit(selectedThematicsName);
    }
    /**
     * @param {?=} node
     * @return {?}
     */
    selectAll(node) {
        if (!node) {
            this.thematics.forEach((/**
             * @param {?} thematic
             * @return {?}
             */
            thematic => {
                if (this.groups.indexOf(thematic.name) === -1) {
                    this.selectedThematics.select(thematic);
                }
            }));
            this.childrens.forEach((/**
             * @param {?} children
             * @return {?}
             */
            children => {
                if (!this.selectedThematics.selected.find((/**
                 * @param {?} thematic
                 * @return {?}
                 */
                thematic => thematic.source === children.source))) {
                    this.selectedThematics.select(children);
                }
            }));
        }
        else {
            if (this.hasChild(0, node)) {
                node.children.forEach((/**
                 * @param {?} children
                 * @return {?}
                 */
                children => this.selectedThematics.select(children)));
            }
        }
    }
    /**
     * @param {?} node
     * @return {?}
     */
    childrensToggle(node) {
        this.isAllSelected(node) ?
            node.children.forEach((/**
             * @param {?} child
             * @return {?}
             */
            child => this.selectedThematics.deselect(child))) :
            this.selectAll(node);
        /** @type {?} */
        const selectedThematicsName = [];
        for (const thematic of this.selectedThematics.selected) {
            selectedThematicsName.push(thematic);
        }
        this.treeControl.expand(node);
        this.thematicChange.emit(selectedThematicsName);
    }
    /**
     * Apply changes to the thematics selected tree and emit event
     * @param {?} nodeSelected
     * @return {?}
     */
    onToggleChange(nodeSelected) {
        /** @type {?} */
        let selected = false;
        if (this.selectedThematics.selected.find((/**
         * @param {?} thematic
         * @return {?}
         */
        thematic => thematic.source === nodeSelected.source)) !== undefined) {
            selected = true;
        }
        this.childrens.forEach((/**
         * @param {?} children
         * @return {?}
         */
        children => {
            if (children === nodeSelected && selected === false) {
                this.selectedThematics.select(children);
            }
            if (children === nodeSelected && selected === true) {
                this.selectedThematics.deselect(children);
            }
        }));
        this.thematics.forEach((/**
         * @param {?} thematic
         * @return {?}
         */
        thematic => {
            if (thematic === nodeSelected && selected === false) {
                this.selectedThematics.select(thematic);
            }
            if (thematic === nodeSelected && selected === true) {
                this.selectedThematics.deselect(thematic);
            }
        }));
        /** @type {?} */
        const selectedThematicsName = [];
        for (const thematic of this.selectedThematics.selected) {
            selectedThematicsName.push(thematic);
        }
        this.thematicChange.emit(selectedThematicsName);
    }
    /**
     * @return {?}
     */
    onDrawControlChange() {
        this.drawControlIsActive = !this.drawControlIsActive;
    }
    /**
     * @return {?}
     */
    onfreehandControlChange() {
        this.freehandDrawIsActive = !this.freehandDrawIsActive;
        this.freehandControl.emit(this.freehandDrawIsActive);
    }
    /**
     * Launch search button
     * @return {?}
     */
    toggleSearchButton() {
        if (this.isPolygon() || this.isPoint()) {
            this.drawZone = (/** @type {?} */ (this.formControl.value));
            this.drawZone.meta = {
                id: undefined,
                title: 'Zone'
            };
            this.drawZone.properties = {
                nom: 'Zone'
            };
            this.drawZoneEvent.emit(this.drawZone);
        }
        this.radiusEvent.emit(this.radius);
        this.toggleSearch.emit();
    }
    /**
     * Launch clear button (clear store and map layers)
     * @return {?}
     */
    clearButton() {
        this.loading = true;
        this.map.removeLayers(this.layers);
        this.loading = false;
        if (this.store) {
            this.store.clear();
        }
        this.clearButtonEvent.emit([]);
    }
    /**
     * Launch clear search (clear field if type is predefined)
     * @return {?}
     */
    clearSearch() {
        this.selectedThematics.clear();
        this.thematicChange.emit([]);
        this.clearSearchEvent.emit();
    }
    /**
     * Verify conditions of incomplete fields or busy service
     * @return {?}
     */
    disableSearchButton() {
        if (this.type === SpatialFilterType.Predefined) {
            if (this.selectedItemType === SpatialFilterItemType.Address) {
                if (this.queryType !== undefined && this.zone !== undefined) {
                    return this.loading;
                }
            }
            if (this.selectedItemType === SpatialFilterItemType.Thematics) {
                if (this.queryType !== undefined && this.zone !== undefined && this.selectedThematics.selected.length > 0) {
                    return this.loading;
                }
            }
        }
        if (this.type === SpatialFilterType.Polygon || this.type === SpatialFilterType.Point) {
            if (this.selectedItemType === SpatialFilterItemType.Address && this.formControl.value !== null) {
                return this.loading;
            }
            if (this.selectedItemType === SpatialFilterItemType.Thematics) {
                if (this.selectedThematics.selected.length > 0 && this.formControl.value !== null) {
                    return this.loading;
                }
            }
        }
        return true;
    }
    /**
     * Manage radius value at user change
     * @return {?}
     */
    getRadius() {
        /** @type {?} */
        let formValue;
        this.formControl.value !== null ? formValue = this.formControl.value.radius : formValue = undefined;
        if (this.type === SpatialFilterType.Point) {
            if (!this.freehandDrawIsActive) {
                if (this.radiusFormControl.value >= 10000 || this.radiusFormControl.value < 0) {
                    this.messageService.alert(this.languageService.translate.instant('igo.geo.spatialFilter.radiusAlert'), this.languageService.translate.instant('igo.geo.spatialFilter.warning'));
                    this.radius = 1000;
                    this.radiusFormControl.setValue(this.radius);
                    this.drawGuide$.next(this.radius);
                    return;
                }
            }
            else {
                if (this.radiusFormControl.value >= 10000 || this.radiusFormControl.value < 0) {
                    this.messageService.alert(this.languageService.translate.instant('igo.geo.spatialFilter.radiusAlert'), this.languageService.translate.instant('igo.geo.spatialFilter.warning'));
                    this.radius = 1000;
                    this.radiusFormControl.setValue(this.radius);
                    this.drawGuide$.next(this.radius);
                    return;
                }
                if (formValue >= 10000) {
                    this.messageService.alert(this.languageService.translate.instant('igo.geo.spatialFilter.radiusAlert'), this.languageService.translate.instant('igo.geo.spatialFilter.warning'));
                    this.formControl.reset();
                    return;
                }
                if (formValue) {
                    if (formValue !== this.radiusFormControl.value) {
                        this.radiusFormControl.setValue(formValue);
                    }
                    this.formControl.value.radius = undefined;
                }
            }
            this.radius = this.radiusFormControl.value;
            this.drawGuide$.next(this.radius);
            this.overlayStyle$.next(this.PointStyle);
            this.drawStyle$.next(this.PointStyle);
        }
    }
}
SpatialFilterItemComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-spatial-filter-item',
                template: "<igo-geometry-form-field-input\r\n  [formControl]=\"formControl\"\r\n  [map]=\"map\"\r\n  [geometryType]=\"geometryType\"\r\n  [drawGuide]=\"drawGuide$ | async\"\r\n  [measure]=\"measure\"\r\n  [drawControlIsActive]=\"drawControlIsActive\"\r\n  [freehandDrawIsActive]=\"freehandDrawIsActive\"\r\n  [drawStyle]=\"drawStyle$ | async\"\r\n  [overlayStyle]=\"overlayStyle$ | async\"\r\n  [radius]=\"radius\">\r\n</igo-geometry-form-field-input>\r\n\r\n<div class=\"header\">\r\n    <mat-slide-toggle *ngIf=\"!isPredefined()\"\r\n      [checked]=\"drawControlIsActive\"\r\n      [labelPosition]=\"'before'\"\r\n      (change)=\"onDrawControlChange()\">\r\n      {{'igo.geo.spatialFilter.drawControl' | translate}}\r\n    </mat-slide-toggle>\r\n    <mat-slide-toggle *ngIf=\"!isPredefined()\"\r\n      [checked]=\"freehandDrawIsActive\"\r\n      [labelPosition]=\"'before'\"\r\n      (change)=\"onfreehandControlChange()\">\r\n      {{'igo.geo.spatialFilter.freehandControl' | translate}}\r\n    </mat-slide-toggle>\r\n</div>\r\n\r\n  <div class=\"radius-unit\" *ngIf=\"isPoint()\">\r\n    <form class=\"radius-form\">\r\n      <mat-form-field class=\"radius\">\r\n        <input type=\"number\" matInput placeholder=\"{{'igo.geo.spatialFilter.radius' | translate}}\" [formControl]=\"radiusFormControl\"\r\n        [value]=\"1000\" (input)=\"getRadius()\" [readonly]=\"this.freehandDrawIsActive && this.formControl.value === null\">\r\n        <label class=\"unit-field\">\r\n          {{('igo.geo.measure.' + measureUnit) | translate}}\r\n        </label>\r\n      </mat-form-field>\r\n    </form>\r\n  </div>\r\n\r\n  <mat-label class=\"title mat-typography\">{{'igo.geo.spatialFilter.search' | translate}} : </mat-label>\r\n  <mat-radio-group [value]=\"selectedItemType\">\r\n      <mat-radio-button *ngFor=\"let item of itemType\"\r\n        [value]=\"item\"\r\n        (change)=\"onItemTypeChange($event)\">\r\n        {{'igo.geo.spatialFilter.' + item | translate}}\r\n      </mat-radio-button>\r\n  </mat-radio-group>\r\n\r\n<div class=\"thematics\" *ngIf=\"selectedItemType==='Thematics'\">\r\n  <mat-table>\r\n      <!-- Name Column -->\r\n      <ng-container matColumnDef=\"name\">\r\n        <mat-header-cell *matHeaderCellDef class=\"thematics-header\">{{'igo.geo.spatialFilter.Thematics' | translate}}</mat-header-cell>\r\n      </ng-container>\r\n\r\n      <!-- Select Column -->\r\n      <ng-container matColumnDef=\"select\">\r\n        <mat-header-cell *matHeaderCellDef class=\"checks-header\">\r\n          <mat-checkbox (change)=\"$event ? masterToggle() : null\"\r\n                        [checked]=\"isAllSelected()\"\r\n                        [indeterminate]=\"selectedThematics.hasValue() && !isAllSelected()\">\r\n          </mat-checkbox>\r\n        </mat-header-cell>\r\n    </ng-container>\r\n\r\n    <mat-header-row *matHeaderRowDef=\"displayedColumns\"></mat-header-row>\r\n    <mat-row *matRowDef=\"let row; columns: displayedColumns;\"></mat-row>\r\n\r\n  </mat-table>\r\n\r\n  <mat-tree [dataSource]=\"dataSource\" [treeControl]=\"treeControl\">\r\n    <!-- This is the tree node template for leaf nodes -->\r\n    <mat-tree-node *matTreeNodeDef=\"let node\" matTreeNodeToggle>\r\n      <li class=\"mat-tree-node\">\r\n        <!-- use a disabled button to provide padding for tree leaf -->\r\n        <button mat-icon-button disabled></button>\r\n        {{node.name}}\r\n        <mat-checkbox class=\"tree-check\" (click)=\"$event.stopPropagation()\"\r\n                      (change)=\"$event ? onToggleChange(node) : null\"\r\n                      [checked]=\"selectedThematics.isSelected(node)\">\r\n        </mat-checkbox>\r\n      </li>\r\n    </mat-tree-node>\r\n\r\n    <!-- This is the tree node template for expandable nodes -->\r\n    <mat-nested-tree-node *matTreeNodeDef=\"let node; when: hasChild\">\r\n        <div class=\"mat-tree-node\">\r\n          <button mat-icon-button\r\n            (click)=\"onToggleClick(node)\">\r\n            <mat-icon [svgIcon]=\"treeControl.isExpanded(node) ? 'chevron-down' : 'chevron-right'\"></mat-icon>\r\n          </button>\r\n          {{node.name}}\r\n          <mat-checkbox class=\"tree-check-2\" (change)=\"$event ? childrensToggle(node) : null\"\r\n                        [checked]=\"isAllSelected(node)\"\r\n                        [indeterminate]=\"hasChildrenSelected(node) && !isAllSelected(node)\">\r\n          </mat-checkbox>\r\n        </div>\r\n        <ul class=\"tree-ul\" [class.example-tree-invisible]=\"!treeControl.isExpanded(node)\">\r\n          <ng-container matTreeNodeOutlet></ng-container>\r\n        </ul>\r\n    </mat-nested-tree-node>\r\n\r\n  </mat-tree>\r\n</div>\r\n\r\n<div class=\"buttons\">\r\n\r\n    <button *ngIf=\"isPredefined()\" mat-raised-button class=\"clear-search-button\" [disabled]=\"!queryType && !zone\"\r\n      (click)=\"clearSearch()\">\r\n        {{'igo.geo.spatialFilter.clearSearch' | translate}}\r\n    </button>\r\n\r\n  <button *ngIf=\"isPolygon() || isPoint()\" mat-raised-button class=\"clear-form-button\" [disabled]=\"this.formControl.value === null\"\r\n    (click)=\"this.formControl.reset()\">\r\n    {{'igo.geo.spatialFilter.clearForm' | translate}}\r\n  </button>\r\n\r\n  <button mat-raised-button class=\"search-button\" [disabled]=\"disableSearchButton()\" color=\"primary\"\r\n    (click)=\"toggleSearchButton()\">\r\n    {{'igo.geo.spatialFilter.goSearch' | translate}}\r\n  </button>\r\n\r\n  <button *ngIf=\"selectedSourceAddress || selectedThematics\" mat-raised-button class=\"remove-button\"\r\n    [disabled]=\"!layers.length\" (click)=\"clearButton()\">\r\n    {{'igo.geo.spatialFilter.removeLayer' | translate}}\r\n  </button>\r\n\r\n</div>\r\n\r\n<div class=\"results\" *ngIf=\"store\">\r\n  <mat-table class=\"results-list\" [dataSource]=\"store.entities$.value\">\r\n\r\n    <!-- Type Column -->\r\n    <ng-container matColumnDef=\"typeResults\">\r\n        <mat-header-cell *matHeaderCellDef>{{'igo.geo.spatialFilter.type' | translate}}</mat-header-cell>\r\n        <mat-cell *matCellDef=\"let result\"> {{result.meta.title}} </mat-cell>\r\n      </ng-container>\r\n\r\n    <!-- Name Column -->\r\n    <ng-container matColumnDef=\"nameResults\">\r\n      <mat-header-cell *matHeaderCellDef>{{'igo.geo.spatialFilter.searchResults' | translate}}</mat-header-cell>\r\n      <mat-cell *matCellDef=\"let result\"> {{result.properties.nom}} </mat-cell>\r\n    </ng-container>\r\n\r\n    <mat-header-row *matHeaderRowDef=\"displayedColumnsResults\"></mat-header-row>\r\n    <mat-row *matRowDef=\"let row; columns: displayedColumnsResults;\"></mat-row>\r\n  </mat-table>\r\n</div>",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".header{margin-top:5px;width:100%}.mat-slide-toggle{padding:5px;margin-bottom:15px;width:98%}.mat-slide-toggle ::ng-deep .mat-slide-toggle-content{width:calc(100% - 20px)}.radius-form,.title{margin-left:5px}.title{font-size:initial}.mat-radio-group{display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;padding-top:10px}.mat-radio-button{display:-webkit-inline-box;display:inline-flex;position:relative;margin-left:16px;margin-top:10px}.mat-form-field{margin-top:5px}.mat-column-select{overflow:auto}.buttons{margin-top:10px}.search-button{left:25px;width:150px}.remove-button{left:75px;margin:15px;width:150px}.clear-form-button,.clear-search-button{left:10px;width:150px}.thematics{max-height:150px;overflow:auto;margin-top:5px;width:98%}.results{overflow:auto;max-height:250px;width:98%}.mat-column-typeResults{max-width:100px;margin-right:5px}.radius{width:90%}.radius ::ng-deep .mat-form-field-infix{display:-webkit-inline-box;display:inline-flex}.unit-field{padding-left:5px;padding-right:5px}.example-tree-invisible{display:none}.tree-ul{margin:0;padding:0 0 0 20px;list-style-type:none}.tree-check,.tree-check-2{position:relative;margin-left:auto;margin-right:5px}.thematics-header{max-width:250px}.checks-header{padding:none;max-width:calc(100% - 316px);overflow:hidden}.mat-checkbox{padding:5px}.mat-tree-node{position:relative;min-height:42px;width:280px}.mat-header-cell{height:56px}"]
            }] }
];
/** @nocollapse */
SpatialFilterItemComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: SpatialFilterService },
    { type: MessageService },
    { type: LanguageService }
];
SpatialFilterItemComponent.propDecorators = {
    map: [{ type: Input }],
    type: [{ type: Input }],
    queryType: [{ type: Input }],
    zone: [{ type: Input }],
    loading: [{ type: Input }],
    store: [{ type: Input }],
    layers: [{ type: Input }],
    toggleSearch: [{ type: Output }],
    itemTypeChange: [{ type: Output }],
    thematicChange: [{ type: Output }],
    drawZoneEvent: [{ type: Output }],
    radiusEvent: [{ type: Output }],
    freehandControl: [{ type: Output }],
    clearButtonEvent: [{ type: Output }],
    clearSearchEvent: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    SpatialFilterItemComponent.prototype.map;
    /**
     * @type {?}
     * @private
     */
    SpatialFilterItemComponent.prototype._type;
    /** @type {?} */
    SpatialFilterItemComponent.prototype.queryType;
    /** @type {?} */
    SpatialFilterItemComponent.prototype.zone;
    /** @type {?} */
    SpatialFilterItemComponent.prototype.loading;
    /**
     * @type {?}
     * @private
     */
    SpatialFilterItemComponent.prototype._store;
    /** @type {?} */
    SpatialFilterItemComponent.prototype.layers;
    /** @type {?} */
    SpatialFilterItemComponent.prototype.toggleSearch;
    /** @type {?} */
    SpatialFilterItemComponent.prototype.itemTypeChange;
    /** @type {?} */
    SpatialFilterItemComponent.prototype.thematicChange;
    /** @type {?} */
    SpatialFilterItemComponent.prototype.drawZoneEvent;
    /** @type {?} */
    SpatialFilterItemComponent.prototype.radiusEvent;
    /** @type {?} */
    SpatialFilterItemComponent.prototype.freehandControl;
    /** @type {?} */
    SpatialFilterItemComponent.prototype.clearButtonEvent;
    /** @type {?} */
    SpatialFilterItemComponent.prototype.clearSearchEvent;
    /** @type {?} */
    SpatialFilterItemComponent.prototype.itemType;
    /** @type {?} */
    SpatialFilterItemComponent.prototype.selectedItemType;
    /** @type {?} */
    SpatialFilterItemComponent.prototype.selectedSourceAddress;
    /** @type {?} */
    SpatialFilterItemComponent.prototype.treeControl;
    /** @type {?} */
    SpatialFilterItemComponent.prototype.displayedColumns;
    /** @type {?} */
    SpatialFilterItemComponent.prototype.childrens;
    /** @type {?} */
    SpatialFilterItemComponent.prototype.groups;
    /** @type {?} */
    SpatialFilterItemComponent.prototype.thematics;
    /** @type {?} */
    SpatialFilterItemComponent.prototype.dataSource;
    /** @type {?} */
    SpatialFilterItemComponent.prototype.selectedThematics;
    /** @type {?} */
    SpatialFilterItemComponent.prototype.displayedColumnsResults;
    /** @type {?} */
    SpatialFilterItemComponent.prototype.value$;
    /** @type {?} */
    SpatialFilterItemComponent.prototype.drawGuide$;
    /** @type {?} */
    SpatialFilterItemComponent.prototype.overlayStyle$;
    /** @type {?} */
    SpatialFilterItemComponent.prototype.drawStyle$;
    /**
     * @type {?}
     * @private
     */
    SpatialFilterItemComponent.prototype.value$$;
    /**
     * @type {?}
     * @private
     */
    SpatialFilterItemComponent.prototype.radiusChanges$$;
    /** @type {?} */
    SpatialFilterItemComponent.prototype.formControl;
    /** @type {?} */
    SpatialFilterItemComponent.prototype.geometryType;
    /** @type {?} */
    SpatialFilterItemComponent.prototype.geometryTypeField;
    /** @type {?} */
    SpatialFilterItemComponent.prototype.geometryTypes;
    /** @type {?} */
    SpatialFilterItemComponent.prototype.drawGuideField;
    /** @type {?} */
    SpatialFilterItemComponent.prototype.drawGuide;
    /** @type {?} */
    SpatialFilterItemComponent.prototype.drawGuidePlaceholder;
    /** @type {?} */
    SpatialFilterItemComponent.prototype.measure;
    /** @type {?} */
    SpatialFilterItemComponent.prototype.drawControlIsActive;
    /** @type {?} */
    SpatialFilterItemComponent.prototype.freehandDrawIsActive;
    /** @type {?} */
    SpatialFilterItemComponent.prototype.drawStyle;
    /** @type {?} */
    SpatialFilterItemComponent.prototype.drawZone;
    /** @type {?} */
    SpatialFilterItemComponent.prototype.overlayStyle;
    /** @type {?} */
    SpatialFilterItemComponent.prototype.PointStyle;
    /** @type {?} */
    SpatialFilterItemComponent.prototype.PolyStyle;
    /** @type {?} */
    SpatialFilterItemComponent.prototype.radius;
    /** @type {?} */
    SpatialFilterItemComponent.prototype.radiusFormControl;
    /** @type {?} */
    SpatialFilterItemComponent.prototype.measureUnit;
    /**
     * @type {?}
     * @private
     */
    SpatialFilterItemComponent.prototype.cdRef;
    /**
     * @type {?}
     * @private
     */
    SpatialFilterItemComponent.prototype.spatialFilterService;
    /**
     * @type {?}
     * @private
     */
    SpatialFilterItemComponent.prototype.messageService;
    /**
     * @type {?}
     * @private
     */
    SpatialFilterItemComponent.prototype.languageService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BhdGlhbC1maWx0ZXItaXRlbS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvZmlsdGVyL3NwYXRpYWwtZmlsdGVyL3NwYXRpYWwtZmlsdGVyLWl0ZW0vc3BhdGlhbC1maWx0ZXItaXRlbS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsTUFBTSxFQUNOLFlBQVksRUFHYixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsc0JBQXNCLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUM3RixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDMUQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUN0QyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUUzRSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFFLGVBQWUsRUFBZ0IsTUFBTSxNQUFNLENBQUM7QUFJckQsT0FBTyxLQUFLLE9BQU8sTUFBTSxVQUFVLENBQUM7QUFDcEMsT0FBTyxLQUFLLE1BQU0sTUFBTSxTQUFTLENBQUM7QUFFbEMsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDNUQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDM0UsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDckQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUUzQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUV0RCxPQUFPLEVBQUUsY0FBYyxFQUFFLGVBQWUsRUFB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XHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgT3V0cHV0LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBPbkRlc3Ryb3ksXHJcbiAgT25Jbml0XHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFNwYXRpYWxGaWx0ZXJRdWVyeVR5cGUsIFNwYXRpYWxGaWx0ZXJUeXBlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3NwYXRpYWwtZmlsdGVyLmVudW0nO1xyXG5pbXBvcnQgeyBTZWxlY3Rpb25Nb2RlbCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2xsZWN0aW9ucyc7XHJcbmltcG9ydCB7IElnb01hcCB9IGZyb20gJy4uLy4uLy4uL21hcCc7XHJcbmltcG9ydCB7IFNwYXRpYWxGaWx0ZXJJdGVtVHlwZSB9IGZyb20gJy4vLi4vLi4vc2hhcmVkL3NwYXRpYWwtZmlsdGVyLmVudW0nO1xyXG5pbXBvcnQgeyBGZWF0dXJlIH0gZnJvbSAnLi8uLi8uLi8uLi9mZWF0dXJlL3NoYXJlZC9mZWF0dXJlLmludGVyZmFjZXMnO1xyXG5pbXBvcnQgeyBGb3JtQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IE9sR2VvbWV0cnlUeXBlIGZyb20gJ29sL2dlb20vR2VvbWV0cnlUeXBlJztcclxuaW1wb3J0IHsgR2VvSlNPTkdlb21ldHJ5IH0gZnJvbSAnLi4vLi4vLi4vZ2VvbWV0cnkvc2hhcmVkL2dlb21ldHJ5LmludGVyZmFjZXMnO1xyXG5pbXBvcnQgeyBTdHlsZSBhcyBPbFN0eWxlIH0gZnJvbSAnb2wvc3R5bGUnO1xyXG5pbXBvcnQgKiBhcyBvbHN0eWxlIGZyb20gJ29sL3N0eWxlJztcclxuaW1wb3J0ICogYXMgb2xwcm9qIGZyb20gJ29sL3Byb2onO1xyXG5pbXBvcnQgeyBvbEZlYXR1cmUgfSBmcm9tICdvbC9GZWF0dXJlJztcclxuaW1wb3J0IHsgTWF0VHJlZU5lc3RlZERhdGFTb3VyY2UgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XHJcbmltcG9ydCB7IFNwYXRpYWxGaWx0ZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3NwYXRpYWwtZmlsdGVyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBNZWFzdXJlTGVuZ3RoVW5pdCB9IGZyb20gJy4uLy4uLy4uL21lYXN1cmUnO1xyXG5pbXBvcnQgeyBFbnRpdHlTdG9yZSB9IGZyb20gJ0BpZ28yL2NvbW1vbic7XHJcbmltcG9ydCB7IExheWVyIH0gZnJvbSAnLi4vLi4vLi4vbGF5ZXIvc2hhcmVkJztcclxuaW1wb3J0IHsgTmVzdGVkVHJlZUNvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9jZGsvdHJlZSc7XHJcbmltcG9ydCB7IFNwYXRpYWxGaWx0ZXJUaGVtYXRpYyB9IGZyb20gJy4vLi4vLi4vc2hhcmVkL3NwYXRpYWwtZmlsdGVyLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IE1lc3NhZ2VTZXJ2aWNlLCBMYW5ndWFnZVNlcnZpY2UgfSBmcm9tICdAaWdvMi9jb3JlJztcclxuXHJcbi8qKlxyXG4gKiBTcGF0aWFsLUZpbHRlci1JdGVtIChzZWFyY2ggcGFyYW1ldGVycylcclxuICovXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaWdvLXNwYXRpYWwtZmlsdGVyLWl0ZW0nLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9zcGF0aWFsLWZpbHRlci1pdGVtLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9zcGF0aWFsLWZpbHRlci1pdGVtLmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIFNwYXRpYWxGaWx0ZXJJdGVtQ29tcG9uZW50IGltcGxlbWVudHMgT25EZXN0cm95LCBPbkluaXQge1xyXG5cclxuICBASW5wdXQoKSBtYXA6IElnb01hcDtcclxuXHJcbiAgQElucHV0KClcclxuICBnZXQgdHlwZSgpOiBTcGF0aWFsRmlsdGVyVHlwZSB7XHJcbiAgICByZXR1cm4gdGhpcy5fdHlwZTtcclxuICB9XHJcbiAgc2V0IHR5cGUodHlwZTogU3BhdGlhbEZpbHRlclR5cGUpIHtcclxuICAgIHRoaXMuX3R5cGUgPSB0eXBlO1xyXG4gICAgY29uc3QgaW5kZXggPSB0aGlzLmdlb21ldHJ5VHlwZXMuZmluZEluZGV4KGdlb20gPT4gZ2VvbSA9PT0gdGhpcy50eXBlKTtcclxuICAgIHRoaXMuZ2VvbWV0cnlUeXBlID0gdGhpcy5nZW9tZXRyeVR5cGVzW2luZGV4XTtcclxuICAgIHRoaXMuZm9ybUNvbnRyb2wucmVzZXQoKTtcclxuICAgIHRoaXMucmFkaXVzID0gdW5kZWZpbmVkO1xyXG4gICAgdGhpcy5kcmF3R3VpZGUkLm5leHQobnVsbCk7XHJcbiAgICB0aGlzLmRyYXdTdHlsZSQubmV4dCh1bmRlZmluZWQpO1xyXG5cclxuICAgIC8vIE5lY2Vzc2FyeSB0byBrZWVwIHJlZmVyZW5jZSB0byB0aGUgZ2VvbWV0cnkgZm9ybSBmaWVsZCBpbnB1dFxyXG4gICAgaWYgKHRoaXMudHlwZSA9PT0gU3BhdGlhbEZpbHRlclR5cGUuUHJlZGVmaW5lZCkge1xyXG4gICAgICBjb25zdCBnZW9qc29uOiBHZW9KU09OR2VvbWV0cnkgPSB7XHJcbiAgICAgICAgdHlwZTogJ1BvaW50JyxcclxuICAgICAgICBjb29yZGluYXRlczogJydcclxuICAgICAgfTtcclxuICAgICAgdGhpcy5mb3JtQ29udHJvbC5zZXRWYWx1ZShnZW9qc29uKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBOZWNlc3NhcnkgdG8gYXBwbHkgdGhlIHJpZ2h0IHN0eWxlIHdoZW4gZ2VvbWV0cnkgdHlwZSBpcyBQb2ludFxyXG4gICAgaWYgKHRoaXMudHlwZSA9PT0gU3BhdGlhbEZpbHRlclR5cGUuUG9pbnQpIHtcclxuICAgICAgdGhpcy5yYWRpdXMgPSAxMDAwOyAvLyBCYXNlIHJhZGl1c1xyXG4gICAgICB0aGlzLnJhZGl1c0Zvcm1Db250cm9sLnNldFZhbHVlKHRoaXMucmFkaXVzKTtcclxuICAgICAgdGhpcy5Qb2ludFN0eWxlID0gKGZlYXR1cmU6IG9sRmVhdHVyZSwgcmVzb2x1dGlvbjogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgY29uc3QgY29vcmRpbmF0ZXMgPSBvbHByb2oudHJhbnNmb3JtKGZlYXR1cmUuZ2V0R2VvbWV0cnkoKS5nZXRDb29yZGluYXRlcygpLCB0aGlzLm1hcC5wcm9qZWN0aW9uLCAnRVBTRzo0MzI2Jyk7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBvbHN0eWxlLlN0eWxlICh7XHJcbiAgICAgICAgICBpbWFnZTogbmV3IG9sc3R5bGUuQ2lyY2xlICh7XHJcbiAgICAgICAgICAgIHJhZGl1czogdGhpcy5yYWRpdXMgLyAoTWF0aC5jb3MoKE1hdGguUEkgLyAxODApICogY29vcmRpbmF0ZXNbMV0pKSAvIHJlc29sdXRpb24sIC8vIExhdGl0dWRlIGNvcnJlY3Rpb25cclxuICAgICAgICAgICAgc3Ryb2tlOiBuZXcgb2xzdHlsZS5TdHJva2Uoe1xyXG4gICAgICAgICAgICAgIHdpZHRoOiAyLFxyXG4gICAgICAgICAgICAgIGNvbG9yOiAncmdiYSgwLCAxNTMsIDI1NSknXHJcbiAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICBmaWxsOiBuZXcgb2xzdHlsZS5GaWxsKHtcclxuICAgICAgICAgICAgICBjb2xvcjogJ3JnYmEoMCwgMTUzLCAyNTUsIDAuMiknXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9O1xyXG4gICAgICB0aGlzLm92ZXJsYXlTdHlsZSA9IHRoaXMuUG9pbnRTdHlsZTtcclxuICAgICAgdGhpcy5kcmF3U3R5bGUkLm5leHQodGhpcy5vdmVybGF5U3R5bGUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gSWYgZ2VvbWV0cnkgdHlwZXMgaXMgUG9seWdvblxyXG4gICAgICB0aGlzLnJhZGl1cyA9IHVuZGVmaW5lZDtcclxuICAgICAgdGhpcy5Qb2x5U3R5bGUgPSAoZmVhdHVyZSwgcmVzb2x1dGlvbikgPT4ge1xyXG4gICAgICAgIHJldHVybiBuZXcgb2xzdHlsZS5TdHlsZSAoe1xyXG4gICAgICAgICAgc3Ryb2tlOiBuZXcgb2xzdHlsZS5TdHJva2Uoe1xyXG4gICAgICAgICAgICB3aWR0aDogMixcclxuICAgICAgICAgICAgY29sb3I6ICdyZ2JhKDAsIDE1MywgMjU1KSdcclxuICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgZmlsbDogbmV3IG9sc3R5bGUuRmlsbCh7XHJcbiAgICAgICAgICAgIGNvbG9yOiAncmdiYSgwLCAxNTMsIDI1NSwgMC4yKSdcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH07XHJcbiAgICAgIHRoaXMub3ZlcmxheVN0eWxlID0gdGhpcy5Qb2x5U3R5bGU7XHJcbiAgICB9XHJcbiAgICB0aGlzLm92ZXJsYXlTdHlsZSQubmV4dCh0aGlzLm92ZXJsYXlTdHlsZSk7XHJcbiAgfVxyXG4gIHByaXZhdGUgX3R5cGU6IFNwYXRpYWxGaWx0ZXJUeXBlO1xyXG5cclxuICBASW5wdXQoKSBxdWVyeVR5cGU6IFNwYXRpYWxGaWx0ZXJRdWVyeVR5cGU7XHJcblxyXG4gIEBJbnB1dCgpIHpvbmU6IEZlYXR1cmU7XHJcblxyXG4gIEBJbnB1dCgpIGxvYWRpbmc7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IHN0b3JlKCk6IEVudGl0eVN0b3JlPEZlYXR1cmU+IHtcclxuICAgIHJldHVybiB0aGlzLl9zdG9yZTtcclxuICB9XHJcbiAgc2V0IHN0b3JlKHN0b3JlOiBFbnRpdHlTdG9yZTxGZWF0dXJlPikge1xyXG4gICAgdGhpcy5fc3RvcmUgPSBzdG9yZTtcclxuICAgIHRoaXMuX3N0b3JlLmVudGl0aWVzJC5zdWJzY3JpYmUoKCkgPT4geyB0aGlzLmNkUmVmLmRldGVjdENoYW5nZXMoKTsgfSk7XHJcbiAgfVxyXG4gIHByaXZhdGUgX3N0b3JlOiBFbnRpdHlTdG9yZTxGZWF0dXJlPjtcclxuXHJcbiAgLyoqXHJcbiAgICogQXZhaWxhYmxlIG1lYXN1cmUgdW5pdHMgZm9yIHRoZSBtZWFzdXJlIHR5cGUgZ2l2ZW5cclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBnZXQgbWVhc3VyZVVuaXRzKCk6IHN0cmluZ1tdIHtcclxuICAgIHJldHVybiBbTWVhc3VyZUxlbmd0aFVuaXQuTWV0ZXJzXTtcclxuICB9XHJcblxyXG4gIEBJbnB1dCgpIGxheWVyczogTGF5ZXJbXSA9IFtdO1xyXG5cclxuICBAT3V0cHV0KCkgdG9nZ2xlU2VhcmNoID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICBAT3V0cHV0KCkgaXRlbVR5cGVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPFNwYXRpYWxGaWx0ZXJJdGVtVHlwZT4oKTtcclxuXHJcbiAgQE91dHB1dCgpIHRoZW1hdGljQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxTcGF0aWFsRmlsdGVyVGhlbWF0aWNbXT4oKTtcclxuXHJcbiAgQE91dHB1dCgpIGRyYXdab25lRXZlbnQgPSBuZXcgRXZlbnRFbWl0dGVyPEZlYXR1cmU+KCk7XHJcblxyXG4gIEBPdXRwdXQoKSByYWRpdXNFdmVudCA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xyXG4gIEBPdXRwdXQoKSBmcmVlaGFuZENvbnRyb2wgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XHJcblxyXG4gIEBPdXRwdXQoKSBjbGVhckJ1dHRvbkV2ZW50ID0gbmV3IEV2ZW50RW1pdHRlcjxMYXllcltdPigpO1xyXG5cclxuICBAT3V0cHV0KCkgY2xlYXJTZWFyY2hFdmVudCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgcHVibGljIGl0ZW1UeXBlOiBTcGF0aWFsRmlsdGVySXRlbVR5cGVbXSA9IFtTcGF0aWFsRmlsdGVySXRlbVR5cGUuQWRkcmVzcywgU3BhdGlhbEZpbHRlckl0ZW1UeXBlLlRoZW1hdGljc107XHJcbiAgcHVibGljIHNlbGVjdGVkSXRlbVR5cGU6IFNwYXRpYWxGaWx0ZXJJdGVtVHlwZSA9IFNwYXRpYWxGaWx0ZXJJdGVtVHlwZS5BZGRyZXNzO1xyXG4gIHB1YmxpYyBzZWxlY3RlZFNvdXJjZUFkZHJlc3M7XHJcblxyXG4gIHRyZWVDb250cm9sID0gbmV3IE5lc3RlZFRyZWVDb250cm9sPFNwYXRpYWxGaWx0ZXJUaGVtYXRpYz4obm9kZSA9PiBub2RlLmNoaWxkcmVuKTtcclxuXHJcbiAgLy8gRm9yIHRoZW1hdGljcyBhbmQgcmVzdWx0cyB0YWJsZXNcclxuICBwdWJsaWMgZGlzcGxheWVkQ29sdW1uczogc3RyaW5nW10gPSBbJ25hbWUnLCAnc2VsZWN0J107XHJcbiAgcHVibGljIGNoaWxkcmVuczogU3BhdGlhbEZpbHRlclRoZW1hdGljW10gPSBbXTtcclxuICBwdWJsaWMgZ3JvdXBzOiBzdHJpbmdbXSA9IFtdO1xyXG4gIHB1YmxpYyB0aGVtYXRpY3M6IFNwYXRpYWxGaWx0ZXJUaGVtYXRpY1tdID0gW107XHJcbiAgcHVibGljIGRhdGFTb3VyY2UgPSBuZXcgTWF0VHJlZU5lc3RlZERhdGFTb3VyY2U8U3BhdGlhbEZpbHRlclRoZW1hdGljPigpO1xyXG4gIHB1YmxpYyBzZWxlY3RlZFRoZW1hdGljcyA9IG5ldyBTZWxlY3Rpb25Nb2RlbDxTcGF0aWFsRmlsdGVyVGhlbWF0aWM+KHRydWUsIFtdKTtcclxuICBwdWJsaWMgZGlzcGxheWVkQ29sdW1uc1Jlc3VsdHM6IHN0cmluZ1tdID0gWyd0eXBlUmVzdWx0cycsICduYW1lUmVzdWx0cyddO1xyXG5cclxuICAvLyBGb3IgZ2VvbWV0cnkgZm9ybSBmaWVsZCBpbnB1dFxyXG4gIHZhbHVlJDogQmVoYXZpb3JTdWJqZWN0PEdlb0pTT05HZW9tZXRyeT4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KHVuZGVmaW5lZCk7XHJcbiAgZHJhd0d1aWRlJDogQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KG51bGwpO1xyXG4gIG92ZXJsYXlTdHlsZSQ6IEJlaGF2aW9yU3ViamVjdDxPbFN0eWxlPiA9IG5ldyBCZWhhdmlvclN1YmplY3QodW5kZWZpbmVkKTtcclxuICBkcmF3U3R5bGUkOiBCZWhhdmlvclN1YmplY3Q8T2xTdHlsZT4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KHVuZGVmaW5lZCk7XHJcblxyXG4gIHByaXZhdGUgdmFsdWUkJDogU3Vic2NyaXB0aW9uO1xyXG4gIHByaXZhdGUgcmFkaXVzQ2hhbmdlcyQkOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIHB1YmxpYyBmb3JtQ29udHJvbCA9IG5ldyBGb3JtQ29udHJvbCgpO1xyXG4gIHB1YmxpYyBnZW9tZXRyeVR5cGU6IE9sR2VvbWV0cnlUeXBlO1xyXG4gIHB1YmxpYyBnZW9tZXRyeVR5cGVGaWVsZCA9IGZhbHNlO1xyXG4gIHB1YmxpYyBnZW9tZXRyeVR5cGVzOiBzdHJpbmdbXSA9IFsnUG9pbnQnLCAnUG9seWdvbiddO1xyXG4gIHB1YmxpYyBkcmF3R3VpZGVGaWVsZCA9IGZhbHNlO1xyXG4gIHB1YmxpYyBkcmF3R3VpZGU6IG51bWJlciA9IG51bGw7XHJcbiAgcHVibGljIGRyYXdHdWlkZVBsYWNlaG9sZGVyID0gJyc7XHJcbiAgcHVibGljIG1lYXN1cmUgPSBmYWxzZTtcclxuICBwdWJsaWMgZHJhd0NvbnRyb2xJc0FjdGl2ZSA9IHRydWU7XHJcbiAgcHVibGljIGZyZWVoYW5kRHJhd0lzQWN0aXZlID0gZmFsc2U7XHJcbiAgcHVibGljIGRyYXdTdHlsZTogT2xTdHlsZTtcclxuICBwdWJsaWMgZHJhd1pvbmU6IEZlYXR1cmU7XHJcbiAgcHVibGljIG92ZXJsYXlTdHlsZTogT2xTdHlsZTtcclxuICBwdWJsaWMgUG9pbnRTdHlsZTogT2xTdHlsZTtcclxuICBwdWJsaWMgUG9seVN0eWxlOiBPbFN0eWxlO1xyXG5cclxuICBwdWJsaWMgcmFkaXVzOiBudW1iZXI7XHJcbiAgcHVibGljIHJhZGl1c0Zvcm1Db250cm9sID0gbmV3IEZvcm1Db250cm9sKCk7XHJcblxyXG4gIHB1YmxpYyBtZWFzdXJlVW5pdDogTWVhc3VyZUxlbmd0aFVuaXQgPSBNZWFzdXJlTGVuZ3RoVW5pdC5NZXRlcnM7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBjZFJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgICBwcml2YXRlIHNwYXRpYWxGaWx0ZXJTZXJ2aWNlOiBTcGF0aWFsRmlsdGVyU2VydmljZSxcclxuICAgIHByaXZhdGUgbWVzc2FnZVNlcnZpY2U6IE1lc3NhZ2VTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBsYW5ndWFnZVNlcnZpY2U6IExhbmd1YWdlU2VydmljZSkge31cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLnNwYXRpYWxGaWx0ZXJTZXJ2aWNlLmxvYWRUaGVtYXRpY3NMaXN0KClcclxuICAgIC5zdWJzY3JpYmUoKGl0ZW1zOiBTcGF0aWFsRmlsdGVyVGhlbWF0aWNbXSkgPT4ge1xyXG4gICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgaXRlbXMpIHtcclxuICAgICAgICB0aGlzLmNoaWxkcmVucy5wdXNoKGl0ZW0pO1xyXG4gICAgICAgIHRoaXMuY2hpbGRyZW5zLnNvcnQoKGEsIGIpID0+IHtcclxuICAgICAgICAgIHJldHVybiBhLm5hbWUubG9jYWxlQ29tcGFyZShiLm5hbWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuY2hpbGRyZW5zLmZvckVhY2goY2hpbGQgPT4ge1xyXG4gICAgICAgIGlmIChjaGlsZC5ncm91cCAmJiAodGhpcy5ncm91cHMuaW5kZXhPZihjaGlsZC5ncm91cCkgPT09IC0xKSkge1xyXG4gICAgICAgICAgdGhpcy5ncm91cHMucHVzaChjaGlsZC5ncm91cCk7XHJcbiAgICAgICAgICBjb25zdCB0aGVtYXRpYzogU3BhdGlhbEZpbHRlclRoZW1hdGljID0ge1xyXG4gICAgICAgICAgICBuYW1lOiBjaGlsZC5ncm91cCxcclxuICAgICAgICAgICAgY2hpbGRyZW46IFtdXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgICAgdGhpcy50aGVtYXRpY3MucHVzaCh0aGVtYXRpYyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghY2hpbGQuZ3JvdXApIHtcclxuICAgICAgICAgIGNvbnN0IHRoZW1hdGljOiBTcGF0aWFsRmlsdGVyVGhlbWF0aWMgPSB7XHJcbiAgICAgICAgICAgIG5hbWU6IGNoaWxkLm5hbWUsXHJcbiAgICAgICAgICAgIGNoaWxkcmVuOiBbXSxcclxuICAgICAgICAgICAgc291cmNlOiBjaGlsZC5zb3VyY2VcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgICB0aGlzLnRoZW1hdGljcy5wdXNoKHRoZW1hdGljKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy50aGVtYXRpY3Muc29ydCgoYSwgYikgPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIGEubmFtZS5sb2NhbGVDb21wYXJlKGIubmFtZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGlzLnRoZW1hdGljcy5mb3JFYWNoKHRoZW1hdGljID0+IHtcclxuICAgICAgICBmb3IgKGNvbnN0IGNoaWxkIG9mIHRoaXMuY2hpbGRyZW5zKSB7XHJcbiAgICAgICAgICBpZiAoY2hpbGQuZ3JvdXAgPT09IHRoZW1hdGljLm5hbWUpIHtcclxuICAgICAgICAgICAgdGhlbWF0aWMuY2hpbGRyZW4ucHVzaChjaGlsZCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuZGF0YVNvdXJjZS5kYXRhID0gdGhpcy50aGVtYXRpY3M7XHJcblxyXG4gICAgdGhpcy5kcmF3R3VpZGUkLm5leHQobnVsbCk7XHJcbiAgICB0aGlzLnZhbHVlJC5uZXh0KHRoaXMuZm9ybUNvbnRyb2wudmFsdWUgPyB0aGlzLmZvcm1Db250cm9sLnZhbHVlIDogdW5kZWZpbmVkKTtcclxuICAgIHRoaXMudmFsdWUkJCA9IHRoaXMuZm9ybUNvbnRyb2wudmFsdWVDaGFuZ2VzLnN1YnNjcmliZSgodmFsdWU6IEdlb0pTT05HZW9tZXRyeSkgPT4ge1xyXG4gICAgICB0aGlzLnZhbHVlJC5uZXh0KHZhbHVlID8gdmFsdWUgOiB1bmRlZmluZWQpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy52YWx1ZSQuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgdGhpcy5nZXRSYWRpdXMoKTtcclxuICAgICAgdGhpcy5jZFJlZi5kZXRlY3RDaGFuZ2VzKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLnJhZGl1c0NoYW5nZXMkJCA9IHRoaXMucmFkaXVzRm9ybUNvbnRyb2wudmFsdWVDaGFuZ2VzLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgIHRoaXMuZ2V0UmFkaXVzKCk7XHJcbiAgICAgIHRoaXMuY2RSZWYuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVbnN1YnNjcmliZSB0byB0aGUgdmFsdWUgc3RyZWFtXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLnZhbHVlJCQudW5zdWJzY3JpYmUoKTtcclxuICAgIHRoaXMuY2RSZWYuZGV0YWNoKCk7XHJcbiAgfVxyXG5cclxuICBvbkl0ZW1UeXBlQ2hhbmdlKGV2ZW50KSB7XHJcbiAgICB0aGlzLnNlbGVjdGVkSXRlbVR5cGUgPSBldmVudC52YWx1ZTtcclxuICAgIHRoaXMuaXRlbVR5cGVDaGFuZ2UuZW1pdCh0aGlzLnNlbGVjdGVkSXRlbVR5cGUpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0IHRoZSBtZWFzdXJlIHVuaXRcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBvbk1lYXN1cmVVbml0Q2hhbmdlKHVuaXQ6IE1lYXN1cmVMZW5ndGhVbml0KSB7XHJcbiAgICB0aGlzLm1lYXN1cmVVbml0ID0gdW5pdDtcclxuICB9XHJcblxyXG4gIGlzUHJlZGVmaW5lZCgpIHtcclxuICAgIHJldHVybiB0aGlzLnR5cGUgPT09IFNwYXRpYWxGaWx0ZXJUeXBlLlByZWRlZmluZWQ7XHJcbiAgfVxyXG5cclxuICBpc1BvbHlnb24oKSB7XHJcbiAgICByZXR1cm4gdGhpcy50eXBlID09PSBTcGF0aWFsRmlsdGVyVHlwZS5Qb2x5Z29uO1xyXG4gIH1cclxuXHJcbiAgaXNQb2ludCgpIHtcclxuICAgIHJldHVybiB0aGlzLnR5cGUgPT09IFNwYXRpYWxGaWx0ZXJUeXBlLlBvaW50O1xyXG4gIH1cclxuXHJcbiAgaGFzQ2hpbGQoXzogbnVtYmVyLCBub2RlOiBTcGF0aWFsRmlsdGVyVGhlbWF0aWMpIHtcclxuICAgIGlmIChub2RlLmNoaWxkcmVuKSB7XHJcbiAgICAgIHJldHVybiBub2RlLmNoaWxkcmVuLmxlbmd0aDtcclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIG9uVG9nZ2xlQ2xpY2sobm9kZTogU3BhdGlhbEZpbHRlclRoZW1hdGljKSB7XHJcbiAgICB0aGlzLnRyZWVDb250cm9sLmlzRXhwYW5kZWQobm9kZSkgPyB0aGlzLnRyZWVDb250cm9sLmNvbGxhcHNlKG5vZGUpIDogdGhpcy50cmVlQ29udHJvbC5leHBhbmQobm9kZSk7XHJcbiAgfVxyXG5cclxuICBpc0FsbFNlbGVjdGVkKG5vZGU/OiBTcGF0aWFsRmlsdGVyVGhlbWF0aWMpIHtcclxuICAgIGxldCBudW1TZWxlY3RlZDtcclxuICAgIGxldCBudW1Ob2RlcyA9IDA7XHJcbiAgICBpZiAoIW5vZGUpIHtcclxuICAgICAgbnVtU2VsZWN0ZWQgPSB0aGlzLnNlbGVjdGVkVGhlbWF0aWNzLnNlbGVjdGVkLmxlbmd0aDtcclxuICAgICAgdGhpcy50aGVtYXRpY3MuZm9yRWFjaCh0aGVtYXRpYyA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMuZ3JvdXBzLmluZGV4T2YodGhlbWF0aWMubmFtZSkgPT09IC0xKSB7XHJcbiAgICAgICAgICBudW1Ob2RlcysrO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICAgIHRoaXMuY2hpbGRyZW5zLmZvckVhY2goY2hpbGRyZW4gPT4ge1xyXG4gICAgICAgIGlmICghdGhpcy50aGVtYXRpY3MuZmluZCh0aGVtYXRpYyA9PiB0aGVtYXRpYy5zb3VyY2UgPT09IGNoaWxkcmVuLnNvdXJjZSkpIHtcclxuICAgICAgICAgIG51bU5vZGVzKys7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIG51bVNlbGVjdGVkID0gbm9kZS5jaGlsZHJlbi5sZW5ndGg7XHJcbiAgICAgIG5vZGUuY2hpbGRyZW4uZm9yRWFjaChjaGlsZHJlbiA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRUaGVtYXRpY3Muc2VsZWN0ZWQuZmluZCh0aGVtYXRpYyA9PiB0aGVtYXRpYyA9PT0gY2hpbGRyZW4pKSB7XHJcbiAgICAgICAgICBudW1Ob2RlcysrO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG51bU5vZGVzID49IDEpIHtcclxuICAgICAgcmV0dXJuIG51bVNlbGVjdGVkID09PSBudW1Ob2RlcztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGhhc0NoaWxkcmVuU2VsZWN0ZWQobm9kZTogU3BhdGlhbEZpbHRlclRoZW1hdGljKSB7XHJcbiAgICBsZXQgYm9vbCA9IGZhbHNlO1xyXG4gICAgbm9kZS5jaGlsZHJlbi5mb3JFYWNoKGNoaWxkID0+IHtcclxuICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRUaGVtYXRpY3Muc2VsZWN0ZWQuZmluZCh0aGVtYXRpYyA9PiB0aGVtYXRpYy5zb3VyY2UgPT09IGNoaWxkLnNvdXJjZSkpIHtcclxuICAgICAgICBib29sID0gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gYm9vbDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFwcGx5IGhlYWRlciBjaGVja2JveFxyXG4gICAqL1xyXG4gIG1hc3RlclRvZ2dsZSgpIHtcclxuICAgIHRoaXMuaXNBbGxTZWxlY3RlZCgpID9cclxuICAgICAgdGhpcy5zZWxlY3RlZFRoZW1hdGljcy5jbGVhcigpIDpcclxuICAgICAgdGhpcy5zZWxlY3RBbGwoKTtcclxuXHJcbiAgICBjb25zdCBzZWxlY3RlZFRoZW1hdGljc05hbWU6IFNwYXRpYWxGaWx0ZXJUaGVtYXRpY1tdID0gW107XHJcbiAgICBmb3IgKGNvbnN0IHRoZW1hdGljIG9mIHRoaXMuc2VsZWN0ZWRUaGVtYXRpY3Muc2VsZWN0ZWQpIHtcclxuICAgICAgc2VsZWN0ZWRUaGVtYXRpY3NOYW1lLnB1c2godGhlbWF0aWMpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLmlzQWxsU2VsZWN0ZWQoKSkge1xyXG4gICAgICB0aGlzLnRoZW1hdGljcy5mb3JFYWNoKHRoZW1hdGljID0+IHtcclxuICAgICAgICBpZiAodGhpcy5oYXNDaGlsZCgwLCB0aGVtYXRpYykpIHtcclxuICAgICAgICAgIHRoaXMudHJlZUNvbnRyb2wuZXhwYW5kKHRoZW1hdGljKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy50aGVtYXRpY3MuZm9yRWFjaCh0aGVtYXRpYyA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMuaGFzQ2hpbGQoMCwgdGhlbWF0aWMpKSB7XHJcbiAgICAgICAgICB0aGlzLnRyZWVDb250cm9sLmNvbGxhcHNlKHRoZW1hdGljKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgdGhpcy50aGVtYXRpY0NoYW5nZS5lbWl0KHNlbGVjdGVkVGhlbWF0aWNzTmFtZSk7XHJcbiAgfVxyXG5cclxuICBzZWxlY3RBbGwobm9kZT86IFNwYXRpYWxGaWx0ZXJUaGVtYXRpYykge1xyXG4gICAgaWYgKCFub2RlKSB7XHJcbiAgICAgIHRoaXMudGhlbWF0aWNzLmZvckVhY2godGhlbWF0aWMgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLmdyb3Vwcy5pbmRleE9mKHRoZW1hdGljLm5hbWUpID09PSAtMSkge1xyXG4gICAgICAgICAgdGhpcy5zZWxlY3RlZFRoZW1hdGljcy5zZWxlY3QodGhlbWF0aWMpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICAgIHRoaXMuY2hpbGRyZW5zLmZvckVhY2goY2hpbGRyZW4gPT4ge1xyXG4gICAgICAgIGlmICghdGhpcy5zZWxlY3RlZFRoZW1hdGljcy5zZWxlY3RlZC5maW5kKHRoZW1hdGljID0+IHRoZW1hdGljLnNvdXJjZSA9PT0gY2hpbGRyZW4uc291cmNlKSkge1xyXG4gICAgICAgICAgdGhpcy5zZWxlY3RlZFRoZW1hdGljcy5zZWxlY3QoY2hpbGRyZW4pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAodGhpcy5oYXNDaGlsZCgwLCBub2RlKSkge1xyXG4gICAgICAgIG5vZGUuY2hpbGRyZW4uZm9yRWFjaChjaGlsZHJlbiA9PiB0aGlzLnNlbGVjdGVkVGhlbWF0aWNzLnNlbGVjdChjaGlsZHJlbikpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjaGlsZHJlbnNUb2dnbGUobm9kZTogU3BhdGlhbEZpbHRlclRoZW1hdGljKSB7XHJcbiAgICB0aGlzLmlzQWxsU2VsZWN0ZWQobm9kZSkgP1xyXG4gICAgbm9kZS5jaGlsZHJlbi5mb3JFYWNoKGNoaWxkID0+IHRoaXMuc2VsZWN0ZWRUaGVtYXRpY3MuZGVzZWxlY3QoY2hpbGQpKSA6XHJcbiAgICB0aGlzLnNlbGVjdEFsbChub2RlKTtcclxuXHJcbiAgICBjb25zdCBzZWxlY3RlZFRoZW1hdGljc05hbWU6IFNwYXRpYWxGaWx0ZXJUaGVtYXRpY1tdID0gW107XHJcbiAgICBmb3IgKGNvbnN0IHRoZW1hdGljIG9mIHRoaXMuc2VsZWN0ZWRUaGVtYXRpY3Muc2VsZWN0ZWQpIHtcclxuICAgICAgc2VsZWN0ZWRUaGVtYXRpY3NOYW1lLnB1c2godGhlbWF0aWMpO1xyXG4gICAgfVxyXG4gICAgdGhpcy50cmVlQ29udHJvbC5leHBhbmQobm9kZSk7XHJcbiAgICB0aGlzLnRoZW1hdGljQ2hhbmdlLmVtaXQoc2VsZWN0ZWRUaGVtYXRpY3NOYW1lKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFwcGx5IGNoYW5nZXMgdG8gdGhlIHRoZW1hdGljcyBzZWxlY3RlZCB0cmVlIGFuZCBlbWl0IGV2ZW50XHJcbiAgICovXHJcbiAgb25Ub2dnbGVDaGFuZ2Uobm9kZVNlbGVjdGVkOiBTcGF0aWFsRmlsdGVyVGhlbWF0aWMpIHtcclxuICAgIGxldCBzZWxlY3RlZCA9IGZhbHNlO1xyXG4gICAgaWYgKHRoaXMuc2VsZWN0ZWRUaGVtYXRpY3Muc2VsZWN0ZWQuZmluZCh0aGVtYXRpYyA9PiB0aGVtYXRpYy5zb3VyY2UgPT09IG5vZGVTZWxlY3RlZC5zb3VyY2UpICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgc2VsZWN0ZWQgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuY2hpbGRyZW5zLmZvckVhY2goY2hpbGRyZW4gPT4ge1xyXG4gICAgICBpZiAoY2hpbGRyZW4gPT09IG5vZGVTZWxlY3RlZCAmJiBzZWxlY3RlZCA9PT0gZmFsc2UpIHtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkVGhlbWF0aWNzLnNlbGVjdChjaGlsZHJlbik7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGNoaWxkcmVuID09PSBub2RlU2VsZWN0ZWQgJiYgc2VsZWN0ZWQgPT09IHRydWUpIHtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkVGhlbWF0aWNzLmRlc2VsZWN0KGNoaWxkcmVuKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICB0aGlzLnRoZW1hdGljcy5mb3JFYWNoKHRoZW1hdGljID0+IHtcclxuICAgICAgaWYgKHRoZW1hdGljID09PSBub2RlU2VsZWN0ZWQgJiYgc2VsZWN0ZWQgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZFRoZW1hdGljcy5zZWxlY3QodGhlbWF0aWMpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICh0aGVtYXRpYyA9PT0gbm9kZVNlbGVjdGVkICYmIHNlbGVjdGVkID09PSB0cnVlKSB7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZFRoZW1hdGljcy5kZXNlbGVjdCh0aGVtYXRpYyk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IHNlbGVjdGVkVGhlbWF0aWNzTmFtZTogU3BhdGlhbEZpbHRlclRoZW1hdGljW10gPSBbXTtcclxuICAgIGZvciAoY29uc3QgdGhlbWF0aWMgb2YgdGhpcy5zZWxlY3RlZFRoZW1hdGljcy5zZWxlY3RlZCkge1xyXG4gICAgICBzZWxlY3RlZFRoZW1hdGljc05hbWUucHVzaCh0aGVtYXRpYyk7XHJcbiAgICB9XHJcbiAgICB0aGlzLnRoZW1hdGljQ2hhbmdlLmVtaXQoc2VsZWN0ZWRUaGVtYXRpY3NOYW1lKTtcclxuICB9XHJcblxyXG4gIG9uRHJhd0NvbnRyb2xDaGFuZ2UoKSB7XHJcbiAgICB0aGlzLmRyYXdDb250cm9sSXNBY3RpdmUgPSAhdGhpcy5kcmF3Q29udHJvbElzQWN0aXZlO1xyXG4gIH1cclxuXHJcbiAgb25mcmVlaGFuZENvbnRyb2xDaGFuZ2UoKSB7XHJcbiAgICB0aGlzLmZyZWVoYW5kRHJhd0lzQWN0aXZlID0gIXRoaXMuZnJlZWhhbmREcmF3SXNBY3RpdmU7XHJcbiAgICB0aGlzLmZyZWVoYW5kQ29udHJvbC5lbWl0KHRoaXMuZnJlZWhhbmREcmF3SXNBY3RpdmUpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogTGF1bmNoIHNlYXJjaCBidXR0b25cclxuICAgKi9cclxuICB0b2dnbGVTZWFyY2hCdXR0b24oKSB7XHJcbiAgICBpZiAodGhpcy5pc1BvbHlnb24oKSB8fCB0aGlzLmlzUG9pbnQoKSkge1xyXG4gICAgICB0aGlzLmRyYXdab25lID0gdGhpcy5mb3JtQ29udHJvbC52YWx1ZSBhcyBGZWF0dXJlO1xyXG4gICAgICB0aGlzLmRyYXdab25lLm1ldGEgPSB7XHJcbiAgICAgICAgaWQ6IHVuZGVmaW5lZCxcclxuICAgICAgICB0aXRsZTogJ1pvbmUnXHJcbiAgICAgIH07XHJcbiAgICAgIHRoaXMuZHJhd1pvbmUucHJvcGVydGllcyA9IHtcclxuICAgICAgICBub206ICdab25lJ1xyXG4gICAgICB9O1xyXG4gICAgICB0aGlzLmRyYXdab25lRXZlbnQuZW1pdCh0aGlzLmRyYXdab25lKTtcclxuICAgIH1cclxuICAgIHRoaXMucmFkaXVzRXZlbnQuZW1pdCh0aGlzLnJhZGl1cyk7XHJcbiAgICB0aGlzLnRvZ2dsZVNlYXJjaC5lbWl0KCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBMYXVuY2ggY2xlYXIgYnV0dG9uIChjbGVhciBzdG9yZSBhbmQgbWFwIGxheWVycylcclxuICAgKi9cclxuICBjbGVhckJ1dHRvbigpIHtcclxuICAgIHRoaXMubG9hZGluZyA9IHRydWU7XHJcbiAgICB0aGlzLm1hcC5yZW1vdmVMYXllcnModGhpcy5sYXllcnMpO1xyXG4gICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XHJcbiAgICBpZiAodGhpcy5zdG9yZSkge1xyXG4gICAgICB0aGlzLnN0b3JlLmNsZWFyKCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmNsZWFyQnV0dG9uRXZlbnQuZW1pdChbXSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBMYXVuY2ggY2xlYXIgc2VhcmNoIChjbGVhciBmaWVsZCBpZiB0eXBlIGlzIHByZWRlZmluZWQpXHJcbiAgICovXHJcbiAgY2xlYXJTZWFyY2goKSB7XHJcbiAgICB0aGlzLnNlbGVjdGVkVGhlbWF0aWNzLmNsZWFyKCk7XHJcbiAgICB0aGlzLnRoZW1hdGljQ2hhbmdlLmVtaXQoW10pO1xyXG4gICAgdGhpcy5jbGVhclNlYXJjaEV2ZW50LmVtaXQoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFZlcmlmeSBjb25kaXRpb25zIG9mIGluY29tcGxldGUgZmllbGRzIG9yIGJ1c3kgc2VydmljZVxyXG4gICAqL1xyXG4gIGRpc2FibGVTZWFyY2hCdXR0b24oKTogYm9vbGVhbiB7XHJcbiAgICBpZiAodGhpcy50eXBlID09PSBTcGF0aWFsRmlsdGVyVHlwZS5QcmVkZWZpbmVkKSB7XHJcbiAgICAgIGlmICh0aGlzLnNlbGVjdGVkSXRlbVR5cGUgPT09IFNwYXRpYWxGaWx0ZXJJdGVtVHlwZS5BZGRyZXNzKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucXVlcnlUeXBlICE9PSB1bmRlZmluZWQgJiYgdGhpcy56b25lICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgIHJldHVybiB0aGlzLmxvYWRpbmc7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGlmICh0aGlzLnNlbGVjdGVkSXRlbVR5cGUgPT09IFNwYXRpYWxGaWx0ZXJJdGVtVHlwZS5UaGVtYXRpY3MpIHtcclxuICAgICAgICBpZiAodGhpcy5xdWVyeVR5cGUgIT09IHVuZGVmaW5lZCAmJiB0aGlzLnpvbmUgIT09IHVuZGVmaW5lZCAmJiB0aGlzLnNlbGVjdGVkVGhlbWF0aWNzLnNlbGVjdGVkLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgIHJldHVybiB0aGlzLmxvYWRpbmc7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy50eXBlID09PSBTcGF0aWFsRmlsdGVyVHlwZS5Qb2x5Z29uIHx8IHRoaXMudHlwZSA9PT0gU3BhdGlhbEZpbHRlclR5cGUuUG9pbnQpIHtcclxuICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRJdGVtVHlwZSA9PT0gU3BhdGlhbEZpbHRlckl0ZW1UeXBlLkFkZHJlc3MgJiYgdGhpcy5mb3JtQ29udHJvbC52YWx1ZSAhPT0gbnVsbCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmxvYWRpbmc7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRJdGVtVHlwZSA9PT0gU3BhdGlhbEZpbHRlckl0ZW1UeXBlLlRoZW1hdGljcykge1xyXG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGVkVGhlbWF0aWNzLnNlbGVjdGVkLmxlbmd0aCA+IDAgJiYgdGhpcy5mb3JtQ29udHJvbC52YWx1ZSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgcmV0dXJuIHRoaXMubG9hZGluZztcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogTWFuYWdlIHJhZGl1cyB2YWx1ZSBhdCB1c2VyIGNoYW5nZVxyXG4gICAqL1xyXG4gIGdldFJhZGl1cygpIHtcclxuICAgIGxldCBmb3JtVmFsdWU7XHJcbiAgICB0aGlzLmZvcm1Db250cm9sLnZhbHVlICE9PSBudWxsID8gZm9ybVZhbHVlID0gdGhpcy5mb3JtQ29udHJvbC52YWx1ZS5yYWRpdXMgOiBmb3JtVmFsdWUgPSB1bmRlZmluZWQ7XHJcbiAgICBpZiAodGhpcy50eXBlID09PSBTcGF0aWFsRmlsdGVyVHlwZS5Qb2ludCkge1xyXG4gICAgICBpZiAoIXRoaXMuZnJlZWhhbmREcmF3SXNBY3RpdmUpIHtcclxuICAgICAgICBpZiAodGhpcy5yYWRpdXNGb3JtQ29udHJvbC52YWx1ZSA+PSAxMDAwMCB8fCB0aGlzLnJhZGl1c0Zvcm1Db250cm9sLnZhbHVlIDwgMCkge1xyXG4gICAgICAgICAgdGhpcy5tZXNzYWdlU2VydmljZS5hbGVydCh0aGlzLmxhbmd1YWdlU2VydmljZS50cmFuc2xhdGUuaW5zdGFudCgnaWdvLmdlby5zcGF0aWFsRmlsdGVyLnJhZGl1c0FsZXJ0JyksXHJcbiAgICAgICAgICAgIHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLnRyYW5zbGF0ZS5pbnN0YW50KCdpZ28uZ2VvLnNwYXRpYWxGaWx0ZXIud2FybmluZycpKTtcclxuICAgICAgICAgIHRoaXMucmFkaXVzID0gMTAwMDtcclxuICAgICAgICAgIHRoaXMucmFkaXVzRm9ybUNvbnRyb2wuc2V0VmFsdWUodGhpcy5yYWRpdXMpO1xyXG4gICAgICAgICAgdGhpcy5kcmF3R3VpZGUkLm5leHQodGhpcy5yYWRpdXMpO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAodGhpcy5yYWRpdXNGb3JtQ29udHJvbC52YWx1ZSA+PSAxMDAwMCB8fCB0aGlzLnJhZGl1c0Zvcm1Db250cm9sLnZhbHVlIDwgMCkge1xyXG4gICAgICAgICAgdGhpcy5tZXNzYWdlU2VydmljZS5hbGVydCh0aGlzLmxhbmd1YWdlU2VydmljZS50cmFuc2xhdGUuaW5zdGFudCgnaWdvLmdlby5zcGF0aWFsRmlsdGVyLnJhZGl1c0FsZXJ0JyksXHJcbiAgICAgICAgICAgIHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLnRyYW5zbGF0ZS5pbnN0YW50KCdpZ28uZ2VvLnNwYXRpYWxGaWx0ZXIud2FybmluZycpKTtcclxuICAgICAgICAgIHRoaXMucmFkaXVzID0gMTAwMDtcclxuICAgICAgICAgIHRoaXMucmFkaXVzRm9ybUNvbnRyb2wuc2V0VmFsdWUodGhpcy5yYWRpdXMpO1xyXG4gICAgICAgICAgdGhpcy5kcmF3R3VpZGUkLm5leHQodGhpcy5yYWRpdXMpO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZm9ybVZhbHVlID49IDEwMDAwKSB7XHJcbiAgICAgICAgICB0aGlzLm1lc3NhZ2VTZXJ2aWNlLmFsZXJ0KHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLnRyYW5zbGF0ZS5pbnN0YW50KCdpZ28uZ2VvLnNwYXRpYWxGaWx0ZXIucmFkaXVzQWxlcnQnKSxcclxuICAgICAgICAgICAgdGhpcy5sYW5ndWFnZVNlcnZpY2UudHJhbnNsYXRlLmluc3RhbnQoJ2lnby5nZW8uc3BhdGlhbEZpbHRlci53YXJuaW5nJykpO1xyXG4gICAgICAgICAgdGhpcy5mb3JtQ29udHJvbC5yZXNldCgpO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZm9ybVZhbHVlKSB7XHJcbiAgICAgICAgICBpZiAoZm9ybVZhbHVlICE9PSB0aGlzLnJhZGl1c0Zvcm1Db250cm9sLnZhbHVlKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmFkaXVzRm9ybUNvbnRyb2wuc2V0VmFsdWUoZm9ybVZhbHVlKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHRoaXMuZm9ybUNvbnRyb2wudmFsdWUucmFkaXVzID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICB0aGlzLnJhZGl1cyA9IHRoaXMucmFkaXVzRm9ybUNvbnRyb2wudmFsdWU7XHJcbiAgICAgIHRoaXMuZHJhd0d1aWRlJC5uZXh0KHRoaXMucmFkaXVzKTtcclxuICAgICAgdGhpcy5vdmVybGF5U3R5bGUkLm5leHQodGhpcy5Qb2ludFN0eWxlKTtcclxuICAgICAgdGhpcy5kcmF3U3R5bGUkLm5leHQodGhpcy5Qb2ludFN0eWxlKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19
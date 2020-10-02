import { ChangeDetectorRef, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { SpatialFilterQueryType, SpatialFilterType } from '../../shared/spatial-filter.enum';
import { SelectionModel } from '@angular/cdk/collections';
import { IgoMap } from '../../../map';
import { SpatialFilterItemType } from './../../shared/spatial-filter.enum';
import { Feature } from './../../../feature/shared/feature.interfaces';
import { FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import OlGeometryType from 'ol/geom/GeometryType';
import { GeoJSONGeometry } from '../../../geometry/shared/geometry.interfaces';
import { Style as OlStyle } from 'ol/style';
import { MatTreeNestedDataSource } from '@angular/material';
import { SpatialFilterService } from '../../shared/spatial-filter.service';
import { MeasureLengthUnit } from '../../../measure';
import { EntityStore } from '@igo2/common';
import { Layer } from '../../../layer/shared';
import { NestedTreeControl } from '@angular/cdk/tree';
import { SpatialFilterThematic } from './../../shared/spatial-filter.interface';
import { MessageService, LanguageService } from '@igo2/core';
/**
 * Spatial-Filter-Item (search parameters)
 */
export declare class SpatialFilterItemComponent implements OnDestroy, OnInit {
    private cdRef;
    private spatialFilterService;
    private messageService;
    private languageService;
    map: IgoMap;
    type: SpatialFilterType;
    private _type;
    queryType: SpatialFilterQueryType;
    zone: Feature;
    loading: any;
    store: EntityStore<Feature>;
    private _store;
    /**
     * Available measure units for the measure type given
     * @internal
     */
    readonly measureUnits: string[];
    layers: Layer[];
    toggleSearch: EventEmitter<{}>;
    itemTypeChange: EventEmitter<SpatialFilterItemType>;
    thematicChange: EventEmitter<SpatialFilterThematic[]>;
    drawZoneEvent: EventEmitter<Feature<{
        [key: string]: any;
    }>>;
    radiusEvent: EventEmitter<number>;
    freehandControl: EventEmitter<boolean>;
    clearButtonEvent: EventEmitter<Layer[]>;
    clearSearchEvent: EventEmitter<{}>;
    export: EventEmitter<{}>;
    itemType: SpatialFilterItemType[];
    selectedItemType: SpatialFilterItemType;
    selectedSourceAddress: any;
    treeControl: NestedTreeControl<SpatialFilterThematic>;
    displayedColumns: string[];
    childrens: SpatialFilterThematic[];
    groups: string[];
    thematics: SpatialFilterThematic[];
    dataSource: MatTreeNestedDataSource<SpatialFilterThematic>;
    selectedThematics: SelectionModel<SpatialFilterThematic>;
    displayedColumnsResults: string[];
    value$: BehaviorSubject<GeoJSONGeometry>;
    drawGuide$: BehaviorSubject<number>;
    overlayStyle$: BehaviorSubject<OlStyle>;
    drawStyle$: BehaviorSubject<OlStyle>;
    private value$$;
    private radiusChanges$$;
    formControl: FormControl;
    geometryType: OlGeometryType;
    geometryTypeField: boolean;
    geometryTypes: string[];
    drawGuideField: boolean;
    drawGuide: number;
    drawGuidePlaceholder: string;
    measure: boolean;
    drawControlIsActive: boolean;
    freehandDrawIsActive: boolean;
    drawStyle: OlStyle;
    drawZone: Feature;
    overlayStyle: OlStyle;
    PointStyle: OlStyle;
    PolyStyle: OlStyle;
    radius: number;
    radiusFormControl: FormControl;
    measureUnit: MeasureLengthUnit;
    constructor(cdRef: ChangeDetectorRef, spatialFilterService: SpatialFilterService, messageService: MessageService, languageService: LanguageService);
    ngOnInit(): void;
    /**
     * Unsubscribe to the value stream
     * @internal
     */
    ngOnDestroy(): void;
    onItemTypeChange(event: any): void;
    /**
     * Set the measure unit
     * @internal
     */
    onMeasureUnitChange(unit: MeasureLengthUnit): void;
    isPredefined(): boolean;
    isPolygon(): boolean;
    isPoint(): boolean;
    hasChild(_: number, node: SpatialFilterThematic): number | false;
    onToggleClick(node: SpatialFilterThematic): void;
    isAllSelected(node?: SpatialFilterThematic): boolean;
    hasChildrenSelected(node: SpatialFilterThematic): boolean;
    /**
     * Apply header checkbox
     */
    masterToggle(): void;
    selectAll(node?: SpatialFilterThematic): void;
    childrensToggle(node: SpatialFilterThematic): void;
    /**
     * Apply changes to the thematics selected tree and emit event
     */
    onToggleChange(nodeSelected: SpatialFilterThematic): void;
    onDrawControlChange(): void;
    onfreehandControlChange(): void;
    /**
     * Launch search button
     */
    toggleSearchButton(): void;
    /**
     * Launch clear button (clear store and map layers)
     */
    clearButton(): void;
    /**
     * Launch clear search (clear field if type is predefined)
     */
    clearSearch(): void;
    /**
     * Verify conditions of incomplete fields or busy service
     */
    disableSearchButton(): boolean;
    /**
     * Manage radius value at user change
     */
    getRadius(): void;
}

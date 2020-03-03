import { OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import OlProjection from 'ol/proj/Projection';
import { LanguageService } from '@igo2/core';
import { EntityTableTemplate, EntityTableComponent } from '@igo2/common';
import { FeatureStore } from '../../feature';
import { IgoMap } from '../../map';
import { Measure, FeatureWithMeasure } from '../shared/measure.interfaces';
import { MeasureType, MeasureAreaUnit, MeasureLengthUnit } from '../shared/measure.enum';
/**
 * Tool to measure lengths and areas
 */
export declare class MeasurerComponent implements OnInit, OnDestroy {
    private languageService;
    private dialog;
    /**
     * Table template
     * @internal
     */
    tableTemplate: EntityTableTemplate;
    /**
     * Reference to the MeasureType enum
     * @internal
     */
    measureType: typeof MeasureType;
    /**
     * Reference to the AreaMeasureUnit enum
     * @internal
     */
    measureAreaUnit: typeof MeasureAreaUnit;
    /**
     * Reference to the LengthMeasureUnit enum
     * @internal
     */
    measureLengthUnit: typeof MeasureLengthUnit;
    /**
     * Whether measure units should be automatically determined
     * @internal
     */
    measureUnitsAuto: boolean;
    /**
     * Observable of area
     * @internal
     */
    measure$: BehaviorSubject<Measure>;
    /**
     * Observable of selected features
     * @internal
     */
    selectedFeatures$: BehaviorSubject<FeatureWithMeasure[]>;
    /**
     * OL draw source
     * @internal
     */
    showTooltips: boolean;
    /**
     * Draw line control
     */
    private drawLineControl;
    /**
     * Draw polygon control
     */
    private drawPolygonControl;
    /**
     * Modify control
     */
    private modifyControl;
    /**
     * Active OL geometry
     */
    private activeOlGeometry;
    /**
     * Active mlength unit
     */
    private activeLengthUnit;
    /**
     * Active area unit
     */
    private activeAreaUnit;
    /**
     * Feature added listener key
     */
    private onFeatureAddedKey;
    /**
     * Feature removed listener key
     */
    private onFeatureRemovedKey;
    /**
     * Active draw control
     * @internal
     */
    private activeDrawControl;
    /**
     * Subscription to draw start
     */
    private drawStart$$;
    /**
     * Subscription to draw end
     */
    private drawEnd$$;
    /**
     * Subscription to controls changes
     */
    private drawChanges$$;
    /**
     * Subscription to modify start
     */
    private modifyStart$$;
    /**
     * Subscription to modify end
     */
    private modifyEnd$$;
    /**
     * Subscription to controls changes
     */
    private modifyChanges$$;
    /**
     * Subscription to measures selection
     */
    private selectedFeatures$$;
    /**
     * OL draw source
     */
    private olDrawSource;
    /**
     * The map to measure on
     */
    map: IgoMap;
    /**
     * The measures store
     */
    store: FeatureStore<FeatureWithMeasure>;
    /**
     * Measure type
     * @internal
     */
    activeMeasureType: MeasureType;
    private _activeMeasureType;
    /**
     * The minimum length a segment must have to display a tooltip.
     * It also applies to area tooltips.
     */
    minSegmentLength: number;
    table: EntityTableComponent;
    /**
     * Wheter one of the draw control is active
     * @internal
     */
    readonly drawControlIsActive: boolean;
    readonly projection: OlProjection;
    constructor(languageService: LanguageService, dialog: MatDialog);
    /**
     * Add draw controls and activate one
     * @internal
     */
    ngOnInit(): void;
    /**
     * Clear the overlay layer and any interaction added by this component.
     * @internal
     */
    ngOnDestroy(): void;
    /**
     * Set the measure type
     * @internal
     */
    onMeasureTypeChange(measureType: MeasureType): void;
    /**
     * Activate or deactivate the current draw control
     * @internal
     */
    onToggleDrawControl(toggle: boolean): void;
    /**
     * Activate or deactivate the current draw control
     * @internal
     */
    onToggleTooltips(toggle: boolean): void;
    /**
     * Activate or deactivate the current draw control
     * @internal
     */
    onToggleMeasureUnitsAuto(toggle: boolean): void;
    /**
     * Set the measure type
     * @internal
     */
    onLengthUnitChange(unit: MeasureLengthUnit): void;
    /**
     * Set the measure type
     * @internal
     */
    onAreaUnitChange(unit: MeasureAreaUnit): void;
    onCalculateClick(): void;
    onDeleteClick(): void;
    onModifyClick(): void;
    private openDialog;
    /**
     * Initialize the measure store and set up some listeners
     * @internal
     */
    private initStore;
    /**
     * Freeze any store, meaning the layer is removed, strategies are deactivated
     * and some listener removed
     * @internal
     */
    private freezeStore;
    /**
     * Create a draw line control
     */
    private createDrawLineControl;
    /**
     * Create a draw polygon control
     */
    private createDrawPolygonControl;
    /**
     * Create a draw polygon control
     */
    private createModifyControl;
    /**
     * Activate the right control
     */
    private toggleDrawControl;
    /**
     * Activate a given control
     * @param drawControl Draw control
     */
    private activateDrawControl;
    /**
     * Deactivate the active draw control
     */
    private deactivateDrawControl;
    private setActiveMeasureType;
    /**
     * Clear the draw source and track the geometry being drawn
     * @param olGeometry Ol linestring or polygon
     */
    private onDrawStart;
    /**
     * Clear the draw source and track the geometry being draw
     * @param olGeometry Ol linestring or polygon
     */
    private onDrawEnd;
    /**
     * Update measures observables and map tooltips
     * @param olGeometry Ol linestring or polygon
     */
    private onDrawChanges;
    /**
     * Activate a given control
     * @param modifyControl Modify control
     */
    private activateModifyControl;
    /**
     * Deactivate the active modify control
     */
    private deactivateModifyControl;
    /**
     * Clear the draw source and track the geometry being drawn
     * @param olGeometry Ol linestring or polygon
     */
    private onModifyStart;
    /**
     * Update measures observables and map tooltips
     * @param olGeometry Ol linestring or polygon
     */
    private onModifyChanges;
    /**
     * Clear the draw source and track the geometry being draw
     * @param olGeometry Ol linestring or polygon
     */
    private onModifyEnd;
    private finalizeMeasureOfOlGeometry;
    /**
     * Update measures observables
     * @param olGeometry Ol linestring or polygon
     * @param measure Measure
     */
    private updateMeasureOfOlGeometry;
    /**
     * Clear the measures observables
     */
    private clearMeasures;
    /**
     * Add a feature with measures to the store. The loading stragegy of the store
     * will trigger and add the feature to the map.
     * @internal
     */
    private addFeatureToStore;
    /**
     * Update all the tooltips of an OL geometry
     * @param olGeometry OL Geometry
     * @param lengths Lengths of the OL geometry's segments
     * @param measureUnit Display tooltip measure in those units
     */
    private updateTooltipsOfOlGeometry;
    /**
     * Show the map tooltips of a geoemtry
     */
    private showTooltipsOfOlGeometry;
    /**
     * Clear the tooltips of an OL geometrys
     * @param olGeometry OL geometry with tooltips
     */
    private clearTooltipsOfOlGeometry;
    /**
     * Show the map tooltips of all the geometries of a source
     */
    private updateTooltipsOfOlSource;
    /**
     * Show the map tooltips of all the geometries of a source
     */
    private showTooltipsOfOlSource;
    /**
     * Clear the map tooltips
     * @param olDrawSource OL vector source
     */
    private clearTooltipsOfOlSource;
    /**
     * Update an OL tooltip properties and inner HTML and add it to the map if possible
     * @param olTooltip OL tooltip
     * @param measure The measure valeu ti display
     * @param measureUnit Display tooltip measure in those units
     */
    private updateOlTooltip;
    /**
     * Compute a tooltip's content
     * @param olTooltip OL overlay
     * @returns Inner HTML
     */
    private computeTooltipInnerHTML;
    /**
     * Whether a tooltip should be showned based on the length
     * of the segment it is bound to.
     * @param olTooltip OL overlay
     * @returns True if the tooltip should be shown
     */
    private shouldShowTooltip;
}

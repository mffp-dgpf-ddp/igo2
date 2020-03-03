import { EventEmitter, OnDestroy, AfterViewInit } from '@angular/core';
import OlLayer from 'ol/layer/Layer';
import { IgoMap } from '../../map/shared/map';
import { MapBrowserComponent } from '../../map/map-browser/map-browser.component';
import { Feature } from '../../feature/shared/feature.interfaces';
import { QueryService } from './query.service';
/**
 * This directive makes a map queryable with a click of with a drag box.
 * By default, all layers are queryable but this can ben controlled at
 * the layer level.
 */
export declare class QueryDirective implements AfterViewInit, OnDestroy {
    private component;
    private queryService;
    /**
     * Subscriptions to ongoing queries
     */
    private queries$$;
    /**
     * Listener to the map click event
     */
    private mapClickListener;
    /**
     * OL drag box interaction
     */
    private olDragBoxInteraction;
    /**
     * Ol drag box "end" event key
     */
    private olDragBoxInteractionEndKey;
    /**
     * Whter to query features or not
     */
    queryFeatures: boolean;
    /**
     * Feature query hit tolerance
     */
    queryFeaturesHitTolerance: number;
    /**
     * Feature query hit tolerance
     */
    queryFeaturesCondition: (olLayer: OlLayer) => boolean;
    /**
     * Whether all query should complete before emitting an event
     */
    waitForAllQueries: boolean;
    /**
     * Event emitted when a query (or all queries) complete
     */
    query: EventEmitter<{
        features: Feature<{
            [key: string]: any;
        }>[] | Feature<{
            [key: string]: any;
        }>[][];
        event: any;
    }>;
    /**
     * IGO map
     * @internal
     */
    readonly map: IgoMap;
    constructor(component: MapBrowserComponent, queryService: QueryService);
    /**
     * Start listening to click and drag box events
     * @internal
     */
    ngAfterViewInit(): void;
    /**
     * Stop listening to click and drag box events and cancel ongoind requests
     * @internal
     */
    ngOnDestroy(): void;
    /**
     * On map click, issue queries
     */
    private listenToMapClick;
    /**
     * Stop listening for map clicks
     */
    private unlistenToMapClick;
    /**
     * Issue queries from a map event and emit events with the results
     * @param event OL map browser pointer event
     */
    private onMapEvent;
    /**
     * Query features already present on the map
     * @param event OL map browser pointer event
     */
    private doQueryFeatures;
    /**
     * Cancel ongoing requests, if any
     */
    private cancelOngoingQueries;
}

import { OnDestroy, OnInit, AfterContentChecked } from '@angular/core';
import { IgoMap } from '../../map/shared/map';
import { MapBrowserComponent } from '../../map/map-browser/map-browser.component';
import { Feature } from '../../feature/shared/feature.interfaces';
import { SearchService } from './search.service';
import olFeature from 'ol/Feature';
import * as olstyle from 'ol/style';
import { FeatureStore } from '../../feature/shared/store';
import { SearchSourceService } from './search-source.service';
import { MediaService } from '@igo2/core';
/**
 * This directive makes the mouse coordinate trigger a reverse search on available search sources.
 * The search results are placed into a label, on a cross icon, representing the mouse coordinate.
 * By default, no search sources. Config in config file must be defined.
 * the layer level.
 */
export declare class SearchPointerSummaryDirective implements OnInit, OnDestroy, AfterContentChecked {
    private component;
    private searchService;
    private searchSourceService;
    private mediaService;
    store: FeatureStore<Feature>;
    private lonLat;
    private pointerSearchStore;
    private lastTimeoutRequest;
    private store$$;
    private layers$$;
    private reverseSearch$$;
    private hasPointerReverseSearchSource;
    /**
     * Listener to the pointer move event
     */
    private pointerMoveListener;
    private searchPointerSummaryFeatureId;
    /**
     * The delay where the mouse must be motionless before trigger the reverse search
     */
    igoSearchPointerSummaryDelay: number;
    /**
     * If the user has enabled or not the directive
     */
    igoSearchPointerSummaryEnabled: boolean;
    mouseout(): void;
    /**
     * IGO map
     * @internal
     */
    readonly map: IgoMap;
    readonly mapProjection: string;
    constructor(component: MapBrowserComponent, searchService: SearchService, searchSourceService: SearchSourceService, mediaService: MediaService);
    /**
     * Start listening to pointermove and reverse search results.
     * @internal
     */
    ngOnInit(): void;
    /**
     * Initialize the pointer position store
     * @internal
     */
    private initStore;
    ngAfterContentChecked(): void;
    /**
     * Stop listening to pointermove and reverse search results.
     * @internal
     */
    ngOnDestroy(): void;
    /**
     * Subscribe to pointermove result store
     * @internal
     */
    subscribeToPointerStore(): void;
    /**
     * Build an object based on the closest feature by type (base on type and distance properties )
     * @param results SearchResult[]
     * @returns OL style function
     */
    private computeSummaryClosestFeature;
    /**
     * convert store entities to a pointer position overlay with label summary on.
     * @param event OL map browser pointer event
     */
    private entitiesToPointerOverlay;
    /**
     * On map pointermove
     */
    private listenToMapPointerMove;
    /**
     * Unsubscribe to pointer store.
     * @internal
     */
    unsubscribeToPointerStore(): void;
    /**
     * Unsubscribe to reverse seatch store.
     * @internal
     */
    unsubscribeReverseSearch(): void;
    /**
     * Stop listening for map pointermove
     * @internal
     */
    private unlistenToMapPointerMove;
    /**
     * Trigger reverse search when the mouse is motionless during the defined delay (pointerMoveDelay).
     * @param event OL map browser pointer event
     */
    private onMapEvent;
    private onSearchCoordinate;
    private onSearch;
    /**
     * Add a feature to the pointer store
     * @param text string
     */
    private addPointerOverlay;
    /**
     * Clear the pointer store features
     */
    private clearLayer;
}
/**
 * Create a default style for the pointer position and it's label summary.
 * @param feature OlFeature
 * @returns OL style function
 */
export declare function pointerPositionSummaryMarker(feature: olFeature, resolution: number): olstyle.Style;

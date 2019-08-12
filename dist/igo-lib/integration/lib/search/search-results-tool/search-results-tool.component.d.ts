import { Observable } from 'rxjs';
import { EntityStore, FlexibleState } from '@igo2/common';
import { LayerService, Feature, SearchResult, IgoMap } from '@igo2/geo';
import { MapState } from '../../map/map.state';
import { SearchState } from '../search.state';
/**
 * Tool to browse the search results
 */
export declare class SearchResultsToolComponent {
    private mapState;
    private layerService;
    private searchState;
    /**
     * Store holding the search results
     * @internal
     */
    readonly store: EntityStore<SearchResult>;
    /**
     * Map to display the results on
     * @internal
     */
    readonly map: IgoMap;
    readonly featureTitle: string;
    readonly feature$: Observable<Feature>;
    feature: Feature;
    topPanelState: FlexibleState;
    private format;
    constructor(mapState: MapState, layerService: LayerService, searchState: SearchState);
    /**
     * Try to add a feature to the map when it's being focused
     * @internal
     * @param result A search result that could be a feature
     */
    onResultFocus(result: SearchResult): void;
    /**
     * Try to add a feature or a layer to the map when it's being selected
     * @internal
     * @param result A search result that could be a feature or some layer options
     */
    onResultSelect(result: SearchResult): void;
    toggleTopPanel(): void;
    zoomToFeatureExtent(): void;
    /**
     * Try to add a feature to the map overlay
     * @param result A search result that could be a feature
     */
    private tryAddFeatureToMap;
    /**
     * Try to add a layer to the map
     * @param result A search result that could be some layer options
     */
    private tryAddLayerToMap;
}

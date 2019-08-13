import { LayerListControlsOptions } from '../shared/map-details-tool.interface';
export declare class MapDetailsToolComponent {
    toggleLegendOnVisibilityChange: boolean;
    expandLegendOfVisibleLayers: boolean;
    updateLegendOnResolutionChange: boolean;
    ogcFiltersInLayers: boolean;
    layerListControls: LayerListControlsOptions;
    queryBadge: boolean;
    readonly excludeBaseLayers: boolean;
    readonly layerFilterAndSortOptions: any;
}

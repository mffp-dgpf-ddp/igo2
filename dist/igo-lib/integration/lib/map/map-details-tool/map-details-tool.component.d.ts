import { LayerListControlsOptions } from '../shared/map-details-tool.interface';
export declare class MapDetailsToolComponent {
    toggleLegendOnVisibilityChange: boolean;
    expandLegendOfVisibleLayers: boolean;
    updateLegendOnResolutionChange: boolean;
    ogcFiltersInLayers: boolean;
    layerListControls: LayerListControlsOptions;
    readonly excludeBaseLayers: boolean;
    readonly layerFilterAndSortOptions: any;
}

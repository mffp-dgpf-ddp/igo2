import { LayerListControlsOptions } from '../shared/map-details-tool.interface';
/**
 * Tool to browse a map's layers or to choose a different map
 */
export declare class MapToolComponent {
    toggleLegendOnVisibilityChange: boolean;
    expandLegendOfVisibleLayers: boolean;
    updateLegendOnResolutionChange: boolean;
    ogcFiltersInLayers: boolean;
    layerListControls: LayerListControlsOptions;
    readonly excludeBaseLayers: boolean;
    readonly layerFilterAndSortOptions: any;
}

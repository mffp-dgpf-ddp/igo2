import { OnInit } from '@angular/core';
import { SearchResult } from '../shared/search.interfaces';
import { IgoMap } from '../../map/shared/map';
import { LayerService } from '../../layer/shared/layer.service';
export declare class SearchResultAddButtonComponent implements OnInit {
    private layerService;
    layer: SearchResult;
    /**
     * Whether the layer is already added to the map
     */
    added: boolean;
    /**
     * The map to add the search result layer to
     */
    map: IgoMap;
    color: string;
    private _color;
    constructor(layerService: LayerService);
    /**
     * @internal
     */
    ngOnInit(): void;
    /**
     * On toggle button click, emit the added change event
     * @internal
     */
    onToggleClick(): void;
    private add;
    private remove;
    /**
     * Emit added change event with added = true
     */
    private addLayerToMap;
    /**
     * Emit added change event with added = false
     */
    private removeLayerFromMap;
}

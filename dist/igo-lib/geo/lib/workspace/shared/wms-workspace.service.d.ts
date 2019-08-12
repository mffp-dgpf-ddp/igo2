import { ImageLayer } from '../../layer';
import { IgoMap } from '../../map';
import { WmsWorkspace } from './wms-workspace';
export declare class WmsWorkspaceService {
    constructor();
    createWorkspace(layer: ImageLayer, map: IgoMap): WmsWorkspace;
}

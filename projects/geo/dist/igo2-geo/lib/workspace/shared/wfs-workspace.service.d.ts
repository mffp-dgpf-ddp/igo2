import { VectorLayer } from '../../layer';
import { IgoMap } from '../../map';
import { WfsWorkspace } from './wfs-workspace';
export declare class WfsWorkspaceService {
    constructor();
    createWorkspace(layer: VectorLayer, map: IgoMap): WfsWorkspace;
    private createFeatureStore;
    private createTableTemplate;
}

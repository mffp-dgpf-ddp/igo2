import { Workspace, WorkspaceOptions } from '@igo2/common';
import { ImageLayer } from '../../layer';
import { IgoMap } from '../../map';
export interface WmsWorkspaceOptions extends WorkspaceOptions {
    layer: ImageLayer;
    map: IgoMap;
}
export declare class WmsWorkspace extends Workspace {
    protected options: WmsWorkspaceOptions;
    readonly layer: ImageLayer;
    readonly map: IgoMap;
    constructor(options: WmsWorkspaceOptions);
}

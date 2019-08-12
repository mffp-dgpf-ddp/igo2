import { Workspace, WorkspaceOptions } from '@igo2/common';
import { VectorLayer } from '../../layer';
import { IgoMap } from '../../map';
export interface WfsWorkspaceOptions extends WorkspaceOptions {
    layer: VectorLayer;
    map: IgoMap;
}
export declare class WfsWorkspace extends Workspace {
    protected options: WfsWorkspaceOptions;
    readonly layer: VectorLayer;
    readonly map: IgoMap;
    constructor(options: WfsWorkspaceOptions);
}

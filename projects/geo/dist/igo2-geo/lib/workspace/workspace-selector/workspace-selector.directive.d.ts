import { OnInit, OnDestroy } from '@angular/core';
import { WorkspaceStore, WorkspaceSelectorComponent } from '@igo2/common';
import { IgoMap } from '../../map';
import { WfsWorkspaceService } from '../shared/wfs-workspace.service';
import { WmsWorkspaceService } from '../shared/wms-workspace.service';
export declare class WorkspaceSelectorDirective implements OnInit, OnDestroy {
    private component;
    private wfsWorkspaceService;
    private wmsWorkspaceService;
    private layers$$;
    map: IgoMap;
    readonly workspaceStore: WorkspaceStore;
    constructor(component: WorkspaceSelectorComponent, wfsWorkspaceService: WfsWorkspaceService, wmsWorkspaceService: WmsWorkspaceService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    private onLayersChange;
    private getOrCreateWorkspace;
    private layerIsEditable;
}

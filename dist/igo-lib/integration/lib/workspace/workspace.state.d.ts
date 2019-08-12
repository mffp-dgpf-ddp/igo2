import { BehaviorSubject } from 'rxjs';
import { Workspace, WorkspaceStore } from '@igo2/common';
/**
 * Service that holds the state of the workspace module
 */
export declare class WorkspaceState {
    /**
     * Observable of the active workspace
     */
    workspace$: BehaviorSubject<Workspace<object>>;
    /**
     * Store that holds all the available workspaces
     */
    readonly store: WorkspaceStore;
    private _store;
    constructor();
}

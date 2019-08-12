import { EventEmitter } from '@angular/core';
import { Workspace } from '../shared/workspace';
import { WorkspaceStore } from '../shared/store';
/**
 * Drop list that activates the selected workspace emit an event.
 */
export declare class WorkspaceSelectorComponent {
    /**
     * Store that holds the available workspaces.
     */
    store: WorkspaceStore;
    /**
     * Event emitted when an workspace is selected or unselected
     */
    selectedChange: EventEmitter<{
        selected: boolean;
        value: Workspace<object>;
    }>;
    /**
     * @internal
     */
    getWorkspaceTitle(workspace: Workspace): string;
    /**
     * When an workspace is manually selected, select it into the
     * store and emit an event.
     * @internal
     * @param event The selection change event
     */
    onSelectedChange(event: {
        value: Workspace;
    }): void;
}

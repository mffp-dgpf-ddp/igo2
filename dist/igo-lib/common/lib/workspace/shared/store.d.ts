import { EntityStore } from '../../entity';
import { Workspace } from './workspace';
import { BehaviorSubject } from 'rxjs';
/**
 * The class is a specialized version of an EntityStore that stores
 * workspaces.
 */
export declare class WorkspaceStore extends EntityStore<Workspace> {
    activeWorkspace$: BehaviorSubject<Workspace>;
    /**
     * Activate the an workspace workspace and deactivate the one currently active
     * @param workspace Workspace
     */
    activateWorkspace(workspace: Workspace): void;
    /**
     * Deactivate the current workspace
     * @param workspace Workspace
     */
    deactivateWorkspace(): void;
}

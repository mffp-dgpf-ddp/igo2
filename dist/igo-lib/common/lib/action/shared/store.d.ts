import { EntityStore } from '../../entity';
import { Action } from './action.interfaces';
/**
 * The class is a specialized version of an EntityStore that stores
 * actions.
 */
export declare class ActionStore extends EntityStore<Action> {
    /**
     * Update actions availability. That means disabling or enabling some
     * actions based on the conditions they define.
     */
    updateActionsAvailability(): void;
}

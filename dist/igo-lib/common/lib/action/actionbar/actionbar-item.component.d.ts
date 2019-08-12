import { EventEmitter } from '@angular/core';
import { Action } from '../shared/action.interfaces';
/**
 * An action button
 */
export declare class ActionbarItemComponent {
    /**
     * Action
     */
    action: Action;
    /**
     * Color
     */
    color: string;
    /**
     * Whether the action title is displayed
     */
    withTitle: boolean;
    /**
     * Whether the action icon is displayed
     */
    withIcon: boolean;
    /**
     * Whether the action is disabled
     */
    disabled: boolean;
    /**
     * Event emitted when the action button is clicked
     */
    trigger: EventEmitter<Action>;
    /**
     * @internal
     */
    readonly title: string;
    /**
     * @internal
     */
    readonly tooltip: string;
    /**
     * @internal
     */
    readonly icon: string;
    constructor();
    /**
     * When the action button is clicked, emit the 'trigger' event but don't
     * invoke the action handler. This is handled by the parent component.
     * @internal
     */
    onClick(): void;
}

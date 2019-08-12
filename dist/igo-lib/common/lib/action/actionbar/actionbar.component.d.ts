import { ChangeDetectorRef, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { Action } from '../shared/action.interfaces';
import { ActionbarMode } from '../shared/action.enums';
import { ActionStore } from '../shared/store';
import { Overlay } from '@angular/cdk/overlay';
/**
 * A list of action buttons.
 * This component can be displayed in one of two way: 'dock' or 'overlay'
 */
export declare class ActionbarComponent implements OnDestroy, OnChanges {
    private cdRef;
    overlay: Overlay;
    /**
     * Reference to the ActionbarMode enum for use in the template
     * @internal
     */
    actionbarMode: typeof ActionbarMode;
    /**
     * Whether the actionbar is collapsed (Dock mode)
     * @internal
     */
    collapsed: boolean;
    /**
     * Toggle collapse action (Dock)
     * @internal
     */
    toggleCollapseAction: {
        id: string;
        icon: string;
        handler: () => void;
    };
    /**
     * Action store watcher
     * @internal
     */
    private watcher;
    /**
     * Action store
     */
    store: ActionStore;
    /**
     * Actionbar mode
     */
    mode: ActionbarMode;
    /**
     * Whether a toggle button should be displayed (Dock mode)
     */
    withToggleButton: boolean;
    /**
     * Whether a the actionbar should display buttons horizontally
     */
    horizontal: boolean;
    /**
     * Color
     */
    color: string;
    /**
     * Whether action titles are displayed
     */
    withTitle: boolean;
    /**
     * Whether action icons are displayed
     */
    withIcon: boolean;
    /**
     * Overlay X position
     */
    xPosition: string;
    /**
     * Overlay X position
     */
    yPosition: string;
    /**
     * Class to add to the actionbar overlay
     */
    overlayClass: string;
    private _overlayClass;
    /**
     * Function to add class to item actionbar
     */
    itemClassFunc: (action: Action) => {
        [key: string]: boolean;
    };
    /**
     * @ignore
     */
    readonly withTitleClass: boolean;
    /**
     * @ignore
     */
    readonly withIconClass: boolean;
    /**
     * @ignore
     */
    readonly horizontalClass: boolean;
    static defaultItemClassFunc(action: Action): {};
    constructor(cdRef: ChangeDetectorRef, overlay: Overlay);
    /**
     * @internal
     */
    ngOnChanges(changes: SimpleChanges): void;
    /**
     * @internal
     */
    ngOnDestroy(): void;
    /**
     * Invoke the action handler
     * @internal
     */
    onTriggerAction(action: Action): void;
}

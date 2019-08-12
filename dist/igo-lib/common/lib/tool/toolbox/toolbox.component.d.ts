import { OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ActionStore } from '../../action';
import { Tool } from '../shared/tool.interface';
import { Toolbox } from '../shared/toolbox';
export declare class ToolboxComponent implements OnInit, OnDestroy {
    /**
     * Observable of the active tool
     */
    activeTool$: BehaviorSubject<Tool>;
    /**
     * Store of actions that toggle tools
     */
    actionStore: ActionStore;
    /**
     * Observable of he anmation state
     */
    animation$: BehaviorSubject<string>;
    /**
     * Observable of the toolbar
     */
    toolbar$: BehaviorSubject<string[]>;
    /**
     * Subscription to the active tool
     */
    private activeTool$$;
    /**
     * Subscription to the toolbar
     */
    private toolbar$$;
    /**
     * Observable of the ongoing animation. This is useful when
     * multiple animations are triggered at once i.e. when the user clicks
     * too fast on different actions
     */
    private animating$;
    /**
     * Subscription to the ongoing animation
     */
    private animating$$;
    /**
     * Toolbox
     */
    toolbox: Toolbox;
    /**
     * Whether the toolbox should animate the first tool entering
     */
    animate: boolean;
    /**
     * Whether the Toolbar should display actions' titles
     */
    readonly toolbarWithTitle: boolean;
    /**
     * Initialize the toolbar and subscribe to the active tool
     * @internal
     */
    ngOnInit(): void;
    /**
     * Unsubscribe to the active tool and destroy the action store
     * @internal
     */
    ngOnDestroy(): void;
    /**
     * Track the starting animation
     * @internal
     */
    onAnimationStart(): void;
    /**
     * Untrack the completed animation
     * @internal
     */
    onAnimationComplete(): void;
    /**
     * Return a tool's inputs
     * @param tool Tool
     * @returns Tool inputs
     * @internal
     */
    getToolInputs(tool: Tool): {
        [key: string]: any;
    };
    /**
     * Get Action bar item class function
     * @internal
     */
    readonly actionBarItemClassFunc: (tool: Tool) => {
        'tool-actived': boolean;
    };
    /**
     * Initialize an action store
     * @param toolbar Toolbar
     */
    private onToolbarChange;
    /**
     * Activate a tool and trigger an animation or not
     * @param tool Tool to activate
     */
    private onActiveToolChange;
    /**
     * Set the active tool
     * @param tool Tool to activate
     */
    private setActiveTool;
    /**
     * Initialize the toolbar
     */
    private setToolbar;
    /**
     * Observe the ongoing animation and ignore any incoming animation
     * while one is still ongoing.
     * @param callback Callback to execute when the animation completes
     */
    private onAnimate;
    /**
     * Stop observing an animation when it's complete
     */
    private unAnimate;
}

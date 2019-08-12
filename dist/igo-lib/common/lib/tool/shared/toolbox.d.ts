import { Tool, ToolboxOptions } from './tool.interface';
import { BehaviorSubject } from 'rxjs';
/**
 * Service where all available tools and their component are registered.
 */
export declare class Toolbox {
    private options;
    /**
     * Observable of the active tool
     */
    activeTool$: BehaviorSubject<Tool>;
    /**
     * Ordered list of tool names to display in a toolbar
     */
    toolbar$: BehaviorSubject<string[]>;
    /**
     * Observable of the active tool
     */
    private activeTool$$;
    /**
     * Active tool history. Useful for activating the previous tool.
     */
    private activeToolHistory;
    /**
     * Tool store
     */
    private store;
    readonly tools$: BehaviorSubject<Tool[]>;
    constructor(options?: ToolboxOptions);
    /**
     * Destroy the toolbox
     */
    destroy(): void;
    /**
     * Return a tool
     * @param name Tool name
     * @returns tool Tool
     */
    getTool(name: string): Tool;
    /**
     * Return all tools
     * @returns Array of tools
     */
    getTools(): Tool[];
    /**
     * Set tool configurations
     * @param tools Tools
     */
    setTools(tools: Tool[]): void;
    /**
     * Set toolbar
     * @param toolbar A list of tool names
     */
    setToolbar(toolbar: string[]): void;
    /**
     * Activate a tool (and deactivate other tools)
     * @param name Tool name
     * @param options Tool options
     */
    activateTool(name: string, options?: {
        [key: string]: any;
    }): void;
    /**
     * Activate the previous tool, if any
     */
    activatePreviousTool(): void;
    /**
     * Deactivate the active tool
     */
    deactivateTool(): void;
    /**
     * Initialize the tool store and start observing the active tool
     */
    private initStore;
    /**
     * Set the active tool and update the tool history
     * @param tool Tool
     */
    private setActiveTool;
    /**
     * Clear the tool history
     */
    private clearActiveToolHistory;
}

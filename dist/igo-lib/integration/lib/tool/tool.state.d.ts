import { Toolbox, ToolService } from '@igo2/common';
/**
 * Service that holds the state of the search module
 */
export declare class ToolState {
    private toolService;
    /**
     * Toolbox that holds main tools
     */
    toolbox: Toolbox;
    constructor(toolService: ToolService);
}

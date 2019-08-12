import { Tool } from './tool.interface';
/**
 * Service where runtime tool configurations are registered
 */
export declare class ToolService {
    static tools: {
        [key: string]: Tool;
    };
    static register(tool: Tool): void;
    constructor();
    /**
     * Return a tool
     * @param name Tool name
     * @returns tool Tool
     */
    getTool(name: string): Tool;
    /**
     * Return all tools
     * @returns tTols
     */
    getTools(): Tool[];
}

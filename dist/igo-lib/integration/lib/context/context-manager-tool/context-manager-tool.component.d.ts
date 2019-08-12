import { ToolState } from '../../tool/tool.state';
export declare class ContextManagerToolComponent {
    private toolState;
    constructor(toolState: ToolState);
    editContext(): void;
    managePermissions(): void;
}

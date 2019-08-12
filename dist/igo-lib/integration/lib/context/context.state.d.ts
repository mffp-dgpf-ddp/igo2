import { BehaviorSubject } from 'rxjs';
import { LanguageService } from '@igo2/core';
import { ToolService } from '@igo2/common';
import { ContextService, DetailedContext } from '@igo2/context';
import { ToolState } from '../tool/tool.state';
/**
 * Service that holds the state of the context module
 */
export declare class ContextState {
    private contextService;
    private toolService;
    private toolState;
    private languageService;
    /**
     * Observable of the active context
     */
    context$: BehaviorSubject<DetailedContext>;
    constructor(contextService: ContextService, toolService: ToolService, toolState: ToolState, languageService: LanguageService);
    /**
     * Set the active context
     * @param context Detailed context
     */
    private setContext;
    /**
     * Update the tool state with the context's tools
     * @param context Detailed context
     */
    private updateTools;
    /**
     * Set a new context and update the tool state
     * @param context Detailed context
     */
    private onContextChange;
}

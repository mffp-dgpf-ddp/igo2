export interface Action {
    id: string;
    handler: ActionHandler;
    title?: string;
    icon?: string;
    tooltip?: string;
    conditions?: Array<(...args: any[]) => boolean>;
    args?: any[];
    conditionArgs?: any[];
}
export declare type ActionHandler = (...args: any[]) => void;

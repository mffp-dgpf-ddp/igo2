export interface Tool {
    name: string;
    component: any;
    title?: string;
    icon?: string;
    iconImage?: string;
    tooltip?: string;
    options?: {
        [key: string]: any;
    };
    id?: string;
}
export interface ToolboxOptions {
    toolbar?: string[];
}

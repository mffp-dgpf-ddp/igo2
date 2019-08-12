/**
 * Service where all available form fields are registered.
 */
export declare class FormFieldService {
    static fields: {
        [key: string]: any;
    };
    static register(type: string, component: any): void;
    constructor();
    /**
     * Return field component by type
     * @param type Field type
     * @returns Field component
     */
    getFieldByType(type: string): any;
}

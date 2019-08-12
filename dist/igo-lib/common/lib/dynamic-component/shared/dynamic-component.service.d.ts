import { ComponentFactoryResolver } from '@angular/core';
import { DynamicComponent } from './dynamic-component';
/**
 * Service to creates DynamicComponent instances from base component classes
 */
export declare class DynamicComponentService {
    private resolver;
    constructor(resolver: ComponentFactoryResolver);
    /**
     * Creates a DynamicComponent instance from a base component class
     * @param componentCls The component class
     * @returns DynamicComponent instance
     */
    create(componentCls: any): DynamicComponent<any>;
}

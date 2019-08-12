import { ChangeDetectorRef, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { DynamicComponent } from '../shared/dynamic-component';
import { DynamicComponentService } from '../shared/dynamic-component.service';
export declare class DynamicOutletComponent implements OnChanges, OnDestroy {
    private dynamicComponentService;
    private cdRef;
    /**
     * The dynamic component base class or the dynamic component itself
     */
    component: DynamicComponent<any> | any;
    /**
     * The dynamic component inputs
     */
    inputs: {
        [key: string]: any;
    };
    /**
     * The subscribers to the dynamic component outputs
     */
    subscribers: {
        [key: string]: (event: any) => void;
    };
    /**
     * The dynamic component
     */
    private dynamicComponent;
    /**
     * The view element to render the component to
     * @ignore
     */
    private target;
    constructor(dynamicComponentService: DynamicComponentService, cdRef: ChangeDetectorRef);
    /**
     * If the dynamic component changes, create it.
     * If the inputs or subscribers change, update the current component's
     * inputs or subscribers.
     * @internal
     */
    ngOnChanges(changes: SimpleChanges): void;
    /**
     * Destroy the dynamic component and all it's subscribers
     * @internal
     */
    ngOnDestroy(): void;
    /**
     * Create a  DynamicComponent out of the component class and render it.
     * @internal
     */
    private createComponent;
    /**
     * Create and render the dynamic component. Set it's inputs and subscribers
     * @internal
     */
    private renderComponent;
    /**
     * Update the dynamic component inputs. This is an update so any
     * key not defined won't be overwritten.
     * @internal
     */
    private updateInputs;
    /**
     * Update the dynamic component subscribers. This is an update so any
     * key not defined won't be overwritten.
     * @internal
     */
    private updateSubscribers;
}

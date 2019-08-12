import { EventEmitter, OnDestroy } from '@angular/core';
import { DynamicComponent } from '../../dynamic-component';
import { WidgetComponent } from '../shared/widget.interfaces';
/**
 * This component dynamically renders a widget. It also subscribes
 * to the widget's 'cancel' and 'complete' events and destroys it
 * when any of those event is emitted.
 */
export declare class WidgetOutletComponent implements OnDestroy {
    /**
     * Widget subscribers to 'cancel' and 'complete'
     * @internal
     */
    private baseSubscribers;
    /**
     * Widget
     */
    widget: DynamicComponent<WidgetComponent>;
    /**
     * Widget inputs
     */
    inputs: {
        [key: string]: any;
    };
    /**
     * Widget subscribers
     */
    subscribers: {
        [key: string]: (event: any) => void;
    };
    /**
     * Event emitted when the widget emits 'complete'
     */
    complete: EventEmitter<any>;
    /**
     * Event emitted when the widget emits 'cancel'
     */
    cancel: EventEmitter<any>;
    constructor();
    /**
     * Destroy the current widget and all it's inner subscriptions
     * @internal
     */
    ngOnDestroy(): void;
    /**
     * Get the effective subscribers. That means a combination of the base
     * subscribers and any subscriber given as input.
     * @returns Combined subscribers
     * @internal
     */
    getEffectiveSubscribers(): {
        [key: string]: (event: any) => void;
    };
    /**
     * When the widget emits 'cancel', propagate that event and destroy
     * the widget
     */
    private onCancel;
    /**
     * When the widget emits 'complete', propagate that event and destroy
     * the widget
     */
    private onComplete;
    /**
     * Destroy the current widget
     */
    private destroyWidget;
}

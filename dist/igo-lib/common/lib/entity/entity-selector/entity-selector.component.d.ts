import { EventEmitter, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EntityStore } from '../shared/store';
export declare class EntitySelectorComponent implements OnInit, OnDestroy {
    private cdRef;
    /**
     * The selected entity
     * @internal
     */
    selected$: BehaviorSubject<object>;
    /**
     * Subscription to the selected entity
     */
    private selected$$;
    /**
     * Store watcher
     */
    private watcher;
    /**
     * Entity store
     */
    store: EntityStore<object>;
    /**
     * Wheter selecting many entities is allowed
     */
    many: boolean;
    /**
     * Title accessor
     */
    titleAccessor: (object: any) => string;
    /**
     * Text to display when nothing is selected
     */
    emptyText: string;
    /**
     * Field placeholder
     */
    placeholder: string;
    /**
     * Event emitted when the selection changes
     */
    selectedChange: EventEmitter<{
        selected: boolean;
        value: object | object[];
    }>;
    constructor(cdRef: ChangeDetectorRef);
    /**
     * Create a store watcher and subscribe to the selected entity
     * @internal
     */
    ngOnInit(): void;
    /**
     * Unsubscribe to the selected entity and destroy the store watcher
     * @internal
     */
    ngOnDestroy(): void;
    /**
     * On selection change, update the store's state and emit an event
     * @internal
     */
    onSelectionChange(event: {
        value: object | undefined;
    }): void;
}

import { EventEmitter, ChangeDetectorRef, SimpleChanges, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EntityStore, EntityTableTemplate, EntityTableColumn, EntityTableColumnRenderer, EntityTableSelectionState, EntityTableScrollBehavior } from '../shared';
export declare class EntityTableComponent implements OnInit, OnDestroy, OnChanges {
    private cdRef;
    /**
     * Reference to the column renderer types
     * @internal
     */
    entityTableColumnRenderer: typeof EntityTableColumnRenderer;
    /**
     * Reference to the selection states
     * @internal
     */
    entityTableSelectionState: typeof EntityTableSelectionState;
    /**
     * Observable of the selection,s state
     * @internal
     */
    selectionState$: BehaviorSubject<EntityTableSelectionState>;
    /**
     * Entity store watcher
     */
    private watcher;
    /**
     * Subscription to the store's selection
     */
    private selection$$;
    /**
     * Entity store
     */
    store: EntityStore<object>;
    /**
     * Table template
     */
    template: EntityTableTemplate;
    /**
     * Scroll behavior on selection
     */
    scrollBehavior: EntityTableScrollBehavior;
    /**
     * Event emitted when an entity (row) is clicked
     */
    entityClick: EventEmitter<object>;
    /**
     * Event emitted when an entity (row) is selected
     */
    entitySelectChange: EventEmitter<{
        added: object[];
    }>;
    /**
     * Table headers
     * @internal
     */
    readonly headers: string[];
    /**
     * Data source consumable by the underlying material table
     * @internal
     */
    readonly dataSource: BehaviorSubject<object[]>;
    /**
     * Whether selection is supported
     * @internal
     */
    readonly selection: boolean;
    /**
     * Whether a selection checkbox should be displayed
     * @internal
     */
    readonly selectionCheckbox: boolean;
    /**
     * Whether selection many entities should eb supported
     * @internal
     */
    readonly selectMany: boolean;
    /**
     * Whether selection many entities should eb supported
     * @internal
     */
    readonly fixedHeader: boolean;
    constructor(cdRef: ChangeDetectorRef);
    /**
     * Track the selection state to properly display the selection checkboxes
     * @internal
     */
    ngOnInit(): void;
    /**
     * When the store change, create a new watcher
     * @internal
     */
    ngOnChanges(changes: SimpleChanges): void;
    /**
     * Unbind the store watcher
     * @internal
     */
    ngOnDestroy(): void;
    /**
     * Trigger a refresh of thre table. This can be useful when
     * the data source doesn't emit a new value but for some reason
     * the records need an update.
     * @internal
     */
    refresh(): void;
    /**
     * On sort, sort the store
     * @param event Sort event
     * @internal
     */
    onSort(event: {
        active: string;
        direction: string;
    }): void;
    /**
     * When an entity is clicked, emit an event
     * @param entity Entity
     * @internal
     */
    onRowClick(entity: object): void;
    /**
     * When an entity is selected, select it in the store and emit an event. Even if
     * "many" is set to true, this method always select a single, exclusive row. Selecting
     * multiple rows should be achieved by using the checkboxes.
     * @param entity Entity
     * @internal
     */
    onRowSelect(entity: object): void;
    /**
     * Select or unselect all rows at once. On select, emit an event.
     * @param toggle Select or unselect
     * @internal
     */
    onToggleRows(toggle: boolean): void;
    /**
     * When an entity is toggled, select or unselect it in the store. On select,
     * emit an event.
     * @param toggle Select or unselect
     * @param entity Entity
     * @internal
     */
    onToggleRow(toggle: boolean, entity: object): void;
    /**
     * Compute the selection state
     * @returns Whether all, some or no rows are selected
     * @internal
     */
    private computeSelectionState;
    /**
     * Whether a column is sortable
     * @param column Column
     * @returns True if a column is sortable
     * @internal
     */
    columnIsSortable(column: EntityTableColumn): boolean;
    /**
     * Whether a row is should be selected based on the underlying entity state
     * @param entity Entity
     * @returns True if a row should be selected
     * @internal
     */
    rowIsSelected(entity: object): boolean;
    /**
     * Method to access an entity's values
     * @param entity Entity
     * @param column Column
     * @returns Any value
     * @internal
     */
    getValue(entity: object, column: EntityTableColumn): any;
    /**
     * Return the type of renderer of a column
     * @param column Column
     * @returns Renderer type
     * @internal
     */
    getColumnRenderer(column: EntityTableColumn): EntityTableColumnRenderer;
    /**
     * Return the table ngClass
     * @returns ngClass
     * @internal
     */
    getTableClass(): {
        [key: string]: boolean;
    };
    /**
     * Return a header ngClass
     * @returns ngClass
     * @internal
     */
    getHeaderClass(): {
        [key: string]: boolean;
    };
    /**
     * Return a row ngClass
     * @param entity Entity
     * @returns ngClass
     * @internal
     */
    getRowClass(entity: object): {
        [key: string]: boolean;
    };
    /**
     * Return a row ngClass
     * @param entity Entity
     * @param column Column
     * @returns ngClass
     * @internal
     */
    getCellClass(entity: object, column: EntityTableColumn): {
        [key: string]: boolean;
    };
    /**
     * When a button is clicked
     * @param func Function
     * @param entity Entity
     * @internal
     */
    onButtonClick(clickFunc: (entity: object) => void, entity: object): void;
}

import { ElementRef, Renderer2, EventEmitter } from '@angular/core';
import { EntityTableScrollBehavior } from '../shared/entity.enums';
/**
 * Directive that handles an entity table row click and selection.
 */
export declare class EntityTableRowDirective {
    private renderer;
    private el;
    /**
     * Class added to a selected row
     */
    static selectedCls: string;
    /**
     * Class added to a highlighted row
     */
    static highlightedCls: string;
    /**
     * Whether a row supports selection
     */
    selection: boolean;
    /**
     * Whether clicking a row should select it (if selection is true)
     */
    selectOnClick: boolean;
    /**
     * Whether the selected row should be highlighted
     */
    highlightSelection: boolean;
    /**
     * Whether a row is selected
     */
    selected: boolean;
    private _selected;
    /**
     * Scroll behavior on selection
     */
    scrollBehavior: EntityTableScrollBehavior;
    /**
     * Event emitted when a row is selected
     */
    select: EventEmitter<EntityTableRowDirective>;
    /**
     * When a row is clicked, select it if it's supported
     * @ignore
     */
    onClick(): void;
    constructor(renderer: Renderer2, el: ElementRef);
    /**
     * Select a row and add or remove the selected class from it
     * @param selected Whether the row should be selected
     */
    private toggleSelected;
    /**
     * Scroll to the selected row
     */
    private scroll;
    /**
     * Add the selected CSS class
     */
    private addCls;
    /**
     * Remove the selected CSS class
     */
    private removeCls;
}

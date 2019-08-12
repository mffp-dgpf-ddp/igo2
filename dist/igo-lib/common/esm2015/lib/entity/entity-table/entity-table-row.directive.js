/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, Input, ElementRef, Renderer2, EventEmitter, Output, HostListener } from '@angular/core';
import { EntityTableScrollBehavior } from '../shared/entity.enums';
/**
 * Directive that handles an entity table row click and selection.
 */
export class EntityTableRowDirective {
    /**
     * @param {?} renderer
     * @param {?} el
     */
    constructor(renderer, el) {
        this.renderer = renderer;
        this.el = el;
        /**
         * Whether a row supports selection
         */
        this.selection = false;
        /**
         * Whether clicking a row should select it (if selection is true)
         */
        this.selectOnClick = true;
        /**
         * Whether the selected row should be highlighted
         */
        this.highlightSelection = true;
        this._selected = false;
        /**
         * Scroll behavior on selection
         */
        this.scrollBehavior = EntityTableScrollBehavior.Auto;
        /**
         * Event emitted when a row is selected
         */
        this.select = new EventEmitter();
    }
    /**
     * Whether a row is selected
     * @param {?} value
     * @return {?}
     */
    set selected(value) {
        if (this.selection === false) {
            return;
        }
        if (value === this._selected) {
            return;
        }
        this.toggleSelected(value);
        this.scroll();
    }
    /**
     * @return {?}
     */
    get selected() {
        return this._selected;
    }
    /**
     * When a row is clicked, select it if it's supported
     * @ignore
     * @return {?}
     */
    onClick() {
        if (this.selection === false || this.selectOnClick === false) {
            return;
        }
        this.toggleSelected(true);
        this.select.emit(this);
    }
    /**
     * Select a row and add or remove the selected class from it
     * @private
     * @param {?} selected Whether the row should be selected
     * @return {?}
     */
    toggleSelected(selected) {
        this._selected = selected;
        if (selected === true) {
            this.addCls(EntityTableRowDirective.selectedCls);
            if (this.highlightSelection === true) {
                this.addCls(EntityTableRowDirective.highlightedCls);
            }
        }
        else {
            this.removeCls(EntityTableRowDirective.selectedCls);
            this.removeCls(EntityTableRowDirective.highlightedCls);
        }
    }
    /**
     * Scroll to the selected row
     * @private
     * @return {?}
     */
    scroll() {
        if (this._selected === true) {
            this.el.nativeElement.scrollIntoView({
                behavior: this.scrollBehavior,
                block: 'center',
                inline: 'center'
            });
        }
    }
    /**
     * Add the selected CSS class
     * @private
     * @param {?} cls
     * @return {?}
     */
    addCls(cls) {
        this.renderer.addClass(this.el.nativeElement, cls);
    }
    /**
     * Remove the selected CSS class
     * @private
     * @param {?} cls
     * @return {?}
     */
    removeCls(cls) {
        this.renderer.removeClass(this.el.nativeElement, cls);
    }
}
/**
 * Class added to a selected row
 */
EntityTableRowDirective.selectedCls = 'igo-entity-table-row-selected';
/**
 * Class added to a highlighted row
 */
EntityTableRowDirective.highlightedCls = 'igo-entity-table-row-highlighted';
EntityTableRowDirective.decorators = [
    { type: Directive, args: [{
                selector: '[igoEntityTableRow]'
            },] }
];
/** @nocollapse */
EntityTableRowDirective.ctorParameters = () => [
    { type: Renderer2 },
    { type: ElementRef }
];
EntityTableRowDirective.propDecorators = {
    selection: [{ type: Input }],
    selectOnClick: [{ type: Input }],
    highlightSelection: [{ type: Input }],
    selected: [{ type: Input }],
    scrollBehavior: [{ type: Input }],
    select: [{ type: Output }],
    onClick: [{ type: HostListener, args: ['click',] }]
};
if (false) {
    /**
     * Class added to a selected row
     * @type {?}
     */
    EntityTableRowDirective.selectedCls;
    /**
     * Class added to a highlighted row
     * @type {?}
     */
    EntityTableRowDirective.highlightedCls;
    /**
     * Whether a row supports selection
     * @type {?}
     */
    EntityTableRowDirective.prototype.selection;
    /**
     * Whether clicking a row should select it (if selection is true)
     * @type {?}
     */
    EntityTableRowDirective.prototype.selectOnClick;
    /**
     * Whether the selected row should be highlighted
     * @type {?}
     */
    EntityTableRowDirective.prototype.highlightSelection;
    /**
     * @type {?}
     * @private
     */
    EntityTableRowDirective.prototype._selected;
    /**
     * Scroll behavior on selection
     * @type {?}
     */
    EntityTableRowDirective.prototype.scrollBehavior;
    /**
     * Event emitted when a row is selected
     * @type {?}
     */
    EntityTableRowDirective.prototype.select;
    /**
     * @type {?}
     * @private
     */
    EntityTableRowDirective.prototype.renderer;
    /**
     * @type {?}
     * @private
     */
    EntityTableRowDirective.prototype.el;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW50aXR5LXRhYmxlLXJvdy5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9jb21tb24vIiwic291cmNlcyI6WyJsaWIvZW50aXR5L2VudGl0eS10YWJsZS9lbnRpdHktdGFibGUtcm93LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsVUFBVSxFQUNWLFNBQVMsRUFDVCxZQUFZLEVBQ1osTUFBTSxFQUNOLFlBQVksRUFDYixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQzs7OztBQVFuRSxNQUFNLE9BQU8sdUJBQXVCOzs7OztJQXFFbEMsWUFBb0IsUUFBbUIsRUFBVSxFQUFjO1FBQTNDLGFBQVEsR0FBUixRQUFRLENBQVc7UUFBVSxPQUFFLEdBQUYsRUFBRSxDQUFZOzs7O1FBdER0RCxjQUFTLEdBQUcsS0FBSyxDQUFDOzs7O1FBS2xCLGtCQUFhLEdBQVksSUFBSSxDQUFDOzs7O1FBTXZDLHVCQUFrQixHQUFZLElBQUksQ0FBQztRQWdCM0IsY0FBUyxHQUFHLEtBQUssQ0FBQzs7OztRQU0xQixtQkFBYyxHQUE4Qix5QkFBeUIsQ0FBQyxJQUFJLENBQUM7Ozs7UUFLakUsV0FBTSxHQUFHLElBQUksWUFBWSxFQUEyQixDQUFDO0lBZ0JHLENBQUM7Ozs7OztJQXRDbkUsSUFDSSxRQUFRLENBQUMsS0FBYztRQUN6QixJQUFJLElBQUksQ0FBQyxTQUFTLEtBQUssS0FBSyxFQUFFO1lBQUUsT0FBTztTQUFFO1FBQ3pDLElBQUksS0FBSyxLQUFLLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFBRSxPQUFPO1NBQUU7UUFFekMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMzQixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDaEIsQ0FBQzs7OztJQUNELElBQUksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN4QixDQUFDOzs7Ozs7SUFtQkQsT0FBTztRQUNMLElBQUksSUFBSSxDQUFDLFNBQVMsS0FBSyxLQUFLLElBQUksSUFBSSxDQUFDLGFBQWEsS0FBSyxLQUFLLEVBQUU7WUFDNUQsT0FBTztTQUNSO1FBRUQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMxQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN6QixDQUFDOzs7Ozs7O0lBUU8sY0FBYyxDQUFDLFFBQWlCO1FBQ3RDLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO1FBQzFCLElBQUksUUFBUSxLQUFLLElBQUksRUFBRTtZQUNyQixJQUFJLENBQUMsTUFBTSxDQUFDLHVCQUF1QixDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ2pELElBQUksSUFBSSxDQUFDLGtCQUFrQixLQUFLLElBQUksRUFBRTtnQkFDcEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQyxjQUFjLENBQUMsQ0FBQzthQUNyRDtTQUNGO2FBQU07WUFDTCxJQUFJLENBQUMsU0FBUyxDQUFDLHVCQUF1QixDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ3BELElBQUksQ0FBQyxTQUFTLENBQUMsdUJBQXVCLENBQUMsY0FBYyxDQUFDLENBQUM7U0FDeEQ7SUFDSCxDQUFDOzs7Ozs7SUFLTyxNQUFNO1FBQ1osSUFBSSxJQUFJLENBQUMsU0FBUyxLQUFLLElBQUksRUFBRTtZQUMzQixJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUM7Z0JBQ25DLFFBQVEsRUFBRSxJQUFJLENBQUMsY0FBYztnQkFDN0IsS0FBSyxFQUFFLFFBQVE7Z0JBQ2YsTUFBTSxFQUFFLFFBQVE7YUFDakIsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDOzs7Ozs7O0lBS08sTUFBTSxDQUFDLEdBQVc7UUFDeEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDckQsQ0FBQzs7Ozs7OztJQUtPLFNBQVMsQ0FBQyxHQUFXO1FBQzNCLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ3hELENBQUM7Ozs7O0FBNUdNLG1DQUFXLEdBQUcsK0JBQStCLENBQUM7Ozs7QUFLOUMsc0NBQWMsR0FBRyxrQ0FBa0MsQ0FBQzs7WUFiNUQsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxxQkFBcUI7YUFDaEM7Ozs7WUFiQyxTQUFTO1lBRFQsVUFBVTs7O3dCQThCVCxLQUFLOzRCQUtMLEtBQUs7aUNBS0wsS0FBSzt1QkFNTCxLQUFLOzZCQWdCTCxLQUFLO3FCQU1MLE1BQU07c0JBTU4sWUFBWSxTQUFDLE9BQU87Ozs7Ozs7SUF0RHJCLG9DQUFxRDs7Ozs7SUFLckQsdUNBQTJEOzs7OztJQUszRCw0Q0FBMkI7Ozs7O0lBSzNCLGdEQUF1Qzs7Ozs7SUFLdkMscURBQ21DOzs7OztJQWdCbkMsNENBQTBCOzs7OztJQUsxQixpREFDMkU7Ozs7O0lBSzNFLHlDQUErRDs7Ozs7SUFnQm5ELDJDQUEyQjs7Ozs7SUFBRSxxQ0FBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIERpcmVjdGl2ZSxcclxuICBJbnB1dCxcclxuICBFbGVtZW50UmVmLFxyXG4gIFJlbmRlcmVyMixcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgT3V0cHV0LFxyXG4gIEhvc3RMaXN0ZW5lclxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgRW50aXR5VGFibGVTY3JvbGxCZWhhdmlvciB9IGZyb20gJy4uL3NoYXJlZC9lbnRpdHkuZW51bXMnO1xyXG5cclxuLyoqXHJcbiAqIERpcmVjdGl2ZSB0aGF0IGhhbmRsZXMgYW4gZW50aXR5IHRhYmxlIHJvdyBjbGljayBhbmQgc2VsZWN0aW9uLlxyXG4gKi9cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbaWdvRW50aXR5VGFibGVSb3ddJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgRW50aXR5VGFibGVSb3dEaXJlY3RpdmUge1xyXG5cclxuICAvKipcclxuICAgKiBDbGFzcyBhZGRlZCB0byBhIHNlbGVjdGVkIHJvd1xyXG4gICAqL1xyXG4gIHN0YXRpYyBzZWxlY3RlZENscyA9ICdpZ28tZW50aXR5LXRhYmxlLXJvdy1zZWxlY3RlZCc7XHJcblxyXG4gIC8qKlxyXG4gICAqIENsYXNzIGFkZGVkIHRvIGEgaGlnaGxpZ2h0ZWQgcm93XHJcbiAgICovXHJcbiAgc3RhdGljIGhpZ2hsaWdodGVkQ2xzID0gJ2lnby1lbnRpdHktdGFibGUtcm93LWhpZ2hsaWdodGVkJztcclxuXHJcbiAgLyoqXHJcbiAgICogV2hldGhlciBhIHJvdyBzdXBwb3J0cyBzZWxlY3Rpb25cclxuICAgKi9cclxuICBASW5wdXQoKSBzZWxlY3Rpb24gPSBmYWxzZTtcclxuXHJcbiAgLyoqXHJcbiAgICogV2hldGhlciBjbGlja2luZyBhIHJvdyBzaG91bGQgc2VsZWN0IGl0IChpZiBzZWxlY3Rpb24gaXMgdHJ1ZSlcclxuICAgKi9cclxuICBASW5wdXQoKSBzZWxlY3RPbkNsaWNrOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgLyoqXHJcbiAgICogV2hldGhlciB0aGUgc2VsZWN0ZWQgcm93IHNob3VsZCBiZSBoaWdobGlnaHRlZFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpXHJcbiAgaGlnaGxpZ2h0U2VsZWN0aW9uOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgLyoqXHJcbiAgICogV2hldGhlciBhIHJvdyBpcyBzZWxlY3RlZFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpXHJcbiAgc2V0IHNlbGVjdGVkKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICBpZiAodGhpcy5zZWxlY3Rpb24gPT09IGZhbHNlKSB7IHJldHVybjsgfVxyXG4gICAgaWYgKHZhbHVlID09PSB0aGlzLl9zZWxlY3RlZCkgeyByZXR1cm47IH1cclxuXHJcbiAgICB0aGlzLnRvZ2dsZVNlbGVjdGVkKHZhbHVlKTtcclxuICAgIHRoaXMuc2Nyb2xsKCk7XHJcbiAgfVxyXG4gIGdldCBzZWxlY3RlZCgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLl9zZWxlY3RlZDtcclxuICB9XHJcbiAgcHJpdmF0ZSBfc2VsZWN0ZWQgPSBmYWxzZTtcclxuXHJcbiAgLyoqXHJcbiAgICogU2Nyb2xsIGJlaGF2aW9yIG9uIHNlbGVjdGlvblxyXG4gICAqL1xyXG4gIEBJbnB1dCgpXHJcbiAgc2Nyb2xsQmVoYXZpb3I6IEVudGl0eVRhYmxlU2Nyb2xsQmVoYXZpb3IgPSBFbnRpdHlUYWJsZVNjcm9sbEJlaGF2aW9yLkF1dG87XHJcblxyXG4gIC8qKlxyXG4gICAqIEV2ZW50IGVtaXR0ZWQgd2hlbiBhIHJvdyBpcyBzZWxlY3RlZFxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBzZWxlY3QgPSBuZXcgRXZlbnRFbWl0dGVyPEVudGl0eVRhYmxlUm93RGlyZWN0aXZlPigpO1xyXG5cclxuICAvKipcclxuICAgKiBXaGVuIGEgcm93IGlzIGNsaWNrZWQsIHNlbGVjdCBpdCBpZiBpdCdzIHN1cHBvcnRlZFxyXG4gICAqIEBpZ25vcmVcclxuICAgKi9cclxuICBASG9zdExpc3RlbmVyKCdjbGljaycpXHJcbiAgb25DbGljaygpIHtcclxuICAgIGlmICh0aGlzLnNlbGVjdGlvbiA9PT0gZmFsc2UgfHwgdGhpcy5zZWxlY3RPbkNsaWNrID09PSBmYWxzZSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy50b2dnbGVTZWxlY3RlZCh0cnVlKTtcclxuICAgIHRoaXMuc2VsZWN0LmVtaXQodGhpcyk7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsIHByaXZhdGUgZWw6IEVsZW1lbnRSZWYpIHt9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNlbGVjdCBhIHJvdyBhbmQgYWRkIG9yIHJlbW92ZSB0aGUgc2VsZWN0ZWQgY2xhc3MgZnJvbSBpdFxyXG4gICAqIEBwYXJhbSBzZWxlY3RlZCBXaGV0aGVyIHRoZSByb3cgc2hvdWxkIGJlIHNlbGVjdGVkXHJcbiAgICovXHJcbiAgcHJpdmF0ZSB0b2dnbGVTZWxlY3RlZChzZWxlY3RlZDogYm9vbGVhbikge1xyXG4gICAgdGhpcy5fc2VsZWN0ZWQgPSBzZWxlY3RlZDtcclxuICAgIGlmIChzZWxlY3RlZCA9PT0gdHJ1ZSkge1xyXG4gICAgICB0aGlzLmFkZENscyhFbnRpdHlUYWJsZVJvd0RpcmVjdGl2ZS5zZWxlY3RlZENscyk7XHJcbiAgICAgIGlmICh0aGlzLmhpZ2hsaWdodFNlbGVjdGlvbiA9PT0gdHJ1ZSkge1xyXG4gICAgICAgIHRoaXMuYWRkQ2xzKEVudGl0eVRhYmxlUm93RGlyZWN0aXZlLmhpZ2hsaWdodGVkQ2xzKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5yZW1vdmVDbHMoRW50aXR5VGFibGVSb3dEaXJlY3RpdmUuc2VsZWN0ZWRDbHMpO1xyXG4gICAgICB0aGlzLnJlbW92ZUNscyhFbnRpdHlUYWJsZVJvd0RpcmVjdGl2ZS5oaWdobGlnaHRlZENscyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTY3JvbGwgdG8gdGhlIHNlbGVjdGVkIHJvd1xyXG4gICAqL1xyXG4gIHByaXZhdGUgc2Nyb2xsKCkge1xyXG4gICAgaWYgKHRoaXMuX3NlbGVjdGVkID09PSB0cnVlKSB7XHJcbiAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5zY3JvbGxJbnRvVmlldyh7XHJcbiAgICAgICAgYmVoYXZpb3I6IHRoaXMuc2Nyb2xsQmVoYXZpb3IsXHJcbiAgICAgICAgYmxvY2s6ICdjZW50ZXInLFxyXG4gICAgICAgIGlubGluZTogJ2NlbnRlcidcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGQgdGhlIHNlbGVjdGVkIENTUyBjbGFzc1xyXG4gICAqL1xyXG4gIHByaXZhdGUgYWRkQ2xzKGNsczogc3RyaW5nKSB7XHJcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgY2xzKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlbW92ZSB0aGUgc2VsZWN0ZWQgQ1NTIGNsYXNzXHJcbiAgICovXHJcbiAgcHJpdmF0ZSByZW1vdmVDbHMoY2xzOiBzdHJpbmcpIHtcclxuICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5lbC5uYXRpdmVFbGVtZW50LCBjbHMpO1xyXG4gIH1cclxufVxyXG4iXX0=
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, Input, ElementRef, Renderer2, EventEmitter, Output, HostListener } from '@angular/core';
import { EntityTableScrollBehavior } from '../shared/entity.enums';
/**
 * Directive that handles an entity table row click and selection.
 */
var EntityTableRowDirective = /** @class */ (function () {
    function EntityTableRowDirective(renderer, el) {
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
    Object.defineProperty(EntityTableRowDirective.prototype, "selected", {
        get: /**
         * @return {?}
         */
        function () {
            return this._selected;
        },
        /**
         * Whether a row is selected
         */
        set: /**
         * Whether a row is selected
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (this.selection === false) {
                return;
            }
            if (value === this._selected) {
                return;
            }
            this.toggleSelected(value);
            this.scroll();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * When a row is clicked, select it if it's supported
     * @ignore
     */
    /**
     * When a row is clicked, select it if it's supported
     * @ignore
     * @return {?}
     */
    EntityTableRowDirective.prototype.onClick = /**
     * When a row is clicked, select it if it's supported
     * @ignore
     * @return {?}
     */
    function () {
        if (this.selection === false || this.selectOnClick === false) {
            return;
        }
        this.toggleSelected(true);
        this.select.emit(this);
    };
    /**
     * Select a row and add or remove the selected class from it
     * @param selected Whether the row should be selected
     */
    /**
     * Select a row and add or remove the selected class from it
     * @private
     * @param {?} selected Whether the row should be selected
     * @return {?}
     */
    EntityTableRowDirective.prototype.toggleSelected = /**
     * Select a row and add or remove the selected class from it
     * @private
     * @param {?} selected Whether the row should be selected
     * @return {?}
     */
    function (selected) {
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
    };
    /**
     * Scroll to the selected row
     */
    /**
     * Scroll to the selected row
     * @private
     * @return {?}
     */
    EntityTableRowDirective.prototype.scroll = /**
     * Scroll to the selected row
     * @private
     * @return {?}
     */
    function () {
        if (this._selected === true) {
            this.el.nativeElement.scrollIntoView({
                behavior: this.scrollBehavior,
                block: 'center',
                inline: 'center'
            });
        }
    };
    /**
     * Add the selected CSS class
     */
    /**
     * Add the selected CSS class
     * @private
     * @param {?} cls
     * @return {?}
     */
    EntityTableRowDirective.prototype.addCls = /**
     * Add the selected CSS class
     * @private
     * @param {?} cls
     * @return {?}
     */
    function (cls) {
        this.renderer.addClass(this.el.nativeElement, cls);
    };
    /**
     * Remove the selected CSS class
     */
    /**
     * Remove the selected CSS class
     * @private
     * @param {?} cls
     * @return {?}
     */
    EntityTableRowDirective.prototype.removeCls = /**
     * Remove the selected CSS class
     * @private
     * @param {?} cls
     * @return {?}
     */
    function (cls) {
        this.renderer.removeClass(this.el.nativeElement, cls);
    };
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
    EntityTableRowDirective.ctorParameters = function () { return [
        { type: Renderer2 },
        { type: ElementRef }
    ]; };
    EntityTableRowDirective.propDecorators = {
        selection: [{ type: Input }],
        selectOnClick: [{ type: Input }],
        highlightSelection: [{ type: Input }],
        selected: [{ type: Input }],
        scrollBehavior: [{ type: Input }],
        select: [{ type: Output }],
        onClick: [{ type: HostListener, args: ['click',] }]
    };
    return EntityTableRowDirective;
}());
export { EntityTableRowDirective };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW50aXR5LXRhYmxlLXJvdy5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9jb21tb24vIiwic291cmNlcyI6WyJsaWIvZW50aXR5L2VudGl0eS10YWJsZS9lbnRpdHktdGFibGUtcm93LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsVUFBVSxFQUNWLFNBQVMsRUFDVCxZQUFZLEVBQ1osTUFBTSxFQUNOLFlBQVksRUFDYixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQzs7OztBQUtuRTtJQXdFRSxpQ0FBb0IsUUFBbUIsRUFBVSxFQUFjO1FBQTNDLGFBQVEsR0FBUixRQUFRLENBQVc7UUFBVSxPQUFFLEdBQUYsRUFBRSxDQUFZOzs7O1FBdER0RCxjQUFTLEdBQUcsS0FBSyxDQUFDOzs7O1FBS2xCLGtCQUFhLEdBQVksSUFBSSxDQUFDOzs7O1FBTXZDLHVCQUFrQixHQUFZLElBQUksQ0FBQztRQWdCM0IsY0FBUyxHQUFHLEtBQUssQ0FBQzs7OztRQU0xQixtQkFBYyxHQUE4Qix5QkFBeUIsQ0FBQyxJQUFJLENBQUM7Ozs7UUFLakUsV0FBTSxHQUFHLElBQUksWUFBWSxFQUEyQixDQUFDO0lBZ0JHLENBQUM7SUF0Q25FLHNCQUNJLDZDQUFROzs7O1FBT1o7WUFDRSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDeEIsQ0FBQztRQWJEOztXQUVHOzs7Ozs7UUFDSCxVQUNhLEtBQWM7WUFDekIsSUFBSSxJQUFJLENBQUMsU0FBUyxLQUFLLEtBQUssRUFBRTtnQkFBRSxPQUFPO2FBQUU7WUFDekMsSUFBSSxLQUFLLEtBQUssSUFBSSxDQUFDLFNBQVMsRUFBRTtnQkFBRSxPQUFPO2FBQUU7WUFFekMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMzQixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDaEIsQ0FBQzs7O09BQUE7SUFpQkQ7OztPQUdHOzs7Ozs7SUFFSCx5Q0FBTzs7Ozs7SUFEUDtRQUVFLElBQUksSUFBSSxDQUFDLFNBQVMsS0FBSyxLQUFLLElBQUksSUFBSSxDQUFDLGFBQWEsS0FBSyxLQUFLLEVBQUU7WUFDNUQsT0FBTztTQUNSO1FBRUQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMxQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN6QixDQUFDO0lBSUQ7OztPQUdHOzs7Ozs7O0lBQ0ssZ0RBQWM7Ozs7OztJQUF0QixVQUF1QixRQUFpQjtRQUN0QyxJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztRQUMxQixJQUFJLFFBQVEsS0FBSyxJQUFJLEVBQUU7WUFDckIsSUFBSSxDQUFDLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUNqRCxJQUFJLElBQUksQ0FBQyxrQkFBa0IsS0FBSyxJQUFJLEVBQUU7Z0JBQ3BDLElBQUksQ0FBQyxNQUFNLENBQUMsdUJBQXVCLENBQUMsY0FBYyxDQUFDLENBQUM7YUFDckQ7U0FDRjthQUFNO1lBQ0wsSUFBSSxDQUFDLFNBQVMsQ0FBQyx1QkFBdUIsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUNwRCxJQUFJLENBQUMsU0FBUyxDQUFDLHVCQUF1QixDQUFDLGNBQWMsQ0FBQyxDQUFDO1NBQ3hEO0lBQ0gsQ0FBQztJQUVEOztPQUVHOzs7Ozs7SUFDSyx3Q0FBTTs7Ozs7SUFBZDtRQUNFLElBQUksSUFBSSxDQUFDLFNBQVMsS0FBSyxJQUFJLEVBQUU7WUFDM0IsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDO2dCQUNuQyxRQUFRLEVBQUUsSUFBSSxDQUFDLGNBQWM7Z0JBQzdCLEtBQUssRUFBRSxRQUFRO2dCQUNmLE1BQU0sRUFBRSxRQUFRO2FBQ2pCLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQztJQUVEOztPQUVHOzs7Ozs7O0lBQ0ssd0NBQU07Ozs7OztJQUFkLFVBQWUsR0FBVztRQUN4QixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBRUQ7O09BRUc7Ozs7Ozs7SUFDSywyQ0FBUzs7Ozs7O0lBQWpCLFVBQWtCLEdBQVc7UUFDM0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDeEQsQ0FBQzs7OztJQTVHTSxtQ0FBVyxHQUFHLCtCQUErQixDQUFDOzs7O0lBSzlDLHNDQUFjLEdBQUcsa0NBQWtDLENBQUM7O2dCQWI1RCxTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLHFCQUFxQjtpQkFDaEM7Ozs7Z0JBYkMsU0FBUztnQkFEVCxVQUFVOzs7NEJBOEJULEtBQUs7Z0NBS0wsS0FBSztxQ0FLTCxLQUFLOzJCQU1MLEtBQUs7aUNBZ0JMLEtBQUs7eUJBTUwsTUFBTTswQkFNTixZQUFZLFNBQUMsT0FBTzs7SUF1RHZCLDhCQUFDO0NBQUEsQUFySEQsSUFxSEM7U0FsSFksdUJBQXVCOzs7Ozs7SUFLbEMsb0NBQXFEOzs7OztJQUtyRCx1Q0FBMkQ7Ozs7O0lBSzNELDRDQUEyQjs7Ozs7SUFLM0IsZ0RBQXVDOzs7OztJQUt2QyxxREFDbUM7Ozs7O0lBZ0JuQyw0Q0FBMEI7Ozs7O0lBSzFCLGlEQUMyRTs7Ozs7SUFLM0UseUNBQStEOzs7OztJQWdCbkQsMkNBQTJCOzs7OztJQUFFLHFDQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgRGlyZWN0aXZlLFxyXG4gIElucHV0LFxyXG4gIEVsZW1lbnRSZWYsXHJcbiAgUmVuZGVyZXIyLFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBPdXRwdXQsXHJcbiAgSG9zdExpc3RlbmVyXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBFbnRpdHlUYWJsZVNjcm9sbEJlaGF2aW9yIH0gZnJvbSAnLi4vc2hhcmVkL2VudGl0eS5lbnVtcyc7XHJcblxyXG4vKipcclxuICogRGlyZWN0aXZlIHRoYXQgaGFuZGxlcyBhbiBlbnRpdHkgdGFibGUgcm93IGNsaWNrIGFuZCBzZWxlY3Rpb24uXHJcbiAqL1xyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ1tpZ29FbnRpdHlUYWJsZVJvd10nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBFbnRpdHlUYWJsZVJvd0RpcmVjdGl2ZSB7XHJcblxyXG4gIC8qKlxyXG4gICAqIENsYXNzIGFkZGVkIHRvIGEgc2VsZWN0ZWQgcm93XHJcbiAgICovXHJcbiAgc3RhdGljIHNlbGVjdGVkQ2xzID0gJ2lnby1lbnRpdHktdGFibGUtcm93LXNlbGVjdGVkJztcclxuXHJcbiAgLyoqXHJcbiAgICogQ2xhc3MgYWRkZWQgdG8gYSBoaWdobGlnaHRlZCByb3dcclxuICAgKi9cclxuICBzdGF0aWMgaGlnaGxpZ2h0ZWRDbHMgPSAnaWdvLWVudGl0eS10YWJsZS1yb3ctaGlnaGxpZ2h0ZWQnO1xyXG5cclxuICAvKipcclxuICAgKiBXaGV0aGVyIGEgcm93IHN1cHBvcnRzIHNlbGVjdGlvblxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHNlbGVjdGlvbiA9IGZhbHNlO1xyXG5cclxuICAvKipcclxuICAgKiBXaGV0aGVyIGNsaWNraW5nIGEgcm93IHNob3VsZCBzZWxlY3QgaXQgKGlmIHNlbGVjdGlvbiBpcyB0cnVlKVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHNlbGVjdE9uQ2xpY2s6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICAvKipcclxuICAgKiBXaGV0aGVyIHRoZSBzZWxlY3RlZCByb3cgc2hvdWxkIGJlIGhpZ2hsaWdodGVkXHJcbiAgICovXHJcbiAgQElucHV0KClcclxuICBoaWdobGlnaHRTZWxlY3Rpb246IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICAvKipcclxuICAgKiBXaGV0aGVyIGEgcm93IGlzIHNlbGVjdGVkXHJcbiAgICovXHJcbiAgQElucHV0KClcclxuICBzZXQgc2VsZWN0ZWQodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgIGlmICh0aGlzLnNlbGVjdGlvbiA9PT0gZmFsc2UpIHsgcmV0dXJuOyB9XHJcbiAgICBpZiAodmFsdWUgPT09IHRoaXMuX3NlbGVjdGVkKSB7IHJldHVybjsgfVxyXG5cclxuICAgIHRoaXMudG9nZ2xlU2VsZWN0ZWQodmFsdWUpO1xyXG4gICAgdGhpcy5zY3JvbGwoKTtcclxuICB9XHJcbiAgZ2V0IHNlbGVjdGVkKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX3NlbGVjdGVkO1xyXG4gIH1cclxuICBwcml2YXRlIF9zZWxlY3RlZCA9IGZhbHNlO1xyXG5cclxuICAvKipcclxuICAgKiBTY3JvbGwgYmVoYXZpb3Igb24gc2VsZWN0aW9uXHJcbiAgICovXHJcbiAgQElucHV0KClcclxuICBzY3JvbGxCZWhhdmlvcjogRW50aXR5VGFibGVTY3JvbGxCZWhhdmlvciA9IEVudGl0eVRhYmxlU2Nyb2xsQmVoYXZpb3IuQXV0bztcclxuXHJcbiAgLyoqXHJcbiAgICogRXZlbnQgZW1pdHRlZCB3aGVuIGEgcm93IGlzIHNlbGVjdGVkXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIHNlbGVjdCA9IG5ldyBFdmVudEVtaXR0ZXI8RW50aXR5VGFibGVSb3dEaXJlY3RpdmU+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZW4gYSByb3cgaXMgY2xpY2tlZCwgc2VsZWN0IGl0IGlmIGl0J3Mgc3VwcG9ydGVkXHJcbiAgICogQGlnbm9yZVxyXG4gICAqL1xyXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJylcclxuICBvbkNsaWNrKCkge1xyXG4gICAgaWYgKHRoaXMuc2VsZWN0aW9uID09PSBmYWxzZSB8fCB0aGlzLnNlbGVjdE9uQ2xpY2sgPT09IGZhbHNlKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnRvZ2dsZVNlbGVjdGVkKHRydWUpO1xyXG4gICAgdGhpcy5zZWxlY3QuZW1pdCh0aGlzKTtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMiwgcHJpdmF0ZSBlbDogRWxlbWVudFJlZikge31cclxuXHJcbiAgLyoqXHJcbiAgICogU2VsZWN0IGEgcm93IGFuZCBhZGQgb3IgcmVtb3ZlIHRoZSBzZWxlY3RlZCBjbGFzcyBmcm9tIGl0XHJcbiAgICogQHBhcmFtIHNlbGVjdGVkIFdoZXRoZXIgdGhlIHJvdyBzaG91bGQgYmUgc2VsZWN0ZWRcclxuICAgKi9cclxuICBwcml2YXRlIHRvZ2dsZVNlbGVjdGVkKHNlbGVjdGVkOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLl9zZWxlY3RlZCA9IHNlbGVjdGVkO1xyXG4gICAgaWYgKHNlbGVjdGVkID09PSB0cnVlKSB7XHJcbiAgICAgIHRoaXMuYWRkQ2xzKEVudGl0eVRhYmxlUm93RGlyZWN0aXZlLnNlbGVjdGVkQ2xzKTtcclxuICAgICAgaWYgKHRoaXMuaGlnaGxpZ2h0U2VsZWN0aW9uID09PSB0cnVlKSB7XHJcbiAgICAgICAgdGhpcy5hZGRDbHMoRW50aXR5VGFibGVSb3dEaXJlY3RpdmUuaGlnaGxpZ2h0ZWRDbHMpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnJlbW92ZUNscyhFbnRpdHlUYWJsZVJvd0RpcmVjdGl2ZS5zZWxlY3RlZENscyk7XHJcbiAgICAgIHRoaXMucmVtb3ZlQ2xzKEVudGl0eVRhYmxlUm93RGlyZWN0aXZlLmhpZ2hsaWdodGVkQ2xzKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNjcm9sbCB0byB0aGUgc2VsZWN0ZWQgcm93XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBzY3JvbGwoKSB7XHJcbiAgICBpZiAodGhpcy5fc2VsZWN0ZWQgPT09IHRydWUpIHtcclxuICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LnNjcm9sbEludG9WaWV3KHtcclxuICAgICAgICBiZWhhdmlvcjogdGhpcy5zY3JvbGxCZWhhdmlvcixcclxuICAgICAgICBibG9jazogJ2NlbnRlcicsXHJcbiAgICAgICAgaW5saW5lOiAnY2VudGVyJ1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZCB0aGUgc2VsZWN0ZWQgQ1NTIGNsYXNzXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBhZGRDbHMoY2xzOiBzdHJpbmcpIHtcclxuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5lbC5uYXRpdmVFbGVtZW50LCBjbHMpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVtb3ZlIHRoZSBzZWxlY3RlZCBDU1MgY2xhc3NcclxuICAgKi9cclxuICBwcml2YXRlIHJlbW92ZUNscyhjbHM6IHN0cmluZykge1xyXG4gICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsIGNscyk7XHJcbiAgfVxyXG59XHJcbiJdfQ==
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, Input, Output, EventEmitter, HostListener, ElementRef, Renderer2 } from '@angular/core';
export class CollapseDirective {
    /**
     * @param {?} renderer
     * @param {?} el
     */
    constructor(renderer, el) {
        this.renderer = renderer;
        this.el = el;
        this._collapsed = false;
        this.toggle = new EventEmitter();
    }
    /**
     * @return {?}
     */
    get target() {
        return this._target;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set target(value) {
        this._target = value;
    }
    /**
     * @return {?}
     */
    get collapsed() {
        return this._collapsed;
    }
    /**
     * @param {?} collapsed
     * @return {?}
     */
    set collapsed(collapsed) {
        collapsed ? this.collapseTarget() : this.expandTarget();
        this._collapsed = collapsed;
        this.toggle.emit(collapsed);
    }
    /**
     * @return {?}
     */
    click() {
        this.collapsed = !this.collapsed;
    }
    /**
     * @private
     * @return {?}
     */
    collapseTarget() {
        this.renderer.addClass(this.target, 'igo-collapsed');
        this.renderer.addClass(this.el.nativeElement, 'collapsed');
    }
    /**
     * @private
     * @return {?}
     */
    expandTarget() {
        this.renderer.removeClass(this.target, 'igo-collapsed');
        this.renderer.removeClass(this.el.nativeElement, 'collapsed');
    }
}
CollapseDirective.decorators = [
    { type: Directive, args: [{
                selector: '[igoCollapse]'
            },] }
];
/** @nocollapse */
CollapseDirective.ctorParameters = () => [
    { type: Renderer2 },
    { type: ElementRef }
];
CollapseDirective.propDecorators = {
    target: [{ type: Input }],
    collapsed: [{ type: Input }],
    toggle: [{ type: Output }],
    click: [{ type: HostListener, args: ['click',] }]
};
if (false) {
    /**
     * @type {?}
     * @private
     */
    CollapseDirective.prototype._target;
    /**
     * @type {?}
     * @private
     */
    CollapseDirective.prototype._collapsed;
    /** @type {?} */
    CollapseDirective.prototype.toggle;
    /**
     * @type {?}
     * @private
     */
    CollapseDirective.prototype.renderer;
    /**
     * @type {?}
     * @private
     */
    CollapseDirective.prototype.el;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sbGFwc2UuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvY29tbW9uLyIsInNvdXJjZXMiOlsibGliL2NvbGxhcHNpYmxlL2NvbGxhcHNlLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFlBQVksRUFDWixZQUFZLEVBQ1osVUFBVSxFQUNWLFNBQVMsRUFDVixNQUFNLGVBQWUsQ0FBQztBQUt2QixNQUFNLE9BQU8saUJBQWlCOzs7OztJQTRCNUIsWUFBb0IsUUFBbUIsRUFBVSxFQUFjO1FBQTNDLGFBQVEsR0FBUixRQUFRLENBQVc7UUFBVSxPQUFFLEdBQUYsRUFBRSxDQUFZO1FBVHZELGVBQVUsR0FBRyxLQUFLLENBQUM7UUFFakIsV0FBTSxHQUEwQixJQUFJLFlBQVksRUFBRSxDQUFDO0lBT0ssQ0FBQzs7OztJQTNCbkUsSUFDSSxNQUFNO1FBQ1IsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3RCLENBQUM7Ozs7O0lBQ0QsSUFBSSxNQUFNLENBQUMsS0FBYztRQUN2QixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztJQUN2QixDQUFDOzs7O0lBR0QsSUFDSSxTQUFTO1FBQ1gsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQ3pCLENBQUM7Ozs7O0lBQ0QsSUFBSSxTQUFTLENBQUMsU0FBa0I7UUFDOUIsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN4RCxJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztRQUM1QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUM5QixDQUFDOzs7O0lBTUQsS0FBSztRQUNILElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ25DLENBQUM7Ozs7O0lBSU8sY0FBYztRQUNwQixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLGVBQWUsQ0FBQyxDQUFDO1FBQ3JELElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBQzdELENBQUM7Ozs7O0lBRU8sWUFBWTtRQUNsQixJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLGVBQWUsQ0FBQyxDQUFDO1FBQ3hELElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBQ2hFLENBQUM7OztZQXpDRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGVBQWU7YUFDMUI7Ozs7WUFMQyxTQUFTO1lBRFQsVUFBVTs7O3FCQVFULEtBQUs7d0JBU0wsS0FBSztxQkFXTCxNQUFNO29CQUVOLFlBQVksU0FBQyxPQUFPOzs7Ozs7O0lBZnJCLG9DQUF5Qjs7Ozs7SUFXekIsdUNBQTJCOztJQUUzQixtQ0FBNkQ7Ozs7O0lBT2pELHFDQUEyQjs7Ozs7SUFBRSwrQkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIERpcmVjdGl2ZSxcclxuICBJbnB1dCxcclxuICBPdXRwdXQsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIEhvc3RMaXN0ZW5lcixcclxuICBFbGVtZW50UmVmLFxyXG4gIFJlbmRlcmVyMlxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbaWdvQ29sbGFwc2VdJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgQ29sbGFwc2VEaXJlY3RpdmUge1xyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IHRhcmdldCgpIHtcclxuICAgIHJldHVybiB0aGlzLl90YXJnZXQ7XHJcbiAgfVxyXG4gIHNldCB0YXJnZXQodmFsdWU6IEVsZW1lbnQpIHtcclxuICAgIHRoaXMuX3RhcmdldCA9IHZhbHVlO1xyXG4gIH1cclxuICBwcml2YXRlIF90YXJnZXQ6IEVsZW1lbnQ7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IGNvbGxhcHNlZCgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLl9jb2xsYXBzZWQ7XHJcbiAgfVxyXG4gIHNldCBjb2xsYXBzZWQoY29sbGFwc2VkOiBib29sZWFuKSB7XHJcbiAgICBjb2xsYXBzZWQgPyB0aGlzLmNvbGxhcHNlVGFyZ2V0KCkgOiB0aGlzLmV4cGFuZFRhcmdldCgpO1xyXG4gICAgdGhpcy5fY29sbGFwc2VkID0gY29sbGFwc2VkO1xyXG4gICAgdGhpcy50b2dnbGUuZW1pdChjb2xsYXBzZWQpO1xyXG4gIH1cclxuICBwcml2YXRlIF9jb2xsYXBzZWQgPSBmYWxzZTtcclxuXHJcbiAgQE91dHB1dCgpIHRvZ2dsZTogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICBASG9zdExpc3RlbmVyKCdjbGljaycpXHJcbiAgY2xpY2soKSB7XHJcbiAgICB0aGlzLmNvbGxhcHNlZCA9ICF0aGlzLmNvbGxhcHNlZDtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMiwgcHJpdmF0ZSBlbDogRWxlbWVudFJlZikge31cclxuXHJcbiAgcHJpdmF0ZSBjb2xsYXBzZVRhcmdldCgpIHtcclxuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy50YXJnZXQsICdpZ28tY29sbGFwc2VkJyk7XHJcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ2NvbGxhcHNlZCcpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBleHBhbmRUYXJnZXQoKSB7XHJcbiAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMudGFyZ2V0LCAnaWdvLWNvbGxhcHNlZCcpO1xyXG4gICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICdjb2xsYXBzZWQnKTtcclxuICB9XHJcbn1cclxuIl19
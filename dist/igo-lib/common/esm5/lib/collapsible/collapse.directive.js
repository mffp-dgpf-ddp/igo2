/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, Input, Output, EventEmitter, HostListener, ElementRef, Renderer2 } from '@angular/core';
var CollapseDirective = /** @class */ (function () {
    function CollapseDirective(renderer, el) {
        this.renderer = renderer;
        this.el = el;
        this._collapsed = false;
        this.toggle = new EventEmitter();
    }
    Object.defineProperty(CollapseDirective.prototype, "target", {
        get: /**
         * @return {?}
         */
        function () {
            return this._target;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._target = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CollapseDirective.prototype, "collapsed", {
        get: /**
         * @return {?}
         */
        function () {
            return this._collapsed;
        },
        set: /**
         * @param {?} collapsed
         * @return {?}
         */
        function (collapsed) {
            collapsed ? this.collapseTarget() : this.expandTarget();
            this._collapsed = collapsed;
            this.toggle.emit(collapsed);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    CollapseDirective.prototype.click = /**
     * @return {?}
     */
    function () {
        this.collapsed = !this.collapsed;
    };
    /**
     * @private
     * @return {?}
     */
    CollapseDirective.prototype.collapseTarget = /**
     * @private
     * @return {?}
     */
    function () {
        this.renderer.addClass(this.target, 'igo-collapsed');
        this.renderer.addClass(this.el.nativeElement, 'collapsed');
    };
    /**
     * @private
     * @return {?}
     */
    CollapseDirective.prototype.expandTarget = /**
     * @private
     * @return {?}
     */
    function () {
        this.renderer.removeClass(this.target, 'igo-collapsed');
        this.renderer.removeClass(this.el.nativeElement, 'collapsed');
    };
    CollapseDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[igoCollapse]'
                },] }
    ];
    /** @nocollapse */
    CollapseDirective.ctorParameters = function () { return [
        { type: Renderer2 },
        { type: ElementRef }
    ]; };
    CollapseDirective.propDecorators = {
        target: [{ type: Input }],
        collapsed: [{ type: Input }],
        toggle: [{ type: Output }],
        click: [{ type: HostListener, args: ['click',] }]
    };
    return CollapseDirective;
}());
export { CollapseDirective };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sbGFwc2UuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvY29tbW9uLyIsInNvdXJjZXMiOlsibGliL2NvbGxhcHNpYmxlL2NvbGxhcHNlLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFlBQVksRUFDWixZQUFZLEVBQ1osVUFBVSxFQUNWLFNBQVMsRUFDVixNQUFNLGVBQWUsQ0FBQztBQUV2QjtJQStCRSwyQkFBb0IsUUFBbUIsRUFBVSxFQUFjO1FBQTNDLGFBQVEsR0FBUixRQUFRLENBQVc7UUFBVSxPQUFFLEdBQUYsRUFBRSxDQUFZO1FBVHZELGVBQVUsR0FBRyxLQUFLLENBQUM7UUFFakIsV0FBTSxHQUEwQixJQUFJLFlBQVksRUFBRSxDQUFDO0lBT0ssQ0FBQztJQTNCbkUsc0JBQ0kscUNBQU07Ozs7UUFEVjtZQUVFLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUN0QixDQUFDOzs7OztRQUNELFVBQVcsS0FBYztZQUN2QixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUN2QixDQUFDOzs7T0FIQTtJQU1ELHNCQUNJLHdDQUFTOzs7O1FBRGI7WUFFRSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDekIsQ0FBQzs7Ozs7UUFDRCxVQUFjLFNBQWtCO1lBQzlCLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7WUFDeEQsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7WUFDNUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDOUIsQ0FBQzs7O09BTEE7Ozs7SUFXRCxpQ0FBSzs7O0lBREw7UUFFRSxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUNuQyxDQUFDOzs7OztJQUlPLDBDQUFjOzs7O0lBQXRCO1FBQ0UsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxlQUFlLENBQUMsQ0FBQztRQUNyRCxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxXQUFXLENBQUMsQ0FBQztJQUM3RCxDQUFDOzs7OztJQUVPLHdDQUFZOzs7O0lBQXBCO1FBQ0UsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxlQUFlLENBQUMsQ0FBQztRQUN4RCxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxXQUFXLENBQUMsQ0FBQztJQUNoRSxDQUFDOztnQkF6Q0YsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxlQUFlO2lCQUMxQjs7OztnQkFMQyxTQUFTO2dCQURULFVBQVU7Ozt5QkFRVCxLQUFLOzRCQVNMLEtBQUs7eUJBV0wsTUFBTTt3QkFFTixZQUFZLFNBQUMsT0FBTzs7SUFnQnZCLHdCQUFDO0NBQUEsQUExQ0QsSUEwQ0M7U0F2Q1ksaUJBQWlCOzs7Ozs7SUFRNUIsb0NBQXlCOzs7OztJQVd6Qix1Q0FBMkI7O0lBRTNCLG1DQUE2RDs7Ozs7SUFPakQscUNBQTJCOzs7OztJQUFFLCtCQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgRGlyZWN0aXZlLFxyXG4gIElucHV0LFxyXG4gIE91dHB1dCxcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgSG9zdExpc3RlbmVyLFxyXG4gIEVsZW1lbnRSZWYsXHJcbiAgUmVuZGVyZXIyXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ1tpZ29Db2xsYXBzZV0nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDb2xsYXBzZURpcmVjdGl2ZSB7XHJcbiAgQElucHV0KClcclxuICBnZXQgdGFyZ2V0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX3RhcmdldDtcclxuICB9XHJcbiAgc2V0IHRhcmdldCh2YWx1ZTogRWxlbWVudCkge1xyXG4gICAgdGhpcy5fdGFyZ2V0ID0gdmFsdWU7XHJcbiAgfVxyXG4gIHByaXZhdGUgX3RhcmdldDogRWxlbWVudDtcclxuXHJcbiAgQElucHV0KClcclxuICBnZXQgY29sbGFwc2VkKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX2NvbGxhcHNlZDtcclxuICB9XHJcbiAgc2V0IGNvbGxhcHNlZChjb2xsYXBzZWQ6IGJvb2xlYW4pIHtcclxuICAgIGNvbGxhcHNlZCA/IHRoaXMuY29sbGFwc2VUYXJnZXQoKSA6IHRoaXMuZXhwYW5kVGFyZ2V0KCk7XHJcbiAgICB0aGlzLl9jb2xsYXBzZWQgPSBjb2xsYXBzZWQ7XHJcbiAgICB0aGlzLnRvZ2dsZS5lbWl0KGNvbGxhcHNlZCk7XHJcbiAgfVxyXG4gIHByaXZhdGUgX2NvbGxhcHNlZCA9IGZhbHNlO1xyXG5cclxuICBAT3V0cHV0KCkgdG9nZ2xlOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJylcclxuICBjbGljaygpIHtcclxuICAgIHRoaXMuY29sbGFwc2VkID0gIXRoaXMuY29sbGFwc2VkO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLCBwcml2YXRlIGVsOiBFbGVtZW50UmVmKSB7fVxyXG5cclxuICBwcml2YXRlIGNvbGxhcHNlVGFyZ2V0KCkge1xyXG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLnRhcmdldCwgJ2lnby1jb2xsYXBzZWQnKTtcclxuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnY29sbGFwc2VkJyk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGV4cGFuZFRhcmdldCgpIHtcclxuICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy50YXJnZXQsICdpZ28tY29sbGFwc2VkJyk7XHJcbiAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ2NvbGxhcHNlZCcpO1xyXG4gIH1cclxufVxyXG4iXX0=
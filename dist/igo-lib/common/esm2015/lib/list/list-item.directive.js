/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, Input, Output, ElementRef, Renderer2, HostListener, EventEmitter } from '@angular/core';
export class ListItemDirective {
    /**
     * @param {?} renderer
     * @param {?} el
     */
    constructor(renderer, el) {
        this.renderer = renderer;
        this.el = el;
        this._color = 'primary';
        this._focused = false;
        this._selected = false;
        this._disabled = false;
        this.beforeSelect = new EventEmitter();
        this.beforeFocus = new EventEmitter();
        this.beforeUnselect = new EventEmitter();
        this.beforeUnfocus = new EventEmitter();
        this.beforeDisable = new EventEmitter();
        this.beforeEnable = new EventEmitter();
        this.focus = new EventEmitter();
        this.unfocus = new EventEmitter();
        this.select = new EventEmitter();
        this.unselect = new EventEmitter();
        this.disable = new EventEmitter();
        this.enable = new EventEmitter();
    }
    /**
     * @return {?}
     */
    get color() {
        return this._color;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set color(value) {
        this._color = value;
    }
    /**
     * @return {?}
     */
    get focused() {
        return this._focused;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set focused(value) {
        if (value === this._focused) {
            return;
        }
        if (this.disabled) {
            return;
        }
        value ? this.beforeFocus.emit(this) : this.beforeUnfocus.emit(this);
        this._focused = value;
        this.toggleSelectedClass();
        value ? this.focus.emit(this) : this.unfocus.emit(this);
    }
    /**
     * @return {?}
     */
    get selected() {
        return this._selected;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set selected(value) {
        if (value === this._selected) {
            return;
        }
        if (this.disabled) {
            return;
        }
        value ? this.beforeSelect.emit(this) : this.beforeUnselect.emit(this);
        this._selected = value;
        this._focused = value;
        this.toggleSelectedClass();
        value ? this.select.emit(this) : this.unselect.emit(this);
    }
    /**
     * @return {?}
     */
    get disabled() {
        return this._disabled;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set disabled(value) {
        if (value === this._disabled) {
            return;
        }
        if (value === true) {
            this.selected = false;
        }
        value ? this.beforeDisable.emit(this) : this.beforeEnable.emit(this);
        this._disabled = value;
        this.toggleDisabledClass();
        value ? this.disable.emit(this) : this.enable.emit(this);
    }
    /**
     * @return {?}
     */
    onClick() {
        this.selected = true;
    }
    /**
     * @return {?}
     */
    getOffsetTop() {
        /** @type {?} */
        const padding = 5;
        return this.el.nativeElement.offsetTop - padding;
    }
    /**
     * @private
     * @return {?}
     */
    toggleSelectedClass() {
        if (this.focused || this.selected) {
            this.addCls(ListItemDirective.selectedCls);
        }
        else {
            this.removeCls(ListItemDirective.selectedCls);
        }
    }
    /**
     * @private
     * @return {?}
     */
    toggleDisabledClass() {
        if (this.disabled) {
            this.addCls(ListItemDirective.disabledCls);
        }
        else {
            this.removeCls(ListItemDirective.disabledCls);
        }
    }
    /**
     * @private
     * @param {?} cls
     * @return {?}
     */
    addCls(cls) {
        this.renderer.addClass(this.el.nativeElement, cls);
    }
    /**
     * @private
     * @param {?} cls
     * @return {?}
     */
    removeCls(cls) {
        this.renderer.removeClass(this.el.nativeElement, cls);
    }
}
ListItemDirective.selectedCls = 'igo-list-item-selected';
ListItemDirective.disabledCls = 'igo-list-item-disabled';
ListItemDirective.decorators = [
    { type: Directive, args: [{
                selector: '[igoListItem]'
            },] }
];
/** @nocollapse */
ListItemDirective.ctorParameters = () => [
    { type: Renderer2 },
    { type: ElementRef }
];
ListItemDirective.propDecorators = {
    color: [{ type: Input }],
    focused: [{ type: Input }],
    selected: [{ type: Input }],
    disabled: [{ type: Input }],
    beforeSelect: [{ type: Output }],
    beforeFocus: [{ type: Output }],
    beforeUnselect: [{ type: Output }],
    beforeUnfocus: [{ type: Output }],
    beforeDisable: [{ type: Output }],
    beforeEnable: [{ type: Output }],
    focus: [{ type: Output }],
    unfocus: [{ type: Output }],
    select: [{ type: Output }],
    unselect: [{ type: Output }],
    disable: [{ type: Output }],
    enable: [{ type: Output }],
    onClick: [{ type: HostListener, args: ['click',] }]
};
if (false) {
    /** @type {?} */
    ListItemDirective.selectedCls;
    /** @type {?} */
    ListItemDirective.disabledCls;
    /**
     * @type {?}
     * @private
     */
    ListItemDirective.prototype._color;
    /**
     * @type {?}
     * @private
     */
    ListItemDirective.prototype._focused;
    /**
     * @type {?}
     * @private
     */
    ListItemDirective.prototype._selected;
    /**
     * @type {?}
     * @private
     */
    ListItemDirective.prototype._disabled;
    /** @type {?} */
    ListItemDirective.prototype.beforeSelect;
    /** @type {?} */
    ListItemDirective.prototype.beforeFocus;
    /** @type {?} */
    ListItemDirective.prototype.beforeUnselect;
    /** @type {?} */
    ListItemDirective.prototype.beforeUnfocus;
    /** @type {?} */
    ListItemDirective.prototype.beforeDisable;
    /** @type {?} */
    ListItemDirective.prototype.beforeEnable;
    /** @type {?} */
    ListItemDirective.prototype.focus;
    /** @type {?} */
    ListItemDirective.prototype.unfocus;
    /** @type {?} */
    ListItemDirective.prototype.select;
    /** @type {?} */
    ListItemDirective.prototype.unselect;
    /** @type {?} */
    ListItemDirective.prototype.disable;
    /** @type {?} */
    ListItemDirective.prototype.enable;
    /** @type {?} */
    ListItemDirective.prototype.renderer;
    /**
     * @type {?}
     * @private
     */
    ListItemDirective.prototype.el;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1pdGVtLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2NvbW1vbi8iLCJzb3VyY2VzIjpbImxpYi9saXN0L2xpc3QtaXRlbS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFDTixVQUFVLEVBQ1YsU0FBUyxFQUNULFlBQVksRUFDWixZQUFZLEVBQ2IsTUFBTSxlQUFlLENBQUM7QUFLdkIsTUFBTSxPQUFPLGlCQUFpQjs7Ozs7SUFpRzVCLFlBQW1CLFFBQW1CLEVBQVUsRUFBYztRQUEzQyxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQVUsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQXJGdEQsV0FBTSxHQUFHLFNBQVMsQ0FBQztRQXFCbkIsYUFBUSxHQUFHLEtBQUssQ0FBQztRQXNCakIsY0FBUyxHQUFHLEtBQUssQ0FBQztRQXNCbEIsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUVoQixpQkFBWSxHQUFHLElBQUksWUFBWSxFQUFxQixDQUFDO1FBQ3JELGdCQUFXLEdBQUcsSUFBSSxZQUFZLEVBQXFCLENBQUM7UUFDcEQsbUJBQWMsR0FBRyxJQUFJLFlBQVksRUFBcUIsQ0FBQztRQUN2RCxrQkFBYSxHQUFHLElBQUksWUFBWSxFQUFxQixDQUFDO1FBQ3RELGtCQUFhLEdBQUcsSUFBSSxZQUFZLEVBQXFCLENBQUM7UUFDdEQsaUJBQVksR0FBRyxJQUFJLFlBQVksRUFBcUIsQ0FBQztRQUNyRCxVQUFLLEdBQUcsSUFBSSxZQUFZLEVBQXFCLENBQUM7UUFDOUMsWUFBTyxHQUFHLElBQUksWUFBWSxFQUFxQixDQUFDO1FBQ2hELFdBQU0sR0FBRyxJQUFJLFlBQVksRUFBcUIsQ0FBQztRQUMvQyxhQUFRLEdBQUcsSUFBSSxZQUFZLEVBQXFCLENBQUM7UUFDakQsWUFBTyxHQUFHLElBQUksWUFBWSxFQUFxQixDQUFDO1FBQ2hELFdBQU0sR0FBRyxJQUFJ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QWNULEtBQUs7c0JBU0wsS0FBSzt1QkFxQkwsS0FBSzt1QkFzQkwsS0FBSzsyQkFzQkwsTUFBTTswQkFDTixNQUFNOzZCQUNOLE1BQU07NEJBQ04sTUFBTTs0QkFDTixNQUFNOzJCQUNOLE1BQU07b0JBQ04sTUFBTTtzQkFDTixNQUFNO3FCQUNOLE1BQU07dUJBQ04sTUFBTTtzQkFDTixNQUFNO3FCQUNOLE1BQU07c0JBRU4sWUFBWSxTQUFDLE9BQU87Ozs7SUExRnJCLDhCQUE4Qzs7SUFDOUMsOEJBQThDOzs7OztJQVM5QyxtQ0FBMkI7Ozs7O0lBcUIzQixxQ0FBeUI7Ozs7O0lBc0J6QixzQ0FBMEI7Ozs7O0lBc0IxQixzQ0FBMEI7O0lBRTFCLHlDQUErRDs7SUFDL0Qsd0NBQThEOztJQUM5RCwyQ0FBaUU7O0lBQ2pFLDBDQUFnRTs7SUFDaEUsMENBQWdFOztJQUNoRSx5Q0FBK0Q7O0lBQy9ELGtDQUF3RDs7SUFDeEQsb0NBQTBEOztJQUMxRCxtQ0FBeUQ7O0lBQ3pELHFDQUEyRDs7SUFDM0Qsb0NBQTBEOztJQUMxRCxtQ0FBeUQ7O0lBTzdDLHFDQUEwQjs7Ozs7SUFBRSwrQkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIERpcmVjdGl2ZSxcclxuICBJbnB1dCxcclxuICBPdXRwdXQsXHJcbiAgRWxlbWVudFJlZixcclxuICBSZW5kZXJlcjIsXHJcbiAgSG9zdExpc3RlbmVyLFxyXG4gIEV2ZW50RW1pdHRlclxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbaWdvTGlzdEl0ZW1dJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgTGlzdEl0ZW1EaXJlY3RpdmUge1xyXG5cclxuICBzdGF0aWMgc2VsZWN0ZWRDbHMgPSAnaWdvLWxpc3QtaXRlbS1zZWxlY3RlZCc7XHJcbiAgc3RhdGljIGRpc2FibGVkQ2xzID0gJ2lnby1saXN0LWl0ZW0tZGlzYWJsZWQnO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIGdldCBjb2xvcigpIHtcclxuICAgIHJldHVybiB0aGlzLl9jb2xvcjtcclxuICB9XHJcbiAgc2V0IGNvbG9yKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuX2NvbG9yID0gdmFsdWU7XHJcbiAgfVxyXG4gIHByaXZhdGUgX2NvbG9yID0gJ3ByaW1hcnknO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIGdldCBmb2N1c2VkKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2ZvY3VzZWQ7XHJcbiAgfVxyXG4gIHNldCBmb2N1c2VkKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICBpZiAodmFsdWUgPT09IHRoaXMuX2ZvY3VzZWQpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHZhbHVlID8gdGhpcy5iZWZvcmVGb2N1cy5lbWl0KHRoaXMpIDogdGhpcy5iZWZvcmVVbmZvY3VzLmVtaXQodGhpcyk7XHJcblxyXG4gICAgdGhpcy5fZm9jdXNlZCA9IHZhbHVlO1xyXG4gICAgdGhpcy50b2dnbGVTZWxlY3RlZENsYXNzKCk7XHJcblxyXG4gICAgdmFsdWUgPyB0aGlzLmZvY3VzLmVtaXQodGhpcykgOiB0aGlzLnVuZm9jdXMuZW1pdCh0aGlzKTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfZm9jdXNlZCA9IGZhbHNlO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIGdldCBzZWxlY3RlZCgpIHtcclxuICAgIHJldHVybiB0aGlzLl9zZWxlY3RlZDtcclxuICB9XHJcbiAgc2V0IHNlbGVjdGVkKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICBpZiAodmFsdWUgPT09IHRoaXMuX3NlbGVjdGVkKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB2YWx1ZSA/IHRoaXMuYmVmb3JlU2VsZWN0LmVtaXQodGhpcykgOiB0aGlzLmJlZm9yZVVuc2VsZWN0LmVtaXQodGhpcyk7XHJcblxyXG4gICAgdGhpcy5fc2VsZWN0ZWQgPSB2YWx1ZTtcclxuICAgIHRoaXMuX2ZvY3VzZWQgPSB2YWx1ZTtcclxuICAgIHRoaXMudG9nZ2xlU2VsZWN0ZWRDbGFzcygpO1xyXG5cclxuICAgIHZhbHVlID8gdGhpcy5zZWxlY3QuZW1pdCh0aGlzKSA6IHRoaXMudW5zZWxlY3QuZW1pdCh0aGlzKTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfc2VsZWN0ZWQgPSBmYWxzZTtcclxuXHJcbiAgQElucHV0KClcclxuICBnZXQgZGlzYWJsZWQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWQ7XHJcbiAgfVxyXG4gIHNldCBkaXNhYmxlZCh2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgaWYgKHZhbHVlID09PSB0aGlzLl9kaXNhYmxlZCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHZhbHVlID09PSB0cnVlKSB7XHJcbiAgICAgIHRoaXMuc2VsZWN0ZWQgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICB2YWx1ZSA/IHRoaXMuYmVmb3JlRGlzYWJsZS5lbWl0KHRoaXMpIDogdGhpcy5iZWZvcmVFbmFibGUuZW1pdCh0aGlzKTtcclxuXHJcbiAgICB0aGlzLl9kaXNhYmxlZCA9IHZhbHVlO1xyXG4gICAgdGhpcy50b2dnbGVEaXNhYmxlZENsYXNzKCk7XHJcblxyXG4gICAgdmFsdWUgPyB0aGlzLmRpc2FibGUuZW1pdCh0aGlzKSA6IHRoaXMuZW5hYmxlLmVtaXQodGhpcyk7XHJcbiAgfVxyXG4gIHByaXZhdGUgX2Rpc2FibGVkID0gZmFsc2U7XHJcblxyXG4gIEBPdXRwdXQoKSBiZWZvcmVTZWxlY3QgPSBuZXcgRXZlbnRFbWl0dGVyPExpc3RJdGVtRGlyZWN0aXZlPigpO1xyXG4gIEBPdXRwdXQoKSBiZWZvcmVGb2N1cyA9IG5ldyBFdmVudEVtaXR0ZXI8TGlzdEl0ZW1EaXJlY3RpdmU+KCk7XHJcbiAgQE91dHB1dCgpIGJlZm9yZVVuc2VsZWN0ID0gbmV3IEV2ZW50RW1pdHRlcjxMaXN0SXRlbURpcmVjdGl2ZT4oKTtcclxuICBAT3V0cHV0KCkgYmVmb3JlVW5mb2N1cyA9IG5ldyBFdmVudEVtaXR0ZXI8TGlzdEl0ZW1EaXJlY3RpdmU+KCk7XHJcbiAgQE91dHB1dCgpIGJlZm9yZURpc2FibGUgPSBuZXcgRXZlbnRFbWl0dGVyPExpc3RJdGVtRGlyZWN0aXZlPigpO1xyXG4gIEBPdXRwdXQoKSBiZWZvcmVFbmFibGUgPSBuZXcgRXZlbnRFbWl0dGVyPExpc3RJdGVtRGlyZWN0aXZlPigpO1xyXG4gIEBPdXRwdXQoKSBmb2N1cyA9IG5ldyBFdmVudEVtaXR0ZXI8TGlzdEl0ZW1EaXJlY3RpdmU+KCk7XHJcbiAgQE91dHB1dCgpIHVuZm9jdXMgPSBuZXcgRXZlbnRFbWl0dGVyPExpc3RJdGVtRGlyZWN0aXZlPigpO1xyXG4gIEBPdXRwdXQoKSBzZWxlY3QgPSBuZXcgRXZlbnRFbWl0dGVyPExpc3RJdGVtRGlyZWN0aXZlPigpO1xyXG4gIEBPdXRwdXQoKSB1bnNlbGVjdCA9IG5ldyBFdmVudEVtaXR0ZXI8TGlzdEl0ZW1EaXJlY3RpdmU+KCk7XHJcbiAgQE91dHB1dCgpIGRpc2FibGUgPSBuZXcgRXZlbnRFbWl0dGVyPExpc3RJdGVtRGlyZWN0aXZlPigpO1xyXG4gIEBPdXRwdXQoKSBlbmFibGUgPSBuZXcgRXZlbnRFbWl0dGVyPExpc3RJdGVtRGlyZWN0aXZlPigpO1xyXG5cclxuICBASG9zdExpc3RlbmVyKCdjbGljaycpXHJcbiAgb25DbGljaygpIHtcclxuICAgIHRoaXMuc2VsZWN0ZWQgPSB0cnVlO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IocHVibGljIHJlbmRlcmVyOiBSZW5kZXJlcjIsIHByaXZhdGUgZWw6IEVsZW1lbnRSZWYpIHt9XHJcblxyXG4gIGdldE9mZnNldFRvcCgpOiBudW1iZXIge1xyXG4gICAgY29uc3QgcGFkZGluZyA9IDU7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuZWwubmF0aXZlRWxlbWVudC5vZmZzZXRUb3AgLSBwYWRkaW5nO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSB0b2dnbGVTZWxlY3RlZENsYXNzKCkge1xyXG4gICAgaWYgKHRoaXMuZm9jdXNlZCB8fCB0aGlzLnNlbGVjdGVkKSB7XHJcbiAgICAgIHRoaXMuYWRkQ2xzKExpc3RJdGVtRGlyZWN0aXZlLnNlbGVjdGVkQ2xzKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMucmVtb3ZlQ2xzKExpc3RJdGVtRGlyZWN0aXZlLnNlbGVjdGVkQ2xzKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgdG9nZ2xlRGlzYWJsZWRDbGFzcygpIHtcclxuICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XHJcbiAgICAgIHRoaXMuYWRkQ2xzKExpc3RJdGVtRGlyZWN0aXZlLmRpc2FibGVkQ2xzKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMucmVtb3ZlQ2xzKExpc3RJdGVtRGlyZWN0aXZlLmRpc2FibGVkQ2xzKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgYWRkQ2xzKGNsczogc3RyaW5nKSB7XHJcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgY2xzKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgcmVtb3ZlQ2xzKGNsczogc3RyaW5nKSB7XHJcbiAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgY2xzKTtcclxuICB9XHJcbn1cclxuIl19
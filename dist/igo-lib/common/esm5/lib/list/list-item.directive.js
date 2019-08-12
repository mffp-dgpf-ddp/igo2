/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, Input, Output, ElementRef, Renderer2, HostListener, EventEmitter } from '@angular/core';
var ListItemDirective = /** @class */ (function () {
    function ListItemDirective(renderer, el) {
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
    Object.defineProperty(ListItemDirective.prototype, "color", {
        get: /**
         * @return {?}
         */
        function () {
            return this._color;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._color = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListItemDirective.prototype, "focused", {
        get: /**
         * @return {?}
         */
        function () {
            return this._focused;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
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
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListItemDirective.prototype, "selected", {
        get: /**
         * @return {?}
         */
        function () {
            return this._selected;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
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
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListItemDirective.prototype, "disabled", {
        get: /**
         * @return {?}
         */
        function () {
            return this._disabled;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
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
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ListItemDirective.prototype.onClick = /**
     * @return {?}
     */
    function () {
        this.selected = true;
    };
    /**
     * @return {?}
     */
    ListItemDirective.prototype.getOffsetTop = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var padding = 5;
        return this.el.nativeElement.offsetTop - padding;
    };
    /**
     * @private
     * @return {?}
     */
    ListItemDirective.prototype.toggleSelectedClass = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.focused || this.selected) {
            this.addCls(ListItemDirective.selectedCls);
        }
        else {
            this.removeCls(ListItemDirective.selectedCls);
        }
    };
    /**
     * @private
     * @return {?}
     */
    ListItemDirective.prototype.toggleDisabledClass = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.disabled) {
            this.addCls(ListItemDirective.disabledCls);
        }
        else {
            this.removeCls(ListItemDirective.disabledCls);
        }
    };
    /**
     * @private
     * @param {?} cls
     * @return {?}
     */
    ListItemDirective.prototype.addCls = /**
     * @private
     * @param {?} cls
     * @return {?}
     */
    function (cls) {
        this.renderer.addClass(this.el.nativeElement, cls);
    };
    /**
     * @private
     * @param {?} cls
     * @return {?}
     */
    ListItemDirective.prototype.removeCls = /**
     * @private
     * @param {?} cls
     * @return {?}
     */
    function (cls) {
        this.renderer.removeClass(this.el.nativeElement, cls);
    };
    ListItemDirective.selectedCls = 'igo-list-item-selected';
    ListItemDirective.disabledCls = 'igo-list-item-disabled';
    ListItemDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[igoListItem]'
                },] }
    ];
    /** @nocollapse */
    ListItemDirective.ctorParameters = function () { return [
        { type: Renderer2 },
        { type: ElementRef }
    ]; };
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
    return ListItemDirective;
}());
export { ListItemDirective };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1pdGVtLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2NvbW1vbi8iLCJzb3VyY2VzIjpbImxpYi9saXN0L2xpc3QtaXRlbS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFDTixVQUFVLEVBQ1YsU0FBUyxFQUNULFlBQVksRUFDWixZQUFZLEVBQ2IsTUFBTSxlQUFlLENBQUM7QUFFdkI7SUFvR0UsMkJBQW1CLFFBQW1CLEVBQVUsRUFBYztRQUEzQyxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQVUsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQXJGdEQsV0FBTSxHQUFHLFNBQVMsQ0FBQztRQXFCbkIsYUFBUSxHQUFHLEtBQUssQ0FBQztRQXNCakIsY0FBUyxHQUFHLEtBQUssQ0FBQztRQXNCbEIsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUVoQixpQkFBWSxHQUFHLElBQUksWUFBWSxFQUFxQixDQUFDO1FBQ3JELGdCQUFXLEdBQUcsSUFBSSxZQUFZLEVBQXFCLENBQUM7UUFDcEQsbUJBQWMsR0FBRyxJQUFJLFlBQVksRUFBcUIsQ0FBQztRQUN2RCxrQkFBYSxHQUFHLElBQUksWUFBWSxFQUFxQixDQUFDO1FBQ3RELGtCQUFhLEdBQUcsSUFBSSxZQUFZLEVBQXFCLENBQUM7UUFDdEQsaUJBQVksR0FBRyxJQUFJLFlBQVksRUFBcUIsQ0FBQztRQUNyRCxVQUFLLEdBQUcsSUFBSSxZQUFZLEVBQXFCLENBQUM7UUFDOUMsWUFBTyxHQUFHLElBQUksWUFBWSxFQUFxQixDQUFDO1FBQ2hELFdBQU0sR0FBRyxJQUFJLFlBQVksRUFBcUIsQ0FBQztRQUMvQyxhQUFRLEdBQUcsSUFBSSxZQUFZLEVBQXFCLENBQUM7UUFDakQsWUFBTyxHQUFHLElBQUksWUFBWSxFQUFxQixDQUFDO1FBQ2hELFdBQU0sR0FBRyxJQUFJLFlBQVksRUFBcUIsQ0FBQztJQU9R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U0FBQztvQkFDVCxRQUFRLEVBQUUsZUFBZTtpQkFDMUI7Ozs7Z0JBUEMsU0FBUztnQkFEVCxVQUFVOzs7d0JBY1QsS0FBSzswQkFTTCxLQUFLOzJCQXFCTCxLQUFLOzJCQXNCTCxLQUFLOytCQXNCTCxNQUFNOzhCQUNOLE1BQU07aUNBQ04sTUFBTTtnQ0FDTixNQUFNO2dDQUNOLE1BQU07K0JBQ04sTUFBTTt3QkFDTixNQUFNOzBCQUNOLE1BQU07eUJBQ04sTUFBTTsyQkFDTixNQUFNOzBCQUNOLE1BQU07eUJBQ04sTUFBTTswQkFFTixZQUFZLFNBQUMsT0FBTzs7SUFvQ3ZCLHdCQUFDO0NBQUEsQUFuSUQsSUFtSUM7U0FoSVksaUJBQWlCOzs7SUFFNUIsOEJBQThDOztJQUM5Qyw4QkFBOEM7Ozs7O0lBUzlDLG1DQUEyQjs7Ozs7SUFxQjNCLHFDQUF5Qjs7Ozs7SUFzQnpCLHNDQUEwQjs7Ozs7SUFzQjFCLHNDQUEwQjs7SUFFMUIseUNBQStEOztJQUMvRCx3Q0FBOEQ7O0lBQzlELDJDQUFpRTs7SUFDakUsMENBQWdFOztJQUNoRSwwQ0FBZ0U7O0lBQ2hFLHlDQUErRDs7SUFDL0Qsa0NBQXdEOztJQUN4RCxvQ0FBMEQ7O0lBQzFELG1DQUF5RDs7SUFDekQscUNBQTJEOztJQUMzRCxvQ0FBMEQ7O0lBQzFELG1DQUF5RDs7SUFPN0MscUNBQTBCOzs7OztJQUFFLCtCQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgRGlyZWN0aXZlLFxyXG4gIElucHV0LFxyXG4gIE91dHB1dCxcclxuICBFbGVtZW50UmVmLFxyXG4gIFJlbmRlcmVyMixcclxuICBIb3N0TGlzdGVuZXIsXHJcbiAgRXZlbnRFbWl0dGVyXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ1tpZ29MaXN0SXRlbV0nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBMaXN0SXRlbURpcmVjdGl2ZSB7XHJcblxyXG4gIHN0YXRpYyBzZWxlY3RlZENscyA9ICdpZ28tbGlzdC1pdGVtLXNlbGVjdGVkJztcclxuICBzdGF0aWMgZGlzYWJsZWRDbHMgPSAnaWdvLWxpc3QtaXRlbS1kaXNhYmxlZCc7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IGNvbG9yKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2NvbG9yO1xyXG4gIH1cclxuICBzZXQgY29sb3IodmFsdWU6IHN0cmluZykge1xyXG4gICAgdGhpcy5fY29sb3IgPSB2YWx1ZTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfY29sb3IgPSAncHJpbWFyeSc7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IGZvY3VzZWQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fZm9jdXNlZDtcclxuICB9XHJcbiAgc2V0IGZvY3VzZWQodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgIGlmICh2YWx1ZSA9PT0gdGhpcy5fZm9jdXNlZCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdmFsdWUgPyB0aGlzLmJlZm9yZUZvY3VzLmVtaXQodGhpcykgOiB0aGlzLmJlZm9yZVVuZm9jdXMuZW1pdCh0aGlzKTtcclxuXHJcbiAgICB0aGlzLl9mb2N1c2VkID0gdmFsdWU7XHJcbiAgICB0aGlzLnRvZ2dsZVNlbGVjdGVkQ2xhc3MoKTtcclxuXHJcbiAgICB2YWx1ZSA/IHRoaXMuZm9jdXMuZW1pdCh0aGlzKSA6IHRoaXMudW5mb2N1cy5lbWl0KHRoaXMpO1xyXG4gIH1cclxuICBwcml2YXRlIF9mb2N1c2VkID0gZmFsc2U7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IHNlbGVjdGVkKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX3NlbGVjdGVkO1xyXG4gIH1cclxuICBzZXQgc2VsZWN0ZWQodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgIGlmICh2YWx1ZSA9PT0gdGhpcy5fc2VsZWN0ZWQpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHZhbHVlID8gdGhpcy5iZWZvcmVTZWxlY3QuZW1pdCh0aGlzKSA6IHRoaXMuYmVmb3JlVW5zZWxlY3QuZW1pdCh0aGlzKTtcclxuXHJcbiAgICB0aGlzLl9zZWxlY3RlZCA9IHZhbHVlO1xyXG4gICAgdGhpcy5fZm9jdXNlZCA9IHZhbHVlO1xyXG4gICAgdGhpcy50b2dnbGVTZWxlY3RlZENsYXNzKCk7XHJcblxyXG4gICAgdmFsdWUgPyB0aGlzLnNlbGVjdC5lbWl0KHRoaXMpIDogdGhpcy51bnNlbGVjdC5lbWl0KHRoaXMpO1xyXG4gIH1cclxuICBwcml2YXRlIF9zZWxlY3RlZCA9IGZhbHNlO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIGdldCBkaXNhYmxlZCgpIHtcclxuICAgIHJldHVybiB0aGlzLl9kaXNhYmxlZDtcclxuICB9XHJcbiAgc2V0IGRpc2FibGVkKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICBpZiAodmFsdWUgPT09IHRoaXMuX2Rpc2FibGVkKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodmFsdWUgPT09IHRydWUpIHtcclxuICAgICAgdGhpcy5zZWxlY3RlZCA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHZhbHVlID8gdGhpcy5iZWZvcmVEaXNhYmxlLmVtaXQodGhpcykgOiB0aGlzLmJlZm9yZUVuYWJsZS5lbWl0KHRoaXMpO1xyXG5cclxuICAgIHRoaXMuX2Rpc2FibGVkID0gdmFsdWU7XHJcbiAgICB0aGlzLnRvZ2dsZURpc2FibGVkQ2xhc3MoKTtcclxuXHJcbiAgICB2YWx1ZSA/IHRoaXMuZGlzYWJsZS5lbWl0KHRoaXMpIDogdGhpcy5lbmFibGUuZW1pdCh0aGlzKTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfZGlzYWJsZWQgPSBmYWxzZTtcclxuXHJcbiAgQE91dHB1dCgpIGJlZm9yZVNlbGVjdCA9IG5ldyBFdmVudEVtaXR0ZXI8TGlzdEl0ZW1EaXJlY3RpdmU+KCk7XHJcbiAgQE91dHB1dCgpIGJlZm9yZUZvY3VzID0gbmV3IEV2ZW50RW1pdHRlcjxMaXN0SXRlbURpcmVjdGl2ZT4oKTtcclxuICBAT3V0cHV0KCkgYmVmb3JlVW5zZWxlY3QgPSBuZXcgRXZlbnRFbWl0dGVyPExpc3RJdGVtRGlyZWN0aXZlPigpO1xyXG4gIEBPdXRwdXQoKSBiZWZvcmVVbmZvY3VzID0gbmV3IEV2ZW50RW1pdHRlcjxMaXN0SXRlbURpcmVjdGl2ZT4oKTtcclxuICBAT3V0cHV0KCkgYmVmb3JlRGlzYWJsZSA9IG5ldyBFdmVudEVtaXR0ZXI8TGlzdEl0ZW1EaXJlY3RpdmU+KCk7XHJcbiAgQE91dHB1dCgpIGJlZm9yZUVuYWJsZSA9IG5ldyBFdmVudEVtaXR0ZXI8TGlzdEl0ZW1EaXJlY3RpdmU+KCk7XHJcbiAgQE91dHB1dCgpIGZvY3VzID0gbmV3IEV2ZW50RW1pdHRlcjxMaXN0SXRlbURpcmVjdGl2ZT4oKTtcclxuICBAT3V0cHV0KCkgdW5mb2N1cyA9IG5ldyBFdmVudEVtaXR0ZXI8TGlzdEl0ZW1EaXJlY3RpdmU+KCk7XHJcbiAgQE91dHB1dCgpIHNlbGVjdCA9IG5ldyBFdmVudEVtaXR0ZXI8TGlzdEl0ZW1EaXJlY3RpdmU+KCk7XHJcbiAgQE91dHB1dCgpIHVuc2VsZWN0ID0gbmV3IEV2ZW50RW1pdHRlcjxMaXN0SXRlbURpcmVjdGl2ZT4oKTtcclxuICBAT3V0cHV0KCkgZGlzYWJsZSA9IG5ldyBFdmVudEVtaXR0ZXI8TGlzdEl0ZW1EaXJlY3RpdmU+KCk7XHJcbiAgQE91dHB1dCgpIGVuYWJsZSA9IG5ldyBFdmVudEVtaXR0ZXI8TGlzdEl0ZW1EaXJlY3RpdmU+KCk7XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJylcclxuICBvbkNsaWNrKCkge1xyXG4gICAgdGhpcy5zZWxlY3RlZCA9IHRydWU7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVuZGVyZXI6IFJlbmRlcmVyMiwgcHJpdmF0ZSBlbDogRWxlbWVudFJlZikge31cclxuXHJcbiAgZ2V0T2Zmc2V0VG9wKCk6IG51bWJlciB7XHJcbiAgICBjb25zdCBwYWRkaW5nID0gNTtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5lbC5uYXRpdmVFbGVtZW50Lm9mZnNldFRvcCAtIHBhZGRpbmc7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHRvZ2dsZVNlbGVjdGVkQ2xhc3MoKSB7XHJcbiAgICBpZiAodGhpcy5mb2N1c2VkIHx8IHRoaXMuc2VsZWN0ZWQpIHtcclxuICAgICAgdGhpcy5hZGRDbHMoTGlzdEl0ZW1EaXJlY3RpdmUuc2VsZWN0ZWRDbHMpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5yZW1vdmVDbHMoTGlzdEl0ZW1EaXJlY3RpdmUuc2VsZWN0ZWRDbHMpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSB0b2dnbGVEaXNhYmxlZENsYXNzKCkge1xyXG4gICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcclxuICAgICAgdGhpcy5hZGRDbHMoTGlzdEl0ZW1EaXJlY3RpdmUuZGlzYWJsZWRDbHMpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5yZW1vdmVDbHMoTGlzdEl0ZW1EaXJlY3RpdmUuZGlzYWJsZWRDbHMpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhZGRDbHMoY2xzOiBzdHJpbmcpIHtcclxuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5lbC5uYXRpdmVFbGVtZW50LCBjbHMpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSByZW1vdmVDbHMoY2xzOiBzdHJpbmcpIHtcclxuICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5lbC5uYXRpdmVFbGVtZW50LCBjbHMpO1xyXG4gIH1cclxufVxyXG4iXX0=
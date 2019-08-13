/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, QueryList, Input, ContentChildren, HostListener, ElementRef } from '@angular/core';
import { ListItemDirective } from './list-item.directive';
var ListComponent = /** @class */ (function () {
    function ListComponent(el) {
        this.el = el;
        this._navigation = true;
        this._selection = true;
        this.subscriptions = [];
    }
    Object.defineProperty(ListComponent.prototype, "navigation", {
        get: /**
         * @return {?}
         */
        function () {
            return this._navigation;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._navigation = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListComponent.prototype, "selection", {
        get: /**
         * @return {?}
         */
        function () {
            return this._selection;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._selection = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListComponent.prototype, "selectedItem", {
        get: /**
         * @return {?}
         */
        function () {
            return this._selectedItem;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.focusedItem = value;
            this._selectedItem = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListComponent.prototype, "focusedItem", {
        get: /**
         * @return {?}
         */
        function () {
            return this._focusedItem;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._focusedItem = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} event
     * @return {?}
     */
    ListComponent.prototype.handleKeyboardEvent = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        // It would be nice to be able to unsubscribe to the event
        // completely but until ES7 this won't be possible because
        // document events are not observables
        if (this.navigationEnabled) {
            if (event.keyCode === 38 || event.keyCode === 40) {
                event.preventDefault();
                this.navigate(event.keyCode);
            }
            else if (event.keyCode === 13) {
                this.select(this.focusedItem);
            }
        }
    };
    /**
     * @return {?}
     */
    ListComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.enableNavigation();
    };
    /**
     * @return {?}
     */
    ListComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.listItems.length) {
            this.init();
        }
        this.listItems$$ = this.listItems.changes.subscribe((/**
         * @param {?} items
         * @return {?}
         */
        function (items) { return _this.init(); }));
    };
    /**
     * @return {?}
     */
    ListComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.listItems$$.unsubscribe();
    };
    /**
     * @param {?=} item
     * @return {?}
     */
    ListComponent.prototype.focus = /**
     * @param {?=} item
     * @return {?}
     */
    function (item) {
        if (!this.selection) {
            return;
        }
        this.unfocus();
        // We need to make this check because dynamic
        // lists such as in the search results list may fail
        if (item !== undefined) {
            item.focused = true;
        }
    };
    /**
     * @return {?}
     */
    ListComponent.prototype.unfocus = /**
     * @return {?}
     */
    function () {
        if (this.focusedItem !== undefined) {
            this.focusedItem.focused = false;
        }
        this.focusedItem = undefined;
    };
    /**
     * @return {?}
     */
    ListComponent.prototype.focusNext = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var items = this.listItems.toArray();
        /** @type {?} */
        var item;
        /** @type {?} */
        var disabled = true;
        /** @type {?} */
        var index = this.getFocusedIndex();
        if (index === undefined) {
            index = -1;
        }
        while (disabled && index < items.length - 1) {
            index += 1;
            item = items[index];
            disabled = item.disabled;
        }
        if (item !== undefined) {
            this.focus(item);
        }
    };
    /**
     * @return {?}
     */
    ListComponent.prototype.focusPrevious = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var items = this.listItems.toArray();
        /** @type {?} */
        var item;
        /** @type {?} */
        var disabled = true;
        /** @type {?} */
        var index = this.getFocusedIndex();
        while (disabled && index > 0) {
            index -= 1;
            item = items[index];
            disabled = item.disabled;
        }
        if (item !== undefined) {
            this.focus(item);
        }
    };
    /**
     * @param {?=} item
     * @return {?}
     */
    ListComponent.prototype.select = /**
     * @param {?=} item
     * @return {?}
     */
    function (item) {
        if (!this.selection) {
            return;
        }
        this.unselect();
        if (item !== undefined) {
            item.selected = true;
        }
    };
    /**
     * @return {?}
     */
    ListComponent.prototype.unselect = /**
     * @return {?}
     */
    function () {
        this.unfocus();
        if (this.selectedItem !== undefined) {
            this.selectedItem.selected = false;
        }
        this.selectedItem = undefined;
    };
    /**
     * @return {?}
     */
    ListComponent.prototype.enableNavigation = /**
     * @return {?}
     */
    function () {
        if (this.navigation) {
            this.navigationEnabled = true;
        }
    };
    /**
     * @return {?}
     */
    ListComponent.prototype.disableNavigation = /**
     * @return {?}
     */
    function () {
        this.navigationEnabled = false;
    };
    /**
     * @param {?} item
     * @return {?}
     */
    ListComponent.prototype.scrollToItem = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        this.el.nativeElement.scrollTop = item.getOffsetTop();
    };
    /**
     * @private
     * @return {?}
     */
    ListComponent.prototype.init = /**
     * @private
     * @return {?}
     */
    function () {
        this.subscribe();
        this.selectedItem = this.findSelectedItem();
        this.focusedItem = this.findFocusedItem();
        this.enableNavigation();
    };
    /**
     * @private
     * @return {?}
     */
    ListComponent.prototype.subscribe = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.unsubscribe();
        this.listItems.toArray().forEach((/**
         * @param {?} item
         * @return {?}
         */
        function (item) {
            _this.subscriptions.push(item.beforeSelect.subscribe((/**
             * @param {?} item2
             * @return {?}
             */
            function (item2) {
                return _this.handleItemBeforeSelect(item2);
            })));
            _this.subscriptions.push(item.select.subscribe((/**
             * @param {?} item2
             * @return {?}
             */
            function (item2) {
                return _this.handleItemSelect(item2);
            })));
            _this.subscriptions.push(item.beforeFocus.subscribe((/**
             * @param {?} item2
             * @return {?}
             */
            function (item2) {
                return _this.handleItemBeforeFocus(item2);
            })));
            _this.subscriptions.push(item.focus.subscribe((/**
             * @param {?} item2
             * @return {?}
             */
            function (item2) {
                return _this.handleItemFocus(item2);
            })));
        }), this);
    };
    /**
     * @private
     * @return {?}
     */
    ListComponent.prototype.unsubscribe = /**
     * @private
     * @return {?}
     */
    function () {
        this.subscriptions.forEach((/**
         * @param {?} sub
         * @return {?}
         */
        function (sub) { return sub.unsubscribe(); }));
        this.subscriptions = [];
    };
    /**
     * @private
     * @param {?} item
     * @return {?}
     */
    ListComponent.prototype.handleItemBeforeFocus = /**
     * @private
     * @param {?} item
     * @return {?}
     */
    function (item) {
        if (item !== this.focusedItem) {
            this.unselect();
        }
    };
    /**
     * @private
     * @param {?} item
     * @return {?}
     */
    ListComponent.prototype.handleItemFocus = /**
     * @private
     * @param {?} item
     * @return {?}
     */
    function (item) {
        this.focusedItem = item;
    };
    /**
     * @private
     * @param {?} item
     * @return {?}
     */
    ListComponent.prototype.handleItemBeforeSelect = /**
     * @private
     * @param {?} item
     * @return {?}
     */
    function (item) {
        if (item !== this.focusedItem) {
            this.unselect();
        }
    };
    /**
     * @private
     * @param {?} item
     * @return {?}
     */
    ListComponent.prototype.handleItemSelect = /**
     * @private
     * @param {?} item
     * @return {?}
     */
    function (item) {
        this.selectedItem = item;
    };
    /**
     * @private
     * @return {?}
     */
    ListComponent.prototype.findSelectedItem = /**
     * @private
     * @return {?}
     */
    function () {
        return this.listItems.toArray().find((/**
         * @param {?} item
         * @return {?}
         */
        function (item) { return item.selected; }));
    };
    /**
     * @private
     * @return {?}
     */
    ListComponent.prototype.findFocusedItem = /**
     * @private
     * @return {?}
     */
    function () {
        return this.listItems.toArray().find((/**
         * @param {?} item
         * @return {?}
         */
        function (item) { return item.focused; }));
    };
    /**
     * @private
     * @return {?}
     */
    ListComponent.prototype.getFocusedIndex = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        return this.listItems
            .toArray()
            .findIndex((/**
         * @param {?} item
         * @return {?}
         */
        function (item) { return item === _this.focusedItem; }));
    };
    /**
     * @private
     * @param {?} key
     * @return {?}
     */
    ListComponent.prototype.navigate = /**
     * @private
     * @param {?} key
     * @return {?}
     */
    function (key) {
        switch (key) {
            case 38:
                this.focusPrevious();
                break;
            case 40:
                this.focusNext();
                break;
            default:
                break;
        }
    };
    ListComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-list',
                    template: "<mat-list\r\n  igoClickout\r\n  [ngClass]=\"{'selectable': selection}\"\r\n  (clickout)=\"disableNavigation()\"\r\n  (click)=\"enableNavigation()\">\r\n  <ng-content></ng-content>\r\n</mat-list>\r\n",
                    styles: [":host{display:block;height:100%;overflow:auto;position:static}mat-list{padding-top:0}:host>>>.mat-list .mat-list-item .mat-list-text>*{white-space:normal;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;max-height:36px;line-height:18px;-webkit-line-clamp:2}:host>>>.mat-list .mat-list-item.mat-list-item-avatar .mat-list-item-content{display:-webkit-flex;height:46px;padding:3px}:host>>>.mat-list .mat-list-item.mat-list-item-avatar{height:46px}:host>>>.mat-list .mat-list-item.mat-list-item-avatar .mat-list-item-content>mat-icon{padding:8px}:host>>>[igolistitem] mat-list-item [mat-list-avatar]{height:auto;width:40px}:host mat-list.selectable>>>[igolistitem]:not(.igo-list-item-disabled) mat-list-item:hover{cursor:pointer}:host>>>[igolistitem]:focus{outline:0}"]
                }] }
    ];
    /** @nocollapse */
    ListComponent.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    ListComponent.propDecorators = {
        navigation: [{ type: Input }],
        selection: [{ type: Input }],
        listItems: [{ type: ContentChildren, args: [ListItemDirective, { descendants: true },] }],
        handleKeyboardEvent: [{ type: HostListener, args: ['document:keydown', ['$event'],] }]
    };
    return ListComponent;
}());
export { ListComponent };
if (false) {
    /**
     * @type {?}
     * @private
     */
    ListComponent.prototype._navigation;
    /**
     * @type {?}
     * @private
     */
    ListComponent.prototype._selection;
    /**
     * @type {?}
     * @private
     */
    ListComponent.prototype._selectedItem;
    /**
     * @type {?}
     * @private
     */
    ListComponent.prototype._focusedItem;
    /**
     * @type {?}
     * @private
     */
    ListComponent.prototype.navigationEnabled;
    /**
     * @type {?}
     * @private
     */
    ListComponent.prototype.listItems$$;
    /**
     * @type {?}
     * @private
     */
    ListComponent.prototype.subscriptions;
    /** @type {?} */
    ListComponent.prototype.listItems;
    /**
     * @type {?}
     * @private
     */
    ListComponent.prototype.el;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9jb21tb24vIiwic291cmNlcyI6WyJsaWIvbGlzdC9saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFJVCxTQUFTLEVBQ1QsS0FBSyxFQUNMLGVBQWUsRUFDZixZQUFZLEVBQ1osVUFBVSxFQUNYLE1BQU0sZUFBZSxDQUFDO0FBR3ZCLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRTFEO0lBK0RFLHVCQUFvQixFQUFjO1FBQWQsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQWxEMUIsZ0JBQVcsR0FBRyxJQUFJLENBQUM7UUFTbkIsZUFBVSxHQUFHLElBQUksQ0FBQztRQXFCbEIsa0JBQWEsR0FBbUIsRUFBRSxDQUFDO0lBb0JOLENBQUM7SUF6RHRDLHNCQUNJLHFDQUFVOzs7O1FBRGQ7WUFFRSxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDMUIsQ0FBQzs7Ozs7UUFDRCxVQUFlLEtBQWM7WUFDM0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7UUFDM0IsQ0FBQzs7O09BSEE7SUFNRCxzQkFDSSxvQ0FBUzs7OztRQURiO1lBRUUsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQ3pCLENBQUM7Ozs7O1FBQ0QsVUFBYyxLQUFjO1lBQzFCLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1FBQzFCLENBQUM7OztPQUhBO0lBTUQsc0JBQUksdUNBQVk7Ozs7UUFBaEI7WUFDRSxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUM7UUFDNUIsQ0FBQzs7Ozs7UUFDRCxVQUFpQixLQUF3QjtZQUN2QyxJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztZQUN6QixJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztRQUM3QixDQUFDOzs7T0FKQTtJQU9ELHNCQUFJLHNDQUFXOzs7O1FB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Q0FDd0M7Ozs7O0lBaUI1QiwyQkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBBZnRlclZpZXdJbml0LFxyXG4gIE9uSW5pdCxcclxuICBPbkRlc3Ryb3ksXHJcbiAgUXVlcnlMaXN0LFxyXG4gIElucHV0LFxyXG4gIENvbnRlbnRDaGlsZHJlbixcclxuICBIb3N0TGlzdGVuZXIsXHJcbiAgRWxlbWVudFJlZlxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7IExpc3RJdGVtRGlyZWN0aXZlIH0gZnJvbSAnLi9saXN0LWl0ZW0uZGlyZWN0aXZlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaWdvLWxpc3QnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9saXN0LmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9saXN0LmNvbXBvbmVudC5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIExpc3RDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkluaXQsIE9uRGVzdHJveSB7XHJcbiAgQElucHV0KClcclxuICBnZXQgbmF2aWdhdGlvbigpIHtcclxuICAgIHJldHVybiB0aGlzLl9uYXZpZ2F0aW9uO1xyXG4gIH1cclxuICBzZXQgbmF2aWdhdGlvbih2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgdGhpcy5fbmF2aWdhdGlvbiA9IHZhbHVlO1xyXG4gIH1cclxuICBwcml2YXRlIF9uYXZpZ2F0aW9uID0gdHJ1ZTtcclxuXHJcbiAgQElucHV0KClcclxuICBnZXQgc2VsZWN0aW9uKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX3NlbGVjdGlvbjtcclxuICB9XHJcbiAgc2V0IHNlbGVjdGlvbih2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgdGhpcy5fc2VsZWN0aW9uID0gdmFsdWU7XHJcbiAgfVxyXG4gIHByaXZhdGUgX3NlbGVjdGlvbiA9IHRydWU7XHJcblxyXG4gIGdldCBzZWxlY3RlZEl0ZW0oKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fc2VsZWN0ZWRJdGVtO1xyXG4gIH1cclxuICBzZXQgc2VsZWN0ZWRJdGVtKHZhbHVlOiBMaXN0SXRlbURpcmVjdGl2ZSkge1xyXG4gICAgdGhpcy5mb2N1c2VkSXRlbSA9IHZhbHVlO1xyXG4gICAgdGhpcy5fc2VsZWN0ZWRJdGVtID0gdmFsdWU7XHJcbiAgfVxyXG4gIHByaXZhdGUgX3NlbGVjdGVkSXRlbTogTGlzdEl0ZW1EaXJlY3RpdmU7XHJcblxyXG4gIGdldCBmb2N1c2VkSXRlbSgpIHtcclxuICAgIHJldHVybiB0aGlzLl9mb2N1c2VkSXRlbTtcclxuICB9XHJcbiAgc2V0IGZvY3VzZWRJdGVtKHZhbHVlOiBMaXN0SXRlbURpcmVjdGl2ZSkge1xyXG4gICAgdGhpcy5fZm9jdXNlZEl0ZW0gPSB2YWx1ZTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfZm9jdXNlZEl0ZW06IExpc3RJdGVtRGlyZWN0aXZlO1xyXG5cclxuICBwcml2YXRlIG5hdmlnYXRpb25FbmFibGVkOiBib29sZWFuO1xyXG4gIHByaXZhdGUgbGlzdEl0ZW1zJCQ6IFN1YnNjcmlwdGlvbjtcclxuICBwcml2YXRlIHN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XHJcblxyXG4gIEBDb250ZW50Q2hpbGRyZW4oTGlzdEl0ZW1EaXJlY3RpdmUsIHsgZGVzY2VuZGFudHM6IHRydWUgfSlcclxuICBsaXN0SXRlbXM6IFF1ZXJ5TGlzdDxMaXN0SXRlbURpcmVjdGl2ZT47XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ2RvY3VtZW50OmtleWRvd24nLCBbJyRldmVudCddKVxyXG4gIGhhbmRsZUtleWJvYXJkRXZlbnQoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcclxuICAgIC8vIEl0IHdvdWxkIGJlIG5pY2UgdG8gYmUgYWJsZSB0byB1bnN1YnNjcmliZSB0byB0aGUgZXZlbnRcclxuICAgIC8vIGNvbXBsZXRlbHkgYnV0IHVudGlsIEVTNyB0aGlzIHdvbid0IGJlIHBvc3NpYmxlIGJlY2F1c2VcclxuICAgIC8vIGRvY3VtZW50IGV2ZW50cyBhcmUgbm90IG9ic2VydmFibGVzXHJcbiAgICBpZiAodGhpcy5uYXZpZ2F0aW9uRW5hYmxlZCkge1xyXG4gICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMzggfHwgZXZlbnQua2V5Q29kZSA9PT0gNDApIHtcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIHRoaXMubmF2aWdhdGUoZXZlbnQua2V5Q29kZSk7XHJcbiAgICAgIH0gZWxzZSBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMTMpIHtcclxuICAgICAgICB0aGlzLnNlbGVjdCh0aGlzLmZvY3VzZWRJdGVtKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbDogRWxlbWVudFJlZikge31cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLmVuYWJsZU5hdmlnYXRpb24oKTtcclxuICB9XHJcblxyXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcclxuICAgIGlmICh0aGlzLmxpc3RJdGVtcy5sZW5ndGgpIHtcclxuICAgICAgdGhpcy5pbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5saXN0SXRlbXMkJCA9IHRoaXMubGlzdEl0ZW1zLmNoYW5nZXMuc3Vic2NyaWJlKFxyXG4gICAgICAoaXRlbXM6IExpc3RJdGVtRGlyZWN0aXZlW10pID0+IHRoaXMuaW5pdCgpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLmxpc3RJdGVtcyQkLnVuc3Vic2NyaWJlKCk7XHJcbiAgfVxyXG5cclxuICBmb2N1cyhpdGVtPzogTGlzdEl0ZW1EaXJlY3RpdmUpIHtcclxuICAgIGlmICghdGhpcy5zZWxlY3Rpb24pIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMudW5mb2N1cygpO1xyXG5cclxuICAgIC8vIFdlIG5lZWQgdG8gbWFrZSB0aGlzIGNoZWNrIGJlY2F1c2UgZHluYW1pY1xyXG4gICAgLy8gbGlzdHMgc3VjaCBhcyBpbiB0aGUgc2VhcmNoIHJlc3VsdHMgbGlzdCBtYXkgZmFpbFxyXG4gICAgaWYgKGl0ZW0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBpdGVtLmZvY3VzZWQgPSB0cnVlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdW5mb2N1cygpIHtcclxuICAgIGlmICh0aGlzLmZvY3VzZWRJdGVtICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5mb2N1c2VkSXRlbS5mb2N1c2VkID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5mb2N1c2VkSXRlbSA9IHVuZGVmaW5lZDtcclxuICB9XHJcblxyXG4gIGZvY3VzTmV4dCgpIHtcclxuICAgIGNvbnN0IGl0ZW1zID0gdGhpcy5saXN0SXRlbXMudG9BcnJheSgpO1xyXG4gICAgbGV0IGl0ZW07XHJcbiAgICBsZXQgZGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgbGV0IGluZGV4ID0gdGhpcy5nZXRGb2N1c2VkSW5kZXgoKTtcclxuICAgIGlmIChpbmRleCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIGluZGV4ID0gLTE7XHJcbiAgICB9XHJcblxyXG4gICAgd2hpbGUgKGRpc2FibGVkICYmIGluZGV4IDwgaXRlbXMubGVuZ3RoIC0gMSkge1xyXG4gICAgICBpbmRleCArPSAxO1xyXG4gICAgICBpdGVtID0gaXRlbXNbaW5kZXhdO1xyXG4gICAgICBkaXNhYmxlZCA9IGl0ZW0uZGlzYWJsZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGl0ZW0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLmZvY3VzKGl0ZW0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZm9jdXNQcmV2aW91cygpIHtcclxuICAgIGNvbnN0IGl0ZW1zID0gdGhpcy5saXN0SXRlbXMudG9BcnJheSgpO1xyXG4gICAgbGV0IGl0ZW07XHJcbiAgICBsZXQgZGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgbGV0IGluZGV4ID0gdGhpcy5nZXRGb2N1c2VkSW5kZXgoKTtcclxuXHJcbiAgICB3aGlsZSAoZGlzYWJsZWQgJiYgaW5kZXggPiAwKSB7XHJcbiAgICAgIGluZGV4IC09IDE7XHJcbiAgICAgIGl0ZW0gPSBpdGVtc1tpbmRleF07XHJcbiAgICAgIGRpc2FibGVkID0gaXRlbS5kaXNhYmxlZDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoaXRlbSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMuZm9jdXMoaXRlbSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzZWxlY3QoaXRlbT86IExpc3RJdGVtRGlyZWN0aXZlKSB7XHJcbiAgICBpZiAoIXRoaXMuc2VsZWN0aW9uKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnVuc2VsZWN0KCk7XHJcblxyXG4gICAgaWYgKGl0ZW0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBpdGVtLnNlbGVjdGVkID0gdHJ1ZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHVuc2VsZWN0KCkge1xyXG4gICAgdGhpcy51bmZvY3VzKCk7XHJcblxyXG4gICAgaWYgKHRoaXMuc2VsZWN0ZWRJdGVtICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5zZWxlY3RlZEl0ZW0uc2VsZWN0ZWQgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnNlbGVjdGVkSXRlbSA9IHVuZGVmaW5lZDtcclxuICB9XHJcblxyXG4gIGVuYWJsZU5hdmlnYXRpb24oKSB7XHJcbiAgICBpZiAodGhpcy5uYXZpZ2F0aW9uKSB7XHJcbiAgICAgIHRoaXMubmF2aWdhdGlvbkVuYWJsZWQgPSB0cnVlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZGlzYWJsZU5hdmlnYXRpb24oKSB7XHJcbiAgICB0aGlzLm5hdmlnYXRpb25FbmFibGVkID0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBzY3JvbGxUb0l0ZW0oaXRlbTogTGlzdEl0ZW1EaXJlY3RpdmUpIHtcclxuICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5zY3JvbGxUb3AgPSBpdGVtLmdldE9mZnNldFRvcCgpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpbml0KCkge1xyXG4gICAgdGhpcy5zdWJzY3JpYmUoKTtcclxuXHJcbiAgICB0aGlzLnNlbGVjdGVkSXRlbSA9IHRoaXMuZmluZFNlbGVjdGVkSXRlbSgpO1xyXG4gICAgdGhpcy5mb2N1c2VkSXRlbSA9IHRoaXMuZmluZEZvY3VzZWRJdGVtKCk7XHJcblxyXG4gICAgdGhpcy5lbmFibGVOYXZpZ2F0aW9uKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHN1YnNjcmliZSgpIHtcclxuICAgIHRoaXMudW5zdWJzY3JpYmUoKTtcclxuXHJcbiAgICB0aGlzLmxpc3RJdGVtcy50b0FycmF5KCkuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goXHJcbiAgICAgICAgaXRlbS5iZWZvcmVTZWxlY3Quc3Vic2NyaWJlKChpdGVtMjogTGlzdEl0ZW1EaXJlY3RpdmUpID0+XHJcbiAgICAgICAgICB0aGlzLmhhbmRsZUl0ZW1CZWZvcmVTZWxlY3QoaXRlbTIpXHJcbiAgICAgICAgKVxyXG4gICAgICApO1xyXG5cclxuICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goXHJcbiAgICAgICAgaXRlbS5zZWxlY3Quc3Vic2NyaWJlKChpdGVtMjogTGlzdEl0ZW1EaXJlY3RpdmUpID0+XHJcbiAgICAgICAgICB0aGlzLmhhbmRsZUl0ZW1TZWxlY3QoaXRlbTIpXHJcbiAgICAgICAgKVxyXG4gICAgICApO1xyXG5cclxuICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goXHJcbiAgICAgICAgaXRlbS5iZWZvcmVGb2N1cy5zdWJzY3JpYmUoKGl0ZW0yOiBMaXN0SXRlbURpcmVjdGl2ZSkgPT5cclxuICAgICAgICAgIHRoaXMuaGFuZGxlSXRlbUJlZm9yZUZvY3VzKGl0ZW0yKVxyXG4gICAgICAgIClcclxuICAgICAgKTtcclxuXHJcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKFxyXG4gICAgICAgIGl0ZW0uZm9jdXMuc3Vic2NyaWJlKChpdGVtMjogTGlzdEl0ZW1EaXJlY3RpdmUpID0+XHJcbiAgICAgICAgICB0aGlzLmhhbmRsZUl0ZW1Gb2N1cyhpdGVtMilcclxuICAgICAgICApXHJcbiAgICAgICk7XHJcbiAgICB9LCB0aGlzKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgdW5zdWJzY3JpYmUoKSB7XHJcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuZm9yRWFjaCgoc3ViOiBTdWJzY3JpcHRpb24pID0+IHN1Yi51bnN1YnNjcmliZSgpKTtcclxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucyA9IFtdO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBoYW5kbGVJdGVtQmVmb3JlRm9jdXMoaXRlbTogTGlzdEl0ZW1EaXJlY3RpdmUpIHtcclxuICAgIGlmIChpdGVtICE9PSB0aGlzLmZvY3VzZWRJdGVtKSB7XHJcbiAgICAgIHRoaXMudW5zZWxlY3QoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgaGFuZGxlSXRlbUZvY3VzKGl0ZW06IExpc3RJdGVtRGlyZWN0aXZlKSB7XHJcbiAgICB0aGlzLmZvY3VzZWRJdGVtID0gaXRlbTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaGFuZGxlSXRlbUJlZm9yZVNlbGVjdChpdGVtOiBMaXN0SXRlbURpcmVjdGl2ZSkge1xyXG4gICAgaWYgKGl0ZW0gIT09IHRoaXMuZm9jdXNlZEl0ZW0pIHtcclxuICAgICAgdGhpcy51bnNlbGVjdCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBoYW5kbGVJdGVtU2VsZWN0KGl0ZW06IExpc3RJdGVtRGlyZWN0aXZlKSB7XHJcbiAgICB0aGlzLnNlbGVjdGVkSXRlbSA9IGl0ZW07XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGZpbmRTZWxlY3RlZEl0ZW0oKSB7XHJcbiAgICByZXR1cm4gdGhpcy5saXN0SXRlbXMudG9BcnJheSgpLmZpbmQoaXRlbSA9PiBpdGVtLnNlbGVjdGVkKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZmluZEZvY3VzZWRJdGVtKCkge1xyXG4gICAgcmV0dXJuIHRoaXMubGlzdEl0ZW1zLnRvQXJyYXkoKS5maW5kKGl0ZW0gPT4gaXRlbS5mb2N1c2VkKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0Rm9jdXNlZEluZGV4KCkge1xyXG4gICAgcmV0dXJuIHRoaXMubGlzdEl0ZW1zXHJcbiAgICAgIC50b0FycmF5KClcclxuICAgICAgLmZpbmRJbmRleChpdGVtID0+IGl0ZW0gPT09IHRoaXMuZm9jdXNlZEl0ZW0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBuYXZpZ2F0ZShrZXk6IG51bWJlcikge1xyXG4gICAgc3dpdGNoIChrZXkpIHtcclxuICAgICAgY2FzZSAzODpcclxuICAgICAgICB0aGlzLmZvY3VzUHJldmlvdXMoKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSA0MDpcclxuICAgICAgICB0aGlzLmZvY3VzTmV4dCgpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=
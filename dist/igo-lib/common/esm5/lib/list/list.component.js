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
            if (value !== undefined) {
                this.scrollToItem(value);
            }
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
    /**
     * @private
     * @param {?} item
     * @return {?}
     */
    ListComponent.prototype.scrollToItem = /**
     * @private
     * @param {?} item
     * @return {?}
     */
    function (item) {
        this.el.nativeElement.scrollTop = item.getOffsetTop();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9jb21tb24vIiwic291cmNlcyI6WyJsaWIvbGlzdC9saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFJVCxTQUFTLEVBQ1QsS0FBSyxFQUNMLGVBQWUsRUFDZixZQUFZLEVBQ1osVUFBVSxFQUNYLE1BQU0sZUFBZSxDQUFDO0FBR3ZCLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRTFEO0lBa0VFLHVCQUFvQixFQUFjO1FBQWQsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQXJEMUIsZ0JBQVcsR0FBRyxJQUFJLENBQUM7UUFTbkIsZUFBVSxHQUFHLElBQUksQ0FBQztRQXdCbEIsa0JBQWEsR0FBbUIsRUFBRSxDQUFDO0lBb0JOLENBQUM7SUE1RHRDLHNCQUNJLHFDQUFVOzs7O1FBRGQ7WUFFRSxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDMUIsQ0FBQzs7Ozs7UUFDRCxVQUFlLEtBQWM7WUFDM0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7UUFDM0IsQ0FBQzs7O09BSEE7SUFNRCxzQkFDSSxvQ0FBUzs7OztRQURiO1lBRUUsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQ3pCLENBQUM7Ozs7O1FBQ0QsVUFBYyxLQUFjO1lBQzFCLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1FBQzFCLENBQUM7OztPQUhBO0lBTUQsc0JBQUksdUNBQVk7Ozs7UUFBaEI7WUFDRSxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUM7UUFDNUIsQ0FBQzs7Ozs7UUFDRCxVQUFpQixLQUF3QjtZQUN2QyxJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztZQUN6QixJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztRQUM3QixDQUFDOzs7T0FKQTtJQU9ELHNCQUFJLHNDQUFXOzs7O1FB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c0NBQXlDOzs7OztJQVd6QyxxQ0FBd0M7Ozs7O0lBRXhDLDBDQUFtQzs7Ozs7SUFDbkMsb0NBQWtDOzs7OztJQUNsQyxzQ0FBMkM7O0lBRTNDLGtDQUN3Qzs7Ozs7SUFpQjVCLDJCQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIEFmdGVyVmlld0luaXQsXHJcbiAgT25Jbml0LFxyXG4gIE9uRGVzdHJveSxcclxuICBRdWVyeUxpc3QsXHJcbiAgSW5wdXQsXHJcbiAgQ29udGVudENoaWxkcmVuLFxyXG4gIEhvc3RMaXN0ZW5lcixcclxuICBFbGVtZW50UmVmXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IHsgTGlzdEl0ZW1EaXJlY3RpdmUgfSBmcm9tICcuL2xpc3QtaXRlbS5kaXJlY3RpdmUnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdpZ28tbGlzdCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2xpc3QuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2xpc3QuY29tcG9uZW50LnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTGlzdENvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uSW5pdCwgT25EZXN0cm95IHtcclxuICBASW5wdXQoKVxyXG4gIGdldCBuYXZpZ2F0aW9uKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX25hdmlnYXRpb247XHJcbiAgfVxyXG4gIHNldCBuYXZpZ2F0aW9uKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLl9uYXZpZ2F0aW9uID0gdmFsdWU7XHJcbiAgfVxyXG4gIHByaXZhdGUgX25hdmlnYXRpb24gPSB0cnVlO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIGdldCBzZWxlY3Rpb24oKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fc2VsZWN0aW9uO1xyXG4gIH1cclxuICBzZXQgc2VsZWN0aW9uKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLl9zZWxlY3Rpb24gPSB2YWx1ZTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfc2VsZWN0aW9uID0gdHJ1ZTtcclxuXHJcbiAgZ2V0IHNlbGVjdGVkSXRlbSgpIHtcclxuICAgIHJldHVybiB0aGlzLl9zZWxlY3RlZEl0ZW07XHJcbiAgfVxyXG4gIHNldCBzZWxlY3RlZEl0ZW0odmFsdWU6IExpc3RJdGVtRGlyZWN0aXZlKSB7XHJcbiAgICB0aGlzLmZvY3VzZWRJdGVtID0gdmFsdWU7XHJcbiAgICB0aGlzLl9zZWxlY3RlZEl0ZW0gPSB2YWx1ZTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfc2VsZWN0ZWRJdGVtOiBMaXN0SXRlbURpcmVjdGl2ZTtcclxuXHJcbiAgZ2V0IGZvY3VzZWRJdGVtKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2ZvY3VzZWRJdGVtO1xyXG4gIH1cclxuICBzZXQgZm9jdXNlZEl0ZW0odmFsdWU6IExpc3RJdGVtRGlyZWN0aXZlKSB7XHJcbiAgICB0aGlzLl9mb2N1c2VkSXRlbSA9IHZhbHVlO1xyXG4gICAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5zY3JvbGxUb0l0ZW0odmFsdWUpO1xyXG4gICAgfVxyXG4gIH1cclxuICBwcml2YXRlIF9mb2N1c2VkSXRlbTogTGlzdEl0ZW1EaXJlY3RpdmU7XHJcblxyXG4gIHByaXZhdGUgbmF2aWdhdGlvbkVuYWJsZWQ6IGJvb2xlYW47XHJcbiAgcHJpdmF0ZSBsaXN0SXRlbXMkJDogU3Vic2NyaXB0aW9uO1xyXG4gIHByaXZhdGUgc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcclxuXHJcbiAgQENvbnRlbnRDaGlsZHJlbihMaXN0SXRlbURpcmVjdGl2ZSwgeyBkZXNjZW5kYW50czogdHJ1ZSB9KVxyXG4gIGxpc3RJdGVtczogUXVlcnlMaXN0PExpc3RJdGVtRGlyZWN0aXZlPjtcclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignZG9jdW1lbnQ6a2V5ZG93bicsIFsnJGV2ZW50J10pXHJcbiAgaGFuZGxlS2V5Ym9hcmRFdmVudChldmVudDogS2V5Ym9hcmRFdmVudCkge1xyXG4gICAgLy8gSXQgd291bGQgYmUgbmljZSB0byBiZSBhYmxlIHRvIHVuc3Vic2NyaWJlIHRvIHRoZSBldmVudFxyXG4gICAgLy8gY29tcGxldGVseSBidXQgdW50aWwgRVM3IHRoaXMgd29uJ3QgYmUgcG9zc2libGUgYmVjYXVzZVxyXG4gICAgLy8gZG9jdW1lbnQgZXZlbnRzIGFyZSBub3Qgb2JzZXJ2YWJsZXNcclxuICAgIGlmICh0aGlzLm5hdmlnYXRpb25FbmFibGVkKSB7XHJcbiAgICAgIGlmIChldmVudC5rZXlDb2RlID09PSAzOCB8fCBldmVudC5rZXlDb2RlID09PSA0MCkge1xyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgdGhpcy5uYXZpZ2F0ZShldmVudC5rZXlDb2RlKTtcclxuICAgICAgfSBlbHNlIGlmIChldmVudC5rZXlDb2RlID09PSAxMykge1xyXG4gICAgICAgIHRoaXMuc2VsZWN0KHRoaXMuZm9jdXNlZEl0ZW0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsOiBFbGVtZW50UmVmKSB7fVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMuZW5hYmxlTmF2aWdhdGlvbigpO1xyXG4gIH1cclxuXHJcbiAgbmdBZnRlclZpZXdJbml0KCkge1xyXG4gICAgaWYgKHRoaXMubGlzdEl0ZW1zLmxlbmd0aCkge1xyXG4gICAgICB0aGlzLmluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmxpc3RJdGVtcyQkID0gdGhpcy5saXN0SXRlbXMuY2hhbmdlcy5zdWJzY3JpYmUoXHJcbiAgICAgIChpdGVtczogTGlzdEl0ZW1EaXJlY3RpdmVbXSkgPT4gdGhpcy5pbml0KClcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMubGlzdEl0ZW1zJCQudW5zdWJzY3JpYmUoKTtcclxuICB9XHJcblxyXG4gIGZvY3VzKGl0ZW0/OiBMaXN0SXRlbURpcmVjdGl2ZSkge1xyXG4gICAgaWYgKCF0aGlzLnNlbGVjdGlvbikge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy51bmZvY3VzKCk7XHJcblxyXG4gICAgLy8gV2UgbmVlZCB0byBtYWtlIHRoaXMgY2hlY2sgYmVjYXVzZSBkeW5hbWljXHJcbiAgICAvLyBsaXN0cyBzdWNoIGFzIGluIHRoZSBzZWFyY2ggcmVzdWx0cyBsaXN0IG1heSBmYWlsXHJcbiAgICBpZiAoaXRlbSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIGl0ZW0uZm9jdXNlZCA9IHRydWU7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB1bmZvY3VzKCkge1xyXG4gICAgaWYgKHRoaXMuZm9jdXNlZEl0ZW0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLmZvY3VzZWRJdGVtLmZvY3VzZWQgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmZvY3VzZWRJdGVtID0gdW5kZWZpbmVkO1xyXG4gIH1cclxuXHJcbiAgZm9jdXNOZXh0KCkge1xyXG4gICAgY29uc3QgaXRlbXMgPSB0aGlzLmxpc3RJdGVtcy50b0FycmF5KCk7XHJcbiAgICBsZXQgaXRlbTtcclxuICAgIGxldCBkaXNhYmxlZCA9IHRydWU7XHJcbiAgICBsZXQgaW5kZXggPSB0aGlzLmdldEZvY3VzZWRJbmRleCgpO1xyXG4gICAgaWYgKGluZGV4ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgaW5kZXggPSAtMTtcclxuICAgIH1cclxuXHJcbiAgICB3aGlsZSAoZGlzYWJsZWQgJiYgaW5kZXggPCBpdGVtcy5sZW5ndGggLSAxKSB7XHJcbiAgICAgIGluZGV4ICs9IDE7XHJcbiAgICAgIGl0ZW0gPSBpdGVtc1tpbmRleF07XHJcbiAgICAgIGRpc2FibGVkID0gaXRlbS5kaXNhYmxlZDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoaXRlbSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMuZm9jdXMoaXRlbSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmb2N1c1ByZXZpb3VzKCkge1xyXG4gICAgY29uc3QgaXRlbXMgPSB0aGlzLmxpc3RJdGVtcy50b0FycmF5KCk7XHJcbiAgICBsZXQgaXRlbTtcclxuICAgIGxldCBkaXNhYmxlZCA9IHRydWU7XHJcbiAgICBsZXQgaW5kZXggPSB0aGlzLmdldEZvY3VzZWRJbmRleCgpO1xyXG5cclxuICAgIHdoaWxlIChkaXNhYmxlZCAmJiBpbmRleCA+IDApIHtcclxuICAgICAgaW5kZXggLT0gMTtcclxuICAgICAgaXRlbSA9IGl0ZW1zW2luZGV4XTtcclxuICAgICAgZGlzYWJsZWQgPSBpdGVtLmRpc2FibGVkO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChpdGVtICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5mb2N1cyhpdGVtKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNlbGVjdChpdGVtPzogTGlzdEl0ZW1EaXJlY3RpdmUpIHtcclxuICAgIGlmICghdGhpcy5zZWxlY3Rpb24pIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMudW5zZWxlY3QoKTtcclxuXHJcbiAgICBpZiAoaXRlbSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIGl0ZW0uc2VsZWN0ZWQgPSB0cnVlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdW5zZWxlY3QoKSB7XHJcbiAgICB0aGlzLnVuZm9jdXMoKTtcclxuXHJcbiAgICBpZiAodGhpcy5zZWxlY3RlZEl0ZW0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLnNlbGVjdGVkSXRlbS5zZWxlY3RlZCA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuc2VsZWN0ZWRJdGVtID0gdW5kZWZpbmVkO1xyXG4gIH1cclxuXHJcbiAgZW5hYmxlTmF2aWdhdGlvbigpIHtcclxuICAgIGlmICh0aGlzLm5hdmlnYXRpb24pIHtcclxuICAgICAgdGhpcy5uYXZpZ2F0aW9uRW5hYmxlZCA9IHRydWU7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBkaXNhYmxlTmF2aWdhdGlvbigpIHtcclxuICAgIHRoaXMubmF2aWdhdGlvbkVuYWJsZWQgPSBmYWxzZTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaW5pdCgpIHtcclxuICAgIHRoaXMuc3Vic2NyaWJlKCk7XHJcblxyXG4gICAgdGhpcy5zZWxlY3RlZEl0ZW0gPSB0aGlzLmZpbmRTZWxlY3RlZEl0ZW0oKTtcclxuICAgIHRoaXMuZm9jdXNlZEl0ZW0gPSB0aGlzLmZpbmRGb2N1c2VkSXRlbSgpO1xyXG5cclxuICAgIHRoaXMuZW5hYmxlTmF2aWdhdGlvbigpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzdWJzY3JpYmUoKSB7XHJcbiAgICB0aGlzLnVuc3Vic2NyaWJlKCk7XHJcblxyXG4gICAgdGhpcy5saXN0SXRlbXMudG9BcnJheSgpLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKFxyXG4gICAgICAgIGl0ZW0uYmVmb3JlU2VsZWN0LnN1YnNjcmliZSgoaXRlbTI6IExpc3RJdGVtRGlyZWN0aXZlKSA9PlxyXG4gICAgICAgICAgdGhpcy5oYW5kbGVJdGVtQmVmb3JlU2VsZWN0KGl0ZW0yKVxyXG4gICAgICAgIClcclxuICAgICAgKTtcclxuXHJcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKFxyXG4gICAgICAgIGl0ZW0uc2VsZWN0LnN1YnNjcmliZSgoaXRlbTI6IExpc3RJdGVtRGlyZWN0aXZlKSA9PlxyXG4gICAgICAgICAgdGhpcy5oYW5kbGVJdGVtU2VsZWN0KGl0ZW0yKVxyXG4gICAgICAgIClcclxuICAgICAgKTtcclxuXHJcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKFxyXG4gICAgICAgIGl0ZW0uYmVmb3JlRm9jdXMuc3Vic2NyaWJlKChpdGVtMjogTGlzdEl0ZW1EaXJlY3RpdmUpID0+XHJcbiAgICAgICAgICB0aGlzLmhhbmRsZUl0ZW1CZWZvcmVGb2N1cyhpdGVtMilcclxuICAgICAgICApXHJcbiAgICAgICk7XHJcblxyXG4gICAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcclxuICAgICAgICBpdGVtLmZvY3VzLnN1YnNjcmliZSgoaXRlbTI6IExpc3RJdGVtRGlyZWN0aXZlKSA9PlxyXG4gICAgICAgICAgdGhpcy5oYW5kbGVJdGVtRm9jdXMoaXRlbTIpXHJcbiAgICAgICAgKVxyXG4gICAgICApO1xyXG4gICAgfSwgdGhpcyk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHVuc3Vic2NyaWJlKCkge1xyXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmZvckVhY2goKHN1YjogU3Vic2NyaXB0aW9uKSA9PiBzdWIudW5zdWJzY3JpYmUoKSk7XHJcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMgPSBbXTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaGFuZGxlSXRlbUJlZm9yZUZvY3VzKGl0ZW06IExpc3RJdGVtRGlyZWN0aXZlKSB7XHJcbiAgICBpZiAoaXRlbSAhPT0gdGhpcy5mb2N1c2VkSXRlbSkge1xyXG4gICAgICB0aGlzLnVuc2VsZWN0KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGhhbmRsZUl0ZW1Gb2N1cyhpdGVtOiBMaXN0SXRlbURpcmVjdGl2ZSkge1xyXG4gICAgdGhpcy5mb2N1c2VkSXRlbSA9IGl0ZW07XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGhhbmRsZUl0ZW1CZWZvcmVTZWxlY3QoaXRlbTogTGlzdEl0ZW1EaXJlY3RpdmUpIHtcclxuICAgIGlmIChpdGVtICE9PSB0aGlzLmZvY3VzZWRJdGVtKSB7XHJcbiAgICAgIHRoaXMudW5zZWxlY3QoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgaGFuZGxlSXRlbVNlbGVjdChpdGVtOiBMaXN0SXRlbURpcmVjdGl2ZSkge1xyXG4gICAgdGhpcy5zZWxlY3RlZEl0ZW0gPSBpdGVtO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBmaW5kU2VsZWN0ZWRJdGVtKCkge1xyXG4gICAgcmV0dXJuIHRoaXMubGlzdEl0ZW1zLnRvQXJyYXkoKS5maW5kKGl0ZW0gPT4gaXRlbS5zZWxlY3RlZCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGZpbmRGb2N1c2VkSXRlbSgpIHtcclxuICAgIHJldHVybiB0aGlzLmxpc3RJdGVtcy50b0FycmF5KCkuZmluZChpdGVtID0+IGl0ZW0uZm9jdXNlZCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldEZvY3VzZWRJbmRleCgpIHtcclxuICAgIHJldHVybiB0aGlzLmxpc3RJdGVtc1xyXG4gICAgICAudG9BcnJheSgpXHJcbiAgICAgIC5maW5kSW5kZXgoaXRlbSA9PiBpdGVtID09PSB0aGlzLmZvY3VzZWRJdGVtKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgbmF2aWdhdGUoa2V5OiBudW1iZXIpIHtcclxuICAgIHN3aXRjaCAoa2V5KSB7XHJcbiAgICAgIGNhc2UgMzg6XHJcbiAgICAgICAgdGhpcy5mb2N1c1ByZXZpb3VzKCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgNDA6XHJcbiAgICAgICAgdGhpcy5mb2N1c05leHQoKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgc2Nyb2xsVG9JdGVtKGl0ZW06IExpc3RJdGVtRGlyZWN0aXZlKSB7XHJcbiAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuc2Nyb2xsVG9wID0gaXRlbS5nZXRPZmZzZXRUb3AoKTtcclxuICB9XHJcbn1cclxuIl19
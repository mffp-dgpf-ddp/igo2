/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, QueryList, Input, ContentChildren, HostListener, ElementRef } from '@angular/core';
import { ListItemDirective } from './list-item.directive';
export class ListComponent {
    /**
     * @param {?} el
     */
    constructor(el) {
        this.el = el;
        this._navigation = true;
        this._selection = true;
        this.subscriptions = [];
    }
    /**
     * @return {?}
     */
    get navigation() {
        return this._navigation;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set navigation(value) {
        this._navigation = value;
    }
    /**
     * @return {?}
     */
    get selection() {
        return this._selection;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set selection(value) {
        this._selection = value;
    }
    /**
     * @return {?}
     */
    get selectedItem() {
        return this._selectedItem;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set selectedItem(value) {
        this.focusedItem = value;
        this._selectedItem = value;
    }
    /**
     * @return {?}
     */
    get focusedItem() {
        return this._focusedItem;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set focusedItem(value) {
        this._focusedItem = value;
        if (value !== undefined) {
            this.scrollToItem(value);
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    handleKeyboardEvent(event) {
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
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.enableNavigation();
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        if (this.listItems.length) {
            this.init();
        }
        this.listItems$$ = this.listItems.changes.subscribe((/**
         * @param {?} items
         * @return {?}
         */
        (items) => this.init()));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.listItems$$.unsubscribe();
    }
    /**
     * @param {?=} item
     * @return {?}
     */
    focus(item) {
        if (!this.selection) {
            return;
        }
        this.unfocus();
        // We need to make this check because dynamic
        // lists such as in the search results list may fail
        if (item !== undefined) {
            item.focused = true;
        }
    }
    /**
     * @return {?}
     */
    unfocus() {
        if (this.focusedItem !== undefined) {
            this.focusedItem.focused = false;
        }
        this.focusedItem = undefined;
    }
    /**
     * @return {?}
     */
    focusNext() {
        /** @type {?} */
        const items = this.listItems.toArray();
        /** @type {?} */
        let item;
        /** @type {?} */
        let disabled = true;
        /** @type {?} */
        let index = this.getFocusedIndex();
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
    }
    /**
     * @return {?}
     */
    focusPrevious() {
        /** @type {?} */
        const items = this.listItems.toArray();
        /** @type {?} */
        let item;
        /** @type {?} */
        let disabled = true;
        /** @type {?} */
        let index = this.getFocusedIndex();
        while (disabled && index > 0) {
            index -= 1;
            item = items[index];
            disabled = item.disabled;
        }
        if (item !== undefined) {
            this.focus(item);
        }
    }
    /**
     * @param {?=} item
     * @return {?}
     */
    select(item) {
        if (!this.selection) {
            return;
        }
        this.unselect();
        if (item !== undefined) {
            item.selected = true;
        }
    }
    /**
     * @return {?}
     */
    unselect() {
        this.unfocus();
        if (this.selectedItem !== undefined) {
            this.selectedItem.selected = false;
        }
        this.selectedItem = undefined;
    }
    /**
     * @return {?}
     */
    enableNavigation() {
        if (this.navigation) {
            this.navigationEnabled = true;
        }
    }
    /**
     * @return {?}
     */
    disableNavigation() {
        this.navigationEnabled = false;
    }
    /**
     * @private
     * @return {?}
     */
    init() {
        this.subscribe();
        this.selectedItem = this.findSelectedItem();
        this.focusedItem = this.findFocusedItem();
        this.enableNavigation();
    }
    /**
     * @private
     * @return {?}
     */
    subscribe() {
        this.unsubscribe();
        this.listItems.toArray().forEach((/**
         * @param {?} item
         * @return {?}
         */
        item => {
            this.subscriptions.push(item.beforeSelect.subscribe((/**
             * @param {?} item2
             * @return {?}
             */
            (item2) => this.handleItemBeforeSelect(item2))));
            this.subscriptions.push(item.select.subscribe((/**
             * @param {?} item2
             * @return {?}
             */
            (item2) => this.handleItemSelect(item2))));
            this.subscriptions.push(item.beforeFocus.subscribe((/**
             * @param {?} item2
             * @return {?}
             */
            (item2) => this.handleItemBeforeFocus(item2))));
            this.subscriptions.push(item.focus.subscribe((/**
             * @param {?} item2
             * @return {?}
             */
            (item2) => this.handleItemFocus(item2))));
        }), this);
    }
    /**
     * @private
     * @return {?}
     */
    unsubscribe() {
        this.subscriptions.forEach((/**
         * @param {?} sub
         * @return {?}
         */
        (sub) => sub.unsubscribe()));
        this.subscriptions = [];
    }
    /**
     * @private
     * @param {?} item
     * @return {?}
     */
    handleItemBeforeFocus(item) {
        if (item !== this.focusedItem) {
            this.unselect();
        }
    }
    /**
     * @private
     * @param {?} item
     * @return {?}
     */
    handleItemFocus(item) {
        this.focusedItem = item;
    }
    /**
     * @private
     * @param {?} item
     * @return {?}
     */
    handleItemBeforeSelect(item) {
        if (item !== this.focusedItem) {
            this.unselect();
        }
    }
    /**
     * @private
     * @param {?} item
     * @return {?}
     */
    handleItemSelect(item) {
        this.selectedItem = item;
    }
    /**
     * @private
     * @return {?}
     */
    findSelectedItem() {
        return this.listItems.toArray().find((/**
         * @param {?} item
         * @return {?}
         */
        item => item.selected));
    }
    /**
     * @private
     * @return {?}
     */
    findFocusedItem() {
        return this.listItems.toArray().find((/**
         * @param {?} item
         * @return {?}
         */
        item => item.focused));
    }
    /**
     * @private
     * @return {?}
     */
    getFocusedIndex() {
        return this.listItems
            .toArray()
            .findIndex((/**
         * @param {?} item
         * @return {?}
         */
        item => item === this.focusedItem));
    }
    /**
     * @private
     * @param {?} key
     * @return {?}
     */
    navigate(key) {
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
    }
    /**
     * @private
     * @param {?} item
     * @return {?}
     */
    scrollToItem(item) {
        this.el.nativeElement.scrollTop = item.getOffsetTop();
    }
}
ListComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-list',
                template: "<mat-list\r\n  igoClickout\r\n  [ngClass]=\"{'selectable': selection}\"\r\n  (clickout)=\"disableNavigation()\"\r\n  (click)=\"enableNavigation()\">\r\n  <ng-content></ng-content>\r\n</mat-list>\r\n",
                styles: [":host{display:block;height:100%;overflow:auto;position:static}mat-list{padding-top:0}:host>>>.mat-list .mat-list-item .mat-list-text>*{white-space:normal;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;max-height:36px;line-height:18px;-webkit-line-clamp:2}:host>>>.mat-list .mat-list-item.mat-list-item-avatar .mat-list-item-content{display:-webkit-flex;height:46px;padding:3px}:host>>>.mat-list .mat-list-item.mat-list-item-avatar{height:46px}:host>>>.mat-list .mat-list-item.mat-list-item-avatar .mat-list-item-content>mat-icon{padding:8px}:host>>>[igolistitem] mat-list-item [mat-list-avatar]{height:auto;width:40px}:host mat-list.selectable>>>[igolistitem]:not(.igo-list-item-disabled) mat-list-item:hover{cursor:pointer}:host>>>[igolistitem]:focus{outline:0}"]
            }] }
];
/** @nocollapse */
ListComponent.ctorParameters = () => [
    { type: ElementRef }
];
ListComponent.propDecorators = {
    navigation: [{ type: Input }],
    selection: [{ type: Input }],
    listItems: [{ type: ContentChildren, args: [ListItemDirective, { descendants: true },] }],
    handleKeyboardEvent: [{ type: HostListener, args: ['document:keydown', ['$event'],] }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9jb21tb24vIiwic291cmNlcyI6WyJsaWIvbGlzdC9saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFJVCxTQUFTLEVBQ1QsS0FBSyxFQUNMLGVBQWUsRUFDZixZQUFZLEVBQ1osVUFBVSxFQUNYLE1BQU0sZUFBZSxDQUFDO0FBR3ZCLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBTzFELE1BQU0sT0FBTyxhQUFhOzs7O0lBNkR4QixZQUFvQixFQUFjO1FBQWQsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQXJEMUIsZ0JBQVcsR0FBRyxJQUFJLENBQUM7UUFTbkIsZUFBVSxHQUFHLElBQUksQ0FBQztRQXdCbEIsa0JBQWEsR0FBbUIsRUFBRSxDQUFDO0lBb0JOLENBQUM7Ozs7SUE1RHRDLElBQ0ksVUFBVTtRQUNaLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUMxQixDQUFDOzs7OztJQUNELElBQUksVUFBVSxDQUFDLEtBQWM7UUFDM0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7SUFDM0IsQ0FBQzs7OztJQUdELElBQ0ksU0FBUztRQUNYLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUN6QixDQUFDOzs7OztJQUNELElBQUksU0FBUyxDQUFDLEtBQWM7UUFDMUIsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7SUFDMUIsQ0FBQzs7OztJQUdELElBQUksWUFBWTtRQUNkLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQztJQUM1QixDQUFDOzs7OztJQUNELElBQUksWUFBWSxDQUFDLEtBQXdCO1FBQ3ZDLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO0lBQzdCLENBQUM7Ozs7SUFHRCxJQUFJLFdBQVc7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QUMsR0FBVztRQUMxQixRQUFRLEdBQUcsRUFBRTtZQUNYLEtBQUssRUFBRTtnQkFDTCxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7Z0JBQ3JCLE1BQU07WUFDUixLQUFLLEVBQUU7Z0JBQ0wsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO2dCQUNqQixNQUFNO1lBQ1I7Z0JBQ0UsTUFBTTtTQUNUO0lBQ0gsQ0FBQzs7Ozs7O0lBRU8sWUFBWSxDQUFDLElBQXVCO1FBQzFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDeEQsQ0FBQzs7O1lBOVFGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsVUFBVTtnQkFDcEIsa05BQW9DOzthQUVyQzs7OztZQVZDLFVBQVU7Ozt5QkFZVCxLQUFLO3dCQVNMLEtBQUs7d0JBaUNMLGVBQWUsU0FBQyxpQkFBaUIsRUFBRSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUU7a0NBR3hELFlBQVksU0FBQyxrQkFBa0IsRUFBRSxDQUFDLFFBQVEsQ0FBQzs7Ozs7OztJQXRDNUMsb0NBQTJCOzs7OztJQVMzQixtQ0FBMEI7Ozs7O0lBUzFCLHNDQUF5Qzs7Ozs7SUFXekMscUNBQXdDOzs7OztJQUV4QywwQ0FBbUM7Ozs7O0lBQ25DLG9DQUFrQzs7Ozs7SUFDbEMsc0NBQTJDOztJQUUzQyxrQ0FDd0M7Ozs7O0lBaUI1QiwyQkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBBZnRlclZpZXdJbml0LFxyXG4gIE9uSW5pdCxcclxuICBPbkRlc3Ryb3ksXHJcbiAgUXVlcnlMaXN0LFxyXG4gIElucHV0LFxyXG4gIENvbnRlbnRDaGlsZHJlbixcclxuICBIb3N0TGlzdGVuZXIsXHJcbiAgRWxlbWVudFJlZlxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7IExpc3RJdGVtRGlyZWN0aXZlIH0gZnJvbSAnLi9saXN0LWl0ZW0uZGlyZWN0aXZlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaWdvLWxpc3QnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9saXN0LmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9saXN0LmNvbXBvbmVudC5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIExpc3RDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkluaXQsIE9uRGVzdHJveSB7XHJcbiAgQElucHV0KClcclxuICBnZXQgbmF2aWdhdGlvbigpIHtcclxuICAgIHJldHVybiB0aGlzLl9uYXZpZ2F0aW9uO1xyXG4gIH1cclxuICBzZXQgbmF2aWdhdGlvbih2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgdGhpcy5fbmF2aWdhdGlvbiA9IHZhbHVlO1xyXG4gIH1cclxuICBwcml2YXRlIF9uYXZpZ2F0aW9uID0gdHJ1ZTtcclxuXHJcbiAgQElucHV0KClcclxuICBnZXQgc2VsZWN0aW9uKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX3NlbGVjdGlvbjtcclxuICB9XHJcbiAgc2V0IHNlbGVjdGlvbih2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgdGhpcy5fc2VsZWN0aW9uID0gdmFsdWU7XHJcbiAgfVxyXG4gIHByaXZhdGUgX3NlbGVjdGlvbiA9IHRydWU7XHJcblxyXG4gIGdldCBzZWxlY3RlZEl0ZW0oKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fc2VsZWN0ZWRJdGVtO1xyXG4gIH1cclxuICBzZXQgc2VsZWN0ZWRJdGVtKHZhbHVlOiBMaXN0SXRlbURpcmVjdGl2ZSkge1xyXG4gICAgdGhpcy5mb2N1c2VkSXRlbSA9IHZhbHVlO1xyXG4gICAgdGhpcy5fc2VsZWN0ZWRJdGVtID0gdmFsdWU7XHJcbiAgfVxyXG4gIHByaXZhdGUgX3NlbGVjdGVkSXRlbTogTGlzdEl0ZW1EaXJlY3RpdmU7XHJcblxyXG4gIGdldCBmb2N1c2VkSXRlbSgpIHtcclxuICAgIHJldHVybiB0aGlzLl9mb2N1c2VkSXRlbTtcclxuICB9XHJcbiAgc2V0IGZvY3VzZWRJdGVtKHZhbHVlOiBMaXN0SXRlbURpcmVjdGl2ZSkge1xyXG4gICAgdGhpcy5fZm9jdXNlZEl0ZW0gPSB2YWx1ZTtcclxuICAgIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMuc2Nyb2xsVG9JdGVtKHZhbHVlKTtcclxuICAgIH1cclxuICB9XHJcbiAgcHJpdmF0ZSBfZm9jdXNlZEl0ZW06IExpc3RJdGVtRGlyZWN0aXZlO1xyXG5cclxuICBwcml2YXRlIG5hdmlnYXRpb25FbmFibGVkOiBib29sZWFuO1xyXG4gIHByaXZhdGUgbGlzdEl0ZW1zJCQ6IFN1YnNjcmlwdGlvbjtcclxuICBwcml2YXRlIHN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XHJcblxyXG4gIEBDb250ZW50Q2hpbGRyZW4oTGlzdEl0ZW1EaXJlY3RpdmUsIHsgZGVzY2VuZGFudHM6IHRydWUgfSlcclxuICBsaXN0SXRlbXM6IFF1ZXJ5TGlzdDxMaXN0SXRlbURpcmVjdGl2ZT47XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ2RvY3VtZW50OmtleWRvd24nLCBbJyRldmVudCddKVxyXG4gIGhhbmRsZUtleWJvYXJkRXZlbnQoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcclxuICAgIC8vIEl0IHdvdWxkIGJlIG5pY2UgdG8gYmUgYWJsZSB0byB1bnN1YnNjcmliZSB0byB0aGUgZXZlbnRcclxuICAgIC8vIGNvbXBsZXRlbHkgYnV0IHVudGlsIEVTNyB0aGlzIHdvbid0IGJlIHBvc3NpYmxlIGJlY2F1c2VcclxuICAgIC8vIGRvY3VtZW50IGV2ZW50cyBhcmUgbm90IG9ic2VydmFibGVzXHJcbiAgICBpZiAodGhpcy5uYXZpZ2F0aW9uRW5hYmxlZCkge1xyXG4gICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMzggfHwgZXZlbnQua2V5Q29kZSA9PT0gNDApIHtcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIHRoaXMubmF2aWdhdGUoZXZlbnQua2V5Q29kZSk7XHJcbiAgICAgIH0gZWxzZSBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMTMpIHtcclxuICAgICAgICB0aGlzLnNlbGVjdCh0aGlzLmZvY3VzZWRJdGVtKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbDogRWxlbWVudFJlZikge31cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLmVuYWJsZU5hdmlnYXRpb24oKTtcclxuICB9XHJcblxyXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcclxuICAgIGlmICh0aGlzLmxpc3RJdGVtcy5sZW5ndGgpIHtcclxuICAgICAgdGhpcy5pbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5saXN0SXRlbXMkJCA9IHRoaXMubGlzdEl0ZW1zLmNoYW5nZXMuc3Vic2NyaWJlKFxyXG4gICAgICAoaXRlbXM6IExpc3RJdGVtRGlyZWN0aXZlW10pID0+IHRoaXMuaW5pdCgpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLmxpc3RJdGVtcyQkLnVuc3Vic2NyaWJlKCk7XHJcbiAgfVxyXG5cclxuICBmb2N1cyhpdGVtPzogTGlzdEl0ZW1EaXJlY3RpdmUpIHtcclxuICAgIGlmICghdGhpcy5zZWxlY3Rpb24pIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMudW5mb2N1cygpO1xyXG5cclxuICAgIC8vIFdlIG5lZWQgdG8gbWFrZSB0aGlzIGNoZWNrIGJlY2F1c2UgZHluYW1pY1xyXG4gICAgLy8gbGlzdHMgc3VjaCBhcyBpbiB0aGUgc2VhcmNoIHJlc3VsdHMgbGlzdCBtYXkgZmFpbFxyXG4gICAgaWYgKGl0ZW0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBpdGVtLmZvY3VzZWQgPSB0cnVlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdW5mb2N1cygpIHtcclxuICAgIGlmICh0aGlzLmZvY3VzZWRJdGVtICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5mb2N1c2VkSXRlbS5mb2N1c2VkID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5mb2N1c2VkSXRlbSA9IHVuZGVmaW5lZDtcclxuICB9XHJcblxyXG4gIGZvY3VzTmV4dCgpIHtcclxuICAgIGNvbnN0IGl0ZW1zID0gdGhpcy5saXN0SXRlbXMudG9BcnJheSgpO1xyXG4gICAgbGV0IGl0ZW07XHJcbiAgICBsZXQgZGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgbGV0IGluZGV4ID0gdGhpcy5nZXRGb2N1c2VkSW5kZXgoKTtcclxuICAgIGlmIChpbmRleCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIGluZGV4ID0gLTE7XHJcbiAgICB9XHJcblxyXG4gICAgd2hpbGUgKGRpc2FibGVkICYmIGluZGV4IDwgaXRlbXMubGVuZ3RoIC0gMSkge1xyXG4gICAgICBpbmRleCArPSAxO1xyXG4gICAgICBpdGVtID0gaXRlbXNbaW5kZXhdO1xyXG4gICAgICBkaXNhYmxlZCA9IGl0ZW0uZGlzYWJsZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGl0ZW0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLmZvY3VzKGl0ZW0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZm9jdXNQcmV2aW91cygpIHtcclxuICAgIGNvbnN0IGl0ZW1zID0gdGhpcy5saXN0SXRlbXMudG9BcnJheSgpO1xyXG4gICAgbGV0IGl0ZW07XHJcbiAgICBsZXQgZGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgbGV0IGluZGV4ID0gdGhpcy5nZXRGb2N1c2VkSW5kZXgoKTtcclxuXHJcbiAgICB3aGlsZSAoZGlzYWJsZWQgJiYgaW5kZXggPiAwKSB7XHJcbiAgICAgIGluZGV4IC09IDE7XHJcbiAgICAgIGl0ZW0gPSBpdGVtc1tpbmRleF07XHJcbiAgICAgIGRpc2FibGVkID0gaXRlbS5kaXNhYmxlZDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoaXRlbSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMuZm9jdXMoaXRlbSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzZWxlY3QoaXRlbT86IExpc3RJdGVtRGlyZWN0aXZlKSB7XHJcbiAgICBpZiAoIXRoaXMuc2VsZWN0aW9uKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnVuc2VsZWN0KCk7XHJcblxyXG4gICAgaWYgKGl0ZW0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBpdGVtLnNlbGVjdGVkID0gdHJ1ZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHVuc2VsZWN0KCkge1xyXG4gICAgdGhpcy51bmZvY3VzKCk7XHJcblxyXG4gICAgaWYgKHRoaXMuc2VsZWN0ZWRJdGVtICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5zZWxlY3RlZEl0ZW0uc2VsZWN0ZWQgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnNlbGVjdGVkSXRlbSA9IHVuZGVmaW5lZDtcclxuICB9XHJcblxyXG4gIGVuYWJsZU5hdmlnYXRpb24oKSB7XHJcbiAgICBpZiAodGhpcy5uYXZpZ2F0aW9uKSB7XHJcbiAgICAgIHRoaXMubmF2aWdhdGlvbkVuYWJsZWQgPSB0cnVlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZGlzYWJsZU5hdmlnYXRpb24oKSB7XHJcbiAgICB0aGlzLm5hdmlnYXRpb25FbmFibGVkID0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGluaXQoKSB7XHJcbiAgICB0aGlzLnN1YnNjcmliZSgpO1xyXG5cclxuICAgIHRoaXMuc2VsZWN0ZWRJdGVtID0gdGhpcy5maW5kU2VsZWN0ZWRJdGVtKCk7XHJcbiAgICB0aGlzLmZvY3VzZWRJdGVtID0gdGhpcy5maW5kRm9jdXNlZEl0ZW0oKTtcclxuXHJcbiAgICB0aGlzLmVuYWJsZU5hdmlnYXRpb24oKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgc3Vic2NyaWJlKCkge1xyXG4gICAgdGhpcy51bnN1YnNjcmliZSgpO1xyXG5cclxuICAgIHRoaXMubGlzdEl0ZW1zLnRvQXJyYXkoKS5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcclxuICAgICAgICBpdGVtLmJlZm9yZVNlbGVjdC5zdWJzY3JpYmUoKGl0ZW0yOiBMaXN0SXRlbURpcmVjdGl2ZSkgPT5cclxuICAgICAgICAgIHRoaXMuaGFuZGxlSXRlbUJlZm9yZVNlbGVjdChpdGVtMilcclxuICAgICAgICApXHJcbiAgICAgICk7XHJcblxyXG4gICAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcclxuICAgICAgICBpdGVtLnNlbGVjdC5zdWJzY3JpYmUoKGl0ZW0yOiBMaXN0SXRlbURpcmVjdGl2ZSkgPT5cclxuICAgICAgICAgIHRoaXMuaGFuZGxlSXRlbVNlbGVjdChpdGVtMilcclxuICAgICAgICApXHJcbiAgICAgICk7XHJcblxyXG4gICAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcclxuICAgICAgICBpdGVtLmJlZm9yZUZvY3VzLnN1YnNjcmliZSgoaXRlbTI6IExpc3RJdGVtRGlyZWN0aXZlKSA9PlxyXG4gICAgICAgICAgdGhpcy5oYW5kbGVJdGVtQmVmb3JlRm9jdXMoaXRlbTIpXHJcbiAgICAgICAgKVxyXG4gICAgICApO1xyXG5cclxuICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goXHJcbiAgICAgICAgaXRlbS5mb2N1cy5zdWJzY3JpYmUoKGl0ZW0yOiBMaXN0SXRlbURpcmVjdGl2ZSkgPT5cclxuICAgICAgICAgIHRoaXMuaGFuZGxlSXRlbUZvY3VzKGl0ZW0yKVxyXG4gICAgICAgIClcclxuICAgICAgKTtcclxuICAgIH0sIHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSB1bnN1YnNjcmliZSgpIHtcclxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5mb3JFYWNoKChzdWI6IFN1YnNjcmlwdGlvbikgPT4gc3ViLnVuc3Vic2NyaWJlKCkpO1xyXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zID0gW107XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGhhbmRsZUl0ZW1CZWZvcmVGb2N1cyhpdGVtOiBMaXN0SXRlbURpcmVjdGl2ZSkge1xyXG4gICAgaWYgKGl0ZW0gIT09IHRoaXMuZm9jdXNlZEl0ZW0pIHtcclxuICAgICAgdGhpcy51bnNlbGVjdCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBoYW5kbGVJdGVtRm9jdXMoaXRlbTogTGlzdEl0ZW1EaXJlY3RpdmUpIHtcclxuICAgIHRoaXMuZm9jdXNlZEl0ZW0gPSBpdGVtO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBoYW5kbGVJdGVtQmVmb3JlU2VsZWN0KGl0ZW06IExpc3RJdGVtRGlyZWN0aXZlKSB7XHJcbiAgICBpZiAoaXRlbSAhPT0gdGhpcy5mb2N1c2VkSXRlbSkge1xyXG4gICAgICB0aGlzLnVuc2VsZWN0KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGhhbmRsZUl0ZW1TZWxlY3QoaXRlbTogTGlzdEl0ZW1EaXJlY3RpdmUpIHtcclxuICAgIHRoaXMuc2VsZWN0ZWRJdGVtID0gaXRlbTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZmluZFNlbGVjdGVkSXRlbSgpIHtcclxuICAgIHJldHVybiB0aGlzLmxpc3RJdGVtcy50b0FycmF5KCkuZmluZChpdGVtID0+IGl0ZW0uc2VsZWN0ZWQpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBmaW5kRm9jdXNlZEl0ZW0oKSB7XHJcbiAgICByZXR1cm4gdGhpcy5saXN0SXRlbXMudG9BcnJheSgpLmZpbmQoaXRlbSA9PiBpdGVtLmZvY3VzZWQpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRGb2N1c2VkSW5kZXgoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5saXN0SXRlbXNcclxuICAgICAgLnRvQXJyYXkoKVxyXG4gICAgICAuZmluZEluZGV4KGl0ZW0gPT4gaXRlbSA9PT0gdGhpcy5mb2N1c2VkSXRlbSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG5hdmlnYXRlKGtleTogbnVtYmVyKSB7XHJcbiAgICBzd2l0Y2ggKGtleSkge1xyXG4gICAgICBjYXNlIDM4OlxyXG4gICAgICAgIHRoaXMuZm9jdXNQcmV2aW91cygpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIDQwOlxyXG4gICAgICAgIHRoaXMuZm9jdXNOZXh0KCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHNjcm9sbFRvSXRlbShpdGVtOiBMaXN0SXRlbURpcmVjdGl2ZSkge1xyXG4gICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LnNjcm9sbFRvcCA9IGl0ZW0uZ2V0T2Zmc2V0VG9wKCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==
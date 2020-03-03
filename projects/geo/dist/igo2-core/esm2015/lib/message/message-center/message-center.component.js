/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
export class MessageCenterComponent {
    constructor() {
        this._options = {};
    }
    /**
     * @return {?}
     */
    get options() {
        return Object.assign({}, MessageCenterComponent.defaultOptions, this._options);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set options(value) {
        this._options = value;
    }
}
MessageCenterComponent.defaultOptions = {
    timeOut: 5000,
    hasCloseIcon: false,
    showProgressBar: true,
    pauseOnHover: true,
    clickToClose: true,
    maxLength: 100,
    maxStack: 3,
    preventDuplicates: true
};
MessageCenterComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-message-center',
                template: "<simple-notifications\r\n  class=\"mat-typography\"\r\n  [ngClass]=\"{closeIcon: options.hasCloseIcon}\"\r\n  [options]=\"options\">\r\n</simple-notifications>\r\n",
                styles: ["@charset \"UTF-8\";:host>>>div.simple-notification-wrapper{bottom:0;right:calc(50% - 150px)}:host>>>div.simple-notification{min-height:50px;margin-bottom:5px;padding-left:45px;padding-right:25px}:host>>>div.simple-notification.noIcon{padding-left:25px}@media only screen and (orientation:portrait) and (max-width:599px),only screen and (orientation:landscape) and (max-width:959px){:host>>>div.simple-notification-wrapper{right:0;left:0;width:100%}:host>>>div.simple-notification{margin-bottom:0}}:host>>>div.simple-notification .sn-title{line-height:23px;font-size:15px;font-weight:700}:host>>>div.simple-notification .sn-content{line-height:18px;font-size:15px}:host>>>div.simple-notification .icon{top:0;left:0;width:45px;height:100%;padding:7px}:host>>>div.simple-notification .icon mat-icon{display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center;height:100%;font-size:32px}:host>>>.closeIcon>>>.sn-title:after{content:'close';font-family:'Material Icons';font-feature-settings:'liga' 1;font-size:24px;font-weight:400;right:5px;top:5px;position:absolute}"]
            }] }
];
/** @nocollapse */
MessageCenterComponent.ctorParameters = () => [];
MessageCenterComponent.propDecorators = {
    options: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    MessageCenterComponent.defaultOptions;
    /**
     * @type {?}
     * @private
     */
    MessageCenterComponent.prototype._options;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZS1jZW50ZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9tZXNzYWdlL21lc3NhZ2UtY2VudGVyL21lc3NhZ2UtY2VudGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFPakQsTUFBTSxPQUFPLHNCQUFzQjtJQXlCakM7UUFGUSxhQUFRLEdBQVEsRUFBRSxDQUFDO0lBRVosQ0FBQzs7OztJQWJoQixJQUNJLE9BQU87UUFDVCxPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQ2xCLEVBQUUsRUFDRixzQkFBc0IsQ0FBQyxjQUFjLEVBQ3JDLElBQUksQ0FBQyxRQUFRLENBQ2QsQ0FBQztJQUNKLENBQUM7Ozs7O0lBQ0QsSUFBSSxPQUFPLENBQUMsS0FBVTtRQUNwQixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztJQUN4QixDQUFDOztBQXJCTSxxQ0FBYyxHQUFHO0lBQ3RCLE9BQU8sRUFBRSxJQUFJO0lBQ2IsWUFBWSxFQUFFLEtBQUs7SUFDbkIsZUFBZSxFQUFFLElBQUk7SUFDckIsWUFBWSxFQUFFLElBQUk7SUFDbEIsWUFBWSxFQUFFLElBQUk7SUFDbEIsU0FBUyxFQUFFLEdBQUc7SUFDZCxRQUFRLEVBQUUsQ0FBQztJQUNYLGlCQUFpQixFQUFFLElBQUk7Q0FDeEIsQ0FBQzs7WUFmSCxTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLG9CQUFvQjtnQkFDOUIsK0tBQThDOzthQUUvQzs7Ozs7c0JBYUUsS0FBSzs7OztJQVhOLHNDQVNFOzs7OztJQWFGLDBDQUEyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaWdvLW1lc3NhZ2UtY2VudGVyJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vbWVzc2FnZS1jZW50ZXIuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL21lc3NhZ2UtY2VudGVyLmNvbXBvbmVudC5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIE1lc3NhZ2VDZW50ZXJDb21wb25lbnQge1xyXG4gIHN0YXRpYyBkZWZhdWx0T3B0aW9ucyA9IHtcclxuICAgIHRpbWVPdXQ6IDUwMDAsXHJcbiAgICBoYXNDbG9zZUljb246IGZhbHNlLFxyXG4gICAgc2hvd1Byb2dyZXNzQmFyOiB0cnVlLFxyXG4gICAgcGF1c2VPbkhvdmVyOiB0cnVlLFxyXG4gICAgY2xpY2tUb0Nsb3NlOiB0cnVlLFxyXG4gICAgbWF4TGVuZ3RoOiAxMDAsXHJcbiAgICBtYXhTdGFjazogMyxcclxuICAgIHByZXZlbnREdXBsaWNhdGVzOiB0cnVlXHJcbiAgfTtcclxuXHJcbiAgQElucHV0KClcclxuICBnZXQgb3B0aW9ucygpOiBhbnkge1xyXG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oXHJcbiAgICAgIHt9LFxyXG4gICAgICBNZXNzYWdlQ2VudGVyQ29tcG9uZW50LmRlZmF1bHRPcHRpb25zLFxyXG4gICAgICB0aGlzLl9vcHRpb25zXHJcbiAgICApO1xyXG4gIH1cclxuICBzZXQgb3B0aW9ucyh2YWx1ZTogYW55KSB7XHJcbiAgICB0aGlzLl9vcHRpb25zID0gdmFsdWU7XHJcbiAgfVxyXG4gIHByaXZhdGUgX29wdGlvbnM6IGFueSA9IHt9O1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHt9XHJcbn1cclxuIl19
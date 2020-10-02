/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
var MessageCenterComponent = /** @class */ (function () {
    function MessageCenterComponent() {
        this._options = {};
    }
    Object.defineProperty(MessageCenterComponent.prototype, "options", {
        get: /**
         * @return {?}
         */
        function () {
            return Object.assign({}, MessageCenterComponent.defaultOptions, this._options);
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._options = value;
        },
        enumerable: true,
        configurable: true
    });
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
    MessageCenterComponent.ctorParameters = function () { return []; };
    MessageCenterComponent.propDecorators = {
        options: [{ type: Input }]
    };
    return MessageCenterComponent;
}());
export { MessageCenterComponent };
if (false) {
    /** @type {?} */
    MessageCenterComponent.defaultOptions;
    /**
     * @type {?}
     * @private
     */
    MessageCenterComponent.prototype._options;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZS1jZW50ZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9tZXNzYWdlL21lc3NhZ2UtY2VudGVyL21lc3NhZ2UtY2VudGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFakQ7SUE4QkU7UUFGUSxhQUFRLEdBQVEsRUFBRSxDQUFDO0lBRVosQ0FBQztJQWJoQixzQkFDSSwyQ0FBTzs7OztRQURYO1lBRUUsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUNsQixFQUFFLEVBQ0Ysc0JBQXNCLENBQUMsY0FBYyxFQUNyQyxJQUFJLENBQUMsUUFBUSxDQUNkLENBQUM7UUFDSixDQUFDOzs7OztRQUNELFVBQVksS0FBVTtZQUNwQixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUN4QixDQUFDOzs7T0FIQTtJQWxCTSxxQ0FBYyxHQUFHO1FBQ3RCLE9BQU8sRUFBRSxJQUFJO1FBQ2IsWUFBWSxFQUFFLEtBQUs7UUFDbkIsZUFBZSxFQUFFLElBQUk7UUFDckIsWUFBWSxFQUFFLElBQUk7UUFDbEIsWUFBWSxFQUFFLElBQUk7UUFDbEIsU0FBUyxFQUFFLEdBQUc7UUFDZCxRQUFRLEVBQUUsQ0FBQztRQUNYLGlCQUFpQixFQUFFLElBQUk7S0FDeEIsQ0FBQzs7Z0JBZkgsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxvQkFBb0I7b0JBQzlCLCtLQUE4Qzs7aUJBRS9DOzs7OzswQkFhRSxLQUFLOztJQWNSLDZCQUFDO0NBQUEsQUEvQkQsSUErQkM7U0ExQlksc0JBQXNCOzs7SUFDakMsc0NBU0U7Ozs7O0lBYUYsMENBQTJCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdpZ28tbWVzc2FnZS1jZW50ZXInLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9tZXNzYWdlLWNlbnRlci5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vbWVzc2FnZS1jZW50ZXIuY29tcG9uZW50LnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTWVzc2FnZUNlbnRlckNvbXBvbmVudCB7XHJcbiAgc3RhdGljIGRlZmF1bHRPcHRpb25zID0ge1xyXG4gICAgdGltZU91dDogNTAwMCxcclxuICAgIGhhc0Nsb3NlSWNvbjogZmFsc2UsXHJcbiAgICBzaG93UHJvZ3Jlc3NCYXI6IHRydWUsXHJcbiAgICBwYXVzZU9uSG92ZXI6IHRydWUsXHJcbiAgICBjbGlja1RvQ2xvc2U6IHRydWUsXHJcbiAgICBtYXhMZW5ndGg6IDEwMCxcclxuICAgIG1heFN0YWNrOiAzLFxyXG4gICAgcHJldmVudER1cGxpY2F0ZXM6IHRydWVcclxuICB9O1xyXG5cclxuICBASW5wdXQoKVxyXG4gIGdldCBvcHRpb25zKCk6IGFueSB7XHJcbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihcclxuICAgICAge30sXHJcbiAgICAgIE1lc3NhZ2VDZW50ZXJDb21wb25lbnQuZGVmYXVsdE9wdGlvbnMsXHJcbiAgICAgIHRoaXMuX29wdGlvbnNcclxuICAgICk7XHJcbiAgfVxyXG4gIHNldCBvcHRpb25zKHZhbHVlOiBhbnkpIHtcclxuICAgIHRoaXMuX29wdGlvbnMgPSB2YWx1ZTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfb3B0aW9uczogYW55ID0ge307XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge31cclxufVxyXG4iXX0=
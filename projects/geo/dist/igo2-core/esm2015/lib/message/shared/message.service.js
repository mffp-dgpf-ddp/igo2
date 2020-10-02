/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NotificationsService } from 'angular2-notifications';
import { ConfigService } from '../../config/config.service';
import { MessageType } from './message.enum';
import * as i0 from "@angular/core";
import * as i1 from "angular2-notifications";
import * as i2 from "../../config/config.service";
export class MessageService {
    /**
     * @param {?} notificationService
     * @param {?} configService
     */
    constructor(notificationService, configService) {
        this.notificationService = notificationService;
        this.configService = configService;
        this.messages$ = new BehaviorSubject([]);
        this.options = this.configService.getConfig('message') || {};
    }
    /**
     * @param {?} httpError
     * @return {?}
     */
    showError(httpError) {
        httpError.error.caught = true;
        return this.error(httpError.error.message, httpError.error.title);
    }
    /**
     * @param {?} message
     * @return {?}
     */
    message(message) {
        this.messages$.next(this.messages$.value.concat([message]));
        message.options = message.options || {};
        message = this.handleTemplate(message);
        /** @type {?} */
        let notification;
        if (message.text) {
            notification = this.notificationService.create(message.title, message.text, (/** @type {?} */ (((/** @type {?} */ (message.type))))), message.options);
        }
        else if (message.html) {
            if (!message.icon) {
                message.options.theClass = message.options.theClass
                    ? message.options.theClass + ' noIcon'
                    : 'noIcon';
            }
            notification = this.notificationService.html(message.html, (/** @type {?} */ (((/** @type {?} */ (message.type))))), message.options);
        }
        else {
            return;
        }
        if (message.icon !== undefined) {
            this.addIcon(notification, message.icon);
        }
        return notification;
    }
    /**
     * @param {?} text
     * @param {?=} title
     * @param {?=} options
     * @return {?}
     */
    success(text, title, options = {}) {
        return this.message({
            text,
            title,
            icon: options.icon || 'check',
            options,
            type: MessageType.SUCCESS
        });
    }
    /**
     * @param {?} text
     * @param {?=} title
     * @param {?=} options
     * @return {?}
     */
    error(text, title, options = {}) {
        return this.message({
            text,
            title,
            icon: options.icon || 'error_outline',
            options,
            type: MessageType.ERROR
        });
    }
    /**
     * @param {?} text
     * @param {?=} title
     * @param {?=} options
     * @return {?}
     */
    info(text, title, options = {}) {
        return this.message({
            text,
            title,
            icon: options.icon || 'info_outline',
            options,
            type: MessageType.INFO
        });
    }
    /**
     * @param {?} text
     * @param {?=} title
     * @param {?=} options
     * @return {?}
     */
    alert(text, title, options = {}) {
        return this.message({
            text,
            title,
            icon: options.icon || 'access_alarm',
            options,
            type: MessageType.ALERT
        });
    }
    /**
     * @param {?=} id
     * @return {?}
     */
    remove(id) {
        this.notificationService.remove(id);
    }
    /**
     * @private
     * @param {?} notification
     * @param {?} icon
     * @return {?}
     */
    addIcon(notification, icon) {
        // There is no way to add an icon to a notification when reating
        // it so we simply set it on the notification directly.
        // See https://github.com/flauc/angular2-notifications/issues/165
        notification.icon = `
      <mat-icon class="material-icons mat-icon mat-list-avatar" svgIcon="${icon}">
      </mat-icon>`;
    }
    /**
     * @private
     * @param {?} message
     * @return {?}
     */
    handleTemplate(message) {
        if (!this.options.template || message.html) {
            return message;
        }
        /** @type {?} */
        let html = this.options.template;
        html = html.replace('${text}', message.text);
        html = html.replace('${title}', message.title);
        html = html.replace('${icon}', message.icon);
        message.html = html;
        message.text = undefined;
        message.title = undefined;
        message.icon = undefined;
        return message;
    }
}
MessageService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
MessageService.ctorParameters = () => [
    { type: NotificationsService },
    { type: ConfigService }
];
/** @nocollapse */ MessageService.ngInjectableDef = i0.defineInjectable({ factory: function MessageService_Factory() { return new MessageService(i0.inject(i1.NotificationsService), i0.inject(i2.ConfigService)); }, token: MessageService, providedIn: "root" });
if (false) {
    /** @type {?} */
    MessageService.prototype.messages$;
    /**
     * @type {?}
     * @private
     */
    MessageService.prototype.options;
    /**
     * @type {?}
     * @private
     */
    MessageService.prototype.notificationService;
    /**
     * @type {?}
     * @private
     */
    MessageService.prototype.configService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9tZXNzYWdlL3NoYXJlZC9tZXNzYWdlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN2QyxPQUFPLEVBQWdCLG9CQUFvQixFQUFtQixNQUFNLHdCQUF3QixDQUFDO0FBRTdGLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUc1RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7QUFLN0MsTUFBTSxPQUFPLGNBQWM7Ozs7O0lBSXpCLFlBQ1UsbUJBQXlDLEVBQ3pDLGFBQTRCO1FBRDVCLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBc0I7UUFDekMsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFML0IsY0FBUyxHQUFHLElBQUksZUFBZSxDQUFZLEVBQUUsQ0FBQyxDQUFDO1FBT3BELElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQy9ELENBQUM7Ozs7O0lBRUQsU0FBUyxDQUFDLFNBQTRCO1FBQ3BDLFNBQVMsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUM5QixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNwRSxDQUFDOzs7OztJQUVELE9BQU8sQ0FBQyxPQUFnQjtRQUN0QixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMs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LENBQUM7Ozs7Ozs7SUFFTyxPQUFPLENBQUMsWUFBMEIsRUFBRSxJQUFZO1FBQ3RELGdFQUFnRTtRQUNoRSx1REFBdUQ7UUFDdkQsaUVBQWlFO1FBQ2pFLFlBQVksQ0FBQyxJQUFJLEdBQUc7MkVBQ21ELElBQUk7a0JBQzdELENBQUM7SUFDakIsQ0FBQzs7Ozs7O0lBRU8sY0FBYyxDQUFDLE9BQWdCO1FBQ3JDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsSUFBSSxPQUFPLENBQUMsSUFBSSxFQUFFO1lBQzFDLE9BQU8sT0FBTyxDQUFDO1NBQ2hCOztZQUVHLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVE7UUFDaEMsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3QyxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQy9DLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFN0MsT0FBTyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDcEIsT0FBTyxDQUFDLElBQUksR0FBRyxTQUFTLENBQUM7UUFDekIsT0FBTyxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUM7UUFDMUIsT0FBTyxDQUFDLElBQUksR0FBRyxTQUFTLENBQUM7UUFDekIsT0FBTyxPQUFPLENBQUM7SUFDakIsQ0FBQzs7O1lBNUhGLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQjs7OztZQVRzQixvQkFBb0I7WUFFbEMsYUFBYTs7Ozs7SUFTcEIsbUNBQXNEOzs7OztJQUN0RCxpQ0FBZ0M7Ozs7O0lBRzlCLDZDQUFpRDs7Ozs7SUFDakQsdUNBQW9DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBIdHRwRXJyb3JSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IE5vdGlmaWNhdGlvbiwgTm90aWZpY2F0aW9uc1NlcnZpY2UsIE5vdGlmaWNhdGlvblR5cGV9IGZyb20gJ2FuZ3VsYXIyLW5vdGlmaWNhdGlvbnMnO1xyXG5cclxuaW1wb3J0IHsgQ29uZmlnU2VydmljZSB9IGZyb20gJy4uLy4uL2NvbmZpZy9jb25maWcuc2VydmljZSc7XHJcblxyXG5pbXBvcnQgeyBNZXNzYWdlLCBNZXNzYWdlT3B0aW9ucyB9IGZyb20gJy4vbWVzc2FnZS5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBNZXNzYWdlVHlwZSB9IGZyb20gJy4vbWVzc2FnZS5lbnVtJztcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIE1lc3NhZ2VTZXJ2aWNlIHtcclxuICBwdWJsaWMgbWVzc2FnZXMkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxNZXNzYWdlW10+KFtdKTtcclxuICBwcml2YXRlIG9wdGlvbnM6IE1lc3NhZ2VPcHRpb25zO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgbm90aWZpY2F0aW9uU2VydmljZTogTm90aWZpY2F0aW9uc1NlcnZpY2UsXHJcbiAgICBwcml2YXRlIGNvbmZpZ1NlcnZpY2U6IENvbmZpZ1NlcnZpY2VcclxuICApIHtcclxuICAgIHRoaXMub3B0aW9ucyA9IHRoaXMuY29uZmlnU2VydmljZS5nZXRDb25maWcoJ21lc3NhZ2UnKSB8fCB7fTtcclxuICB9XHJcblxyXG4gIHNob3dFcnJvcihodHRwRXJyb3I6IEh0dHBFcnJvclJlc3BvbnNlKSB7XHJcbiAgICBodHRwRXJyb3IuZXJyb3IuY2F1Z2h0ID0gdHJ1ZTtcclxuICAgIHJldHVybiB0aGlzLmVycm9yKGh0dHBFcnJvci5lcnJvci5tZXNzYWdlLCBodHRwRXJyb3IuZXJyb3IudGl0bGUpO1xyXG4gIH1cclxuXHJcbiAgbWVzc2FnZShtZXNzYWdlOiBNZXNzYWdlKSB7XHJcbiAgICB0aGlzLm1lc3NhZ2VzJC5uZXh0KHRoaXMubWVzc2FnZXMkLnZhbHVlLmNvbmNhdChbbWVzc2FnZV0pKTtcclxuXHJcbiAgICBtZXNzYWdlLm9wdGlvbnMgPSBtZXNzYWdlLm9wdGlvbnMgfHwge307XHJcbiAgICBtZXNzYWdlID0gdGhpcy5oYW5kbGVUZW1wbGF0ZShtZXNzYWdlKTtcclxuXHJcbiAgICBsZXQgbm90aWZpY2F0aW9uOiBOb3RpZmljYXRpb247XHJcbiAgICBpZiAobWVzc2FnZS50ZXh0KSB7XHJcbiAgICAgIG5vdGlmaWNhdGlvbiA9IHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5jcmVhdGUoXHJcbiAgICAgICAgbWVzc2FnZS50aXRsZSxcclxuICAgICAgICBtZXNzYWdlLnRleHQsXHJcbiAgICAgICAgKG1lc3NhZ2UudHlwZSBhcyBhbnkpIGFzIE5vdGlmaWNhdGlvblR5cGUsXHJcbiAgICAgICAgbWVzc2FnZS5vcHRpb25zXHJcbiAgICAgICk7XHJcbiAgICB9IGVsc2UgaWYgKG1lc3NhZ2UuaHRtbCkge1xyXG4gICAgICBpZiAoIW1lc3NhZ2UuaWNvbikge1xyXG4gICAgICAgIG1lc3NhZ2Uub3B0aW9ucy50aGVDbGFzcyA9IG1lc3NhZ2Uub3B0aW9ucy50aGVDbGFzc1xyXG4gICAgICAgICAgPyBtZXNzYWdlLm9wdGlvbnMudGhlQ2xhc3MgKyAnIG5vSWNvbidcclxuICAgICAgICAgIDogJ25vSWNvbic7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIG5vdGlmaWNhdGlvbiA9IHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5odG1sKFxyXG4gICAgICAgIG1lc3NhZ2UuaHRtbCxcclxuICAgICAgICAobWVzc2FnZS50eXBlIGFzIGFueSkgYXMgTm90aWZpY2F0aW9uVHlwZSxcclxuICAgICAgICBtZXNzYWdlLm9wdGlvbnNcclxuICAgICAgKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAobWVzc2FnZS5pY29uICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5hZGRJY29uKG5vdGlmaWNhdGlvbiwgbWVzc2FnZS5pY29uKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbm90aWZpY2F0aW9uO1xyXG4gIH1cclxuXHJcbiAgc3VjY2Vzcyh0ZXh0OiBzdHJpbmcsIHRpdGxlPzogc3RyaW5nLCBvcHRpb25zOiBhbnkgPSB7fSkge1xyXG4gICAgcmV0dXJuIHRoaXMubWVzc2FnZSh7XHJcbiAgICAgIHRleHQsXHJcbiAgICAgIHRpdGxlLFxyXG4gICAgICBpY29uOiBvcHRpb25zLmljb24gfHwgJ2NoZWNrJyxcclxuICAgICAgb3B0aW9ucyxcclxuICAgICAgdHlwZTogTWVzc2FnZVR5cGUuU1VDQ0VTU1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBlcnJvcih0ZXh0OiBzdHJpbmcsIHRpdGxlPzogc3RyaW5nLCBvcHRpb25zOiBhbnkgPSB7fSkge1xyXG4gICAgcmV0dXJuIHRoaXMubWVzc2FnZSh7XHJcbiAgICAgIHRleHQsXHJcbiAgICAgIHRpdGxlLFxyXG4gICAgICBpY29uOiBvcHRpb25zLmljb24gfHwgJ2Vycm9yX291dGxpbmUnLFxyXG4gICAgICBvcHRpb25zLFxyXG4gICAgICB0eXBlOiBNZXNzYWdlVHlwZS5FUlJPUlxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBpbmZvKHRleHQ6IHN0cmluZywgdGl0bGU/OiBzdHJpbmcsIG9wdGlvbnM6IGFueSA9IHt9KSB7XHJcbiAgICByZXR1cm4gdGhpcy5tZXNzYWdlKHtcclxuICAgICAgdGV4dCxcclxuICAgICAgdGl0bGUsXHJcbiAgICAgIGljb246IG9wdGlvbnMuaWNvbiB8fCAnaW5mb19vdXRsaW5lJyxcclxuICAgICAgb3B0aW9ucyxcclxuICAgICAgdHlwZTogTWVzc2FnZVR5cGUuSU5GT1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBhbGVydCh0ZXh0OiBzdHJpbmcsIHRpdGxlPzogc3RyaW5nLCBvcHRpb25zOiBhbnkgPSB7fSkge1xyXG4gICAgcmV0dXJuIHRoaXMubWVzc2FnZSh7XHJcbiAgICAgIHRleHQsXHJcbiAgICAgIHRpdGxlLFxyXG4gICAgICBpY29uOiBvcHRpb25zLmljb24gfHwgJ2FjY2Vzc19hbGFybScsXHJcbiAgICAgIG9wdGlvbnMsXHJcbiAgICAgIHR5cGU6IE1lc3NhZ2VUeXBlLkFMRVJUXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHJlbW92ZShpZD86IHN0cmluZykge1xyXG4gICAgdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLnJlbW92ZShpZCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGFkZEljb24obm90aWZpY2F0aW9uOiBOb3RpZmljYXRpb24sIGljb246IHN0cmluZykge1xyXG4gICAgLy8gVGhlcmUgaXMgbm8gd2F5IHRvIGFkZCBhbiBpY29uIHRvIGEgbm90aWZpY2F0aW9uIHdoZW4gcmVhdGluZ1xyXG4gICAgLy8gaXQgc28gd2Ugc2ltcGx5IHNldCBpdCBvbiB0aGUgbm90aWZpY2F0aW9uIGRpcmVjdGx5LlxyXG4gICAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9mbGF1Yy9hbmd1bGFyMi1ub3RpZmljYXRpb25zL2lzc3Vlcy8xNjVcclxuICAgIG5vdGlmaWNhdGlvbi5pY29uID0gYFxyXG4gICAgICA8bWF0LWljb24gY2xhc3M9XCJtYXRlcmlhbC1pY29ucyBtYXQtaWNvbiBtYXQtbGlzdC1hdmF0YXJcIiBzdmdJY29uPVwiJHtpY29ufVwiPlxyXG4gICAgICA8L21hdC1pY29uPmA7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGhhbmRsZVRlbXBsYXRlKG1lc3NhZ2U6IE1lc3NhZ2UpOiBNZXNzYWdlIHtcclxuICAgIGlmICghdGhpcy5vcHRpb25zLnRlbXBsYXRlIHx8IG1lc3NhZ2UuaHRtbCkge1xyXG4gICAgICByZXR1cm4gbWVzc2FnZTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgaHRtbCA9IHRoaXMub3B0aW9ucy50ZW1wbGF0ZTtcclxuICAgIGh0bWwgPSBodG1sLnJlcGxhY2UoJyR7dGV4dH0nLCBtZXNzYWdlLnRleHQpO1xyXG4gICAgaHRtbCA9IGh0bWwucmVwbGFjZSgnJHt0aXRsZX0nLCBtZXNzYWdlLnRpdGxlKTtcclxuICAgIGh0bWwgPSBodG1sLnJlcGxhY2UoJyR7aWNvbn0nLCBtZXNzYWdlLmljb24pO1xyXG5cclxuICAgIG1lc3NhZ2UuaHRtbCA9IGh0bWw7XHJcbiAgICBtZXNzYWdlLnRleHQgPSB1bmRlZmluZWQ7XHJcbiAgICBtZXNzYWdlLnRpdGxlID0gdW5kZWZpbmVkO1xyXG4gICAgbWVzc2FnZS5pY29uID0gdW5kZWZpbmVkO1xyXG4gICAgcmV0dXJuIG1lc3NhZ2U7XHJcbiAgfVxyXG59XHJcbiJdfQ==
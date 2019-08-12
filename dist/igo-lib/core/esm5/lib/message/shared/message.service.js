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
var MessageService = /** @class */ (function () {
    function MessageService(notificationService, configService) {
        this.notificationService = notificationService;
        this.configService = configService;
        this.messages$ = new BehaviorSubject([]);
        this.options = this.configService.getConfig('message') || {};
    }
    /**
     * @param {?} httpError
     * @return {?}
     */
    MessageService.prototype.showError = /**
     * @param {?} httpError
     * @return {?}
     */
    function (httpError) {
        httpError.error.caught = true;
        return this.error(httpError.error.message, httpError.error.title);
    };
    /**
     * @param {?} message
     * @return {?}
     */
    MessageService.prototype.message = /**
     * @param {?} message
     * @return {?}
     */
    function (message) {
        this.messages$.next(this.messages$.value.concat([message]));
        message.options = message.options || {};
        message = this.handleTemplate(message);
        /** @type {?} */
        var notification;
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
    };
    /**
     * @param {?} text
     * @param {?=} title
     * @param {?=} options
     * @return {?}
     */
    MessageService.prototype.success = /**
     * @param {?} text
     * @param {?=} title
     * @param {?=} options
     * @return {?}
     */
    function (text, title, options) {
        if (options === void 0) { options = {}; }
        return this.message({
            text: text,
            title: title,
            icon: options.icon || 'check',
            options: options,
            type: MessageType.SUCCESS
        });
    };
    /**
     * @param {?} text
     * @param {?=} title
     * @param {?=} options
     * @return {?}
     */
    MessageService.prototype.error = /**
     * @param {?} text
     * @param {?=} title
     * @param {?=} options
     * @return {?}
     */
    function (text, title, options) {
        if (options === void 0) { options = {}; }
        return this.message({
            text: text,
            title: title,
            icon: options.icon || 'error_outline',
            options: options,
            type: MessageType.ERROR
        });
    };
    /**
     * @param {?} text
     * @param {?=} title
     * @param {?=} options
     * @return {?}
     */
    MessageService.prototype.info = /**
     * @param {?} text
     * @param {?=} title
     * @param {?=} options
     * @return {?}
     */
    function (text, title, options) {
        if (options === void 0) { options = {}; }
        return this.message({
            text: text,
            title: title,
            icon: options.icon || 'info_outline',
            options: options,
            type: MessageType.INFO
        });
    };
    /**
     * @param {?} text
     * @param {?=} title
     * @param {?=} options
     * @return {?}
     */
    MessageService.prototype.alert = /**
     * @param {?} text
     * @param {?=} title
     * @param {?=} options
     * @return {?}
     */
    function (text, title, options) {
        if (options === void 0) { options = {}; }
        return this.message({
            text: text,
            title: title,
            icon: options.icon || 'access_alarm',
            options: options,
            type: MessageType.ALERT
        });
    };
    /**
     * @param {?=} id
     * @return {?}
     */
    MessageService.prototype.remove = /**
     * @param {?=} id
     * @return {?}
     */
    function (id) {
        this.notificationService.remove(id);
    };
    /**
     * @private
     * @param {?} notification
     * @param {?} icon
     * @return {?}
     */
    MessageService.prototype.addIcon = /**
     * @private
     * @param {?} notification
     * @param {?} icon
     * @return {?}
     */
    function (notification, icon) {
        // There is no way to add an icon to a notification when reating
        // it so we simply set it on the notification directly.
        // See https://github.com/flauc/angular2-notifications/issues/165
        notification.icon = "\n      <mat-icon class=\"material-icons mat-icon mat-list-avatar\" svgIcon=\"" + icon + "\">\n      </mat-icon>";
    };
    /**
     * @private
     * @param {?} message
     * @return {?}
     */
    MessageService.prototype.handleTemplate = /**
     * @private
     * @param {?} message
     * @return {?}
     */
    function (message) {
        if (!this.options.template || message.html) {
            return message;
        }
        /** @type {?} */
        var html = this.options.template;
        html = html.replace('${text}', message.text);
        html = html.replace('${title}', message.title);
        html = html.replace('${icon}', message.icon);
        message.html = html;
        message.text = undefined;
        message.title = undefined;
        message.icon = undefined;
        return message;
    };
    MessageService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    MessageService.ctorParameters = function () { return [
        { type: NotificationsService },
        { type: ConfigService }
    ]; };
    /** @nocollapse */ MessageService.ngInjectableDef = i0.defineInjectable({ factory: function MessageService_Factory() { return new MessageService(i0.inject(i1.NotificationsService), i0.inject(i2.ConfigService)); }, token: MessageService, providedIn: "root" });
    return MessageService;
}());
export { MessageService };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9tZXNzYWdlL3NoYXJlZC9tZXNzYWdlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN2QyxPQUFPLEVBQWdCLG9CQUFvQixFQUFtQixNQUFNLHdCQUF3QixDQUFDO0FBRTdGLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUc1RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7QUFFN0M7SUFPRSx3QkFDVSxtQkFBeUMsRUFDekMsYUFBNEI7UUFENUIsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFzQjtRQUN6QyxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUwvQixjQUFTLEdBQUcsSUFBSSxlQUFlLENBQVksRUFBRSxDQUFDLENBQUM7UUFPcEQsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDL0QsQ0FBQzs7Ozs7SUFFRCxrQ0FBUzs7OztJQUFULFVBQVUsU0FBNEI7UUFDcEMsU0FBUyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQzlCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3BFLENBQUM7Ozs7O0lBRUQsZ0NBQU87Ozs7SUFBUCxVQUFRLE9BQWdCO1FBQ3RCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxD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QUFDOztnQkE1SEYsVUFBVSxTQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7OztnQkFUc0Isb0JBQW9CO2dCQUVsQyxhQUFhOzs7eUJBTHRCO0NBdUlDLEFBN0hELElBNkhDO1NBMUhZLGNBQWM7OztJQUN6QixtQ0FBc0Q7Ozs7O0lBQ3RELGlDQUFnQzs7Ozs7SUFHOUIsNkNBQWlEOzs7OztJQUNqRCx1Q0FBb0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEh0dHBFcnJvclJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgTm90aWZpY2F0aW9uLCBOb3RpZmljYXRpb25zU2VydmljZSwgTm90aWZpY2F0aW9uVHlwZX0gZnJvbSAnYW5ndWxhcjItbm90aWZpY2F0aW9ucyc7XHJcblxyXG5pbXBvcnQgeyBDb25maWdTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vY29uZmlnL2NvbmZpZy5zZXJ2aWNlJztcclxuXHJcbmltcG9ydCB7IE1lc3NhZ2UsIE1lc3NhZ2VPcHRpb25zIH0gZnJvbSAnLi9tZXNzYWdlLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IE1lc3NhZ2VUeXBlIH0gZnJvbSAnLi9tZXNzYWdlLmVudW0nO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgTWVzc2FnZVNlcnZpY2Uge1xyXG4gIHB1YmxpYyBtZXNzYWdlcyQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PE1lc3NhZ2VbXT4oW10pO1xyXG4gIHByaXZhdGUgb3B0aW9uczogTWVzc2FnZU9wdGlvbnM7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBub3RpZmljYXRpb25TZXJ2aWNlOiBOb3RpZmljYXRpb25zU2VydmljZSxcclxuICAgIHByaXZhdGUgY29uZmlnU2VydmljZTogQ29uZmlnU2VydmljZVxyXG4gICkge1xyXG4gICAgdGhpcy5vcHRpb25zID0gdGhpcy5jb25maWdTZXJ2aWNlLmdldENvbmZpZygnbWVzc2FnZScpIHx8IHt9O1xyXG4gIH1cclxuXHJcbiAgc2hvd0Vycm9yKGh0dHBFcnJvcjogSHR0cEVycm9yUmVzcG9uc2UpIHtcclxuICAgIGh0dHBFcnJvci5lcnJvci5jYXVnaHQgPSB0cnVlO1xyXG4gICAgcmV0dXJuIHRoaXMuZXJyb3IoaHR0cEVycm9yLmVycm9yLm1lc3NhZ2UsIGh0dHBFcnJvci5lcnJvci50aXRsZSk7XHJcbiAgfVxyXG5cclxuICBtZXNzYWdlKG1lc3NhZ2U6IE1lc3NhZ2UpIHtcclxuICAgIHRoaXMubWVzc2FnZXMkLm5leHQodGhpcy5tZXNzYWdlcyQudmFsdWUuY29uY2F0KFttZXNzYWdlXSkpO1xyXG5cclxuICAgIG1lc3NhZ2Uub3B0aW9ucyA9IG1lc3NhZ2Uub3B0aW9ucyB8fCB7fTtcclxuICAgIG1lc3NhZ2UgPSB0aGlzLmhhbmRsZVRlbXBsYXRlKG1lc3NhZ2UpO1xyXG5cclxuICAgIGxldCBub3RpZmljYXRpb246IE5vdGlmaWNhdGlvbjtcclxuICAgIGlmIChtZXNzYWdlLnRleHQpIHtcclxuICAgICAgbm90aWZpY2F0aW9uID0gdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLmNyZWF0ZShcclxuICAgICAgICBtZXNzYWdlLnRpdGxlLFxyXG4gICAgICAgIG1lc3NhZ2UudGV4dCxcclxuICAgICAgICAobWVzc2FnZS50eXBlIGFzIGFueSkgYXMgTm90aWZpY2F0aW9uVHlwZSxcclxuICAgICAgICBtZXNzYWdlLm9wdGlvbnNcclxuICAgICAgKTtcclxuICAgIH0gZWxzZSBpZiAobWVzc2FnZS5odG1sKSB7XHJcbiAgICAgIGlmICghbWVzc2FnZS5pY29uKSB7XHJcbiAgICAgICAgbWVzc2FnZS5vcHRpb25zLnRoZUNsYXNzID0gbWVzc2FnZS5vcHRpb25zLnRoZUNsYXNzXHJcbiAgICAgICAgICA/IG1lc3NhZ2Uub3B0aW9ucy50aGVDbGFzcyArICcgbm9JY29uJ1xyXG4gICAgICAgICAgOiAnbm9JY29uJztcclxuICAgICAgfVxyXG5cclxuICAgICAgbm90aWZpY2F0aW9uID0gdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLmh0bWwoXHJcbiAgICAgICAgbWVzc2FnZS5odG1sLFxyXG4gICAgICAgIChtZXNzYWdlLnR5cGUgYXMgYW55KSBhcyBOb3RpZmljYXRpb25UeXBlLFxyXG4gICAgICAgIG1lc3NhZ2Uub3B0aW9uc1xyXG4gICAgICApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChtZXNzYWdlLmljb24gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLmFkZEljb24obm90aWZpY2F0aW9uLCBtZXNzYWdlLmljb24pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBub3RpZmljYXRpb247XHJcbiAgfVxyXG5cclxuICBzdWNjZXNzKHRleHQ6IHN0cmluZywgdGl0bGU/OiBzdHJpbmcsIG9wdGlvbnM6IGFueSA9IHt9KSB7XHJcbiAgICByZXR1cm4gdGhpcy5tZXNzYWdlKHtcclxuICAgICAgdGV4dCxcclxuICAgICAgdGl0bGUsXHJcbiAgICAgIGljb246IG9wdGlvbnMuaWNvbiB8fCAnY2hlY2snLFxyXG4gICAgICBvcHRpb25zLFxyXG4gICAgICB0eXBlOiBNZXNzYWdlVHlwZS5TVUNDRVNTXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGVycm9yKHRleHQ6IHN0cmluZywgdGl0bGU/OiBzdHJpbmcsIG9wdGlvbnM6IGFueSA9IHt9KSB7XHJcbiAgICByZXR1cm4gdGhpcy5tZXNzYWdlKHtcclxuICAgICAgdGV4dCxcclxuICAgICAgdGl0bGUsXHJcbiAgICAgIGljb246IG9wdGlvbnMuaWNvbiB8fCAnZXJyb3Jfb3V0bGluZScsXHJcbiAgICAgIG9wdGlvbnMsXHJcbiAgICAgIHR5cGU6IE1lc3NhZ2VUeXBlLkVSUk9SXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGluZm8odGV4dDogc3RyaW5nLCB0aXRsZT86IHN0cmluZywgb3B0aW9uczogYW55ID0ge30pIHtcclxuICAgIHJldHVybiB0aGlzLm1lc3NhZ2Uoe1xyXG4gICAgICB0ZXh0LFxyXG4gICAgICB0aXRsZSxcclxuICAgICAgaWNvbjogb3B0aW9ucy5pY29uIHx8ICdpbmZvX291dGxpbmUnLFxyXG4gICAgICBvcHRpb25zLFxyXG4gICAgICB0eXBlOiBNZXNzYWdlVHlwZS5JTkZPXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGFsZXJ0KHRleHQ6IHN0cmluZywgdGl0bGU/OiBzdHJpbmcsIG9wdGlvbnM6IGFueSA9IHt9KSB7XHJcbiAgICByZXR1cm4gdGhpcy5tZXNzYWdlKHtcclxuICAgICAgdGV4dCxcclxuICAgICAgdGl0bGUsXHJcbiAgICAgIGljb246IG9wdGlvbnMuaWNvbiB8fCAnYWNjZXNzX2FsYXJtJyxcclxuICAgICAgb3B0aW9ucyxcclxuICAgICAgdHlwZTogTWVzc2FnZVR5cGUuQUxFUlRcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcmVtb3ZlKGlkPzogc3RyaW5nKSB7XHJcbiAgICB0aGlzLm5vdGlmaWNhdGlvblNlcnZpY2UucmVtb3ZlKGlkKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYWRkSWNvbihub3RpZmljYXRpb246IE5vdGlmaWNhdGlvbiwgaWNvbjogc3RyaW5nKSB7XHJcbiAgICAvLyBUaGVyZSBpcyBubyB3YXkgdG8gYWRkIGFuIGljb24gdG8gYSBub3RpZmljYXRpb24gd2hlbiByZWF0aW5nXHJcbiAgICAvLyBpdCBzbyB3ZSBzaW1wbHkgc2V0IGl0IG9uIHRoZSBub3RpZmljYXRpb24gZGlyZWN0bHkuXHJcbiAgICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2ZsYXVjL2FuZ3VsYXIyLW5vdGlmaWNhdGlvbnMvaXNzdWVzLzE2NVxyXG4gICAgbm90aWZpY2F0aW9uLmljb24gPSBgXHJcbiAgICAgIDxtYXQtaWNvbiBjbGFzcz1cIm1hdGVyaWFsLWljb25zIG1hdC1pY29uIG1hdC1saXN0LWF2YXRhclwiIHN2Z0ljb249XCIke2ljb259XCI+XHJcbiAgICAgIDwvbWF0LWljb24+YDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaGFuZGxlVGVtcGxhdGUobWVzc2FnZTogTWVzc2FnZSk6IE1lc3NhZ2Uge1xyXG4gICAgaWYgKCF0aGlzLm9wdGlvbnMudGVtcGxhdGUgfHwgbWVzc2FnZS5odG1sKSB7XHJcbiAgICAgIHJldHVybiBtZXNzYWdlO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBodG1sID0gdGhpcy5vcHRpb25zLnRlbXBsYXRlO1xyXG4gICAgaHRtbCA9IGh0bWwucmVwbGFjZSgnJHt0ZXh0fScsIG1lc3NhZ2UudGV4dCk7XHJcbiAgICBodG1sID0gaHRtbC5yZXBsYWNlKCcke3RpdGxlfScsIG1lc3NhZ2UudGl0bGUpO1xyXG4gICAgaHRtbCA9IGh0bWwucmVwbGFjZSgnJHtpY29ufScsIG1lc3NhZ2UuaWNvbik7XHJcblxyXG4gICAgbWVzc2FnZS5odG1sID0gaHRtbDtcclxuICAgIG1lc3NhZ2UudGV4dCA9IHVuZGVmaW5lZDtcclxuICAgIG1lc3NhZ2UudGl0bGUgPSB1bmRlZmluZWQ7XHJcbiAgICBtZXNzYWdlLmljb24gPSB1bmRlZmluZWQ7XHJcbiAgICByZXR1cm4gbWVzc2FnZTtcclxuICB9XHJcbn1cclxuIl19